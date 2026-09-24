#!/usr/bin/env node
// 로컬 브라우징용 갤러리 생성 (이미지는 상대경로 = 용량 부담 없음)
//   scripts/build-gallery.mjs && open gallery.html
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { REPO, loadRefs, loadVocab, lint } from './lib.mjs'
import { renderPage } from './render.mjs'

const refs = loadRefs()
const problems = lint(refs, loadVocab())

const out = join(REPO, 'gallery.html')
writeFileSync(out, renderPage({
  title: 'A-Dew, design-store',
  subtitle: `레퍼런스 ${refs.length}건 · 같은 축 안에서는 OR, 축이 다르면 AND 로 필터됩니다`,
  refs,
  embed: false,
  outDir: REPO,
}))

console.log(`✓ ${out}  (${refs.length}건)`)
if (problems.length) {
  console.log(`\n⚠ 정리 필요 ${problems.length}건`)
  for (const p of problems) console.log('  · ' + p)
  console.log('\n  태그 값은 docs/vocab.yml 에 정의된 것만 사용하세요.')
}
