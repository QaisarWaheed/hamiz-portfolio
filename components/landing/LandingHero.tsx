import HeroBottomStats from "@/components/landing/HeroBottomStats";

export default function LandingHero() {
  return (
    <header className="hero">
      <div className="bubbles">
        <div className="bubble b1">After Effects</div>
        <div className="bubble b2">Premiere Pro</div>
        <div className="bubble b3">Motion Graphics</div>
        <div className="bubble b4">Faceless Editing</div>
        <div className="bubble b5">AI Technical Explainers</div>
      </div>
      <div className="wrap">
        <div className="hero-top">
          <div className="mono">Hamiz Khan / Multan, Pakistan / Available Q2 2026</div>
          <div className="meta-block">
            <div className="mono">01 — Intro</div>
            <p>
              Freelance video editor. Top Rated on Upwork. Edits that look like someone actually
              cared.
            </p>
          </div>
        </div>

        <h1 className="display">
          Taking the <em>editing nightmare</em> <br />
          <span className="thin">off your plate —</span> <br />
          one cut at a time.
        </h1>

        <HeroBottomStats />
      </div>
    </header>
  );
}
