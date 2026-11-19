# 계속 유지보수하는 기존 사이트

이 폴더는 과거 파일 보관함이 아닙니다. React 전환과 별개로 내용과 화면을 계속 업데이트하는 HTML 사이트입니다.

[사이트 열기](html/index.html)

| 수정 대상 | 파일 |
| --- | --- |
| 메인 소개, 경력 요약, 프로젝트, 기술, 자격증 | `html/index.html` |
| 경력 상세 | `html/career-*.html` |
| 프로젝트와 운영 업무 사례 | `html/case-*.html` |
| 스타일, 스크립트, 이미지 | `html/assets/`, `html/career-portfolio.css` |

저장소 루트에서 실행합니다.

```bash
python -m http.server 8000 --directory legacy/html
```

최근 작업의 기준이던 `이전 버전/2026-11-04_115812/html/`을 그대로 옮겼습니다. 내부 `html/archive/`에는 이 사이트가 원래 보관하던 이전 화면이 들어 있습니다. 새 내용은 `html/`의 현재 페이지에 반영합니다.

React 전환은 [react/](../react/)에서 진행합니다. 과거 다른 사본은 [archive/](../archive/)에서 비교할 수 있습니다.
