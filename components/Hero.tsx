"use client";

import { motion } from "framer-motion";

const VIDEO =
  process.env.NEXT_PUBLIC_HERO_VIDEO_URL ||
  "https://assets.mixkit.co/videos/preview/mixkit-set-of-plane-spotlights-moving-in-the-dark-background-5566-large.mp4";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
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

      <div className="relative z-10 mx-auto max-w-4xl px-4 pt-24 text-center sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="mb-4 text-xs uppercase tracking-[0.35em] text-muted"
        >
          Video editor &amp; storyteller
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance text-4xl font-semibold leading-tight tracking-tight text-main sm:text-5xl md:text-6xl"
        >
          I Turn Raw Footage Into{" "}
          <span className="bg-gradient-to-r from-accent to-sky-300 bg-clip-text text-transparent">
            Cinematic Stories
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mx-auto mt-6 max-w-xl text-pretty text-muted sm:text-lg"
        >
          Commercials, music films, and branded content—cut with rhythm, texture,
          and intent.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#work"
            className="rounded-xl bg-accent px-8 py-3 text-sm font-medium text-white shadow-[var(--shadow-glow)] transition hover:brightness-110"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="rounded-xl border border-white/15 bg-white/5 px-8 py-3 text-sm font-medium text-main backdrop-blur transition hover:border-accent/40 hover:bg-white/10"
          >
            Get a Quote
          </a>
        </motion.div>
      </div>
    </section>
  );
}
