#!/usr/bin/env node
// 스킨 대비 검사 — 위반이 있으면 종료코드 1. build.sh 가 여기서 멈춘다.
import { SKINS, modeVars } from '../patterns/skins.mjs'
import { audit, fmt } from './contrast.mjs'

const problems = audit(SKINS, modeVars)
if (!problems.length) {
  console.log(`✓ 대비 검사 통과  (스킨 ${SKINS.length} × 2모드 × 7규칙)`)
  process.exit(0)
}
console.error(`✗ 대비 기준 미달 ${problems.length}건\n`)
for (const p of problems) console.error('  · ' + fmt(p))
console.error('\n  기준은 scripts/contrast.mjs 의 RULES. 토큰을 고치거나 규칙을 바꾸세요.')
process.exit(1)
