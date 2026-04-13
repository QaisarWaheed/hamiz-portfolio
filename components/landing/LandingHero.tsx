import HeroStats from "@/components/landing/HeroStats";

export default function LandingHero() {
  return (
    <header className="ed-hero">
      <div className="ed-bubbles">
        <div className="ed-bubble ed-b1">After Effects</div>
        <div className="ed-bubble ed-b2">Premiere Pro</div>
        <div className="ed-bubble ed-b3">Motion Graphics</div>
        <div className="ed-bubble ed-b4">Faceless Editing</div>
        <div className="ed-bubble ed-b5">AI Technical Explainers</div>
      </div>
      <div className="wrap">
        <div className="ed-hero-top">
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

        <HeroStats />
      </div>
    </header>
  );
}
