# 이미지 시안 생성 기록

도구: 내장 image_gen

유형: ui-mockup

시안 용도: 구프로젝트 개선 기획의 화면 구성 검토. 실제 구현 화면이 아님.

초기 생성 프롬프트. 사용자 피드백으로 미채택:

```text
Use case: ui-mockup
Asset type: high fidelity Korean frontend developer portfolio redesign proposal, a single tall desktop webpage screenshot, approximately 1536 by 2560, flat front-on, crisp readable UI, no device frame or perspective.
Primary request: Show a thoughtful incremental evolution of Kwon Hyunseong's existing portfolio. Preserve its white background, navy ink #102849, medium blue #387ed4, pale blue #edf5ff, generous editorial whitespace, large English section titles with small blue periods, light divider rules, and subtle italic Georgia accents. This is a feasible static HTML/CSS site, minimal standard functionality, restrained and professional.
Typography: clean Pretendard-like Korean sans, readable Korean labels and sharp English technical names. Exact Korean text below; do not invent additional body paragraphs. No middle dot character.
Layout: wide desktop content centered, very slim top navigation, short elegant hero, short three-row experience list, a Skills section, a Projects section with three compact image-and-text horizontal rows, a compact Certifications section, Contact footer. Allocate most vertical space to Skills and Projects, with each project about 230px high. Large section headings around 54px, clearly subordinate descriptions. No huge blank areas between sections.

Top navigation: GitHub on left, underlined KHS in center, menu "프로필  기술  프로젝트  자격증  연락" on right.
Hero: large pale blue italic background word "Portfolio"; no invented portrait, instead a tiny typographic "KHS" stamp. Korean headline in two lines exactly "사용자에게는 편리한 화면을," and "동료에게는 함께 쓰기 좋은 구조를." Supporting line "프론트엔드 개발자 권현성입니다." Two compact links "프로젝트 보기 ↓" and "GitHub ↗".
Profile area: small "Experience." header and three thin-divider rows: "오케스트로" / "공통 UI와 클라우드 관리 화면" / "2023.09 — 현재"; "카수리" / "정비 서비스와 예약 화면" / "2023.02 — 2023.08"; "뉴스젤리" / "꼬맨틀 화면의 Vue 전환" / "2022.12 — 2023.01".

Skills section: small kicker "WHAT I USE", heading "Skills." and subtitle "기술 이름보다, 어떻게 사용했는지를 보여줍니다." Three restrained horizontal category rows, aligned. Row 1 "Frontend", tiny label "실무 / 프로젝트", wrapping small outlined chips with subtle tech icons and names "Vue 3", "React", "TypeScript", "Next.js", "Ant Design Vue", "Redux"; caption "업무 화면과 공통 UI, 개인 프로젝트에 적용". Row 2 "UI & Workflow", label "실무 사용", chips "Storybook", "pnpm", "Nx"; caption "공통 컴포넌트와 사용 가이드, 모노레포". Row 3 "Project Lab", label "프로젝트 적용", chips "OpenLayers", "Module Federation", "Playwright", "Python", "LangGraph", "RAG"; caption "지도와 모듈 연결, 근거 기반 테스트 생성". Tech chips have text with muted blue or gray logo symbols, no percentage proficiency bars or stars.

Projects: kicker "SELECTED WORK", heading "Projects.", subtitle "만들고, 적용하고, 함께 사용한 기록".
Three horizontal project rows with a 37% width pale-blue screenshot-style illustrative thumbnail on left and 63% concise content on right. Thumbnails are illustrative reconstructions, each visibly labeled "구성 예시", never pretend to be actual screenshots.
1. tiny badge "실무 / 공통 UI TF", title "공통 UI", description "반복되는 업무 화면을 일관되게", contribution text "테이블과 버튼 개발 및 개선 참여", chips "Vue 3", "TypeScript", "Storybook", "Nx"; small takeaway "컴포넌트 재사용과 사용 가이드"; link "상세 보기 ↗". Thumbnail shows a clean UI component library with left documentation sidebar and a table preview, white and pale blue.
2. badge "개인 프로젝트", title "CityWatch FE Lab", description "화면과 코드를 연결하는 프론트엔드 실험실", contribution text "도시 안전 관제 화면과 기술 실습 구현", chips "React", "Next.js", "OpenLayers", "Module Federation"; small takeaway "지도와 상태 공유, X-Ray 기술 탐색"; links "상세 보기 ↗" and "GitHub ↗". Thumbnail shows an abstract city map dashboard with navy sidebar, a few blue markers, compact data cards. Label "구성 예시".
3. badge "협업 / 테스트 생성기", title "Common Tester", description "요구사항 근거부터 테스트 실행 결과까지", short text "근거, 생성 코드, 실행 결과를 이어서 확인", chips "React", "Python", "LangGraph", "Playwright"; takeaway "테스트 생성과 실행 결과 확인"; links "상세 보기 ↗" and "GitHub ↗". Thumbnail is a restrained test tool dashboard with left run list, code excerpt and result panel, no fabricated success statistics. Label "구성 예시".

Certifications: kicker "LEARNING & CREDENTIALS", heading "Certifications.", subtitle "자격증". Compact pale blue-gray section with four white rows, name aligned left and acquisition date aligned right: "CKA" — "2026.01"; "SQL개발자(SQLD)" — "2025.04"; "리눅스마스터 2급" — "2023.07"; "정보처리기사" — "2021.08". Small footnote "기존 백업 기록 기준". No fake issuer logos, no medal illustrations, no credential IDs.

Footer: "Let's talk." and small "GitHub ↗" / "티스토리 ↗", bottom thin line "© 2026 권현성".
Small unobtrusive top corner label "개선 기획 시안".
Constraints: High fidelity professional webpage with exact clean Korean text and correct technical names. Preserve navy/blue existing style; no gradients, no purple, no large decorative illustrations, no dark mode, no 3D, no excessive rounded floating cards, no browser chrome, no invented performance metrics, no additional qualifications, no portrait. This is a visual proposal, not a slide deck.
```
