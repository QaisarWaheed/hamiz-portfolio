"use client";

import { QUOTE_COPY } from "@/components/landing/landing-content";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useMemo, useRef } from "react";

const WORD_FADED = "rgba(0, 0, 0, 0.1)";
const WORD_INK = "#121212";

/**
 * useScroll offsets ["start end", "end start"] on a 150vh track:
 * progress 0 → section enters viewport bottom; progress 1 → section leaves top.
 * Sticky 100vh stage pins for the middle 0.5vh of that track.
 * Pin ends near progress ≈ (vh + 0.5·vh) / (150vh + vh) = 1.5/2.5 = 0.6.
 * Finish the last word at pin end so copy stays on screen (ref ~scrollY 2245, textTop ~350).
 */
const REVEAL_BY = 0.6;

function QuoteWord({
  word,
  index,
  total,
  scrollYProgress,
  reducedMotion,
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const start = (index / total) * REVEAL_BY;
  const end = ((index + 1) / total) * REVEAL_BY;

  const color = useTransform(scrollYProgress, [start, end], [WORD_FADED, WORD_INK]);

  if (reducedMotion) {
    return <span className="text-ink">{word}</span>;
  }

  return <motion.span style={{ color }}>{word}</motion.span>;
}

export default function QuoteSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const words = useMemo(() => QUOTE_COPY.split(/\s+/).filter(Boolean), []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[150vh] border-b border-line"
    >
      <div className="sticky top-0 flex h-screen items-start justify-center pt-[40.4vh]">
        <div className="section-container">
          <p className="mx-auto w-full max-w-[840px] text-center text-[24px] font-medium leading-[1.2] tracking-[-0.02em] text-ink min-[810px]:text-[36px]">
            {words.map((word, index) => (
              <span key={`${word}-${index}`}>
                <QuoteWord
                  word={word}
                  index={index}
                  total={words.length}
                  scrollYProgress={scrollYProgress}
                  reducedMotion={Boolean(reducedMotion)}
                />
                {index < words.length - 1 ? " " : null}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
