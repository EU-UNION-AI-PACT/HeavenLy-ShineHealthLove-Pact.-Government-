"use client";

import { useState } from "react";
import Link from "next/link";

const GLAUBENS_WEGE = [
  "Christlich (katholisch / evangelisch)", "Muslimisch", "Jüdisch", "Hinduistisch",
  "Buddhistisch", "Säkular / Humanistisch", "Keine Angabe",
];

const EMPFAENGER = [
  { key: "earth",   label: "Für die Erde",          icon: "🌍", color: "#4caf7d" },
  { key: "fellows", label: "Für Mitmenschen",        icon: "🤝", color: "#00bcd4" },
  { key: "gov",     label: "Für die Entscheider",   icon: "🏛️", color: "#7c3aed" },
  { key: "self",    label: "Für mich selbst",        icon: "✦",  color: "#d4af37" },
];

const ANTI_VERGESSEN = [
  { thema: "Die Stimmen der Stillen",       muster: "Obdachlosigkeit, Isolation, nicht-gehörte Lebensgeschichten", icon: "🕯️", color: "#d4af37" },
  { thema: "Die Fehler der Strukturen",     muster: "Bürokratie, die Menschen übersieht statt hilft",             icon: "⚡", color: "#ef4444" },
  { thema: "Die Unsichtbaren Verbindungen", muster: "Tiere, Wälder, Gewässer als Teil des kollektiven Bewusstseins", icon: "🌿", color: "#4caf7d" },
];

const KORRELATIONS_FEED = [
  { text: "1.240 Fürbitten für Frieden in europäischen Städten — heute",     color: "#00bcd4" },
  { text: "892 Intentionen für Wohnraum-Gerechtigkeit — EU-Allianz aktiv",   color: "#4caf7d" },
  { text: "3.104 Wünsche für saubere Gewässer — an IPCC weitergeleitet",     color: "#4caf7d" },
  { text: "560 Fürbitten für einsame Senioren — Leitanker-Relay aktiviert",  color: "#d4af37" },
  { text: "2.800 Intentionen für Würde in Hospizen — Wünsche-Wagen läuft",   color: "#d4af37" },
];

export default function FurbitteHubPage() {
  const [glaube, setGlaube] = useState("");
  const [empfaenger, setEmpfaenger] = useState("");
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const aktEmpf = EMPFAENGER.find((e) => e.key === empfaenger);

  return (
    <main className="min-h-screen bg-sacred px-4 py-10">
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <header className="text-center mb-12">
          <p className="font-ceremonial opacity-20 mb-1" style={{ fontSize: "0.5rem", letterSpacing: "6px" }}>
            DAS SPRACHROHR DER WELT
          </p>
          <p className="font-ceremonial opacity-30 mb-4" style={{ fontSize: "0.5rem", letterSpacing: "3px" }}>
            NIE WIEDER VERGESSEN · INTERRELIGIÖSE KORALITÄT · DOGMENFREI
          </p>
          <h1 className="font-ceremonial text-gold glow-gold" style={{ fontSize: "clamp(1.3rem,4vw,2rem)" }}>
            Fürbitte-Hub
          </h1>
          <p className="font-quote mt-3 opacity-55" style={{ fontSize: "0.9rem", lineHeight: 1.85, maxWidth: "520px", margin: "0.75rem auto 0" }}>
            Hier fließen die Gebete und Intentionen aller Glaubensrichtungen zusammen.
            Die Technik bewertet nicht den Glauben — sondern die darin enthaltene Menschlichkeit
            und den Wunsch nach Frieden.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {["Christlich", "Muslimisch", "Jüdisch", "Hinduistisch", "Buddhistisch", "Säkular"].map((g) => (
              <span key={g} className="font-ceremonial opacity-25" style={{ fontSize: "0.45rem", letterSpacing: "1px", border: "1px solid rgba(212,175,55,0.2)", padding: "2px 8px" }}>
                {g}
              </span>
            ))}
          </div>
        </header>

        {/* GLAUBENSWEG (optional) */}
        <section className="mb-8">
          <p className="font-ceremonial opacity-35 mb-3" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            DEIN WEG (optional — keine Pflicht)
          </p>
          <div className="flex flex-wrap gap-2">
            {GLAUBENS_WEGE.map((g) => (
              <button key={g} onClick={() => setGlaube(glaube === g ? "" : g)}
                className="transition-all"
                style={{
                  fontFamily: "var(--font-body)", fontSize: "0.8rem", padding: "4px 12px",
                  border: `1px solid ${glaube === g ? "rgba(212,175,55,0.5)" : "rgba(255,255,255,0.07)"}`,
                  background: glaube === g ? "rgba(212,175,55,0.08)" : "transparent",
                  color: glaube === g ? "#d4af37" : undefined, cursor: "pointer",
                }}>
                {g}
              </button>
            ))}
          </div>
          {glaube && (
            <p className="font-ceremonial mt-2 opacity-30" style={{ fontSize: "0.45rem", letterSpacing: "1px" }}>
              ✓ GEWÄHLT: {glaube.toUpperCase()} — WIRD ANONYM KORRELIERT, NICHT GESPEICHERT
            </p>
          )}
        </section>

        {/* EMPFÄNGER */}
        <section className="mb-8">
          <p className="font-ceremonial opacity-35 mb-3" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            WOFÜR SPRICHST DU?
          </p>
          <div className="grid grid-cols-2 gap-2">
            {EMPFAENGER.map((e) => (
              <button key={e.key} onClick={() => setEmpfaenger(e.key)}
                className="p-4 flex items-center gap-3 transition-all"
                style={{
                  background: empfaenger === e.key ? `${e.color}12` : "rgba(255,255,255,0.02)",
                  border: `1px solid ${empfaenger === e.key ? e.color + "50" : "rgba(255,255,255,0.06)"}`,
                  borderTop: `2px solid ${e.color}`,
                }}>
                <span style={{ fontSize: "1.3rem" }}>{e.icon}</span>
                <span className="font-ceremonial" style={{ fontSize: "0.6rem", letterSpacing: "1px", color: e.color }}>{e.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* FÜRBITTE-FORMULAR */}
        {!submitted ? (
          <section className="mb-8">
            <p className="font-ceremonial opacity-35 mb-3" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
              DEINE FÜRBITTE FÜR DIE WELT
            </p>
            <div className="p-5 space-y-4" style={{
              background: aktEmpf ? `${aktEmpf.color}05` : "rgba(255,255,255,0.01)",
              border: `1px solid ${aktEmpf ? aktEmpf.color + "25" : "rgba(255,255,255,0.04)"}`,
            }}>
              <textarea className="input-sacred w-full resize-none" rows={5}
                placeholder="Deine Fürbitte, dein Wunsch, deine Intention für die Welt…"
                value={text} onChange={(e) => setText(e.target.value)}
                style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }} />
              <div className="flex items-center justify-between flex-wrap gap-3">
                <p className="font-ceremonial opacity-20" style={{ fontSize: "0.45rem", letterSpacing: "1px" }}>
                  🔒 VOLLSTÄNDIG ANONYM · ZERO-KNOWLEDGE · KEIN NAME · NUR FREQUENZ
                </p>
                <button className="btn-gold"
                  disabled={!text.trim()}
                  onClick={() => text.trim() && setSubmitted(true)}
                  style={{ opacity: text.trim() ? 1 : 0.3 }}>
                  Ins Gießfass →
                </button>
              </div>
            </div>
          </section>
        ) : (
          <section className="mb-8 p-7 text-center" style={{ background: "rgba(212,175,55,0.06)", border: "1px solid var(--border-gold)" }}>
            <div className="font-ceremonial text-gold glow-gold mb-3" style={{ fontSize: "2.5rem" }}>⬡</div>
            <p className="font-ceremonial text-gold mb-2" style={{ fontSize: "0.65rem", letterSpacing: "3px" }}>VERGOLDET — IM KOLLEKTIVEN SPRACHROHR</p>
            {aktEmpf && (
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", opacity: 0.55, marginBottom: "0.5rem" }}>
                {aktEmpf.icon} Fürbitte für: {aktEmpf.label}
              </p>
            )}
            <p className="font-ceremonial opacity-20 mt-3" style={{ fontSize: "0.45rem", letterSpacing: "2px" }}>
              ✦ AN EU · UN · VATIKAN WEITERGELEITET · ANONYM · VERSIEGELT ✦
            </p>
            <button className="btn-ghost mt-4" style={{ fontSize: "0.6rem" }}
              onClick={() => { setSubmitted(false); setText(""); setEmpfaenger(""); }}>
              Weitere Fürbitte einbringen
            </button>
          </section>
        )}

        {/* KOLLEKTIVER KORRELATIONS-RAUM */}
        <section className="mb-10">
          <p className="font-ceremonial opacity-35 mb-4" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            KOLLEKTIVER KORRELATIONS-RAUM — HEUTE AKTIV
          </p>
          <div className="space-y-2">
            {KORRELATIONS_FEED.map((f) => (
              <div key={f.text} className="flex items-center gap-3 p-3" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${f.color}18`, borderLeft: `2px solid ${f.color}` }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: f.color, boxShadow: `0 0 5px ${f.color}`, flexShrink: 0 }} />
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", opacity: 0.7, lineHeight: 1.5 }}>{f.text}</p>
              </div>
            ))}
          </div>
          <p className="font-ceremonial mt-3 opacity-20 text-center" style={{ fontSize: "0.45rem", letterSpacing: "1px" }}>
            EMERGENTE WEISHEIT — KEIN EINZELMENSCH WIRD IDENTIFIZIERT
          </p>
        </section>

        {/* ANTI-WIEDERHOLUNGS-SEKTION */}
        <section className="mb-10">
          <p className="font-ceremonial opacity-35 mb-4" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            WAS DIE WELT NIE WIEDER VERGESSEN DARF
          </p>
          <div className="space-y-3">
            {ANTI_VERGESSEN.map((a) => (
              <div key={a.thema} className="flex items-start gap-4 p-4" style={{ background: `${a.color}06`, border: `1px solid ${a.color}25`, borderLeft: `2px solid ${a.color}` }}>
                <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{a.icon}</span>
                <div>
                  <div className="font-ceremonial mb-1" style={{ fontSize: "0.6rem", letterSpacing: "1.5px", color: a.color }}>{a.thema}</div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", opacity: 0.55, lineHeight: 1.6 }}>{a.muster}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ALLIANZ-WEITERLEITUNG VISUAL */}
        <section className="mb-10">
          <p className="font-ceremonial opacity-35 mb-4 text-center" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            ALLIANZ-WEITERLEITUNG — GIESSFASS-REAKTOR
          </p>
          <div className="grid grid-cols-4 gap-0">
            {[
              { step: "Fürbitte", icon: "🕊️", color: "#7c3aed" },
              { step: "Vergoldung", icon: "⬡",  color: "#d4af37" },
              { step: "Analyse",   icon: "⚡",  color: "#00bcd4" },
              { step: "EU · UN · Vatikan", icon: "🌐", color: "#4caf7d" },
            ].map((s, i) => (
              <div key={s.step} className="p-3 text-center" style={{
                background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
                borderRight: i < 3 ? "none" : undefined, borderTop: `2px solid ${s.color}`,
              }}>
                <div style={{ fontSize: "1.1rem", marginBottom: "0.3rem" }}>{s.icon}</div>
                <div className="font-ceremonial" style={{ fontSize: "0.4rem", letterSpacing: "0.5px", color: s.color }}>{s.step}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center">
          <Link href="/portal" className="font-ceremonial opacity-30 hover:opacity-60 transition-opacity" style={{ fontSize: "0.6rem", letterSpacing: "2px" }}>
            ← Zurück zum Portal
          </Link>
        </div>

      </div>
    </main>
  );
}
