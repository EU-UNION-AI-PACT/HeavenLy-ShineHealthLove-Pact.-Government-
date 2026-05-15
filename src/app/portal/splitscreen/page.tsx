import Link from "next/link";

export default function SplitscreenPage() {
  return (
    <main style={{ position: "fixed", inset: 0, display: "flex", flexDirection: "column", background: "#020308", zIndex: 50 }}>

      {/* THIN HEADER */}
      <div style={{
        height: "44px", flexShrink: 0, display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 1.25rem",
        background: "rgba(2,3,8,0.98)",
        borderBottom: "1px solid rgba(212,175,55,0.15)",
        position: "relative", zIndex: 100,
      }}>
        <div style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.3em", background: "linear-gradient(90deg,#d4af37,#fff 50%,#00e5ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          SHINE // WORLDS IN DIALOGUE
        </div>
        <div style={{ fontFamily: "var(--font-quote)", fontSize: "0.72rem", fontStyle: "italic", color: "rgba(212,175,55,0.5)" }}>
          Cosmic Artifact Atlas &amp; Sacred Wells of Ireland
        </div>
        <Link href="/portal/wunschbrunnen" style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.4rem", letterSpacing: "2px", color: "rgba(0,229,255,0.5)", border: "1px solid rgba(0,229,255,0.2)", padding: "3px 10px", textDecoration: "none" }}>
          ← BRUNNEN-LISTE
        </Link>
      </div>

      {/* SPLIT CONTENT */}
      <div style={{ flex: 1, display: "flex", minHeight: 0, position: "relative" }} id="splitWrap">

        {/* LEFT — Cosmic Atlas Iframe */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#010106", minWidth: 0 }} id="paneLeft">
          <iframe
            src="https://cosmic-artifact-atlas.lovable.app/"
            title="Cosmic Artifact Atlas"
            allow="fullscreen"
            loading="lazy"
            style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          />
          <div style={{ position: "absolute", bottom: 12, left: 14, fontFamily: "var(--font-ceremonial)", fontSize: "0.38rem", letterSpacing: "4px", color: "rgba(212,175,55,0.3)", pointerEvents: "none" }}>
            ✦ &nbsp;COSMIC ARTIFACT ATLAS
          </div>
        </div>

        {/* DIVIDER — draggable */}
        <div
          id="divider"
          style={{ width: "3px", cursor: "col-resize", flexShrink: 0, position: "relative", zIndex: 10, background: "linear-gradient(180deg,transparent,rgba(212,175,55,0.7) 20%,rgba(0,229,255,0.7) 50%,rgba(155,89,255,0.7) 80%,transparent)" }}
        >
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 24, height: 24, borderRadius: "50%", background: "rgba(2,3,8,0.96)", border: "1px solid rgba(212,175,55,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", color: "rgba(212,175,55,0.7)", pointerEvents: "none", boxShadow: "0 0 12px rgba(212,175,55,0.2)" }}>
            ⟺
          </div>
        </div>

        {/* RIGHT — 3D Brunnen via the standalone HTML file embedded */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#020308", minWidth: 0 }} id="paneRight">
          <iframe
            src="/guardian-well.html"
            title="Shine Wishing Well"
            style={{ width: "100%", height: "100%", border: "none", display: "block" }}
            allow="fullscreen"
          />
          <div style={{ position: "absolute", bottom: 12, right: 14, fontFamily: "var(--font-ceremonial)", fontSize: "0.38rem", letterSpacing: "4px", color: "rgba(212,175,55,0.3)", pointerEvents: "none", textAlign: "right" }}>
            ✦ &nbsp;SHINE WISHING WELL
          </div>
        </div>

      </div>

      {/* DRAG DIVIDER SCRIPT */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          const wrap  = document.getElementById('splitWrap');
          const dvd   = document.getElementById('divider');
          const left  = document.getElementById('paneLeft');
          const right = document.getElementById('paneRight');
          if(!wrap||!dvd||!left||!right)return;
          let drag=false,sx=0,sL=1,sR=1;
          dvd.addEventListener('mousedown',function(e){
            drag=true;sx=e.clientX;
            sL=parseFloat(getComputedStyle(left).flexGrow)||1;
            sR=parseFloat(getComputedStyle(right).flexGrow)||1;
            document.body.style.cursor='col-resize';
            document.body.style.userSelect='none';
            e.preventDefault();
          });
          document.addEventListener('mousemove',function(e){
            if(!drag)return;
            var tot=wrap.clientWidth,dx=e.clientX-sx,tf=sL+sR;
            var nL=Math.max(0.2,Math.min(tf-0.2,sL+(dx/tot)*tf));
            left.style.flex=nL;right.style.flex=tf-nL;
          });
          document.addEventListener('mouseup',function(){
            drag=false;document.body.style.cursor='';document.body.style.userSelect='';
          });
        })();
      `}} />
    </main>
  );
}
