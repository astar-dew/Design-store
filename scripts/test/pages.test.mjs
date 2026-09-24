// 빌드 결과 검사 — scripts/build.sh 가 빌드 뒤에 돌린다. 단독 실행 시 먼저 빌드할 것.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { REPO } from '../lib.mjs'
import { SKINS } from '../../patterns/skins.mjs'
import { MOTION_FOR } from '../../patterns/motion.mjs'

const read = f => readFileSync(join(REPO, f), 'utf8')

test('스킨 페이지마다 모션 CSS · JS · 설명이 들어간다', () => {
  for (const s of SKINS) {
    const h = read(`skins/${s.id}.html`)
    assert.ok(h.includes(`.sk-${s.id}{--m-dur:`), `${s.id}: 성격 변수`)
    assert.ok(h.includes('@keyframes m-fade{'), `${s.id}: 공통 keyframes`)
    assert.ok(h.includes('const M_PLAY'), `${s.id}: 시그니처 JS`)
    assert.ok(h.includes('<dt>모션</dt>'), `${s.id}: 정보 항목`)
    // 등장 모션이 없는 스킨에 다시 보기 버튼을 달면 눌러도 아무 일도 안 일어난다
    assert.equal(h.includes('id="m-replay"'), !MOTION_FOR[s.id].still, `${s.id}: 다시 보기`)
  }
})

test('초기화면에 탭 인디케이터와 공통 모션 CSS 가 있다', () => {
  const h = read('index.html')
  assert.ok(h.includes('@keyframes m-fade{'), '공통 keyframes')
  assert.ok(h.includes('.tab-ink{'), '탭 잉크 CSS')
  assert.ok(h.includes("classList.add('has-ink')"), '탭 잉크 JS')
})

test('스킨 카드 14장에 모션 강도가 붙고, 깔끔한 모션 필터가 있다', () => {
  const h = read('index.html')
  assert.equal((h.match(/ data-motion="(calm|mid|lively)"/g) || []).length, SKINS.length)
  assert.equal((h.match(/class="sk-motion"/g) || []).length, SKINS.length)
  assert.equal((h.match(/ data-motion="calm"/g) || []).length, 4)
  assert.ok(/<button class="fchip fchip-calm"[^>]*data-calm/.test(h), '깔끔한 모션 칩')
  assert.ok(h.includes('const skinVisible = function skinVisible'), '필터 함수가 페이지에 들어간다')
})
