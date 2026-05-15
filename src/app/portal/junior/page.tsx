"use client";

import { useEffect, useState } from "react";

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 5,
  size: 4 + Math.random() * 6,
  color: ["#d4af37", "#00bcd4", "#e67e22", "#7c3aed", "#4caf7d"][Math.floor(Math.random() * 5)],
}));

export default function JuniorPortalPage() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <main
      className="min-h-screen junior-bg px-6 py-12 relative overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* FLOATING PARTICLES */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          style={{
            position: "fixed",
            left: `${p.x}%`,
            bottom: `-${p.size}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: p.color,
            opacity: 0.5,
            animation: `particle-rise ${4 + p.delay}s ease-in infinite`,
            animationDelay: `${p.delay}s`,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      <div className="relative z-10 max-w-2xl mx-auto text-center">

        {/* GREETING */}
        <div className="mb-12">
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✨</div>
          <h1
            className="font-ceremonial text-gold glow-gold mb-3"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)" }}
          >
            Hallo, Pilger-Junior!
          </h1>
          <p
            className="text-gold-ethereal opacity-70"
            style={{ fontFamily: "var(--font-body)", fontSize: "1.2rem", fontStyle: "italic" }}
          >
            Du bist Teil von etwas Wunderbarem.
          </p>
        </div>

        {/* PROTECTED NOTICE */}
        <div
          className="mb-10 p-5 mx-auto max-w-sm"
          style={{
            background: "rgba(0,188,212,0.06)",
            border: "1px solid rgba(0,188,212,0.25)",
            borderRadius: "2px",
          }}
        >
          <p className="font-ceremonial mb-1" style={{ fontSize: "0.6rem", letterSpacing: "2px", color: "#00bcd4" }}>
            🛡️ GESCHÜTZTER BEREICH
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", opacity: 0.75 }}>
            Deine Eltern sehen alles, was hier passiert. Sie sind dein Anker.
          </p>
        </div>

        {/* MY SPACE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          <div
            className="station-card"
            style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.25)" }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🌱</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px", color: "#d4af37" }}>
              Mein Gebet
            </div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Pflanze deine erste Hoffnung ins Licht
            </p>
          </div>

          <div
            className="station-card"
            style={{ background: "rgba(76,175,125,0.06)", border: "1px solid rgba(76,175,125,0.25)" }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>⭐</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px", color: "#4caf7d" }}>
              Meine Sterne
            </div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Sammle Licht für deinen Pilger-Pfad
            </p>
          </div>

          <div
            className="station-card"
            style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.25)" }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🎨</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px", color: "#7c3aed" }}>
              Meine Farbe
            </div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Wähle dein Licht-Symbol
            </p>
          </div>

          <div
            className="station-card"
            style={{ background: "rgba(0,188,212,0.06)", border: "1px solid rgba(0,188,212,0.25)" }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🌍</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px", color: "#00bcd4" }}>
              Family Orbit
            </div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Deine Familie im Licht-Netz
            </p>
          </div>
        </div>

        {/* SILENT ID NOTICE */}
        <div className="mt-8 font-ceremonial opacity-30" style={{ fontSize: "0.55rem", letterSpacing: "2px" }}>
          🔒 SILENT JUNIOR ID &nbsp;|&nbsp; KEIN DIREKTKONTAKT NACH AUSSEN &nbsp;|&nbsp; 🛡️ ELTERN-RELAY AKTIV
        </div>
      </div>
    </main>
  );
}
