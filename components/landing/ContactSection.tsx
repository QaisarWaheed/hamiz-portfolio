"use client";

import SectionReveal from "@/components/landing/SectionReveal";
import { SOCIAL_LINKS } from "@/components/landing/landing-content";
import { APPEAR_STAGGER } from "@/lib/appear-motion";
import { useEffect, useRef, useState } from "react";

/** Ref: wrap radius 12 + horizontal pad 12; input border 0 / radius 0.
 *  Focus: quiet paper border on wrap via :has(:focus-visible) (a11y; ref has none). */
const INPUT_WRAP =
  "flex h-11 items-center rounded-[12px] border border-transparent px-3 transition-colors has-[:focus-visible]:border-paper/25 has-[:focus-visible]:bg-paper/[0.04]";
const INPUT_CLASS =
  "h-full w-full border-0 bg-transparent text-base font-normal text-paper placeholder:text-paper/50 focus-visible:outline-none";

/** Ref: wrap radius 12; textarea pad 12, border 0, height 140. */
const TEXTAREA_WRAP =
  "rounded-[12px] border border-transparent transition-colors has-[:focus-visible]:border-paper/25 has-[:focus-visible]:bg-paper/[0.04]";
const TEXTAREA_CLASS =
  "h-[140px] w-full resize-y border-0 bg-transparent p-3 text-base font-normal text-paper placeholder:text-paper/50 focus-visible:outline-none";

const LABEL_CLASS = "mb-2 block text-base font-normal text-paper";

type Status = "idle" | "sending" | "success" | "error";

function SocialIcon({ label }: { label: string }) {
  const common = "h-5 w-5 fill-current";
  switch (label) {
    case "X":
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path d="M4.98 3.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM3.5 9h3v12h-3V9zm7 0h2.88v1.64h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6V21h-3v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.26V21h-3V9z" />
        </svg>
      );
    default:
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.75 15.5v-7l6 3.5-6 3.5z" />
        </svg>
      );
  }
}

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
    status === "sending"
      ? "Sending…"
      : status === "success"
        ? "Sent!"
        : "Send message";

  return (
    <section id="contact" className="text-ink">
      <div className="section-container contact-section-padding">
        <div className="flex flex-col gap-10 min-[810px]:flex-row min-[810px]:gap-10">
          <SectionReveal className="min-[810px]:w-[640px] min-[810px]:shrink-0">
            <h2 className="section-heading min-[810px]:text-[76px]">Let&apos;s work together</h2>
            <p className="mt-4 max-w-xl text-lg font-normal leading-[25.2px] tracking-[-0.04em]">
              Have a project in mind? Fill out the form and I&apos;ll get back to you.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-black/10 text-ink transition-opacity hover:opacity-80"
                >
                  <SocialIcon label={link.label} />
                </a>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={APPEAR_STAGGER} className="min-[810px]:w-[500px] min-[810px]:shrink-0">
            <form
              className="flex w-full max-w-[500px] flex-col gap-5 rounded-2xl bg-[#111] p-4 text-paper"
              onSubmit={(e) => void onSubmit(e)}
              noValidate
            >
              <div>
                <label htmlFor="contact-name" className={LABEL_CLASS}>
                  Your name
                </label>
                <div className={INPUT_WRAP}>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                    className={INPUT_CLASS}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-email" className={LABEL_CLASS}>
                  Email address
                </label>
                <div className={INPUT_WRAP}>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="Email address"
                    required
                    className={INPUT_CLASS}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-requirements" className={LABEL_CLASS}>
                  Project requirements
                </label>
                <div className={TEXTAREA_WRAP}>
                  <textarea
                    id="contact-requirements"
                    name="requirements"
                    placeholder="Project requirements"
                    required
                    className={TEXTAREA_CLASS}
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-references" className={LABEL_CLASS}>
                  References / links (optional)
                </label>
                <div className={INPUT_WRAP}>
                  <input
                    id="contact-references"
                    type="text"
                    name="references"
                    placeholder="References / links (optional)"
                    className={INPUT_CLASS}
                    value={references}
                    onChange={(e) => setReferences(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-paper text-xs font-normal tracking-normal text-ink transition-opacity hover:opacity-90 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
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
      </div>
    </section>
  );
}
