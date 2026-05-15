"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const METRICS = [
  { label: "Gießfass-Input", value: "4.2 TB", unit: "Altes eingegangen", color: "#7c3aed" },
  { label: "Transmutations-Rate", value: "98.7%", unit: "vergoldet", color: "#d4af37" },
  { label: "Gold-Projekte", value: "12.405", unit: "neue Projekte", color: "#e67e22" },
  { label: "Vakanz-Füllungen", value: "842K", unit: "Hallo-Verbindungen", color: "#4caf7d" },
  { label: "Neue Ankömmlinge", value: "156K", unit: "integriert", color: "#00bcd4" },
  { label: "Resonanz-Frequenz", value: "432 Hz", unit: "global stabil", color: "#d4af37" },
  { label: "Allianz-Sync", value: "11/11", unit: "Nodes aktiv", color: "#4caf7d" },
  { label: "Vakuum-Archiv", value: "VERSIEGELT", unit: "& vergoldet", color: "#7c3aed" },
];

export default function GiessfassDashboardPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 40);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const t = tick * 0.025;
    const cx = W / 2;
    const vesselTop = H * 0.1;
    const vesselBottom = H * 0.85;
    const vesselW = W * 0.35;

    // ── Vessel outline ──
    ctx.strokeStyle = "rgba(212,175,55,0.4)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - vesselW * 0.6, vesselTop);
    ctx.lineTo(cx - vesselW * 0.5, vesselBottom);
    ctx.lineTo(cx + vesselW * 0.5, vesselBottom);
    ctx.lineTo(cx + vesselW * 0.6, vesselTop);
    ctx.stroke();

    // ── Inflow (dark violet streams from top) ──
    for (let i = 0; i < 5; i++) {
      const phase = (t + i * 0.7) % 1;
      const x = cx - vesselW * 0.3 + (i / 4) * vesselW * 0.6;
      const y = vesselTop + phase * (H * 0.3);
      const alpha = Math.sin(phase * Math.PI);
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(124,58,237,${alpha * 0.8})`;
      ctx.fill();
    }

    // ── Transformation particles (mosaic wave) ──
    for (let i = 0; i < 20; i++) {
      const angle = (t * 2 + (i / 20) * Math.PI * 2);
      const r = vesselW * 0.25 + Math.sin(t * 3 + i) * 8;
      const px = cx + Math.cos(angle) * r * 0.6;
      const py = H * 0.5 + Math.sin(angle) * r * 0.3;
      const progress = (Math.sin(t + i) + 1) / 2;
      const c1 = [124, 58, 237];
      const c2 = [212, 175, 55];
      const r2 = Math.round(c1[0] + (c2[0] - c1[0]) * progress);
      const g2 = Math.round(c1[1] + (c2[1] - c1[1]) * progress);
      const b2 = Math.round(c1[2] + (c2[2] - c1[2]) * progress);
      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r2},${g2},${b2},0.7)`;
      ctx.fill();
    }

    // ── Outflow (golden stream from bottom) ──
    for (let i = 0; i < 4; i++) {
      const phase = (t * 1.5 + i * 0.5) % 1;
      const x = cx - vesselW * 0.15 + (i / 3) * vesselW * 0.3;
      const y = vesselBottom - phase * (H * 0.12);
      const alpha = Math.sin(phase * Math.PI);
      const grad = ctx.createRadialGradient(x, y, 0, x, y, 5);
      grad.addColorStop(0, `rgba(212,175,55,${alpha})`);
      grad.addColorStop(1, "rgba(212,175,55,0)");
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }

    // ── Central glow ──
    const gCenter = ctx.createRadialGradient(cx, H * 0.5, 0, cx, H * 0.5, 60 + Math.sin(t * 2) * 10);
    gCenter.addColorStop(0, "rgba(212,175,55,0.08)");
    gCenter.addColorStop(1, "rgba(212,175,55,0)");
    ctx.beginPath();
    ctx.arc(cx, H * 0.5, 70, 0, Math.PI * 2);
    ctx.fillStyle = gCenter;
    ctx.fill();

    // ── Labels ──
    ctx.fillStyle = "rgba(124,58,237,0.7)";
    ctx.font = "9px 'Cinzel', serif";
    ctx.textAlign = "center";
    ctx.fillText("DAS ALTE", cx, vesselTop - 10);
    ctx.fillStyle = "rgba(212,175,55,0.7)";
    ctx.fillText("DAS GOLD", cx, vesselBottom + 20);
  }, [tick]);

  return (
    <main className="min-h-screen bg-sacred px-6 py-12">
      <div className="max-w-5xl mx-auto">

        <header className="text-center mb-12">
          <p className="font-ceremonial text-xs opacity-40 mb-2" style={{ letterSpacing: "3px" }}>
            GIESSFASS-DASHBOARD — ALCHEMISTISCHER REAKTOR
          </p>
          <h1 className="font-ceremonial text-gold glow-gold" style={{ fontSize: "2rem" }}>
            Globale Transmutations-Zentrale
          </h1>
          <p className="mt-2 opacity-60" style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontStyle: "italic" }}>
            Das Alte wird begriffen. Das Gold entsteht.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* REACTOR CANVAS */}
          <div className="flex flex-col items-center">
            <div className="font-ceremonial text-center mb-4 opacity-50" style={{ fontSize: "0.6rem", letterSpacing: "3px" }}>
              ALCHEMISTISCHER REAKTOR — LIVE
            </div>
            <canvas
              ref={canvasRef}
              width={340}
              height={380}
              style={{ border: "1px solid var(--border-gold)", background: "rgba(255,255,255,0.01)" }}
            />
            <div className="mt-4 flex gap-4 justify-center">
              <span className="font-ceremonial opacity-50" style={{ fontSize: "0.55rem", letterSpacing: "1px", color: "#7c3aed" }}>● EINFLUSS (ALTES)</span>
              <span className="font-ceremonial opacity-50" style={{ fontSize: "0.55rem", letterSpacing: "1px", color: "#d4af37" }}>● AUSFLUSS (GOLD)</span>
            </div>
          </div>

          {/* METRICS GRID */}
          <div className="grid grid-cols-2 gap-3 content-start">
            {METRICS.map((m) => (
              <div key={m.label} className="metric-card">
                <div className="font-ceremonial" style={{ fontSize: "1.4rem", color: m.color, lineHeight: 1.2 }}>
                  {m.value}
                </div>
                <div className="font-ceremonial mt-1 opacity-40" style={{ fontSize: "0.55rem", letterSpacing: "1.5px" }}>
                  {m.label.toUpperCase()}
                </div>
                <div className="opacity-50 mt-1" style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem" }}>
                  {m.unit}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VAKUUM ARCHIVE */}
        <section className="mb-10 p-6 text-center" style={{ background: "rgba(124,58,237,0.04)", border: "1px solid rgba(124,58,237,0.2)" }}>
          <p className="font-ceremonial mb-2" style={{ fontSize: "0.65rem", letterSpacing: "3px", color: "#7c3aed" }}>
            VAKUUM-ARCHIV
          </p>
          <p className="font-ceremonial text-gold" style={{ fontSize: "1.2rem" }}>
            VERSIEGELT &amp; VERGOLDET
          </p>
          <p className="opacity-50 mt-2" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
            Das Alte ist für immer begriffen. Zero-Trust-verschlüsselt. Kein Dritter hat Zugriff.
          </p>
        </section>

        {/* TRANSMUTATION TRIGGER */}
        <section className="mb-10">
          <h2 className="font-ceremonial text-gold mb-4" style={{ fontSize: "0.75rem", letterSpacing: "3px" }}>
            Transmutations-Trigger
          </h2>
          <div className="p-5" style={{ background: "rgba(212,175,55,0.03)", border: "1px solid var(--border-gold)" }}>
            <p className="opacity-60 mb-4" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>
              Aktiviere eine Prioritäts-Transmutation für eine Region in Not. Das System priorisiert alle Vakanzen in diesem Node und sendet einen globalen Aufruf an alle Member.
            </p>
            <div className="flex flex-wrap gap-3">
              {["ID-EU", "ID-US", "ID-UN", "ID-CH", "ID-IE", "ID-NO"].map((node) => (
                <button key={node} className="btn-ghost" style={{ fontSize: "0.6rem", padding: "0.5rem 1rem" }}>
                  {node} aktivieren
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="flex justify-between items-center">
          <Link href="/admin" className="btn-ghost" style={{ fontSize: "0.6rem" }}>
            ← Super-Admin Terminal
          </Link>
          <p className="font-ceremonial opacity-25" style={{ fontSize: "0.55rem", letterSpacing: "1px" }}>
            🛡️ ADMIN-TENANT ONLY &nbsp;|&nbsp; ZERO-TRUST ZONE
          </p>
        </div>
      </div>
    </main>
  );
}
