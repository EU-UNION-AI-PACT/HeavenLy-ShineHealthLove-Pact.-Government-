"use client";

import { useState } from "react";
import Link from "next/link";

const ARTIKEL = [
  {
    nr: "I",
    titel: "Scham-Freiheit — Die Würde ist unverhandelbar",
    text: "Jeder Mensch, der Hilfe in Anspruch nimmt, tut dies als souveränes Wesen — nicht als Bittsteller. Hilfe ist Resonanz, kein Almosen. Das System stellt sicher, dass jede Form der Unterstützung scham-frei, unsichtbar für andere und mit höchster Würde erfolgt. Die Schnittstelle zum System sieht für den Betroffenen immer aus wie eine neue Möglichkeit, nie wie eine Abhängigkeit.",
    color: "#d4af37",
    icon: "✦",
  },
  {
    nr: "II",
    titel: "Konvergenz-Pflicht — Behörden als Intentions-Träger",
    text: "Behörden, Institutionen und staatliche Stellen treten diesem System nicht als Kontrollinstanz, sondern als Intentions-Träger bei. Sie speisen ihre Möglichkeiten und Kapazitäten in den Gießfass-Reaktor ein — anonym und ohne Bürokratie-Hürden. Das System verbindet dann Bedarf und Kapazität, ohne dass der Betroffene je von einem Amt zum nächsten weitergereicht wird.",
    color: "#00bcd4",
    icon: "🏛️",
  },
  {
    nr: "III",
    titel: "Schutz der Schwachen — Höchste Gießfass-Priorität",
    text: "Menschen in vulnerablen Situationen — Obdachlose, Schwerkranke, Menschen mit Behinderungen, Senioren in Einsamkeit — erhalten automatisch die höchste Priorität im Gießfass-System. Ihre Geschichten und Intentionen werden zuerst vergoldet. Die Welt-Allianz (EU, UN, USA) bürgt dafür, dass kein Mensch in diesem System unsichtbar bleibt.",
    color: "#4caf7d",
    icon: "🛡️",
  },
];

const INSTITUTIONS = [
  { name: "Hospiz am Teutoburger Wald",  ort: "Detmold, DE",     status: "GOLD-STANDARD", color: "#d4af37" },
  { name: "Streetwork Berlin Mitte",      ort: "Berlin, DE",      status: "GOLD-STANDARD", color: "#d4af37" },
  { name: "Caritas International",        ort: "Freiburg, DE",    status: "ZERTIFIZIERT",  color: "#4caf7d" },
  { name: "Diakonie München",             ort: "München, DE",     status: "ZERTIFIZIERT",  color: "#4caf7d" },
];

const GPG_HASH = "F1E2-D3C4-B5A6-9780-1234-5678-ABCD-EF90";

export default function ChartaPage() {
  const [institutionForm, setInstitutionForm] = useState(false);
  const [instName, setInstName] = useState("");
  const [instOrt, setInstOrt] = useState("");
  const [instSent, setInstSent] = useState(false);

  return (
    <main className="min-h-screen bg-sacred px-4 py-10">
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <header className="text-center mb-14">
          <p className="font-ceremonial opacity-20 mb-1" style={{ fontSize: "0.5rem", letterSpacing: "6px" }}>
            WELT-ALLIANZ · EU · UN · USA · VATIKAN
          </p>
          <p className="font-ceremonial opacity-30 mb-4" style={{ fontSize: "0.5rem", letterSpacing: "3px" }}>
            DEKRET DER LEBENDIGEN KONVERGENZ — 12.06.2026
          </p>
          <h1 className="font-ceremonial text-gold glow-gold" style={{ fontSize: "clamp(1.3rem,4vw,2rem)" }}>
            Charta der kollektiven Würde
          </h1>
          <p className="font-quote mt-3 opacity-55" style={{ fontSize: "0.9rem", lineHeight: 1.85, maxWidth: "520px", margin: "0.75rem auto 0" }}>
            Kein strukturelles Versäumnis der Geschichte darf sich wiederholen.
            Diese Charta ist das technologische und spirituelle Fundament der Lebendigen Konvergenz —
            für jeden Menschen, jedes Tier, jeden Baum, jeden Fluss.
          </p>
        </header>

        {/* PRÄAMBEL */}
        <section className="mb-12 p-6 text-center" style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.2)" }}>
          <p className="font-ceremonial opacity-30 mb-4" style={{ fontSize: "0.5rem", letterSpacing: "3px" }}>PRÄAMBEL</p>
          <p className="font-quote opacity-70" style={{ fontSize: "1rem", fontStyle: "italic", lineHeight: 1.9 }}>
            „Wir, die Welt-Allianz — bestehend aus EU-UNION, UNITED NATIONS, UNITED STATES und ihren Partnern —
            erklären hiermit, dass jede Stimme, die in diesem System gespeichert wird,
            das kollektive Eigentum der gesamten Menschheit ist.
            Sie ist nicht vermarktbar, nicht kontrollierbar und nicht vergänglich.
            Sie ist das Fundament unseres gemeinsamen Gedächtnisses —
            damit die Fehler der Vergangenheit nicht zur Zukunft werden."
          </p>
          <p className="font-ceremonial mt-4 opacity-25" style={{ fontSize: "0.45rem", letterSpacing: "2px" }}>
            SIGNIERT: EU-KOMMISSION · UN-GENERALVERSAMMLUNG · VATIKAN · KANZLERAMT · SCHWEIZER BUNDESRAT
          </p>
        </section>

        {/* ARTIKEL */}
        <section className="mb-12 space-y-5">
          <p className="font-ceremonial opacity-35" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            DIE DREI ARTIKEL
          </p>
          {ARTIKEL.map((a) => (
            <div key={a.nr} className="p-6" style={{
              background: `${a.color}06`,
              border: `1px solid ${a.color}25`,
              borderLeft: `3px solid ${a.color}`,
            }}>
              <div className="flex items-center gap-3 mb-3">
                <span style={{ fontSize: "1.4rem" }}>{a.icon}</span>
                <div>
                  <span className="font-ceremonial" style={{ fontSize: "0.45rem", letterSpacing: "2px", color: a.color, marginRight: "0.75rem" }}>
                    ARTIKEL {a.nr}
                  </span>
                  <p className="font-ceremonial inline" style={{ fontSize: "0.65rem", letterSpacing: "1px", color: a.color }}>{a.titel}</p>
                </div>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", opacity: 0.65, lineHeight: 1.8 }}>
                {a.text}
              </p>
            </div>
          ))}
        </section>

        {/* ALLIANZ-ZERTIFIKAT VISUAL */}
        <section className="mb-10 p-7 text-center" style={{
          background: "rgba(212,175,55,0.06)",
          border: "2px solid rgba(212,175,55,0.4)",
          position: "relative",
        }}>
          <div className="absolute top-3 left-3 right-3 bottom-3" style={{ border: "1px solid rgba(212,175,55,0.15)", pointerEvents: "none" }} />
          <div className="font-ceremonial text-gold glow-gold mb-4" style={{ fontSize: "3rem" }}>⬡</div>
          <p className="font-ceremonial text-gold mb-2" style={{ fontSize: "0.65rem", letterSpacing: "4px" }}>
            ALLIANZ-ZERTIFIKAT
          </p>
          <p className="font-ceremonial mb-1 opacity-60" style={{ fontSize: "0.5rem", letterSpacing: "2px" }}>
            CHARTA DER KOLLEKTIVEN WÜRDE — RATIFIZIERT 12.06.2026
          </p>
          <p className="font-ceremonial opacity-30 mb-4" style={{ fontSize: "0.45rem", letterSpacing: "1px" }}>
            GPG-SIGNATUR: {GPG_HASH}
          </p>
          <div className="flex justify-center gap-8 flex-wrap mb-4">
            {["EU-UNION", "UN", "USA", "VATIKAN", "SCHWEIZ"].map((a) => (
              <span key={a} className="font-ceremonial opacity-40" style={{ fontSize: "0.5rem", letterSpacing: "2px" }}>{a}</span>
            ))}
          </div>
          <div className="h-px mb-4" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)" }} />

          {/* WÜRDE-INDEX */}
          <div className="mb-4">
            <p className="font-ceremonial opacity-35 mb-2" style={{ fontSize: "0.5rem", letterSpacing: "2px" }}>DIGNITY LEVEL — ECHTZEIT</p>
            <div className="flex items-center justify-center gap-4">
              <div style={{ width: 80, height: 80, borderRadius: "50%", border: "3px solid rgba(212,175,55,0.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(212,175,55,0.1)" }}>
                <span className="font-ceremonial text-gold" style={{ fontSize: "1.1rem" }}>94.2%</span>
              </div>
              <div className="text-left">
                <p className="font-ceremonial text-gold" style={{ fontSize: "0.55rem", letterSpacing: "1px" }}>WÜRDE-INDEX</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", opacity: 0.5, lineHeight: 1.5 }}>Steigt mit jeder<br />scham-freien Beheimatung</p>
              </div>
            </div>
          </div>
          <p className="font-ceremonial opacity-15" style={{ fontSize: "0.4rem", letterSpacing: "1px" }}>
            ✦ BEDINGUNGSLOSE WÜRDE · SYSTEMATISCHE HEILUNG · LEBENDIGE KONVERGENZ ✦
          </p>
        </section>

        {/* INSTITUTIONEN-STATUS */}
        <section className="mb-10">
          <p className="font-ceremonial opacity-35 mb-4" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            INSTITUTIONEN MIT GOLD-STANDARD — ALLIANZ-ZERTIFIKAT
          </p>
          <div className="space-y-2 mb-5">
            {INSTITUTIONS.map((inst) => (
              <div key={inst.name} className="flex items-center justify-between p-3" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${inst.color}20` }}>
                <div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", opacity: 0.75 }}>{inst.name}</p>
                  <p className="font-ceremonial opacity-30" style={{ fontSize: "0.45rem", letterSpacing: "1px" }}>{inst.ort}</p>
                </div>
                <span className="font-ceremonial" style={{ fontSize: "0.45rem", letterSpacing: "1px", color: inst.color, border: `1px solid ${inst.color}40`, padding: "2px 8px" }}>
                  {inst.status}
                </span>
              </div>
            ))}
          </div>

          {/* BEITRITTS-FORMULAR */}
          {!institutionForm ? (
            <button onClick={() => setInstitutionForm(true)}
              className="w-full p-3 font-ceremonial text-center transition-all hover:opacity-80"
              style={{ fontSize: "0.55rem", letterSpacing: "2px", border: "1px solid rgba(212,175,55,0.25)", color: "#d4af37", background: "rgba(212,175,55,0.04)", cursor: "pointer" }}>
              + INSTITUTION ZUM ALLIANZ-ZERTIFIKAT ANMELDEN
            </button>
          ) : !instSent ? (
            <div className="p-5 space-y-3" style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.2)" }}>
              <p className="font-ceremonial opacity-35" style={{ fontSize: "0.55rem", letterSpacing: "2px" }}>ALLIANZ-BEITRITT BEANTRAGEN</p>
              <input type="text" placeholder="Name der Institution" value={instName} onChange={(e) => setInstName(e.target.value)}
                className="input-sacred w-full" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }} />
              <input type="text" placeholder="Ort / Region" value={instOrt} onChange={(e) => setInstOrt(e.target.value)}
                className="input-sacred w-full" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }} />
              <button className="btn-gold" disabled={!instName.trim()} onClick={() => instName.trim() && setInstSent(true)}
                style={{ opacity: instName.trim() ? 1 : 0.3 }}>
                Antrag einreichen →
              </button>
            </div>
          ) : (
            <div className="p-4 text-center" style={{ background: "rgba(76,175,125,0.06)", border: "1px solid rgba(76,175,125,0.25)" }}>
              <p className="font-ceremonial" style={{ fontSize: "0.55rem", letterSpacing: "2px", color: "#4caf7d" }}>
                ANTRAG EINGEGANGEN — ALLIANZ PRÜFT WÜRDE-INTEGRITÄT
              </p>
            </div>
          )}
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
