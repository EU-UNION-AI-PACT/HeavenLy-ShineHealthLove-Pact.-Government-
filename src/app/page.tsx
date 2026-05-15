"use client";

import { useState } from "react";
import Link from "next/link";
import PassageGrid from "@/components/landing/PassageGrid";
import AllianceBar from "@/components/landing/AllianceBar";
import CalendarWidget from "@/components/landing/CalendarWidget";
import ScrollReveal from "@/components/effects/ScrollReveal";
import PillarCard from "@/components/landing/PillarCard";
import LayerScroll from "@/components/effects/LayerScroll";

const PILLARS = [
  { icon: "🌍", title: "Erde & Biosphäre",  desc: "Die Integrität der natürlichen Systeme ist Voraussetzung menschlicher Würde. Jede Intention zum Schutz der Biosphäre wird in den globalen Regenerationskreislauf der Allianz aufgenommen.", color: "#4caf7d", freq: "396 Hz" },
  { icon: "✦",  title: "Gemeinschaft",      desc: "Kein Mensch darf strukturell unsichtbar sein. Obdachlose, Pilger, Senioren und Kinder sind gleichwertige Knotenpunkte im kollektiven Gedächtnis der Völkergemeinschaft.", color: "#d4af37", freq: "432 Hz" },
  { icon: "◈",  title: "Gerechtigkeit",     desc: "Im Einklang mit Artikel 18 der Allgemeinen Erklärung der Menschenrechte werden alle Glaubensrichtungen gleichwertig aufgenommen. Die Infrastruktur bewertet nicht den Glauben — sie bewahrt die Würde.", color: "#00bcd4", freq: "528 Hz" },
  { icon: "⬡",  title: "System & Zukunft", desc: "Eine ethische Infrastruktur ohne Profitinteressen, ohne Korruption und ohne Überwachung. Ein digitales Gemeingut, das kommenden Generationen unverfälscht übergeben wird.", color: "#7c3aed", freq: "639 Hz" },
];

const FOOTER_LINKS = [
  { href: "/portal",                  label: "Pilger-Portal" },
  { href: "/portal/guardian",         label: "Eltern-Passage" },
  { href: "/portal/wishes",           label: "Wünsche" },
  { href: "/portal/furbitte",         label: "Fürbitte" },
  { href: "/portal/wunschbrunnen",    label: "Wunschbrunnen 🌊" },
  { href: "/portal/splitscreen",      label: "Cosmic Split ⬡" },
  { href: "/shinehealthcare",         label: "ShineHealthCare" },
  { href: "/portal/charta",           label: "Charta" },
  { href: "/portal/stories",          label: "Archiv" },
  { href: "/system",                  label: "System-Karte" },
  { href: "/admin",                   label: "Admin" },
  { href: "/login",                   label: "Anmelden" },
];

export default function HomePage() {
  const [showLayers, setShowLayers] = useState(true);
  const [fading, setFading] = useState(false);

  function handleLayerExit() {
    setFading(true);
    setTimeout(() => {
      setShowLayers(false);
      setFading(false);
    }, 600);
  }

  return (
    <>
      {/* ── Layer Scroll Intro ── */}
      {showLayers && (
        <div style={{
          opacity: fading ? 0 : 1,
          transition: "opacity 0.6s ease",
        }}>
          <LayerScroll onExit={handleLayerExit} />
        </div>
      )}

    <main
      style={{
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
        opacity: showLayers ? 0 : 1,
        transition: "opacity 0.5s ease",
      }}
    >

      {/* ─── LAYER 1: hero atmospheric glow ─── */}
      <div
        className="hero-overlay"
        style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }}
      />

      {/* ─── LAYER 2: floating orbs ─── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }}>
        <div className="orb" style={{
          position: "absolute", top: "15%", left: "8%",
          width: "320px", height: "320px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)",
        }} />
        <div className="orb-2" style={{
          position: "absolute", top: "55%", right: "6%",
          width: "260px", height: "260px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,188,212,0.05) 0%, transparent 70%)",
        }} />
        <div className="orb" style={{
          position: "absolute", bottom: "10%", left: "30%",
          width: "200px", height: "200px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(230,126,34,0.04) 0%, transparent 70%)",
          animationDelay: "-8s",
        }} />
      </div>

      {/* ─── CONTENT ─── */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem 6rem" }}>

        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <header style={{ textAlign: "center", paddingTop: "9rem", paddingBottom: "7rem" }}>
          <p className="font-ceremonial" style={{ fontSize: "0.55rem", letterSpacing: "0.5em", color: "#d4af37", opacity: 0.4, marginBottom: "2rem" }}>
            ✦ &nbsp; HEILIGES JAHR 2026 &nbsp; ✦
          </p>

          <h1
            className="text-shimmer animate-glory-pulse"
            style={{
              fontFamily: "var(--font-ceremonial)",
              fontSize: "clamp(2.2rem, 6.5vw, 4.5rem)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              lineHeight: 1.15,
              marginBottom: "1.8rem",
            }}
          >
            GloryaShine<br />
            <span style={{ fontSize: "0.55em", letterSpacing: "0.3em", opacity: 0.85 }}>der Pilger</span>
          </h1>

          <p style={{
            fontFamily: "var(--font-quote)",
            fontSize: "clamp(1.05rem, 2.2vw, 1.4rem)",
            fontStyle: "italic",
            color: "rgba(249,241,215,0.65)",
            maxWidth: "600px",
            margin: "0 auto 1rem",
            lineHeight: 1.6,
          }}>
            Gottes Heilender Pfad — Die Übergangsfrequenz der heiligen Passagen
          </p>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.92rem",
            color: "rgba(249,241,215,0.38)",
            marginBottom: "3.5rem",
            letterSpacing: "0.03em",
          }}>
            ShineHealthCare · Pilgerzentrum Detmold · Heiliges Jahr 2026
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <Link href="/portal" className="btn-gold" style={{ fontSize: "0.65rem", letterSpacing: "0.2em" }}>
              ✦ Zum Pilger-Portal
            </Link>
            <Link href="/portal/wishes" className="btn-ghost" style={{ fontSize: "0.65rem" }}>
              Wünsche einreichen
            </Link>
            <Link href="/login" className="btn-ghost" style={{ fontSize: "0.65rem" }}>
              Anmelden
            </Link>
          </div>

          {/* passage ornament line */}
          <div style={{ marginTop: "5rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.2))" }} />
            <span style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.45rem", letterSpacing: "4px", color: "rgba(212,175,55,0.3)" }}>DREI PASSAGEN · EIN HEILIGER PFAD · EIN ZEUGNIS</span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(212,175,55,0.2), transparent)" }} />
          </div>
        </header>

        {/* ══ CALENDAR WIDGET ═══════════════════════════════════════════════ */}
        <ScrollReveal direction="up" delay={0}>
          <CalendarWidget />
        </ScrollReveal>

        {/* ══ PASSAGE GRID ══════════════════════════════════════════════════ */}
        <ScrollReveal direction="up" delay={100}>
          <PassageGrid />
        </ScrollReveal>

        {/* ══ MANIFESTO QUOTE ═══════════════════════════════════════════════ */}
        <ScrollReveal direction="none" delay={0}>
          <section style={{
            textAlign: "center",
            margin: "5rem 0",
            padding: "3.5rem 2rem",
            border: "1px solid rgba(212,175,55,0.2)",
            borderLeft: "none", borderRight: "none",
            position: "relative",
          }}>
            {/* corner ornaments */}
            {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
              <span key={i} style={{
                position: "absolute",
                top: pos.includes("top") ? "-1px" : "auto",
                bottom: pos.includes("bottom") ? "-1px" : "auto",
                left: pos.includes("left") ? "0" : "auto",
                right: pos.includes("right") ? "0" : "auto",
                width: "20px", height: "20px",
                borderTop: pos.includes("top") ? "1px solid #d4af37" : "none",
                borderBottom: pos.includes("bottom") ? "1px solid #d4af37" : "none",
                borderLeft: pos.includes("left") ? "1px solid #d4af37" : "none",
                borderRight: pos.includes("right") ? "1px solid #d4af37" : "none",
              }} />
            ))}

            <blockquote style={{
              fontFamily: "var(--font-quote)",
              fontSize: "clamp(1.3rem, 3vw, 1.9rem)",
              fontStyle: "italic",
              color: "rgba(249,241,215,0.85)",
              lineHeight: 1.55,
              marginBottom: "1.5rem",
            }}>
              „GloryaShine ist kein Versprechen an die Zukunft —<br />
              es ist die Verpflichtung, die wir in diesem Moment bereits tragen."
            </blockquote>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", opacity: 0.6, maxWidth: "560px", margin: "0 auto" }}>
              Pilger der Hoffnung · Hoffnung der Pilger · Gottes Heilender Pfad —<br />
              drei Ausdrucksformen einer einzigen, unteilbaren Wahrheit.
            </p>
            <p className="font-ceremonial" style={{ fontSize: "0.55rem", letterSpacing: "2px", color: "var(--lion-amber)", opacity: 0.5, marginTop: "1.5rem" }}>
              Unter dem Siegel des Löwen — verwahrt in Würde und Verantwortung
            </p>
          </section>
        </ScrollReveal>

        {/* ══ 4 SÄULEN ══════════════════════════════════════════════════════ */}
        <ScrollReveal direction="up" delay={0}>
          <section style={{ marginBottom: "5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p className="font-ceremonial" style={{ fontSize: "0.55rem", letterSpacing: "5px", opacity: 0.3, marginBottom: "0.5rem" }}>
                4 SÄULEN DER WELT-WÜNSCHE
              </p>
              <h2 className="font-ceremonial" style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)", letterSpacing: "3px", color: "#d4af37" }}>
                Regenerative Heilung der Netze
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.25rem" }}>
              {PILLARS.map((p, i) => (
                <ScrollReveal key={p.title} direction="up" delay={i * 120}>
                  <PillarCard p={p} />
                </ScrollReveal>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <Link href="/portal/wishes" className="btn-ghost" style={{ fontSize: "0.62rem" }}>
                Wünsche & Intentions-Portal →
              </Link>
            </div>
          </section>
        </ScrollReveal>

        {/* ══ SHINEHEALTHCARE ═══════════════════════════════════════════════ */}
        <ScrollReveal direction="up" delay={0}>
          <section style={{ marginBottom: "5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <p className="font-ceremonial" style={{ fontSize: "0.55rem", letterSpacing: "5px", opacity: 0.3, marginBottom: "0.5rem" }}>
                SHINEHEALTHCARE — PRÄVENTIVE KULTURARCHITEKTUR DER MENSCHHEIT
              </p>
              <h2 className="font-ceremonial" style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)", letterSpacing: "3px", color: "#d4af37" }}>
                Bedeutung als strukturelle Verantwortung begreifen
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
              {[
                { icon: "🏛️", title: "Nie wieder vergessen",          desc: "Jede Intention, jede Warnung, jede Geschichte erhält einen dauerhaften, rechtlich gesicherten Platz im kollektiven Gedächtnis der Völkergemeinschaft.", color: "#d4af37" },
                { icon: "✦",  title: "Jede Stimme ist gleichwertig",  desc: "Obdachlose, Pilger, Kinder und Senioren sind keine Randnotizen — sie sind unverzichtbare Knotenpunkte im kollektiven Entscheidungsgefüge der Allianz.", color: "#4caf7d" },
                { icon: "◈",  title: "Interreligiöse Konvergenz",     desc: "Fürbitten und Intentionen aller Glaubensrichtungen werden gemäß Artikel 18 der Allgemeinen Erklärung der Menschenrechte gleichwertig aufgenommen und dauerhaft bewahrt.", color: "#00bcd4" },
                { icon: "⬡",  title: "Ethische Künstliche Intelligenz", desc: "Technologie dient als kulturunabhängiges, mehrsprachiges Sprachrohr — als Verstärker kollektiver menschlicher Relevanz, niemals als Instrument der Kontrolle.", color: "#7c3aed" },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    padding: "1.5rem",
                    background: "rgba(255,255,255,0.02)",
                    border: `1px solid ${item.color}22`,
                    borderLeft: `3px solid ${item.color}`,
                    transition: "background 0.3s",
                  }}
                >
                  <span style={{ fontSize: "1.3rem", flexShrink: 0, color: item.color }}>{item.icon}</span>
                  <div>
                    <div className="font-ceremonial" style={{ fontSize: "0.6rem", letterSpacing: "2px", color: item.color, marginBottom: "0.5rem" }}>{item.title}</div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", opacity: 0.6, lineHeight: 1.8 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <Link href="/shinehealthcare" className="btn-ghost" style={{ fontSize: "0.62rem" }}>
                Vollständiges Manifest →
              </Link>
            </div>
          </section>
        </ScrollReveal>

        {/* ══ ALLIANCE BAR ══════════════════════════════════════════════════ */}
        <ScrollReveal direction="up" delay={0}>
          <AllianceBar />
        </ScrollReveal>

        {/* ══ DSGVO STATEMENT ═══════════════════════════════════════════════ */}
        <ScrollReveal direction="up" delay={0}>
          <section style={{
            margin: "4rem 0",
            padding: "2rem",
            background: "rgba(255,255,255,0.015)",
            border: "1px solid rgba(76,175,125,0.2)",
            borderLeft: "3px solid #4caf7d",
            display: "flex",
            gap: "1.5rem",
            alignItems: "flex-start",
          }}>
            <span style={{ fontSize: "1.8rem", flexShrink: 0 }}>🛡️</span>
            <div>
              <div className="font-ceremonial" style={{ fontSize: "0.6rem", letterSpacing: "2px", color: "#4caf7d", marginBottom: "0.5rem" }}>
                DSGVO · EU-DATENHOHEIT · ZERO-KNOWLEDGE
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", opacity: 0.65, lineHeight: 1.8 }}>
                Dieses System verarbeitet ausschließlich freiwillig übermittelte, strukturelle Intentionen.
                Es bestehen keinerlei wirtschaftliche Interessen, Werbezwecke oder kommerzielle Verwertungsabsichten.
                Jede Person besitzt das unveräußerliche Recht auf vollständige Datenlöschung gemäß Art. 17 DSGVO.
                Die Würde des Menschen ist unantastbar — Technologie ist Dienstleister, niemals Herrscher.
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* ══ FOOTER ════════════════════════════════════════════════════════ */}
        <footer style={{ textAlign: "center", marginTop: "6rem", paddingTop: "3.5rem", borderTop: "1px solid rgba(212,175,55,0.1)" }}>
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "40px", height: "1px", background: "rgba(212,175,55,0.3)" }} />
              <span className="font-ceremonial" style={{ fontSize: "0.5rem", letterSpacing: "4px", color: "rgba(212,175,55,0.4)" }}>IN DIENST DES FRIEDENS — IM GEISTE DES LICHTS</span>
              <div style={{ width: "40px", height: "1px", background: "rgba(212,175,55,0.3)" }} />
            </div>
            <p className="font-ceremonial text-gold glow-gold" style={{ fontSize: "2rem", letterSpacing: "0.15em" }}>
              Daniel Pohl
            </p>
            <p style={{ fontFamily: "var(--font-body)", opacity: 0.45, fontSize: "0.9rem", marginTop: "0.5rem" }}>
              Initiator und Mitschöpfer des Pfades · Pilgerzentrum Detmold · Heiliges Jahr 2026
            </p>
          </div>

          <nav style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.25rem 1.5rem", marginBottom: "2.5rem" }}>
            {FOOTER_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-ceremonial"
                style={{
                  fontSize: "0.55rem",
                  letterSpacing: "1.5px",
                  color: "rgba(212,175,55,0.5)",
                  textDecoration: "none",
                  transition: "color 0.2s, opacity 0.2s",
                  padding: "0.2rem 0",
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            {[
              { dot: "#4caf7d", text: "DSGVO KONFORM" },
              { dot: "#00bcd4", text: "EU · UN VERIFIZIERT" },
              { dot: "#d4af37", text: "ZERO-KNOWLEDGE" },
              { dot: "#7c3aed", text: "ZERO PROFIT" },
            ].map((s) => (
              <div key={s.text} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: s.dot, boxShadow: `0 0 6px ${s.dot}` }} className="animate-orbit-pulse" />
                <span className="font-ceremonial" style={{ fontSize: "0.45rem", letterSpacing: "1.5px", color: "rgba(249,241,215,0.3)" }}>{s.text}</span>
              </div>
            ))}
          </div>

          <p className="font-ceremonial" style={{ fontSize: "0.45rem", letterSpacing: "1px", opacity: 0.2 }}>
            © 2026 GloryaShine — Heiliges Jubiläumsjahr · Gemeinnützig · Transparent · Unbestechlich
          </p>
        </footer>
      </div>
    </main>
    </>
  );
}
