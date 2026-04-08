"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type About = {
  headline: string;
  bio: string;
  email: string;
  instagram: string;
  youtube: string;
};

export default function AboutContact() {
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formState, setFormState] = useState<"idle" | "sending" | "ok" | "err">("idle");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/about", { cache: "no-store" });
        const data = (await res.json()) as About;
        if (!cancelled && res.ok) setAbout(data);
      } catch {
        if (!cancelled) setAbout(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("fail");
      setFormState("ok");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setFormState("err");
    }
  }

  return (
    <section id="about" className="scroll-mt-24 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-2 sm:px-6">
        <motion.div
          id="contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="scroll-mt-24 space-y-6"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted">About</p>
          {loading ? (
            <div className="h-40 animate-pulse rounded-2xl bg-white/5" />
          ) : (
            <>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-main md:text-4xl">
                {about?.headline ?? "Hamiz Khan"}
              </h2>
              <p className="text-muted leading-relaxed whitespace-pre-line">
                {about?.bio ??
                  "Video editor focused on cinematic rhythm and story-first pacing."}
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                {about?.email ? (
                  <a
                    href={`mailto:${about.email}`}
                    className="rounded-full border border-white/10 px-4 py-2 text-main transition hover:border-accent/40"
                  >
                    {about.email}
                  </a>
                ) : null}
                {about?.instagram ? (
                  <a
                    href={about.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/10 px-4 py-2 text-muted transition hover:border-accent/40 hover:text-main"
                  >
                    Instagram
                  </a>
                ) : null}
                {about?.youtube ? (
                  <a
                    href={about.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/10 px-4 py-2 text-muted transition hover:border-accent/40 hover:text-main"
                  >
                    YouTube
                  </a>
                ) : null}
              </div>
            </>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[var(--shadow-glow)] md:p-8"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Contact</p>
          <h3 className="mt-3 text-xl font-semibold text-main">Start a project</h3>
          <p className="mt-2 text-sm text-muted">
            Share a short brief—timeline, references, and where the film will live.
          </p>
          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="sr-only" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-canvas/80 px-4 py-3 text-sm text-main outline-none ring-accent/0 transition focus:border-accent/40 focus:ring-2 focus:ring-accent/30"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-canvas/80 px-4 py-3 text-sm text-main outline-none transition focus:border-accent/40 focus:ring-2 focus:ring-accent/30"
                placeholder="Email"
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="w-full resize-none rounded-xl border border-white/10 bg-canvas/80 px-4 py-3 text-sm text-main outline-none transition focus:border-accent/40 focus:ring-2 focus:ring-accent/30"
                placeholder="Tell me about your project"
              />
            </div>
            <button
              type="submit"
              disabled={formState === "sending"}
              className="w-full rounded-xl bg-accent py-3 text-sm font-medium text-white shadow-[var(--shadow-glow)] transition hover:brightness-110 disabled:opacity-60"
            >
              {formState === "sending" ? "Sending…" : "Send message"}
            </button>
            {formState === "ok" && (
              <p className="text-sm text-emerald-400">
                Thanks—I will get back to you shortly.
              </p>
            )}
            {formState === "err" && (
              <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
