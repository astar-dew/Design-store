#!/usr/bin/env node
// 스킨 전용 페이지 생성 — skins/<id>.html (10장)
//
// 초기화면 카드를 누르면 여기로 온다. 시트(모달)와 달리 이 페이지는 **만져볼 수 있다**:
// 버튼 hover/눌림/비활성, 입력 포커스, 토글, 세그먼트가 실제로 동작한다.
// 클라이언트에게 "이 느낌"을 확인시킬 때 정지 화면보다 훨씬 잘 통한다.
import { writeFileSync, mkdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import { REPO, loadRefs, esc, md } from './lib.mjs'
import { SKINS, skinCss, modeVars, PREVIEW_FULL_CSS, ICON_SPRITE } from '../patterns/skins.mjs'
import { LAYOUTS, LAYOUT_FOR, renderLayout, LAYOUTS_CSS, EXTRA_SPRITE } from '../patterns/layouts.mjs'
import { SKIN_TIER, darkRate } from '../patterns/pricing.mjs'
import { TOKENS_CSS } from './theme.mjs'
import { footer, FOOTER_CSS, MAIL_JS } from '../patterns/contact.mjs'
import {
  MOTION_BASE_CSS, MOTION_BASE_JS, motionCss, motionJs, motionInfo, checkMotion,
} from '../patterns/motion.mjs'

const refs = loadRefs()
const refsByStyle = id => refs.filter(r => [].concat(r.fm.style || []).includes(id))

const pct = r => `+${Math.round(r * 100)}%`
const swatches = (s, mode) => {
  const v = modeVars(s, mode)
  return [['배경', v.bg], ['표면', v.sur], ['액센트', v.acc], ['텍스트', v.fg]]
    .map(([l, c]) => `<div class="sw"><span style="background:${c}"></span><small>${esc(l)}</small></div>`).join('')
}

/* 상태 데모 — 전부 스킨 토큰(--s-*)으로만 그린다 */
const DEMO = `<section class="demo">
  <div class="demo-h"><h2>컴포넌트 상태</h2><p>마우스를 올리고, 눌러보고, 입력해보세요 — 호버·눌림·포커스·비활성이 실제로 동작합니다.</p></div>
  <div class="demo-grid">
    <div class="d-col"><h5>버튼</h5>
      <div class="d-row"><button class="db pri">주요 동작</button><button class="db pri" disabled>비활성</button></div>
      <div class="d-row"><button class="db ghost">보조 동작</button><button class="db ghost" disabled>비활성</button></div>
    </div>
    <div class="d-col"><h5>입력</h5>
      <input class="di" placeholder="이름을 입력하세요">
      <input class="di err" value="잘못된 값" aria-invalid="true">
      <input class="di" value="수정 불가" disabled>
    </div>
    <div class="d-col"><h5>토글 · 체크</h5>
      <label class="dt"><input type="checkbox" checked><i></i><span>알림 받기</span></label>
      <label class="dt"><input type="checkbox"><i></i><span>주간 리포트</span></label>
      <label class="dt"><input type="checkbox" disabled><i></i><span>비활성</span></label>
    </div>
    <div class="d-col"><h5>세그먼트 · 배지</h5>
      <div class="ds" role="group"><button class="on">30일</button><button>90일</button><button>1년</button></div>
      <div class="d-badges"><span class="dbg ok">완료</span><span class="dbg warn">주의</span><span class="dbg">기본</span></div>
      <a class="dl" href="#">텍스트 링크도 확인 ↗</a>
    </div>
  </div>
</section>`

const DEMO_CSS = `
.demo{background:var(--s-bg);color:var(--s-fg);font-family:var(--s-font);
  border-top:1px dashed var(--s-line);padding:26px 28px 30px}
.demo-h h2{margin:0 0 3px;font-size:15px;font-family:var(--s-head-font);
  font-weight:var(--s-head-w);letter-spacing:var(--s-track)}
.demo-h p{margin:0 0 20px;font-size:12.5px;color:var(--s-dim)}
.demo-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:26px}
.d-col h5{margin:0 0 12px;font-size:10.5px;color:var(--s-dim);letter-spacing:.08em;font-weight:600}
.d-row{display:flex;gap:8px;margin-bottom:9px}

.db{font:inherit;font-size:13px;font-weight:600;cursor:pointer;border:none;
  padding:9px 16px;border-radius:calc(var(--s-r) * 1px);
  transition:transform .08s,filter .12s,box-shadow .12s}
.db.pri{background:var(--s-acc);color:var(--s-acc-fg);box-shadow:var(--s-sh)}
.db.pri:hover{filter:brightness(1.09)}
.db.pri:active{transform:translateY(1px) scale(.985);filter:brightness(.94)}
.db.ghost{background:transparent;color:var(--s-fg);
  border:calc(var(--s-bw) * 1px) solid var(--s-line)}
.db.ghost:hover{border-color:var(--s-acc);color:var(--s-acc)}
.db.ghost:active{transform:translateY(1px)}
.db:disabled{opacity:.38;cursor:not-allowed;transform:none!important;filter:none!important}
.db:focus-visible,.di:focus-visible,.ds button:focus-visible{outline:2px solid var(--s-acc);outline-offset:2px}

.di{font:inherit;font-size:13px;display:block;width:100%;margin-bottom:9px;
  padding:9px 12px;border-radius:calc(var(--s-r) * 1px);color:var(--s-fg);
  background:var(--s-sur);border:calc(var(--s-bw) * 1px) solid var(--s-line);
  transition:border-color .12s,box-shadow .12s}
.di::placeholder{color:var(--s-dim)}
.di:hover:not(:disabled){border-color:var(--s-dim)}
.di:focus{outline:none;border-color:var(--s-acc);
  box-shadow:0 0 0 3px color-mix(in srgb,var(--s-acc) 22%,transparent)}
.di.err{border-color:#c4453a;box-shadow:0 0 0 3px rgba(196,69,58,.14)}
.di:disabled{opacity:.45;cursor:not-allowed}

.dt{display:flex;align-items:center;gap:10px;margin-bottom:11px;cursor:pointer;
  font-size:13px;-webkit-user-select:none;user-select:none}
.dt input{position:absolute;opacity:0;width:0;height:0}
.dt i{width:36px;height:20px;border-radius:999px;background:var(--s-line);
  position:relative;flex:none;transition:background .15s}
.dt i::after{content:"";position:absolute;left:2.5px;top:2.5px;width:15px;height:15px;
  border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.3);transition:left .15s}
.dt input:checked+i{background:var(--s-acc)}
.dt input:checked+i::after{left:18.5px}
.dt:hover i{filter:brightness(1.06)}
.dt:has(input:disabled){opacity:.4;cursor:not-allowed}
.dt input:focus-visible+i{outline:2px solid var(--s-acc);outline-offset:2px}

.ds{display:inline-flex;border:calc(var(--s-bw) * 1px) solid var(--s-line);
  border-radius:calc(var(--s-r) * 1px);overflow:hidden;margin-bottom:13px}
.ds button{font:inherit;font-size:12px;border:none;background:transparent;cursor:pointer;
  padding:6px 14px;color:var(--s-dim);transition:background .12s}
.ds button:hover{color:var(--s-fg)}
.ds button.on{background:var(--s-nav-on);color:var(--s-nav-on-fg)}
.d-badges{display:flex;gap:6px;margin-bottom:13px}
.dbg{font-size:11.5px;padding:3px 11px;border-radius:999px;border:1.5px solid currentColor;color:var(--s-dim)}
.dbg.ok{color:var(--s-acc)}
.dbg.warn{color:var(--fv-warn,#b0700e)}
.dl{font-size:12.5px;color:var(--s-acc);text-decoration:none;border-bottom:1px solid transparent}
.dl:hover{border-bottom-color:currentColor}

/* 풀 목업에 호버 반응 부여 — 페이지에서는 목업도 살아 있어야 한다 */
.fv-nav,.fv-btn,.fv-link,.fv-seg span,.fv-tb tbody tr{cursor:pointer;transition:background .12s,filter .12s}
.fv-nav:not(.is-on):hover{background:color-mix(in srgb,var(--s-nav-on) 55%,transparent);color:var(--s-fg)}
.fv-nav:focus-visible,.lay-tab:focus-visible{outline:2px solid var(--s-acc);outline-offset:-2px}
.lay-tab:not(.on):hover{color:var(--s-fg)}
.fv-btn:hover{filter:brightness(1.08)}
.fv-btn:active{transform:translateY(1px)}
.fv-tb tbody tr:hover td{background:color-mix(in srgb,var(--s-nav-on) 40%,transparent)}
.fv-seg span:not(.on):hover{color:var(--s-fg)}
.fv-link:hover{text-decoration:underline}
`

// 모션 매핑이 빠졌거나 시그니처 대상이 레이아웃에서 사라졌으면 여기서 멈춘다
const motionProblems = checkMotion(SKINS, LAYOUT_FOR, renderLayout)
if (motionProblems.length) throw new Error('모션 매핑 오류\n  ' + motionProblems.join('\n  '))

mkdirSync(join(REPO, 'skins'), { recursive: true })

for (const s of SKINS) {
  const layKey = LAYOUT_FOR[s.id]
  if (!layKey) throw new Error(`레이아웃 매핑 없음: ${s.id} — patterns/layouts.mjs`)
  const tier = SKIN_TIER[s.id] ?? { factor: 1, why: '' }
  const bench = s.bench ? `<dt>실존 사례</dt><dd class="bench">${s.bench.map(([n, url, why]) =>
    `<a href="${esc(url)}" target="_blank" rel="noopener"><b>${esc(n)}</b> — ${esc(why)}</a>`).join('')}</dd>` : ''

  const mine = refsByStyle(s.id)
  const refBlock = mine.length ? `
  <section class="myrefs">
    <div class="myrefs-h"><h2>내 레퍼런스 <b>${mine.length}</b></h2>
      <p>이 스킨으로 태그한 실제 화면입니다. 외주 브리프에는 <code>가져오지 말 것</code>이 그대로 들어갑니다.</p></div>
    <div class="myrefs-grid">
      ${mine.map(r => `<article class="myref">
        ${r.images[0] ? `<div class="myref-t"><img loading="lazy"
          src="${relative(join(REPO, 'skins'), join(r.dir, r.images[0]))}" alt=""></div>` : ''}
        <div class="myref-b">
          <h3>${esc(r.fm.product || r.slug)}</h3>
          <p>${esc((r.why || '').split('\n')[0])}</p>
          ${r.dontTake ? `<div class="myref-no"><h4>가져오지 말 것</h4>${md(r.dontTake)}</div>` : ''}
          <div class="myref-f"><code>${esc(r.slug)}</code>
            ${r.fm.source ? `<a href="${esc(r.fm.source)}" target="_blank" rel="noopener">원본 ↗</a>` : ''}</div>
        </div>
      </article>`).join('')}
    </div>
  </section>` : ''

  const stage = renderLayout(layKey)
  const viewN = (stage.match(/class="fv-view"/g) || []).length
  const navWord = LAYOUTS[layKey].chrome === 'sidebar' ? '왼쪽 사이드바' : '상단 메뉴'
  const mi = motionInfo(s.id)

  const html = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(s.name)} — A-Dew, design-store</title>
<style>
${TOKENS_CSS}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);
  font:15px/1.6 ui-sans-serif,-apple-system,"Pretendard","Apple SD Gothic Neo",system-ui,sans-serif;
  -webkit-font-smoothing:antialiased}
.wrap{max-width:1240px;margin:0 auto;padding:22px 24px 90px}
/* 사이트 헤더 — 초기화면과 같은 브랜드. 스킨 이름이 이 페이지의 h1 이라 브랜드는 링크로만 둔다 */
.site{border-bottom:1px solid var(--line)}
.site-in{max-width:1240px;margin:0 auto;padding:20px 24px 16px}
.brand{display:inline-flex;align-items:baseline;gap:10px;color:var(--fg);text-decoration:none}
.brand b{font-size:19px;letter-spacing:-.015em}
.brand span{font-size:13px;color:var(--dim)}
.brand:hover b{color:var(--accent)}
.brand:focus-visible{outline:2px solid var(--accent);outline-offset:4px;border-radius:4px}
.top{display:flex;align-items:center;gap:14px;margin-bottom:20px}
.back{font-size:13.5px;color:var(--dim);text-decoration:none;padding:7px 13px;
  border:1px solid var(--line);border-radius:8px;flex:none}
.back:hover{color:var(--fg);border-color:var(--dim)}
.top h1{font-size:19px;margin:0;letter-spacing:-.015em}
.dom{font-size:11.5px;color:var(--dim);background:var(--chip);padding:3px 9px;border-radius:999px}
.top code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11.5px;
  color:var(--dim);background:var(--chip);padding:2px 7px;border-radius:5px}
.mode-switch{margin-left:auto;display:flex;border:1px solid var(--line);border-radius:8px;overflow:hidden}
.mode-switch button{font:inherit;font-size:12.5px;background:none;border:none;cursor:pointer;
  padding:7px 15px;color:var(--dim)}
.mode-switch button[aria-selected="true"]{background:var(--fg);color:var(--bg)}
.stage-hint{margin:0 0 10px;font-size:12.5px;color:var(--dim)}
.stage-hint b{color:var(--fg);font-weight:560}
.stage-hint .narrow{display:none}
.m-replay{font:inherit;font-size:12px;margin-left:8px;padding:2px 10px;border:1px solid var(--line);
  border-radius:999px;background:var(--panel);color:var(--dim);cursor:pointer;vertical-align:1px}
.m-replay:hover{color:var(--fg);border-color:var(--dim)}
.m-replay:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.stage-wrap{border:1px solid var(--line);border-radius:14px;overflow:hidden;box-shadow:var(--shadow)}
/* 목업은 축소 대상이 아니라 도면에 가깝다.
   폭에 맞춰 줄이면 본문이 5px가 되어 아무것도 안 읽힌다 —
   좁은 화면에서는 최소 폭을 지키고 가로로 밀어서 본다. */
.stage-scroll{overflow-x:auto;overscroll-behavior-x:contain;-webkit-overflow-scrolling:touch}
.stage-scroll:focus-visible{outline:2px solid var(--accent);outline-offset:-2px}
.info{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:34px;margin-top:30px}
.info dl{margin:0;display:grid;grid-template-columns:72px 1fr;gap:7px 12px;font-size:13.5px;line-height:1.6}
.info dt{color:var(--dim);font-size:11px;letter-spacing:.04em;padding-top:2px}
.info dd{margin:0}
.info dd.w,.info dt.w{color:var(--warn)}
.bench a{display:block;color:var(--fg);text-decoration:none;padding:2px 0}
.bench a:hover{color:var(--accent)}
.pair h5{margin:0 0 8px;font-size:10.5px;color:var(--dim);letter-spacing:.05em;font-weight:600}
.pair>div{margin-bottom:16px}
.sws{display:flex;gap:8px}
.sw{display:flex;flex-direction:column;gap:5px;align-items:center}
.sw span{width:36px;height:36px;border-radius:8px;border:1px solid var(--line);display:block}
.sw small{font-size:10px;color:var(--dim)}
.tokens{display:flex;flex-wrap:wrap;gap:5px}
.tokens span{font-size:11px;background:var(--chip);color:var(--dim);padding:3px 8px;border-radius:5px;
  font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
/* 내 레퍼런스 — bench(외부 제품)는 '남의 사례', 이건 '내가 실제로 보고 저장한 것' */
.myrefs{margin-top:36px;padding-top:26px;border-top:1px solid var(--line)}
.myrefs-h h2{font-size:17px;margin:0 0 3px;letter-spacing:-.015em}
.myrefs-h h2 b{font-weight:500;font-size:13px;color:var(--dim)}
.myrefs-h p{margin:0 0 18px;font-size:13px;color:var(--dim)}
.myrefs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:18px}
.myref{border:1px solid var(--line);border-radius:12px;overflow:hidden;background:var(--panel)}
.myref-t{aspect-ratio:16/10;background:var(--chip);overflow:hidden}
.myref-t img{width:100%;height:100%;object-fit:cover;object-position:top center;display:block}
.myref-b{padding:13px 15px 14px}
.myref-b h3{font-size:14.5px;margin:0 0 5px}
.myref-b p{font-size:12.5px;color:var(--dim);margin:0 0 10px;line-height:1.55}
.myref-no{border-left:2px solid var(--danger);padding-left:10px;margin-bottom:10px}
.myref-no h4{margin:0 0 3px;font-size:10.5px;color:var(--danger);letter-spacing:.04em}
.myref-no p,.myref-no li{font-size:12px;color:var(--dim);margin:0;line-height:1.55}
.myref-no ul{margin:0;padding-left:15px}
.myref-f{display:flex;align-items:center;justify-content:space-between;gap:8px;
  padding-top:9px;border-top:1px solid var(--line);font-size:11.5px}
.myref-f code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--dim)}
.myref-f a{color:var(--accent);text-decoration:none}
.myref-f a:hover{text-decoration:underline}
${PREVIEW_FULL_CSS}
${LAYOUTS_CSS}
${skinCss(s)}
${MOTION_BASE_CSS}
${motionCss(s.id)}
${DEMO_CSS}
${FOOTER_CSS}
@media (max-width:900px){.info{grid-template-columns:1fr}.demo-grid{grid-template-columns:1fr 1fr}}
@media (max-width:720px){
  .wrap{padding:16px 16px 60px}
  .site-in{padding:16px 16px 12px}
  .brand span{display:none}   /* 좁으면 부제는 뺀다 — 브랜드가 두 줄로 쪼개지는 것보다 낫다 */
  /* 헤더가 한 줄에 다 못 들어가면 줄바꿈한다 — 안 그러면 제목이 글자 단위로 쪼개지고
     오른쪽 끝의 모드 스위치가 화면 밖으로 잘린다 */
  .top{flex-wrap:wrap;gap:8px 10px}
  .top h1{font-size:17px;flex:none}
  .back,.dom,.top code{flex:none}
  .mode-switch{margin-left:auto}
  .demo-grid{grid-template-columns:1fr;gap:20px}
  .demo{padding:20px 18px 24px}
  .stage-scroll .fv-wrap{width:760px}   /* 3:2 유지 · --v 는 760/960 = 0.79배까지만 */
  .stage-hint .narrow{display:inline}
}
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{transition-duration:.01ms!important;animation-duration:.01ms!important}
}
</style></head><body>
${ICON_SPRITE}${EXTRA_SPRITE}
<header class="site">
  <div class="site-in"><a class="brand" href="../index.html" aria-label="A-Dew, design-store — 메인으로"
    ><b>A-Dew, design-store</b><span>디자인 레퍼런스 저장소</span></a></div>
</header>
<div class="wrap">
  <div class="top">
    <a class="back" href="../index.html#design">← 디자인 탭</a>
    <h1>${esc(s.name)}</h1><code>${esc(s.id)}</code><span class="dom">${esc(LAYOUTS[layKey].domain)}</span>
    <div class="mode-switch" role="group" aria-label="모드">
      <button type="button" data-mode="light" aria-selected="${s.base === 'light'}">라이트</button>
      <button type="button" data-mode="dark" aria-selected="${s.base === 'dark'}">다크</button>
    </div>
  </div>

  <p class="stage-hint"><b>${navWord}</b>를 눌러보세요 — 이 분야의 화면 ${viewN}종이 실제로 전환됩니다.
    아래 컴포넌트는 호버·눌림·포커스·비활성이 동작합니다.
    <span class="narrow">목업은 <b>가로로 밀어서</b> 보세요.</span>
    ${mi.still ? '' : '<button type="button" class="m-replay" id="m-replay">▶ 다시 보기</button>'}</p>

  <div class="stage-wrap sk-${s.id} mode-${s.base}" id="root">
    <div class="stage-scroll" tabindex="0" role="region"
         aria-label="${esc(LAYOUTS[layKey].domain)} 화면 목업 — 좁은 화면에서는 가로로 스크롤됩니다">
      <div class="fv-wrap">${stage}</div>
    </div>
    ${DEMO}
  </div>

  <div class="info">
    <dl>
      <dt>계보</dt><dd>${esc(s.lineage)}</dd>
      ${bench}
      <dt>어울리는 곳</dt><dd>${esc(s.fits)}</dd>
      <dt>모션</dt><dd>${esc(mi.persona)} · 강도 ${esc(mi.levelLabel)} — <b>${esc(mi.sigName)}</b>: ${esc(mi.desc)}</dd>
      <dt class="w">주의</dt><dd class="w">${esc(s.watch)}</dd>
      <dt>단가 계수</dt><dd>×${tier.factor.toFixed(2)} — ${esc(tier.why)}</dd>
      <dt>다크 추가</dt><dd>${pct(darkRate(s.id))} · 라이트/다크 쌍으로 제공</dd>
    </dl>
    <div class="pair">
      <div><h5>라이트 팔레트</h5><div class="sws">${swatches(s, 'light')}</div></div>
      <div><h5>다크 팔레트</h5><div class="sws">${swatches(s, 'dark')}</div></div>
      <div><h5>토큰</h5><div class="tokens">
        <span>radius ${esc(s.vars.r)}px</span><span>${esc(s.vars.font.split(',')[0])}</span>
        <span>weight ${esc(s.vars.headWeight)}</span><span>border ${esc(s.vars.bw)}px</span>
      </div></div>
    </div>
  </div>
  ${refBlock}
  ${footer('../')}
</div>
<script>
/* ── 화면 · 모드를 URL 에 싣는다 ───────────────────────────────
   외주에서 "이 스킨 봐주세요"보다 "이 스킨의 주문 목록을 다크로 봐주세요"가 훨씬 잘 통한다.
     #orders        주문 목록 (스킨 기본 모드)
     #orders/dark   주문 목록 · 다크
     #/dark         기본 화면 · 다크
   뒤로가기로 직전 화면으로 돌아온다.                                */
${MAIL_JS}

const root = document.getElementById('root')
const fv = document.querySelector('.fv')
const views = [...fv.querySelectorAll('.fv-view')]
const navs = [...fv.querySelectorAll('button.fv-nav, button.lay-tab')]
const crumb = fv.querySelector('.fv-crumb')
const modeBtns = [...document.querySelectorAll('.mode-switch button')]

const HOME = (views.find(v => !v.hidden) || views[0]).dataset.v
const BASE = root.classList.contains('mode-dark') ? 'dark' : 'light'
let cur = { view: HOME, mode: BASE }

const hashOf = st =>
  (st.view === HOME ? '' : st.view) + (st.mode === BASE ? '' : '/' + st.mode)

function parseHash(){
  const [v, m] = location.hash.slice(1).split('/')
  return {
    view: views.some(x => x.dataset.v === v) ? v : HOME,
    mode: (m === 'dark' || m === 'light') ? m : BASE,
  }
}

function render(st){
  for (const v of views) v.hidden = v.dataset.v !== st.view
  for (const n of navs) {
    const on = n.dataset.v === st.view
    n.classList.toggle('is-on', on && n.classList.contains('fv-nav'))
    n.classList.toggle('on', on && n.classList.contains('lay-tab'))
    if (on) n.setAttribute('aria-current', 'page'); else n.removeAttribute('aria-current')
  }
  const c = views.find(v => v.dataset.v === st.view)?.dataset.crumb
  if (crumb && c) { const [a, b] = c.split('|'); crumb.innerHTML = a + ' <i>/</i> <b>' + b + '</b>' }
  fv.querySelector('.fv-main').scrollTop = 0

  root.classList.toggle('mode-dark', st.mode === 'dark')
  root.classList.toggle('mode-light', st.mode === 'light')
  modeBtns.forEach(b => b.setAttribute('aria-selected', b.dataset.mode === st.mode))
  cur = st
  // 화면이 바뀔 때만 등장을 다시 튼다 — 라이트/다크 전환까지 재생하면 비교가 방해된다
  if (st.view !== lastView) { lastView = st.view; play() }
}

function go(st){
  const h = hashOf(st)
  // 해시가 바뀌면 hashchange 가 render 를 부른다. 같으면 직접 그린다.
  if (h === location.hash.slice(1)) render(st)
  else location.hash = h
}

/* ── 모션 — .fv 에 m-play 를 붙였다 떼서 등장과 시그니처를 다시 튼다 ── */
${MOTION_BASE_JS}
${motionJs(s.id)}
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
let lastView = null
function play(){
  fv.classList.remove('m-play')
  void fv.offsetWidth           // 클래스를 떼고 바로 붙이면 브라우저가 재생을 건너뛴다
  fv.classList.add('m-play')
  M_PLAY(fv, reduced)
}
M_INIT(fv)
// 반복 애니메이션(펄스)은 화면 밖에서 멈춘다
new IntersectionObserver(([e]) => fv.classList.toggle('m-off', !e.isIntersecting)).observe(fv)
document.getElementById('m-replay')?.addEventListener('click', play)

window.addEventListener('hashchange', () => render(parseHash()))
navs.forEach(n => n.addEventListener('click', () => go({ view: n.dataset.v, mode: cur.mode })))
modeBtns.forEach(b => b.addEventListener('click', () => go({ view: cur.view, mode: b.dataset.mode })))
render(parseHash())

// 세그먼트 — 눌러서 전환되는 걸 보여준다
document.querySelectorAll('.ds').forEach(g => g.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return
  g.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b))
}))
// 데모 링크는 이동하지 않음
document.querySelectorAll('.dl').forEach(a => a.addEventListener('click', e => e.preventDefault()))
</script>
</body></html>`

  writeFileSync(join(REPO, 'skins', `${s.id}.html`), html)
}

const totalViews = SKINS.reduce((n, sk) =>
  n + (renderLayout(LAYOUT_FOR[sk.id]).match(/class="fv-view"/g) || []).length, 0)
console.log(`✓ skins/*.html  (${SKINS.length}장 · 전환 화면 ${totalViews}종 — 호버·상태 데모 포함)`)
