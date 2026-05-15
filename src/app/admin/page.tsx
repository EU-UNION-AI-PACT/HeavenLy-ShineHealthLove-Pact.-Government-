import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const session = await auth();
  const user = session?.user as any;

  if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "TENANT_ADMIN")) redirect("/login");

  const [tenantCount, userCount, petitionCount, auditCount, recentUsers, recentPetitions] = await Promise.all([
    prisma.tenant.count(),
    prisma.user.count(),
    prisma.petition.count(),
    prisma.dsgvoAuditLog.count(),
    prisma.user.findMany({ take: 5, orderBy: { createdAt: "desc" }, select: { id: true, name: true, email: true, role: true, createdAt: true } }),
    prisma.petition.findMany({ take: 5, orderBy: { createdAt: "desc" }, select: { id: true, title: true, status: true, createdAt: true } }),
  ]);

  const juniorCount = await prisma.user.count({ where: { role: "JUNIOR" } });
  const parentCount = await prisma.user.count({ where: { role: "PARENT" } });

  const S: Record<string, any> = {
    card: {
      background: "rgba(6,8,14,0.85)",
      border: "1px solid rgba(212,175,55,0.15)",
      borderRadius: "12px",
      padding: "1.5rem",
      transition: "all 0.3s ease",
    },
    cardHover: {
      background: "rgba(6,8,14,0.95)",
      border: "1px solid rgba(212,175,55,0.3)",
      boxShadow: "0 0 30px rgba(212,175,55,0.05)",
    },
    metric: {
      background: "rgba(6,8,14,0.85)",
      border: "1px solid rgba(212,175,55,0.12)",
      borderRadius: "12px",
      padding: "1.5rem 1rem",
      textAlign: "center" as const,
    },
    section: { marginBottom: "2.5rem" },
    sectionTitle: {
      fontFamily: "var(--font-ceremonial)",
      fontSize: "0.65rem",
      letterSpacing: "3px",
      textTransform: "uppercase" as const,
      color: "rgba(212,175,55,0.5)",
      marginBottom: "1rem",
      paddingBottom: "0.5rem",
      borderBottom: "1px solid rgba(212,175,55,0.08)",
    },
    badge: (color: string) => ({
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: "4px",
      fontSize: "0.6rem",
      fontFamily: "var(--font-ceremonial)",
      letterSpacing: "1px",
      background: `${color}20`,
      color: color,
      border: `1px solid ${color}30`,
    }),
  };

  const NAV_CARDS = [
    { href: "/admin/tenants", icon: "⬡", color: "#00bcd4", label: "Tenant-Verwaltung", desc: "Pfarreien, Diözesen & Knoten", count: tenantCount },
    { href: "/admin/users", icon: "✦", color: "#d4af37", label: "Globale Benutzer", desc: "Pilger, Eltern & Juniors", count: userCount },
    { href: "/admin/petitions", icon: "◈", color: "#4caf7d", label: "Fürbitten & Wünsche", desc: "Eingereichte Petitionen", count: petitionCount },
    { href: "/admin/junior-safety", icon: "🛡️", color: "#e67e22", label: "Junior-Schutz-Zentrale", desc: "Echtzeit-Schutz-Monitor für Minderjährige", count: juniorCount },
    { href: "/admin/mentors", icon: "⚡", color: "#00e5ff", label: "Mentor-Validierung", desc: "COPPA/DSGVO-geprüfte Mentoren-Liste", count: null },
    { href: "/admin/audit", icon: "◇", color: "#7c3aed", label: "DSGVO Audit-Log", desc: "Compliance & Transparenz", count: auditCount },
    { href: "/admin/resonanz", icon: "◈", color: "#d4af37", label: "Resonanz-Bilanz", desc: "Tagesbericht 00:00 UTC — Welt-Allianz", count: null },
    { href: "/admin/bridge", icon: "⊹", color: "#d4af37", label: "Berufungs-Brücke", desc: "Ikigai-Monitor · Anonymer Chat · Bridge", count: null },
    { href: "/admin/giessfast", icon: "⬡", color: "#e67e22", label: "Gießfass-Dashboard", desc: "Alchemistischer Reaktor — Das Alte wird Gold", count: null },
    { href: "/admin/transition-radar", icon: "🌐", color: "#00bcd4", label: "Transition-Radar", desc: "Junior → Sovereign — 5-Punkte-Sicherheit", count: null },
    { href: "/admin/inclusion", icon: "🛡️", color: "#7c3aed", label: "Silent Inclusion", desc: "Stigma-Shield — Behörden-Intentions-Matrix", count: null },
    { href: "/admin/sovereign-ids", icon: "🌍", color: "#4caf7d", label: "Sovereign IDs", desc: "ID-GLB / ID-JNR — Globale Identitäten", count: null },
  ];

  return (
    <main style={{ minHeight: "100vh", padding: "2rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>

      {/* ── HEADER ── */}
      <header style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.55rem", letterSpacing: "4px", color: "rgba(212,175,55,0.4)", marginBottom: "0.5rem", textTransform: "uppercase" }}>
              ◈ Admin Terminal — {user.role === "SUPER_ADMIN" ? "SUPER ADMIN" : "TENANT ADMIN"}
            </p>
            <h1 style={{ fontFamily: "var(--font-ceremonial)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#d4af37", letterSpacing: "0.08em", textShadow: "0 0 30px rgba(212,175,55,0.3)", margin: 0 }}>
              GloryaShine — Welt-Zentrale
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "rgba(249,241,215,0.5)", fontStyle: "italic", marginTop: "0.5rem" }}>
              {user.email} &nbsp;·&nbsp; Letzte Anmeldung: {new Date().toLocaleString("de-DE", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Link href="/" style={{ ...S.card, padding: "0.5rem 1rem", textDecoration: "none", fontFamily: "var(--font-ceremonial)", fontSize: "0.55rem", letterSpacing: "1px", color: "rgba(249,241,215,0.5)" }}>
              ← STARTSEITE
            </Link>
            <Link href="/portal" style={{ ...S.card, padding: "0.5rem 1rem", textDecoration: "none", fontFamily: "var(--font-ceremonial)", fontSize: "0.55rem", letterSpacing: "1px", color: "#d4af37" }}>
              PORTAL →
            </Link>
          </div>
        </div>
      </header>

      {/* ── LIVE METRIKEN ── */}
      <section style={S.section}>
        <h2 style={S.sectionTitle}>◈ Live-Metriken</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
          {[
            { label: "Tenants", value: tenantCount, color: "#00bcd4", icon: "⬡" },
            { label: "Benutzer", value: userCount, color: "#d4af37", icon: "✦" },
            { label: "Fürbitten", value: petitionCount, color: "#4caf7d", icon: "◈" },
            { label: "Eltern", value: parentCount, color: "#e67e22", icon: "♦" },
            { label: "Juniors", value: juniorCount, color: "#ff6b6b", icon: "🛡️" },
            { label: "Audit-Logs", value: auditCount, color: "#7c3aed", icon: "◇" },
          ].map((m) => (
            <div key={m.label} style={S.metric}>
              <div style={{ fontSize: "0.8rem", opacity: 0.5, marginBottom: "0.3rem" }}>{m.icon}</div>
              <div style={{ fontFamily: "var(--font-ceremonial)", fontSize: "2.2rem", color: m.color, lineHeight: 1, textShadow: `0 0 20px ${m.color}40` }}>
                {m.value}
              </div>
              <div style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.5rem", letterSpacing: "2px", opacity: 0.45, marginTop: "0.4rem", textTransform: "uppercase" }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NAVIGATION CARDS ── */}
      <section style={S.section}>
        <h2 style={S.sectionTitle}>⬡ Verwaltungsbereiche</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
          {NAV_CARDS.map((c) => (
            <Link key={c.href} href={c.href} style={{ ...S.card, textDecoration: "none", display: "flex", alignItems: "center", gap: "1.2rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "10px", background: `${c.color}15`, border: `1px solid ${c.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>
                {c.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.7rem", letterSpacing: "1.5px", color: "#f9f1d7", textTransform: "uppercase" }}>
                  {c.label}
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(249,241,215,0.4)", marginTop: "2px" }}>
                  {c.desc}
                </div>
              </div>
              {c.count !== null && (
                <div style={{ fontFamily: "var(--font-ceremonial)", fontSize: "1.4rem", color: c.color, opacity: 0.8 }}>
                  {c.count}
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* ── LETZTE AKTIVITÄTEN ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem" }}>

        {/* Letzte Benutzer */}
        <section style={S.section}>
          <h2 style={S.sectionTitle}>✦ Letzte Benutzer</h2>
          <div style={{ ...S.card, padding: 0, overflow: "hidden" }}>
            {recentUsers.length === 0 ? (
              <div style={{ padding: "2rem", textAlign: "center", opacity: 0.4, fontFamily: "var(--font-ceremonial)", fontSize: "0.65rem", letterSpacing: "2px" }}>
                Noch keine Benutzer
              </div>
            ) : (
              recentUsers.map((u, i) => (
                <div key={u.id} style={{
                  padding: "0.9rem 1.2rem",
                  borderBottom: i < recentUsers.length - 1 ? "1px solid rgba(212,175,55,0.06)" : "none",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "#f9f1d7" }}>
                      {u.name || u.email || "Anonym"}
                    </div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(249,241,215,0.35)", marginTop: "2px" }}>
                      {u.email}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={S.badge(
                      u.role === "SUPER_ADMIN" ? "#7c3aed" :
                      u.role === "TENANT_ADMIN" ? "#00bcd4" :
                      u.role === "PARENT" ? "#e67e22" :
                      u.role === "JUNIOR" ? "#ff6b6b" : "#d4af37"
                    )}>{u.role}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Letzte Fürbitten */}
        <section style={S.section}>
          <h2 style={S.sectionTitle}>◈ Letzte Fürbitten</h2>
          <div style={{ ...S.card, padding: 0, overflow: "hidden" }}>
            {recentPetitions.length === 0 ? (
              <div style={{ padding: "2rem", textAlign: "center", opacity: 0.4, fontFamily: "var(--font-ceremonial)", fontSize: "0.65rem", letterSpacing: "2px" }}>
                Noch keine Fürbitten
              </div>
            ) : (
              recentPetitions.map((p, i) => (
                <div key={p.id} style={{
                  padding: "0.9rem 1.2rem",
                  borderBottom: i < recentPetitions.length - 1 ? "1px solid rgba(212,175,55,0.06)" : "none",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "#f9f1d7" }}>
                      {p.title}
                    </div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "rgba(249,241,215,0.3)", marginTop: "2px" }}>
                      {new Date(p.createdAt).toLocaleDateString("de-DE")}
                    </div>
                  </div>
                  <span style={S.badge(
                    p.status === "HOFFNUNG" ? "#d4af37" :
                    p.status === "HEILUNG" ? "#4caf7d" : "#00bcd4"
                  )}>{p.status}</span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* ── SYSTEM STATUS ── */}
      <section style={{ ...S.section, marginTop: "1rem" }}>
        <h2 style={S.sectionTitle}>⊕ System-Status</h2>
        <div style={{ ...S.card, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
          {[
            { label: "Datenbank", status: "Online", color: "#4caf7d" },
            { label: "DSGVO-Engine", status: "Aktiv", color: "#4caf7d" },
            { label: "Mesh-Netzwerk", status: "Verbunden", color: "#00bcd4" },
            { label: "Junior-Shield", status: "Bewaffnet", color: "#e67e22" },
          ].map((s) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: s.color, boxShadow: `0 0 8px ${s.color}80` }} />
              <div>
                <div style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.6rem", letterSpacing: "1.5px", color: "rgba(249,241,215,0.5)", textTransform: "uppercase" }}>{s.label}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: s.color }}>{s.status}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ textAlign: "center", marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(212,175,55,0.08)" }}>
        <p style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.5rem", letterSpacing: "2px", color: "rgba(212,175,55,0.25)" }}>
          🛡️ ADMIN TERMINAL &nbsp;·&nbsp; ZERO-TRUST ARCHITECTURE &nbsp;·&nbsp; DSGVO-COMPLIANT &nbsp;·&nbsp; 🌍 GLOBAL MESH ACTIVE
        </p>
      </footer>
    </main>
  );
}
