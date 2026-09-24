import { readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { REPO, esc, md } from './lib.mjs'
import { TOKENS_CSS } from './theme.mjs'

const MIME = { webp: 'image/webp', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', avif: 'image/avif' }

const dataUri = p => {
  const ext = p.split('.').pop().toLowerCase()
  return `data:${MIME[ext] || 'application/octet-stream'};base64,${readFileSync(p).toString('base64')}`
}

const FACETS = ['style', 'layout', 'page', 'components', 'color', 'density', 'verdict']

/**
 * @param opts.embed  true면 이미지를 data URI로 인라인 (자체완결 · 외주 공유용)
 *                    false면 상대경로 (로컬 브라우징용)
 * @param opts.outDir embed=false일 때 상대경로 기준 디렉터리
 */
export function renderPage({ title, subtitle, refs, embed = false, outDir = REPO }) {
  const src = (ref, file) => {
    const abs = join(ref.dir, file)
    return embed ? dataUri(abs) : relative(outDir, abs)
  }

  const facetValues = {}
  for (const f of FACETS) {
    const set = new Set()
    for (const r of refs) for (const v of [].concat(r.fm[f] || [])) if (v) set.add(v)
    if (set.size) facetValues[f] = [...set].sort()
  }

  const cards = refs.map((r, i) => {
    const tags = FACETS.flatMap(f => [].concat(r.fm[f] || []).filter(Boolean).map(v => `${f}:${v}`))
    const thumb = r.images[0] ? `<img loading="lazy" src="${src(r, r.images[0])}" alt="">` : '<div class="noimg">이미지 없음</div>'
    const chips = ['style', 'layout', 'page'].flatMap(f => [].concat(r.fm[f] || [])).filter(Boolean)
      .map(v => `<span class="chip">${esc(v)}</span>`).join('')
    const verdict = r.fm.verdict ? `<span class="verdict v-${esc(r.fm.verdict)}">${esc(r.fm.verdict)}</span>` : ''
    return `<article class="card" data-i="${i}" data-tags="${esc(tags.join(' '))}">
  <div class="thumb">${thumb}</div>
  <div class="meta">
    <div class="row"><strong>${esc(r.fm.product || r.slug)}</strong>${verdict}</div>
    <div class="slug">${esc(r.slug)}</div>
    <div class="chips">${chips}</div>
  </div>
</article>`
  }).join('\n')

  const details = refs.map((r, i) => {
    const imgs = r.images.map(f => `<figure><img loading="lazy" src="${src(r, f)}" alt="${esc(f)}"><figcaption>${esc(f)}</figcaption></figure>`).join('')
    const sec = (t, c, cls = '') => c ? `<section class="${cls}"><h4>${t}</h4>${md(c)}</section>` : ''
    const allTags = FACETS.map(f => {
      const v = [].concat(r.fm[f] || []).filter(Boolean)
      return v.length ? `<dt>${f}</dt><dd>${v.map(x => `<span class="chip">${esc(x)}</span>`).join('')}</dd>` : ''
    }).join('')
    return `<div class="detail" id="d-${i}" hidden>
  <header>
    <div><h3>${esc(r.fm.product || r.slug)}</h3><div class="slug">${esc(r.slug)}</div></div>
    <button class="close" aria-label="닫기">✕</button>
  </header>
  <div class="detail-body">
    <div class="shots">${imgs || '<p class="noimg">이미지 없음</p>'}</div>
    <aside>
      ${r.fm.source ? `<a class="src" href="${esc(r.fm.source)}" target="_blank" rel="noopener">원본 열기 ↗</a>` : ''}
      ${sec('Why', r.why)}
      ${sec('Highlights', r.highlights)}
      ${sec("Don't take", r.dontTake, 'dont')}
      <dl class="tags">${allTags}</dl>
    </aside>
  </div>
</div>`
  }).join('\n')

  const filters = Object.entries(facetValues).map(([f, vals]) => `<div class="facet">
  <span class="facet-name">${f}</span>
  ${vals.map(v => `<button class="f" data-tag="${esc(f)}:${esc(v)}">${esc(v)}</button>`).join('')}
</div>`).join('')

  return `<!doctype html>
<html lang="ko"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<style>
${TOKENS_CSS}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);
  font:15px/1.6 ui-sans-serif,-apple-system,"Pretendard","Apple SD Gothic Neo",system-ui,sans-serif;
  -webkit-font-smoothing:antialiased}
.wrap{max-width:1400px;margin:0 auto;padding:32px 24px 80px}
h1{font-size:22px;margin:0 0 4px;letter-spacing:-.01em}
.sub{color:var(--dim);font-size:14px;margin:0 0 24px}
.filters{display:flex;flex-direction:column;gap:8px;padding:14px 16px;background:var(--panel);
  border:1px solid var(--line);border-radius:var(--radius);margin-bottom:8px}
.facet{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.facet-name{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--dim);
  width:88px;flex:none}
button.f{font:inherit;font-size:12px;padding:3px 9px;border-radius:999px;cursor:pointer;
  border:1px solid var(--line);background:transparent;color:var(--dim);transition:all .12s}
button.f:hover{color:var(--fg);border-color:var(--dim)}
button.f[aria-pressed="true"]{background:var(--fg);color:var(--bg);border-color:var(--fg)}
.bar{display:flex;justify-content:space-between;align-items:center;margin:0 0 20px;
  font-size:13px;color:var(--dim)}
.bar button{font:inherit;background:none;border:none;color:var(--accent);cursor:pointer;padding:0}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:18px}
.card{background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);
  overflow:hidden;cursor:pointer;transition:transform .12s,box-shadow .12s}
.card:hover{transform:translateY(-2px);box-shadow:var(--shadow)}
.card.hide{display:none}
.thumb{aspect-ratio:16/10;background:var(--chip);overflow:hidden;display:flex}
.thumb img{width:100%;height:100%;object-fit:cover;object-position:top center;display:block}
.noimg{margin:auto;color:var(--dim);font-size:12px}
.meta{padding:11px 13px 13px}
.row{display:flex;justify-content:space-between;align-items:center;gap:8px}
.slug{font-size:11px;color:var(--dim);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;margin-top:1px}
.chips{display:flex;flex-wrap:wrap;gap:4px;margin-top:9px}
.chip{font-size:11px;padding:2px 7px;border-radius:5px;background:var(--chip);color:var(--dim)}
.verdict{font-size:11px;padding:2px 7px;border-radius:5px;border:1px solid var(--line);flex:none}
.v-좋음{color:var(--accent);border-color:currentColor}
.v-반면교사{color:var(--danger);border-color:currentColor}
.detail{position:fixed;inset:0;background:var(--bg);z-index:10;overflow:auto}
.detail header{position:sticky;top:0;display:flex;justify-content:space-between;align-items:flex-start;
  gap:16px;padding:18px 24px;background:var(--bg);border-bottom:1px solid var(--line)}
.detail h3{margin:0;font-size:18px}
.close{font:inherit;font-size:18px;line-height:1;background:none;border:1px solid var(--line);
  color:var(--fg);width:34px;height:34px;border-radius:8px;cursor:pointer;flex:none}
.detail-body{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:28px;padding:24px;
  max-width:1400px;margin:0 auto;align-items:start}
.shots figure{margin:0 0 20px}
.shots img{width:100%;border:1px solid var(--line);border-radius:8px;display:block}
.shots figcaption{font-size:11px;color:var(--dim);margin-top:6px;
  font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
aside{position:sticky;top:88px}
aside section{margin-bottom:20px}
aside h4{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--dim);
  margin:0 0 6px;font-weight:600}
aside p,aside li{font-size:14px;margin:0 0 6px}
aside ul{margin:0;padding-left:18px}
aside code{font-size:12px;background:var(--chip);padding:1px 4px;border-radius:4px}
aside .dont h4{color:var(--danger)}
.src{display:inline-block;margin-bottom:18px;color:var(--accent);font-size:13px}
dl.tags{display:grid;grid-template-columns:80px 1fr;gap:6px 10px;margin:0;
  padding-top:16px;border-top:1px solid var(--line);font-size:12px}
dl.tags dt{color:var(--dim);text-transform:uppercase;font-size:10px;letter-spacing:.06em;padding-top:3px}
dl.tags dd{margin:0;display:flex;flex-wrap:wrap;gap:4px}
.empty{padding:60px 0;text-align:center;color:var(--dim)}
@media (max-width:860px){
  .detail-body{grid-template-columns:1fr}
  aside{position:static}
  .facet-name{width:100%}
}
</style></head><body>
<div class="wrap">
  <h1>${esc(title)}</h1>
  <p class="sub">${esc(subtitle || '')}</p>
  ${filters ? `<div class="filters">${filters}</div>` : ''}
  <div class="bar"><span id="count"></span><button id="reset">필터 초기화</button></div>
  <div class="grid" id="grid">${cards}</div>
  ${refs.length ? '' : '<p class="empty">아직 레퍼런스가 없습니다. <code>scripts/add-ref.sh &lt;slug&gt;</code> 로 추가하세요.</p>'}
</div>
${details}
<script>
const active = new Set()
const cards = [...document.querySelectorAll('.card')]
const countEl = document.getElementById('count')

function apply(){
  let shown = 0
  for (const c of cards){
    const tags = c.dataset.tags.split(' ')
    // 같은 축 안에서는 OR, 축이 다르면 AND
    const byFacet = {}
    for (const t of active){ const f = t.split(':')[0]; (byFacet[f] ||= []).push(t) }
    const ok = Object.values(byFacet).every(g => g.some(t => tags.includes(t)))
    c.classList.toggle('hide', !ok)
    if (ok) shown++
  }
  countEl.textContent = shown + ' / ' + cards.length + ' 건'
  document.getElementById('reset').style.visibility = active.size ? 'visible' : 'hidden'
}
document.querySelectorAll('button.f').forEach(b => b.addEventListener('click', () => {
  const t = b.dataset.tag
  active.has(t) ? active.delete(t) : active.add(t)
  b.setAttribute('aria-pressed', active.has(t))
  apply()
}))
document.getElementById('reset').addEventListener('click', () => {
  active.clear()
  document.querySelectorAll('button.f').forEach(b => b.setAttribute('aria-pressed','false'))
  apply()
})
function openDetail(i){
  const d = document.getElementById('d-'+i); if(!d) return
  d.hidden = false; document.body.style.overflow = 'hidden'
  d.querySelector('.close').onclick = () => { d.hidden = true; document.body.style.overflow = '' }
}
cards.forEach(c => c.addEventListener('click', () => openDetail(c.dataset.i)))
addEventListener('keydown', e => {
  if (e.key !== 'Escape') return
  document.querySelectorAll('.detail:not([hidden])').forEach(d => { d.hidden = true })
  document.body.style.overflow = ''
})
apply()
</script>
</body></html>`
}
