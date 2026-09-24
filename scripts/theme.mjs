// 페이지 크롬(껍데기) 토큰 — index / patterns / gallery / packet 이 공유한다.
//
// 흰 배경 고정. 시스템 다크모드를 따라가지 않는다.
// 여기서 정의하는 건 "저장소 UI"의 색이고, 스킨 프리뷰(--s-*)와 와이어프레임(--w*)은
// 별개다. 스킨 카드가 어두운 건 그 스킨이 어두운 것이지 페이지 테마가 아니다.

export const TOKENS_CSS = `:root{
  color-scheme:light;
  --bg:#ffffff; --panel:#ffffff; --line:#e6e4e0; --fg:#1c1b19; --dim:#78746e;
  --chip:#f4f2ef; --accent:#2f6f4f; --warn:#9a6b1f; --danger:#b4453a;
  --radius:10px; --shadow:0 1px 2px rgba(0,0,0,.05),0 4px 12px rgba(0,0,0,.05);
  /* 와이어프레임 팔레트 */
  --wbg:#fff; --wsur:#f4f2ef; --wsur2:#faf9f7; --wline:#dcd8d2; --wln:#cfcac3;
  --wblk:#a8a29a; --wacc:#2f6f4f; --wacc-soft:#e8efe9; --wsel:#e2ded8; --wscrim:rgba(0,0,0,.28);
}`
