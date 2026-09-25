// art.mjs 단위 테스트 — 사진 자리 일러스트
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ART, art, ART_CSS } from '../../patterns/art.mjs'

test('모든 일러스트가 svg 한 장으로 나온다', () => {
  for (const id of Object.keys(ART)) {
    const s = art(id)
    assert.match(s, /^<svg class="art art-[a-z-]+[^"]*" viewBox="[\d .]+"/, id)
    assert.ok(s.includes('aria-hidden="true"'), `${id}: 장식이므로 읽지 않는다`)
    assert.equal((s.match(/<svg/g) || []).length, 1, id)
  }
})

test('없는 이름은 빌드에서 바로 터진다', () => {
  assert.throws(() => art('nope'), /nope/)
})

test('색은 스킨 토큰에서만 온다 — 하드코딩 색이 없다', () => {
  for (const [id, a] of Object.entries(ART)) assert.ok(!/#[0-9a-f]{3,6}\b/i.test(a.body), id)
  assert.ok(!/#[0-9a-f]{3,6}\b/i.test(ART_CSS), 'ART_CSS')
})

test('추가 클래스를 붙일 수 있다', () => {
  assert.match(art('vase', 'lay-art-i'), /class="art art-vase lay-art-i"/)
})
