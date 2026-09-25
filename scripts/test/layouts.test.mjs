// 레이아웃 — 쇼케이스가 쓰는 "화면 하나만" 렌더링
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { LAYOUTS, renderLayout, layoutViews } from '../../patterns/layouts.mjs'

test('layoutViews — 내비 순서대로 모든 화면과 이름을 준다', () => {
  for (const key of Object.keys(LAYOUTS)) {
    const vs = layoutViews(key)
    const all = renderLayout(key).match(/class="fv-view" data-v="[a-z0-9-]+"/g).length
    assert.equal(vs.length, all, key)
    assert.equal(vs[0].id, LAYOUTS[key].home, `${key}: 첫 화면이 홈`)
    for (const v of vs) assert.ok(v.label && !v.label.includes('<'), `${key}/${v.id}: 이름`)
  }
})

test('renderLayout(key, only) — 그 화면 하나만, 내비도 그 화면에 켜진다', () => {
  for (const key of Object.keys(LAYOUTS)) {
    for (const { id } of layoutViews(key)) {
      const h = renderLayout(key, id)
      const views = h.match(/class="fv-view" data-v="([a-z0-9-]+)"/g)
      assert.deepEqual(views, [`class="fv-view" data-v="${id}"`], `${key}/${id}`)
      assert.ok(!/class="fv-view"[^>]*hidden/.test(h), `${key}/${id}: 숨김 없음`)
      const on = h.match(/class="(?:fv-nav is-on|lay-tab on)" data-v="([a-z0-9-]+)"/)
      assert.equal(on?.[1], id, `${key}/${id}: 켜진 내비`)
    }
  }
})

test('없는 화면을 달라고 하면 터진다', () => {
  assert.throws(() => renderLayout('commerce', 'nope'), /nope/)
})
