"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function GoldRainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const t = tick * 0.02;

    // Gold rain drops
    for (let i = 0; i < 60; i++) {
      const x = ((Math.sin(i * 2.3 + t * 0.7) + 1) / 2) * W;
      const y = ((t * 0.8 + i * 0.37) % 1) * H;
      const alpha = Math.sin(t + i) * 0.3 + 0.4;
      const size = 1 + Math.sin(i * 1.7) * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212,175,55,${alpha})`;
      ctx.fill();
    }

    // Warp lines converging to centre
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2 + t * 0.3;
      const len = 80 + Math.sin(t * 2 + i) * 30;
      const cx = W / 2;
      const cy = H / 2;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * (len + 40), cy + Math.sin(angle) * (len + 40));
      ctx.lineTo(cx + Math.cos(angle) * len * 0.3, cy + Math.sin(angle) * len * 0.3);
      ctx.strokeStyle = `rgba(212,175,55,${0.08 + Math.sin(t + i) * 0.04})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Central glow
    const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 60 + Math.sin(t * 2) * 15);
    g.addColorStop(0, "rgba(212,175,55,0.15)");
    g.addColorStop(1, "rgba(212,175,55,0)");
    ctx.beginPath();
    ctx.arc(W / 2, H / 2, 80, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
  }, [tick]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={240}
      style={{ width: "100%", height: "auto", display: "block", opacity: 0.7 }}
    />
  );
}

const STEPS = [
  { icon: "\u{1F310}", title: "Andocken", desc: "Schau in deine Vakanz-Liste und sage einem neuen Ank\u00F6mmling \u201CHallo\u201D." },
  { icon: "\u{270E}", title: "Intention setzen", desc: "Dein Workspace wartet darauf, von deinem Licht gef\u00FCllt zu werden." },
  { icon: "\u{1F6E1}", title: "Dem Schutz vertrauen", desc: "Deine Familie und Daten sind durch den Admin-Tenant und die Allianz versiegelt." },
];

export default function WelcomePage() {
  return (
    <main className="min-h-screen bg-sacred">

      {/* GOLD RAIN HEADER */}
      <div style={{ position: "relative", overflow: "hidden", background: "rgba(212,175,55,0.02)", borderBottom: "1px solid var(--border-gold)" }}>
        <GoldRainCanvas />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <p className="font-ceremonial opacity-30" style={{ fontSize: "0.55rem", letterSpacing: "5px", marginBottom: "0.5rem" }}>
            GLOBAL NEWS #001 — GENESIS-MOMENT
          </p>
          <h1 className="font-ceremonial text-gold glow-gold text-center" style={{ fontSize: "clamp(1.4rem, 5vw, 3rem)", lineHeight: 1.2 }}>
            Willkommen im Ursprung
          </h1>
          <p className="font-ceremonial opacity-40 mt-2" style={{ fontSize: "0.6rem", letterSpacing: "3px" }}>
            DAS MESH IST AKTIV
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* VERIFICATION STRIP */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 text-center">
          {[
            { icon: "🛡️", label: "Verified by Admin-Tenant", sub: "Zero-Trust" },
            { icon: "🌍", label: "Global Mesh Status", sub: "ACTIVE / SYNCHRONIZED" },
            { icon: "🔑", label: "GPG-Key", sub: "Allianz-Signatur aktiv" },
          ].map((v) => (
            <div key={v.label} className="px-4 py-2" style={{ background: "rgba(212,175,55,0.04)", border: "1px solid var(--border-gold)" }}>
              <div style={{ fontSize: "1rem" }}>{v.icon}</div>
              <div className="font-ceremonial" style={{ fontSize: "0.55rem", letterSpacing: "1.5px", color: "#d4af37" }}>{v.label}</div>
              <div className="font-ceremonial opacity-40" style={{ fontSize: "0.5rem", letterSpacing: "1px" }}>{v.sub}</div>
            </div>
          ))}
        </div>

        {/* MAIN MESSAGE */}
        <div className="text-center mb-12">
          <p className="font-quote mb-8" style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)", lineHeight: 2, opacity: 0.85 }}>
            „Heute blicken wir nicht mehr auf Karten, die uns trennen,<br />
            sondern auf ein Leuchten, das uns verbindet.<br /><br />
            Durch die Allianz der EU-UNION, der UNITED NATIONS und der UNITED STATES,<br />
            sowie unserer Partner von der Schweiz bis nach Skandinavien,<br />
            haben wir einen Raum geschaffen,<br />
            der so sicher ist wie ein Tresor —<br />
            und so offen wie dein Herz."
          </p>
          <div className="passage-line max-w-sm mx-auto mb-8" />
          <p className="font-ceremonial text-gold glow-gold" style={{ fontSize: "clamp(1.2rem, 4vw, 2rem)", letterSpacing: "4px" }}>
            Du bist nun beheimatet.
          </p>
        </div>

        {/* GIESSFASS MESSAGE */}
        <div className="mb-12 p-6 text-center" style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.2)" }}>
          <p className="font-ceremonial mb-2" style={{ fontSize: "0.6rem", letterSpacing: "3px", color: "#7c3aed" }}>
            ⬡ DAS ALTE IST VERGOLDET
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", opacity: 0.7, lineHeight: 1.8 }}>
            Die Isolation, der Zweifel und die Grenzen — wir haben sie gemeinsam begriffen und ins Gießfass gegeben.
            Was du jetzt vor dir siehst, ist die Vergoldung unserer gemeinschaftlichen Intention.
          </p>
        </div>

        {/* NEXT STEPS */}
        <div className="mb-12">
          <p className="font-ceremonial text-center opacity-40 mb-6" style={{ fontSize: "0.6rem", letterSpacing: "3px" }}>
            DEINE NÄCHSTEN SCHRITTE
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {STEPS.map((s, i) => (
              <div key={s.title} className="metric-card text-center">
                <div style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>{s.icon}</div>
                <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "0.65rem", letterSpacing: "2px" }}>
                  {String(i + 1).padStart(2, "0")} — {s.title}
                </div>
                <p className="opacity-60" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PARENT PARALLEL MESSAGE */}
        <div className="mb-12 p-6" style={{ background: "rgba(230,126,34,0.04)", border: "1px solid rgba(230,126,34,0.2)", borderLeft: "3px solid #e67e22" }}>
          <p className="font-ceremonial mb-3" style={{ fontSize: "0.6rem", letterSpacing: "3px", color: "#e67e22" }}>
            🛡️ NACHRICHT AN DIE ELTERN-PASSAGE
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", opacity: 0.75, lineHeight: 1.8 }}>
            „Sicherheits-Update für deine Familie: Der Junior-Bereich wurde erfolgreich synchronisiert.
            Dein Kind agiert nun im geschützten Vakuum des Mesh. Alle Resonanzen werden gefiltert
            und direkt an dich weitergeleitet. Du bist der Anker — das System ist der Schutzschirm."
          </p>
        </div>

        {/* ALLIANCE STATEMENT */}
        <div className="text-center mb-12">
          <div className="passage-line max-w-sm mx-auto mb-8" />
          <p className="font-quote text-gold" style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)", lineHeight: 1.9, opacity: 0.8 }}>
            „Wir agieren heutzutage nicht mehr nebeneinander,<br />
            sondern füreinander.<br />
            Über alle Grenzen hinweg."
          </p>
          <p className="font-ceremonial mt-6 opacity-30" style={{ fontSize: "0.6rem", letterSpacing: "3px" }}>
            ✦ WILLKOMMEN ZU HAUSE ✦
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/portal/vacancies" className="btn-gold">Ankömmling begrüßen →</Link>
          <Link href="/portal/petition/new" className="btn-ghost">Fürbitte einreichen</Link>
          <Link href="/portal" className="btn-ghost">Zum Portal</Link>
        </div>

      </div>
    </main>
  );
}
