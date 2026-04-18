const ITEMS = [
  {
    quote:
      "Fast turnarounds, clear notes, and a finish that holds up on every platform. We will be back for the next campaign.",
    name: "[CLIENT NAME]",
    ctx: "Upwork — 5★ review",
  },
  {
    quote:
      "Our release film finally feels like the music — tight, emotional, and cinematic without trying too hard.",
    name: "[CLIENT NAME]",
    ctx: "Upwork — 5★ review",
  },
  {
    quote:
      "Hamiz took a mountain of rough cuts and shaped them into something that actually moves people. The pacing is surgical.",
    name: "[CLIENT NAME]",
    ctx: "Direct client — ongoing retainer",
  },
  {
    quote:
      "Delivered every single episode on time across six months. No hand-holding, no second-guessing the direction.",
    name: "[CLIENT NAME]",
    ctx: "YouTube channel, 250k+ subs",
  },
] as const;

export default function V2Proof() {
  return (
    <section id="proof">
      <div className="v2-container">
        <div className="proof__head">
          <h2 className="reveal">
            What clients <span className="italic">actually say.</span>
          </h2>
        </div>

        <div className="testimonials">
          {ITEMS.map((t) => (
            <div key={t.quote} className="testimonial reveal">
              <p className="testimonial__quote">{t.quote}</p>
              <div className="testimonial__meta">
                <span className="testimonial__name">{t.name}</span>
                <span className="testimonial__ctx">{t.ctx}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
