"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TAB_LINKS = [
  { href: "/portal",          label: "Portal",   icon: "✦" },
  { href: "/portal/wishes",   label: "Wünsche",  icon: "◈" },
  { href: "/portal/furbitte", label: "Fürbitte", icon: "⬡" },
];

const MORE_LINKS = [
  { href: "/",                    label: "Startseite",      icon: "◇", color: "#d4af37" },
  { href: "/shinehealthcare",     label: "ShineHealthCare", icon: "✦", color: "#4caf7d" },
  { href: "/portal/charta",       label: "Charta",          icon: "⊹", color: "#00bcd4" },
  { href: "/portal/guardian",     label: "Eltern-Passage",  icon: "♦", color: "#e67e22" },
  { href: "/portal/stories",      label: "Story-Archiv",    icon: "◈", color: "#d4af37" },
  { href: "/portal/leitanker",    label: "Leitanker",       icon: "⬡", color: "#7c3aed" },
  { href: "/portal/welcome-origin", label: "Genesis",       icon: "⊕", color: "#4caf7d" },
  { href: "/system",              label: "System-Karte",    icon: "◆", color: "#00bcd4" },
  { href: "/login",               label: "Anmelden",        icon: "→", color: "#d4af37" },
];

export default function MobileBottomBar() {
  const [moreOpen, setMoreOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMoreOpen(false); }, [pathname]);

  return (
    <>
      {/* ── MORE OVERLAY ─────────────────────────────────────────────────── */}
      <div
        onClick={() => setMoreOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "rgba(10,12,16,0.85)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          opacity: moreOpen ? 1 : 0,
          pointerEvents: moreOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingBottom: "84px",
        }}
      >
        {/* header */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            padding: "2rem 1.5rem 1rem",
            borderBottom: "1px solid rgba(212,175,55,0.15)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-ceremonial)",
              fontSize: "0.55rem",
              letterSpacing: "4px",
              color: "rgba(212,175,55,0.5)",
              textAlign: "center",
            }}
          >
            ✦ &nbsp; ALLE BEREICHE &nbsp; ✦
          </p>
        </div>

        {/* bento grid */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "rgba(212,175,55,0.08)",
            margin: "0 0 0",
            overflowY: "auto",
          }}
        >
          {MORE_LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "1.5rem 0.5rem",
                  background: active ? "rgba(212,175,55,0.07)" : "rgba(10,12,16,0.95)",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
              >
                <span
                  style={{
                    fontSize: "1.4rem",
                    color: l.color,
                    filter: `drop-shadow(0 0 6px ${l.color}80)`,
                  }}
                >
                  {l.icon}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-ceremonial)",
                    fontSize: "0.5rem",
                    letterSpacing: "1.5px",
                    color: active ? l.color : "rgba(249,241,215,0.55)",
                    textTransform: "uppercase",
                    textAlign: "center",
                  }}
                >
                  {l.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── BOTTOM TAB BAR ───────────────────────────────────────────────── */}
      <nav
        className="show-mobile"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 201,
          height: "68px",
          background: "rgba(10,12,16,0.96)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(212,175,55,0.18)",
          display: "flex",
          alignItems: "stretch",
        }}
      >
        {/* main tabs */}
        {TAB_LINKS.map((t) => {
          const active = pathname === t.href || pathname.startsWith(t.href + "/");
          return (
            <Link
              key={t.href}
              href={t.href}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "3px",
                textDecoration: "none",
                position: "relative",
                transition: "background 0.2s",
              }}
            >
              {active && (
                <div style={{
                  position: "absolute",
                  top: 0, left: "20%", right: "20%",
                  height: "2px",
                  background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
                }} />
              )}
              <span style={{
                fontSize: "1.1rem",
                color: active ? "#d4af37" : "rgba(249,241,215,0.35)",
                filter: active ? "drop-shadow(0 0 6px rgba(212,175,55,0.6))" : "none",
                transition: "all 0.25s",
              }}>
                {t.icon}
              </span>
              <span style={{
                fontFamily: "var(--font-ceremonial)",
                fontSize: "0.45rem",
                letterSpacing: "1.5px",
                color: active ? "#d4af37" : "rgba(249,241,215,0.3)",
                textTransform: "uppercase",
                transition: "color 0.25s",
              }}>
                {t.label}
              </span>
            </Link>
          );
        })}

        {/* mehr button */}
        <button
          onClick={() => setMoreOpen(!moreOpen)}
          aria-label="Mehr Navigation"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "3px",
            background: "none",
            border: "none",
            cursor: "pointer",
            position: "relative",
          }}
        >
          {moreOpen && (
            <div style={{
              position: "absolute",
              top: 0, left: "20%", right: "20%",
              height: "2px",
              background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
            }} />
          )}
          {/* animated bento → X */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 4px)", gap: "2px", transition: "all 0.3s" }}>
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: "4px", height: "4px",
                  borderRadius: "1px",
                  background: moreOpen ? "#d4af37" : "rgba(249,241,215,0.35)",
                  transform: moreOpen
                    ? i === 4 ? "scale(1.5)" : "scale(0.6)"
                    : "scale(1)",
                  transition: `transform 0.3s ${i * 0.02}s, background 0.3s`,
                  boxShadow: moreOpen ? "0 0 4px rgba(212,175,55,0.5)" : "none",
                }}
              />
            ))}
          </div>
          <span style={{
            fontFamily: "var(--font-ceremonial)",
            fontSize: "0.45rem",
            letterSpacing: "1.5px",
            color: moreOpen ? "#d4af37" : "rgba(249,241,215,0.3)",
            textTransform: "uppercase",
            marginTop: "2px",
            transition: "color 0.25s",
          }}>
            Mehr
          </span>
        </button>
      </nav>

      {/* ── bottom padding so content isn't hidden behind bar ── */}
      <div className="show-mobile" style={{ height: "68px" }} />
    </>
  );
}
