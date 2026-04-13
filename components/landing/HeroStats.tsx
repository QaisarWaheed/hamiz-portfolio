"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function useCountUp(end: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    setValue(0);
    const duration = Math.min(2400, Math.max(1100, 650 + end * 14));
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setValue(Math.round(easeOutCubic(t) * end));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, active]);

  return value;
}

const STATS = [
  {
    tag: "[SAMPLE]",
    target: 120,
    suffix: "+" as const,
    description: "Projects delivered across documentary, interview and explainer formats.",
  },
  {
    tag: "[SAMPLE]",
    target: 100,
    suffix: "%" as const,
    description: "Job Success Score on Upwork. Top Rated status maintained.",
  },
  {
    tag: "[SAMPLE]",
    target: 4,
    suffix: "+" as const,
    description: "Years editing long-form content for international YouTube channels.",
  },
] as const;

export default function HeroStats() {
  const reduceMotion = useReducedMotion();
  const reduce = reduceMotion === true;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const run = inView && !reduce;

  const n0 = useCountUp(STATS[0].target, run);
  const n1 = useCountUp(STATS[1].target, run);
  const n2 = useCountUp(STATS[2].target, run);
  const values = reduce
    ? [STATS[0].target, STATS[1].target, STATS[2].target]
    : [n0, n1, n2];

  return (
    <div ref={ref} className="ed-hero-bottom">
      {STATS.map((s, i) => (
        <div key={s.description} className="ed-hero-stat-card">
          <div className="num">
            <em>{s.tag}</em> {values[i]}
            {s.suffix}
          </div>
          <p>{s.description}</p>
        </div>
      ))}
    </div>
  );
}
