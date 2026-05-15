import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  HOFFNUNG:   { label: "Hoffnung",   color: "#d4af37" },
  HEILUNG:    { label: "Heilung",    color: "#4caf7d" },
  GEWISSHEIT: { label: "Gewissheit", color: "#9b59ff" },
};

const PURPOSE_LABELS: Record<string, string> = {
  EARTH:       "🌍 Erde",
  FELLOWS:     "✦ Gemeinschaft",
  GOVERNMENT:  "◈ Gerechtigkeit",
  SELF:        "⬡ Selbst",
};

export default async function MyPetitionsPage() {
  const session = await auth();
  const user = session?.user as any;
  if (!user) redirect("/login");

  const petitions = await prisma.petition.findMany({
    where: { authorId: user.id, isDeleted: false },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <main className="min-h-screen bg-sacred px-6 py-12">
      <div className="max-w-4xl mx-auto">

        <header className="mb-12">
          <p className="font-ceremonial text-xs opacity-40 mb-2" style={{ letterSpacing: "3px" }}>
            MEIN PFAD
          </p>
          <h1 className="font-ceremonial text-gold glow-gold" style={{ fontSize: "2rem" }}>
            Meine Fürbitten
          </h1>
          <p className="mt-2 opacity-60" style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", fontStyle: "italic" }}>
            Jede Fürbitte ist ein Samen. Hoffnung → Heilung → Gewissheit.
          </p>
        </header>

        {/* STATUS LEGEND */}
        <div className="flex flex-wrap gap-3 mb-8">
          {Object.entries(STATUS_LABELS).map(([k, v]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: v.color, display: "inline-block", boxShadow: `0 0 6px ${v.color}` }} />
              <span className="font-ceremonial opacity-50" style={{ fontSize: "0.52rem", letterSpacing: "1.5px" }}>
                {v.label.toUpperCase()}
              </span>
            </div>
          ))}
        </div>

        {petitions.length === 0 ? (
          <div className="text-center p-12" style={{ border: "1px solid rgba(212,175,55,0.15)" }}>
            <div className="font-ceremonial text-gold mb-3" style={{ fontSize: "2rem", opacity: 0.4 }}>✦</div>
            <p className="font-ceremonial opacity-40" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>
              NOCH KEINE FÜRBITTEN
            </p>
            <p className="mt-3 opacity-40" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>
              Deine erste Fürbitte wird hier erscheinen — als Samen der Hoffnung.
            </p>
            <div className="mt-6">
              <Link href="/portal/petition/new" className="btn-gold" style={{ fontSize: "0.55rem", letterSpacing: "2px" }}>
                ✦ Erste Fürbitte einreichen
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {petitions.map((p) => {
              const st = STATUS_LABELS[p.status] ?? STATUS_LABELS.PENDING;
              const pu = PURPOSE_LABELS[(p as any).purposeCode ?? "SELF"] ?? "⬡ Selbst";
              return (
                <div
                  key={p.id}
                  className="station-card"
                  style={{ borderLeft: `3px solid ${st.color}`, padding: "1.25rem 1.5rem" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.95rem",
                          lineHeight: 1.6,
                          opacity: 0.85,
                          marginBottom: "0.5rem",
                          wordBreak: "break-word",
                        }}
                      >
                        {p.content}
                      </p>
                      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
                        <span className="font-ceremonial opacity-40" style={{ fontSize: "0.45rem", letterSpacing: "1.5px" }}>
                          {pu}
                        </span>
                        <span style={{ color: "rgba(255,255,255,0.1)" }}>·</span>
                        <span className="font-ceremonial opacity-35" style={{ fontSize: "0.45rem", letterSpacing: "1px" }}>
                          {new Date(p.createdAt).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}
                        </span>
                        {(p as any).isPublic && (
                          <>
                            <span style={{ color: "rgba(255,255,255,0.1)" }}>·</span>
                            <span className="font-ceremonial" style={{ fontSize: "0.4rem", color: "#4caf7d", opacity: 0.7, letterSpacing: "1px" }}>
                              ÖFFENTLICH
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "flex-end" }}>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: st.color, display: "inline-block", boxShadow: `0 0 8px ${st.color}` }} />
                        <span className="font-ceremonial" style={{ fontSize: "0.52rem", letterSpacing: "1.5px", color: st.color }}>
                          {st.label.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex gap-4 mt-10 flex-wrap">
          <Link href="/portal/petition/new" className="btn-gold" style={{ fontSize: "0.55rem", letterSpacing: "2px" }}>
            ✦ Neue Fürbitte
          </Link>
          <Link href="/portal" className="btn-ghost" style={{ fontSize: "0.55rem" }}>
            ← Zurück zum Portal
          </Link>
        </div>

      </div>
    </main>
  );
}
