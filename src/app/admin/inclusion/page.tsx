"use client";

import { useState } from "react";
import Link from "next/link";

const BEHOERDEN = [
  {
    key: "wohnungsamt",
    name: "Wohnungsamt",
    code: "OBDACHLOS",
    output: "Sofort-Matching: Freie Wohneinheiten in 3 km Radius",
    icon: "🏠",
    color: "#00bcd4",
    desc: "Stille Übergabe an die Wohnraum-Vakanz-Engine — der Betroffene sieht nur 'Neue Möglichkeit aufgetaucht'.",
  },
  {
    key: "hospiz",
    name: "Hospiz / Palliativ",
    code: "FINAL_CHAPTER",
    output: "Story-Aktivierung + Wünsche-Wagen wird koordiniert",
    icon: "🕯️",
    color: "#d4af37",
    desc: "Würdevoller Abschluss: Jeder letzte Wunsch wird dem Wünsche-Wagen übergeben. Story wird im Golden Archive versiegelt.",
  },
  {
    key: "inklusion",
    name: "Inklusions-Amt",
    code: "BARRIERE",
    output: "Barriere-Auflösung + Assistenz-Vakanz geschaltet",
    icon: "♿",
    color: "#7c3aed",
    desc: "Barrierefreie Beheimatung: Das System schaltet passende Assistenz-Vakanzen und informiert die Familie (nie den Betroffenen direkt).",
  },
  {
    key: "psych",
    name: "Psych. Dienst",
    code: "KRISE",
    output: "Safe-Haven-Modus + Peer-Support-Netz aktiviert",
    icon: "💙",
    color: "#4caf7d",
    desc: "Safe Haven: Krisenmodus ohne Stigma. Das System schaltet vertraute Peer-Supports in der Nähe — anonym, würdevoll, sofort.",
  },
];

const CASES = [
  { bedarf: "Wohnraum dringend",     zustand: "Obdachlos 3 Monate", teilhabe: "Arbeitsfähig",    status: "matching",   node: "Berlin" },
  { bedarf: "Palliativbegleitung",   zustand: "Final Chapter",       teilhabe: "Familie benach.", status: "completed",  node: "Detmold" },
  { bedarf: "Assistenz täglich",     zustand: "Mobilitätsbehinderung", teilhabe: "Berufstätig",   status: "active",     node: "München" },
  { bedarf: "Krisenunterstützung",   zustand: "Akute Krise",         teilhabe: "Stabil",           status: "completed",  node: "Hamburg" },
];

const STATUS_COLORS: Record<string, string> = {
  matching:  "#f59e0b",
  completed: "#4caf7d",
  active:    "#00bcd4",
};

const CONV_STEPS = [
  { label: "Behörde meldet Bedarf",  icon: "🏛️", color: "#7c3aed" },
  { label: "Silent Support aktiv",   icon: "🔇", color: "#d4af37" },
  { label: "Stigma-Shield greift",   icon: "🛡️", color: "#00bcd4" },
  { label: "Betroffener: 'Neue Möglichkeit'", icon: "✦", color: "#4caf7d" },
];

export default function InclusionPage() {
  const [activeBeh, setActiveBeh] = useState<string | null>(null);
  const [intention, setIntention] = useState("");
  const [sent, setSent] = useState<Record<string, boolean>>({});

  const aktiv = BEHOERDEN.find((b) => b.key === activeBeh);

  return (
    <main className="min-h-screen bg-sacred px-4 py-10">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <header className="text-center mb-12">
          <p className="font-ceremonial opacity-25 mb-1" style={{ fontSize: "0.5rem", letterSpacing: "5px" }}>
            ADMIN · STIGMA-SHIELD MODUL
          </p>
          <h1 className="font-ceremonial text-gold glow-gold" style={{ fontSize: "clamp(1.3rem,4vw,2rem)" }}>
            Silent Inclusion Dashboard
          </h1>
          <p className="font-ceremonial opacity-40 mt-2" style={{ fontSize: "0.6rem", letterSpacing: "2px" }}>
            WEG VON DER AKTE — HIN ZUM SCHICKSAL
          </p>
          <p className="font-quote mt-3 opacity-50" style={{ fontSize: "0.9rem", lineHeight: 1.8, maxWidth: "520px", margin: "0.75rem auto 0" }}>
            Behörden speisen ihre Kapazitäten still ins System ein.
            Der Betroffene sieht nie eine Akte — nur eine neue Möglichkeit.
            Das ist Würde als Systemdesign.
          </p>
        </header>

        {/* CONVERGENCE-ENGINE VISUAL */}
        <section className="mb-10">
          <p className="font-ceremonial opacity-35 mb-4 text-center" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            CONVERGENCE ENGINE — STIGMA-FREIER FLOW
          </p>
          <div className="grid grid-cols-4 gap-0">
            {CONV_STEPS.map((s, i) => (
              <div key={s.label} className="p-4 text-center" style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRight: i < 3 ? "none" : undefined,
                borderTop: `2px solid ${s.color}`,
              }}>
                <div style={{ fontSize: "1.2rem", marginBottom: "0.4rem" }}>{s.icon}</div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", opacity: 0.55, lineHeight: 1.5, color: s.color }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BEHÖRDEN-INTENTIONS-MATRIX */}
        <section className="mb-10">
          <p className="font-ceremonial opacity-35 mb-4" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            BEHÖRDEN-INTENTIONS-MATRIX — INTENTION EINPFLEGEN
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
            {BEHOERDEN.map((b) => (
              <button key={b.key} onClick={() => { setActiveBeh(b.key); setIntention(""); }}
                className="p-4 text-left transition-all"
                style={{
                  background: activeBeh === b.key ? `${b.color}10` : "rgba(255,255,255,0.02)",
                  border: `1px solid ${activeBeh === b.key ? b.color + "50" : "rgba(255,255,255,0.06)"}`,
                  borderLeft: `3px solid ${b.color}`,
                }}>
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ fontSize: "1.2rem" }}>{b.icon}</span>
                  <div>
                    <span className="font-ceremonial" style={{ fontSize: "0.55rem", letterSpacing: "1px", color: b.color }}>{b.name}</span>
                    <span className="font-ceremonial ml-2 opacity-40" style={{ fontSize: "0.4rem", border: `1px solid ${b.color}30`, padding: "1px 5px", color: b.color }}>{b.code}</span>
                  </div>
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", opacity: 0.5, lineHeight: 1.5 }}>{b.desc}</p>
                <p className="font-ceremonial mt-2" style={{ fontSize: "0.45rem", letterSpacing: "1px", color: b.color, opacity: 0.7 }}>
                  OUTPUT: {b.output}
                </p>
              </button>
            ))}
          </div>

          {/* INTENTIONS-EINGABE */}
          {activeBeh && !sent[activeBeh] && (
            <div className="p-5 space-y-4" style={{
              background: `${aktiv?.color}05`,
              border: `1px solid ${aktiv?.color}25`,
            }}>
              <p className="font-ceremonial opacity-40" style={{ fontSize: "0.5rem", letterSpacing: "2px" }}>
                INTENTION EINPFLEGEN — {aktiv?.name.toUpperCase()} → {aktiv?.code}
              </p>
              <textarea className="input-sacred w-full resize-none" rows={3}
                placeholder={`Beschreibe den Bedarf — anonymisiert, stigma-frei… z.B. "3 Wohneinheiten in Berlin-Mitte verfügbar"`}
                value={intention} onChange={(e) => setIntention(e.target.value)}
                style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }} />
              <div className="flex items-center justify-between flex-wrap gap-3">
                <p className="font-ceremonial opacity-20" style={{ fontSize: "0.45rem", letterSpacing: "1px" }}>
                  🔒 STIGMA-SHIELD AKTIV · BETROFFENER SIEHT NUR "NEUE MÖGLICHKEIT"
                </p>
                <button className="btn-gold" disabled={!intention.trim()}
                  onClick={() => intention.trim() && setSent((p) => ({ ...p, [activeBeh]: true }))}
                  style={{ opacity: intention.trim() ? 1 : 0.3 }}>
                  Intention einspeisen →
                </button>
              </div>
            </div>
          )}
          {activeBeh && sent[activeBeh] && (
            <div className="p-4 text-center" style={{ background: "rgba(76,175,125,0.06)", border: "1px solid rgba(76,175,125,0.25)" }}>
              <p className="font-ceremonial" style={{ fontSize: "0.55rem", letterSpacing: "2px", color: "#4caf7d" }}>
                ✓ INTENTION VERGOLDET — CONVERGENCE ENGINE AKTIV — STIGMA-SCHILD AKTIV
              </p>
              <button className="btn-ghost mt-3" style={{ fontSize: "0.6rem" }}
                onClick={() => { setSent((p) => ({ ...p, [activeBeh!]: false })); setIntention(""); }}>
                Weitere Intention einpflegen
              </button>
            </div>
          )}
        </section>

        {/* AKTIVE INKLUSIONS-CASES */}
        <section className="mb-10">
          <p className="font-ceremonial opacity-35 mb-4" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            AKTIVE INKLUSIONS-CASES — ANONYMISIERT
          </p>
          <div className="overflow-x-auto">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(212,175,55,0.15)" }}>
                  {["Bedarf", "Situation", "Teilhabe", "Node", "Status"].map((h) => (
                    <th key={h} className="font-ceremonial" style={{ fontSize: "0.45rem", letterSpacing: "1px", padding: "8px 10px", textAlign: "left", opacity: 0.4 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CASES.map((c) => (
                  <tr key={c.bedarf} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", padding: "10px", opacity: 0.75 }}>{c.bedarf}</td>
                    <td style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", padding: "10px", opacity: 0.5 }}>{c.zustand}</td>
                    <td style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", padding: "10px", opacity: 0.5 }}>{c.teilhabe}</td>
                    <td className="font-ceremonial" style={{ fontSize: "0.5rem", padding: "10px", color: "#d4af37", opacity: 0.6 }}>{c.node}</td>
                    <td style={{ padding: "10px" }}>
                      <span className="font-ceremonial" style={{
                        fontSize: "0.45rem", letterSpacing: "1px",
                        color: STATUS_COLORS[c.status],
                        border: `1px solid ${STATUS_COLORS[c.status]}40`,
                        padding: "2px 6px",
                      }}>
                        {c.status === "completed" ? "ERFÜLLT" : c.status === "matching" ? "MATCHING" : "AKTIV"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* DIGNITY LEVEL WIDGET */}
        <section className="mb-10 p-5" style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.2)" }}>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <div style={{ width: 90, height: 90, borderRadius: "50%", border: "3px solid rgba(212,175,55,0.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(212,175,55,0.1)", animation: "pulse 3s infinite ease-in-out" }}>
              <span className="font-ceremonial text-gold" style={{ fontSize: "1.1rem" }}>94.2%</span>
              <span className="font-ceremonial opacity-35" style={{ fontSize: "0.35rem", letterSpacing: "1px" }}>WÜRDE</span>
            </div>
            <div>
              <p className="font-ceremonial text-gold mb-1" style={{ fontSize: "0.6rem", letterSpacing: "2px" }}>DIGNITY LEVEL — GLOBAL</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", opacity: 0.55, lineHeight: 1.6, maxWidth: 350 }}>
                Steigt mit jeder scham-freien Beheimatung.
                Jede eingespeiste Intention, die ohne Stigma ankommt,
                erhöht den globalen Würde-Index um 0.01%.
              </p>
            </div>
          </div>
        </section>

        {/* ALLIANZ-ZERTIFIKAT INSTITUTIONEN */}
        <section className="mb-10">
          <p className="font-ceremonial opacity-35 mb-3" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            GOLD-STANDARD INSTITUTIONEN — ALLIANZ-ZERTIFIZIERT
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { name: "Hospiz am Teutoburger Wald", color: "#d4af37" },
              { name: "Streetwork Berlin Mitte",     color: "#d4af37" },
              { name: "Caritas International",       color: "#4caf7d" },
              { name: "AWO Bundesverband",            color: "#4caf7d" },
            ].map((inst) => (
              <div key={inst.name} className="flex items-center gap-3 p-3" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${inst.color}20` }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: inst.color, boxShadow: `0 0 6px ${inst.color}`, flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", opacity: 0.65 }}>{inst.name}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="font-ceremonial opacity-20" style={{ fontSize: "0.45rem", letterSpacing: "1px" }}>
            ✦ STIGMA-SHIELD · ZERO-KNOWLEDGE · WÜRDE-GARANTIE ✦
          </div>
          <Link href="/admin" className="font-ceremonial opacity-30 hover:opacity-60 transition-opacity" style={{ fontSize: "0.6rem", letterSpacing: "2px" }}>
            ← Admin Dashboard
          </Link>
        </div>

      </div>
    </main>
  );
}
