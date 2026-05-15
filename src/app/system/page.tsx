"use client";

import Link from "next/link";
import SystemCanvas from "@/components/system/SystemCanvas";

const ROLES = [
  { role: "SUPER_ADMIN", path: "/admin",                 color: "#7c3aed", desc: "Globale Governance, alle Tenants, Gießfass, Resonanz-Bilanz" },
  { role: "TENANT_ADMIN", path: "/admin/tenant/[slug]",  color: "#7c3aed", desc: "Einzelner Tenant — Nutzer, Fürbitten, Junior-Sicherheit" },
  { role: "PILGRIM",      path: "/portal",               color: "#4caf7d", desc: "Pilger-Hub, Fürbitten, Resonanz-Feed, Vakanzen" },
  { role: "PARENT",       path: "/portal/guardian",      color: "#e67e22", desc: "Eltern-Passage, Family Orbit, Alters-Transition, Kind-Links" },
  { role: "JUNIOR",       path: "/portal/junior",        color: "#64b4ff", desc: "Stilles Mesh — KEIN Direktkontakt, alle Komm. → Eltern" },
];

const PASSAGES = [
  { date: "06. Jan 2026", title: "Der Ursprung",   subtitle: "Epiphanie — Julianischer Anker",   color: "#d4af37", icon: "✦" },
  { date: "12. Jun 2026", title: "Die Spiegelung", subtitle: "Spiegelpunkt — Heilender Pfad",    color: "#00bcd4", icon: "◈" },
  { date: "24. Dez 2026", title: "Die Krönung",    subtitle: "Jubilaeums-Krönung — Gewissheit",  color: "#4caf7d", icon: "⬡" },
];

const ALLIANCE = [
  { id: "ID-EU", name: "EU-Union",       role: "Ethik / DSGVO+ / AI Act",           color: "#00bcd4" },
  { id: "ID-US", name: "USA",            role: "Tech-Skalierung / Agentic Infra",    color: "#00bcd4" },
  { id: "ID-UN", name: "United Nations", role: "Globale Neutralität / Welterbe",     color: "#00bcd4" },
  { id: "ID-CH", name: "Schweiz",        role: "Kryptografischer Anker / Sovereign ID Vault", color: "#4caf7d" },
  { id: "ID-IE", name: "Irland",         role: "Cloud-Hosting Hub",                  color: "#4caf7d" },
  { id: "ID-NO", name: "Norwegen",       role: "Digitale Gesellschaft / Transparenz", color: "#4caf7d" },
  { id: "ID-SE", name: "Schweden",       role: "Vertrauens-Layer",                   color: "#4caf7d" },
  { id: "ID-FI", name: "Finnland",       role: "Digitale Governance",                color: "#4caf7d" },
  { id: "ID-FR", name: "Frankreich",     role: "Philosophisch / Kulturell",           color: "#d4af37" },
  { id: "ID-ES", name: "Spanien",        role: "Brückenbauer zu anderen Kontinenten", color: "#d4af37" },
  { id: "ID-PT", name: "Portugal",       role: "Kulturelle Brücke / Wärme",          color: "#d4af37" },
];

const LAYERS = [
  {
    title: "Öffentliche Ebene",
    color: "#d4af37",
    items: ["Landing Page", "Passage-Grid", "Kalender-Widget", "Allianz-Bar", "Login"],
  },
  {
    title: "Admin-Tenant (Zero-Trust)",
    color: "#7c3aed",
    items: ["Super-Admin Terminal", "Gießfass-Dashboard", "Resonanz-Bilanz", "Junior-Schutz-Zentrale", "Mentor-Vetting", "Tenant-Admin [slug]"],
  },
  {
    title: "Pilger-Portal",
    color: "#4caf7d",
    items: ["Pilger-Hub", "Fürbitte-Einreichung", "Resonanz-Feed Inbox", "Vakanz-Liste"],
  },
  {
    title: "Eltern-Passage",
    color: "#e67e22",
    items: ["Guardian Gateway", "Family Orbit Canvas", "Alters-Transition Gate", "Kind-Link-Verwaltung"],
  },
  {
    title: "Junior-Mesh (Versiegelt)",
    color: "#64b4ff",
    items: ["Silent Junior ID", "Partikel-Workspace", "Kein Direktkontakt", "Alle Komm. → Eltern-Relay"],
  },
  {
    title: "API & Infrastruktur",
    color: "#f0d060",
    items: ["/api/petitions", "/api/wishes", "/api/news", "/api/vacancies (Match-Orchestrator)", "/api/seed", "/api/cron/resonanz", "Resend Email (Parent Relay Only)"],
  },
];

export default function SystemPage() {
  return (
    <main className="min-h-screen bg-sacred">

      {/* ── HERO ── */}
      <section className="relative text-center px-6 py-20 overflow-hidden">
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
        <p className="font-ceremonial opacity-30 mb-3" style={{ fontSize: "0.6rem", letterSpacing: "5px" }}>
          SYSTEM-KARTE — GLORYASHINE PILGER-PLATTFORM
        </p>
        <h1 className="font-ceremonial text-gold glow-gold mb-4" style={{ fontSize: "clamp(1.4rem, 4vw, 2.6rem)", lineHeight: 1.3 }}>
          Die Kollektive Koralität
        </h1>
        <p className="font-quote opacity-70 max-w-2xl mx-auto" style={{ fontSize: "clamp(0.95rem, 2vw, 1.15rem)" }}>
          Ein globales Korrektiv der Menschheitsgeschichte — wo jede Stimme gleichwertig zählt, jede Geschichte dauerhaft bewahrt wird und die strukturellen Versäumnisse der Vergangenheit technologisch und rechtlich ausgeschlossen werden.
        </p>
        <div className="passage-line mt-10 max-w-3xl mx-auto" />
      </section>

      {/* ── LIVE SYSTEM CANVAS ── */}
      <section className="px-4 md:px-8 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <p className="font-ceremonial opacity-40" style={{ fontSize: "0.6rem", letterSpacing: "3px" }}>
              LIVE ARCHITEKTUR-KARTE — HOVER FÜR DETAILS
            </p>
          </div>
          <div
            style={{
              border: "1px solid var(--border-gold)",
              background: "rgba(255,255,255,0.01)",
              backdropFilter: "blur(10px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.03) 0%, transparent 70%)", pointerEvents: "none" }} />
            <SystemCanvas />
          </div>

          {/* LEGEND */}
          <div className="flex flex-wrap gap-4 mt-5 justify-center">
            {[
              { color: "#d4af37", label: "Core / Auth / DB" },
              { color: "#7c3aed", label: "Admin-Tenant" },
              { color: "#4caf7d", label: "Pilger-Portal" },
              { color: "#e67e22", label: "Eltern-Passage" },
              { color: "#64b4ff", label: "Junior-Mesh" },
              { color: "#00bcd4", label: "Allianz-Nodes" },
              { color: "#f0d060", label: "APIs" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-2">
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: l.color, display: "inline-block", boxShadow: `0 0 6px ${l.color}` }} />
                <span className="font-ceremonial opacity-50" style={{ fontSize: "0.55rem", letterSpacing: "1.5px" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE SACRED PASSAGES ── */}
      <section className="px-6 mb-16">
        <div className="max-w-5xl mx-auto">
          <p className="font-ceremonial text-center opacity-40 mb-8" style={{ fontSize: "0.6rem", letterSpacing: "4px" }}>
            DIE DREI HEILIGEN PASSAGEN — KALENDARISCHER ANKER 2026
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PASSAGES.map((p, i) => (
              <div
                key={p.date}
                className="text-center p-8"
                style={{
                  background: `rgba(${p.color === "#d4af37" ? "212,175,55" : p.color === "#00bcd4" ? "0,188,212" : "76,175,125"},0.04)`,
                  border: `1px solid ${p.color}40`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }} />
                <div className="font-ceremonial mb-3" style={{ fontSize: "2rem", color: p.color, opacity: 0.7 }}>{p.icon}</div>
                <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "0.65rem", letterSpacing: "2px" }}>{p.date}</div>
                <h3 className="font-ceremonial mb-2" style={{ fontSize: "1rem", color: p.color }}>{p.title}</h3>
                <p className="opacity-50 font-quote" style={{ fontSize: "0.9rem" }}>{p.subtitle}</p>
                <div className="font-ceremonial mt-4 opacity-20" style={{ fontSize: "0.55rem", letterSpacing: "2px" }}>
                  STATION {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center font-quote opacity-40 mt-6" style={{ fontSize: "0.9rem" }}>
            Die drei kalendarischen Anker des Heiligen Jahres 2026: Ursprung — Spiegelung — Krönung. Ein vollständiger Zyklus der Heilung.
          </p>
        </div>
      </section>

      {/* ── ROLE SYSTEM ── */}
      <section className="px-6 mb-16">
        <div className="max-w-5xl mx-auto">
          <p className="font-ceremonial text-center opacity-40 mb-8" style={{ fontSize: "0.6rem", letterSpacing: "4px" }}>
            ROLLEN-SYSTEM — 5 EBENEN DER BEHEIMATUNG UND VERANTWORTUNG
          </p>
          <div className="space-y-2">
            {ROLES.map((r) => (
              <div
                key={r.role}
                className="flex items-center gap-4 px-6 py-4"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${r.color}30`,
                  borderLeft: `3px solid ${r.color}`,
                }}
              >
                <div style={{ minWidth: 140 }}>
                  <span className="font-ceremonial" style={{ fontSize: "0.65rem", letterSpacing: "2px", color: r.color }}>
                    {r.role}
                  </span>
                </div>
                <div className="font-ceremonial opacity-30" style={{ fontSize: "0.55rem", minWidth: 180, letterSpacing: "1px" }}>
                  {r.path}
                </div>
                <p className="opacity-60" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>
                  {r.desc}
                </p>
              </div>
            ))}
          </div>

          {/* JUNIOR RULE */}
          <div className="mt-6 p-5 text-center" style={{ background: "rgba(100,180,255,0.04)", border: "1px solid rgba(100,180,255,0.25)" }}>
            <p className="font-ceremonial" style={{ fontSize: "0.65rem", letterSpacing: "3px", color: "#64b4ff" }}>
              🛡️ DAS GOLDENE GESETZ
            </p>
            <p className="font-quote mt-2 opacity-70" style={{ fontSize: "1rem" }}>
              „Kein externer Direktkontakt mit Minderjährigen ist strukturell möglich. Jede Systemkommunikation, die ein Kind betrifft, wird ausschließlich über den erziehungsberechtigten Elternteil geleitet — technisch erzwungen, nicht lediglich als Richtlinie formuliert."
            </p>
            <p className="font-ceremonial mt-2 opacity-30" style={{ fontSize: "0.55rem", letterSpacing: "2px" }}>
              UN-KINDERRECHTSKONVENTION · COPPA · DSGVO · EU AI ACT — TECHNISCH ERZWUNGEN, NICHT NUR POLICY
            </p>
          </div>
        </div>
      </section>

      {/* ── PLATFORM LAYERS ── */}
      <section className="px-6 mb-16">
        <div className="max-w-5xl mx-auto">
          <p className="font-ceremonial text-center opacity-40 mb-8" style={{ fontSize: "0.6rem", letterSpacing: "4px" }}>
            SYSTEMSCHICHTEN — VOLLSTÄNDIGE ARCHITEKTUR
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {LAYERS.map((layer) => (
              <div
                key={layer.title}
                className="metric-card"
                style={{ borderTop: `2px solid ${layer.color}` }}
              >
                <div className="font-ceremonial mb-4" style={{ fontSize: "0.65rem", letterSpacing: "2px", color: layer.color }}>
                  {layer.title}
                </div>
                <ul className="space-y-2">
                  {layer.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span style={{ color: layer.color, opacity: 0.5, marginTop: 2 }}>▸</span>
                      <span className="opacity-60" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WELT-ALLIANZ NODES ── */}
      <section className="px-6 mb-16">
        <div className="max-w-5xl mx-auto">
          <p className="font-ceremonial text-center opacity-40 mb-8" style={{ fontSize: "0.6rem", letterSpacing: "4px" }}>
            WELT-ALLIANZ — 11 SOVEREIGN NODES
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {ALLIANCE.map((a) => (
              <div
                key={a.id}
                className="flex items-start gap-3 px-4 py-3"
                style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${a.color}25`, borderLeft: `2px solid ${a.color}` }}
              >
                <span className="font-ceremonial" style={{ fontSize: "0.65rem", letterSpacing: "1px", color: a.color, minWidth: 52 }}>
                  {a.id}
                </span>
                <div>
                  <div className="font-ceremonial" style={{ fontSize: "0.65rem", letterSpacing: "1.5px" }}>{a.name}</div>
                  <div className="opacity-40 mt-1" style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem" }}>{a.role}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center font-quote opacity-30 mt-6" style={{ fontSize: "0.9rem" }}>
            „Die Welt ist heutzutage ein Stück näher zusammengerückt."
          </p>
        </div>
      </section>

      {/* ── GLOBAL RESONANCE REPORT ── */}
      <section className="px-6 mb-16">
        <div className="max-w-5xl mx-auto">
          <p className="font-ceremonial text-center opacity-40 mb-8" style={{ fontSize: "0.6rem", letterSpacing: "4px" }}>
            GLOBAL RESONANCE REPORT — TAGESBILANZ DER WELT-ALLIANZ
          </p>

          {/* 12.06.2026 Countdown */}
          <div
            className="mb-6 text-center p-8"
            style={{
              background: "rgba(0,188,212,0.03)",
              border: "1px solid rgba(0,188,212,0.2)",
              borderTop: "2px solid #00bcd4",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, #00bcd4, transparent)" }} />
            <div className="font-ceremonial mb-2" style={{ fontSize: "0.5rem", letterSpacing: "4px", color: "#00bcd4", opacity: 0.6 }}>
              NÄCHSTE HEILIGE PASSAGE
            </div>
            <div className="font-ceremonial" style={{ fontSize: "clamp(1.2rem, 4vw, 2rem)", color: "#00bcd4", letterSpacing: "4px" }}>
              12. JUNI 2026
            </div>
            <div className="font-quote mt-2 opacity-60" style={{ fontSize: "1rem" }}>
              Die Spiegelung — Gottes Heilender Pfad — Der Diamant wird gepresst
            </div>
            <div className="font-ceremonial mt-3 opacity-30" style={{ fontSize: "0.5rem", letterSpacing: "2px" }}>
              EXAKT IN DER MITTE ZWISCHEN URSPRUNG (06. JAN) UND KRÖNUNG (24. DEZ) · HEILIGES JAHR 2026
            </div>
          </div>

          {/* Metriken */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {[
              { label: "Transmutations-Rate",     value: "98,7 %",  sub: "Gießfass · Heute",      color: "#4caf7d" },
              { label: "Hallo-Verbindungen",       value: "842.000", sub: "Aktiv · Weltweit",       color: "#00bcd4" },
              { label: "Neue Gold-Projekte",       value: "12.405",  sub: "Hindrüber weg",          color: "#d4af37" },
              { label: "Neu-Ankömmlinge",          value: "156.000", sub: "Integriert · Heute",     color: "#4caf7d" },
              { label: "Junior-Sync",              value: "45.000",  sub: "Stabil · Vakuum aktiv",  color: "#e67e22" },
              { label: "Resonanz-Frequenz",        value: "432 Hz",  sub: "Stabil · Alle Nodes",    color: "#7c3aed" },
            ].map((m) => (
              <div
                key={m.label}
                className="text-center p-5"
                style={{
                  background: `${m.color}05`,
                  border: `1px solid ${m.color}25`,
                  borderTop: `2px solid ${m.color}`,
                }}
              >
                <div className="font-ceremonial" style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)", color: m.color, letterSpacing: "1px" }}>
                  {m.value}
                </div>
                <div className="font-ceremonial opacity-50 mt-1" style={{ fontSize: "0.45rem", letterSpacing: "2px" }}>
                  {m.label}
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", opacity: 0.3, marginTop: "2px" }}>
                  {m.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Schlussbemerkung */}
          <div style={{ padding: "1.25rem 2rem", background: "rgba(212,175,55,0.03)", border: "1px solid rgba(212,175,55,0.12)", textAlign: "center" }}>
            <p className="font-quote opacity-60" style={{ fontSize: "1rem", lineHeight: 1.8 }}>
              „Das System beweist heute erneut, dass Grenzen keine Hindernisse mehr sind,
              sondern lediglich geografische Markierungen in einem beheimateten Welt-Mosaik."
            </p>
            <p className="font-ceremonial mt-3 opacity-25" style={{ fontSize: "0.5rem", letterSpacing: "2px" }}>
              📑 ID: #2026-05-15-GOLD · 🛡️ GPG-SIGNIERT · EU-UN-USA MASTER-NODES · ZERO-TRUST
            </p>
          </div>
        </div>
      </section>

      {/* ── CHARTA ── */}
      <section className="px-6 mb-16">
        <div className="max-w-3xl mx-auto">
          <div
            className="text-center p-10"
            style={{ background: "rgba(212,175,55,0.03)", border: "1px solid var(--border-gold)", position: "relative", overflow: "hidden" }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #d4af37, transparent)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #d4af37, transparent)" }} />
            <p className="font-ceremonial opacity-30 mb-4" style={{ fontSize: "0.55rem", letterSpacing: "4px" }}>
              CHARTA DER KOLLEKTIVEN KORALITÄT
            </p>
            <blockquote className="font-quote text-gold mb-6" style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)", lineHeight: 1.8 }}>
              „Prävention durch kollektives Gedächtnis. Jede Stimme zählt. Jede Geschichte ist wichtig. Das System macht es technologisch unmöglich, den Einzelnen zu übersehen oder die Fehler der Vergangenheit zu wiederholen."
            </blockquote>
            <p className="font-ceremonial opacity-30" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
              ✦ HEILIGES JAHR 2026 — PILGER DER HOFFNUNG — GOTTES HEILENDER PFAD ✦
            </p>
          </div>
        </div>
      </section>

      {/* ── NAVIGATION ── */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <p className="font-ceremonial text-center opacity-40 mb-8" style={{ fontSize: "0.6rem", letterSpacing: "4px" }}>
            DIREKT-NAVIGATION
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { label: "Landing Page",        href: "/",                         color: "#d4af37" },
              { label: "Login",               href: "/login",                    color: "#d4af37" },
              { label: "Super Admin",         href: "/admin",                    color: "#7c3aed" },
              { label: "Gießfass",            href: "/admin/giessfast",          color: "#7c3aed" },
              { label: "Resonanz-Bilanz",     href: "/admin/resonanz",           color: "#7c3aed" },
              { label: "Mentor-Vetting",      href: "/admin/mentors",            color: "#00bcd4" },
              { label: "Junior-Schutz",       href: "/admin/junior-safety",      color: "#00bcd4" },
              { label: "Pilger-Portal",       href: "/portal",                   color: "#4caf7d" },
              { label: "Resonanz-Feed",       href: "/portal/news",              color: "#4caf7d" },
              { label: "Fürbitte einreichen", href: "/portal/petition/new",      color: "#4caf7d" },
              { label: "Eltern-Passage",      href: "/portal/guardian",          color: "#e67e22" },
              { label: "Family Orbit",        href: "/portal/guardian/family-orbit", color: "#e67e22" },
              { label: "Alters-Transition",   href: "/portal/guardian/transition",  color: "#e67e22" },
              { label: "Junior Mesh",         href: "/portal/junior",            color: "#64b4ff" },
              { label: "ShineHealthCare",     href: "/shinehealthcare",          color: "#d4af37" },
              { label: "Bedeutungs-Archiv",   href: "/portal/stories",           color: "#4caf7d" },
              { label: "Hallo sagen",         href: "/portal/vacancies",         color: "#4caf7d" },
              { label: "Willkommen Ursprung", href: "/portal/welcome",           color: "#d4af37" },
              { label: "Kind einladen",       href: "/portal/guardian/invite",   color: "#e67e22" },
              { label: "Wunschpakt",          href: "/portal/wishes",            color: "#d4af37" },
              { label: "Transition-Radar",    href: "/admin/transition-radar",   color: "#7c3aed" },
              { label: "Silent Inclusion",    href: "/admin/inclusion",          color: "#7c3aed" },
              { label: "Leitanker-Portal",    href: "/portal/leitanker",         color: "#d4af37" },
              { label: "Golden Archive",      href: "/portal/stories/pool",      color: "#4caf7d" },
              { label: "Fürbitte-Hub",        href: "/portal/furbitte",          color: "#00bcd4" },
              { label: "Charta der Würde",    href: "/portal/charta",            color: "#d4af37" },
              { label: "Genesis-Moment",      href: "/portal/welcome-origin",    color: "#d4af37" },
              { label: "Wunschbrunnen 🌊",    href: "/portal/wunschbrunnen",     color: "#00e5ff" },
              { label: "Cosmic Splitscreen",  href: "/portal/splitscreen",       color: "#9b59ff" },
              { label: "Meine Fürbitten",     href: "/portal/petitions",         color: "#4caf7d" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-center py-3 px-2 transition-all"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${link.color}30`,
                  borderTop: `2px solid ${link.color}60`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
                onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = `${link.color}12`; }}
                onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"; }}
              >
                <span className="font-ceremonial" style={{ fontSize: "0.6rem", letterSpacing: "1.5px", color: link.color }}>
                  {link.label}
                </span>
                <span className="font-ceremonial opacity-25" style={{ fontSize: "0.5rem", letterSpacing: "1px" }}>
                  {link.href}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center pb-10 px-6" style={{ borderTop: "1px solid var(--border-gold)", paddingTop: "2rem" }}>
        <p className="font-ceremonial opacity-20" style={{ fontSize: "0.55rem", letterSpacing: "2px" }}>
          🛡️ ZERO-TRUST ARCHITEKTUR &nbsp;·&nbsp; 🌍 GLOBAL MESH AKTIV &nbsp;·&nbsp; 🔑 SOVEREIGN ID SYSTEM &nbsp;·&nbsp; ✦ 432 Hz
        </p>
      </footer>

    </main>
  );
}
