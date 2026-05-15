"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ── Crystal particle burst when "Hallo" is sent ──────────────────────────────
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  color: string; size: number;
}

const COLORS = ["#d4af37", "#f0d060", "#00bcd4", "#4caf7d", "#ffffff"];

const DEMO_VACANCIES = [
  { id: "v1", name: "Ankömmling aus Portugal", countryCode: "PT", isJunior: false, intention: "Suche Gemeinschaft und Orientierung im Heiligen Jahr.", waiting: "2 Stunden" },
  { id: "v2", name: "Ankömmling aus Norwegen", countryCode: "NO", isJunior: false, intention: "Möchte die Übergänge des Lebens in Stille begleiten.", waiting: "5 Stunden" },
  { id: "v3", name: "Ankömmling aus Spanien", countryCode: "ES", isJunior: false, intention: "Auf der Suche nach dem inneren Pfad der Heilung.", waiting: "1 Tag" },
  { id: "v4", name: "Ankömmling aus Irland", countryCode: "IE", isJunior: false, intention: "Wünsche mir eine Brücke zwischen Tradition und Zukunft.", waiting: "3 Stunden" },
  { id: "v5", name: "Ankömmling aus Schweden", countryCode: "SE", isJunior: false, intention: "Auf der Suche nach Menschen, die wirklich zuhören.", waiting: "6 Stunden" },
];

export default function VacanciesPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [tick, setTick] = useState(0);
  const [greeted, setGreeted] = useState<Set<string>>(new Set());
  const [active, setActive] = useState<string | null>(null);

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

    // Update + draw particles
    particlesRef.current = particlesRef.current.filter((p) => p.life > 0);
    for (const p of particlesRef.current) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.life--;
      const alpha = p.life / p.maxLife;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
      ctx.fillStyle = p.color.replace(")", `,${alpha})`).replace("rgb", "rgba").replace("#", "rgba(").replace("rgba(d4af37)", "rgba(212,175,55,")
        .replace("rgba(f0d060)", "rgba(240,208,96,")
        .replace("rgba(00bcd4)", "rgba(0,188,212,")
        .replace("rgba(4caf7d)", "rgba(76,175,125,")
        .replace("rgba(ffffff)", "rgba(255,255,255,");
      ctx.fill();
    }

    // Background ambient particles
    const t = tick * 0.02;
    for (let i = 0; i < 15; i++) {
      const x = ((Math.sin(i * 2.1 + t) + 1) / 2) * W;
      const y = ((Math.cos(i * 1.7 + t * 0.5) + 1) / 2) * H;
      const alpha = (Math.sin(t * 2 + i) + 1) / 2 * 0.15;
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212,175,55,${alpha})`;
      ctx.fill();
    }
  }, [tick]);

  function burst(cx: number, cy: number) {
    for (let i = 0; i < 40; i++) {
      const angle = (i / 40) * Math.PI * 2 + Math.random() * 0.3;
      const speed = 2 + Math.random() * 5;
      particlesRef.current.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        life: 50 + Math.random() * 30,
        maxLife: 80,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 2 + Math.random() * 4,
      });
    }
  }

  function handleGreet(id: string, e: React.MouseEvent<HTMLButtonElement>) {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      burst(x, y);
    }
    setGreeted((prev) => new Set([...prev, id]));
    setActive(id);
    setTimeout(() => setActive(null), 2000);
  }

  return (
    <main className="min-h-screen bg-sacred px-6 py-12">
      <div className="max-w-4xl mx-auto">

        <header className="text-center mb-12">
          <p className="font-ceremonial opacity-30 mb-2" style={{ fontSize: "0.6rem", letterSpacing: "4px" }}>
            VAKANZ-LISTE — ANDOCK-PROTOKOLL
          </p>
          <h1 className="font-ceremonial text-gold glow-gold" style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)" }}>
            Sage Hallo
          </h1>
          <p className="font-quote mt-2 opacity-60" style={{ fontSize: "1rem" }}>
            Jeder Ankömmling wartet auf eine Beheimatung — werde der Erste, der ihm leuchtet.
          </p>
        </header>

        {/* CANVAS overlay for particles */}
        <div className="relative mb-10" style={{ height: 80 }}>
          <canvas
            ref={canvasRef}
            width={800}
            height={80}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          />
        </div>

        {/* VACANCY CARDS */}
        <div className="space-y-4">
          {DEMO_VACANCIES.map((v) => {
            const done = greeted.has(v.id);
            const isActive = active === v.id;
            return (
              <div
                key={v.id}
                className="flex items-center justify-between gap-4 px-6 py-5 transition-all"
                style={{
                  background: done ? "rgba(76,175,125,0.06)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${done ? "rgba(76,175,125,0.4)" : "var(--border-gold)"}`,
                  borderLeft: `3px solid ${done ? "#4caf7d" : "#d4af37"}`,
                  transform: isActive ? "scale(1.01)" : "scale(1)",
                  boxShadow: isActive ? "0 0 30px rgba(212,175,55,0.2)" : "none",
                }}
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="font-ceremonial opacity-30 flex-shrink-0" style={{ fontSize: "1.2rem", lineHeight: 1 }}>
                    {v.isJunior ? "🌱" : "✦"}
                  </div>
                  <div>
                    <div className="font-ceremonial mb-1" style={{ fontSize: "0.65rem", letterSpacing: "2px", color: done ? "#4caf7d" : "#d4af37" }}>
                      {v.name} &nbsp;·&nbsp; {v.countryCode}
                      {v.isJunior && <span className="badge badge-guardian ml-2" style={{ fontSize: "0.45rem" }}>JUNIOR — eltern benachrichtigt</span>}
                    </div>
                    <p className="opacity-60" style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", fontStyle: "italic" }}>
                      {v.intention}
                    </p>
                    <div className="font-ceremonial opacity-25 mt-1" style={{ fontSize: "0.5rem", letterSpacing: "1.5px" }}>
                      Wartet seit {v.waiting}
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {done ? (
                    <div className="font-ceremonial" style={{ fontSize: "0.6rem", letterSpacing: "2px", color: "#4caf7d" }}>
                      ✓ Beheimatet
                    </div>
                  ) : (
                    <button
                      className="btn-gold"
                      style={{ fontSize: "0.6rem", padding: "0.6rem 1.2rem" }}
                      onClick={(e) => handleGreet(v.id, e)}
                    >
                      Hallo sagen ✦
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* FLASH MESSAGE */}
        {active && (
          <div
            className="text-center mt-8 py-4"
            style={{ background: "rgba(212,175,55,0.08)", border: "1px solid var(--border-gold)", animation: "glory-pulse 0.5s ease-out" }}
          >
            <p className="font-ceremonial text-gold" style={{ fontSize: "0.8rem", letterSpacing: "3px" }}>
              ✦ Dein Hallo ist auf dem Weg — die Beheimatung ist vergoldet ✦
            </p>
          </div>
        )}

        {/* GIESSFASS NOTE */}
        <div className="mt-10 p-5 text-center" style={{ background: "rgba(124,58,237,0.04)", border: "1px solid rgba(124,58,237,0.2)" }}>
          <p className="font-ceremonial opacity-40" style={{ fontSize: "0.55rem", letterSpacing: "2px" }}>
            ⬡ Jede gefüllte Vakanz wird im Gießfass verzeichnet und vergoldet &nbsp;·&nbsp; 🛡️ Junior-Vakanzen gehen nur an die Eltern-Passage
          </p>
        </div>

        <div className="flex justify-center mt-10">
          <Link href="/portal" className="btn-ghost">← Zum Portal</Link>
        </div>
      </div>
    </main>
  );
}
