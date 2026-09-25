// 스타일 스킨 정의 — 디자인 탭의 카드 하나가 곧 스킨 하나.
//
// 카드 프리뷰는 스킨마다 다른 분야의 씬을 쓴다 (patterns/scenes.mjs) —
// 전부 같은 화면이면 "색상만 바꾼 것"으로 읽힌다.
// 동일 화면 비교는 상세 시트의 풀 목업(PREVIEW_FULL)이 담당한다.
// id 는 docs/vocab.yml 의 style 축 값과 일치시킨다 (외주 지시에 그대로 쓰기 위해).
//
// 각 스킨은 라이트/다크 **쌍**으로 정의된다.
//   base  : vars 가 어느 모드인지 ('light' | 'dark')
//   alt    : 반대 모드에서 덮어쓸 값 (vars 위에 병합)
//   fonts  : 웹폰트 CSS 주소 (선택) — 이 스킨이 들어가는 페이지에만 붙는다
//   extra  : 두 모드 공통 CSS
//   altExtra: 반대 모드에서만 덮어쓸 CSS (색을 하드코딩한 규칙이 있을 때만)
//
// 다크는 라이트의 반전이 아니다. 아래 값들은 그 원칙을 따른다:
//   순검정/순백 금지 · 액센트는 채도↓ 명도↑ · 깊이는 그림자가 아니라 표면 밝기로.

export const SKINS = [
  {
    id: 'cobalt-gray',
    name: '코발트 그레이',
    sub: '그레이스케일에 코발트 한 점',
    lineage: '미니멀 스위스 + 뉴트럴 SaaS',
    // bench: 이 계보의 실존 제품 — 시트에 "실존 사례"로 표시된다.
    // 스킨을 상품으로 보여줄 때 "이 방향의 검증된 제품"이 붙어야 설득력이 생긴다.
    bench: [
      ['Linear', 'https://linear.app', '고밀도 리스트·⌘K — B2B UI의 현행 교과서'],
      ['Vercel', 'https://vercel.com', 'KPI 배치·스켈레톤·라이트/다크 동시 제공 관례'],
      ['Stripe', 'https://docs.stripe.com', '라이트 모드에서 신뢰감 있는 밀도의 기준'],
    ],
    fits: 'B2B SaaS, 사내 도구 — 실패 확률이 가장 낮다',
    watch: '안전한 만큼 기억에 안 남는다. 액센트를 쓸 자리를 3곳 이내로 못 박아야 그나마 인상이 생긴다.',
    base: 'light',
    vars: {
      bg: '#f7f8fa', sur: '#ffffff', line: '#cdd2dd', fg: '#14171f', dim: '#667085',
      acc: '#1a5cff', accFg: '#ffffff', sideBg: '#ffffff', navOn: '#eaf0ff', navOnFg: '#1a4fd6',
      bw: '1', r: '8', sh: '0 1px 2px rgba(16,24,40,.06)', font: 'Inter,system-ui,sans-serif',
      headFont: 'inherit', headWeight: '600', tracking: '-0.012em',
    },
    alt: {
      bg: '#0f1116', sur: '#161923', line: '#31384c', fg: '#e6e9f0', dim: '#8b93a7',
      acc: '#5b8cff', accFg: '#08101f', sideBg: '#12141b', navOn: '#1b2440', navOnFg: '#b9ccff',
      sh: '0 1px 2px rgba(0,0,0,.4)',
    },
    extra: `.pv-side{border-right:1px solid var(--s-line)}
.pv-kpi,.pv-panel{border:1px solid var(--s-line)}`,
    extraFull: `.fv-side{border-right:var(--fv-bd)}`,
  },
  {
    id: 'black-yellow',
    name: '블랙 옐로우',
    sub: '검정 위 노랑 하나. 강한 대비, 최소 라운드',
    lineage: '미니멀 스위스 + 브루탈리즘의 대비',
    bench: [
      ['CJ대한통운', 'https://www.cjlogistics.com', '노랑 단색 브랜드를 운영 화면까지 밀어붙인 사례'],
      ['DHL', 'https://www.dhl.com', '노랑+검정 대비를 물류 전 접점에 일관 적용'],
      ['Bumble', 'https://bumble.com', '노랑을 소비자 제품에서 밝게 쓰는 반대 방향 참고'],
    ],
    fits: '물류·산업·핀테크 — 기능적이면서 눈에 띄어야 할 때',
    watch: '노랑은 흰 배경에서 대비가 안 나온다. 노랑 위 텍스트는 반드시 검정, 노랑을 텍스트 색으로는 쓰지 말 것.',
    base: 'dark',
    vars: {
      bg: '#0d0d0d', sur: '#161616', line: '#373737', fg: '#f5f5f0', dim: '#8c8c85',
      acc: '#ffd400', accFg: '#0d0d0d', sideBg: '#111111', navOn: '#ffd400', navOnFg: '#0d0d0d',
      bw: '1', r: '4', sh: 'none', font: 'Inter,system-ui,sans-serif',
      headFont: 'inherit', headWeight: '700', tracking: '-0.022em',
    },
    alt: {
      bg: '#ffffff', sur: '#ffffff', line: '#111111', fg: '#0d0d0d', dim: '#5c5c56',
      acc: '#8b7300', accFg: '#ffffff', sideBg: '#f7f7f4', navOn: '#ffd400', navOnFg: '#0d0d0d',
    },
    extra: `.pv-side{border-right:1px solid var(--s-line)}
.pv-kpi,.pv-panel{border:1px solid var(--s-line)}
.pv-btn{font-weight:700}`,
    // 기본 경고색(앰버)이 노랑 액센트와 구분되지 않는다 — 지연·오류가 "좋은 신호"로 읽힘
    extraFull: `.fv-side{border-right:var(--fv-bd)}
.fv-btn{font-weight:700;letter-spacing:.01em}
.fv-kpi em.up{color:var(--s-acc)}
.fv{--fv-warn:#ff6a45;--fv-mid:#7fb3ff}`,
    altExtraFull: `.fv{--fv-warn:#d63b12;--fv-mid:#2a6fd6}`,
  },
  {
    id: 'neon-engineering',
    name: '네온 엔지니어링',
    sub: '계측기 HUD. 격자 배경과 발광 보더, 수치는 모노스페이스',
    lineage: '데이터 밀도형 + 네온',
    bench: [
      ['Grafana', 'https://grafana.com', '고밀도 시계열 대시보드의 사실상 표준'],
      ['Warp', 'https://www.warp.dev', '터미널을 제품 UI로 다듬은 대표 사례'],
      ['Datadog', 'https://www.datadoghq.com', '다크 위 상태색 체계 — 네온을 상태 표시로만 쓰는 규율'],
    ],
    fits: '개발자 도구, 인프라 모니터링, 로보틱스·하드웨어 대시보드',
    watch: '발광이 많으면 값을 못 읽는다. 네온은 상태 표시에만 쓰고 본문은 무채색으로.',
    base: 'dark',
    vars: {
      bg: '#06090d', sur: '#0b1117', line: '#143843', fg: '#cfe9f2', dim: '#5f8494',
      acc: '#00e5ff', accFg: '#04141a', sideBg: '#080d12', navOn: '#0d2b35', navOnFg: '#00e5ff',
      bw: '1', r: '3', sh: '0 0 12px rgba(0,229,255,.14)',
      font: 'JetBrains Mono,SFMono-Regular,Menlo,monospace',
      headFont: 'inherit', headWeight: '500', tracking: '0',
    },
    alt: {
      bg: '#f1f7f9', sur: '#ffffff', line: '#bed7e0', fg: '#06212b', dim: '#4d7180',
      acc: '#008298', accFg: '#ffffff', sideBg: '#e9f2f5', navOn: '#d7ecf2', navOnFg: '#026174',
      sh: '0 0 12px rgba(0,144,168,.10)',
    },
    extra: `.pv{background-image:
  linear-gradient(rgba(0,229,255,.05) 1px,transparent 1px),
  linear-gradient(90deg,rgba(0,229,255,.05) 1px,transparent 1px);
  background-size:calc(var(--u) * 24) calc(var(--u) * 24)}
.pv-side,.pv-kpi,.pv-panel{border:1px solid var(--s-line)}
.pv-btn{box-shadow:var(--s-sh)}`,
    altExtra: `.pv{background-image:
  linear-gradient(rgba(0,144,168,.07) 1px,transparent 1px),
  linear-gradient(90deg,rgba(0,144,168,.07) 1px,transparent 1px)}`,
    extraFull: `.fv{background-image:
  linear-gradient(rgba(0,229,255,.045) 1px,transparent 1px),
  linear-gradient(90deg,rgba(0,229,255,.045) 1px,transparent 1px);
  background-size:calc(var(--v) * 32) calc(var(--v) * 32)}
.fv-side,.fv-top{background:transparent;border-right:var(--fv-bd)}
.fv-kpi,.fv-card{box-shadow:var(--s-sh)}
.fv{--fv-warn:#ffb84d;--fv-mid:#7ce3b0}
.fv-kpi em.up{color:#b6ff3a}`,
    altExtraFull: `.fv{background-image:
  linear-gradient(rgba(0,144,168,.07) 1px,transparent 1px),
  linear-gradient(90deg,rgba(0,144,168,.07) 1px,transparent 1px);
  --fv-warn:#a5620a;--fv-mid:#1d7a55}
.fv-kpi em.up{color:#3f8f14}`,
  },
  {
    id: 'blueprint',
    name: '블루프린트',
    sub: '제도 도면. 남색 바탕에 흰 선과 격자만',
    lineage: '미니멀 스위스 + 엔지니어링 드로잉',
    bench: [
      ['Onshape', 'https://www.onshape.com', '브라우저 CAD — 캔버스+인스펙터 구조의 기준'],
      ['Shapr3D', 'https://www.shapr3d.com', '치수·구속 표현을 절제하게 보여주는 UI'],
      ['Figma', 'https://figma.com', 'CAD는 아니지만 캔버스 도구 UI의 교과서'],
    ],
    fits: 'CAD·설계 SaaS, 건축·제조, 공정 관리',
    watch: '선만으로 구성해서 정보 위계가 약하다. 선 굵기를 3단으로 고정하지 않으면 다 똑같아 보인다.',
    base: 'dark',
    vars: {
      // sur 는 bg 보다 확실히 밝게 — 명도차가 작으면 카드가 배경에 붙어 보인다(elevation 실패)
      bg: '#0b2140', sur: '#153561', line: '#4a7ab5', fg: '#e8f1ff', dim: '#8fb3dd',
      acc: '#ffffff', accFg: '#0d2547', sideBg: '#0b2040', navOn: '#17406e', navOnFg: '#ffffff',
      bw: '1', r: '0', sh: 'none', font: 'Inter,system-ui,sans-serif',
      headFont: 'inherit', headWeight: '500', tracking: '0.005em',
    },
    alt: {
      bg: '#f4f8fd', sur: '#ffffff', line: '#7ba3d4', fg: '#0d2547', dim: '#53749c',
      acc: '#0d5bb5', accFg: '#ffffff', sideBg: '#eef4fb', navOn: '#dbe8f7', navOnFg: '#0d2547',
    },
    extra: `.pv{background-image:
  linear-gradient(rgba(232,241,255,.07) 1px,transparent 1px),
  linear-gradient(90deg,rgba(232,241,255,.07) 1px,transparent 1px);
  background-size:calc(var(--u) * 16) calc(var(--u) * 16)}
.pv-side{border-right:1px solid var(--s-line)}
.pv-kpi,.pv-panel{border:1px solid var(--s-line)}`,
    altExtra: `.pv{background-image:
  linear-gradient(rgba(13,37,71,.06) 1px,transparent 1px),
  linear-gradient(90deg,rgba(13,37,71,.06) 1px,transparent 1px)}`,
    extraFull: `.fv{background-image:
  linear-gradient(rgba(232,241,255,.06) 1px,transparent 1px),
  linear-gradient(90deg,rgba(232,241,255,.06) 1px,transparent 1px);
  background-size:calc(var(--v) * 20) calc(var(--v) * 20);
  --fv-warn:#ffd27a;--fv-mid:#a8cdf5}
.fv-side,.fv-top{background:transparent;border-right:var(--fv-bd)}
.fv-line{stroke-width:1.5}`,
    altExtraFull: `.fv{background-image:
  linear-gradient(rgba(13,37,71,.05) 1px,transparent 1px),
  linear-gradient(90deg,rgba(13,37,71,.05) 1px,transparent 1px);
  --fv-warn:#9a6b1f;--fv-mid:#2b6bb5}`,
  },
  {
    id: 'oled-void',
    name: 'OLED 보이드',
    sub: '순흑 배경에 발광 최소. 모바일·야간 우선',
    lineage: '뉴트럴 SaaS + 글로우',
    bench: [
      ['Spotify', 'https://spotify.com', '순흑 계열 다크의 대표 — 표면 한 단계 띄우는 규칙'],
      ['Apple Music', 'https://music.apple.com', '앨범아트가 주인공이 되는 색 절제'],
      ['Arc', 'https://arc.net', '발광 액센트를 최소로 쓰는 다크 크롬'],
    ],
    fits: '미디어·음악·영상 앱, 야간에 오래 보는 제품',
    watch: '순흑은 스크롤 시 잔상이 생긴다. 표면은 반드시 한 단계(#0c0c0f) 띄울 것.',
    base: 'dark',
    vars: {
      bg: '#000000', sur: '#0c0c0f', line: '#30303c', fg: '#f0f0f4', dim: '#7a7a85',
      acc: '#8b5cf6', accFg: '#000000', sideBg: '#050506', navOn: '#1a1226', navOnFg: '#c4b0ff',
      bw: '1', r: '14', sh: '0 0 20px rgba(139,92,246,.16)', font: 'Inter,system-ui,sans-serif',
      headFont: 'inherit', headWeight: '600', tracking: '-0.015em',
    },
    alt: {
      bg: '#fafafa', sur: '#ffffff', line: '#d2d2da', fg: '#0c0c0f', dim: '#71717a',
      acc: '#7c3aed', accFg: '#ffffff', sideBg: '#f4f4f6', navOn: '#f0eaff', navOnFg: '#5b21b6',
      sh: '0 1px 3px rgba(0,0,0,.06)',
    },
    extra: `.pv-side{border-right:1px solid var(--s-line)}
.pv-kpi,.pv-panel{border:1px solid var(--s-line)}
.pv-btn{box-shadow:var(--s-sh)}`,
    extraFull: `.fv-side{border-right:var(--fv-bd)}
.fv-btn,.fv-card{box-shadow:var(--s-sh)}`,
  },
  {
    id: 'ink-cream',
    name: '잉크 크림',
    sub: '아이보리 위 현대 세리프. 헤드라인은 부리, 본문은 산세리프',
    lineage: '모던 에디토리얼 + 뉴스레터',
    bench: [
      ['Anthropic', 'https://www.anthropic.com', '웜 뉴트럴 배경 + 세리프 헤드라인 + 클레이 액센트의 대표 사례'],
      ['Stripe Press', 'https://press.stripe.com', '출판물급 조판을 웹으로 옮긴 기준'],
      ['롱블랙', 'https://www.longblack.co', '한글 부리 헤드라인과 산세리프 본문을 섞는 국내 관례'],
    ],
    fits: '매거진·브랜드 저널·뉴스레터, 프리미엄 브랜드 커머스 — 읽는 시간이 긴 곳',
    watch: '세리프는 헤드라인과 풀쿼트까지만. 본문·UI 라벨까지 부리로 돌리자는 요청은 거절해야 한다 — 작은 글자에서 획이 뭉개지고 다시 올드해진다. 그리고 웹폰트(마루 부리)가 늦게 오면 헤드라인이 잠깐 시스템 명조로 보인다 — 헤드라인 줄바꿈을 폰트가 바뀌어도 안 깨지게 잡을 것.',
    base: 'light',
    // 누런 크림(#f7f1e3)·벽돌 액센트는 종이 신문처럼 읽혔다. 채도를 뺀 아이보리와 클레이로 옮긴다.
    vars: {
      bg: '#f6f4ef', sur: '#ffffff', line: '#cfc8ba', fg: '#1b1916', dim: '#6b655b',
      acc: '#b04a25', accFg: '#ffffff', sideBg: '#f1eee7', navOn: '#ece7dd', navOnFg: '#1b1916',
      bw: '1', r: '12', sh: '0 1px 2px rgba(27,25,22,.04),0 10px 28px -16px rgba(27,25,22,.18)',
      font: 'Pretendard Variable,Pretendard,system-ui,sans-serif',
      // Instrument Serif 에는 한글이 없다 — 한글은 뒤의 MaruBuri 로 떨어진다
      headFont: 'Instrument Serif,MaruBuri,Georgia,serif', headWeight: '400', tracking: '-0.02em',
    },
    alt: {
      bg: '#141311', sur: '#1d1b18', line: '#46413a', fg: '#efebe4', dim: '#a39c90',
      acc: '#e3875f', accFg: '#141311', sideBg: '#171614', navOn: '#2a2723', navOnFg: '#efebe4',
      sh: '0 1px 2px rgba(0,0,0,.4)',
    },
    // 이 스킨이 들어가는 페이지에만 <link> 로 붙는다 (fontLinks)
    fonts: [
      'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap',
      'https://hangeul.pstatic.net/hangeul_static/css/maru-buri.css',
      'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
    ],
    extra: `.pv-side{border-right:1px solid var(--s-line)}
.pv-kpi,.pv-panel{border:1px solid var(--s-line)}
.pv-head h4{font-size:calc(var(--u) * 19);letter-spacing:0}`,
    // 세리프는 헤드라인과 풀쿼트에만. 본문과 UI 크롬(내비·라벨·버튼·표)은 산세리프로 둔다.
    extraFull: `.fv-side{border-right:var(--fv-bd)}
.fv-h h2{font-size:calc(var(--v) * 26)}
.fv-card,.fv-kpi{background:var(--s-sur);border:var(--fv-bd);box-shadow:var(--s-sh)}
.lay-feat h1,.lay-rvw h3{font-family:var(--s-head-font);font-weight:var(--s-head-w)}
.fv-av{background:var(--s-acc)}`,
  },
  {
    id: 'sand-clay',
    name: '샌드 클레이',
    sub: '흙빛 팔레트와 부드러운 덩어리감',
    lineage: '클레이모피즘 + 어스톤',
    bench: [
      ['Aesop', 'https://www.aesop.com', '흙빛 팔레트와 여백으로 프리미엄을 만든 커머스'],
      ['Airbnb', 'https://airbnb.com', '부드러운 라운드·카드 중심 소비자 UI'],
      ['무신사 스탠다드', 'https://www.musinsastandard.co.kr', '국내 커머스의 제품 그리드·옵션 표현'],
    ],
    fits: '웰니스·리테일·커머스, 소비자용 앱',
    watch: '라운드가 크면 정보 밀도가 급격히 떨어진다. 테이블 중심 화면엔 안 맞는다.',
    base: 'light',
    vars: {
      bg: '#f5efe6', sur: '#ffffff', line: 'transparent', fg: '#3a3128', dim: '#786b5c',
      acc: '#b85d34', accFg: '#ffffff', sideBg: '#faf6f0', navOn: '#f0e5d6', navOnFg: '#6b4a2f',
      bw: '0', r: '16', sh: '0 6px 14px rgba(120,95,70,.13), inset 0 -2px 4px rgba(150,125,100,.08)',
      font: 'Inter,system-ui,sans-serif', headFont: 'inherit', headWeight: '700', tracking: '-0.01em',
    },
    alt: {
      bg: '#1a1613', sur: '#262019', line: 'transparent', fg: '#efe6d9', dim: '#a2937e',
      acc: '#e08a5c', accFg: '#1a1613', sideBg: '#1f1a15', navOn: '#33291f', navOnFg: '#efe6d9',
      sh: '0 6px 14px rgba(0,0,0,.42), inset 0 -2px 4px rgba(255,255,255,.04)',
    },
    extra: `.pv-side{border-radius:0 calc(var(--u) * 20) calc(var(--u) * 20) 0}
.pv-kpi,.pv-panel,.pv-btn{box-shadow:var(--s-sh)}
.pv-nav{border-radius:calc(var(--u) * 11)}`,
    extraFull: `.fv-side{border-radius:0 calc(var(--v) * 26) calc(var(--v) * 26) 0}
.fv-nav{border-radius:calc(var(--v) * 12)}
.fv-search,.fv-ws{border-width:0}`,
  },
  {
    id: 'deep-forest',
    name: '딥 포레스트',
    sub: '짙은 녹색에 골드 액센트. 묵직하고 신뢰감 있게',
    lineage: '뉴트럴 SaaS + 럭셔리',
    bench: [
      ['Robinhood', 'https://robinhood.com', '자산 화면의 숫자 위계와 표기 규칙'],
      ['Wealthfront', 'https://www.wealthfront.com', '자산 배분 시각화의 절제된 표현'],
      ['토스증권', 'https://tossinvest.com', '국내 상승·하락 색 관례 확인용'],
    ],
    fits: '금융·자산관리·프라이빗 뱅킹',
    watch: '골드는 작은 텍스트에서 대비가 부족하다. 면과 테두리에만 쓰고 본문에는 쓰지 말 것.',
    base: 'dark',
    vars: {
      bg: '#0c1f18', sur: '#112a21', line: '#224a3a', fg: '#e8f0ea', dim: '#85a396',
      acc: '#d4b483', accFg: '#0c1f18', sideBg: '#0a1b15', navOn: '#17362b', navOnFg: '#d4b483',
      bw: '1', r: '6', sh: '0 1px 2px rgba(0,0,0,.35)', font: 'Inter,system-ui,sans-serif',
      headFont: 'inherit', headWeight: '560', tracking: '-0.01em',
    },
    alt: {
      bg: '#f6f9f7', sur: '#ffffff', line: '#c3d7ce', fg: '#0c1f18', dim: '#5d786e',
      acc: '#8a6c33', accFg: '#ffffff', sideBg: '#eef4f1', navOn: '#e0ece6', navOnFg: '#164034',
      sh: '0 1px 2px rgba(12,31,24,.07)',
    },
    extra: `.pv-side{border-right:1px solid var(--s-line)}
.pv-kpi,.pv-panel{border:1px solid var(--s-line)}`,
    // 기본 경고색(앰버)이 골드 액센트와 거의 같아서 손실이 수익처럼 읽힌다 — 테라코타로 분리
    extraFull: `.fv-side{border-right:var(--fv-bd)}
.fv{--fv-warn:#e2705a;--fv-mid:#7fb8a0}`,
    altExtraFull: `.fv{--fv-warn:#b8452f;--fv-mid:#3f7a63}`,
  },
  {
    id: 'navy-signal',
    name: '네이비 시그널',
    sub: '네이비 바탕에 오렌지 시그널 하나',
    lineage: '뉴트럴 SaaS + 코퍼레이트',
    bench: [
      ['Linear', 'https://linear.app', '보드·이슈 UI의 밀도와 키보드 우선 설계'],
      ['Height', 'https://height.app', '칸반 컬럼·카드 정보량의 균형'],
      ['Jira', 'https://www.atlassian.com/software/jira', '엔터프라이즈 규모에서의 보드 확장 방식 — 반면교사 포함'],
    ],
    fits: '엔터프라이즈 B2B, 물류·운영 대시보드',
    watch: '오렌지를 액센트와 경고에 동시에 쓰면 구분이 사라진다. 둘 중 하나만 오렌지로.',
    base: 'dark',
    vars: {
      bg: '#0d1b34', sur: '#132445', line: '#29416c', fg: '#e6ecf7', dim: '#8195b5',
      acc: '#ff6b35', accFg: '#0d1b34', sideBg: '#0a1730', navOn: '#1c3159', navOnFg: '#ffb094',
      bw: '1', r: '6', sh: '0 1px 2px rgba(0,0,0,.35)', font: 'Inter,system-ui,sans-serif',
      headFont: 'inherit', headWeight: '600', tracking: '-0.012em',
    },
    alt: {
      bg: '#f6f8fc', sur: '#ffffff', line: '#c8d3e7', fg: '#0d1b34', dim: '#5d6f8f',
      acc: '#cc4d1a', accFg: '#ffffff', sideBg: '#eef2f9', navOn: '#e2e9f6', navOnFg: '#0d1b34',
      sh: '0 1px 2px rgba(13,27,52,.07)',
    },
    extra: `.pv-side{border-right:1px solid var(--s-line)}
.pv-kpi,.pv-panel{border:1px solid var(--s-line)}`,
    // 액센트가 오렌지라 앰버 경고색과 붙는다 — 지연 배지가 정상 배지와 구분되게 붉은 쪽으로
    extraFull: `.fv-side{border-right:var(--fv-bd)}
.fv{--fv-warn:#ff4d6a;--fv-mid:#7fb0e8}`,
    altExtraFull: `.fv{--fv-warn:#d61f42;--fv-mid:#2a6fd6}`,
  },
  {
    id: 'mint-paper',
    name: '민트 페이퍼',
    sub: '밝은 민트와 흰 여백. 청결하고 가볍게',
    lineage: '미니멀 + 소프트 컨슈머',
    bench: [
      ['Zocdoc', 'https://www.zocdoc.com', '예약 플로우 단계 설계의 기준'],
      ['Calendly', 'https://calendly.com', '날짜·시간 슬롯 선택 UI의 표준형'],
      ['똑닥', 'https://www.ddocdoc.com', '국내 병원 예약 플로우 참고'],
    ],
    fits: '헬스케어·에듀·예약 서비스',
    watch: '전체가 밝아서 경고·오류가 묻힌다. 상태색 대비를 따로 확보해야 한다.',
    base: 'light',
    vars: {
      bg: '#f4fbf8', sur: '#ffffff', line: '#b6dbcc', fg: '#10241d', dim: '#577a6f',
      acc: '#0d8568', accFg: '#ffffff', sideBg: '#ffffff', navOn: '#e0f4ed', navOnFg: '#0b6b54',
      bw: '1', r: '10', sh: '0 1px 2px rgba(15,100,80,.06)', font: 'Inter,system-ui,sans-serif',
      headFont: 'inherit', headWeight: '600', tracking: '-0.012em',
    },
    alt: {
      bg: '#0b1714', sur: '#10211c', line: '#224239', fg: '#e2f2ec', dim: '#7ba396',
      acc: '#2fc79f', accFg: '#06170f', sideBg: '#0d1c18', navOn: '#163029', navOnFg: '#2fc79f',
      sh: '0 1px 2px rgba(0,0,0,.35)',
    },
    extra: `.pv-side{border-right:1px solid var(--s-line)}
.pv-kpi,.pv-panel{border:1px solid var(--s-line)}`,
    extraFull: `.fv-side{border-right:var(--fv-bd)}`,
  },
  {
    id: 'indigo-class',
    name: '인디고 클래스',
    sub: '차분한 인디고에 넉넉한 여백. 진도와 완료가 주인공',
    lineage: '소프트 컨슈머 + 에듀테크',
    bench: [
      ['Coursera', 'https://www.coursera.org', '커리큘럼 트리와 진도 표기의 사실상 표준형'],
      ['인프런', 'https://www.inflearn.com', '국내 수강 화면·질문 탭 구성의 기준선'],
      ['Duolingo', 'https://www.duolingo.com', '완료·연속 학습을 보상처럼 보이게 만드는 법'],
    ],
    fits: '온라인 강의·학원·사내 교육(LMS) — 진도와 완료가 화면의 주인공인 곳',
    watch: '진도·완료·잠김·마감을 전부 액센트 하나로 칠하면 아무것도 구분이 안 된다. 완료는 액센트, 진행은 중간색, 잠김은 딤으로 못 박아야 한다.',
    base: 'light',
    vars: {
      bg: '#f6f7fc', sur: '#ffffff', line: '#cdd0e8', fg: '#171a2b', dim: '#666c90',
      acc: '#4c4ddc', accFg: '#ffffff', sideBg: '#ffffff', navOn: '#ecedfc', navOnFg: '#3436b5',
      bw: '1', r: '12', sh: '0 1px 2px rgba(23,26,43,.06)', font: 'Inter,system-ui,sans-serif',
      headFont: 'inherit', headWeight: '620', tracking: '-0.015em',
    },
    alt: {
      bg: '#12131f', sur: '#191b2b', line: '#353956', fg: '#e9eaf5', dim: '#9298bd',
      acc: '#8b8dff', accFg: '#12131f', sideBg: '#0e0f19', navOn: '#23263c', navOnFg: '#a8aaff',
      sh: '0 1px 2px rgba(0,0,0,.35)',
    },
    extra: `.pv-side{border-right:1px solid var(--s-line)}
.pv-kpi,.pv-panel{border:1px solid var(--s-line)}`,
    // 기본 중간색(파랑)이 인디고 액센트와 붙어서 '진행 중'이 '완료'처럼 읽힌다 — 청록으로 떼어놓는다
    extraFull: `.fv-side{border-right:var(--fv-bd)}
.fv{--fv-mid:#0e8f86}`,
    altExtraFull: `.fv{--fv-mid:#3ecfc0}`,
  },
  {
    id: 'rose-lounge',
    name: '로즈 라운지',
    sub: '따뜻한 로즈에 둥근 형태. 사람이 먼저 보이게',
    lineage: '소프트 컨슈머 + 소셜',
    bench: [
      ['Reddit', 'https://www.reddit.com', '투표·댓글 뎁스 표기의 원형 — 좋고 나쁨 다 배울 것'],
      ['오늘의집', 'https://ohou.se', '국내 관심사 커뮤니티의 카드·태그 밀도 기준'],
      ['Discord', 'https://discord.com', '읽음/안읽음과 알림 위계를 색 하나로 안 풀어낸 예'],
    ],
    fits: '관심사 커뮤니티·포럼·후기 서비스 — 아바타와 활동량이 화면의 주인공인 곳',
    watch: '로즈는 오류색으로도 읽힌다. 신고·차단·삭제에는 절대 액센트를 쓰지 말고 danger 색을 따로 잡아야 한다.',
    base: 'light',
    vars: {
      bg: '#fdf7f8', sur: '#ffffff', line: '#e8cbd3', fg: '#241a1e', dim: '#79616a',
      acc: '#cb2d62', accFg: '#ffffff', sideBg: '#ffffff', navOn: '#fdeaf0', navOnFg: '#a81f4c',
      bw: '1', r: '14', sh: '0 1px 2px rgba(36,26,30,.06)', font: 'Inter,system-ui,sans-serif',
      headFont: 'inherit', headWeight: '640', tracking: '-0.015em',
    },
    alt: {
      bg: '#191218', sur: '#221921', line: '#4b3342', fg: '#f2e9ed', dim: '#a98f9a',
      acc: '#ff86ad', accFg: '#191218', sideBg: '#140f14', navOn: '#2f202a', navOnFg: '#ff9dbd',
      sh: '0 1px 2px rgba(0,0,0,.35)',
    },
    extra: `.pv-side{border-right:1px solid var(--s-line)}
.pv-kpi,.pv-panel{border:1px solid var(--s-line)}`,
    // 액센트가 로즈라 경고색(앰버)까지는 구분되지만, 파괴적 동작은 붉은 쪽으로 더 밀어야 한다
    extraFull: `.fv-side{border-right:var(--fv-bd)}
.fv{--fv-warn:#a8620a;--fv-danger:#c02626}`,
    altExtraFull: `.fv{--fv-warn:#e8a94f;--fv-danger:#ff6b6b}`,
  },
  {
    id: 'civic-blue',
    name: '시빅 블루',
    sub: '각진 형태에 두꺼운 선. 세련됨을 버리고 누구나 읽히게',
    lineage: '공공 디자인 시스템 (GOV.UK · USWDS)',
    bench: [
      ['GOV.UK Design System', 'https://design-system.service.gov.uk', '공공 UI의 사실상 표준 — 접근성을 기본값으로 둔 유일한 대형 시스템'],
      ['U.S. Web Design System', 'https://designsystem.digital.gov', '색·타이포·컴포넌트를 접근성 등급과 함께 배포하는 방식'],
      ['정부24', 'https://www.gov.kr', '국내 민원 포털의 정보 구조와 용어 관례 확인용'],
    ],
    fits: '관공서·협회·대학·공기업 — 웹접근성 인증(KWCAG)이 계약 조건에 들어가는 곳',
    watch: '예쁘게 만들려는 순간 이 스킨의 존재 이유가 사라진다. 라운드를 키우거나 선을 얇게 하거나 회색 본문을 쓰는 수정 요청은 근거를 대고 막아야 한다.',
    base: 'light',
    vars: {
      bg: '#f4f6fa', sur: '#ffffff', line: '#c6d0de', fg: '#0f192b', dim: '#4a5769',
      acc: '#003a8c', accFg: '#ffffff', sideBg: '#ffffff', navOn: '#e3ecf9', navOnFg: '#002f73',
      bw: '2', r: '2', sh: 'none', font: 'Inter,system-ui,sans-serif',
      headFont: 'inherit', headWeight: '700', tracking: '-0.005em',
    },
    alt: {
      bg: '#0e1420', sur: '#161f2e', line: '#35445d', fg: '#eef2f8', dim: '#a9b6c8',
      acc: '#6fa8ff', accFg: '#0e1420', sideBg: '#0b111b', navOn: '#1e2b3f', navOnFg: '#9cc3ff',
      sh: 'none',
    },
    extra: `.pv-side{border-right:2px solid var(--s-line)}
.pv-kpi,.pv-panel{border:2px solid var(--s-line);box-shadow:none}`,
    // 이 스킨만 본문을 키운다 — 고령·저시력 사용자가 실제 사용자층이다
    extraFull: `.fv{font-size:calc(var(--v) * 14.5)}
.fv-side{border-right:var(--fv-bd)}
.fv-kpi,.fv-card,.fv-btn{box-shadow:none}`,
  },
  {
    id: 'stark-mono',
    name: '스타크 모노',
    sub: '순백과 순흑, 라운드 0. 색을 빼고 타이포로만 말한다',
    lineage: '스위스 타이포그래피 + 브루탈리즘',
    bench: [
      ['Linear', 'https://linear.app', '헤드라인 크기와 여백만으로 위계를 만드는 랜딩의 현행 기준'],
      ['Vercel', 'https://vercel.com', '흑백 + 헤어라인 구획, 색 없이 CTA를 세우는 법'],
      ['Framer', 'https://www.framer.com', '대형 타이포와 제품 목업의 배치 비율'],
    ],
    fits: '브랜드 랜딩·회사 소개·제품 소개 — 화면이 적고 조판이 결과물의 전부인 곳',
    watch: '색이 없으니 여백과 크기 차이가 전부다. 헤드라인을 두 단계만 줄여도 화면이 무너진다. 그리고 이 스킨은 대형 타이포 전제라 카피가 길면 성립하지 않는다 — 문구 길이를 먼저 확정하고 시작할 것.',
    base: 'light',
    vars: {
      bg: '#ffffff', sur: '#ffffff', line: '#111111', fg: '#0a0a0a', dim: '#5c5c5c',
      acc: '#0a0a0a', accFg: '#ffffff', sideBg: '#ffffff', navOn: '#f0f0f0', navOnFg: '#0a0a0a',
      bw: '1', r: '0', sh: 'none', font: 'Inter,system-ui,sans-serif',
      headFont: 'inherit', headWeight: '800', tracking: '-0.04em',
    },
    // 다크는 원칙적으로 반전이 아니지만, 색이 없는 브랜드 랜딩은 예외다.
    // 데이터 앱이 아니라 elevation 체계가 없고, 반전 자체가 이 스타일의 표현 수단이다.
    // 대신 표면(#141414)을 배경(#0d0d0d)보다 밝게 둬서 완전한 반전은 피한다.
    alt: {
      bg: '#0d0d0d', sur: '#141414', line: '#e5e5e5', fg: '#fafafa', dim: '#a0a0a0',
      acc: '#fafafa', accFg: '#0d0d0d', sideBg: '#0d0d0d', navOn: '#1f1f1f', navOnFg: '#fafafa',
      sh: 'none',
    },
    extra: `.pv-kpi,.pv-panel{border:1px solid var(--s-line);box-shadow:none}`,
    // --s-line 이 거의 검정이라 '채움 트랙'으로 쓰이는 자리는 따로 낮춰야 한다.
    // 안 그러면 꺼진 토글이 켜진 것처럼 보인다.
    extraFull: `.fv-kpi,.fv-card,.fv-btn{box-shadow:none}
.fv-bar,.dt i{background:#d9d9d9}
.fv-side{border-right:var(--fv-bd)}
.fv-av{background:var(--s-fg);color:var(--s-bg)}`,
    altExtraFull: `.fv-bar,.dt i{background:#3a3a3a}`,
  },
]

/**
 * CSS 규칙을 **규칙 단위**로 쪼개서 셀렉터에만 접두사를 붙인다.
 * 줄 단위로 붙이면 여러 줄에 걸친 규칙(그라디언트 배경 등)이 통째로 깨진다.
 */
export function scopeCss(extra, scope) {
  return extra.split('}').map(c => c.trim()).filter(Boolean).map(chunk => {
    const i = chunk.indexOf('{')
    if (i < 0) return ''
    const sels = chunk.slice(0, i).split(',').map(x => `${scope} ${x.trim()}`).join(',')
    return `${sels}{${chunk.slice(i + 1).trim()}}`
  }).filter(Boolean).join('\n')
}

/** 스킨의 특정 모드 값 (vars 위에 alt 병합) */
export function modeVars(s, mode) {
  return s.base === mode ? s.vars : { ...s.vars, ...s.alt }
}

const varBlock = v => `
  --s-bg:${v.bg}; --s-sur:${v.sur}; --s-line:${v.line}; --s-fg:${v.fg}; --s-dim:${v.dim};
  --s-acc:${v.acc}; --s-acc-fg:${v.accFg}; --s-side-bg:${v.sideBg};
  --s-nav-on:${v.navOn}; --s-nav-on-fg:${v.navOnFg};
  --s-bw:${v.bw}; --s-r:${v.r}; --s-sh:${v.sh}; --s-font:${v.font}; --s-head-font:${v.headFont};
  --s-head-w:${v.headWeight}; --s-track:${v.tracking};`

/** 스킨들이 쓰는 웹폰트 → <link> 태그 (중복 제거) */
export function fontLinks(skins) {
  const urls = [...new Set(skins.flatMap(s => s.fonts || []))]
  // 폰트 CSS 가 막혀도 font-family 뒤쪽 시스템 폰트로 떨어질 뿐 레이아웃은 그대로다
  return urls.map(u => `<link rel="stylesheet" href="${u}">`).join('\n')
}

/**
 * 스킨 하나 → 스코프된 CSS (라이트/다크 두 벌)
 *
 * 모드 클래스는 **같은 엘리먼트**에 붙인다 (`.sk-id.mode-dark`).
 * 조상 셀렉터로 하면 라이트 페이지 안에 다크 프리뷰를 나란히 둘 때
 * 조상 규칙과 충돌해서 한쪽이 잘못 렌더된다.
 */
export function skinCss(s) {
  const altMode = s.base === 'light' ? 'dark' : 'light'
  return [
    `.sk-${s.id}.mode-light{${varBlock(modeVars(s, 'light'))}\n}`,
    `.sk-${s.id}.mode-dark{${varBlock(modeVars(s, 'dark'))}\n}`,
    scopeCss([s.extra, s.extraFull].filter(Boolean).join('\n'), `.sk-${s.id}`),
    (s.altExtra || s.altExtraFull)
      ? scopeCss([s.altExtra, s.altExtraFull].filter(Boolean).join('\n'), `.sk-${s.id}.mode-${altMode}`)
      : '',
  ].filter(Boolean).join('\n')
}

/* ============================================================
 * 상세용 풀 목업 — 카드 프리뷰(PREVIEW)의 확대판이 아니라 별도 화면이다.
 * 카드는 "훑어보기"용이라 단순해야 하고, 상세는 **상품 사진**이어야 한다.
 *
 * 회색 사각형 아이콘 하나가 "완성도 없음"을 광고한다. 그래서 여기는
 * 실제 아이콘 SVG · 이니셜 아바타 · 차트 4종(영역·도넛·링·바)까지 넣는다.
 * 토큰(--s-*)은 카드와 동일하게 공유하므로 스킨을 바꾸면 전부 따라 바뀐다.
 * ============================================================ */

/** 아이콘 스프라이트 — 페이지에 한 번만 심고 <use>로 참조한다 */
export const ICON_SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
<symbol id="i-grid" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></symbol>
<symbol id="i-cart" viewBox="0 0 24 24"><circle cx="9.5" cy="19.5" r="1.4"/><circle cx="17.5" cy="19.5" r="1.4"/><path d="M2.5 3.5h2.2l2.4 11.3a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L20.5 7.5H5.6"/></symbol>
<symbol id="i-box" viewBox="0 0 24 24"><path d="M12 2.8 3.5 7.2v9.6L12 21.2l8.5-4.4V7.2L12 2.8Z"/><path d="M3.5 7.2 12 11.6l8.5-4.4M12 11.6v9.6"/></symbol>
<symbol id="i-users" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.4"/><path d="M2.6 20.5a6.4 6.4 0 0 1 12.8 0"/><path d="M16.4 5.2a3.4 3.4 0 0 1 0 5.6"/><path d="M17.8 14.6a6.4 6.4 0 0 1 3.6 5.9"/></symbol>
<symbol id="i-chart" viewBox="0 0 24 24"><path d="M3 20.5h18"/><path d="M6.5 20.5v-6M11.5 20.5V6.5M16.5 20.5v-9M20.5 20.5v-4"/></symbol>
<symbol id="i-sliders" viewBox="0 0 24 24"><path d="M3.5 7.5h9M17.5 7.5h3M3.5 16.5h3M11.5 16.5h9"/><circle cx="15" cy="7.5" r="2.2"/><circle cx="9" cy="16.5" r="2.2"/></symbol>
<symbol id="i-search" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.6 15.6 5 5"/></symbol>
<symbol id="i-bell" viewBox="0 0 24 24"><path d="M18 8.5a6 6 0 1 0-12 0c0 5.8-2 6.8-2 6.8h16s-2-1-2-6.8Z"/><path d="M10.3 19.2a2 2 0 0 0 3.4 0"/></symbol>
<symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5.5v13M5.5 12h13"/></symbol>
<symbol id="i-down" viewBox="0 0 24 24"><path d="M12 3.5v11m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></symbol>
<symbol id="i-cal" viewBox="0 0 24 24"><rect x="3.2" y="5" width="17.6" height="16" rx="2.2"/><path d="M8 3v4M16 3v4M3.2 10h17.6"/></symbol>
<symbol id="i-trend" viewBox="0 0 24 24"><path d="m3 17.5 6-6 4 4 8-8"/><path d="M15.5 7.5H21v5.5"/></symbol>
</svg>`

const icon = (id, cls = 'fv-i') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`

const NAV = [
  ['grid', '대시보드', true, ''],
  ['cart', '주문', false, '24'],
  ['box', '재고', false, ''],
  ['users', '고객', false, ''],
]
const NAV2 = [['chart', '리포트'], ['sliders', '설정']]

const KPIS = [
  ['cart', '총 주문', '1,284', '+12.4%', 'up'],
  ['trend', '매출', '₩48.2M', '+8.1%', 'up'],
  ['users', '신규 고객', '312', '+5.2%', 'up'],
  ['box', '평균 배송', '1.8일', '−0.3일', 'down'],
]

/** 이니셜 아바타 — 색은 이름별로 고정 (data-c) */
const av = (initial, c, cls = '') => `<span class="fv-av ${cls}" data-c="${c}">${initial}</span>`

const TB_ROWS = [
  ['#10241', '김서연', '김', 1, '₩248,000', '완료', 'ok'],
  ['#10240', '이준호', '이', 2, '₩92,500', '배송중', 'mid'],
  ['#10239', '박민지', '박', 3, '₩1,120,000', '대기', 'idle'],
  ['#10238', '최도현', '최', 4, '₩38,000', '완료', 'ok'],
]

/** 도넛 — 반지름 15.9155 → 둘레 100. dasharray 값이 곧 퍼센트다 */
const DONUT = [['가전', 42, 1], ['패션', 27, 2], ['식품', 18, 3], ['기타', 13, 4]]
const donutSegs = () => {
  let off = 0
  return DONUT.map(([, pct, i]) => {
    const seg = `<circle class="d-seg d${i}" cx="21" cy="21" r="15.9155"
      stroke-dasharray="${pct} ${100 - pct}" stroke-dashoffset="${-off}"/>`
    off += pct
    return seg
  }).join('')
}

const GOALS = [['신규 고객', 78], ['재구매율', 54], ['객단가', 91]]

export const PREVIEW_FULL = `<div class="fv">
  <aside class="fv-side">
    <div class="fv-ws">${icon('box', 'fv-i fv-logo')}<b>Acme Inc.</b>${icon('down', 'fv-i fv-cv')}</div>
    <nav class="fv-navs">
      <div class="fv-lbl">작업</div>
      ${NAV.map(([ic, label, on, cnt]) =>
  `<div class="fv-nav${on ? ' is-on' : ''}">${icon(ic)}${label}${cnt ? `<span class="fv-cnt">${cnt}</span>` : ''}</div>`).join('')}
      <div class="fv-lbl">분석</div>
      ${NAV2.map(([ic, label]) => `<div class="fv-nav">${icon(ic)}${label}</div>`).join('')}
    </nav>
    <div class="fv-user">${av('진', 5)}<div><b>박진우</b><small>jinwoo@acme.co</small></div></div>
  </aside>

  <div class="fv-body">
    <header class="fv-top">
      <div class="fv-crumb">재고 <i>/</i> <b>대시보드</b></div>
      <div class="fv-search">${icon('search')}<span>주문·고객 검색</span><span class="fv-kbd">⌘K</span></div>
      <div class="fv-tools">${icon('cal')}${icon('bell')}${av('진', 5, 'sm')}</div>
    </header>

    <main class="fv-main">
      <div class="fv-h">
        <div><h2>대시보드</h2><p>최근 30일 · 2026년 8월 기준</p></div>
        <div class="fv-btns">
          <span class="fv-btn ghost">${icon('down')}내보내기</span>
          <span class="fv-btn">${icon('plus')}새로 만들기</span>
        </div>
      </div>

      <div class="fv-kpis">
        ${KPIS.map(([ic, l, v, d, dir]) => `<div class="fv-kpi">
          <div class="fv-kpi-t"><small>${l}</small><span class="fv-kpi-i">${icon(ic)}</span></div>
          <b>${v}</b><em class="${dir}">${icon('trend')}${d}</em>
        </div>`).join('')}
      </div>

      <div class="fv-grid">
        <section class="fv-card">
          <div class="fv-card-h"><h3>주문 추이</h3>
            <div class="fv-seg"><span class="on">30일</span><span>90일</span></div>
          </div>
          <div class="fv-chart">
            <svg class="fv-svg" viewBox="0 0 320 100" preserveAspectRatio="none">
              <line class="fv-gl" x1="0" y1="25" x2="320" y2="25"/>
              <line class="fv-gl" x1="0" y1="55" x2="320" y2="55"/>
              <line class="fv-gl" x1="0" y1="85" x2="320" y2="85"/>
              <path class="fv-area" d="M0,74 L29,62 L58,68 L87,50 L116,58 L145,40 L175,46 L204,30 L233,38 L262,24 L291,30 L320,16 L320,100 L0,100 Z"/>
              <path class="fv-line" d="M0,74 L29,62 L58,68 L87,50 L116,58 L145,40 L175,46 L204,30 L233,38 L262,24 L291,30 L320,16"/>
            </svg>
          </div>
          <div class="fv-axis"><span>7/16</span><span>7/23</span><span>7/30</span><span>8/6</span><span>8/13</span></div>
        </section>

        <section class="fv-card">
          <div class="fv-card-h"><h3>카테고리 비중</h3></div>
          <div class="fv-donut-row">
            <svg class="fv-donut" viewBox="0 0 42 42">
              <circle class="d-bg" cx="21" cy="21" r="15.9155"/>
              ${donutSegs()}
            </svg>
            <ul class="fv-legend">
              ${DONUT.map(([n, pct, i]) =>
    `<li><i class="lg d${i}"></i><span>${n}</span><em>${pct}%</em></li>`).join('')}
            </ul>
          </div>
        </section>
      </div>

      <div class="fv-grid">
        <section class="fv-card">
          <div class="fv-card-h"><h3>최근 주문</h3><span class="fv-link">전체 보기</span></div>
          <table class="fv-tb">
            <thead><tr><th>주문번호</th><th>고객</th><th class="r">금액</th><th>상태</th></tr></thead>
            <tbody>
              ${TB_ROWS.map(([id, who, ini, c, amt, st, cls]) =>
      `<tr><td class="mono">${id}</td><td>${av(ini, c, 'xs')}${who}</td><td class="r mono">${amt}</td><td><span class="fv-badge ${cls}">${st}</span></td></tr>`).join('')}
            </tbody>
          </table>
        </section>

        <section class="fv-card">
          <div class="fv-card-h"><h3>분기 목표</h3>
            <div class="fv-stack">${av('김', 1)}${av('이', 2)}${av('박', 3)}<span class="fv-more">+5</span></div>
          </div>
          <div class="fv-ring-row">
            <svg class="fv-ring" viewBox="0 0 42 42">
              <circle class="d-bg" cx="21" cy="21" r="15.9155"/>
              <circle class="r-seg" cx="21" cy="21" r="15.9155" stroke-dasharray="72 28" stroke-dashoffset="0"/>
            </svg>
            <div class="fv-ring-t"><b>72%</b><small>달성률</small></div>
          </div>
          <ul class="fv-bars">
            ${GOALS.map(([n, v]) =>
        `<li><span>${n}</span><div class="fv-bar"><i style="width:${v}%"></i></div><em>${v}%</em></li>`).join('')}
          </ul>
        </section>
      </div>
    </main>
  </div>
</div>`

export const PREVIEW_FULL_CSS = `
/* 카드 프리뷰(16/10)보다 세로가 길다 — 테이블·차트까지 들어가야 실제 화면으로 읽힌다 */
.fv-wrap{container-type:inline-size;aspect-ratio:3/2;overflow:hidden;background:#f2f0ec}
.fv{--v:calc(100cqw / 960);--fv-bd:calc(var(--v) * var(--s-bw)) solid var(--s-line);
  width:100%;height:100%;display:flex;
  background:var(--s-bg);color:var(--s-fg);font-family:var(--s-font);
  font-size:calc(var(--v) * 13);line-height:1.45;-webkit-font-smoothing:antialiased}
.mode-light .fv{--fv-warn:#b0700e;--fv-mid:#3a6ea0}
.mode-dark .fv{--fv-warn:#e0a44a;--fv-mid:#7ab0e0}

/* 아이콘 — stroke 기반. 굵기는 스케일에 맞춰 고정 폭 유지 */
.fv-i{width:calc(var(--v) * 16);height:calc(var(--v) * 16);flex:none;
  fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}

/* 이니셜 아바타 */
.fv-av{width:calc(var(--v) * 26);height:calc(var(--v) * 26);border-radius:50%;flex:none;
  display:inline-flex;align-items:center;justify-content:center;color:#fff;
  font-size:calc(var(--v) * 11);font-weight:600;font-family:inherit;letter-spacing:0}
.fv-av[data-c="1"]{background:#6a7cff}
.fv-av[data-c="2"]{background:#e07a5f}
.fv-av[data-c="3"]{background:#3aa88a}
.fv-av[data-c="4"]{background:#c78b3d}
.fv-av[data-c="5"]{background:#9b6fd4}
.fv-av.sm{width:calc(var(--v) * 22);height:calc(var(--v) * 22);font-size:calc(var(--v) * 10)}
.fv-av.xs{width:calc(var(--v) * 18);height:calc(var(--v) * 18);font-size:calc(var(--v) * 9);
  margin-right:calc(var(--v) * 7);vertical-align:middle}

/* 사이드바 */
.fv-side{width:calc(var(--v) * 208);flex:none;background:var(--s-side-bg);
  display:flex;flex-direction:column;padding:calc(var(--v) * 14) calc(var(--v) * 12);
  gap:calc(var(--v) * 3)}
.fv-ws{display:flex;align-items:center;gap:calc(var(--v) * 8);padding:calc(var(--v) * 8);
  border:var(--fv-bd);box-shadow:var(--s-sh);border-radius:calc(var(--v) * var(--s-r));
  margin-bottom:calc(var(--v) * 12)}
.fv-ws b{font-family:var(--s-head-font);font-weight:var(--s-head-w);
  font-size:calc(var(--v) * 13);letter-spacing:var(--s-track);flex:1;min-width:0}
.fv-logo{width:calc(var(--v) * 18);height:calc(var(--v) * 18);color:var(--s-acc);stroke-width:1.9}
.fv-cv{width:calc(var(--v) * 12);height:calc(var(--v) * 12);opacity:.45}
.fv-navs{display:flex;flex-direction:column;gap:calc(var(--v) * 2)}
.fv-lbl{font-size:calc(var(--v) * 10);color:var(--s-dim);letter-spacing:.06em;
  padding:calc(var(--v) * 10) calc(var(--v) * 8) calc(var(--v) * 4);opacity:.85}
.fv-nav{display:flex;align-items:center;gap:calc(var(--v) * 9);
  padding:calc(var(--v) * 7) calc(var(--v) * 9);border-radius:calc(var(--v) * var(--s-r));
  color:var(--s-dim);font-size:calc(var(--v) * 12.5)}
.fv-nav.is-on{background:var(--s-nav-on);color:var(--s-nav-on-fg)}
.fv-cnt{margin-left:auto;font-size:calc(var(--v) * 10);opacity:.8;
  background:var(--s-acc);color:var(--s-acc-fg);border-radius:calc(var(--v) * 999);
  padding:0 calc(var(--v) * 6);line-height:1.6}
.fv-nav.is-on .fv-cnt{opacity:1}
.fv-user{margin-top:auto;display:flex;align-items:center;gap:calc(var(--v) * 9);
  padding-top:calc(var(--v) * 11);border-top:1px solid var(--s-line)}
.fv-user b{display:block;font-size:calc(var(--v) * 12);font-weight:600}
.fv-user small{display:block;font-size:calc(var(--v) * 10);color:var(--s-dim)}

/* 상단바 */
.fv-body{flex:1;min-width:0;display:flex;flex-direction:column}
.fv-top{height:calc(var(--v) * 52);flex:none;display:flex;align-items:center;
  gap:calc(var(--v) * 14);padding:0 calc(var(--v) * 20);border-bottom:1px solid var(--s-line)}
.fv-crumb{font-size:calc(var(--v) * 12);color:var(--s-dim);white-space:nowrap}
.fv-crumb i{font-style:normal;opacity:.5;margin:0 calc(var(--v) * 3)}
.fv-crumb b{color:var(--s-fg);font-weight:600}
.fv-search{flex:1;max-width:calc(var(--v) * 300);display:flex;align-items:center;
  gap:calc(var(--v) * 7);font-size:calc(var(--v) * 11.5);color:var(--s-dim);
  padding:calc(var(--v) * 6) calc(var(--v) * 10);border:var(--fv-bd);
  border-radius:calc(var(--v) * var(--s-r))}
.fv-kbd{margin-left:auto;font-size:calc(var(--v) * 10);opacity:.75}
.fv-tools{margin-left:auto;display:flex;align-items:center;gap:calc(var(--v) * 12);color:var(--s-dim)}

/* 본문 */
.fv-main{flex:1;min-height:0;padding:calc(var(--v) * 20);display:flex;flex-direction:column;
  gap:calc(var(--v) * 14);overflow:hidden}
.fv-h{display:flex;align-items:flex-start;justify-content:space-between;gap:calc(var(--v) * 16);flex:none}
.fv-h h2{margin:0;font-family:var(--s-head-font);font-weight:var(--s-head-w);
  font-size:calc(var(--v) * 22);letter-spacing:var(--s-track)}
.fv-h p{margin:calc(var(--v) * 2) 0 0;font-size:calc(var(--v) * 11.5);color:var(--s-dim)}
.fv-btns{display:flex;gap:calc(var(--v) * 8);flex:none}
.fv-btn{display:flex;align-items:center;gap:calc(var(--v) * 6);
  background:var(--s-acc);color:var(--s-acc-fg);font-size:calc(var(--v) * 11.5);
  font-weight:600;padding:calc(var(--v) * 7) calc(var(--v) * 13);
  border-radius:calc(var(--v) * var(--s-r));white-space:nowrap;box-shadow:var(--s-sh)}
.fv-btn.ghost{background:transparent;color:var(--s-fg);border:var(--fv-bd)}
.fv-btn .fv-i{width:calc(var(--v) * 13);height:calc(var(--v) * 13)}

.fv-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:calc(var(--v) * 12);flex:none}
.fv-kpi{background:var(--s-sur);border:var(--fv-bd);box-shadow:var(--s-sh);
  border-radius:calc(var(--v) * var(--s-r));padding:calc(var(--v) * 12) calc(var(--v) * 14);
  display:flex;flex-direction:column;gap:calc(var(--v) * 2);min-width:0}
.fv-kpi-t{display:flex;align-items:center;justify-content:space-between;gap:calc(var(--v) * 8)}
.fv-kpi small{font-size:calc(var(--v) * 11);color:var(--s-dim)}
.fv-kpi-i{display:flex;color:var(--s-acc);opacity:.85}
.fv-kpi-i .fv-i{width:calc(var(--v) * 14);height:calc(var(--v) * 14)}
.fv-kpi b{font-family:var(--s-head-font);font-weight:var(--s-head-w);
  font-size:calc(var(--v) * 25);letter-spacing:var(--s-track);line-height:1.15}
.fv-kpi em{font-style:normal;font-size:calc(var(--v) * 11);color:var(--s-dim);
  display:flex;align-items:center;gap:calc(var(--v) * 4)}
.fv-kpi em .fv-i{width:calc(var(--v) * 12);height:calc(var(--v) * 12)}
.fv-kpi em.up{color:var(--s-acc)}
.fv-kpi em.down{color:var(--fv-warn)}
.fv-kpi em.down .fv-i{transform:scaleY(-1)}

.fv-grid{display:grid;grid-template-columns:1.6fr 1fr;gap:calc(var(--v) * 12);flex:1;min-height:0}
.fv-card{background:var(--s-sur);border:var(--fv-bd);box-shadow:var(--s-sh);
  border-radius:calc(var(--v) * var(--s-r));padding:calc(var(--v) * 13) calc(var(--v) * 15);
  display:flex;flex-direction:column;min-width:0;min-height:0}
.fv-card-h{display:flex;align-items:center;justify-content:space-between;
  gap:calc(var(--v) * 10);margin-bottom:calc(var(--v) * 10);flex:none}
.fv-card-h h3{margin:0;font-family:var(--s-head-font);font-weight:var(--s-head-w);
  font-size:calc(var(--v) * 13.5);letter-spacing:var(--s-track)}
.fv-link{font-size:calc(var(--v) * 11);color:var(--s-acc)}
.fv-seg{display:flex;border:var(--fv-bd);border-radius:calc(var(--v) * var(--s-r));overflow:hidden}
.fv-seg span{font-size:calc(var(--v) * 10.5);padding:calc(var(--v) * 3) calc(var(--v) * 9);
  color:var(--s-dim)}
.fv-seg span.on{background:var(--s-nav-on);color:var(--s-nav-on-fg)}

/* 아바타 스택 */
.fv-stack{display:flex;align-items:center}
.fv-stack .fv-av{width:calc(var(--v) * 20);height:calc(var(--v) * 20);
  font-size:calc(var(--v) * 9.5);margin-left:calc(var(--v) * -6);
  box-shadow:0 0 0 calc(var(--v) * 1.5) var(--s-sur)}
.fv-stack .fv-av:first-child{margin-left:0}
.fv-more{font-size:calc(var(--v) * 10);color:var(--s-dim);margin-left:calc(var(--v) * 5)}

/* 영역 차트 */
.fv-chart{flex:1;min-height:calc(var(--v) * 80)}
.fv-svg{width:100%;height:100%;display:block}
.fv-gl{stroke:var(--s-line);stroke-width:1;vector-effect:non-scaling-stroke}
.fv-area{fill:var(--s-acc);opacity:.15}
.fv-line{fill:none;stroke:var(--s-acc);stroke-width:2;vector-effect:non-scaling-stroke;
  stroke-linejoin:round;stroke-linecap:round}
.fv-axis{display:flex;justify-content:space-between;margin-top:calc(var(--v) * 7);
  font-size:calc(var(--v) * 10);color:var(--s-dim);flex:none}

/* 도넛 + 범례 — 반지름 15.9155 이므로 둘레가 100, dasharray 값이 곧 % */
.fv-donut-row{flex:1;display:flex;align-items:center;gap:calc(var(--v) * 14);min-height:0}
.fv-donut,.fv-ring{width:calc(var(--v) * 92);height:calc(var(--v) * 92);flex:none;
  transform:rotate(-90deg)}
.d-bg{fill:none;stroke:var(--s-line);stroke-width:5.5}
.d-seg,.r-seg{fill:none;stroke-width:5.5}
/* 연한 단계는 transparent 가 아니라 **표면색**과 섞는다 —
   투명으로 섞으면 다크 스킨에서 배경에 묻혀 세그먼트가 사라진다 */
.d1{stroke:var(--s-acc)}
.d2{stroke:color-mix(in srgb,var(--s-acc) 66%,var(--s-sur))}
.d3{stroke:color-mix(in srgb,var(--s-acc) 44%,var(--s-sur))}
.d4{stroke:color-mix(in srgb,var(--s-acc) 26%,var(--s-sur))}
.r-seg{stroke:var(--s-acc);stroke-linecap:round}
.fv-legend{list-style:none;margin:0;padding:0;flex:1;min-width:0;
  display:flex;flex-direction:column;gap:calc(var(--v) * 7)}
.fv-legend li{display:flex;align-items:center;gap:calc(var(--v) * 7);
  font-size:calc(var(--v) * 11.5)}
.fv-legend em{font-style:normal;margin-left:auto;color:var(--s-dim);
  font-variant-numeric:tabular-nums}
.lg{width:calc(var(--v) * 9);height:calc(var(--v) * 9);border-radius:calc(var(--v) * 2.5);
  flex:none;background:currentColor}
.lg.d1{color:var(--s-acc)}
.lg.d2{color:color-mix(in srgb,var(--s-acc) 66%,var(--s-sur))}
.lg.d3{color:color-mix(in srgb,var(--s-acc) 44%,var(--s-sur))}
.lg.d4{color:color-mix(in srgb,var(--s-acc) 26%,var(--s-sur))}

/* 프로그레스 링 + 바 */
.fv-ring-row{display:flex;align-items:center;gap:calc(var(--v) * 12);flex:none;
  margin-bottom:calc(var(--v) * 12)}
.fv-ring{width:calc(var(--v) * 62);height:calc(var(--v) * 62)}
.fv-ring-t b{display:block;font-family:var(--s-head-font);font-weight:var(--s-head-w);
  font-size:calc(var(--v) * 24);letter-spacing:var(--s-track);line-height:1.1}
.fv-ring-t small{font-size:calc(var(--v) * 11);color:var(--s-dim)}
.fv-bars{list-style:none;margin:auto 0 0;padding:0;display:flex;flex-direction:column;
  gap:calc(var(--v) * 9)}
.fv-bars li{display:flex;align-items:center;gap:calc(var(--v) * 9);font-size:calc(var(--v) * 11)}
.fv-bars li>span{width:calc(var(--v) * 58);flex:none;color:var(--s-dim)}
.fv-bars em{font-style:normal;width:calc(var(--v) * 26);text-align:right;flex:none;
  font-variant-numeric:tabular-nums}
.fv-bar{flex:1;height:calc(var(--v) * 6);border-radius:calc(var(--v) * 999);
  background:var(--s-line);overflow:hidden}
.fv-bar i{display:block;height:100%;background:var(--s-acc);border-radius:inherit}

.fv-badge{font-size:calc(var(--v) * 10.5);padding:calc(var(--v) * 2) calc(var(--v) * 8);
  border-radius:calc(var(--v) * 999);white-space:nowrap;flex:none;border:1px solid currentColor}
.fv-badge.ok{color:var(--s-acc)}
.fv-badge.warn{color:var(--fv-warn)}
.fv-badge.mid{color:var(--fv-mid)}
.fv-badge.idle{color:var(--s-dim)}

.fv-tb{width:100%;border-collapse:collapse;font-size:calc(var(--v) * 11.5)}
.fv-tb th{text-align:left;font-weight:500;font-size:calc(var(--v) * 10.5);color:var(--s-dim);
  padding:0 calc(var(--v) * 8) calc(var(--v) * 7);border-bottom:1px solid var(--s-line)}
.fv-tb td{padding:calc(var(--v) * 7) calc(var(--v) * 8);border-bottom:1px solid var(--s-line)}
.fv-tb tr:last-child td{border-bottom:0}
.fv-tb .r{text-align:right}
.fv-tb .mono{font-variant-numeric:tabular-nums}
`

/** 카드 프리뷰 — 컴포넌트 클러스터.
 *  레이아웃 축소판이 아니라 확대된 부품(KPI·도넛·버튼·배지·차트 조각)을 겹쳐 띄운다.
 *  카드 크기의 임무는 레이아웃 전달이 아니라 스킨의 성격(색·라운드·그림자·폰트) 전달이다.
 *  클래스명(.pv/.pv-kpi/.pv-panel/.pv-btn)은 스킨 extra CSS가 겨냥하므로 유지한다. */
export const PREVIEW = `<div class="pv">
  <div class="pv-panel">
    <svg class="pv-mini" viewBox="0 0 240 90" preserveAspectRatio="none">
      <path class="pv-mini-a" d="M0,66 L30,54 L60,60 L90,42 L120,50 L150,30 L180,38 L210,20 L240,26 L240,90 L0,90 Z"/>
      <path class="pv-mini-l" d="M0,66 L30,54 L60,60 L90,42 L120,50 L150,30 L180,38 L210,20 L240,26"/>
    </svg>
  </div>
  <svg class="pv-donut" viewBox="0 0 42 42">
    <circle class="pv-d-bg" cx="21" cy="21" r="15.9155"/>
    <circle class="pv-d1" cx="21" cy="21" r="15.9155" stroke-dasharray="44 56" stroke-dashoffset="0"/>
    <circle class="pv-d2" cx="21" cy="21" r="15.9155" stroke-dasharray="26 74" stroke-dashoffset="-44"/>
    <circle class="pv-d3" cx="21" cy="21" r="15.9155" stroke-dasharray="18 82" stroke-dashoffset="-70"/>
  </svg>
  <div class="pv-kpi">
    <small>이번 달 매출</small>
    <b>₩48.2M</b>
    <em><svg class="pv-tr" viewBox="0 0 24 24"><path d="m3 17.5 6-6 4 4 8-8"/><path d="M15.5 7.5H21v5.5"/></svg>+8.1%</em>
  </div>
  <span class="pv-badge">완료</span>
  <span class="pv-btn">새로 만들기</span>
</div>`

/**
 * 클러스터 골격 CSS — 모든 스킨 공통 (여기 값은 스킨이 못 바꾼다)
 *
 * 카드 폭이 달라도 비율이 유지되도록 `--u`(프리뷰 1px)를 컨테이너 폭에서 뽑아 쓴다.
 * transform:scale(calc(100cqw/480)) 은 결과가 <number>가 아니라 <length>여서 무효다 —
 * 그래서 길이를 만들어 쓰는 이 방식이어야 한다. 스킨의 --s-r 은 단위 없는 숫자.
 */
export const PREVIEW_CSS = `
.pv-wrap{container-type:inline-size;aspect-ratio:16/10;overflow:hidden;background:#f2f0ec}
.pv{--u:calc(100cqw / 480);width:100%;height:100%;position:relative;overflow:hidden;
  background:var(--s-bg);color:var(--s-fg);font-family:var(--s-font);
  -webkit-font-smoothing:antialiased}

/* 차트 조각 — 좌하단, 일부러 화면 밖으로 흘림 */
.pv-panel{position:absolute;left:calc(var(--u) * -24);bottom:calc(var(--u) * -34);
  width:calc(var(--u) * 268);height:calc(var(--u) * 150);
  background:var(--s-sur);border-radius:calc(var(--u) * var(--s-r));
  padding:calc(var(--u) * 16);z-index:1}
.pv-mini{width:100%;height:100%;display:block}
.pv-mini-a{fill:var(--s-acc);opacity:.16}
.pv-mini-l{fill:none;stroke:var(--s-acc);stroke-width:2.5;vector-effect:non-scaling-stroke;
  stroke-linejoin:round;stroke-linecap:round}

/* 도넛 — 우측, KPI 카드에 살짝 가려짐 */
.pv-donut{position:absolute;right:calc(var(--u) * 42);top:calc(var(--u) * 40);
  width:calc(var(--u) * 128);height:calc(var(--u) * 128);
  transform:rotate(-90deg);z-index:2}
.pv-d-bg{fill:none;stroke:var(--s-line);stroke-width:6}
.pv-d1,.pv-d2,.pv-d3{fill:none;stroke-width:6}
.pv-d1{stroke:var(--s-acc)}
.pv-d2{stroke:color-mix(in srgb,var(--s-acc) 55%,transparent)}
.pv-d3{stroke:color-mix(in srgb,var(--s-acc) 26%,transparent)}

/* 대표 KPI 카드 — 초점. 폰트·라운드·그림자가 여기서 읽힌다 */
.pv-kpi{position:absolute;left:calc(var(--u) * 64);top:calc(var(--u) * 52);
  width:calc(var(--u) * 206);z-index:3;
  background:var(--s-sur);border-radius:calc(var(--u) * var(--s-r));
  padding:calc(var(--u) * 20) calc(var(--u) * 22);
  display:flex;flex-direction:column;gap:calc(var(--u) * 4);
  box-shadow:0 calc(var(--u) * 14) calc(var(--u) * 34) rgba(0,0,0,.16)}
.pv-kpi small{font-size:calc(var(--u) * 13);color:var(--s-dim)}
.pv-kpi b{font-family:var(--s-head-font);font-weight:var(--s-head-w);
  font-size:calc(var(--u) * 40);letter-spacing:var(--s-track);line-height:1.1}
.pv-kpi em{font-style:normal;font-size:calc(var(--u) * 13);color:var(--s-acc);
  display:flex;align-items:center;gap:calc(var(--u) * 5)}
.pv-tr{width:calc(var(--u) * 14);height:calc(var(--u) * 14);flex:none;
  fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}

/* 상태 배지 — 좌상단 */
.pv-badge{position:absolute;left:calc(var(--u) * 34);top:calc(var(--u) * 26);z-index:2;
  font-size:calc(var(--u) * 12);color:var(--s-acc);border:1.5px solid currentColor;
  border-radius:calc(var(--u) * 999);padding:calc(var(--u) * 3) calc(var(--u) * 12)}

/* 주요 버튼 — 우하단 */
.pv-btn{position:absolute;right:calc(var(--u) * 34);bottom:calc(var(--u) * 30);z-index:4;
  background:var(--s-acc);color:var(--s-acc-fg);
  font-size:calc(var(--u) * 13);font-weight:600;
  padding:calc(var(--u) * 9) calc(var(--u) * 18);
  border-radius:calc(var(--u) * var(--s-r));white-space:nowrap;
  box-shadow:0 calc(var(--u) * 8) calc(var(--u) * 20) rgba(0,0,0,.14)}
`
