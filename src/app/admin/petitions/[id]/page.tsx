import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function PetitionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const me = session?.user as any;
  if (!me || (me.role !== "SUPER_ADMIN" && me.role !== "TENANT_ADMIN")) redirect("/login");

  const { id } = await params;

  const petition = await prisma.petition.findUnique({
    where: { id },
    include: {
      author: { select: { id: true, name: true, email: true, role: true, sovereignId: true } },
      tenant: { select: { id: true, name: true, slug: true } },
    },
  });

  if (!petition) notFound();

  const statusColor: Record<string, string> = { HOFFNUNG: "#d4af37", HEILUNG: "#4caf7d", GEWISSHEIT: "#00bcd4" };
  const purposeColor: Record<string, string> = { EARTH: "#4caf7d", FELLOWS: "#00bcd4", GOVERNMENT: "#7c3aed", SELF: "#d4af37" };
  const card: React.CSSProperties = { background: "rgba(6,8,14,0.85)", border: "1px solid rgba(212,175,55,0.12)", borderRadius: "12px", padding: "1.5rem" };
  const sectionTitle: React.CSSProperties = { fontFamily: "var(--font-ceremonial)", fontSize: "0.65rem", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(212,175,55,0.5)", marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(212,175,55,0.08)" };

  return (
    <main style={{ minHeight: "100vh", padding: "2rem 1.5rem", maxWidth: "1000px", margin: "0 auto" }}>

      {/* HEADER */}
      <header style={{ marginBottom: "2.5rem" }}>
        <Link href="/admin/petitions" style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.55rem", letterSpacing: "3px", color: "rgba(212,175,55,0.4)", textDecoration: "none" }}>
          ← FÜRBITTEN
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.8rem", flexWrap: "wrap" }}>
          <h1 style={{ fontFamily: "var(--font-ceremonial)", fontSize: "clamp(1.3rem, 3vw, 2rem)", color: "#f9f1d7", letterSpacing: "0.04em", margin: 0 }}>
            {petition.title}
          </h1>
          <span style={{ padding: "4px 12px", borderRadius: "6px", fontSize: "0.6rem", fontFamily: "var(--font-ceremonial)", letterSpacing: "1.5px", background: `${statusColor[petition.status]}20`, color: statusColor[petition.status], border: `1px solid ${statusColor[petition.status]}30` }}>
            {petition.status}
          </span>
        </div>
      </header>

      {/* META */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
        {[
          { label: "Autor", value: petition.author?.name || petition.author?.email || "Anonym", href: petition.author ? `/admin/users/${petition.author.id}` : null },
          { label: "Tenant", value: petition.tenant?.name || "—", href: petition.tenant ? `/admin/tenants/${petition.tenant.id}` : null },
          { label: "Sichtbarkeit", value: petition.visibility },
          { label: "Zweck", value: petition.purposeCode || "—", color: purposeColor[petition.purposeCode || ""] },
          { label: "Erstellt", value: new Date(petition.createdAt).toLocaleString("de-DE") },
          { label: "Aktualisiert", value: new Date(petition.updatedAt).toLocaleString("de-DE") },
        ].map((f: any) => (
          <div key={f.label} style={{ ...card, padding: "1rem" }}>
            <div style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.5rem", letterSpacing: "2px", color: "rgba(212,175,55,0.4)", marginBottom: "0.3rem" }}>{f.label.toUpperCase()}</div>
            {f.href ? (
              <Link href={f.href} style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: f.color || "#00bcd4", textDecoration: "none" }}>{f.value}</Link>
            ) : (
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: f.color || "#f9f1d7" }}>{f.value}</div>
            )}
          </div>
        ))}
      </div>

      {/* INHALT */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={sectionTitle}>◈ Inhalt der Fürbitte</h2>
        <div style={{ ...card }}>
          {petition.content ? (
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "rgba(249,241,215,0.8)", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
              {petition.content}
            </p>
          ) : (
            <p style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.65rem", letterSpacing: "2px", opacity: 0.4, textAlign: "center" }}>
              Kein Inhalt vorhanden
            </p>
          )}
        </div>
      </section>

      {/* DSGVO */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={sectionTitle}>🛡️ DSGVO</h2>
        <div style={{ ...card, display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.5rem", letterSpacing: "1.5px", color: "rgba(249,241,215,0.4)", marginBottom: "0.2rem" }}>ANONYMISIERT</div>
            <div style={{ fontSize: "0.85rem", color: petition.anonymizedAt ? "#e67e22" : "#4caf7d" }}>
              {petition.anonymizedAt ? new Date(petition.anonymizedAt).toLocaleDateString("de-DE") : "Nein"}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.5rem", letterSpacing: "1.5px", color: "rgba(249,241,215,0.4)", marginBottom: "0.2rem" }}>ZWECK-CODE</div>
            <div style={{ fontSize: "0.85rem", color: purposeColor[petition.purposeCode || ""] || "#888" }}>
              {petition.purposeCode || "—"}
            </div>
          </div>
        </div>
      </section>

      <footer style={{ textAlign: "center", paddingTop: "1rem", borderTop: "1px solid rgba(212,175,55,0.08)" }}>
        <p style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.5rem", letterSpacing: "2px", color: "rgba(212,175,55,0.2)" }}>
          PETITION DETAIL &nbsp;·&nbsp; {petition.id.slice(0, 16)}…
        </p>
      </footer>
    </main>
  );
}
