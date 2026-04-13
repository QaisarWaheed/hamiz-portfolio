"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function parseEnvInt(raw: string | undefined): number | null {
  if (!raw?.trim()) return null;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

const ENV_CLIENTS_TARGET = parseEnvInt(process.env.NEXT_PUBLIC_STATS_CLIENTS_TARGET);
const ENV_PROJECTS_TARGET = parseEnvInt(process.env.NEXT_PUBLIC_STATS_PROJECTS_TARGET);

/** Added to API/env base so headline stats read higher (e.g. lifetime clients vs listed). */
const CLIENTS_DISPLAY_BOOST = 100;
const PROJECTS_DISPLAY_BOOST = 200;

function useCountUp(target: number | null, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || target === null) {
      if (!active) setValue(0);
      return;
    }

    setValue(0);
    const duration = Math.min(2600, Math.max(1400, 700 + target * 28));
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setValue(Math.round(easeOutCubic(t) * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active]);

  return value;
}

export default function ClientStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.35 });

  const [clientTarget, setClientTarget] = useState<number | null>(null);
  const [projectTarget, setProjectTarget] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [prRes, teRes] = await Promise.all([
          fetch("/api/projects", { cache: "no-store" }),
          fetch("/api/testimonials", { cache: "no-store" }),
        ]);
        const projectsJson = prRes.ok ? ((await prRes.json()) as unknown[]) : [];
        const testimonialsJson = teRes.ok ? ((await teRes.json()) as unknown[]) : [];
        if (cancelled) return;
        const pCount = Array.isArray(projectsJson) ? projectsJson.length : 0;
        const cCount = Array.isArray(testimonialsJson) ? testimonialsJson.length : 0;
        setClientTarget(
          ENV_CLIENTS_TARGET !== null ? ENV_CLIENTS_TARGET : cCount + CLIENTS_DISPLAY_BOOST
        );
        setProjectTarget(
          ENV_PROJECTS_TARGET !== null ? ENV_PROJECTS_TARGET : pCount + PROJECTS_DISPLAY_BOOST
        );
      } catch {
        if (!cancelled) {
          setClientTarget(
            ENV_CLIENTS_TARGET !== null ? ENV_CLIENTS_TARGET : 0 + CLIENTS_DISPLAY_BOOST
          );
          setProjectTarget(
            ENV_PROJECTS_TARGET !== null ? ENV_PROJECTS_TARGET : 0 + PROJECTS_DISPLAY_BOOST
          );
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const ready = clientTarget !== null && projectTarget !== null;
  const run = inView && ready;

  const clients = useCountUp(clientTarget, run);
  const projects = useCountUp(projectTarget, run);

  const items = [
    { label: "Total clients", value: clients, suffix: "+" },
    { label: "Projects", value: projects, suffix: "+" },
  ] as const;

  return (
    <section
      ref={sectionRef}
      className="scroll-mt-24 border-t border-white/5 bg-white/[0.02] py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-muted">By the numbers</p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-transparent px-8 py-10 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
            >
              <p className="font-mono text-4xl font-semibold tracking-tight text-main tabular-nums md:text-5xl">
                {item.value}
                <span className="text-accent">{item.suffix}</span>
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.28em] text-muted">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
