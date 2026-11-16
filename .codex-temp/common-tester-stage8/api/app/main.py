import os
from contextlib import asynccontextmanager
from pathlib import Path
from uuid import UUID, uuid4

import psycopg
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from psycopg.rows import dict_row
from psycopg.types.json import Jsonb
from fastapi.staticfiles import StaticFiles

from .generator import MODEL, generate_plan
from .models import (
    GenerationRequest, PolicyDocumentCreate, PolicyDocumentSummary, PolicySearchHit, PolicySearchRequest,
    PolicySource, ReviewDecision, RunCreate, RunDetail, RunSummary, TestPlan,
)
from .policies import PolicyVersionConflict, create_tables, register, search
from .runner import execute
from .validation import validate_plan
from .workflow import build_graph
from langgraph.checkpoint.postgres import PostgresSaver
from langgraph.types import Command


DATABASE_URL = os.environ["DATABASE_URL"]
ROOT = Path(__file__).resolve().parents[2]
TARGET_BASE_URL = os.getenv("TEST_TARGET_BASE_URL", "http://127.0.0.1:8000")


@asynccontextmanager
async def lifespan(app: FastAPI):
    with psycopg.connect(DATABASE_URL) as connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS runs (
                id UUID PRIMARY KEY,
                project_id TEXT NOT NULL,
                route TEXT NOT NULL,
                policy_version TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'created',
                plan JSONB,
                result JSONB,
                generation JSONB,
                workflow JSONB,
                created_at TIMESTAMPTZ NOT NULL DEFAULT now()
            )
        """)
        connection.execute("ALTER TABLE runs ADD COLUMN IF NOT EXISTS result JSONB")
        connection.execute("ALTER TABLE runs ADD COLUMN IF NOT EXISTS generation JSONB")
        connection.execute("ALTER TABLE runs ADD COLUMN IF NOT EXISTS workflow JSONB")
        create_tables(connection)
    with PostgresSaver.from_conn_string(DATABASE_URL) as saver:
        saver.setup()
    yield


app = FastAPI(title="Common Tester API", lifespan=lifespan)
app.mount("/fixtures", StaticFiles(directory=ROOT / "examples" / "fixtures"), name="fixtures")


def database():
    return psycopg.connect(DATABASE_URL, row_factory=dict_row)


@app.get("/api/health")
def health():
    with database() as connection:
        connection.execute("SELECT 1")
    return {"status": "ok", "database": "connected"}


@app.post("/api/policies", response_model=PolicyDocumentSummary)
def register_policy(document: PolicyDocumentCreate):
    with database() as connection:
        try:
            return register(connection, document)
        except PolicyVersionConflict as error:
            raise HTTPException(status_code=409, detail=str(error)) from error


@app.post("/api/demo/setup", response_model=PolicyDocumentSummary)
def setup_demo():
    document = PolicyDocumentCreate.model_validate_json(
        (ROOT / "examples" / "policies" / "order-name-v1.json").read_text(encoding="utf-8")
    )
    return register_policy(document)


@app.post("/api/policies/search", response_model=list[PolicySearchHit])
def search_policies(request: PolicySearchRequest):
    with database() as connection:
        return search(connection, request)


@app.get("/api/policies/sources/{source_id}", response_model=PolicySource)
def get_policy_source(source_id: str):
    with database() as connection:
        row = connection.execute(
            """SELECT c.source_id, c.project_id, c.document_id, c.version,
                      c.ordinal, c.content, d.title
               FROM policy_chunks c JOIN policy_documents d
                 USING (project_id, document_id, version)
               WHERE c.source_id = %s""",
            (source_id,),
        ).fetchone()
    if row is None:
        raise HTTPException(status_code=404, detail="Policy source not found")
    return row


@app.post("/api/runs", response_model=RunDetail, status_code=201)
def create_run(body: RunCreate):
    run_id = uuid4()
    with database() as connection:
        row = connection.execute(
            """INSERT INTO runs (id, project_id, route, policy_version)
               VALUES (%s, %s, %s, %s)
               RETURNING *""",
            (run_id, body.project_id, body.route, body.policy_version),
        ).fetchone()
    return row


@app.get("/api/runs", response_model=list[RunSummary])
def list_runs():
    with database() as connection:
        return connection.execute(
            """SELECT id, project_id, route, policy_version, status, created_at
               FROM runs ORDER BY created_at DESC LIMIT 50"""
        ).fetchall()


@app.get("/api/runs/{run_id}", response_model=RunDetail)
def get_run(run_id: UUID):
    with database() as connection:
        row = connection.execute("SELECT * FROM runs WHERE id = %s", (run_id,)).fetchone()
    if row is None:
        raise HTTPException(status_code=404, detail="Run not found")
    return row


@app.get("/api/runs/{run_id}/artifacts/{filename}")
def get_artifact(run_id: UUID, filename: str):
    with database() as connection:
        row = connection.execute("SELECT result FROM runs WHERE id = %s", (run_id,)).fetchone()
    if row is None or row["result"] is None:
        raise HTTPException(status_code=404, detail="Artifact not found")
    allowed = {
        Path(path).name
        for case in row["result"].get("cases", [])
        for path in (case.get("screenshot"), case.get("trace"))
        if path
    }
    directory = (ROOT / ".local" / "runs" / str(run_id)).resolve()
    artifact = (directory / filename).resolve()
    if filename not in allowed or artifact.parent != directory or not artifact.is_file():
        raise HTTPException(status_code=404, detail="Artifact not found")
    return FileResponse(artifact)


@app.put("/api/runs/{run_id}/plan", response_model=RunDetail)
def save_plan(run_id: UUID, plan: TestPlan):
    with database() as connection:
        row = connection.execute(
            "SELECT project_id, route, policy_version, status FROM runs WHERE id = %s FOR UPDATE",
            (run_id,),
        ).fetchone()
        if row is None:
            raise HTTPException(status_code=404, detail="Run not found")
        if row["status"] != "created":
            raise HTTPException(status_code=409, detail="Run has already started")
        validate_plan(connection, row, plan)
        updated = connection.execute(
            "UPDATE runs SET plan = %s WHERE id = %s RETURNING *",
            (Jsonb(plan.model_dump(mode="json")), run_id),
        ).fetchone()
    return updated


@app.post("/api/runs/{run_id}/generate", response_model=RunDetail)
def generate_run_plan(run_id: UUID, body: GenerationRequest):
    if not os.getenv("OPENAI_API_KEY"):
        raise HTTPException(status_code=503, detail="Set OPENAI_API_KEY before generating a plan")
    with database() as connection:
        run = connection.execute("SELECT * FROM runs WHERE id = %s FOR UPDATE", (run_id,)).fetchone()
        if run is None:
            raise HTTPException(status_code=404, detail="Run not found")
        if run["status"] != "created" or run["plan"] is not None:
            raise HTTPException(status_code=409, detail="Run is not ready for plan generation")
        if run["project_id"] != "demo-orders" or run["route"].split("?", 1)[0] != "/fixtures/order.html":
            raise HTTPException(status_code=422, detail="Only the registered demo order form is supported")
        connection.execute("UPDATE runs SET status = 'generating' WHERE id = %s", (run_id,))

    call_log = []
    try:
        plan, response_id, tokens = generate_plan(
            run, body.objective, database, TARGET_BASE_URL, call_log,
        )
        generation = {"status": "completed", "model": MODEL, "objective": body.objective,
                      "response_id": response_id, "total_tokens": tokens, "calls": call_log}
        with database() as connection:
            validate_plan(connection, run, plan)
            saved = connection.execute(
                """UPDATE runs SET status = 'created', plan = %s, generation = %s
                   WHERE id = %s RETURNING *""",
                (Jsonb(plan.model_dump(mode="json")), Jsonb(generation), run_id),
            ).fetchone()
        return saved
    except Exception as error:
        generation = {"status": "error", "model": MODEL, "objective": body.objective,
                      "calls": call_log, "error": str(error)[:1000]}
        with database() as connection:
            connection.execute(
                "UPDATE runs SET status = 'created', generation = %s WHERE id = %s",
                (Jsonb(generation), run_id),
            )
        if isinstance(error, HTTPException):
            raise
        raise HTTPException(status_code=502, detail=f"Plan generation failed: {type(error).__name__}") from error


@app.post("/api/runs/{run_id}/execute", response_model=RunDetail)
def execute_run(run_id: UUID):
    with database() as connection:
        row = connection.execute("SELECT * FROM runs WHERE id = %s FOR UPDATE", (run_id,)).fetchone()
        if row is None:
            raise HTTPException(status_code=404, detail="Run not found")
        if row["plan"] is None:
            raise HTTPException(status_code=409, detail="Save a plan before execution")
        if row["status"] != "created":
            raise HTTPException(status_code=409, detail="Run has already started")
        connection.execute("UPDATE runs SET status = 'running' WHERE id = %s", (run_id,))

    try:
        result = execute(TestPlan.model_validate(row["plan"]), run_id, TARGET_BASE_URL, ROOT / ".local" / "runs")
        status = result["status"]
    except Exception as error:
        status = "error"
        result = {"status": status, "error": str(error)[:2000], "cases": []}

    with database() as connection:
        row = connection.execute(
            "UPDATE runs SET status = %s, result = %s WHERE id = %s RETURNING *",
            (status, Jsonb(result), run_id),
        ).fetchone()
    return row


@app.post("/api/runs/{run_id}/workflow/start", response_model=RunDetail)
def start_workflow(run_id: UUID, body: GenerationRequest):
    if not os.getenv("OPENAI_API_KEY"):
        raise HTTPException(status_code=503, detail="Set OPENAI_API_KEY before generating a plan")
    with database() as connection:
        run = connection.execute("SELECT * FROM runs WHERE id = %s FOR UPDATE", (run_id,)).fetchone()
        if run is None:
            raise HTTPException(status_code=404, detail="Run not found")
        if run["status"] != "created" or run["plan"] is not None:
            raise HTTPException(status_code=409, detail="Run is not ready for workflow")
        if run["project_id"] != "demo-orders" or run["route"].split("?", 1)[0] != "/fixtures/order.html":
            raise HTTPException(status_code=422, detail="Only the registered demo order form is supported")
        connection.execute("UPDATE runs SET status = 'generating' WHERE id = %s", (run_id,))
    try:
        with PostgresSaver.from_conn_string(DATABASE_URL) as saver:
            graph = build_graph(database, TARGET_BASE_URL, ROOT).compile(checkpointer=saver)
            graph.invoke({"run_id": str(run_id), "objective": body.objective, "attempt": 0},
                         {"configurable": {"thread_id": str(run_id)}})
    except Exception as error:
        with database() as connection:
            connection.execute(
                "UPDATE runs SET status = 'error', workflow = %s WHERE id = %s",
                (Jsonb({"phase": "error", "reason": type(error).__name__}), run_id),
            )
        if isinstance(error, HTTPException):
            raise
        raise HTTPException(status_code=502, detail=f"Workflow failed: {type(error).__name__}") from error
    return get_run(run_id)


@app.post("/api/runs/{run_id}/workflow/resume", response_model=RunDetail)
def resume_workflow(run_id: UUID, body: ReviewDecision):
    with database() as connection:
        run = connection.execute("SELECT status FROM runs WHERE id = %s", (run_id,)).fetchone()
    if run is None:
        raise HTTPException(status_code=404, detail="Run not found")
    if run["status"] != "awaiting_review":
        raise HTTPException(status_code=409, detail="Run is not waiting for review")
    with PostgresSaver.from_conn_string(DATABASE_URL) as saver:
        graph = build_graph(database, TARGET_BASE_URL, ROOT).compile(checkpointer=saver)
        config = {"configurable": {"thread_id": str(run_id)}}
        if graph.get_state(config).next != ("review",):
            raise HTTPException(status_code=409, detail="Workflow checkpoint is not waiting for review")
        graph.invoke(Command(resume=body.approved), config)
    return get_run(run_id)


web_dist = ROOT / "web" / "dist"
if web_dist.is_dir():
    app.mount("/", StaticFiles(directory=web_dist, html=True), name="web")
