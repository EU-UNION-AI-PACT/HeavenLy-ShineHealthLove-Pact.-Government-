import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminUsersPage() {
  const session = await auth();
  const user = session?.user as any;
  if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "TENANT_ADMIN")) redirect("/login");

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, role: true, sovereignId: true, isActive: true, createdAt: true, countryCode: true },
  });

  const roleCounts = {
    SUPER_ADMIN: users.filter(u => u.role === "SUPER_ADMIN").length,
    TENANT_ADMIN: users.filter(u => u.role === "TENANT_ADMIN").length,
    PILGRIM: users.filter(u => u.role === "PILGRIM").length,
    PARENT: users.filter(u => u.role === "PARENT").length,
    JUNIOR: users.filter(u => u.role === "JUNIOR").length,
  };

  const roleColor: Record<string, string> = {
    SUPER_ADMIN: "#7c3aed", TENANT_ADMIN: "#00bcd4", PILGRIM: "#d4af37", PARENT: "#e67e22", JUNIOR: "#ff6b6b",
  };

  return (
    <main style={{ minHeight: "100vh", padding: "2rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "2.5rem" }}>
        <Link href="/admin" style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.55rem", letterSpacing: "3px", color: "rgba(212,175,55,0.4)", textDecoration: "none" }}>
          ← ADMIN TERMINAL
        </Link>
        <h1 style={{ fontFamily: "var(--font-ceremonial)", fontSize: "2rem", color: "#d4af37", letterSpacing: "0.08em", marginTop: "0.5rem", textShadow: "0 0 30px rgba(212,175,55,0.3)" }}>
          ✦ Globale Benutzer
        </h1>
      </header>

      {/* Rollen-Statistiken */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.8rem", marginBottom: "2rem" }}>
        {Object.entries(roleCounts).map(([role, count]) => (
          <div key={role} style={{ background: "rgba(6,8,14,0.85)", border: `1px solid ${roleColor[role]}30`, borderRadius: "10px", padding: "1rem", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-ceremonial)", fontSize: "1.8rem", color: roleColor[role], lineHeight: 1 }}>{count}</div>
            <div style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.5rem", letterSpacing: "1.5px", opacity: 0.5, marginTop: "0.3rem" }}>{role}</div>
          </div>
        ))}
      </div>

      {/* User-Tabelle */}
      <div style={{ background: "rgba(6,8,14,0.85)", border: "1px solid rgba(212,175,55,0.12)", borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1.5fr 1fr 1fr", padding: "0.8rem 1.2rem", borderBottom: "1px solid rgba(212,175,55,0.1)", gap: "0.5rem" }}>
          {["NAME", "EMAIL", "ROLLE", "SOVEREIGN ID", "LAND", "STATUS"].map(h => (
            <div key={h} style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.5rem", letterSpacing: "2px", color: "rgba(212,175,55,0.4)" }}>{h}</div>
          ))}
        </div>
        {users.map((u, i) => (
          <Link key={u.id} href={`/admin/users/${u.id}`} style={{
            display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1.5fr 1fr 1fr", padding: "0.8rem 1.2rem",
            borderBottom: i < users.length - 1 ? "1px solid rgba(212,175,55,0.05)" : "none",
            gap: "0.5rem", alignItems: "center", textDecoration: "none", transition: "background 0.15s",
          }}>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "#f9f1d7" }}>{u.name || "—"}</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(249,241,215,0.4)" }}>{u.email || "—"}</div>
            <div>
              <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: "4px", fontSize: "0.55rem", fontFamily: "var(--font-ceremonial)", letterSpacing: "1px", background: `${roleColor[u.role]}20`, color: roleColor[u.role], border: `1px solid ${roleColor[u.role]}30` }}>
                {u.role}
              </span>
            </div>
            <div style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "rgba(249,241,215,0.3)" }}>{u.sovereignId || "—"}</div>
            <div style={{ fontSize: "0.85rem", opacity: 0.5 }}>{u.countryCode || "—"}</div>
            <div>
              <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: u.isActive ? "#4caf7d" : "#ff4444", boxShadow: u.isActive ? "0 0 6px #4caf7d80" : "0 0 6px #ff444480" }} />
            </div>
          </Link>
        ))}
      </div>

      <footer style={{ textAlign: "center", marginTop: "3rem", paddingTop: "1rem", borderTop: "1px solid rgba(212,175,55,0.08)" }}>
        <p style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.5rem", letterSpacing: "2px", color: "rgba(212,175,55,0.2)" }}>
          {users.length} BENUTZER GESAMT &nbsp;·&nbsp; DSGVO-COMPLIANT
        </p>
      </footer>
    </main>
  );
}
