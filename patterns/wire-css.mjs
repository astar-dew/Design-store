// 와이어프레임 렌더링 CSS — build-patterns.mjs 와 build-index.mjs 가 공유한다.
// 클래스 어휘는 patterns/patterns.mjs 의 헬퍼가 내보내는 마크업과 짝을 이룬다.

export const WIRE_CSS = String.raw`
/* ---------- 와이어프레임 ---------- */
.wf{aspect-ratio:16/10;background:var(--wbg);border-bottom:1px solid var(--line);
  display:flex;overflow:hidden;font-size:0}
.wf>*{flex:1;min-width:0;min-height:0}
.wf .r{display:flex;flex-direction:row;min-width:0;min-height:0}
.wf .c{display:flex;flex-direction:column;min-width:0;min-height:0}
.wf .ln{display:block;background:var(--wln);border-radius:3px;flex:none}
.wf .ln.strong{background:var(--wblk)}
.wf .sur{background:var(--wsur);border:1px solid var(--wline);border-radius:5px;display:flex;
  flex-direction:column;min-width:0}
.wf .sur.chart{flex-direction:row}
.wf .glass{background:var(--wbg);opacity:.94;box-shadow:0 4px 16px rgba(0,0,0,.14)}
.wf .bar{flex:1;background:var(--wacc);border-radius:2px 2px 0 0;opacity:.85}
.wf .sq{width:9px;height:9px;border-radius:2px;background:var(--wblk);flex:none;display:block}
.wf .sq.sm{width:6px;height:6px}
.wf .sq.lg{width:14px;height:14px;border-radius:3px}
.wf .sq.xl{width:24px;height:24px;border-radius:5px;background:var(--wsel);
  border:1px dashed var(--wblk)}
.wf .sq.xl.warn{border-color:var(--warn)}
.wf .sq.rd{border-radius:50%}
.wf .sq.lg.on{background:var(--wacc)}
.wf .ni{display:flex;align-items:center;gap:5px;padding:3px 5px;border-radius:4px;flex:none}
.wf .ni.on{background:var(--wsel)}
.wf .ni.ind{padding-left:13px}
.wf .lbl{display:block;width:34%;height:4px;background:var(--wln);border-radius:2px;
  margin:4px 0 2px 5px;opacity:.65;flex:none}
.wf .tri{width:0;height:0;border-left:5px solid var(--wblk);
  border-top:3.5px solid transparent;border-bottom:3.5px solid transparent;flex:none}
.wf .sw{display:flex;align-items:center;gap:5px;padding:5px;border:1px solid var(--wline);
  border-radius:4px;background:var(--wbg);flex:none}
.wf .cv{width:0;height:0;border-top:4px solid var(--wblk);
  border-left:3px solid transparent;border-right:3px solid transparent;flex:none;margin-left:auto}
.wf .tip{background:var(--wblk);border-radius:4px;padding:4px 6px;flex:none;opacity:.9}
.wf .tip .ln{background:var(--wbg)}
.wf .fld{height:13px;border:1px solid var(--wline);border-radius:4px;background:var(--wbg);flex:none}
.wf .btn{height:13px;border-radius:4px;background:var(--wblk);flex:none}
.wf .btn.pri{background:var(--wacc)}
.wf .btn.out{background:transparent;border:1px solid var(--wline)}
.wf .btn.sm{width:30px;height:12px}
.wf .divi{display:flex;align-items:center;justify-content:center;height:10px;position:relative;flex:none}
.wf .divi::before{content:"";position:absolute;inset:50% 0 auto;height:1px;background:var(--wline)}
.wf .divi .ln{position:relative;background:var(--wbg);box-shadow:0 0 0 3px var(--wsur)}
.wf .otp{flex:1;height:16px;border:1px solid var(--wline);border-radius:3px;background:var(--wbg)}
.wf .arrow{width:0;height:0;border-left:6px solid var(--wblk);
  border-top:4px solid transparent;border-bottom:4px solid transparent;flex:none}
.wf .li{display:flex;flex-direction:column;gap:3px;padding:4px 5px;border-radius:4px;flex:none}
.wf .li.on{background:var(--wsel)}
.wf .tr{display:flex;align-items:center;gap:7px;padding:4px 2px;
  border-bottom:1px solid var(--wline);flex:none}
.wf .tr.hd .ln{background:var(--wblk);opacity:.75}
.wf .cd{background:var(--wsur);border:1px solid var(--wline);border-radius:5px}
.wf .grid3{display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:1fr;gap:5px;flex:1;min-height:0}
.wf .ck{display:block;height:6px;background:var(--wln);border-radius:2px;
  margin-left:9px;position:relative;flex:none}
.wf .ck::before{content:"";position:absolute;left:-9px;top:-1px;width:7px;height:7px;
  border:1px solid var(--wblk);border-radius:2px}
.wf .chip2{display:block;width:22px;height:12px;border-radius:999px;background:var(--wsel);flex:none}
.wf .x{width:8px;height:8px;background:var(--wblk);flex:none;
  clip-path:polygon(20% 0,50% 30%,80% 0,100% 20%,70% 50%,100% 80%,80% 100%,50% 70%,20% 100%,0 80%,30% 50%,0 20%)}
.wf .stp{width:9px;height:9px;border-radius:50%;border:1.5px solid var(--wblk);flex:none}
.wf .stp.on{background:var(--wacc);border-color:var(--wacc)}
.wf .conn{width:14px;height:1.5px;background:var(--wline);flex:none}
.wf .tgl{width:18px;height:10px;border-radius:999px;background:var(--wacc);flex:none;position:relative}
.wf .tgl::after{content:"";position:absolute;right:1.5px;top:1.5px;width:7px;height:7px;
  border-radius:50%;background:var(--wbg)}
.wf .sk{background:linear-gradient(90deg,var(--wsur),var(--wsel),var(--wsur));
  border-radius:5px;flex:none}
`
