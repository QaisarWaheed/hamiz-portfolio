export default function LandingPricing() {
  return (
    <section className="section" id="pricing">
      <div className="wrap">
        <div className="section-head">
          <h2 className="display">
            Simple <em>pricing.</em> No proposal PDFs.
          </h2>
          <div className="side">
            Per-project rates for one-off edits. Retainers available for recurring channels — message
            me for a custom quote.
          </div>
        </div>

        <div className="pricing">
          <div className="tier">
            <div className="name">Short-Form</div>
            <div className="who">Face-cam videos, social cuts, short explainers</div>
            <div className="price">
              <span className="amt">[SAMPLE]</span>
              <span className="unit">from $150 / video</span>
            </div>
            <ul>
              <li>Up to 10 minutes final length</li>
              <li>Jump cuts, B-roll, subtitles</li>
              <li>Basic motion graphics</li>
              <li>Audio cleanup & mix</li>
              <li>2 rounds of revisions</li>
              <li>48–72 hour turnaround</li>
            </ul>
            <a href="#contact" className="book">
              Start a project
            </a>
          </div>

          <div className="tier featured">
            <div className="badge">Most Hired</div>
            <div className="name">Long-Form</div>
            <div className="who">Documentaries, video essays, deep-dive content</div>
            <div className="price">
              <span className="amt">[SAMPLE]</span>
              <span className="unit">from $450 / video</span>
            </div>
            <ul>
              <li>10–30 minutes final length</li>
              <li>AI-generated visual pipeline</li>
              <li>Archival + stock footage sourcing</li>
              <li>Full motion graphics & titles</li>
              <li>Sound design & music licensing</li>
              <li>Unlimited revisions within scope</li>
              <li>5–7 day turnaround</li>
            </ul>
            <a href="#contact" className="book">
              Start a project
            </a>
          </div>

          <div className="tier">
            <div className="name">Monthly Retainer</div>
            <div className="who">Channels shipping 4+ videos per month</div>
            <div className="price">
              <span className="amt">[SAMPLE]</span>
              <span className="unit">from $2,000 / month</span>
            </div>
            <ul>
              <li>Priority slot on my calendar</li>
              <li>Dedicated workflow & presets</li>
              <li>Weekly sync calls</li>
              <li>Faster turnaround on every video</li>
              <li>Pricing locked for 6 months</li>
            </ul>
            <a href="#contact" className="book">
              Inquire
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
