import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function MentorValidationPage() {
  const session = await auth();
  const user = session?.user as any;

  if (!user || user.role !== "SUPER_ADMIN") redirect("/login");

  return (
    <main className="min-h-screen bg-sacred px-6 py-12">
      <div className="max-w-5xl mx-auto">

        <header className="text-center mb-14">
          <p className="font-ceremonial text-xs opacity-40 mb-2" style={{ letterSpacing: "3px" }}>
            MENTOR-VALIDIERUNGS-SYSTEM
          </p>
          <h1 className="font-ceremonial text-gold glow-gold" style={{ fontSize: "2rem" }}>
            Geprüfte Begleiter
          </h1>
          <p className="mt-2 opacity-60" style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontStyle: "italic" }}>
            COPPA / DSGVO-konform — nur verifizierte Mentoren füllen Junior-Vakanzen
          </p>
        </header>

        {/* VETTING PROTOCOL */}
        <div
          className="mb-10 p-5"
          style={{ background: "rgba(0,188,212,0.04)", border: "1px solid rgba(0,188,212,0.2)", borderLeft: "3px solid #00bcd4" }}
        >
          <p className="font-ceremonial mb-2" style={{ fontSize: "0.65rem", letterSpacing: "2px", color: "#00bcd4" }}>
            🛡️ MENTOR-VETTING-PROTOKOLL (COPPA / EU AI ACT)
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", opacity: 0.8 }}>
            Nur Member mit dem Label <strong>„Geprüfter Begleiter"</strong> können Vakanzen der Junior-Abteilung füllen.
            Die Vetting-Pipeline besteht aus: KI-Vorprüfung → Historien-Check → Admin-Freigabe → Allianz-Verifizierung.
          </p>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Verifizierte Mentoren", value: "—", color: "#4caf7d" },
            { label: "Vetting ausstehend", value: "—", color: "#e67e22" },
            { label: "Junior-Vakanzen aktiv", value: "—", color: "#00bcd4" },
            { label: "Erfolgreich gepaart", value: "—", color: "#d4af37" },
          ].map((m) => (
            <div key={m.label} className="metric-card text-center">
              <div className="font-ceremonial" style={{ fontSize: "2rem", color: m.color }}>{m.value}</div>
              <div className="font-ceremonial mt-1 opacity-50" style={{ fontSize: "0.55rem", letterSpacing: "1.5px" }}>
                {m.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        {/* VETTING STAGES */}
        <section className="mb-10">
          <h2 className="font-ceremonial text-gold mb-6" style={{ fontSize: "0.75rem", letterSpacing: "3px" }}>
            Vetting-Pipeline
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {[
              { stage: "01", title: "KI-Vorprüfung", desc: "Automatische Verhaltensanalyse anhand der bisherigen Mesh-Aktivität.", color: "#00bcd4" },
              { stage: "02", title: "Historien-Check", desc: "Überprüfung des Interaktionsverlaufs auf heilsame Frequenzen.", color: "#d4af37" },
              { stage: "03", title: "Admin-Freigabe", desc: "Manuelle Freigabe durch Super-Admin oder Allianz-Vertreter.", color: "#e67e22" },
              { stage: "04", title: "Allianz-Siegel", desc: "Finale Verifikation durch EU/UN/USA Node. Badge: ✦ Geprüfter Begleiter", color: "#4caf7d" },
            ].map((s) => (
              <div key={s.stage} className="metric-card text-center">
                <div className="font-ceremonial mb-2" style={{ fontSize: "1.5rem", color: s.color, opacity: 0.6 }}>{s.stage}</div>
                <div className="font-ceremonial mb-2" style={{ fontSize: "0.65rem", letterSpacing: "2px", color: s.color }}>{s.title}</div>
                <p className="opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PENDING VETTING */}
        <section className="mb-10">
          <h2 className="font-ceremonial text-gold mb-4" style={{ fontSize: "0.75rem", letterSpacing: "3px" }}>
            Ausstehende Vetting-Anträge
          </h2>
          <div
            className="p-6 text-center"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-gold)" }}
          >
            <p className="opacity-40" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>
              Keine Anträge ausstehend. Das System benachrichtigt sobald ein Member die Mentor-Anfrage stellt.
            </p>
          </div>
        </section>

        {/* VERIFIED MENTORS */}
        <section className="mb-10">
          <h2 className="font-ceremonial text-gold mb-4" style={{ fontSize: "0.75rem", letterSpacing: "3px" }}>
            Aktive verifizierte Mentoren
          </h2>
          <div
            className="p-6 text-center"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-gold)" }}
          >
            <p className="opacity-40" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>
              Noch keine verifizierten Mentoren im System. Der erste Mentor wird nach erfolgreichem Vetting hier angezeigt.
            </p>
          </div>
        </section>

        <div className="flex justify-between items-center">
          <Link href="/admin" className="btn-ghost" style={{ fontSize: "0.6rem" }}>
            ← Super-Admin Terminal
          </Link>
          <p className="font-ceremonial opacity-25" style={{ fontSize: "0.55rem", letterSpacing: "1px" }}>
            🛡️ COPPA / DSGVO KONFORM &nbsp;|&nbsp; ✦ EU AI ACT KONFORM
          </p>
        </div>
      </div>
    </main>
  );
}
