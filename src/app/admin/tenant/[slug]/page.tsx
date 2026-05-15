import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function TenantAdminPage({ params }: Props) {
  const { slug } = await params;
  const session = await auth();
  const user = session?.user as any;

  if (!user) redirect("/login");

  const allowed = user.role === "SUPER_ADMIN" || (user.role === "TENANT_ADMIN" && user.tenantSlug === slug);
  if (!allowed) redirect("/portal");

  return (
    <main className="min-h-screen bg-sacred px-6 py-12">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <header className="mb-12">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="font-ceremonial text-xs opacity-40 mb-1" style={{ letterSpacing: "3px" }}>
                TENANT-ADMIN — /{slug}
              </p>
              <h1 className="font-ceremonial text-gold glow-gold" style={{ fontSize: "1.8rem" }}>
                {slug.charAt(0).toUpperCase() + slug.slice(1)} — Verwaltung
              </h1>
              <p className="mt-1 opacity-60" style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", fontStyle: "italic" }}>
                {user.sovereignId ?? user.email}
              </p>
            </div>
            {user.role === "SUPER_ADMIN" && (
              <Link href="/admin" className="btn-ghost" style={{ fontSize: "0.6rem" }}>
                ← Super-Admin
              </Link>
            )}
          </div>
        </header>

        {/* METRICS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Pilger", value: "—", color: "#d4af37" },
            { label: "Fürbitten", value: "—", color: "#4caf7d" },
            { label: "Eltern", value: "—", color: "#e67e22" },
            { label: "Juniors", value: "—", color: "#00bcd4" },
          ].map((m) => (
            <div key={m.label} className="metric-card text-center">
              <div className="font-ceremonial" style={{ fontSize: "2rem", color: m.color }}>{m.value}</div>
              <div className="font-ceremonial mt-1 opacity-50" style={{ fontSize: "0.6rem", letterSpacing: "2px" }}>
                {m.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        {/* SECTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="station-card">
            <h2 className="font-ceremonial text-gold mb-3" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>
              Benutzer-Verwaltung
            </h2>
            <p className="opacity-50 mb-4" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Pilger, Eltern und Juniors in diesem Tenant
            </p>
            <Link href={`/admin/tenant/${slug}/users`} className="btn-ghost" style={{ fontSize: "0.6rem" }}>
              Verwalten →
            </Link>
          </div>

          <div className="station-card">
            <h2 className="font-ceremonial text-gold mb-3" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>
              Fürbitten-Übersicht
            </h2>
            <p className="opacity-50 mb-4" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Gemeinde-Fürbitten verwalten und moderieren
            </p>
            <Link href={`/admin/tenant/${slug}/petitions`} className="btn-ghost" style={{ fontSize: "0.6rem" }}>
              Öffnen →
            </Link>
          </div>

          <div className="station-card">
            <h2 className="font-ceremonial text-gold mb-3" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>
              Junior-Sicherheits-Monitor
            </h2>
            <p className="opacity-50 mb-4" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Echtzeit-Überwachung der Junior-Interaktionen in diesem Tenant
            </p>
            <Link href={`/admin/tenant/${slug}/junior-safety`} className="btn-ghost" style={{ fontSize: "0.6rem" }}>
              Monitor →
            </Link>
          </div>

          <div className="station-card">
            <h2 className="font-ceremonial text-gold mb-3" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>
              Sichtbarkeits-Einstellungen
            </h2>
            <p className="opacity-50 mb-4" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Öffentliche vs. Tenant-interne Inhalte konfigurieren
            </p>
            <Link href={`/admin/tenant/${slug}/settings`} className="btn-ghost" style={{ fontSize: "0.6rem" }}>
              Einstellungen →
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
