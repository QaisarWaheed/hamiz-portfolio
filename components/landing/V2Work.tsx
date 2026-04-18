const TILES = [
  {
    thumb: "thumb-1",
    index: "[01]",
    title: "[CLIENT] — Justin Skycak on Math Academy",
    caption: "72 min · Full edit, motion graphics, sound design",
    href: "#",
  },
  {
    thumb: "thumb-2",
    index: "[02]",
    title: "Documentary — Charles Sobhraj: The Serpent",
    caption: "38 min · AI visuals, scoring, pacing, prompt generation",
    href: "#",
  },
  {
    thumb: "thumb-3",
    index: "[03]",
    title: "Documentary — Strait of Hormuz",
    caption: "24 min · Archival sourcing, geopolitical narrative cut",
    href: "#",
  },
  {
    thumb: "thumb-4",
    index: "[04]",
    title: "[CLIENT] — AI Research Interview Series",
    caption: "Series · Recurring long-form edits, retainer work",
    href: "#",
  },
  {
    thumb: "thumb-5",
    index: "[05]",
    title: "Documentary — Andriy Shevchenko",
    caption: "18 min · Biographical essay, archival + licensed footage",
    href: "#",
  },
  {
    thumb: "thumb-6",
    index: "[06]",
    title: "Corporate — Career Retrospective Film",
    caption: "22 min · Interview-led, subtle motion graphics",
    href: "#",
  },
] as const;

export default function V2Work() {
  return (
    <section id="work">
      <div className="v2-container">
        <div className="work__head">
          <h2 className="reveal">
            Recent <span className="italic">work.</span>
          </h2>
        </div>

        <div className="work__grid">
          {TILES.map((t) => (
            <a key={t.index} href={t.href} className="tile reveal">
              <div className={`tile__thumb ${t.thumb}`} />
              <div className="tile__index">{t.index}</div>
              <div className="tile__meta">
                <div className="tile__title">{t.title}</div>
                <div className="tile__caption">{t.caption}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
