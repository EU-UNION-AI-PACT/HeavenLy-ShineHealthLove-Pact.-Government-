"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface HumanPotential {
  id: string;
  anonymousRef: string;
  fieldKey: string;
  bridgeStatus: string;
  createdAt: string;
  profile: {
    aspiration?: { vision?: string; field_key?: string };
    human_potential?: { self_assessed_talents?: string[] };
    ikigai?: Record<string, string | null>;
  };
  _count?: { messages: number; unread: number };
}

interface BridgeMessage {
  id: string;
  sender: "ADMIN" | "HUMAN";
  content: string;
  createdAt: string;
  isReadByAdmin: boolean;
}

const FELD_LABELS: Record<string, string> = {
  handwerk: "Handwerk & Gestaltung",
  natur: "Natur & Landwirtschaft",
  soziales: "Soziales & Pflege",
  kunst: "Kunst, Musik & Kultur",
  technik: "Technik & Digitales",
  spirituell: "Spirituelles & Seelsorge",
  wissenschaft: "Wissenschaft & Forschung",
  anderes: "Eigener Weg",
};

const STATUS_COLOR: Record<string, string> = {
  INCEPTION:    "#7c3aed",
  MAPPING:      "#d4af37",
  MATCHING:     "#00bcd4",
  BRIDGE_FOUND: "#4caf7d",
  ACTIVE:       "#4caf7d",
  FULFILLED:    "#d4af37",
};

const STATUS_LABEL: Record<string, string> = {
  INCEPTION:    "Eingegangen",
  MAPPING:      "Ikigai-Mapping",
  MATCHING:     "Agenten aktiv",
  BRIDGE_FOUND: "Brücke gefunden",
  ACTIVE:       "Auf dem Weg",
  FULFILLED:    "Berufung gelebt",
};

export default function AdminBridgePage() {
  const [entries, setEntries]     = useState<HumanPotential[]>([]);
  const [loading, setLoading]     = useState(true);
  const [selected, setSelected]   = useState<HumanPotential | null>(null);
  const [messages, setMessages]   = useState<BridgeMessage[]>([]);
  const [msgLoading, setMsgLoading] = useState(false);
  const [draft, setDraft]         = useState("");
  const [sending, setSending]     = useState(false);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterField, setFilterField]   = useState("ALL");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load all bridge entries
  useEffect(() => {
    fetch("/api/bridge/list")
      .then((r) => r.json())
      .then((d) => { setEntries(d.entries ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // Load messages when entry selected
  useEffect(() => {
    if (!selected) return;
    setMsgLoading(true);
    fetch(`/api/bridge/messages?ref=${selected.anonymousRef}`)
      .then((r) => r.json())
      .then((d) => { setMessages(d.messages ?? []); setMsgLoading(false); })
      .catch(() => setMsgLoading(false));
  }, [selected]);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!selected || !draft.trim()) return;
    setSending(true);
    const res = await fetch("/api/bridge/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ anonymousRef: selected.anonymousRef, content: draft }),
    });
    if (res.ok) {
      const data = await res.json();
      setMessages((prev) => [...prev, data.message]);
      setDraft("");
      // Update status in list
      setEntries((prev) => prev.map((e) =>
        e.anonymousRef === selected.anonymousRef
          ? { ...e, bridgeStatus: "MATCHING" }
          : e
      ));
    }
    setSending(false);
  }

  const filtered = entries.filter((e) => {
    if (filterStatus !== "ALL" && e.bridgeStatus !== filterStatus) return false;
    if (filterField  !== "ALL" && e.fieldKey       !== filterField)  return false;
    return true;
  });

  const statusKeys = ["ALL", "INCEPTION", "MAPPING", "MATCHING", "BRIDGE_FOUND", "ACTIVE", "FULFILLED"];

  return (
    <main className="min-h-screen bg-sacred">

      {/* ── HEADER ── */}
      <header style={{ padding: "1.5rem 2rem", borderBottom: "1px solid rgba(212,175,55,0.15)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="font-ceremonial" style={{ fontSize: "0.5rem", letterSpacing: "4px", opacity: 0.35, marginBottom: "0.25rem" }}>
              SUPER-ADMIN · BERUFUNGS-BRÜCKE
            </p>
            <h1 className="font-ceremonial text-gold" style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)", letterSpacing: "3px" }}>
              Ikigai & Potenzial-Monitor
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", opacity: 0.45, marginTop: "0.2rem" }}>
              Berufungswünsche · Anonyme Kontaktaufnahme · Bridge-Status
            </p>
          </div>
          <Link href="/admin" className="btn-ghost" style={{ fontSize: "0.55rem" }}>← Admin-Zentrale</Link>
        </div>
      </header>

      <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: selected ? "1fr 420px" : "1fr", gap: "0", minHeight: "calc(100vh - 90px)" }}>

        {/* ── LINKE SPALTE: LISTE ── */}
        <div style={{ padding: "1.5rem 2rem", borderRight: selected ? "1px solid rgba(212,175,55,0.12)" : "none", overflowY: "auto" }}>

          {/* STATS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.75rem", marginBottom: "1.5rem" }}>
            {[
              { label: "Gesamt",     value: entries.length,                                            color: "#d4af37" },
              { label: "Inception",  value: entries.filter((e) => e.bridgeStatus === "INCEPTION").length, color: "#7c3aed" },
              { label: "Aktiv",      value: entries.filter((e) => ["MATCHING","BRIDGE_FOUND","ACTIVE"].includes(e.bridgeStatus)).length, color: "#4caf7d" },
              { label: "Erfüllt",    value: entries.filter((e) => e.bridgeStatus === "FULFILLED").length, color: "#d4af37" },
            ].map((s) => (
              <div key={s.label} style={{ padding: "0.75rem 1rem", background: `${s.color}08`, border: `1px solid ${s.color}25`, textAlign: "center" }}>
                <div className="font-ceremonial" style={{ fontSize: "1.5rem", color: s.color }}>{s.value}</div>
                <div className="font-ceremonial" style={{ fontSize: "0.45rem", letterSpacing: "2px", opacity: 0.5, marginTop: "0.2rem" }}>{s.label.toUpperCase()}</div>
              </div>
            ))}
          </div>

          {/* FILTER */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
            {statusKeys.map((s) => (
              <button key={s} onClick={() => setFilterStatus(s)}
                style={{
                  fontFamily: "var(--font-ceremonial)", fontSize: "0.45rem", letterSpacing: "1.5px",
                  padding: "4px 10px", cursor: "pointer",
                  border: `1px solid ${filterStatus === s ? (STATUS_COLOR[s] ?? "#d4af37") : "rgba(255,255,255,0.1)"}`,
                  background: filterStatus === s ? `${STATUS_COLOR[s] ?? "#d4af37"}15` : "transparent",
                  color: filterStatus === s ? (STATUS_COLOR[s] ?? "#d4af37") : "rgba(249,241,215,0.4)",
                }}>
                {s === "ALL" ? "ALLE" : (STATUS_LABEL[s] ?? s)}
              </button>
            ))}
          </div>

          {/* EINTRÄGE */}
          {loading ? (
            <p className="font-ceremonial opacity-30 text-center" style={{ fontSize: "0.6rem", letterSpacing: "2px", marginTop: "3rem" }}>
              LADE BERUFUNGSWÜNSCHE …
            </p>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem 0" }}>
              <p className="font-ceremonial opacity-30" style={{ fontSize: "0.6rem", letterSpacing: "2px" }}>KEINE EINTRÄGE</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", opacity: 0.35, marginTop: "0.5rem" }}>
                Noch keine Berufungswünsche eingegangen.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {filtered.map((e) => {
                const sc = STATUS_COLOR[e.bridgeStatus] ?? "#d4af37";
                const isActive = selected?.anonymousRef === e.anonymousRef;
                return (
                  <button key={e.id} onClick={() => setSelected(isActive ? null : e)}
                    style={{
                      textAlign: "left", padding: "1rem 1.25rem", cursor: "pointer", transition: "all 0.2s",
                      background: isActive ? `${sc}10` : "rgba(255,255,255,0.02)",
                      border: `1px solid ${isActive ? sc + "50" : "rgba(255,255,255,0.06)"}`,
                      borderLeft: `3px solid ${sc}`,
                    }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
                          <span className="font-ceremonial" style={{ fontSize: "0.6rem", letterSpacing: "2px", color: "#d4af37" }}>
                            {FELD_LABELS[e.fieldKey] ?? e.fieldKey}
                          </span>
                          <span className="font-ceremonial" style={{
                            fontSize: "0.42rem", letterSpacing: "1.5px", padding: "2px 7px",
                            border: `1px solid ${sc}50`, color: sc,
                          }}>
                            {STATUS_LABEL[e.bridgeStatus] ?? e.bridgeStatus}
                          </span>
                        </div>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", opacity: 0.6, lineHeight: 1.5 }}>
                          {(e.profile?.aspiration?.vision ?? "—").slice(0, 120)}{(e.profile?.aspiration?.vision?.length ?? 0) > 120 ? " …" : ""}
                        </p>
                        {(e.profile?.human_potential?.self_assessed_talents ?? []).length > 0 && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginTop: "0.5rem" }}>
                            {(e.profile.human_potential!.self_assessed_talents ?? []).slice(0, 4).map((t) => (
                              <span key={t} style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", opacity: 0.45, border: "1px solid rgba(212,175,55,0.2)", padding: "1px 7px" }}>
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <p className="font-ceremonial" style={{ fontSize: "0.42rem", letterSpacing: "1px", opacity: 0.3 }}>
                          {new Date(e.createdAt).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })}
                        </p>
                        <p className="font-ceremonial" style={{ fontSize: "0.4rem", letterSpacing: "1px", opacity: 0.2, marginTop: "0.2rem" }}>
                          {e.anonymousRef.slice(0, 8)}…
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── RECHTE SPALTE: CHAT ── */}
        {selected && (
          <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 90px)", position: "sticky", top: 0 }}>

            {/* Chat Header */}
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(212,175,55,0.15)", flexShrink: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p className="font-ceremonial" style={{ fontSize: "0.5rem", letterSpacing: "3px", opacity: 0.35, marginBottom: "0.25rem" }}>
                    ANONYME KONTAKTAUFNAHME
                  </p>
                  <p className="font-ceremonial" style={{ fontSize: "0.65rem", letterSpacing: "2px", color: STATUS_COLOR[selected.bridgeStatus] ?? "#d4af37" }}>
                    {FELD_LABELS[selected.fieldKey]} · {STATUS_LABEL[selected.bridgeStatus]}
                  </p>
                  <p className="font-ceremonial" style={{ fontSize: "0.42rem", opacity: 0.25, marginTop: "0.2rem", letterSpacing: "1px" }}>
                    REF: {selected.anonymousRef}
                  </p>
                </div>
                <button onClick={() => setSelected(null)}
                  style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.55rem", opacity: 0.4, cursor: "pointer", background: "none", border: "none", color: "inherit" }}>
                  ✕
                </button>
              </div>

              {/* Profil-Kurzansicht */}
              <div style={{ marginTop: "0.75rem", padding: "0.75rem 1rem", background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.12)" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", opacity: 0.65, lineHeight: 1.65 }}>
                  <strong style={{ color: "#d4af37" }}>Vision:</strong>{" "}
                  {selected.profile?.aspiration?.vision ?? "—"}
                </p>
                {(selected.profile?.human_potential?.self_assessed_talents ?? []).length > 0 && (
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", opacity: 0.45, marginTop: "0.4rem" }}>
                    <strong style={{ color: "#4caf7d" }}>Talente:</strong>{" "}
                    {(selected.profile.human_potential!.self_assessed_talents ?? []).join(", ")}
                  </p>
                )}
                {selected.profile?.ikigai && Object.entries(selected.profile.ikigai).filter(([, v]) => v).length > 0 && (
                  <div style={{ marginTop: "0.5rem" }}>
                    {Object.entries(selected.profile.ikigai).filter(([, v]) => v).map(([k, v]) => (
                      <p key={k} style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", opacity: 0.45, lineHeight: 1.5 }}>
                        <strong style={{ color: "#00bcd4" }}>{k}:</strong> {String(v)}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Chat-Verlauf */}
            <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {msgLoading ? (
                <p className="font-ceremonial text-center opacity-30" style={{ fontSize: "0.55rem", letterSpacing: "2px", marginTop: "2rem" }}>
                  LADE NACHRICHTEN …
                </p>
              ) : messages.length === 0 ? (
                <div style={{ textAlign: "center", margin: "auto 0", padding: "2rem 0" }}>
                  <p className="font-ceremonial opacity-25" style={{ fontSize: "0.55rem", letterSpacing: "2px" }}>NOCH KEINE NACHRICHTEN</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", opacity: 0.35, marginTop: "0.5rem", lineHeight: 1.7 }}>
                    Erste Nachricht an diese Referenz-ID senden.<br />
                    Der Mensch antwortet über sein Portal.
                  </p>
                </div>
              ) : (
                messages.map((m) => {
                  const isAdmin = m.sender === "ADMIN";
                  return (
                    <div key={m.id} style={{
                      display: "flex",
                      justifyContent: isAdmin ? "flex-end" : "flex-start",
                    }}>
                      <div style={{
                        maxWidth: "80%",
                        padding: "0.75rem 1rem",
                        background: isAdmin ? "rgba(212,175,55,0.1)" : "rgba(76,175,125,0.08)",
                        border: `1px solid ${isAdmin ? "rgba(212,175,55,0.3)" : "rgba(76,175,125,0.25)"}`,
                        borderRadius: isAdmin ? "8px 8px 2px 8px" : "8px 8px 8px 2px",
                      }}>
                        <p className="font-ceremonial" style={{
                          fontSize: "0.42rem", letterSpacing: "1.5px", opacity: 0.45, marginBottom: "0.35rem",
                          color: isAdmin ? "#d4af37" : "#4caf7d",
                        }}>
                          {isAdmin ? "ALLIANZ-KOORDINATOR" : "BERUFUNGSWUNSCH-TRÄGER"}
                        </p>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", opacity: 0.85, lineHeight: 1.65, whiteSpace: "pre-wrap" }}>
                          {m.content}
                        </p>
                        <p className="font-ceremonial" style={{ fontSize: "0.4rem", opacity: 0.25, marginTop: "0.35rem", textAlign: isAdmin ? "right" : "left" }}>
                          {new Date(m.createdAt).toLocaleString("de-DE", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Eingabe */}
            <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid rgba(212,175,55,0.12)", flexShrink: 0 }}>
              <div style={{ marginBottom: "0.5rem" }}>
                <p className="font-ceremonial" style={{ fontSize: "0.42rem", letterSpacing: "2px", opacity: 0.3 }}>
                  🔒 ANONYM · KEIN KLARNAME · DSGVO
                </p>
              </div>
              <textarea
                className="input-sacred w-full resize-none"
                rows={3}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) sendMessage(); }}
                style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", marginBottom: "0.75rem" }}
                placeholder="Nachricht an diese Referenz-ID schreiben … (Ctrl+Enter zum Senden)"
              />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", opacity: 0.3 }}>
                  Die Person wird über ihr Portal benachrichtigt.
                </p>
                <button className="btn-gold" style={{ fontSize: "0.55rem", opacity: draft.trim() ? 1 : 0.3 }}
                  disabled={!draft.trim() || sending}
                  onClick={sendMessage}>
                  {sending ? "Sendet …" : "Senden ✦"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
