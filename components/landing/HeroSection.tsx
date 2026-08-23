"use client";

import {
  CLIENT_NAME,
  HERO_EYEBROW,
  HERO_SPARK_BOLT,
  HERO_SPARK_STAR,
  HERO_TAGLINE,
  PORTRAIT_URL,
} from "@/components/landing/landing-content";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.25, 0.1, 0.25, 1] as const;

/** Reference: portrait clip grows from ~50% to 100% over the 200vh sticky scroll range. */
const PORTRAIT_REVEAL_START = 0.5;
const PORTRAIT_REVEAL_END = 1;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const sparkOneY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const sparkTwoY = useTransform(scrollYProgress, [0, 1], [0, -52]);
  const clipHeight = useTransform(
    scrollYProgress,
    [0, 1],
    [`${PORTRAIT_REVEAL_START * 100}%`, `${PORTRAIT_REVEAL_END * 100}%`]
  );

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative h-[200vh] border-b border-line"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden pt-24">
        <motion.div
          className="pointer-events-none absolute z-[2] w-[85px] select-none min-[810px]:w-[140px]"
          style={{ top: "27%", left: "-18px", y: sparkOneY }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease }}
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_SPARK_STAR}
            alt=""
            width={420}
            height={420}
            loading="lazy"
            fetchPriority="low"
            decoding="async"
            className="h-auto w-full"
            draggable={false}
          />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute z-[2] w-[85px] select-none min-[810px]:w-[140px]"
          style={{ top: "58%", right: "-8px", rotate: "18deg", y: sparkTwoY }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.35, ease }}
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_SPARK_BOLT}
            alt=""
            width={420}
            height={420}
            loading="lazy"
            fetchPriority="low"
            decoding="async"
            className="h-auto w-full"
            draggable={false}
          />
        </motion.div>

        <div className="relative mx-auto flex min-h-0 w-full max-w-6xl flex-1 grid-cols-1 gap-10 px-6 pb-12 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-16 md:pb-16">
          <div className="flex flex-col justify-end pb-4 md:pb-8">
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
            className="relative mx-auto w-full max-w-[min(100%,340px)] shrink-0 md:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            {/* 800×1072 source (3:4). Clip container height reveals bottom → top on scroll. */}
            <div className="relative aspect-[3/4] w-full border border-line bg-line">
              <motion.div
                className="absolute inset-x-0 bottom-0 overflow-hidden"
                style={{ height: clipHeight }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PORTRAIT_URL}
                  alt={CLIENT_NAME}
                  width={800}
                  height={1072}
                  className="absolute bottom-0 left-0 h-full w-full object-cover object-center"
                  draggable={false}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
