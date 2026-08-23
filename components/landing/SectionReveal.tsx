"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type SectionRevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export default function SectionReveal({
  children,
  className,
  delay = 0,
  ...rest
}: SectionRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px", amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
