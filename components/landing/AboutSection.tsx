"use client";

import SectionReveal from "@/components/landing/SectionReveal";
import { BIO } from "@/components/landing/landing-content";

export default function AboutSection() {
  return (
    <section id="about" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.22em] text-muted">About</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Documentary pacing, technical clarity.
          </h2>
        </SectionReveal>
        <SectionReveal delay={0.1} className="mt-10 max-w-3xl">
          <p className="text-base leading-relaxed text-muted sm:text-lg">{BIO}</p>
        </SectionReveal>
      </div>
    </section>
  );
}
