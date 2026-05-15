"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const WELLS = [
  { name: "St. Cooey's Well", location: "Portaferry, County Down", description: "Based on a 7th-century monastic site, restored by the local community in the 1970s. Has a thorn tree where ribbons are tied. Three stations: Wash, Eyes, Drink.", cure: "Healing of the eyes and inner ailments through drinking the sacred water.", offerings: "Ribbons on thorn tree; stones left at a stone table.", tags: ["eyes", "thorn tree", "votives", "County Down"], county: "Down" },
  { name: "Father Germaine's / Saint Boden's Well", location: "Lackan, County Wicklow", description: "Rededicated to Our Lady of Mount Carmel in 1902. Submerged under the Pollaphuca Reservoir in the 1940s. Visible again when water levels lower dramatically.", cure: "Cures lameness, weak legs, and limps. Stones said to cure toothaches.", offerings: "Formerly rosary beads, medals, cloth. Healed pilgrims left crutches and walking sticks.", tags: ["Wicklow", "lameness", "submerged", "votive"], county: "Wicklow" },
  { name: "St. Michael's Well", location: "Kilmihil, County Clare", description: "Encased with concrete, iron fence surrounding the pool. Glass-encased statue of Christ atop the pump house. Near the partially ruined church of St. Michael.", cure: "Famous for curing gout through drinking the water.", offerings: "After ritual: a pin, button, or piece of cloth left at the well.", tags: ["Clare", "gout", "ritual"], county: "Clare" },
  { name: "St. Mary Magdalen's Well", location: "Kilbane, Limerick City", description: "A wooded path off a roundabout leads to a small well in a stone canopy. Statue depicts the Virgin Mary. Cleared space used for prayers.", cure: "Said to cure stomach issues and digestive ailments.", offerings: "Flowers and candles deposited near the statue.", tags: ["Limerick", "stomach", "candles"], county: "Limerick" },
  { name: "Well of the Seven Daughters", location: "Aillebrack, Galway", description: "Situated in a valley in a field called 'Pairc Geal' near Doon Hill. White-thorn bush growing beside. Water said to 'boil up' when a request is granted.", cure: "Headaches, sore eyes, sore hands — healed through prayer and votive offerings.", offerings: "Coins, medals, statues, buttons, hair pins, crosses, flowers, pieces of cloth tied on bush.", tags: ["Galway", "headache", "Seven Sisters", "sore eyes", "rag"], county: "Galway" },
  { name: "Lady's Well", location: "Cowanstown, Co. Kildare", description: "Deep circular stone-lined well in a graveyard, with steps leading to the water. Enclosed by a modern wall with a piered gate. Restored in 1989.", cure: "Cure ascribed for ear ailments.", offerings: "Pilgrimage offerings on the Feast of the Assumption.", tags: ["Assumption Day", "ears", "Kildare", "Lady"], county: "Kildare" },
  { name: "Our Lady's Well", location: "Kilfinane Townland, County Limerick", description: "Located in a large field, surrounded by a small metal fence. Through the gate there are steps down into a shallow elongated pool.", cure: "Sore eyes and curing blindness.", offerings: "Pilgrims hang pieces of cloth to a rag tree over the well.", tags: ["Limerick", "eyes", "rag tree"], county: "Limerick" },
  { name: "Saint Brendan's Well", location: "Valentia Island, Kerry", description: "Near the coast in a boggy field. Associated with St. Brendan the Navigator. In the 5th century, St. Brendan anointed 2 dying pagans at this spring.", cure: "A place of conversion and healing — sailors and travelers seek blessing.", offerings: "Coins, crosses, laminated prayers, rosary, statuettes, white quartz rocks.", tags: ["Kerry", "sailors", "travelers", "coast"], county: "Kerry" },
  { name: "St. Brigid's Well", location: "Kilbreedy, County Limerick", description: "A clear spring surrounded by a stone wall. Statue of St. Brigid stands over the well. Small tree carries many rags beside it.", cure: "Effective in curing eye diseases. Must wash eyes with well water and pray.", offerings: "Rag tree beside the well. Circumnavigate nine times on 1st February.", tags: ["Brigid", "eyes", "Limerick", "rag", "February"], county: "Limerick" },
  { name: "St. Manchan's Holy Well", location: "Lemanaghan, County Offaly", description: "Along the Togher, beside Lemanaghan Church. Small stone wall, large bullaun stone, multiple trees with clooties. A misshapen ash with rosaries and rags.", cure: "Said to cure nearly every ailment — especially neuralgia, cancer, and warts.", offerings: "Bottom of well littered with coins. On the ash tree: rosaries, rags, stuffed animals, pictures of loved ones.", tags: ["bullaun", "cancer", "clootie", "neuralgia", "Offaly", "warts"], county: "Offaly" },
  { name: "St. Ciaran's Holy Well", location: "Clonmacnoise, County Offaly", description: "In the middle of a gravel patch, with a tree, stone cross-slab, and stone crucifix. Stone-lined with steps leading down. The Long Station done barefoot on September 9th.", cure: "Brought back an old woman's strength. Cured a stomach ache.", offerings: "Prayer, barefoot walking, circumambulation.", tags: ["long station", "Offaly", "stomach", "tree", "barefoot"], county: "Offaly" },
  { name: "Ballywully Well — Saint Nechtan", location: "Ballywully, Derry", description: "The well is actually a Bullaun stone underneath a tree with many clooties tied to it.", cure: "Cures warts: dip a rag in well water, wash the skin, tie rag (clootie) to tree. As the rag decays, so does the wart.", offerings: "Clootie rags tied to tree branches.", tags: ["bullaun", "clooties", "rag", "St. Nechtan", "warts"], county: "Derry" },
  { name: "Tobareendowney — King of Sunday", location: "Rathwilladoon, Galway", description: "Right off the road — climb cattle fences to find this walled compound containing 2 wells and an altar. One well flows into another but goes dry in summer.", cure: "A small house/altar for 'sick persons'. Smooth stones resembling eggs recall an ancient fertility cult.", offerings: "Garland Sunday in late July. Penitents descend barefoot.", tags: ["Galway", "fertility", "barefoot", "King of Sunday"], county: "Galway" },
  { name: "St. Finnian's Well", location: "Valentia Island, Kerry", description: "Coastal well with a detailed inscription stone. Site associated with St. Finnian. A place of quiet maritime pilgrimage.", cure: "Healing of the spirit through connection with the sea and the saint.", offerings: "Prayer and quiet contemplation near the shore.", tags: ["Kerry", "coast", "inscription", "maritime"], county: "Kerry" },
  { name: "Tobar Mharie — St. Mary's Well", location: "Mullary, County Louth", description: "South of Dunleer near a ruined church and hilltop graveyard. The well sits at the bottom of a hill below an ash tree near a stream.", cure: "Healing through prayer and votive candles on the ash tree.", offerings: "Votive candles left on the ash tree, evidenced by scorch marks on the bark.", tags: ["ash", "candles", "Louth", "St. Mary"], county: "Louth" },
  { name: "St. Brigid's Well", location: "Morette, Emo, Laois", description: "Devotional statue of the Virgin Mary in a small whitewashed enclosure. To the left: a single Bullaun Stone with a shallow elongated channel.", cure: "Healing through devotion and prayer at the Bullaun.", offerings: "Private devotion.", tags: ["Brigid", "Laois", "bullaun"], county: "Laois" },
  { name: "Blakemount Holy Well", location: "Crusheen, Clare", description: "Located across from the stately home Blakemount. The well lies in a field with a 'Beware of Bull' sign. A remote and quietly atmospheric site.", cure: "General spiritual healing and blessing.", offerings: "Quiet prayer.", tags: ["Clare", "rural", "remote"], county: "Clare" },
  { name: "Our King of Sundays Well", location: "Kilfinane, County Limerick", description: "Close to Our Lady's Well. One of two wells listed together near the town of Kilfinane. The pair forms a small local pilgrimage route.", cure: "Spiritual renewal and local blessing.", offerings: "Pilgrimage during the feast days.", tags: ["Limerick", "Sunday", "paired well"], county: "Limerick" },
  { name: "St. Colmcille's Well", location: "Newtown (Leixlip), Co. Kildare", description: "Situated in a big field called 'Sileacain', subsequently flooded. Now overgrown with briars and thorns.", cure: "Sore eyes and facial ailments healed through prayer and washing.", offerings: "Tying a scapular, medal or rag to a nearby tree.", tags: ["Colmcille", "Kildare", "rag", "sore eyes"], county: "Kildare" },
  { name: "St. Cooey's Well — Second Station", location: "Portaferry, County Down", description: "The second station at the restored 7th-century monastic site. Pilgrims move between stations: Wash → Eyes → Drink — a full ritual of the body and spirit.", cure: "Washing eyes with the well water. Drinking believed to heal inner ailments.", offerings: "White quartz stones and ribbons left at the stations.", tags: ["eyes", "wash", "drink", "County Down", "coast"], county: "Down" },
];

export default function WunschbrunnenPage() {
  const [activeWell, setActiveWell] = useState<number | null>(null);
  const [coinThrown, setCoinThrown] = useState(false);
  const [wellIndex, setWellIndex] = useState(0);
  const [wish, setWish] = useState("");
  const [wishSent, setWishSent] = useState(false);
  const [filter, setFilter] = useState("");

  const currentWell = WELLS[wellIndex % WELLS.length];
  const filtered = WELLS.filter(
    (w) =>
      filter === "" ||
      w.name.toLowerCase().includes(filter.toLowerCase()) ||
      w.county.toLowerCase().includes(filter.toLowerCase()) ||
      w.tags.some((t) => t.toLowerCase().includes(filter.toLowerCase()))
  );

  function throwCoin() {
    if (coinThrown) return;
    setCoinThrown(true);
    setTimeout(() => {
      setCoinThrown(false);
      setWellIndex((i) => i + 1);
    }, 2400);
  }

  function sendWish() {
    if (!wish.trim()) return;
    setWishSent(true);
    setTimeout(() => {
      setWishSent(false);
      setWish("");
    }, 3000);
  }

  const tagColors: Record<string, string> = {
    eyes: "#00bcd4", gout: "#7c3aed", stomach: "#4caf7d", lameness: "#e67e22",
    clootie: "#9b59ff", Brigid: "#d4af37", Kerry: "#4caf7d", Offaly: "#7c3aed",
    Galway: "#00bcd4", Limerick: "#e67e22", Wicklow: "#4caf7d", Down: "#d4af37",
    Clare: "#9b59ff", Laois: "#00bcd4", Louth: "#4caf7d", Kildare: "#e67e22",
    Derry: "#7c3aed",
  };

  return (
    <main className="min-h-screen bg-sacred px-4 py-10">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <header className="text-center mb-12">
          <p className="font-ceremonial text-xs opacity-40 mb-2" style={{ letterSpacing: "4px" }}>
            ✦ &nbsp; WUNSCHBRUNNEN · IRISCHE HEILQUELLEN &nbsp; ✦
          </p>
          <h1 className="font-ceremonial text-gold glow-gold" style={{ fontSize: "clamp(1.8rem,5vw,3rem)", letterSpacing: "0.1em" }}>
            Die Heiligen Brunnen Irlands
          </h1>
          <p className="mt-3 opacity-60" style={{ fontFamily: "var(--font-quote)", fontSize: "1.05rem", fontStyle: "italic", maxWidth: "600px", margin: "0.75rem auto 0" }}>
            „650 Holy Wells — jeder ein Ort der Stille, der Heilung und des kollektiven Gedächtnisses."
          </p>
          <p className="mt-2 font-ceremonial opacity-30" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            IHWCBC — Ireland's Holy Wells Caring &amp; Conservation Board
          </p>
        </header>

        {/* COIN THROW RITUAL */}
        <section
          className="mb-12 p-8 text-center"
          style={{ border: "1px solid rgba(212,175,55,0.25)", background: "rgba(255,255,255,0.015)", position: "relative", overflow: "hidden" }}
        >
          {/* animated coin */}
          {coinThrown && (
            <div style={{
              position: "absolute", top: "10%", left: "50%",
              transform: "translateX(-50%)",
              fontSize: "2.2rem",
              animation: "coinFall 2.4s ease-in forwards",
            }}>🪙</div>
          )}
          <p className="font-ceremonial opacity-40 mb-3" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            AKTUELLER BRUNNEN — {wellIndex % WELLS.length + 1} / {WELLS.length}
          </p>
          <h2 className="font-ceremonial text-gold mb-1" style={{ fontSize: "1.3rem" }}>
            {currentWell.name}
          </h2>
          <p className="opacity-60 mb-1" style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem" }}>
            📍 {currentWell.location}
          </p>
          <p className="opacity-50 mb-4" style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", fontStyle: "italic", maxWidth: "520px", margin: "0 auto 1.25rem" }}>
            {currentWell.cure}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center", marginBottom: "1.5rem" }}>
            {currentWell.tags.slice(0, 5).map((t) => (
              <span key={t} style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.38rem", letterSpacing: "1.5px", padding: "3px 10px", border: `1px solid ${tagColors[t] ?? "#d4af37"}44`, color: tagColors[t] ?? "#d4af37", background: `${tagColors[t] ?? "#d4af37"}11`, textTransform: "uppercase" }}>
                {t}
              </span>
            ))}
          </div>

          {/* Wish input */}
          {!wishSent ? (
            <div style={{ maxWidth: "480px", margin: "0 auto" }}>
              <textarea
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder="Schreibe deinen Wunsch für die Welt…"
                rows={2}
                style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.25)", color: "rgba(249,241,215,0.85)", fontFamily: "var(--font-quote)", fontSize: "0.95rem", padding: "0.75rem 1rem", resize: "none", outline: "none", marginBottom: "0.75rem" }}
              />
              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
                <button
                  onClick={throwCoin}
                  disabled={coinThrown}
                  className="btn-gold"
                  style={{ fontSize: "0.55rem", letterSpacing: "2px", opacity: coinThrown ? 0.5 : 1 }}
                >
                  🪙 Münze werfen
                </button>
                <button
                  onClick={sendWish}
                  disabled={!wish.trim()}
                  className="btn-ghost"
                  style={{ fontSize: "0.55rem", opacity: !wish.trim() ? 0.4 : 1 }}
                >
                  ✦ Wunsch senden
                </button>
              </div>
            </div>
          ) : (
            <div style={{ padding: "1.5rem", border: "1px solid rgba(76,175,125,0.3)", background: "rgba(76,175,125,0.05)", maxWidth: "480px", margin: "0 auto" }}>
              <p className="font-ceremonial text-gold" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>
                ✦ Wunsch verwahrt
              </p>
              <p className="mt-1 opacity-60" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontStyle: "italic" }}>
                „{wish}" — wird vergoldet im Vakuum-Archiv
              </p>
            </div>
          )}
        </section>

        {/* SEARCH + FILTER */}
        <section className="mb-8">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div className="font-ceremonial opacity-50" style={{ fontSize: "0.55rem", letterSpacing: "3px", flexShrink: 0 }}>
              {filtered.length} BRUNNEN
            </div>
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Suche nach Name, County oder Heilwirkung…"
              style={{ flex: 1, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.2)", color: "rgba(249,241,215,0.85)", fontFamily: "var(--font-body)", fontSize: "0.88rem", padding: "0.6rem 1rem", outline: "none" }}
            />
            {filter && (
              <button onClick={() => setFilter("")} className="btn-ghost" style={{ fontSize: "0.55rem", padding: "0.5rem 0.9rem" }}>✕</button>
            )}
          </div>
        </section>

        {/* WELL CARDS GRID */}
        <section className="mb-12">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
            {filtered.map((w, i) => (
              <div
                key={i}
                onClick={() => setActiveWell(activeWell === i ? null : i)}
                className="station-card"
                style={{ cursor: "pointer", borderTop: activeWell === i ? "2px solid #d4af37" : "1px solid rgba(212,175,55,0.15)", transition: "all 0.3s" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <div className="font-ceremonial text-gold" style={{ fontSize: "0.7rem", letterSpacing: "1px", lineHeight: 1.35, flex: 1 }}>
                    {w.name}
                  </div>
                  <span style={{ fontSize: "0.55rem", color: "rgba(212,175,55,0.4)", marginLeft: "0.5rem", flexShrink: 0 }}>
                    {activeWell === i ? "▲" : "▼"}
                  </span>
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", opacity: 0.5, marginBottom: "0.5rem" }}>
                  📍 {w.location}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", opacity: 0.65, fontStyle: "italic", lineHeight: 1.5, marginBottom: "0.6rem" }}>
                  {w.cure}
                </p>
                {activeWell === i && (
                  <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="font-ceremonial opacity-40 mb-1" style={{ fontSize: "0.4rem", letterSpacing: "2px" }}>BESCHREIBUNG</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", opacity: 0.6, lineHeight: 1.6, marginBottom: "0.75rem" }}>
                      {w.description}
                    </p>
                    <p className="font-ceremonial opacity-40 mb-1" style={{ fontSize: "0.4rem", letterSpacing: "2px" }}>GABEN &amp; OPFERGABEN</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", opacity: 0.55, lineHeight: 1.6, marginBottom: "0.75rem" }}>
                      {w.offerings}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                      {w.tags.map((t) => (
                        <span key={t} style={{ fontFamily: "var(--font-ceremonial)", fontSize: "0.35rem", letterSpacing: "1px", padding: "2px 8px", border: `1px solid ${tagColors[t] ?? "#d4af37"}44`, color: tagColors[t] ?? "#d4af37", background: `${tagColors[t] ?? "#d4af37"}0f`, textTransform: "uppercase" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SPLITSCREEN LINK */}
        <section className="text-center mb-8 p-6" style={{ border: "1px solid rgba(212,175,55,0.2)", background: "rgba(255,255,255,0.015)" }}>
          <p className="font-ceremonial opacity-40 mb-2" style={{ fontSize: "0.55rem", letterSpacing: "3px" }}>
            IMMERSIVE ERFAHRUNG
          </p>
          <h3 className="font-ceremonial text-gold mb-2" style={{ fontSize: "1rem" }}>
            3D-Brunnen + Cosmic Atlas
          </h3>
          <p className="opacity-50 mb-4" style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem" }}>
            Erlebe den Wunschbrunnen als lebendige 3D-Welt — nebeneinander mit dem Cosmic Artifact Atlas.
          </p>
          <Link href="/portal/splitscreen" className="btn-gold" style={{ fontSize: "0.55rem", letterSpacing: "2px" }}>
            ✦ Splitscreen öffnen
          </Link>
        </section>

        {/* NAVIGATION */}
        <div className="text-center">
          <Link href="/portal" className="btn-ghost" style={{ fontSize: "0.55rem" }}>
            ← Zurück zum Portal
          </Link>
        </div>

      </div>

      <style>{`
        @keyframes coinFall {
          0%   { transform: translateX(-50%) translateY(0) rotate(0deg) scale(1); opacity: 1; }
          60%  { transform: translateX(-50%) translateY(80px) rotate(720deg) scale(0.8); opacity: 0.8; }
          100% { transform: translateX(-50%) translateY(180px) rotate(1440deg) scale(0.1); opacity: 0; }
        }
      `}</style>
    </main>
  );
}
