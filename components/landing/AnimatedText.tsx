"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { CSSProperties } from "react";
import { useRef } from "react";

type CharSpanProps = {
  char: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
};

function CharSpan({ char, index, total, scrollYProgress }: CharSpanProps) {
  const opacity = useTransform(
    scrollYProgress,
    [index / total, (index + 1) / total],
    [0.2, 1]
  );
  const display = char === " " ? "\u00A0" : char;

  return (
    <span style={{ position: "relative" }}>
      <span style={{ opacity: 0 }}>{display}</span>
      <motion.span style={{ position: "absolute", left: 0, opacity }}>{display}</motion.span>
    </span>
  );
}

type AnimatedTextProps = {
  text: string;
  className?: string;
  style?: CSSProperties;
};

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });
  const chars = text.split("");

  return (
    <p ref={ref} className={className} style={{ whiteSpace: "pre-wrap", ...style }}>
      {chars.map((char, i) => (
        <CharSpan
          key={`${i}-${char}`}
          char={char}
          index={i}
          total={chars.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </p>
  );
}
