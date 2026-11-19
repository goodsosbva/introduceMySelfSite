# 포트폴리오 Next.js 전환

기존 HTML 포트폴리오의 메인 화면을 Next.js App Router와 React, TypeScript로 옮기는 중간 작업입니다.

## 실행

```bash
pnpm install --frozen-lockfile
pnpm dev
```

터미널에 표시된 주소에서 화면을 확인합니다. 코드 검사는 `pnpm lint`로 실행합니다.

## 현재 범위

- 메인 화면을 영역별 React 컴포넌트로 구성했습니다.
- 기존 스타일을 전역 CSS와 메인 화면 CSS Modules로 나누었습니다.
- 대화 입력에는 React Hook Form과 Zod 검증을 적용했습니다. 답변은 준비 중 안내 문구이며 실제 서버와 연결되지 않습니다.
- 경력과 프로젝트 상세 페이지는 아직 옮기지 않아 상세 링크가 동작하지 않습니다.

TanStack Query, 전역 상태 관리, React Testing Library, Playwright는 추후 필요한 단계에서 적용할 예정입니다.
