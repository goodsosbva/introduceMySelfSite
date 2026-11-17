'use strict';

// 설명용 가상 데이터. 회사 컴포넌트의 실행 코드와 구분한다.
const demoSets = {
  members: {
    title: '구성원 목록', kind: '역할', states: ['활성', '대기', '비활성'],
    rows: [['김하나', '관리자', '활성'], ['이두리', '개발자', '대기'], ['박세준', '운영자', '활성'], ['최나래', '개발자', '비활성'], ['정다온', '기획자', '활성'], ['한새봄', '운영자', '대기'], ['윤가람', '개발자', '활성']]
  },
  devices: {
    title: '장비 목록', kind: '종류', states: ['정상', '점검', '중지'],
    rows: [['장비 A', '서버', '정상'], ['장비 B', '스토리지', '점검'], ['장비 C', '네트워크', '정상'], ['장비 D', '서버', '중지'], ['장비 E', '서버', '정상'], ['장비 F', '네트워크', '점검'], ['장비 G', '스토리지', '정상']]
  }
};

document.querySelectorAll('[data-demo]').forEach((root) => {
  const config = demoSets[root.dataset.demo];
  if (!config) return;
  const id = root.dataset.demo;
  let page = 1;
  let sortColumn = 0;
  let direction = 1;
  const collator = new Intl.Collator('ko');
  root.innerHTML = `<h3>${config.title}</h3><p class="caption">가상 데이터 / 같은 예시 코드로 구성</p><div class="demo-toolbar"><div><label for="${id}-search">${config.title} 검색</label><input id="${id}-search" type="search" placeholder="이름으로 검색" autocomplete="off"></div><div><label for="${id}-state">${config.title} 상태</label><select id="${id}-state"><option value="">전체 상태</option>${config.states.map(s => `<option>${s}</option>`).join('')}</select></div></div><div class="table-scroll" role="region" tabindex="0" aria-label="${config.title} 테이블"><table class="data-table"><caption class="sr-only">${config.title} — 가상 데이터</caption><thead><tr>${['이름', config.kind, '상태'].map((s, i) => `<th scope="col"><button type="button" data-sort="${i}" aria-label="${config.title} ${s} 정렬">${s} <span aria-hidden="true">↕</span></button></th>`).join('')}</tr></thead><tbody></tbody></table></div><div class="demo-pager"><span class="demo-status" role="status" aria-live="polite"></span><div><button type="button" data-prev aria-label="${config.title} 이전 페이지">←</button><span class="page-number"></span><button type="button" data-next aria-label="${config.title} 다음 페이지">→</button></div><label class="page-size">행 수 <select aria-label="${config.title} 페이지당 행 수"><option value="3">3개</option><option value="5">5개</option></select></label></div>`;
  const search = root.querySelector('input');
  const state = root.querySelector(`#${id}-state`);
  const size = root.querySelector('.page-size select');
  const tbody = root.querySelector('tbody');
  const previous = root.querySelector('[data-prev]');
  const next = root.querySelector('[data-next]');

  function render() {
    const query = search.value.trim().toLocaleLowerCase('ko');
    const rows = config.rows.filter(row => row[0].toLocaleLowerCase('ko').includes(query) && (!state.value || row[2] === state.value));
    rows.sort((a, b) => direction * collator.compare(a[sortColumn], b[sortColumn]));
    const limit = Number(size.value);
    const pages = Math.max(1, Math.ceil(rows.length / limit));
    page = Math.min(Math.max(1, page), pages);
    tbody.replaceChildren();
    rows.slice((page - 1) * limit, page * limit).forEach(row => {
      const tr = document.createElement('tr');
      row.forEach((value, index) => {
        const td = document.createElement('td');
        if (index === 2) {
          const tag = document.createElement('span');
          tag.className = 'state-tag state-' + config.states.indexOf(value);
          tag.textContent = value;
          td.append(tag);
        } else td.textContent = value;
        tr.append(td);
      });
      tbody.append(tr);
    });
    if (!rows.length) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = 3;
      td.className = 'empty-result';
      td.textContent = '조건에 맞는 데이터가 없습니다.';
      tr.append(td); tbody.append(tr);
    }
    root.querySelector('.demo-status').textContent = `총 ${rows.length}개`;
    root.querySelector('.page-number').textContent = `${page} / ${pages}`;
    previous.disabled = page === 1;
    next.disabled = page === pages;
    root.querySelectorAll('[data-sort]').forEach(button => {
      const selected = Number(button.dataset.sort) === sortColumn;
      button.parentElement.setAttribute('aria-sort', selected ? (direction === 1 ? 'ascending' : 'descending') : 'none');
      button.querySelector('span').textContent = selected ? (direction === 1 ? '↑' : '↓') : '↕';
    });
  }
  search.addEventListener('input', () => { page = 1; render(); });
  state.addEventListener('change', () => { page = 1; render(); });
  size.addEventListener('change', () => { page = 1; render(); });
  root.querySelectorAll('[data-sort]').forEach(button => button.addEventListener('click', () => {
    const column = Number(button.dataset.sort);
    direction = column === sortColumn ? -direction : 1;
    sortColumn = column; page = 1; render();
  }));
  previous.addEventListener('click', () => { page -= 1; render(); });
  next.addEventListener('click', () => { page += 1; render(); });
  render();
});
