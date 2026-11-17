# Common Tester 구현 기록: 4단계 모델 도구 호출과 실행계획 생성

## 목표

- 모델이 필요한 정책과 폼 정보를 도구 호출로 확인한다.
- 도구 요청을 서버에서 검증하고, 허용된 정보만 모델에 돌려준다.
- 모델의 구조화된 `TestPlan`을 다시 검증해 DB에 저장한다.
- 호출 인자, 결과, 소요 시간과 모델 응답 ID를 실행 기록에서 추적한다.

## 구현한 경로

| 파일 | 내용 |
| --- | --- |
| [generator.py](../../api/app/generator.py) | Responses API 호출 루프, 도구 인자 검사, 도구 실행, 구조화 출력 |
| [main.py](../../api/app/main.py) | `POST /api/runs/{id}/generate`, 생성 상태와 기록 저장 |
| [models.py](../../api/app/models.py) | 생성 요청과 `RunDetail.generation` |
| [check_stage4.py](../../api/check_stage4.py) | 모의 모델 응답으로 도구 호출, 저장, 브라우저 실행, 오류 경계 검사 |
| [check-stage4-live.ps1](../../scripts/check-stage4-live.ps1) | 실제 모델 API 호출 후 저장 결과 확인용 스크립트 |

## 모델과 서버의 역할

1. 서버가 실행의 프로젝트, 경로, 정책 버전을 고정하고 모델에 검사 목적을 보낸다.
2. 첫 호출은 `search_policy`로 지정한다. 이후 모델은 필요한 도구를 선택할 수 있다.
3. 서버는 호출 이름과 JSON 인자를 Pydantic으로 확인하고 최대 8회까지 실행한다.
4. 각 도구 출력은 같은 `call_id`의 `function_call_output`으로 모델에 돌려준다.
5. 모델이 `TestPlan`을 반환하면 Pydantic 형식, 실행 대상 일치, 정책 근거 ID와 버전을 검사한다.
6. 검증에 통과한 계획만 `runs.plan`에 저장한다. 생성이 실패하면 실행 상태를 `created`로 되돌리고 오류와 도구 기록을 `runs.generation`에 남긴다.

도구 결과와 페이지 문구는 증거 자료로 취급한다. 모델이 반환한 임의 Python 코드나 SQL은 실행하지 않는다.

## 모델이 호출할 수 있는 도구

| 도구 | 모델 인자 | 서버가 제한하는 범위 |
| --- | --- | --- |
| `search_policy` | 질문, 검색 개수 | 프로젝트와 정책 버전은 실행 기록에서 주입. 최대 5개 문단 반환 |
| `read_project_file` | 등록된 파일 ID, 시작/끝 줄 | `order_form` 파일만 허용, 한 번에 최대 80줄 |
| `inspect_page` | `run_route` | 실행에 등록된 주문 폼 경로만 Chromium으로 확인 |

도구 실행 기록에는 `call_id`, 이름, 검증된 인자, 시작 시각, 소요 시간, 결과 또는 오류를 저장한다. API 키는 기록에 포함하지 않는다.

## 현재 검증 결과

- 모의 모델이 `search_policy` 다음 `read_project_file`, `inspect_page`를 호출했다. 세 도구가 실제 정책 DB, 소스 파일, Chromium 화면을 읽고 출력한 결과를 다음 모델 호출로 전달했다.
- 모의 모델이 반환한 계획을 저장한 뒤 Python Playwright로 실행해 정상 화면 2건이 통과했다.
- 존재하지 않는 정책 근거를 참조한 계획은 422로 거부됐다.
- `search_policy`에 허용 범위를 넘는 인자를 보낸 경우 생성은 실패하고 기록이 남았다. 실행 상태는 다시 `created`가 됐다.
- 2026-10-26 로컬 `.env`의 `OPENAI_API_KEY`를 로드해 실제 OpenAI 호출을 시도했다. 제공된 키가 인증 단계에서 `AuthenticationError`로 거부되어 도구 호출이나 모델 계획은 생성되지 않았다. 유효한 키로 다시 확인해야 한다.

## 실행 방법과 남은 범위

- 기본 모델은 `gpt-5.4-mini`이고 `OPENAI_MODEL`로 변경할 수 있다. API 키는 `OPENAI_API_KEY` 환경 변수에서만 읽는다.
- 키 없이도 `python api/check_stage4.py`로 모의 모델 통합 검사를 반복할 수 있다. 이때 전용 DB와 API가 실행 중이어야 한다.
- 실제 호출 확인 시 저장소 루트의 `.env`에 `OPENAI_API_KEY`를 설정하고 `scripts/start-api.ps1`로 API를 재시작한다. 다른 창에서 `scripts/check-stage4-live.ps1`을 실행한다. 키 값은 저장소와 문서에 넣지 않는다.
- 자동 보정, 확인 대기, 중단 후 재개는 5단계 LangGraph에서 다룬다. 모델이 만든 계획의 기대값이 정책 원문에서 논리적으로 도출되는지는 아직 완전히 검증하지 않는다.

도구 호출과 `call_id` 연결은 [OpenAI Docs의 function calling 안내](https://developers.openai.com/api/docs/guides/function-calling), Pydantic 구조화 출력은 [OpenAI Docs의 structured outputs 안내](https://developers.openai.com/api/docs/guides/structured-outputs)에 따른다.
