import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SuperAdminPage() {
  const session = await auth();
  const user = session?.user as any;

  if (!user || user.role !== "SUPER_ADMIN") redirect("/login");

  return (
    <main className="min-h-screen bg-sacred px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <header className="mb-12">
          <p className="font-ceremonial text-xs opacity-40 mb-2" style={{ letterSpacing: "3px" }}>
            SUPER-ADMIN TERMINAL
          </p>
          <h1 className="font-ceremonial text-gold glow-gold" style={{ fontSize: "2rem" }}>
            GloryaShine — Welt-Zentrale
          </h1>
          <p className="mt-2 opacity-60" style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontStyle: "italic" }}>
            {user.sovereignId ?? user.email} &nbsp;|&nbsp; SUPER_ADMIN
          </p>
        </header>

        {/* METRICS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Tenants", value: "—", color: "#00bcd4" },
            { label: "Pilger", value: "—", color: "#d4af37" },
            { label: "Fürbitten", value: "—", color: "#4caf7d" },
            { label: "Juniors", value: "—", color: "#e67e22" },
          ].map((m) => (
            <div key={m.label} className="metric-card text-center">
              <div className="font-ceremonial" style={{ fontSize: "2rem", color: m.color }}>
                {m.value}
              </div>
              <div className="font-ceremonial mt-1 opacity-50" style={{ fontSize: "0.6rem", letterSpacing: "2px" }}>
                {m.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        {/* NAVIGATION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/tenants" className="station-card text-center">
            <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "1.2rem" }}>⬡</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>Tenant-Verwaltung</div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Pfarreien, Diözesen, Knoten verwalten
            </p>
          </Link>

          <Link href="/admin/users" className="station-card text-center">
            <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "1.2rem" }}>✦</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>Globale Benutzer</div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Alle Pilger, Eltern & Juniors im Mesh
            </p>
          </Link>

          <Link href="/admin/resonanz" className="station-card text-center">
            <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "1.2rem" }}>◈</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>Resonanz-Bilanz</div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Tagesbericht 00:00 UTC — Welt-Allianz-Status
            </p>
          </Link>

          <Link href="/admin/junior-safety" className="station-card text-center">
            <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "1.2rem" }}>🛡️</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>Junior-Schutz-Zentrale</div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Echtzeit-Schutz-Monitor für Minderjährige
            </p>
          </Link>

          <Link href="/admin/mentors" className="station-card text-center">
            <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "1.2rem" }}>⚡</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>Mentor-Validierung</div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              COPPA/DSGVO-geprüfte Mentoren-Liste
            </p>
          </Link>

          <Link href="/admin/sovereign-ids" className="station-card text-center">
            <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "1.2rem" }}>🌍</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>Sovereign IDs</div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              ID-GLB / ID-JNR — Globale Identitäten
            </p>
          </Link>

          <Link href="/admin/giessfast" className="station-card text-center">
            <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "1.2rem" }}>⬡</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>Gießfass-Dashboard</div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Alchemistischer Reaktor — Das Alte wird Gold
            </p>
          </Link>

          <Link href="/admin/transition-radar" className="station-card text-center">
            <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "1.2rem" }}>🌐</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>Transition-Radar</div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Global Junior → Sovereign — 5-Punkte-Sicherheit
            </p>
          </Link>

          <Link href="/admin/inclusion" className="station-card text-center">
            <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "1.2rem" }}>🛡️</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>Silent Inclusion</div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Stigma-Shield — Behörden-Intentions-Matrix
            </p>
          </Link>
        </div>

        {/* FOOTER */}
        <footer className="text-center mt-16 pt-8" style={{ borderTop: "1px solid var(--border-gold)" }}>
          <p className="font-ceremonial opacity-30" style={{ fontSize: "0.55rem", letterSpacing: "1px" }}>
            🛡️ SUPER-ADMIN TERMINAL &nbsp;|&nbsp; ZERO-TRUST ZONE &nbsp;|&nbsp; 🌍 GLOBAL MESH: ACTIVE
          </p>
        </footer>
      </div>
    </main>
  );
}
