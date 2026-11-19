# React 전환 작업

Next.js App Router, React, TypeScript로 전환하는 사이트입니다. 소스, 설정, 패키지 파일을 이 폴더에서 함께 관리합니다.

```bash
cd react
pnpm install --frozen-lockfile
pnpm dev
```

위 명령은 저장소 루트에서 시작하는 기준입니다. 이미 이 폴더에 있다면 `cd react`는 생략합니다.

| 경로 | 역할 |
| --- | --- |
| `app/` | 페이지와 레이아웃 |
| `components/` | React 화면 구성 요소 |
| `styles/` | 전역 CSS와 CSS Modules |
| `public/` | 정적 파일 |
| `package.json`, `pnpm-lock.yaml` | 의존성과 실행 명령 |

`pnpm build`로 빌드하고 `pnpm lint`로 코드를 검사합니다.

현재 메인 화면을 옮긴 상태이며 경력과 프로젝트 상세 페이지는 아직 전환되지 않았습니다. 기존 HTML의 최신 내용이 모두 반영된 상태는 아닙니다. 내용과 화면을 옮길 때는 [유지보수 중인 HTML](../legacy/html/index.html)을 확인합니다.

자세한 구현 범위는 [NEXTJS.md](NEXTJS.md)를 참고합니다. Next.js 코드를 변경하기 전에는 [AGENTS.md](AGENTS.md)의 로컬 가이드 확인 지침을 따릅니다.
