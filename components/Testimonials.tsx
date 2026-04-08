"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export type TestimonialItem = {
  _id: string;
  name: string;
  role: string;
  message: string;
};

export default function Testimonials() {
  const [items, setItems] = useState<TestimonialItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/testimonials", { cache: "no-store" });
        if (!res.ok) throw new Error("Could not load testimonials");
        const data = (await res.json()) as TestimonialItem[];
        if (!cancelled) setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!items?.length) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 6000);
    return () => clearInterval(id);
  }, [items]);

  const current = items && items.length ? items[index] : null;

  return (
    <section id="testimonials" className="scroll-mt-24 border-y border-white/5 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Testimonials</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-main md:text-4xl">
            What clients say
          </h2>
        </motion.div>

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        )}

        {items === null && !error && (
          <div className="h-48 animate-pulse rounded-2xl bg-white/5" />
        )}

        {items && items.length === 0 && (
          <p className="text-sm text-muted">Testimonials will appear here once added.</p>
        )}

        {current && (
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-8 md:p-12 shadow-[var(--shadow-glow)]">
            <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={current._id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35 }}
                className="relative"
              >
                <p className="text-lg leading-relaxed text-main md:text-xl">
                  “{current.message}”
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-accent/25 ring-2 ring-accent/40" />
                  <div>
                    <p className="font-medium text-main">{current.name}</p>
                    <p className="text-sm text-muted">{current.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {items && items.length > 1 && (
              <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2">
                  {items.map((t, i) => (
                    <button
                      key={t._id}
                      type="button"
                      aria-label={`Show testimonial ${i + 1}`}
                      onClick={() => setIndex(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === index ? "w-8 bg-accent" : "w-2 bg-white/20 hover:bg-white/35"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
                    className="rounded-xl border border-white/10 px-4 py-2 text-xs text-muted hover:border-accent/40 hover:text-main"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={() => setIndex((i) => (i + 1) % items.length)}
                    className="rounded-xl border border-white/10 px-4 py-2 text-xs text-muted hover:border-accent/40 hover:text-main"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
