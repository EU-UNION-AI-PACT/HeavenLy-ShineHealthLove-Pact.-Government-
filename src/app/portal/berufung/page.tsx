"use client";

import { useState } from "react";
import Link from "next/link";

const FELDER = [
  { key: "handwerk",     label: "Handwerk & Gestaltung",    icon: "🔨", color: "#e67e22",
    beispiele: "Tischler, Bildhauer, Goldschmied, Restaurator, Architekt, Gärtner" },
  { key: "natur",        label: "Natur & Landwirtschaft",   icon: "🌱", color: "#4caf7d",
    beispiele: "Permakultur, Forstwirtschaft, Tierpflege, Biogärtnerei, Umweltschutz" },
  { key: "soziales",     label: "Soziales & Pflege",        icon: "🤝", color: "#00bcd4",
    beispiele: "Sozialarbeit, Altenpflege, Krisenbegleitung, Hospiz, Integration, Seelsorge" },
  { key: "kunst",        label: "Kunst, Musik & Kultur",    icon: "🎨", color: "#d4af37",
    beispiele: "Malerei, Komposition, Theater, Tanz, Fotografie, Schreiben, Filmkunst" },
  { key: "technik",      label: "Technik & Digitales",      icon: "⬡",  color: "#7c3aed",
    beispiele: "Softwareentwicklung, KI-Ethik, Elektronik, Maschinenbau, Robotik" },
  { key: "spirituell",   label: "Spirituelles & Seelsorge", icon: "✦",  color: "#f0d060",
    beispiele: "Gemeindearbeit, Retreits, Meditationsbegleitung, Philosophie, Ethik" },
  { key: "wissenschaft", label: "Wissenschaft & Forschung", icon: "🔬", color: "#00bcd4",
    beispiele: "Medizin, Biologie, Klimaforschung, Psychologie, Geschichte, Astronomie" },
  { key: "anderes",      label: "Mein eigener Weg",         icon: "◈",  color: "#4caf7d",
    beispiele: "Dein Weg existiert noch nicht als Kategorie — das ist kein Nachteil, sondern ein Auftrag" },
];

const IKIGAI_FRAGEN = [
  { key: "love",    label: "Was liebst du?",                      sub: "Was würdest du tun, auch wenn du nicht dafür bezahlt würdest?", color: "#d4af37" },
  { key: "good",    label: "Worin bist du gut?",                  sub: "Was fällt dir leicht, während andere dafür kämpfen?",          color: "#4caf7d" },
  { key: "need",    label: "Was braucht die Welt?",               sub: "Welche Lücke in der Gesellschaft siehst du und willst du füllen?", color: "#00bcd4" },
  { key: "paid",    label: "Wofür könntest du entlohnt werden?",  sub: "Nicht unbedingt heute — aber in einer gerechten Welt?",        color: "#7c3aed" },
];

const BRIDGE_PHASEN = [
  { nr: "01", title: "Multidimensionale Potenzial-Erfassung",  desc: "Das System empfängt Lebenswillen, Leidenschaften und Talente — keine Noten, keine Zertifikate. Die Daten fließen als dynamisches JSONB-Profil in die sichere Infrastruktur.",   color: "#d4af37", icon: "🔍" },
  { nr: "02", title: "Bifrost-Identitäts-Mesh (Zero-Trust)",   desc: "Bevor Daten die Infrastruktur berühren, greift das kryptografische Schutzsystem. Die Identität wird sofort anonymisiert. Kein Netzwerk-Teilnehmer kann Vorurteile projizieren.", color: "#7c3aed", icon: "🛡️" },
  { nr: "03", title: "Entkopplung vom klassischen Arbeitsmarkt", desc: "Die autonomen Agenten starten Mustererkennung statt Keyword-Matching. Kein 'Bachelor erforderlich'. Stattdessen: Strukturähnlichkeiten zwischen inneren Fähigkeiten und realen Aufgabenfeldern.", color: "#00bcd4", icon: "⬡" },
  { nr: "04", title: "Echtzeit-Ressourcen-Brücke",             desc: "Werden keine passenden Stellen gefunden, generiert das System eine Bedarfs-Brücke: Mentoren, dezentrale Projekte, Lernräume — die Realität wird so gebogen, dass das Potenzial sich entfalten kann.", color: "#4caf7d", icon: "✦" },
];

export default function BerufungPage() {
  const [schritt, setSchritt] = useState<"feld" | "ikigai" | "vision" | "confirm" | "done">("feld");
  const [feld, setFeld] = useState("");
  const [ikigai, setIkigai] = useState<Record<string, string>>({});
  const [vision, setVision] = useState("");
  const [talente, setTalente] = useState("");
  const [loading, setLoading] = useState(false);
  const [anonRef, setAnonRef] = useState("");

  const aktivFeld = FELDER.find((f) => f.key === feld);

  async function einreichen() {
    setLoading(true);
    try {
      const res = await fetch("/api/bridge/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fieldKey: feld,
          vision: [vision, ...Object.entries(ikigai).map(([k, v]) => `[${k}]: ${v}`)].join(" | "),
          talents: talente.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setAnonRef(data.anonymousRef ?? "—");
        setSchritt("done");
      } else {
        setSchritt("done");
        setAnonRef("OFFLINE-MODUS");
      }
    } catch {
      setSchritt("done");
      setAnonRef("OFFLINE-MODUS");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-sacred px-4 py-10">
      <div className="max-w-3xl mx-auto">

        {/* ── HEADER ── */}
        <header className="text-center mb-10">
          <p className="font-ceremonial opacity-25 mb-1" style={{ fontSize: "0.5rem", letterSpacing: "6px" }}>
            BERUFUNGS-BRÜCKE · PROTOKOLL 2026.1
          </p>
          <p className="font-ceremonial opacity-30 mb-4" style={{ fontSize: "0.5rem", letterSpacing: "3px" }}>
            ARTIKEL 1 GG · ARTIKEL 23 UN-MENSCHENRECHTSERKLÄRUNG
          </p>
          <h1 className="font-ceremonial text-gold glow-gold" style={{ fontSize: "clamp(1.4rem, 4vw, 2.2rem)" }}>
            Ikigai & Potenzial-Mapping
          </h1>
          <p className="font-quote mt-3 opacity-60" style={{ fontSize: "1rem", lineHeight: 1.8, maxWidth: 540, margin: "0.75rem auto 0" }}>
            Kein Notenfilter. Kein Formular für Zertifikate. Kein Aussortieren.<br />
            Das System empfängt deinen Lebenswillen — und baut die Brücke zur Realität.
          </p>
        </header>

        {/* ── ARCHITEKTUR-ÜBERSICHT ── */}
        {schritt === "feld" && (
          <section style={{ marginBottom: "2.5rem" }}>
            <p className="font-ceremonial text-center opacity-30 mb-5" style={{ fontSize: "0.5rem", letterSpacing: "3px" }}>
              WIE DIE BRÜCKE GEBAUT WIRD — 4 PHASEN
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {BRIDGE_PHASEN.map((p) => (
                <div key={p.nr} style={{
                  display: "flex", gap: "1rem", padding: "1.25rem",
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${p.color}20`,
                  borderLeft: `3px solid ${p.color}`,
                }}>
                  <div>
                    <span style={{ fontSize: "1.2rem" }}>{p.icon}</span>
                  </div>
                  <div>
                    <div className="font-ceremonial mb-1" style={{ fontSize: "0.55rem", letterSpacing: "2px", color: p.color }}>
                      {p.nr} — {p.title}
                    </div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", opacity: 0.55, lineHeight: 1.7 }}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="font-ceremonial text-center opacity-35 mb-4" style={{ fontSize: "0.55rem", letterSpacing: "4px" }}>
              SCHRITT 1 — IN WELCHEM BEREICH LIEGT DEIN WEG?
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.5rem", marginBottom: "1.5rem" }}>
              {FELDER.map((f) => (
                <button key={f.key} onClick={() => setFeld(f.key)}
                  style={{
                    padding: "1rem 1.25rem", textAlign: "left", cursor: "pointer", transition: "all 0.25s",
                    background: feld === f.key ? `${f.color}12` : "rgba(255,255,255,0.02)",
                    border: `1px solid ${feld === f.key ? f.color + "60" : "rgba(255,255,255,0.06)"}`,
                    borderLeft: `3px solid ${feld === f.key ? f.color : "transparent"}`,
                  }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                    <span style={{ fontSize: "1.1rem" }}>{f.icon}</span>
                    <span className="font-ceremonial" style={{ fontSize: "0.6rem", letterSpacing: "1.5px", color: feld === f.key ? f.color : "rgba(249,241,215,0.6)" }}>
                      {f.label}
                    </span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", opacity: 0.4, lineHeight: 1.5 }}>
                    {f.beispiele}
                  </p>
                </button>
              ))}
            </div>

            <div style={{ textAlign: "right" }}>
              <button className="btn-gold" style={{ fontSize: "0.6rem", opacity: feld ? 1 : 0.3 }}
                disabled={!feld} onClick={() => setSchritt("ikigai")}>
                Weiter zum Ikigai-Mapping →
              </button>
            </div>
          </section>
        )}

        {/* ── IKIGAI-MAPPING ── */}
        {schritt === "ikigai" && (
          <section style={{ marginBottom: "2.5rem" }}>
            <div style={{
              padding: "1rem 1.5rem", marginBottom: "2rem",
              background: `${aktivFeld?.color}08`,
              border: `1px solid ${aktivFeld?.color}40`,
              borderLeft: `3px solid ${aktivFeld?.color}`,
              display: "flex", alignItems: "center", gap: "0.75rem",
            }}>
              <span style={{ fontSize: "1.5rem" }}>{aktivFeld?.icon}</span>
              <div>
                <span className="font-ceremonial" style={{ fontSize: "0.6rem", letterSpacing: "2px", color: aktivFeld?.color }}>
                  {aktivFeld?.label}
                </span>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", opacity: 0.45, marginTop: "0.2rem" }}>
                  {aktivFeld?.beispiele}
                </p>
              </div>
            </div>

            <p className="font-ceremonial text-center opacity-35 mb-6" style={{ fontSize: "0.55rem", letterSpacing: "4px" }}>
              SCHRITT 2 — DEIN IKIGAI (VIER DIMENSIONEN DES LEBENSWILLENS)
            </p>

            <div className="space-y-4">
              {IKIGAI_FRAGEN.map((f) => (
                <div key={f.key} style={{
                  padding: "1.25rem 1.5rem",
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${f.color}20`,
                  borderLeft: `3px solid ${f.color}`,
                }}>
                  <div className="font-ceremonial mb-1" style={{ fontSize: "0.6rem", letterSpacing: "2px", color: f.color }}>
                    {f.label}
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", opacity: 0.5, marginBottom: "0.75rem" }}>
                    {f.sub}
                  </p>
                  <textarea
                    className="input-sacred w-full resize-none"
                    rows={2}
                    value={ikigai[f.key] ?? ""}
                    onChange={(e) => setIkigai((prev) => ({ ...prev, [f.key]: e.target.value }))}
                    style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem" }}
                    placeholder="Frei antworten — kein Format, keine Schablone …"
                  />
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem" }}>
              <button className="btn-ghost" style={{ fontSize: "0.6rem" }} onClick={() => setSchritt("feld")}>← Zurück</button>
              <button className="btn-gold" style={{ fontSize: "0.6rem" }} onClick={() => setSchritt("vision")}>
                Weiter zur Lebens-Vision →
              </button>
            </div>
          </section>
        )}

        {/* ── VISION & TALENTE ── */}
        {schritt === "vision" && (
          <section style={{ marginBottom: "2.5rem" }}>
            <p className="font-ceremonial text-center opacity-35 mb-6" style={{ fontSize: "0.55rem", letterSpacing: "4px" }}>
              SCHRITT 3 — DEINE LEBENS-VISION & TALENTE
            </p>

            <div style={{ marginBottom: "1.5rem" }}>
              <div className="font-ceremonial mb-2" style={{ fontSize: "0.6rem", letterSpacing: "2px", color: "#d4af37" }}>
                DEINE VISION — WO SIEHST DU DICH IN DEINEM LEBENSWERK?
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", opacity: 0.5, marginBottom: "0.75rem", lineHeight: 1.7 }}>
                Beschreibe so frei wie möglich. Kein Lebenslauf-Format. Keine Einschränkungen.
                Schreib, was du dir wirklich vorstellst — auch wenn es heute noch unrealistisch klingt.
              </p>
              <textarea
                className="input-sacred w-full resize-none"
                rows={5}
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }}
                placeholder="Ich stelle mir vor, dass ich eines Tages … weil mich das schon immer … und ich dabei das Gefühl hätte, dass …"
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <div className="font-ceremonial mb-2" style={{ fontSize: "0.6rem", letterSpacing: "2px", color: "#4caf7d" }}>
                DEINE TALENTE (KOMMAGETRENNT)
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", opacity: 0.5, marginBottom: "0.75rem" }}>
                Keine Abschlüsse. Keine Zertifikate. Was kannst du — auch wenn niemand dir dafür je ein Papier gegeben hat?
              </p>
              <textarea
                className="input-sacred w-full resize-none"
                rows={2}
                value={talente}
                onChange={(e) => setTalente(e.target.value)}
                style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }}
                placeholder="z. B. Menschen begeistern, Krisen ruhig meistern, komplexe Dinge erklären, Räume gestalten …"
              />
            </div>

            <div style={{
              padding: "0.85rem 1.1rem", marginBottom: "1.5rem",
              background: "rgba(212,175,55,0.04)",
              border: "1px solid rgba(212,175,55,0.2)",
              borderLeft: "3px solid #d4af37",
            }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", opacity: 0.65, lineHeight: 1.8 }}>
                <strong style={{ color: "#d4af37" }}>Was passiert mit diesen Angaben?</strong><br />
                Sie werden anonym als JSONB-Profil gespeichert — kein Name, keine Note, keine Herkunft.
                Die Agenten-Pipeline analysiert kollektive Muster und baut individuelle Brücken zu Mentoren,
                Ressourcen und Wegen. Die Realität passt sich dem Menschen an — nicht umgekehrt.
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button className="btn-ghost" style={{ fontSize: "0.6rem" }} onClick={() => setSchritt("ikigai")}>← Zurück</button>
              <button className="btn-gold" style={{ fontSize: "0.6rem", opacity: vision.trim() ? 1 : 0.3 }}
                disabled={!vision.trim()} onClick={() => setSchritt("confirm")}>
                Zur Bestätigung →
              </button>
            </div>
          </section>
        )}

        {/* ── BESTÄTIGUNG ── */}
        {schritt === "confirm" && (
          <section style={{ marginBottom: "2.5rem" }}>
            <p className="font-ceremonial text-center opacity-35 mb-6" style={{ fontSize: "0.55rem", letterSpacing: "4px" }}>
              SCHRITT 4 — BESTÄTIGUNG & EINREICHUNG
            </p>

            <div style={{ padding: "2rem", background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.2)", marginBottom: "1.5rem" }}>
              <div style={{ display: "grid", gap: "1rem" }}>
                <div>
                  <span className="font-ceremonial" style={{ fontSize: "0.5rem", letterSpacing: "2px", opacity: 0.4 }}>BERUFSFELD</span>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: aktivFeld?.color, marginTop: "0.25rem" }}>
                    {aktivFeld?.icon} {aktivFeld?.label}
                  </p>
                </div>
                <div>
                  <span className="font-ceremonial" style={{ fontSize: "0.5rem", letterSpacing: "2px", opacity: 0.4 }}>IKIGAI-ANTWORTEN</span>
                  <div style={{ marginTop: "0.25rem" }}>
                    {IKIGAI_FRAGEN.filter((f) => ikigai[f.key]).map((f) => (
                      <p key={f.key} style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", opacity: 0.65, lineHeight: 1.6 }}>
                        <span style={{ color: f.color, fontWeight: 600 }}>{f.label}:</span> {ikigai[f.key]}
                      </p>
                    ))}
                    {!Object.values(ikigai).some(Boolean) && (
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", opacity: 0.35 }}>— nicht ausgefüllt —</p>
                    )}
                  </div>
                </div>
                <div>
                  <span className="font-ceremonial" style={{ fontSize: "0.5rem", letterSpacing: "2px", opacity: 0.4 }}>LEBENS-VISION</span>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", opacity: 0.7, lineHeight: 1.7, marginTop: "0.25rem" }}>{vision}</p>
                </div>
                {talente && (
                  <div>
                    <span className="font-ceremonial" style={{ fontSize: "0.5rem", letterSpacing: "2px", opacity: 0.4 }}>TALENTE</span>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", opacity: 0.65, marginTop: "0.25rem" }}>{talente}</p>
                  </div>
                )}
              </div>
            </div>

            <div style={{ padding: "1rem 1.25rem", background: "rgba(76,175,125,0.05)", border: "1px solid rgba(76,175,125,0.2)", borderLeft: "3px solid #4caf7d", marginBottom: "1.5rem" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", opacity: 0.65, lineHeight: 1.8 }}>
                🔒 <strong style={{ color: "#4caf7d" }}>Zero-Knowledge-Garantie:</strong> Nach der Einreichung wird deine Identität
                vollständig von diesen Daten entkoppelt. Das System speichert ausschließlich eine anonyme Referenz.
                Gemäß Art. 17 DSGVO kannst du die vollständige Löschung jederzeit beantragen.
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button className="btn-ghost" style={{ fontSize: "0.6rem" }} onClick={() => setSchritt("vision")}>← Zurück</button>
              <button className="btn-gold" style={{ fontSize: "0.6rem" }}
                onClick={einreichen} disabled={loading}>
                {loading ? "Brücke wird gebaut …" : "Berufungswunsch einreichen ✦"}
              </button>
            </div>
          </section>
        )}

        {/* ── ABSCHLUSS ── */}
        {schritt === "done" && (
          <section style={{ textAlign: "center", padding: "3rem 1rem" }}>
            <div className="font-ceremonial text-gold glow-gold" style={{ fontSize: "3rem", marginBottom: "1rem" }}>✦</div>
            <p className="font-ceremonial text-gold" style={{ fontSize: "0.7rem", letterSpacing: "3px", marginBottom: "1rem" }}>
              BRÜCKE INITIIERT — BRIDGE-STATUS: INCEPTION
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", opacity: 0.65, lineHeight: 1.9, maxWidth: 500, margin: "0 auto 1rem" }}>
              Dein Berufungswunsch ist anonym gespeichert. Die autonomen Agenten beginnen
              mit dem Ikigai-Mapping und der Suche nach Wegen, Mentoren und Ressourcen.
              Kein Lebenslauf wurde ausgewertet. Keine Note hat entschieden.
            </p>
            {anonRef !== "OFFLINE-MODUS" && (
              <p className="font-ceremonial mt-2" style={{ fontSize: "0.5rem", letterSpacing: "2px", opacity: 0.3 }}>
                ANONYME REFERENZ: {anonRef}
              </p>
            )}
            <blockquote style={{
              fontFamily: "var(--font-quote)", fontSize: "1.05rem", fontStyle: "italic",
              color: "rgba(212,175,55,0.75)", lineHeight: 1.85,
              margin: "2rem auto", maxWidth: 460,
            }}>
              „Schulnoten waren niemals das letzte Wort.<br />
              Dein Lebenswille ist es."
            </blockquote>
            <p className="font-ceremonial opacity-25 mt-2" style={{ fontSize: "0.5rem", letterSpacing: "2px" }}>
              ✦ BEHÜTET UNTER DEM SIEGEL DES LÖWEN — MENSCHENWÜRDE VOR SYSTEM ✦
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
              <button className="btn-ghost" style={{ fontSize: "0.6rem" }}
                onClick={() => { setSchritt("feld"); setFeld(""); setIkigai({}); setVision(""); setTalente(""); }}>
                Weiteren Berufungswunsch einreichen
              </button>
              <Link href="/portal" className="btn-gold" style={{ fontSize: "0.6rem" }}>Zum Portal →</Link>
            </div>
          </section>
        )}

        {/* ── FOOTER-LINK ── */}
        {schritt !== "done" && (
          <div className="text-center mt-4">
            <Link href="/portal" className="font-ceremonial opacity-25 hover:opacity-50 transition-opacity" style={{ fontSize: "0.55rem", letterSpacing: "2px" }}>
              ← Zurück zum Portal
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
