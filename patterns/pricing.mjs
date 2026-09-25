// 견적 데이터 — 돈에 관한 값은 전부 이 파일에만 있다.
//
// ⚠️ 아래 금액은 **조정해서 쓰는 출발값**이지 시장 표준가가 아니다.
//    본인 작업 단가·거래처 견적을 받아보고 실제 값으로 바꿔라.
//    산정 근거와 포함/불포함 범위는 docs/06-pricing.md 참고.

export const CURRENCY = { symbol: '₩', locale: 'ko-KR' }

/** 단가의 전제 — 이게 안 맞으면 금액도 안 맞는다 */
export const BASIS = [
  '데스크톱 1440px 기준 화면 1개',
  'Figma 산출물 (오토레이아웃 · 컴포넌트화 · 토큰 바인딩)',
  '시안 1차 + 수정 2회 포함',
  '아이콘·일러스트·사진 신규 제작 불포함 (기존 에셋 사용 전제)',
  '개발 구현 불포함',
]

/** 화면 단가 — 외주 견적이 실제로 끊기는 단위 */
export const SCREENS = [
  // 마케팅
  { id: 'landing', name: '랜딩', group: '마케팅', price: 1_200_000, note: '히어로+기능+소셜프루프+CTA 한 장' },
  { id: 'pricing', name: '프라이싱', group: '마케팅', price: 500_000, note: '플랜 비교표 포함' },
  { id: 'case-study', name: '사례연구', group: '마케팅', price: 450_000 },
  { id: 'docs', name: '문서·블로그', group: '마케팅', price: 400_000, note: '목차+본문 템플릿' },

  // 진입
  { id: 'auth', name: '로그인·가입', group: '진입', price: 350_000, note: '로그인/가입/비밀번호 재설정 묶음' },
  { id: 'onboarding', name: '온보딩 위저드', group: '진입', price: 700_000, note: '3~4단계 기준' },

  // 핵심 작업
  { id: 'dashboard', name: '대시보드 홈', group: '핵심', price: 800_000, note: 'KPI+차트 2종' },
  { id: 'list', name: '목록 + 필터', group: '핵심', price: 550_000 },
  { id: 'list-detail', name: '목록 + 상세(드로어)', group: '핵심', price: 650_000 },
  { id: 'detail', name: '상세 페이지', group: '핵심', price: 450_000 },
  { id: 'form', name: '생성·편집 폼', group: '핵심', price: 400_000 },
  { id: 'search', name: '검색·필터 결과', group: '핵심', price: 400_000 },
  { id: 'kanban', name: '칸반 보드', group: '핵심', price: 700_000, note: '드래그 상태 포함' },
  { id: 'editor', name: '에디터', group: '핵심', price: 900_000, note: '툴바+인스펙터' },
  { id: 'canvas', name: '캔버스 (무한 보드)', group: '핵심', price: 1_100_000, note: '줌·팬·선택 상태' },
  { id: 'course-player', name: '강의 수강 화면', group: '핵심', price: 850_000, note: '커리큘럼 + 재생 + 노트·질문 탭' },
  { id: 'curriculum', name: '커리큘럼·차시 관리', group: '핵심', price: 600_000, note: '챕터/차시 편집 · 진도 상태 4종' },
  { id: 'thread', name: '게시글 + 댓글 스레드', group: '핵심', price: 650_000, note: '뎁스 2단 · 정렬 · 신고/블라인드 상태' },

  // 운영
  { id: 'settings', name: '설정', group: '운영', price: 500_000, note: '계정·팀·권한 3섹션' },
  { id: 'admin', name: '어드민', group: '운영', price: 600_000 },
  { id: 'notifications', name: '알림 센터', group: '운영', price: 300_000 },
  { id: 'checkout', name: '결제·체크아웃', group: '운영', price: 700_000 },

  // 상태
  { id: 'states', name: '상태 화면 세트', group: '상태', price: 350_000, note: '빈 상태·로딩·에러 3종. 빼지 말 것' },
]

/**
 * 스킨 난이도 계수 — 화면 소계에 곱한다.
 * 같은 대시보드라도 스킨에 따라 실제 작업량이 두 배 가까이 벌어진다.
 */
export const SKIN_TIER = {
  'cobalt-gray': { factor: 1.00, why: '기본. 참고 사례가 가장 많고 규칙이 단순' },
  'black-yellow': { factor: 1.05, why: '색이 둘뿐이라 단순하지만 대비 검수가 추가됨' },
  'neon-engineering': { factor: 1.30, why: '격자·발광 레이어와 밀도 높은 상태의 스캔성 검증' },
  'blueprint': { factor: 1.20, why: '선 굵기 3단 체계를 전 컴포넌트에 일관 적용' },
  'oled-void': { factor: 1.10, why: '발광 튜닝과 순흑 잔상 대응' },
  'ink-cream': { factor: 1.15, why: '한글 부리 헤드라인 조판과 웹폰트 대체 상태까지 챙겨야 함' },
  'sand-clay': { factor: 1.20, why: '이중 섀도우 튜닝, 라운드 규칙 재설계' },
  'deep-forest': { factor: 1.15, why: '골드 액센트의 대비 확보가 화면마다 필요' },
  'navy-signal': { factor: 1.05, why: '표준 구조에 액센트 규칙만 얹음' },
  'mint-paper': { factor: 1.05, why: '밝은 톤이라 상태색 대비를 따로 잡아야 함' },
  'indigo-class': { factor: 1.10, why: '완료·진행·잠김·마감 4상태를 컴포넌트마다 구분해야 함' },
  'rose-lounge': { factor: 1.10, why: '액센트가 오류색으로 읽혀 파괴적 동작용 색을 따로 잡아야 함' },
  'civic-blue': { factor: 1.25, why: '대비·초점·대체텍스트를 화면마다 검수하고 근거를 남겨야 함' },
  'stark-mono': { factor: 1.15, why: '컴포넌트는 적지만 조판과 여백이 곧 결과물이라 시안 반복이 많음' },
}

/**
 * 다크모드 추가율 — 스킨별로 다르다.
 * "색만 반전"이 아니라 elevation 재설계 + 대비 재검수라서 스킨 성격에 크게 좌우된다.
 */
export const DARK = {
  base: 0.35,
  bySkin: {
    'cobalt-gray': 0.25,
    'black-yellow': 0.25,
    'neon-engineering': 0.35,
    'blueprint': 0.30,
    'oled-void': 0.30,
    'ink-cream': 0.35,
    'sand-clay': 0.40,
    'deep-forest': 0.30,
    'navy-signal': 0.30,
    'mint-paper': 0.25,
    'indigo-class': 0.30,
    'rose-lounge': 0.30,
    'civic-blue': 0.25,
    'stark-mono': 0.20,
  },
  includes: [
    '의미 토큰 다크 매핑 (배경·표면·텍스트·보더·상태색)',
    'elevation 단계 재설계 — 그림자 대신 표면 밝기로 깊이 표현',
    '액센트·브랜드 색 다크 조정 (채도↓ 명도↑)',
    '라이트/다크 양쪽 텍스트 대비 AA 검수',
    '3상태 토글 UI (light / dark / system) 및 상태 유지',
    '폼 컨트롤·스크롤바·placeholder·자동완성 배경',
    '차트·데이터 시각화 팔레트 다크 세트',
  ],
  excludes: [
    '이미지·일러스트·3D 에셋의 다크 버전 제작 (에셋 단가 별도)',
    '로고 다크 버전',
    '마케팅 페이지 다크 (앱과 별개 스코프로 견적)',
    '이메일 템플릿 다크',
    '개발 구현 및 테마 전환 로직',
  ],
}

/** 그 외 옵션 — 화면 소계(스킨 계수 적용 후) 기준 비율 */
export const OPTIONS = [
  {
    id: 'mobile', name: '모바일 반응형', rate: 0.45,
    desc: '375px 기준 전 화면 재구성',
    note: '벤토·스플릿·3단은 모바일에서 무너지므로 블록 순서를 새로 설계해야 한다',
  },
  {
    id: 'tablet', name: '태블릿 대응', rate: 0.20,
    desc: '768~1024px 중간 브레이크포인트',
    note: '모바일 대응을 먼저 하는 게 순서. 태블릿만 하는 경우는 드물다',
  },
  {
    id: 'prototype', name: '인터랙티브 프로토타입', rate: 0.15,
    desc: 'Figma 화면 연결 + 주요 플로우 시연',
    note: '개발 전달과 사용자 테스트에 쓸 거면 넣는다',
  },
  {
    id: 'designsystem', name: '디자인 시스템 문서화', rate: 0.25,
    desc: '토큰·컴포넌트 정리, 사용 규칙 문서',
    note: '화면 수가 10개 넘어가면 이게 없을 때 개발 이식 비용이 더 든다',
  },
  {
    id: 'a11y', name: '웹접근성 대응 (KWCAG 2.2 AA)', rate: 0.20,
    desc: '대비·초점·대체텍스트·키보드 흐름 검수 + 점검 결과서',
    note: '공공·협회·대학 발주는 인증 심사가 계약 조건인 경우가 많다. 나중에 붙이면 화면을 다시 그린다',
  },
  {
    id: 'revision', name: '추가 수정 라운드 (1회)', rate: 0.08,
    desc: '기본 2회 외 추가',
    note: '',
  },
]

/** 거래 조건 */
export const TERMS = {
  minimum: 2_000_000,
  revisionsIncluded: 2,
  staging: '1차 시안은 2화면(대시보드·목록)만 진행 → 스타일 확정 후 나머지 확장',
  payment: '계약금 50% / 잔금 50%',
}

export const fmt = n =>
  CURRENCY.symbol + Math.round(n).toLocaleString(CURRENCY.locale)

/** 다크모드 추가율 조회 */
export const darkRate = skinId => DARK.bySkin[skinId] ?? DARK.base

/**
 * 견적 계산
 * @param picks   {screenId: 수량}
 * @param skinId  스킨 id
 * @param opts    선택한 옵션 id 배열 ('dark' 포함 가능)
 */
export function quote(picks, skinId, opts = []) {
  const lines = SCREENS
    .filter(s => picks[s.id] > 0)
    .map(s => ({ id: s.id, name: s.name, qty: picks[s.id], unit: s.price, amount: s.price * picks[s.id] }))

  const screensSubtotal = lines.reduce((n, l) => n + l.amount, 0)
  const tier = SKIN_TIER[skinId] ?? { factor: 1, why: '' }
  const skinAdjust = screensSubtotal * (tier.factor - 1)
  const base = screensSubtotal + skinAdjust

  const addons = []
  if (opts.includes('dark')) {
    const rate = darkRate(skinId)
    addons.push({ id: 'dark', name: '다크모드', rate, amount: base * rate })
  }
  for (const o of OPTIONS) {
    if (opts.includes(o.id)) addons.push({ id: o.id, name: o.name, rate: o.rate, amount: base * o.rate })
  }

  const sum = base + addons.reduce((n, a) => n + a.amount, 0)
  const belowMin = sum > 0 && sum < TERMS.minimum

  return {
    lines, screensSubtotal, tier, skinAdjust, base, addons,
    sum, belowMin, total: belowMin ? TERMS.minimum : sum,
  }
}
