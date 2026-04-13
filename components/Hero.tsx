"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import InteractiveWebBackground, {
  type PointerNorm,
} from "@/components/InteractiveWebBackground";

const VIDEO =
  process.env.NEXT_PUBLIC_HERO_VIDEO_URL ||
  "https://assets.mixkit.co/videos/preview/mixkit-set-of-plane-spotlights-moving-in-the-dark-background-5566-large.mp4";

const easeOut = [0.22, 1, 0.36, 1] as const;

function TimecodeAccent({ className }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none select-none font-mono text-[10px] tracking-[0.35em] text-accent/40 md:text-[11px] ${className ?? ""}`}
      aria-hidden
    >
      01:00:00:00
    </div>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const reduce = reduceMotion === true;
  const pointerRef = useRef<PointerNorm>({ nx: 0.5, ny: 0.5 });

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        pointerRef.current = {
          nx: (e.clientX - r.left) / r.width,
          ny: (e.clientY - r.top) / r.height,
        };
      }}
      onPointerLeave={() => {
        pointerRef.current = { nx: 0.5, ny: 0.5 };
      }}
    >
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover opacity-60"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster=""
          aria-hidden
        >
          <source src={VIDEO} type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 bg-gradient-to-b from-canvas via-canvas/80 to-canvas"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-canvas/90 via-transparent to-canvas/90"
          aria-hidden
        />
      </div>

      {!reduce && <InteractiveWebBackground pointerRef={pointerRef} />}

      {/* Floating panels: CSS bob only (blur + transform = jank); solid glass stack */}
      <div
        className={`pointer-events-none absolute left-[4%] top-[22%] hidden md:block lg:left-[8%] ${!reduce ? "animate-hero-bob-slow" : ""}`}
      >
        <motion.div
          className="rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.75)]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 0.9, x: 0 }}
          transition={{ duration: 0.75, ease: easeOut }}
          aria-hidden
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted">Offline</p>
          <p className="mt-1 text-sm font-medium text-main">Rough cut v3</p>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-2/3 rounded-full bg-accent/80" />
          </div>
        </motion.div>
      </div>

      <div
        className={`pointer-events-none absolute bottom-[26%] right-[4%] hidden md:block lg:right-[7%] ${!reduce ? "animate-hero-bob-alt" : ""}`}
      >
        <motion.div
          className="rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.75)]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.88, x: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.06 }}
          aria-hidden
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted">Colour</p>
          <p className="mt-1 text-sm font-medium text-main">Grade pass</p>
          <div className="mt-2 flex gap-1">
            {["", "", "", ""].map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-sm ${i < 3 ? "bg-accent/70" : "bg-white/15"}`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <TimecodeAccent className="absolute left-6 top-28 md:left-10 md:top-32" />
      <TimecodeAccent className="absolute bottom-32 right-6 md:bottom-36 md:right-10" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 pt-24 text-center sm:px-6">
        <div className={!reduce ? "animate-hero-bob" : undefined}>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.7, ease: easeOut }}
            className="mb-4 text-xs uppercase tracking-[0.35em] text-muted"
          >
            Video editor &amp; storyteller
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.9, ease: easeOut }}
            className="text-balance text-4xl font-semibold leading-tight tracking-tight text-main sm:text-5xl md:text-6xl"
          >
            I Turn Raw Footage Into{" "}
            <span className="bg-gradient-to-r from-accent to-sky-300 bg-clip-text text-transparent">
              Cinematic Stories
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.75, ease: easeOut }}
            className="mx-auto mt-6 max-w-xl text-pretty text-muted sm:text-lg"
          >
            Commercials, music films, and branded content—cut with rhythm, texture,
            and intent.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.75, ease: easeOut }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#work"
            className="rounded-xl bg-accent px-8 py-3 text-sm font-medium text-white shadow-[var(--shadow-glow)] transition duration-300 ease-out will-change-transform hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:brightness-100"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="rounded-xl border border-white/15 bg-white/5 px-8 py-3 text-sm font-medium text-main transition duration-300 ease-out will-change-transform hover:-translate-y-0.5 hover:border-accent/40 hover:bg-white/10 active:translate-y-0"
          >
            Get a Quote
          </a>
        </motion.div>
      </div>
    </section>
  );
}
