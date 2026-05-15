"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SubLink { href: string; label: string; icon: string; dim?: string }
interface NavItem {
  href: string; label: string; icon: string;
  children?: SubLink[];
}

const NAV: NavItem[] = [
  {
    href: "/portal", label: "Portal", icon: "✦",
    children: [
      { href: "/portal",                label: "Portal-Hub",       icon: "✦", dim: "Alle Bereiche" },
      { href: "/portal/wunschbrunnen",  label: "Wunschbrunnen",    icon: "🌊", dim: "Heilige Quellen" },
      { href: "/portal/splitscreen",    label: "Cosmic Split",     icon: "⬡", dim: "Atlas & Brunnen" },
      { href: "/portal/wishes",         label: "Wünsche",          icon: "◈", dim: "Wunschpakt" },
      { href: "/portal/furbitte",       label: "Fürbitte",         icon: "✧", dim: "Alle Religionen" },
      { href: "/portal/petitions",      label: "Meine Fürbitten",  icon: "◇", dim: "Persönlicher Pfad" },
      { href: "/portal/berufung",       label: "Berufungs-Brücke", icon: "⊹", dim: "Ikigai-Mapping" },
      { href: "/portal/charta",         label: "Charta",           icon: "⊕", dim: "Kollektive Würde" },
    ],
  },
  {
    href: "/shinehealthcare", label: "ShineHealthCare", icon: "◇",
    children: [
      { href: "/shinehealthcare",       label: "ShineHealthCare",  icon: "◇", dim: "Globale Infrastruktur" },
      { href: "/portal/stories",        label: "Archiv",           icon: "⊹", dim: "Bedeutungs-Archiv" },
      { href: "/portal/vacancies",      label: "Hallo sagen",      icon: "✦", dim: "Andock-System" },
    ],
  },
  {
    href: "/system", label: "System", icon: "⊕",
    children: [
      { href: "/system",                label: "System-Karte",     icon: "⊕", dim: "Globale Architektur" },
      { href: "/portal/guardian",       label: "Eltern-Passage",   icon: "♦", dim: "Kinderschutz" },
      { href: "/admin",                 label: "Admin",            icon: "◈", dim: "Governance" },
    ],
  },
];

const DROPDOWN_STYLE: React.CSSProperties = {
  position: "absolute",
  top: "calc(100% + 4px)",
  left: "50%",
  transform: "translateX(-50%)",
  minWidth: "220px",
  background: "rgba(6,8,14,0.97)",
  border: "1px solid rgba(212,175,55,0.2)",
  borderTop: "2px solid #d4af37",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  boxShadow: "0 16px 48px rgba(0,0,0,0.6), 0 0 40px rgba(212,175,55,0.05)",
  padding: "0.5rem 0",
  zIndex: 200,
};

export default function GlobalNav() {
  const [scrolled, setScrolled]   = useState(false);
  const [openMenu, setOpenMenu]   = useState<string | null>(null);
  const [mounted, setMounted]     = useState(false);
  const pathname                  = usePathname();
  const closeTimer                = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpenMenu(null); }, [pathname]);

  function openNow(id: string)  {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(id);
  }
  function scheduleClose() {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 180);
  }

  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
          background: scrolled ? "rgba(7,8,13,0.92)" : "rgba(7,8,13,0.45)",
          backdropFilter: "blur(24px) saturate(150%)",
          WebkitBackdropFilter: "blur(24px) saturate(150%)",
          borderBottom: scrolled
            ? "1px solid rgba(212,175,55,0.18)"
            : "1px solid rgba(212,175,55,0.05)",
          boxShadow: scrolled ? "0 4px 48px rgba(0,0,0,0.4)" : "none",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", height: "60px", justifyContent: "space-between" }}>

            {/* ── LOGO ── */}
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span style={{
                fontFamily: "var(--font-ceremonial)",
                fontSize: "0.6rem", letterSpacing: "0.25em",
                color: "#d4af37", textTransform: "uppercase",
                textShadow: "0 0 20px rgba(212,175,55,0.5)",
              }}>
                ✦ GloryaShine
              </span>
              {isAdmin && (
                <span style={{
                  fontFamily: "var(--font-ceremonial)", fontSize: "0.45rem",
                  letterSpacing: "2px", color: "#7c3aed",
                  border: "1px solid rgba(124,58,237,0.4)", padding: "1px 6px",
                }}>ADMIN</span>
              )}
            </Link>

            {/* ── DESKTOP NAV ── */}
            <ul style={{ display: "flex", gap: "0.1rem", listStyle: "none", margin: 0, padding: 0 }}
              className="hidden-mobile">
              {NAV.map((item) => {
                const active = mounted && (pathname === item.href || pathname.startsWith(item.href + "/"));
                const isOpen = openMenu === item.href;
                return (
                  <li key={item.href}
                    style={{ position: "relative" }}
                    onMouseEnter={() => item.children && openNow(item.href)}
                    onMouseLeave={() => item.children && scheduleClose()}
                  >
                    <Link
                      href={item.href}
                      suppressHydrationWarning
                      style={{
                        display: "flex", alignItems: "center", gap: "0.3rem",
                        fontFamily: "var(--font-ceremonial)",
                        fontSize: "0.55rem", letterSpacing: "0.18em",
                        textTransform: "uppercase", padding: "0.4rem 0.75rem",
                        color: active ? "#d4af37" : "rgba(249,241,215,0.55)",
                        borderBottom: active ? "1px solid #d4af37" : "1px solid transparent",
                        textDecoration: "none", transition: "all 0.2s ease",
                      }}
                    >
                      <span style={{ fontSize: "0.6rem", opacity: 0.7 }}>{item.icon}</span>
                      {item.label}
                      {item.children && (
                        <span style={{
                          fontSize: "0.4rem", opacity: 0.4, marginLeft: "1px",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.2s",
                          display: "inline-block",
                        }}>▼</span>
                      )}
                    </Link>

                    {/* ── DROPDOWN ── */}
                    {item.children && isOpen && (
                      <div style={DROPDOWN_STYLE}
                        onMouseEnter={() => openNow(item.href)}
                        onMouseLeave={() => scheduleClose()}
                      >
                        {item.children.map((sub) => {
                          const subActive = mounted && pathname === sub.href;
                          return (
                            <Link key={sub.href} href={sub.href}
                              style={{
                                display: "flex", alignItems: "flex-start",
                                gap: "0.65rem", padding: "0.55rem 1.1rem",
                                textDecoration: "none",
                                background: subActive ? "rgba(212,175,55,0.07)" : "transparent",
                                borderLeft: subActive ? "2px solid #d4af37" : "2px solid transparent",
                                transition: "all 0.15s ease",
                              }}
                              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,0.06)"; }}
                              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = subActive ? "rgba(212,175,55,0.07)" : "transparent"; }}
                            >
                              <span style={{ fontSize: "0.75rem", opacity: 0.6, marginTop: "1px", flexShrink: 0 }}>{sub.icon}</span>
                              <div>
                                <div style={{
                                  fontFamily: "var(--font-ceremonial)",
                                  fontSize: "0.55rem", letterSpacing: "1.5px",
                                  color: subActive ? "#d4af37" : "rgba(249,241,215,0.75)",
                                  textTransform: "uppercase",
                                }}>{sub.label}</div>
                                {sub.dim && (
                                  <div style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: "0.72rem", opacity: 0.35,
                                    marginTop: "1px",
                                  }}>{sub.dim}</div>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </li>
                );
              })}

              {/* Admin CTA */}
              <li>
                <Link href="/admin" style={{
                  display: "flex", alignItems: "center", gap: "0.3rem",
                  fontFamily: "var(--font-ceremonial)",
                  fontSize: "0.55rem", letterSpacing: "0.18em",
                  textTransform: "uppercase", padding: "0.4rem 1rem",
                  color: "#f9f1d7", background: "rgba(124,58,237,0.2)",
                  border: "1px solid rgba(124,58,237,0.4)",
                  textDecoration: "none", marginLeft: "0.5rem",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.background = "rgba(124,58,237,0.3)";
                  e.currentTarget.style.borderColor = "rgba(124,58,237,0.6)";
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.background = "rgba(124,58,237,0.2)";
                  e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)";
                }}>
                  <span style={{ fontSize: "0.7rem" }}>◈</span>
                  Admin
                </Link>
              </li>

              {/* Anmelden CTA */}
              <li>
                <Link href="/login" style={{
                  display: "flex", alignItems: "center",
                  fontFamily: "var(--font-ceremonial)",
                  fontSize: "0.55rem", letterSpacing: "0.18em",
                  textTransform: "uppercase", padding: "0.4rem 1rem",
                  color: "#0a0c10", background: "#d4af37",
                  textDecoration: "none", marginLeft: "0.3rem",
                  transition: "filter 0.2s",
                }}>
                  Anmelden
                </Link>
              </li>
            </ul>

          </div>
        </div>
      </nav>

      {/* ── SPACER ── */}
      <div style={{ height: "60px" }} />
    </>
  );
}
