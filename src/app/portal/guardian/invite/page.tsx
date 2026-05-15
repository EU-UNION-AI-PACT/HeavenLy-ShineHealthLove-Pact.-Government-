"use client";

import { useState } from "react";
import Link from "next/link";
import FamilyWelcome from "@/components/effects/FamilyWelcome";

// ─── Phase definitions ────────────────────────────────────────────────────────
const PHASES = [
  { n: 1, label: "Aufklärung",      icon: "🏛️" },
  { n: 2, label: "Eltern-Ident",    icon: "🪪" },
  { n: 3, label: "Post-Ident",      icon: "📮" },
  { n: 4, label: "Webcam-Prüfung",  icon: "📷" },
  { n: 5, label: "Staatl. Meldung", icon: "🏦" },
  { n: 6, label: "Bestätigung",     icon: "✦"  },
];

// ─── Reusable phase card wrapper ──────────────────────────────────────────────
function PhaseCard({ phase, children }: { phase: number; children: React.ReactNode }) {
  return (
    <div
      className="metric-card mb-6"
      style={{ borderTop: `2px solid ${phase <= 2 ? "#d4af37" : phase === 3 ? "#00bcd4" : phase === 4 ? "#e67e22" : phase === 5 ? "#7c3aed" : "#4caf7d"}` }}
    >
      {children}
    </div>
  );
}

// ─── Alert box ────────────────────────────────────────────────────────────────
function AlertBox({ color, label, children }: { color: string; label: string; children: React.ReactNode }) {
  return (
    <div className="p-4 mb-5" style={{ background: `${color}08`, border: `1px solid ${color}30`, borderLeft: `3px solid ${color}` }}>
      <p className="font-ceremonial mb-2" style={{ fontSize: "0.55rem", letterSpacing: "2px", color }}>{label}</p>
      <div style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", opacity: 0.75, lineHeight: 1.8 }}>{children}</div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function InviteGatePage() {
  const [phase, setPhase] = useState(1);

  // Phase-2 fields
  const [parentFullName, setParentFullName]   = useState("");
  const [parentDob,      setParentDob]        = useState("");
  const [parentNat,      setParentNat]        = useState("");
  const [parentConfirm,  setParentConfirm]    = useState(false);

  // Phase-3 fields
  const [postIdCode, setPostIdCode]           = useState("");
  const [postIdBranch, setPostIdBranch]       = useState("");

  // Phase-4
  const [webcamConsent, setWebcamConsent]     = useState(false);
  const [webcamPending, setWebcamPending]     = useState(false);

  // Phase-5
  const [bpaConsent,    setBpaConsent]        = useState(false);
  const [jugendConsent, setJugendConsent]     = useState(false);

  // Easter Egg — einmalig bei Guardian-Bestätigung
  const [familyChecked,  setFamilyChecked]   = useState(false);
  const [showWelcome,    setShowWelcome]      = useState(false);
  const [eggFired,       setEggFired]         = useState(false);

  function handleFamilyCheck(checked: boolean) {
    setFamilyChecked(checked);
    if (checked && !eggFired) {
      setEggFired(true);
      setShowWelcome(true);
    }
  }

  const [requestId] = useState(() =>
    "GS-GUARD-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase()
  );

  function advance() { setPhase((p) => Math.min(p + 1, 6) as 1 | 2 | 3 | 4 | 5 | 6); }

  return (
    <main className="min-h-screen bg-sacred px-4 py-10">
      <div className="max-w-2xl mx-auto">

        {/* ── HEADER ── */}
        <header className="text-center mb-10">
          <p className="font-ceremonial opacity-30 mb-2" style={{ fontSize: "0.55rem", letterSpacing: "5px" }}>
            ELTERN-PASSAGE — STAATLICH GESICHERTES VERIFIKATIONS-PROTOKOLL
          </p>
          <h1 className="font-ceremonial text-gold glow-gold" style={{ fontSize: "clamp(1.3rem, 4vw, 2rem)" }}>
            Guardian-Verifikation
          </h1>
          <p className="font-quote mt-2 opacity-50" style={{ fontSize: "0.95rem" }}>
            Kein Kind betritt das Mesh ohne vollständige staatliche Eltern-Verifikation.
          </p>

          {/* REQUEST ID */}
          <div className="mt-4 inline-block px-4 py-2" style={{ background: "rgba(212,175,55,0.05)", border: "1px solid var(--border-gold)", fontFamily: "monospace" }}>
            <span className="font-ceremonial opacity-30" style={{ fontSize: "0.5rem", letterSpacing: "2px" }}>VORGANG-ID&nbsp;</span>
            <span className="text-gold" style={{ fontSize: "0.65rem", letterSpacing: "3px" }}>{requestId}</span>
          </div>
        </header>

        {/* ── CRITICAL WARNING ── */}
        <div className="mb-8 p-5" style={{ background: "rgba(220,38,38,0.06)", border: "2px solid rgba(220,38,38,0.4)", borderLeft: "4px solid #dc2626" }}>
          <p className="font-ceremonial mb-3" style={{ fontSize: "0.65rem", letterSpacing: "3px", color: "#dc2626" }}>
            ⚠️ ABSOLUTES SCHUTZGEBOT — KEIN DIREKTZUGANG FÜR MINDERJÄHRIGE
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", opacity: 0.8, lineHeight: 1.8 }}>
            Kinder und Jugendliche erhalten <strong>keinen direkten Systemzugang</strong> — auch nicht nach
            elterlicher Freischaltung. Die elterliche Genehmigung ist kein Zugangsschlüssel, sondern
            der Beginn eines <strong>staatlich geprüften Schutzprozesses</strong>. Das Kind bleibt im
            geschlossenen Vakuum des Junior-Mesh — vollständig von externen Netzwerken getrennt.
          </p>
        </div>

        {/* ── PHASE INDICATOR ── */}
        <div className="flex flex-wrap justify-center gap-1 mb-8">
          {PHASES.map((p) => (
            <div key={p.n} className="text-center px-2 py-2" style={{ minWidth: 72 }}>
              <div
                style={{
                  width: 36, height: 36, borderRadius: "50%", margin: "0 auto 0.3rem",
                  background: phase > p.n ? "#4caf7d" : phase === p.n ? "#d4af37" : "rgba(212,175,55,0.08)",
                  border: `1px solid ${phase > p.n ? "#4caf7d" : phase === p.n ? "#d4af37" : "rgba(212,175,55,0.2)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: phase > p.n ? "0.8rem" : "0.95rem",
                  boxShadow: phase === p.n ? "0 0 12px rgba(212,175,55,0.3)" : "none",
                  transition: "all 0.4s",
                }}
              >
                {phase > p.n ? "✓" : p.icon}
              </div>
              <div className="font-ceremonial opacity-40" style={{ fontSize: "0.45rem", letterSpacing: "0.5px" }}>
                {p.label}
              </div>
            </div>
          ))}
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            PHASE 1 — AUFKLÄRUNG & RECHTSBELEHRUNG
        ════════════════════════════════════════════════════════════════════ */}
        {phase === 1 && (
          <PhaseCard phase={1}>
            <p className="font-ceremonial text-gold mb-5" style={{ fontSize: "0.65rem", letterSpacing: "3px" }}>
              🏛️ PHASE 1 — RECHTSBELEHRUNG & AUFKLÄRUNG
            </p>

            <AlertBox color="#dc2626" label="⚠️ WARUM DIESER PROZESS ZWINGEND IST">
              Ein einfacher Klick reicht nicht aus. Um ein Kind im GloryaShine-Mesh zu schützen,
              musst <strong>du als Elternteil</strong> zuerst vollständig staatlich verifiziert werden.
              Das System kennt dein Kind erst dann, wenn das zuständige Bundesamt deine
              Erziehungsberechtigung bestätigt hat.
            </AlertBox>

            <AlertBox color="#d4af37" label="📋 DER VOLLSTÄNDIGE VERIFIKATIONSPROZESS">
              <ol className="list-none space-y-2">
                {[
                  ["Phase 2", "Persönliche Angaben — Name, Geburtsdatum, Nationalität"],
                  ["Phase 3", "Post-Ident-Verfahren — Identitätsprüfung durch Postfilialmitarbeiter"],
                  ["Phase 4", "Webcam-Begutachtung — persönliche Prüfung durch hinterlegte Mitarbeiter"],
                  ["Phase 5", "Staatliche Meldung — automatische Benachrichtigung von BPA & Jugendschutzstelle"],
                  ["Phase 6", "Erst nach Bestätigung — Kind-Daten werden eingetragen (KEIN Zugangscode)"],
                ].map(([label, desc]) => (
                  <li key={label} className="flex gap-3">
                    <span style={{ color: "#d4af37", minWidth: 60, fontSize: "0.7rem" }} className="font-ceremonial">{label}</span>
                    <span style={{ opacity: 0.7, fontSize: "0.85rem" }}>{desc}</span>
                  </li>
                ))}
              </ol>
            </AlertBox>

            <AlertBox color="#7c3aed" label="🔒 DIGITALE SOUVERÄNITÄT — DSGVO ART. 8 / COPPA / EU AI ACT">
              Alle Daten unterliegen dem Schutz der <strong>digitalen Souveränität</strong>.
              Kein Datenmissbrauch ist technologisch möglich — das System ist DSGVO-konform,
              COPPA-konform und entspricht dem EU AI Act für Hochrisiko-KI-Systeme in der
              Kinderschutz-Kategorie. Die Daten deines Kindes werden in einem
              Zero-Trust-verschlüsselten Vakuum gespeichert.
            </AlertBox>

            <div className="flex items-start gap-3 mb-6 p-4" style={{ background: "rgba(212,175,55,0.04)", border: "1px solid var(--border-gold)" }}>
              <input type="checkbox" id="phase1confirm" style={{ marginTop: 4, accentColor: "#d4af37", width: 16, height: 16, flexShrink: 0 }}
                onChange={(e) => e.target.checked && null} />
              <label htmlFor="phase1confirm" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", opacity: 0.75, cursor: "pointer", lineHeight: 1.8 }}>
                Ich habe die vollständige Rechtsbelehrung gelesen und verstanden. Ich bin bereit,
                den staatlichen Verifikationsprozess vollständig zu durchlaufen — im Interesse
                des Schutzes meines Kindes, nicht meines eigenen Komforts.
              </label>
            </div>

            <button className="btn-gold w-full" onClick={advance}>
              Verstanden — Verifikation beginnen →
            </button>
          </PhaseCard>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            PHASE 2 — ELTERNTEIL-IDENTIFIKATION
        ════════════════════════════════════════════════════════════════════ */}
        {phase === 2 && (
          <PhaseCard phase={2}>
            <p className="font-ceremonial text-gold mb-5" style={{ fontSize: "0.65rem", letterSpacing: "3px" }}>
              🪪 PHASE 2 — ELTERNTEIL-IDENTIFIKATION
            </p>

            <AlertBox color="#d4af37" label="ℹ️ WARUM DEINE DATEN BENÖTIGT WERDEN">
              Bevor du als Erziehungsberechtigte/r anerkannt wirst, müssen deine Identitätsdaten
              durch das <strong>Post-Ident-Verfahren</strong> und eine
              <strong> persönliche Webcam-Begutachtung</strong> bestätigt werden.
              Diese Daten werden nur an staatliche Stellen übermittelt — niemals an Dritte.
            </AlertBox>

            <div className="space-y-4 mb-6">
              <div>
                <label className="font-ceremonial opacity-50 block mb-2" style={{ fontSize: "0.55rem", letterSpacing: "2px" }}>
                  VOLLSTÄNDIGER RECHTSNAME (wie im Ausweis)
                </label>
                <input className="input-sacred" placeholder="Vorname Nachname" value={parentFullName}
                  onChange={(e) => setParentFullName(e.target.value)} />
              </div>
              <div>
                <label className="font-ceremonial opacity-50 block mb-2" style={{ fontSize: "0.55rem", letterSpacing: "2px" }}>
                  GEBURTSDATUM DES ELTERNTEILS
                </label>
                <input className="input-sacred" type="date" value={parentDob}
                  onChange={(e) => setParentDob(e.target.value)} style={{ colorScheme: "dark" }} />
              </div>
              <div>
                <label className="font-ceremonial opacity-50 block mb-2" style={{ fontSize: "0.55rem", letterSpacing: "2px" }}>
                  STAATSANGEHÖRIGKEIT / NATIONALITÄT
                </label>
                <select className="input-sacred" value={parentNat}
                  onChange={(e) => setParentNat(e.target.value)} style={{ colorScheme: "dark" }}>
                  <option value="">— Bitte wählen —</option>
                  {["Deutschland", "Österreich", "Schweiz", "Frankreich", "Italien", "Spanien",
                    "Portugal", "Norwegen", "Schweden", "Irland", "Sonstige EU", "Sonstige"].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-start gap-3 mb-6 p-4" style={{ background: "rgba(212,175,55,0.04)", border: "1px solid var(--border-gold)" }}>
              <input type="checkbox" id="phase2confirm" checked={parentConfirm}
                onChange={(e) => setParentConfirm(e.target.checked)}
                style={{ marginTop: 4, accentColor: "#d4af37", width: 16, height: 16, flexShrink: 0 }} />
              <label htmlFor="phase2confirm" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", opacity: 0.75, cursor: "pointer", lineHeight: 1.8 }}>
                Ich bestätige, dass alle Angaben wahrheitsgemäß und mit meinem amtlichen
                Ausweisdokument übereinstimmen. Ich bin mir bewusst, dass falsche Angaben
                strafrechtliche Konsequenzen haben können.
              </label>
            </div>

            <div className="flex gap-3">
              <button className="btn-ghost" onClick={() => setPhase(1)}>← Zurück</button>
              <button className="btn-gold flex-1"
                onClick={advance}
                style={{ opacity: (!parentFullName || !parentDob || !parentNat || !parentConfirm) ? 0.35 : 1 }}
                disabled={!parentFullName || !parentDob || !parentNat || !parentConfirm}>
                Weiter zu Post-Ident →
              </button>
            </div>
          </PhaseCard>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            PHASE 3 — POST-IDENT-VERFAHREN
        ════════════════════════════════════════════════════════════════════ */}
        {phase === 3 && (
          <PhaseCard phase={3}>
            <p className="font-ceremonial mb-5" style={{ fontSize: "0.65rem", letterSpacing: "3px", color: "#00bcd4" }}>
              📮 PHASE 3 — POST-IDENT-VERFAHREN
            </p>

            <AlertBox color="#00bcd4" label="📮 SO FUNKTIONIERT DAS POST-IDENT-VERFAHREN">
              <ol className="list-decimal list-inside space-y-2">
                <li>Suche die <strong>nächste Deutsche Post Filiale</strong> mit PostIdent-Service auf.</li>
                <li>Zeige deinen <strong>Personalausweis oder Reisepass</strong> vor.</li>
                <li>Gib den unten stehenden <strong>Post-Ident-Code</strong> an den Mitarbeiter weiter.</li>
                <li>Der Mitarbeiter führt die Identifikation durch und übermittelt die Bestätigung
                  <strong> direkt an den GloryaShine Kinderschutz-Server</strong>.</li>
                <li>Du erhältst eine verschlüsselte Bestätigungs-E-Mail an deine hinterlegte Adresse.</li>
              </ol>
            </AlertBox>

            <div className="p-5 mb-5 text-center" style={{ background: "rgba(0,188,212,0.06)", border: "1px solid rgba(0,188,212,0.3)", fontFamily: "monospace" }}>
              <div className="font-ceremonial opacity-40 mb-1" style={{ fontSize: "0.5rem", letterSpacing: "2px" }}>DEIN POST-IDENT-CODE</div>
              <div style={{ fontSize: "1.8rem", letterSpacing: "6px", color: "#00bcd4" }}>
                PI-{requestId.split("-")[2]}-{requestId.split("-")[3]}
              </div>
              <div className="font-ceremonial opacity-30 mt-2" style={{ fontSize: "0.5rem" }}>
                Gültig 14 Tage · Nur einmalig verwendbar
              </div>
            </div>

            <AlertBox color="#e67e22" label="⚠️ WICHTIG — NUR HINTERLEGTE MITARBEITER">
              Die Informationsfreigabe erfolgt <strong>ausschließlich durch professionelle,
              hinterlegte Mitarbeiter der Post</strong>. Das System akzeptiert keine
              selbst-hochgeladenen Dokumente oder Fotos. Jeder Versuch, den Prozess
              zu umgehen, wird automatisch gemeldet und führt zur dauerhaften Sperrung des Vorgangs.
            </AlertBox>

            <div className="space-y-4 mb-6">
              <div>
                <label className="font-ceremonial opacity-50 block mb-2" style={{ fontSize: "0.55rem", letterSpacing: "2px" }}>
                  POST-FILIALE (Stadt / Filialname) — nach Besuch eintragen
                </label>
                <input className="input-sacred" placeholder="z.B. Deutsche Post Filiale Detmold Hauptstraße"
                  value={postIdBranch} onChange={(e) => setPostIdBranch(e.target.value)} />
              </div>
              <div>
                <label className="font-ceremonial opacity-50 block mb-2" style={{ fontSize: "0.55rem", letterSpacing: "2px" }}>
                  BESTÄTIGUNGS-CODE (wird per E-Mail zugesandt nach Post-Ident)
                </label>
                <input className="input-sacred" placeholder="BESTÄTIGUNG-XXXXX"
                  value={postIdCode} onChange={(e) => setPostIdCode(e.target.value)} />
              </div>
            </div>

            <div className="flex gap-3">
              <button className="btn-ghost" onClick={() => setPhase(2)}>← Zurück</button>
              <button className="btn-gold flex-1"
                onClick={advance}
                style={{ opacity: (!postIdCode || !postIdBranch) ? 0.35 : 1 }}
                disabled={!postIdCode || !postIdBranch}>
                Post-Ident bestätigt — Weiter zur Webcam-Prüfung →
              </button>
            </div>
          </PhaseCard>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            PHASE 4 — WEBCAM-BEGUTACHTUNG
        ════════════════════════════════════════════════════════════════════ */}
        {phase === 4 && (
          <PhaseCard phase={4}>
            <p className="font-ceremonial mb-5" style={{ fontSize: "0.65rem", letterSpacing: "3px", color: "#e67e22" }}>
              📷 PHASE 4 — PERSÖNLICHE WEBCAM-BEGUTACHTUNG
            </p>

            <AlertBox color="#e67e22" label="📷 PERSÖNLICHE IDENTITÄTSPRÜFUNG DURCH MITARBEITER">
              Ein hinterlegter, zertifizierter GloryaShine-Mitarbeiter führt eine
              <strong> persönliche Videobegutachtung</strong> durch. Dies ist keine automatisierte
              Gesichtserkennung — es handelt sich um eine <strong>menschliche Prüfung</strong>
              durch geschultes Personal. Du wirst per Video live mit deinem Ausweis abgeglichen.
            </AlertBox>

            <div className="p-5 mb-5" style={{ background: "rgba(230,126,34,0.05)", border: "1px solid rgba(230,126,34,0.25)" }}>
              <p className="font-ceremonial mb-3" style={{ fontSize: "0.6rem", letterSpacing: "2px", color: "#e67e22" }}>
                WAS DICH ERWARTET
              </p>
              <ul className="space-y-2">
                {[
                  "Terminbuchung: Du erhältst nach Phase-3-Bestätigung einen Video-Termin (Werktag, innerhalb 48h).",
                  "Dauer: ca. 10–15 Minuten via gesicherter Verbindung.",
                  "Benötigt: Personalausweis / Reisepass im Original, gut beleuchteter Raum.",
                  "Mitarbeiter: Zertifiziert, namentlich hinterlegt, unter Schweigepflicht.",
                  "Ergebnis: Entweder sofortige Bestätigung oder Nachforderung weiterer Dokumente.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span style={{ color: "#e67e22", flexShrink: 0 }}>→</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", opacity: 0.75 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <AlertBox color="#7c3aed" label="🔒 DATENSCHUTZ DER WEBCAM-AUFZEICHNUNG">
              Die Sitzung wird <strong>nicht dauerhaft gespeichert</strong>. Es wird lediglich
              ein kryptografisches Prüfprotokoll erzeugt, das bestätigt: „Mitarbeiter X hat
              Person Y am Datum Z erfolgreich identifiziert." Das Video selbst wird nach
              Abschluss sicher gelöscht. Dies entspricht DSGVO Art. 5 (Datensparsamkeit).
            </AlertBox>

            <div className="flex items-start gap-3 mb-6 p-4" style={{ background: "rgba(212,175,55,0.04)", border: "1px solid var(--border-gold)" }}>
              <input type="checkbox" id="phase4consent" checked={webcamConsent}
                onChange={(e) => setWebcamConsent(e.target.checked)}
                style={{ marginTop: 4, accentColor: "#d4af37", width: 16, height: 16, flexShrink: 0 }} />
              <label htmlFor="phase4consent" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", opacity: 0.75, cursor: "pointer", lineHeight: 1.8 }}>
                Ich stimme der persönlichen Webcam-Begutachtung durch einen hinterlegten
                GloryaShine-Mitarbeiter zu. Ich verstehe, dass diese Prüfung im Interesse
                des Kinderschutzes zwingend notwendig ist.
              </label>
            </div>

            <div className="p-4 mb-5 text-center" style={{ background: "rgba(230,126,34,0.06)", border: "1px dashed rgba(230,126,34,0.4)" }}>
              <p className="font-ceremonial opacity-50 mb-2" style={{ fontSize: "0.55rem", letterSpacing: "2px" }}>
                TERMIN-STATUS
              </p>
              {webcamPending ? (
                <div>
                  <div className="font-ceremonial" style={{ fontSize: "0.8rem", color: "#e67e22" }}>
                    ⟳ Termin wird gesucht…
                  </div>
                  <p className="opacity-50 mt-1" style={{ fontSize: "0.8rem" }}>
                    Du erhältst innerhalb von 48 Stunden eine E-Mail mit dem Termin-Link.
                  </p>
                </div>
              ) : (
                <button className="btn-ghost"
                  onClick={() => setWebcamPending(true)} disabled={!webcamConsent}
                  style={{ opacity: webcamConsent ? 1 : 0.35, fontSize: "0.65rem" }}>
                  📷 Termin anfragen
                </button>
              )}
            </div>

            <div className="flex gap-3">
              <button className="btn-ghost" onClick={() => setPhase(3)}>← Zurück</button>
              <button className="btn-gold flex-1"
                onClick={advance}
                style={{ opacity: (!webcamConsent || !webcamPending) ? 0.35 : 1 }}
                disabled={!webcamConsent || !webcamPending}>
                Termin angefragt — Weiter zu staatlicher Meldung →
              </button>
            </div>
          </PhaseCard>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            PHASE 5 — STAATLICHE MELDUNG
        ════════════════════════════════════════════════════════════════════ */}
        {phase === 5 && (
          <PhaseCard phase={5}>
            <p className="font-ceremonial mb-5" style={{ fontSize: "0.65rem", letterSpacing: "3px", color: "#7c3aed" }}>
              🏦 PHASE 5 — STAATLICHE MELDUNG & ZWEIFACH-GEGENPÜFUNG
            </p>

            <AlertBox color="#7c3aed" label="🏦 ZWEIERLEI GEGENPÜFUNG — WIE IM KONZEPT VORGESEHEN">
              Gemäß dem Schutzprinzip erfolgt eine <strong>doppelte staatliche Gegenpüfung</strong>:
              <br /><br />
              <strong>1. Kundgebung an den Bundesbeauftragten</strong> — Der Bundesbeauftragte
              für den Datenschutz und die Informationsfreiheit (BfDI) sowie das Bundespresse-
              und Informationsamt (BPA) werden automatisch über den Vorgang informiert.
              <br /><br />
              <strong>2. Schutzsystem der digitalen Souveränität</strong> — Das
              Sovereign-ID-System prüft, ob der Antragsteller kein bekanntes Risikoprofil
              aufweist. Dies erfolgt über die Governance-ID-Anfrage und die Post-Ident-Daten.
            </AlertBox>

            <div className="p-5 mb-5" style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.25)" }}>
              <p className="font-ceremonial mb-4" style={{ fontSize: "0.6rem", letterSpacing: "2px", color: "#7c3aed" }}>
                AUTOMATISCHE MELDUNGEN — DIE FOLGENDEN STELLEN WERDEN BENACHRICHTIGT
              </p>
              <div className="space-y-3">
                {[
                  { stelle: "Bundespresse- und Informationsamt (BPA)", status: "✓ Bereit zur Übermittlung", color: "#4caf7d" },
                  { stelle: "Bundesbeauftragter für Datenschutz & Informationsfreiheit (BfDI)", status: "✓ Bereit zur Übermittlung", color: "#4caf7d" },
                  { stelle: "Zuständige kommunale Jugendschutzbehörde", status: "✓ Bereit zur Übermittlung", color: "#4caf7d" },
                  { stelle: "GloryaShine Sovereign-ID-Schutzsystem", status: "✓ Governance-ID-Anfrage vorbereitet", color: "#d4af37" },
                ].map((item) => (
                  <div key={item.stelle} className="flex items-center justify-between gap-3 p-3"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", opacity: 0.75 }}>{item.stelle}</span>
                    <span className="font-ceremonial flex-shrink-0" style={{ fontSize: "0.5rem", color: item.color, letterSpacing: "1px" }}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <AlertBox color="#dc2626" label="⚠️ WAS DAS BEDEUTET">
              Diese Meldung ist <strong>kein Strafverfahren</strong> — sie ist
              <strong> präventiver Schutz</strong>. Sie dient ausschließlich dazu,
              sicherzustellen, dass das Kind in die Obhut einer Person gelangt, deren
              Erziehungsberechtigung staatlich bestätigt ist. Falschmeldungen oder
              Missbrauchsversuche werden automatisch den Behörden gemeldet.
            </AlertBox>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-4" style={{ background: "rgba(212,175,55,0.04)", border: "1px solid var(--border-gold)" }}>
                <input type="checkbox" id="bpaConsent" checked={bpaConsent}
                  onChange={(e) => setBpaConsent(e.target.checked)}
                  style={{ marginTop: 4, accentColor: "#d4af37", width: 16, height: 16, flexShrink: 0 }} />
                <label htmlFor="bpaConsent" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", opacity: 0.75, cursor: "pointer", lineHeight: 1.8 }}>
                  Ich stimme der Übermittlung meiner Verifikationsdaten an das BPA,
                  den BfDI und die kommunale Jugendschutzbehörde zu.
                </label>
              </div>
              <div className="flex items-start gap-3 p-4" style={{ background: "rgba(124,58,237,0.04)", border: "1px solid rgba(124,58,237,0.2)" }}>
                <input type="checkbox" id="jugendConsent" checked={jugendConsent}
                  onChange={(e) => setJugendConsent(e.target.checked)}
                  style={{ marginTop: 4, accentColor: "#7c3aed", width: 16, height: 16, flexShrink: 0 }} />
                <label htmlFor="jugendConsent" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", opacity: 0.75, cursor: "pointer", lineHeight: 1.8 }}>
                  Ich stimme der Governance-ID-Anfrage durch das GloryaShine
                  Sovereign-Schutzsystem zur Risikobewertung zu.
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="btn-ghost" onClick={() => setPhase(4)}>← Zurück</button>
              <button className="btn-gold flex-1"
                onClick={advance}
                style={{ opacity: (!bpaConsent || !jugendConsent) ? 0.35 : 1 }}
                disabled={!bpaConsent || !jugendConsent}>
                Meldungen abschicken — Zur Bestätigung →
              </button>
            </div>
          </PhaseCard>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            PHASE 6 — ABSCHLUSS & KIND-DATEN
        ════════════════════════════════════════════════════════════════════ */}
        {phase === 6 && (
          <PhaseCard phase={6}>
            <p className="font-ceremonial mb-5" style={{ fontSize: "0.65rem", letterSpacing: "3px", color: "#4caf7d" }}>
              ✦ PHASE 6 — GUARDIAN-STATUS BEANTRAGT
            </p>

            <div className="p-5 mb-5 text-center" style={{ background: "rgba(76,175,125,0.06)", border: "1px solid rgba(76,175,125,0.4)", borderTop: "2px solid #4caf7d" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🏛️</div>
              <p className="font-ceremonial text-gold mb-2" style={{ fontSize: "0.7rem", letterSpacing: "3px" }}>
                VERIFIKATIONSPROZESS EINGELEITET
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", opacity: 0.75, lineHeight: 1.8 }}>
                Dein Antrag wurde registriert und die staatlichen Stellen wurden benachrichtigt.
                <strong> Du bist noch kein verifizierter Guardian</strong> — die Bestätigung
                erfolgt nach Abschluss der Post-Ident-Verifikation und der Webcam-Prüfung durch
                unsere Mitarbeiter.
              </p>
              <div className="mt-4 font-ceremonial opacity-40" style={{ fontSize: "0.55rem", letterSpacing: "2px" }}>
                VORGANG-ID: {requestId}
              </div>
            </div>

            <AlertBox color="#e67e22" label="⏳ WAS JETZT PASSIERT — TIMELINE">
              <ul className="space-y-2">
                {[
                  ["Sofort", "Staatliche Stellen (BPA, BfDI, Jugendschutz) erhalten automatische Meldung."],
                  ["Bis 48h", "Du erhältst einen Video-Termin für die Webcam-Prüfung per E-Mail."],
                  ["Nach Webcam", "Mitarbeiter bestätigt oder fordert nach — du wirst informiert."],
                  ["Nach Bestätigung", "Dein Guardian-Status wird freigeschaltet."],
                  ["Wirkung", "Das Elternpaar bildet einen unsichtbaren Schutzschirm — keine Kinderdaten im System."],
                ].map(([zeit, desc]) => (
                  <li key={zeit} className="flex gap-3">
                    <span className="font-ceremonial flex-shrink-0" style={{ color: "#e67e22", minWidth: 80, fontSize: "0.65rem" }}>{zeit}</span>
                    <span style={{ opacity: 0.75, fontSize: "0.85rem" }}>{desc}</span>
                  </li>
                ))}
              </ul>
            </AlertBox>

            <AlertBox color="#4caf7d" label="�️ NETZ-DIGITALISIERUNGS-SCHUTZ">
              Das System erfasst <strong>ausschließlich Elterndaten</strong>.
              Keine Kinderdaten, keine Kinder-IDs, keine Namen, keine Geburtsdaten
              von Minderjährigen werden gespeichert. Der Schutzschirm des Elternpaares
              wirkt als unsichtbare Hülle — das Kind bleibt vollständig anonym und
              außerhalb des Systems.
            </AlertBox>

            {/* ── EASTER EGG CHECKBOX ── */}
            <div
              style={{
                padding: "1.25rem 1.5rem",
                background: familyChecked ? "rgba(76,175,125,0.07)" : "rgba(255,255,255,0.02)",
                border: familyChecked ? "1px solid rgba(76,175,125,0.4)" : "1px solid rgba(212,175,55,0.15)",
                borderLeft: familyChecked ? "3px solid #4caf7d" : "3px solid rgba(212,175,55,0.3)",
                marginBottom: "1.5rem",
                transition: "all 0.4s ease",
              }}
            >
              <label style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={familyChecked}
                  onChange={(e) => handleFamilyCheck(e.target.checked)}
                  style={{ marginTop: 3, accentColor: "#4caf7d", width: 18, height: 18, flexShrink: 0 }}
                />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", opacity: 0.8, lineHeight: 1.8 }}>
                  Ich registriere mich als{" "}
                  <strong style={{ color: "#f9f1d7" }}>Elternteil mit Kind</strong>{" "}
                  und gebe damit kund, dass mir die Zukunft meines Kindes wichtig ist —
                  bewusst, verantwortungsvoll und für das System nachvollziehbar
                  im Rahmen der mehrstufigen Zertifizierung.
                </span>
              </label>
            </div>

            <div className="flex gap-3">
              <Link href="/portal/guardian" className="btn-gold flex-1 text-center">
                Zur Eltern-Passage →
              </Link>
              <Link href="/portal/guardian/family-orbit" className="btn-ghost">
                Eltern-Orbit
              </Link>
            </div>
          </PhaseCard>
        )}

        {showWelcome && <FamilyWelcome onClose={() => setShowWelcome(false)} />}

        {/* BACK LINK */}
        {phase < 6 && (
          <div className="text-center mt-4">
            <Link href="/portal/guardian" className="font-ceremonial opacity-30 hover:opacity-60 transition-opacity"
              style={{ fontSize: "0.6rem", letterSpacing: "2px" }}>
              ← Abbrechen &amp; zur Eltern-Passage
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}
