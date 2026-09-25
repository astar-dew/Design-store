#!/usr/bin/env node
// 수주 가이드 문서 생성 — docs/07-intake-guide.md
//
// 수주 가이드는 방문자가 볼 내용이 아니라 내가 첫 미팅에서 쓰는 메모라 초기화면에서 뺐다.
// 데이터는 그대로 patterns/domains.mjs 에 있고(디자인 탭의 분야 필터도 이걸 쓴다),
// 이 스크립트가 빌드 때마다 문서로 다시 뽑는다 — 손으로 고치지 말고 domains.mjs 를 고칠 것.
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { REPO } from './lib.mjs'
import { DOMAINS } from '../patterns/domains.mjs'
import { GROUPS } from '../patterns/patterns.mjs'
import { SKINS } from '../patterns/skins.mjs'
import { SCREENS, fmt } from '../patterns/pricing.mjs'

const patternName = new Map(GROUPS.flatMap(g => g.variants.map(v => [v.id, v.name])))
const skinName = new Map(SKINS.map(s => [s.id, s.name]))
const screen = new Map(SCREENS.map(s => [s.id, s]))

const section = d => {
  const subtotal = Object.entries(d.screens).reduce((n, [id, q]) => n + screen.get(id).price * q, 0)
  return `## ${d.name}

${d.desc}

**첫 미팅에서 물어볼 것**

${d.ask.map((q, i) => `${i + 1}. ${q}`).join('\n')}

> ⚠️ ${d.watch}

**관례 레이아웃** — 외주 지시에는 id 로 적는다

| 패턴 | 이름 | 왜 |
|---|---|---|
${d.layouts.map(([id, why]) => `| \`${id}\` | ${patternName.get(id)} | ${why} |`).join('\n')}

**어울리는 스킨**

| 스킨 | 이름 | 언제 |
|---|---|---|
${d.skins.map(([id, why]) => `| \`${id}\` | ${skinName.get(id)} | ${why} |`).join('\n')}

**필수 화면** — ${Object.entries(d.screens).map(([id, q]) => screen.get(id).name + (q > 1 ? ` ×${q}` : '')).join(' · ')}

화면 소계 **${fmt(subtotal)}** (스킨 계수·옵션 별도 — 견적 탭에서 같은 화면을 고르면 된다)
`
}

const md = `# 수주 가이드

외주 문의가 왔을 때 클라이언트와 첫 미팅에서 쓰는 메모.
분야를 고르면 **물어볼 질문 → 관례 레이아웃 → 어울리는 스킨 → 필수 화면** 순서로 좁힌다.

> 이 문서는 \`scripts/build-intake-doc.mjs\` 가 [\`patterns/domains.mjs\`](../patterns/domains.mjs) 에서 생성한다.
> 손으로 고치면 다음 빌드에서 덮인다 — 내용은 domains.mjs 에서 고칠 것.

${DOMAINS.map(d => `- [${d.name}](#${d.name.replace(/[^\p{L}\p{N} -]/gu, '').trim().replace(/ +/g, '-').toLowerCase()})`).join('\n')}

${DOMAINS.map(section).join('\n')}`

writeFileSync(join(REPO, 'docs', '07-intake-guide.md'), md)
console.log(`✓ docs/07-intake-guide.md  (분야 ${DOMAINS.length}개)`)
