"use client";

import { useEffect, useState } from "react";

type About = {
  headline: string;
  bio: string;
  email: string;
  instagram: string;
  youtube: string;
};

export default function LandingAbout() {
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let c = false;
    (async () => {
      try {
        const res = await fetch("/api/about", { cache: "no-store" });
        const data = (await res.json()) as About;
        if (!c && res.ok) setAbout(data);
      } catch {
        if (!c) setAbout(null);
      } finally {
        if (!c) setLoading(false);
      }
    })();
    return () => {
      c = true;
    };
  }, []);

  return (
    <section className="ed-section" id="about">
      <div className="wrap">
        <div className="ed-about-grid">
          <div className="about-left ed-about-left">
            <div className="mono kicker">02 — About</div>
            <div className="ed-portrait">[PORTRAIT — REPLACE]</div>
          </div>
          <div className="about-right ed-about-right">
            {loading ? (
              <div className="h-40 animate-pulse rounded bg-white/5" />
            ) : about?.bio?.trim() ? (
              <div className="whitespace-pre-wrap text-[18px] leading-[1.7] text-[var(--ink)] font-light">
                {about.bio}
              </div>
            ) : (
              <>
                <p className="lead">
                  I started editing at 17. Five years later I&apos;m a <em>Top Rated</em> editor on
                  Upwork working with clients across the US, Canada and the UK — from a room in
                  Multan, Pakistan.
                </p>

                <p>
                  [SAMPLE] My first edit was a climate-change documentary for my own channel,
                  Introvert Diary. It was bad. But it taught me the only thing that matters in this
                  craft — the cut either serves the story or it doesn&apos;t.
                </p>

                <p>
                  [SAMPLE] I now edit long-form documentaries and AI/ML research content for
                  recurring international clients. I run my studio solo, which means the person
                  you email is the person cutting your video. No account managers, no offshore
                  team, no surprises in the final render.
                </p>

                <p className="dim">
                  [SAMPLE] When I&apos;m not editing I&apos;m studying Data Science at the Virtual
                  University of Pakistan, running a YouTube channel on space and technology, and
                  slowly losing arguments with my own color grade.
                </p>
              </>
            )}

            <div className="ed-signature">
              <div>
                <div className="label">Based in</div>
                <div className="val">Multan, Pakistan</div>
              </div>
              <div>
                <div className="label">Upwork</div>
                <div className="val">Top Rated · 100% JSS</div>
              </div>
              <div>
                <div className="label">Tools</div>
                <div className="val">Premiere · AE · DaVinci</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
