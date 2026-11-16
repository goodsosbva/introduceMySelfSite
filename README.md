# 권현성 자기소개 사이트

프론트엔드 개발자 권현성의 경력과 작업을 소개하는 사이트입니다. 저장소 루트에는 Next.js 앱이 있고, HTML 개편본에는 Kubernetes 운영과 배포 대응 업무도 담았습니다.

## HTML 개편본 구성

- **Profile:** 소개와 이력
- **Experience:** 오케스트로, 카수리, 뉴스젤리에서 맡은 업무
- **Projects:** 프론트엔드 프로젝트 3개와 프론트엔드 외 업무 사례 3개. 각 카드를 누르면 상세 내용을 볼 수 있습니다.
- **Skills:** 화면 개발과 운영 업무에 사용한 주요 기술
- **Certificates:** ADsP, CKA, SQLD, 리눅스마스터 2급, 정보처리기사
- **Contact:** 이메일과 GitHub

## 사이트 실행

루트의 Next.js 앱은 다음 명령으로 실행합니다.

```bash
pnpm install
pnpm dev
```

브라우저에서 `http://localhost:3000`으로 접속합니다.

[HTML 개편본 열기](이전%20버전/2026-11-04_115812/html/index.html)

별도 설치 없이 위 파일을 브라우저에서 열 수 있습니다. 로컬 서버가 필요하면 저장소 루트에서 실행합니다.

```bash
python -m http.server 8000 --directory "이전 버전/2026-11-04_115812/html"
```

HTML 개편본을 서버로 열었을 때는 `http://localhost:8000`으로 접속합니다.
