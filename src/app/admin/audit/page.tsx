import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminAuditPage() {
  const session = await auth();
  const user = session?.user as any;
  if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "TENANT_ADMIN")) redirect("/login");

  const rawLogs = await prisma.dsgvoAuditLog.findMany({
    orderBy: { performedAt: "desc" },
    take: 50,
  });

  const userIds = [...new Set(rawLogs.map(l => l.userId).filter(Boolean))] as string[];
  const usersMap = new Map(
    (await prisma.user.findMany({ where: { id: { in: userIds } }, select: { id: true, name: true, email: true } }))
      .map(u => [u.id, u])
  );
  const logs = rawLogs.map(l => ({ ...l, user: l.userId ? usersMap.get(l.userId) || null : null }));

  const actionColor: Record<string, string> = {
    USER_CREATED: "#4caf7d", LOGIN: "#00bcd4", CONSENT_GIVEN: "#d4af37",
    DATA_EXPORT: "#7c3aed", DATA_DELETE: "#ff6b6b", PETITION_CREATED: "#4caf7d",
  };

  return (
    <main style={{ minHeight: "100vh", padding: "2rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "2.5rem" }}>
        <Link href="/admin" style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.55rem", letterSpacing: "3px", color: "rgba(212,175,55,0.4)", textDecoration: "none" }}>
          ← ADMIN TERMINAL
        </Link>
        <h1 style={{ fontFamily: "var(--font-ceremonial)", fontSize: "2rem", color: "#7c3aed", letterSpacing: "0.08em", marginTop: "0.5rem", textShadow: "0 0 30px rgba(124,58,237,0.3)" }}>
          ◇ DSGVO Audit-Log
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(249,241,215,0.4)", marginTop: "0.3rem" }}>
          Vollständige Transparenz aller datenschutzrelevanten Aktionen — {logs.length} Einträge
        </p>
      </header>

      {/* Audit-Tabelle */}
      <div style={{ background: "rgba(6,8,14,0.85)", border: "1px solid rgba(124,58,237,0.15)", borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1.5fr 2fr 1.5fr", padding: "0.8rem 1.2rem", borderBottom: "1px solid rgba(124,58,237,0.1)", gap: "0.5rem" }}>
          {["ZEITPUNKT", "BENUTZER", "AKTION", "DETAIL"].map(h => (
            <div key={h} style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.5rem", letterSpacing: "2px", color: "rgba(124,58,237,0.5)" }}>{h}</div>
          ))}
        </div>
        {logs.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.65rem", letterSpacing: "2px", opacity: 0.4 }}>Keine Audit-Einträge vorhanden</p>
          </div>
        ) : (
          logs.map((log, i) => (
            <div key={log.id} style={{
              display: "grid", gridTemplateColumns: "1.5fr 1.5fr 2fr 1.5fr", padding: "0.7rem 1.2rem",
              borderBottom: i < logs.length - 1 ? "1px solid rgba(124,58,237,0.05)" : "none",
              gap: "0.5rem", alignItems: "center",
            }}>
              <div style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "rgba(249,241,215,0.4)" }}>
                {new Date(log.performedAt).toLocaleString("de-DE", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" })}
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(249,241,215,0.5)" }}>
                {log.user?.name || log.user?.email || (log.userId ? log.userId.slice(0, 8) + "…" : "System")}
              </div>
              <div>
                <span style={{
                  display: "inline-block", padding: "2px 8px", borderRadius: "4px",
                  fontSize: "0.55rem", fontFamily: "var(--font-ceremonial)", letterSpacing: "1px",
                  background: `${actionColor[log.action] || "#888"}20`,
                  color: actionColor[log.action] || "#888",
                  border: `1px solid ${actionColor[log.action] || "#888"}30`,
                }}>{log.action}</span>
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(249,241,215,0.3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {log.detail || "—"}
              </div>
            </div>
          ))
        )}
      </div>

      <footer style={{ textAlign: "center", marginTop: "3rem", paddingTop: "1rem", borderTop: "1px solid rgba(124,58,237,0.08)" }}>
        <p style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.5rem", letterSpacing: "2px", color: "rgba(124,58,237,0.25)" }}>
          DSGVO ART. 30 &nbsp;·&nbsp; VERARBEITUNGSVERZEICHNIS &nbsp;·&nbsp; REVISIONSSICHER
        </p>
      </footer>
    </main>
  );
}
