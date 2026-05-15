"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/portal",            label: "Portal",        icon: "✦" },
  { href: "/portal/wishes",     label: "Wünsche",       icon: "◈" },
  { href: "/portal/furbitte",   label: "Fürbitte",      icon: "⬡" },
  { href: "/shinehealthcare",   label: "ShineHealthCare", icon: "◇" },
  { href: "/portal/charta",     label: "Charta",        icon: "⊹" },
  { href: "/system",            label: "System",        icon: "⊕" },
];

export default function GlobalNav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          transition: "all 0.4s ease",
          background: scrolled
            ? "rgba(10,12,16,0.92)"
            : "rgba(10,12,16,0.60)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(212,175,55,0.25)"
            : "1px solid rgba(212,175,55,0.08)",
          boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.5)" : "none",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", height: "60px", justifyContent: "space-between" }}>

            {/* ── LOGO ── */}
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-ceremonial)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.25em",
                  color: "#d4af37",
                  textTransform: "uppercase",
                  textShadow: "0 0 20px rgba(212,175,55,0.5)",
                  transition: "text-shadow 0.3s",
                }}
              >
                ✦ GloryaShine
              </span>
              {isAdmin && (
                <span style={{
                  fontFamily: "var(--font-ceremonial)",
                  fontSize: "0.45rem",
                  letterSpacing: "2px",
                  color: "#7c3aed",
                  border: "1px solid rgba(124,58,237,0.4)",
                  padding: "1px 6px",
                }}>
                  ADMIN
                </span>
              )}
            </Link>

            {/* ── DESKTOP LINKS ── */}
            <ul style={{ display: "flex", gap: "0.25rem", listStyle: "none", margin: 0, padding: 0 }}
              className="hidden-mobile">
              {NAV_LINKS.map((l) => {
                const active = pathname === l.href || pathname.startsWith(l.href + "/");
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        fontFamily: "var(--font-ceremonial)",
                        fontSize: "0.55rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        padding: "0.4rem 0.75rem",
                        color: active ? "#d4af37" : "rgba(249,241,215,0.55)",
                        borderBottom: active ? "1px solid #d4af37" : "1px solid transparent",
                        textDecoration: "none",
                        transition: "all 0.25s ease",
                      }}
                    >
                      <span style={{ fontSize: "0.6rem", opacity: 0.7 }}>{l.icon}</span>
                      {l.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href="/login"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    fontFamily: "var(--font-ceremonial)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    padding: "0.4rem 1rem",
                    color: "#0a0c10",
                    background: "#d4af37",
                    textDecoration: "none",
                    marginLeft: "0.5rem",
                    transition: "all 0.25s ease",
                  }}
                >
                  Anmelden
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ── SPACER so content doesn't hide behind nav ── */}
      <div style={{ height: "60px" }} />
    </>
  );
}
