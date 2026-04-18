export default function LandingPortfolio() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="section-head">
          <h2 className="display">
            Selected <em>work.</em>
          </h2>
          <div className="side">A small sample. Full portfolio and private links available on request.</div>
        </div>

        <div className="portfolio-grid">
          <div className="work">
            <div className="work-thumb w1" />
            <div className="work-info">
              <div className="title">[SAMPLE] The Strait of Hormuz</div>
              <div className="cat">Geopolitical Doc · 18min</div>
            </div>
          </div>
          <div className="work">
            <div className="work-thumb w2" />
            <div className="work-info">
              <div className="title">[SAMPLE] Charles Sobhraj</div>
              <div className="cat">True-Crime Doc · 24min</div>
            </div>
          </div>
          <div className="work">
            <div className="work-thumb w3" />
            <div className="work-info">
              <div className="title">[SAMPLE] Math Academy — Interview</div>
              <div className="cat">Long-form Interview · 52min</div>
            </div>
          </div>
          <div className="work">
            <div className="work-thumb w4" />
            <div className="work-info">
              <div className="title">[SAMPLE] NFL Fanbases Explained</div>
              <div className="cat">Video Essay · 16min</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
