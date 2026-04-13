"use client";

import { useEffect, useState } from "react";

export type TestimonialItem = {
  _id: string;
  name: string;
  role: string;
  message: string;
};

export default function LandingTestimonials() {
  const [items, setItems] = useState<TestimonialItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let c = false;
    (async () => {
      try {
        const res = await fetch("/api/testimonials", { cache: "no-store" });
        if (!res.ok) throw new Error("Could not load testimonials");
        const data = (await res.json()) as TestimonialItem[];
        if (!c) setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!c) setError(e instanceof Error ? e.message : "Error");
      }
    })();
    return () => {
      c = true;
    };
  }, []);

  const samples: TestimonialItem[] = [
    {
      _id: "s1",
      name: "[SAMPLE] Yacine M.",
      role: "Recurring client · 40+ projects",
      message:
        "[SAMPLE REVIEW] Hamiz is the kind of editor you stop looking after you find. Turnaround was faster than promised, notes were handled in one pass, and the final cut made my content look twice the budget it was.",
    },
    {
      _id: "s2",
      name: "[SAMPLE] James R.",
      role: "Documentary channel · US",
      message:
        "[SAMPLE REVIEW] We've worked with three editors before Hamiz. None of them understood pacing on long-form documentary. He does. Rehired immediately.",
    },
    {
      _id: "s3",
      name: "[SAMPLE] Sarah L.",
      role: "Content producer · UK",
      message:
        "[SAMPLE REVIEW] Delivered a 22-minute true-crime doc with full AI-visual pipeline in under a week. Communication was clean, revisions were precise, and he actually cared about the story.",
    },
    {
      _id: "s4",
      name: "[SAMPLE] Daniel K.",
      role: "YouTube creator · Canada",
      message:
        "[SAMPLE REVIEW] Honestly the easiest hire I've made on Upwork. Shows up, ships work, asks the right questions. Will keep sending him projects as long as he keeps taking them.",
    },
  ];

  const list = items && items.length ? items : samples;

  return (
    <section className="ed-section" id="testimonials">
      <div className="wrap">
        <div className="ed-section-head">
          <h2 className="display">
            What clients <em>actually say.</em>
          </h2>
          <div className="side">
            Pulled from Upwork reviews and client emails. Names kept as written.
          </div>
        </div>

        {error && (
          <p className="mb-6 text-sm text-red-300/90" role="alert">
            {error}
          </p>
        )}

        {items === null && !error && (
          <div className="mb-8 h-32 animate-pulse bg-[var(--rule)]/40" />
        )}

        <div className="ed-testimonials">
          {list.map((t) => (
            <div key={t._id} className="ed-t">
              <blockquote>{t.message}</blockquote>
              <div className="attrib">
                <span className="who">{t.name}</span>
                <span className="what">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
