# 혼합 시안 생성 프롬프트

도구: 내장 image_gen

편집 대상: `portfolio-v3/existing-layout-enhancement.png`

```text
Use case: ui-mockup. EDIT the provided portfolio proposal image into a tasteful hybrid with two Korean portfolio references. The input image is the BASE DESIGN and EDIT TARGET. Preserve its white background, navy #102849, blue #387ed4 and pale blue accents, bold sans large English headings with blue periods, centered wide margins, generous editorial whitespace, font character, existing project names, all certificate names and dates, and exact contact information. The user's goal is to MIX IN stronger visual UI presentation, not just add text tags and not discard the original aesthetic. Produce a tall desktop webpage image around1440x2400, sharp Korean type, polished real-world achievable website design, no device frame or perspective.
Keep section ORDER: Projects, Skills, Certificates, Contact. No header, hero, chat or Profile, those are retained elsewhere unchanged.

PROJECTS: keep the existing large "Projects." title, small SELECTED WORK kicker and subtitle. Evolve the three plain text rows into elegant expandable project rows inspired by editorial thumbnail-and-role cards plus simple resume accordions. First project OPEN, other two CLOSED. Keep thin blue-gray dividing rules, small01/02/03 numbers, pale blue category labels and bold titles.

OPEN01 "공통 UI": the summary header has number01, badge "실무 / 공통 UI TF", bold title "공통 UI", one line "여러 업무 화면에서 함께 사용하는 테이블과 버튼", a small upward chevron on far right. Below header a subtle very pale blue-gray rounded12px panel, arranged 40% left preview /60% right information, about250px high. Left shows a nicely designed authentic-feeling Storybook component documentation screenshot: tiny left navigation and a clean table, white, blue UI accents, visibly labeled "구성 예시". Right short heading "담당한 일", text "테이블과 버튼 개발 및 개선 참여", second small heading "함께 쓰기 위한 정리", text "Storybook 사용 가이드와 공통 UI 사용 예", line of small neutral pill chips "Vue 3", "TypeScript", "Ant Design Vue", "Storybook". At bottom a modest dark-navy outline action "상세 기록 보기 ↗". This is a visual reconstruction of existing work, not fake performance claims.
CLOSED02 horizontal summary: number02, badge "개인 프로젝트", title "CityWatch FE Lab", one line "도시 안전 관제 화면에서 기술과 코드 연결을 탐색", small muted tags "React" "Next.js" "OpenLayers", down chevron far right. No large hidden content shown.
CLOSED03 same summary: number03, badge "협업 / 테스트 생성기", title "Common Tester", one line "요구사항의 근거부터 생성된 테스트와 실행 결과까지", small tags "React" "Python" "LangGraph" "Playwright", down chevron. No hidden content shown. Do not add fake dates, status or metrics.

SKILLS: preserve original big "Skills." heading and WHAT I USE kicker and generous gap above. Replace the old plain three-row list with one purposeful interactive-looking tab section inspired by https://portfolio-2026-tau-five.vercel.app/ skill section:
A horizontal thin-bottom-rule text tab bar with labels EXACT "회사 실무", "CityWatch", "Common Tester". Active "회사 실무" uses navy text weight700 and blue underline; other labels muted. The labels are the ORIGINAL USER'S contexts, not generic Frontend/Backend.
Under tabs a softly blue outlined summary panel with heading "이 기술로 해온 일", and two short lines "업무 화면과 공통 UI 개발" / "컴포넌트 사용 가이드와 모노레포 구성". Avoid middle-dot glyph; use line breaks.
Below a neat 4-column by2-row icon tile GRID, 7 technologies, subtle border cells like an understated shared rounded12px container. Each tile has a recognizable tech logo centered above its name; consistent logo sizes around40px, sufficient whitespace. Technologies exactly "React", "Vue 3", "TypeScript", "Ant Design Vue", "Storybook", "pnpm", "Nx"; eighth cell left empty and unobtrusive. Logos use their authentic colors as small accents only. Tiles have white backgrounds with faint gray separators, not oversized bouncy cards. This section should be VISIBLY richer than input but match navy and white personal portfolio.

CERTIFICATES: preserve large sans "Certificates." title and small CREDENTIALS kicker. Borrow the simple compact credential rows from https://yeonhee7935.github.io/: use a very pale cool-gray rounded16px section body, with five clean WHITE slightly rounded10px rows and comfortable spacing. On each row name left in navy, date aligned right in muted slate. EXACT "ADsP" — "2026.11"; "CKA" — "2026.01"; "SQL개발자(SQLD)" — "2025.04"; "리눅스마스터 2급" — "2023.07"; "정보처리기사" — "2021.08". No medals, no seals, no certificate images. This should feel gentle, organized and concise. No claim about reference person's credentials.

CONTACT: retain original "GET IN TOUCH", big "Let's talk.", sentence "함께 일할 이야기가 있다면 편하게 연락해 주세요." and underlined "goodsosbva@naver.com ↗". Good whitespace.

Design synthesis: base site's original oversized navy typography and whitespace + reference A's understated underline tabs, capabilities panel and technology icon grid, and visual project preview + reference B's clean expandable summaries and softly rounded credential rows. Make the changes clear and beautiful, not a rigid table-only proposal, not a colorful dashboard, not a generic startup landing page. No gradients, no purple, no3D, no huge shadows, no fabricated skills or qualifications. Exact readable Korean text.
```
