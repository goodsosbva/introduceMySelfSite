# Common Tester 단계별 구현 기록

완료한 단계의 설계 선택, 실제 구현, 검증 결과를 여기에 순서대로 모읍니다.

| 단계 | 구현 기록 | 완료 결과 |
| --- | --- | --- |
| 1 | [프로젝트 기반과 실행계획 형식](01-foundation.md) | React, FastAPI, PostgreSQL 연결 |
| 2 | [Python Playwright 실행기](02-playwright-runner.md) | 정상 화면 2건 통과, 결함 화면 1건 실패 감지 |
| 3 | [정책 검색과 근거 연결](03-policy-retrieval.md) | 한국어 질문 5개 Top-1 5/5, 버전 격리와 근거 검증 |
| 4 | [모델 도구 호출과 계획 생성](04-tool-calling.md) | 모의 모델로 도구 3종과 저장 흐름 검증, 실제 API 호출 대기 |
| 5 | [LangGraph 검토 및 실행 흐름](05-langgraph-workflow.md) | 1회 보정, PostgreSQL 체크포인트 재개, 승인과 거절, 브라우저 실행 검증 |
| 6 | [React 검토 및 실행 화면](06-react-workspace.md) | 화면에서 계획과 정책 원문 검토, 승인·거절, 결과와 실패 증거 확인 |
| 7 | [검색·계획·브라우저 품질 평가](07-quality-evaluation.md) | 검색 Top-1 24/24, 계획 검증 16/16, 브라우저 시나리오 17/17, Playwright 케이스 20개 |
| 8 | [최종 실행과 제출](08-final-deployment.md) | Docker Compose 구성, 로컬 전용 포트, 저장 볼륨, 컨테이너 Chromium 확인 |

8단계까지 구현을 마쳤습니다. 실제 모델 호출이 확인되면 4~8단계 기록에 결과를 추가합니다.
