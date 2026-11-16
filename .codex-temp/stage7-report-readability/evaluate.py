import argparse
import json
import time
from datetime import datetime, timezone
from pathlib import Path

import httpx


ROOT = Path(__file__).resolve().parents[1]
GOLDEN = json.loads((ROOT / "examples" / "eval" / "golden.json").read_text(encoding="utf-8"))


def fixture(item):
    plan = json.loads((ROOT / "examples" / item["fixture"]).read_text(encoding="utf-8"))
    for edit in item.get("edits", []):
        target = plan
        for part in edit["path"][:-1]:
            target = target[part]
        target[edit["path"][-1]] = edit["value"]
    return plan


def boundary_coverage(plan):
    oracle = GOLDEN["boundary_oracle"]
    names = {field["id"] for field in plan["fields"] if field["label"] == "주문명"}
    feedback = {field["id"] for field in plan["fields"]
                if field["locator"]["kind"] == "test_id" and field["locator"]["value"] == "feedback"}
    return any(
        any(step["action"] == "fill" and step["field_id"] in names
            and len(step.get("value") or "") == oracle["limit"] + 1 for step in case["steps"])
        and any(assertion["action"] == "text" and assertion["field_id"] in feedback
                and assertion.get("expected") == oracle["expected_feedback"]
                for assertion in case["assertions"])
        for case in plan["cases"]
    )


def create_run(client, plan):
    response = client.post("/api/runs", json={
        "project_id": plan["project_id"], "route": plan["route"],
        "policy_version": plan["policy_version"],
    })
    response.raise_for_status()
    return response.json()["id"]


def evaluate(client, model_run_id=None):
    for path in sorted((ROOT / "examples" / "policies").glob("*.json")):
        client.post("/api/policies", json=json.loads(path.read_text(encoding="utf-8"))).raise_for_status()

    retrieval = []
    for item in GOLDEN["retrieval"]:
        response = client.post("/api/policies/search", json={
            "project_id": "demo-orders", "version": item["version"],
            "query": item["query"], "top_k": 3,
        })
        response.raise_for_status()
        hits = response.json()
        ids = [hit["source_id"] for hit in hits]
        retrieval.append({"query": item["query"], "expected": item["source_id"],
                          "top1": ids[:1] == [item["source_id"]],
                          "top3": item["source_id"] in ids,
                          "scope_ok": all(hit["project_id"] == "demo-orders"
                                          and hit["version"] == item["version"] for hit in hits),
                          "returned": ids})
    empty = client.post("/api/policies/search", json={
        "project_id": "unknown-project", "version": "v1", "query": "주문명 정책", "top_k": 3,
    })
    empty.raise_for_status()

    plan_checks = []
    for item in GOLDEN["plan_checks"]:
        plan = fixture(item)
        run_id = create_run(client, plan)
        response = client.put(f"/api/runs/{run_id}/plan", json=plan)
        detail = response.json().get("detail", "") if response.status_code != 200 else ""
        plan_checks.append({"name": item["name"], "expected_http": item["expected_status"],
                            "actual_http": response.status_code, "detail": detail,
                            "pass": response.status_code == item["expected_status"]
                            and item.get("expected_detail", "") in detail})

    browser = []
    for item in GOLDEN["browser_checks"]:
        plan = fixture(item)
        run_id = create_run(client, plan)
        saved = client.put(f"/api/runs/{run_id}/plan", json=plan)
        if saved.status_code != 200:
            browser.append({"name": item["name"], "expected": item["expected_status"],
                            "actual": f"plan HTTP {saved.status_code}", "pass": False})
            continue
        started = time.perf_counter()
        response = client.post(f"/api/runs/{run_id}/execute")
        response.raise_for_status()
        result = response.json()["result"]
        failure_messages = [case.get("error", "") for case in result["cases"] if case["status"] == "failed"]
        reason_ok = not item.get("expected_error_contains") or any(
            item["expected_error_contains"] in message for message in failure_messages
        )
        browser.append({"name": item["name"], "expected": item["expected_status"],
                        "actual": result["status"], "pass": result["status"] == item["expected_status"] and reason_ok,
                        "reason_ok": reason_ok,
                        "seconds": round(time.perf_counter() - started, 2),
                        "cases": [{"id": case["id"], "status": case["status"]} for case in result["cases"]]})

    browser_cases = [case for scenario in browser for case in scenario.get("cases", [])]
    case_counts = {"total": len(browser_cases),
                   "passed": sum(case["status"] == "passed" for case in browser_cases),
                   "failed": sum(case["status"] == "failed" for case in browser_cases)}
    report = {
        "measured_at": datetime.now(timezone.utc).isoformat(),
        "dataset": "examples/eval/golden.json",
        "model_generated_cases": 0,
        "retrieval": {"top1": sum(item["top1"] for item in retrieval), "top3": sum(item["top3"] for item in retrieval),
                      "total": len(retrieval), "scope_pass": all(item["scope_ok"] for item in retrieval)
                      and empty.json() == [], "cases": retrieval},
        "plan_checks": {"passed": sum(item["pass"] for item in plan_checks),
                        "total": len(plan_checks), "cases": plan_checks},
        "browser_checks": {"passed": sum(item["pass"] for item in browser),
                           "total": len(browser), "playwright_cases": case_counts, "cases": browser},
    }
    if model_run_id:
        response = client.get(f"/api/runs/{model_run_id}")
        response.raise_for_status()
        run = response.json()
        generation = run["generation"] or {}
        attempts = generation.get("attempts", [])
        report["model_run"] = {"id": model_run_id, "status": run["status"],
                               "boundary_coverage": boundary_coverage(run["plan"]) if run["plan"] else None,
                               "case_count": len(run["plan"]["cases"]) if run["plan"] else 0,
                               "generation_attempts": len(attempts) if attempts else (1 if generation else 0),
                               "total_tokens": sum(item.get("total_tokens", 0) for item in attempts)
                               if attempts else generation.get("total_tokens"),
                               "result_status": run["result"]["status"]
                               if run["result"] else None}
    return report


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Evaluate Common Tester against a small golden dataset")
    parser.add_argument("--run-id", help="Also inspect one saved model-generated run")
    args = parser.parse_args()
    with httpx.Client(base_url="http://127.0.0.1:8000", timeout=90) as client:
        report = evaluate(client, args.run_id)
    destination = ROOT / ".local" / "evaluations" / "stage7-latest.json"
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"검색 Top-1 {report['retrieval']['top1']}/{report['retrieval']['total']}, "
          f"범위 격리 {'통과' if report['retrieval']['scope_pass'] else '실패'}")
    print(f"계획 검증 {report['plan_checks']['passed']}/{report['plan_checks']['total']}, "
          f"브라우저 판정 {report['browser_checks']['passed']}/{report['browser_checks']['total']}")
    counts = report["browser_checks"]["playwright_cases"]
    print(f"Playwright 실행 케이스 {counts['total']}개: 통과 {counts['passed']}개, 실패 {counts['failed']}개")
    print(f"이번 평가에서 모델이 새로 생성한 케이스 {report['model_generated_cases']}개")
    for scenario in report["browser_checks"]["cases"]:
        case_passed = sum(case["status"] == "passed" for case in scenario.get("cases", []))
        case_failed = sum(case["status"] == "failed" for case in scenario.get("cases", []))
        expected = "통과" if scenario["expected"] == "passed" else "실패"
        actual = {"passed": "통과", "failed": "실패"}.get(scenario["actual"], scenario["actual"])
        print(f"- {scenario['name']}: {expected} 예상, 실제 {actual}, "
              f"케이스 통과 {case_passed}, 실패 {case_failed}, 평가 {'일치' if scenario['pass'] else '불일치'}")
    print(f"보고서: {destination}")
    if (report["retrieval"]["top1"] != report["retrieval"]["total"]
            or not report["retrieval"]["scope_pass"]
            or report["plan_checks"]["passed"] != report["plan_checks"]["total"]
            or report["browser_checks"]["passed"] != report["browser_checks"]["total"]):
        raise SystemExit(1)
