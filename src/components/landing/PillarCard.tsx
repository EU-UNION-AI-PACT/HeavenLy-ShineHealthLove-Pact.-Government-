"use client";

interface Pillar {
  icon: string;
  title: string;
  desc: string;
  color: string;
  freq: string;
}

export default function PillarCard({ p }: { p: Pillar }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.025)",
        border: `1px solid ${p.color}30`,
        borderTop: `2px solid ${p.color}`,
        padding: "1.75rem 1.5rem",
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
        cursor: "default",
        height: "100%",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 40px ${p.color}25`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      <div style={{ fontSize: "1.6rem", marginBottom: "1rem", color: p.color }}>{p.icon}</div>
      <div
        style={{
          fontFamily: "var(--font-ceremonial)",
          fontSize: "0.65rem",
          letterSpacing: "2px",
          color: p.color,
          marginBottom: "0.75rem",
          textTransform: "uppercase",
        }}
      >
        {p.title}
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", opacity: 0.65, lineHeight: 1.8 }}>
        {p.desc}
      </p>
      <div style={{ marginTop: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div style={{
          width: "4px", height: "4px", borderRadius: "50%",
          background: p.color, boxShadow: `0 0 6px ${p.color}`,
        }} />
        <span style={{
          fontFamily: "var(--font-ceremonial)",
          fontSize: "0.5rem", letterSpacing: "1px",
          color: p.color, opacity: 0.6,
        }}>
          {p.freq}
        </span>
      </div>
    </div>
  );
}
