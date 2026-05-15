import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function SovereignIDsPage() {
  const session = await auth();
  const user = session?.user as any;
  if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "TENANT_ADMIN")) redirect("/login");

  const usersWithIds = await prisma.user.findMany({
    where: { sovereignId: { not: null } },
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, sovereignId: true, role: true, countryCode: true, createdAt: true },
  });

  const totalUsers = await prisma.user.count();
  const withId = usersWithIds.length;
  const coverage = totalUsers > 0 ? Math.round((withId / totalUsers) * 100) : 0;

  const roleColor: Record<string, string> = {
    SUPER_ADMIN: "#7c3aed", TENANT_ADMIN: "#00bcd4", PILGRIM: "#d4af37", PARENT: "#e67e22", JUNIOR: "#ff6b6b",
  };

  return (
    <main style={{ minHeight: "100vh", padding: "2rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "2.5rem" }}>
        <Link href="/admin" style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.55rem", letterSpacing: "3px", color: "rgba(212,175,55,0.4)", textDecoration: "none" }}>
          ← ADMIN TERMINAL
        </Link>
        <h1 style={{ fontFamily: "var(--font-ceremonial)", fontSize: "2rem", color: "#4caf7d", letterSpacing: "0.08em", marginTop: "0.5rem", textShadow: "0 0 30px rgba(76,175,125,0.3)" }}>
          🌍 Sovereign IDs
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(249,241,215,0.4)", marginTop: "0.3rem" }}>
          Globale Identitäten — ID-GLB / ID-JNR
        </p>
      </header>

      {/* Metriken */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ background: "rgba(6,8,14,0.85)", border: "1px solid rgba(76,175,125,0.2)", borderRadius: "10px", padding: "1.2rem", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-ceremonial)", fontSize: "2rem", color: "#4caf7d", lineHeight: 1 }}>{withId}</div>
          <div style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.5rem", letterSpacing: "2px", opacity: 0.5, marginTop: "0.3rem" }}>MIT SOVEREIGN ID</div>
        </div>
        <div style={{ background: "rgba(6,8,14,0.85)", border: "1px solid rgba(212,175,55,0.2)", borderRadius: "10px", padding: "1.2rem", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-ceremonial)", fontSize: "2rem", color: "#d4af37", lineHeight: 1 }}>{totalUsers}</div>
          <div style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.5rem", letterSpacing: "2px", opacity: 0.5, marginTop: "0.3rem" }}>GESAMT BENUTZER</div>
        </div>
        <div style={{ background: "rgba(6,8,14,0.85)", border: "1px solid rgba(0,188,212,0.2)", borderRadius: "10px", padding: "1.2rem", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-ceremonial)", fontSize: "2rem", color: "#00bcd4", lineHeight: 1 }}>{coverage}%</div>
          <div style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.5rem", letterSpacing: "2px", opacity: 0.5, marginTop: "0.3rem" }}>ABDECKUNG</div>
        </div>
      </div>

      {/* ID-Tabelle */}
      <div style={{ background: "rgba(6,8,14,0.85)", border: "1px solid rgba(76,175,125,0.12)", borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 2fr 1fr 1fr", padding: "0.8rem 1.2rem", borderBottom: "1px solid rgba(76,175,125,0.1)", gap: "0.5rem" }}>
          {["SOVEREIGN ID", "NAME", "EMAIL", "ROLLE", "LAND"].map(h => (
            <div key={h} style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.5rem", letterSpacing: "2px", color: "rgba(76,175,125,0.5)" }}>{h}</div>
          ))}
        </div>
        {usersWithIds.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🌍</div>
            <p style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.65rem", letterSpacing: "2px", opacity: 0.4 }}>Noch keine Sovereign IDs vergeben</p>
          </div>
        ) : (
          usersWithIds.map((u, i) => (
            <div key={u.id} style={{
              display: "grid", gridTemplateColumns: "2fr 1.5fr 2fr 1fr 1fr", padding: "0.7rem 1.2rem",
              borderBottom: i < usersWithIds.length - 1 ? "1px solid rgba(76,175,125,0.05)" : "none",
              gap: "0.5rem", alignItems: "center",
            }}>
              <div style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#4caf7d" }}>{u.sovereignId}</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "#f9f1d7" }}>{u.name || "—"}</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(249,241,215,0.4)" }}>{u.email || "—"}</div>
              <div>
                <span style={{ display: "inline-block", padding: "2px 6px", borderRadius: "4px", fontSize: "0.5rem", fontFamily: "var(--font-ceremonial)", letterSpacing: "1px", background: `${roleColor[u.role] || "#888"}20`, color: roleColor[u.role] || "#888" }}>
                  {u.role}
                </span>
              </div>
              <div style={{ fontSize: "0.85rem", opacity: 0.5 }}>{u.countryCode || "—"}</div>
            </div>
          ))
        )}
      </div>

      <footer style={{ textAlign: "center", marginTop: "3rem", paddingTop: "1rem", borderTop: "1px solid rgba(76,175,125,0.08)" }}>
        <p style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.5rem", letterSpacing: "2px", color: "rgba(76,175,125,0.25)" }}>
          SOVEREIGN IDENTITY SYSTEM &nbsp;·&nbsp; ID-GLB / ID-JNR &nbsp;·&nbsp; DSGVO-COMPLIANT
        </p>
      </footer>
    </main>
  );
}
