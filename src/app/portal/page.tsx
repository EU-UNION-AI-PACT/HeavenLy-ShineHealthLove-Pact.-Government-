import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function PilgrimPortalPage() {
  const session = await auth();
  const user = session?.user as any;

  if (!user) redirect("/login");

  // Role-based redirects
  if (user.role === "SUPER_ADMIN") redirect("/admin");
  if (user.role === "TENANT_ADMIN") redirect(`/admin/tenant/${user.tenantSlug ?? ""}`);
  if (user.role === "JUNIOR") redirect("/portal/junior");
  if (user.role === "PARENT") redirect("/portal/guardian");

  return (
    <main className="min-h-screen bg-sacred px-6 py-12">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <header className="text-center mb-16">
          <p className="font-ceremonial text-xs opacity-40 mb-2" style={{ letterSpacing: "3px" }}>
            PILGER-PORTAL
          </p>
          <h1 className="font-ceremonial text-gold glow-gold" style={{ fontSize: "2rem" }}>
            Willkommen, Pilger
          </h1>
          <p className="mt-2 opacity-60" style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontStyle: "italic" }}>
            {user.name ?? user.email}
          </p>
          {user.sovereignId && (
            <p className="mt-1 font-ceremonial opacity-40" style={{ fontSize: "0.65rem", letterSpacing: "2px" }}>
              {user.sovereignId}
            </p>
          )}
        </header>

        {/* GIESSFASS PROGRESS */}
        <section className="bg-glass mb-10 p-6" style={{ border: "1px solid var(--border-gold)" }}>
          <div className="flex justify-between items-center mb-3">
            <div className="font-ceremonial opacity-60" style={{ fontSize: "0.65rem", letterSpacing: "2px" }}>
              GIESSFASS — INNERER PFAD
            </div>
            <div className="font-ceremonial text-gold" style={{ fontSize: "0.75rem" }}>
              0 / 7 Stufen
            </div>
          </div>
          <div style={{ height: "4px", background: "rgba(212,175,55,0.1)", borderRadius: "2px" }}>
            <div style={{ width: "0%", height: "100%", background: "var(--gold-alchemic)", borderRadius: "2px", boxShadow: "0 0 8px rgba(212,175,55,0.4)" }} />
          </div>
          <p className="mt-3 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
            Vergoldung beginnt mit der ersten Fürbitte. Pflanze dein erstes Gebet.
          </p>
        </section>

        {/* ACTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <Link href="/portal/petition/new" className="station-card text-center">
            <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "1.4rem" }}>✦</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>Fürbitte einreichen</div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Öffentlich, privat oder Gemeinde-intern
            </p>
          </Link>

          <Link href="/portal/petitions" className="station-card text-center">
            <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "1.4rem" }}>◈</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>Meine Fürbitten</div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Status: Hoffnung → Heilung → Gewissheit
            </p>
          </Link>
        </div>

        {/* MORE ACTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <Link href="/portal/news" className="station-card text-center">
            <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "1.4rem" }}>📬</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>Resonanz-Feed</div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Globale Nachrichten der Welt-Allianz
            </p>
          </Link>

          <Link href="/portal/vacancies" className="station-card text-center">
            <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "1.4rem" }}>🌐</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>Hallo sagen</div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Einem Ankömmling Hallo sagen — Vakanz füllen
            </p>
          </Link>

          <Link href="/portal/stories" className="station-card text-center">
            <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "1.4rem" }}>🏛️</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>Bedeutungs-Archiv</div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Jede Stimme zählt — Nie wieder vergessen
            </p>
          </Link>

          <Link href="/portal/welcome" className="station-card text-center">
            <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "1.4rem" }}>✦</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>Willkommen im Ursprung</div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Global News #001 — Der Genesis-Moment
            </p>
          </Link>

          <Link href="/portal/wishes" className="station-card text-center">
            <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "1.4rem" }}>◈</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>Wunschpakt der Nationen</div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              From Wishes The Globe — Intention ohne Grenzen
            </p>
          </Link>

          <Link href="/portal/berufung" className="station-card text-center" style={{ borderTop: "2px solid #d4af37" }}>
            <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "1.4rem" }}>◈</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>Berufungs-Brücke</div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Ikigai-Mapping · Menschenwürde vor Schulnoten
            </p>
          </Link>

          <Link href="/portal/leitanker" className="station-card text-center">
            <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "1.4rem" }}>⚓</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>Leitanker-Portal</div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Wisdom Mirror — Erfahrungs-Relay für Senioren
            </p>
          </Link>

          <Link href="/portal/stories/pool" className="station-card text-center">
            <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "1.4rem" }}>📖</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>Golden Archive</div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Lebens-Story-Pool — Wünsche-Wagen-Protokoll
            </p>
          </Link>

          <Link href="/portal/furbitte" className="station-card text-center">
            <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "1.4rem" }}>🕊️</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>Fürbitte-Hub</div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Interreligiöser Kanal — Dogmenfrei · Anonym
            </p>
          </Link>

          <Link href="/portal/charta" className="station-card text-center">
            <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "1.4rem" }}>📜</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>Charta der Würde</div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Dekret der Lebendigen Konvergenz — 3 Artikel
            </p>
          </Link>

          <Link href="/portal/welcome-origin" className="station-card text-center">
            <div className="font-ceremonial text-gold mb-2" style={{ fontSize: "1.4rem" }}>✦</div>
            <div className="font-ceremonial" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>Genesis-Moment</div>
            <p className="mt-2 opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
              Global News #001 — Das Mesh ist aktiv
            </p>
          </Link>
        </div>

        {/* PASSAGE REMINDER */}
        <div className="text-center p-6" style={{ border: "1px solid var(--border-gold)" }}>
          <p className="font-ceremonial opacity-40 mb-1" style={{ fontSize: "0.6rem", letterSpacing: "3px" }}>
            NÄCHSTE PASSAGE
          </p>
          <p className="font-ceremonial text-gold" style={{ fontSize: "1.1rem" }}>
            06. Januar 2026 — Der Ursprung
          </p>
        </div>

      </div>
    </main>
  );
}
