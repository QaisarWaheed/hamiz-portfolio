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

const WORD_FADED = "#d6d3ce";
const WORD_INK = "#121212";

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
  const start = total <= 1 ? 0 : (index - 1) / (total - 1);
  const end = total <= 1 ? 1 : index / (total - 1);

  const color = useTransform(
    scrollYProgress,
    index === 0 ? [0, 1] : [Math.max(0, start), Math.min(1, end)],
    index === 0 ? [WORD_INK, WORD_INK] : [WORD_FADED, WORD_INK]
  );

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
    offset: ["start 0.85", "end 0.15"],
  });

  return (
    <section
      ref={sectionRef}
      className="flex min-h-[150vh] items-center justify-center border-b border-line px-6 py-24"
    >
      <p
        className="max-w-[900px] text-center font-medium text-ink"
        style={{
          fontSize: "clamp(32px, 4vw, 56px)",
          lineHeight: 1.07,
          letterSpacing: "-0.07em",
        }}
      >
        {words.map((word, index) => (
          <span key={`${word}-${index}`}>
            <QuoteWord
              word={word}
              index={index}
              total={words.length}
              scrollYProgress={scrollYProgress}
              reducedMotion={Boolean(reducedMotion)}
            />
            {index < words.length - 1 ? "\u00A0" : null}
          </span>
        ))}
      </p>
    </section>
  );
}
