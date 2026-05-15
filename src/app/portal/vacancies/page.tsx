"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const BERUF_FELDER = [
  { key: "handwerk",    label: "Handwerk & Gestaltung",   icon: "🔨", color: "#e67e22" },
  { key: "natur",       label: "Natur & Landwirtschaft",  icon: "🌱", color: "#4caf7d" },
  { key: "soziales",    label: "Soziales & Pflege",       icon: "🤝", color: "#00bcd4" },
  { key: "kunst",       label: "Kunst & Musik & Kultur",  icon: "🎨", color: "#d4af37" },
  { key: "technik",     label: "Technik & Digitales",     icon: "⬡",  color: "#7c3aed" },
  { key: "spirituell",  label: "Spirituelles & Seelsorge",icon: "✦",  color: "#d4af37" },
  { key: "wissenschaft",label: "Wissenschaft & Forschung",icon: "🔬", color: "#00bcd4" },
  { key: "anderes",     label: "Mein eigener Weg",        icon: "◈",  color: "#4caf7d" },
];

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
  const [berufFeld, setBerufFeld] = useState("");
  const [berufText, setBerufText] = useState("");
  const [berufSent, setBerufSent] = useState(false);

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

        {/* ── BERUFUNGSWUNSCH ── */}
        <section style={{
          marginBottom: "3rem",
          padding: "2.5rem 2rem",
          background: "rgba(212,175,55,0.03)",
          border: "1px solid rgba(212,175,55,0.2)",
          borderTop: "2px solid #d4af37",
          position: "relative",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #d4af37, transparent)" }} />

          <p className="font-ceremonial text-center" style={{ fontSize: "0.55rem", letterSpacing: "5px", opacity: 0.35, marginBottom: "0.75rem" }}>
            BERUFUNGS-PROTOKOLL — MENSCHENWÜRDE VOR SCHULNOTEN
          </p>
          <h2 className="font-ceremonial text-gold text-center" style={{ fontSize: "clamp(1.1rem, 3vw, 1.6rem)", letterSpacing: "3px", marginBottom: "1rem" }}>
            Dein Berufungswunsch
          </h2>

          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", opacity: 0.65, lineHeight: 1.85, maxWidth: 600, margin: "0 auto 2rem", textAlign: "center" }}>
            Wir sind nicht dazu da, Türen nach Noten zu öffnen oder zu schließen.
            Wir sind dazu da, die Brücke zwischen dem, was du dir für dein Leben vorstellst,
            und der Realität zu bauen — unabhängig von Zeugnissen, Herkunft oder gesellschaftlicher Stellung.
            Schulnoten sind ein Werkzeug, nicht ein Urteil über dein Dasein.
          </p>

          {/* Berufsfeld-Auswahl */}
          <div style={{ marginBottom: "1.5rem" }}>
            <p className="font-ceremonial text-center" style={{ fontSize: "0.5rem", letterSpacing: "3px", opacity: 0.35, marginBottom: "0.75rem" }}>
              IN WELCHEM BEREICH SIEHST DU DEINEN WEG?
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.5rem" }}>
              {BERUF_FELDER.map((f) => (
                <button
                  key={f.key}
                  onClick={() => { setBerufFeld(f.key); setBerufSent(false); }}
                  style={{
                    padding: "0.75rem 1rem",
                    background: berufFeld === f.key ? `${f.color}12` : "rgba(255,255,255,0.02)",
                    border: `1px solid ${berufFeld === f.key ? f.color + "60" : "rgba(255,255,255,0.06)"}`,
                    borderLeft: `3px solid ${berufFeld === f.key ? f.color : "transparent"}`,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.25s",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>{f.icon}</span>
                  <span style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.55rem", letterSpacing: "1.5px", color: berufFeld === f.key ? f.color : "rgba(249,241,215,0.55)" }}>
                    {f.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Freitextfeld */}
          {!berufSent ? (
            <div style={{ opacity: berufFeld ? 1 : 0.4, transition: "opacity 0.3s" }}>
              <p className="font-ceremonial text-center" style={{ fontSize: "0.5rem", letterSpacing: "3px", opacity: 0.35, marginBottom: "0.75rem" }}>
                BESCHREIBE, WAS DU DIR FÜR DEIN BERUFSLEBEN VORSTELLST
              </p>
              <textarea
                className="input-sacred w-full resize-none"
                rows={4}
                disabled={!berufFeld}
                placeholder={berufFeld
                  ? "Ich stelle mir vor, dass ich eines Tages … weil mich das schon immer … und ich dabei das Gefühl habe, dass …"
                  : "Wähle zuerst einen Bereich oben …"}
                value={berufText}
                onChange={(e) => setBerufText(e.target.value)}
                style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", marginBottom: "1rem" }}
              />
              <div style={{
                padding: "0.85rem 1.1rem",
                background: "rgba(76,175,125,0.05)",
                border: "1px solid rgba(76,175,125,0.2)",
                borderLeft: "3px solid #4caf7d",
                marginBottom: "1rem",
              }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", opacity: 0.65, lineHeight: 1.8 }}>
                  <strong style={{ color: "#4caf7d" }}>Was passiert mit deinem Berufungswunsch?</strong><br />
                  Er wird anonym im Gießfass gespeichert. Das System analysiert kollektiv, welche Berufsfelder
                  gefragt, unerfüllt und strukturell unterversorgt sind — und leitet diese Erkenntnisse
                  an die zuständigen Stellen der Allianz weiter. Kein Name. Keine Note. Nur dein Wille.
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
                <p className="font-ceremonial" style={{ fontSize: "0.45rem", letterSpacing: "1px", opacity: 0.25 }}>
                  🔒 ZERO-KNOWLEDGE · DSGVO · KEIN NAME · KEINE NOTE
                </p>
                <button
                  className="btn-gold"
                  style={{ opacity: berufFeld && berufText.trim() ? 1 : 0.3, fontSize: "0.6rem" }}
                  disabled={!berufFeld || !berufText.trim()}
                  onClick={() => setBerufSent(true)}
                >
                  Berufungswunsch einreichen ✦
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <div className="font-ceremonial text-gold glow-gold" style={{ fontSize: "2rem", marginBottom: "1rem" }}>✦</div>
              <p className="font-ceremonial text-gold" style={{ fontSize: "0.7rem", letterSpacing: "3px", marginBottom: "0.75rem" }}>
                DEIN BERUFUNGSWUNSCH IST EINGEGANGEN
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", opacity: 0.65, lineHeight: 1.8, maxWidth: 480, margin: "0 auto 1.5rem" }}>
                Er ist anonym gespeichert und wird als Teil des kollektiven Berufungs-Manifests
                an die Allianz übermittelt. Schulnoten waren niemals das letzte Wort —
                dein Lebenswille ist es.
              </p>
              <button className="btn-ghost" style={{ fontSize: "0.6rem" }}
                onClick={() => { setBerufSent(false); setBerufText(""); setBerufFeld(""); }}>
                Weiteren Wunsch einreichen
              </button>
            </div>
          )}
        </section>

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
