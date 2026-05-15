"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const ResonanzGraph = dynamic(() => import("@/components/ResonanzGraph"), { ssr: false, loading: () => (
  <div style={{ height: 480, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(212,175,55,0.15)", background: "oklch(0.11 0.03 265)" }}>
    <span className="font-ceremonial opacity-30" style={{ fontSize: "0.6rem", letterSpacing: "3px" }}>GRAPH LÄDT…</span>
  </div>
) });

// Simulated live data — replace with real DB queries once connected
const REPORT_ID = `#${new Date().getFullYear()}-${String(new Date().getMonth()+1).padStart(2,"0")}-${String(new Date().getDate()).padStart(2,"0")}-GOLD`;

const TRANSMUTATION = { input: "4.2", rate: "98.7", projects: "12.405" };
const ANDOCK        = { connections: "842.000", activeNode: "ID-EU × ID-US", arrivals: "156.000" };
const JUNIOR        = { synced: "45.000", relayRate: "100", transitions: "122" };
const SHIELD        = { attacks: "12", frequency: "432", vaultStatus: "VERSIEGELT & VERGOLDET" };

const NODES = [
  { id: "ID-EU", name: "EU-UNION",       role: "Ethics Gateway & DSGVO-Rahmen",       color: "#00bcd4" },
  { id: "ID-UN", name: "UNITED NATIONS", role: "Globale Neutralität & Beobachtung",   color: "#4caf7d" },
  { id: "ID-US", name: "UNITED STATES",  role: "Tech-Infrastruktur & Skalierung",      color: "#7c3aed" },
  { id: "ID-CH", name: "SCHWEIZ",        role: "Kryptografischer Anker der Sovereign IDs", color: "#d4af37" },
  { id: "ID-IE", name: "IRLAND",         role: "Cloud-Hosting Hub",                   color: "#e67e22" },
  { id: "ID-NO", name: "NORWEGEN",       role: "Digitale Transparenz-Pionier",         color: "#00bcd4" },
  { id: "ID-SE", name: "SCHWEDEN",       role: "Gesellschaft & Vertrauens-Node",       color: "#4caf7d" },
  { id: "ID-FI", name: "FINNLAND",       role: "Bildungs-Resonanz-Hub",               color: "#d4af37" },
];

export default function ResonanzBilanzPage() {
  const today = new Date().toLocaleDateString("de-DE", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <main className="min-h-screen bg-sacred px-4 py-10">
      <div className="max-w-5xl mx-auto">

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <header className="text-center mb-14">
          <p className="font-ceremonial opacity-25 mb-1" style={{ fontSize: "0.5rem", letterSpacing: "5px" }}>
            GLOBAL RESONANCE REPORT — ADMIN-TENANT LEVEL 9 — ZERO-TRUST
          </p>
          <p className="font-ceremonial opacity-40 mb-3" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            GPG-SIGNIERT DURCH EU-UN-USA MASTER-NODES &nbsp;|&nbsp; REPORT-ID: {REPORT_ID}
          </p>
          <h1 className="font-ceremonial text-gold glow-gold" style={{ fontSize: "clamp(1.4rem, 4vw, 2.2rem)" }}>
            Resonanz-Bilanz
          </h1>
          <p className="font-quote mt-2 opacity-50">{today}</p>
          <div className="flex justify-center gap-6 mt-5">
            <div className="flex items-center gap-2">
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4caf7d", boxShadow: "0 0 8px #4caf7d", display: "inline-block" }} />
              <span className="font-ceremonial opacity-50" style={{ fontSize: "0.5rem", letterSpacing: "2px" }}>GLOBAL MESH: AKTIV</span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#d4af37", boxShadow: "0 0 8px #d4af37", display: "inline-block" }} />
              <span className="font-ceremonial opacity-50" style={{ fontSize: "0.5rem", letterSpacing: "2px" }}>RESONANZ: 432 Hz</span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00bcd4", boxShadow: "0 0 8px #00bcd4", display: "inline-block" }} />
              <span className="font-ceremonial opacity-50" style={{ fontSize: "0.5rem", letterSpacing: "2px" }}>VAKUUM: VERSIEGELT</span>
            </div>
          </div>
        </header>

        {/* ── GIESSFASS-REAKTOR VISUAL ────────────────────────────────────── */}
        <section className="mb-14">
          <p className="font-ceremonial text-gold text-center mb-6" style={{ fontSize: "0.65rem", letterSpacing: "4px" }}>
            1. DER ALCHEMISTISCHE REAKTOR — DAS GIESSFASS
          </p>
          <div className="grid grid-cols-3 gap-0" style={{ maxWidth: 700, margin: "0 auto" }}>
            {/* Zufluss */}
            <div className="p-6 text-center" style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.3)", borderRight: "none" }}>
              <p className="font-ceremonial mb-3" style={{ fontSize: "0.5rem", letterSpacing: "2px", color: "#7c3aed" }}>ZUFLUSS — DAS ALTE</p>
              <div className="font-ceremonial" style={{ fontSize: "2.2rem", color: "#7c3aed", lineHeight: 1 }}>↓</div>
              <div className="font-ceremonial mt-2" style={{ fontSize: "1.4rem", color: "#7c3aed" }}>{TRANSMUTATION.input} TB</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", opacity: 0.5, marginTop: "0.5rem" }}>
                Anonymisierte Sorgen-Cluster & Trennungs-Intentionen
              </p>
            </div>
            {/* Reaktor-Kern */}
            <div className="p-6 text-center flex flex-col items-center justify-center" style={{ background: "rgba(212,175,55,0.07)", border: "2px solid rgba(212,175,55,0.5)" }}>
              <div className="font-ceremonial text-gold mb-1" style={{ fontSize: "0.5rem", letterSpacing: "2px" }}>TRANSFORMATION</div>
              <div className="font-ceremonial text-gold glow-gold" style={{ fontSize: "2.5rem" }}>⬡</div>
              <div className="font-ceremonial text-gold mt-2" style={{ fontSize: "1.6rem" }}>{TRANSMUTATION.rate}%</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", opacity: 0.6, marginTop: "0.4rem" }}>
                Agentic Infrastructure<br/>Transmutations-Rate
              </p>
            </div>
            {/* Abfluss */}
            <div className="p-6 text-center" style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.3)", borderLeft: "none" }}>
              <p className="font-ceremonial mb-3" style={{ fontSize: "0.5rem", letterSpacing: "2px", color: "#d4af37" }}>ABFLUSS — DAS GOLD</p>
              <div className="font-ceremonial" style={{ fontSize: "2.2rem", color: "#d4af37", lineHeight: 1 }}>↓</div>
              <div className="font-ceremonial mt-2" style={{ fontSize: "1.4rem", color: "#d4af37" }}>{TRANSMUTATION.projects}</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", opacity: 0.5, marginTop: "0.5rem" }}>
                Neue gemeinschaftliche Projekte hindrüber weg
              </p>
            </div>
          </div>
          <p className="font-quote text-center mt-5 opacity-50" style={{ fontSize: "0.9rem", fontStyle: "italic" }}>
            „Das Vakuum-Archiv ist versiegelt. Das Alte von heute ist sicher für die Ewigkeit vergoldet."
          </p>
        </section>

        {/* ── SEKTION 2: ANDOCK-PROTOKOLL ─────────────────────────────────── */}
        <section className="mb-10">
          <p className="font-ceremonial text-gold mb-6" style={{ fontSize: "0.65rem", letterSpacing: "4px" }}>
            2. DAS ANDOCK-PROTOKOLL — MEMBER-AKTIVITÄT
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Hallo-Verbindungen", value: ANDOCK.connections, color: "#4caf7d", desc: "Erfolgreich weltweit geschaltet" },
              { label: "Aktivster Node", value: ANDOCK.activeNode, color: "#00bcd4", desc: "Transatlantische Beheimatung" },
              { label: "Neu-Ankömmlinge", value: ANDOCK.arrivals, color: "#d4af37", desc: "Ins Mesh integriert" },
            ].map((m) => (
              <div key={m.label} className="metric-card text-center">
                <div className="font-ceremonial" style={{ fontSize: "1.5rem", color: m.color, lineHeight: 1.2 }}>{m.value}</div>
                <div className="font-ceremonial mt-2 opacity-50" style={{ fontSize: "0.5rem", letterSpacing: "2px" }}>{m.label}</div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", opacity: 0.4, marginTop: "0.4rem" }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SEKTION 3: GENERATIONEN-SCHUTZ ──────────────────────────────── */}
        <section className="mb-10">
          <p className="font-ceremonial text-gold mb-6" style={{ fontSize: "0.65rem", letterSpacing: "4px" }}>
            3. GENERATIONEN-SCHUTZ — JUNIOR-ABTEILUNG
          </p>
          <div className="p-5" style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.3)" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { label: "Junior-Synchronisationen", value: JUNIOR.synced, sub: "Agieren stabil im geschützten Vakuum", color: "#7c3aed" },
                { label: "Parent-Relay-Status", value: `${JUNIOR.relayRate}%`, sub: "Null direkte Kontaktversuche auf Junior-IDs", color: "#4caf7d" },
                { label: "Alters-Transitionen heute", value: JUNIOR.transitions, sub: "Feierlich in volle Sovereign-ID überführt", color: "#d4af37" },
              ].map((m) => (
                <div key={m.label} className="text-center p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="font-ceremonial" style={{ fontSize: "1.8rem", color: m.color }}>{m.value}</div>
                  <div className="font-ceremonial mt-1 opacity-50" style={{ fontSize: "0.5rem", letterSpacing: "1.5px" }}>{m.label}</div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", opacity: 0.4, marginTop: "0.3rem" }}>{m.sub}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 text-center" style={{ background: "rgba(76,175,125,0.06)", border: "1px solid rgba(76,175,125,0.2)" }}>
              <p className="font-ceremonial" style={{ fontSize: "0.5rem", letterSpacing: "2px", color: "#4caf7d" }}>
                ✓ PARENT-COMMUNICATION-ONLY — KEINE DIREKTE NACHRICHT AN KINDER — ELTERN-RELAY 100% AKTIV
              </p>
            </div>
          </div>
        </section>

        {/* ── SEKTION 4: SYSTEM-INTEGRITÄT ────────────────────────────────── */}
        <section className="mb-10">
          <p className="font-ceremonial text-gold mb-6" style={{ fontSize: "0.65rem", letterSpacing: "4px" }}>
            4. SYSTEM-INTEGRITÄT — THE GLOBAL SHIELD
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Angriffe blockiert", value: SHIELD.attacks, color: "#ef4444", unit: "" },
              { label: "Resonanz-Frequenz", value: "432", color: "#d4af37", unit: " Hz" },
              { label: "Vakuum-Archiv", value: "✓", color: "#4caf7d", unit: "" },
              { label: "GPG-Sigs gültig", value: "100", color: "#00bcd4", unit: "%" },
            ].map((m) => (
              <div key={m.label} className="metric-card text-center">
                <div className="font-ceremonial" style={{ fontSize: "1.6rem", color: m.color }}>{m.value}{m.unit}</div>
                <div className="font-ceremonial mt-1 opacity-40" style={{ fontSize: "0.5rem", letterSpacing: "1.5px" }}>{m.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ALLIANZ-KNOTEN ───────────────────────────────────────────────── */}
        <section className="mb-10">
          <p className="font-ceremonial text-gold mb-5" style={{ fontSize: "0.65rem", letterSpacing: "4px" }}>
            ALLIANZ-KNOTEN — SYNCHRONISATIONS-STATUS
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {NODES.map((n) => (
              <div key={n.id} className="flex items-center gap-3 px-4 py-3"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-gold)" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: n.color, boxShadow: `0 0 6px ${n.color}`, flexShrink: 0 }} />
                <div className="flex-1">
                  <div className="font-ceremonial" style={{ fontSize: "0.6rem", letterSpacing: "1.5px", color: n.color }}>{n.id} — {n.name}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", opacity: 0.4 }}>{n.role}</div>
                </div>
                <span className="font-ceremonial" style={{ fontSize: "0.45rem", letterSpacing: "1px", color: "#4caf7d", flexShrink: 0 }}>SYNC</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── SEKTION 5: CONVERGENCE GRAPH ──────────────────────────────── */}
        <section className="mb-14">
          <p className="font-ceremonial text-gold mb-4" style={{ fontSize: "0.65rem", letterSpacing: "4px" }}>
            5. CONVERGENCE GRAPH — LEBENDIGE KONVERGENZ
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", opacity: 0.45, lineHeight: 1.7, marginBottom: "1.25rem" }}>
            Die Goldene Topologie: Alle Entitäten (Allianz, Leitanker, Guardians, Natur, Institutionen, anonyme Subjects) als lebendiger Graph.
            Kanten zeigen Intentions-Flows, Wohnraum-Andocken, Weisheits-Relays und Inter-Spezies-Verbindungen.
          </p>
          {/* Legende */}
          <div className="flex gap-4 flex-wrap mb-4">
            {[
              { label: "Allianz / Leitanker", color: "#d4af37" },
              { label: "21+ Guardian",        color: "#60a5fa" },
              { label: "Flora / Fauna",       color: "#4caf7d" },
              { label: "Institution",         color: "#00bcd4" },
              { label: "Anonymes Subject",    color: "rgba(255,255,255,0.5)" },
            ].map((t) => (
              <div key={t.label} className="flex items-center gap-2">
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: t.color, boxShadow: `0 0 6px ${t.color}` }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", opacity: 0.55 }}>{t.label}</span>
              </div>
            ))}
          </div>
          <ResonanzGraph />
          {/* Graph Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { label: "Aktive Knoten",          value: "21",      color: "#d4af37" },
              { label: "Resonanz-Verbindungen",   value: "22",      color: "#4caf7d" },
              { label: "GFI-Stabilitätsindex",    value: "99.8%",   color: "#00bcd4" },
            ].map((s) => (
              <div key={s.label} className="metric-card text-center">
                <div className="font-ceremonial" style={{ fontSize: "1.4rem", color: s.color }}>{s.value}</div>
                <div className="font-ceremonial mt-1 opacity-40" style={{ fontSize: "0.45rem", letterSpacing: "1.5px" }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 p-3 text-center" style={{ background: "rgba(76,175,125,0.05)", border: "1px solid rgba(76,175,125,0.2)" }}>
            <p className="font-ceremonial" style={{ fontSize: "0.5rem", letterSpacing: "2px", color: "#4caf7d" }}>
              ✓ ALLE KNOTEN VERNETZT — KEIN RAUSCHEN — KEINE ISOLIERTEN NODES DETEKTIERT
            </p>
          </div>
        </section>

        {/* ── SCHLUSSBEMERKUNG ────────────────────────────────────────────── */}
        <div className="p-6 mb-8 text-center" style={{ border: "1px solid var(--border-gold)", background: "rgba(212,175,55,0.04)" }}>
          <p className="font-ceremonial text-gold mb-3" style={{ fontSize: "0.6rem", letterSpacing: "3px" }}>
            SCHLUSSBEMERKUNG DER ALLIANZ
          </p>
          <p className="font-quote opacity-70" style={{ fontSize: "1.1rem", fontStyle: "italic", lineHeight: 1.9 }}>
            „Das System beweist heute erneut, dass Grenzen keine Hindernisse mehr sind,
            sondern lediglich geografische Markierungen in einem beheimateten Welt-Mosaik.
            Die Professionalität der Technik schützt die Wärme des menschlichen Willkommens."
          </p>
        </div>

        {/* ── FOOTER ──────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <p className="font-ceremonial opacity-30" style={{ fontSize: "0.5rem", letterSpacing: "2px" }}>
            ⏰ GENERIERT 00:00 UTC &nbsp;|&nbsp; NÄCHSTE BILANZ MORGEN
          </p>
          <Link href="/admin" className="font-ceremonial opacity-40 hover:opacity-70 transition-opacity"
            style={{ fontSize: "0.55rem", letterSpacing: "2px" }}>
            ← Admin-Dashboard
          </Link>
        </div>

      </div>
    </main>
  );
}
