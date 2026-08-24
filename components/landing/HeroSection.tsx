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
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

/** Reference perspective ≈ 1 / 0.000833333 from measured matrix3d m34. */
const PORTRAIT_PERSPECTIVE = 1200;

const headlineClassName =
  "text-center font-extrabold leading-[0.9] tracking-[-0.02em] text-ink max-[809px]:text-[clamp(57px,15.2vw,100px)] min-[810px]:text-[clamp(80px,13.6vw,174px)]";

const backfaceHidden = {
  backfaceVisibility: "hidden" as const,
  WebkitBackfaceVisibility: "hidden" as const,
};

type HeroSectionProps = {
  /** Second 100vh panel — scrolls while hero sticky pins (reference track layout). */
  bioPanel?: ReactNode;
};

export default function HeroSection({ bioPanel }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /** Sticky range is the first half of the 200vh track (0 → ~900px at 900vh). */
  const rotateY = useTransform(scrollYProgress, [0, 0.5], [180, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);

  const desktopFlipStyle = reduceMotion
    ? { rotateY: 0, scale: 1 }
    : { rotateY, scale };

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative border-b border-line max-[809px]:min-h-screen min-[810px]:h-[200vh]"
    >
      {/*
        Desktop headline + sparks live on the 200vh track (NOT in sticky) so they
        scroll off during the pin at 1:1 — reference sparks docTop constant.
      */}
      <h1
        className={`absolute inset-x-6 top-[50vh] z-20 hidden -translate-y-1/2 min-[810px]:inset-x-[50px] min-[810px]:block ${headlineClassName}`}
      >
        <span className="block whitespace-nowrap">{HERO_HEADLINE_LINES[0]}</span>
        <span className="block whitespace-nowrap">{HERO_HEADLINE_LINES[1]}</span>
      </h1>

      {/* Sparks — static on track, no scroll/mouse motion (reference: rate 1.000 with headline). */}
      <div
        className="pointer-events-none absolute z-[1] hidden w-[140px] select-none min-[810px]:block min-[810px]:left-[34px] min-[810px]:top-[233px]"
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
      </div>

      <div
        className="pointer-events-none absolute z-[1] hidden w-[140px] select-none min-[810px]:block min-[810px]:left-[1067px] min-[810px]:top-[508px]"
        style={{ rotate: "18deg" }}
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
      </div>

      {/*
        Desktop meta row — on the 200vh track (NOT sticky), absolute top 812px
        matching reference. Scrolls 1:1 and is gone by bio (scroll 900).
      */}
      <div className="pointer-events-none absolute inset-x-[50px] top-[812px] z-20 hidden items-end justify-between min-[810px]:flex">
        <span
          className="font-semibold leading-none tracking-[-0.07em] text-ink min-[810px]:text-[64px]"
          style={{ letterSpacing: "-0.07em" }}
        >
          {HERO_COPYRIGHT}
        </span>
        <span className="text-right text-[18px] leading-snug text-ink">
          {HERO_CREDIT_LINE}
        </span>
      </div>

      {/* Desktop: sticky 100vh stage. Mobile: plain 100vh (no pin). */}
      <div className="relative z-[1] h-screen w-full min-[810px]:sticky min-[810px]:top-0 min-[810px]:overflow-hidden">
        <div className="relative mx-auto h-full w-full max-w-[1180px] px-6 min-[810px]:px-[50px]">
          {/* Mobile sparks — static in viewport */}
          <div
            className="pointer-events-none absolute z-[1] w-[52px] select-none max-[809px]:left-1 max-[809px]:top-[8%] min-[810px]:hidden"
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
          </div>

          <div
            className="pointer-events-none absolute z-[1] w-[52px] select-none max-[809px]:bottom-[28%] max-[809px]:right-1 max-[809px]:top-auto min-[810px]:hidden"
            style={{ rotate: "18deg" }}
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
          </div>

          {/* Mobile headline — inside static viewport */}
          <h1
            className={`absolute inset-x-6 top-1/2 z-20 -translate-y-1/2 min-[810px]:hidden ${headlineClassName}`}
          >
            <span className="block whitespace-nowrap">{HERO_HEADLINE_LINES[0]}</span>
            <span className="block whitespace-nowrap">{HERO_HEADLINE_LINES[1]}</span>
          </h1>

          {/* Mobile portrait — static, measured 100vh − 326 / 180×205 */}
          <div className="absolute left-1/2 z-10 -ml-[90px] aspect-[180/205] w-[180px] overflow-hidden rounded-[20px] top-[calc(100vh-326px)] min-[810px]:hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PORTRAIT_URL}
              alt={PORTRAIT_ALT}
              width={PORTRAIT_WIDTH}
              height={PORTRAIT_HEIGHT}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full rounded-[20px] object-cover object-top"
              draggable={false}
            />
          </div>

          {/*
            Desktop portrait — pinned at top 424 during sticky.
            Front face: grayscale, local rotateY(180deg) → visible at parent rotateY 180.
            Back face: full colour, no filter → visible at parent rotateY 0.
          */}
          <div
            className="absolute left-1/2 z-[1] top-[424px] -ml-[200px] hidden h-[456px] w-[400px] min-[810px]:block"
            style={{ perspective: PORTRAIT_PERSPECTIVE }}
          >
            {reduceMotion ? (
              <div className="relative h-full w-full overflow-hidden rounded-[20px]">
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
            ) : (
              <motion.div
                className="portrait-flip-initial relative h-full w-full"
                initial={false}
                style={{
                  ...desktopFlipStyle,
                  transformStyle: "preserve-3d",
                  transformOrigin: "50% 100%",
                }}
              >
                <div
                  className="absolute inset-0 overflow-hidden rounded-[20px]"
                  style={{
                    ...backfaceHidden,
                    transform: "rotateY(180deg) translateZ(0.1px)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={PORTRAIT_URL}
                    alt={PORTRAIT_ALT}
                    width={PORTRAIT_WIDTH}
                    height={PORTRAIT_HEIGHT}
                    fetchPriority="high"
                    decoding="async"
                    className="h-full w-full object-cover object-top"
                    style={{ filter: "grayscale(1)" }}
                    draggable={false}
                  />
                </div>
                <div
                  className="absolute inset-0 overflow-hidden rounded-[20px]"
                  style={backfaceHidden}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={PORTRAIT_URL}
                    alt=""
                    width={PORTRAIT_WIDTH}
                    height={PORTRAIT_HEIGHT}
                    fetchPriority="low"
                    decoding="async"
                    className="h-full w-full object-cover object-top"
                    draggable={false}
                    aria-hidden
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Mobile meta row — non-sticky 100vh stage, scrolls away with hero */}
          <div className="absolute inset-x-6 bottom-5 z-20 flex items-end justify-between min-[810px]:hidden">
            <span
              className="text-[42px] font-semibold leading-none tracking-[-0.07em] text-ink"
              style={{ letterSpacing: "-0.07em" }}
            >
              {HERO_COPYRIGHT}
            </span>
            <span className="max-w-[130px] text-right text-[13px] leading-snug text-ink">
              {HERO_CREDIT_LINE}
            </span>
          </div>
        </div>
      </div>

      {bioPanel ? (
        <section id="bio-section" className="relative z-[2] min-[810px]:min-h-screen">
          {bioPanel}
        </section>
      ) : null}
    </section>
  );
}
