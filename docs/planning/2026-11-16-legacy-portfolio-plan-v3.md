# 기존 화면을 유지하는 포트폴리오 보강 기획안

작성일: 2026-11-16

기준: `이전 버전/2026-11-04_115812/html`. 앞선 v1과 v2 시안은 채택하지 않는다. 원본 조사 내용은 [기존 사이트 확인 기록](2026-11-16-existing-site-audit.md)에 정리했다.

## 판단

원본은 큰 영문 제목, 넓은 여백과 얇은 선, 텍스트 행으로 경험을 보여주는 화면이다. 기술과 프로젝트에 정보를 추가하되, 이미 구성된 사진과 대화창, Profile, 프로젝트 목록을 새로운 템플릿으로 바꾸지 않는다.

페이지 순서도 유지한다.

Hero → Conversation → Profile과 Experience → Projects → Skills → Certificates 추가 → Contact

## 두 참고 사이트에서 가져올 부분

| 참고 | 적용할 정보 | 원본에 맞게 적용하는 방법 |
| --- | --- | --- |
| [배기영 포트폴리오](https://portfolio-2026-tau-five.vercel.app/) | 프로젝트마다 사용 기술을 바로 확인 | 기존 프로젝트 설명 아래에 핵심 기술 한 줄을 추가. 큰 썸네일이나 보기 전환은 추가하지 않음. |
| [정연희 포트폴리오](https://yeonhee7935.github.io/) | 자격증 이름과 날짜를 간결하게 표시 | 기존 Skills와 Contact 사이에 자격증 다섯 행 추가. 기존의 선과 텍스트 스타일 사용. |

## 1. 기존 프로젝트 행에 기술만 보강

원본의 번호 / 본문 / 화살표 구조와 행 전체 링크를 유지한다. 구분 배지, 제목과 설명도 유지한다. 설명 아래 12px 간격을 두고 핵심 기술을 12px 정도의 작은 태그로 한 줄 추가한다.

| 프로젝트 | 추가할 기술 | 기존 상세 연결 |
| --- | --- | --- |
| 공통 UI | Vue 3, TypeScript, Ant Design Vue, Storybook | `case-common-table.html` |
| CityWatch FE Lab | React, Next.js, TypeScript, OpenLayers | `case-citywatch.html` |
| Common Tester | React, Python, LangGraph, Playwright | `case-common-tester.html` |

메인에는 대표 기술만 표시하고 전체 기술과 상세 역할은 이미 존재하는 상세 페이지에서 읽도록 한다. GitHub 링크도 기존 상세에서 제공한다. 행 안에 별도 링크를 넣어 클릭 구조를 복잡하게 만들지 않는다.

현재 상세에는 공통 UI의 사용 예와 Storybook 가이드, CityWatch의 X-Ray와 기술 실습, Common Tester의 생성 흐름과 실행 결과가 있다. 이를 읽은 뒤 필요한 정보만 메인으로 올린다. 실무 전체를 전담했다고 확대하거나 확인되지 않은 성과 수치를 추가하지 않는다.

## 2. 기술 분류를 유지하고 문자열을 읽기 쉽게 변경

회사 실무 / CityWatch / Common Tester 구분은 이미 기술을 사용한 맥락을 설명한다. 이 구분과 기술명 전체를 유지한다. 현재 슬래시로 연결된 텍스트만 줄바꿈 가능한 작은 태그로 바꾼다.

| 원본 분류 그대로 | 기술명 그대로 |
| --- | --- |
| 회사 실무 | React, Vue 3, TypeScript, Ant Design Vue, pnpm, Nx, Storybook |
| CityWatch | React, Next.js, TypeScript, Redux, OpenLayers, Module Federation |
| Common Tester | React, Python, LangGraph, RAG, Playwright |

큰 아이콘 격자, 새 탭, 숙련도 수치와 추가 카테고리는 필요하지 않다. 왼쪽 200px 분류 열과 오른쪽 기술 열, 행을 나누는 얇은 선을 유지한다. 태그 배경은 기존 배지와 어울리는 아주 옅은 색으로 둔다. 기존 모바일처럼 700px 이하에서는 분류와 기술을 위아래로 표시한다.

## 3. 자격증 다섯 행 추가

제목은 기존 섹션 제목과 같은 산세리프 스타일의 `Certificates.`로 둔다. 왼쪽에 이름, 오른쪽에 취득월을 배치한 단순한 목록으로 구성한다. 큰 배경 상자나 증서 이미지 없이 얇은 가로선만 사용한다.

| 자격증 | 취득월 | 확인 근거 |
| --- | --- | --- |
| ADsP | 2026.11 | 사용자가 이번 11월 취득이라고 답변 |
| CKA | 2026.01 | 기존 archive 백업 기록 |
| SQL개발자(SQLD) | 2025.04 | 기존 archive 백업 기록 |
| 리눅스마스터 2급 | 2023.07 | 기존 archive 백업 기록 |
| 정보처리기사 | 2021.08 | 기존 archive 백업 기록 |

기존 네 자격증은 `archive/index.original.backup.html`에 기록된 명칭과 날짜다. 이 자료는 증서 확인을 뜻하지 않는다. 실제 게시 전 기존 기록과 현재 유효 여부를 확인한다. 화면에 증서 번호를 넣지 않는다.

## 유지할 부분

- Hero 원문과 사진 크롭, 카드 크기, 이름의 em 스타일 및 사진 링크 동작.
- 대화형 소개의 세 문답, 입력창과 Profile 구성.
- Experience 세 행과 경력 상세 연결.
- Projects의 원래 텍스트 행과 설명, 단일 상세 링크.
- Skills의 사용처별 세 분류와 전체 기술명.
- 기존 1180px 폭, 섹션 간격 130px, 제목 최대 88px, 모바일 기준.
- Contact와 Footer.

## 구현 순서와 확인 기준

1. 구프로젝트 원본을 복사한 검토용 파일에서 시작한다. 이번 기획 단계에서 실제 메인은 수정하지 않는다.
2. 프로젝트 태그를 추가한다. 행 전체 링크와 키보드 포커스가 유지되는지 확인한다.
3. Skills 문자열만 태그로 바꾼다. 기술명 누락과 가로 넘침을 확인한다.
4. Certificates 다섯 행을 추가한다. 이름과 취득월을 확인한다.
5. 1440px과 390px에서 비교한다. 기존 상단과 Profile의 DOM, 스타일 및 동작에 변화가 없는지 확인한다.

실제 구현 시에는 기존 정적 HTML/CSS로 충분하다. 요청된 Ponytail full 기준을 따르며, 새 프레임워크나 추상화, 테스트 도구는 추가할 필요가 없다.

## 시안

시안은 원본 소스의 레이아웃 수치와 문구를 반영한 보강 영역 이미지다. 실제 실행 화면 캡처는 아니다. 변경하지 않을 상단을 생성 도구로 다시 그리지 않는다. Projects, Skills, Certificates와 기존 Contact가 이어지는 부분만 보여준다.

내장 image_gen으로 생성했고 프롬프트는 `2026-11-16-legacy-portfolio-image-prompts-v3.md`에 기록했다.

최종 파일: `portfolio-v3/existing-layout-enhancement.png`. 생성 결과의 프로젝트 배지가 별도 열로 빠진 부분을 수정하여 원본처럼 본문 안에서 제목 위에 놓았다.
