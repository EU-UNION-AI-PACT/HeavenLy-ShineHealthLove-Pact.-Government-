"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Graduelle Freigabe-Module ────────────────────────────────────────────────
const MODULES = [
  { id: "news",     label: "Resonanz-Feed lesen",         desc: "Globale News und Allianz-Berichte empfangen",        color: "#00bcd4" },
  { id: "giessfass",label: "Im Gießfass agieren",         desc: "Eigene Intentionen ins Gießfass einbringen",         color: "#d4af37" },
  { id: "vacancy",  label: "Vakanzen begrüßen",           desc: "Anderen Ankömmlingen Hallo sagen",                   color: "#4caf7d" },
  { id: "petition", label: "Fürbitten einreichen",        desc: "Eigene Fürbitten in die Gemeinschaft tragen",        color: "#e67e22" },
  { id: "workspace",label: "Globale Workspaces betreten", desc: "In EU/UN/USA Workspaces mitarbeiten",                color: "#7c3aed" },
  { id: "mentor",   label: "Mentorenschaft übernehmen",   desc: "Selbst Vakanzen neuer Ankömmlinge füllen",           color: "#d4af37" },
];

// Demo-Kind für die Demonstration
const DEMO_CHILD = {
  name: "Mein Kind",
  juniorId: "ID-JNR-GLOB-DE-x7k2p",
  dob: "2008-05-15",
  transition: new Date(new Date("2008-05-15").setFullYear(2026)).toLocaleDateString("de-DE"),
  status: "AWAITING_PARENTAL_CONSENT" as const,
};

export default function AgeTransitionPage() {
  const [parentConsent, setParentConsent] = useState(false);
  const [childConsent, setChildConsent] = useState(false);
  const [postIdentCode, setPostIdentCode] = useState("");
  const [enabledModules, setEnabledModules] = useState<Set<string>>(new Set(["news"]));
  const [submitted, setSubmitted] = useState(false);

  function toggleModule(id: string) {
    setEnabledModules((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const canSubmit = parentConsent && childConsent && postIdentCode.length > 6;

  return (
    <main className="min-h-screen bg-sacred px-4 py-10">
      <div className="max-w-2xl mx-auto">

        {/* HEADER */}
        <header className="text-center mb-10">
          <p className="font-ceremonial opacity-30 mb-2" style={{ fontSize: "0.55rem", letterSpacing: "5px" }}>
            ALTERS-TRANSITION-GATE — KEIN AUTOMATISMUS
          </p>
          <h1 className="font-ceremonial text-gold glow-gold" style={{ fontSize: "clamp(1.3rem, 4vw, 2rem)" }}>
            Junior → Sovereign ID
          </h1>
          <p className="font-quote mt-2 opacity-50" style={{ fontSize: "0.95rem" }}>
            Der Übergang findet nur mit bewusster Übergabe statt — nie durch Algorithmus.
          </p>
        </header>

        {/* CORE PRINCIPLE */}
        <div className="mb-8 p-5" style={{ background: "rgba(212,175,55,0.05)", border: "2px solid rgba(212,175,55,0.3)", borderLeft: "4px solid #d4af37" }}>
          <p className="font-ceremonial text-gold mb-3" style={{ fontSize: "0.65rem", letterSpacing: "3px" }}>
            🔑 DAS LEITPRINZIP — WIE EIN FÜHRERSCHEIN
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", opacity: 0.8, lineHeight: 1.8 }}>
            Digitale Souveränität bekommt man nicht einfach, weil man 18 wird. Man erhält sie, weil man
            bewiesen hat, dass man die Verantwortung tragen kann — und weil die Eltern als erste Hüter
            diesen Weg <strong>bewusst freigeben</strong>. Das Government stellt das Werkzeug bereit.
            <strong> Die Familie entscheidet.</strong>
          </p>
        </div>

        {!submitted ? (
          <>
            {/* PENDING CHILD CARD */}
            <div className="metric-card mb-6" style={{ borderTop: "2px solid #e67e22" }}>
              <p className="font-ceremonial mb-4" style={{ fontSize: "0.65rem", letterSpacing: "3px", color: "#e67e22" }}>
                ⏳ TRANSITION BEREIT — {DEMO_CHILD.transition}
              </p>
              <div className="flex items-center justify-between gap-4 p-4 mb-4"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-gold)" }}>
                <div>
                  <div className="font-ceremonial text-gold" style={{ fontSize: "0.7rem", letterSpacing: "2px" }}>{DEMO_CHILD.name}</div>
                  <div className="font-ceremonial opacity-30 mt-1" style={{ fontSize: "0.5rem", letterSpacing: "1px" }}>{DEMO_CHILD.juniorId}</div>
                </div>
                <div className="text-right">
                  <div className="font-ceremonial" style={{ fontSize: "0.5rem", letterSpacing: "1px", color: "#e67e22" }}>STATUS</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", opacity: 0.7 }}>Wartet auf Vier-Augen-Bestätigung</div>
                </div>
              </div>

              {/* 3-FAKTOR-PROTOKOLL */}
              <p className="font-ceremonial opacity-40 mb-4" style={{ fontSize: "0.55rem", letterSpacing: "2px" }}>
                DREI-FAKTOREN-PROTOKOLL
              </p>
              <div className="space-y-3 mb-6">
                {/* Faktor 1 — Eltern */}
                <div className="flex items-start gap-3 p-4" style={{ background: "rgba(212,175,55,0.04)", border: "1px solid var(--border-gold)" }}>
                  <input type="checkbox" id="parentConsent" checked={parentConsent}
                    onChange={(e) => setParentConsent(e.target.checked)}
                    style={{ marginTop: 4, accentColor: "#d4af37", width: 16, height: 16, flexShrink: 0 }} />
                  <div>
                    <label htmlFor="parentConsent" className="font-ceremonial" style={{ fontSize: "0.55rem", letterSpacing: "2px", color: "#d4af37", cursor: "pointer" }}>
                      FAKTOR 1 — ELTERLICHE ZUSTIMMUNG
                    </label>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", opacity: 0.7, marginTop: "0.3rem", lineHeight: 1.7 }}>
                      Ich gebe als Erziehungsberechtigte/r die Sovereign-ID-Transition meines Kindes frei.
                      Ich habe sein Einverständnis persönlich eingeholt und bin überzeugt, dass es bereit ist.
                    </p>
                  </div>
                </div>

                {/* Faktor 2 — Kind-Mitsprache */}
                <div className="flex items-start gap-3 p-4" style={{ background: "rgba(76,175,125,0.04)", border: "1px solid rgba(76,175,125,0.25)" }}>
                  <input type="checkbox" id="childConsent" checked={childConsent}
                    onChange={(e) => setChildConsent(e.target.checked)}
                    style={{ marginTop: 4, accentColor: "#4caf7d", width: 16, height: 16, flexShrink: 0 }} />
                  <div>
                    <label htmlFor="childConsent" className="font-ceremonial" style={{ fontSize: "0.55rem", letterSpacing: "2px", color: "#4caf7d", cursor: "pointer" }}>
                      FAKTOR 2 — MITSPRACHERECHT DES JUGENDLICHEN
                    </label>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", opacity: 0.7, marginTop: "0.3rem", lineHeight: 1.7 }}>
                      Mein Kind wurde informiert und hat dem Übergang in die volle Sovereign-ID
                      im gemeinsamen Gespräch zugestimmt. Der Übergang erfolgt gemeinsam — nicht über seinen Kopf hinweg.
                    </p>
                  </div>
                </div>

                {/* Faktor 3 — Staatliche Validierung */}
                <div className="p-4" style={{ background: "rgba(0,188,212,0.04)", border: "1px solid rgba(0,188,212,0.25)" }}>
                  <p className="font-ceremonial mb-3" style={{ fontSize: "0.55rem", letterSpacing: "2px", color: "#00bcd4" }}>
                    FAKTOR 3 — STAATLICHE VALIDIERUNG (POST-IDENT / eID)
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", opacity: 0.7, lineHeight: 1.7, marginBottom: "0.75rem" }}>
                    Der Jugendliche muss sich einmalig via <strong>Post-Ident oder eID</strong> verifizieren.
                    Erst dieser staatliche Abgleich aktiviert den finalen kryptografischen Schlüssel.
                    Die Sovereign-ID bleibt innerhalb der Community pseudonym.
                  </p>
                  <input className="input-sacred" placeholder="Staatl. Validierungs-Code (nach Post-Ident)"
                    value={postIdentCode} onChange={(e) => setPostIdentCode(e.target.value)} />
                </div>
              </div>

              {/* GRADUELLE FREIGABE */}
              <p className="font-ceremonial opacity-40 mb-3" style={{ fontSize: "0.55rem", letterSpacing: "2px" }}>
                GRADUELLE FREIGABE-MODULE — WÄHLE WAS DU HEUTE ÖFFNEST
              </p>
              <div className="grid grid-cols-1 gap-2 mb-6">
                {MODULES.map((m) => (
                  <button key={m.id} onClick={() => toggleModule(m.id)}
                    className="flex items-center gap-3 p-3 text-left transition-all"
                    style={{
                      background: enabledModules.has(m.id) ? `${m.color}12` : "rgba(255,255,255,0.02)",
                      border: `1px solid ${enabledModules.has(m.id) ? m.color + "60" : "rgba(255,255,255,0.06)"}`,
                    }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                      background: enabledModules.has(m.id) ? m.color : "transparent",
                      border: `2px solid ${m.color}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.55rem", color: "#0a0c10",
                    }}>
                      {enabledModules.has(m.id) ? "✓" : ""}
                    </div>
                    <div>
                      <div className="font-ceremonial" style={{ fontSize: "0.6rem", letterSpacing: "1px", color: m.color }}>{m.label}</div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", opacity: 0.5 }}>{m.desc}</div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-3 mb-5 text-center" style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.2)" }}>
                <p className="font-ceremonial opacity-50" style={{ fontSize: "0.5rem", letterSpacing: "1px" }}>
                  ANONYMITÄT-OPTION: Bestimmte Schutzfilter bleiben auch nach Transition aktiv, bis du sie manuell deaktivierst.
                  Das Kind kann trotzdem eigenständig agieren — geschützt vor den &quot;schweren Maschinen&quot; der vollen globalen Verantwortung.
                </p>
              </div>

              <button className="btn-gold w-full"
                onClick={() => setSubmitted(true)}
                style={{ opacity: canSubmit ? 1 : 0.35 }}
                disabled={!canSubmit}>
                Vier-Augen-Bestätigung abschicken — Transition einleiten →
              </button>
            </div>
          </>
        ) : (
          /* SUCCESS */
          <div className="metric-card text-center mb-6" style={{ borderTop: "2px solid #4caf7d" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>⬡</div>
            <p className="font-ceremonial text-gold mb-2" style={{ fontSize: "0.7rem", letterSpacing: "3px" }}>
              TRANSITION EINGELEITET — STAAT WIRD BENACHRICHTIGT
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", opacity: 0.75, lineHeight: 1.8, marginBottom: "1rem" }}>
              Der kryptografische Schlüsselwechsel läuft. Sobald der Staat den Code bestätigt,
              wird <strong>{DEMO_CHILD.name}</strong> feierlich in den Status der vollen Sovereign-ID überführt.
            </p>
            <div className="p-4 mb-5" style={{ background: "rgba(76,175,125,0.06)", border: "1px solid rgba(76,175,125,0.3)" }}>
              <p className="font-ceremonial opacity-40 mb-1" style={{ fontSize: "0.5rem", letterSpacing: "2px" }}>FREIGEGEBENE MODULE</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {MODULES.filter((m) => enabledModules.has(m.id)).map((m) => (
                  <span key={m.id} className="font-ceremonial" style={{ fontSize: "0.5rem", letterSpacing: "1px", color: m.color, border: `1px solid ${m.color}40`, padding: "2px 8px" }}>
                    {m.label}
                  </span>
                ))}
              </div>
            </div>
            <Link href="/portal/guardian" className="btn-gold">Zur Eltern-Passage →</Link>
          </div>
        )}

        {/* ALLIANZ-MONITOR BOX */}
        <div className="p-4 mb-6" style={{ background: "rgba(124,58,237,0.04)", border: "1px solid rgba(124,58,237,0.2)" }}>
          <p className="font-ceremonial mb-3" style={{ fontSize: "0.55rem", letterSpacing: "2px", color: "#7c3aed" }}>
            🏦 GOVERNANCE MONITOR — ALLIANZ-STATUS
          </p>
          <div className="space-y-2">
            {[
              { label: "EU-Kinderschutz-Rahmen (DSGVO Art. 8)", status: "AKTIV", color: "#4caf7d" },
              { label: "Staatl. Validierungs-Kanal (Post-Ident / eID)", status: "BEREIT", color: "#d4af37" },
              { label: "Junior-Anonymität bis Transition", status: "GESICHERT", color: "#00bcd4" },
              { label: "Automatismus-Sperre (kein Auto-Pilot)", status: "ERZWUNGEN", color: "#dc2626" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-2">
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", opacity: 0.65 }}>{item.label}</span>
                <span className="font-ceremonial" style={{ fontSize: "0.45rem", letterSpacing: "1px", color: item.color, flexShrink: 0 }}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/portal/guardian" className="font-ceremonial opacity-30 hover:opacity-60 transition-opacity"
            style={{ fontSize: "0.6rem", letterSpacing: "2px" }}>
            ← Zurück zur Eltern-Passage
          </Link>
        </div>

      </div>
    </main>
  );
}
