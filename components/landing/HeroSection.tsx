"use client";

import {
  HERO_COPYRIGHT,
  HERO_CREDIT_LINE,
  HERO_HEADLINE_LINES,
  HERO_SPARK_BOLT,
  HERO_SPARK_STAR,
  PORTRAIT_ALT,
  PORTRAIT_HEIGHT,
  PORTRAIT_URL,
  PORTRAIT_WIDTH,
} from "@/components/landing/landing-content";
import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function HeroSection() {
  return (
    <section
      id="hero-section"
      className="relative h-screen border-b border-line"
    >
      <div className="relative mx-auto h-full w-full max-w-[1180px] px-6 min-[810px]:px-[50px]">
        {/* Decorative sparks */}
        <motion.div
          className="pointer-events-none absolute z-[1] w-[52px] select-none max-[809px]:left-1 max-[809px]:top-[8%] min-[810px]:left-[-18px] min-[810px]:top-[27%] min-[810px]:w-[140px]"
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
            fetchPriority="low"
            decoding="async"
            className="h-auto w-full"
            draggable={false}
          />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute z-[1] w-[52px] select-none max-[809px]:bottom-[28%] max-[809px]:right-1 max-[809px]:top-auto min-[810px]:right-[-8px] min-[810px]:top-[58%] min-[810px]:w-[140px]"
          style={{ rotate: "18deg" }}
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
            fetchPriority="low"
            decoding="async"
            className="h-auto w-full"
            draggable={false}
          />
        </motion.div>

        {/* Headline */}
        <h1 className="absolute inset-x-6 top-1/2 z-20 -translate-y-1/2 text-center font-extrabold leading-[0.9] tracking-[-0.02em] text-ink max-[809px]:text-[clamp(57px,15.2vw,100px)] min-[810px]:inset-x-[50px] min-[810px]:text-[clamp(80px,13.6vw,174px)]">
          <span className="block whitespace-nowrap">{HERO_HEADLINE_LINES[0]}</span>
          <span className="block whitespace-nowrap">{HERO_HEADLINE_LINES[1]}</span>
        </h1>

        {/* Portrait — static square frame, ~16° tilt (clipped to 198×198) */}
        <div className="absolute left-1/2 z-10 h-[180px] w-[180px] -translate-x-1/2 overflow-hidden max-[809px]:top-[519px] min-[810px]:top-[508px] min-[810px]:h-[198px] min-[810px]:w-[198px]">
          <div className="h-full w-full" style={{ rotate: "16deg", transformOrigin: "center center" }}>
            <div className="relative aspect-square h-full w-full bg-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PORTRAIT_URL}
                alt={PORTRAIT_ALT}
                width={PORTRAIT_WIDTH}
                height={PORTRAIT_HEIGHT}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover object-top"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="absolute inset-x-6 bottom-5 z-20 flex items-end justify-between min-[810px]:inset-x-[50px]">
          <span
            className="font-semibold leading-none tracking-[-0.07em] text-ink max-[809px]:text-[42px] min-[810px]:text-[64px]"
            style={{ letterSpacing: "-0.07em" }}
          >
            {HERO_COPYRIGHT}
          </span>
          <span className="max-w-[130px] text-right text-[13px] leading-snug text-ink min-[810px]:max-w-none min-[810px]:text-[18px]">
            {HERO_CREDIT_LINE}
          </span>
        </div>
      </div>
    </section>
  );
}
