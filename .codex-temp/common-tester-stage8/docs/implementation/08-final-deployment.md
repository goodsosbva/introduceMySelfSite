# Common Tester 구현 기록: 8단계 최종 실행과 제출

## 목표

- PostgreSQL, FastAPI, React 정적 파일, Chromium 실행기를 Docker Compose 한 번으로 시작한다.
- 데이터베이스, 임베딩 모델, 실행 증거를 컨테이너 재생성 뒤에도 보관한다.
- 브라우저 화면부터 PostgreSQL 저장과 실제 Playwright 실행까지 마지막 경로를 확인한다.

## 구성

| 파일 | 내용 |
| --- | --- |
| [Dockerfile](../../Dockerfile) | Node 빌드 단계와 Python API·Playwright Chromium 실행 이미지 |
| [compose.yaml](../../compose.yaml) | PostgreSQL 17과 API, 상태 검사, 데이터 볼륨 |
| [.dockerignore](../../.dockerignore) | 로컬 DB, 모델 캐시, 가상환경, 키 파일을 이미지 컨텍스트에서 제외 |
| [.env.example](../../.env.example) | 로컬 DB 암호와 선택적 OpenAI 키 환경 변수 예시 |
| [check-container.ps1](../../scripts/check-container.ps1) | 화면 파일, DB 연결, 데모 정책, Playwright 두 건 검사 |
| [main.py](../../api/app/main.py) | 빌드된 React 파일을 FastAPI 루트 경로로 제공 |

Compose는 호스트의 `127.0.0.1:8000`에만 공개한다. PostgreSQL은 호스트 포트를 열지 않는다. PostgreSQL 자료와 `.local` 데이터를 각각 영구 볼륨에 저장한다. `.env`는 Git과 빌드 컨텍스트에서 제외한다.

## 실행과 종료

저장소 루트에서 `.env.example`을 복사해 `.env`를 만들고, 데이터베이스 암호는 64자리 16진수 값으로 바꾼다. 실제 모델 호출을 쓸 때 새 API 키를 로컬 `.env`에 넣는다.

```powershell
docker compose up --build -d
docker compose ps
Invoke-RestMethod http://127.0.0.1:8000/api/health
.\scripts\check-container.ps1
```

브라우저에서 http://127.0.0.1:8000을 열어 계획 생성, 근거 확인, 승인 또는 거절 흐름을 사용한다. 종료는 `docker compose down`이다. `docker compose down -v`는 DB와 실행 자료를 삭제한다.

## 최종 확인

- 웹 루트와 번들 JavaScript를 API 컨테이너가 제공한다.
- PostgreSQL 준비 상태 이후 API가 시작되고 `/api/health`가 연결 상태를 보고한다.
- 데모 정책 등록을 반복 호출해 정책 원문을 사용할 수 있다.
- 정상 실행계획 두 건이 컨테이너 안 Chromium에서 통과한다.
- OpenAI 키가 없을 때도 화면과 수동 계획 검사는 작동한다. 모델 계획 생성에는 교체한 유효 키가 필요하다.

## 한계

- 실제 OpenAI 응답과 모델 생성 계획 품질은 키를 안전하게 로컬에 설정하기 전까지 확인되지 않았다.
- 평가는 주문 데모 화면과 고정 정답 데이터에 한정한다. 컨테이너 검사는 배포 시작 경로와 정상 실행 두 건을 확인한다.
- Docker 이미지 태그는 메이저·마이너 계열로 지정했다. 재현 가능한 공급망 검증과 이미지 취약점 스캔은 이 범위에 포함하지 않았다.

Node 22 Alpine, Python 3.13 Slim, PostgreSQL 17 Alpine Docker Official Image 태그를 사용했다. [Node 공식 이미지](https://hub.docker.com/_/node), [Python 공식 이미지](https://hub.docker.com/_/python), [PostgreSQL 공식 이미지](https://hub.docker.com/_/postgres)
