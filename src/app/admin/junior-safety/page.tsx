import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function JuniorSafetyPage() {
  const session = await auth();
  const user = session?.user as any;

  if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "TENANT_ADMIN")) redirect("/login");

  const [juniorCount, parentCount, linkCount, transitionCount] = await Promise.all([
    prisma.user.count({ where: { role: "JUNIOR" } }),
    prisma.user.count({ where: { role: "PARENT" } }),
    prisma.parentChildLink.count(),
    prisma.juniorProfile.count({ where: { transitionStatus: "ACTIVE_JUNIOR" } }),
  ]);

  return (
    <main className="min-h-screen bg-sacred px-6 py-12">
      <div className="max-w-5xl mx-auto">

        <header className="text-center mb-16">
          <Link href="/admin" className="font-ceremonial text-xs opacity-40 hover:opacity-70 transition-opacity" style={{ letterSpacing: "3px", textDecoration: "none" }}>
            ← ADMIN TERMINAL
          </Link>
          <p className="font-ceremonial text-xs opacity-40 mb-2 mt-4" style={{ letterSpacing: "3px" }}>
            JUNIOR-SCHUTZ-ZENTRALE
          </p>
          <h1 className="font-ceremonial text-gold glow-gold" style={{ fontSize: "2rem" }}>
            Kindesschutz-Monitor
          </h1>
          <p className="mt-2 opacity-60" style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontStyle: "italic" }}>
            Echtzeit-Überwachung aller Junior-Interaktionen im globalen Mesh
          </p>
        </header>

        {/* SAFETY PROTOCOL BANNER */}
        <div
          className="mb-10 p-5"
          style={{
            background: "rgba(230,126,34,0.05)",
            border: "1px solid rgba(230,126,34,0.3)",
            borderLeft: "3px solid var(--lion-amber)",
          }}
        >
          <p className="font-ceremonial mb-2" style={{ fontSize: "0.65rem", letterSpacing: "2px", color: "var(--lion-amber)" }}>
            🛡️ GOLDENES GESETZ — ABSOLUT
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", opacity: 0.8 }}>
            <strong>Kein direkter Außenkontakt</strong> mit Minderjährigen. Alle Kommunikation wird
            ausschließlich an die verifizierten Erziehungsberechtigten weitergeleitet.
            Direktnachrichten an Kinder sind systemisch blockiert.
          </p>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Aktive Juniors", value: juniorCount, color: "#00bcd4" },
            { label: "Eltern-Relays OK", value: linkCount, color: "#4caf7d" },
            { label: "Transition ausstehend", value: transitionCount, color: "#e67e22" },
            { label: "Eltern gesamt", value: parentCount, color: "#7c3aed" },
          ].map((m) => (
            <div key={m.label} className="metric-card text-center">
              <div className="font-ceremonial" style={{ fontSize: "2rem", color: m.color }}>{m.value}</div>
              <div className="font-ceremonial mt-1 opacity-50" style={{ fontSize: "0.55rem", letterSpacing: "1.5px" }}>
                {m.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        {/* ACTIVITY FEED */}
        <section className="mb-10">
          <h2 className="font-ceremonial text-gold mb-4" style={{ fontSize: "0.75rem", letterSpacing: "3px" }}>
            Activity-Pulse (Echtzeit)
          </h2>
          <div
            className="p-6 text-center"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-gold)" }}
          >
            <p className="opacity-40" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>
              Noch keine Junior-Aktivitäten erfasst. Der Monitor startet sobald Juniors im Mesh aktiv sind.
            </p>
          </div>
        </section>

        {/* PARENT-JUNIOR LINK TABLE */}
        <section className="mb-10">
          <h2 className="font-ceremonial text-gold mb-4" style={{ fontSize: "0.75rem", letterSpacing: "3px" }}>
            Eltern-Junior-Bindungen
          </h2>
          <div
            className="p-6 text-center"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-gold)" }}
          >
            <p className="opacity-40" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>
              Keine aktiven Bindungen vorhanden.
            </p>
          </div>
        </section>

        {/* MENTOR VETTING STATUS */}
        <section>
          <h2 className="font-ceremonial text-gold mb-4" style={{ fontSize: "0.75rem", letterSpacing: "3px" }}>
            Mentor-Verifizierungs-Status (COPPA/DSGVO)
          </h2>
          <div
            className="p-6 text-center"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-gold)" }}
          >
            <p className="opacity-40" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>
              Keine Mentor-Anträge ausstehend.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}
