export default function V2Hero() {
  return (
    <section className="hero">
      <div className="v2-container">
        <h1 className="hero__headline reveal">
          The editor behind <span className="italic">documentaries</span>,{" "}
          <span className="italic">interviews</span>, and{" "}
          <span className="italic">technical videos</span>.
        </h1>

        <p className="hero__sub reveal">
          Top Rated on Upwork with <strong>100% JSS</strong> maintained across the whole run.
        </p>

        <div className="stats reveal">
          <div className="stat">
            <div className="stat__num">
              60–90<span className="stat__suffix"> min</span>
            </div>
            <div className="stat__cap">Long-form runtime I regularly cut — not clips, not reels.</div>
          </div>
          <div className="stat">
            <div className="stat__num small">
              Justin Skycak &nbsp;·&nbsp; [GUEST 2]
            </div>
            <div className="stat__cap">Recent interview guests I&apos;ve cut episodes with.</div>
          </div>
          <div className="stat">
            <div className="stat__num">
              100<span className="stat__suffix">% JSS</span>
            </div>
            <div className="stat__cap">
              Upwork Job Success Score, held across the platform and client relationships with 5 stars.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
