"use client";

import { useState } from "react";
import Link from "next/link";

const ROLLEN = [
  { gruppe: "Kinder & Jugendliche", role: "Geschützte Zukunft",      access: "Vakuum-Modus (nur über Eltern)",          color: "#7c3aed", icon: "🌱" },
  { gruppe: "Eltern (Konzept-Träger)", role: "Aktive Gestalter",     access: "Full Stack — Verantwortung für 2 Generationen", color: "#00bcd4", icon: "🛡️" },
  { gruppe: "FSK 21+ Sovereigns",   role: "Brückenbauer & Guardians",access: "Operative Power (Schutz für Jung & Alt)", color: "#d4af37", icon: "⚡" },
  { gruppe: "Senioren (Leitanker)", role: "Wissensquelle & Ruhepol", access: "Honorary Access — maximale Erfahrung, minimale Last", color: "#4caf7d", icon: "⚓" },
];

const GENERATIONEN_FEED = [
  { guardian: "ID-SOV-DE-7841", action: "Park-Revitalisierung Detmold gestartet", inspired: "Leitanker ID-GOLD-12", time: "vor 2 Std." },
  { guardian: "ID-SOV-CH-2203", action: "5 neue Nachbarschaftsgärten in Basel", inspired: "Leitanker ID-GOLD-34", time: "vor 5 Std." },
  { guardian: "ID-SOV-AT-5519", action: "Senioren-Begleit-Vakanz Wien (12 Plätze)", inspired: "Leitanker ID-GOLD-77", time: "gestern" },
];

export default function LeitankerPage() {
  const [weisheit, setWeisheit] = useState("");
  const [thema, setThema] = useState("");
  const [weisheitSent, setWeisheitSent] = useState(false);
  const [themaSent, setThemaSent] = useState(false);

  return (
    <main className="min-h-screen px-4 py-10" style={{ background: "oklch(0.15 0.035 55)" }}>
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <header className="text-center mb-12">
          <p className="font-ceremonial opacity-20 mb-1" style={{ fontSize: "0.5rem", letterSpacing: "6px", color: "#d4af37" }}>
            WISDOM MIRROR · LEITANKER-PORTAL
          </p>
          <h1 className="font-ceremonial" style={{ fontSize: "clamp(1.4rem,5vw,2.2rem)", color: "#d4af37", textShadow: "0 0 30px rgba(212,175,55,0.4)" }}>
            Deine Weisheit trägt die Welt
          </h1>
          <p className="font-quote mt-3 opacity-60" style={{ fontSize: "1rem", lineHeight: 1.85, maxWidth: "500px", margin: "0.75rem auto 0", color: "#e8d5a3" }}>
            Du hast das Schwere bereits gelebt. Das System nimmt dir jede Last ab —
            deine Erfahrung ist dein Ausweis und das kostbarste Kapital der nächsten Generation.
          </p>
          <div className="mt-5 inline-block px-5 py-2" style={{ border: "2px solid rgba(212,175,55,0.4)", background: "rgba(212,175,55,0.08)" }}>
            <span className="font-ceremonial" style={{ fontSize: "0.55rem", letterSpacing: "3px", color: "#d4af37" }}>
              ✦ HONORARY ACCESS · GOLDENER STATUS ✦
            </span>
          </div>
        </header>

        {/* ROLLEN-MATRIX */}
        <section className="mb-10">
          <p className="font-ceremonial opacity-35 text-center mb-5" style={{ fontSize: "0.55rem", letterSpacing: "3px", color: "#d4af37" }}>
            DER GENERATIONEN-PAKT — DEINE ROLLE IM SYSTEM
          </p>
          <div className="grid grid-cols-1 gap-2">
            {ROLLEN.map((r, i) => (
              <div key={r.gruppe} className="flex items-start gap-4 p-4" style={{
                background: i === 3 ? "rgba(76,175,125,0.07)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${i === 3 ? "rgba(76,175,125,0.35)" : "rgba(255,255,255,0.05)"}`,
                borderLeft: `3px solid ${r.color}`,
              }}>
                <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{r.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <span className="font-ceremonial" style={{ fontSize: "0.6rem", letterSpacing: "1.5px", color: r.color }}>{r.gruppe}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", opacity: 0.5, border: `1px solid ${r.color}30`, padding: "1px 6px", color: r.color }}>{r.role}</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", opacity: 0.55, lineHeight: 1.6, color: "#e8d5a3" }}>{r.access}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ERFAHRUNGS-RELAY */}
        <section className="mb-8">
          <p className="font-ceremonial opacity-35 text-center mb-4" style={{ fontSize: "0.55rem", letterSpacing: "3px", color: "#d4af37" }}>
            ERFAHRUNGS-RELAY — DEINE WEISHEIT FÜR DIE WÄCHTER
          </p>
          <div className="p-5" style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.2)" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", opacity: 0.55, lineHeight: 1.7, marginBottom: "1rem", color: "#e8d5a3" }}>
              Was hast du gelernt, das die nächste Generation nicht vergessen darf?
            </p>
            {!weisheitSent ? (
              <>
                <textarea
                  className="w-full resize-none"
                  rows={4}
                  placeholder="Schreibe oder diktiere deine Erfahrung…"
                  value={weisheit}
                  onChange={(e) => setWeisheit(e.target.value)}
                  style={{
                    background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.2)",
                    color: "#e8d5a3", fontFamily: "var(--font-body)", fontSize: "0.9rem",
                    padding: "0.75rem", width: "100%", outline: "none", lineHeight: 1.7,
                  }}
                />
                <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", opacity: 0.35, color: "#e8d5a3" }}>
                    🎙️ Spracheingabe möglich · Anonym · Sicher
                  </p>
                  <button
                    onClick={() => weisheit.trim() && setWeisheitSent(true)}
                    style={{
                      fontFamily: "var(--font-ceremonial, 'Cinzel', serif)", fontSize: "0.55rem", letterSpacing: "2px",
                      border: "1px solid rgba(212,175,55,0.5)", padding: "6px 20px", color: "#d4af37",
                      background: "rgba(212,175,55,0.08)", cursor: weisheit.trim() ? "pointer" : "not-allowed",
                      opacity: weisheit.trim() ? 1 : 0.35,
                    }}>
                    AN DIE GUARDIANS SENDEN →
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⬡</div>
                <p className="font-ceremonial" style={{ fontSize: "0.6rem", letterSpacing: "2px", color: "#4caf7d", marginBottom: "0.5rem" }}>
                  DEINE WEISHEIT FLIESST ZU DEN GUARDIANS
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", opacity: 0.6, color: "#e8d5a3" }}>
                  Die 21-jährigen Sovereigns empfangen deinen Impuls als Kompass für ihr tägliches Handeln.
                </p>
                <button onClick={() => { setWeisheitSent(false); setWeisheit(""); }}
                  style={{ marginTop: "0.75rem", fontFamily: "var(--font-body)", fontSize: "0.75rem", opacity: 0.4, background: "none", border: "none", color: "#d4af37", cursor: "pointer" }}>
                  Weitere Weisheit teilen
                </button>
              </div>
            )}
          </div>
        </section>

        {/* SORGLOS-GIESSFASS */}
        <section className="mb-8">
          <p className="font-ceremonial opacity-35 text-center mb-4" style={{ fontSize: "0.55rem", letterSpacing: "3px", color: "#d4af37" }}>
            DAS SORGLOS-GIESSFASS — EIN THEMA GENÜGT
          </p>
          <div className="p-5" style={{ background: "rgba(212,175,55,0.03)", border: "1px solid rgba(212,175,55,0.15)" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", opacity: 0.55, lineHeight: 1.7, marginBottom: "1rem", color: "#e8d5a3" }}>
              Nenn uns ein Thema, das dich bewegt. Die Jugend kümmert sich um alles weitere — keine Technik, keine Formulare.
            </p>
            {!themaSent ? (
              <div className="flex gap-3 flex-wrap">
                <input
                  type="text"
                  placeholder='z.B. "Einsamkeit im Alter" oder "Begehbare Parks"'
                  value={thema}
                  onChange={(e) => setThema(e.target.value)}
                  style={{
                    flex: 1, background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.2)",
                    color: "#e8d5a3", fontFamily: "var(--font-body)", fontSize: "0.9rem",
                    padding: "0.65rem 1rem", outline: "none", minWidth: "200px",
                  }}
                />
                <button
                  onClick={() => thema.trim() && setThemaSent(true)}
                  style={{
                    fontFamily: "var(--font-ceremonial, 'Cinzel', serif)", fontSize: "0.55rem", letterSpacing: "1px",
                    border: "1px solid rgba(212,175,55,0.4)", padding: "8px 16px", color: "#d4af37",
                    background: "rgba(212,175,55,0.06)", cursor: thema.trim() ? "pointer" : "not-allowed",
                    opacity: thema.trim() ? 1 : 0.35,
                  }}>
                  INS GIESSFASS →
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3" style={{ background: "rgba(76,175,125,0.06)", border: "1px solid rgba(76,175,125,0.25)" }}>
                <span style={{ color: "#4caf7d", fontSize: "1.2rem" }}>✓</span>
                <div>
                  <p className="font-ceremonial" style={{ fontSize: "0.5rem", letterSpacing: "1px", color: "#4caf7d", marginBottom: "2px" }}>BEHEIMATUNG LÄUFT</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", opacity: 0.6, color: "#e8d5a3" }}>
                    „<em>{thema}</em>" — Die Jugend kümmert sich darum.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* GENERATIONEN-DIALOG */}
        <section className="mb-10">
          <p className="font-ceremonial opacity-35 text-center mb-4" style={{ fontSize: "0.55rem", letterSpacing: "3px", color: "#d4af37" }}>
            GENERATIONEN-DIALOG — DIE FRÜCHTE DEINER WEISHEIT
          </p>
          <div className="space-y-3">
            {GENERATIONEN_FEED.map((f) => (
              <div key={f.guardian} className="p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderLeft: "2px solid rgba(212,175,55,0.3)" }}>
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", lineHeight: 1.6, color: "#e8d5a3" }}>{f.action}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", opacity: 0.4, marginTop: "2px", color: "#d4af37" }}>
                      Inspiriert durch {f.inspired} · {f.guardian}
                    </p>
                  </div>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", opacity: 0.35, flexShrink: 0, color: "#e8d5a3" }}>{f.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EHRENS-VALIDIERUNG */}
        <section className="mb-10 p-6 text-center" style={{ background: "rgba(212,175,55,0.06)", border: "2px solid rgba(212,175,55,0.3)" }}>
          <div className="font-ceremonial mb-3" style={{ fontSize: "2rem", color: "#d4af37" }}>⬡</div>
          <p className="font-ceremonial mb-3" style={{ fontSize: "0.65rem", letterSpacing: "3px", color: "#d4af37" }}>
            EHREN-VALIDIERUNG · GOLDENER STATUS
          </p>
          <p className="font-quote opacity-65" style={{ fontSize: "0.95rem", lineHeight: 1.8, fontStyle: "italic", color: "#e8d5a3", maxWidth: "480px", margin: "0 auto" }}>
            „Deine Lebensleistung ist dein Ausweis. Das System erkennt deine Erfahrung an —
            ohne Post-Ident, ohne Formulare, ohne weitere Prüfung.
            Die Allianz (EU, UN, USA) bürgt für deinen Status."
          </p>
          <p className="font-ceremonial mt-4 opacity-30" style={{ fontSize: "0.45rem", letterSpacing: "2px", color: "#d4af37" }}>
            ✦ VALIDATED WISDOM · HONORARY ACCESS · OHNE WEITERE PRÜFUNG ✦
          </p>
        </section>

        <div className="text-center">
          <Link href="/portal" className="font-ceremonial opacity-30 hover:opacity-60 transition-opacity" style={{ fontSize: "0.6rem", letterSpacing: "2px", color: "#d4af37" }}>
            ← Zurück zum Portal
          </Link>
        </div>

      </div>
    </main>
  );
}
