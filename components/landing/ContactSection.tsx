"use client";

import SectionReveal from "@/components/landing/SectionReveal";
import { useEffect, useRef, useState } from "react";

const FIELD_CLASS =
  "w-full border border-line/40 bg-transparent px-4 py-3 text-base text-paper placeholder:text-paper/40 focus-visible:border-paper/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/80 focus-visible:ring-offset-2 focus-visible:ring-offset-dark";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [requirements, setRequirements] = useState("");
  const [references, setReferences] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, requirements, references }),
      });
      if (!res.ok) throw new Error("fail");
      setName("");
      setEmail("");
      setRequirements("");
      setReferences("");
      setStatus("success");
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
    }
  }

  const buttonLabel =
    status === "sending" ? "Sending…" : status === "success" ? "Sent!" : "Send message";

  return (
    <section id="contact" className="bg-dark text-paper">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.22em] text-paper/50">Contact</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
            Let&apos;s work together
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-paper/60">
            Have a project in mind? Fill out the form and I&apos;ll get back to you.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1} className="mt-12 max-w-xl">
          <form className="flex flex-col gap-4" onSubmit={(e) => void onSubmit(e)} noValidate>
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block text-sm text-paper/80">
                Your name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="Your name"
                required
                className={FIELD_CLASS}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-1.5 block text-sm text-paper/80">
                Email address
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="Email address"
                required
                className={FIELD_CLASS}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="contact-requirements" className="mb-1.5 block text-sm text-paper/80">
                Project requirements
              </label>
              <textarea
                id="contact-requirements"
                name="requirements"
                placeholder="Project requirements"
                rows={4}
                required
                className={`${FIELD_CLASS} resize-none`}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="contact-references" className="mb-1.5 block text-sm text-paper/80">
                References / links (optional)
              </label>
              <input
                id="contact-references"
                type="text"
                name="references"
                placeholder="References / links (optional)"
                className={FIELD_CLASS}
                value={references}
                onChange={(e) => setReferences(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-2 inline-flex w-full items-center justify-center bg-paper px-6 py-3 text-xs uppercase tracking-[0.18em] text-ink transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {buttonLabel}
            </button>
            <div aria-live="polite" aria-atomic="true" className="min-h-[1.25rem]">
              {status === "success" ? (
                <p className="text-sm text-paper/60">
                  Message sent! I&apos;ll be in touch soon.
                </p>
              ) : null}
              {status === "error" ? (
                <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
              ) : null}
            </div>
          </form>
        </SectionReveal>
      </div>
    </section>
  );
}
