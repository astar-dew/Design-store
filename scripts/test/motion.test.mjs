// motion.mjs 단위 테스트 — scripts/build.sh 가 빌드 뒤에 돌린다.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { SKINS } from '../../patterns/skins.mjs'
import { LAYOUT_FOR, renderLayout } from '../../patterns/layouts.mjs'
import {
  PERSONAS, SIGNATURES, MOTION_FOR, MOTION_BASE_CSS, MOTION_BASE_JS,
  motionCss, motionJs, motionInfo, checkMotion, countText, skinVisible,
} from '../../patterns/motion.mjs'

test('모든 스킨이 성격·시그니처를 갖고, 대상이 레이아웃에 있다', () => {
  assert.deepEqual(checkMotion(SKINS, LAYOUT_FOR, renderLayout), [])
})

test('매핑이 빠진 스킨을 잡는다', () => {
  const p = checkMotion([...SKINS, { id: 'ghost-skin' }], LAYOUT_FOR, renderLayout)
  assert.equal(p.length, 1)
  assert.match(p[0], /ghost-skin/)
})

test('시그니처 대상이 레이아웃에 없으면 잡는다', () => {
  const fake = { ...LAYOUT_FOR, 'rose-lounge': 'dashboard' }   // 대시보드엔 .rl-up 이 없다
  const p = checkMotion(SKINS, fake, renderLayout)
  assert.equal(p.length, 1)
  assert.match(p[0], /rose-lounge.*rl-up/)
})

test('클래스 접두어만 같은 건 대상으로 치지 않는다', () => {
  const p = checkMotion([{ id: 'indigo-class' }], { 'indigo-class': 'x' },
    () => '<i class="fv-bar-x lms-dot-y"></i>')
  assert.equal(p.length, 1)
})

test('절제 스킨은 4종, civic-blue 는 등장이 없다', () => {
  const calm = SKINS.filter(s => motionInfo(s.id).level === 'calm').map(s => s.id).sort()
  assert.deepEqual(calm, ['civic-blue', 'cobalt-gray', 'ink-cream', 'stark-mono'])
  assert.match(motionCss('civic-blue'), /--m-enter:none/)
  assert.match(motionCss('cobalt-gray'), /--m-enter:m-fade/)
  assert.equal(motionInfo('civic-blue').still, true)
  assert.equal(motionInfo('rose-lounge').levelLabel, '활발')
})

test('motionCss 의 모든 규칙이 스킨으로 스코프된다', () => {
  for (const s of SKINS) {
    const rules = motionCss(s.id).split('}').map(x => x.trim()).filter(Boolean)
    for (const r of rules)
      for (const sel of r.slice(0, r.indexOf('{')).split(','))
        assert.ok(sel.trim().startsWith(`.sk-${s.id}`), `${s.id}: ${sel.trim()}`)
  }
})

test('시그니처 CSS 에 @ 규칙이 없다 (scopeCss 가 깨진다)', () => {
  for (const [id, sig] of Object.entries(SIGNATURES)) assert.ok(!sig.css.includes('@'), id)
})

test('쓰이는 keyframes 가 전부 MOTION_BASE_CSS 에 있다', () => {
  for (const [id, sig] of Object.entries(SIGNATURES))
    for (const [, name] of sig.css.matchAll(/animation:\s*(m-[a-z-]+)/g))
      assert.match(MOTION_BASE_CSS, new RegExp(`@keyframes ${name}\\{`), `${id} → ${name}`)
  for (const p of Object.values(PERSONAS))
    assert.match(MOTION_BASE_CSS, new RegExp(`@keyframes ${p.enter}\\{`), p.enter)
})

test('MOTION_BASE_CSS 가 모션 줄이기를 다룬다', () => {
  assert.match(MOTION_BASE_CSS, /@media \(prefers-reduced-motion:reduce\)/)
})

test('스킨 JS 는 문법이 맞고 M_PLAY/M_INIT 을 정의한다', () => {
  for (const s of SKINS) {
    const src = MOTION_BASE_JS + '\n' + motionJs(s.id) + '\nreturn [typeof M_PLAY, typeof M_INIT]'
    assert.deepEqual(new Function(src)(), ['function', 'function'], s.id)
  }
})

test('countText — 숫자만 세고 나머지 글자는 그대로', () => {
  assert.equal(countText('99.98%', 1), '99.98%')
  assert.equal(countText('99.98%', 0.5), '49.99%')
  assert.equal(countText('₩128,400,000', 1), '₩128,400,000')
  assert.equal(countText('₩128,400,000', 0), '₩0')
  assert.equal(countText('1200', 0.5), '600')     // 쉼표 없던 숫자에 쉼표를 만들지 않는다
  assert.equal(countText('—', 0.3), '—')          // 숫자가 없으면 건드리지 않는다
})

test('skinVisible — 분야와 모션 강도를 AND 로 건다', () => {
  assert.equal(skinVisible(['commerce'], 'lively', 'all', false), true)
  assert.equal(skinVisible(['commerce'], 'lively', 'all', true), false)
  assert.equal(skinVisible(['commerce', 'saas'], 'calm', 'saas', true), true)
  assert.equal(skinVisible(['commerce'], 'calm', 'saas', true), false)
})
