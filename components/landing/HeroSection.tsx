"use client";

import {
  CLIENT_NAME,
  HERO_EYEBROW,
  HERO_SPARK_ONE,
  HERO_SPARK_TWO,
  HERO_TAGLINE,
  PORTRAIT_URL,
} from "@/components/landing/landing-content";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const sparkOneY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const sparkTwoY = useTransform(scrollYProgress, [0, 1], [0, -52]);

  return (
    <section ref={sectionRef} className="relative border-b border-line pt-24">
      {/* TODO: replace hero-spark-*.placeholder.png with final Framer-export assets */}
      <motion.div
        className="pointer-events-none absolute z-[2] w-[85px] select-none min-[810px]:w-[140px]"
        style={{ top: "27%", left: "-18px", y: sparkOneY }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.25, ease }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={HERO_SPARK_ONE} alt="" className="h-auto w-full" draggable={false} />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute z-[2] w-[85px] select-none min-[810px]:w-[140px]"
        style={{ top: "58%", right: "-8px", rotate: "18deg", y: sparkTwoY }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.35, ease }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={HERO_SPARK_TWO} alt="" className="h-auto w-full" draggable={false} />
      </motion.div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-16 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-16 md:pb-24 md:pt-20">
        <div>
          <motion.p
            className="text-xs uppercase tracking-[0.22em] text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            {HERO_EYEBROW}
          </motion.p>
          <motion.h1
            className="mt-4 max-w-3xl text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-tight text-ink"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease }}
          >
            {CLIENT_NAME}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16, ease }}
          >
            {HERO_TAGLINE}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease }}
          >
            <a
              href="#contact"
              className="mt-8 inline-flex border border-ink px-6 py-3 text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Get in touch
            </a>
          </motion.div>
        </div>

        <motion.div
          className="relative aspect-[16/10] w-full max-w-[min(100%,20rem)] overflow-hidden border border-line bg-line md:max-w-xs"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PORTRAIT_URL}
            alt={CLIENT_NAME}
            className="h-full w-full object-cover object-[center_20%]"
            draggable={false}
          />
        </motion.div>
      </div>
    </section>
  );
}
