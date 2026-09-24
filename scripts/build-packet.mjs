#!/usr/bin/env node
// 외주 전달용 패킷 생성 — 이미지를 data URI로 박은 자체완결 HTML 한 장.
// Artifact로 퍼블리시하면 링크 하나로 공유된다.
//
//   scripts/build-packet.mjs --out briefs/inventory-app --slugs linear-issue-list,stripe-dashboard
//   scripts/build-packet.mjs --out briefs/inventory-app --filter page=list,settings --filter style=black-yellow
//   scripts/build-packet.mjs --out briefs/inventory-app --slugs a,b --title "재고관리 앱 레퍼런스"
import { writeFileSync, mkdirSync, statSync } from 'node:fs'
import { join, isAbsolute } from 'node:path'
import { REPO, loadRefs } from './lib.mjs'
import { renderPage } from './render.mjs'

const argv = process.argv.slice(2)
const opt = { filters: [] }
for (let i = 0; i < argv.length; i++) {
  const [k, inlineV] = argv[i].split(/=(.*)/s)
  const val = () => inlineV ?? argv[++i]
  if (k === '--out') opt.out = val()
  else if (k === '--slugs') opt.slugs = val().split(',').map(s => s.trim()).filter(Boolean)
  else if (k === '--filter') opt.filters.push(val())
  else if (k === '--title') opt.title = val()
  else { console.error(`알 수 없는 인자: ${argv[i]}`); process.exit(1) }
}
if (!opt.out) {
  console.error('사용법: scripts/build-packet.mjs --out briefs/<이름> [--slugs a,b | --filter page=list]')
  process.exit(1)
}

let refs = loadRefs()

if (opt.slugs) {
  const found = new Set(refs.map(r => r.slug))
  for (const s of opt.slugs) if (!found.has(s)) console.warn(`⚠ 없는 슬러그: ${s}`)
  refs = opt.slugs.map(s => refs.find(r => r.slug === s)).filter(Boolean)   // 지정한 순서 유지
}

// --filter field=v1,v2 → 같은 축 안 OR, 축끼리 AND
for (const f of opt.filters) {
  const [field, raw] = f.split(/=(.*)/s)
  if (!raw) { console.error(`--filter 형식은 field=값[,값]: ${f}`); process.exit(1) }
  const wanted = raw.split(',').map(s => s.trim())
  refs = refs.filter(r => [].concat(r.fm[field] || []).some(v => wanted.includes(v)))
}

if (!refs.length) { console.error('✗ 해당하는 레퍼런스가 없습니다.'); process.exit(1) }

const outDir = isAbsolute(opt.out) ? opt.out : join(REPO, opt.out)
mkdirSync(outDir, { recursive: true })
const file = join(outDir, 'packet.html')

writeFileSync(file, renderPage({
  title: opt.title || `레퍼런스 패킷 — ${opt.out.split('/').pop()}`,
  subtitle: `${refs.length}건 · 각 항목의 Why / Highlights / Don't take 를 확인하세요`,
  refs,
  embed: true,
}))

const mb = (statSync(file).size / 1024 / 1024).toFixed(1)
console.log(`✓ ${file}  (${refs.length}건, ${mb}MB)`)
console.log(`  포함: ${refs.map(r => r.slug).join(', ')}`)
if (mb > 15) console.log('\n⚠ 16MB 넘으면 Artifact 퍼블리시가 안 됩니다. --slugs 로 건수를 줄이세요.')
