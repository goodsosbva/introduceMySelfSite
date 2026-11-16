# 원본 구조 기준 최종 수정 프롬프트

도구: 내장 image_gen. 실제 브라우저 캡처가 아닌, 원본 HTML과 CSS의 수치 및 내용을 반영한 보강 영역 시안.

참조 근거: `2026-11-16-existing-site-audit.md`.

최종 배치 수정에는 아래 프롬프트를 사용했다. 초기 결과의 프로젝트 배지가 별도 열로 배치된 오류만 수정했다.

```text
Make one targeted layout edit to this portfolio webpage. Change ONLY the Projects rows. Currently each blue category badge sits in an extra separate column to the left of its title. Instead put each badge directly ABOVE its own title in the same content column, with a small 10px gap. Shift title, description and technology tokens left so they align with the badge's current left edge. Leave the narrow number column at far left and arrow column at far right. The three badges read 실무 / 공통 UI TF, 개인 프로젝트, 협업 / 테스트 생성기. Preserve all other text, colors, rules, sections, technology names, certificate dates, whitespace, Skills, Certificates and Contact exactly. No extra columns or cards. Keep image tall and otherwise unchanged.
```

```text
Use case: ui-mockup. Generate a very faithful MINIMAL MODIFICATION of a specific existing static Korean portfolio website described by its original CSS below. This is NOT a redesign. Do not introduce any structures not specified. Show ONLY the lower part of the existing site from Projects through Contact. No photo, hero, header, chat or Profile, because those are OUTSIDE the requested changes and must not be reimagined. A tall desktop page at approximately 1440px wide by 2300px high, straight-on screenshot, clean raster rendering with highly accurate Korean text. No device frame, no outside labels, no comparison board.

EXISTING CSS to reproduce: body white #fff; text #102849; muted text #596b82; fine horizontal rules #d8e2ed; blue #387ed4; tag fill #e4f1ff and tag text #2d6097. Centered .wrap width1180px at 1440px viewport, giving 130px margins each side. Font Malgun Gothic or Pretendard sans-serif. Body lineheight1.65. Section padding-top130px. Small uppercase kicker font11px weight800 letterspacing.16em color#5b7594. Section h2 font88px lineheight1.05 letterspacing-.06em, HEAVY SANS-SERIF NOT ITALIC, pale blue final dot #80b4ed. Project number is tiny italic Georgia15px in #8da0b5. The large title and whitespace are the only strong visual ornaments. No logo grids, no screenshots, no thumbnails, no illustrations, no large cards, no colored panels, no vertical rules, no shadows.

TOP: Projects section begins with kicker "SELECTED WORK", heading "Projects." and subtitle EXACT "만들고, 적용하고, 함께 사용한 기록입니다." font15 muted. Gap42px then top horizontal rule.
PROJECT ROWS: preserve original 3-column grid: 60px number / flexible text /32px arrow, gap18px. Project content begins x208px. Each row has32px top and bottom padding; entire row looks clickable, a single ↗ at far right aligned near title. No extra GitHub buttons or "read more" text.
Row01: tiny number01. Small blue rectangular rounded4px badge "실무 / 공통 UI TF". Title26px bold "공통 UI". Body15px EXACT "공통 UI TF에서 테이블과 버튼 개발 및 개선에 참여하고, Storybook 사용 가이드를 정리했습니다." Let text wrap naturally if needed. ONLY NEW element is one small subdued row of four text-only tokens under the description at gap12px: "Vue 3", "TypeScript", "Ant Design Vue", "Storybook". Tokens use very light blue-gray fill, subtle4px radius, font12px, height27px, no icons, no outlined pill overload. Bottom horizontal rule.
Row02 same layout number02, blue badge "개인 프로젝트", title "CityWatch FE Lab", body EXACT "여러 프론트엔드 기술을 직접 적용하고 구현 구조를 살펴보는 학습 프로젝트입니다.", NEW tokens "React", "Next.js", "TypeScript", "OpenLayers". Single ↗ right, bottom rule.
Row03 number03, badge "협업 / 테스트 생성기", title "Common Tester", body EXACT "협업에서 테스트 생성에 사용한 도구입니다. 요구사항 근거와 테스트, 실행 결과를 연결합니다.", NEW tokens "React", "Python", "LangGraph", "Playwright". Single ↗ right, bottom rule.

SKILLS section: maintain original130px whitespace above kicker "WHAT I USE", heading "Skills." same88px bold sans, gap36px then top horizontal rule. Preserve ORIGINAL THREE CONTEXT LABELS, NOT generic categories.
Rows grid200px left /1fr right,20px gap,22px vertical padding, lower fine rule. Label14px bold navy on left, no colored background:
"회사 실무" on left. Right SMALL TEXT TOKENS of "React", "Vue 3", "TypeScript", "Ant Design Vue", "pnpm", "Nx", "Storybook". Wrap naturally within960px, no icons. These are the EXACT existing technologies.
"CityWatch" on left. Right tokens "React", "Next.js", "TypeScript", "Redux", "OpenLayers", "Module Federation".
"Common Tester" on left. Right tokens "React", "Python", "LangGraph", "RAG", "Playwright".
Do not add descriptions, explanations, proficiency badges or generic Frontend/Workflow/Lab categories.

NEW CERTIFICATES SECTION:130px gap, kicker "CREDENTIALS", heading "Certificates."88px same style with blue period. Below36px gap then a simple full-width WHITE list with subtle blue-gray horizontal rules, no enclosing card or background panel, NO medals and NO icons. Each row58px height with14px bold name left and14px muted right-aligned date: "ADsP" "2026.11"; "CKA" "2026.01"; "SQL개발자(SQLD)" "2025.04"; "리눅스마스터 2급" "2023.07"; "정보처리기사" "2021.08". Exactly five, no other certificates. Keep plain and concise.

EXISTING Contact bottom:130px gap, kicker "GET IN TOUCH", heading "Let's talk." same bold sans88px, sentence "함께 일할 이야기가 있다면 편하게 연락해 주세요." at25px gap, email "goodsosbva@naver.com ↗" font27px underlined with navy thin border. Footer can be below the crop, do not shrink all content to fit.
IMPORTANT: Original full-width text ROW layout, EXACT original Korean content, original context-based Skills labels, generous130px section spacing. The only additions are project technology tokens and five certificate rows. This must look like a minimally enhanced ORIGINAL personal website, not an invented portfolio template. No photo, no thumbnail, no colored box behind categories.
```
