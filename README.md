# 권현성 자기소개 사이트

앞으로 전환할 React 사이트와 계속 업데이트할 기존 HTML 사이트를 분리했습니다.

| 폴더 | 용도 | 수정 기준 |
| --- | --- | --- |
| [`react/`](react/) | React, Next.js 전환 작업 | 새 화면과 React 코드는 여기서 개발 |
| [`legacy/html/`](legacy/html/) | 계속 유지보수하는 기존 HTML 사이트 | 현재 소개, 경력, 프로젝트 내용은 여기서 수정 |
| [`archive/`](archive/) | 과거 사본과 이전 작업 보관 | 비교와 참고용 |
| [`docs/`](docs/) | 기획, 조사, 이미지 시안, 검증 기록 | 공통 문서 관리 |

```text
자기소개 사이트/
├── react/                   React 전환 작업
│   ├── app/
│   ├── components/
│   ├── styles/
│   ├── public/
│   └── package.json
├── legacy/                  계속 업데이트할 기존 사이트
│   └── html/
│       ├── index.html
│       ├── career-*.html
│       ├── case-*.html
│       └── assets/
├── archive/                 과거 버전 보관
└── docs/                    기획과 참고 자료
```

## 기존 HTML 사이트 보기

[현재 유지보수하는 사이트 열기](legacy/html/index.html)

설치 없이 파일을 브라우저에서 열 수 있습니다. 로컬 서버를 쓰려면 저장소 루트에서 실행합니다.

```bash
python -m http.server 8000 --directory legacy/html
```

접속 주소는 `http://localhost:8000`입니다. 예전에 `이전 버전/2026-11-04_115812/html/`에서 수정하던 최신 파일이 이곳으로 이동했습니다. 폴더 이름이 legacy여도 업데이트 대상입니다.

## React 사이트 실행

```bash
cd react
pnpm install --frozen-lockfile
pnpm dev
```

접속 주소는 `http://localhost:3000`입니다. 빌드와 코드 검사도 `react/`에서 각각 `pnpm build`, `pnpm lint`로 실행합니다. 전환 진행 상태는 [React 작업 안내](react/README.md)에 정리했습니다.

## 내용 업데이트 기준

기존 사이트의 내용 변경은 `legacy/html/`을 기준으로 진행하고, React로 옮긴 화면에도 필요한 내용을 반영합니다. 두 사이트는 아직 별도 구현이므로 수정 내용이 자동으로 동기화되지는 않습니다. 과거 사본에 새 내용을 작성하지 않습니다.

기존 루트 `html/`에서 수정 중이던 세 파일은 내용을 그대로 [archive/html-root/](archive/html-root/)에 보존했습니다. 이전 경로와 새 경로는 [보관 안내](archive/README.md)에서 확인할 수 있습니다.

`git-simulation/`은 별도 Git 연습 저장소이고, `.codex-temp/`는 참고 작업 자료입니다. 사이트 소스와 별개로 유지합니다.
