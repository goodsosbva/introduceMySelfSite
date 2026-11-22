(()=>{
  const root=document.getElementById('shared-table-case');
  if(!root)return;
  const graph=root.querySelector('[data-graph]');
  if(!graph)return;
  const svg=root.querySelector('[data-edges]'),nodes=new Map([...root.querySelectorAll('[data-node]')].map(link=>[link.dataset.node,link]));
  const pairs=[['device','table'],['log','table'],['table','filter'],['table','render'],['render','cell'],['table','rows'],['rows','render'],['page','rows'],['table','style']];
  const edges=pairs.map(([from,to],index)=>{
    const line=document.createElementNS('http://www.w3.org/2000/svg','line');
    line.classList.add('edge');
    if(index===7)line.classList.add('dashed');
    svg.append(line);
    return{
      from,to,line
    }
  });
  function draw(){
    const frame=graph.getBoundingClientRect();
    for(const edge of edges){
      const a=nodes.get(edge.from).getBoundingClientRect(),b=nodes.get(edge.to).getBoundingClientRect();
      edge.line.setAttribute('x1',a.left-frame.left+a.width/2);
      edge.line.setAttribute('y1',a.top-frame.top+a.height/2);
      edge.line.setAttribute('x2',b.left-frame.left+b.width/2);
      edge.line.setAttribute('y2',b.top-frame.top+b.height/2)
    }
  }
  draw();
  new ResizeObserver(draw).observe(graph)
})();
(()=>{
  const root=document.getElementById('shared-table-case');
  if(!root||!root.querySelector('[data-demo-controls]'))return;
  const parts={
    device:{
      title:'장비 목록',group:'usage',lead:'bodyCell 슬롯에 화면별 상태 셀을 넣습니다.',source:'DeviceTable.vue, SharedTable.vue'
    },
    log:{
      title:'로그 조회',group:'usage',lead:'sort-change를 서버 조회 조건으로 연결합니다.',source:'LogTable.vue, SharedTable.vue'
    },
    table:{
      title:'SharedTable.vue',group:'usage',lead:'props, 슬롯, 이벤트를 한 진입점에 연결합니다.',source:'SharedTable.vue, DeviceTable.vue, LogTable.vue'
    },
    filter:{
      title:'검색과 필터',group:'flow',lead:'원본 행을 거른 뒤 정렬과 표시 행 계산으로 넘깁니다.',source:'SharedTable.vue'
    },
    render:{
      title:'표 렌더링',group:'flow',lead:'가공한 열과 표시 행을 a-table에 전달합니다.',source:'SharedTable.vue'
    },
    rows:{
      title:'표시할 행',group:'flow',lead:'서버 데이터, 페이지 UI 설정, 현재 페이지 순으로 분기합니다.',source:'SharedTable.vue'
    },
    page:{
      title:'페이지 이동',group:'flow',lead:'공통 페이지 UI가 현재 페이지와 페이지 크기를 갱신합니다.',source:'SharedTable.vue'
    },
    cell:{
      title:'셀 렌더링',group:'presentation',lead:'셀 타입의 기본 표현을 통일하고 custom 슬롯을 열어 둡니다.',source:'TableBodyCell.vue, DeviceTable.vue'
    },
    style:{
      title:'공통 스타일',group:'presentation',lead:'테이블 SCSS의 간격, 경계선, 배경 토큰을 공통으로 적용합니다.',source:'SharedTable.vue, shared-table.scss'
    }
  };
  const state={
    part:'device',deviceActive:true,logDesc:true,usage:'device',keyword:'',sortDesc:false,mode:'on',current:1,cellType:'status',styleFocus:'header'
  };
  const controls=root.querySelector('[data-demo-controls]');
  const view=root.querySelector('[data-demo-view]');
  const readout=root.querySelector('[data-demo-readout]');
  const note=root.querySelector('[data-demo-note]');
  const code=root.querySelector('[data-code]');
  const codeTokens=/\/\/[^\n]*|<\/?[A-Za-z][\w-]*|--[\w-]+|[:#@A-Za-z][\w:-]*(?==)|@use\b|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:const|return|if|true|false|undefined|null)\b/g;
  function highlightCode(){
    const source=code.textContent;
    const fragment=document.createDocumentFragment();
    let cursor=0;
    for(const match of source.matchAll(codeTokens)){
      const token=match[0];
      if(match.index>cursor)fragment.append(document.createTextNode(source.slice(cursor,match.index)));
      const span=document.createElement('span');
      span.className=token.startsWith('//')?'syntax-comment'
        :token.startsWith('<')?'syntax-tag'
        :token.startsWith('--')?'syntax-token'
        :source[match.index+token.length]==='='?'syntax-attribute'
        :token==='@use'?'syntax-directive'
        :token.startsWith('"')||token.startsWith("'")?'syntax-string'
        :'syntax-keyword';
      span.textContent=token;
      fragment.append(span);
      cursor=match.index+token.length;
    }
    fragment.append(document.createTextNode(source.slice(cursor)));
    code.replaceChildren(fragment);
  }
  function table(headers,rows){
    const head=headers.map(value=>`<th scope="col">${value}</th>`).join('');
    const body=rows.map(row=>`<tr>${row.map(value=>`<td>${value}</td>`).join('')}</tr>`).join('');
    return `<table class="demo-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
  }
  function modeButtons(){
    return `<button type="button" data-action="mode-on" aria-pressed="${state.mode==='on'}">페이지 켬</button>
      <button type="button" data-action="mode-off" aria-pressed="${state.mode==='off'}">페이지 끔</button>
      <button type="button" data-action="mode-server" aria-pressed="${state.mode==='server'}">서버 데이터</button>`;
  }
  function renderControls(){
    const group=parts[state.part].group;
    if(group==='usage'){
      if(state.part==='device')controls.innerHTML='<button type="button" data-action="device-status">장비 상태 바꾸기</button>';
      else if(state.part==='log')controls.innerHTML='<button type="button" data-action="log-sort">시간 정렬 방향 바꾸기</button>';
      else controls.innerHTML=`<button type="button" data-action="usage-device" aria-pressed="${state.usage==='device'}">장비 예시</button><button type="button" data-action="usage-log" aria-pressed="${state.usage==='log'}">로그 예시</button>`;
    } else if(group==='flow'){
      if(state.part==='filter')controls.innerHTML='<label for="shared-demo-keyword">예시 행 검색</label><input id="shared-demo-keyword" type="search" placeholder="항목 번호 검색">';
      else if(state.part==='page')controls.innerHTML='<button type="button" data-action="prev-page">이전</button><button type="button" data-action="next-page">다음</button>';
      else controls.innerHTML=modeButtons();
    } else if(state.part==='cell')controls.innerHTML='<label for="shared-cell-type">셀 타입</label><select id="shared-cell-type" data-select="cell"><option value="status">status</option><option value="date">date</option><option value="number">number</option><option value="custom">custom</option></select>';
    else controls.innerHTML='<label for="shared-style-token">강조할 공통 토큰</label><select id="shared-style-token" data-select="style"><option value="header">헤더 배경</option><option value="row">행 배경</option><option value="spacing">셀 간격</option><option value="border">경계선</option></select>';
    if(state.part==='cell')controls.querySelector('select').value=state.cellType;
    if(state.part==='style')controls.querySelector('select').value=state.styleFocus;
    if(state.part==='filter')controls.querySelector('input').value=state.keyword;
  }
  function renderUsage(){
    const example=state.part==='table'?state.usage:state.part;
    if(example==='device'){
      root.querySelector('[data-demo-title]').textContent='장비 상태 셀';
      view.innerHTML=table(['장비명','종류','상태'],[['장비 A','호스트',`<span class="tag ${state.deviceActive?'':'off'}">${state.deviceActive?'사용':'미사용'}</span>`]]);
      readout.innerHTML='<strong>공통 테이블</strong>은 열과 행을 받고 상태 셀은 장비 화면의 bodyCell 슬롯이 그립니다.';
      code.textContent=state.part==='table'
        ? `<SharedTable :columns="columns" :data="data"
  @sort-change="onSortChange">
  <template #bodyCell="{ column, record }">…</template>
</SharedTable>`
        : `<SharedTable :columns="columns" :data="data">
  <template #bodyCell="{ column, record }">
    <UiTag v-if="column.dataIndex === 'isActive'"
      :text="getActiveLabel(record.isActive)"
      :color="isActive(record.isActive) ? 'green' : 'gray'" />
  </template>
</SharedTable>`;
    }
    else{
      root.querySelector('[data-demo-title]').textContent='로그 시간 정렬';
      const logs=state.logDesc?[['09:24','응답 지연','플랫폼 A'],['09:12','상태 변경','플랫폼 B']]:[['09:12','상태 변경','플랫폼 B'],['09:24','응답 지연','플랫폼 A']];
      view.innerHTML=table([`발생 시간 ${state.logDesc?'↓':'↑'}`,'이벤트명','플랫폼'],logs);
      readout.innerHTML=`<strong>서버 조회 조건</strong> sort: timestampEpoch, sortOrder: ${state.logDesc?'Desc':'Asc'}`;
      code.textContent=state.part==='table'
        ? `<SharedTable :columns="columns" :data="data"
  @sort-change="onSortChange">
  <template #bodyCell="cell">…</template>
</SharedTable>`
        : `<SharedTable :data="displayedData"
  :show-pagination="false"
  @sort-change="onSortChange" />

const onSortChange = (field, order) => {
  sort.value = field;
  sortOrder.value = order === 'ascend' ? 'Asc' : 'Desc';
};

// 예시 이벤트: timestampEpoch / ${state.logDesc?'descend':'ascend'}`;
    }
    if(state.part==='device')code.textContent+='\n\n// 예시 record.isActive: '+state.deviceActive;
    if(state.part==='table'&&state.usage==='log')code.textContent='<SharedTable :data="displayedData"\n  :show-pagination="false"\n  @sort-change="onSortChange" />';
    note.hidden=state.part!=='log';
    if(state.part==='log')note.textContent='사용상 주의: 조회 조건 변경 뒤 이전 스크롤 위치가 남으면 추가 요청이 이어질 수 있어 LogTable.vue가 표시 범위와 scrollTop을 초기화합니다. SharedTable 자체의 수정은 아닙니다.';
  }
  function renderFlow(){
    root.querySelector('[data-demo-title]').textContent=state.part==='filter'?'필터 후 표시할 행':state.part==='page'?'현재 페이지와 페이지 크기':state.part==='render'?'a-table에 전달하는 행':'페이지 설정에 따른 표시 행';
    const all=Array.from({
      length:24
    },(_,i)=>({
      id:i+1,label:`항목 ${String(i+1).padStart(2,'0')}`
    }));
    const filtered=all.filter(row=>row.label.includes(state.keyword.trim()));
    const sorted=state.sortDesc?[...filtered].reverse():filtered;
    const serverRows=all.slice(0,6);
    let shown,total;
    if(state.mode==='server'){
      shown=serverRows;
      total=24
    }
    else if(state.mode==='off'){
      shown=sorted;
      total=sorted.length
    }
    else{
      const start=(state.current-1)*20;
      shown=sorted.slice(start,start+20);
      total=sorted.length
    }
    view.innerHTML=table(['ID','표시 행'],shown.slice(0,4).map(row=>[String(row.id),row.label]));
    const suffix=shown.length>4?' (나머지 행은 예시에서 생략)':'';
    readout.innerHTML=`<strong>표에 전달한 행 ${shown.length} / 전체 ${total}</strong>${suffix}`;
    note.hidden=state.part!=='rows';
    if(state.part==='rows')note.textContent='경계 예제: 가상 24행에서 페이지 UI를 끈 경우 수정 전에는 기본 pageSize로 20행만 전달됐고, showPagination=false 분기를 추가한 뒤 24행을 전달합니다.';
    if(state.part==='filter')code.textContent=`const filteredData = computed(() =>
  sortData(filterData(props.data)));

const handleFilterChange = () => {
  current.value = 1;
};`;
    else if(state.part==='render')code.textContent=`<a-table :columns="computedColumns"
  :data-source="computedData"
  :pagination="false" />

const computedData = computed(() =>
  getCurrentPageData(filteredData.value));`;
    else if(state.part==='page')code.textContent=`<TablePagination v-if="showPagination && total"
  v-model:current="current"
  v-model:page-size="pageSize"
  :total="total" />

// 예시 현재 페이지: ${state.current}, 페이지 크기: 20`;
    else code.textContent=`const getCurrentPageData = (data) => {
  if (totalSize.value) return props.data;
  if (props.showPagination === false) return data;
  const start = (current.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return data.slice(start, end);
};

// 예시 설정: ${state.mode==='on'?'페이지 켬':state.mode==='off'?'페이지 끔':'서버 total 사용'}`;
  }
  function renderPresentation(){
    root.querySelector('[data-demo-title]').textContent=state.part==='cell'?'셀 타입별 표현':'공통 스타일 토큰';
    if(state.part==='cell'){
      const display={
        status:'<span class="tag">정상</span>',date:'2026-11-21',number:'12,345',custom:'<span class="tag">사용</span>'
      }[state.cellType];
      view.innerHTML=table(['열','표시값'],[[state.cellType,display]]);
      readout.innerHTML=state.cellType==='custom'?'<strong>custom</strong>은 화면의 bodyCell 슬롯으로 전달합니다.':`<strong>${state.cellType}</strong>은 TableBodyCell에서 공통 형식으로 표시합니다.`;
      code.textContent={
        status:`<template v-else-if="column.type === 'status'">
  <UiTag type="status" :text="text" />
</template>`,
        date:`<template v-else-if="column.type === 'date'">
  {{ text ? formatDate(text) : '-' }}
</template>`,
        number:`<template v-else-if="column.type === 'number'">
  {{ addComma(text) }}
</template>`,
        custom:`<template v-if="column.type === 'custom'">
  <slot v-bind="{ column, text, record, index }" />
</template>`
      }[state.cellType];
    }
    else{
      view.innerHTML=table(['장비명','상태'],[['장비 A','사용']]);
      const target=view.querySelector(state.styleFocus==='header'?'th':state.styleFocus==='row'?'td':state.styleFocus==='spacing'?'td':'tr');
      target.style.boxShadow='inset 0 0 0 2px #f29b70';
      const info={
        header:['헤더 배경','--layer-02','shared-table.scss'],
        row:['행 배경','--layer-01','shared-table.scss'],
        spacing:['셀 간격','--spacing-16','shared-table.scss'],
        border:['경계선','--border-subtle-01','shared-table.scss']
      }[state.styleFocus];
      readout.innerHTML=`<strong>${info[0]}</strong> ${info[1]} / ${info[2]}`;
      code.textContent=`// SharedTable.vue\n@use './shared-table.scss';\n\n// ${info[2]}\n${info[0]} → var(${info[1]})`;
    }
    note.hidden=true;
  }
  function renderDemo(){
    const group=parts[state.part].group;
    if(group==='usage')renderUsage();
    else if(group==='flow')renderFlow();
    else renderPresentation();
    highlightCode();
  }
  function selectPart(part){
    if(!parts[part])return;
    state.part=part;
    if(part==='rows'){
      state.mode='off';
      state.keyword='';
      state.current=1
    }
    if(part==='page'){
      state.mode='on';
      state.keyword='';
      state.current=1
    }
    const item=parts[part];
    root.querySelector('[data-detail-title]').textContent=item.title;
    root.querySelector('[data-detail-lead]').textContent=item.lead;
    root.querySelector('[data-part-heading]').textContent=item.title+'의 연결';
    root.querySelector('[data-part-summary]').textContent=item.lead;
    root.querySelector('[data-source]').textContent=item.source;
    root.querySelectorAll('[data-part]').forEach(link=>{
      if(link.dataset.part===part)link.setAttribute('aria-current','page');
      else link.removeAttribute('aria-current')
    });
    renderControls();
    renderDemo()
  }
  const requested=new URLSearchParams(location.search).get('part');
  selectPart(parts[requested]?requested:'table');
  root.addEventListener('click',event=>{
    const button=event.target.closest('[data-action]');
    if(!button||!root.contains(button))return;
    switch(button.dataset.action){
      case'device-status':state.deviceActive=!state.deviceActive;
      break;
      case'log-sort':state.logDesc=!state.logDesc;
      break;
      case'usage-device':state.usage='device';
      break;
      case'usage-log':state.usage='log';
      break;
      case'mode-on':state.mode='on';
      state.current=1;
      break;
      case'mode-off':state.mode='off';
      state.current=1;
      break;
      case'mode-server':state.mode='server';
      state.current=1;
      break;
      case'prev-page':state.current=Math.max(1,state.current-1);
      break;
      case'next-page':state.current=Math.min(2,state.current+1);
      break;
      default:return;
    }
    const action=button.dataset.action;
    renderControls();
    renderDemo();
    controls.querySelector(`[data-action="${action}"]`)?.focus();
  });
  root.addEventListener('input',event=>{
    if(event.target.id==='shared-demo-keyword'){
      state.keyword=event.target.value;
      state.current=1;
      renderDemo()
    }
  });
  root.addEventListener('change',event=>{
    if(event.target.dataset.select==='cell')state.cellType=event.target.value;
    else if(event.target.dataset.select==='style')state.styleFocus=event.target.value;
    else return;
    renderDemo()
  });
})();
