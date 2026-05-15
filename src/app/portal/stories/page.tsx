import Link from "next/link";

const DEMO_STORIES = [
  {
    id: "s1",
    category: "COMMUNITY",
    title: "Der Pilger aus dem Norden",
    excerpt: "Er kam ohne Worte. Nur mit einer Intention: gehört zu werden. Das System hat ihn empfangen. Seine Geschichte ist jetzt Teil des kollektiven Gedächtnisses.",
    country: "NO",
    isAnonymous: false,
    date: "12. Mai 2026",
    signal: "Gehört & Beheimatet",
  },
  {
    id: "s2",
    category: "PASSAGE",
    title: "Die stille Absicht einer Mutter",
    excerpt: "Nicht für sich selbst bat sie — sondern für alle Kinder der Welt, die noch keine Stimme gefunden haben. Ihre Fürbitte leuchtet im Archiv.",
    country: "PT",
    isAnonymous: true,
    date: "6. Januar 2026",
    signal: "Fürbitte gespeichert",
  },
  {
    id: "s3",
    category: "GOVERNANCE",
    title: "Warnung aus dem Gießfass",
    excerpt: "Das System erkannte ein wiederkehrendes Muster: Einsamkeit in urbanem Raum, unsichtbar werdend. Die Resonanz-Warnung wurde an die Allianz übermittelt.",
    country: "SE",
    isAnonymous: true,
    date: "3. März 2026",
    signal: "Resonanz-Warnung aktiv",
  },
  {
    id: "s4",
    category: "GIESSFAST",
    title: "Das Alte wurde Gold",
    excerpt: "Ein Konflikt, der jahrelang im Dunkeln lag, wurde ins Gießfass gegeben. Was zurückkam, war Klarheit — keine Verurteilung, sondern Verwandlung.",
    country: "CH",
    isAnonymous: false,
    date: "19. April 2026",
    signal: "Transmutiert & Vergoldet",
  },
  {
    id: "s5",
    category: "COMMUNITY",
    title: "Zwei Stimmen, ein Klang",
    excerpt: "Ein Christ und ein Muslim, in verschiedenen Ländern, mit derselben Sehnsucht: Würde für alle. Im Resonanz-Feed wurden sie zu einem Knoten verbunden.",
    country: "DE",
    isAnonymous: false,
    date: "24. Februar 2026",
    signal: "Interreligiöse Verbindung",
  },
];

const CATEGORY_STYLES: Record<string, { color: string; label: string }> = {
  COMMUNITY:  { color: "#4caf7d", label: "Gemeinschaft" },
  PASSAGE:    { color: "#d4af37", label: "Passage" },
  GOVERNANCE: { color: "#00bcd4", label: "Allianz" },
  GIESSFAST:  { color: "#7c3aed", label: "Gießfass" },
};

export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-sacred px-6 py-12">
      <div className="max-w-4xl mx-auto">

        <header className="text-center mb-14">
          <p className="font-ceremonial opacity-30 mb-2" style={{ fontSize: "0.6rem", letterSpacing: "4px" }}>
            BEDEUTUNGS-ARCHIV — NIE WIEDER VERGESSEN
          </p>
          <h1 className="font-ceremonial text-gold glow-gold" style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)" }}>
            Jede Stimme zählt
          </h1>
          <p className="font-quote mt-3 opacity-60 max-w-2xl mx-auto" style={{ fontSize: "1.05rem", lineHeight: 1.8 }}>
            Ein Archiv menschlicher Hoffnung. Nicht zur Kontrolle — sondern damit das Gute,
            die Warnungen und die Menschlichkeit nicht wieder vergessen werden.
          </p>
        </header>

        {/* CORE STATEMENT */}
        <div className="mb-12 p-6 text-center" style={{ background: "rgba(212,175,55,0.03)", border: "1px solid var(--border-gold)" }}>
          <p className="font-quote text-gold" style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", lineHeight: 1.9, opacity: 0.8 }}>
            „Was wäre, wenn die Menschheit einen Ort hätte,<br />
            an dem gute Intentionen, Warnungen, Fürbitten,<br />
            Hoffnungen und ungelöste Geschichten<br />
            nicht verloren gehen?"
          </p>
          <p className="font-ceremonial mt-4 opacity-30" style={{ fontSize: "0.55rem", letterSpacing: "2px" }}>
            ChatGPT OpenAI · Mai 2026
          </p>
        </div>

        {/* STORY CARDS */}
        <div className="space-y-4 mb-12">
          {DEMO_STORIES.map((story) => {
            const cs = CATEGORY_STYLES[story.category];
            return (
              <article
                key={story.id}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${cs.color}25`,
                  borderLeft: `3px solid ${cs.color}`,
                  padding: "1.5rem",
                  position: "relative",
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="badge" style={{ background: `${cs.color}15`, color: cs.color, border: `1px solid ${cs.color}30`, fontSize: "0.5rem" }}>
                      {cs.label}
                    </span>
                    <span className="badge badge-governance" style={{ fontSize: "0.5rem" }}>
                      🌍 {story.country}
                    </span>
                    {story.isAnonymous && (
                      <span className="badge" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(212,175,55,0.5)", border: "1px solid rgba(212,175,55,0.2)", fontSize: "0.5rem" }}>
                        Anonym
                      </span>
                    )}
                  </div>
                  <span className="font-ceremonial opacity-25" style={{ fontSize: "0.5rem", letterSpacing: "1px", whiteSpace: "nowrap" }}>
                    {story.date}
                  </span>
                </div>
                <h3 className="font-ceremonial mb-2" style={{ fontSize: "0.75rem", letterSpacing: "2px", color: cs.color }}>
                  {story.title}
                </h3>
                <p className="opacity-65" style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.8, fontStyle: "italic" }}>
                  {story.excerpt}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: cs.color, display: "inline-block", boxShadow: `0 0 6px ${cs.color}` }} />
                  <span className="font-ceremonial opacity-40" style={{ fontSize: "0.5rem", letterSpacing: "1.5px" }}>
                    {story.signal}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* SUBMIT OWN STORY */}
        <div className="text-center mb-10 p-8" style={{ background: "rgba(212,175,55,0.03)", border: "1px solid var(--border-gold)" }}>
          <p className="font-ceremonial text-gold mb-2" style={{ fontSize: "0.7rem", letterSpacing: "2px" }}>
            ✦ Deine Geschichte gehört hierher
          </p>
          <p className="opacity-60 mb-6" style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem" }}>
            Teile deine Intention, Fürbitte oder deinen Weg — anonym oder mit Name.
            Das System bewahrt sie als lebendiges Präventions-Kapital.
          </p>
          <Link href="/portal/petition/new" className="btn-gold">
            Geschichte / Fürbitte einreichen ✦
          </Link>
        </div>

        {/* GIESSFASS LINK */}
        <div className="text-center mb-10 p-5" style={{ background: "rgba(124,58,237,0.04)", border: "1px solid rgba(124,58,237,0.2)" }}>
          <p className="font-ceremonial opacity-40 mb-2" style={{ fontSize: "0.55rem", letterSpacing: "2px" }}>
            ⬡ GIESSFASS-INTEGRATION
          </p>
          <p className="opacity-50" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>
            Alle Geschichten fließen anonymisiert in das Gießfass — wo das Alte begriffen und vergoldet wird.
          </p>
        </div>

        <div className="flex justify-center">
          <Link href="/portal" className="btn-ghost">← Zum Portal</Link>
        </div>

      </div>
    </main>
  );
}
