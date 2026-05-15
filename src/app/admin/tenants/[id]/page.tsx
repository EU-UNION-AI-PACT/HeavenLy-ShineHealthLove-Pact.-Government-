import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function TenantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const user = session?.user as any;
  if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "TENANT_ADMIN")) redirect("/login");

  const { id } = await params;

  const tenant = await prisma.tenant.findUnique({
    where: { id },
    include: {
      users: { select: { id: true, name: true, email: true, role: true, sovereignId: true, isActive: true, createdAt: true } },
      petitions: { select: { id: true, title: true, status: true, createdAt: true }, orderBy: { createdAt: "desc" }, take: 10 },
      newsItems: { select: { id: true, title: true, category: true, publishedAt: true }, orderBy: { publishedAt: "desc" }, take: 10 },
    },
  });

  if (!tenant) notFound();

  const roleColor: Record<string, string> = {
    SUPER_ADMIN: "#7c3aed", TENANT_ADMIN: "#00bcd4", PILGRIM: "#d4af37", PARENT: "#e67e22", JUNIOR: "#ff6b6b",
  };
  const statusColor: Record<string, string> = { HOFFNUNG: "#d4af37", HEILUNG: "#4caf7d", GEWISSHEIT: "#00bcd4" };

  const card: React.CSSProperties = { background: "rgba(6,8,14,0.85)", border: "1px solid rgba(212,175,55,0.12)", borderRadius: "12px", padding: "1.5rem" };
  const sectionTitle: React.CSSProperties = { fontFamily: "var(--font-ceremonial)", fontSize: "0.65rem", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(212,175,55,0.5)", marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(212,175,55,0.08)" };

  return (
    <main style={{ minHeight: "100vh", padding: "2rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>

      {/* HEADER */}
      <header style={{ marginBottom: "2.5rem" }}>
        <Link href="/admin/tenants" style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.55rem", letterSpacing: "3px", color: "rgba(212,175,55,0.4)", textDecoration: "none" }}>
          ← TENANTS
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.8rem" }}>
          <h1 style={{ fontFamily: "var(--font-ceremonial)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "#d4af37", letterSpacing: "0.06em", margin: 0, textShadow: "0 0 30px rgba(212,175,55,0.3)" }}>
            {tenant.name}
          </h1>
          {tenant.isActive && (
            <span style={{ padding: "3px 10px", borderRadius: "6px", fontSize: "0.55rem", fontFamily: "var(--font-ceremonial)", letterSpacing: "1px", background: "rgba(76,175,125,0.2)", color: "#4caf7d", border: "1px solid rgba(76,175,125,0.3)" }}>
              AKTIV
            </span>
          )}
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(249,241,215,0.45)", marginTop: "0.3rem", fontStyle: "italic" }}>
          {tenant.description || "Keine Beschreibung"}
        </p>
      </header>

      {/* INFO-KARTEN */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
        {[
          { label: "ID", value: tenant.id.slice(0, 16) + "…", color: "#888" },
          { label: "Slug", value: tenant.slug, color: "#00bcd4" },
          { label: "Land", value: tenant.countryCode, color: "#d4af37" },
          { label: "Node ID", value: tenant.nodeId || "—", color: "#7c3aed" },
          { label: "Benutzer", value: tenant.users.length, color: "#4caf7d" },
          { label: "Fürbitten", value: tenant.petitions.length, color: "#e67e22" },
          { label: "Erstellt", value: new Date(tenant.createdAt).toLocaleDateString("de-DE"), color: "#888" },
        ].map((m) => (
          <div key={m.label} style={{ ...card, padding: "1rem", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.5rem", letterSpacing: "2px", opacity: 0.4, marginBottom: "0.3rem" }}>{m.label.toUpperCase()}</div>
            <div style={{ fontFamily: m.label === "ID" || m.label === "Slug" ? "monospace" : "var(--font-ceremonial)", fontSize: m.label === "Benutzer" || m.label === "Fürbitten" ? "1.8rem" : "0.85rem", color: m.color, wordBreak: "break-all" }}>
              {m.value}
            </div>
          </div>
        ))}
      </div>

      {/* BENUTZER */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={sectionTitle}>✦ Benutzer ({tenant.users.length})</h2>
        <div style={{ ...card, padding: 0, overflow: "hidden" }}>
          {tenant.users.length === 0 ? (
            <div style={{ padding: "2rem", textAlign: "center", opacity: 0.4, fontFamily: "var(--font-ceremonial)", fontSize: "0.65rem", letterSpacing: "2px" }}>
              Keine Benutzer in diesem Tenant
            </div>
          ) : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 2.5fr 1fr 2fr 0.5fr", padding: "0.7rem 1.2rem", borderBottom: "1px solid rgba(212,175,55,0.08)", gap: "0.5rem" }}>
                {["NAME", "EMAIL", "ROLLE", "SOVEREIGN ID", ""].map(h => (
                  <div key={h} style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.45rem", letterSpacing: "2px", color: "rgba(212,175,55,0.35)" }}>{h}</div>
                ))}
              </div>
              {tenant.users.map((u, i) => (
                <Link key={u.id} href={`/admin/users/${u.id}`} style={{ textDecoration: "none",
                  display: "grid", gridTemplateColumns: "2fr 2.5fr 1fr 2fr 0.5fr", padding: "0.7rem 1.2rem",
                  borderBottom: i < tenant.users.length - 1 ? "1px solid rgba(212,175,55,0.04)" : "none",
                  gap: "0.5rem", alignItems: "center", transition: "background 0.15s",
                }}>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "#f9f1d7" }}>{u.name || "—"}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(249,241,215,0.35)" }}>{u.email || "—"}</div>
                  <div>
                    <span style={{ display: "inline-block", padding: "2px 6px", borderRadius: "4px", fontSize: "0.5rem", fontFamily: "var(--font-ceremonial)", letterSpacing: "1px", background: `${roleColor[u.role]}20`, color: roleColor[u.role] }}>{u.role}</span>
                  </div>
                  <div style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "rgba(249,241,215,0.3)" }}>{u.sovereignId || "—"}</div>
                  <div>
                    <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: u.isActive ? "#4caf7d" : "#ff4444", boxShadow: u.isActive ? "0 0 6px #4caf7d80" : "none" }} />
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      </section>

      {/* FÜRBITTEN */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={sectionTitle}>◈ Letzte Fürbitten ({tenant.petitions.length})</h2>
        <div style={{ ...card, padding: 0, overflow: "hidden" }}>
          {tenant.petitions.length === 0 ? (
            <div style={{ padding: "2rem", textAlign: "center", opacity: 0.4, fontFamily: "var(--font-ceremonial)", fontSize: "0.65rem", letterSpacing: "2px" }}>
              Keine Fürbitten in diesem Tenant
            </div>
          ) : (
            tenant.petitions.map((p, i) => (
              <Link key={p.id} href={`/admin/petitions/${p.id}`} style={{ textDecoration: "none",
                display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.8rem 1.2rem",
                borderBottom: i < tenant.petitions.length - 1 ? "1px solid rgba(212,175,55,0.04)" : "none",
              }}>
                <div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "#f9f1d7" }}>{p.title}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "rgba(249,241,215,0.3)", marginTop: "2px" }}>
                    {new Date(p.createdAt).toLocaleDateString("de-DE")}
                  </div>
                </div>
                <span style={{ padding: "3px 10px", borderRadius: "4px", fontSize: "0.55rem", fontFamily: "var(--font-ceremonial)", letterSpacing: "1px", background: `${statusColor[p.status]}20`, color: statusColor[p.status], border: `1px solid ${statusColor[p.status]}30` }}>
                  {p.status}
                </span>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* NEWS */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={sectionTitle}>⊹ Neuigkeiten ({tenant.newsItems.length})</h2>
        <div style={{ ...card, padding: 0, overflow: "hidden" }}>
          {tenant.newsItems.length === 0 ? (
            <div style={{ padding: "2rem", textAlign: "center", opacity: 0.4, fontFamily: "var(--font-ceremonial)", fontSize: "0.65rem", letterSpacing: "2px" }}>
              Keine Neuigkeiten in diesem Tenant
            </div>
          ) : (
            tenant.newsItems.map((n, i) => (
              <div key={n.id} style={{ padding: "0.8rem 1.2rem", borderBottom: i < tenant.newsItems.length - 1 ? "1px solid rgba(212,175,55,0.04)" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "#f9f1d7" }}>{n.title}</div>
                <span style={{ padding: "2px 8px", borderRadius: "4px", fontSize: "0.5rem", fontFamily: "var(--font-ceremonial)", letterSpacing: "1px", background: "rgba(0,188,212,0.15)", color: "#00bcd4" }}>{n.category}</span>
              </div>
            ))
          )}
        </div>
      </section>

      <footer style={{ textAlign: "center", marginTop: "2rem", paddingTop: "1rem", borderTop: "1px solid rgba(212,175,55,0.08)" }}>
        <p style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.5rem", letterSpacing: "2px", color: "rgba(212,175,55,0.2)" }}>
          TENANT DETAIL &nbsp;·&nbsp; {tenant.slug} &nbsp;·&nbsp; {tenant.nodeId || "NO NODE"}
        </p>
      </footer>
    </main>
  );
}
