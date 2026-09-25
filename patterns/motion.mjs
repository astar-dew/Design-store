// 모션 정의 — 스킨마다 색·타이포가 다르듯 움직임도 다르다.
//
// 성격(PERSONAS) 5종이 지속시간·가속·등장 방식을 정하고, 스킨마다 시그니처(SIGNATURES) 1개를 더한다.
// 스킨 → 성격·시그니처는 MOTION_FOR. skins.mjs 가 이미 커서 SCENES · LAYOUT_FOR 처럼 따로 둔다.
// 설계: docs/superpowers/specs/2026-09-25-motion-design.md
//
// 재생: 스킨 페이지는 .fv 에 .m-play 를 붙였다 떼서 등장·시그니처를 다시 튼다.
// 시그니처 CSS 는 scopeCss 로 .sk-<id> 아래에 들어간다 — scopeCss 는 '}' 로 쪼개므로
// @keyframes · @media 는 MOTION_BASE_CSS 에만 쓴다.
// 시그니처 JS 는 문자열로 페이지에 박힌다. `${` 를 쓰면 모듈 로드 때 치환되니 문자열 연결을 쓸 것.
import { scopeCss } from './skins.mjs'

export const PERSONAS = {
  restrained: { name: '절제', level: 'calm', dur: '140ms', ease: 'cubic-bezier(.2,0,0,1)', enter: 'm-fade', enterDur: '240ms' },
  precise: { name: '정밀', level: 'mid', dur: '120ms', ease: 'linear', enter: 'm-wipe', enterDur: '360ms' },
  glow: { name: '발광', level: 'mid', dur: '320ms', ease: 'ease-out', enter: 'm-light', enterDur: '600ms' },
  weighty: { name: '무게감', level: 'mid', dur: '420ms', ease: 'cubic-bezier(.16,1,.3,1)', enter: 'm-rise', enterDur: '560ms' },
  soft: { name: '탄성', level: 'lively', dur: '360ms', ease: 'cubic-bezier(.34,1.56,.64,1)', enter: 'm-pop', enterDur: '420ms' },
}

// 카드 배지 · "깔끔한 모션만" 필터가 쓰는 강도. 톤 배지처럼 글자로 말한다.
export const MOTION_LEVELS = { calm: '절제', mid: '보통', lively: '활발' }

// targets: 이 시그니처가 걸리는 클래스. 스킨 레이아웃에 하나도 없으면 빌드가 실패한다 (checkMotion).
// play: 재생할 때마다 (fv, reduced) 로 실행. init: 페이지당 한 번 (fv) 로 실행.
export const SIGNATURES = {
  'accent-underline': {
    name: '액센트 밑줄', desc: '링크에 올리면 코발트 밑줄이 왼쪽부터 그어진다',
    targets: ['fv-link'],
    css: `.fv-link,.dl{text-decoration:none;border-bottom-color:transparent;
  background:linear-gradient(var(--s-acc),var(--s-acc)) 0 100%/0 1.5px no-repeat;
  transition:background-size calc(var(--m-dur) * 2) var(--m-ease)}
.fv-link:hover,.dl:hover{text-decoration:none;border-bottom-color:transparent;background-size:100% 1.5px}`,
  },
  'headline-reveal': {
    name: '헤드라인 드러남', desc: '헤드라인이 가림막 뒤에서 올라오고, 버튼은 올리면 흑백이 뒤집힌다',
    targets: ['mono-h'],
    css: `.m-play .mono-h{animation:m-reveal 520ms var(--m-ease) both}
.fv-btn,.db.pri{transition:background-color var(--m-dur),color var(--m-dur),box-shadow var(--m-dur)}
.fv-btn:hover,.db.pri:hover:not(:disabled){filter:none;background:var(--s-bg);color:var(--s-fg);
  box-shadow:inset 0 0 0 2px var(--s-fg)}`,
  },
  'cover-focus': {
    name: '커버 포커스', desc: '커버가 살짝 크고 흐린 상태에서 제자리로 선명해진다. 본문을 내리면 목차의 읽기 진도가 따라 찬다',
    targets: ['lay-hero'],
    css: `.m-play .lay-hero svg{animation:m-focus 900ms var(--m-ease) both}`,
    // 진도 바는 transform 으로만 늘린다 — width 를 바꾸면 스크롤마다 레이아웃을 다시 잰다
    init: `const art = fv.querySelector('.lay-art article'), bar = fv.querySelector('.lay-read i')
if (!art || !bar) return
art.addEventListener('scroll', () => {
  const max = art.scrollHeight - art.clientHeight
  bar.style.transform = 'scaleX(' + (max > 0 ? Math.max(.18, art.scrollTop / max) : 1) + ')'
}, { passive: true })`,
  },
  'focus-ring': {
    name: '굵은 포커스 링', desc: '움직이지 않는다. 키보드 포커스만 두껍고 분명하게 — 안 움직이는 게 콘셉트',
    targets: ['lay-tab'],
    css: `.lay-tab:focus-visible,.db:focus-visible,.di:focus-visible,.ds button:focus-visible,.dt input:focus-visible + i{
  outline:3px solid var(--s-fg);outline-offset:2px;box-shadow:0 0 0 8px var(--s-acc)}`,
  },
  'block-fill': {
    name: '블록 채움', desc: '보조 버튼에 올리면 노랑 블록이 옆에서 네 번 끊겨 밀려 들어온다',
    targets: ['fv-btn'],
    css: `.fv-btn.ghost,.db.ghost{position:relative;z-index:0;overflow:hidden}
.fv-btn.ghost::before,.db.ghost::before{content:'';position:absolute;inset:0;z-index:-1;background:var(--s-acc);
  transform:translateX(-101%);transition:transform var(--m-dur) steps(4,end)}
.fv-btn.ghost:hover::before,.db.ghost:hover:not(:disabled)::before{transform:none}
.fv-btn.ghost:hover,.db.ghost:hover:not(:disabled){color:var(--s-acc-fg);border-color:var(--s-acc)}`,
  },
  'line-draw': {
    name: '도면 그리기', desc: '부품 윤곽이 일정한 속도로 그려지고, 도면 위에서는 커서 좌표가 표시된다',
    targets: ['lay-cad'],
    css: `.lay-canvas{position:relative}
.m-play .lay-canvas .part{stroke-dasharray:1000;animation:m-stroke 1400ms linear both}
.m-xy{position:absolute;right:10px;bottom:8px;font:11px/1 ui-monospace,SFMono-Regular,Menlo,monospace;
  color:var(--s-dim);pointer-events:none;font-variant-numeric:tabular-nums}`,
    init: `const cv = fv.querySelector('.lay-canvas'); if (!cv) return
const svg = cv.querySelector('svg'), vb = svg.viewBox.baseVal
const xy = document.createElement('span'); xy.className = 'm-xy'; xy.setAttribute('aria-hidden', 'true'); cv.append(xy)
svg.addEventListener('mousemove', e => {
  const r = svg.getBoundingClientRect()
  xy.textContent = 'X ' + Math.round((e.clientX - r.left) / r.width * vb.width)
    + '  Y ' + Math.round((e.clientY - r.top) / r.height * vb.height)
})
svg.addEventListener('mouseleave', () => { xy.textContent = '' })`,
  },
  'count-up': {
    name: '카운트업', desc: '수치가 0부터 올라오고 차트 선이 그려진다',
    targets: ['fv-kpi', 'fv-line'],
    css: `.m-play .fv-line{stroke-dasharray:1000;animation:m-stroke 1400ms linear both}`,
    // 원문은 dataset.mFinal 에 보관한다 — 도중에 다시 재생해도 중간값을 원문으로 착각하지 않게.
    // 이전 루프는 mRun 이 바뀌면 멈춘다.
    play: `if (reduced) return
for (const b of fv.querySelectorAll('.fv-view:not([hidden]) .fv-kpi b')) {
  const txt = b.dataset.mFinal || (b.dataset.mFinal = b.textContent)
  const t0 = performance.now(), run = String(t0)
  b.dataset.mRun = run
  const step = now => {
    if (b.dataset.mRun !== run) return
    const p = Math.min(1, (now - t0) / 700)
    b.textContent = countText(txt, p)
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}`,
  },
  'glow': {
    name: '글로우', desc: '카드에 올리면 액센트 빛이 은은하게 번진다. 재생 바는 늘 살짝 빛난다',
    targets: ['fv-card', 'lay-prog'],
    css: `.fv-card{transition:box-shadow var(--m-dur) var(--m-ease)}
.fv-card:hover{box-shadow:0 0 0 1px color-mix(in srgb,var(--s-acc) 35%,transparent),
  0 0 28px -6px color-mix(in srgb,var(--s-acc) 50%,transparent)}
.lay-prog i{box-shadow:0 0 10px color-mix(in srgb,var(--s-acc) 70%,transparent)}`,
  },
  'signal-pulse': {
    name: '시그널 펄스', desc: '메뉴의 숫자 배지 하나만 맥박처럼 퍼진다',
    targets: ['fv-cnt'],
    // 선택된 메뉴에 걸면 첫 화면(운영 보드)엔 배지가 없어 아무것도 안 보인다. 칸반 레이아웃에 배지는 하나뿐이다.
    css: `.fv-cnt{animation:m-pulse 2.2s ease-out infinite}`,
  },
  'gold-sheen': {
    name: '골드 광택', desc: '총 자산 카드에 금빛 광택이 한 번 스친다',
    targets: ['lay-total'],
    css: `.lay-total{position:relative;overflow:hidden}
.m-play .lay-total::after{content:'';position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(100deg,transparent 35%,color-mix(in srgb,var(--s-acc) 28%,transparent) 50%,transparent 65%);
  animation:m-sheen 1200ms var(--m-ease) 350ms both}`,
  },
  'stamp': {
    name: '도장 찍힘', desc: 'NEW·할인 도장이 크게 들렸다가 종이에 쿵 찍힌다. 담기 버튼은 누르면 한 단 내려앉는다',
    targets: ['lay-new'],
    css: `.m-play .lay-new,.m-play .lay-off{animation:m-stamp 520ms cubic-bezier(.2,.8,.2,1) 380ms both}
.lay-cart{transition:transform var(--m-dur) var(--m-ease),background-color var(--m-dur),color var(--m-dur)}
.lay-cart:active{transform:translateY(2px)}`,
  },
  'float': {
    name: '떠오름', desc: '카드에 올리면 가볍게 떠오른다',
    targets: ['fv-card'],
    css: `.fv-card{transition:transform var(--m-dur) var(--m-ease),box-shadow var(--m-dur) var(--m-ease)}
.fv-card:hover{transform:translateY(-3px);box-shadow:0 12px 24px -14px rgba(10,60,50,.28)}`,
  },
  'progress-fill': {
    name: '진도 채움', desc: '진도 바가 차오르고 완료한 강의의 점이 톡 튀어나온다',
    targets: ['fv-bar', 'lms-dot'],
    css: `.m-play .fv-bar i{transform-origin:left;animation:m-grow 900ms var(--m-ease) 150ms both}
.m-play .lms-lesson.done .lms-dot{animation:m-pop-in 360ms var(--m-ease) 500ms both}`,
  },
  'bump': {
    name: '추천 팝', desc: '추천 화살표를 누르면 튕기며 켜지고 숫자가 1 오른다',
    targets: ['rl-up'],
    css: `.rl-up{cursor:pointer;display:inline-flex;transition:transform var(--m-dur) var(--m-ease),color var(--m-dur)}
.rl-up:hover{transform:scale(1.12)}
.rl-up.m-on{color:var(--s-acc);animation:m-bump 360ms var(--m-ease)}`,
    init: `fv.addEventListener('click', e => {
  const up = e.target.closest('.rl-up'); if (!up) return
  const on = up.classList.toggle('m-on')
  const n = up.parentElement.querySelector('b')
  if (n && /^\\d+$/.test(n.textContent)) n.textContent = Number(n.textContent) + (on ? 1 : -1)
})`,
  },
}

export const MOTION_FOR = {
  'cobalt-gray': { persona: 'restrained', sig: 'accent-underline' },
  'stark-mono': { persona: 'restrained', sig: 'headline-reveal' },
  'ink-cream': { persona: 'restrained', sig: 'cover-focus' },
  // 공공 디자인 시스템은 움직임 자체가 비용이다 — 등장 모션 0, 포커스만 강하게.
  'civic-blue': { persona: 'restrained', sig: 'focus-ring', still: true },
  'black-yellow': { persona: 'precise', sig: 'block-fill' },
  'blueprint': { persona: 'precise', sig: 'line-draw' },
  'neon-engineering': { persona: 'precise', sig: 'count-up' },
  'oled-void': { persona: 'glow', sig: 'glow' },
  'navy-signal': { persona: 'glow', sig: 'signal-pulse' },
  'deep-forest': { persona: 'weighty', sig: 'gold-sheen' },
  'sand-clay': { persona: 'weighty', sig: 'stamp' },
  'mint-paper': { persona: 'soft', sig: 'float' },
  'indigo-class': { persona: 'soft', sig: 'progress-fill' },
  'rose-lounge': { persona: 'soft', sig: 'bump' },
}

/** 카운트업 한 프레임 — 첫 숫자만 p 비율로 바꾸고 단위·기호·자릿수는 원문을 따른다 */
export function countText(txt, p) {
  const m = txt.match(/\d[\d,]*(\.\d+)?/)
  if (!m) return txt
  const end = parseFloat(m[0].replace(/,/g, ''))
  const dec = m[1] ? m[1].length - 1 : 0
  p = Math.max(0, Math.min(1, p))   // rAF 타임스탬프가 클릭 시각보다 앞서면 p 가 음수가 된다
  const n = (end * p).toLocaleString('en-US', {
    minimumFractionDigits: dec, maximumFractionDigits: dec, useGrouping: m[0].includes(','),
  })
  return txt.replace(m[0], n)
}

/** 디자인 탭 필터 — 분야와 "깔끔한 모션만"을 AND 로 건다. 페이지에도 이 함수가 그대로 들어간다 */
export function skinVisible(doms, level, dom, calmOnly) {
  return (dom === 'all' || doms.includes(dom)) && (!calmOnly || level === 'calm')
}

export const MOTION_BASE_JS = `const countText = ${countText.toString()}`

export const MOTION_BASE_CSS = `
@keyframes m-fade{from{opacity:0}}
@keyframes m-wipe{from{clip-path:inset(0 100% 0 0)}}
@keyframes m-light{from{opacity:0;filter:brightness(.3)}}
@keyframes m-rise{from{opacity:0;transform:translateY(12px)}}
@keyframes m-pop{from{opacity:0;transform:scale(.97)}}
@keyframes m-reveal{from{clip-path:inset(0 0 100% 0);transform:translateY(.25em)}}
@keyframes m-focus{from{opacity:.4;transform:scale(1.06);filter:blur(6px)}}
@keyframes m-stroke{from{stroke-dashoffset:1000}to{stroke-dashoffset:0}}
@keyframes m-sheen{from{transform:translateX(-100%)}to{transform:translateX(100%)}}
@keyframes m-grow{from{transform:scaleX(0)}}
@keyframes m-pop-in{from{transform:scale(0)}}
@keyframes m-bump{50%{transform:scale(1.35)}}
@keyframes m-stamp{0%{opacity:0;transform:rotate(-14deg) scale(1.9)}
  65%{opacity:1;transform:rotate(-14deg) scale(.94)}100%{opacity:1;transform:rotate(-14deg) scale(1)}}
@keyframes m-pulse{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--s-acc) 60%,transparent)}
  100%{box-shadow:0 0 0 7px transparent}}

/* 등장 — 보이는 화면의 직계 자식에 성격의 --m-enter 를 순서대로 건다.
   backwards 라서 끝난 뒤엔 호버 transform 을 막지 않는다. */
.m-play .fv-view:not([hidden]) > *{animation:var(--m-enter) var(--m-enter-dur) var(--m-ease) backwards;
  animation-delay:calc(var(--m-i, 0) * 60ms)}
.fv-view > :nth-child(2){--m-i:1}
.fv-view > :nth-child(3){--m-i:2}
.fv-view > :nth-child(4){--m-i:3}
.fv-view > :nth-child(5){--m-i:4}
.fv-view > :nth-child(n+6){--m-i:5}

/* 초기화면 카드 — 올리면 프리뷰가 그 스킨의 성격으로 다시 들어온다 */
@media (hover:hover){
  .skin:hover .pv > *{animation:var(--m-enter) var(--m-enter-dur) var(--m-ease) backwards}
}

/* 화면 밖에서는 반복 애니메이션을 멈춘다 */
.m-off,.m-off *{animation-play-state:paused!important}

@media (prefers-reduced-motion:reduce){
  .m-play *,.m-play *::before,.m-play *::after,.skin:hover .pv > *,.fv-cnt{animation:none!important}
  .fv-card:hover,.rl-up:hover,.lay-cart:active{transform:none!important}
}
`

/** 스킨 하나의 모션 CSS — 성격 변수 + 스코프된 시그니처 */
export function motionCss(id) {
  const m = MOTION_FOR[id], p = PERSONAS[m.persona]
  return `.sk-${id}{--m-dur:${p.dur};--m-ease:${p.ease};--m-enter:${m.still ? 'none' : p.enter};--m-enter-dur:${p.enterDur}}\n`
    + scopeCss(SIGNATURES[m.sig].css, `.sk-${id}`)
}

/** 스킨 하나의 모션 JS — M_PLAY(재생마다) · M_INIT(한 번). 없으면 빈 함수 */
export function motionJs(id) {
  const sig = SIGNATURES[MOTION_FOR[id].sig]
  return `const M_PLAY = (fv, reduced) => {\n${sig.play || ''}\n}\nconst M_INIT = fv => {\n${sig.init || ''}\n}`
}

/** 화면에 적을 설명 — 스킨 페이지 정보 영역과 카드 배지가 쓴다 */
export function motionInfo(id) {
  const m = MOTION_FOR[id], p = PERSONAS[m.persona], sig = SIGNATURES[m.sig]
  return {
    persona: p.name, level: p.level, levelLabel: MOTION_LEVELS[p.level],
    sigName: sig.name, desc: sig.desc, still: !!m.still,
  }
}

/**
 * 빌드 가드 — 매핑이 빠졌거나, 시그니처 대상이 그 스킨의 레이아웃에 하나도 없으면 문제로 적는다.
 * 레이아웃을 고쳤을 때 효과가 조용히 사라지는 걸 막는다.
 */
export function checkMotion(skins, layoutFor, renderLayout) {
  const problems = []
  for (const s of skins) {
    const m = MOTION_FOR[s.id]
    if (!m) { problems.push(`${s.id}: MOTION_FOR 에 없음`); continue }
    if (!PERSONAS[m.persona]) problems.push(`${s.id}: 없는 성격 ${m.persona}`)
    const sig = SIGNATURES[m.sig]
    if (!sig) { problems.push(`${s.id}: 없는 시그니처 ${m.sig}`); continue }
    const html = renderLayout(layoutFor[s.id])
    const has = t => new RegExp(`class="(?:[^"]*\\s)?${t}(?:\\s[^"]*)?"`).test(html)
    if (!sig.targets.some(has))
      problems.push(`${s.id}: 시그니처 ${m.sig} 의 대상(${sig.targets.join(', ')})이 레이아웃 ${layoutFor[s.id]} 에 없음`)
  }
  return problems
}
