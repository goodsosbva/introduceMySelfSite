# 과거 버전 보관

현재 개발할 React 코드는 [react/](../react/), 계속 수정할 기존 사이트는 [legacy/html/](../legacy/html/)에 있습니다. 이곳의 파일은 과거 상태를 비교하기 위해 보관합니다.

| 이전 경로 | 새 경로 | 설명 |
| --- | --- | --- |
| 루트 `app/`, `components/`, `styles/`, `public/`, Next.js 설정과 패키지 파일 | `react/` | 앞으로 전환할 React 앱 |
| `이전 버전/2026-11-04_115812/html/` | `legacy/html/` | 최근까지 업데이트한 HTML, 계속 수정할 기준 |
| 루트 `html/` | `archive/html-root/` | 별도 HTML 사본, 정리 전 수정 중이던 세 파일 포함 |
| 기존 `legacy/` | `archive/legacy-original/` | 예전 HTML과 oldPortfolio 사본 |
| `2026-11-03/` | `archive/snapshots/2026-11-03/` | 날짜별 스냅샷 |
| `이전 버전/`의 나머지 파일 | `archive/snapshots/이전 버전/` | 사진 카드 적용 전 백업과 oldPortfolio |
| `nextjs-기존파일-보관/` | `archive/nextjs-starter/` | 초기 Next.js 안내 파일 |
| `pr-nextjs-migration/` | `archive/pr-nextjs-migration/` | 별도 Git 저장소인 이전 PR 작업 사본 |
| `wiki/` | `docs/wiki/` | 공통 참고 문서 |

`pr-nextjs-migration/`의 Git 기록은 그대로 유지했습니다. 기존부터 별도 저장소이므로 상위 저장소의 일반 파일과는 다르게 관리됩니다.

`html-root/index.html`, `html-root/career-experience.html`, `html-root/career-portfolio.html`은 정리 전에 커밋하지 않은 변경이 있었습니다. 최신 HTML에 덮어쓰지 않고 원문 그대로 이곳에 보존했습니다.
