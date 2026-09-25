// 사진 자리 일러스트 — 목업에서 "상품 사진·인물 사진·지도·문서 썸네일"이 들어갈 곳에 쓴다.
//
// 전에는 이 자리에 UI 아이콘(화병·바구니 선 아이콘)을 크게 그려 넣었다. 아이콘은 버튼용이라
// 사진 자리에 키우면 "완성도 없음"을 광고한다. 그래서 자리마다 작은 정물화를 그린다.
//
// 색은 전부 스킨 토큰(--s-*)에서 섞어 만든다 — 스킨·라이트/다크가 바뀌면 같이 바뀐다.
// 역할별 클래스:
//   .b 몸통  .s 그늘  .h 하이라이트  .f 액센트(불꽃·리본·핀)  .g 바닥 그림자
//   .k 윤곽선  .t 빗금·결(옅은 선)
// 스킨이 질감을 바꾸고 싶으면 --a-* 변수만 덮어쓰면 된다 (예: 샌드 클레이의 세피아 판화).

// fit: 'meet' 는 물건(여백 안에 통째로), 'slice' 는 장면(틀을 가득 채우고 넘치면 자름)
const svg = (id, vb, body, cls, fit) =>
  `<svg class="art art-${id}${cls ? ' ' + cls : ''}" viewBox="${vb}" preserveAspectRatio="xMidYMid ${fit}" aria-hidden="true">${body}</svg>`

export const ART = {
  /* ── 상품 정물 (쇼핑몰) ── */
  vase: {
    vb: '26 12 68 82', body: `
<ellipse class="g" cx="60" cy="89" rx="25" ry="3.6"/>
<path class="b" d="M52 17c0 10-2 13-6 19-10 12-10 34-2 44 4 5 28 5 32 0 8-10 8-32-2-44-4-6-6-9-6-19Z"/>
<path class="s" d="M68 17c0 10 2 13 6 19 10 12 10 34 2 44-3 3-9 4.6-14 4.8 8-6 12-20 10-34-1-8-6-16-8-24Z"/>
<path class="h" d="M47.5 48c-2.2 8-1.6 17 1.6 24" fill="none" stroke-width="2.6" stroke-linecap="round"/>
<path class="t" d="M71 55l5-5M72 62l5-5M71.5 69l4.5-4.5M70 75.5l3.5-3.5"/>
<path class="k" d="M52 17c0 10-2 13-6 19-10 12-10 34-2 44 4 5 28 5 32 0 8-10 8-32-2-44-4-6-6-9-6-19"/>
<ellipse class="s k" cx="60" cy="17" rx="8" ry="2.4"/>
<path class="t" d="M44 44c10 3 22 3 32 0"/>`,
  },
  tray: {
    // 위에서 비스듬히 본 둥근 원목 트레이 — 옆면·윗면·안쪽 턱·나뭇결
    vb: '8 36 104 48', body: `
<ellipse class="g" cx="60" cy="75" rx="47" ry="6"/>
<path class="s k" d="M14 56v6a46 13 0 0 0 92 0v-6"/>
<ellipse class="b k" cx="60" cy="56" rx="46" ry="13"/>
<ellipse class="s" cx="60" cy="56.6" rx="37" ry="9" opacity=".55"/>
<path class="t" d="M30 54.5q30-7 60 0M33 58.5q27 5 54 0M42 52q18-3 36 0"/>
<ellipse class="s k" cx="21" cy="55.4" rx="3.6" ry="1.6"/><ellipse class="s k" cx="99" cy="55.4" rx="3.6" ry="1.6"/>
<path class="h" d="M28 50q14-5 30-5.6" fill="none" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>`,
  },
  cushion: {
    vb: '18 22 84 70', body: `
<ellipse class="g" cx="60" cy="86" rx="34" ry="3.8"/>
<path class="b" d="M27 28q33-8 66 0 8 26 0 52-33 8-66 0-8-26 0-52Z"/>
<path class="s" d="M93 28q8 26 0 52-33 8-54 2 32-4 45-22 7-12 9-32Z"/>
<path class="t" d="M60 54 41 37M60 54l19-17M60 54 42 71M60 54l18 17"/>
<path class="t" d="M31 44h14M31 49h10M76 64h12M80 69h9"/>
<path class="k" d="M27 28q33-8 66 0 8 26 0 52-33 8-66 0-8-26 0-52Z"/>
<circle class="k s" cx="60" cy="54" r="2.2"/>`,
  },
  candle: {
    vb: '32 19 56 72', body: `
<ellipse class="g" cx="60" cy="86" rx="25" ry="3.4"/>
<circle class="f" cx="60" cy="33" r="12" opacity=".14"/>
<rect class="b k" x="40" y="38" width="40" height="46" rx="6"/>
<rect class="h" x="43.5" y="50" width="33" height="31" rx="4" opacity=".9"/>
<rect class="s" x="40" y="60" width="40" height="11"/>
<path class="t" d="M46 64.5h28M46 67.5h18"/>
<path class="k" d="M60 50v-5"/>
<path class="f" d="M60 31c-4 5.5-3.4 10.4 0 12.6 3.4-2.2 4-7.1 0-12.6Z"/>
<path class="h" d="M44.5 41v38" fill="none" stroke-width="2" stroke-linecap="round" opacity=".8"/>`,
  },
  mug: {
    vb: '30 32 72 60', body: `
<ellipse class="g" cx="58" cy="87" rx="26" ry="3.6"/>
<path class="k" d="M80 48c15-1 16 24 0 23M80 54c8 0 8 11 0 11" stroke-width="1.4"/>
<path class="b" d="M36 38v36q0 10 10 10h24q10 0 10-10V38Z"/>
<path class="s" d="M72 39.5 80 38v36q0 10-10 10h-4q8-4 8-14Z"/>
<path class="k" d="M36 38v36q0 10 10 10h24q10 0 10-10V38"/>
<ellipse class="s k" cx="58" cy="38" rx="22" ry="4"/>
<g class="t-dot"><circle cx="44" cy="52" r=".9"/><circle cx="52" cy="61" r=".8"/><circle cx="47" cy="71" r=".9"/>
<circle cx="61" cy="56" r=".8"/><circle cx="66" cy="68" r=".9"/><circle cx="57" cy="76" r=".8"/><circle cx="71" cy="50" r=".8"/></g>
<path class="h" d="M40.5 45v24" fill="none" stroke-width="2.2" stroke-linecap="round" opacity=".7"/>`,
  },
  basket: {
    vb: '20 20 80 74', body: `
<ellipse class="g" cx="60" cy="89" rx="30" ry="3.6"/>
<path class="k" d="M40 41c0-19 40-19 40 0M44 41c0-13 32-13 32 0"/>
<path class="b k" d="M28 44h64l-8 38q-1 4-6 4H42q-5 0-6-4Z"/>
<path class="s" d="M76 44h16l-8 38q-1 4-6 4h-6q5-2 6-8Z"/>
<path class="t" d="M30 53h60M32 61h56M33.5 69h53M35 77h50"/>
<path class="t" d="M40 44l2 42M48 44l1 42M56 44v42M64 44v42M72 44l-1 42M80 44l-2 42"/>
<rect class="s k" x="24" y="40" width="72" height="7" rx="3.5"/>`,
  },
  gift: {
    vb: '24 26 72 66', body: `
<ellipse class="g" cx="60" cy="87" rx="30" ry="3.6"/>
<rect class="b k" x="34" y="46" width="52" height="38" rx="2"/>
<rect class="s" x="70" y="46" width="16" height="38"/>
<rect class="s k" x="30" y="38" width="60" height="10" rx="2"/>
<rect class="f" x="57" y="38" width="6" height="46"/>
<path class="f k" d="M60 38c-10-12-20-6-14 0Zm0 0c10-12 20-6 14 0Z"/>`,
  },

  /* ── 인물 (인터뷰) ── */
  portrait: {
    vb: '0 0 160 110', fit: 'slice', body: `
<path class="s" d="M36 110V44a44 44 0 0 1 88 0v66Z"/>
<path class="t" d="M20 96h120"/>
<path class="b k" d="M122 96c-1-7 1-12 4-15-2-3-2-6 0-8h6c2 2 2 5 0 8 3 3 5 8 4 15Z"/>
<path class="f" d="M46 110c2-22 16-34 34-34s32 12 34 34Z" opacity=".85"/>
<path class="skin" d="M73 64h14v14c-4 3-10 3-14 0Z"/>
<circle class="skin k" cx="80" cy="52" r="15"/>
<path class="hair" d="M64 54c-3-16 6-24 16-24 11 0 18 8 16 22-2-5-5-9-8-12-6 6-14 9-22 10-1 1-2 3-2 4Z"/>
<path class="t" d="M75 57q5 3 10 0"/>`,
  },

  /* ── 지도 (예약·공공) ── */
  map: {
    vb: '0 0 240 90', fit: 'slice', body: `
<rect class="h" width="240" height="90"/>
<path class="park" d="M150 10h54v30h-54z"/>
<path class="river" d="M0 70c40-8 70 6 110-4s70-20 130-12"/>
<path class="road" d="M0 32l240 12M72 0l14 90M180 0l-6 90"/>
<path class="road2" d="M0 58h240M120 0v90M30 0l20 90"/>
<ellipse class="g" cx="120" cy="62" rx="7" ry="2"/>
<path class="f" d="M120 27c-8 0-13 6-13 12.6C107 50 120 61 120 61s13-11 13-21.4C133 33 128 27 120 27Z"/>
<circle class="pin-dot" cx="120" cy="39.5" r="4.6"/>`,
  },

  /* ── 문서 페이지 썸네일 ── */
  doc: {
    vb: '0 0 40 48', body: `
<path class="h k" d="M3 2h24l10 10v33a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z"/>
<path class="s k" d="M27 2v9a1 1 0 0 0 1 1h9"/>
<rect class="f" x="7" y="9" width="14" height="3" rx="1"/>
<rect class="s" x="7" y="17" width="25" height="1.8" rx=".9"/>
<rect class="s" x="7" y="22" width="21" height="1.8" rx=".9"/>
<rect class="s" x="7" y="27" width="25" height="1.8" rx=".9"/>
<rect class="b" x="7" y="33" width="12" height="8" rx="1"/>
<rect class="s" x="22" y="34" width="10" height="1.8" rx=".9"/>
<rect class="s" x="22" y="38" width="7" height="1.8" rx=".9"/>`,
  },

  /* ── 부품 도면 썸네일 (설계) — 선만 쓴다 ── */
  'part-bracket': {
    vb: '0 0 60 40', body: `
<path class="t" d="M4 20h52M30 4v32" stroke-dasharray="3 2"/>
<path class="k" d="M12 8h14v16h22v8H12Z"/>
<circle class="k" cx="19" cy="14" r="2.4"/><circle class="k" cx="40" cy="28" r="2.4"/>`,
  },
  'part-housing': {
    vb: '0 0 60 40', body: `
<path class="t" d="M4 20h52M30 4v32" stroke-dasharray="3 2"/>
<rect class="k" x="12" y="8" width="36" height="24" rx="5"/>
<circle class="k" cx="30" cy="20" r="7"/><circle class="k" cx="30" cy="20" r="3.2"/>`,
  },
  'part-plate': {
    vb: '0 0 60 40', body: `
<path class="t" d="M4 20h52M30 4v32" stroke-dasharray="3 2"/>
<rect class="k" x="10" y="10" width="40" height="20" rx="1.5"/>
<circle class="k" cx="15" cy="15" r="1.8"/><circle class="k" cx="45" cy="15" r="1.8"/>
<circle class="k" cx="15" cy="25" r="1.8"/><circle class="k" cx="45" cy="25" r="1.8"/>`,
  },
  'part-bolt': {
    vb: '0 0 60 40', body: `
<path class="t" d="M4 20h52" stroke-dasharray="3 2"/>
<path class="k" d="M10 12h8l3 3v10l-3 3h-8Z"/>
<path class="k" d="M21 16h29v8H21"/>
<path class="t" d="M26 16l-2 8M30 16l-2 8M34 16l-2 8M38 16l-2 8M42 16l-2 8M46 16l-2 8"/>`,
  },
}

/** 일러스트 한 장 — 모르는 이름이면 빌드에서 바로 터진다 */
export function art(id, cls = '') {
  const a = ART[id]
  if (!a) throw new Error(`일러스트 없음: ${id} — patterns/art.mjs`)
  return svg(id, a.vb, a.body.trim(), cls, a.fit || 'meet')
}

export const ART_CSS = `
.art{display:block;width:100%;height:100%;overflow:visible;color:var(--a-k);
  --a-k:color-mix(in srgb,var(--s-fg) 72%,var(--s-acc));
  --a-b:color-mix(in srgb,var(--s-acc) 20%,var(--s-sur));
  --a-s:color-mix(in srgb,var(--s-acc) 38%,var(--s-sur));
  --a-h:var(--s-sur);
  --a-f:var(--s-acc);
  --a-g:color-mix(in srgb,var(--s-fg) 12%,transparent)}
.art .b{fill:var(--a-b)}
.art .s{fill:var(--a-s)}
.art .h{fill:var(--a-h);stroke:var(--a-h)}
.art .f{fill:var(--a-f)}
.art .g{fill:var(--a-g)}
.art .k{fill:none;stroke:var(--a-k);stroke-width:1.2;stroke-linecap:round;stroke-linejoin:round}
.art .b.k{fill:var(--a-b)}
.art .s.k{fill:var(--a-s)}
.art .h.k{fill:var(--a-h);stroke:var(--a-k)}
.art .f.k{fill:var(--a-f)}
.art .t{fill:none;stroke:var(--a-k);stroke-width:.8;stroke-linecap:round;opacity:.42}
.art .t-dot{fill:var(--a-k);opacity:.4}
.art .hair{fill:var(--a-k);opacity:.8}
.art .skin{fill:color-mix(in srgb,var(--s-acc) 16%,var(--s-sur))}
.art .skin.k{fill:color-mix(in srgb,var(--s-acc) 16%,var(--s-sur))}
/* 재질 — 상품마다 몸통 색을 조금씩 달리해야 "같은 사진 여섯 장"이 안 된다 */
.art-vase{--a-b:color-mix(in srgb,var(--s-sur) 88%,var(--s-fg));--a-s:color-mix(in srgb,var(--s-sur) 70%,var(--s-fg))}
.art-tray{--a-b:color-mix(in srgb,var(--s-acc) 45%,var(--s-sur));--a-s:color-mix(in srgb,var(--s-acc) 65%,var(--s-fg) 10%)}
.art-cushion{--a-b:color-mix(in srgb,var(--s-bg) 80%,var(--s-fg) 8%);--a-s:color-mix(in srgb,var(--s-bg) 62%,var(--s-fg) 18%)}
.art-mug{--a-b:color-mix(in srgb,var(--s-dim) 35%,var(--s-sur));--a-s:color-mix(in srgb,var(--s-dim) 55%,var(--s-sur))}
.art-basket{--a-b:color-mix(in srgb,var(--s-acc) 30%,var(--s-sur) 60%);--a-s:color-mix(in srgb,var(--s-acc) 50%,var(--s-sur))}
/* 지도 — 도로는 표면색, 물·녹지는 액센트를 옅게 */
.art-map .park{fill:color-mix(in srgb,var(--s-acc) 16%,var(--s-sur))}
.art-map .river{fill:none;stroke:color-mix(in srgb,var(--s-acc) 26%,var(--s-sur));stroke-width:9;stroke-linecap:round}
.art-map .road{fill:none;stroke:color-mix(in srgb,var(--s-fg) 14%,var(--s-sur));stroke-width:6}
.art-map .road2{fill:none;stroke:color-mix(in srgb,var(--s-fg) 9%,var(--s-sur));stroke-width:3}
.art-map .h{stroke:none}
.art-map .pin-dot{fill:var(--s-sur)}
.art-map{--a-h:color-mix(in srgb,var(--s-bg) 70%,var(--s-sur))}
/* 부품 도면 — 선만, 도면의 전경색으로 */
[class*="art-part-"]{--a-k:var(--s-fg)}
[class*="art-part-"] .k{stroke-width:1}
`
