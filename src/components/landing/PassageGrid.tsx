"use client";

import { PASSAGE_STATIONS } from "@/types";

const phaseColors: Record<string, string> = {
  URSPRUNG:   "rgba(0,188,212,0.15)",
  SPIEGELUNG: "rgba(212,175,55,0.15)",
  KROENUNG:   "rgba(230,126,34,0.18)",
};

const phaseGlows: Record<string, string> = {
  URSPRUNG:   "rgba(0,188,212,0.5)",
  SPIEGELUNG: "rgba(212,175,55,0.5)",
  KROENUNG:   "rgba(230,126,34,0.5)",
};

const phaseLabels: Record<string, { icon: string; color: string }> = {
  URSPRUNG:   { icon: "✦", color: "#00bcd4" },
  SPIEGELUNG: { icon: "✦", color: "#d4af37" },
  KROENUNG:   { icon: "✦", color: "#e67e22" },
};

export default function PassageGrid() {
  return (
    <section className="mb-24">
      <h2
        className="font-ceremonial text-gold text-center mb-12"
        style={{ fontSize: "0.85rem", letterSpacing: "5px" }}
      >
        Die Drei Heiligen Passagen — 2026
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PASSAGE_STATIONS.map((station, i) => {
          const pl = phaseLabels[station.phase];
          return (
            <div
              key={i}
              className="station-card"
              style={{ background: phaseColors[station.phase] }}
            >
              {/* TOP ORNAMENT */}
              <div
                className="font-ceremonial mb-3"
                style={{ fontSize: "0.6rem", letterSpacing: "3px", color: pl.color, opacity: 0.7 }}
              >
                HEILIGES DATUM
              </div>

              {/* DATE */}
              <div
                className="font-ceremonial mb-1"
                style={{ fontSize: "2rem", color: pl.color, textShadow: `0 0 20px ${phaseGlows[station.phase]}` }}
              >
                {station.date}
              </div>
              <div
                className="font-ceremonial mb-6"
                style={{ fontSize: "0.7rem", letterSpacing: "2px", opacity: 0.5 }}
              >
                {station.label}
              </div>

              {/* PHASE ICON */}
              <div
                className="mb-4"
                style={{
                  width: "50px",
                  height: "50px",
                  margin: "0 auto 1.5rem",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${phaseGlows[station.phase]}, transparent 70%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  color: pl.color,
                }}
              >
                {pl.icon}
              </div>

              {/* TITLE */}
              <h3
                className="font-ceremonial mb-3"
                style={{ fontSize: "0.9rem", letterSpacing: "3px", color: pl.color }}
              >
                {station.title}
              </h3>

              {/* DESCRIPTION */}
              <p
                className="text-gold-ethereal opacity-70"
                style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.6 }}
              >
                {station.description}
              </p>

              {/* PHASE BADGE */}
              <div
                className="mt-6 font-ceremonial"
                style={{
                  fontSize: "0.55rem",
                  letterSpacing: "2px",
                  color: pl.color,
                  opacity: 0.6,
                  borderTop: `1px solid ${phaseGlows[station.phase].replace("0.5", "0.2")}`,
                  paddingTop: "0.75rem",
                }}
              >
                {station.phase.replace("KROENUNG", "KRÖNUNG")}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
