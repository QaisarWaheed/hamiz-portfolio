"use client";

import { useCallback, useState } from "react";

const SERVICES = [
  {
    id: "service-body-1",
    num: "[01]",
    title: (
      <>
        Faceless documentary
        <br />
        long-form
      </>
    ),
    tag: "10–90 min narrative edits",
    bullets: [
      "AI-generated visuals & archival footage",
      "Stock sourcing & motion graphics",
      "Original sound design & score assembly",
      "True-crime, geopolitics, history, explainer essays",
      "Full pipeline — prompt generation, pacing, mix, colour",
    ],
  },
  {
    id: "service-body-2",
    num: "[02]",
    title: (
      <>
        AI & ML /
        <br />
        technical videos
      </>
    ),
    tag: "Research & interview episodes",
    bullets: [
      "Clean speaker cuts & multi-cam sync",
      "Diagram overlays & screen recordings",
      "Paper visualisations & formula animations",
      "Typography that reads at 1.5× speed",
      "Built for audiences who finish the video",
    ],
  },
  {
    id: "service-body-3",
    num: "[03]",
    title: (
      <>
        Face-cam YouTube
        <br />
        videos
      </>
    ),
    tag: "Talking-head, retention-first",
    bullets: [
      "B-roll integration & jump-cut pacing",
      "Subtitles & overlay graphics",
      "Audio cleanup & music beds",
      "Retention without over-editing",
      "No zoom-clown stuff",
    ],
  },
] as const;

export default function V2ServicesAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section id="services">
      <div className="v2-container">
        <div className="three__head">
          <h2 className="reveal">
            Three formats I cut
            <br />
            <span className="italic">every week.</span>
          </h2>
        </div>

        {SERVICES.map((s) => {
          const isOpen = openId === s.id;
          return (
            <div
              key={s.id}
              className={`service${isOpen ? " is-open" : ""}`}
              data-accordion
            >
              <button
                type="button"
                className="service__head"
                aria-expanded={isOpen}
                aria-controls={s.id}
                onClick={() => toggle(s.id)}
              >
                <div className="service__num">{s.num}</div>
                <div className="service__title">{s.title}</div>
                <div className="service__tag">{s.tag}</div>
                <div className="service__toggle" aria-hidden>
                  <span className="service__toggle-line" />
                  <span className="service__toggle-line service__toggle-line--v" />
                </div>
              </button>
              <div className="service__body" id={s.id} role="region">
                <ul className="service__bullets">
                  {s.bullets.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
