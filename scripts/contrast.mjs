// 스킨 토큰의 명도 대비 검사 — docs/01 과 디자인 스킬 탭 1번이 요구하는 기준을 코드로 못 박는다.
//
// 문서에만 적어두면 지켜지지 않는다. 실제로 14종 중 7종이 기준 미달인 채로 배포되고 있었다.
// 그래서 빌드에서 막는다: scripts/check-contrast.mjs

/** sRGB 상대 휘도 (WCAG 2.x) */
export function luminance(hex) {
  const v = hex.replace('#', '').match(/../g).map(x => {
    const c = parseInt(x, 16) / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]
}

/** 대비비 1~21 */
export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

const isHex = v => typeof v === 'string' && /^#[0-9a-f]{6}$/i.test(v)

/**
 * 검사 규칙.
 *
 * 4.5 는 WCAG AA 본문 기준. acc 를 4.5 로 잡는 이유는 액센트가 채움(버튼·바)만이 아니라
 * 작은 글자(.fv-link, 태그, 순위 숫자)에도 쓰이기 때문 — 둘 다면 엄격한 쪽을 따른다.
 *
 * line 1.5 는 WCAG 규정이 아니라 **이 저장소 기준**이다. 경계선이 유일한 구분 수단일 때
 * 1.2 대비는 사실상 안 보인다. 다만 그림자로 분리하는 스킨(bw:0)은 검사에서 뺀다.
 */
export const RULES = [
  { id: 'fg/bg', a: 'fg', b: 'bg', min: 4.5, note: '본문 텍스트' },
  { id: 'fg/sur', a: 'fg', b: 'sur', min: 4.5, note: '카드 위 본문' },
  { id: 'dim/bg', a: 'dim', b: 'bg', min: 4.5, note: '보조 텍스트' },
  { id: 'dim/sur', a: 'dim', b: 'sur', min: 4.5, note: '카드 위 보조 텍스트' },
  { id: 'acc/sur', a: 'acc', b: 'sur', min: 4.5, note: '액센트 텍스트(링크·태그)' },
  { id: 'accFg/acc', a: 'accFg', b: 'acc', min: 4.5, note: '버튼 글자' },
  { id: 'line/sur', a: 'line', b: 'sur', min: 1.5, note: '경계선', skipIf: v => v.bw === '0' },
]

/** 스킨 하나의 한 모드를 검사 → 위반 배열 */
export function auditMode(id, mode, v) {
  const out = []
  for (const r of RULES) {
    if (r.skipIf && r.skipIf(v)) continue
    const [a, b] = [v[r.a], v[r.b]]
    if (!isHex(a) || !isHex(b)) continue   // transparent 등은 검사 대상이 아니다
    const got = contrast(a, b)
    if (got < r.min) out.push({ id, mode, rule: r.id, note: r.note, got, min: r.min, a, b })
  }
  return out
}

export function audit(skins, modeVars) {
  return skins.flatMap(s => ['light', 'dark'].flatMap(m => auditMode(s.id, m, modeVars(s, m))))
}

export const fmt = p =>
  `${p.id} [${p.mode}] ${p.rule} = ${p.got.toFixed(2)} (${p.min} 필요) — ${p.note} · ${p.a} on ${p.b}`
