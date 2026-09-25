// 도메인별 풀 레이아웃 — 스킨 전용 페이지(skins/<id>.html)의 본체.
//
// 전부 대시보드로 보여주면 "색만 다른 대시보드 10장"이 된다.
// 쇼핑몰에 맞는 레이아웃과 대시보드에 맞는 레이아웃은 다르므로,
// 각 스킨은 자기 분야(scenes.mjs의 domain)의 화면 구성을 그대로 연기한다.
//
// 골격 클래스(.fv-*)는 skins.mjs 의 PREVIEW_FULL_CSS 를 그대로 재사용한다 —
// 사이드바·상단바·카드·배지·테이블·버튼·차트가 이미 토큰 기반이기 때문.
// 레이아웃 고유 부분만 .lay-* 로 추가한다.

/** 추가 아이콘 — skins.mjs 의 ICON_SPRITE 와 함께 페이지에 심는다 */
export const EXTRA_SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
<symbol id="i-play" viewBox="0 0 24 24"><path d="M7 4.2v15.6L20 12 7 4.2Z" fill="currentColor" stroke="none"/></symbol>
<symbol id="i-prev" viewBox="0 0 24 24"><path d="M19 19.5 9.5 12 19 4.5v15ZM6.5 4.5v15" /></symbol>
<symbol id="i-next" viewBox="0 0 24 24"><path d="M5 4.5 14.5 12 5 19.5v-15ZM17.5 4.5v15" /></symbol>
<symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.8"/><path d="M12 7.2V12l3.4 2.2"/></symbol>
<symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21.5s6.6-6.1 6.6-11a6.6 6.6 0 1 0-13.2 0c0 4.9 6.6 11 6.6 11Z"/><circle cx="12" cy="10.3" r="2.4"/></symbol>
<symbol id="i-file" viewBox="0 0 24 24"><path d="M13.6 3.2H6.8A1.8 1.8 0 0 0 5 5v14a1.8 1.8 0 0 0 1.8 1.8h10.4A1.8 1.8 0 0 0 19 19V8.6l-5.4-5.4Z"/><path d="M13.4 3.4v5.2H19"/></symbol>
<symbol id="i-layers" viewBox="0 0 24 24"><path d="m12 2.8 9 4.6-9 4.6-9-4.6 9-4.6Z"/><path d="m3 12.4 9 4.6 9-4.6M3 16.9l9 4.6 9-4.6"/></symbol>
<symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20.4s-7.6-4.6-7.6-10a4.4 4.4 0 0 1 7.6-3 4.4 4.4 0 0 1 7.6 3c0 5.4-7.6 10-7.6 10Z"/></symbol>
<symbol id="i-filter" viewBox="0 0 24 24"><path d="M3.5 5.5h17l-6.6 7.8v6.2l-3.8-2v-4.2L3.5 5.5Z"/></symbol>
<symbol id="i-check" viewBox="0 0 24 24"><path d="m4.5 12.5 5 5 10-11"/></symbol>
<symbol id="i-star" viewBox="0 0 24 24"><path d="m12 3.4 2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 17.3l-5.4 2.9 1.1-6.1-4.5-4.3 6.1-.8L12 3.4Z" fill="currentColor" stroke="none"/></symbol>
<symbol id="i-chev" viewBox="0 0 24 24"><path d="m6.5 9.5 5.5 5.5 5.5-5.5"/></symbol>
<symbol id="i-left" viewBox="0 0 24 24"><path d="M14.5 6 8.5 12l6 6"/></symbol>
<symbol id="i-right" viewBox="0 0 24 24"><path d="m9.5 6 6 6-6 6"/></symbol>
<symbol id="i-vase" viewBox="0 0 24 24"><path d="M9.2 2.8h5.6v1.9c0 1.4 3.4 3.2 3.4 7.6 0 4.6-2.6 8.9-6.2 8.9s-6.2-4.3-6.2-8.9c0-4.4 3.4-6.2 3.4-7.6V2.8Z"/><path d="M7.4 10.2h9.2"/></symbol>
<symbol id="i-cup" viewBox="0 0 24 24"><path d="M4.4 6.6h11.2v8.6a4.4 4.4 0 0 1-4.4 4.4H8.8a4.4 4.4 0 0 1-4.4-4.4V6.6Z"/><path d="M15.6 9.2h2.2a2.4 2.4 0 0 1 0 4.8h-2.2"/></symbol>
<symbol id="i-gov" viewBox="0 0 24 24"><path d="M3 9.6 12 4.2l9 5.4M4.6 9.6v9.4M9.2 9.6v9.4M14.8 9.6v9.4M19.4 9.6v9.4M2.6 19.4h18.8"/></symbol>
<symbol id="i-msg" viewBox="0 0 24 24"><path d="M20.5 12.4c0 4.1-3.8 7.4-8.5 7.4-1 0-2-.15-2.9-.42L4 21l1.3-3.6C4.15 16.1 3.5 14.3 3.5 12.4 3.5 8.3 7.3 5 12 5s8.5 3.3 8.5 7.4Z"/></symbol>
<symbol id="i-up" viewBox="0 0 24 24"><path d="M12 19.5v-15m0 0-6.5 6.5M12 4.5l6.5 6.5"/></symbol>
<symbol id="i-cap" viewBox="0 0 24 24"><path d="M12 3.6 22 8.4l-10 4.8L2 8.4l10-4.8Z"/><path d="M6.4 10.9v5.2c0 1.6 2.5 2.9 5.6 2.9s5.6-1.3 5.6-2.9v-5.2M22 8.4v5.4"/></symbol>
<symbol id="i-basket" viewBox="0 0 24 24"><path d="M3.4 8.8h17.2l-1.7 9.6a2.2 2.2 0 0 1-2.2 1.8H7.3a2.2 2.2 0 0 1-2.2-1.8L3.4 8.8Z"/><path d="M8.6 8.8 10.2 4M15.4 8.8 13.8 4"/></symbol>
</svg>`

const ic = (id, cls = 'fv-i') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`
const av = (t, c, cls = '') => `<span class="fv-av ${cls}" data-c="${c}">${t}</span>`

/* ---------- 공통 크롬 ---------- */

const sidebar = L => `<aside class="fv-side">
  <div class="fv-ws">${ic(L.logo || 'box', 'fv-i fv-logo')}<b>${L.brand}</b>${ic('chev', 'fv-i fv-cv')}</div>
  <nav class="fv-navs">
    ${L.navLabel ? `<div class="fv-lbl">${L.navLabel}</div>` : ''}
    ${L.nav.map(([i, t, v, cnt]) =>
  `<button type="button" class="fv-nav${v === L.home ? ' is-on' : ''}" data-v="${v}">${ic(i)}${t}${cnt ? `<span class="fv-cnt">${cnt}</span>` : ''}</button>`).join('')}
    ${L.nav2 ? `<div class="fv-lbl">${L.nav2Label || '관리'}</div>${L.nav2.map(([i, t, v]) =>
    `<button type="button" class="fv-nav" data-v="${v}">${ic(i)}${t}</button>`).join('')}` : ''}
  </nav>
  <div class="fv-user">${av('진', 5)}<div><b>박진우</b><small>jinwoo@acme.co</small></div></div>
</aside>`

const topbar = (L, home) => `<header class="fv-top">
  <div class="fv-crumb">${home.crumb[0]} <i>/</i> <b>${home.crumb[1]}</b></div>
  <div class="fv-search">${ic('search')}<span>${L.searchHint || '검색'}</span><span class="fv-kbd">⌘K</span></div>
  <div class="fv-tools">${ic('bell')}${av('진', 5, 'sm')}</div>
</header>`

/** 사이드바 없는 레이아웃(쇼핑몰·매거진·예약)의 상단 내비 */
const topnav = L => `<header class="fv-top lay-topnav">
  <b class="lay-logo">${L.brand}</b>
  <nav>${L.tabs.map(([t, v]) =>
  `<button type="button" class="lay-tab${v === L.home ? ' on' : ''}" data-v="${v}">${t}</button>`).join('')}</nav>
  <div class="fv-tools">${(L.topIcons || ['search', 'heart', 'cart']).map(i => ic(i)).join('')}${av('진', 5, 'sm')}</div>
</header>`

const pageHead = L => `<div class="fv-h">
  <div><h2>${L.title}</h2><p>${L.sub}</p></div>
  ${L.actions ? `<div class="fv-btns">${L.actions.map(([t, ghost, icon], n) =>
  `<span class="fv-btn${ghost ? ' ghost' : ''}">${icon ? ic(icon) : ''}${t}</span>`).join('')}</div>` : ''}
</div>`

const areaChart = (d, axis) => `<div class="fv-chart">
  <svg class="fv-svg" viewBox="0 0 320 100" preserveAspectRatio="none">
    <line class="fv-gl" x1="0" y1="25" x2="320" y2="25"/><line class="fv-gl" x1="0" y1="55" x2="320" y2="55"/>
    <line class="fv-gl" x1="0" y1="85" x2="320" y2="85"/>
    <path class="fv-area" d="${d} L320,100 L0,100 Z"/><path class="fv-line" d="${d}"/>
  </svg></div>
  <div class="fv-axis">${axis.map(a => `<span>${a}</span>`).join('')}</div>`

const AREA = 'M0,74 L29,62 L58,68 L87,50 L116,58 L145,40 L175,46 L204,30 L233,38 L262,24 L291,30 L320,16'

const donut = segs => {
  let off = 0
  return `<svg class="fv-donut" viewBox="0 0 42 42"><circle class="d-bg" cx="21" cy="21" r="15.9155"/>
  ${segs.map(([, p], i) => {
    const s = `<circle class="d-seg d${i + 1}" cx="21" cy="21" r="15.9155" stroke-dasharray="${p} ${100 - p}" stroke-dashoffset="${-off}"/>`
    off += p
    return s
  }).join('')}</svg>
  <ul class="fv-legend">${segs.map(([n, p], i) =>
    `<li><i class="lg d${i + 1}"></i><span>${n}</span><em>${p}%</em></li>`).join('')}</ul>`
}

const table = (cols, rows) => `<table class="fv-tb">
  <thead><tr>${cols.map(([t, r]) => `<th${r ? ' class="r"' : ''}>${t}</th>`).join('')}</tr></thead>
  <tbody>${rows.map(r => `<tr>${r.map(c => c).join('')}</tr>`).join('')}</tbody></table>`

/* ---------- 화면 아키타입 ----------
   화면마다 골격을 새로 그리면 관리가 안 되고, 전부 같은 골격이면 "탭만 바뀌는 화면"이 된다.
   목록·설정·사람 그리드처럼 현업에서 실제로 반복되는 형태만 여기 두고,
   분야 고유 화면(플레이어 검색·도면·예약 캘린더)은 레이아웃에서 따로 그린다. */

const chips = (items, sort) => `<div class="lay-chips">${items.map((t, i) =>
  `<span class="${i === 0 ? 'on' : ''}">${t}</span>`).join('')}${sort
    ? `<span class="lay-sort">${sort} ${ic('chev')}</span>` : ''}</div>`

const pager = (cur, last) => `<div class="lay-page">${[...Array(last)].map((_, i) =>
  `<span class="${i + 1 === cur ? 'on' : ''}">${i + 1}</span>`).join('')}<span>›</span></div>`

const kpis = rows => `<div class="fv-kpis">${rows.map(([i, l, v, d, dir]) =>
  `<div class="fv-kpi"><div class="fv-kpi-t"><small>${l}</small><span class="fv-kpi-i">${ic(i)}</span></div>
   <b>${v}</b>${d ? `<em class="${dir || ''}">${d}</em>` : ''}</div>`).join('')}</div>`

const bars = rows => `<ul class="fv-bars">${rows.map(([n, v, lb]) =>
  `<li><span>${n}</span><div class="fv-bar"><i style="width:${v}%"></i></div><em>${lb || v + '%'}</em></li>`).join('')}</ul>`

const td = (v, cls) => `<td${cls ? ` class="${cls}"` : ''}>${v}</td>`
const tdm = v => td(v, 'mono')
const tdr = v => td(v, 'r mono')
const tdu = (i, c, n) => td(av(i, c, 'xs') + n)
const bdg = (cls, t) => `<span class="fv-badge ${cls}">${t}</span>`

const card = (title, extra, body, cls) => `<section class="fv-card${cls ? ' ' + cls : ''}">
  <div class="fv-card-h"><h3>${title}</h3>${extra || ''}</div>${body}</section>`

const ring = (pct, label) => `<div class="fv-ring-row"><svg class="fv-ring" viewBox="0 0 42 42">
  <circle class="d-bg" cx="21" cy="21" r="15.9155"/>
  <circle class="r-seg" cx="21" cy="21" r="15.9155" stroke-dasharray="${pct} ${100 - pct}"/></svg>
  <div class="fv-ring-t"><b>${pct}%</b><small>${label}</small></div></div>`

/* 설정 폼 — 실제로 눌리지는 않지만 상태(켜짐/꺼짐)는 정확히 보여준다 */
const sw = on => `<i class="lay-sw${on ? ' on' : ''}"></i>`
const inp = v => `<span class="lay-inp">${v}</span>`
const sel = v => `<span class="lay-inp sel">${v}${ic('chev')}</span>`
const setScreen = groups => `<div class="lay-set">${groups.map(([t, rows]) => `
  <section class="fv-card"><div class="fv-card-h"><h3>${t}</h3></div>
  ${rows.map(([l, d, ctl]) =>
    `<div class="lay-set-row"><div><b>${l}</b><small>${d}</small></div>${ctl}</div>`).join('')}
  </section>`).join('')}</div>`

/** 사람/거점처럼 "개체 카드"가 격자로 늘어서는 화면 */
const people = items => `<div class="lay-people">${items.map(([ini, c, name, role, meta, pct]) =>
  `<div class="fv-card lay-person">${av(ini, c)}<b>${name}</b><small>${role}</small>
   ${meta ? `<em>${meta}</em>` : ''}${pct != null ? `<div class="fv-bar"><i style="width:${pct}%"></i></div>` : ''}</div>`).join('')}</div>`

/** 목록 화면 — 필터칩 + 표 + 페이지네이션 */
const listScreen = ({ filter, sort, head, cols, rows, page, foot }) => `
  ${filter ? chips(filter, sort) : ''}${head || ''}
  <section class="fv-card lay-fill">${table(cols, rows)}</section>
  ${foot || ''}${page ? pager(page[0], page[1]) : ''}`

/* ---------- 레이아웃 정의 ---------- */

export const LAYOUTS = {}

/* 1. SaaS 대시보드 */
LAYOUTS.dashboard = {
  domain: 'SaaS 대시보드', chrome: 'sidebar', brand: 'Acme Inc.', logo: 'box',
  navLabel: '작업', nav2Label: '분석',
  home: 'home',
  nav: [['grid', '대시보드', 'home'], ['cart', '주문', 'orders', '24'], ['box', '재고', 'stock'], ['users', '고객', 'customers']],
  nav2: [['chart', '리포트', 'reports'], ['sliders', '설정', 'settings']],
  crumb: ['재고', '대시보드'], searchHint: '주문·고객 검색',
  title: '대시보드', sub: '최근 30일 · 2026년 8월 기준',
  actions: [['내보내기', true, 'down'], ['새로 만들기', false, 'plus']],
  main: `
  <div class="fv-kpis">
    ${[['cart', '총 주문', '1,284', '+12.4%', 'up'], ['trend', '매출', '₩48.2M', '+8.1%', 'up'],
    ['users', '신규 고객', '312', '+5.2%', 'up'], ['box', '평균 배송', '1.8일', '−0.3일', 'down']]
      .map(([i, l, v, d, dir]) => `<div class="fv-kpi"><div class="fv-kpi-t"><small>${l}</small>
      <span class="fv-kpi-i">${ic(i)}</span></div><b>${v}</b><em class="${dir}">${ic('trend')}${d}</em></div>`).join('')}
  </div>
  <div class="fv-grid">
    <section class="fv-card"><div class="fv-card-h"><h3>주문 추이</h3>
      <div class="fv-seg"><span class="on">30일</span><span>90일</span></div></div>
      ${areaChart(AREA, ['7/16', '7/23', '7/30', '8/6', '8/13'])}</section>
    <section class="fv-card"><div class="fv-card-h"><h3>카테고리 비중</h3></div>
      <div class="fv-donut-row">${donut([['가전', 42], ['패션', 27], ['식품', 18], ['기타', 13]])}</div></section>
  </div>
  <div class="fv-grid">
    <section class="fv-card"><div class="fv-card-h"><h3>최근 주문</h3><span class="fv-link">전체 보기</span></div>
      ${table([['주문번호'], ['고객'], ['금액', 1], ['상태']], [
        [`<td class="mono">#10241</td>`, `<td>${av('김', 1, 'xs')}김서연</td>`, `<td class="r mono">₩248,000</td>`, `<td><span class="fv-badge ok">완료</span></td>`],
        [`<td class="mono">#10240</td>`, `<td>${av('이', 2, 'xs')}이준호</td>`, `<td class="r mono">₩92,500</td>`, `<td><span class="fv-badge mid">배송중</span></td>`],
        [`<td class="mono">#10239</td>`, `<td>${av('박', 3, 'xs')}박민지</td>`, `<td class="r mono">₩1,120,000</td>`, `<td><span class="fv-badge idle">대기</span></td>`],
      ])}</section>
    <section class="fv-card"><div class="fv-card-h"><h3>분기 목표</h3>
      <div class="fv-stack">${av('김', 1)}${av('이', 2)}${av('박', 3)}<span class="fv-more">+5</span></div></div>
      <div class="fv-ring-row"><svg class="fv-ring" viewBox="0 0 42 42">
        <circle class="d-bg" cx="21" cy="21" r="15.9155"/>
        <circle class="r-seg" cx="21" cy="21" r="15.9155" stroke-dasharray="72 28"/></svg>
        <div class="fv-ring-t"><b>72%</b><small>달성률</small></div></div>
      <ul class="fv-bars">${[['신규 고객', 78], ['재구매율', 54], ['객단가', 91]].map(([n, v]) =>
        `<li><span>${n}</span><div class="fv-bar"><i style="width:${v}%"></i></div><em>${v}%</em></li>`).join('')}</ul>
    </section>
  </div>`,
  views: {
    orders: {
      crumb: ['판매', '주문'], title: '주문', sub: '전체 1,284건 · 오늘 접수 42건',
      actions: [['CSV 내보내기', true, 'down'], ['주문 등록', false, 'plus']],
      main: listScreen({
        filter: ['전체 1,284', '결제완료 96', '배송중 218', '취소 12'], sort: '최신순',
        cols: [['주문번호'], ['고객'], ['상품'], ['금액', 1], ['상태']],
        rows: [
          [tdm('#10241'), tdu('김', 1, '김서연'), td('세라믹 화병 no.4 외 2'), tdr('₩248,000'), td(bdg('ok', '완료'))],
          [tdm('#10240'), tdu('이', 2, '이준호'), td('린넨 쿠션 커버'), tdr('₩92,500'), td(bdg('mid', '배송중'))],
          [tdm('#10239'), tdu('박', 3, '박민지'), td('라탄 바스켓 외 5'), tdr('₩1,120,000'), td(bdg('idle', '대기'))],
          [tdm('#10238'), tdu('최', 4, '최도윤'), td('소이 캔들 · 시더'), tdr('₩18,000'), td(bdg('ok', '완료'))],
          [tdm('#10237'), tdu('정', 2, '정하늘'), td('오크 트레이 외 1'), tdr('₩77,000'), td(bdg('warn', '반품'))],
          [tdm('#10236'), tdu('한', 3, '한서준'), td('스톤웨어 머그 ×4'), tdr('₩88,000'), td(bdg('mid', '배송중'))],
        ],
        page: [1, 4],
      }),
    },
    stock: {
      crumb: ['재고', '품목'], title: '재고', sub: '품목 86 · 안전재고 미만 4',
      actions: [['재고 실사', true, 'check'], ['입고 등록', false, 'plus']],
      main: `
      ${kpis([['box', '총 품목', '86', '+3', 'up'], ['cart', '가용 재고', '12,480', '−320', 'down'],
      ['clock', '입고 예정', '1,200', '8/19', ''], ['bell', '안전재고 미만', '4', '+2', 'down']])}
      ${listScreen({
        filter: ['전체 86', '부족 4', '입고 예정 7'], sort: '재고 적은순',
        cols: [['품목'], ['SKU'], ['현재고', 1], ['안전재고', 1], ['상태']],
        rows: [
          [td('<b>세라믹 화병 no.4</b>'), tdm('VS-004'), tdr('12'), tdr('40'), td(bdg('warn', '부족'))],
          [td('<b>소이 캔들 · 시더</b>'), tdm('CD-011'), tdr('34'), tdr('40'), td(bdg('warn', '부족'))],
          [td('<b>린넨 쿠션 커버</b>'), tdm('CS-220'), tdr('318'), tdr('80'), td(bdg('ok', '정상'))],
          [td('<b>오크 트레이</b>'), tdm('TR-108'), tdr('96'), tdr('60'), td(bdg('ok', '정상'))],
        ],
      })}`,
    },
    customers: {
      crumb: ['고객', '전체'], title: '고객', sub: '전체 3,214명 · 이번 달 신규 312명',
      actions: [['세그먼트', true, 'filter'], ['고객 추가', false, 'plus']],
      main: `
      ${chips(['전체 3,214', 'VIP 128', '휴면 402'], '구매액순')}
      ${people([
        ['김', 1, '김서연', 'VIP · 24회 구매', '₩4,820,000', 96],
        ['이', 2, '이준호', '일반 · 8회 구매', '₩910,000', 42],
        ['박', 3, '박민지', 'VIP · 31회 구매', '₩6,140,000', 100],
        ['최', 4, '최도윤', '신규 · 1회 구매', '₩18,000', 8],
        ['정', 2, '정하늘', '일반 · 12회 구매', '₩1,340,000', 55],
        ['한', 3, '한서준', '휴면 · 3회 구매', '₩212,000', 14],
        ['조', 5, '조은비', 'VIP · 19회 구매', '₩3,470,000', 78],
        ['오', 1, '오세훈', '일반 · 6회 구매', '₩640,000', 30],
        ['윤', 4, '윤가람', '신규 · 2회 구매', '₩54,000', 12],
      ])}`,
    },
    reports: {
      crumb: ['분석', '리포트'], title: '리포트', sub: '2026년 8월 · 전월 대비',
      actions: [['기간 8월', true, 'clock'], ['PDF 저장', false, 'down']],
      main: `
      <div class="fv-grid">
        ${card('월별 매출', '<div class="fv-seg"><span class="on">12개월</span><span>24개월</span></div>',
        areaChart(AREA, ['9월', '12월', '3월', '6월', '8월']))}
        ${card('채널 비중', '', `<div class="fv-donut-row">${donut([['자사몰', 51], ['오픈마켓', 26], ['오프라인', 15], ['제휴', 8]])}</div>`)}
      </div>
      <div class="fv-grid">
        ${card('목표 달성', '', ring(72, '분기 목표') + bars([['신규 고객', 78], ['재구매율', 54], ['객단가', 91]]))}
        ${card('카테고리 성장률', '', bars([['가전', 88, '+18.2%'], ['패션', 61, '+9.4%'], ['식품', 44, '+2.1%'], ['기타', 19, '−3.6%']]))}
      </div>`,
    },
    settings: {
      crumb: ['설정', '워크스페이스'], title: '설정', sub: 'Acme Inc. · 관리자 권한',
      main: setScreen([
        ['워크스페이스', [
          ['워크스페이스 이름', '청구서와 알림 메일에 표시됩니다', inp('Acme Inc.')],
          ['기준 통화', '모든 금액 표시에 적용', sel('KRW (₩)')],
          ['회계 기준월', '리포트 분기 계산 기준', sel('1월')],
        ]],
        ['알림', [
          ['주문 접수 알림', '새 주문이 들어오면 즉시 전송', sw(true)],
          ['안전재고 경고', '재고가 기준 아래로 내려가면 전송', sw(true)],
          ['주간 요약 메일', '매주 월요일 09:00 발송', sw(false)],
        ]],
      ]),
    },
  },
}

/* 2. 쇼핑몰 — 상단 내비 + 제품 그리드 */
LAYOUTS.commerce = {
  domain: '쇼핑몰 · 커머스', chrome: 'topnav', brand: 'STUDIO CLAY',
  home: 'new',
  tabs: [['신상품', 'new'], ['베스트', 'best'], ['카테고리', 'cat'], ['세일', 'sale']],
  topIcons: ['search', 'heart', 'cart'],
  title: '리빙 · 오브제', sub: '전체 128개',
  actions: [['필터', true, 'filter']],
  main: `
  <div class="lay-chips"><span class="on">전체</span><span>화병</span><span>캔들</span><span>트레이</span><span>패브릭</span>
    <span class="lay-sort">인기순 ${ic('chev')}</span></div>
  <div class="lay-prods">
    ${[['세라믹 화병 no.4', '32,000', '4.9', '212', 1, 'vase'], ['오크 트레이', '48,000', '4.8', '96', 0, 'basket'],
    ['린넨 쿠션 커버', '29,000', '4.7', '341', 0, 'layers'], ['소이 캔들 · 시더', '18,000', '5.0', '77', 1, 'cup'],
    ['스톤웨어 머그', '22,000', '4.6', '158', 0, 'cup'], ['라탄 바스켓', '54,000', '4.9', '43', 0, 'basket']]
      .map(([n, p, r, c, badge, glyph]) => `<article class="lay-prod">
      <div class="lay-img">${badge ? '<span class="fv-badge ok lay-new">NEW</span>' : ''}${ic(glyph, 'lay-ph')}</div>
      <b>${n}</b>
      <small>${ic('star', 'lay-star')}${r} <em>(${c})</em></small>
      <div class="lay-price"><b class="num">₩${p}</b><span class="lay-opts"><i></i><i></i><i></i></span></div>
      <span class="fv-btn lay-cart">담기</span></article>`).join('')}
  </div>
  <div class="lay-page"><span>1</span><span class="on">2</span><span>3</span><span>›</span></div>`,
  views: {
    best: {
      title: '베스트', sub: '최근 7일 판매량 기준 · 8월 17일 09:00 갱신',
      actions: [['기간 7일', true, 'clock']],
      main: `
      ${chips(['전체', '리빙', '주방', '패브릭'], '판매량순')}
      <div class="lay-rank">
        ${[[1, '세라믹 화병 no.4', '화병 · 아이보리', '32,000', 100, '1,284', 'vase'],
        [2, '소이 캔들 · 시더', '캔들 · 200g', '18,000', 78, '996', 'cup'],
        [3, '린넨 쿠션 커버', '패브릭 · 45×45', '29,000', 61, '781', 'layers'],
        [4, '오크 트레이', '트레이 · 대', '48,000', 44, '562', 'basket'],
        [5, '스톤웨어 머그', '주방 · 320ml', '22,000', 31, '398', 'cup']]
        .map(([n, t, c, p, w, cnt, g]) => `<div class="lay-rank-r">
          <b class="lay-rank-n">${n}</b>
          <i class="lay-rank-th">${ic(g, 'lay-ph')}</i>
          <div class="lay-rank-t"><b>${t}</b><small>${c}</small></div>
          <div class="fv-bar lay-rank-b"><i style="width:${w}%"></i></div>
          <em class="lay-rank-c">${cnt}개</em>
          <b class="num lay-rank-p">₩${p}</b>
        </div>`).join('')}
      </div>`,
    },
    cat: {
      title: '카테고리', sub: '8개 분류 · 전체 128개 상품',
      main: `
      <div class="lay-tiles">
        ${[['vase', '화병 · 오브제', 24], ['cup', '캔들 · 디퓨저', 18], ['basket', '수납 · 바스켓', 16],
        ['layers', '패브릭 · 쿠션', 31], ['cup', '주방 · 테이블웨어', 27], ['heart', '기프트 세트', 12]]
        .map(([g, n, c]) => `<div class="fv-card lay-tile">${ic(g, 'lay-ph')}
          <b>${n}</b><small>${c}개</small></div>`).join('')}
      </div>
      ${card('많이 찾는 태그', '', `<div class="lay-chips lay-tags">
        <span>아이보리</span><span>라탄</span><span>선물 포장</span><span>1인 가구</span>
        <span>핸드메이드</span><span>오크</span><span>무광</span></div>`)}`,
    },
    sale: {
      title: '세일', sub: '여름 마감 세일 · 8월 21일 23:59까지',
      actions: [['필터', true, 'filter']],
      main: `
      <div class="lay-banner">
        <div><small>SUMMER CLOSING</small><b>최대 40% 할인</b></div>
        <div class="lay-timer">${ic('clock')}<span>03</span>:<span>21</span>:<span>44</span></div>
      </div>
      <div class="lay-prods">
        ${[['라탄 바스켓', '54,000', '32,400', 40, 'basket'], ['오크 트레이', '48,000', '33,600', 30, 'basket'],
        ['스톤웨어 머그', '22,000', '17,600', 20, 'cup'], ['린넨 쿠션 커버', '29,000', '20,300', 30, 'layers'],
        ['세라믹 화병 no.2', '38,000', '26,600', 30, 'vase'], ['소이 캔들 · 우드', '18,000', '12,600', 30, 'cup']]
        .map(([n, was, now, off, g]) => `<article class="lay-prod">
          <div class="lay-img"><span class="fv-badge warn lay-off">${off}%</span>${ic(g, 'lay-ph')}</div>
          <b>${n}</b>
          <small class="lay-was">₩${was}</small>
          <div class="lay-price"><b class="num">₩${now}</b></div>
          <span class="fv-btn lay-cart">담기</span></article>`).join('')}
      </div>`,
    },
  },
}

/* 3. 매거진 아티클 — 본문 + 목차 고정 */
LAYOUTS.article = {
  domain: '콘텐츠 · 에디토리얼', chrome: 'topnav', brand: 'THE QUIET',
  home: 'essay',
  tabs: [['에세이', 'essay'], ['인터뷰', 'interview'], ['리뷰', 'review'], ['아카이브', 'archive']],
  topIcons: ['search', 'heart'],
  main: `
  <div class="lay-art">
    <article>
      <figure class="lay-hero">
        <svg viewBox="0 0 600 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <circle class="c-sun" cx="448" cy="74" r="30"/>
          <path class="c-h1" d="M0 142C70 112 140 124 212 98S350 58 430 96s130 26 170 8V220H0Z"/>
          <path class="c-h2" d="M0 172c92-26 170-10 262-34s158-18 240 10 74 10 98 6V220H0Z"/>
          <path class="c-h3" d="M0 198c120-16 212-4 318-18s190-4 282 10V220H0Z"/>
        </svg>
        <figcaption><span class="lay-chip-k">에세이 · 8월호</span><small>사진 · 여름의 끝, 북한산</small></figcaption>
      </figure>
      <h1 class="num">계절의 감각을<br>기록하는 법</h1>
      <p class="lay-dek">매미가 잦아들고 풀벌레가 자리를 바꾸는 며칠. 우리가 매년 놓치는 그 틈을 적어 두는 방법에 대하여.</p>
      <div class="lay-by">${av('진', 5, 'sm')}<div><b>박진우</b><small>2026. 8. 17 · 읽는 시간 7분</small></div></div>
      <p>여름의 끝은 소리로 먼저 온다. 매미가 잦아들고 풀벌레가 자리를 바꾸는 그 며칠을 우리는 대개 놓친다.</p>
      <blockquote>우리가 놓치는 것은 시간이 아니라, 시간의 질감이다.</blockquote>
      <p>기록은 기억을 대신하지 않는다. 다만 기억이 돌아올 자리를 만들어 둔다. 사소한 문장 하나가 그 해의 온도를 되살린다.</p>
      <p>계절을 적는 일은 결국 자신을 적는 일이다. 같은 팔월을 두 번 살 수 없으므로.</p>
      <div class="lay-next">
        <h4>다음에 읽을 글</h4>
        <div class="lay-next-g">
          ${[['n1', '인터뷰', '30년째 같은 화병을 굽는 사람', '9분'],
          ['n2', '리뷰', '고요의 형태 — 비어 있음을 전시하는 법', '5분']]
          .map(([k, cat, t, min]) => `<div class="fv-card lay-next-c"><i class="lay-next-i ${k}"></i>
            <div><small>${cat} · ${min}</small><b>${t}</b></div></div>`).join('')}
        </div>
      </div>
    </article>
    <aside class="lay-toc">
      <div class="lay-toc-c">
        <h4>이 글의 흐름</h4>
        <div class="lay-read" aria-hidden="true"><i></i></div>
        <ol><li class="on"><em>01</em>소리로 오는 계절</li><li><em>02</em>기록의 자리</li><li><em>03</em>같은 팔월은 없다</li></ol>
      </div>
      <div class="lay-share"><span class="fv-btn">${ic('heart')}저장</span><span class="fv-btn ghost">공유</span></div>
    </aside>
  </div>`,
  views: {
    interview: {
      main: `
      <div class="lay-feat">
        <i class="lay-feat-img">${ic('users', 'lay-ph')}</i>
        <div>
          <small class="lay-kick">인터뷰 · 8월호</small>
          <h1 class="num">30년째 같은<br>화병을 굽는 사람</h1>
          <p>도예가 정하늘은 스무 살에 만든 형태를 아직도 고친다. 그가 말하는 &ldquo;완성되지 않음&rdquo;에 대하여.</p>
          <div class="lay-by">${av('정', 2, 'sm')}<div><b>정하늘</b><small>도예가 · 청주</small></div></div>
        </div>
      </div>
      <div class="lay-ilist">
        ${[['목수 김서연', '나무는 기다리는 사람에게만 열린다', '7월호'],
        ['제본가 이준호', '책은 펼쳐질 것을 전제로 만들어진다', '6월호'],
        ['조향사 박민지', '냄새는 기억보다 오래 남는다', '5월호']]
        .map(([who, q, when]) => `<div class="lay-irow">
          <b>${who}</b><span>&ldquo;${q}&rdquo;</span><em>${when}</em></div>`).join('')}
      </div>`,
    },
    review: {
      main: `
      ${chips(['전체', '책', '전시', '공간'], '최신순')}
      <div class="lay-revs">
        ${[['전시', '고요의 형태', '서울시립미술관', 5, '비어 있음을 전시한다는 역설. 3전시실만 두 번 봤다.'],
        ['책', '계절의 기록법', '박진우 지음', 4, '문장이 느리다. 그 속도가 이 책의 주장이다.'],
        ['공간', '북한산 산장', '고양시', 4, '창이 하나뿐인데 그 하나가 전부를 한다.'],
        ['책', '만드는 손', '정하늘 지음', 5, '도구에 대한 책이면서 시간에 대한 책이다.'],
        ['전시', '종이의 두께', '국립현대미술관', 4, '재료를 주제로 삼으면 대개 지루한데, 이건 아니었다.'],
        ['공간', '연희동 서점', '서대문구', 5, '좁은데 답답하지 않다. 천장고 하나로 해결했다.']]
        .map(([k, t, sub, star, body]) => `<article class="fv-card lay-rvw">
          <small class="lay-kick">${k}</small>
          <h3 class="num">${t}</h3>
          <small class="lay-rvw-s">${sub}</small>
          <div class="lay-stars">${[...Array(5)].map((_, i) =>
        ic('star', 'lay-star' + (i < star ? '' : ' off'))).join('')}</div>
          <p>${body}</p>
          <span class="fv-link">리뷰 읽기 →</span>
        </article>`).join('')}
      </div>`,
    },
    archive: {
      main: `
      ${chips(['2026', '2025', '2024', '전체'], '호수순')}
      <div class="lay-arch">
        ${[['№ 42', '8월호', '계절의 감각을 기록하는 법', '에세이'],
        ['№ 41', '7월호', '나무는 기다리는 사람에게만 열린다', '인터뷰'],
        ['№ 40', '6월호', '고요의 형태 — 전시 리뷰', '리뷰'],
        ['№ 39', '5월호', '냄새는 기억보다 오래 남는다', '인터뷰'],
        ['№ 38', '4월호', '한 벌의 옷을 오래 입는 일', '에세이']]
        .map(([no, mon, t, k]) => `<div class="lay-arow">
          <b class="num">${no}</b><em>${mon}</em><span>${t}</span><small>${k}</small></div>`).join('')}
      </div>
      ${pager(1, 5)}`,
    },
  },
}

/* 4. 뮤직 플레이어 */
LAYOUTS.player = {
  domain: '미디어 · 음악', chrome: 'sidebar', brand: 'VOID', logo: 'layers',
  navLabel: '탐색', nav2Label: '보관함',
  home: 'home',
  nav: [['grid', '홈', 'home'], ['search', '검색', 'search'], ['layers', '내 라이브러리', 'library']],
  nav2: [['heart', '좋아요 표시한 곡', 'liked'], ['clock', '최근 재생', 'recent']],
  crumb: ['라이브러리', 'Neon Cassette'], searchHint: '곡·아티스트 검색',
  main: `
  <div class="lay-now">
    <i class="lay-art-big"></i>
    <div class="lay-now-t">
      <small>앨범 · 2026</small>
      <h2 class="num">Midnight Drive</h2>
      <p>Neon Cassette · 11곡 · 42분</p>
      <div class="lay-ctl">
        <span class="fv-btn">${ic('play')}재생</span>
        <span class="fv-btn ghost">${ic('heart')}</span>
        <span class="fv-btn ghost">${ic('plus')}</span>
      </div>
    </div>
  </div>
  <div class="lay-bar">
    <div class="lay-prog"><i></i></div>
    <div class="lay-time"><span>2:41</span>
      <span class="lay-tr">${ic('prev')}${ic('play', 'fv-i lay-pl')}${ic('next')}</span>
      <span>4:03</span></div>
  </div>
  <section class="fv-card"><div class="fv-card-h"><h3>수록곡</h3><span class="fv-link">전체 재생</span></div>
    ${table([['#'], ['제목'], ['재생'], ['시간', 1]], [
    [`<td class="mono">1</td>`, `<td><b>Midnight Drive</b></td>`, `<td class="mono">1.2M</td>`, `<td class="r mono">4:03</td>`],
    [`<td class="mono lay-cur">2</td>`, `<td><b class="lay-cur">Neon Rain</b></td>`, `<td class="mono">842K</td>`, `<td class="r mono">3:38</td>`],
    [`<td class="mono">3</td>`, `<td><b>Static Love</b></td>`, `<td class="mono">610K</td>`, `<td class="r mono">4:21</td>`],
    [`<td class="mono">4</td>`, `<td><b>Afterglow</b></td>`, `<td class="mono">455K</td>`, `<td class="r mono">3:12</td>`],
  ])}</section>`,
  views: {
    search: {
      crumb: ['탐색', '검색'],
      main: `
      <div class="lay-searchbar">${ic('search')}<span>곡 · 아티스트 · 앨범</span></div>
      <h4 class="lay-sub">장르 둘러보기</h4>
      <div class="lay-genres">
        ${[['Synthwave', 1], ['Lo-fi', 5], ['City Pop', 2], ['Ambient', 3],
        ['Jazz Funk', 4], ['Shoegaze', 1], ['Techno', 5], ['Bossa', 3]]
        .map(([n, c]) => `<div class="lay-genre" data-c="${c}"><b>${n}</b></div>`).join('')}
      </div>`,
    },
    library: {
      crumb: ['라이브러리', '앨범'],
      main: `
      ${chips(['앨범 24', '아티스트 61', '플레이리스트 8'], '최근 추가순')}
      <div class="lay-albums">
        ${[['Midnight Drive', 'Neon Cassette', 1], ['Static Love', 'Neon Cassette', 5],
        ['Paper Moon', 'Yuki Aoi', 2], ['Slow Exit', 'Halcyon', 3],
        ['Afterglow', 'Neon Cassette', 4], ['Blue Hour', 'Kite & Co.', 1],
        ['Vapor Lane', 'Halcyon', 2], ['Tape Echo', 'Yuki Aoi', 3],
        ['Night Bus', 'Kite & Co.', 5], ['Low Tide', 'Neon Cassette', 4],
        ['Signal Fade', 'Halcyon', 1], ['Green Room', 'Yuki Aoi', 2]]
        .map(([t, a, c]) => `<div class="lay-album"><i class="lay-cover" data-c="${c}">${ic('play', 'lay-cover-p')}</i>
          <b>${t}</b><small>${a}</small></div>`).join('')}
      </div>`,
    },
    liked: {
      crumb: ['보관함', '좋아요 표시한 곡'],
      title: '좋아요 표시한 곡', sub: '184곡 · 11시간 22분',
      actions: [['셔플', true, 'layers'], ['전체 재생', false, 'play']],
      main: `
      <section class="fv-card lay-fill">${table([['#'], ['제목'], ['앨범'], ['추가'], ['시간', 1]], [
        [tdm('1'), td('<b>Neon Rain</b>'), td('Midnight Drive'), td('3일 전'), tdr('3:38')],
        [tdm('2'), td('<b>Paper Moon</b>'), td('Paper Moon'), td('1주 전'), tdr('4:12')],
        [tdm('3'), td('<b>Slow Exit</b>'), td('Slow Exit'), td('2주 전'), tdr('5:02')],
        [tdm('4'), td('<b>Afterglow</b>'), td('Midnight Drive'), td('2주 전'), tdr('3:12')],
        [tdm('5'), td('<b>Blue Hour</b>'), td('Blue Hour'), td('1개월 전'), tdr('4:44')],
        [tdm('6'), td('<b>Vapor Lane</b>'), td('Vapor Lane'), td('1개월 전'), tdr('3:55')],
        [tdm('7'), td('<b>Night Bus</b>'), td('Night Bus'), td('2개월 전'), tdr('4:08')],
        [tdm('8'), td('<b>Tape Echo</b>'), td('Tape Echo'), td('2개월 전'), tdr('3:27')],
      ])}</section>`,
    },
    recent: {
      crumb: ['보관함', '최근 재생'],
      title: '최근 재생', sub: '오늘 · 어제',
      main: `
      <div class="lay-recent">
        ${[['오늘 18:22', 'Midnight Drive', 'Neon Cassette', 1], ['오늘 17:58', 'Neon Rain', 'Neon Cassette', 5],
        ['오늘 14:03', 'Paper Moon', 'Yuki Aoi', 2], ['어제 23:41', 'Slow Exit', 'Halcyon', 3],
        ['어제 21:10', 'Blue Hour', 'Kite & Co.', 4]]
        .map(([when, t, a, c]) => `<div class="lay-rrow">
          <i class="lay-cover sm" data-c="${c}"></i>
          <div><b>${t}</b><small>${a}</small></div>
          <em>${when}</em>${ic('play', 'fv-i lay-rplay')}</div>`).join('')}
      </div>`,
    },
  },
}

/* 5. 인프라 모니터링 */
LAYOUTS.monitoring = {
  domain: '모니터링 · 인프라', chrome: 'sidebar', brand: 'ORBIT-OPS', logo: 'layers',
  navLabel: 'OBSERVE', nav2Label: 'CONFIG',
  home: 'metrics',
  nav: [['chart', 'Metrics', 'metrics'], ['file', 'Logs', 'logs'], ['bell', 'Alerts', 'alerts', '3'],
    ['layers', 'Services', 'services']],
  nav2: [['sliders', 'Settings', 'settings']],
  crumb: ['prod-cluster', 'Metrics'], searchHint: 'service · trace 검색',
  title: 'prod-cluster', sub: 'ap-northeast-2 · 노드 12 · 갱신 3초 전',
  actions: [['범위 30m', true, 'clock'], ['알림 규칙', false, 'plus']],
  main: `
  <div class="lay-svcs">
    ${[['api-gateway', '99.98%', '42ms', 'ok'], ['auth-svc', '99.95%', '38ms', 'ok'],
    ['db-primary', '98.20%', '210ms', 'warn'], ['cache', '100%', '3ms', 'ok']]
      .map(([n, up, ms, st]) => `<div class="fv-kpi lay-svc ${st}">
      <div class="fv-kpi-t"><small>${n}</small><i class="lay-dot"></i></div>
      <b>${up}</b><em>p95 ${ms}</em></div>`).join('')}
  </div>
  <div class="fv-grid">
    <section class="fv-card"><div class="fv-card-h"><h3>Request latency p95</h3>
      <div class="fv-seg"><span class="on">30m</span><span>6h</span><span>24h</span></div></div>
      ${areaChart(AREA, ['-30m', '-22m', '-15m', '-7m', 'now'])}</section>
    <section class="fv-card"><div class="fv-card-h"><h3>Status</h3></div>
      <div class="fv-ring-row"><svg class="fv-ring" viewBox="0 0 42 42">
        <circle class="d-bg" cx="21" cy="21" r="15.9155"/>
        <circle class="r-seg" cx="21" cy="21" r="15.9155" stroke-dasharray="94 6"/></svg>
        <div class="fv-ring-t"><b>94%</b><small>SLO 여유</small></div></div>
      <ul class="fv-bars">${[['CPU', 62], ['MEM', 71], ['DISK', 38]].map(([n, v]) =>
        `<li><span>${n}</span><div class="fv-bar"><i style="width:${v}%"></i></div><em>${v}%</em></li>`).join('')}</ul>
    </section>
  </div>
  <section class="fv-card lay-logs"><div class="fv-card-h"><h3>Live tail</h3><span class="fv-badge ok">LIVE</span></div>
    ${[['12:04:31', 'api-01', '200', 'GET /v1/orders 42ms', ''],
    ['12:04:31', 'api-02', '200', 'POST /v1/carts 38ms', ''],
    ['12:04:32', 'db-01', '503', 'connection pool exhausted — retry 2/3', 'warn'],
    ['12:04:32', 'cache', '200', 'HIT orders:1284 3ms', '']]
      .map(([t, s, c, m, cls]) => `<div class="lay-log ${cls}">
      <em>${t}</em><span class="lay-src">${s}</span><b>${c}</b><span>${m}</span></div>`).join('')}
  </section>`,
  views: {
    logs: {
      crumb: ['prod-cluster', 'Logs'], title: 'Logs', sub: '최근 15분 · 초당 1.2k 라인 · 필터 적용됨',
      actions: [['범위 15m', true, 'clock'], ['다운로드', false, 'down']],
      main: `
      ${chips(['ALL 18.2k', 'ERROR 42', 'WARN 316', 'INFO 17.8k'], 'service: all')}
      <section class="fv-card lay-logs lay-logs-full">
        ${[['12:04:31.882', 'api-01', '200', 'GET /v1/orders?page=2 42ms', ''],
        ['12:04:31.901', 'api-02', '200', 'POST /v1/carts 38ms', ''],
        ['12:04:32.104', 'db-01', '503', 'connection pool exhausted — retry 2/3', 'warn'],
        ['12:04:32.118', 'cache', '200', 'HIT orders:1284 3ms', ''],
        ['12:04:32.240', 'auth-svc', '401', 'token expired sub=u_88421', 'warn'],
        ['12:04:32.377', 'api-01', '200', 'GET /v1/users/me 11ms', ''],
        ['12:04:32.512', 'db-01', '200', 'SELECT orders 88ms slow-query', ''],
        ['12:04:32.640', 'worker', '500', 'unhandled: TypeError at parse()', 'err'],
        ['12:04:32.703', 'api-02', '200', 'DELETE /v1/carts/9912 24ms', '']]
        .map(([t, s2, c, m, cls]) => `<div class="lay-log ${cls}">
          <em>${t}</em><span class="lay-src">${s2}</span><b>${c}</b><span>${m}</span></div>`).join('')}
      </section>`,
    },
    alerts: {
      crumb: ['prod-cluster', 'Alerts'], title: 'Alerts', sub: '활성 3 · 확인 대기 1 · 최근 24시간 해소 12',
      actions: [['규칙 관리', true, 'sliders'], ['전체 확인', false, 'check']],
      main: `
      ${kpis([['bell', 'Critical', '1', 'ack 대기', ''], ['bell', 'Warning', '2', '+1', 'down'],
      ['check', '24h 해소', '12', 'MTTR 6m', ''], ['clock', '무음 규칙', '2', '', '']])}
      ${listScreen({
        filter: ['활성 3', '해소 12', '무음 2'],
        cols: [['심각도'], ['규칙'], ['대상'], ['발생'], ['상태']],
        rows: [
          [td(bdg('warn', 'CRITICAL')), td('<b>DB connection pool &gt; 90%</b>'), tdm('db-primary'), td('4분 전'), td(bdg('idle', 'ACK 대기'))],
          [td(bdg('warn', 'WARNING')), td('<b>p95 latency &gt; 200ms</b>'), tdm('db-primary'), td('12분 전'), td(bdg('mid', '조사 중'))],
          [td(bdg('warn', 'WARNING')), td('<b>5xx rate &gt; 1%</b>'), tdm('worker'), td('31분 전'), td(bdg('mid', '조사 중'))],
          [td(bdg('ok', 'RESOLVED')), td('<b>Disk usage &gt; 80%</b>'), tdm('api-02'), td('2시간 전'), td(bdg('ok', '해소'))],
        ],
      })}`,
    },
    services: {
      crumb: ['prod-cluster', 'Services'], title: 'Services', sub: '12개 서비스 · 배포 대기 2',
      actions: [['배포 이력', true, 'clock'], ['서비스 등록', false, 'plus']],
      main: listScreen({
        filter: ['전체 12', 'Healthy 10', 'Degraded 1', 'Down 1'], sort: 'SLO 낮은순',
        cols: [['서비스'], ['버전'], ['인스턴스', 1], ['p95', 1], ['SLO', 1], ['상태']],
        rows: [
          [td('<b>api-gateway</b>'), tdm('v2.14.0'), tdr('6'), tdr('42ms'), tdr('99.98%'), td(bdg('ok', 'Healthy'))],
          [td('<b>auth-svc</b>'), tdm('v1.9.3'), tdr('4'), tdr('38ms'), tdr('99.95%'), td(bdg('ok', 'Healthy'))],
          [td('<b>db-primary</b>'), tdm('pg-15.4'), tdr('1'), tdr('210ms'), tdr('98.20%'), td(bdg('warn', 'Degraded'))],
          [td('<b>worker</b>'), tdm('v0.8.1'), tdr('3'), tdr('—'), tdr('96.40%'), td(bdg('warn', 'Down'))],
          [td('<b>cache</b>'), tdm('redis-7.2'), tdr('2'), tdr('3ms'), tdr('100%'), td(bdg('ok', 'Healthy'))],
        ],
      }),
    },
    settings: {
      crumb: ['prod-cluster', 'Settings'], title: 'Settings', sub: 'ap-northeast-2 · 관리자 권한',
      main: setScreen([
        ['Retention', [
          ['Metrics 보관', '고해상도 샘플 유지 기간', sel('30일')],
          ['Logs 보관', '초과분은 S3로 이관', sel('14일')],
          ['Trace 샘플링', '요청 대비 수집 비율', inp('5%')],
        ]],
        ['Alerting', [
          ['Slack 연동', '#ops-alerts 채널로 전송', sw(true)],
          ['야간 무음', '00:00–07:00 Critical만 전송', sw(true)],
          ['자동 해소', '조건 정상화 5분 뒤 자동 종료', sw(false)],
        ]],
      ]),
    },
  },
}

/* 6. 물류 배송 관리 */
LAYOUTS.logistics = {
  domain: '물류 · 배송', chrome: 'sidebar', brand: 'HAULER', logo: 'box',
  navLabel: '운송', nav2Label: '관리',
  home: 'status',
  nav: [['box', '배송 현황', 'status'], ['cart', '출고 요청', 'outbound', '18'], ['pin', '거점', 'hubs'],
    ['users', '기사', 'drivers']],
  nav2: [['chart', '정산', 'settle'], ['sliders', '설정', 'settings']],
  crumb: ['운송', '배송 현황'], searchHint: '송장번호 · 수취인 검색',
  title: '배송 현황', sub: '오늘 출고 142건 · 지연 3건',
  actions: [['라벨 출력', true, 'down'], ['출고 등록', false, 'plus']],
  main: `
  <div class="fv-kpis">
    ${[['box', '출고 대기', '18', '−4건', 'up'], ['cart', '배송중', '96', '+12건', 'up'],
    ['check', '오늘 완료', '28', '+6건', 'up'], ['clock', '지연', '3', '+1건', 'down']]
      .map(([i, l, v, d, dir]) => `<div class="fv-kpi"><div class="fv-kpi-t"><small>${l}</small>
      <span class="fv-kpi-i">${ic(i)}</span></div><b>${v}</b><em class="${dir}">${d}</em></div>`).join('')}
  </div>
  <section class="fv-card lay-track">
    <div class="fv-card-h"><h3>KR-24810-3 · 김서연</h3><span class="fv-badge mid">배송중</span></div>
    <div class="lay-steps">
      <i class="on">${ic('check')}</i><span class="ln on"></span>
      <i class="on">${ic('check')}</i><span class="ln on"></span>
      <i class="cur">${ic('box')}</i><span class="ln"></span>
      <i>${ic('pin')}</i>
    </div>
    <div class="lay-steps-l"><span>접수<em>8/15 09:20</em></span><span>출고<em>8/16 07:10</em></span>
      <span>배송중<em>8/17 08:40</em></span><span>도착 예정<em>8/17 18:00</em></span></div>
  </section>
  <section class="fv-card"><div class="fv-card-h"><h3>배송 목록</h3><span class="fv-link">전체 보기</span></div>
    ${table([['송장번호'], ['수취인'], ['거점'], ['상태']], [
    [`<td class="mono">KR-24810-3</td>`, `<td>${av('김', 1, 'xs')}김서연</td>`, `<td>동탄 HUB</td>`, `<td><span class="fv-badge mid">배송중</span></td>`],
    [`<td class="mono">KR-24809-1</td>`, `<td>${av('이', 2, 'xs')}이준호</td>`, `<td>용인 HUB</td>`, `<td><span class="fv-badge ok">완료</span></td>`],
    [`<td class="mono">KR-24808-7</td>`, `<td>${av('박', 3, 'xs')}박민지</td>`, `<td>안성 HUB</td>`, `<td><span class="fv-badge warn">지연</span></td>`],
  ])}</section>`,
  views: {
    outbound: {
      crumb: ['운송', '출고 요청'], title: '출고 요청', sub: '대기 18건 · 오늘 마감 15:00',
      actions: [['일괄 승인', true, 'check'], ['출고 등록', false, 'plus']],
      main: `
      <div class="lay-bulk">${ic('check')}<b>3건 선택됨</b>
        <span class="fv-btn ghost">라벨 출력</span><span class="fv-btn">출고 승인</span></div>
      ${listScreen({
        filter: ['대기 18', '승인 42', '보류 3'], sort: '마감 임박순',
        cols: [[''], ['요청번호'], ['출발 거점'], ['수량', 1], ['마감'], ['상태']],
        rows: [
          [td('<i class="lay-ck on">✓</i>'), tdm('RQ-3391'), td('동탄 HUB'), tdr('120'), td('오늘 15:00'), td(bdg('idle', '대기'))],
          [td('<i class="lay-ck on">✓</i>'), tdm('RQ-3390'), td('용인 HUB'), tdr('64'), td('오늘 15:00'), td(bdg('idle', '대기'))],
          [td('<i class="lay-ck on">✓</i>'), tdm('RQ-3389'), td('안성 HUB'), tdr('210'), td('오늘 18:00'), td(bdg('idle', '대기'))],
          [td('<i class="lay-ck"></i>'), tdm('RQ-3388'), td('동탄 HUB'), tdr('18'), td('내일 09:00'), td(bdg('warn', '보류'))],
          [td('<i class="lay-ck"></i>'), tdm('RQ-3387'), td('평택 HUB'), tdr('96'), td('내일 09:00'), td(bdg('ok', '승인'))],
        ],
      })}`,
    },
    hubs: {
      crumb: ['운송', '거점'], title: '거점', sub: '운영 6곳 · 오늘 처리 1,284건',
      actions: [['지도 보기', true, 'pin'], ['거점 추가', false, 'plus']],
      main: `
      <div class="lay-hubs">
        ${[['동탄 HUB', '경기 화성', 486, 92, 'ok'], ['용인 HUB', '경기 용인', 312, 71, 'ok'],
        ['안성 HUB', '경기 안성', 268, 96, 'warn'], ['평택 HUB', '경기 평택', 124, 38, 'ok'],
        ['천안 HUB', '충남 천안', 62, 22, 'ok'], ['청주 HUB', '충북 청주', 32, 14, 'idle']]
        .map(([n, loc, cnt, load, st]) => `<div class="fv-card lay-hub">
          <div class="lay-hub-h">${ic('pin')}<div><b>${n}</b><small>${loc}</small></div>
            ${bdg(st, load >= 90 ? '포화' : st === 'idle' ? '여유' : '정상')}</div>
          <div class="lay-hub-n"><b class="num">${cnt}</b><span>오늘 처리</span></div>
          <div class="fv-bar"><i style="width:${load}%"></i></div>
          <small class="lay-hub-l">가동률 ${load}%</small>
        </div>`).join('')}
      </div>`,
    },
    drivers: {
      crumb: ['운송', '기사'], title: '기사', sub: '가동 24명 · 휴무 3명',
      actions: [['배차 자동화', true, 'sliders'], ['기사 등록', false, 'plus']],
      main: `
      ${chips(['전체 27', '가동 24', '휴무 3'], '배송 많은순')}
      ${people([
        ['김', 1, '김서연', '1톤 · 동탄 HUB', '오늘 42건', 92],
        ['이', 2, '이준호', '1톤 · 용인 HUB', '오늘 38건', 84],
        ['박', 3, '박민지', '2.5톤 · 안성 HUB', '오늘 31건', 68],
        ['최', 4, '최도윤', '1톤 · 평택 HUB', '오늘 24건', 53],
        ['정', 2, '정하늘', '1톤 · 천안 HUB', '휴무', 0],
        ['한', 3, '한서준', '2.5톤 · 동탄 HUB', '오늘 19건', 42],
        ['조', 5, '조은비', '1톤 · 용인 HUB', '오늘 29건', 64],
        ['오', 1, '오세훈', '2.5톤 · 청주 HUB', '오늘 12건', 27],
        ['윤', 4, '윤가람', '1톤 · 안성 HUB', '휴무', 0],
      ])}`,
    },
    settle: {
      crumb: ['관리', '정산'], title: '정산', sub: '2026년 8월 · 마감 9월 5일',
      actions: [['명세서', true, 'down'], ['정산 확정', false, 'check']],
      main: `
      ${kpis([['chart', '이번 달 운임', '₩84,200,000', '+6.2%', 'up'],
      ['box', '정산 건수', '3,412', '+218', 'up'],
      ['clock', '미정산', '₩4,180,000', '12건', ''],
      ['bell', '이의 신청', '2', '−1', 'up']])}
      <div class="fv-grid">
        ${card('월별 운임', '<div class="fv-seg"><span class="on">6개월</span><span>12개월</span></div>',
        areaChart(AREA, ['3월', '4월', '5월', '6월', '8월']))}
        ${card('거점별 비중', '', `<div class="fv-donut-row">${donut([['동탄', 38], ['용인', 26], ['안성', 21], ['기타', 15]])}</div>`)}
      </div>`,
    },
    settings: {
      crumb: ['관리', '설정'], title: '설정', sub: 'HAULER · 관리자 권한',
      main: setScreen([
        ['운송', [
          ['기본 출발 거점', '출고 등록 시 자동 선택', sel('동탄 HUB')],
          ['출고 마감 시각', '이 시각 이후 요청은 익일 처리', sel('15:00')],
          ['자동 배차', '거점 가동률 기준으로 기사 배정', sw(true)],
        ]],
        ['알림', [
          ['지연 알림', '예정 시각 초과 시 담당자에게 전송', sw(true)],
          ['수취인 문자', '출고·배송 시작 시 자동 발송', sw(true)],
          ['정산 마감 리마인드', '마감 3일 전 알림', sw(false)],
        ]],
      ]),
    },
  },
}

/* 7. 설계 도면 뷰어 —
   내비가 부품 목록이라 뷰마다 도면 자체가 달라야 한다.
   틀(캔버스 + 속성 + 리비전)은 공유하고 그림과 값만 바꾼다. */
const cadView = ({ name, rev, status, actions, svg, props, revs }) => ({
  crumb: [name, rev], title: name, sub: `${rev} · 1:50 · ${status}`,
  actions: actions || [['DXF 내보내기', true, 'down'], ['리비전 생성', false, 'plus']],
  main: `
  <div class="lay-cad">
    <section class="fv-card lay-canvas"><svg viewBox="0 0 420 250">${svg}</svg></section>
    <aside class="fv-card lay-insp">
      <div class="fv-card-h"><h3>속성</h3></div>
      <dl class="lay-props">${props.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>
      <div class="fv-card-h"><h3>리비전</h3></div>
      <ul class="lay-rev">${revs.map(([r, t, cls, st]) =>
    `<li><b>${r}</b><span>${t}</span><em class="fv-badge ${cls}">${st}</em></li>`).join('')}</ul>
    </aside>
  </div>`,
})

/* 7. 설계 도면 뷰어 */
LAYOUTS.drawing = {
  domain: 'CAD · 설계', chrome: 'sidebar', brand: 'DRAFT-9', logo: 'file',
  navLabel: '프로젝트', nav2Label: '도구',
  home: 'a24',
  nav: [['file', 'BRACKET-A24', 'a24'], ['file', 'HOUSING-B02', 'b02'], ['file', 'PLATE-C11', 'c11'],
    ['layers', '어셈블리', 'asm']],
  nav2: [['sliders', '치수 설정', 'dims']],
  crumb: ['BRACKET-A24', 'REV C'], searchHint: '부품번호 검색',
  title: 'BRACKET-A24', sub: 'REV C · 1:50 · 승인 대기',
  actions: [['DXF 내보내기', true, 'down'], ['리비전 생성', false, 'plus']],
  main: `
  <div class="lay-cad">
    <section class="fv-card lay-canvas">
      <svg viewBox="0 0 420 250">
        <line class="g" x1="0" y1="125" x2="420" y2="125"/><line class="g" x1="210" y1="0" x2="210" y2="250"/>
        <rect class="part" x="110" y="70" width="200" height="112" rx="8"/>
        <circle class="part" cx="160" cy="126" r="24"/><circle class="part" cx="264" cy="126" r="14"/>
        <line class="dim" x1="110" y1="46" x2="310" y2="46"/>
        <line class="dim" x1="110" y1="38" x2="110" y2="54"/><line class="dim" x1="310" y1="38" x2="310" y2="54"/>
        <text class="dtx" x="210" y="38" text-anchor="middle">240.0</text>
        <line class="dim" x1="338" y1="70" x2="338" y2="182"/>
        <line class="dim" x1="330" y1="70" x2="346" y2="70"/><line class="dim" x1="330" y1="182" x2="346" y2="182"/>
        <text class="dtx" x="354" y="130">160.0</text>
        <text class="dtx" x="160" y="100" text-anchor="middle">⌀48</text>
      </svg>
    </section>
    <aside class="fv-card lay-insp">
      <div class="fv-card-h"><h3>속성</h3></div>
      <dl class="lay-props">
        <dt>재질</dt><dd>AL 6061-T6</dd>
        <dt>두께</dt><dd>4.0 mm</dd>
        <dt>공차</dt><dd>±0.1</dd>
        <dt>표면</dt><dd>아노다이징</dd>
        <dt>수량</dt><dd>240 ea</dd>
      </dl>
      <div class="fv-card-h"><h3>리비전</h3></div>
      <ul class="lay-rev">
        <li><b>C</b><span>공차 수정</span><em class="fv-badge idle">대기</em></li>
        <li><b>B</b><span>홀 위치 변경</span><em class="fv-badge ok">승인</em></li>
        <li><b>A</b><span>초안</span><em class="fv-badge ok">승인</em></li>
      </ul>
    </aside>
  </div>`,
  views: {
    b02: cadView({
      name: 'HOUSING-B02', rev: 'REV A', status: '승인',
      svg: `
        <line class="g" x1="0" y1="125" x2="420" y2="125"/><line class="g" x1="210" y1="0" x2="210" y2="250"/>
        <circle class="part" cx="210" cy="126" r="76"/>
        <circle class="part" cx="210" cy="126" r="48"/>
        ${[0, 60, 120, 180, 240, 300].map(a => {
    const x = 210 + 62 * Math.cos(a * Math.PI / 180), y = 126 + 62 * Math.sin(a * Math.PI / 180)
    return `<circle class="part" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6"/>`
  }).join('')}
        <line class="dim" x1="134" y1="46" x2="286" y2="46"/>
        <line class="dim" x1="134" y1="38" x2="134" y2="54"/><line class="dim" x1="286" y1="38" x2="286" y2="54"/>
        <text class="dtx" x="210" y="38" text-anchor="middle">⌀152.0</text>
        <text class="dtx" x="210" y="130" text-anchor="middle">⌀96</text>
        <text class="dtx" x="300" y="180">6× ⌀12 EQ.SP</text>`,
      props: [['재질', 'SUS 304'], ['두께', '6.0 mm'], ['공차', '±0.05'], ['표면', '샌드블라스트'], ['수량', '80 ea']],
      revs: [['A', '초안 승인', 'ok', '승인']],
    }),
    c11: cadView({
      name: 'PLATE-C11', rev: 'REV B', status: '검토 중',
      svg: `
        <line class="g" x1="0" y1="125" x2="420" y2="125"/><line class="g" x1="210" y1="0" x2="210" y2="250"/>
        <rect class="part" x="70" y="66" width="280" height="120" rx="4"/>
        ${[0, 1, 2, 3, 4].map(i => [0, 1].map(j =>
    `<circle class="part" cx="${100 + i * 55}" cy="${96 + j * 60}" r="7"/>`).join('')).join('')}
        <line class="dim" x1="70" y1="46" x2="350" y2="46"/>
        <line class="dim" x1="70" y1="38" x2="70" y2="54"/><line class="dim" x1="350" y1="38" x2="350" y2="54"/>
        <text class="dtx" x="210" y="38" text-anchor="middle">336.0</text>
        <line class="dim" x1="378" y1="66" x2="378" y2="186"/>
        <line class="dim" x1="370" y1="66" x2="386" y2="66"/><line class="dim" x1="370" y1="186" x2="386" y2="186"/>
        <text class="dtx" x="414" y="130" text-anchor="end">144.0</text>
        <text class="dtx" x="100" y="220" >10× ⌀14 · PITCH 55.0</text>`,
      props: [['재질', 'SS 400'], ['두께', '8.0 mm'], ['공차', '±0.2'], ['표면', '분체도장 RAL7016'], ['수량', '40 ea']],
      revs: [['B', '홀 피치 55.0 변경', 'idle', '검토'], ['A', '초안', 'ok', '승인']],
    }),
    asm: {
      crumb: ['어셈블리', 'ASM-01'], title: '어셈블리 ASM-01', sub: '부품 4종 · 총 360 ea · 승인 대기 1',
      actions: [['BOM 내보내기', true, 'down'], ['간섭 검사', false, 'check']],
      main: `
      <div class="lay-asm">
        ${[['BRACKET-A24', 'C', 'idle', '대기'], ['HOUSING-B02', 'A', 'ok', '승인'],
        ['PLATE-C11', 'B', 'idle', '검토'], ['볼트 M8×20', '—', 'ok', '표준품']]
        .map(([n, r, cls, st]) => `<div class="fv-card lay-asm-c">
          ${ic('file', 'lay-ph')}<b>${n}</b><small>REV ${r}</small>${bdg(cls, st)}</div>`).join('')}
      </div>
      ${card('BOM', '<span class="fv-link">전체 보기</span>', table(
        [['No'], ['부품번호'], ['재질'], ['수량', 1], ['상태']], [
          [tdm('1'), td('<b>BRACKET-A24</b>'), td('AL 6061-T6'), tdr('240'), td(bdg('idle', '승인 대기'))],
          [tdm('2'), td('<b>HOUSING-B02</b>'), td('SUS 304'), tdr('80'), td(bdg('ok', '승인'))],
          [tdm('3'), td('<b>PLATE-C11</b>'), td('SS 400'), tdr('40'), td(bdg('idle', '검토'))],
          [tdm('4'), td('<b>볼트 M8×20</b>'), td('SUS 304 · 표준품'), tdr('960'), td(bdg('ok', '승인'))],
        ]), 'lay-fill')}`,
    },
    dims: {
      crumb: ['도구', '치수 설정'], title: '치수 설정', sub: '이 프로젝트의 모든 도면에 적용됩니다',
      main: setScreen([
        ['표기', [
          ['단위', '도면 전체에 적용', sel('mm')],
          ['소수 자릿수', '치수 문자 표기 정밀도', sel('1자리')],
          ['도면 표준', '치수선·화살표 규격', sel('ISO 128')],
        ]],
        ['표시', [
          ['중심선 표시', '원·호의 중심선 자동 생성', sw(true)],
          ['숨은선 표시', '가려진 형상을 파선으로', sw(false)],
          ['공차 자동 표기', '기본 공차를 치수에 병기', sw(true)],
        ]],
      ]),
    },
  },
}

/* 8. 자산관리 포트폴리오 */
LAYOUTS.portfolio = {
  domain: '금융 · 자산관리', chrome: 'sidebar', brand: 'FOREST&CO', logo: 'chart',
  navLabel: '자산', nav2Label: '설정',
  home: 'overview',
  nav: [['chart', '포트폴리오', 'overview'], ['box', '보유 자산', 'holdings'], ['trend', '거래 내역', 'trades'],
    ['users', '상담', 'advice']],
  nav2: [['sliders', '계좌 설정', 'account']],
  crumb: ['자산', '포트폴리오'], searchHint: '종목 · 거래 검색',
  title: '포트폴리오', sub: '2026년 8월 17일 09:00 기준 · KRW',
  actions: [['리포트', true, 'down'], ['입출금', false, 'plus']],
  main: `
  <div class="lay-fin">
    <div class="lay-total">
      <small>총 평가 자산</small>
      <b class="num">₩128,400,000</b>
      <div class="lay-delta"><em>+₩5,180,000</em><span>이번 분기 +4.2%</span></div>
      ${areaChart(AREA, ['5월', '6월', '7월', '8월', '현재'])}
    </div>
    <div class="lay-card-col">
      <div class="fv-kpi lay-cc"><div class="lay-chip"></div><small>PRIVATE</small><b>•••• 8841</b></div>
      <div class="fv-card lay-alloc"><div class="fv-card-h"><h3>자산 배분</h3></div>
        <div class="fv-donut-row">${donut([['주식', 46], ['채권', 28], ['현금', 16], ['대체', 10]])}</div></div>
    </div>
  </div>
  <section class="fv-card"><div class="fv-card-h"><h3>보유 종목</h3><span class="fv-link">전체 보기</span></div>
    ${table([['종목'], ['비중'], ['평가액', 1], ['수익률', 1]], [
    [`<td><b>국내 성장주 펀드</b></td>`, `<td class="mono">24.0%</td>`, `<td class="r mono">₩30,816,000</td>`, `<td class="r"><span class="fv-badge ok">+12.4%</span></td>`],
    [`<td><b>글로벌 채권 ETF</b></td>`, `<td class="mono">18.5%</td>`, `<td class="r mono">₩23,754,000</td>`, `<td class="r"><span class="fv-badge ok">+3.1%</span></td>`],
    [`<td><b>리츠 인컴</b></td>`, `<td class="mono">9.2%</td>`, `<td class="r mono">₩11,812,800</td>`, `<td class="r"><span class="fv-badge warn">−1.8%</span></td>`],
  ])}</section>`,
  views: {
    holdings: {
      crumb: ['자산', '보유 자산'], title: '보유 자산', sub: '12종목 · 평가액 ₩128,400,000',
      actions: [['리밸런싱 제안', true, 'sliders'], ['매수', false, 'plus']],
      main: `
      ${listScreen({
        filter: ['전체 12', '주식 5', '채권 3', '대체 4'], sort: '평가액순',
        cols: [['종목'], ['구분'], ['비중', 1], ['평가액', 1], ['수익률', 1]],
        rows: [
          [td('<b>국내 성장주 펀드</b>'), td('주식'), tdr('24.0%'), tdr('₩30,816,000'), td(bdg('ok', '+12.4%'), 'r')],
          [td('<b>글로벌 채권 ETF</b>'), td('채권'), tdr('18.5%'), tdr('₩23,754,000'), td(bdg('ok', '+3.1%'), 'r')],
          [td('<b>미국 대형주 인덱스</b>'), td('주식'), tdr('16.2%'), tdr('₩20,800,800'), td(bdg('ok', '+9.8%'), 'r')],
          [td('<b>리츠 인컴</b>'), td('대체'), tdr('9.2%'), tdr('₩11,812,800'), td(bdg('warn', '−1.8%'), 'r')],
          [td('<b>단기 국고채</b>'), td('채권'), tdr('8.4%'), tdr('₩10,785,600'), td(bdg('ok', '+1.2%'), 'r')],
          [td('<b>금 현물 ETF</b>'), td('대체'), tdr('6.1%'), tdr('₩7,832,400'), td(bdg('warn', '−0.4%'), 'r')],
        ],
      })}`,
    },
    trades: {
      crumb: ['자산', '거래 내역'], title: '거래 내역', sub: '최근 30일 · 18건',
      actions: [['기간 30일', true, 'clock'], ['명세서', false, 'down']],
      main: `
      ${chips(['전체 18', '매수 11', '매도 5', '입출금 2'], '최신순')}
      <div class="lay-trades">
        ${[['8/17', '매수', 'buy', '국내 성장주 펀드', '+120좌', '₩3,200,000'],
        ['8/14', '매도', 'sell', '리츠 인컴', '−80좌', '₩1,940,000'],
        ['8/11', '매수', 'buy', '미국 대형주 인덱스', '+45주', '₩5,410,000'],
        ['8/06', '입금', 'in', '연계 계좌 이체', '', '₩10,000,000'],
        ['8/02', '매수', 'buy', '단기 국고채', '+200좌', '₩2,080,000'],
        ['7/28', '매도', 'sell', '금 현물 ETF', '−30주', '₩1,120,000']]
        .map(([d, k, cls, n, q, amt]) => `<div class="lay-trade">
          <em class="lay-tdate">${d}</em>
          <span class="lay-tkind ${cls}">${k}</span>
          <b>${n}</b>
          <small>${q}</small>
          <b class="num lay-tamt">${amt}</b></div>`).join('')}
      </div>`,
    },
    advice: {
      crumb: ['자산', '상담'], title: '상담', sub: '전담 PB 배정 · 다음 정기 상담 9월 3일',
      actions: [['상담 이력', true, 'clock'], ['상담 예약', false, 'plus']],
      main: `
      <div class="lay-advice">
        <section class="fv-card lay-pb">
          <div class="lay-pb-h">${av('김', 4)}<div><b>김지현</b><small>수석 PB · 자산관리 14년</small></div></div>
          <p>포트폴리오 위험도가 목표 대비 다소 높습니다. 채권 비중을 3%p 올리는 안을 준비했습니다.</p>
          <div class="lay-slots">
            ${['9/3 10:00', '9/3 14:00', '9/5 11:00'].map((t, i) =>
        `<span class="${i === 1 ? 'on' : ''}">${t}</span>`).join('')}
          </div>
          <span class="fv-btn">${ic('check')}상담 확정</span>
        </section>
        ${card('최근 상담', '', `<ul class="lay-hist">
          ${[['6/12', '분기 리밸런싱 — 채권 비중 상향'], ['3/08', '연금 계좌 이전 검토'],
        ['1/15', '연간 자산 배분 설계']].map(([d, t]) =>
          `<li><em>${d}</em><span>${t}</span>${ic('file')}</li>`).join('')}
        </ul>`)}
      </div>`,
    },
    account: {
      crumb: ['설정', '계좌'], title: '계좌 설정', sub: 'PRIVATE •••• 8841',
      main: setScreen([
        ['계좌', [
          ['표시 통화', '평가액·수익률 표기 기준', sel('KRW (₩)')],
          ['연계 입출금 계좌', '매수 대금 자동 출금', inp('•••• 2204')],
          ['배당 처리', '수령 방식 선택', sel('자동 재투자')],
        ]],
        ['알림·보안', [
          ['일일 평가 알림', '매 영업일 09:10 발송', sw(true)],
          ['목표 이탈 경고', '자산 배분이 ±5%p 벗어나면', sw(true)],
          ['출금 2차 인증', '출금 시 OTP 추가 확인', sw(true)],
        ]],
      ]),
    },
  },
}

/* 9. 운영 칸반 보드 */
LAYOUTS.kanban = {
  domain: '운영 · 작업관리', chrome: 'sidebar', brand: 'SIGNAL', logo: 'layers',
  navLabel: '워크스페이스', nav2Label: '관리',
  home: 'board',
  nav: [['layers', '운영 보드', 'board'], ['grid', '대시보드', 'dash'], ['users', '팀', 'team', '12'],
    ['file', '문서', 'docs']],
  nav2: [['sliders', '설정', 'settings']],
  crumb: ['운영', '보드'], searchHint: '작업 · 담당자 검색',
  title: '출고 운영 보드', sub: '진행 15 · 지연 1 · 이번 주 완료 24',
  actions: [['보드 설정', true, 'sliders'], ['작업 추가', false, 'plus']],
  main: `
  <div class="lay-board">
    ${[['대기', '5', [['출고 검수 #482', '김', 1, 'idle', '오늘'], ['라벨 재발행', '이', 2, 'idle', '내일']]],
    ['진행 중', '3', [['재고 이관 요청', '박', 3, 'mid', '오늘'], ['반품 확인 #77', '최', 4, 'warn', '지연']]],
    ['검수', '4', [['정산 대조 8월', '진', 5, 'mid', '8/18']]],
    ['완료', '12', [['월간 리포트', '김', 1, 'ok', '완료'], ['거점 재고 실사', '이', 2, 'ok', '완료']]]]
      .map(([title, cnt, cards]) => `<div class="lay-col">
      <div class="lay-col-h"><b>${title}</b><span>${cnt}</span></div>
      ${cards.map(([t, ini, c, st, due]) => `<div class="lay-task">
        <b>${t}</b>
        <div class="lay-task-f">${av(ini, c, 'xs')}<span class="fv-badge ${st}">${due}</span></div>
      </div>`).join('')}
      <div class="lay-more">${ic('plus')}추가</div>
    </div>`).join('')}
  </div>`,
  views: {
    dash: {
      crumb: ['운영', '대시보드'], title: '운영 대시보드', sub: '이번 주 · 8월 11일 ~ 17일',
      actions: [['기간 주간', true, 'clock'], ['리포트', false, 'down']],
      main: `
      ${kpis([['check', '완료', '24', '+6', 'up'], ['layers', '진행 중', '15', '+2', 'up'],
      ['clock', '평균 처리', '2.4일', '−0.6일', 'up'], ['bell', '지연', '1', '−2', 'up']])}
      <div class="fv-grid">
        ${card('주간 처리량', '<div class="fv-seg"><span class="on">주간</span><span>월간</span></div>',
        areaChart(AREA, ['월', '화', '수', '목', '금']))}
        ${card('단계별 적체', '', bars([['대기', 33, '5건'], ['진행 중', 20, '3건'], ['검수', 27, '4건'], ['완료', 80, '12건']]))}
      </div>
      ${card('지연 작업', bdg('warn', '1건'), table([['작업'], ['담당'], ['단계'], ['지연']], [
        [td('<b>반품 확인 #77</b>'), tdu('최', 4, '최도윤'), td('진행 중'), td(bdg('warn', '2일'))],
      ]))}`,
    },
    team: {
      crumb: ['운영', '팀'], title: '팀', sub: '12명 · 이번 주 배정 39건',
      actions: [['업무량 균등화', true, 'sliders'], ['팀원 초대', false, 'plus']],
      main: `
      ${chips(['전체 12', '출고 5', '재고 4', '정산 3'], '업무량순')}
      ${people([
        ['김', 1, '김서연', '출고 리드', '진행 6 · 완료 12', 88],
        ['이', 2, '이준호', '출고', '진행 4 · 완료 9', 62],
        ['박', 3, '박민지', '재고', '진행 3 · 완료 11', 55],
        ['최', 4, '최도윤', '재고', '진행 5 · 완료 4', 74],
        ['정', 2, '정하늘', '정산', '진행 2 · 완료 8', 38],
        ['한', 3, '한서준', '정산', '진행 1 · 완료 6', 24],
        ['조', 5, '조은비', '출고', '진행 4 · 완료 10', 66],
        ['오', 1, '오세훈', '재고', '진행 2 · 완료 7', 34],
        ['윤', 4, '윤가람', '출고', '진행 3 · 완료 5', 45],
      ])}`,
    },
    docs: {
      crumb: ['운영', '문서'], title: '문서', sub: '48개 · 최근 수정 2시간 전',
      actions: [['템플릿', true, 'file'], ['문서 작성', false, 'plus']],
      main: `
      ${chips(['전체 48', '운영 매뉴얼 12', '체크리스트 9', '회의록 27'], '최근 수정순')}
      <div class="lay-docs">
        ${[['출고 검수 표준 절차', '운영 매뉴얼', '김', 1, '2시간 전'],
        ['반품 처리 체크리스트', '체크리스트', '이', 2, '어제'],
        ['8월 3주차 운영 회의록', '회의록', '박', 3, '2일 전'],
        ['거점 재고 실사 가이드', '운영 매뉴얼', '최', 4, '1주 전'],
        ['정산 대조 체크리스트', '체크리스트', '정', 2, '1주 전'],
        ['신규 입사자 온보딩', '운영 매뉴얼', '한', 3, '2주 전'],
        ['8월 2주차 운영 회의록', '회의록', '조', 5, '2주 전'],
        ['라벨 규격 변경 공지', '운영 매뉴얼', '오', 1, '3주 전'],
        ['분기 KPI 정의서', '회의록', '윤', 4, '1개월 전']]
        .map(([t, k, ini, c, when]) => `<div class="fv-card lay-doc">
          ${ic('file', 'lay-ph')}<b>${t}</b><small>${k}</small>
          <div class="lay-doc-f">${av(ini, c, 'xs')}<em>${when}</em></div></div>`).join('')}
      </div>`,
    },
    settings: {
      crumb: ['관리', '설정'], title: '설정', sub: 'SIGNAL · 출고 운영 보드',
      main: setScreen([
        ['보드', [
          ['기본 정렬', '카드 정렬 기준', sel('마감 임박순')],
          ['컬럼 WIP 제한', '진행 중 컬럼 최대 카드 수', inp('8')],
          ['완료 자동 보관', '완료 후 지정 기간이 지나면', sel('14일')],
        ]],
        ['알림', [
          ['담당 배정 알림', '나에게 배정되면 즉시 전송', sw(true)],
          ['마감 임박 알림', '마감 24시간 전 전송', sw(true)],
          ['일일 요약', '매일 18:00 미완료 작업 정리', sw(false)],
        ]],
      ]),
    },
  },
}

/* 10. 예약 · 헬스케어 */
LAYOUTS.booking = {
  domain: '헬스케어 · 예약', chrome: 'topnav', brand: 'MINT CLINIC',
  home: 'reserve',
  tabs: [['진료 예약', 'reserve'], ['검진 프로그램', 'programs'], ['의료진', 'doctors'], ['이용 안내', 'info']],
  topIcons: ['clock', 'users'],
  title: '종합 검진 예약', sub: '3단계 중 2단계 · 날짜와 시간을 선택하세요',
  main: `
  <div class="lay-steps-top">
    <i class="on">${ic('check')}</i><span class="ln on"></span><i class="cur">2</i><span class="ln"></span><i>3</i>
    <div class="lay-steps-tl"><span>프로그램</span><span>일시</span><span>정보 입력</span></div>
  </div>
  <div class="lay-book">
    <section class="fv-card">
      <div class="fv-card-h"><h3>2026년 8월</h3>
        <div class="fv-seg"><span>${ic('left')}</span><span>${ic('right')}</span></div></div>
      <div class="lay-cal-h">${['일', '월', '화', '수', '목', '금', '토'].map(d => `<span>${d}</span>`).join('')}</div>
      <div class="lay-cal">
        ${[...Array(31)].map((_, i) => {
    const d = i + 1
    const cls = d === 17 ? ' on' : (d < 17 || d % 7 === 0 ? ' off' : '')
    return `<span class="${cls.trim()}">${d}</span>`
  }).join('')}
      </div>
      <h4 class="lay-sub">가능한 시간</h4>
      <div class="lay-slots">
        ${[['09:00', 'off'], ['10:30', ''], ['11:00', 'on'], ['13:30', ''], ['14:30', ''], ['16:00', 'off']]
      .map(([t, c]) => `<span class="${c}">${t}</span>`).join('')}
      </div>
    </section>
    <aside class="fv-card lay-sum">
      <div class="fv-card-h"><h3>예약 요약</h3></div>
      <dl class="lay-props">
        <dt>프로그램</dt><dd>종합 검진 · 프리미엄</dd>
        <dt>일시</dt><dd>8월 17일 (월) 11:00</dd>
        <dt>담당</dt><dd>${av('진', 5, 'xs')}김지현 원장</dd>
        <dt>소요</dt><dd>약 2시간 30분</dd>
      </dl>
      <div class="lay-sum-p"><span>결제 예정</span><b class="num">₩480,000</b></div>
      <div class="lay-sum-n">${ic('clock')}검진 8시간 전부터 금식이 필요합니다</div>
      <span class="fv-btn lay-confirm">${ic('check')}예약 확정</span>
      <span class="fv-badge ok lay-left">잔여 3석</span>
    </aside>
  </div>`,
  views: {
    programs: {
      title: '검진 프로그램', sub: '4개 프로그램 · 국민건강보험 적용 항목 포함',
      main: `
      <div class="lay-plans">
        ${[['기본 검진', '390,000', 0, ['기본 혈액검사', '흉부 X-ray', '복부 초음파', '심전도'], '약 1시간 30분'],
        ['종합 검진 · 프리미엄', '480,000', 1, ['기본 검진 전 항목', '위·대장 내시경', '갑상선 초음파', '전문의 상담 30분'], '약 2시간 30분'],
        ['여성 정밀', '520,000', 0, ['기본 검진 전 항목', '유방 촬영술', '자궁경부 검사', '골밀도 검사'], '약 2시간'],
        ['시니어 케어', '610,000', 0, ['기본 검진 전 항목', '경동맥 초음파', '뇌 MRI', '인지기능 평가'], '약 3시간']]
        .map(([n, p, best, items, dur]) => `<article class="fv-card lay-plan${best ? ' on' : ''}">
          ${best ? bdg('ok', '가장 많이 선택') : ''}
          <h3>${n}</h3>
          <div class="lay-plan-p"><b class="num">₩${p}</b><small>${dur}</small></div>
          <ul class="lay-plan-l">${items.map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul>
          <span class="fv-btn${best ? '' : ' ghost'}">선택</span>
        </article>`).join('')}
      </div>`,
    },
    doctors: {
      title: '의료진', sub: '전문의 9명 · 진료과 5개',
      main: `
      ${chips(['전체 9', '내과 4', '영상의학과 2', '가정의학과 3'], '예약 가능순')}
      <div class="lay-docs-g">
        ${[['김', 4, '김지현', '검진센터 원장 · 가정의학과', '오늘 3자리', 1],
        ['이', 3, '이서준', '내과 · 소화기', '오늘 1자리', 1],
        ['박', 1, '박수현', '영상의학과', '내일 5자리', 0],
        ['정', 2, '정민아', '내과 · 내분비', '오늘 마감', 0],
        ['최', 5, '최윤호', '가정의학과', '내일 2자리', 0],
        ['한', 3, '한소영', '영상의학과', '오늘 4자리', 1],
        ['조', 4, '조은비', '내과 · 순환기', '내일 3자리', 0],
        ['오', 1, '오세훈', '가정의학과', '오늘 2자리', 1],
        ['윤', 2, '윤가람', '내과 · 소화기', '오늘 마감', 0]]
        .map(([ini, c, n, dept, slot, hot]) => `<div class="fv-card lay-doc-c">
          ${av(ini, c)}<b>${n}</b><small>${dept}</small>
          ${bdg(hot ? 'ok' : 'idle', slot)}
          <span class="fv-btn ghost">예약</span></div>`).join('')}
      </div>`,
    },
    info: {
      title: '이용 안내', sub: '검진 전 준비사항과 자주 묻는 질문',
      main: `
      <div class="lay-info">
        <section class="fv-card">
          <div class="fv-card-h"><h3>검진 전 준비</h3></div>
          <ul class="lay-prep">
            ${[['clock', '금식', '검진 8시간 전부터 물을 포함해 금식합니다'],
        ['check', '복용약', '혈압약은 검진 당일 아침에도 복용하세요'],
        ['pin', '방문', '접수는 예약 시각 15분 전까지 1층 검진센터'],
        ['file', '지참', '신분증과 건강보험증을 가져오세요']]
        .map(([g, t, d]) => `<li>${ic(g)}<div><b>${t}</b><small>${d}</small></div></li>`).join('')}
          </ul>
        </section>
        <aside>
          ${card('자주 묻는 질문', '', `<ul class="lay-faq">
            ${[['검진 결과는 언제 나오나요?', '기본 항목은 3일, 조직검사 포함 시 7~10일 소요됩니다.'],
        ['예약 변경이 가능한가요?', '검진 2일 전까지 앱 또는 전화로 변경할 수 있습니다.'],
        ['주차 지원이 되나요?', '검진 당일 4시간 무료 주차가 지원됩니다.']]
          .map(([q, a], i) => `<li${i === 0 ? ' class="on"' : ''}>
              <div class="lay-q"><b>${q}</b>${ic('chev')}</div>
              ${i === 0 ? `<p>${a}</p>` : ''}</li>`).join('')}
          </ul>`)}
          ${card('오시는 길', '', `<div class="lay-map">${ic('pin', 'lay-ph')}</div>
            <dl class="lay-props"><dt>주소</dt><dd>서울 강남구 테헤란로 120 3층</dd>
            <dt>전화</dt><dd>02-1234-5678</dd>
            <dt>진료</dt><dd>평일 08:30–17:30 · 토 08:30–12:30</dd></dl>`)}
        </aside>
      </div>`,
    },
  },
}

/* 11. 교육 · 클래스 (LMS) */
LAYOUTS.course = {
  domain: '교육 · 클래스', chrome: 'sidebar', brand: 'CLASSKIT', logo: 'cap',
  navLabel: '학습', nav2Label: '기록',
  home: 'learn',
  nav: [['grid', '내 학습', 'mylearn'], ['play', '수강 중', 'learn'], ['search', '강의 찾기', 'catalog'],
    ['file', '과제·퀴즈', 'assign', '2']],
  nav2: [['cap', '수료증', 'cert'], ['sliders', '설정', 'settings']],
  crumb: ['수강 중', '리액트 실전'], searchHint: '강의 · 강사 검색',
  title: '리액트 실전 · 상태 관리', sub: '챕터 4 / 12 · 03 useReducer · 남은 시간 19분',
  actions: [['수강 자료', true, 'down'], ['다음 차시', false, 'right']],
  main: `
  <div class="lms-learn">
    <aside class="fv-card lms-curr">
      <div class="fv-card-h"><h3>커리큘럼</h3><span class="fv-link">전체 12</span></div>
      <div class="lms-prog"><div class="fv-bar"><i style="width:38%"></i></div><em>38%</em></div>
      ${[['챕터 3 · 렌더링', [['01 리렌더 추적', '12:40', 'done'], ['02 memo 다루기', '18:02', 'done']]],
      ['챕터 4 · 상태 관리', [['01 훅으로 생각하기', '14:20', 'done'], ['02 useState 패턴', '21:08', 'done'],
        ['03 useReducer', '31:20', 'on'], ['04 Context 설계', '26:44', '']]]]
      .map(([ch, ls]) => `<div class="lms-ch">${ch}</div>
        ${ls.map(([t, d, st]) => `<div class="lms-lesson ${st}">
          <i class="lms-dot"></i><span>${t}</span><em>${d}</em></div>`).join('')}`).join('')}
    </aside>
    <section class="lms-stage">
      <div class="fv-card lms-video">
        <span class="lms-play">${ic('play', 'fv-i lms-play-i')}</span>
        <div class="lms-ctl">
          <em>12:04</em><div class="fv-bar"><i style="width:38%"></i></div><em>31:20</em>
          <span class="lms-rate">1.0×</span><span class="lms-cc">자막</span>
        </div>
      </div>
      <div class="fv-seg lms-tabs"><span class="on">강의 노트</span><span>질문 12</span><span>자료 3</span></div>
      <div class="fv-card lms-note">
        <p><b>useReducer는 상태가 아니라 전이를 설계하는 도구다.</b>
        useState 가 늘어나 서로를 참조하기 시작하면 그때가 옮길 시점이다.</p>
        <ul><li>액션 이름은 "무엇을 했는가"로 짓는다 — <code>SET_X</code> 가 아니라 <code>SUBMITTED</code></li>
        <li>리듀서 안에서 비동기를 부르지 않는다</li></ul>
      </div>
    </section>
  </div>`,
  views: {
    mylearn: {
      crumb: ['학습', '내 학습'], title: '내 학습', sub: '수강 중 3개 · 이번 주 4.2시간',
      actions: [['학습 통계', true, 'chart'], ['강의 찾기', false, 'plus']],
      main: `
      ${kpis([['play', '수강 중', '3', '이번 주 +1', 'up'], ['clock', '이번 주 학습', '4.2시간', '+1.1시간', 'up'],
      ['check', '연속 학습', '12일', '최고 21일', ''], ['cap', '수료', '5', '+1', 'up']])}
      <h4 class="lay-sub">이어보기</h4>
      <div class="lms-resumes">
        ${[['리액트 실전', '김서연', 38, '3 / 12 차시', 1], ['타입스크립트 입문', '이준호', 72, '9 / 14 차시', 5],
        ['디자인 시스템 구축', '박민지', 15, '2 / 18 차시', 3]]
        .map(([t, who, pct, n, c]) => `<div class="fv-card lms-resume">
          <i class="lms-thumb" data-c="${c}">${ic('play', 'fv-i lms-thumb-i')}</i>
          <div class="lms-resume-t"><b>${t}</b><small>${who} 강사</small></div>
          <div class="fv-bar"><i style="width:${pct}%"></i></div>
          <div class="lms-resume-f"><em>${n}</em><span>${pct}%</span></div>
        </div>`).join('')}
      </div>
      ${card('마감 임박', bdg('warn', '2건'), table([['과제'], ['강의'], ['마감'], ['상태']], [
        [td('<b>리듀서 리팩터링</b>'), td('리액트 실전'), td('내일 23:59'), td(bdg('warn', '미제출'))],
        [td('<b>타입 좁히기 퀴즈</b>'), td('타입스크립트 입문'), td('8/20'), td(bdg('mid', '진행 중'))],
      ]))}`,
    },
    catalog: {
      crumb: ['학습', '강의 찾기'], title: '강의 찾기', sub: '전체 248개 · 이번 주 신규 12개',
      actions: [['필터', true, 'filter']],
      main: `
      ${chips(['전체 248', '프론트엔드 86', '디자인 54', '데이터 41', '기획 27'], '인기순')}
      <div class="lms-courses">
        ${[['리액트 실전', '김서연', '4.9', '1,284', '88,000', 1], ['타입스크립트 입문', '이준호', '4.8', '962', '66,000', 5],
        ['디자인 시스템 구축', '박민지', '5.0', '431', '124,000', 3], ['SQL 데이터 분석', '최도윤', '4.7', '2,108', '55,000', 4],
        ['UX 리서치 기초', '정하늘', '4.8', '688', '72,000', 2], ['서비스 기획 실무', '한서준', '4.6', '1,004', '59,000', 1]]
        .map(([t, who, star, cnt, price, c]) => `<article class="fv-card lms-course">
          <i class="lms-thumb" data-c="${c}">${ic('cap', 'fv-i lms-thumb-i')}</i>
          <b>${t}</b><small>${who} 강사</small>
          <div class="lms-rate-row">${ic('star', 'lay-star')}<em>${star}</em><span>(${cnt})</span></div>
          <b class="num lms-price">₩${price}</b>
        </article>`).join('')}
      </div>`,
    },
    assign: {
      crumb: ['학습', '과제·퀴즈'], title: '과제·퀴즈', sub: '미제출 2 · 채점 대기 1 · 평균 92점',
      actions: [['제출 이력', true, 'clock'], ['미제출만 보기', false, 'filter']],
      main: listScreen({
        filter: ['전체 14', '미제출 2', '채점 대기 1', '완료 11'], sort: '마감 임박순',
        cols: [['과제'], ['강의'], ['유형'], ['마감'], ['점수', 1], ['상태']],
        rows: [
          [td('<b>리듀서 리팩터링</b>'), td('리액트 실전'), td('과제'), td('내일 23:59'), tdr('—'), td(bdg('warn', '미제출'))],
          [td('<b>타입 좁히기 퀴즈</b>'), td('타입스크립트 입문'), td('퀴즈'), td('8/20'), tdr('—'), td(bdg('mid', '진행 중'))],
          [td('<b>토큰 설계 과제</b>'), td('디자인 시스템 구축'), td('과제'), td('8/22'), tdr('—'), td(bdg('idle', '대기'))],
          [td('<b>훅 기초 퀴즈</b>'), td('리액트 실전'), td('퀴즈'), td('8/12'), tdr('96'), td(bdg('ok', '완료'))],
          [td('<b>조인 실습</b>'), td('SQL 데이터 분석'), td('과제'), td('8/08'), tdr('88'), td(bdg('ok', '완료'))],
        ],
      }),
    },
    cert: {
      crumb: ['기록', '수료증'], title: '수료증', sub: '취득 5개 · 최근 8월 3일',
      actions: [['PDF 내려받기', true, 'down'], ['링크 공유', false, 'file']],
      main: `
      <div class="lms-certs">
        ${[['프론트엔드 기초 과정', '2026. 8. 3', 'CK-2608-0412'], ['UX 리서치 기초', '2026. 6. 21', 'CK-2606-0288'],
        ['SQL 데이터 분석', '2026. 4. 9', 'CK-2604-0177'], ['서비스 기획 실무', '2026. 2. 14', 'CK-2602-0061']]
        .map(([t, d, no]) => `<div class="fv-card lms-cert">
          ${ic('cap', 'fv-i lms-cert-i')}
          <b>${t}</b><small>발급 ${d}</small>
          <code class="lms-cert-no">${no}</code>
          ${bdg('ok', '인증 완료')}
        </div>`).join('')}
      </div>`,
    },
    settings: {
      crumb: ['기록', '설정'], title: '설정', sub: '학습 환경과 알림',
      main: setScreen([
        ['학습', [
          ['기본 재생 속도', '새 차시를 열 때 적용', sel('1.0×')],
          ['자막', '기본 표시 언어', sel('한국어')],
          ['자동 다음 차시', '차시가 끝나면 이어서 재생', sw(true)],
        ]],
        ['알림', [
          ['과제 마감 알림', '마감 24시간 전 전송', sw(true)],
          ['질문 답변 알림', '내 질문에 답이 달리면', sw(true)],
          ['신규 강의 추천', '주 1회 관심 분야 기준', sw(false)],
        ]],
      ]),
    },
  },
}

/* 12. 커뮤니티 · 소셜 */
LAYOUTS.community = {
  domain: '커뮤니티 · 소셜', chrome: 'sidebar', brand: 'LOUNGE', logo: 'msg',
  navLabel: '둘러보기', nav2Label: '나',
  home: 'feed',
  nav: [['grid', '피드', 'feed'], ['trend', '인기', 'trending'], ['layers', '주제', 'topics'],
    ['bell', '알림', 'notif', '5']],
  nav2: [['users', '내 활동', 'mine'], ['sliders', '설정', 'settings']],
  crumb: ['자취·살림', '피드'], searchHint: '글 · 태그 · 사용자 검색',
  title: '자취·살림', sub: '멤버 12,480명 · 오늘 새 글 84개',
  actions: [['주제 구독', true, 'plus'], ['글쓰기', false, 'plus']],
  main: `
  <div class="rl-feed">
    <section class="rl-list">
      ${chips(['최신', '인기', '댓글 많은순'])}
      ${[['서', 1, '김서연', '2시간 전', '원룸 6평, 수납만으로 바뀐 것들', ['자취', '수납'], 128, 24, true],
      ['준', 2, '이준호', '4시간 전', '자취 3년차가 정리한 필수템 12개', ['자취', '리뷰'], 96, 18, false],
      ['민', 3, '박민지', '어제', '월세 계약 전 확인한 체크리스트 공유', ['계약', '정보'], 214, 41, false],
      ['도', 4, '최도윤', '어제', '주방 좁을 때 도마 두는 자리', ['주방'], 42, 7, false]]
      .map(([ini, c, who, when, t, tags, up, cm, on]) => `<article class="rl-item${on ? ' on' : ''}">
        <div class="rl-vote"><span class="rl-up">${ic('up', 'fv-i')}</span><b>${up}</b></div>
        <div class="rl-item-b">
          <div class="rl-by">${av(ini, c, 'xs')}<b>${who}</b><small>· ${when}</small></div>
          <h4>${t}</h4>
          <div class="rl-tags">${tags.map(x => `<span>#${x}</span>`).join('')}</div>
        </div>
        <em class="rl-cm">${ic('msg', 'fv-i')}${cm}</em>
      </article>`).join('')}
    </section>
    <aside class="fv-card rl-detail">
      <div class="rl-by">${av('서', 1, 'sm')}<b>김서연</b><small>· 2시간 전</small>
        <span class="fv-link rl-more">···</span></div>
      <h3>원룸 6평, 수납만으로 바뀐 것들</h3>
      <p>버리는 것부터 시작했습니다. 선반은 90cm 위로 올리지 않았고, 문 뒤 공간을 처음으로 썼어요.</p>
      <div class="rl-acts"><span class="fv-btn ghost">${ic('heart')}128</span>
        <span class="fv-btn ghost">${ic('msg')}24</span><span class="fv-btn ghost">저장</span></div>
      <div class="rl-thread">
        <div class="rl-cmt">${av('준', 2, 'xs')}<div><b>이준호</b>
          <p>선반 높이 몇으로 하셨나요? 저도 같은 평수인데 참고하고 싶어요.</p></div></div>
        <div class="rl-cmt nest">${av('서', 1, 'xs')}<div><b>김서연</b>
          <p>90cm요. 그 위는 손이 안 닿더라고요.</p></div></div>
        <div class="rl-cmt">${av('민', 3, 'xs')}<div><b>박민지</b>
          <p>문 뒤 공간 아이디어 좋네요. 사진 더 볼 수 있을까요?</p></div></div>
      </div>
      <div class="rl-input">${av('진', 5, 'xs')}<span>댓글을 남겨보세요</span></div>
    </aside>
  </div>`,
  views: {
    trending: {
      crumb: ['둘러보기', '인기'], title: '인기', sub: '최근 24시간 · 반응순',
      actions: [['기간 24시간', true, 'clock']],
      main: `
      ${chips(['24시간', '이번 주', '이번 달'], '반응순')}
      <div class="rl-rank">
        ${[[1, '월세 계약 전 확인한 체크리스트 공유', '박민지', 3, 214, 41, 100],
        [2, '원룸 6평, 수납만으로 바뀐 것들', '김서연', 1, 128, 24, 62],
        [3, '자취 3년차가 정리한 필수템 12개', '이준호', 2, 96, 18, 47],
        [4, '혼자 사는 사람의 냉장고 정리법', '정하늘', 2, 71, 12, 35],
        [5, '주방 좁을 때 도마 두는 자리', '최도윤', 4, 42, 7, 21]]
        .map(([n, t, who, c, up, cm, w]) => `<div class="rl-rank-r">
          <b class="rl-rank-n">${n}</b>
          <div class="rl-rank-t"><b>${t}</b><small>${av(who[0], c, 'xs')}${who}</small></div>
          <div class="fv-bar rl-rank-b"><i style="width:${w}%"></i></div>
          <em>♡ ${up}</em><em>${ic('msg', 'fv-i')}${cm}</em>
        </div>`).join('')}
      </div>`,
    },
    topics: {
      crumb: ['둘러보기', '주제'], title: '주제', sub: '구독 4개 · 전체 28개',
      actions: [['주제 만들기', false, 'plus']],
      main: `
      ${chips(['전체 28', '구독 중 4', '신규 3'], '멤버순')}
      <div class="rl-topics">
        ${[['자취·살림', '12,480', 84, 1, true], ['인테리어', '9,210', 52, 0, true],
        ['요리·레시피', '18,004', 121, 0, false], ['반려동물', '7,662', 38, 0, true],
        ['운동·기록', '5,140', 27, 0, false], ['책·기록', '3,208', 11, 0, false]]
        .map(([n, mem, today, isNew, sub]) => `<div class="fv-card rl-topic">
          <div class="rl-topic-h"><i class="rl-topic-i">${ic('layers', 'fv-i')}</i>
            <div><b>${n}</b><small>멤버 ${mem}</small></div>
            ${isNew ? bdg('ok', 'NEW') : ''}</div>
          <em>오늘 새 글 ${today}개</em>
          <span class="fv-btn${sub ? ' ghost' : ''}">${sub ? '구독 중' : '구독'}</span>
        </div>`).join('')}
      </div>`,
    },
    notif: {
      crumb: ['둘러보기', '알림'], title: '알림', sub: '읽지 않음 5개',
      actions: [['모두 읽음', true, 'check'], ['알림 설정', false, 'sliders']],
      main: `
      ${chips(['전체 32', '댓글 12', '멘션 3', '좋아요 17'])}
      <div class="rl-notifs">
        ${[['msg', '준', 2, '<b>이준호</b>님이 회원님 글에 댓글을 남겼습니다', '선반 높이 몇으로 하셨나요?', '10분 전', true],
        ['heart', '민', 3, '<b>박민지</b>님 외 12명이 회원님 글을 좋아합니다', '원룸 6평, 수납만으로…', '1시간 전', true],
        ['users', '도', 4, '<b>최도윤</b>님이 회원님을 팔로우했습니다', '', '3시간 전', true],
        ['msg', '하', 2, '<b>정하늘</b>님이 회원님을 멘션했습니다', '@김서연 님 방법 따라해봤어요', '어제', false],
        ['bell', '', 0, '<b>자취·살림</b> 주제에 오늘 새 글 84개', '', '어제', false]]
        .map(([g, ini, c, txt, sub, when, unread]) => `<div class="rl-notif${unread ? ' unread' : ''}">
          <i class="rl-notif-i">${ic(g, 'fv-i')}</i>
          ${ini ? av(ini, c, 'xs') : ''}
          <div class="rl-notif-t"><span>${txt}</span>${sub ? `<small>${sub}</small>` : ''}</div>
          <em>${when}</em>${unread ? '<i class="rl-dot"></i>' : ''}
        </div>`).join('')}
      </div>`,
    },
    mine: {
      crumb: ['나', '내 활동'], title: '내 활동', sub: '가입 2024년 3월 · 활동 점수 1,284',
      actions: [['프로필 편집', true, 'sliders'], ['글쓰기', false, 'plus']],
      main: `
      <div class="rl-me">
        ${av('진', 5)}
        <div><b>박진우</b><small>@jinwoo · 자취·살림 외 3개 주제</small></div>
        <div class="rl-me-s"><span><b>84</b>글</span><span><b>612</b>댓글</span>
          <span><b>1,204</b>받은 좋아요</span><span><b>318</b>팔로워</span></div>
      </div>
      ${listScreen({
        filter: ['내 글 84', '내 댓글 612', '저장 47'], sort: '최신순',
        cols: [['제목'], ['주제'], ['작성'], ['좋아요', 1], ['댓글', 1]],
        rows: [
          [td('<b>문 뒤 공간 쓰는 법</b>'), td('자취·살림'), td('3일 전'), tdr('96'), tdr('14')],
          [td('<b>6평에서 2년 살고 남은 것</b>'), td('자취·살림'), td('1주 전'), tdr('212'), tdr('38')],
          [td('<b>싱크대 아래 정리 후기</b>'), td('인테리어'), td('2주 전'), tdr('54'), tdr('9')],
          [td('<b>이사 체크리스트 v2</b>'), td('자취·살림'), td('1개월 전'), tdr('331'), tdr('62')],
        ],
      })}`,
    },
    settings: {
      crumb: ['나', '설정'], title: '설정', sub: '공개 범위와 알림',
      main: setScreen([
        ['공개 범위', [
          ['프로필 공개', '비공개로 두면 팔로워만 볼 수 있습니다', sel('전체 공개')],
          ['활동 기록', '내 댓글·좋아요를 프로필에 표시', sw(true)],
          ['멘션 허용', '나를 멘션할 수 있는 범위', sel('팔로우한 사람')],
        ]],
        ['알림', [
          ['내 글의 댓글', '새 댓글이 달리면 즉시 전송', sw(true)],
          ['멘션', '누군가 나를 언급하면', sw(true)],
          ['주제 요약', '구독 주제의 인기 글 주 1회', sw(false)],
        ]],
      ]),
    },
  },
}

/* 13. 공공 · 기관 포털 */
LAYOUTS.civic = {
  domain: '공공 · 기관', chrome: 'topnav', brand: '○○시청',
  home: 'portal',
  tabs: [['자주 찾는 서비스', 'portal'], ['민원 신청', 'apply'], ['공지·고시', 'notice'],
    ['신청 내역', 'status'], ['기관 안내', 'info']],
  topIcons: ['search', 'users'],
  title: '민원 서비스', sub: '온라인으로 신청하고 결과를 받아보세요',
  main: `
  <div class="civ-alert">${ic('bell')}<b>[안내]</b>
    <span>8월 20일 02:00~04:00 시스템 점검으로 온라인 민원 신청이 중단됩니다.</span>
    <span class="fv-link">자세히</span></div>
  <div class="civ-search">${ic('search')}<span>어떤 민원을 찾으세요?</span>
    <span class="fv-btn">검색</span></div>
  <h4 class="lay-sub">자주 찾는 서비스</h4>
  <div class="civ-tiles">
    ${[['file', '주민등록등본'], ['gov', '건축물대장'], ['chart', '지방세 납부'], ['users', '여권 재발급'],
    ['box', '전입신고'], ['check', '인감증명'], ['cal', '차량 등록'], ['pin', '토지대장']]
    .map(([g, n]) => `<a class="civ-tile">${ic(g)}<span>${n}</span></a>`).join('')}
  </div>
  <div class="civ-two">
    ${card('공지·고시', '<span class="fv-link">더보기</span>', `<ul class="civ-list">
      ${[['2026년 하반기 청년 월세 지원 신청 안내', '복지정책과', '08-17', true],
    ['도시계획시설 결정 변경 고시', '도시계획과', '08-15', false],
    ['여름철 하천 출입 통제 안내', '안전총괄과', '08-12', false]]
      .map(([t, dept, d, isNew]) => `<li><span>${t}</span>${isNew ? bdg('ok', '신규') : ''}
        <em>${dept}</em><em>${d}</em></li>`).join('')}
    </ul>`)}
    ${card('민원 처리 현황', '', `<div class="civ-stat">
      ${[['접수', '1,284'], ['처리 중', '96'], ['완료', '1,188']]
      .map(([l, v]) => `<div><b class="num">${v}</b><small>${l}</small></div>`).join('')}
    </div>
    <div class="civ-note">${ic('clock')}평균 처리 기간 <b>3.2일</b> · 전월 대비 0.4일 단축</div>`)}
  </div>`,
  views: {
    apply: {
      title: '민원 신청', sub: '주민등록등본 발급 · 3단계 중 2단계',
      main: `
      <div class="civ-steps">
        <i class="on">${ic('check')}</i><span class="ln on"></span><i class="cur">2</i>
        <span class="ln"></span><i>3</i>
        <div class="civ-steps-l"><span>본인 인증</span><span>신청 정보</span><span>수령 방법</span></div>
      </div>
      <div class="civ-form">
        <section class="fv-card">
          <div class="fv-card-h"><h3>신청 정보</h3></div>
          ${[['성명', '필수', '박진우'], ['주민등록번호', '필수', '900101-1******'],
        ['주소', '필수', '서울특별시 ○○구 ○○로 12'], ['발급 통수', '필수', '1통'],
        ['용도', '선택', '금융기관 제출용']]
        .map(([l, req, v]) => `<div class="civ-field">
          <label>${l}${req === '필수' ? '<em>필수</em>' : '<span>선택</span>'}</label>
          <span class="lay-inp">${v}</span></div>`).join('')}
        </section>
        <aside>
          <div class="civ-warn">${ic('bell')}<div><b>주민등록번호 뒷자리 표시 여부</b>
            <span>금융기관 제출용은 뒷자리가 필요합니다. 잘못 선택하면 재발급해야 합니다.</span></div></div>
          ${card('수수료', '', `<div class="civ-fee"><span>발급 수수료</span><b class="num">₩0</b></div>
            <small class="civ-fee-n">온라인 발급은 무료입니다</small>`)}
          <div class="civ-acts"><span class="fv-btn ghost">이전</span><span class="fv-btn">다음 단계</span></div>
        </aside>
      </div>`,
    },
    notice: {
      title: '공지·고시', sub: '전체 412건 · 이번 달 18건',
      actions: [['부서별 보기', true, 'filter']],
      main: listScreen({
        filter: ['전체 412', '공지 210', '고시·공고 168', '입찰 34'], sort: '최신순',
        cols: [['번호'], ['제목'], ['담당 부서'], ['등록일'], ['조회', 1]],
        rows: [
          [tdm('412'), td('<b>2026년 하반기 청년 월세 지원 신청 안내</b> ' + bdg('ok', '신규')), td('복지정책과'), td('2026-08-17'), tdr('2,841')],
          [tdm('411'), td('<b>도시계획시설 결정 변경 고시</b>'), td('도시계획과'), td('2026-08-15'), tdr('1,204')],
          [tdm('410'), td('<b>여름철 하천 출입 통제 안내</b>'), td('안전총괄과'), td('2026-08-12'), tdr('3,662')],
          [tdm('409'), td('<b>공공시설 이용료 감면 대상 확대</b>'), td('재무과'), td('2026-08-11'), tdr('942')],
          [tdm('408'), td('<b>노후 상수도관 교체 공사 입찰 공고</b>'), td('상수도사업소'), td('2026-08-08'), tdr('518')],
        ],
        page: [1, 5],
      }),
    },
    status: {
      title: '신청 내역', sub: '최근 1년 · 8건',
      actions: [['기간 1년', true, 'clock'], ['영수증 출력', false, 'down']],
      main: `
      ${kpis([['file', '전체 신청', '8', '', ''], ['clock', '처리 중', '1', '', ''],
      ['check', '완료', '6', '', ''], ['bell', '반려', '1', '보완 필요', '']])}
      ${listScreen({
        filter: ['전체 8', '처리 중 1', '완료 6', '반려 1'],
        cols: [['접수번호'], ['민원명'], ['신청일'], ['처리 기한'], ['상태']],
        rows: [
          [tdm('2026-08-0412'), td('<b>주민등록등본 발급</b>'), td('2026-08-17'), td('2026-08-18'), td(bdg('mid', '처리 중'))],
          [tdm('2026-08-0288'), td('<b>건축물대장 열람</b>'), td('2026-08-11'), td('2026-08-12'), td(bdg('ok', '완료'))],
          [tdm('2026-07-1104'), td('<b>전입신고</b>'), td('2026-07-29'), td('2026-07-31'), td(bdg('ok', '완료'))],
          [tdm('2026-07-0921'), td('<b>인감증명 발급</b>'), td('2026-07-14'), td('2026-07-15'), td(bdg('warn', '반려 · 보완'))],
        ],
      })}`,
    },
    info: {
      title: '기관 안내', sub: '조직·연락처·찾아오시는 길',
      main: `
      <div class="civ-info">
        ${card('부서 안내', '<span class="fv-link">조직도</span>', `<ul class="civ-dept">
          ${[['민원여권과', '02-1234-5601', '증명 발급 · 여권'],
        ['복지정책과', '02-1234-5610', '청년·노인·장애인 지원'],
        ['도시계획과', '02-1234-5622', '지구단위계획 · 고시'],
        ['안전총괄과', '02-1234-5630', '재난 · 시설 안전']]
          .map(([n, tel, role]) => `<li><b>${n}</b><span>${role}</span><em class="mono">${tel}</em></li>`).join('')}
        </ul>`)}
        <aside>
          ${card('찾아오시는 길', '', `<div class="civ-map">${ic('pin', 'lay-ph')}</div>
            <dl class="lay-props"><dt>주소</dt><dd>서울특별시 ○○구 시청로 1</dd>
            <dt>대표전화</dt><dd>02-1234-5600</dd>
            <dt>운영시간</dt><dd>평일 09:00–18:00 (점심 12:00–13:00)</dd></dl>`)}
          <div class="civ-warn">${ic('check')}<div><b>웹접근성 인증 마크</b>
            <span>이 누리집은 KWCAG 2.2 AA 기준을 준수합니다.</span></div></div>
        </aside>
      </div>`,
    },
  },
}

/* 14. 브랜드 · 랜딩 */
LAYOUTS.landing = {
  domain: '브랜드 · 랜딩', chrome: 'topnav', brand: 'A—DEW',
  home: 'hero',
  tabs: [['제품', 'hero'], ['기능', 'features'], ['요금', 'plans'], ['사례', 'cases'], ['문의', 'contact']],
  topIcons: ['search'],
  main: `
  <div class="mono-hero">
    <div class="mono-kick">v2.0 — 지금 공개</div>
    <h1 class="mono-h">디자인을<br>결정으로</h1>
    <p class="mono-lede">보여주고, 고르고, 견적까지 한 번에.
      말로 설명하던 디자인 요구사항을 화면과 숫자로 바꿉니다.</p>
    <div class="mono-cta"><span class="fv-btn">시작하기</span>
      <span class="fv-btn ghost">데모 보기 ${ic('right')}</span></div>
    <div class="mono-stats">
      ${[['14', '스타일 스킨'], ['66', '전환 화면'], ['8', '분야 가이드'], ['3분', '견적까지']]
      .map(([v, l]) => `<div><b class="num">${v}</b><small>${l}</small></div>`).join('')}
    </div>
  </div>
  <div class="mono-logos">
    <small>이미 쓰고 있는 팀</small>
    ${['ACME', 'NORTHWIND', 'KITE&CO', 'LOOP', 'STUDIO CLAY'].map(n => `<span>${n}</span>`).join('')}
  </div>`,
  views: {
    features: {
      main: `
      <div class="mono-sec"><small>기능</small><h2 class="num">필요한 건 세 가지뿐</h2></div>
      <div class="mono-feats">
        ${[['01', '보여주기', '스킨 14종이 각자 자기 분야의 실제 화면을 연기합니다. 색만 바꾼 목업이 아닙니다.', 'layers'],
        ['02', '좁히기', '분야를 고르면 질문 → 관례 레이아웃 → 어울리는 스킨 순서로 요구사항이 좁혀집니다.', 'filter'],
        ['03', '값 매기기', '화면·스킨 난이도·옵션으로 견적이 즉시 계산됩니다. 근거는 문서에 있습니다.', 'chart']]
        .map(([n, t, d, g]) => `<article class="mono-feat">
          <div class="mono-feat-h"><em>${n}</em>${ic(g)}</div>
          <h3>${t}</h3><p>${d}</p>
          <span class="fv-link">자세히 ${ic('right')}</span>
        </article>`).join('')}
      </div>
      <div class="mono-band">
        <b class="num">색만 바꾼 목업 10장으로는 아무도 문의하지 않습니다.</b>
        <span class="fv-btn">전체 화면 보기</span>
      </div>`,
    },
    plans: {
      main: `
      <div class="mono-sec"><small>요금</small><h2 class="num">화면 수로 정합니다</h2>
        <p>시간이 아니라 산출물 기준. 부풀릴 자리가 없습니다.</p></div>
      <div class="mono-plans">
        ${[['라이트', '2,000,000', '최소 진행 금액', ['화면 5개까지', '스킨 1종', '시안 1차 + 수정 2회'], false],
        ['스탠다드', '5,500,000', '가장 많이 선택', ['화면 12개', '라이트/다크 쌍', '모바일 반응형', '컴포넌트 문서'], true],
        ['풀스코프', '견적 문의', '분야 가이드 포함', ['화면 20개 이상', '디자인 시스템 문서화', '접근성 대응', '개발 핸드오프'], false]]
        .map(([n, p, note, items, best]) => `<article class="mono-plan${best ? ' on' : ''}">
          ${best ? `<div class="mono-plan-tag">${note}</div>` : ''}
          <h3>${n}</h3>
          <b class="num">${p.startsWith('견적') ? p : '₩' + p}</b>
          ${best ? '' : `<small>${note}</small>`}
          <ul>${items.map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul>
          <span class="fv-btn${best ? '' : ' ghost'}">선택</span>
        </article>`).join('')}
      </div>
      <div class="mono-faq">
        ${[['수정은 몇 번까지인가요?', '기본 2회. 추가 라운드는 기준액의 8%입니다.'],
        ['개발도 해주시나요?', '디자인까지가 범위입니다. 핸드오프 문서는 옵션으로 제공합니다.']]
        .map(([q, a]) => `<div><b>${q}</b><span>${a}</span></div>`).join('')}
      </div>`,
    },
    cases: {
      main: `
      <div class="mono-sec"><small>사례</small><h2 class="num">쓰는 사람들</h2></div>
      <blockquote class="mono-quote">
        <p class="num">“요구사항 회의가 두 번에서 한 번으로 줄었습니다.
        화면을 보면서 얘기하니까 해석 차이가 안 생겨요.”</p>
        <footer>${av('민', 3, 'sm')}<div><b>박민지</b><small>NORTHWIND · 프로덕트 리드</small></div></footer>
      </blockquote>
      <div class="mono-cases">
        ${[['ACME', '커머스 리뉴얼', '전환율 +18%', '화면 14개 · 8주'],
        ['KITE&CO', '어드민 신규', '문의 응대 −34%', '화면 20개 · 10주'],
        ['LOOP', '브랜드 랜딩', '체류 시간 2.1배', '화면 5개 · 3주']]
        .map(([who, what, metric, spec]) => `<article class="mono-case">
          <b class="mono-case-l">${who}</b>
          <span>${what}</span>
          <b class="num mono-case-m">${metric}</b>
          <small>${spec}</small>
        </article>`).join('')}
      </div>`,
    },
    contact: {
      main: `
      <div class="mono-contact">
        <section>
          <div class="mono-sec"><small>문의</small><h2 class="num">어떤 걸 만드시나요</h2></div>
          ${[['이름', '박진우'], ['회사·기관', 'NORTHWIND'], ['이메일', 'jinwoo@acme.co'],
        ['분야', '커머스 · 리테일'], ['예상 화면 수', '10~15개']]
        .map(([l, v]) => `<div class="mono-field"><label>${l}</label>
          <span class="lay-inp">${v}</span></div>`).join('')}
          <div class="mono-field"><label>내용</label>
            <span class="lay-inp mono-area">기존 쇼핑몰을 리뉴얼하려고 합니다. 모바일 비중이 80%입니다.</span></div>
          <span class="fv-btn mono-send">문의 보내기</span>
        </section>
        <aside>
          ${card('보내기 전에', '', `<ul class="mono-check">
            ${['참고 사이트 2~3개', '원하는 분야 (쇼핑몰·대시보드 등)', '필수 화면 목록', '예산 범위와 일정']
          .map(x => `<li>${ic('check')}${x}</li>`).join('')}
          </ul>`)}
          ${card('보통 이렇게 진행됩니다', '', `<ol class="mono-steps">
            ${[['1일', '회신 · 분야 가이드 공유'], ['3일', '요구사항 정리 + 견적'], ['1주', '스킨 확정 · 착수']]
          .map(([d, t]) => `<li><em>${d}</em><span>${t}</span></li>`).join('')}
          </ol>`)}
        </aside>
      </div>`,
    },
  },
}

/** 스킨 → 레이아웃 매핑 */
export const LAYOUT_FOR = {
  'cobalt-gray': 'dashboard',
  'sand-clay': 'commerce',
  'ink-cream': 'article',
  'oled-void': 'player',
  'neon-engineering': 'monitoring',
  'black-yellow': 'logistics',
  'blueprint': 'drawing',
  'deep-forest': 'portfolio',
  'navy-signal': 'kanban',
  'mint-paper': 'booking',
  'indigo-class': 'course',
  'rose-lounge': 'community',
  'civic-blue': 'civic',
  'stark-mono': 'landing',
}

/** 레이아웃의 전체 뷰 = 기본 뷰(title/sub/actions/main) + 추가 뷰(views) */
const viewsOf = L => ({
  [L.home]: { crumb: L.crumb, title: L.title, sub: L.sub, actions: L.actions, main: L.main },
  ...(L.views || {}),
})

export function renderLayout(key) {
  const L = LAYOUTS[key]
  if (!L) throw new Error(`레이아웃 없음: ${key}`)
  const V = viewsOf(L)
  // 내비가 가리키는 뷰가 실제로 있는지 빌드에서 잡는다 — 눌러도 안 바뀌는 메뉴가 데모에서 제일 티 난다
  const linked = [...(L.nav || []).map(n => n[2]), ...(L.nav2 || []).map(n => n[2]), ...(L.tabs || []).map(t => t[1])]
  for (const k of linked) if (!V[k]) throw new Error(`${key}: 내비가 없는 뷰를 가리킨다 → ${k}`)
  for (const k of Object.keys(V)) if (!linked.includes(k)) throw new Error(`${key}: 내비에서 못 여는 뷰 → ${k}`)

  return `<div class="fv lay-${key}">
  ${L.chrome === 'sidebar' ? sidebar(L) : ''}
  <div class="fv-body">
    ${L.chrome === 'sidebar' ? topbar(L, V[L.home]) : topnav(L)}
    <main class="fv-main">${Object.entries(V).map(([k, v]) => `<div class="fv-view" data-v="${k}"${
      k === L.home ? '' : ' hidden'}${v.crumb ? ` data-crumb="${v.crumb.join('|')}"` : ''}>${
      v.title ? pageHead(v) : ''}${v.main}</div>`).join('')}</main>
  </div>
</div>`
}

/* ---------- 레이아웃 고유 CSS ---------- */
export const LAYOUTS_CSS = `
/* 상단 내비 (사이드바 없는 레이아웃) */
.lay-topnav{gap:calc(var(--v) * 26)}
.lay-logo{font-family:var(--s-head-font);font-weight:var(--s-head-w);
  font-size:calc(var(--v) * 15);letter-spacing:calc(var(--v) * .6);flex:none}
.lay-topnav nav{display:flex;gap:calc(var(--v) * 20);font-size:calc(var(--v) * 12.5)}
.lay-topnav nav .lay-tab{color:var(--s-dim);padding-bottom:calc(var(--v) * 2)}
.lay-topnav nav .lay-tab.on{color:var(--s-fg);border-bottom:2px solid var(--s-acc)}

/* 쇼핑몰 */
.lay-chips{display:flex;align-items:center;gap:calc(var(--v) * 7);flex:none}
.lay-chips span{font-size:calc(var(--v) * 11.5);color:var(--s-dim);
  padding:calc(var(--v) * 5) calc(var(--v) * 13);border:var(--fv-bd);
  border-radius:calc(var(--v) * 999)}
.lay-chips span.on{background:var(--s-nav-on);color:var(--s-nav-on-fg);border-color:transparent}
.lay-chips .lay-sort{margin-left:auto;border:0;display:flex;align-items:center;gap:calc(var(--v) * 4)}
.lay-prods{display:grid;grid-template-columns:repeat(3,1fr);
  grid-template-rows:repeat(2,minmax(0,1fr));gap:calc(var(--v) * 12);flex:1;min-height:0}
.lay-prod{background:var(--s-sur);border:var(--fv-bd);box-shadow:var(--s-sh);
  border-radius:calc(var(--v) * var(--s-r));padding:calc(var(--v) * 11);
  display:flex;flex-direction:column;min-height:0;position:relative;overflow:hidden}
.lay-img{position:relative;flex:1;min-height:calc(var(--v) * 52);display:flex;
  align-items:center;justify-content:center;margin-bottom:calc(var(--v) * 10);
  border-radius:calc(var(--v) * max(var(--s-r) - 3, 2));
  background:color-mix(in srgb,var(--s-acc) 13%,var(--s-bg))}
.lay-ph{width:calc(var(--v) * 40);height:calc(var(--v) * 40);fill:none;
  stroke:color-mix(in srgb,var(--s-acc) 62%,var(--s-fg) 12%);stroke-width:1.4;
  stroke-linecap:round;stroke-linejoin:round}
.lay-new{position:absolute;top:calc(var(--v) * 8);left:calc(var(--v) * 8)}
.lay-prod>b{font-size:calc(var(--v) * 13);display:block}
.lay-prod>small{display:flex;align-items:center;gap:calc(var(--v) * 4);
  font-size:calc(var(--v) * 11);color:var(--s-acc);margin:calc(var(--v) * 4) 0 calc(var(--v) * 9)}
.lay-prod>small em{font-style:normal;color:var(--s-dim)}
.lay-star{width:calc(var(--v) * 12);height:calc(var(--v) * 12);flex:none}
.lay-price{display:flex;align-items:center;justify-content:space-between;
  margin-bottom:calc(var(--v) * 9)}
.lay-price b{font-size:calc(var(--v) * 16)}
.lay-opts{display:flex;gap:calc(var(--v) * 4)}
.lay-opts i{width:calc(var(--v) * 11);height:calc(var(--v) * 11);border-radius:50%}
.lay-opts i:nth-child(1){background:var(--s-acc)}
.lay-opts i:nth-child(2){background:color-mix(in srgb,var(--s-acc) 42%,var(--s-bg))}
.lay-opts i:nth-child(3){background:var(--s-line);border:1px solid var(--s-dim)}
.lay-cart{align-self:stretch;justify-content:center;flex:none;
  padding:calc(var(--v) * 7) 0;font-size:calc(var(--v) * 11.5)}
.lay-page{display:flex;justify-content:center;gap:calc(var(--v) * 6);flex:none;
  font-size:calc(var(--v) * 11.5);color:var(--s-dim)}
.lay-page span{padding:calc(var(--v) * 4) calc(var(--v) * 10);border-radius:calc(var(--v) * var(--s-r))}
.lay-page span.on{background:var(--s-nav-on);color:var(--s-nav-on-fg)}

/* 아티클 — 본문은 안에서 스크롤하고 목차는 제자리에 있다 ("본문 + 목차 고정") */
.lay-art{display:grid;grid-template-columns:minmax(0,1fr) calc(var(--v) * 184);
  gap:calc(var(--v) * 36);flex:1;min-height:0;overflow:hidden}
.lay-art article{min-width:0;overflow-y:auto;scrollbar-width:none;
  padding-right:calc(var(--v) * 4)}
.lay-art article::-webkit-scrollbar{display:none}
.lay-kick{font-size:calc(var(--v) * 11.5);letter-spacing:.14em;display:block;
  margin-bottom:calc(var(--v) * 9)}
/* 커버 — 사진 대신 스킨 토큰으로 그린 풍경. 모드가 바뀌면 같이 바뀐다 */
.lay-hero{margin:0 0 calc(var(--v) * 22);position:relative;overflow:hidden;
  border-radius:calc(var(--v) * var(--s-r) * 1.4);height:calc(var(--v) * 188);
  background:linear-gradient(180deg,color-mix(in srgb,var(--s-acc) 20%,var(--s-sur)),
    color-mix(in srgb,var(--s-acc) 8%,var(--s-bg)))}
.lay-hero svg{position:absolute;inset:0;width:100%;height:100%}
.lay-hero .c-sun{fill:color-mix(in srgb,var(--s-acc) 60%,var(--s-sur))}
.lay-hero .c-h1{fill:color-mix(in srgb,var(--s-fg) 14%,color-mix(in srgb,var(--s-acc) 12%,var(--s-bg)))}
.lay-hero .c-h2{fill:color-mix(in srgb,var(--s-fg) 28%,color-mix(in srgb,var(--s-acc) 14%,var(--s-bg)))}
.lay-hero .c-h3{fill:color-mix(in srgb,var(--s-fg) 46%,color-mix(in srgb,var(--s-acc) 16%,var(--s-bg)))}
.lay-hero figcaption{position:absolute;inset:auto calc(var(--v) * 14) calc(var(--v) * 12);
  display:flex;align-items:center;justify-content:space-between}
.lay-hero figcaption small{font-size:calc(var(--v) * 10);white-space:nowrap;color:var(--s-bg);opacity:.9}
.lay-chip-k{font-size:calc(var(--v) * 10.5);white-space:nowrap;font-weight:600;letter-spacing:.02em;
  padding:calc(var(--v) * 4) calc(var(--v) * 10);border-radius:999px;
  background:var(--s-sur);color:var(--s-fg)}
.lay-art h1{margin:0;font-family:var(--s-head-font);font-weight:var(--s-head-w);
  font-size:calc(var(--v) * 40);line-height:1.18;letter-spacing:var(--s-track)}
.lay-dek{font-size:calc(var(--v) * 14.5)!important;color:var(--s-dim);
  margin:calc(var(--v) * 12) 0 0!important;line-height:1.6!important}
.lay-by{display:flex;align-items:center;gap:calc(var(--v) * 9);
  margin:calc(var(--v) * 16) 0;padding-bottom:calc(var(--v) * 14);
  border-bottom:1px solid var(--s-line)}
.lay-by b{font-size:calc(var(--v) * 12);display:block}
.lay-by small{font-size:calc(var(--v) * 10.5);display:block}
.lay-art p{margin:0 0 calc(var(--v) * 12);font-size:calc(var(--v) * 13.5);line-height:1.8;
  max-width:62ch}
/* 풀쿼트 — 막대 대신 크기와 여백으로 강조한다 */
.lay-art blockquote{margin:calc(var(--v) * 22) 0;font-family:var(--s-head-font);
  font-size:calc(var(--v) * 22);line-height:1.45;letter-spacing:var(--s-track);color:var(--s-fg)}
.lay-art blockquote::before{content:'“';display:block;color:var(--s-acc);
  font-size:calc(var(--v) * 40);line-height:.6;margin-bottom:calc(var(--v) * 6)}
.lay-next{margin-top:calc(var(--v) * 24);padding-top:calc(var(--v) * 18);
  border-top:1px solid var(--s-line)}
.lay-next h4,.lay-toc h4{margin:0 0 calc(var(--v) * 12);font-size:calc(var(--v) * 10.5);
  color:var(--s-dim);letter-spacing:.06em;font-weight:600}
.lay-next-g{display:grid;grid-template-columns:1fr 1fr;gap:calc(var(--v) * 12)}
.lay-next-c{display:flex;gap:calc(var(--v) * 12);align-items:center;cursor:pointer;
  padding:calc(var(--v) * 10)!important}
.lay-next-i{width:calc(var(--v) * 56);height:calc(var(--v) * 56);flex:none;
  border-radius:calc(var(--v) * var(--s-r) * .8)}
.lay-next-i.n1{background:linear-gradient(140deg,color-mix(in srgb,var(--s-acc) 45%,var(--s-sur)),
  color-mix(in srgb,var(--s-fg) 30%,var(--s-bg)))}
.lay-next-i.n2{background:radial-gradient(circle at 70% 30%,color-mix(in srgb,var(--s-acc) 30%,var(--s-sur)) 0 30%,
  color-mix(in srgb,var(--s-fg) 12%,var(--s-bg)) 31%)}
.lay-next-c small{font-size:calc(var(--v) * 10);color:var(--s-dim);display:block}
.lay-next-c b{font-size:calc(var(--v) * 12.5);line-height:1.45;display:block;
  margin-top:calc(var(--v) * 3);font-weight:600}
.lay-toc{display:flex;flex-direction:column;gap:calc(var(--v) * 12)}
.lay-toc-c{background:var(--s-sur);border:1px solid var(--s-line);
  border-radius:calc(var(--v) * var(--s-r));padding:calc(var(--v) * 16)}
.lay-read{height:calc(var(--v) * 3);border-radius:999px;background:var(--s-line);
  overflow:hidden;margin-bottom:calc(var(--v) * 14)}
.lay-read i{display:block;height:100%;width:100%;background:var(--s-acc);
  transform:scaleX(.18);transform-origin:left;transition:transform .2s linear}
.lay-toc ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;
  gap:calc(var(--v) * 10)}
.lay-toc li{font-size:calc(var(--v) * 12);color:var(--s-dim);display:flex;
  gap:calc(var(--v) * 9);align-items:baseline}
.lay-toc li em{font-style:normal;font-size:calc(var(--v) * 10);font-variant-numeric:tabular-nums;
  color:var(--s-dim);opacity:.7}
.lay-toc li.on{color:var(--s-fg);font-weight:600}
.lay-toc li.on em{color:var(--s-acc);opacity:1}
.lay-share{display:flex;gap:calc(var(--v) * 8)}
.lay-share .fv-btn{flex:1;justify-content:center}

/* 플레이어 */
.lay-now{display:flex;gap:calc(var(--v) * 22);align-items:flex-end;flex:none;
  margin-bottom:calc(var(--v) * 18)}
.lay-art-big{width:calc(var(--v) * 132);height:calc(var(--v) * 132);flex:none;
  border-radius:calc(var(--v) * var(--s-r));box-shadow:var(--s-sh);
  background:radial-gradient(circle at 30% 24%,
    color-mix(in srgb,var(--s-acc) 82%,#fff 14%),var(--s-acc) 52%,
    color-mix(in srgb,var(--s-acc) 40%,#000))}
.lay-now-t small{font-size:calc(var(--v) * 11);letter-spacing:.1em}
.lay-now-t h2{margin:calc(var(--v) * 5) 0 calc(var(--v) * 4);
  font-family:var(--s-head-font);font-weight:var(--s-head-w);
  font-size:calc(var(--v) * 38);letter-spacing:var(--s-track);line-height:1.1}
.lay-now-t p{margin:0 0 calc(var(--v) * 14);font-size:calc(var(--v) * 12);color:var(--s-dim)}
.lay-ctl{display:flex;gap:calc(var(--v) * 8)}
.lay-ctl .fv-btn.ghost{padding:calc(var(--v) * 7) calc(var(--v) * 11)}
.lay-bar{flex:none;margin-bottom:calc(var(--v) * 16)}
.lay-prog{height:calc(var(--v) * 5);border-radius:999px;background:var(--s-line)}
.lay-prog i{display:block;width:66%;height:100%;border-radius:inherit;background:var(--s-acc)}
.lay-time{display:flex;align-items:center;justify-content:space-between;
  margin-top:calc(var(--v) * 8);font-size:calc(var(--v) * 10.5);color:var(--s-dim)}
.lay-tr{display:flex;align-items:center;gap:calc(var(--v) * 16);color:var(--s-fg)}
.lay-tr .fv-i{width:calc(var(--v) * 17);height:calc(var(--v) * 17)}
.lay-pl{width:calc(var(--v) * 30)!important;height:calc(var(--v) * 30)!important;
  background:var(--s-acc);color:var(--s-acc-fg);border-radius:50%;
  padding:calc(var(--v) * 8);box-sizing:content-box}
.lay-cur{color:var(--s-acc)!important}

/* 모니터링 */
.lay-svcs{display:grid;grid-template-columns:repeat(4,1fr);gap:calc(var(--v) * 12);flex:none}
.lay-svc small{letter-spacing:0}
.lay-dot{width:calc(var(--v) * 8);height:calc(var(--v) * 8);border-radius:50%;
  background:var(--s-acc);flex:none;
  box-shadow:0 0 0 calc(var(--v) * 3) color-mix(in srgb,var(--s-acc) 26%,transparent)}
.lay-svc.warn .lay-dot{background:var(--fv-warn);
  box-shadow:0 0 0 calc(var(--v) * 3) color-mix(in srgb,var(--fv-warn) 26%,transparent)}
.lay-svc.warn b{color:var(--fv-warn)}
.lay-logs{flex:none}
.lay-log{display:flex;gap:calc(var(--v) * 10);align-items:baseline;
  font-size:calc(var(--v) * 11.5);padding:calc(var(--v) * 4) 0;color:var(--s-dim)}
.lay-log em{font-style:normal;opacity:.75;flex:none}
.lay-src{color:var(--s-fg);width:calc(var(--v) * 62);flex:none}
.lay-log b{color:var(--s-acc);flex:none}
.lay-log.warn,.lay-log.warn b,.lay-log.warn .lay-src{color:var(--fv-warn)}

/* 물류 */
.lay-track{flex:none}
.lay-steps{display:flex;align-items:center;margin:calc(var(--v) * 6) 0 0}
.lay-steps i{width:calc(var(--v) * 26);height:calc(var(--v) * 26);border-radius:50%;
  background:var(--s-line);flex:none;display:flex;align-items:center;justify-content:center;
  color:var(--s-dim)}
.lay-steps i .fv-i{width:calc(var(--v) * 13);height:calc(var(--v) * 13)}
.lay-steps i.on{background:var(--s-acc);color:var(--s-acc-fg)}
.lay-steps i.cur{background:var(--s-acc);color:var(--s-acc-fg);
  box-shadow:0 0 0 calc(var(--v) * 4) color-mix(in srgb,var(--s-acc) 28%,transparent)}
.lay-steps .ln{flex:1;height:calc(var(--v) * 2.5);background:var(--s-line)}
.lay-steps .ln.on{background:var(--s-acc)}
.lay-steps-l{display:flex;justify-content:space-between;margin-top:calc(var(--v) * 9)}
.lay-steps-l span{font-size:calc(var(--v) * 10.5);color:var(--s-dim);
  display:flex;flex-direction:column;gap:calc(var(--v) * 2);flex:1}
.lay-steps-l span:last-child{align-items:flex-end}
.lay-steps-l span:not(:first-child):not(:last-child){align-items:center}
.lay-steps-l em{font-style:normal;opacity:.72;font-size:calc(var(--v) * 9.5)}

/* 도면 */
.lay-cad{display:grid;grid-template-columns:minmax(0,1fr) calc(var(--v) * 210);
  gap:calc(var(--v) * 12);flex:1;min-height:0}
.lay-canvas{padding:calc(var(--v) * 10);align-items:center;justify-content:center}
.lay-canvas svg{width:100%;height:100%}
.lay-canvas .part{fill:color-mix(in srgb,var(--s-acc) 8%,transparent);
  stroke:var(--s-acc);stroke-width:1.6;vector-effect:non-scaling-stroke}
.lay-canvas .g{stroke:var(--s-line);stroke-width:1;stroke-dasharray:6 4;
  vector-effect:non-scaling-stroke}
.lay-canvas .dim{stroke:var(--s-dim);stroke-width:1;vector-effect:non-scaling-stroke}
.lay-canvas .dtx{fill:var(--s-dim);font-size:11px;font-family:var(--s-font)}
.lay-insp{overflow:hidden}
.lay-props{margin:0 0 calc(var(--v) * 14);display:grid;
  grid-template-columns:calc(var(--v) * 58) 1fr;gap:calc(var(--v) * 7) calc(var(--v) * 10);
  font-size:calc(var(--v) * 11.5)}
.lay-props dt{color:var(--s-dim)}
.lay-props dd{margin:0;display:flex;align-items:center;gap:calc(var(--v) * 5)}
.lay-rev{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;
  gap:calc(var(--v) * 8)}
.lay-rev li{display:flex;align-items:center;gap:calc(var(--v) * 9);font-size:calc(var(--v) * 11.5)}
.lay-rev b{width:calc(var(--v) * 16);flex:none;color:var(--s-acc)}
.lay-rev span{flex:1;color:var(--s-dim)}

/* 포트폴리오 */
.lay-fin{display:grid;grid-template-columns:minmax(0,1.5fr) calc(var(--v) * 232);
  gap:calc(var(--v) * 14);flex:1;min-height:0}
.lay-total{background:var(--s-sur);border:var(--fv-bd);box-shadow:var(--s-sh);
  border-radius:calc(var(--v) * var(--s-r));padding:calc(var(--v) * 16) calc(var(--v) * 18);
  display:flex;flex-direction:column;min-height:0}
.lay-total>small{font-size:calc(var(--v) * 12)}
.lay-total>b{font-size:calc(var(--v) * 38);display:block;margin:calc(var(--v) * 3) 0}
.lay-delta{display:flex;align-items:baseline;gap:calc(var(--v) * 9);
  margin-bottom:calc(var(--v) * 12)}
.lay-delta em{font-style:normal;color:var(--s-acc);font-size:calc(var(--v) * 14);font-weight:600}
.lay-delta span{font-size:calc(var(--v) * 11);color:var(--s-dim)}
.lay-card-col{display:flex;flex-direction:column;gap:calc(var(--v) * 12);min-height:0}
.lay-cc{height:calc(var(--v) * 106);flex:none;
  border:1px solid color-mix(in srgb,var(--s-acc) 52%,transparent);
  display:flex;flex-direction:column}
.lay-chip{width:calc(var(--v) * 28);height:calc(var(--v) * 21);
  border-radius:calc(var(--v) * 4);background:var(--s-acc);opacity:.9}
.lay-cc small{font-size:calc(var(--v) * 9.5);letter-spacing:.2em;margin-top:auto}
.lay-cc b{font-size:calc(var(--v) * 15);letter-spacing:.1em}
.lay-alloc{flex:1;min-height:0}

/* 칸반 */
.lay-board{display:grid;grid-template-columns:repeat(4,1fr);gap:calc(var(--v) * 11);
  flex:1;min-height:0}
.lay-col{background:color-mix(in srgb,var(--s-sur) 62%,transparent);
  border:var(--fv-bd);border-radius:calc(var(--v) * var(--s-r));
  padding:calc(var(--v) * 11);display:flex;flex-direction:column;gap:calc(var(--v) * 8);
  min-height:0}
.lay-col-h{display:flex;align-items:center;justify-content:space-between;
  font-size:calc(var(--v) * 11.5)}
.lay-col-h b{font-weight:600}
.lay-col-h span{color:var(--s-dim)}
.lay-task{background:var(--s-sur);border:var(--fv-bd);box-shadow:var(--s-sh);
  border-radius:calc(var(--v) * max(var(--s-r) - 2, 2));padding:calc(var(--v) * 10)}
.lay-task>b{font-size:calc(var(--v) * 12);display:block;font-weight:560;line-height:1.4}
.lay-task-f{display:flex;align-items:center;justify-content:space-between;
  margin-top:calc(var(--v) * 9)}
.lay-task-f .fv-av{margin-right:0}
.lay-more{margin-top:auto;font-size:calc(var(--v) * 11);color:var(--s-dim);
  display:flex;align-items:center;gap:calc(var(--v) * 5)}
.lay-more .fv-i{width:calc(var(--v) * 12);height:calc(var(--v) * 12)}

/* 예약 */
.lay-steps-top{flex:none;margin-bottom:calc(var(--v) * 4);position:relative;
  display:flex;align-items:center;width:calc(var(--v) * 300)}
.lay-steps-top i{width:calc(var(--v) * 24);height:calc(var(--v) * 24);border-radius:50%;
  background:var(--s-line);color:var(--s-dim);flex:none;display:flex;
  align-items:center;justify-content:center;font-size:calc(var(--v) * 11);font-weight:600}
.lay-steps-top i .fv-i{width:calc(var(--v) * 12);height:calc(var(--v) * 12)}
.lay-steps-top i.on{background:var(--s-acc);color:var(--s-acc-fg)}
.lay-steps-top i.cur{background:var(--s-acc);color:var(--s-acc-fg);
  box-shadow:0 0 0 calc(var(--v) * 4) color-mix(in srgb,var(--s-acc) 26%,transparent)}
.lay-steps-top .ln{flex:1;height:calc(var(--v) * 2.5);background:var(--s-line)}
.lay-steps-top .ln.on{background:var(--s-acc)}
.lay-steps-tl{position:absolute;top:calc(var(--v) * 30);left:0;right:0;
  display:flex;justify-content:space-between;font-size:calc(var(--v) * 10);color:var(--s-dim)}
.lay-book{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);
  gap:calc(var(--v) * 14);flex:1;min-height:0;margin-top:calc(var(--v) * 20)}
.lay-cal-h,.lay-cal{display:grid;grid-template-columns:repeat(7,1fr);gap:calc(var(--v) * 4)}
.lay-cal-h{margin-bottom:calc(var(--v) * 6)}
.lay-cal-h span{text-align:center;font-size:calc(var(--v) * 10);color:var(--s-dim)}
.lay-cal span{text-align:center;font-size:calc(var(--v) * 11.5);
  padding:calc(var(--v) * 6) 0;border-radius:calc(var(--v) * max(var(--s-r) - 2, 2));
  color:var(--s-fg)}
.lay-cal span.off{color:var(--s-dim);opacity:.45}
.lay-cal span.on{background:var(--s-acc);color:var(--s-acc-fg);font-weight:600}
.lay-sub{margin:calc(var(--v) * 14) 0 calc(var(--v) * 8);font-size:calc(var(--v) * 10.5);
  color:var(--s-dim);letter-spacing:.06em;font-weight:600}
.lay-slots{display:flex;flex-wrap:wrap;gap:calc(var(--v) * 6)}
.lay-slots span{font-size:calc(var(--v) * 11.5);padding:calc(var(--v) * 6) calc(var(--v) * 14);
  border:var(--fv-bd);border-radius:calc(var(--v) * 999);color:var(--s-dim)}
.lay-slots span.on{border-color:var(--s-acc);color:var(--s-acc);font-weight:600;
  background:color-mix(in srgb,var(--s-acc) 10%,transparent)}
.lay-slots span.off{opacity:.4;text-decoration:line-through}
.lay-sum{position:relative}
.lay-sum-p{display:flex;align-items:baseline;justify-content:space-between;
  padding-top:calc(var(--v) * 12);border-top:1px solid var(--s-line);
  margin-bottom:calc(var(--v) * 10)}
.lay-sum-p span{font-size:calc(var(--v) * 11.5);color:var(--s-dim)}
.lay-sum-p b{font-size:calc(var(--v) * 22)}
.lay-sum-n{display:flex;align-items:center;gap:calc(var(--v) * 6);
  font-size:calc(var(--v) * 10.5);color:var(--fv-warn);margin-bottom:calc(var(--v) * 12)}
.lay-sum-n .fv-i{width:calc(var(--v) * 13);height:calc(var(--v) * 13)}
.lay-confirm{margin-top:auto;text-align:center;justify-content:center}
.lay-left{position:absolute;top:calc(var(--v) * 14);right:calc(var(--v) * 15)}

/* ---------- 뷰 전환 ----------
   .fv-main 이 갖고 있던 세로 흐름을 .fv-view 가 이어받는다.
   프레임(3:2)이 고정이라 각 뷰는 이 안에 들어가야 한다 — 넘치면 잘린다. */
.fv-view{flex:1;min-height:0;display:flex;flex-direction:column;gap:calc(var(--v) * 14);overflow:hidden}
.fv-view[hidden]{display:none}
/* 내비가 진짜 버튼이 됐다 — 보이는 건 그대로 두고 브라우저 기본값만 지운다 */
button.fv-nav{font:inherit;font-size:calc(var(--v) * 12.5);width:100%;text-align:left;
  border:none;background:none;cursor:pointer}
button.lay-tab{font:inherit;font-size:inherit;border:none;background:none;cursor:pointer;
  padding:0 0 calc(var(--v) * 2)}

/* 설정 폼 */
.lay-set{display:grid;grid-template-columns:1fr 1fr;gap:calc(var(--v) * 14);flex:1;min-height:0}
.lay-set-row{display:flex;align-items:center;justify-content:space-between;
  gap:calc(var(--v) * 14);padding:calc(var(--v) * 9) 0;border-top:var(--fv-bd)}
.lay-set-row b{display:block;font-size:calc(var(--v) * 12);font-weight:560}
.lay-set-row small{display:block;font-size:calc(var(--v) * 10.5);color:var(--s-dim)}
.lay-sw{width:calc(var(--v) * 32);height:calc(var(--v) * 18);border-radius:999px;flex:none;
  background:var(--s-line);position:relative}
.lay-sw::after{content:"";position:absolute;left:calc(var(--v) * 2.5);top:calc(var(--v) * 2.5);
  width:calc(var(--v) * 13);height:calc(var(--v) * 13);border-radius:50%;background:#fff}
.lay-sw.on{background:var(--s-acc)}
.lay-sw.on::after{left:calc(var(--v) * 16.5)}
.lay-inp{display:flex;align-items:center;justify-content:space-between;gap:calc(var(--v) * 8);
  flex:none;min-width:calc(var(--v) * 132);font-size:calc(var(--v) * 11.5);color:var(--s-fg);
  background:var(--s-sur);border:var(--fv-bd);border-radius:calc(var(--v) * var(--s-r));
  padding:calc(var(--v) * 6) calc(var(--v) * 10)}
.lay-inp .fv-i{width:calc(var(--v) * 12);height:calc(var(--v) * 12);opacity:.5}

/* 개체 카드 격자 (고객·기사·팀·의료진) */
.lay-people{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--v) * 12);
  flex:1;min-height:0}
.lay-person{padding:calc(var(--v) * 14);display:flex;flex-direction:column;gap:calc(var(--v) * 2)}
.lay-person .fv-av{margin-bottom:calc(var(--v) * 5)}
.lay-person b{font-size:calc(var(--v) * 13)}
.lay-person small{font-size:calc(var(--v) * 10.5);color:var(--s-dim)}
.lay-person em{font-style:normal;font-size:calc(var(--v) * 12.5);margin-top:calc(var(--v) * 4);
  font-variant-numeric:tabular-nums}
/* .fv-bar 는 원래 가로 flex 안에서 쓰던 것 — 세로 카드 안에서는 flex:1 이 높이를 먹는다 */
.lay-person .fv-bar,.lay-hub .fv-bar{flex:none;height:calc(var(--v) * 6);width:100%}
.lay-person .fv-bar{margin-top:calc(var(--v) * 7)}

/* ---------- 추가 뷰 전용 ---------- */

/* 커머스 — 랭킹 / 카테고리 / 세일 */
.lay-rank{display:flex;flex-direction:column;gap:calc(var(--v) * 8);flex:1;min-height:0}
.lay-rank-r{display:flex;align-items:center;gap:calc(var(--v) * 12);flex:1;min-height:0;
  background:var(--s-sur);border:var(--fv-bd);box-shadow:var(--s-sh);
  border-radius:calc(var(--v) * var(--s-r));padding:calc(var(--v) * 9) calc(var(--v) * 14)}
.lay-rank-n{font-size:calc(var(--v) * 18);width:calc(var(--v) * 24);flex:none;color:var(--s-acc);
  font-family:var(--s-head-font);font-weight:var(--s-head-w)}
.lay-rank-th{width:calc(var(--v) * 40);height:calc(var(--v) * 40);flex:none;display:flex;
  align-items:center;justify-content:center;border-radius:calc(var(--v) * max(var(--s-r) - 2, 2));
  background:color-mix(in srgb,var(--s-acc) 13%,var(--s-bg))}
.lay-rank-th .lay-ph{width:calc(var(--v) * 22);height:calc(var(--v) * 22)}
.lay-rank-t{width:calc(var(--v) * 170);flex:none}
.lay-rank-t b{display:block;font-size:calc(var(--v) * 12.5)}
.lay-rank-t small{font-size:calc(var(--v) * 10.5);color:var(--s-dim)}
.lay-rank-b{flex:1}
.lay-rank-c{font-style:normal;font-size:calc(var(--v) * 11);color:var(--s-dim);
  width:calc(var(--v) * 52);text-align:right;flex:none}
.lay-rank-p{font-size:calc(var(--v) * 14);width:calc(var(--v) * 72);text-align:right;flex:none}

.lay-tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--v) * 12);flex:1;min-height:0}
.lay-tile{display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:calc(var(--v) * 5);padding:calc(var(--v) * 14)}
.lay-tile b{font-size:calc(var(--v) * 12.5)}
.lay-tile small{font-size:calc(var(--v) * 10.5);color:var(--s-dim)}
.lay-tags{flex-wrap:wrap;padding:calc(var(--v) * 4) 0}

.lay-banner{display:flex;align-items:center;justify-content:space-between;flex:none;
  padding:calc(var(--v) * 16) calc(var(--v) * 20);border-radius:calc(var(--v) * var(--s-r));
  background:var(--s-acc);color:var(--s-acc-fg)}
.lay-banner small{display:block;font-size:calc(var(--v) * 10.5);opacity:.8;letter-spacing:.08em}
.lay-banner b{font-size:calc(var(--v) * 20);font-family:var(--s-head-font);
  font-weight:var(--s-head-w);letter-spacing:var(--s-track)}
.lay-timer{display:flex;align-items:center;gap:calc(var(--v) * 6);font-size:calc(var(--v) * 15);
  font-variant-numeric:tabular-nums}
.lay-timer span{background:color-mix(in srgb,#000 22%,transparent);
  padding:calc(var(--v) * 4) calc(var(--v) * 8);border-radius:calc(var(--v) * 4)}
.lay-was{text-decoration:line-through;color:var(--s-dim)!important}
.lay-off{position:absolute;top:calc(var(--v) * 8);left:calc(var(--v) * 8)}

/* 매거진 — 인터뷰 / 리뷰 / 아카이브 */
.lay-feat{display:grid;grid-template-columns:calc(var(--v) * 260) minmax(0,1fr);
  gap:calc(var(--v) * 24);align-items:center;flex:none;padding-bottom:calc(var(--v) * 16);
  border-bottom:var(--fv-bd)}
.lay-feat-img{height:calc(var(--v) * 180);display:flex;align-items:center;justify-content:center;
  border-radius:calc(var(--v) * var(--s-r));background:color-mix(in srgb,var(--s-acc) 12%,var(--s-bg))}
.lay-feat h1{margin:calc(var(--v) * 6) 0 calc(var(--v) * 10);font-size:calc(var(--v) * 30);
  line-height:1.18;font-family:var(--s-head-font);font-weight:var(--s-head-w);
  letter-spacing:var(--s-track)}
.lay-feat p{margin:0 0 calc(var(--v) * 12);font-size:calc(var(--v) * 12.5);color:var(--s-dim);
  max-width:52ch}
.lay-ilist{display:flex;flex-direction:column;flex:1;min-height:0}
.lay-irow{display:flex;align-items:baseline;gap:calc(var(--v) * 16);flex:1;min-height:0;
  border-bottom:var(--fv-bd);font-size:calc(var(--v) * 12.5)}
.lay-irow b{width:calc(var(--v) * 130);flex:none}
.lay-irow span{flex:1;color:var(--s-dim);font-style:italic}
.lay-irow em{font-style:normal;font-size:calc(var(--v) * 11);color:var(--s-dim);flex:none}

.lay-revs{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--v) * 12);flex:1;min-height:0}
.lay-rvw{padding:calc(var(--v) * 14) calc(var(--v) * 16);display:flex;flex-direction:column}
.lay-rvw h3{margin:calc(var(--v) * 4) 0 calc(var(--v) * 2);font-size:calc(var(--v) * 17);
  font-family:var(--s-head-font);font-weight:var(--s-head-w);letter-spacing:var(--s-track)}
.lay-rvw-s{font-size:calc(var(--v) * 10.5);color:var(--s-dim)}
.lay-stars{display:flex;gap:calc(var(--v) * 2);margin:calc(var(--v) * 8) 0}
.lay-stars .lay-star{color:var(--s-acc)}
.lay-stars .lay-star.off{color:var(--s-line)}
.lay-rvw p{margin:calc(var(--v) * 10) 0 calc(var(--v) * 12);font-size:calc(var(--v) * 12);
  color:var(--s-dim);line-height:1.55}
.lay-rvw .fv-link{margin-top:auto}

.lay-arch{display:flex;flex-direction:column;flex:1;min-height:0}
.lay-arow{display:flex;align-items:baseline;gap:calc(var(--v) * 14);flex:1;min-height:0;
  border-bottom:var(--fv-bd);font-size:calc(var(--v) * 12.5)}
.lay-arow b{color:var(--s-acc);width:calc(var(--v) * 46);flex:none}
.lay-arow em{font-style:normal;color:var(--s-dim);width:calc(var(--v) * 48);flex:none;
  font-size:calc(var(--v) * 11)}
.lay-arow span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.lay-arow small{font-size:calc(var(--v) * 10.5);color:var(--s-dim);flex:none}

/* 플레이어 — 검색 / 라이브러리 / 최근 */
.lay-searchbar{display:flex;align-items:center;gap:calc(var(--v) * 10);flex:none;
  background:var(--s-sur);border:var(--fv-bd);border-radius:calc(var(--v) * var(--s-r));
  padding:calc(var(--v) * 11) calc(var(--v) * 14);color:var(--s-dim);font-size:calc(var(--v) * 13)}
.lay-genres{display:grid;grid-template-columns:repeat(4,1fr);gap:calc(var(--v) * 12);flex:1;min-height:0}
.lay-genre{border-radius:calc(var(--v) * var(--s-r));padding:calc(var(--v) * 14);
  display:flex;align-items:flex-end;color:#fff;overflow:hidden;position:relative}
.lay-genre b{font-size:calc(var(--v) * 14);position:relative}
.lay-genre[data-c="1"]{background:#6a7cff}
.lay-genre[data-c="2"]{background:#e07a5f}
.lay-genre[data-c="3"]{background:#3aa88a}
.lay-genre[data-c="4"]{background:#c78b3d}
.lay-genre[data-c="5"]{background:#9b6fd4}
.lay-albums{display:grid;grid-template-columns:repeat(6,1fr);gap:calc(var(--v) * 12);
  grid-template-rows:repeat(2,max-content);align-content:start;flex:1;min-height:0}
.lay-album b{display:block;font-size:calc(var(--v) * 12);margin-top:calc(var(--v) * 8);
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.lay-album small{font-size:calc(var(--v) * 10.5);color:var(--s-dim)}
.lay-cover{display:flex;align-items:center;justify-content:center;aspect-ratio:1;
  border-radius:calc(var(--v) * max(var(--s-r) - 2, 2))}
.lay-cover[data-c="1"]{background:linear-gradient(140deg,#6a7cff,#2a2f6b)}
.lay-cover[data-c="2"]{background:linear-gradient(140deg,#e07a5f,#6b2f22)}
.lay-cover[data-c="3"]{background:linear-gradient(140deg,#3aa88a,#154a3c)}
.lay-cover[data-c="4"]{background:linear-gradient(140deg,#c78b3d,#5c3d13)}
.lay-cover[data-c="5"]{background:linear-gradient(140deg,#9b6fd4,#3d2560)}
.lay-cover.sm{width:calc(var(--v) * 38);flex:none}
.lay-cover-p{width:calc(var(--v) * 20);height:calc(var(--v) * 20);color:#fff;opacity:.85}
.lay-recent{display:flex;flex-direction:column;flex:1;min-height:0}
.lay-rrow{display:flex;align-items:center;gap:calc(var(--v) * 12);flex:1;min-height:0;
  border-bottom:var(--fv-bd)}
.lay-rrow b{display:block;font-size:calc(var(--v) * 12.5)}
.lay-rrow small{font-size:calc(var(--v) * 10.5);color:var(--s-dim)}
.lay-rrow em{margin-left:auto;font-style:normal;font-size:calc(var(--v) * 11);color:var(--s-dim)}
.lay-rplay{color:var(--s-acc)}

/* 모니터링 — 로그 전체 화면 */
.lay-logs-full{flex:1;min-height:0;overflow:hidden}
.lay-log.err,.lay-log.err b,.lay-log.err .lay-src{color:var(--fv-warn);font-weight:600}

/* 물류 — 일괄 처리 / 거점 */
.lay-bulk{display:flex;align-items:center;gap:calc(var(--v) * 12);flex:none;
  padding:calc(var(--v) * 9) calc(var(--v) * 14);border-radius:calc(var(--v) * var(--s-r));
  background:color-mix(in srgb,var(--s-acc) 12%,var(--s-bg));border:var(--fv-bd)}
.lay-bulk b{font-size:calc(var(--v) * 12);margin-right:auto}
.lay-bulk .fv-i{color:var(--s-acc)}
.lay-ck{width:calc(var(--v) * 14);height:calc(var(--v) * 14);border-radius:calc(var(--v) * 3);
  border:var(--fv-bd);display:inline-flex;align-items:center;justify-content:center;
  font-size:calc(var(--v) * 10);font-style:normal}
.lay-ck.on{background:var(--s-acc);color:var(--s-acc-fg);border-color:var(--s-acc)}
.lay-hubs{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--v) * 12);flex:1;min-height:0}
.lay-hub{padding:calc(var(--v) * 14)}
.lay-hub-h{display:flex;align-items:center;gap:calc(var(--v) * 9);margin-bottom:calc(var(--v) * 10)}
.lay-hub-h .fv-i{color:var(--s-acc)}
.lay-hub-h b{display:block;font-size:calc(var(--v) * 12.5)}
.lay-hub-h small{font-size:calc(var(--v) * 10.5);color:var(--s-dim)}
.lay-hub-h .fv-badge{margin-left:auto}
.lay-hub-n{display:flex;align-items:baseline;gap:calc(var(--v) * 7);margin-bottom:calc(var(--v) * 8)}
.lay-hub-n b{font-size:calc(var(--v) * 22)}
.lay-hub-n span{font-size:calc(var(--v) * 10.5);color:var(--s-dim)}
.lay-hub-l{display:block;margin-top:calc(var(--v) * 6);font-size:calc(var(--v) * 10.5);color:var(--s-dim)}

/* 설계 — 어셈블리 */
.lay-asm{display:grid;grid-template-columns:repeat(4,1fr);gap:calc(var(--v) * 12);flex:none}
.lay-asm-c{padding:calc(var(--v) * 14);display:flex;flex-direction:column;
  align-items:flex-start;gap:calc(var(--v) * 4)}
.lay-asm-c .lay-ph{width:calc(var(--v) * 26);height:calc(var(--v) * 26);margin-bottom:calc(var(--v) * 6)}
.lay-asm-c b{font-size:calc(var(--v) * 12)}
.lay-asm-c small{font-size:calc(var(--v) * 10.5);color:var(--s-dim);margin-bottom:calc(var(--v) * 6)}

/* 자산 — 거래 내역 / 상담 */
.lay-trades{display:flex;flex-direction:column;flex:1;min-height:0}
.lay-trade{display:flex;align-items:center;gap:calc(var(--v) * 14);flex:1;min-height:0;
  border-bottom:var(--fv-bd);font-size:calc(var(--v) * 12.5)}
.lay-tdate{font-style:normal;color:var(--s-dim);width:calc(var(--v) * 40);flex:none;
  font-size:calc(var(--v) * 11)}
.lay-tkind{font-size:calc(var(--v) * 10.5);padding:calc(var(--v) * 2) calc(var(--v) * 9);
  border-radius:999px;flex:none;width:calc(var(--v) * 46);text-align:center}
.lay-tkind.buy{background:color-mix(in srgb,var(--s-acc) 18%,var(--s-bg));color:var(--s-acc)}
.lay-tkind.sell{background:color-mix(in srgb,var(--fv-warn) 18%,var(--s-bg));color:var(--fv-warn)}
.lay-tkind.in{background:var(--s-nav-on);color:var(--s-nav-on-fg)}
.lay-trade>b{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.lay-trade small{font-size:calc(var(--v) * 11);color:var(--s-dim);width:calc(var(--v) * 62);
  text-align:right;flex:none}
.lay-tamt{width:calc(var(--v) * 110);text-align:right;flex:none;font-size:calc(var(--v) * 13)}
.lay-advice{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);
  gap:calc(var(--v) * 14);flex:1;min-height:0}
.lay-pb{padding:calc(var(--v) * 16);display:flex;flex-direction:column}
.lay-pb-h{display:flex;align-items:center;gap:calc(var(--v) * 11);margin-bottom:calc(var(--v) * 10)}
.lay-pb-h b{display:block;font-size:calc(var(--v) * 13.5)}
.lay-pb-h small{font-size:calc(var(--v) * 10.5);color:var(--s-dim)}
.lay-pb p{margin:0 0 calc(var(--v) * 14);font-size:calc(var(--v) * 12);color:var(--s-dim);
  line-height:1.6}
.lay-pb .fv-btn{align-self:flex-start;margin-top:auto}
.lay-hist{list-style:none;margin:0;padding:0}
.lay-hist li{display:flex;align-items:center;gap:calc(var(--v) * 12);
  padding:calc(var(--v) * 9) 0;border-top:var(--fv-bd);font-size:calc(var(--v) * 12)}
.lay-hist em{font-style:normal;color:var(--s-dim);flex:none;width:calc(var(--v) * 34)}
.lay-hist span{flex:1;min-width:0}
.lay-hist .fv-i{color:var(--s-dim);width:calc(var(--v) * 14);height:calc(var(--v) * 14)}

/* 운영 — 문서 */
.lay-docs{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--v) * 12);flex:1;min-height:0}
.lay-doc{padding:calc(var(--v) * 14);display:flex;flex-direction:column;gap:calc(var(--v) * 3)}
.lay-doc .lay-ph{width:calc(var(--v) * 22);height:calc(var(--v) * 22);margin-bottom:calc(var(--v) * 8)}
.lay-doc b{font-size:calc(var(--v) * 12.5)}
.lay-doc small{font-size:calc(var(--v) * 10.5);color:var(--s-dim)}
.lay-doc-f{display:flex;align-items:center;gap:calc(var(--v) * 4);margin-top:calc(var(--v) * 10)}
.lay-doc-f em{font-style:normal;font-size:calc(var(--v) * 10.5);color:var(--s-dim);margin-left:auto}

/* 예약 — 프로그램 / 의료진 / 안내 */
.lay-plans{display:grid;grid-template-columns:repeat(4,1fr);gap:calc(var(--v) * 12);flex:1;min-height:0}
.lay-plan{padding:calc(var(--v) * 16) calc(var(--v) * 14);display:flex;flex-direction:column;
  align-items:flex-start;position:relative}
.lay-plan.on{border-color:var(--s-acc);
  box-shadow:0 0 0 calc(var(--v) * 2) color-mix(in srgb,var(--s-acc) 24%,transparent)}
.lay-plan>.fv-badge{margin-bottom:calc(var(--v) * 8)}
.lay-plan h3{margin:0;font-size:calc(var(--v) * 14);font-family:var(--s-head-font);
  font-weight:var(--s-head-w);letter-spacing:var(--s-track)}
.lay-plan-p{margin:calc(var(--v) * 8) 0 calc(var(--v) * 12)}
.lay-plan-p b{display:block;font-size:calc(var(--v) * 19)}
.lay-plan-p small{font-size:calc(var(--v) * 10.5);color:var(--s-dim)}
.lay-plan-l{list-style:none;margin:0 0 calc(var(--v) * 14);padding:0;
  display:flex;flex-direction:column;gap:calc(var(--v) * 6)}
.lay-plan-l li{display:flex;align-items:flex-start;gap:calc(var(--v) * 7);
  font-size:calc(var(--v) * 11);color:var(--s-dim);line-height:1.4}
.lay-plan-l .fv-i{width:calc(var(--v) * 12);height:calc(var(--v) * 12);color:var(--s-acc);
  margin-top:calc(var(--v) * 2);flex:none}
.lay-plan .fv-btn{align-self:stretch;justify-content:center;margin-top:auto}

.lay-docs-g{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--v) * 12);flex:1;min-height:0}
/* 3행 격자에 맞춰 높이를 아껴 쓴다 — 넘치면 카드 밖으로 새서 다음 행을 침범한다 */
.lay-doc-c{padding:calc(var(--v) * 11) calc(var(--v) * 13);display:flex;flex-direction:column;
  align-items:flex-start;gap:calc(var(--v) * 2);min-height:0;overflow:hidden}
.lay-doc-c .fv-av{margin-bottom:calc(var(--v) * 4)}
.lay-doc-c b{font-size:calc(var(--v) * 13)}
.lay-doc-c small{font-size:calc(var(--v) * 10.5);color:var(--s-dim);margin-bottom:calc(var(--v) * 5)}
.lay-doc-c .fv-btn{align-self:stretch;justify-content:center;margin-top:auto;
  padding:calc(var(--v) * 5) 0;font-size:calc(var(--v) * 11)}

.lay-info{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);
  gap:calc(var(--v) * 14);flex:1;min-height:0}
.lay-info aside{display:flex;flex-direction:column;gap:calc(var(--v) * 14);min-height:0}
.lay-prep{list-style:none;margin:0;padding:0}
.lay-prep li{display:flex;gap:calc(var(--v) * 11);padding:calc(var(--v) * 10) 0;
  border-top:var(--fv-bd)}
.lay-prep .fv-i{color:var(--s-acc);margin-top:calc(var(--v) * 2)}
.lay-prep b{display:block;font-size:calc(var(--v) * 12.5)}
.lay-prep small{font-size:calc(var(--v) * 11);color:var(--s-dim);line-height:1.5}
.lay-faq{list-style:none;margin:0;padding:0}
.lay-faq li{padding:calc(var(--v) * 9) 0;border-top:var(--fv-bd)}
.lay-q{display:flex;align-items:center;gap:calc(var(--v) * 10);font-size:calc(var(--v) * 12)}
.lay-q b{flex:1;font-weight:520}
.lay-q .fv-i{width:calc(var(--v) * 13);height:calc(var(--v) * 13);color:var(--s-dim)}
.lay-faq li.on .lay-q .fv-i{transform:rotate(180deg)}
.lay-faq p{margin:calc(var(--v) * 6) 0 0;font-size:calc(var(--v) * 11.5);color:var(--s-dim);
  line-height:1.55}
.lay-map{height:calc(var(--v) * 76);display:flex;align-items:center;justify-content:center;
  border-radius:calc(var(--v) * max(var(--s-r) - 2, 2));margin-bottom:calc(var(--v) * 10);
  background:color-mix(in srgb,var(--s-acc) 12%,var(--s-bg))}
.lay-map .lay-ph{width:calc(var(--v) * 28);height:calc(var(--v) * 28)}

/* 표·목록 카드는 프레임을 채운다 — 짧은 카드가 화면 절반에 떠 있으면 미완성으로 읽힌다 */
.lay-fill{flex:1;min-height:0}

/* 교육 · 클래스 (LMS) */
.lms-learn{display:grid;grid-template-columns:calc(var(--v) * 260) minmax(0,1fr);
  gap:calc(var(--v) * 14);flex:1;min-height:0}
.lms-curr{padding:calc(var(--v) * 14) calc(var(--v) * 4) calc(var(--v) * 10);min-height:0;overflow:hidden}
.lms-curr .fv-card-h{padding:0 calc(var(--v) * 12) calc(var(--v) * 8)}
.lms-prog{display:flex;align-items:center;gap:calc(var(--v) * 10);
  padding:0 calc(var(--v) * 12) calc(var(--v) * 12)}
.lms-prog .fv-bar{flex:1;height:calc(var(--v) * 6)}
.lms-prog em{font-style:normal;font-size:calc(var(--v) * 11);color:var(--s-acc);font-weight:600;
  font-variant-numeric:tabular-nums}
.lms-ch{font-size:calc(var(--v) * 10.5);color:var(--s-dim);letter-spacing:.04em;
  padding:calc(var(--v) * 10) calc(var(--v) * 12) calc(var(--v) * 5)}
.lms-lesson{display:flex;align-items:center;gap:calc(var(--v) * 9);
  padding:calc(var(--v) * 7) calc(var(--v) * 12);font-size:calc(var(--v) * 11.5);
  color:var(--s-dim);border-radius:calc(var(--v) * max(var(--s-r) - 4, 2));
  margin:0 calc(var(--v) * 6)}
.lms-lesson span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.lms-lesson em{font-style:normal;font-size:calc(var(--v) * 10.5);flex:none;
  font-variant-numeric:tabular-nums}
/* 완료·진행·잠김을 액센트 하나로 칠하면 구분이 사라진다 — 채움 / 두꺼운 테두리 / 빈 원 */
.lms-dot{width:calc(var(--v) * 14);height:calc(var(--v) * 14);border-radius:50%;flex:none;
  border:calc(var(--v) * 1.5) solid var(--s-line)}
.lms-lesson.done{color:var(--s-fg)}
.lms-lesson.done .lms-dot{background:var(--s-acc);border-color:var(--s-acc)}
.lms-lesson.on{background:var(--s-nav-on);color:var(--s-nav-on-fg);font-weight:600}
.lms-lesson.on .lms-dot{border-color:currentColor;border-width:calc(var(--v) * 4)}

.lms-stage{display:flex;flex-direction:column;gap:calc(var(--v) * 12);min-height:0}
.lms-video{flex:1;min-height:0;position:relative;display:flex;align-items:center;
  justify-content:center;background:color-mix(in srgb,var(--s-acc) 13%,var(--s-sur));
  padding:0;overflow:hidden}
.lms-play{width:calc(var(--v) * 60);height:calc(var(--v) * 60);border-radius:50%;
  background:var(--s-acc);display:flex;align-items:center;justify-content:center;
  box-shadow:0 calc(var(--v) * 8) calc(var(--v) * 20) rgba(0,0,0,.18)}
.lms-play-i{width:calc(var(--v) * 24);height:calc(var(--v) * 24);color:var(--s-acc-fg);
  fill:currentColor;stroke:none}
.lms-ctl{position:absolute;left:calc(var(--v) * 16);right:calc(var(--v) * 16);
  bottom:calc(var(--v) * 14);display:flex;align-items:center;gap:calc(var(--v) * 10);
  font-size:calc(var(--v) * 10.5);color:var(--s-fg)}
.lms-ctl em{font-style:normal;font-variant-numeric:tabular-nums;flex:none}
.lms-ctl .fv-bar{flex:1;height:calc(var(--v) * 5)}
.lms-rate,.lms-cc{flex:none;border:var(--fv-bd);border-radius:999px;
  padding:calc(var(--v) * 2) calc(var(--v) * 8);background:var(--s-sur)}
.lms-tabs{flex:none;align-self:flex-start}
.lms-note{flex:none;padding:calc(var(--v) * 14) calc(var(--v) * 16);font-size:calc(var(--v) * 11.5);
  color:var(--s-dim);line-height:1.6}
.lms-note p{margin:0 0 calc(var(--v) * 8)}
.lms-note b{color:var(--s-fg)}
.lms-note ul{margin:0;padding-left:calc(var(--v) * 16)}
.lms-note code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--s-acc)}

.lms-resumes{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--v) * 12);flex:none}
.lms-resume{padding:calc(var(--v) * 12);display:flex;flex-direction:column;gap:calc(var(--v) * 8)}
.lms-thumb{height:calc(var(--v) * 62);border-radius:calc(var(--v) * max(var(--s-r) - 3, 2));
  display:flex;align-items:center;justify-content:center;flex:none}
.lms-thumb-i{width:calc(var(--v) * 22);height:calc(var(--v) * 22);color:#fff;opacity:.9}
.lms-thumb[data-c="1"]{background:linear-gradient(140deg,#6a7cff,#3b3fa8)}
.lms-thumb[data-c="2"]{background:linear-gradient(140deg,#e07a5f,#8d3f2c)}
.lms-thumb[data-c="3"]{background:linear-gradient(140deg,#3aa88a,#1c5a49)}
.lms-thumb[data-c="4"]{background:linear-gradient(140deg,#c78b3d,#6d4a18)}
.lms-thumb[data-c="5"]{background:linear-gradient(140deg,#9b6fd4,#4d3277)}
.lms-resume-t b{display:block;font-size:calc(var(--v) * 12.5)}
.lms-resume-t small{font-size:calc(var(--v) * 10.5);color:var(--s-dim)}
.lms-resume .fv-bar{flex:none;height:calc(var(--v) * 6);width:100%}
.lms-resume-f{display:flex;justify-content:space-between;font-size:calc(var(--v) * 10.5);
  color:var(--s-dim);font-variant-numeric:tabular-nums}
.lms-resume-f em{font-style:normal}
.lms-resume-f span{color:var(--s-acc);font-weight:600}

.lms-courses{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--v) * 12);
  flex:1;min-height:0}
.lms-course{padding:calc(var(--v) * 12);display:flex;flex-direction:column;
  gap:calc(var(--v) * 3);min-height:0;overflow:hidden}
.lms-course .lms-thumb{margin-bottom:calc(var(--v) * 8);height:calc(var(--v) * 58)}
.lms-course>b{font-size:calc(var(--v) * 12.5)}
.lms-course>small{font-size:calc(var(--v) * 10.5);color:var(--s-dim)}
.lms-rate-row{display:flex;align-items:center;gap:calc(var(--v) * 4);
  font-size:calc(var(--v) * 10.5);color:var(--s-dim);margin-top:calc(var(--v) * 5)}
.lms-rate-row .lay-star{color:var(--s-acc)}
.lms-rate-row em{font-style:normal;color:var(--s-fg);font-weight:600}
.lms-price{margin-top:auto;font-size:calc(var(--v) * 14)}

.lms-certs{display:grid;grid-template-columns:repeat(4,1fr);gap:calc(var(--v) * 12);
  flex:1;min-height:0}
.lms-cert{padding:calc(var(--v) * 16) calc(var(--v) * 14);display:flex;flex-direction:column;
  align-items:flex-start;gap:calc(var(--v) * 3);min-height:0;overflow:hidden;
  background:linear-gradient(160deg,color-mix(in srgb,var(--s-acc) 10%,var(--s-sur)),var(--s-sur))}
.lms-cert-i{width:calc(var(--v) * 30);height:calc(var(--v) * 30);color:var(--s-acc);
  margin-bottom:calc(var(--v) * 10)}
.lms-cert b{font-size:calc(var(--v) * 13)}
.lms-cert small{font-size:calc(var(--v) * 10.5);color:var(--s-dim)}
.lms-cert-no{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;
  font-size:calc(var(--v) * 10);color:var(--s-dim);margin:calc(var(--v) * 8) 0}
.lms-cert .fv-badge{margin-top:auto}

/* 커뮤니티 · 소셜 */
.rl-feed{display:grid;grid-template-columns:minmax(0,1fr) calc(var(--v) * 320);
  gap:calc(var(--v) * 14);flex:1;min-height:0}
.rl-list{display:flex;flex-direction:column;gap:calc(var(--v) * 8);min-height:0}
.rl-item{display:flex;align-items:flex-start;gap:calc(var(--v) * 12);flex:1;min-height:0;
  background:var(--s-sur);border:var(--fv-bd);box-shadow:var(--s-sh);
  border-radius:calc(var(--v) * var(--s-r));padding:calc(var(--v) * 11) calc(var(--v) * 14)}
.rl-item.on{border-color:var(--s-acc)}
.rl-vote{display:flex;flex-direction:column;align-items:center;gap:calc(var(--v) * 2);flex:none;
  width:calc(var(--v) * 30)}
.rl-up{color:var(--s-acc)}
.rl-up .fv-i{width:calc(var(--v) * 15);height:calc(var(--v) * 15)}
.rl-vote b{font-size:calc(var(--v) * 12);font-variant-numeric:tabular-nums}
.rl-item-b{flex:1;min-width:0}
.rl-by{display:flex;align-items:center;gap:calc(var(--v) * 5);font-size:calc(var(--v) * 11)}
.rl-by b{font-weight:600}
.rl-by small{color:var(--s-dim)}
.rl-item-b h4{margin:calc(var(--v) * 5) 0 calc(var(--v) * 7);font-size:calc(var(--v) * 13.5);
  font-weight:600;letter-spacing:var(--s-track);overflow:hidden;text-overflow:ellipsis;
  white-space:nowrap}
.rl-tags{display:flex;gap:calc(var(--v) * 5)}
.rl-tags span{font-size:calc(var(--v) * 10.5);color:var(--s-acc);
  background:color-mix(in srgb,var(--s-acc) 12%,transparent);
  padding:calc(var(--v) * 2) calc(var(--v) * 9);border-radius:999px}
.rl-cm{font-style:normal;display:flex;align-items:center;gap:calc(var(--v) * 5);flex:none;
  font-size:calc(var(--v) * 11);color:var(--s-dim)}
.rl-cm .fv-i{width:calc(var(--v) * 13);height:calc(var(--v) * 13)}

.rl-detail{padding:calc(var(--v) * 16);display:flex;flex-direction:column;min-height:0;overflow:hidden}
.rl-more{margin-left:auto}
.rl-detail h3{margin:calc(var(--v) * 9) 0 calc(var(--v) * 6);font-size:calc(var(--v) * 15);
  font-family:var(--s-head-font);font-weight:var(--s-head-w);letter-spacing:var(--s-track);
  line-height:1.35}
.rl-detail>p{margin:0 0 calc(var(--v) * 12);font-size:calc(var(--v) * 11.5);color:var(--s-dim);
  line-height:1.6}
.rl-acts{display:flex;gap:calc(var(--v) * 6);padding-bottom:calc(var(--v) * 12);
  border-bottom:var(--fv-bd)}
.rl-acts .fv-btn{font-size:calc(var(--v) * 10.5);padding:calc(var(--v) * 5) calc(var(--v) * 10)}
.rl-thread{display:flex;flex-direction:column;gap:calc(var(--v) * 10);
  padding:calc(var(--v) * 12) 0;flex:1;min-height:0;overflow:hidden}
.rl-cmt{display:flex;gap:calc(var(--v) * 8);font-size:calc(var(--v) * 11)}
.rl-cmt b{font-weight:600;display:block}
.rl-cmt p{margin:calc(var(--v) * 3) 0 0;color:var(--s-dim);line-height:1.5}
/* 뎁스는 색이 아니라 들여쓰기와 선으로 — 색으로 풀면 2단만 넘어가도 무너진다 */
.rl-cmt.nest{margin-left:calc(var(--v) * 22);padding-left:calc(var(--v) * 10);
  border-left:calc(var(--v) * 2) solid var(--s-line)}
.rl-input{display:flex;align-items:center;gap:calc(var(--v) * 8);flex:none;
  border:var(--fv-bd);border-radius:calc(var(--v) * var(--s-r));
  padding:calc(var(--v) * 8) calc(var(--v) * 12);color:var(--s-dim);font-size:calc(var(--v) * 11)}

.rl-rank{display:flex;flex-direction:column;gap:calc(var(--v) * 8);flex:1;min-height:0}
.rl-rank-r{display:flex;align-items:center;gap:calc(var(--v) * 14);flex:1;min-height:0;
  background:var(--s-sur);border:var(--fv-bd);box-shadow:var(--s-sh);
  border-radius:calc(var(--v) * var(--s-r));padding:calc(var(--v) * 9) calc(var(--v) * 16)}
.rl-rank-n{font-size:calc(var(--v) * 18);width:calc(var(--v) * 22);flex:none;color:var(--s-acc);
  font-family:var(--s-head-font);font-weight:var(--s-head-w)}
.rl-rank-t{width:calc(var(--v) * 250);flex:none}
.rl-rank-t b{display:block;font-size:calc(var(--v) * 12.5);overflow:hidden;
  text-overflow:ellipsis;white-space:nowrap}
.rl-rank-t small{display:flex;align-items:center;font-size:calc(var(--v) * 10.5);color:var(--s-dim)}
.rl-rank-b{flex:1;height:calc(var(--v) * 6)}
.rl-rank-r em{font-style:normal;font-size:calc(var(--v) * 11);color:var(--s-dim);flex:none;
  display:flex;align-items:center;gap:calc(var(--v) * 4);width:calc(var(--v) * 52)}
.rl-rank-r em .fv-i{width:calc(var(--v) * 12);height:calc(var(--v) * 12)}

.rl-topics{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--v) * 12);
  flex:1;min-height:0}
.rl-topic{padding:calc(var(--v) * 14);display:flex;flex-direction:column;
  align-items:flex-start;gap:calc(var(--v) * 6)}
.rl-topic-h{display:flex;align-items:center;gap:calc(var(--v) * 9);width:100%}
.rl-topic-i{width:calc(var(--v) * 34);height:calc(var(--v) * 34);border-radius:calc(var(--v) * 10);
  flex:none;display:flex;align-items:center;justify-content:center;color:var(--s-acc);
  background:color-mix(in srgb,var(--s-acc) 12%,var(--s-bg))}
.rl-topic-h b{display:block;font-size:calc(var(--v) * 13)}
.rl-topic-h small{font-size:calc(var(--v) * 10.5);color:var(--s-dim)}
.rl-topic-h .fv-badge{margin-left:auto}
.rl-topic>em{font-style:normal;font-size:calc(var(--v) * 11);color:var(--s-dim)}
.rl-topic .fv-btn{align-self:stretch;justify-content:center;margin-top:auto;
  font-size:calc(var(--v) * 11);padding:calc(var(--v) * 6) 0}

.rl-notifs{display:flex;flex-direction:column;flex:1;min-height:0}
.rl-notif{display:flex;align-items:center;gap:calc(var(--v) * 11);flex:1;min-height:0;
  border-bottom:var(--fv-bd);padding:0 calc(var(--v) * 6)}
.rl-notif-i{width:calc(var(--v) * 28);height:calc(var(--v) * 28);border-radius:50%;flex:none;
  display:flex;align-items:center;justify-content:center;color:var(--s-dim);
  background:color-mix(in srgb,var(--s-line) 45%,transparent)}
.rl-notif.unread .rl-notif-i{color:var(--s-acc);
  background:color-mix(in srgb,var(--s-acc) 13%,transparent)}
.rl-notif-t{flex:1;min-width:0;font-size:calc(var(--v) * 11.5)}
.rl-notif-t small{display:block;color:var(--s-dim);font-size:calc(var(--v) * 10.5);
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.rl-notif em{font-style:normal;font-size:calc(var(--v) * 10.5);color:var(--s-dim);flex:none}
/* 안읽음은 점 하나로 끝내지 않는다 — 아이콘 배경까지 같이 바뀐다 */
.rl-dot{width:calc(var(--v) * 7);height:calc(var(--v) * 7);border-radius:50%;flex:none;
  background:var(--s-acc)}

.rl-me{display:flex;align-items:center;gap:calc(var(--v) * 14);flex:none;
  background:var(--s-sur);border:var(--fv-bd);box-shadow:var(--s-sh);
  border-radius:calc(var(--v) * var(--s-r));padding:calc(var(--v) * 14) calc(var(--v) * 18)}
.rl-me>.fv-av{width:calc(var(--v) * 46);height:calc(var(--v) * 46);font-size:calc(var(--v) * 18)}
.rl-me b{font-size:calc(var(--v) * 15)}
.rl-me small{display:block;font-size:calc(var(--v) * 11);color:var(--s-dim)}
.rl-me-s{margin-left:auto;display:flex;gap:calc(var(--v) * 22)}
.rl-me-s span{font-size:calc(var(--v) * 10.5);color:var(--s-dim);text-align:center}
.rl-me-s b{display:block;font-size:calc(var(--v) * 17);color:var(--s-fg);
  font-variant-numeric:tabular-nums}

/* 공공 · 기관 포털 */
.civ-alert{display:flex;align-items:center;gap:calc(var(--v) * 10);flex:none;
  padding:calc(var(--v) * 8) calc(var(--v) * 14);border:var(--fv-bd);
  border-left:calc(var(--v) * 5) solid var(--s-acc);
  border-radius:calc(var(--v) * var(--s-r));background:var(--s-sur);
  font-size:calc(var(--v) * 12)}
.civ-alert .fv-i{color:var(--s-acc);flex:none}
.civ-alert b{flex:none}
.civ-alert>span:first-of-type{flex:1;min-width:0}
.civ-alert .fv-link{flex:none}
.civ-search{display:flex;align-items:center;gap:calc(var(--v) * 12);flex:none;
  border:calc(var(--v) * 3) solid var(--s-acc);border-radius:calc(var(--v) * var(--s-r));
  background:var(--s-sur);padding:calc(var(--v) * 7) calc(var(--v) * 8) calc(var(--v) * 7) calc(var(--v) * 16)}
.civ-search .fv-i{width:calc(var(--v) * 20);height:calc(var(--v) * 20);color:var(--s-acc);stroke-width:2.2}
.civ-search>span:not(.fv-btn){flex:1;color:var(--s-dim);font-size:calc(var(--v) * 14)}
.civ-search .fv-btn{padding:calc(var(--v) * 9) calc(var(--v) * 24)}

.civ-tiles{display:grid;grid-template-columns:repeat(4,1fr);gap:calc(var(--v) * 10);flex:none}
/* 라운드·그림자 없이 두꺼운 선으로만 구분한다 — 이 스킨의 규격이 곧 정체성 */
.civ-tile{display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:calc(var(--v) * 7);padding:calc(var(--v) * 10) calc(var(--v) * 6);
  border:var(--fv-bd);border-radius:calc(var(--v) * var(--s-r));background:var(--s-sur);
  font-size:calc(var(--v) * 12.5);text-align:center}
.civ-tile .fv-i{width:calc(var(--v) * 22);height:calc(var(--v) * 22);color:var(--s-acc)}

.civ-two{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);
  gap:calc(var(--v) * 14);flex:1;min-height:0}
.civ-list{list-style:none;margin:0;padding:0}
.civ-list li{display:flex;align-items:center;gap:calc(var(--v) * 10);
  padding:calc(var(--v) * 7) 0;border-top:var(--fv-bd);font-size:calc(var(--v) * 12.5)}
.civ-list li>span:not(.fv-badge){flex:1;min-width:0;overflow:hidden;
  text-overflow:ellipsis;white-space:nowrap}
.civ-list li>.fv-badge{flex:none}
.civ-list em{font-style:normal;font-size:calc(var(--v) * 11);color:var(--s-dim);flex:none}
.civ-stat{display:flex;gap:calc(var(--v) * 20);padding:calc(var(--v) * 6) 0}
.civ-stat b{display:block;font-size:calc(var(--v) * 22)}
.civ-stat small{font-size:calc(var(--v) * 11);color:var(--s-dim)}
.civ-note{display:flex;align-items:center;gap:calc(var(--v) * 8);margin-top:calc(var(--v) * 10);
  padding-top:calc(var(--v) * 10);border-top:var(--fv-bd);font-size:calc(var(--v) * 11.5);
  color:var(--s-dim)}
.civ-note .fv-i{width:calc(var(--v) * 14);height:calc(var(--v) * 14)}
.civ-note b{color:var(--s-fg)}

.civ-steps{display:flex;align-items:center;flex:none;position:relative;
  padding-bottom:calc(var(--v) * 22)}
.civ-steps i{width:calc(var(--v) * 30);height:calc(var(--v) * 30);border-radius:50%;flex:none;
  display:flex;align-items:center;justify-content:center;font-size:calc(var(--v) * 13);
  font-weight:700;background:var(--s-line);color:var(--s-dim)}
.civ-steps i .fv-i{width:calc(var(--v) * 15);height:calc(var(--v) * 15)}
.civ-steps i.on,.civ-steps i.cur{background:var(--s-acc);color:var(--s-acc-fg)}
.civ-steps .ln{flex:1;height:calc(var(--v) * 3);background:var(--s-line)}
.civ-steps .ln.on{background:var(--s-acc)}
.civ-steps-l{position:absolute;left:0;right:0;bottom:0;display:flex;
  justify-content:space-between;font-size:calc(var(--v) * 11.5);color:var(--s-dim)}
.civ-steps-l span:nth-child(2){color:var(--s-fg);font-weight:700}

.civ-form{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);
  gap:calc(var(--v) * 14);flex:1;min-height:0}
.civ-form aside{display:flex;flex-direction:column;gap:calc(var(--v) * 12);min-height:0}
.civ-field{display:flex;align-items:center;justify-content:space-between;
  gap:calc(var(--v) * 14);padding:calc(var(--v) * 9) 0;border-top:var(--fv-bd)}
.civ-field label{font-size:calc(var(--v) * 12.5);display:flex;align-items:center;
  gap:calc(var(--v) * 7)}
/* 필수 표시를 별표 하나로 끝내지 않는다 — 글자로 쓴다 */
.civ-field label em{font-style:normal;font-size:calc(var(--v) * 10);
  color:var(--s-acc-fg);background:var(--s-acc);padding:calc(var(--v) * 1) calc(var(--v) * 6)}
.civ-field label span{font-size:calc(var(--v) * 10);color:var(--s-dim);
  border:var(--fv-bd);padding:calc(var(--v) * 1) calc(var(--v) * 6)}
.civ-field .lay-inp{min-width:calc(var(--v) * 180)}
.civ-warn{display:flex;gap:calc(var(--v) * 10);flex:none;
  padding:calc(var(--v) * 12) calc(var(--v) * 14);background:var(--s-sur);
  border:var(--fv-bd);border-left:calc(var(--v) * 5) solid var(--fv-warn);
  border-radius:calc(var(--v) * var(--s-r))}
.civ-warn .fv-i{color:var(--fv-warn);flex:none;margin-top:calc(var(--v) * 2)}
.civ-warn b{display:block;font-size:calc(var(--v) * 12)}
.civ-warn span{font-size:calc(var(--v) * 11);color:var(--s-dim);line-height:1.5}
.civ-fee{display:flex;align-items:baseline;justify-content:space-between;
  font-size:calc(var(--v) * 12.5)}
.civ-fee b{font-size:calc(var(--v) * 20)}
.civ-fee-n{display:block;margin-top:calc(var(--v) * 6);font-size:calc(var(--v) * 11);
  color:var(--s-dim)}
.civ-acts{display:flex;gap:calc(var(--v) * 8);margin-top:auto}
.civ-acts .fv-btn{flex:1;justify-content:center}

.civ-info{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);
  gap:calc(var(--v) * 14);flex:1;min-height:0}
.civ-info aside{display:flex;flex-direction:column;gap:calc(var(--v) * 12);min-height:0}
.civ-dept{list-style:none;margin:0;padding:0}
.civ-dept li{display:flex;align-items:center;gap:calc(var(--v) * 12);
  padding:calc(var(--v) * 10) 0;border-top:var(--fv-bd);font-size:calc(var(--v) * 12.5)}
.civ-dept b{width:calc(var(--v) * 100);flex:none}
.civ-dept span{flex:1;color:var(--s-dim);font-size:calc(var(--v) * 11.5)}
.civ-dept em{font-style:normal;flex:none;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;
  font-size:calc(var(--v) * 11.5)}
.civ-map{height:calc(var(--v) * 84);display:flex;align-items:center;justify-content:center;
  border:var(--fv-bd);border-radius:calc(var(--v) * var(--s-r));
  margin-bottom:calc(var(--v) * 10);background:color-mix(in srgb,var(--s-acc) 8%,var(--s-bg))}
.civ-map .lay-ph{width:calc(var(--v) * 28);height:calc(var(--v) * 28)}

/* 브랜드 · 랜딩 */
.mono-hero{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:center;
  padding:calc(var(--v) * 8) 0}
.mono-kick{font-size:calc(var(--v) * 11);letter-spacing:.14em;color:var(--s-dim);
  margin-bottom:calc(var(--v) * 14)}
/* 색이 없으니 크기 차이가 위계의 전부다 — 여기서 두 단계만 줄여도 화면이 무너진다 */
.mono-h{margin:0;font-size:calc(var(--v) * 66);line-height:.94;font-weight:800;
  letter-spacing:calc(var(--v) * -2.6)}
.mono-lede{margin:calc(var(--v) * 20) 0 0;max-width:46ch;font-size:calc(var(--v) * 14);
  color:var(--s-dim);line-height:1.6}
.mono-cta{display:flex;gap:calc(var(--v) * 10);margin-top:calc(var(--v) * 24)}
.mono-cta .fv-btn{padding:calc(var(--v) * 12) calc(var(--v) * 26);font-size:calc(var(--v) * 13)}
.mono-stats{display:flex;gap:calc(var(--v) * 44);margin-top:calc(var(--v) * 34);
  padding-top:calc(var(--v) * 20);border-top:var(--fv-bd)}
.mono-stats b{display:block;font-size:calc(var(--v) * 26);letter-spacing:var(--s-track)}
.mono-stats small{font-size:calc(var(--v) * 11);color:var(--s-dim)}
.mono-logos{display:flex;align-items:center;gap:calc(var(--v) * 30);flex:none;
  padding-top:calc(var(--v) * 16);border-top:var(--fv-bd)}
.mono-logos small{font-size:calc(var(--v) * 11);color:var(--s-dim);flex:none}
.mono-logos span{font-size:calc(var(--v) * 13);letter-spacing:.12em;color:var(--s-dim)}

.mono-sec{flex:none}
.mono-sec small{font-size:calc(var(--v) * 11);letter-spacing:.14em;color:var(--s-dim)}
.mono-sec h2{margin:calc(var(--v) * 8) 0 0;font-size:calc(var(--v) * 34);line-height:1.05;
  font-weight:800;letter-spacing:calc(var(--v) * -1.2)}
.mono-sec p{margin:calc(var(--v) * 10) 0 0;font-size:calc(var(--v) * 13);color:var(--s-dim)}

.mono-feats{display:grid;grid-template-columns:repeat(3,1fr);gap:0;flex:1;min-height:0;
  border-top:var(--fv-bd);border-left:var(--fv-bd)}
/* 카드가 아니라 괘선으로 구획한다 — 그림자·라운드를 안 쓰는 스킨의 기본 어휘 */
.mono-feat{border-right:var(--fv-bd);border-bottom:var(--fv-bd);
  padding:calc(var(--v) * 20);display:flex;flex-direction:column}
.mono-feat-h{display:flex;align-items:center;justify-content:space-between}
.mono-feat-h em{font-style:normal;font-size:calc(var(--v) * 12);color:var(--s-dim);
  letter-spacing:.1em}
.mono-feat-h .fv-i{width:calc(var(--v) * 20);height:calc(var(--v) * 20)}
.mono-feat h3{margin:calc(var(--v) * 18) 0 calc(var(--v) * 10);font-size:calc(var(--v) * 19);
  letter-spacing:var(--s-track)}
.mono-feat p{margin:0 0 calc(var(--v) * 14);font-size:calc(var(--v) * 12);color:var(--s-dim);
  line-height:1.6}
.mono-feat .fv-link{margin-top:auto;display:inline-flex;align-items:center;
  gap:calc(var(--v) * 5)}
.mono-feat .fv-link .fv-i{width:calc(var(--v) * 13);height:calc(var(--v) * 13)}
.mono-band{display:flex;align-items:center;justify-content:space-between;flex:none;
  gap:calc(var(--v) * 20);background:var(--s-acc);color:var(--s-acc-fg);
  padding:calc(var(--v) * 20) calc(var(--v) * 24)}
.mono-band b{font-size:calc(var(--v) * 20);letter-spacing:var(--s-track)}
.mono-band .fv-btn{background:var(--s-acc-fg);color:var(--s-acc);flex:none}

.mono-plans{display:grid;grid-template-columns:repeat(3,1fr);gap:0;flex:1;min-height:0;
  border-left:var(--fv-bd)}
.mono-plan{border-right:var(--fv-bd);border-top:var(--fv-bd);border-bottom:var(--fv-bd);
  padding:calc(var(--v) * 18);display:flex;flex-direction:column;position:relative;min-height:0}
.mono-plan.on{background:var(--s-acc);color:var(--s-acc-fg)}
.mono-plan.on .fv-btn{background:var(--s-acc-fg);color:var(--s-acc)}
.mono-plan.on .fv-i{color:var(--s-acc-fg)}
.mono-plan-tag{font-size:calc(var(--v) * 10);letter-spacing:.12em;
  margin-bottom:calc(var(--v) * 10);opacity:.75}
.mono-plan h3{margin:0;font-size:calc(var(--v) * 15);letter-spacing:var(--s-track)}
.mono-plan>b{font-size:calc(var(--v) * 26);margin:calc(var(--v) * 8) 0 calc(var(--v) * 2);
  letter-spacing:var(--s-track)}
.mono-plan>small{font-size:calc(var(--v) * 10.5);color:var(--s-dim)}
.mono-plan ul{list-style:none;margin:calc(var(--v) * 14) 0;padding:0;
  display:flex;flex-direction:column;gap:calc(var(--v) * 7)}
.mono-plan li{display:flex;align-items:flex-start;gap:calc(var(--v) * 8);
  font-size:calc(var(--v) * 11.5);line-height:1.4}
.mono-plan li .fv-i{width:calc(var(--v) * 13);height:calc(var(--v) * 13);flex:none;
  margin-top:calc(var(--v) * 2)}
.mono-plan .fv-btn{align-self:stretch;justify-content:center;margin-top:auto}
.mono-faq{display:grid;grid-template-columns:1fr 1fr;gap:calc(var(--v) * 24);flex:none;
  padding-top:calc(var(--v) * 14)}
.mono-faq b{display:block;font-size:calc(var(--v) * 12.5)}
.mono-faq span{font-size:calc(var(--v) * 11.5);color:var(--s-dim);line-height:1.55}

.mono-quote{margin:0;flex:none;border-top:var(--fv-bd);border-bottom:var(--fv-bd);
  padding:calc(var(--v) * 22) 0}
.mono-quote p{margin:0 0 calc(var(--v) * 16);font-size:calc(var(--v) * 24);line-height:1.35;
  font-weight:700;letter-spacing:calc(var(--v) * -0.8);max-width:34ch}
.mono-quote footer{display:flex;align-items:center;gap:calc(var(--v) * 10)}
.mono-quote footer b{display:block;font-size:calc(var(--v) * 12.5)}
.mono-quote footer small{font-size:calc(var(--v) * 10.5);color:var(--s-dim)}
.mono-cases{display:grid;grid-template-columns:repeat(3,1fr);gap:0;flex:1;min-height:0;
  border-left:var(--fv-bd)}
.mono-case{border-right:var(--fv-bd);border-bottom:var(--fv-bd);
  padding:calc(var(--v) * 18);display:flex;flex-direction:column;gap:calc(var(--v) * 4)}
.mono-case-l{font-size:calc(var(--v) * 13);letter-spacing:.12em}
.mono-case>span{font-size:calc(var(--v) * 11.5);color:var(--s-dim)}
.mono-case-m{font-size:calc(var(--v) * 28);margin-top:auto;letter-spacing:var(--s-track)}
.mono-case>small{font-size:calc(var(--v) * 10.5);color:var(--s-dim)}

.mono-contact{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);
  gap:calc(var(--v) * 24);flex:1;min-height:0}
.mono-contact>section{display:flex;flex-direction:column;min-height:0}
.mono-contact aside{display:flex;flex-direction:column;gap:calc(var(--v) * 12);min-height:0}
.mono-field{display:flex;align-items:center;justify-content:space-between;
  gap:calc(var(--v) * 16);padding:calc(var(--v) * 8) 0;border-bottom:var(--fv-bd)}
.mono-field:first-of-type{margin-top:calc(var(--v) * 16);border-top:var(--fv-bd)}
.mono-field label{font-size:calc(var(--v) * 12);flex:none}
.mono-field .lay-inp{border:none;background:none;min-width:calc(var(--v) * 220);
  justify-content:flex-end;padding:0;color:var(--s-dim)}
.mono-area{max-width:calc(var(--v) * 300);text-align:right}
.mono-send{align-self:flex-start;margin-top:calc(var(--v) * 16);
  padding:calc(var(--v) * 11) calc(var(--v) * 26)}
.mono-check{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;
  gap:calc(var(--v) * 8)}
.mono-check li{display:flex;align-items:center;gap:calc(var(--v) * 8);
  font-size:calc(var(--v) * 11.5)}
.mono-check .fv-i{width:calc(var(--v) * 13);height:calc(var(--v) * 13)}
.mono-steps{list-style:none;margin:0;padding:0}
.mono-steps li{display:flex;gap:calc(var(--v) * 14);padding:calc(var(--v) * 8) 0;
  border-top:var(--fv-bd);font-size:calc(var(--v) * 11.5)}
.mono-steps em{font-style:normal;color:var(--s-dim);width:calc(var(--v) * 34);flex:none}
`
