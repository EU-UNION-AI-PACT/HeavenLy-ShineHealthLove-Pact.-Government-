"use client";

import { useState } from "react";
import Link from "next/link";

const NODES = [
  { id: "ID-EU", country: "Deutschland", flag: "🇩🇪", api: true,  transitionen: 1240, integrity: 100, standard: "BSI-Standard",    warning: false },
  { id: "ID-CH", country: "Schweiz",     flag: "🇨🇭", api: true,  transitionen: 450,  integrity: 100, standard: "SwissID-Sync",    warning: false },
  { id: "ID-US", country: "USA",         flag: "🇺🇸", api: true,  transitionen: 3100, integrity: 99.9, standard: "Gov-Cloud",      warning: false },
  { id: "ID-IE", country: "Irland",      flag: "🇮🇪", api: false, transitionen: 85,   integrity: 100, standard: "Local-Safe",       warning: true  },
  { id: "ID-NO", country: "Norwegen",    flag: "🇳🇴", api: true,  transitionen: 210,  integrity: 100, standard: "BankID-Sync",      warning: false },
];

const CHECKLIST = [
  { id: "eltern",   label: "Eltern-Konsens",        desc: "Kryptografische Signatur beider Elternteile liegt vor" },
  { id: "gov",      label: "Gov-Handshake",          desc: "Positives Signal vom staatlichen ID-Server (Post-Ident/eID) empfangen" },
  { id: "zk",       label: "Zero-Knowledge-Check",   desc: "Alle Junior-Daten im Vakuum-Archiv versiegelt und vom neuen Account getrennt" },
  { id: "hw",       label: "Hardware-Anchor",        desc: "Neuer physischer Sicherheits-Key (YubiKey/GPG) durch den Jugendlichen registriert" },
  { id: "anon",     label: "Anonymitäts-Schild",     desc: "Kein Klarname im öffentlichen Mesh trotz staatlicher Prüfung" },
];

export default function TransitionRadarPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [locked, setLocked] = useState<Record<string, boolean>>({});
  const [lockConfirm, setLockConfirm] = useState<string | null>(null);

  const toggleCheck = (id: string) => setChecked((p) => ({ ...p, [id]: !p[id] }));
  const confirmLock  = (id: string) => setLockConfirm(id);
  const executeLock  = () => {
    if (lockConfirm) {
      setLocked((p) => ({ ...p, [lockConfirm]: true }));
      setLockConfirm(null);
    }
  };
  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <main className="min-h-screen bg-sacred px-4 py-10">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <header className="text-center mb-12">
          <p className="font-ceremonial opacity-25 mb-1" style={{ fontSize: "0.5rem", letterSpacing: "5px" }}>
            ADMIN · ALLIANZ-SICHERHEIT
          </p>
          <h1 className="font-ceremonial text-gold glow-gold" style={{ fontSize: "clamp(1.3rem,4vw,2rem)" }}>
            Global-Transition-Radar
          </h1>
          <p className="font-quote mt-2 opacity-50" style={{ fontSize: "0.9rem" }}>
            Echtzeit-Überblick der Junior → Sovereign Transitionen über alle Allianz-Nodes
          </p>
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            {["EU-UNION", "SCHWEIZ", "USA", "IRLAND", "NORWEGEN"].map((n) => (
              <span key={n} className="font-ceremonial text-gold" style={{ fontSize: "0.45rem", letterSpacing: "2px", border: "1px solid rgba(212,175,55,0.25)", padding: "2px 8px" }}>
                {n}
              </span>
            ))}
          </div>
        </header>

        {/* LÄNDER-NODE-TABELLE */}
        <section className="mb-10">
          <p className="font-ceremonial opacity-35 mb-4" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            LÄNDER-NODE STATUS — POST-IDENT API
          </p>
          <div className="overflow-x-auto">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(212,175,55,0.2)" }}>
                  {["Node", "Land", "Post-Ident API", "Aktive Transitionen", "Integrität", "Standard", "Aktion"].map((h) => (
                    <th key={h} className="font-ceremonial" style={{ fontSize: "0.45rem", letterSpacing: "1px", padding: "8px 12px", textAlign: "left", opacity: 0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {NODES.map((n) => (
                  <tr key={n.id} style={{
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    background: locked[n.id] ? "rgba(220,38,38,0.05)" : n.warning ? "rgba(245,158,11,0.04)" : "transparent",
                  }}>
                    <td className="font-ceremonial" style={{ fontSize: "0.6rem", padding: "10px 12px", color: "#d4af37" }}>{n.id}</td>
                    <td style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", padding: "10px 12px" }}>{n.flag} {n.country}</td>
                    <td style={{ padding: "10px 12px" }}>
                      {locked[n.id]
                        ? <span style={{ color: "#ef4444", fontSize: "0.75rem" }}>🔒 GESPERRT</span>
                        : n.api
                          ? <span style={{ color: "#4caf7d", fontSize: "0.8rem" }}>✅ Verbunden</span>
                          : <span style={{ color: "#f59e0b", fontSize: "0.8rem" }}>⚠️ Wartung</span>
                      }
                    </td>
                    <td className="font-ceremonial" style={{ fontSize: "0.75rem", padding: "10px 12px", color: "#d4af37" }}>{n.transitionen.toLocaleString()}</td>
                    <td style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", padding: "10px 12px" }}>
                      <span style={{ color: n.integrity >= 100 ? "#4caf7d" : "#f59e0b" }}>{n.integrity}%</span>
                    </td>
                    <td style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", padding: "10px 12px", opacity: 0.55 }}>{n.standard}</td>
                    <td style={{ padding: "10px 12px" }}>
                      {!locked[n.id] ? (
                        <button onClick={() => confirmLock(n.id)}
                          className="font-ceremonial"
                          style={{ fontSize: "0.45rem", letterSpacing: "1px", border: "1px solid rgba(220,38,38,0.4)", padding: "3px 8px", color: "#ef4444", background: "transparent", cursor: "pointer" }}>
                          TRANSITION LOCK
                        </button>
                      ) : (
                        <button onClick={() => setLocked((p) => ({ ...p, [n.id]: false }))}
                          className="font-ceremonial"
                          style={{ fontSize: "0.45rem", letterSpacing: "1px", border: "1px solid rgba(212,175,55,0.3)", padding: "3px 8px", color: "#d4af37", background: "transparent", cursor: "pointer" }}>
                          ENTSPERREN
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-ceremonial mt-2 opacity-25" style={{ fontSize: "0.45rem", letterSpacing: "1px" }}>
            Gesamt aktive Transitionen: {NODES.reduce((a, n) => a + n.transitionen, 0).toLocaleString()} · Stand: {new Date().toLocaleDateString("de-DE")}
          </p>
        </section>

        {/* LOCK CONFIRMATION MODAL */}
        {lockConfirm && (
          <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: "rgba(0,0,0,0.7)" }}>
            <div className="p-8 max-w-sm w-full mx-4" style={{ background: "oklch(0.13 0.04 265)", border: "1px solid rgba(220,38,38,0.5)" }}>
              <p className="font-ceremonial text-center mb-4" style={{ fontSize: "0.6rem", letterSpacing: "2px", color: "#ef4444" }}>
                ⚠️ TRANSITION-LOCK BESTÄTIGEN
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", opacity: 0.7, lineHeight: 1.7, textAlign: "center", marginBottom: "1.5rem" }}>
                Node <strong style={{ color: "#d4af37" }}>{lockConfirm}</strong> sperren?<br />
                Alle aktiven Transitionen werden pausiert. Jugendliche bleiben im Junior-Vakuum geschützt bis zur Klärung.
              </p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setLockConfirm(null)}
                  className="btn-ghost" style={{ fontSize: "0.6rem" }}>Abbrechen</button>
                <button onClick={executeLock}
                  className="font-ceremonial"
                  style={{ fontSize: "0.55rem", letterSpacing: "1px", border: "1px solid rgba(220,38,38,0.6)", padding: "6px 16px", color: "#ef4444", background: "rgba(220,38,38,0.1)", cursor: "pointer" }}>
                  JETZT SPERREN
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 5-PUNKTE SICHERHEITS-CHECKLISTE */}
        <section className="mb-10">
          <p className="font-ceremonial opacity-35 mb-2" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            5-PUNKTE SICHERHEITS-CHECKLISTE — PRO TRANSITION
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", opacity: 0.45, marginBottom: "1rem", lineHeight: 1.6 }}>
            Alle Punkte müssen aktiv sein, bevor ein Junior im System „aufleuchtet".
          </p>
          <div className="space-y-2">
            {CHECKLIST.map((c) => (
              <button key={c.id} onClick={() => toggleCheck(c.id)}
                className="w-full flex items-start gap-4 p-4 text-left transition-all"
                style={{
                  background: checked[c.id] ? "rgba(76,175,125,0.07)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${checked[c.id] ? "rgba(76,175,125,0.4)" : "rgba(255,255,255,0.06)"}`,
                }}>
                <div style={{
                  width: 18, height: 18, border: `2px solid ${checked[c.id] ? "#4caf7d" : "rgba(255,255,255,0.2)"}`,
                  background: checked[c.id] ? "#4caf7d" : "transparent", flexShrink: 0, marginTop: 2,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {checked[c.id] && <span style={{ color: "#000", fontSize: "0.7rem", fontWeight: "bold" }}>✓</span>}
                </div>
                <div>
                  <div className="font-ceremonial mb-1" style={{ fontSize: "0.6rem", letterSpacing: "1.5px", color: checked[c.id] ? "#4caf7d" : undefined }}>{c.label}</div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", opacity: 0.5, lineHeight: 1.6 }}>{c.desc}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}>
              <div style={{ width: `${(checkedCount / CHECKLIST.length) * 100}%`, height: "100%", background: checkedCount === CHECKLIST.length ? "#4caf7d" : "#d4af37", borderRadius: 2, transition: "width 0.4s" }} />
            </div>
            <span className="font-ceremonial" style={{ fontSize: "0.5rem", color: checkedCount === CHECKLIST.length ? "#4caf7d" : "#d4af37", letterSpacing: "1px" }}>
              {checkedCount}/{CHECKLIST.length} {checkedCount === CHECKLIST.length ? "✓ BEREIT" : "PRÜFUNG LÄUFT"}
            </span>
          </div>
        </section>

        {/* RESONANZ-TAGESBERICHT */}
        <section className="mb-10 p-6" style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.25)" }}>
          <p className="font-ceremonial opacity-35 mb-4" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            RESONANZ-TAGESBERICHT — VERGOLDUNG DER SOUVERÄNITÄT
          </p>
          <p className="font-ceremonial text-gold glow-gold text-center mb-3" style={{ fontSize: "clamp(2rem,6vw,3.5rem)" }}>
            2.450
          </p>
          <p className="font-ceremonial text-center opacity-50 mb-4" style={{ fontSize: "0.5rem", letterSpacing: "2px" }}>
            JUNGE MENSCHEN HEUTE IN DIE SOUVERÄNITÄT ÜBERGEGANGEN
          </p>
          <p className="font-quote text-center opacity-65" style={{ fontSize: "0.9rem", lineHeight: 1.8, fontStyle: "italic" }}>
            „Heute haben 2.450 junge Menschen den geschützten Raum der Eltern-Passage verlassen.
            Sie haben sich erfolgreich vor den staatlichen Organen ausgewiesen und ihre eigene Sovereign-ID beheimatet.
            Sie sind nun bereit, am globalen Gießfass mitzuwirken — sicher, geprüft und eigenverantwortlich."
          </p>
          <div className="flex justify-center gap-6 mt-5 flex-wrap">
            <div className="text-center">
              <div className="font-ceremonial text-gold" style={{ fontSize: "0.5rem", letterSpacing: "1px", marginBottom: "2px" }}>FSK-GRENZE</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", opacity: 0.7 }}>21 Jahre</div>
            </div>
            <div className="text-center">
              <div className="font-ceremonial text-gold" style={{ fontSize: "0.5rem", letterSpacing: "1px", marginBottom: "2px" }}>PROTOKOLL</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", opacity: 0.7 }}>Post-Ident · eID</div>
            </div>
            <div className="text-center">
              <div className="font-ceremonial text-gold" style={{ fontSize: "0.5rem", letterSpacing: "1px", marginBottom: "2px" }}>SCHUTZ</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", opacity: 0.7 }}>Zero-Knowledge</div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="font-ceremonial opacity-20" style={{ fontSize: "0.45rem", letterSpacing: "1px" }}>
            ✦ ADMIN-TENANT · EU-UNION · ZERO-TRUST · GPG-SIGNIERT ✦
          </div>
          <Link href="/admin" className="font-ceremonial opacity-30 hover:opacity-60 transition-opacity" style={{ fontSize: "0.6rem", letterSpacing: "2px" }}>
            ← Admin Dashboard
          </Link>
        </div>

      </div>
    </main>
  );
}
