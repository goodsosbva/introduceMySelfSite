# Common Tester

정책 근거로 브라우저 테스트 계획을 만들고, 사람이 승인한 계획을 Playwright로 실행하는 데모 프로젝트입니다. React, FastAPI, PostgreSQL, RAG 검색, 모델 도구 호출, LangGraph 승인 흐름을 포함합니다.

## Docker Compose 실행

Docker Desktop을 시작한 뒤 저장소 루트에서 `.env` 파일을 만듭니다. 데이터베이스 암호는 로컬에서 무작위로 생성합니다.

```powershell
Copy-Item .env.example .env
$secret = [Convert]::ToHexString([Security.Cryptography.RandomNumberGenerator]::GetBytes(32)).ToLowerInvariant()
$envFile = (Get-Content .env -Raw -Encoding ascii).Replace('replace-with-random-hex-value', $secret)
Set-Content .env -Value $envFile -Encoding ascii -NoNewline
Remove-Variable secret, envFile
```

실제 모델 호출을 원하면 교체한 OpenAI 키를 로컬 `.env`의 `OPENAI_API_KEY`에 입력합니다. 키를 저장소나 채팅에 넣지 않습니다.

```powershell
docker compose up --build -d
docker compose ps
Invoke-RestMethod http://127.0.0.1:8000/api/health
.\scripts\check-container.ps1
```

- 웹 화면: http://127.0.0.1:8000
- API 문서: http://127.0.0.1:8000/docs
- API 상태: http://127.0.0.1:8000/api/health
- 서비스 로그: `docker compose logs -f api`
- 종료: `docker compose down`
- 데이터베이스, 임베딩 모델, 실행 증거는 Docker 볼륨에 남습니다. `docker compose down -v`는 이 데이터를 삭제합니다.

## Windows 로컬 개발

로컬 개발은 시스템 PostgreSQL 서비스를 변경하지 않고 저장소의 `.local/`에 전용 PostgreSQL을 만듭니다.

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r api\requirements.txt
.\.venv\Scripts\python.exe -m playwright install chromium
.\scripts\start-api.ps1
```

두 번째 PowerShell 창에서:

```powershell
Set-Location web
npm ci
npm run dev
```

- 화면: http://127.0.0.1:5173
- API: http://127.0.0.1:8000/docs
- DB 종료: `.\scripts\stop-db.ps1`

## 기능과 검증

- 프로젝트와 버전별 한국어 정책 검색, 출처 ID 검증
- 모델 도구 호출로 계획 생성, 실패 계획 1회 보정
- 계획 검토 후 승인 또는 거절, PostgreSQL 체크포인트 재개
- 브라우저 실행 결과, 스크린샷과 Playwright 추적 조회
- [고정 정답 평가](docs/implementation/07-quality-evaluation.md): 검색 24문항, 계획 검증 16건, 브라우저 시나리오 17개, Playwright 케이스 20개
- [단계별 구현 기록](docs/implementation/README.md)

## 실제 모델 호출

새 키를 로컬 `.env`에 입력하고 `docker compose up --build -d`로 재시작한 뒤 다음 검사를 실행합니다.

```powershell
.\scripts\check-stage4-live.ps1
```

실제 API 응답과 모델이 만든 계획의 품질은 아직 확인되지 않았습니다. 고정 정답 평가의 점수는 실제 모델 생성 품질 점수와 구분합니다.
