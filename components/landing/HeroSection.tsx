"use client";

import {
  CLIENT_NAME,
  HERO_COPYRIGHT,
  HERO_CREDIT_LINE,
  HERO_HEADLINE_LINES,
  HERO_SPARK_BOLT,
  HERO_SPARK_STAR,
  PORTRAIT_URL,
} from "@/components/landing/landing-content";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

const ease = [0.25, 0.1, 0.25, 1] as const;

/** Portrait reveal: grows downward from 50% to 100% over the sticky scroll range. */
const PORTRAIT_REVEAL_START = 0.5;
const PORTRAIT_REVEAL_END = 1;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  const [portraitTop, setPortraitTop] = useState<number | null>(null);

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

  const measureLayout = useCallback(() => {
    const stage = stageRef.current;
    const line2 = line2Ref.current;
    if (!stage || !line2) return;

    const stageRect = stage.getBoundingClientRect();
    const line2Rect = line2.getBoundingClientRect();
    setPortraitTop(line2Rect.bottom - stageRect.top);
  }, []);

  useLayoutEffect(() => {
    measureLayout();

    const ro = new ResizeObserver(measureLayout);
    if (stageRef.current) ro.observe(stageRef.current);
    if (headlineRef.current) ro.observe(headlineRef.current);

    window.addEventListener("resize", measureLayout);
    document.fonts?.ready.then(measureLayout);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measureLayout);
    };
  }, [measureLayout]);

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative h-[200vh] border-b border-line"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          ref={stageRef}
          className="relative mx-auto h-full w-full max-w-[1180px] px-6 min-[810px]:px-[50px]"
        >
          {/* Decorative sparks — kept off headline on mobile */}
          <motion.div
            className="pointer-events-none absolute z-[1] w-[52px] select-none max-[809px]:left-1 max-[809px]:top-[8%] min-[810px]:left-[-18px] min-[810px]:top-[27%] min-[810px]:w-[140px]"
            style={{ y: sparkOneY }}
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
            style={{ rotate: "18deg", y: sparkTwoY }}
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

          {/* 1. Headline — shared size, ragged line widths */}
          <h1
            ref={headlineRef}
            className="absolute inset-x-6 top-1/2 z-20 -translate-y-1/2 text-center font-extrabold leading-[0.9] tracking-[-0.02em] text-ink max-[809px]:text-[clamp(57px,15.2vw,100px)] min-[810px]:inset-x-[50px] min-[810px]:text-[clamp(80px,13.6vw,174px)]"
          >
            <span className="block whitespace-nowrap">{HERO_HEADLINE_LINES[0]}</span>
            <span ref={line2Ref} className="block whitespace-nowrap">
              {HERO_HEADLINE_LINES[1]}
            </span>
          </h1>

          {/* 2. Portrait — top anchored below headline line 2, reveal grows downward */}
          <div
            className="absolute left-1/2 z-10 w-[min(46vw,180px)] -translate-x-1/2 min-[810px]:w-[200px]"
            style={{ top: portraitTop ?? "62%" }}
          >
            <div className="relative aspect-[3/4] w-full bg-line">
              <motion.div
                className="absolute inset-x-0 top-0 overflow-hidden"
                style={{ height: clipHeight }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PORTRAIT_URL}
                  alt={CLIENT_NAME}
                  width={800}
                  height={1072}
                  className="h-full w-full object-cover object-top"
                  draggable={false}
                />
              </motion.div>
            </div>
          </div>

          {/* 3 & 4. Bottom row */}
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
      </div>
    </section>
  );
}
