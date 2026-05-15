"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Visibility = "PUBLIC" | "TENANT_ONLY" | "PRIVATE";

const VISIBILITY_OPTIONS: { value: Visibility; label: string; desc: string; color: string }[] = [
  { value: "PRIVATE",     label: "Privat",         desc: "Nur du siehst diese Fürbitte",       color: "#7c3aed" },
  { value: "TENANT_ONLY", label: "Gemeinde",        desc: "Nur Mitglieder deiner Gemeinschaft",  color: "#e67e22" },
  { value: "PUBLIC",      label: "Öffentlich",      desc: "Für alle Pilger sichtbar",            color: "#4caf7d" },
];

export default function NewPetitionPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState<Visibility>("PRIVATE");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/petitions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, visibility }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Fehler beim Einreichen");
      }

      router.push("/portal/petitions");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-sacred px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-12">
          <p className="font-ceremonial text-xs opacity-40 mb-2" style={{ letterSpacing: "3px" }}>
            FÜRBITTE EINREICHEN
          </p>
          <h1 className="font-ceremonial text-gold glow-gold" style={{ fontSize: "1.8rem" }}>
            Ein Gebet pflanzen
          </h1>
          <p className="mt-2 opacity-60" style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontStyle: "italic" }}>
            Hoffnung → Heilung → Gewissheit
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TITLE */}
          <div>
            <label className="font-ceremonial block mb-2" style={{ fontSize: "0.6rem", letterSpacing: "2px", opacity: 0.6 }}>
              Titel der Fürbitte
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ein kurzer Titel für dein Gebet…"
              required
              maxLength={100}
              className="input-sacred"
            />
          </div>

          {/* CONTENT */}
          <div>
            <label className="font-ceremonial block mb-2" style={{ fontSize: "0.6rem", letterSpacing: "2px", opacity: 0.6 }}>
              Dein Gebet
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Teile dein Herz im Licht des Heiligen Jahres…"
              required
              maxLength={2000}
              rows={6}
              className="input-sacred"
              style={{ resize: "vertical" }}
            />
            <p className="text-right opacity-30 mt-1" style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem" }}>
              {content.length} / 2000
            </p>
          </div>

          {/* VISIBILITY */}
          <div>
            <label className="font-ceremonial block mb-3" style={{ fontSize: "0.6rem", letterSpacing: "2px", opacity: 0.6 }}>
              Sichtbarkeit
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {VISIBILITY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setVisibility(opt.value)}
                  style={{
                    background: visibility === opt.value ? `${opt.color}18` : "rgba(255,255,255,0.02)",
                    border: `1px solid ${visibility === opt.value ? opt.color : "var(--border-gold)"}`,
                    padding: "1rem",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div className="font-ceremonial" style={{ fontSize: "0.65rem", letterSpacing: "1.5px", color: opt.color }}>
                    {opt.label}
                  </div>
                  <div className="opacity-50 mt-1" style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem" }}>
                    {opt.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div style={{ background: "rgba(230,126,34,0.08)", border: "1px solid rgba(230,126,34,0.3)", padding: "0.75rem 1rem", color: "var(--lion-amber)", fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button type="submit" disabled={loading} className="btn-gold flex-1 justify-center" style={{ opacity: loading ? 0.6 : 1 }}>
              {loading ? "Wird eingepflanzt…" : "Fürbitte einreichen ✦"}
            </button>
            <Link href="/portal" className="btn-ghost">
              Abbrechen
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
