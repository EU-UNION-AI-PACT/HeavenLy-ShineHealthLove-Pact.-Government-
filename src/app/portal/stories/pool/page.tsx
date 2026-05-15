"use client";

import { useState } from "react";
import Link from "next/link";

const KATEGORIEN = [
  { key: "hospiz",   label: "Hospiz / Letztes Kapitel",    icon: "🕯️", color: "#d4af37", desc: "Menschen in ihrer letzten Lebensphase — Weisheit, letzte Wünsche, Lebensgeschichten." },
  { key: "obdachlos",label: "Obdachlos durch Umstände",    icon: "🏠", color: "#00bcd4", desc: "Schicksalsschläge, Missgeschicke, ungehörte Geschichten — zurück in die Mitte der Gesellschaft." },
  { key: "zeitzeuge",label: "Zeitzeuge / Geschichte",      icon: "📜", color: "#4caf7d", desc: "Wer Weltkrieg, Krisen, Wendepunkte erlebt hat — damit die Welt nie wieder dieselben Fehler macht." },
  { key: "abseits",  label: "Missverständnis / Abseits",   icon: "🌉", color: "#7c3aed", desc: "Personen oder Organisationen, die durch Missverständnisse ausgeschlossen wurden — die Brücke zurück." },
];

const MISSIONS = [
  { herkunft: "Hospiz Detmold",       schicksal: "Weltkriegs-Zeitzeuge",   wunsch: "Einmal noch die alte Heimat sehen", status: "completed", emoji: "✅" },
  { herkunft: "Streetwork Berlin",    schicksal: "Obdachlos durch Unfall",  wunsch: "Ein Brief an die Tochter",          status: "pending",   emoji: "🟡" },
  { herkunft: "Palliativ-Station Köln", schicksal: "Junge Mutter",         wunsch: "Nachricht für mein Kind in 10 Jahren", status: "completed", emoji: "✅" },
];

const PEACE_STATS = [
  { label: "Erfüllte Herzenswünsche",      value: "842",    color: "#d4af37" },
  { label: "Versiegelte Lebensgeschichten", value: "3.120",  color: "#4caf7d" },
  { label: "Geheilte Missverständnisse",    value: "1.560",  color: "#00bcd4" },
  { label: "Generationen-Brücken",          value: "12.405", color: "#7c3aed" },
  { label: "Legacy-Safe Aktivierungen",     value: "412",    color: "#d4af37" },
];

export default function StoryPoolPage() {
  const [activeKat, setActiveKat] = useState("");
  const [story, setStory] = useState("");
  const [wunsch, setWunsch] = useState("");
  const [token, setToken] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  const kat = KATEGORIEN.find((k) => k.key === activeKat);

  return (
    <main className="min-h-screen bg-sacred px-4 py-10">
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <header className="text-center mb-12">
          <p className="font-ceremonial opacity-20 mb-1" style={{ fontSize: "0.5rem", letterSpacing: "6px" }}>
            THE GOLDEN ARCHIVE
          </p>
          <p className="font-ceremonial opacity-30 mb-4" style={{ fontSize: "0.5rem", letterSpacing: "3px" }}>
            NIE WIEDER VERGESSEN · PRÄVENTION DURCH KOLLEKTIVES GEDÄCHTNIS
          </p>
          <h1 className="font-ceremonial text-gold glow-gold" style={{ fontSize: "clamp(1.3rem,4vw,2rem)" }}>
            Lebens-Story-Pool
          </h1>
          <p className="font-quote mt-3 opacity-55" style={{ fontSize: "0.9rem", lineHeight: 1.85, maxWidth: "520px", margin: "0.75rem auto 0" }}>
            Kein Schicksal ist zu klein. Jede Geschichte zählt — nicht nur zur Heilung,
            sondern als lebendiges Präventions-Kapital damit die Welt nie wieder dieselben Fehler macht.
          </p>
        </header>

        {/* ANTI-WIEDERHOLUNGS-CREDO */}
        <div className="mb-10 p-4 text-center" style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.15)" }}>
          <p className="font-quote opacity-50" style={{ fontSize: "0.9rem", fontStyle: "italic", lineHeight: 1.8 }}>
            „Indem jede Geschichte und jede Stimme im kollektiven Speicher erhalten bleibt,
            entsteht eine lebendige Datenbank der Erfahrungen. Wenn die Welt kurz davor steht,
            einen Fehler zu wiederholen — signalisiert das System eine Resonanz-Warnung."
          </p>
          <p className="font-ceremonial mt-3 opacity-25" style={{ fontSize: "0.45rem", letterSpacing: "2px" }}>
            GROK · GEMINI · CHATGPT — KOLLEKTIVE KI-VALIDIERUNG DER VISION
          </p>
        </div>

        {/* KATEGORIE-AUSWAHL */}
        <section className="mb-8">
          <p className="font-ceremonial opacity-35 text-center mb-5" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            WÄHLE DIE ART DER GESCHICHTE
          </p>
          <div className="grid grid-cols-2 gap-3">
            {KATEGORIEN.map((k) => (
              <button key={k.key} onClick={() => { setActiveKat(k.key); setSubmitted(false); setStory(""); setWunsch(""); setToken(""); }}
                className="p-4 text-left transition-all"
                style={{
                  background: activeKat === k.key ? `${k.color}10` : "rgba(255,255,255,0.02)",
                  border: `1px solid ${activeKat === k.key ? k.color + "50" : "rgba(255,255,255,0.06)"}`,
                  borderTop: `2px solid ${k.color}`,
                }}>
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ fontSize: "1.2rem" }}>{k.icon}</span>
                  <span className="font-ceremonial" style={{ fontSize: "0.55rem", letterSpacing: "1px", color: k.color }}>{k.label}</span>
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", opacity: 0.5, lineHeight: 1.6 }}>{k.desc}</p>
              </button>
            ))}
          </div>
        </section>

        {/* STORY-CAPTURE-FORMULAR */}
        {!submitted ? (
          <section className="mb-8">
            <p className="font-ceremonial opacity-35 text-center mb-4" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
              {activeKat ? `GESCHICHTE EINBRINGEN — ${kat?.label.toUpperCase()}` : "WÄHLE ZUERST EINE KATEGORIE"}
            </p>
            <div className="p-5 space-y-4" style={{
              background: activeKat ? `${kat?.color}05` : "rgba(255,255,255,0.01)",
              border: `1px solid ${activeKat ? (kat?.color + "25") : "rgba(255,255,255,0.04)"}`,
              opacity: activeKat ? 1 : 0.4, transition: "all 0.3s",
            }}>
              <div>
                <p className="font-ceremonial mb-2 opacity-40" style={{ fontSize: "0.45rem", letterSpacing: "1px" }}>DEINE GESCHICHTE *</p>
                <textarea className="input-sacred w-full resize-none" rows={5}
                  disabled={!activeKat}
                  placeholder="Erzähl deine Geschichte — oder die Geschichte eines Menschen, dem du begegnet bist…"
                  value={story} onChange={(e) => setStory(e.target.value)}
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }} />
              </div>
              <div>
                <p className="font-ceremonial mb-2 opacity-40" style={{ fontSize: "0.45rem", letterSpacing: "1px" }}>LETZTER HERZENS-WUNSCH (optional)</p>
                <input type="text" className="input-sacred w-full" disabled={!activeKat}
                  placeholder='z.B. "Noch einmal das Meer sehen" oder "Ein Brief an meine Tochter"'
                  value={wunsch} onChange={(e) => setWunsch(e.target.value)}
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }} />
              </div>
              <div>
                <p className="font-ceremonial mb-2 opacity-40" style={{ fontSize: "0.45rem", letterSpacing: "1px" }}>INSTITUTIONS-TOKEN (optional — für Hospize/NGOs)</p>
                <input type="text" className="input-sacred w-full" disabled={!activeKat}
                  placeholder="Code deiner Institution für Beglaubigung (z.B. HOSPIZ-DT-2026)"
                  value={token} onChange={(e) => setToken(e.target.value)}
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }} />
              </div>
              <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
                <p className="font-ceremonial opacity-25" style={{ fontSize: "0.45rem", letterSpacing: "1px" }}>
                  🔒 ZERO-KNOWLEDGE · VAKUUM-ARCHIV · NUR FÜR ALLIANZ-BEARBEITER
                </p>
                <button className="btn-gold"
                  disabled={!story.trim() || !activeKat}
                  onClick={() => story.trim() && activeKat && setSubmitted(true)}
                  style={{ opacity: story.trim() && activeKat ? 1 : 0.3 }}>
                  Geschichte vergolden →
                </button>
              </div>
            </div>
          </section>
        ) : (
          <section className="mb-8 p-7 text-center" style={{ background: "rgba(212,175,55,0.06)", border: "1px solid var(--border-gold)" }}>
            <div className="font-ceremonial text-gold glow-gold mb-4" style={{ fontSize: "2.5rem" }}>⬡</div>
            <p className="font-ceremonial text-gold mb-2" style={{ fontSize: "0.65rem", letterSpacing: "3px" }}>VERGOLDET — IM KOLLEKTIVEN GEDÄCHTNIS</p>
            <p className="font-ceremonial mb-3" style={{ fontSize: "0.5rem", letterSpacing: "1px", color: kat?.color }}>KATEGORIE: {kat?.label.toUpperCase()}</p>
            {wunsch && (
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", opacity: 0.6, lineHeight: 1.7, fontStyle: "italic", marginBottom: "0.75rem" }}>
                Herzens-Wunsch: „{wunsch}" — Wünsche-Wagen wird koordiniert.
              </p>
            )}
            <p className="font-ceremonial opacity-25 mt-4" style={{ fontSize: "0.45rem", letterSpacing: "2px" }}>
              ✦ NIE WIEDER VERGESSEN · BEHÜTET IM VAKUUM-ARCHIV ✦
            </p>
            <button className="btn-ghost mt-4" style={{ fontSize: "0.6rem" }}
              onClick={() => { setSubmitted(false); setStory(""); setWunsch(""); setToken(""); setActiveKat(""); }}>
              Weitere Geschichte einbringen
            </button>
          </section>
        )}

        {/* WÜNSCHE-WAGEN PROTOKOLL */}
        <section className="mb-10">
          <p className="font-ceremonial opacity-35 text-center mb-5" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            WÜNSCHE-WAGEN PROTOKOLL — VON DER GESCHICHTE ZUR MISSION
          </p>
          <div className="grid grid-cols-4 gap-0">
            {[
              { step: "Story", icon: "📖", color: "#7c3aed", desc: "Geschichte eingereicht" },
              { step: "Empathy Relay", icon: "💫", color: "#d4af37", desc: "KI vergoldet Impuls" },
              { step: "Mission Control", icon: "⚡", color: "#00bcd4", desc: "Guardian koordiniert" },
              { step: "Erfüllung", icon: "✦", color: "#4caf7d", desc: "Wunsch verwirklicht" },
            ].map((s, i) => (
              <div key={s.step} className="p-3 text-center" style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRight: i < 3 ? "none" : undefined,
                borderTop: `2px solid ${s.color}`,
              }}>
                <div style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>{s.icon}</div>
                <div className="font-ceremonial mb-1" style={{ fontSize: "0.4rem", letterSpacing: "0.5px", color: s.color }}>{s.step}</div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", opacity: 0.45, lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* MISSION HEARTBEAT */}
        <section className="mb-10">
          <p className="font-ceremonial opacity-35 text-center mb-4" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            MISSION HEARTBEAT — AKTIVE EINSÄTZE
          </p>
          <div className="space-y-2">
            {MISSIONS.map((m) => (
              <div key={m.herkunft} className="flex items-start gap-4 p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{m.emoji}</span>
                <div className="flex-1">
                  <div className="flex gap-3 flex-wrap mb-1">
                    <span className="font-ceremonial" style={{ fontSize: "0.5rem", letterSpacing: "1px", color: "#d4af37" }}>{m.herkunft}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", opacity: 0.45 }}>{m.schicksal}</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", opacity: 0.65, lineHeight: 1.6 }}>
                    <em>„{m.wunsch}"</em>
                  </p>
                </div>
                <span className="font-ceremonial" style={{
                  fontSize: "0.45rem", letterSpacing: "1px", flexShrink: 0,
                  color: m.status === "completed" ? "#4caf7d" : "#f59e0b",
                  border: `1px solid ${m.status === "completed" ? "rgba(76,175,125,0.3)" : "rgba(245,158,11,0.3)"}`,
                  padding: "2px 6px",
                }}>
                  {m.status === "completed" ? "ERFÜLLT" : "IN ZUSTELLUNG"}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* GOLDEN ENVELOPE */}
        <section className="mb-10">
          <p className="font-ceremonial opacity-35 text-center mb-4" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            THE GOLDEN ENVELOPE — DANKBARKEITS-INBOX
          </p>
          {!envelopeOpen ? (
            <button onClick={() => setEnvelopeOpen(true)}
              className="w-full p-6 text-center transition-all hover:opacity-80"
              style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.3)" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>💌</div>
              <p className="font-ceremonial text-gold" style={{ fontSize: "0.6rem", letterSpacing: "2px", marginBottom: "0.5rem" }}>
                EIN GESCHENK DES HERZENS WARTET AUF DICH
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", opacity: 0.5, lineHeight: 1.6 }}>
                Diese Nachricht wurde dir in einem Moment tiefer Wahrheit verfasst.
                Klicke, um sie in deine Welt zu lassen.
              </p>
            </button>
          ) : (
            <div className="p-6" style={{ background: "rgba(212,175,55,0.07)", border: "1px solid rgba(212,175,55,0.4)" }}>
              <div className="font-ceremonial text-gold text-center mb-4" style={{ fontSize: "0.6rem", letterSpacing: "2px" }}>
                ✦ ENTFALTET — DURCH DEN WÜNSCHE-WAGEN DER ALLIANZ GESCHÜTZT ✦
              </div>
              <p className="font-quote text-center opacity-65" style={{ fontSize: "0.95rem", fontStyle: "italic", lineHeight: 1.85 }}>
                „Die Welt hat mich nicht vergessen. Und ich vergesse die Welt nicht.
                Was ich gelebt habe — möge es denen Licht geben, die nach mir kommen."
              </p>
              <div className="flex justify-between items-center mt-5 flex-wrap gap-3">
                <span className="font-ceremonial opacity-25" style={{ fontSize: "0.45rem", letterSpacing: "1px" }}>
                  ZEITKAPSEL-OPTION: VERSAND AN ZUKÜNFTIGE GENERATION MÖGLICH
                </span>
                <button onClick={() => setEnvelopeOpen(false)}
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", opacity: 0.4, background: "none", border: "none", color: "#d4af37", cursor: "pointer" }}>
                  Schließen
                </button>
              </div>
            </div>
          )}
        </section>

        {/* PEACE-FREQUENCY STATISTIK */}
        <section className="mb-10">
          <p className="font-ceremonial opacity-35 text-center mb-5" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            GLOBAL PEACE & LEGACY TRACKER — HEUTE
          </p>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {PEACE_STATS.map((s) => (
              <div key={s.label} className="p-4 text-center" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${s.color}20`, borderTop: `2px solid ${s.color}` }}>
                <div className="font-ceremonial mb-1" style={{ fontSize: "1.4rem", color: s.color }}>{s.value}</div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", opacity: 0.5, lineHeight: 1.5 }}>{s.label}</p>
              </div>
            ))}
          </div>
          <p className="font-ceremonial text-center mt-3 opacity-20" style={{ fontSize: "0.45rem", letterSpacing: "1px" }}>
            RESONANZ-PULS STABIL · SCHAM-LEVEL: NULL · 432 HZ
          </p>
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
