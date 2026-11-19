import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = fileURLToPath(new URL('.', import.meta.url));
const ink = '#102849';
const muted = '#596b82';
const line = '#d8e2ed';
const blue = '#4166d5';
const pale = '#eaf4ff';
const esc = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const box = (x, y, w, h, fill = '#fff', stroke = 'none', radius = 0, extra = '') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}" ${extra}/>`;
const rule = (x1, y1, x2, y2, color = line, width = 1) =>
  `<path d="M${x1} ${y1}H${x2}" stroke="${color}" stroke-width="${width}"/>`;
const txt = (x, y, value, size = 18, weight = 400, color = ink, extra = '') =>
  `<text x="${x}" y="${y}" fill="${color}" font-size="${size}" font-weight="${weight}" ${extra}>${esc(value)}</text>`;
const label = (x, y, value, color = '#5b7594') =>
  txt(x, y, value, 12, 800, color, 'letter-spacing="2.1"');
const pill = (x, y, value, w, fill = '#f4f8fd', stroke = '#e0e8f3', color = muted) =>
  box(x, y, w, 34, fill, stroke, 7) + txt(x + w / 2, y + 22, value, 13, 600, color, 'text-anchor="middle"');
const svg = (width, height, body) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
<defs>
  <linearGradient id="mist" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#f4f9ff"/><stop offset="1" stop-color="#dcecff"/></linearGradient>
  <linearGradient id="night" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#183452"/><stop offset="1" stop-color="#102849"/></linearGradient>
  <filter id="shadow" x="-20%" y="-30%" width="140%" height="170%"><feDropShadow dx="0" dy="13" stdDeviation="20" flood-color="#102849" flood-opacity=".095"/></filter>
  <clipPath id="clipA"><rect x="666" y="494" width="598" height="332" rx="12"/></clipPath>
  <clipPath id="clipB"><rect x="666" y="918" width="598" height="332" rx="12"/></clipPath>
  <clipPath id="clipC"><rect x="666" y="1342" width="598" height="332" rx="12"/></clipPath>
</defs>
<style>text{font-family:Pretendard,'Apple SD Gothic Neo','Malgun Gothic',Arial,sans-serif} .serif{font-family:Georgia,serif;font-style:italic}</style>
${body}
</svg>`;

function header() {
  return box(0, 0, 1440, 86, '#fff') + rule(0, 85, 1440, 85, '#edf1f6') +
    txt(130, 55, 'GITHUB', 14, 700) +
    box(688, 20, 64, 45, '#fff', ink, 0, 'stroke-width="2"') +
    txt(720, 50, 'KHS', 21, 800, ink, 'text-anchor="middle" letter-spacing="2"') +
    txt(1024, 54, 'Profile', 14, 650) + txt(1124, 54, 'Projects', 14, 650, blue) + txt(1234, 54, 'Contact', 14, 650);
}

function previewPatch() {
  let s = box(666, 494, 598, 332, 'url(#mist)', 'none', 12);
  s += `<g clip-path="url(#clipA)">`;
  s += box(706, 529, 485, 270, '#fff', '#d7e5f3', 12, 'filter="url(#shadow)"');
  s += box(706, 529, 485, 44, '#f8fbff', 'none', 12);
  s += box(706, 561, 485, 12, '#f8fbff');
  s += box(725, 546, 9, 9, '#8db9ed', 'none', 5) + box(741, 546, 9, 9, '#c9def5', 'none', 5);
  s += label(770, 554, 'PATCH WORKLIST', '#466895');
  const rows = [
    ['01', '이미지 아티팩트 반입', '확인'],
    ['02', '워크로드 이미지 교체', '확인'],
    ['03', '배포 상태 점검', '확인'],
    ['04', '롤백 기준 기록', '문서'],
  ];
  rows.forEach((row, i) => {
    const y = 589 + i * 48;
    s += rule(727, y + 31, 1169, y + 31, '#eaf0f7');
    s += txt(728, y + 21, row[0], 12, 700, '#8aa2bd');
    s += txt(777, y + 21, row[1], 15, 650);
    s += box(1105, y + 1, 64, 26, i === 3 ? '#eef2f8' : '#e7f5ee', 'none', 13);
    s += txt(1137, y + 19, row[2], 11, 700, i === 3 ? '#6d7e93' : '#328965', 'text-anchor="middle"');
  });
  s += `</g>`;
  return s;
}

function previewGitops() {
  let s = box(666, 918, 598, 332, '#eaf1fb', 'none', 12);
  s += `<g clip-path="url(#clipB)">`;
  s += box(690, 943, 550, 285, '#fff', '#d7e2ee', 12, 'filter="url(#shadow)"');
  s += box(690, 943, 124, 285, '#172f4c', 'none', 12);
  s += box(802, 943, 12, 285, '#172f4c');
  s += label(713, 974, 'DEPLOY', '#d9eaff');
  ['Applications', 'Repositories', 'Settings'].forEach((item, i) => {
    const y = 1018 + i * 39;
    if (i === 0) s += box(703, y - 21, 99, 30, '#29496b', 'none', 5);
    s += txt(713, y, item, 10.5, 600, i === 0 ? '#fff' : '#9fb6d0');
  });
  s += label(839, 977, 'APPLICATION HEALTH', '#607995');
  s += txt(839, 1019, 'image-patch', 23, 750);
  s += box(1100, 996, 108, 30, '#e5f5ea', 'none', 15);
  s += txt(1154, 1016, 'Healthy', 12, 750, '#27865e', 'text-anchor="middle"');
  s += rule(838, 1045, 1208, 1045, '#e6edf6');
  s += txt(839, 1074, 'Repository', 12, 600, muted) + txt(1007, 1074, 'Connection checked', 12, 650);
  s += txt(839, 1110, 'Image pull', 12, 600, muted) + txt(1007, 1110, 'Credential reviewed', 12, 650);
  s += txt(839, 1146, 'Sync status', 12, 600, muted) + txt(1007, 1146, 'Deployment checked', 12, 650);
  s += box(839, 1173, 369, 36, '#f3f7fc', 'none', 5);
  s += txt(853, 1197, 'Argo CD / Harbor / Kubernetes', 12, 650, '#48627e');
  s += `</g>`;
  return s;
}

function previewGuide() {
  let s = box(666, 1342, 598, 332, '#eef4fa', 'none', 12);
  s += `<g clip-path="url(#clipC)">`;
  s += box(706, 1368, 489, 295, '#fff', '#dce5f0', 6, 'filter="url(#shadow)"');
  s += label(741, 1403, 'RUNBOOK', '#5e7da2');
  s += txt(741, 1446, '폐쇄망 이미지 패치 실행 가이드', 21, 750);
  s += rule(741, 1465, 1158, 1465);
  const rows = [
    ['01', '작업 전 확인', '환경과 이미지 정보'],
    ['02', '이미지 반입', '반입 순서와 점검 항목'],
    ['03', '배포 작업', '적용 명령과 상태 확인'],
    ['04', '문제 발생 시', '복구 및 보고 기준'],
  ];
  rows.forEach((r, i) => {
    const y = 1501 + i * 38;
    s += box(741, y - 17, 28, 27, '#e8f2ff', 'none', 5);
    s += txt(755, y + 2, r[0], 10, 800, blue, 'text-anchor="middle"');
    s += txt(784, y + 2, r[1], 14, 750);
    s += txt(1157, y + 2, r[2], 12, 400, muted, 'text-anchor="end"');
    s += rule(741, y + 12, 1158, y + 12, '#edf1f6');
  });
  s += `</g>`;
  return s;
}

function card(y, category, title, lines, skills, preview) {
  let s = box(130, y, 1180, 372, '#fff', '#dfe7f0', 18, 'filter="url(#shadow)"');
  s += label(170, y + 51, category, blue);
  s += txt(170, y + 108, title, 32, 760);
  lines.forEach((lineText, i) => { s += txt(170, y + 150 + i * 28, lineText, 16, 400, muted); });
  let x = 170;
  skills.forEach(([skill, w]) => { s += pill(x, y + 230, skill, w); x += w + 8; });
  s += txt(170, y + 321, '사례 자세히 보기', 16, 750, blue);
  s += txt(306, y + 321, '↗', 23, 400, blue);
  s += preview;
  return s;
}

function compactCard(x, y, category, title, description, skills, kind) {
  let s = box(x, y, 574, 535, '#fff', '#dfe7f0', 18, 'filter="url(#shadow)"');
  s += box(x + 20, y + 20, 534, 233, kind === 'gitops' ? '#eaf1fb' : '#eef4fa', 'none', 12);
  if (kind === 'gitops') {
    s += box(x + 47, y + 39, 480, 194, '#fff', '#d7e2ee', 9);
    s += box(x + 47, y + 39, 113, 194, '#172f4c', 'none', 9) + box(x + 150, y + 39, 10, 194, '#172f4c');
    s += label(x + 64, y + 67, 'DEPLOY', '#d8eaff');
    s += txt(x + 64, y + 109, 'Applications', 11, 700, '#fff');
    s += txt(x + 64, y + 143, 'Repositories', 10, 500, '#9fb6d0');
    s += label(x + 184, y + 69, 'APPLICATION HEALTH', '#607995');
    s += txt(x + 184, y + 107, 'image-patch', 20, 740);
    s += box(x + 417, y + 86, 89, 28, '#e5f5ea', 'none', 14) + txt(x + 461, y + 105, 'Healthy', 11, 700, '#27865e', 'text-anchor="middle"');
    s += rule(x + 184, y + 127, x + 506, y + 127, '#e6edf6');
    s += txt(x + 184, y + 160, 'Repository', 11, 500, muted) + txt(x + 325, y + 160, 'Connection checked', 11, 650);
    s += txt(x + 184, y + 195, 'Image pull', 11, 500, muted) + txt(x + 325, y + 195, 'Credential reviewed', 11, 650);
  } else {
    s += box(x + 73, y + 37, 431, 201, '#fff', '#dce5f0', 5);
    s += label(x + 102, y + 67, 'RUNBOOK', '#5e7da2');
    s += txt(x + 102, y + 106, '폐쇄망 이미지 패치 실행 가이드', 19, 740);
    s += rule(x + 102, y + 122, x + 475, y + 122);
    ['작업 전 확인', '이미지 반입', '배포 작업', '문제 발생 시'].forEach((v, i) => {
      const yy = y + 150 + i * 25;
      s += txt(x + 105, yy, `0${i + 1}`, 10, 700, blue);
      s += txt(x + 139, yy, v, 11, 650);
      s += rule(x + 103, yy + 7, x + 474, yy + 7, '#edf1f6');
    });
  }
  s += label(x + 29, y + 295, category, blue);
  s += txt(x + 29, y + 345, title, 27, 760);
  description.forEach((v, i) => { s += txt(x + 29, y + 384 + i * 26, v, 15, 400, muted); });
  let sx = x + 29;
  skills.forEach(([name, width]) => { s += pill(sx, y + 436, name, width); sx += width + 8; });
  s += txt(x + 29, y + 505, '사례 자세히 보기', 15, 750, blue) + txt(x + 162, y + 505, '↗', 22, 400, blue);
  return s;
}

let list = box(0, 0, 1440, 1585, '#fff') + header();
list += label(130, 174, 'SELECTED WORK');
list += txt(130, 273, 'Projects.', 88, 800, ink, 'letter-spacing="-5"');
list += txt(836, 243, '프론트엔드에서 시작해, 배포와 운영까지', 19, 600, ink);
list += txt(836, 275, '직접 맡은 문제를 작업별로 남깁니다.', 16, 400, muted);
list += box(130, 323, 126, 43, '#fff', '#dbe5f1', 7) + txt(193, 351, 'Frontend', 14, 700, muted, 'text-anchor="middle"');
list += box(268, 323, 178, 43, blue, blue, 7) + txt(357, 351, 'Beyond Frontend', 14, 750, '#fff', 'text-anchor="middle"');
list += txt(130, 414, 'Kubernetes 운영과 배포 대응, 기술지원에서 맡은 일을 소개합니다.', 18, 500, muted);
list += card(474, '실무   /   PLATFORM', '폐쇄망 Kubernetes 이미지 패치', [
  '외부 연결이 제한된 환경에서 이미지 반입부터 워크로드',
  '교체, 배포 확인과 롤백 기준까지 정리했습니다.'
], [['Kubernetes', 106], ['Linux', 61], ['Container Image', 139]], previewPatch());
list += label(130, 945, 'MORE CASES');
list += rule(270, 941, 1310, 941);
list += compactCard(130, 975, '실무   /   DEPLOYMENT', 'GitOps 배포 복구', [
  'Argo CD 저장소 연결과 Harbor 이미지 Pull 오류를',
  '분리해 확인하고 배포 상태를 점검했습니다.'
], [['Argo CD', 84], ['Harbor', 72], ['Kubernetes', 106]], 'gitops');
list += compactCard(736, 975, '실무   /   DOCUMENTATION', '패치 실행 가이드와 기술지원', [
  '다른 작업자가 같은 순서로 실행할 수 있도록',
  '작업 절차와 실패 시 대응을 문서화했습니다.'
], [['Runbook', 84], ['Technical Support', 145]], 'guide');
writeFileSync(join(out, 'beyond-frontend-list.svg'), svg(1440, 1585, list), 'utf8');

function detailFigure() {
  let s = box(130, 510, 1180, 495, '#eaf2fc', 'none', 16);
  s += box(182, 558, 1076, 403, '#fff', '#d9e5f2', 12, 'filter="url(#shadow)"');
  s += box(182, 558, 230, 403, '#183452', 'none', 12) + box(400, 558, 12, 403, '#183452');
  s += label(217, 602, 'DEPLOYMENT', '#bcd5f1');
  s += txt(218, 661, 'Applications', 17, 700, '#fff');
  s += txt(218, 709, 'Repositories', 16, 500, '#9fb6d0');
  s += txt(218, 757, 'Settings', 16, 500, '#9fb6d0');
  s += label(448, 603, 'GITOPS CASE  /  EVIDENCE AREA', '#58799d');
  s += txt(448, 665, '배포 상태 확인', 28, 750);
  s += box(1034, 630, 167, 40, '#e7f5ee', 'none', 20) + txt(1117, 657, '상태 확인', 14, 750, '#2b865e', 'text-anchor="middle"');
  s += rule(448, 691, 1202, 691);
  const rows = [
    ['저장소 연결', '접속 상태와 인증 설정 분리 확인'],
    ['이미지 Pull', 'Harbor 인증 오류와 권한 확인'],
    ['재배포', '변경 적용 후 워크로드 상태 확인'],
  ];
  rows.forEach((r, i) => {
    const y = 750 + i * 66;
    s += txt(448, y, r[0], 16, 700);
    s += txt(696, y, r[1], 15, 400, muted);
    s += rule(448, y + 20, 1202, y + 20, '#ebf0f6');
  });
  s += txt(130, 1033, '배포 상태 화면과 오류 로그는 공개 가능한 범위로 가려서 배치', 13, 400, muted);
  return s;
}

let detail = box(0, 0, 1440, 2130, '#fff') + header();
detail += txt(130, 147, '←  Beyond Frontend', 15, 700, blue);
detail += label(130, 210, '실무   /   DEPLOYMENT', blue);
detail += txt(130, 287, 'GitOps 배포 복구', 64, 800, ink, 'letter-spacing="-3"');
detail += txt(130, 345, '저장소 연결 문제와 이미지 Pull 오류를 구분해 확인한 배포 대응 기록', 20, 400, muted);
detail += rule(130, 391, 1310, 391);
detail += label(130, 433, 'MY ROLE') + txt(130, 465, '원인 분리, 설정 확인, 재배포 점검', 16, 650);
detail += label(659, 433, 'STACK') + txt(659, 465, 'Argo CD   /   Harbor   /   Kubernetes', 16, 650);
detail += detailFigure();
detail += label(130, 1126, '01  /  CONTEXT');
detail += txt(130, 1190, '문제를 어떻게 나눴는가', 35, 760);
detail += txt(130, 1234, '저장소 연결과 이미지 Pull은 배포 과정에서 이어지지만,', 17, 400, muted);
detail += txt(130, 1262, '확인해야 할 인증 정보와 실패 지점이 다릅니다.', 17, 400, muted);
detail += box(795, 1092, 515, 200, '#f5f9fe', '#e0eaf4', 14);
detail += label(830, 1131, 'CHECKPOINTS', '#5479a9');
detail += txt(830, 1176, '1   저장소 연결 상태 확인', 17, 650);
detail += txt(830, 1213, '2   Harbor 이미지 인증 확인', 17, 650);
detail += txt(830, 1250, '3   변경 적용 후 배포 상태 확인', 17, 650);
detail += rule(130, 1357, 1310, 1357);
detail += label(130, 1417, '02  /  DECISIONS');
detail += txt(130, 1480, '확인한 단서와 조치', 35, 760);
detail += txt(130, 1534, '한 가지 오류로 묶지 않고 단계별 상태를 확인했습니다.', 17, 400, muted);
detail += box(130, 1579, 568, 215, '#fff', '#dfe8f1', 13);
detail += label(163, 1617, 'REPOSITORY');
detail += txt(163, 1660, '저장소 연결', 23, 730);
detail += txt(163, 1701, '접속 및 인증 설정을 확인하고', 16, 400, muted);
detail += txt(163, 1728, '연결 실패 지점을 따로 기록', 16, 400, muted);
detail += box(742, 1579, 568, 215, '#fff', '#dfe8f1', 13);
detail += label(775, 1617, 'IMAGE REGISTRY');
detail += txt(775, 1660, 'Harbor 이미지 Pull', 23, 730);
detail += txt(775, 1701, '인증 오류와 이미지 경로를 확인하고', 16, 400, muted);
detail += txt(775, 1728, '수정 후 재배포 상태를 점검', 16, 400, muted);
detail += rule(130, 1860, 1310, 1860);
detail += label(130, 1915, '03  /  VERIFICATION');
detail += txt(130, 1978, '무엇으로 확인했는가', 35, 760);
detail += txt(130, 2025, '오류 로그, Argo CD 상태, 워크로드 상태를 순서대로 제시합니다.', 17, 400, muted);
detail += txt(130, 2090, '← Beyond Frontend 목록', 15, 700, blue);
detail += txt(1310, 2090, '다음 사례 보기  ↗', 15, 700, blue, 'text-anchor="end"');
writeFileSync(join(out, 'beyond-frontend-detail.svg'), svg(1440, 2130, detail), 'utf8');
