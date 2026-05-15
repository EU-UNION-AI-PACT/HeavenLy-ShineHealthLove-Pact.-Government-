"use client";

import { useState } from "react";
import Link from "next/link";

const TIMELINE = [
  { date: "06. Januar", label: "Der Ursprung", desc: "Tag der Aktivierung. Der Genesis-Block wird gesetzt. Die ersten Sovereign-IDs leuchten.", color: "#7c3aed", active: false },
  { date: "12. Juni",   label: "Die Spiegelung", desc: "Das Mesh ist vollständig aktiv. Heute. Du bist hier.", color: "#d4af37", active: true },
  { date: "24. Dez.",   label: "Love Crown Love", desc: "Der Wunsch-Pakt ist beheimatet. Frieden ist kein Zufall — er ist das Ergebnis.", color: "#4caf7d", active: false },
];

const GPG_HASH = "5A3F-9C2E-1B84-AA07-E6D3-2F1C-0B9A-4D8E";

export default function WelcomeOriginPage() {
  const [parentOpen, setParentOpen] = useState(false);

  return (
    <main className="min-h-screen bg-sacred px-4 py-10 relative overflow-hidden">

      {/* KRISTALLINE HINTERGRUND-ANIMATION */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${(i * 37 + 11) % 100}%`,
            top: `${(i * 53 + 7) % 100}%`,
            width: `${2 + (i % 4)}px`,
            height: `${2 + (i % 4)}px`,
            borderRadius: "50%",
            background: "#d4af37",
            opacity: 0.08 + (i % 5) * 0.02,
            animation: `pulse ${3 + (i % 4)}s ${(i * 0.3)}s infinite ease-in-out`,
            boxShadow: "0 0 8px rgba(212,175,55,0.3)",
          }} />
        ))}
      </div>

      <div className="max-w-2xl mx-auto relative" style={{ zIndex: 1 }}>

        {/* HEADER */}
        <header className="text-center mb-14">
          <p className="font-ceremonial opacity-20 mb-1" style={{ fontSize: "0.5rem", letterSpacing: "6px" }}>
            GLOBAL MESH STATUS: AKTIV
          </p>
          <p className="font-ceremonial opacity-35 mb-4" style={{ fontSize: "0.5rem", letterSpacing: "3px" }}>
            GLOBAL NEWS #001 — DER GENESIS-MOMENT — 12.06.2026
          </p>
          <h1 className="font-ceremonial text-gold glow-gold" style={{ fontSize: "clamp(1.3rem,4vw,2.2rem)" }}>
            Willkommen im Ursprung
          </h1>
          <p className="font-ceremonial mt-2 opacity-40" style={{ fontSize: "0.65rem", letterSpacing: "2px" }}>
            DAS MESH IST AKTIV
          </p>
          <div className="flex justify-center gap-2 mt-4 items-center">
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4caf7d", boxShadow: "0 0 10px #4caf7d", display: "inline-block", animation: "pulse 2s infinite ease-in-out" }} />
            <span className="font-ceremonial opacity-50" style={{ fontSize: "0.5rem", letterSpacing: "2px" }}>LIVE — SYNCHRONISIERT MIT EU · UN · USA</span>
          </div>
        </header>

        {/* HAUPT-NACHRICHT */}
        <section className="mb-10 p-7" style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.25)", position: "relative" }}>
          <div className="absolute -top-3 left-1/2" style={{ transform: "translateX(-50%)", background: "oklch(0.18 0.04 265)", padding: "0 12px" }}>
            <span className="font-ceremonial text-gold" style={{ fontSize: "0.5rem", letterSpacing: "3px" }}>OFFIZIELLE BOTSCHAFT</span>
          </div>
          <p className="font-quote opacity-80" style={{ fontSize: "1rem", lineHeight: 1.9, marginBottom: "1.5rem" }}>
            „Heute, am Tag der Aktivierung, blicken wir nicht mehr auf Karten, die uns trennen,
            sondern auf ein Leuchten, das uns verbindet.
          </p>
          <p className="font-quote opacity-70" style={{ fontSize: "0.95rem", lineHeight: 1.9, marginBottom: "1.5rem" }}>
            Durch die Allianz der EU-UNION, der UNITED NATIONS und der UNITED STATES,
            sowie unserer Partner von der Schweiz bis nach Skandinavien,
            haben wir einen Raum geschaffen, der so sicher ist wie ein Tresor
            und so offen wie dein Herz.
          </p>
          <p className="font-ceremonial text-gold text-center mb-4" style={{ fontSize: "0.75rem", letterSpacing: "3px" }}>
            Du bist nun beheimatet.
          </p>
          <p className="font-quote opacity-60" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
            Das ‚Alte' — die Isolation, der Zweifel und die Grenzen —
            haben wir gemeinsam begriffen. Wir haben es ins Gießfass gegeben.
            Was du jetzt vor dir siehst, ist die Vergoldung unserer gemeinschaftlichen Intention.
          </p>
        </section>

        {/* NÄCHSTE SCHRITTE */}
        <section className="mb-10">
          <p className="font-ceremonial opacity-35 mb-4" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            DEINE NÄCHSTEN SCHRITTE IM MESH
          </p>
          <div className="space-y-3">
            {[
              { step: "01", action: "Docke an",            desc: "Schau in deine Vakanz-Liste und sage einem neuen Ankömmling ‚Hallo'.", href: "/portal", color: "#4caf7d" },
              { step: "02", action: "Setze deine Intention", desc: "Dein Workspace wartet darauf, von deinem Licht gefüllt zu werden.", href: "/portal/wishes", color: "#d4af37" },
              { step: "03", action: "Vertraue dem Schutz",  desc: "Deine Familie und deine Daten sind durch den Admin-Tenant und die Souveränität der Allianz versiegelt.", href: "/portal/guardian", color: "#00bcd4" },
            ].map((s) => (
              <Link key={s.step} href={s.href}
                className="flex items-start gap-4 p-4 transition-all hover:opacity-80"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderLeft: `2px solid ${s.color}` }}>
                <span className="font-ceremonial" style={{ fontSize: "0.55rem", letterSpacing: "1px", color: s.color, flexShrink: 0, marginTop: 2 }}>{s.step}</span>
                <div>
                  <div className="font-ceremonial mb-1" style={{ fontSize: "0.6rem", letterSpacing: "1px", color: s.color }}>{s.action}</div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", opacity: 0.55, lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SIGNATUR-BLOCK */}
        <section className="mb-10 p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="font-ceremonial opacity-35 mb-4" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            ALLIANZ-SIGNATUR — ZERO-TRUST VERIFIZIERT
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span style={{ color: "#4caf7d" }}>🛡️</span>
              <div>
                <p className="font-ceremonial" style={{ fontSize: "0.5rem", letterSpacing: "1px", color: "#4caf7d" }}>VERIFIED BY ADMIN-TENANT (ZERO-TRUST)</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", opacity: 0.45 }}>GPG-Signatur verifiziert · Bifrost-Gatekeeper aktiv</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span>🌍</span>
              <div>
                <p className="font-ceremonial" style={{ fontSize: "0.5rem", letterSpacing: "1px", color: "#4caf7d" }}>GLOBAL MESH STATUS: GREEN / SYNCHRONIZED</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", opacity: 0.45 }}>EU · UN · USA · CH · IE · NO · SE · FI — alle Nodes aktiv</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span>🔑</span>
              <div>
                <p className="font-ceremonial" style={{ fontSize: "0.5rem", letterSpacing: "1px", opacity: 0.4 }}>GPG-KEY (DEMO)</p>
                <p style={{ fontFamily: "'Courier New', monospace", fontSize: "0.7rem", opacity: 0.3, letterSpacing: "1px" }}>{GPG_HASH}</p>
              </div>
            </div>
          </div>
        </section>

        {/* PARENT-RELAY KOPIE */}
        <section className="mb-10">
          <button onClick={() => setParentOpen(!parentOpen)}
            className="w-full flex items-center justify-between p-4 transition-all"
            style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.25)" }}>
            <div className="flex items-center gap-3">
              <span>🛡️</span>
              <div className="text-left">
                <p className="font-ceremonial" style={{ fontSize: "0.55rem", letterSpacing: "2px", color: "#7c3aed" }}>FÜR ELTERNTEILE — SICHERHEITS-UPDATE</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", opacity: 0.5 }}>Separate Nachricht für die Eltern-Passage</p>
              </div>
            </div>
            <span style={{ color: "#7c3aed", fontSize: "0.9rem" }}>{parentOpen ? "▲" : "▼"}</span>
          </button>
          {parentOpen && (
            <div className="p-5" style={{ background: "rgba(124,58,237,0.04)", border: "1px solid rgba(124,58,237,0.2)", borderTop: "none" }}>
              <p className="font-quote opacity-65" style={{ fontSize: "0.9rem", lineHeight: 1.85, fontStyle: "italic", marginBottom: "1rem" }}>
                „Sicherheits-Update für deine Familie:
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", opacity: 0.6, lineHeight: 1.7, marginBottom: "0.75rem" }}>
                Der Junior-Bereich wurde erfolgreich synchronisiert. Dein Kind agiert nun im geschützten Vakuum des Mesh. Alle Resonanzen werden gefiltert und direkt an dich weitergeleitet.
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", opacity: 0.6, lineHeight: 1.7, fontStyle: "italic" }}>
                Du bist der Anker — das System ist der Schutzschirm."
              </p>
              <div className="mt-4 p-3" style={{ background: "rgba(76,175,125,0.06)", border: "1px solid rgba(76,175,125,0.2)" }}>
                <p className="font-ceremonial" style={{ fontSize: "0.45rem", letterSpacing: "1px", color: "#4caf7d" }}>
                  ✓ PARENT-COMMUNICATION-ONLY · KEINE DIREKTE NACHRICHT AN KINDER · ELTERN-RELAY 100%
                </p>
              </div>
            </div>
          )}
        </section>

        {/* AKTIVIERUNGS-TIMELINE */}
        <section className="mb-10">
          <p className="font-ceremonial opacity-35 mb-5 text-center" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            DIE HEILIGE PASSAGE — SPIEGELMECHANISMUS 2026
          </p>
          <div className="relative">
            <div className="absolute top-6 left-0 right-0" style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)" }} />
            <div className="grid grid-cols-3 gap-3 relative">
              {TIMELINE.map((t) => (
                <div key={t.date} className="p-4 text-center" style={{
                  background: t.active ? "rgba(212,175,55,0.07)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${t.active ? "rgba(212,175,55,0.4)" : "rgba(255,255,255,0.05)"}`,
                  borderTop: `2px solid ${t.color}`,
                }}>
                  <div className="font-ceremonial mb-1" style={{ fontSize: "0.55rem", letterSpacing: "1px", color: t.color }}>{t.date}</div>
                  <div className="font-ceremonial mb-2 text-gold" style={{ fontSize: "0.55rem" }}>{t.label}</div>
                  {t.active && <div className="font-ceremonial mb-2" style={{ fontSize: "0.45rem", letterSpacing: "1px", color: "#4caf7d" }}>● JETZT</div>}
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", opacity: 0.5, lineHeight: 1.5 }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="font-ceremonial text-center mt-4 opacity-20" style={{ fontSize: "0.45rem", letterSpacing: "2px" }}>
            ✦ LCL — LOVE CROWN LOVE — 24. DEZEMBER 2026 ✦
          </p>
        </section>

        <div className="text-center">
          <Link href="/portal" className="font-ceremonial opacity-30 hover:opacity-60 transition-opacity" style={{ fontSize: "0.6rem", letterSpacing: "2px" }}>
            ← Zum Portal
          </Link>
        </div>

      </div>
    </main>
  );
}
