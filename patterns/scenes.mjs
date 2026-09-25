// 카드 프리뷰 씬 — 스킨마다 **자기 분야의 화면 조각**을 연기한다.
//
// 전부 같은 화면을 렌더하면 "색상만 바꾼 것"으로 읽힌다. 카드에서는
// 각 스킨이 가장 잘 맞는 도메인(fits)의 부품을 보여주고,
// 동일 화면 비교는 상세 시트의 풀 목업(PREVIEW_FULL)이 담당한다.
//
// 표면은 .pv-kpi / .pv-panel, 버튼은 .pv-btn 클래스를 유지한다 —
// 스킨 extra CSS(네온 격자, 보더, 그림자 시그니처)가 이 클래스들을 겨냥하기 때문.

/** 씬 공통 골격 — --u(프리뷰 1px)는 컨테이너 폭 480 기준 */
export const SCENES_CSS = `
.pv-wrap{container-type:inline-size;aspect-ratio:16/10;overflow:hidden;background:#f2f0ec}
.pv{--u:calc(100cqw / 480);width:100%;height:100%;position:relative;overflow:hidden;
  background:var(--s-bg);color:var(--s-fg);font-family:var(--s-font);
  -webkit-font-smoothing:antialiased}
.pv-kpi,.pv-panel{position:absolute;background:var(--s-sur);
  border-radius:calc(var(--u) * var(--s-r))}
.pv-kpi{box-shadow:0 calc(var(--u) * 14) calc(var(--u) * 34) rgba(0,0,0,.16)}
.pv-btn{position:absolute;background:var(--s-acc);color:var(--s-acc-fg);
  font-size:calc(var(--u) * 13);font-weight:600;white-space:nowrap;
  padding:calc(var(--u) * 9) calc(var(--u) * 18);
  border-radius:calc(var(--u) * var(--s-r));z-index:4;
  box-shadow:0 calc(var(--u) * 8) calc(var(--u) * 20) rgba(0,0,0,.14)}
.pv .badge{position:absolute;z-index:3;font-size:calc(var(--u) * 12);color:var(--s-acc);
  border:1.5px solid currentColor;border-radius:calc(var(--u) * 999);
  padding:calc(var(--u) * 3) calc(var(--u) * 12)}
.pv small{color:var(--s-dim)}
.pv .num{font-family:var(--s-head-font);font-weight:var(--s-head-w);
  letter-spacing:var(--s-track);line-height:1.1}
.pv .spark{display:block}
.pv .spark path{fill:none;stroke:var(--s-acc);stroke-width:2.5;
  vector-effect:non-scaling-stroke;stroke-linecap:round;stroke-linejoin:round}
.pv .spark .fill{fill:var(--s-acc);opacity:.15;stroke:none}
`

/* ---------- 씬 정의 ---------- */

const scenes = {}
const css = []

/* 코발트 그레이 — B2B SaaS 대시보드 (KPI + 도넛 + 추이) */
scenes['cobalt-gray'] = {
  domain: 'SaaS 대시보드',
  html: `
  <div class="pv-panel cg-chart">
    <svg class="spark" viewBox="0 0 240 90" preserveAspectRatio="none">
      <path class="fill" d="M0,66 L30,54 L60,60 L90,42 L120,50 L150,30 L180,38 L210,20 L240,26 L240,90 L0,90 Z"/>
      <path d="M0,66 L30,54 L60,60 L90,42 L120,50 L150,30 L180,38 L210,20 L240,26"/>
    </svg>
  </div>
  <svg class="cg-donut" viewBox="0 0 42 42">
    <circle class="bgc" cx="21" cy="21" r="15.9155"/>
    <circle class="s1" cx="21" cy="21" r="15.9155" stroke-dasharray="44 56"/>
    <circle class="s2" cx="21" cy="21" r="15.9155" stroke-dasharray="26 74" stroke-dashoffset="-44"/>
  </svg>
  <div class="pv-kpi cg-kpi">
    <small>이번 달 매출</small>
    <b class="num">₩48.2M</b>
    <em>↗ +8.1%</em>
  </div>
  <span class="badge cg-b">완료</span>
  <span class="pv-btn cg-btn">새로 만들기</span>`,
}
css.push(`
.cg-chart{left:calc(var(--u) * -24);bottom:calc(var(--u) * -34);z-index:1;
  width:calc(var(--u) * 268);height:calc(var(--u) * 150);padding:calc(var(--u) * 16)}
.cg-donut{position:absolute;right:calc(var(--u) * 42);top:calc(var(--u) * 40);z-index:2;
  width:calc(var(--u) * 128);height:calc(var(--u) * 128);transform:rotate(-90deg)}
.cg-donut .bgc{fill:none;stroke:var(--s-line);stroke-width:6}
.cg-donut .s1,.cg-donut .s2{fill:none;stroke-width:6}
.cg-donut .s1{stroke:var(--s-acc)}
.cg-donut .s2{stroke:color-mix(in srgb,var(--s-acc) 45%,transparent)}
.cg-kpi{left:calc(var(--u) * 64);top:calc(var(--u) * 52);z-index:3;
  width:calc(var(--u) * 206);padding:calc(var(--u) * 20) calc(var(--u) * 22);
  display:flex;flex-direction:column;gap:calc(var(--u) * 4)}
.cg-kpi small{font-size:calc(var(--u) * 13)}
.cg-kpi b{font-size:calc(var(--u) * 40)}
.cg-kpi em{font-style:normal;font-size:calc(var(--u) * 13);color:var(--s-acc)}
.cg-b{left:calc(var(--u) * 34);top:calc(var(--u) * 26)}
.cg-btn{right:calc(var(--u) * 34);bottom:calc(var(--u) * 30)}`)

/* 블랙 옐로우 — 물류 트래킹 (송장 + 스텝퍼 + 바코드) */
scenes['black-yellow'] = {
  domain: '물류 · 배송',
  html: `
  <div class="pv-kpi by-track">
    <small>송장번호 KR-24810-3</small>
    <b class="num">배송중</b>
    <div class="by-steps">
      <i class="on"></i><span class="ln on"></span><i class="on"></i><span class="ln on"></span><i class="cur"></i><span class="ln"></span><i></i>
    </div>
    <div class="by-lbl"><span>접수</span><span>출고</span><span>배송중</span><span>도착</span></div>
  </div>
  <div class="pv-panel by-code"><i></i></div>
  <span class="badge by-b">당일 출고</span>
  <span class="pv-btn by-btn">배송 조회</span>`,
}
css.push(`
.by-track{left:calc(var(--u) * 44);top:calc(var(--u) * 46);z-index:3;
  width:calc(var(--u) * 268);padding:calc(var(--u) * 20) calc(var(--u) * 22)}
.by-track small{font-size:calc(var(--u) * 12);display:block}
.by-track b{font-size:calc(var(--u) * 34);display:block;margin:calc(var(--u) * 4) 0 calc(var(--u) * 14)}
.by-steps{display:flex;align-items:center}
.by-steps i{width:calc(var(--u) * 12);height:calc(var(--u) * 12);border-radius:50%;
  background:var(--s-line);flex:none}
.by-steps i.on{background:var(--s-acc)}
.by-steps i.cur{background:var(--s-acc);box-shadow:0 0 0 calc(var(--u) * 4) color-mix(in srgb,var(--s-acc) 30%,transparent)}
.by-steps .ln{flex:1;height:calc(var(--u) * 2.5);background:var(--s-line)}
.by-steps .ln.on{background:var(--s-acc)}
.by-lbl{display:flex;justify-content:space-between;margin-top:calc(var(--u) * 7);
  font-size:calc(var(--u) * 10.5);color:var(--s-dim)}
.by-code{right:calc(var(--u) * -20);top:calc(var(--u) * -24);z-index:1;
  width:calc(var(--u) * 150);height:calc(var(--u) * 120);
  display:flex;align-items:flex-end;padding:calc(var(--u) * 16)}
.by-code i{display:block;width:100%;height:calc(var(--u) * 42);
  background:repeating-linear-gradient(90deg,var(--s-fg) 0,var(--s-fg) calc(var(--u) * 3),
    transparent calc(var(--u) * 3),transparent calc(var(--u) * 7),
    var(--s-fg) calc(var(--u) * 7),var(--s-fg) calc(var(--u) * 12),
    transparent calc(var(--u) * 12),transparent calc(var(--u) * 14))}
.by-b{left:calc(var(--u) * 44);top:calc(var(--u) * 18)}
.by-btn{right:calc(var(--u) * 34);bottom:calc(var(--u) * 28)}`)

/* 네온 엔지니어링 — 인프라 모니터링 (업타임 + 로그 터미널) */
scenes['neon-engineering'] = {
  domain: '모니터링 · 인프라',
  html: `
  <div class="pv-panel ne-term">
    <div class="ne-bar"><i></i><i></i><i></i></div>
    <div class="ne-log"><em>›</em> api-01 <b>200</b> 42ms</div>
    <div class="ne-log"><em>›</em> api-02 <b>200</b> 38ms</div>
    <div class="ne-log warn"><em>›</em> db-01 <b>503</b> retry…</div>
    <div class="ne-log"><em>›</em> cache <b>200</b> 3ms</div>
  </div>
  <div class="pv-kpi ne-kpi">
    <small>UPTIME</small>
    <b class="num">99.98<i>%</i></b>
    <svg class="spark ne-sp" viewBox="0 0 150 34" preserveAspectRatio="none">
      <path d="M0,24 L18,20 L36,26 L54,12 L72,18 L90,8 L108,14 L126,6 L150,10"/>
    </svg>
  </div>
  <span class="badge ne-b">LIVE</span>`,
}
css.push(`
.ne-term{left:calc(var(--u) * -18);bottom:calc(var(--u) * -20);z-index:1;
  width:calc(var(--u) * 260);height:calc(var(--u) * 168);
  padding:calc(var(--u) * 14) calc(var(--u) * 18);font-size:calc(var(--u) * 12.5)}
.ne-bar{display:flex;gap:calc(var(--u) * 5);margin-bottom:calc(var(--u) * 12)}
.ne-bar i{width:calc(var(--u) * 8);height:calc(var(--u) * 8);border-radius:50%;
  background:var(--s-line)}
.ne-log{display:flex;gap:calc(var(--u) * 7);align-items:baseline;
  padding:calc(var(--u) * 3) 0;color:var(--s-dim)}
.ne-log em{font-style:normal;color:var(--s-acc)}
.ne-log b{font-weight:600;color:var(--s-acc)}
.ne-log.warn,.ne-log.warn b{color:#ffb84d}
.ne-kpi{right:calc(var(--u) * 34);top:calc(var(--u) * 40);z-index:3;
  width:calc(var(--u) * 196);padding:calc(var(--u) * 18) calc(var(--u) * 20)}
.ne-kpi small{font-size:calc(var(--u) * 12);letter-spacing:.12em}
.ne-kpi b{font-size:calc(var(--u) * 40);display:block;margin:calc(var(--u) * 2) 0 calc(var(--u) * 10)}
.ne-kpi b i{font-style:normal;font-size:calc(var(--u) * 22);color:var(--s-dim)}
.ne-sp{width:100%;height:calc(var(--u) * 34)}
.ne-b{left:calc(var(--u) * 34);top:calc(var(--u) * 24)}`)

/* 블루프린트 — 설계 도면 (치수선 + 표제란) */
scenes['blueprint'] = {
  domain: 'CAD · 설계',
  html: `
  <svg class="bp-draw" viewBox="0 0 300 190">
    <rect class="part" x="60" y="46" width="150" height="96" rx="6"/>
    <circle class="part" cx="106" cy="94" r="20"/>
    <line class="dim" x1="60" y1="26" x2="210" y2="26"/>
    <line class="dim" x1="60" y1="20" x2="60" y2="32"/>
    <line class="dim" x1="210" y1="20" x2="210" y2="32"/>
    <text class="dtx" x="135" y="20" text-anchor="middle">240</text>
    <line class="dim" x1="236" y1="46" x2="236" y2="142"/>
    <line class="dim" x1="230" y1="46" x2="242" y2="46"/>
    <line class="dim" x1="230" y1="142" x2="242" y2="142"/>
    <text class="dtx" x="252" y="97">160</text>
  </svg>
  <div class="pv-kpi bp-title">
    <b>BRACKET-A24</b>
    <small>REV C · 1:50 · 2026-08</small>
  </div>
  <span class="badge bp-b">승인</span>`,
}
css.push(`
.bp-draw{position:absolute;left:calc(var(--u) * 44);top:calc(var(--u) * 30);z-index:2;
  width:calc(var(--u) * 300);height:calc(var(--u) * 190)}
.bp-draw .part{fill:color-mix(in srgb,var(--s-acc) 7%,transparent);
  stroke:var(--s-acc);stroke-width:1.8;vector-effect:non-scaling-stroke}
.bp-draw .dim{stroke:var(--s-dim);stroke-width:1;vector-effect:non-scaling-stroke}
.bp-draw .dtx{fill:var(--s-dim);font-size:11px;font-family:var(--s-font)}
.bp-title{right:calc(var(--u) * 30);bottom:calc(var(--u) * 28);z-index:3;
  padding:calc(var(--u) * 13) calc(var(--u) * 18);border:1.5px solid var(--s-line)}
.bp-title b{font-size:calc(var(--u) * 15);display:block;letter-spacing:.04em}
.bp-title small{font-size:calc(var(--u) * 11)}
.bp-b{left:calc(var(--u) * 34);bottom:calc(var(--u) * 28);transform:rotate(-6deg)}`)

/* OLED 보이드 — 뮤직 플레이어 */
scenes['oled-void'] = {
  domain: '미디어 · 음악',
  html: `
  <div class="pv-kpi ov-player">
    <i class="ov-art"></i>
    <div class="ov-meta">
      <b class="num">Midnight Drive</b>
      <small>Neon Cassette</small>
      <div class="ov-prog"><i></i></div>
      <div class="ov-time"><span>2:41</span><span>4:03</span></div>
    </div>
  </div>
  <div class="ov-ctl">
    <svg viewBox="0 0 24 24"><path d="M19 20 9 12l10-8v16ZM7 4H4v16h3V4Z"/></svg>
    <svg class="play" viewBox="0 0 24 24"><path d="M7 4.5v15L20 12 7 4.5Z"/></svg>
    <svg viewBox="0 0 24 24"><path d="m5 4 10 8-10 8V4Zm12 0h3v16h-3V4Z"/></svg>
  </div>
  <span class="badge ov-b">지금 재생 중</span>`,
}
css.push(`
.ov-player{left:calc(var(--u) * 46);top:calc(var(--u) * 44);z-index:3;
  width:calc(var(--u) * 320);padding:calc(var(--u) * 18);
  display:flex;gap:calc(var(--u) * 16);align-items:center}
.ov-art{width:calc(var(--u) * 84);height:calc(var(--u) * 84);flex:none;
  border-radius:calc(var(--u) * max(var(--s-r) - 4, 3));
  background:radial-gradient(circle at 30% 25%,
    color-mix(in srgb,var(--s-acc) 85%,#fff 10%),var(--s-acc) 55%,
    color-mix(in srgb,var(--s-acc) 45%,#000))}
.ov-meta{flex:1;min-width:0}
.ov-meta b{font-size:calc(var(--u) * 19);display:block}
.ov-meta small{font-size:calc(var(--u) * 12);display:block;margin:calc(var(--u) * 2) 0 calc(var(--u) * 12)}
.ov-prog{height:calc(var(--u) * 5);border-radius:999px;background:var(--s-line)}
.ov-prog i{display:block;width:66%;height:100%;border-radius:inherit;background:var(--s-acc)}
.ov-time{display:flex;justify-content:space-between;margin-top:calc(var(--u) * 5);
  font-size:calc(var(--u) * 10.5);color:var(--s-dim)}
.ov-ctl{position:absolute;left:50%;transform:translateX(-50%);bottom:calc(var(--u) * 26);
  z-index:3;display:flex;align-items:center;gap:calc(var(--u) * 22)}
.ov-ctl svg{width:calc(var(--u) * 20);height:calc(var(--u) * 20);fill:var(--s-dim)}
.ov-ctl .play{width:calc(var(--u) * 34);height:calc(var(--u) * 34);fill:var(--s-acc-fg);
  background:var(--s-acc);border-radius:50%;padding:calc(var(--u) * 8);box-sizing:border-box}
.ov-b{right:calc(var(--u) * 32);top:calc(var(--u) * 24)}`)

/* 잉크 크림 — 에디토리얼 아티클 */
scenes['ink-cream'] = {
  domain: '콘텐츠 · 에디토리얼',
  html: `
  <div class="ic-art">
    <small class="ic-kicker">에세이 · 8월호</small>
    <b class="num">계절의 감각을<br>기록하는 법</b>
    <p class="ic-dek">우리가 놓치는 것은 시간이 아니라,<br>시간의 질감이다.</p>
    <small class="ic-by"><i></i>박진우 · 7분</small>
  </div>
  <div class="ic-cover" aria-hidden="true">
    <svg viewBox="0 0 170 210" preserveAspectRatio="xMidYMid slice">
      <circle class="c-sun" cx="120" cy="62" r="17"/>
      <path class="c-h1" d="M0 120c22-14 44-10 66-22s46-20 70-4 22 10 34 6V210H0Z"/>
      <path class="c-h2" d="M0 150c26-12 50-4 78-16s50-8 92 6V210H0Z"/>
      <path class="c-h3" d="M0 178c40-8 76-2 112-10s40 0 58 4V210H0Z"/>
    </svg>
  </div>
  <span class="pv-btn ic-btn">이어서 읽기</span>`,
}
css.push(`
.ic-art{position:absolute;left:calc(var(--u) * 40);top:calc(var(--u) * 30);z-index:2;
  width:calc(var(--u) * 230)}
.ic-kicker{font-size:calc(var(--u) * 11);font-weight:600;display:inline-block;
  padding:calc(var(--u) * 3) calc(var(--u) * 9);border-radius:999px;
  background:var(--s-sur);box-shadow:inset 0 0 0 1px var(--s-line);margin-bottom:calc(var(--u) * 10)}
.ic-art b{font-size:calc(var(--u) * 32);display:block;line-height:1.2;
  font-family:var(--s-head-font);font-weight:var(--s-head-w);letter-spacing:var(--s-track)}
.ic-dek{margin:calc(var(--u) * 10) 0 calc(var(--u) * 10);font-size:calc(var(--u) * 12.5);
  line-height:1.55;color:var(--s-dim)}
.ic-by{font-size:calc(var(--u) * 11);display:flex;align-items:center;gap:calc(var(--u) * 6);color:var(--s-dim)}
.ic-by i{width:calc(var(--u) * 14);height:calc(var(--u) * 14);border-radius:50%;background:var(--s-acc)}
.ic-cover{position:absolute;right:calc(var(--u) * 32);top:calc(var(--u) * 32);z-index:1;
  width:calc(var(--u) * 170);height:calc(var(--u) * 210);overflow:hidden;
  border-radius:calc(var(--u) * var(--s-r) * 1.3);box-shadow:var(--s-sh);
  background:linear-gradient(180deg,color-mix(in srgb,var(--s-acc) 22%,var(--s-sur)),
    color-mix(in srgb,var(--s-acc) 8%,var(--s-bg)))}
.ic-cover svg{width:100%;height:100%;display:block}
.ic-cover .c-sun{fill:color-mix(in srgb,var(--s-acc) 60%,var(--s-sur))}
.ic-cover .c-h1{fill:color-mix(in srgb,var(--s-fg) 14%,color-mix(in srgb,var(--s-acc) 12%,var(--s-bg)))}
.ic-cover .c-h2{fill:color-mix(in srgb,var(--s-fg) 28%,color-mix(in srgb,var(--s-acc) 14%,var(--s-bg)))}
.ic-cover .c-h3{fill:color-mix(in srgb,var(--s-fg) 46%,color-mix(in srgb,var(--s-acc) 16%,var(--s-bg)))}
.ic-btn{left:calc(var(--u) * 40);bottom:calc(var(--u) * 26)}`)

/* 샌드 클레이 — 쇼핑몰 제품 카드 */
scenes['sand-clay'] = {
  domain: '커머스 · 리테일',
  html: `
  <div class="pv-kpi sc-prod">
    <i class="sc-img"><svg viewBox="0 0 48 48"><path d="M14 20c0-7 4.5-11 10-11s10 4 10 11c0 3-1 5-2 7 2 1.6 3 4 3 6.5C35 39 30.4 42 24 42s-11-3-11-8.5c0-2.5 1-4.9 3-6.5-1-2-2-4-2-7Z"/></svg></i>
    <b>세라믹 화병 no.4</b>
    <small class="sc-star">★★★★★ <em>4.9 (212)</em></small>
    <div class="sc-row"><b class="num">₩32,000</b><span class="sc-opts"><i></i><i></i><i></i></span></div>
  </div>
  <span class="badge sc-b">BEST</span>
  <span class="pv-btn sc-btn">장바구니 담기</span>`,
}
css.push(`
.sc-prod{left:calc(var(--u) * 62);top:calc(var(--u) * 30);z-index:3;
  width:calc(var(--u) * 216);padding:calc(var(--u) * 16)}
.sc-img{display:flex;align-items:center;justify-content:center;
  height:calc(var(--u) * 104);border-radius:calc(var(--u) * max(var(--s-r) - 4, 3));
  background:color-mix(in srgb,var(--s-acc) 16%,var(--s-bg));margin-bottom:calc(var(--u) * 12)}
.sc-img svg{width:calc(var(--u) * 52);height:calc(var(--u) * 52);
  fill:color-mix(in srgb,var(--s-acc) 75%,var(--s-fg) 10%)}
.sc-prod>b{font-size:calc(var(--u) * 15);display:block}
.sc-star{font-size:calc(var(--u) * 12);color:var(--s-acc);display:block;
  margin:calc(var(--u) * 3) 0 calc(var(--u) * 10)}
.sc-star em{font-style:normal;color:var(--s-dim)}
.sc-row{display:flex;align-items:center;justify-content:space-between}
.sc-row b{font-size:calc(var(--u) * 21)}
.sc-opts{display:flex;gap:calc(var(--u) * 5)}
.sc-opts i{width:calc(var(--u) * 13);height:calc(var(--u) * 13);border-radius:50%}
.sc-opts i:nth-child(1){background:var(--s-acc)}
.sc-opts i:nth-child(2){background:color-mix(in srgb,var(--s-acc) 45%,var(--s-bg))}
.sc-opts i:nth-child(3){background:var(--s-line);border:1px solid var(--s-dim)}
.sc-b{right:calc(var(--u) * 116);top:calc(var(--u) * 40);z-index:4;transform:rotate(4deg)}
.sc-btn{right:calc(var(--u) * 40);bottom:calc(var(--u) * 42)}`)

/* 딥 포레스트 — 자산관리 (잔고 + 카드) */
scenes['deep-forest'] = {
  domain: '금융 · 자산관리',
  html: `
  <div class="df-balance">
    <small>총 자산</small>
    <b class="num">₩128,400,000</b>
    <em>이번 분기 +4.2%</em>
  </div>
  <div class="pv-kpi df-card">
    <div class="df-chip"></div>
    <small>PRIVATE</small>
    <b>•••• 8841</b>
  </div>
  <svg class="spark df-sp" viewBox="0 0 210 46" preserveAspectRatio="none">
    <path class="fill" d="M0,36 L30,30 L60,33 L90,22 L120,26 L150,14 L180,18 L210,8 L210,46 L0,46 Z"/>
    <path d="M0,36 L30,30 L60,33 L90,22 L120,26 L150,14 L180,18 L210,8"/>
  </svg>`,
}
css.push(`
.df-balance{position:absolute;left:calc(var(--u) * 44);top:calc(var(--u) * 44);z-index:2}
.df-balance small{font-size:calc(var(--u) * 13);display:block;margin-bottom:calc(var(--u) * 4)}
.df-balance b{font-size:calc(var(--u) * 33);display:block}
.df-balance em{font-style:normal;font-size:calc(var(--u) * 13);color:var(--s-acc);
  display:block;margin-top:calc(var(--u) * 6)}
.df-card{right:calc(var(--u) * 36);top:calc(var(--u) * 36);z-index:3;
  width:calc(var(--u) * 158);height:calc(var(--u) * 98);
  padding:calc(var(--u) * 14) calc(var(--u) * 16);
  border:1px solid color-mix(in srgb,var(--s-acc) 55%,transparent);
  display:flex;flex-direction:column}
.df-chip{width:calc(var(--u) * 26);height:calc(var(--u) * 19);
  border-radius:calc(var(--u) * 4);background:var(--s-acc);opacity:.9}
.df-card small{font-size:calc(var(--u) * 9.5);letter-spacing:.2em;margin-top:auto}
.df-card b{font-size:calc(var(--u) * 14);letter-spacing:.1em}
.df-sp{position:absolute;left:calc(var(--u) * -10);bottom:calc(var(--u) * -6);z-index:1;
  width:calc(var(--u) * 300);height:calc(var(--u) * 84)}`)

/* 네이비 시그널 — 운영 칸반 */
scenes['navy-signal'] = {
  domain: '운영 · 작업관리',
  html: `
  <div class="pv-panel nv-col">
    <small>진행 중 · 3</small>
    <div class="nv-task"><i class="a1"></i><div><b>출고 검수 #482</b><span class="nv-line"></span></div></div>
    <div class="nv-task"><i class="a2"></i><div><b>재고 이관 요청</b><span class="nv-line short"></span></div></div>
  </div>
  <div class="pv-panel nv-col two">
    <small>완료 · 12</small>
    <div class="nv-task done"><i class="a3"></i><div><b>월간 정산 리포트</b><span class="nv-line short"></span></div></div>
  </div>
  <span class="badge nv-b warn">지연 1건</span>
  <span class="pv-btn nv-btn">작업 추가</span>`,
}
css.push(`
.nv-col{left:calc(var(--u) * 36);top:calc(var(--u) * 44);z-index:2;
  width:calc(var(--u) * 200);padding:calc(var(--u) * 13) calc(var(--u) * 14)}
.nv-col.two{left:calc(var(--u) * 252);top:calc(var(--u) * 76);z-index:1}
.nv-col>small{font-size:calc(var(--u) * 11.5);display:block;margin-bottom:calc(var(--u) * 9)}
.nv-task{display:flex;gap:calc(var(--u) * 9);align-items:flex-start;
  background:var(--s-bg);border:1px solid var(--s-line);
  border-radius:calc(var(--u) * max(var(--s-r) - 2, 2));
  padding:calc(var(--u) * 9) calc(var(--u) * 11);margin-bottom:calc(var(--u) * 7)}
.nv-task:last-child{margin-bottom:0}
.nv-task i{width:calc(var(--u) * 17);height:calc(var(--u) * 17);border-radius:50%;flex:none}
.nv-task .a1{background:var(--s-acc)}
.nv-task .a2{background:#7fb0e8}
.nv-task .a3{background:#5f9e7f}
.nv-task b{font-size:calc(var(--u) * 12.5);display:block;font-weight:560}
.nv-task.done b{text-decoration:line-through;color:var(--s-dim)}
.nv-line{display:block;height:calc(var(--u) * 5);width:calc(var(--u) * 96);
  background:var(--s-line);border-radius:999px;margin-top:calc(var(--u) * 5)}
.nv-line.short{width:calc(var(--u) * 64)}
.nv-b{right:calc(var(--u) * 36);top:calc(var(--u) * 26);color:var(--s-acc)}
.nv-btn{right:calc(var(--u) * 36);bottom:calc(var(--u) * 30)}`)

/* 민트 페이퍼 — 예약/헬스케어 */
scenes['mint-paper'] = {
  domain: '헬스케어 · 예약',
  html: `
  <div class="pv-kpi mp-cal">
    <small>8월 <em>· 검진 예약</em></small>
    <div class="mp-grid">
      <span>15</span><span>16</span><span class="on">17</span><span>18</span><span>19</span>
    </div>
    <div class="mp-slots">
      <span>10:30</span><span class="on">11:00</span><span>14:30</span>
    </div>
  </div>
  <span class="badge mp-b">잔여 3석</span>
  <span class="pv-btn mp-btn">예약 확정</span>`,
}
css.push(`
.mp-cal{left:calc(var(--u) * 74);top:calc(var(--u) * 42);z-index:3;
  width:calc(var(--u) * 256);padding:calc(var(--u) * 18) calc(var(--u) * 20)}
.mp-cal>small{font-size:calc(var(--u) * 14);color:var(--s-fg);font-weight:600;display:block}
.mp-cal>small em{font-style:normal;color:var(--s-dim);font-weight:400}
.mp-grid{display:flex;gap:calc(var(--u) * 7);margin:calc(var(--u) * 13) 0}
.mp-grid span{flex:1;text-align:center;font-size:calc(var(--u) * 13);
  padding:calc(var(--u) * 8) 0;border-radius:calc(var(--u) * max(var(--s-r) - 2, 2));
  color:var(--s-dim);background:color-mix(in srgb,var(--s-line) 45%,transparent)}
.mp-grid span.on{background:var(--s-acc);color:var(--s-acc-fg);font-weight:600}
.mp-slots{display:flex;gap:calc(var(--u) * 7)}
.mp-slots span{font-size:calc(var(--u) * 12);padding:calc(var(--u) * 5) calc(var(--u) * 12);
  border:1.5px solid var(--s-line);border-radius:999px;color:var(--s-dim)}
.mp-slots span.on{border-color:var(--s-acc);color:var(--s-acc);font-weight:600}
.mp-b{right:calc(var(--u) * 36);top:calc(var(--u) * 26)}
.mp-btn{right:calc(var(--u) * 74);bottom:calc(var(--u) * 34)}`)

scenes['indigo-class'] = {
  domain: '교육 · 클래스',
  html: `
  <div class="pv-panel edu-video">
    <span class="edu-play"><svg viewBox="0 0 24 24"><path d="M8 5.2v13.6L19 12 8 5.2Z"/></svg></span>
    <div class="edu-vbar"><i></i></div>
  </div>
  <div class="pv-kpi edu-curr">
    <small>챕터 4 <em>· 상태 관리</em></small>
    <ul>
      <li class="done"><i></i>01 훅으로 생각하기</li>
      <li class="done"><i></i>02 useState 패턴</li>
      <li class="on"><i></i>03 useReducer</li>
      <li><i></i>04 Context 설계</li>
    </ul>
  </div>
  <span class="badge edu-b">진도 38%</span>
  <span class="pv-btn edu-btn">이어보기</span>`,
}
css.push(`
.edu-video{left:calc(var(--u) * 26);top:calc(var(--u) * 30);
  width:calc(var(--u) * 248);height:calc(var(--u) * 152);
  background:color-mix(in srgb,var(--s-acc) 14%,var(--s-sur));
  display:flex;align-items:center;justify-content:center}
.edu-play{width:calc(var(--u) * 52);height:calc(var(--u) * 52);border-radius:50%;
  background:var(--s-acc);display:flex;align-items:center;justify-content:center;
  box-shadow:0 calc(var(--u) * 8) calc(var(--u) * 18) rgba(0,0,0,.18)}
.edu-play svg{width:calc(var(--u) * 22);height:calc(var(--u) * 22);fill:var(--s-acc-fg)}
.edu-vbar{position:absolute;left:calc(var(--u) * 16);right:calc(var(--u) * 16);
  bottom:calc(var(--u) * 14);height:calc(var(--u) * 5);border-radius:999px;
  background:color-mix(in srgb,var(--s-fg) 14%,transparent)}
.edu-vbar i{display:block;width:38%;height:100%;border-radius:999px;background:var(--s-acc)}

.edu-curr{left:calc(var(--u) * 202);top:calc(var(--u) * 94);z-index:3;
  width:calc(var(--u) * 252);padding:calc(var(--u) * 16) calc(var(--u) * 18)}
.edu-curr>small{font-size:calc(var(--u) * 13);color:var(--s-fg);font-weight:600;display:block}
.edu-curr>small em{font-style:normal;color:var(--s-dim);font-weight:400}
.edu-curr ul{list-style:none;margin:calc(var(--u) * 12) 0 0;padding:0;
  display:flex;flex-direction:column;gap:calc(var(--u) * 9)}
.edu-curr li{display:flex;align-items:center;gap:calc(var(--u) * 9);
  font-size:calc(var(--u) * 12.5);color:var(--s-dim)}
.edu-curr li i{width:calc(var(--u) * 15);height:calc(var(--u) * 15);border-radius:50%;flex:none;
  border:1.5px solid var(--s-line)}
/* 완료·진행·잠김을 색 하나로 칠하지 않는다 — 채움 / 테두리 / 딤으로 형태까지 다르게 */
.edu-curr li.done{color:var(--s-fg)}
.edu-curr li.done i{background:var(--s-acc);border-color:var(--s-acc)}
.edu-curr li.on{color:var(--s-acc);font-weight:600}
.edu-curr li.on i{border-color:var(--s-acc);border-width:calc(var(--u) * 4)}
.edu-b{right:calc(var(--u) * 30);top:calc(var(--u) * 24)}
.edu-btn{left:calc(var(--u) * 26);bottom:calc(var(--u) * 30)}`)

scenes['rose-lounge'] = {
  domain: '커뮤니티 · 소셜',
  html: `
  <div class="pv-panel rl-post">
    <div class="rl-by"><span class="rl-av">서</span><b>김서연</b><small>· 2시간 전</small></div>
    <div class="rl-t">원룸 6평, 수납만으로 바뀐 것들</div>
    <div class="rl-tags"><span>#자취</span><span>#수납</span></div>
    <div class="rl-meta"><em>♡ 128</em><em>댓글 24</em></div>
  </div>
  <div class="pv-kpi rl-reply">
    <div class="rl-by"><span class="rl-av c2">준</span><b>이준호</b></div>
    <p>선반 높이 몇으로 하셨나요? 저도 같은 평수인데 참고하고 싶어요.</p>
    <div class="rl-nest"><span class="rl-av c3">서</span><p>90cm요. 그 위는 손이 안 닿더라고요.</p></div>
  </div>
  <span class="badge rl-b">인기 글</span>
  <span class="pv-btn rl-btn">글쓰기</span>`,
}
css.push(`
.rl-post{left:calc(var(--u) * 26);top:calc(var(--u) * 28);
  width:calc(var(--u) * 248);padding:calc(var(--u) * 16) calc(var(--u) * 18)}
.rl-by{display:flex;align-items:center;gap:calc(var(--u) * 7);font-size:calc(var(--u) * 12)}
.rl-by b{font-weight:600}
.rl-by small{color:var(--s-dim)}
.rl-av{width:calc(var(--u) * 22);height:calc(var(--u) * 22);border-radius:50%;flex:none;
  display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;
  font-size:calc(var(--u) * 11);background:#cb2d62}
.rl-av.c2{background:#6a7cff}
.rl-av.c3{background:#3aa88a}
.rl-t{font-size:calc(var(--u) * 16);font-weight:600;line-height:1.35;
  margin:calc(var(--u) * 11) 0 calc(var(--u) * 10);letter-spacing:var(--s-track)}
.rl-tags{display:flex;gap:calc(var(--u) * 6)}
.rl-tags span{font-size:calc(var(--u) * 11);color:var(--s-acc);
  background:color-mix(in srgb,var(--s-acc) 12%,transparent);
  padding:calc(var(--u) * 3) calc(var(--u) * 10);border-radius:999px}
.rl-meta{display:flex;gap:calc(var(--u) * 14);margin-top:calc(var(--u) * 12);
  font-size:calc(var(--u) * 11.5);color:var(--s-dim)}
.rl-meta em{font-style:normal}

.rl-reply{left:calc(var(--u) * 196);top:calc(var(--u) * 130);z-index:3;
  width:calc(var(--u) * 258);padding:calc(var(--u) * 14) calc(var(--u) * 16)}
.rl-reply p{margin:calc(var(--u) * 8) 0 0;font-size:calc(var(--u) * 11.5);
  color:var(--s-dim);line-height:1.5}
/* 대댓글은 들여쓰기 + 왼쪽 선 — 커뮤니티에서 뎁스는 색이 아니라 형태로 읽힌다 */
.rl-nest{display:flex;gap:calc(var(--u) * 8);margin-top:calc(var(--u) * 11);
  padding-left:calc(var(--u) * 12);border-left:calc(var(--u) * 2) solid var(--s-line)}
.rl-nest p{margin:0;flex:1}
.rl-nest .rl-av{width:calc(var(--u) * 18);height:calc(var(--u) * 18);font-size:calc(var(--u) * 9)}
.rl-b{right:calc(var(--u) * 30);top:calc(var(--u) * 24)}
.rl-btn{left:calc(var(--u) * 26);bottom:calc(var(--u) * 30)}`)

scenes['civic-blue'] = {
  domain: '공공 · 기관',
  html: `
  <div class="pv-panel cv-search">
    <svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.6 15.6 5 5"/></svg>
    <span>어떤 민원을 찾으세요?</span>
  </div>
  <div class="pv-kpi cv-tiles">
    <small>자주 찾는 서비스</small>
    <div class="cv-grid">
      <span>주민등록<br>등본</span><span>건축물<br>대장</span>
      <span>지방세<br>납부</span><span>여권<br>재발급</span>
    </div>
  </div>
  <span class="badge cv-b">웹접근성 인증</span>
  <span class="pv-btn cv-btn">민원 신청</span>`,
}
css.push(`
.cv-search{left:calc(var(--u) * 30);top:calc(var(--u) * 34);
  width:calc(var(--u) * 300);display:flex;align-items:center;gap:calc(var(--u) * 12);
  padding:calc(var(--u) * 16) calc(var(--u) * 18);font-size:calc(var(--u) * 15);
  color:var(--s-dim)}
.cv-search svg{width:calc(var(--u) * 20);height:calc(var(--u) * 20);flex:none;
  fill:none;stroke:var(--s-acc);stroke-width:2.2;stroke-linecap:round}
.cv-tiles{left:calc(var(--u) * 168);top:calc(var(--u) * 112);z-index:3;
  width:calc(var(--u) * 282);padding:calc(var(--u) * 16) calc(var(--u) * 18)}
.cv-tiles>small{font-size:calc(var(--u) * 13);color:var(--s-fg);font-weight:700;display:block}
.cv-grid{display:grid;grid-template-columns:1fr 1fr;gap:calc(var(--u) * 8);
  margin-top:calc(var(--u) * 12)}
/* 라운드 없음 · 두꺼운 선 — 이 스킨의 정체성은 색이 아니라 규격이다 */
.cv-grid span{font-size:calc(var(--u) * 12.5);line-height:1.35;text-align:center;
  padding:calc(var(--u) * 11) calc(var(--u) * 6);border:2px solid var(--s-line);
  border-radius:calc(var(--u) * var(--s-r));color:var(--s-fg)}
.cv-b{right:calc(var(--u) * 30);top:calc(var(--u) * 24)}
.cv-btn{left:calc(var(--u) * 30);bottom:calc(var(--u) * 32)}`)

scenes['stark-mono'] = {
  domain: '브랜드 · 랜딩',
  html: `
  <div class="mn-kick">v2.0 — 지금 공개</div>
  <div class="mn-h num">디자인을<br>결정으로</div>
  <div class="mn-sub">보여주고, 고르고, 견적까지 한 번에.</div>
  <div class="pv-panel mn-logos"><span>ACME</span><span>NORTH</span><span>KITE</span><span>LOOP</span></div>
  <span class="badge mn-b">브랜드 랜딩</span>
  <span class="pv-btn mn-btn">시작하기</span>`,
}
css.push(`
.mn-kick{position:absolute;left:calc(var(--u) * 34);top:calc(var(--u) * 34);
  font-size:calc(var(--u) * 11);letter-spacing:.14em;color:var(--s-dim)}
/* 색이 없으니 크기 차이가 전부다 — 헤드라인은 과하다 싶을 만큼 키운다 */
.mn-h{position:absolute;left:calc(var(--u) * 34);top:calc(var(--u) * 62);
  font-size:calc(var(--u) * 62);line-height:.95;font-weight:800;
  letter-spacing:calc(var(--u) * -2.4)}
.mn-sub{position:absolute;left:calc(var(--u) * 34);top:calc(var(--u) * 198);
  font-size:calc(var(--u) * 14);color:var(--s-dim)}
.mn-logos{left:calc(var(--u) * 260);bottom:calc(var(--u) * 30);
  width:calc(var(--u) * 186);display:flex;flex-wrap:wrap;gap:calc(var(--u) * 10);
  padding:calc(var(--u) * 14) calc(var(--u) * 16)}
.mn-logos span{font-size:calc(var(--u) * 12);letter-spacing:.1em;color:var(--s-dim);
  width:calc(var(--u) * 70)}
.mn-b{right:calc(var(--u) * 30);top:calc(var(--u) * 26)}
.mn-btn{left:calc(var(--u) * 34);bottom:calc(var(--u) * 34)}`)

export const SCENES = scenes
export const SCENES_EXTRA_CSS = css.join('\n')
