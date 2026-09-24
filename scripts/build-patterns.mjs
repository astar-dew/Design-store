#!/usr/bin/env node
// 기본 컴포넌트·레이아웃 카탈로그 생성
//   scripts/build-patterns.mjs && open patterns.html
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { REPO, loadRefs, esc } from './lib.mjs'
import { GROUPS } from '../patterns/patterns.mjs'
import { WIRE_CSS } from '../patterns/wire-css.mjs'
import { TOKENS_CSS } from './theme.mjs'

const refs = loadRefs()

// 각 변형에 태그가 겹치는 실제 레퍼런스를 연결
const refsFor = tags => refs.filter(r => {
  const all = ['style', 'layout', 'page', 'components'].flatMap(f => [].concat(r.fm[f] || []))
  return tags.some(t => all.includes(t))
})

const total = GROUPS.reduce((n, g) => n + g.variants.length, 0)

const nav = GROUPS.map(g =>
  `<a href="#${g.id}">${esc(g.name)} <span>${g.variants.length}</span></a>`).join('')

const sections = GROUPS.map(g => `
<section class="group" id="${g.id}">
  <div class="ghead">
    <h2>${esc(g.name)}</h2>
    <p>${esc(g.note)}</p>
  </div>
  <div class="vgrid">
${g.variants.map(v => {
    const linked = refsFor(v.tags)
    return `    <article class="v" id="${v.id}">
      <div class="wf">${v.wire}</div>
      <div class="vbody">
        <h3>${esc(v.name)}</h3>
        <div class="tags">${v.tags.map(t => `<span class="chip">${esc(t)}</span>`).join('')}</div>
        <dl>
          <dt>쓸 때</dt><dd>${esc(v.when)}</dd>
          <dt class="w">주의</dt><dd class="w">${esc(v.watch)}</dd>
        </dl>
        <div class="linked">${linked.length
        ? `내 레퍼런스 ${linked.length}건 · ${linked.slice(0, 3).map(r => `<code>${esc(r.slug)}</code>`).join(' ')}`
        : '<span class="none">연결된 레퍼런스 없음</span>'}</div>
      </div>
    </article>`
  }).join('\n')}
  </div>
</section>`).join('\n')

const html = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>기본 패턴 카탈로그 — A-Dew, design-store</title>
<style>
${TOKENS_CSS}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);
  font:15px/1.6 ui-sans-serif,-apple-system,"Pretendard","Apple SD Gothic Neo",system-ui,sans-serif;
  -webkit-font-smoothing:antialiased}
.wrap{max-width:1320px;margin:0 auto;padding:36px 24px 90px}
h1{font-size:24px;margin:0 0 6px;letter-spacing:-.015em}
.lede{color:var(--dim);font-size:14px;margin:0 0 22px;max-width:70ch}
.toc{position:sticky;top:0;z-index:5;display:flex;flex-wrap:wrap;gap:6px;padding:12px 0;
  background:var(--bg);border-bottom:1px solid var(--line);margin-bottom:32px}
.toc a{font-size:13px;text-decoration:none;color:var(--dim);padding:4px 10px;border-radius:999px;
  border:1px solid var(--line);transition:.12s}
.toc a:hover{color:var(--fg);border-color:var(--dim)}
.toc a span{font-size:11px;opacity:.6;margin-left:2px}
.group{margin-bottom:52px;scroll-margin-top:64px}
.ghead h2{font-size:18px;margin:0 0 3px;letter-spacing:-.01em}
.ghead p{margin:0 0 18px;color:var(--dim);font-size:13.5px;max-width:76ch}
.vgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(292px,1fr));gap:20px}
.v{background:var(--panel);border:1px solid var(--line);border-radius:12px;overflow:hidden;
  scroll-margin-top:70px}
.vbody{padding:13px 15px 15px}
.vbody h3{font-size:14.5px;margin:0 0 7px}
.tags{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:10px}
.chip{font-size:10.5px;padding:2px 6px;border-radius:5px;background:var(--chip);color:var(--dim);
  font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
dl{margin:0;display:grid;grid-template-columns:38px 1fr;gap:4px 9px;font-size:12.5px;line-height:1.55}
dt{color:var(--dim);font-size:10.5px;letter-spacing:.03em;padding-top:2px}
dt.w,dd.w{color:var(--warn)}
dd{margin:0}
.linked{margin-top:11px;padding-top:9px;border-top:1px solid var(--line);
  font-size:11.5px;color:var(--dim)}
.linked code{background:var(--chip);padding:1px 4px;border-radius:4px;font-size:10.5px}
.linked .none{opacity:.55}

${WIRE_CSS}
@media (max-width:640px){ .wrap{padding:24px 16px 60px} }
</style></head><body>
<div class="wrap">
  <h1>기본 패턴 카탈로그</h1>
  <p class="lede">로그인·사이드 메뉴 같은 기본 레이아웃의 형태별 변형입니다.
  색·타이포·질감은 뺐습니다 — 여기서 정하는 건 <strong>형태</strong>뿐이고,
  무드는 <code>01-design-taxonomy.md</code>의 스타일 축에서 따로 고릅니다.
  외주에는 <strong>“앱 셸은 shell-rail, 로그인은 auth-split”</strong> 처럼 ID로 지정하면 됩니다.</p>
  <nav class="toc">${nav}</nav>
${sections}
</div>
</body></html>`

const out = join(REPO, 'patterns.html')
writeFileSync(out, html)
console.log(`✓ ${out}  (${GROUPS.length}개 그룹 / ${total}개 변형, 레퍼런스 ${refs.length}건 연결)`)
