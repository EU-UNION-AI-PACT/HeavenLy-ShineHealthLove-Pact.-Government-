import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminPetitionsPage() {
  const session = await auth();
  const user = session?.user as any;
  if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "TENANT_ADMIN")) redirect("/login");

  const petitions = await prisma.petition.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true, email: true } } },
  });

  const statusColor: Record<string, string> = { HOFFNUNG: "#d4af37", HEILUNG: "#4caf7d", GEWISSHEIT: "#00bcd4" };
  const counts = { HOFFNUNG: 0, HEILUNG: 0, GEWISSHEIT: 0 };
  petitions.forEach(p => { if (counts[p.status as keyof typeof counts] !== undefined) counts[p.status as keyof typeof counts]++; });

  return (
    <main style={{ minHeight: "100vh", padding: "2rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "2.5rem" }}>
        <Link href="/admin" style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.55rem", letterSpacing: "3px", color: "rgba(212,175,55,0.4)", textDecoration: "none" }}>
          ← ADMIN TERMINAL
        </Link>
        <h1 style={{ fontFamily: "var(--font-ceremonial)", fontSize: "2rem", color: "#4caf7d", letterSpacing: "0.08em", marginTop: "0.5rem", textShadow: "0 0 30px rgba(76,175,125,0.3)" }}>
          ◈ Fürbitten & Wünsche
        </h1>
      </header>

      {/* Status-Metriken */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
        {Object.entries(counts).map(([status, count]) => (
          <div key={status} style={{ background: "rgba(6,8,14,0.85)", border: `1px solid ${statusColor[status]}30`, borderRadius: "10px", padding: "1.2rem", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-ceremonial)", fontSize: "2rem", color: statusColor[status], lineHeight: 1 }}>{count}</div>
            <div style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.55rem", letterSpacing: "2px", opacity: 0.5, marginTop: "0.3rem" }}>{status}</div>
          </div>
        ))}
      </div>

      {/* Petitions-Liste */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
        {petitions.length === 0 ? (
          <div style={{ background: "rgba(6,8,14,0.85)", border: "1px solid rgba(212,175,55,0.12)", borderRadius: "12px", padding: "3rem", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>◈</div>
            <p style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.65rem", letterSpacing: "2px", opacity: 0.4 }}>Noch keine Fürbitten eingereicht</p>
          </div>
        ) : (
          petitions.map((p) => (
            <div key={p.id} style={{ background: "rgba(6,8,14,0.85)", border: "1px solid rgba(212,175,55,0.12)", borderRadius: "12px", padding: "1.2rem 1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: "var(--font-ceremonial)", fontSize: "1rem", color: "#f9f1d7", letterSpacing: "0.5px", margin: 0 }}>{p.title}</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "rgba(249,241,215,0.4)", marginTop: "0.3rem", lineHeight: 1.5 }}>
                    {p.content?.slice(0, 150)}{p.content && p.content.length > 150 ? "..." : ""}
                  </p>
                  <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.6rem", fontSize: "0.75rem", color: "rgba(249,241,215,0.3)" }}>
                    <span>Von: {p.author?.name || p.author?.email || "Anonym"}</span>
                    <span>{new Date(p.createdAt).toLocaleDateString("de-DE")}</span>
                    <span>Sichtbarkeit: {p.visibility}</span>
                  </div>
                </div>
                <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: "6px", fontSize: "0.6rem", fontFamily: "var(--font-ceremonial)", letterSpacing: "1px", background: `${statusColor[p.status]}20`, color: statusColor[p.status], border: `1px solid ${statusColor[p.status]}30`, flexShrink: 0 }}>
                  {p.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <footer style={{ textAlign: "center", marginTop: "3rem", paddingTop: "1rem", borderTop: "1px solid rgba(212,175,55,0.08)" }}>
        <p style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.5rem", letterSpacing: "2px", color: "rgba(212,175,55,0.2)" }}>
          {petitions.length} FÜRBITTEN GESAMT &nbsp;·&nbsp; DSGVO-COMPLIANT
        </p>
      </footer>
    </main>
  );
}
