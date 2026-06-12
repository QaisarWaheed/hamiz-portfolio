"use client";

import FadeIn from "@/components/landing/FadeIn";
import { useEffect, useRef, useState } from "react";

const GRADIENT =
  "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)";
const SHADOW =
  "0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1";

const FIELD_CLASS =
  "w-full rounded-2xl border border-white/15 bg-transparent px-6 py-4 text-base font-light text-[#D7E2EA] transition-colors placeholder:tracking-wide placeholder:text-[#D7E2EA]/30 placeholder:uppercase focus:border-white/40 focus:outline-none";

type Status = "idle" | "sending" | "success" | "error";

export default function NewContact() {
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
    status === "sending" ? "Sending…" : status === "success" ? "Sent!" : "Send Message";

  return (
    <section
      id="contact"
      className="bg-[#0C0C0C] px-5 py-24 sm:px-8 sm:py-32 md:px-10"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-12 sm:gap-16">
        <FadeIn y={40}>
          <h2
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 10vw, 120px)" }}
          >
            Let&apos;s Work Together
          </h2>
        </FadeIn>

        <p
          className="text-center font-light uppercase tracking-wide text-[#D7E2EA] opacity-60"
          style={{ fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)" }}
        >
          Have a project in mind? Fill out the form and I&apos;ll get back to you.
        </p>

        <FadeIn delay={0.2} y={30} className="w-full max-w-2xl">
          <form className="flex w-full flex-col gap-5" onSubmit={(e) => void onSubmit(e)}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className={FIELD_CLASS}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className={FIELD_CLASS}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <textarea
              name="requirements"
              placeholder="Project Requirements"
              rows={4}
              required
              className={`${FIELD_CLASS} resize-none`}
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
            />
            <input
              type="text"
              name="references"
              placeholder="References / Links (optional)"
              className={FIELD_CLASS}
              value={references}
              onChange={(e) => setReferences(e.target.value)}
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base disabled:opacity-60"
              style={{
                background: GRADIENT,
                boxShadow: SHADOW,
                outline: "2px solid white",
                outlineOffset: "-3px",
              }}
            >
              {buttonLabel}
            </button>
            {status === "success" ? (
              <p className="text-center text-sm text-[#D7E2EA]/60">
                Message sent! I&apos;ll be in touch soon.
              </p>
            ) : null}
            {status === "error" ? (
              <p className="text-center text-sm text-red-400">
                Something went wrong. Please try again.
              </p>
            ) : null}
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
