import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function TenantsPage() {
  const session = await auth();
  const user = session?.user as any;

  if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "TENANT_ADMIN")) {
    redirect("/login");
  }

  // Fetch tenants from database
  const tenants = await prisma.tenant.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { users: true }
      }
    }
  });

  return (
    <main className="min-h-screen bg-sacred px-6 py-12">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <header className="mb-12">
          <Link href="/admin" className="font-ceremonial text-xs opacity-40 hover:opacity-70 transition-opacity" style={{ letterSpacing: "3px" }}>
            ← ZURÜCK ZUM ADMIN-TERMINAL
          </Link>
          <h1 className="font-ceremonial text-gold glow-gold mt-4" style={{ fontSize: "2rem" }}>
            Tenant-Verwaltung
          </h1>
          <p className="mt-2 opacity-60" style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontStyle: "italic" }}>
            Pfarreien, Diözesen & Organisationsknoten im Mesh
          </p>
        </header>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="metric-card text-center">
            <div className="font-ceremonial text-gold" style={{ fontSize: "2.5rem" }}>
              {tenants.length}
            </div>
            <div className="font-ceremonial mt-1 opacity-50" style={{ fontSize: "0.6rem", letterSpacing: "2px" }}>
              AKTIVE TENANTS
            </div>
          </div>
          <div className="metric-card text-center">
            <div className="font-ceremonial text-cyan" style={{ fontSize: "2.5rem" }}>
              {tenants.reduce((sum, t) => sum + t._count.users, 0)}
            </div>
            <div className="font-ceremonial mt-1 opacity-50" style={{ fontSize: "0.6rem", letterSpacing: "2px" }}>
              GESAMT BENUTZER
            </div>
          </div>
          <div className="metric-card text-center">
            <div className="font-ceremonial text-green" style={{ fontSize: "2.5rem" }}>
              {tenants.filter(t => t.isActive).length}
            </div>
            <div className="font-ceremonial mt-1 opacity-50" style={{ fontSize: "0.6rem", letterSpacing: "2px" }}>
              ONLINE
            </div>
          </div>
        </div>

        {/* TENANTS LIST */}
        <div className="space-y-4">
          {tenants.length === 0 ? (
            <div className="station-card text-center py-12">
              <div className="font-ceremonial text-gold mb-4" style={{ fontSize: "2rem" }}>⬡</div>
              <p className="font-ceremonial opacity-50" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>
                Noch keine Tenants registriert
              </p>
            </div>
          ) : (
            tenants.map((tenant) => (
              <div key={tenant.id} className="station-card">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-ceremonial text-gold" style={{ fontSize: "1.1rem", letterSpacing: "1px" }}>
                        {tenant.name}
                      </h3>
                      {tenant.isActive && (
                        <span className="px-2 py-1 rounded text-xs font-ceremonial" style={{ background: "rgba(76,175,125,0.2)", color: "#4caf7d", letterSpacing: "1px" }}>
                          AKTIV
                        </span>
                      )}
                    </div>
                    <p className="opacity-60 mb-3" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>
                      {tenant.description || "Keine Beschreibung"}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="font-ceremonial opacity-40 text-xs mb-1" style={{ letterSpacing: "1px" }}>ID</div>
                        <div className="font-mono text-xs opacity-70">{tenant.id.slice(0, 12)}...</div>
                      </div>
                      <div>
                        <div className="font-ceremonial opacity-40 text-xs mb-1" style={{ letterSpacing: "1px" }}>BENUTZER</div>
                        <div className="font-ceremonial text-cyan">{tenant._count.users}</div>
                      </div>
                      <div>
                        <div className="font-ceremonial opacity-40 text-xs mb-1" style={{ letterSpacing: "1px" }}>ERSTELLT</div>
                        <div className="opacity-70">{new Date(tenant.createdAt).toLocaleDateString('de-DE')}</div>
                      </div>
                      <div>
                        <div className="font-ceremonial opacity-40 text-xs mb-1" style={{ letterSpacing: "1px" }}>REGION</div>
                        <div className="opacity-70">{tenant.countryCode || "—"}</div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <Link 
                      href={`/admin/tenants/${tenant.id}`}
                      className="px-4 py-2 rounded font-ceremonial text-xs transition-all hover:bg-gold/10"
                      style={{ border: "1px solid rgba(212,175,55,0.3)", letterSpacing: "1px" }}
                    >
                      DETAILS →
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <footer className="text-center mt-16 pt-8" style={{ borderTop: "1px solid var(--border-gold)" }}>
          <p className="font-ceremonial opacity-30" style={{ fontSize: "0.55rem", letterSpacing: "1px" }}>
            🛡️ TENANT MANAGEMENT &nbsp;|&nbsp; DSGVO-COMPLIANT &nbsp;|&nbsp; ZERO-TRUST ARCHITECTURE
          </p>
        </footer>
      </div>
    </main>
  );
}
