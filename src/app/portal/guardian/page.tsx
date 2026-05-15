import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function GuardianPortalPage() {
  const session = await auth();
  const user = session?.user as any;

  if (!user) redirect("/login");
  if (user.role !== "PARENT" && user.role !== "SUPER_ADMIN") redirect("/portal");

  return (
    <main className="min-h-screen bg-sacred px-6 py-12">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <header className="text-center mb-16">
          <p className="font-ceremonial text-xs opacity-40 mb-2" style={{ letterSpacing: "3px" }}>
            ELTERN-PASSAGE — GUARDIAN GATEWAY
          </p>
          <h1 className="font-ceremonial text-gold glow-gold" style={{ fontSize: "2rem" }}>
            Schutzhülle des Kindes
          </h1>
          <p className="mt-2 opacity-60" style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontStyle: "italic" }}>
            {user.name ?? user.email} — Erziehungsberechtigte/r
          </p>
          {user.sovereignId && (
            <p className="mt-1 font-ceremonial opacity-40" style={{ fontSize: "0.65rem", letterSpacing: "2px" }}>
              {user.sovereignId}
            </p>
          )}
        </header>

        {/* SAFETY NOTICE */}
        <div
          className="mb-10 p-5"
          style={{
            background: "rgba(230,126,34,0.05)",
            border: "1px solid rgba(230,126,34,0.25)",
            borderLeft: "3px solid var(--lion-amber)",
          }}
        >
          <p className="font-ceremonial mb-2" style={{ fontSize: "0.65rem", letterSpacing: "2px", color: "var(--lion-amber)" }}>
            🛡️ KINDESSCHUTZ-PROTOKOLL AKTIV
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", opacity: 0.8 }}>
            Alle Systemkommunikation, die dein Kind betrifft, wird <strong>ausschließlich</strong> an
            dich als Erziehungsberechtigte/n weitergeleitet. Kein direkter Außenkontakt mit dem Kind.
            Du bist der Anker — das System ist der Schutzschirm.
          </p>
        </div>

        {/* CHILD LINKS */}
        <section className="bg-glass mb-8 p-6" style={{ border: "1px solid var(--border-gold)" }}>
          <h2 className="font-ceremonial text-gold mb-4" style={{ fontSize: "0.75rem", letterSpacing: "3px" }}>
            Verknüpfte Kinder
          </h2>
          <p className="opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>
            Noch keine Kinder verknüpft. Nutze die Einladungs-Funktion, um dein Kind im Mesh anzubinden.
          </p>
        </section>

        {/* RELAY STATUS GRID */}
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {[
              { label: "Parent-Relay", value: "100 %", sub: "Zustellungsrate", color: "#4caf7d" },
              { label: "Direktkontakt", value: "0", sub: "Versuche blockiert", color: "#00bcd4" },
              { label: "Junior-Sync", value: "stabil", sub: "Schutzschirm aktiv", color: "#e67e22" },
              { label: "Alters-Transition", value: "bereit", sub: "Gateway offen", color: "#d4af37" },
            ].map((m) => (
              <div
                key={m.label}
                className="text-center p-4"
                style={{
                  background: `${m.color}06`,
                  border: `1px solid ${m.color}30`,
                  borderTop: `2px solid ${m.color}`,
                }}
              >
                <div
                  className="font-ceremonial"
                  style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", color: m.color, letterSpacing: "1px" }}
                >
                  {m.value}
                </div>
                <div className="font-ceremonial opacity-40 mt-1" style={{ fontSize: "0.45rem", letterSpacing: "2px" }}>
                  {m.label}
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", opacity: 0.35, marginTop: "2px" }}>
                  {m.sub}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ELTERN-INBOX VORSCHAU */}
        <section
          className="mb-8 p-5"
          style={{
            background: "rgba(230,126,34,0.03)",
            border: "1px solid rgba(230,126,34,0.18)",
            borderLeft: "3px solid var(--lion-amber)",
          }}
        >
          <p className="font-ceremonial mb-4" style={{ fontSize: "0.55rem", letterSpacing: "3px", color: "var(--lion-amber)" }}>
            📬 ELTERN-RELAY — LETZTE SYSTEMBENACHRICHTIGUNG
          </p>
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(230,126,34,0.15)",
              padding: "1rem 1.25rem",
            }}
          >
            <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
              <span className="font-ceremonial" style={{ fontSize: "0.5rem", letterSpacing: "1.5px", color: "#e67e22", border: "1px solid rgba(230,126,34,0.3)", padding: "2px 8px" }}>
                🌐 ELTERN-RELAY
              </span>
              <span className="font-ceremonial opacity-30" style={{ fontSize: "0.5rem" }}>
                System · automatisch generiert
              </span>
            </div>
            <h4 className="font-ceremonial mb-2" style={{ fontSize: "0.75rem", letterSpacing: "1.5px", color: "#e67e22" }}>
              Sicherheits-Update für deine Familie
            </h4>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", opacity: 0.7, lineHeight: 1.75 }}>
              Der Junior-Bereich wurde erfolgreich synchronisiert. Dein Kind agiert im geschützten
              Vakuum des Mesh. Alle Resonanzen werden gefiltert und direkt an dich weitergeleitet.
              Du bist der Anker — das System ist der Schutzschirm.
            </p>
            <p className="font-ceremonial mt-3 opacity-30" style={{ fontSize: "0.45rem", letterSpacing: "2px" }}>
              🛡️ KEIN DIREKTKONTAKT AUF JUNIOR-IDs · 100 % ZUSTELLUNGSRATE · DSGVO / COPPA KONFORM
            </p>
          </div>
          <p className="mt-3 opacity-40 text-center" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem" }}>
            Der vollständige Relay-Posteingang ist über{" "}
            <a href="/portal/guardian/relay" style={{ color: "var(--lion-amber)", textDecoration: "underline" }}>
              Relay-Posteingang →
            </a>
          </p>
        </section>

        {/* ACTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/portal/guardian/invite" className="station-card text-center">
            <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "1.4rem" }}>✦</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>Kind einladen</div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              One-Click-Invite · Access-Link · NFC-Stub
            </p>
          </Link>

          <Link href="/portal/guardian/relay" className="station-card text-center">
            <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "1.4rem" }}>◈</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>Relay-Posteingang</div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Alle Resonanzen deiner Kinder — an dich weitergeleitet
            </p>
          </Link>

          <Link href="/portal/guardian/family-orbit" className="station-card text-center">
            <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "1.4rem" }}>🌐</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>Family Orbit</div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Orbit-Visualisierung der Familienknoten
            </p>
          </Link>

          <Link href="/portal/guardian/transition" className="station-card text-center">
            <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "1.4rem" }}>⬡</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>Alters-Transition</div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Junior → Sovereign ID Bestätigung (18. Geburtstag)
            </p>
          </Link>
        </div>

      </div>
    </main>
  );
}
