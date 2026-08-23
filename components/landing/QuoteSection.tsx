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

const REVEAL_BY = 0.72;

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
      className="relative flex min-h-[150vh] items-center justify-center border-b border-line py-24"
    >
      <div className="section-container">
        <p className="w-full text-center text-[24px] font-medium leading-[1.2] tracking-[-0.02em] text-ink min-[810px]:text-[36px]">
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
      </div>
    </section>
  );
}
