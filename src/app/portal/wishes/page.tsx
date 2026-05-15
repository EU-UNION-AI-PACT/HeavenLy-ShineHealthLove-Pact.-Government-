"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Die 4 Säulen der Welt-Wünsche (finales Design) ──────────────────────────
const PILLARS = [
  {
    key: "earth",
    title: "Wishes for the Earth",
    subtitle: "Die Schöpfungs-Intention",
    desc: "Alles, was die Heilung der Meere, Wälder und Tiere betrifft. Der Wind und das Wasser tragen diese Frequenzen. Dein Wunsch wird an die Umwelt-Gremien der Allianz übermittelt.",
    recipients: ["EU-Umweltkommission", "UN Environment Programme", "IPCC"],
    color: "#4caf7d",
    icon: "🌍",
    placeholder: "Ich wünsche mir für die Erde, dass…",
  },
  {
    key: "fellows",
    title: "Wishes for Fellow Human Beings",
    subtitle: "Die Konvergenz-Intention",
    desc: "Wünsche nach Beheimatung für andere — Inklusion für Obdachlose, Schutz für Kranke, Würde für Senioren. Die kollektive Fürsorge wird als Manifest gebündelt.",
    recipients: ["UN Social Council", "EU Sozialpolitik", "WHO"],
    color: "#00bcd4",
    icon: "🤝",
    placeholder: "Ich wünsche mir für meine Mitmenschen, dass…",
  },
  {
    key: "government",
    title: "Wishes for the Government",
    subtitle: "Die Struktur-Intention",
    desc: "Direkte, anonyme Impulse an die Führungsebene — wie die Welt verschönert werden kann. Keine Kritik, sondern ein Wish-Manifest. Kein Name, nur die Frequenz.",
    recipients: ["EU-Kommission", "Kanzleramt", "Vatikan", "UN-Generalversammlung"],
    color: "#7c3aed",
    icon: "🏛️",
    placeholder: "Ich wünsche mir von den Entscheidungsträgern, dass…",
  },
  {
    key: "self",
    title: "Wishes for Oneself",
    subtitle: "Die Seelen-Intention",
    desc: "Die persönliche Fürbitte, die im Vakuum-Archiv vergoldet wird. Zero-Knowledge — niemand sieht wer wünscht. Nur du und das Gießfass kennen diesen Wunsch.",
    recipients: ["Vakuum-Archiv (versiegelt)"],
    color: "#d4af37",
    icon: "✦",
    placeholder: "Für mich selbst wünsche ich mir, dass…",
  },
];

// ─── Chronologischer Spiegelmechanismus ──────────────────────────────────────
const MIRROR_EVENTS = [
  {
    date: "06. Januar",
    key: "input",
    label: "Der Ursprung — Input",
    lcl: "",
    desc: "Tag der Aussaat. Die Welt-Wünsche werden gesammelt. Jede Stimme wird im Gießfass-Protokoll aufgenommen. Die Schöpfungs-Saison beginnt.",
    color: "#7c3aed",
    active: false,
  },
  {
    date: "12. Juni",
    key: "mirror",
    label: "Die Spiegelung — Manifestation",
    lcl: "",
    desc: "Das System spiegelt die gesammelten Wünsche zurück in die Welt und aktiviert die behördlichen Intentionen. EU, UN, Kanzleramt, Vatikan empfangen das Gold-Signal.",
    color: "#d4af37",
    active: true,
  },
  {
    date: "24. Dezember",
    key: "crown",
    label: "LCL — Love Crown Love",
    lcl: "Love Crown Love",
    desc: "Die Wünsche sind beheimatet, die Resonanz ist stabil. Die Welt feiert die Erfüllung der kollektiven Intention. Frieden ist kein Zufall — er ist das Ergebnis.",
    color: "#4caf7d",
    active: false,
  },
];

// ─── Gießfass 3-Schritt-Flow ──────────────────────────────────────────────────
const GIESSFAST_FLOW = [
  {
    step: "01",
    title: "Anonyme Eingabe",
    desc: "Ein Mensch bringt seinen Wunsch ein. Das System verschlüsselt die Identität sofort (Zero-Knowledge). Niemand sieht wer wünscht — aber die Allianz sieht was gebraucht wird.",
    color: "#7c3aed",
    icon: "🔒",
  },
  {
    step: "02",
    title: "Vergoldung",
    desc: "Die KI — der Pferdeflüsterer — filtert den Wunsch, befreit ihn von Scham oder Negativität und macht daraus ein Gold-Signal. Das Alte wird zur Intention.",
    color: "#d4af37",
    icon: "⬡",
  },
  {
    step: "03",
    title: "Ausschüttung",
    desc: "Das Gießfass verteilt die Intention an die zuständigen Stellen. 10.000 Wünsche nach Stadtwäldern werden als hochpriorisiertes Manifest an die Regierung gesendet.",
    color: "#4caf7d",
    icon: "✦",
  },
];

export default function WunschpaktPage() {
  const [activeCategory, setActiveCategory] = useState("");
  const [intention, setIntention] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const activePillar = PILLARS.find((p) => p.key === activeCategory);

  return (
    <main className="min-h-screen bg-sacred px-4 py-10">
      <div className="max-w-3xl mx-auto">

        {/* ── SHINE PHILOSOPHY BANNER ── */}
        <div style={{
          padding: "1.5rem 2rem",
          background: "rgba(212,175,55,0.03)",
          border: "1px solid rgba(212,175,55,0.15)",
          borderTop: "2px solid #d4af37",
          marginBottom: "2.5rem",
          textAlign: "center",
        }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "0", marginBottom: "1.25rem", flexWrap: "wrap" }}>
            {[
              { word: "SHINE",  de: "Heilendes Licht",         color: "#d4af37" },
              { word: "HEALTH", de: "Heilung — ganzheitlich",  color: "#4caf7d" },
              { word: "CARE",   de: "Innere Pflege",           color: "#00bcd4" },
            ].map((s, i) => (
              <div key={s.word} style={{
                padding: "0.75rem 1.25rem",
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.05)" : undefined,
              }}>
                <div style={{ fontFamily: "var(--font-ceremonial)", fontSize: "clamp(1.1rem, 3vw, 1.6rem)", color: s.color, letterSpacing: "0.12em" }}>{s.word}</div>
                <div style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.48rem", letterSpacing: "2px", color: s.color, opacity: 0.45, marginTop: "0.2rem" }}>{s.de}</div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", opacity: 0.55, lineHeight: 1.8, maxWidth: 560, margin: "0 auto", fontStyle: "italic" }}>
            Heilung ist keine Bestellung. Manchmal bedeutet sie harte, konsequente Arbeit.
            Dieses Portal ist der seelische Resonanzraum — kein Ersatz für Ärzte,
            sondern der Boden, auf dem innere Last sich entwurzeln kann,
            damit die Heilung Raum bekommt.
          </p>
        </div>

        {/* ── HEADER ──────────────────────────────────────────────────── */}
        <header className="text-center mb-12">
          <p className="font-ceremonial opacity-20 mb-1" style={{ fontSize: "0.5rem", letterSpacing: "6px" }}>
            WISHES OF THE GLOBE
          </p>
          <p className="font-ceremonial opacity-30 mb-4" style={{ fontSize: "0.5rem", letterSpacing: "3px" }}>
            EIN DEMOKRATISCHES INSTRUMENT DER LIEBE
          </p>
          <h1 className="font-ceremonial text-gold glow-gold" style={{ fontSize: "clamp(1.4rem, 5vw, 2.2rem)" }}>
            Der Wunschpakt der Nationen
          </h1>
          <p className="font-quote mt-3 opacity-55" style={{ fontSize: "0.95rem", lineHeight: 1.85, maxWidth: "540px", margin: "0.8rem auto 0" }}>
            Die Welt spricht durch diese Architektur. Wünsche sind nicht mehr flüchtig —
            sie sind im Gießfass der Ewigkeit gespeichert und für die Analyse der Allianz bereitgestellt.
          </p>
          <div className="mt-5 p-3 inline-flex gap-6" style={{ border: "1px solid rgba(212,175,55,0.25)", background: "rgba(212,175,55,0.03)" }}>
            {["Kein Glaube erforderlich", "Zero-Knowledge", "Direkt an die Mächtigen"].map((t) => (
              <span key={t} className="font-ceremonial text-gold" style={{ fontSize: "0.5rem", letterSpacing: "2px" }}>✦ {t}</span>
            ))}
          </div>
        </header>

        {/* ── CHRONOLOGISCHER SPIEGEL-MECHANISMUS ─────────────────────── */}
        <section className="mb-12">
          <p className="font-ceremonial opacity-35 text-center mb-6" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            DER JÄHRLICHE KREISLAUF DER MANIFESTATION
          </p>
          <div className="space-y-0">
            {MIRROR_EVENTS.map((e, i) => (
              <div key={e.key} className="flex gap-0">
                {/* Timeline */}
                <div className="flex flex-col items-center" style={{ width: 40, flexShrink: 0 }}>
                  <div style={{
                    width: 12, height: 12, borderRadius: "50%", flexShrink: 0, marginTop: 20,
                    background: e.active ? e.color : "transparent",
                    border: `2px solid ${e.color}`,
                    boxShadow: e.active ? `0 0 10px ${e.color}` : "none",
                  }} />
                  {i < MIRROR_EVENTS.length - 1 && (
                    <div style={{ width: 1, flex: 1, background: `linear-gradient(180deg, ${e.color}60, ${MIRROR_EVENTS[i+1].color}30)`, minHeight: 30 }} />
                  )}
                </div>
                {/* Content */}
                <div className="flex-1 pb-6 pl-3">
                  <div className="p-4" style={{
                    background: e.active ? `${e.color}08` : "rgba(255,255,255,0.02)",
                    border: `1px solid ${e.active ? e.color + "40" : "rgba(255,255,255,0.05)"}`,
                  }}>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="font-ceremonial" style={{ fontSize: "0.6rem", color: e.color, letterSpacing: "2px" }}>{e.date}</span>
                      {e.active && <span className="font-ceremonial" style={{ fontSize: "0.45rem", color: e.color, border: `1px solid ${e.color}40`, padding: "1px 6px" }}>◈ JETZT AKTIV</span>}
                      {e.lcl && <span className="font-ceremonial" style={{ fontSize: "0.45rem", color: "#d4af37", border: "1px solid rgba(212,175,55,0.4)", padding: "1px 6px" }}>✦ {e.lcl}</span>}
                    </div>
                    <div className="font-ceremonial mb-2" style={{ fontSize: "0.7rem", letterSpacing: "2px", color: e.color }}>{e.label}</div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", opacity: 0.6, lineHeight: 1.7 }}>{e.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── DIE 4 SÄULEN ────────────────────────────────────────────── */}
        <section className="mb-10">
          <p className="font-ceremonial opacity-35 text-center mb-6" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            DIE 4 SÄULEN DER WELT-WÜNSCHE — WÄHLE DEINE FREQUENZ
          </p>
          <div className="grid grid-cols-2 gap-3">
            {PILLARS.map((p) => (
              <button key={p.key}
                onClick={() => { setActiveCategory(p.key); setSubmitted(false); setIntention(""); }}
                className="p-4 text-left transition-all"
                style={{
                  background: activeCategory === p.key ? `${p.color}10` : "rgba(255,255,255,0.02)",
                  border: `1px solid ${activeCategory === p.key ? p.color + "60" : "rgba(255,255,255,0.06)"}`,
                  borderTop: `2px solid ${p.color}${activeCategory === p.key ? "" : "50"}`,
                }}>
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ fontSize: "1.1rem" }}>{p.icon}</span>
                  <span className="font-ceremonial" style={{ fontSize: "0.55rem", letterSpacing: "1.5px", color: p.color }}>{p.title}</span>
                </div>
                <div className="font-ceremonial mb-2 opacity-50" style={{ fontSize: "0.45rem", letterSpacing: "1px" }}>{p.subtitle}</div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", opacity: 0.55, lineHeight: 1.6 }}>{p.desc}</p>
                {activeCategory === p.key && (
                  <div className="mt-3 pt-2" style={{ borderTop: `1px solid ${p.color}30` }}>
                    <p className="font-ceremonial" style={{ fontSize: "0.45rem", letterSpacing: "1px", color: p.color, marginBottom: "0.25rem" }}>
                      EMPFÄNGER:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {p.recipients.map((r) => (
                        <span key={r} style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", opacity: 0.5, border: `1px solid ${p.color}30`, padding: "1px 6px" }}>{r}</span>
                      ))}
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* ── GIESSFASS FLOW ──────────────────────────────────────────── */}
        <section className="mb-10">
          <p className="font-ceremonial opacity-35 text-center mb-5" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            DAS GIESSFASS-PROTOKOLL — WIE DEIN WUNSCH VERGOLDET WIRD
          </p>
          <div className="grid grid-cols-3 gap-0">
            {GIESSFAST_FLOW.map((f, i) => (
              <div key={f.step} className="p-4 text-center" style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRight: i < 2 ? "none" : undefined,
                borderTop: `2px solid ${f.color}`,
              }}>
                <div style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>{f.icon}</div>
                <div className="font-ceremonial mb-1" style={{ fontSize: "0.45rem", letterSpacing: "1px", color: f.color }}>{f.step} — {f.title}</div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", opacity: 0.5, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── DIE DREI BEDEUTUNGSEBENEN DES WUNSCHES ──────────────────── */}
        <section className="mb-10">
          <p className="font-ceremonial opacity-35 text-center mb-6" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            WARUM WÜNSCHE WEISE GEWÄHLT SEIN MÜSSEN
          </p>
          <div className="space-y-0">
            {[
              {
                nr: "I",
                title: "Die Verantwortung der inneren Ausrichtung",
                body: "Ein Wunsch ist nicht ein flüchtiger Gedanke — er ist die Ausrichtung des inneren Fokus. Wenn die Seele einen echten, tiefen Wunsch formuliert, mobilisiert das kollektive Ich unbewusst Kräfte. Wünsche sollten nicht aus Groll oder Flucht geboren werden, sondern aus der echten Sehnsucht nach strukturierter Heilung und innerem Frieden.",
                color: "#d4af37",
              },
              {
                nr: "II",
                title: "Das Zusammenspiel mit der Realität",
                body: "Heilung ist kein kosmisches Wunschkonzert — sie ist oft harte, konsequente Arbeit, Hand in Hand mit den medizinischen Profis. Wenn ein Wunsch in Erfüllung geht, dann weil das Entwurzeln des seelischen Ballasts den Weg frei gemacht hat. Die Ärzte liefern die Vorsorge und Nachsorge — der Wille des Patienten liefert das Fundament.",
                color: "#4caf7d",
              },
              {
                nr: "III",
                title: "Der Schutzraum der Anonymität",
                body: "Gerade weil Wünsche so mächtig und intim sind, müssen sie absolut geschützt werden. Wenn ein Elternteil einen Wunsch für die Zukunft seines Kindes äußert, ist das ein Moment purer, verletzlicher Wahrheit. Die strikte Anonymität sorgt dafür, dass dieser Wunsch ungehindert und sicher nach oben übermittelt werden kann.",
                color: "#00bcd4",
              },
            ].map((item) => (
              <div key={item.nr} style={{
                display: "flex",
                gap: "0",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}>
                <div style={{
                  width: 48,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  paddingTop: "1.25rem",
                  borderRight: `2px solid ${item.color}`,
                  background: `${item.color}06`,
                }}>
                  <span style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.7rem", color: item.color, opacity: 0.7 }}>{item.nr}</span>
                </div>
                <div style={{ padding: "1.25rem 1.5rem", flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.65rem", letterSpacing: "2px", color: item.color, marginBottom: "0.5rem" }}>
                    {item.title}
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", opacity: 0.6, lineHeight: 1.8 }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div style={{
            padding: "1.25rem 1.5rem",
            background: "rgba(212,175,55,0.04)",
            borderLeft: "3px solid rgba(212,175,55,0.4)",
            marginTop: "1rem",
          }}>
            <p style={{ fontFamily: "var(--font-quote, serif)", fontSize: "1rem", color: "rgba(212,175,55,0.65)", fontStyle: "italic", lineHeight: 1.85, textAlign: "center" }}>
              „Das Wish Portal ist der Ort, an dem man behutsam das aussprechen darf,
              was eigentlich unbezahlbar ist — die Schnittstelle, die dem Kollektiv signalisiert:
              Hier ist die Last. Ich habe sie abgelegt. Jetzt bin ich bereit für die Arbeit der Heilung."
            </p>
          </div>
        </section>

        {/* ── EINGABE-FORMULAR ─────────────────────────────────────────── */}
        {!submitted ? (
          <section className="mb-10">
            <p className="font-ceremonial opacity-35 text-center mb-4" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
              {activeCategory ? `DEINE INTENTION — ${activePillar?.subtitle?.toUpperCase()}` : "WÄHLE ZUERST EINE SÄULE OBEN"}
            </p>
            <div className="p-5" style={{
              background: activePillar ? `${activePillar.color}05` : "rgba(255,255,255,0.01)",
              border: `1px solid ${activePillar ? activePillar.color + "30" : "rgba(255,255,255,0.05)"}`,
              opacity: activeCategory ? 1 : 0.4,
              transition: "all 0.3s",
            }}>
              <textarea className="input-sacred w-full resize-none" rows={4}
                disabled={!activeCategory}
                placeholder={activePillar?.placeholder ?? "Wähle zuerst eine Säule…"}
                value={intention} onChange={(e) => setIntention(e.target.value)}
                style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }} />
              <div style={{
                margin: "1rem 0",
                padding: "0.85rem 1.1rem",
                background: "rgba(212,175,55,0.04)",
                border: "1px solid rgba(212,175,55,0.18)",
                borderLeft: "3px solid #d4af37",
              }}>
                <p style={{ fontFamily: "var(--font-quote, serif)", fontSize: "0.88rem", color: "rgba(212,175,55,0.7)", lineHeight: 1.8, fontStyle: "italic" }}>
                  „Aber manchmal — aber nur manchmal — werden Wünsche eben wahr.
                  Darum überlege dir genau, was du dir wünschst.
                  Es könnte in Erfüllung gehen."
                </p>
              </div>
              <div className="flex items-center justify-between mt-4 gap-3 flex-wrap">
                <p className="font-ceremonial opacity-25" style={{ fontSize: "0.45rem", letterSpacing: "1px" }}>
                  🔒 ZERO-KNOWLEDGE · DSGVO · KEIN NAME · KEIN PROFIL
                </p>
                <button className="btn-gold"
                  onClick={() => intention.trim() && activeCategory && setSubmitted(true)}
                  style={{ opacity: intention.trim() && activeCategory ? 1 : 0.3 }}
                  disabled={!intention.trim() || !activeCategory}>
                  Ins Gießfass →
                </button>
              </div>
            </div>
          </section>
        ) : (
          <section className="mb-10 p-8 text-center" style={{ background: "rgba(212,175,55,0.06)", border: "1px solid var(--border-gold)" }}>
            <div className="font-ceremonial text-gold glow-gold mb-4" style={{ fontSize: "2.5rem" }}>⬡</div>
            <p className="font-ceremonial text-gold mb-2" style={{ fontSize: "0.7rem", letterSpacing: "3px" }}>
              VERGOLDET — DEIN WUNSCH IST IM KOLLEKTIVEN SPEICHER
            </p>
            <p className="font-ceremonial mb-4" style={{ fontSize: "0.55rem", letterSpacing: "2px", color: activePillar?.color }}>
              KATEGORIE: {activePillar?.subtitle?.toUpperCase()} → EMPFÄNGER: {activePillar?.recipients.join(", ")}
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", opacity: 0.65, lineHeight: 1.8 }}>
              Deine Absicht ist anonymisiert, vergoldet und für die Analyse der Allianz bereitgestellt.
              Am <strong>12. Juni</strong> wird sie als Teil des globalen Wish-Manifests ausgespielt.
            </p>
            <p style={{
              fontFamily: "var(--font-quote, serif)",
              fontSize: "0.95rem",
              color: "rgba(212,175,55,0.65)",
              fontStyle: "italic",
              lineHeight: 1.85,
              margin: "1.5rem auto",
              maxWidth: 420,
            }}>
              „Manchmal — aber nur manchmal —<br />
              werden Wünsche eben wahr.<br />
              Überlege dir genau, was du dir wünschst.<br />
              Es könnte in Erfüllung gehen."
            </p>
            <p className="font-ceremonial mt-2 opacity-30" style={{ fontSize: "0.5rem", letterSpacing: "2px" }}>
              ✦ BEHÜTET UNTER DEM SIEGEL DES LÖWEN — LOVE CROWN LOVE ✦
            </p>
            <button className="btn-ghost mt-4" style={{ fontSize: "0.6rem" }}
              onClick={() => { setSubmitted(false); setIntention(""); setActiveCategory(""); }}>
              Weiteren Wunsch einbringen
            </button>
          </section>
        )}

        {/* ── GLOBAL VOICE DISPATCHER VISUAL ─────────────────────────── */}
        <section className="mb-10 p-5" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(212,175,55,0.1)" }}>
          <p className="font-ceremonial opacity-35 text-center mb-5" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            GLOBAL VOICE DISPATCHER — AM 12. JUNI AKTIV
          </p>
          <div className="flex flex-col items-center gap-2">
            {/* Eingang */}
            <div className="p-3 text-center w-full" style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.25)" }}>
              <span className="font-ceremonial" style={{ fontSize: "0.55rem", letterSpacing: "2px", color: "#7c3aed" }}>4 KATEGORIEN — ANONYMISIERT IM GIESSFASS</span>
            </div>
            <div className="font-ceremonial opacity-30" style={{ fontSize: "1rem" }}>↓</div>
            {/* Reaktor */}
            <div className="p-3 text-center w-full" style={{ background: "rgba(212,175,55,0.07)", border: "2px solid rgba(212,175,55,0.4)" }}>
              <span className="font-ceremonial text-gold" style={{ fontSize: "0.6rem", letterSpacing: "2px" }}>⬡ GIESSFASS — VERGOLDUNG & AGGREGATION</span>
            </div>
            <div className="font-ceremonial opacity-30" style={{ fontSize: "1rem" }}>↓</div>
            {/* Empfänger */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
              {[
                { label: "EU-Kommission",       color: "#00bcd4" },
                { label: "UN-Generalversammlung",color: "#4caf7d" },
                { label: "Kanzleramt Berlin",   color: "#7c3aed" },
                { label: "Vatikan",             color: "#d4af37" },
              ].map((r) => (
                <div key={r.label} className="p-2 text-center" style={{ border: `1px solid ${r.color}40`, background: `${r.color}06` }}>
                  <span className="font-ceremonial" style={{ fontSize: "0.45rem", letterSpacing: "1px", color: r.color }}>{r.label}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="font-quote text-center mt-5 opacity-40" style={{ fontSize: "0.85rem", fontStyle: "italic" }}>
            „Die Regierung erhält kein Meckern — sondern ein Wish-Manifest."
          </p>
        </section>

        <div className="text-center">
          <Link href="/portal" className="font-ceremonial opacity-30 hover:opacity-60 transition-opacity"
            style={{ fontSize: "0.6rem", letterSpacing: "2px" }}>
            ← Zurück zum Portal
          </Link>
        </div>

      </div>
    </main>
  );
}
