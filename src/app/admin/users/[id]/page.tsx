import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const me = session?.user as any;
  if (!me || (me.role !== "SUPER_ADMIN" && me.role !== "TENANT_ADMIN")) redirect("/login");

  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      petitions: { select: { id: true, title: true, status: true, createdAt: true }, orderBy: { createdAt: "desc" }, take: 10 },
      tenant: { select: { id: true, name: true, slug: true } },
      childLinks: { include: { child: { select: { id: true, name: true } } } },
      parentLink: { include: { parent: { select: { id: true, name: true, email: true } } } },
    },
  });

  if (!user) notFound();

  const roleColor: Record<string, string> = { SUPER_ADMIN: "#7c3aed", TENANT_ADMIN: "#00bcd4", PILGRIM: "#d4af37", PARENT: "#e67e22", JUNIOR: "#ff6b6b" };
  const statusColor: Record<string, string> = { HOFFNUNG: "#d4af37", HEILUNG: "#4caf7d", GEWISSHEIT: "#00bcd4" };
  const card: React.CSSProperties = { background: "rgba(6,8,14,0.85)", border: "1px solid rgba(212,175,55,0.12)", borderRadius: "12px", padding: "1.5rem" };
  const sectionTitle: React.CSSProperties = { fontFamily: "var(--font-ceremonial)", fontSize: "0.65rem", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(212,175,55,0.5)", marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(212,175,55,0.08)" };

  const auditLogs = await prisma.dsgvoAuditLog.findMany({
    where: { userId: user.id },
    orderBy: { performedAt: "desc" },
    take: 10,
  });

  return (
    <main style={{ minHeight: "100vh", padding: "2rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>

      {/* HEADER */}
      <header style={{ marginBottom: "2.5rem" }}>
        <Link href="/admin/users" style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.55rem", letterSpacing: "3px", color: "rgba(212,175,55,0.4)", textDecoration: "none" }}>
          ← BENUTZER
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.8rem", flexWrap: "wrap" }}>
          <h1 style={{ fontFamily: "var(--font-ceremonial)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "#d4af37", letterSpacing: "0.06em", margin: 0 }}>
            {user.name || user.email || "Anonym"}
          </h1>
          <span style={{ padding: "3px 10px", borderRadius: "6px", fontSize: "0.55rem", fontFamily: "var(--font-ceremonial)", letterSpacing: "1px", background: `${roleColor[user.role]}20`, color: roleColor[user.role], border: `1px solid ${roleColor[user.role]}30` }}>
            {user.role}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "0.75rem", color: user.isActive ? "#4caf7d" : "#ff4444" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: user.isActive ? "#4caf7d" : "#ff4444", boxShadow: user.isActive ? "0 0 6px #4caf7d80" : "none", display: "inline-block" }} />
            {user.isActive ? "Aktiv" : "Inaktiv"}
          </span>
        </div>
      </header>

      {/* PROFIL-DATEN */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
        {[
          { label: "Email", value: user.email || "—" },
          { label: "Sovereign ID", value: user.sovereignId || "—", mono: true },
          { label: "Land", value: user.countryCode || "—" },
          { label: "Tenant", value: user.tenant?.name || "Kein Tenant" },
          { label: "Erstellt", value: new Date(user.createdAt).toLocaleString("de-DE") },
          { label: "Consent", value: user.consentGivenAt ? new Date(user.consentGivenAt).toLocaleDateString("de-DE") + " (v" + (user.consentVersion || "?") + ")" : "—" },
          { label: "Mentor-Ready", value: user.isMentorReady ? "Ja" : "Nein" },
          { label: "Verifizierter Mentor", value: user.isVerifiedMentor ? "Ja" : "Nein" },
        ].map((f) => (
          <div key={f.label} style={{ ...card, padding: "1rem" }}>
            <div style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.5rem", letterSpacing: "2px", color: "rgba(212,175,55,0.4)", marginBottom: "0.3rem" }}>{f.label.toUpperCase()}</div>
            <div style={{ fontFamily: f.mono ? "monospace" : "var(--font-body)", fontSize: "0.85rem", color: "#f9f1d7", wordBreak: "break-all" }}>{f.value}</div>
          </div>
        ))}
      </div>

      {/* DSGVO-STATUS */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={sectionTitle}>🛡️ DSGVO-Status</h2>
        <div style={{ ...card, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
          {[
            { label: "Gelöscht am", value: user.deletedAt ? new Date(user.deletedAt).toLocaleDateString("de-DE") : "—", color: user.deletedAt ? "#ff6b6b" : "#4caf7d" },
            { label: "Anonymisiert am", value: user.anonymizedAt ? new Date(user.anonymizedAt).toLocaleDateString("de-DE") : "—", color: user.anonymizedAt ? "#e67e22" : "#4caf7d" },
            { label: "Datenminimiert", value: user.dataMinimized ? "Ja" : "Nein", color: user.dataMinimized ? "#e67e22" : "#4caf7d" },
            { label: "Portabilität angefragt", value: user.portabilityRequestedAt ? new Date(user.portabilityRequestedAt).toLocaleDateString("de-DE") : "—", color: user.portabilityRequestedAt ? "#7c3aed" : "#4caf7d" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.5rem", letterSpacing: "1.5px", color: "rgba(249,241,215,0.4)", marginBottom: "0.2rem" }}>{s.label.toUpperCase()}</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ELTERN-KIND-BINDUNGEN */}
      {(user.childLinks.length > 0 || user.parentLink) && (
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={sectionTitle}>♦ Familien-Bindungen</h2>
          <div style={card}>
            {user.childLinks.length > 0 && (
              <div style={{ marginBottom: "1rem" }}>
                <div style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.55rem", letterSpacing: "1.5px", color: "#e67e22", marginBottom: "0.5rem" }}>KINDER</div>
                {user.childLinks.map((link) => (
                  <Link key={link.child.id} href={`/admin/users/${link.child.id}`} style={{ display: "block", padding: "0.4rem 0", color: "#f9f1d7", textDecoration: "none", fontSize: "0.9rem" }}>
                    → {link.child.name || "Junior"}
                  </Link>
                ))}
              </div>
            )}
            {user.parentLink && (
              <div>
                <div style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.55rem", letterSpacing: "1.5px", color: "#7c3aed", marginBottom: "0.5rem" }}>ELTERN</div>
                <Link href={`/admin/users/${user.parentLink.parent.id}`} style={{ display: "block", padding: "0.4rem 0", color: "#f9f1d7", textDecoration: "none", fontSize: "0.9rem" }}>
                  ← {user.parentLink.parent.name || user.parentLink.parent.email || "Elternteil"}
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* FÜRBITTEN */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={sectionTitle}>◈ Fürbitten ({user.petitions.length})</h2>
        <div style={{ ...card, padding: 0, overflow: "hidden" }}>
          {user.petitions.length === 0 ? (
            <div style={{ padding: "2rem", textAlign: "center", opacity: 0.4, fontFamily: "var(--font-ceremonial)", fontSize: "0.65rem", letterSpacing: "2px" }}>
              Keine Fürbitten von diesem Benutzer
            </div>
          ) : (
            user.petitions.map((p, i) => (
              <Link key={p.id} href={`/admin/petitions/${p.id}`} style={{ textDecoration: "none",
                display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.8rem 1.2rem",
                borderBottom: i < user.petitions.length - 1 ? "1px solid rgba(212,175,55,0.04)" : "none",
              }}>
                <div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "#f9f1d7" }}>{p.title}</div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(249,241,215,0.3)", marginTop: "2px" }}>{new Date(p.createdAt).toLocaleDateString("de-DE")}</div>
                </div>
                <span style={{ padding: "3px 10px", borderRadius: "4px", fontSize: "0.55rem", fontFamily: "var(--font-ceremonial)", background: `${statusColor[p.status]}20`, color: statusColor[p.status] }}>{p.status}</span>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* AUDIT-LOG */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={sectionTitle}>◇ Audit-Log</h2>
        <div style={{ ...card, padding: 0, overflow: "hidden" }}>
          {auditLogs.length === 0 ? (
            <div style={{ padding: "2rem", textAlign: "center", opacity: 0.4, fontFamily: "var(--font-ceremonial)", fontSize: "0.65rem", letterSpacing: "2px" }}>
              Keine Audit-Einträge
            </div>
          ) : (
            auditLogs.map((log, i) => (
              <div key={log.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.7rem 1.2rem", borderBottom: i < auditLogs.length - 1 ? "1px solid rgba(124,58,237,0.04)" : "none" }}>
                <div>
                  <span style={{ padding: "2px 8px", borderRadius: "4px", fontSize: "0.5rem", fontFamily: "var(--font-ceremonial)", letterSpacing: "1px", background: "rgba(124,58,237,0.15)", color: "#7c3aed" }}>{log.action}</span>
                  <span style={{ marginLeft: "0.8rem", fontSize: "0.8rem", color: "rgba(249,241,215,0.4)" }}>{log.detail || "—"}</span>
                </div>
                <div style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "rgba(249,241,215,0.3)", flexShrink: 0 }}>
                  {new Date(log.performedAt).toLocaleString("de-DE", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <footer style={{ textAlign: "center", paddingTop: "1rem", borderTop: "1px solid rgba(212,175,55,0.08)" }}>
        <p style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.5rem", letterSpacing: "2px", color: "rgba(212,175,55,0.2)" }}>
          USER DETAIL &nbsp;·&nbsp; {user.id.slice(0, 16)}… &nbsp;·&nbsp; DSGVO-COMPLIANT
        </p>
      </footer>
    </main>
  );
}
