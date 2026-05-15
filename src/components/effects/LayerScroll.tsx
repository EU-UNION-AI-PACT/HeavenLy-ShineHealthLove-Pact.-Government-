"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

interface Layer {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta?: { label: string; href: string };
  accentColor: string;
  bg: string;
}

const LAYERS: Layer[] = [
  {
    id: "intro-origin",
    eyebrow: "✦  HEILIGES JAHR 2026  ·  PILGER DER HOFFNUNG  ✦",
    title: "GloryaShine\nder Pilger",
    subtitle: "Ein Ort, an dem jede Stimme zählt. Jede Geschichte bewahrt wird. Und die Welt zum ersten Mal wirklich zuhört.",
    cta: { label: "Den Pfad betreten", href: "/portal" },
    accentColor: "#d4af37",
    bg: "radial-gradient(ellipse at 50% 35%, rgba(212,175,55,0.18) 0%, transparent 55%), radial-gradient(ellipse at 20% 85%, rgba(212,175,55,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 10%, rgba(0,188,212,0.07) 0%, transparent 45%), #06080e",
  },
  {
    id: "shinehealthcare-origin",
    eyebrow: "◈  SHINEHEALTHCARE — GLOBALE INFRASTRUKTUR",
    title: "Nie wieder\nvergessen",
    subtitle: "Die Völkergemeinschaft hat die Pflicht, strukturelle Versäumnisse nicht zu wiederholen. Dieses System macht es technologisch und rechtlich verbindlich, jede menschliche Stimme zu archivieren — unabhängig von Herkunft, Glaube oder gesellschaftlicher Stellung.",
    cta: { label: "Das System entdecken", href: "/shinehealthcare" },
    accentColor: "#4caf7d",
    bg: "radial-gradient(ellipse at 50% 0%, rgba(76,175,125,0.13) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(76,175,125,0.05) 0%, transparent 55%), #0a0c10",
  },
  {
    id: "koralitaet",
    eyebrow: "✦  KOLLEKTIVE KORALITÄT",
    title: "Jede Stimme\nformt den\nGesamtklang",
    subtitle: "Souveränität beginnt beim Individuum. Ob Pilger, Obdachloser, Kind oder Senior — jeder Mensch trägt als gleichwertiger Knotenpunkt zur kollektiven Entscheidungsbasis der Allianz bei. Unsichtbarkeit ist keine Option, die dieses System duldet.",
    cta: { label: "Wunsch einreichen", href: "/portal/wishes" },
    accentColor: "#d4af37",
    bg: "radial-gradient(ellipse at 30% 20%, rgba(212,175,55,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(212,175,55,0.05) 0%, transparent 55%), #0a0c10",
  },
  {
    id: "furbitte",
    eyebrow: "⬡  FÜRBITTE ALLER RELIGIONEN",
    title: "Das Sprachrohr\nder Welt",
    subtitle: "In Übereinstimmung mit Artikel 18 der Allgemeinen Erklärung der Menschenrechte werden Gebete, Intentionen und Fürbitten aller Glaubensrichtungen gleichwertig aufgenommen. Die Infrastruktur bewertet nicht den Glauben — sie bewahrt die Würde.",
    cta: { label: "Fürbitte einreichen", href: "/portal/furbitte" },
    accentColor: "#00bcd4",
    bg: "radial-gradient(ellipse at 70% 10%, rgba(0,188,212,0.12) 0%, transparent 60%), radial-gradient(ellipse at 30% 90%, rgba(0,188,212,0.05) 0%, transparent 55%), #0a0c10",
  },
  {
    id: "guardian",
    eyebrow: "♦  ELTERN-PASSAGE — KINDERSCHUTZ",
    title: "Das Kind\nunter dem\nSchutzmantel",
    subtitle: "Datenhoheit für Kinder bedeutet: Kein externes System berührt das Kind direkt. Jede Kommunikation, jede Bestätigung, jede Verbindung läuft ausschließlich über den erziehungsberechtigten Elternteil — technisch erzwungen, nicht nur als Richtlinie formuliert.",
    cta: { label: "Eltern-Portal öffnen", href: "/portal/guardian" },
    accentColor: "#e67e22",
    bg: "radial-gradient(ellipse at 50% 50%, rgba(230,126,34,0.1) 0%, transparent 65%), radial-gradient(ellipse at 80% 20%, rgba(212,175,55,0.05) 0%, transparent 50%), #0a0c10",
  },
  {
    id: "allianz",
    eyebrow: "⊕  EU · UN · USA — WELT-ALLIANZ",
    title: "Technologie\nals Dienstleister\nnicht als Herrscher",
    subtitle: "Die Allianz aus Europäischer Union, Vereinten Nationen und den Vereinigten Staaten trägt gemeinsam die ethische Verantwortung für diese Infrastruktur. Datensouveränität nach DSGVO, Transparenzpflicht und das Recht auf digitale Würde sind nicht verhandelbar.",
    cta: { label: "Charta der Koralität", href: "/portal/charta" },
    accentColor: "#7c3aed",
    bg: "radial-gradient(ellipse at 20% 30%, rgba(124,58,237,0.11) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(76,175,125,0.05) 0%, transparent 50%), #0a0c10",
  },
];

type LayerState = "hidden" | "active" | "exit";

export default function LayerScroll({ onExit }: { onExit: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [states, setStates] = useState<LayerState[]>(
    LAYERS.map((_, i) => (i === 0 ? "active" : "hidden"))
  );
  const transitioning = useRef(false);
  const DURATION = 2800;

  const goTo = useCallback(
    (nextIdx: number) => {
      if (transitioning.current) return;
      if (nextIdx < 0) return;
      if (nextIdx >= LAYERS.length) {
        onExit();
        return;
      }
      if (nextIdx === currentIdx) return;

      transitioning.current = true;
      const dir = nextIdx > currentIdx ? "down" : "up";

      setStates((prev) => {
        const next = [...prev] as LayerState[];
        if (dir === "down") {
          next[currentIdx] = "exit";
          next[nextIdx] = "active";
        } else {
          next[currentIdx] = "hidden";
          next[nextIdx] = "active";
        }
        return next;
      });

      setCurrentIdx(nextIdx);
      setTimeout(() => {
        transitioning.current = false;
        setStates((prev) => {
          const next = [...prev] as LayerState[];
          LAYERS.forEach((_, i) => {
            if (i !== nextIdx) next[i] = "hidden";
          });
          return next;
        });
      }, DURATION + 400);
    },
    [currentIdx, onExit]
  );

  const handleNav = useCallback(
    (dir: "up" | "down") => {
      if (dir === "down") goTo(currentIdx + 1);
      else goTo(currentIdx - 1);
    },
    [currentIdx, goTo]
  );

  // Wheel
  useEffect(() => {
    let lastWheel = 0;
    const onWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheel < DURATION + 800) return;
      if (Math.abs(e.deltaY) < 40) return;
      lastWheel = now;
      handleNav(e.deltaY > 0 ? "down" : "up");
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [handleNav]);

  // Keys
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") handleNav("down");
      if (e.key === "ArrowUp" || e.key === "PageUp") handleNav("up");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleNav]);

  // Touch
  useEffect(() => {
    let startY = 0;
    const onStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onEnd = (e: TouchEvent) => {
      const diff = startY - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 80) handleNav(diff > 0 ? "down" : "up");
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [handleNav]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        perspective: "1600px",
        overflow: "hidden",
        background: "#0a0c10",
      }}
    >
      {/* ── LAYERS ── */}
      {LAYERS.map((layer, i) => {
        const state = states[i];
        const accent = layer.accentColor;
        const lines = layer.title.split("\n");

        const transform =
          state === "active"
            ? "translateZ(0) scale(1) translateY(0)"
            : state === "exit"
            ? "translateY(-5%) scale(0.985)"
            : "translateZ(-20px) scale(0.995) translateY(5px)";

        return (
          <div
            key={layer.id}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
              textAlign: "center",
              background: layer.bg,
              opacity: state === "active" ? 1 : state === "exit" ? 0.5 : 0,
              visibility: state === "hidden" ? "hidden" : "visible",
              transform,
              transition: `transform ${DURATION}ms cubic-bezier(0.16,1,0.3,1), opacity ${DURATION * 1.2}ms cubic-bezier(0.33,1,0.68,1)`,
              transitionDelay: state === "active" ? "0ms" : "0ms",
              willChange: "transform, opacity",
              zIndex: state === "active" ? 10 : state === "exit" ? 5 : 1,
              isolation: "isolate",
            }}
          >
            {/* decorative corner lines */}
            {[
              { top: "2rem", left: "2rem", borderTop: `1px solid ${accent}50`, borderLeft: `1px solid ${accent}50` },
              { top: "2rem", right: "2rem", borderTop: `1px solid ${accent}50`, borderRight: `1px solid ${accent}50` },
              { bottom: "2rem", left: "2rem", borderBottom: `1px solid ${accent}50`, borderLeft: `1px solid ${accent}50` },
              { bottom: "2rem", right: "2rem", borderBottom: `1px solid ${accent}50`, borderRight: `1px solid ${accent}50` },
            ].map((s, ci) => (
              <div key={ci} style={{ position: "absolute", width: "40px", height: "40px", ...s }} />
            ))}

            {/* eyebrow */}
            <p
              style={{
                fontFamily: "var(--font-ceremonial)",
                fontSize: "0.55rem",
                letterSpacing: "0.4em",
                color: accent,
                opacity: 0.65,
                marginBottom: "1.5rem",
                textTransform: "uppercase",
              }}
            >
              {layer.eyebrow}
            </p>

            {/* Intro-Orb: dekorativer Goldring tief im Hintergrund — kein Overlap */}
            {i === 0 && (
              <div style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%, -56%)",
                width: "min(70vw, 460px)", height: "min(70vw, 460px)",
                borderRadius: "50%",
                border: "1px solid rgba(212,175,55,0.08)",
                boxShadow: "0 0 100px rgba(212,175,55,0.06), inset 0 0 60px rgba(212,175,55,0.03)",
                animation: "pulseOrb 6s ease-in-out infinite",
                pointerEvents: "none",
                zIndex: -1,
              }} />
            )}

            {/* title */}
            <h2
              style={{
                fontFamily: "var(--font-ceremonial)",
                fontSize: i === 0 ? "clamp(3rem, 10vw, 7.5rem)" : "clamp(2.2rem, 7vw, 5.5rem)",
                letterSpacing: i === 0 ? "0.15em" : "0.08em",
                textTransform: "uppercase",
                lineHeight: i === 0 ? 1.0 : 1.05,
                marginBottom: "1.75rem",
                background: `linear-gradient(120deg, ${accent}, #f9f1d7 50%, ${accent})`,
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 4s linear infinite",
              }}
            >
              {lines.map((line, li) => (
                <span key={li} style={{ display: "block" }}>{line}</span>
              ))}
            </h2>

            {/* Jahreszahl nur auf Layer 0 */}
            {i === 0 && (
              <p style={{
                fontFamily: "var(--font-ceremonial)",
                fontSize: "0.5rem",
                letterSpacing: "0.6em",
                color: "rgba(212,175,55,0.35)",
                marginBottom: "1.5rem",
              }}>2026</p>
            )}

            {/* subtitle */}
            <p
              style={{
                fontFamily: "var(--font-quote)",
                fontSize: i === 0 ? "clamp(1rem, 2.2vw, 1.35rem)" : "clamp(0.95rem, 2vw, 1.3rem)",
                fontStyle: "italic",
                color: i === 0 ? "rgba(249,241,215,0.55)" : "rgba(249,241,215,0.6)",
                maxWidth: i === 0 ? "520px" : "600px",
                lineHeight: 1.75,
                marginBottom: "2.5rem",
              }}
            >
              {layer.subtitle}
            </p>

            {/* CTA */}
            {layer.cta && (
              <Link
                href={layer.cta.href}
                style={{
                  fontFamily: "var(--font-ceremonial)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#0a0c10",
                  background: accent,
                  padding: "0.75rem 2rem",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "filter 0.25s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
              >
                {layer.cta.label} →
              </Link>
            )}

            {/* layer counter */}
            <div
              style={{
                position: "absolute",
                bottom: "3rem",
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "var(--font-ceremonial)",
                fontSize: "0.45rem",
                letterSpacing: "3px",
                color: "rgba(249,241,215,0.25)",
              }}
            >
              0{i + 1} / 0{LAYERS.length}
            </div>

            {/* scroll hint on first layer */}
            {i === 0 && (
              <div
                style={{
                  position: "absolute",
                  bottom: "3.5rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.6rem",
                  animation: "gold-float 3s ease-in-out infinite",
                  zIndex: 1,
                }}
              >
                <span style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.4rem", letterSpacing: "4px", color: accent, opacity: 0.35 }}>
                  DEN PFAD ENTDECKEN
                </span>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                  <div style={{ width: "1px", height: "32px", background: `linear-gradient(to bottom, ${accent}60, transparent)` }} />
                  <div style={{
                    width: "6px", height: "6px",
                    borderRight: `1px solid ${accent}60`,
                    borderBottom: `1px solid ${accent}60`,
                    transform: "rotate(45deg) translateY(-2px)",
                  }} />
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* ── SIDE DOTS ── */}
      <div
        style={{
          position: "fixed",
          right: "1.5rem",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          zIndex: 60,
        }}
      >
        {LAYERS.map((layer, i) => (
          <button
            key={layer.id}
            aria-label={`Layer ${i + 1}`}
            onClick={() => goTo(i)}
            style={{
              width: i === currentIdx ? "8px" : "6px",
              height: i === currentIdx ? "8px" : "6px",
              borderRadius: "50%",
              background: i === currentIdx ? layer.accentColor : "rgba(255,255,255,0.2)",
              border: i === currentIdx ? `2px solid ${layer.accentColor}60` : "none",
              cursor: "pointer",
              transition: "all 0.4s ease",
              boxShadow: i === currentIdx ? `0 0 8px ${layer.accentColor}80` : "none",
              padding: 0,
            }}
          />
        ))}
        {/* exit dot */}
        <button
          aria-label="Zur Seite"
          onClick={onExit}
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            border: "1px dashed rgba(255,255,255,0.2)",
            cursor: "pointer",
            transition: "all 0.3s",
            padding: 0,
            marginTop: "4px",
          }}
          title="Zur Seite scrollen"
        />
      </div>

      {/* ── PROGRESS BAR (top) ── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "2px",
          width: `${((currentIdx + 1) / LAYERS.length) * 100}%`,
          background: `linear-gradient(90deg, transparent, ${LAYERS[currentIdx].accentColor})`,
          transition: `width ${DURATION}ms ease`,
          zIndex: 60,
        }}
      />
    </div>
  );
}
