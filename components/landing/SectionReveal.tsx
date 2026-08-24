"use client";

import {
  APPEAR_DURATION,
  APPEAR_EASE_1800,
  APPEAR_Y,
} from "@/lib/appear-motion";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function SectionReveal({
  children,
  className,
  delay = 0,
}: SectionRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: APPEAR_Y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -6% 0px", amount: 0.2 }}
      transition={{
        duration: APPEAR_DURATION,
        delay,
        ease: APPEAR_EASE_1800,
      }}
    >
      {children}
    </motion.div>
  );
}
