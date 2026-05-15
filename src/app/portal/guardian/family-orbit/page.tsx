import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import OrbitCanvas from "./OrbitCanvas";

export default async function FamilyOrbitPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const parentName = session.user?.name ?? "—";

  return (
    <main className="min-h-screen bg-sacred px-6 py-12">
      <div className="max-w-3xl mx-auto">

        <header className="text-center mb-12">
          <p className="font-ceremonial text-xs opacity-40 mb-2" style={{ letterSpacing: "3px" }}>
            ELTERN-PASSAGE — SCHUTZEINHEIT
          </p>
          <h1 className="font-ceremonial text-gold glow-gold" style={{ fontSize: "1.8rem" }}>
            Der Eltern-Orbit
          </h1>
          <p className="mt-2 opacity-60" style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontStyle: "italic" }}>
            Das Elternpaar als geschützte Einheit im Netz
          </p>
        </header>

        <OrbitCanvas parentName={parentName} />

        {/* DATENSCHUTZ-HINWEIS */}
        <section style={{
          padding: "1.5rem 2rem",
          background: "rgba(76,175,125,0.04)",
          border: "1px solid rgba(76,175,125,0.2)",
          borderLeft: "3px solid #4caf7d",
          marginBottom: "2rem",
        }}>
          <div className="font-ceremonial mb-2" style={{ fontSize: "0.6rem", letterSpacing: "2px", color: "#4caf7d" }}>
            🛡️ NETZ-DIGITALISIERUNGS-SCHUTZ
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", opacity: 0.7, lineHeight: 1.8 }}>
            Das System erfasst <strong>ausschließlich Elterndaten</strong>. Keine Kinderdaten,
            keine Kinder-IDs, keine Namen, keine Statuswerte von Minderjährigen werden
            gespeichert oder verarbeitet. Der Schutzschirm des Elternpaares wirkt als
            unsichtbare Hülle — das Kind bleibt vollständig anonym und außerhalb des Systems.
          </p>
        </section>

        {/* ELTERNPAAR STATUS */}
        <section style={{ marginBottom: "2rem" }}>
          <h2 className="font-ceremonial text-gold mb-4" style={{ fontSize: "0.7rem", letterSpacing: "3px" }}>
            Elternpaar-Status
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[
              { label: parentName,             role: "Erziehungsberechtigte/r", status: "AKTIV",      color: "#4caf7d" },
              { label: "Noch nicht verknüpft", role: "Partner/in",              status: "AUSSTEHEND", color: "#e67e22" },
            ].map((p) => (
              <div key={p.role} style={{
                padding: "1.25rem",
                background: "rgba(255,255,255,0.02)",
                border: `1px solid ${p.color}30`,
                borderTop: `2px solid ${p.color}`,
              }}>
                <div className="font-ceremonial mb-1" style={{ fontSize: "0.65rem", letterSpacing: "1.5px", color: "rgba(249,241,215,0.8)" }}>{p.label}</div>
                <div className="font-ceremonial opacity-40 mb-2" style={{ fontSize: "0.5rem", letterSpacing: "1px" }}>{p.role}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.color, boxShadow: `0 0 5px ${p.color}`, display: "inline-block" }} />
                  <span className="font-ceremonial" style={{ fontSize: "0.5rem", letterSpacing: "1.5px", color: p.color }}>{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link href="/portal/guardian/invite" className="btn-ghost" style={{ fontSize: "0.6rem" }}>
            Partner/in zur Schutzeinheit einladen →
          </Link>
        </div>

        <div className="text-center font-ceremonial opacity-20" style={{ fontSize: "0.5rem", letterSpacing: "2px" }}>
          KEINE KINDERDATEN · ELTERNPAAR-SCHUTZ AKTIV · DSGVO ART. 8 · NETZ-DIGITALISIERUNGS-SCHUTZGESETZ
        </div>

      </div>
    </main>
  );
}
