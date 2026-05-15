"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (!res || res.error) {
      setError("Ungültige Zugangsdaten. Bitte erneut versuchen.");
      return;
    }

    // Role-based redirect is handled by the server session after login
    router.push("/portal");
    router.refresh();
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-sacred px-4"
      style={{ background: "var(--midnight-black)" }}
    >
      <div className="w-full max-w-md">
        {/* HEADER */}
        <div className="text-center mb-10">
          <Link href="/" className="font-ceremonial text-gold glow-gold" style={{ fontSize: "1.8rem" }}>
            GloryaShine
          </Link>
          <p
            className="mt-2 opacity-60"
            style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontStyle: "italic" }}
          >
            Der Pfad der Pilger — Heiliges Jahr 2026
          </p>
        </div>

        {/* CARD */}
        <div className="bg-glass p-8" style={{ border: "1px solid var(--border-gold)" }}>
          <h1
            className="font-ceremonial text-gold text-center mb-8"
            style={{ fontSize: "0.85rem", letterSpacing: "4px" }}
          >
            Sovereign Zugang
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                className="font-ceremonial block mb-2"
                style={{ fontSize: "0.6rem", letterSpacing: "2px", opacity: 0.6 }}
              >
                E-Mail-Adresse
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="deine@adresse.de"
                required
                className="input-sacred"
              />
            </div>

            <div>
              <label
                className="font-ceremonial block mb-2"
                style={{ fontSize: "0.6rem", letterSpacing: "2px", opacity: 0.6 }}
              >
                Passwort
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="input-sacred"
              />
            </div>

            {error && (
              <div
                style={{
                  background: "rgba(230,126,34,0.08)",
                  border: "1px solid rgba(230,126,34,0.3)",
                  padding: "0.75rem 1rem",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  color: "var(--lion-amber)",
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full justify-center"
              style={{ opacity: loading ? 0.6 : 1 }}
            >
              {loading ? "Überprüfung…" : "Eintreten"}
            </button>
          </form>

          <div className="mt-8 pt-6" style={{ borderTop: "1px solid var(--border-gold)" }}>
            <p
              className="text-center font-ceremonial opacity-30"
              style={{ fontSize: "0.55rem", letterSpacing: "1px" }}
            >
              🛡️ ZERO-TRUST SOVEREIGN LOGIN &nbsp;|&nbsp; GPDM-KONFORM
            </p>
          </div>
        </div>

        <p className="text-center mt-6 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
          Noch kein Zugang?{" "}
          <Link href="mailto:likewise@paderborn.com" className="text-gold hover:opacity-100 transition-opacity">
            Kontakt aufnehmen
          </Link>
        </p>
      </div>
    </main>
  );
}
