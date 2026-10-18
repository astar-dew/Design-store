#!/usr/bin/env node
// 초기화면 생성 — 디자인 / 쇼케이스 / 패턴 / 견적 (디자인 스킬 · 레퍼런스 · 수주 가이드는 숨김 — SHOW_* 플래그)
//   scripts/build-index.mjs && open index.html
import { writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { REPO, loadRefs, loadVocab, lint, esc, md } from './lib.mjs'
import { GROUPS } from '../patterns/patterns.mjs'
import { WIRE_CSS } from '../patterns/wire-css.mjs'
import {
  SKINS, skinCss, fontLinks, modeVars, PREVIEW_FULL, PREVIEW_FULL_CSS, ICON_SPRITE,
} from '../patterns/skins.mjs'
import { SCENES, SCENES_CSS, SCENES_EXTRA_CSS } from '../patterns/scenes.mjs'
import { DOMAINS } from '../patterns/domains.mjs'
import { SCREENS, SKIN_TIER, OPTIONS, DARK, TERMS, BASIS, darkRate, fmt } from '../patterns/pricing.mjs'
import { SKILLBOOK, LEVELS, CHECKLIST, SKILL_COUNT, CHECK_COUNT } from '../patterns/skillbook.mjs'
import { TOKENS_CSS } from './theme.mjs'
import { CONTACT, hasMail, footer, FOOTER_CSS, MAIL_JS } from '../patterns/contact.mjs'
import { MOTION_BASE_CSS, motionCss, motionInfo, skinVisible } from '../patterns/motion.mjs'
import { LAYOUTS, LAYOUT_FOR, layoutViews, renderLayout, LAYOUTS_CSS, LAYOUTS_MOBILE_CSS, EXTRA_SPRITE } from '../patterns/layouts.mjs'

const refs = loadRefs()
const refProblems = lint(refs, loadVocab())
const refsByStyle = id => refs.filter(r => [].concat(r.fm.style || []).includes(id))
const refsForTags = tags => refs.filter(r => {
  const all = ['style', 'layout', 'page', 'components'].flatMap(f => [].concat(r.fm[f] || []))
  return tags.some(t => all.includes(t))
})
const pct = r => `+${Math.round(r * 100)}%`
// 디자인 스킬 탭은 당분간 숨긴다. 데이터(skillbook.mjs)는 그대로 두고 true 로 바꾸면 돌아온다.
const SHOW_SKILL = false
// 수주 가이드는 방문자가 볼 내용이 아니라 내 미팅 메모다 — docs/07-intake-guide.md 로 뺐다.
// 분야 데이터(domains.mjs)는 디자인 탭 필터가 계속 쓴다. true 로 바꾸면 탭이 돌아온다.
const SHOW_INTAKE = false
// 레퍼런스는 남의 제품 화면 + "가져오지 말 것" 메모라 공개 화면에 두지 않는다 — 내 작업 노트로만 쓴다.
// 방문자에게는 대신 직접 만든 화면을 모은 쇼케이스 탭을 보여준다. true 로 바꾸면 탭이 돌아온다.
const SHOW_REF = false

/* ---------- 탭 1: 디자인 (스킨 카드) ---------- */
// 카드 = 제품 사진. 프리뷰 위에 라벨을 얹지 않는다 —
// 10개 스킨의 배경색이 제각각이라 어떤 오버레이도 대비를 보장할 수 없고,
// 무엇보다 사진 위에 태그를 붙이면 사진이 싸 보인다. 라벨은 전부 메타 영역으로.
const TONE = { light: '라이트', dark: '다크' }
// 카드 필터는 '분야'로 건다 — 라이트/다크는 디자이너의 축이지 클라이언트의 축이 아니다.
// 클라이언트는 "쇼핑몰 하려고요"라고 말하지 "라이트로 해주세요"라고 말하지 않는다.
// 매핑은 수주 가이드(domains.mjs)의 추천 스킨을 그대로 쓴다 — 두 탭이 어긋나면 안 되므로.
const SKIN_DOMS = {}
for (const d of DOMAINS) for (const [sid] of d.skins) (SKIN_DOMS[sid] ||= []).push(d.id)
for (const sk of SKINS) {
  if (!SKIN_DOMS[sk.id]) throw new Error(`스킨 ${sk.id} 가 어느 분야에도 없다 — 분야 필터에서 영영 안 나온다`)
}
const domCount = id => SKINS.filter(sk => SKIN_DOMS[sk.id].includes(id)).length
const skinCards = SKINS.map((s, i) => {
  const scene = SCENES[s.id]
  if (!scene) throw new Error(`씬 없음: ${s.id} — patterns/scenes.mjs 에 추가할 것`)
  const factor = SKIN_TIER[s.id]?.factor ?? 1
  const mi = motionInfo(s.id)
  return `
  <article class="skin sk-${s.id} mode-${s.base}" data-i="${i}" data-id="${s.id}" data-base="${s.base}"
           data-doms="${SKIN_DOMS[s.id].join(' ')}" data-motion="${mi.level}"
           tabindex="0" role="button" aria-label="${esc(s.name)} — ${esc(scene.domain)}, ${TONE[s.base]} 기본. 자세히 보기">
    <div class="pv-wrap"><div class="pv">${scene.html}</div></div>
    <div class="skin-meta">
      <div class="sk-eyebrow">
        <span class="sk-domain">${esc(scene.domain)}</span>
        ${SHOW_REF && refsByStyle(s.id).length ? `<span class="sk-refn">레퍼런스 ${refsByStyle(s.id).length}</span>` : ''}
        <span class="sk-badges">
          <span class="sk-motion" title="모션 ${esc(mi.persona)} · ${esc(mi.sigName)}">모션 ${mi.levelLabel}</span>
          <span class="sk-tone t-${s.base}">${TONE[s.base]}</span>
        </span>
      </div>
      <h3>${esc(s.name)}</h3>
      <p>${esc(s.sub)}</p>
      <div class="sk-foot">
        <code>${esc(s.id)}</code>
        <span class="sk-tier" title="스킨 난이도 계수 — 견적에서 화면 소계에 곱해집니다">×${factor.toFixed(2)}</span>
        <span class="sk-go" aria-hidden="true">열기
          <svg viewBox="0 0 16 16" width="12" height="12"><path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"
            fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
      </div>
    </div>
  </article>`
}).join('')


/* ---------- 탭: 쇼케이스 ----------
   직접 만든 완성 화면 전부. 스킨 페이지에서 한 장씩 넘겨 봐야 했던 화면을 한 벽에 건다.
   카드마다 실제 목업을 그 화면 하나만 그려서(renderLayout(key, view)) 폭에 맞춰 줄인다 — 캡처 이미지가 아니라
   스킨 토큰을 바꾸면 같이 바뀐다. 누르면 그 스킨 페이지의 그 화면(#view)으로 간다. */
// 순서는 스킨별이 아니라 "각 스킨의 첫 화면 14장 → 두 번째 화면 14장 → …" — 한 스킨이 첫 줄을 다 차지하지 않게
const shots = SKINS.flatMap((s, si) => {
  const key = LAYOUT_FOR[s.id]
  return layoutViews(key).map((v, i) => ({ s, key, v, home: i === 0, order: i * SKINS.length + si }))
}).sort((a, b) => a.order - b.order)
const shotCards = shots.map(({ s, key, v, home }) => `
  <a class="shot sk-${s.id} mode-${s.base}" href="skins/${s.id}.html${home ? '' : '#' + v.id}" data-v="${home ? '' : v.id}"
     data-doms="${SKIN_DOMS[s.id].join(' ')}" aria-label="${esc(s.name)} — ${esc(LAYOUTS[key].domain)} · ${esc(v.label)}">
    <div class="fv-wrap" aria-hidden="true" inert>${renderLayout(key, v.id)}</div>
    <div class="shot-meta"><b>${esc(v.label)}</b><span>${esc(LAYOUTS[key].domain)} · ${esc(s.name)}</span></div>
  </a>`).join('')
const shotDomCount = id => shots.filter(x => SKIN_DOMS[x.s.id].includes(id)).length

/* ---------- 탭 2: 디자인 스킬 ---------- */
const skillCards = SKILLBOOK.map(c => `
  <article class="sb" id="sb-${c.id}">
    <header class="sb-head">
      <span class="sb-pri">${c.pri}</span>
      <div class="sb-title">
        <h3>${esc(c.name)} <span class="sb-en">${esc(c.en)}</span></h3>
        <p class="sb-lede">${esc(c.lede)}</p>
      </div>
      <span class="sb-lv lv-${c.level.toLowerCase()}" title="${esc(LEVELS[c.level].note)}">${esc(LEVELS[c.level].label)}</span>
    </header>
    <ul class="sb-must">${c.must.map(([k, d]) =>
      `<li><b>${esc(k)}</b><span>${esc(d)}</span></li>`).join('')}</ul>
    <div class="sb-avoid">
      <h4>피할 것</h4>
      <ul>${c.avoid.map(a => `<li>${esc(a)}</li>`).join('')}</ul>
    </div>
    <p class="sb-here"><b>이 저장소에서</b> ${esc(c.here)}</p>
  </article>`).join('')

const checkGroups = CHECKLIST.map(([g, items], gi) => `
  <section class="ck-group">
    <h4>${esc(g)}</h4>
    ${items.map((t, ii) => `<label class="ck"><input type="checkbox" data-ck="${gi}-${ii}"><span>${esc(t)}</span></label>`).join('')}
  </section>`).join('')

const swatches = (s, mode) => {
  const v = modeVars(s, mode)
  return [['배경', v.bg], ['표면', v.sur], ['액센트', v.acc], ['텍스트', v.fg]]
    .map(([l, c]) => `<div class="sw"><span style="background:${c}"></span><small>${esc(l)}</small></div>`).join('')
}

// 스킨 상세는 skins/<id>.html 전용 페이지로 분리됐다 (scripts/build-skins.mjs)

/* ---------- 탭 2: 패턴 ---------- */
const patternSections = GROUPS.map(g => `
<section class="group" id="g-${g.id}">
  <div class="ghead"><h2>${esc(g.name)}</h2><p>${esc(g.note)}</p></div>
  <div class="vgrid">
${g.variants.map(v => {
    const linked = refsForTags(v.tags)
    return `    <article class="v" id="${v.id}">
      <div class="wf">${v.wire}</div>
      <div class="vbody">
        <h3>${esc(v.name)}</h3>
        <div class="tags">${v.tags.map(t => `<span class="chip">${esc(t)}</span>`).join('')}</div>
        <dl><dt>쓸 때</dt><dd>${esc(v.when)}</dd><dt class="w">주의</dt><dd class="w">${esc(v.watch)}</dd></dl>
        ${SHOW_REF ? `<div class="linked">${linked.length
        ? `<button class="ref-jump" data-refslugs="${linked.map(r => r.slug).join(' ')}"
             data-reflabel="${esc(v.name)}">내 레퍼런스 ${linked.length}건 →</button>`
        : '<span class="none">연결된 레퍼런스 없음</span>'}</div>` : ''}
      </div>
    </article>`
  }).join('\n')}
  </div>
</section>`).join('\n')

/* ---------- 탭 3: 레퍼런스 ----------
   갤러리(gallery.html)와 역할을 나눈다.
   여기는 "스킨·패턴과 연결해서 보는 곳", 갤러리는 "축별로 정밀 필터하는 곳". */
const STYLE_NAME = Object.fromEntries(SKINS.map(s => [s.id, s.name]))

const refCards = refs.map((r, i) => {
  const thumb = r.images[0]
    ? `<img loading="lazy" src="${relative(REPO, join(r.dir, r.images[0]))}" alt="" width="1440" height="900">`
    : '<div class="noimg">이미지 없음</div>'
  const styles = [].concat(r.fm.style || [])
  const chips = ['page', 'layout'].flatMap(f => [].concat(r.fm[f] || [])).filter(Boolean)
    .map(v => `<span class="chip">${esc(v)}</span>`).join('')
  return `<article class="v ref" data-i="${i}" data-slug="${esc(r.slug)}"
    data-styles="${esc(styles.join(' '))}" tabindex="0" role="button"
    aria-label="${esc(r.fm.product || r.slug)} 자세히">
  <div class="rthumb">${thumb}</div>
  <div class="vbody">
    <div class="ref-top"><h3>${esc(r.fm.product || r.slug)}</h3>
      ${r.fm.verdict ? `<span class="verdict v-${esc(r.fm.verdict)}">${esc(r.fm.verdict)}</span>` : ''}</div>
    <div class="tags">${styles.map(v =>
    `<span class="chip chip-style">${esc(STYLE_NAME[v] || v)}</span>`).join('')}${chips}</div>
    <p class="why">${esc((r.why || '').split('\n')[0])}</p>
    <div class="linked"><code>${esc(r.slug)}</code>
      <span class="ref-open">자세히 →</span></div>
  </div>
</article>`
}).join('')

const refSheets = refs.map((r, i) => {
  const sec = (t, body, cls = '') => body ? `<section class="${cls}"><h5>${t}</h5>${md(body)}</section>` : ''
  const shots = r.images.map(f =>
    `<img loading="lazy" decoding="async" src="${relative(REPO, join(r.dir, f))}" alt="">`).join('')
  const tagRow = (f, label) => {
    const v = [].concat(r.fm[f] || []).filter(Boolean)
    return v.length ? `<dt>${label}</dt><dd>${v.map(x =>
      `<span class="chip">${esc(f === 'style' ? (STYLE_NAME[x] || x) : x)}</span>`).join('')}</dd>` : ''
  }
  return `<div class="sheet" id="rs-${i}" hidden>
  <div class="sheet-in" role="dialog" aria-modal="true" aria-label="${esc(r.fm.product || r.slug)}">
    <header>
      <div><h3>${esc(r.fm.product || r.slug)}</h3><code>${esc(r.slug)}</code></div>
      <div class="sheet-tools">
        ${r.fm.source ? `<a class="fv-src" href="${esc(r.fm.source)}" target="_blank" rel="noopener">원본 열기 ↗</a>` : ''}
        <button class="close" aria-label="닫기">✕</button>
      </div>
    </header>
    <div class="ref-body">
      <div class="ref-shots">${shots || '<p class="noimg">이미지 없음</p>'}</div>
      <div class="ref-side">
        ${sec('왜 저장했나', r.why)}
        ${sec('가져올 것', r.highlights, 'ok')}
        ${sec('가져오지 말 것', r.dontTake, 'no')}
        <dl class="ref-tags">
          ${tagRow('style', '스킨')}${tagRow('page', '화면')}${tagRow('layout', '레이아웃')}
          ${tagRow('components', '컴포넌트')}${tagRow('color', '색')}${tagRow('density', '밀도')}
        </dl>
      </div>
    </div>
  </div>
</div>`
}).join('')

// 스킨별 건수 — 0건인 스킨은 칩을 만들지 않는다
const refStyleChips = SKINS.filter(s => refsByStyle(s.id).length).map(s =>
  `<button class="fchip" type="button" data-rf="${s.id}" data-name="${esc(s.name)}"
     aria-pressed="false">${esc(s.name)} <b>${refsByStyle(s.id).length}</b></button>`).join('')

const refWarn = refProblems.length ? `<div class="ref-warn">
  <b>정리 필요 ${refProblems.length}건</b>
  <ul>${refProblems.slice(0, 6).map(p => `<li>${esc(p)}</li>`).join('')}
  ${refProblems.length > 6 ? `<li>… 외 ${refProblems.length - 6}건</li>` : ''}</ul>
  <small>태그 값은 <code>docs/vocab.yml</code>에 정의된 것만 씁니다.</small>
</div>` : ''

const refEmpty = `<div class="empty">
  <div class="empty-ico"></div>
  <h3>아직 모은 레퍼런스가 없습니다</h3>
  <p>실제로 보고 저장한 화면이 쌓이면 태그가 겹치는 <strong>스킨·패턴 카드에 자동으로 연결</strong>됩니다.
  외주 브리프에는 각 레퍼런스의 <code>Don't take</code>가 그대로 "가져오지 말 것"이 됩니다.</p>
  <ol class="empty-steps">
    <li><b>모은다</b><span>급하면 스크린샷만 <code>references/_inbox/</code>에 던져두고 주 1회 정리합니다.</span></li>
    <li><b>등록한다</b><code class="cmd">scripts/add-ref.sh linear-issue-list ~/Desktop/shot.png</code></li>
    <li><b>5개만 채운다</b><span><code>product</code> · <code>source</code> · <code>page</code> · <code>style</code> · <code>## Why</code>
      — 왜 저장했는지 한 줄이 없으면 나중에 못 씁니다.</span></li>
  </ol>
  <p class="empty-more">수집처 목록은 <code>docs/02-reference-sources.md</code>에 있습니다.</p>
</div>`

/* ---------- 탭 4: 견적 ---------- */
const screenGroups = [...new Set(SCREENS.map(s => s.group))]
// pricing.mjs 의 그룹명은 작업자 기준이라 방문자용 이름을 따로 붙인다
const GROUP_LABEL = { 마케팅: '소개 · 홍보 페이지', 진입: '가입 · 시작', 핵심: '핵심 기능', 운영: '관리 · 결제', 상태: '빈 화면 · 오류 안내' }
// 빈 화면에서 시작하면 뭘 골라야 할지 모른다 — 분야를 고르면 필수 화면이 채워진다
const presetChips = DOMAINS.map(d =>
  `<button type="button" class="q-preset" aria-pressed="false" data-apply='${JSON.stringify(d.screens)}'>${esc(d.name)}</button>`).join('')
const quoteRows = screenGroups.map(g => `
  <div class="q-group">
    <h4>${esc(GROUP_LABEL[g] ?? g)}</h4>
    ${SCREENS.filter(s => s.group === g).map(s => `
    <div class="q-row" data-id="${s.id}">
      <label class="q-info"><input type="checkbox" class="q-ck">
        <span><strong>${esc(s.name)}</strong>${s.note ? `<small>${esc(s.note)}</small>` : ''}</span></label>
      <div class="q-unit">${fmt(s.price)}</div>
      <div class="q-qty">
        <button type="button" data-d="-1" aria-label="${esc(s.name)} 하나 빼기">−</button>
        <span class="q-n">0</span>
        <button type="button" data-d="1" aria-label="${esc(s.name)} 하나 더하기">+</button>
      </div>
    </div>`).join('')}
  </div>`).join('')

// 옵션은 %만 보면 감이 안 온다 — 금액(.q-oamt)은 스크립트가 지금 선택 기준으로 채운다
const optionRows = [
  `<label class="q-opt q-dark">
     <input type="checkbox" value="dark">
     <span class="q-oname">다크모드 <em class="q-oamt" data-o="dark"></em></span>
     <span class="q-odesc">밝은 화면과 어두운 화면을 한 쌍으로 드립니다</span>
   </label>`,
  ...OPTIONS.map(o => `
  <label class="q-opt">
    <input type="checkbox" value="${o.id}">
    <span class="q-oname">${esc(o.name)} <em class="q-oamt" data-o="${o.id}"></em></span>
    <span class="q-odesc">${esc(o.desc)}</span>
  </label>`),
].join('')

const darkScope = `
<div class="dark-scope">
  <div>
    <h4>다크모드에 포함</h4>
    <ul>${DARK.includes.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
  </div>
  <div class="ex">
    <h4>불포함 (별도 견적)</h4>
    <ul>${DARK.excludes.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
  </div>
</div>`

/* ---------- 탭: 수주 가이드 ---------- */
// id 무결성 — 깨진 참조는 빌드에서 잡는다
const variantIds = new Set(GROUPS.flatMap(g => g.variants.map(v => v.id)))
const skinIdx = new Map(SKINS.map((s, i) => [s.id, i]))
const screenById = new Map(SCREENS.map(s => [s.id, s]))
for (const d of DOMAINS) {
  for (const [pid] of d.layouts) if (!variantIds.has(pid)) throw new Error(`도메인 ${d.id}: 없는 패턴 → ${pid}`)
  for (const [sid] of d.skins) if (!skinIdx.has(sid)) throw new Error(`도메인 ${d.id}: 없는 스킨 → ${sid}`)
  for (const sid of Object.keys(d.screens)) if (!screenById.has(sid)) throw new Error(`도메인 ${d.id}: 없는 화면 → ${sid}`)
}

const domainChips = DOMAINS.map((d, i) =>
  `<button class="dom-chip" data-d="${d.id}" aria-selected="${i === 0}">${esc(d.name)}</button>`).join('')

const domainPanels = DOMAINS.map((d, i) => {
  const subtotal = Object.entries(d.screens).reduce((n, [id, q]) => n + screenById.get(id).price * q, 0)
  return `<div class="dom-panel" id="dom-${d.id}"${i === 0 ? '' : ' hidden'}>
  <p class="dom-desc">${esc(d.desc)}</p>
  <div class="dom-grid">
    <section>
      <h4>첫 미팅에서 물어볼 것</h4>
      <ol class="dom-ask">${d.ask.map(q => `<li>${esc(q)}</li>`).join('')}</ol>
      <p class="dom-watch">${esc(d.watch)}</p>
    </section>
    <section>
      <h4>관례 레이아웃 <small>— 누르면 패턴 탭으로</small></h4>
      <div class="dom-items">${d.layouts.map(([pid, why]) =>
    `<button class="dom-item" data-pat="${pid}"><code>${pid}</code><span>${esc(why)}</span></button>`).join('')}</div>
      <h4>어울리는 스킨 <small>— 누르면 상세가 열림</small></h4>
      <div class="dom-items">${d.skins.map(([sid, why]) =>
      `<button class="dom-item" data-skin="${sid}"><code>${sid}</code><span>${esc(why)}</span></button>`).join('')}</div>
      <h4>필수 화면</h4>
      <ul class="dom-scr">${Object.entries(d.screens).map(([id, q]) =>
        `<li>${esc(screenById.get(id).name)}${q > 1 ? ` ×${q}` : ''}</li>`).join('')}</ul>
      <div class="dom-sum">화면 소계 ${fmt(subtotal)} <small>· 스킨 계수·옵션 별도</small></div>
      <button class="dom-apply" data-apply='${JSON.stringify(d.screens)}'>이 구성으로 견적 탭 채우기 →</button>
    </section>
  </div>
</div>`
}).join('\n')

const CLIENT_DATA = JSON.stringify({
  screens: SCREENS.map(s => ({ id: s.id, name: s.name, price: s.price })),
  tiers: Object.fromEntries(Object.entries(SKIN_TIER).map(([k, v]) => [k, v.factor])),
  tierWhy: Object.fromEntries(Object.entries(SKIN_TIER).map(([k, v]) => [k, v.why])),
  options: OPTIONS.map(o => ({ id: o.id, name: o.name, rate: o.rate })),
  dark: { base: DARK.base, bySkin: DARK.bySkin },
  minimum: TERMS.minimum,
  skins: SKINS.map(s => ({ id: s.id, name: s.name })),
})

/* ---------- 페이지 ---------- */
const html = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>A-Dew, design-store</title>
${fontLinks(SKINS)}
<style>
${TOKENS_CSS}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);
  font:15px/1.6 ui-sans-serif,-apple-system,"Pretendard","Apple SD Gothic Neo",system-ui,sans-serif;
  -webkit-font-smoothing:antialiased}
.wrap{max-width:1320px;margin:0 auto;padding:0 24px 90px}

/* 헤더 + 탭 */
.top{position:sticky;top:0;z-index:20;background:var(--bg);border-bottom:1px solid var(--line);
  padding-top:26px;margin-bottom:26px}
.brand{display:flex;align-items:baseline;gap:10px;margin-bottom:16px}
.brand h1{font-size:19px;margin:0;letter-spacing:-.015em}
.brand span{font-size:13px;color:var(--dim)}
.tabs{display:flex;gap:2px;position:relative}   /* 잉크가 가로 스크롤과 같이 움직이도록 기준을 여기에 */
/* 밑줄 하나가 선택 탭으로 미끄러진다. 폭은 scaleX 로 — width 를 애니메이션하면 매 프레임 레이아웃을 다시 잰다 */
.tab-ink{position:absolute;left:0;bottom:-1px;width:1px;height:2px;background:var(--fg);
  transform-origin:left;transition:transform .28s cubic-bezier(.2,.7,.3,1);pointer-events:none}
.tabs.has-ink .tab[aria-selected="true"]{border-bottom-color:transparent}
[role="tabpanel"].p-in{animation:m-fade .18s ease-out}
.tab{font:inherit;font-size:14px;background:none;border:none;color:var(--dim);cursor:pointer;
  padding:8px 14px;border-bottom:2px solid transparent;margin-bottom:-1px;transition:.12s;
  flex:none;white-space:nowrap}   /* 좁아지면 줄여서 쪼개지 말고 가로로 스크롤한다 */
.tab:hover{color:var(--fg)}
.tab[aria-selected="true"]{color:var(--fg);border-bottom-color:var(--fg);font-weight:560}
.tab b{font-weight:inherit;font-size:11px;color:var(--dim);margin-left:5px}
.panel-head{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;margin-bottom:24px}
.panel-lede{color:var(--dim);font-size:13.5px;max-width:70ch;margin:0}

/* 라이트/다크 스위치 */
.mode-switch{display:flex;border:1px solid var(--line);border-radius:8px;overflow:hidden;flex:none}
.mode-switch button{font:inherit;font-size:12.5px;background:none;border:none;cursor:pointer;
  padding:6px 14px;color:var(--dim)}
.mode-switch button[aria-selected="true"]{background:var(--fg);color:var(--bg)}

/* 디자인 탭 — 스킨 카드 */
.panel-h{font-size:20px;margin:0 0 6px;letter-spacing:-.02em}
.panel-sub{font-size:12.5px;font-weight:400;color:var(--dim);letter-spacing:0}

.dz-bar{display:flex;align-items:center;justify-content:space-between;gap:16px;
  flex-wrap:wrap;margin-bottom:18px}
.fchips{display:flex;flex-wrap:wrap;gap:6px}          /* 넘치면 줄바꿈 — 잘라내지 않는다 */
.fchip{font:inherit;font-size:13px;padding:6px 14px;border-radius:999px;cursor:pointer;
  border:1px solid var(--line);background:var(--panel);color:var(--dim);transition:.12s}
.fchip b{font-weight:500;font-size:11.5px;opacity:.7;margin-left:4px;font-variant-numeric:tabular-nums}
.fchip:hover{color:var(--fg);border-color:var(--dim)}
.fchip[aria-pressed="true"]{background:var(--fg);color:var(--bg);border-color:var(--fg)}
.fchip[aria-pressed="true"] b{opacity:.6}
.fchip:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.dz-count{margin:0;font-size:12.5px;color:var(--dim);font-variant-numeric:tabular-nums}

.skins{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px}
.skin{background:var(--panel);border:1px solid var(--line);border-radius:14px;overflow:hidden;
  cursor:pointer;text-align:left;display:flex;flex-direction:column;
  transition:transform .16s cubic-bezier(.2,.7,.3,1),box-shadow .16s,border-color .16s}
.skin[hidden]{display:none}
.skin:hover,.skin:focus-visible{transform:translateY(-4px);border-color:var(--dim);
  box-shadow:0 2px 4px rgba(0,0,0,.04),0 14px 30px rgba(0,0,0,.09)}
.skin:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.skin .pv-wrap{border-bottom:1px solid var(--line)}
.skin-meta{padding:13px 15px 14px;display:flex;flex-direction:column;flex:1}
.sk-eyebrow{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:7px}
.sk-domain{font-size:11px;font-weight:600;letter-spacing:.03em;color:var(--dim)}
/* 톤은 글자로 말한다 — 색만으로 표시하면 색각 이상에서 구분되지 않는다 */
.sk-tone{font-size:10.5px;padding:2px 8px;border-radius:999px;flex:none;line-height:1.5}
.sk-tone.t-light{background:var(--chip);color:var(--dim);box-shadow:inset 0 0 0 1px var(--line)}
.sk-tone.t-dark{background:#26241f;color:#f2f0ec}
.sk-badges{display:flex;gap:5px;flex:none}
.sk-motion{font-size:10.5px;padding:2px 8px;border-radius:999px;line-height:1.5;color:var(--dim);
  box-shadow:inset 0 0 0 1px var(--line)}
.fchip-calm{margin-left:10px}   /* 분야와 다른 축이라 한 칸 띄운다 */
/* 스크롤 등장 — JS 가 m-reveal 을 달 때만. backwards 라 끝난 뒤 호버 transform 을 막지 않는다 */
.skins.m-reveal .skin:not(.in){opacity:0}
.skins.m-reveal .skin.in{animation:m-rise .5s cubic-bezier(.16,1,.3,1) backwards;
  animation-delay:calc(var(--d, 0) * 40ms)}
.skin-meta h3{font-size:16px;margin:0 0 3px;letter-spacing:-.015em}
.skin-meta p{font-size:12.5px;color:var(--dim);margin:0 0 12px;line-height:1.5}
.skin-meta code,.linked code,.cmd{font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
.sk-foot{display:flex;align-items:center;gap:7px;margin-top:auto;
  padding-top:10px;border-top:1px solid var(--line)}
.sk-foot code{font-size:10.5px;color:var(--dim);background:var(--chip);padding:2px 6px;border-radius:5px}
.sk-tier{font-size:10.5px;color:var(--dim);font-variant-numeric:tabular-nums}
.sk-go{margin-left:auto;display:inline-flex;align-items:center;gap:3px;font-size:11.5px;
  color:var(--dim);transition:color .16s}
.sk-go svg{transition:transform .16s}
.skin:hover .sk-go,.skin:focus-visible .sk-go{color:var(--accent)}
.skin:hover .sk-go svg,.skin:focus-visible .sk-go svg{transform:translateX(3px)}

/* 디자인 스킬 탭 */
.lv-critical{--lv:var(--danger)}
.lv-high{--lv:var(--warn)}
.lv-medium{--lv:#3f6ea8}
.lv-low{--lv:var(--dim)}

.sb-nav{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:26px;
  padding-bottom:22px;border-bottom:1px solid var(--line)}
.sb-link{display:inline-flex;align-items:center;gap:7px;font-size:13px;text-decoration:none;
  color:var(--fg);border:1px solid var(--line);border-radius:999px;padding:5px 13px 5px 5px;
  transition:border-color .12s,background .12s}
.sb-link:hover{border-color:var(--lv);background:color-mix(in srgb,var(--lv) 7%,var(--panel))}
.sb-link:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.sb-link-n{width:20px;height:20px;border-radius:50%;display:grid;place-items:center;
  font-size:10.5px;font-weight:600;font-variant-numeric:tabular-nums;
  background:color-mix(in srgb,var(--lv) 13%,var(--panel));color:var(--lv)}

.sb-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(430px,1fr));gap:18px}
.sb{border:1px solid var(--line);border-radius:14px;background:var(--panel);
  padding:18px 20px 16px;scroll-margin-top:130px;display:flex;flex-direction:column}
.sb-head{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:12px;
  align-items:start;margin-bottom:14px}
.sb-pri{width:28px;height:28px;border-radius:9px;display:grid;place-items:center;
  font-size:13px;font-weight:600;font-variant-numeric:tabular-nums;
  background:color-mix(in srgb,var(--lv) 12%,var(--panel));color:var(--lv);
  box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--lv) 22%,var(--panel))}
.sb-title h3{font-size:16px;margin:0 0 5px;letter-spacing:-.015em;line-height:1.3}
.sb-en{font-size:11px;font-weight:400;color:var(--dim);letter-spacing:.02em}
.sb-lede{margin:0;font-size:13px;color:var(--dim);line-height:1.6}
.sb-lv{flex:none;font-size:10.5px;font-weight:600;padding:3px 9px;border-radius:999px;
  color:var(--lv);background:color-mix(in srgb,var(--lv) 10%,var(--panel));
  box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--lv) 28%,var(--panel))}

.sb-must{list-style:none;margin:0;padding:0;display:flex;flex-direction:column}
.sb-must li{display:grid;grid-template-columns:166px minmax(0,1fr);gap:4px 14px;
  padding:9px 0;border-top:1px solid var(--line);font-size:12.5px;line-height:1.55}
.sb-must b{font-weight:600;color:var(--fg);letter-spacing:-.005em}
.sb-must span{color:var(--dim)}

.sb-avoid{margin-top:14px;padding:11px 14px;border-radius:10px;background:var(--chip)}
.sb-avoid h4{margin:0 0 6px;font-size:10.5px;letter-spacing:.05em;color:var(--danger);font-weight:600}
.sb-avoid ul{margin:0;padding:0;list-style:none;display:flex;flex-wrap:wrap;gap:5px}
.sb-avoid li{font-size:11.5px;color:var(--dim);background:var(--panel);
  padding:3px 9px;border-radius:6px;box-shadow:inset 0 0 0 1px var(--line)}
.sb-here{margin:12px 0 0;padding-left:12px;border-left:2px solid var(--accent);
  font-size:12px;color:var(--dim);line-height:1.6}
.sb-here b{color:var(--accent);font-weight:600}

/* 검수 체크리스트 */
.ck-wrap{margin-top:38px;border:1px solid var(--line);border-radius:14px;
  background:var(--panel);padding:20px 22px 22px;scroll-margin-top:130px}
.ck-head{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;flex-wrap:wrap}
.ck-head h3{margin:0 0 4px;font-size:16px;letter-spacing:-.015em}
.ck-head p{margin:0;font-size:12.5px;color:var(--dim);max-width:64ch;line-height:1.6}
.ck-score{display:flex;align-items:baseline;gap:6px;flex:none}
.ck-score b{font-size:24px;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.ck-score span{font-size:12.5px;color:var(--dim);font-variant-numeric:tabular-nums}
.ck-reset{font:inherit;font-size:11.5px;margin-left:8px;cursor:pointer;color:var(--dim);
  background:none;border:1px solid var(--line);border-radius:7px;padding:4px 10px}
.ck-reset:hover{color:var(--fg);border-color:var(--dim)}
.ck-bar{height:4px;border-radius:999px;background:var(--chip);overflow:hidden;margin:14px 0 18px}
.ck-bar i{display:block;height:100%;width:0;background:var(--accent);
  border-radius:999px;transition:width .25s cubic-bezier(.2,.7,.3,1)}
.ck-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:20px}
.ck-group h4{margin:0 0 8px;font-size:10.5px;letter-spacing:.06em;color:var(--dim);font-weight:600}
.ck{display:grid;grid-template-columns:auto minmax(0,1fr);gap:9px;align-items:start;
  padding:5px 0;font-size:12.5px;line-height:1.5;cursor:pointer}
.ck input{margin:3px 0 0;accent-color:var(--accent);flex:none}
.ck input:checked+span{color:var(--dim);text-decoration:line-through;text-decoration-color:var(--line)}

/* 스킨 상세 시트 */
.sheet{position:fixed;inset:0;z-index:40;background:rgba(0,0,0,.42);
  display:flex;align-items:center;justify-content:center;padding:24px;overflow:auto}
.sheet[hidden]{display:none}   /* [hidden] 기본값보다 display:flex 가 이기므로 명시 필요 */
.sheet-in{background:var(--panel);border-radius:14px;overflow:hidden;width:min(1180px,100%);
  box-shadow:0 24px 60px rgba(0,0,0,.3)}
.sheet-in>header{display:flex;justify-content:space-between;align-items:center;gap:16px;
  padding:14px 18px}
.sheet-in h3{margin:0 0 2px;font-size:17px}
.sheet-in>header code{font-size:11px;color:var(--dim)}
.sheet-tools{display:flex;align-items:center;gap:10px;flex:none}
.mode-switch.sm button{font-size:11.5px;padding:5px 11px}
.close{font:inherit;font-size:17px;line-height:1;background:none;border:1px solid var(--line);
  color:var(--fg);width:32px;height:32px;border-radius:8px;cursor:pointer;flex:none}
.stage{border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.sheet-body{padding:16px 18px 18px}
.lead{margin:0 0 14px;font-size:14px;color:var(--dim)}
.pair{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:16px 0 14px}
.pair h5{margin:0 0 8px;font-size:10.5px;color:var(--dim);letter-spacing:.05em;font-weight:600}
.sws{display:flex;gap:8px}
.sw{display:flex;flex-direction:column;gap:5px;align-items:center}
.sw span{width:34px;height:34px;border-radius:8px;border:1px solid var(--line);display:block}
.sw small{font-size:10px;color:var(--dim)}
.tokens{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:14px}
.tokens span{font-size:11px;background:var(--chip);color:var(--dim);padding:3px 8px;border-radius:5px;
  font-family:ui-monospace,SFMono-Regular,Menlo,monospace}

/* 패턴 탭 */
.group{margin-bottom:50px}
.ghead h2{font-size:17px;margin:0 0 3px;letter-spacing:-.01em}
.ghead p{margin:0 0 18px;color:var(--dim);font-size:13.5px;max-width:76ch}
.vgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(292px,1fr));gap:20px}
.v{background:var(--panel);border:1px solid var(--line);border-radius:12px;overflow:hidden}
.vbody{padding:13px 15px 15px}
.vbody h3{font-size:14.5px;margin:0 0 7px}
.tags{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:10px}
.chip{font-size:10.5px;padding:2px 6px;border-radius:5px;background:var(--chip);color:var(--dim);
  font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
.vbody dl,.sheet-body dl{margin:0;display:grid;grid-template-columns:64px 1fr;gap:5px 10px;
  font-size:12.5px;line-height:1.55}
.vbody dl{grid-template-columns:38px 1fr}
.vbody dt,.sheet-body dt{color:var(--dim);font-size:10.5px;letter-spacing:.03em;padding-top:2px}
.vbody dt.w,.vbody dd.w,.sheet-body dt.w,.sheet-body dd.w{color:var(--warn)}
.vbody dd,.sheet-body dd{margin:0}
.bench a{display:block;color:var(--fg);text-decoration:none;padding:2px 0}
.bench a:hover{color:var(--accent)}
.bench b{font-weight:560}
.linked{margin-top:11px;padding-top:9px;border-top:1px solid var(--line);font-size:11.5px;color:var(--dim)}
.linked code{background:var(--chip);padding:1px 5px;border-radius:4px;font-size:10.5px}
.linked .none{opacity:.55}

/* 레퍼런스 탭 */
.rthumb{aspect-ratio:16/10;background:var(--chip);overflow:hidden;display:flex}
.rthumb img{width:100%;height:100%;object-fit:cover;object-position:top center}
.noimg{margin:auto;color:var(--dim);font-size:12px}
.why{font-size:12.5px;color:var(--dim);margin:0;line-height:1.5}
.ref{cursor:pointer;transition:transform .16s cubic-bezier(.2,.7,.3,1),box-shadow .16s,border-color .16s}
.ref[hidden]{display:none}
.ref:hover,.ref:focus-visible{transform:translateY(-4px);border-color:var(--dim);
  box-shadow:0 2px 4px rgba(0,0,0,.04),0 14px 30px rgba(0,0,0,.09)}
.ref:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.ref-top{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:7px}
.ref-top h3{margin:0}
.chip-style{background:color-mix(in srgb,var(--accent) 12%,var(--panel));color:var(--accent)}
.verdict{font-size:10.5px;padding:2px 8px;border-radius:999px;flex:none;
  background:var(--chip);color:var(--dim)}
.verdict.v-좋음{background:color-mix(in srgb,var(--accent) 13%,var(--panel));color:var(--accent)}
.verdict.v-반면교사{background:color-mix(in srgb,var(--danger) 12%,var(--panel));color:var(--danger)}
.ref .linked{display:flex;align-items:center;justify-content:space-between;gap:8px}
.ref-open{font-size:11.5px;color:var(--dim);transition:color .16s}
.ref:hover .ref-open{color:var(--accent)}
.ref-count{margin:0;font-size:12.5px;color:var(--dim);font-variant-numeric:tabular-nums}
/* 패턴 카드에서 레퍼런스 탭으로 넘어가는 버튼 */
.ref-jump{font:inherit;font-size:11.5px;background:none;border:none;padding:0;cursor:pointer;
  color:var(--accent)}
.ref-jump:hover{text-decoration:underline}
.ref-jump:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.sk-refn{font-size:10.5px;color:var(--accent);margin-left:auto;margin-right:2px}

/* 어휘 위반 경고 — 빌드 로그에만 있으면 아무도 안 본다 */
.ref-warn{border:1px solid var(--warn);border-left-width:3px;border-radius:10px;
  background:var(--chip);padding:12px 16px;margin-bottom:18px;font-size:12.5px}
.ref-warn b{color:var(--warn)}
.ref-warn ul{margin:6px 0 6px;padding-left:18px;color:var(--dim);line-height:1.6}
.ref-warn small{color:var(--dim);font-size:11.5px}

/* 레퍼런스 상세 시트 */
.ref-body{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);
  border-top:1px solid var(--line)}
.ref-shots{background:var(--chip);padding:16px;display:flex;flex-direction:column;gap:12px;
  max-height:70vh;overflow:auto}
.ref-shots img{width:100%;display:block;border:1px solid var(--line);border-radius:8px}
.ref-side{padding:18px 20px;max-height:70vh;overflow:auto}
.ref-side h5{margin:0 0 6px;font-size:10.5px;letter-spacing:.05em;color:var(--dim);font-weight:600}
.ref-side section{margin-bottom:18px}
.ref-side section.ok h5{color:var(--accent)}
.ref-side section.no h5{color:var(--danger)}
.ref-side p,.ref-side li{font-size:13px;line-height:1.65;margin:0 0 6px;color:var(--fg)}
.ref-side ul{margin:0;padding-left:17px}
.ref-tags{margin:0;display:grid;grid-template-columns:64px 1fr;gap:7px 12px;
  padding-top:14px;border-top:1px solid var(--line)}
.ref-tags dt{font-size:10.5px;color:var(--dim);padding-top:3px}
.ref-tags dd{margin:0;display:flex;flex-wrap:wrap;gap:4px}
.fv-src{font-size:12.5px;color:var(--accent);text-decoration:none}
.fv-src:hover{text-decoration:underline}

.empty{text-align:center;padding:56px 24px;border:1px dashed var(--line);border-radius:14px}
.empty-ico{width:34px;height:34px;margin:0 auto 14px;border-radius:8px;
  border:1.5px dashed var(--dim);opacity:.55}
.empty h3{font-size:16px;margin:0 0 8px}
.empty p{color:var(--dim);font-size:13.5px;margin:0 auto 22px;max-width:62ch;line-height:1.65}
.empty-steps{list-style:none;counter-reset:s;margin:0 auto 18px;padding:0;max-width:560px;
  text-align:left;display:flex;flex-direction:column;gap:14px}
.empty-steps li{counter-increment:s;display:grid;grid-template-columns:24px 1fr;gap:4px 12px;
  align-items:baseline}
.empty-steps li::before{content:counter(s);grid-row:span 2;width:24px;height:24px;
  border-radius:50%;display:grid;place-items:center;font-size:11.5px;font-weight:600;
  background:var(--chip);color:var(--dim)}
.empty-steps b{font-size:13.5px}
.empty-steps span{font-size:12.5px;color:var(--dim);line-height:1.6}
.empty-steps .cmd{margin-top:2px}
.empty-more{font-size:12.5px;margin-bottom:0}
.cmd{display:inline-block;font-size:12px;background:var(--chip);color:var(--dim);
  padding:7px 12px;border-radius:7px}

/* 견적 탭 */
.quote{display:grid;grid-template-columns:minmax(0,1fr) 360px;gap:28px;align-items:start}
.q-step{font-size:15px;font-weight:600;margin:0 0 4px}
.q-step b{color:var(--accent);margin-right:6px;font-variant-numeric:tabular-nums}
.q-hint{font-size:12.5px;color:var(--dim);margin:0 0 12px}
.q-presets{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:30px}
.q-preset{font:inherit;font-size:13px;padding:7px 14px;border-radius:999px;cursor:pointer;
  border:1px solid var(--line);background:var(--panel);color:var(--fg);transition:.12s}
.q-preset:hover{border-color:var(--dim)}
.q-preset[aria-pressed="true"]{background:var(--fg);color:var(--bg);border-color:var(--fg)}
.q-group{margin-bottom:22px}
.q-group h4{font-size:11.5px;color:var(--dim);letter-spacing:.04em;margin:0 0 8px;font-weight:600}
.q-row{display:grid;grid-template-columns:1fr auto auto;gap:14px;align-items:center;
  padding:9px 12px;border:1px solid var(--line);border-radius:9px;margin-bottom:6px;
  background:var(--panel);transition:border-color .12s}
.q-row.on{border-color:var(--accent)}
.q-info{display:flex;gap:10px;align-items:flex-start;cursor:pointer}
.q-info input{margin:3px 0 0;accent-color:var(--accent)}
.q-info strong{display:block;font-size:13.5px;font-weight:520}
.q-info small{display:block;font-size:11.5px;color:var(--dim);line-height:1.4}
.q-unit{font-size:12.5px;color:var(--dim);font-variant-numeric:tabular-nums;white-space:nowrap}
/* 수량은 고른 화면에만 — 같은 화면을 여러 장 쓸 때만 필요하다 */
.q-qty{display:flex;align-items:center;gap:2px;visibility:hidden}
.q-row.on .q-qty{visibility:visible}
.q-qty button{font:inherit;width:24px;height:24px;border:1px solid var(--line);background:var(--panel);
  color:var(--fg);border-radius:6px;cursor:pointer;line-height:1}
.q-qty button:hover{border-color:var(--dim)}
.q-n{min-width:22px;text-align:center;font-size:13px;font-variant-numeric:tabular-nums}
.q-side{position:sticky;top:112px;border:1px solid var(--line);border-radius:12px;
  padding:18px;background:var(--panel)}
.q-total{padding-bottom:14px;margin-bottom:16px;border-bottom:1px solid var(--line)}
.q-total span{display:block;font-size:12px;color:var(--dim)}
.q-total b{display:block;font-size:28px;letter-spacing:-.02em;font-variant-numeric:tabular-nums;margin:2px 0 4px}
.q-pay{font-size:12px;color:var(--dim);line-height:1.5}
.q-side label.fld-l{display:block;font-size:12px;font-weight:600;margin-bottom:6px}
.q-side select{font:inherit;font-size:13.5px;width:100%;padding:8px 10px;border-radius:8px;
  border:1px solid var(--line);background:var(--panel);color:var(--fg)}
.q-why{font-size:11.5px;color:var(--dim);line-height:1.45;margin:6px 0 16px}
.q-opts .fld-l{margin-top:4px}
.q-opt{display:grid;grid-template-columns:auto 1fr;gap:2px 9px;padding:8px 0;
  border-top:1px solid var(--line);cursor:pointer}
.q-opt input{margin:3px 0 0;grid-row:span 2;align-self:start;accent-color:var(--accent)}
.q-oname{font-size:13px;display:flex;justify-content:space-between;gap:8px}
.q-oname em{font-style:normal;color:var(--accent);font-size:12px;font-variant-numeric:tabular-nums;white-space:nowrap}
.q-odesc{font-size:11.5px;color:var(--dim);line-height:1.45}
.q-break{margin-top:12px;border-top:1px solid var(--line);font-size:12.5px}
.q-break summary{cursor:pointer;padding:10px 0 4px;color:var(--dim);font-size:12px}
.q-line{display:flex;justify-content:space-between;gap:10px;padding:3px 0;color:var(--dim)}
.q-line b{font-weight:520;color:var(--fg);font-variant-numeric:tabular-nums}
.q-line.sub{border-top:1px dashed var(--line);margin-top:6px;padding-top:8px}
.q-note{font-size:11.5px;color:var(--warn);margin-top:6px;line-height:1.45}
.q-basis{margin-top:16px;padding-top:14px;border-top:1px solid var(--line);
  font-size:11.5px;color:var(--dim)}
.q-basis ul{margin:6px 0 0;padding-left:16px}
.q-basis li{margin-bottom:2px}
/* 견적 → 문의 CTA. 금액을 본 직후가 의사가 가장 강한 순간이다 */
.q-cta{display:block;text-align:center;margin-top:14px;padding:11px 16px;border-radius:9px;
  background:var(--accent);color:#fff;font-size:13.5px;font-weight:600;text-decoration:none}
.q-cta:hover{filter:brightness(1.08)}
.q-cta:focus-visible{outline:2px solid var(--fg);outline-offset:2px}
.q-cta-off{margin-top:14px;padding:10px 12px;border:1px dashed var(--line);border-radius:9px;
  font-size:11.5px;color:var(--dim);line-height:1.5}
.q-cta-off code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
${FOOTER_CSS}

/* 수주 가이드 탭 */
.dom-chips{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:22px}
.dom-chip{font:inherit;font-size:13.5px;padding:7px 15px;border-radius:999px;cursor:pointer;
  border:1px solid var(--line);background:var(--panel);color:var(--dim);transition:.12s}
.dom-chip:hover{color:var(--fg);border-color:var(--dim)}
.dom-chip[aria-selected="true"]{background:var(--fg);color:var(--bg);border-color:var(--fg)}
.dom-desc{font-size:14px;color:var(--dim);margin:0 0 18px}
.dom-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);gap:28px;align-items:start}
.dom-grid h4{font-size:11.5px;color:var(--dim);letter-spacing:.05em;margin:0 0 9px;font-weight:600}
.dom-grid h4 small{font-weight:400;letter-spacing:0;opacity:.8}
.dom-grid h4:not(:first-child){margin-top:20px}
.dom-ask{margin:0;padding-left:20px;display:flex;flex-direction:column;gap:9px;
  font-size:13.5px;line-height:1.55}
.dom-ask li::marker{color:var(--accent);font-weight:600}
.dom-watch{margin:18px 0 0;padding:11px 14px;border-left:3px solid var(--warn);
  background:var(--chip);border-radius:0 8px 8px 0;font-size:13px;color:var(--warn);line-height:1.55}
.dom-items{display:flex;flex-direction:column;gap:6px}
.dom-item{font:inherit;text-align:left;display:grid;grid-template-columns:150px 1fr;gap:10px;
  align-items:baseline;padding:8px 12px;border:1px solid var(--line);border-radius:9px;
  background:var(--panel);color:var(--fg);cursor:pointer;transition:border-color .12s}
.dom-item:hover{border-color:var(--accent)}
.dom-item code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11.5px;
  color:var(--accent)}
.dom-item span{font-size:12.5px;color:var(--dim);line-height:1.5}
.dom-scr{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:6px}
.dom-scr li{font-size:12.5px;background:var(--chip);color:var(--fg);
  padding:4px 11px;border-radius:6px}
.dom-sum{margin-top:12px;font-size:13.5px;font-weight:560}
.dom-sum small{font-weight:400;color:var(--dim)}
.dom-apply{font:inherit;font-size:13.5px;font-weight:600;margin-top:12px;cursor:pointer;
  background:var(--accent);color:#fff;border:none;border-radius:9px;padding:10px 18px}
.dom-apply:hover{filter:brightness(1.08)}
.v.flash{outline:2px solid var(--accent);outline-offset:3px}

.dark-scope{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:36px;padding:18px 20px;
  border:1px solid var(--line);border-radius:12px;background:var(--panel)}
.dark-scope h4{font-size:12px;margin:0 0 8px;color:var(--accent)}
.dark-scope .ex h4{color:var(--warn)}
.dark-scope ul{margin:0;padding-left:17px;font-size:12.5px;color:var(--dim);line-height:1.6}

${SCENES_CSS}
${SCENES_EXTRA_CSS}
${PREVIEW_FULL_CSS}
${LAYOUTS_CSS}
${LAYOUTS_MOBILE_CSS}
/* 쇼케이스 — 목업은 카드 폭에 맞춰 --v(=폭/960)로 통째로 줄어든다 */
.shots{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:22px}
.shot{display:flex;flex-direction:column;text-decoration:none;color:var(--fg);background:var(--panel);
  border:1px solid var(--line);border-radius:14px;overflow:hidden;
  content-visibility:auto;contain-intrinsic-size:auto 300px;
  transition:transform .16s cubic-bezier(.2,.7,.3,1),box-shadow .16s,border-color .16s}
.shot[hidden]{display:none}
/* 모바일 보기 — 카드가 폰 비율(9:19)로 세로로 길어지므로 폭을 줄여 한 줄에 더 놓는다 */
.shots.is-mob{grid-template-columns:repeat(auto-fill,minmax(230px,1fr))}
.shot .fv-wrap{border-bottom:1px solid var(--line);pointer-events:none}
.shot:hover,.shot:focus-visible{transform:translateY(-4px);border-color:var(--dim);
  box-shadow:0 2px 4px rgba(0,0,0,.04),0 14px 30px rgba(0,0,0,.09)}
.shot:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.shot-meta{padding:11px 14px 12px;display:flex;align-items:baseline;justify-content:space-between;gap:10px}
.shot-meta b{font-size:14px;font-weight:600;letter-spacing:-.01em}
.shot-meta span{font-size:11.5px;color:var(--dim);text-align:right}
@media (prefers-reduced-motion:reduce){.shot:hover,.shot:focus-visible{transform:none}}
${SKINS.map(skinCss).join('\n')}
${MOTION_BASE_CSS}
${SKINS.map(s => motionCss(s.id)).join('\n')}
${WIRE_CSS}
@media (max-width:900px){
  .quote,.dom-grid,.sb-grid{grid-template-columns:1fr}
  .dom-item{grid-template-columns:118px 1fr}
  .q-side{position:static}
  .dark-scope,.pair,.duo,.ref-body{grid-template-columns:1fr}
  .panel-head{flex-direction:column}
}
@media (max-width:640px){
  .wrap{padding:0 16px 60px}
  .tabs{overflow-x:auto;scrollbar-width:none}
  .sheet{padding:0;align-items:stretch}
  .sheet-in{border-radius:0;width:100%}
  .sb{padding:16px 16px 14px}
  .sb-must li{grid-template-columns:1fr;gap:2px}   /* 좁으면 키/설명을 두 줄로 — 자르지 않는다 */
  .sb-head{grid-template-columns:auto minmax(0,1fr)}
  .sb-lv{grid-column:2;justify-self:start;margin-top:2px}
}
/* 움직임 최소화 요청은 전역으로 존중한다 — 카드 리프트·화살표·진행바 전부 해당 */
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;
    transition-duration:.01ms!important;scroll-behavior:auto!important}
  .skin:hover,.skin:focus-visible{transform:none}
}
</style></head><body>
${ICON_SPRITE}${EXTRA_SPRITE}
<div class="top">
  <div class="wrap" style="padding-bottom:0">
    <div class="brand"><h1>A-Dew, design-store</h1><span>디자인 레퍼런스 저장소</span></div>
    <div class="tabs" role="tablist">
      <button class="tab" role="tab" data-p="design" aria-selected="true">디자인 <b>${SKINS.length}</b></button>
      <button class="tab" role="tab" data-p="showcase" aria-selected="false">쇼케이스 <b>${shots.length}</b></button>
      ${SHOW_SKILL ? `<button class="tab" role="tab" data-p="skill" aria-selected="false">디자인 스킬 <b>${SKILL_COUNT}</b></button>` : ''}
      <button class="tab" role="tab" data-p="pattern" aria-selected="false">패턴 <b>${GROUPS.reduce((n, g) => n + g.variants.length, 0)}</b></button>
      ${SHOW_REF ? `<button class="tab" role="tab" data-p="ref" aria-selected="false">레퍼런스 <b>${refs.length}</b></button>` : ''}
      ${SHOW_INTAKE ? `<button class="tab" role="tab" data-p="intake" aria-selected="false">수주 가이드</button>` : ''}
      <button class="tab" role="tab" data-p="quote" aria-selected="false">견적</button>
    </div>
  </div>
</div>

<div class="wrap">
  <section id="p-design" role="tabpanel">
    <div class="panel-head">
      <div>
        <h2 class="panel-h">스킨 ${SKINS.length}종</h2>
        <p class="panel-lede">각 카드는 그 스킨이 <strong>가장 잘 맞는 분야의 실제 화면 조각</strong>입니다 —
        커머스·금융·모니터링·미디어가 각자의 옷을 입고 있습니다.
        카드를 열면 그 분야의 전체 레이아웃이 나오고, <strong>사이드바·상단 메뉴를 누르면 화면이 실제로 전환됩니다</strong>.</p>
      </div>
      <div class="mode-switch" role="group" aria-label="모드">
        <button type="button" data-mode="base" aria-selected="true">기본</button>
        <button type="button" data-mode="light" aria-selected="false">라이트</button>
        <button type="button" data-mode="dark" aria-selected="false">다크</button>
      </div>
    </div>
    <div class="dz-bar">
      <div class="fchips" role="group" aria-label="분야 · 모션으로 거르기">
        <button class="fchip" type="button" data-f="all" aria-pressed="true">전체 <b>${SKINS.length}</b></button>
        ${DOMAINS.map(d =>
    `<button class="fchip" type="button" data-f="${d.id}" data-name="${esc(d.name)}"
       aria-pressed="false">${esc(d.name)} <b>${domCount(d.id)}</b></button>`).join('')}
        <button class="fchip fchip-calm" type="button" data-calm aria-pressed="false"
          title="움직임이 거의 없는 스킨만 — 공공·B2B·에디토리얼처럼 차분해야 하는 곳"
          >깔끔한 모션만 <b>${SKINS.filter(s => motionInfo(s.id).level === 'calm').length}</b></button>
      </div>
      <p class="dz-count" role="status">${SKINS.length}종 표시 중</p>
    </div>
    <div class="skins">${skinCards}</div>
  </section>

  <section id="p-showcase" role="tabpanel" hidden>
    <div class="panel-head">
      <div>
        <h2 class="panel-h">완성 화면 ${shots.length}장</h2>
        <p class="panel-lede">스킨 ${SKINS.length}종이 각자 맞는 분야에서 <strong>실제로 만든 화면</strong>입니다 — 목록·상세·대시보드·설정까지.
        화면을 누르면 그 스킨 페이지의 <strong>같은 화면</strong>이 열리고, 거기서 메뉴를 눌러 다른 화면으로 옮겨갈 수 있습니다.
        마음에 드는 화면이 있으면 그 주소를 그대로 보내 주세요.
        <strong>모바일</strong>을 누르면 같은 화면이 휴대폰 폭에 맞춰 다시 짜인 모습을 볼 수 있습니다.</p>
      </div>
      <div class="mode-switch dev-switch" role="group" aria-label="기기">
        <button type="button" data-dev="desk" aria-selected="true">데스크톱</button>
        <button type="button" data-dev="mob" aria-selected="false">모바일</button>
      </div>
    </div>
    <div class="dz-bar">
      <div class="fchips" role="group" aria-label="분야로 거르기">
        <button class="fchip" type="button" data-sf="all" aria-pressed="true">전체 <b>${shots.length}</b></button>
        ${DOMAINS.map(d => `<button class="fchip" type="button" data-sf="${d.id}" data-name="${esc(d.name)}"
       aria-pressed="false">${esc(d.name)} <b>${shotDomCount(d.id)}</b></button>`).join('')}
      </div>
      <p class="sf-count" role="status">${shots.length}장 표시 중</p>
    </div>
    <div class="shots">${shotCards}</div>
  </section>

  ${SHOW_SKILL ? `<section id="p-skill" role="tabpanel" hidden>
    <div class="panel-head">
      <div>
        <h2 class="panel-h">디자인 스킬 <span class="panel-sub">${SKILLBOOK.length}개 분야 · ${SKILL_COUNT}개 항목</span></h2>
        <p class="panel-lede">다른 탭이 <strong>무엇을 만들까</strong>를 다룬다면 여기는 <strong>잘 만들었는가</strong>를 다룹니다.
        순서는 취향이 아니라 영향도입니다 — 위에서부터 지키고, 시간이 모자라면 아래를 버립니다.
        외주를 줄 때는 요구사항으로, 받아올 때는 검수 기준으로 그대로 씁니다.</p>
      </div>
    </div>
    <nav class="sb-nav" aria-label="분야 바로가기">
      ${SKILLBOOK.map(c => `<a href="#sb-${c.id}" class="sb-link lv-${c.level.toLowerCase()}">
        <span class="sb-link-n">${c.pri}</span>${esc(c.name)}</a>`).join('')}
    </nav>
    <div class="sb-grid">${skillCards}</div>

    <section class="ck-wrap" id="sb-checklist">
      <div class="ck-head">
        <div>
          <h3>납품 검수 체크리스트</h3>
          <p>결과물을 받았을 때 이 순서로 봅니다. 위 ${SKILLBOOK.length}개 분야를 실제로 확인 가능한 ${CHECK_COUNT}줄로 줄인 것입니다.</p>
        </div>
        <div class="ck-score">
          <b id="ck-n">0</b><span>/ ${CHECK_COUNT}</span>
          <button type="button" class="ck-reset" id="ck-reset">초기화</button>
        </div>
      </div>
      <div class="ck-bar"><i id="ck-fill"></i></div>
      <div class="ck-grid">${checkGroups}</div>
    </section>
  </section>` : ''}

  <section id="p-pattern" role="tabpanel" hidden>
    <div class="panel-head"><p class="panel-lede">스킨을 정했으면 형태를 고릅니다. 여기는 색·타이포를 뺀 <strong>구조</strong>만 다룹니다.
    외주에는 <code>shell-rail</code>, <code>auth-split</code> 처럼 ID로 지정하면 해석 여지가 없어집니다.</p></div>
    ${patternSections}
  </section>

  ${SHOW_REF ? `<section id="p-ref" role="tabpanel" hidden>
    <div class="panel-head">
      <div>
        <h2 class="panel-h">레퍼런스 <span class="panel-sub">${refs.length}건</span></h2>
        <p class="panel-lede">실제로 보고 저장한 화면입니다. 태그가 겹치는 <strong>스킨·패턴 카드에 자동으로 연결</strong>됩니다.
        카드를 열면 왜 저장했는지, 무엇을 가져오고 무엇을 버릴지가 나옵니다.
        축별로 정밀하게 거를 때는 <a href="gallery.html">갤러리</a>를 씁니다.</p>
      </div>
    </div>
    ${refWarn}
    ${refs.length ? `<div class="dz-bar">
      <div class="fchips" role="group" aria-label="스킨으로 거르기">
        <button class="fchip" type="button" data-rf="all" data-name="전체" aria-pressed="true">전체 <b>${refs.length}</b></button>
        ${refStyleChips}
      </div>
      <p class="ref-count" role="status">${refs.length}건 표시 중</p>
    </div>
    <div class="vgrid">${refCards}</div>` : refEmpty}
  </section>` : ''}

  ${SHOW_INTAKE ? `<section id="p-intake" role="tabpanel" hidden>
    <div class="panel-head"><p class="panel-lede">외주 문의가 왔을 때 클라이언트와 <strong>같이 보는 탭</strong>입니다.
    분야를 고르면 물어볼 질문 → 그 분야의 관례 레이아웃 → 어울리는 스킨 → 필수 화면 순서로 좁혀지고,
    마지막 버튼으로 견적 탭에 그대로 넘어갑니다. 데이터는 <code>patterns/domains.mjs</code>.</p></div>
    <div class="dom-chips">${domainChips}</div>
    ${domainPanels}
  </section>` : ''}

  <section id="p-quote" role="tabpanel" hidden>
    <div class="panel-head"><p class="panel-lede">만들 서비스와 필요한 화면을 고르면 예상 금액이 바로 나옵니다.
    상담 전에 대략적인 규모를 가늠하는 용도이고, 최종 금액은 요구사항을 확인한 뒤 확정됩니다.</p></div>
    <div class="quote">
      <div class="q-main">
        <p class="q-step"><b>1</b>어떤 서비스를 만드시나요?</p>
        <p class="q-hint">고르면 보통 필요한 화면이 자동으로 채워집니다. 아래에서 더하거나 빼면 됩니다.</p>
        <div class="q-presets">${presetChips}</div>
        <p class="q-step"><b>2</b>필요한 화면을 고르세요</p>
        <p class="q-hint">금액은 화면 1개 기준입니다. 같은 화면이 여러 장이면 수량을 늘리세요.</p>
        ${quoteRows}
      </div>
      <aside class="q-side" aria-live="polite">
        <div class="q-total"><span>예상 금액 (VAT 별도 · 만 원 단위)</span><b id="q-total">${fmt(0)}</b>
          <div class="q-pay" id="q-pay">${esc(TERMS.payment)}</div>
          <div class="q-note" id="q-min" hidden></div></div>
        <label class="fld-l" for="q-skin">디자인 스타일</label>
        <select id="q-skin">${SKINS.map(s => {
  const f = SKIN_TIER[s.id]?.factor ?? 1
  return `<option value="${s.id}">${esc(s.name)} — ${f > 1 ? `작업량 ${pct(f - 1)}` : '기본'}</option>`
}).join('')}</select>
        <p class="q-why" id="q-why"></p>
        <div class="q-opts"><span class="fld-l">추가 옵션</span>${optionRows}</div>
        <details class="q-break"><summary>금액 내역 보기</summary><div id="q-break"></div></details>
        ${hasMail() ? `<a class="q-cta mailto" data-u="${CONTACT.mail.user}" data-d="${CONTACT.mail.domain}"
           id="q-cta">이 구성으로 상담 요청하기 →</a>` : `<div class="q-cta-off">
           문의 버튼을 켜려면 <code>patterns/contact.mjs</code>의 <code>mail</code>을 채우세요.</div>`}
        <div class="q-basis"><strong>기본으로 포함된 것</strong>
          <ul>${BASIS.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
          <p>${esc(TERMS.staging)}</p>
        </div>
      </aside>
    </div>
    ${darkScope}
  </section>
  ${footer()}
</div>
${refSheets}
<script>
const DATA = ${CLIENT_DATA}
${MAIL_JS}

/* 탭 — JS 가 돌 때만 잉크를 단다. 안 돌면 기존 border 밑줄이 그대로 보인다 */
const tabs = [...document.querySelectorAll('.tab')]
const tabBar = document.querySelector('.tabs')
const ink = document.createElement('i')
ink.className = 'tab-ink'
ink.setAttribute('aria-hidden', 'true')
tabBar.append(ink)
tabBar.classList.add('has-ink')
function placeInk(){
  const t = tabs.find(x => x.getAttribute('aria-selected') === 'true')
  if (t) ink.style.transform = 'translateX(' + t.offsetLeft + 'px) scaleX(' + t.offsetWidth + ')'
}
function show(p){
  tabs.forEach(t => t.setAttribute('aria-selected', t.dataset.p === p))
  for (const t of tabs) document.getElementById('p-' + t.dataset.p).hidden = t.dataset.p !== p
  const panel = document.getElementById('p-' + p)
  panel.classList.remove('p-in'); void panel.offsetWidth; panel.classList.add('p-in')
  placeInk()
  history.replaceState(null, '', '#' + p)
}
// 첫 자리는 미끄러지지 않고 바로 놓는다
ink.style.transition = 'none'
placeInk()
requestAnimationFrame(() => { ink.style.transition = '' })
addEventListener('resize', placeInk)
tabs.forEach(t => t.addEventListener('click', () => show(t.dataset.p)))
if (tabs.some(t => t.dataset.p === location.hash.slice(1))) show(location.hash.slice(1))

/* 라이트/다크 스위치 — 모드 클래스는 대상 엘리먼트 자신에게 붙인다.
   조상 셀렉터로 하면 라이트 페이지 안의 다크 프리뷰가 조상 규칙과 충돌한다. */
document.querySelectorAll('.mode-switch:not(.dev-switch)').forEach(sw => {
  const targets = () => sw.dataset.target
    ? [document.getElementById(sw.dataset.target)]
    : [...document.querySelectorAll('.skin')]
  sw.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
    const m = b.dataset.mode
    sw.querySelectorAll('button').forEach(x => x.setAttribute('aria-selected', x === b))
    for (const t of targets()) {
      if (!t) continue
      // 'base' = 각 스킨의 고유 모드. 카드 그리드가 10개의 서로 다른 정체성으로 읽히게 하는 기본값.
      const mode = m === 'base' ? (t.dataset.base || 'light') : m
      t.classList.toggle('mode-dark', mode === 'dark')
      t.classList.toggle('mode-light', mode === 'light')
    }
  }))
})

/* 스킨 상세 */
// 라이트/다크를 눌러 보고 있었다면 그 모드로 연다. '기본'일 때는 스킨 고유 모드에 맡긴다.
function forcedMode(){
  const base = document.querySelector('.mode-switch button[data-mode="base"]')
  if (base && base.getAttribute('aria-selected') === 'true') return ''
  const on = document.querySelector('.mode-switch button[data-mode][aria-selected="true"]')
  return on ? '#/' + on.dataset.mode : ''
}
const openSkin = id => { location.href = 'skins/' + id + '.html' + forcedMode() }
document.querySelectorAll('.skin').forEach(c => {
  c.addEventListener('click', () => openSkin(c.dataset.id))
  c.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSkin(c.dataset.id) }
  })
})

/* 쇼케이스 필터 — 디자인 탭과 같은 분야 기준 */
const shotEls = [...document.querySelectorAll('.shot')]
const sfChips = [...document.querySelectorAll('.fchip[data-sf]')]
const sfCount = document.querySelector('.sf-count')

/* 쇼케이스 기기 전환 — 마크업은 그대로, .is-mob 아래 CSS 가 화면을 폰 폭으로 다시 쌓는다 */
const devBtns = [...document.querySelectorAll('.dev-switch button')]
devBtns.forEach(b => b.addEventListener('click', () => {
  devBtns.forEach(x => x.setAttribute('aria-selected', x === b))
  const mob = b.dataset.dev === 'mob'
  document.querySelector('.shots').classList.toggle('is-mob', mob)
  // 눌렀을 때 스킨 페이지도 같은 기기로 열리게 — #view/mobile
  for (const c of shotEls) c.href = c.href.split('#')[0] + (mob ? '#' + c.dataset.v + '/mobile' : c.dataset.v ? '#' + c.dataset.v : '')
}))

sfChips.forEach(chip => chip.addEventListener('click', () => {
  const f = chip.dataset.sf
  sfChips.forEach(x => x.setAttribute('aria-pressed', x === chip))
  let n = 0
  for (const c of shotEls) {
    const on = f === 'all' || c.dataset.doms.split(' ').includes(f)
    c.hidden = !on
    if (on) n++
  }
  sfCount.textContent = f === 'all' ? n + '장 표시 중' : chip.dataset.name + ' ' + n + '장'
}))

/* 디자인 탭 필터 — 수주 가이드의 분야(data-doms) × "깔끔한 모션만"(data-motion).
   한 스킨이 여러 분야에 걸칠 수 있다. 위의 라이트/다크 스위치는 보기 방식만 바꾸므로 필터와 무관. */
const skinCards = [...document.querySelectorAll('.skin')]
const dzCount = document.querySelector('.dz-count')
const domChips = [...document.querySelectorAll('.fchip[data-f]')]
const calmChip = document.querySelector('.fchip[data-calm]')
const skinVisible = ${skinVisible.toString()}
let dz = 'all'
function applySkinFilter(){
  const calm = calmChip.getAttribute('aria-pressed') === 'true'
  let n = 0
  for (const c of skinCards) {
    const on = skinVisible(c.dataset.doms.split(' '), c.dataset.motion, dz, calm)
    c.hidden = !on          // hidden 은 탭 순서에서도 빼준다
    if (on) n++
  }
  const name = dz === 'all' ? '' : domChips.find(x => x.dataset.f === dz).dataset.name + ' 추천 '
  dzCount.textContent = (dz === 'all' && !calm)
    ? n + '종 표시 중'
    : name + (calm ? '깔끔한 모션 ' : '') + n + '종' + (n ? '' : ' · 조건을 하나 풀어보세요')
}
domChips.forEach(chip => chip.addEventListener('click', () => {
  dz = chip.dataset.f
  domChips.forEach(x => x.setAttribute('aria-pressed', x === chip))
  applySkinFilter()
}))
calmChip.addEventListener('click', () => {
  calmChip.setAttribute('aria-pressed', calmChip.getAttribute('aria-pressed') !== 'true')
  applySkinFilter()
})

/* 스크롤 등장 — 한 번에 보이는 카드끼리 40ms 씩 늦게, 최대 8장까지만 늦춘다.
   숨은 탭의 카드는 교차하지 않다가 탭이 열려 보일 때 들어온다. */
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  document.querySelector('.skins').classList.add('m-reveal')
  const io = new IntersectionObserver(es => {
    let d = 0
    for (const e of es) {
      if (!e.isIntersecting) continue
      e.target.style.setProperty('--d', Math.min(d++, 8))
      e.target.classList.add('in')
      io.unobserve(e.target)
    }
  }, { rootMargin: '0px 0px -40px 0px' })
  skinCards.forEach(c => io.observe(c))
}

/* 레퍼런스 — 필터 / 상세 시트 / 패턴에서 넘어오기 */
const refCards = [...document.querySelectorAll('.ref')]
const refCountEl = document.querySelector('.ref-count')
const refChips = [...document.querySelectorAll('[data-rf]')]

function refFilter(pred, label){
  let n = 0
  for (const c of refCards) { const on = pred(c); c.hidden = !on; if (on) n++ }
  if (refCountEl) refCountEl.textContent = label ? label + ' ' + n + '건' : n + '건 표시 중'
}
refChips.forEach(chip => chip.addEventListener('click', () => {
  const f = chip.dataset.rf
  refChips.forEach(x => x.setAttribute('aria-pressed', x === chip))
  refFilter(c => f === 'all' || c.dataset.styles.split(' ').includes(f),
    f === 'all' ? '' : chip.dataset.name)
}))

/* 패턴 카드 → 레퍼런스 탭. 태그가 겹치는 것만 남긴다 — 이게 '자동 연결'의 실체다 */
document.querySelectorAll('[data-refslugs]').forEach(b => b.addEventListener('click', e => {
  e.stopPropagation()
  const want = new Set(b.dataset.refslugs.split(' '))
  refChips.forEach(x => x.setAttribute('aria-pressed', false))
  refFilter(c => want.has(c.dataset.slug), b.dataset.reflabel + ' 관련')
  show('ref')
  window.scrollTo({ top: 0 })
}))

/* 상세 시트 */
const openRef = i => {
  const sh = document.getElementById('rs-' + i)
  if (!sh) return
  sh.hidden = false
  document.body.style.overflow = 'hidden'
  sh.querySelector('.close').focus()
}
const closeRefs = () => {
  document.querySelectorAll('.sheet').forEach(x => { x.hidden = true })
  document.body.style.overflow = ''
}
refCards.forEach(c => {
  const go = () => openRef(c.dataset.i)
  c.addEventListener('click', go)
  c.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go() }
  })
})
document.querySelectorAll('.sheet').forEach(sh => {
  sh.addEventListener('click', e => { if (e.target === sh) closeRefs() })
  sh.querySelector('.close').addEventListener('click', closeRefs)
})
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeRefs() })

/* 검수 체크리스트 — 진행률만 보여준다. 저장은 되면 좋고 안 되면 그만(file:// 은 막히는 경우가 있다) */
const CK_KEY = 'adew-checklist'
const cks = [...document.querySelectorAll('[data-ck]')]
const ckFill = document.getElementById('ck-fill')
const ckN = document.getElementById('ck-n')
const store = (fn, dflt) => { try { return fn() } catch { return dflt } }

function ckSync(save){
  const done = cks.filter(c => c.checked).length
  ckN.textContent = done
  ckFill.style.width = (cks.length ? done / cks.length * 100 : 0) + '%'
  if (save) store(() => localStorage.setItem(CK_KEY,
    JSON.stringify(cks.filter(c => c.checked).map(c => c.dataset.ck))))
}
const saved = store(() => JSON.parse(localStorage.getItem(CK_KEY) || '[]'), [])
if (Array.isArray(saved)) for (const c of cks) c.checked = saved.includes(c.dataset.ck)
if (ckN) {  // 디자인 스킬 탭을 숨기면 체크리스트도 없다
  cks.forEach(c => c.addEventListener('change', () => ckSync(true)))
  document.getElementById('ck-reset').addEventListener('click', () => {
    cks.forEach(c => { c.checked = false })
    ckSync(true)
  })
  ckSync(false)
}


/* 견적 — pricing.mjs 의 quote() 와 같은 순서로 계산한다 */
const picks = {}
const fmt = n => '₩' + Math.round(n).toLocaleString('ko-KR')
const darkRate = id => (id in DATA.dark.bySkin) ? DATA.dark.bySkin[id] : DATA.dark.base
const pct = r => '+' + Math.round(r * 100) + '%'
/* 손님에게 보이는 예상 금액은 만 원 단위로 — 원 단위까지 찍으면 확정가처럼 읽힌다. 내역은 정확한 값 그대로 */
const won = n => fmt(Math.round(n / 10000) * 10000)

function calc(){
  const skinId = document.getElementById('q-skin').value
  const chosen = [...document.querySelectorAll('.q-opts input:checked')].map(i => i.value)

  const lines = DATA.screens.filter(s => picks[s.id] > 0)
    .map(s => ({ name: s.name, qty: picks[s.id], amount: s.price * picks[s.id] }))
  const screensSubtotal = lines.reduce((n, l) => n + l.amount, 0)
  const factor = DATA.tiers[skinId] || 1
  const skinAdjust = screensSubtotal * (factor - 1)
  const base = screensSubtotal + skinAdjust

  const addons = []
  if (chosen.includes('dark')) addons.push({ name: '다크모드', rate: darkRate(skinId), amount: base * darkRate(skinId) })
  for (const o of DATA.options) if (chosen.includes(o.id)) addons.push({ name: o.name, rate: o.rate, amount: base * o.rate })

  const sum = base + addons.reduce((n, a) => n + a.amount, 0)
  const belowMin = sum > 0 && sum < DATA.minimum

  const total = Math.round((belowMin ? DATA.minimum : sum) / 10000) * 10000
  const row = (l, v, cls) => '<div class="q-line ' + (cls||'') + '"><span>' + l + '</span><b>' + v + '</b></div>'
  let html = ''
  if (!lines.length) {
    html = '<div class="q-line"><span>아직 고른 화면이 없습니다</span></div>'
  } else {
    html += lines.map(l => row(l.name + (l.qty > 1 ? ' ×' + l.qty : ''), fmt(l.amount))).join('')
    html += row('화면 디자인 합계', fmt(screensSubtotal), 'sub')
    if (skinAdjust) html += row('스타일 작업량 ' + pct(factor - 1), '+' + fmt(skinAdjust))
    html += addons.map(a => row(a.name, '+' + fmt(a.amount))).join('')
  }
  document.getElementById('q-break').innerHTML = html
  document.getElementById('q-total').textContent = fmt(total)
  /* 계약금 50% / 잔금 50% — 실제로 언제 얼마를 내는지가 총액보다 먼저 궁금하다 */
  const deposit = Math.round(total / 2)
  document.getElementById('q-pay').textContent = total
    ? '계약금 ' + fmt(deposit) + ' · 완료 후 잔금 ' + fmt(Math.round(total) - deposit)
    : '화면을 고르면 금액이 계산됩니다'

  const minEl = document.getElementById('q-min')
  minEl.hidden = !belowMin
  if (belowMin) minEl.textContent = '최소 진행 금액 ' + fmt(DATA.minimum) + '부터 작업합니다 (고른 구성 약 ' + won(sum) + ').'

  /* 스타일·옵션마다 지금 구성에서 얼마가 붙는지 원 단위로 보여준다 */
  document.getElementById('q-why').textContent = (factor > 1
    ? (base ? '이 스타일은 약 +' + won(skinAdjust) + ' — ' : '')
    : '추가 비용 없는 기본 스타일 — ') + (DATA.tierWhy[skinId] || '')
  document.querySelectorAll('.q-oamt').forEach(el => {
    const id = el.dataset.o
    const rate = id === 'dark' ? darkRate(skinId) : DATA.options.find(o => o.id === id).rate
    el.textContent = base ? '+' + won(base * rate) : pct(rate)
  })

  /* 문의 메일 본문을 지금 선택으로 채운다 — 클라이언트가 견적을 그대로 보낼 수 있게 */
  const cta = document.getElementById('q-cta')
  if (cta) {
    const skinName = (DATA.skins.find(x => x.id === skinId) || {}).name || skinId
    const body = [
      '문의 드립니다.', '',
      '■ 화면',
      ...(lines.length ? lines.map(l => '  - ' + l.name + (l.qty > 1 ? ' ×' + l.qty : '')) : ['  (미선택)']),
      '',
      '■ 디자인 스타일: ' + skinName,
      '■ 추가 옵션: ' + (addons.length ? addons.map(a => a.name).join(', ') : '없음'),
      '■ 예상 금액: ' + fmt(total) + ' (VAT 별도)',
      '', '— design-store 견적 탭에서 계산한 예상 금액입니다.',
    ].join(String.fromCharCode(10))
    cta.href = 'mailto:' + mailAddr(cta)
      + '?subject=' + encodeURIComponent('[design-store] 상담 요청 — ' + skinName)
      + '&body=' + encodeURIComponent(body)
  }
}

/* 수주 가이드 */
document.querySelectorAll('.dom-chip').forEach(c => c.addEventListener('click', () => {
  document.querySelectorAll('.dom-chip').forEach(x => x.setAttribute('aria-selected', x === c))
  document.querySelectorAll('.dom-panel').forEach(p => { p.hidden = p.id !== 'dom-' + c.dataset.d })
}))
document.querySelectorAll('[data-pat]').forEach(b => b.addEventListener('click', () => {
  show('pattern')
  const el = document.getElementById(b.dataset.pat)
  if (!el) return
  el.scrollIntoView({ block: 'center' })
  el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), 1800)
}))
document.querySelectorAll('[data-skin]').forEach(b =>
  b.addEventListener('click', () => openSkin(b.dataset.skin)))
function setQty(rowEl, n){
  const id = rowEl.dataset.id
  picks[id] = Math.max(0, Math.min(20, n))
  rowEl.querySelector('.q-n').textContent = picks[id]
  rowEl.querySelector('.q-ck').checked = picks[id] > 0
  rowEl.classList.toggle('on', picks[id] > 0)
}
function applyPreset(map){
  document.querySelectorAll('.q-row').forEach(r => setQty(r, map[r.dataset.id] || 0))
  calc()
}
document.querySelectorAll('.dom-apply').forEach(b => b.addEventListener('click', () => {
  applyPreset(JSON.parse(b.dataset.apply))
  show('quote')
}))
document.querySelectorAll('.q-preset').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.q-preset').forEach(x => x.setAttribute('aria-pressed', x === b))
  applyPreset(JSON.parse(b.dataset.apply))
}))
/* 직접 손대면 더 이상 그 분야 기본 구성이 아니다 */
const unpress = () => document.querySelectorAll('.q-preset').forEach(x => x.setAttribute('aria-pressed', false))
document.querySelectorAll('.q-ck').forEach(c => c.addEventListener('change', () => {
  setQty(c.closest('.q-row'), c.checked ? 1 : 0)
  unpress(); calc()
}))
document.querySelectorAll('.q-qty button').forEach(b => b.addEventListener('click', () => {
  const rowEl = b.closest('.q-row')
  setQty(rowEl, (picks[rowEl.dataset.id] || 0) + Number(b.dataset.d))
  unpress(); calc()
}))
document.getElementById('q-skin').addEventListener('change', calc)
document.querySelectorAll('.q-opts input').forEach(i => i.addEventListener('change', calc))
calc()
</script>
</body></html>`

const out = join(REPO, 'index.html')
writeFileSync(out, html)
console.log(`✓ ${out}  (스킨 ${SKINS.length}×2모드 · 패턴 ${GROUPS.reduce((n, g) => n + g.variants.length, 0)} · 레퍼런스 ${refs.length} · 화면단가 ${SCREENS.length})`)
