"use client";

import { useEffect, useState } from "react";
import type { TestimonialItem } from "@/lib/landing-types";

const fallback: TestimonialItem[] = [
  {
    _id: "f1",
    name: "[SAMPLE] Yacine M.",
    role: "Recurring client · 40+ projects",
    message:
      "[SAMPLE REVIEW] Hamiz is the kind of editor you stop looking after you find. Turnaround was faster than promised, notes were handled in one pass, and the final cut made my content look twice the budget it was.",
    imageUrl: "",
  },
  {
    _id: "f2",
    name: "[SAMPLE] James R.",
    role: "Documentary channel · US",
    message:
      "[SAMPLE REVIEW] We've worked with three editors before Hamiz. None of them understood pacing on long-form documentary. He does. Rehired immediately.",
    imageUrl: "",
  },
  {
    _id: "f3",
    name: "[SAMPLE] Sarah L.",
    role: "Content producer · UK",
    message:
      "[SAMPLE REVIEW] Delivered a 22-minute true-crime doc with full AI-visual pipeline in under a week. Communication was clean, revisions were precise, and he actually cared about the story.",
    imageUrl: "",
  },
  {
    _id: "f4",
    name: "[SAMPLE] Daniel K.",
    role: "YouTube creator · Canada",
    message:
      "[SAMPLE REVIEW] Honestly the easiest hire I've made on Upwork. Shows up, ships work, asks the right questions. Will keep sending him projects as long as he keeps taking them.",
    imageUrl: "",
  },
];

export default function LandingTestimonials() {
  const [items, setItems] = useState<TestimonialItem[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/testimonials", { cache: "no-store" });
        const data = (await res.json()) as TestimonialItem[] | unknown;
        if (cancelled) return;
        if (Array.isArray(data)) {
          setItems(
            data.map((t) => ({
              ...t,
              imageUrl: t.imageUrl?.trim() ?? "",
            }))
          );
        } else {
          setItems(null);
        }
      } catch {
        if (!cancelled) setItems(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const list = items && items.length ? items : fallback;

  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <h2 className="display">
            What clients <em>actually say.</em>
          </h2>
          <div className="side">
            Pulled from Upwork reviews and client emails. Names kept as written.
          </div>
        </div>

        <div className="testimonials">
          {list.map((t) => (
            <div key={t._id} className="t t-elevated">
              {t.imageUrl ? (
                <img className="t-photo" src={t.imageUrl} alt="" loading="lazy" />
              ) : null}
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
