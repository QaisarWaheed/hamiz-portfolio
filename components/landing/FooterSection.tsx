"use client";

import SectionReveal from "@/components/landing/SectionReveal";
import {
  CONTACT_EMAIL,
  FOOTER_HEADLINE_LINES,
  FOOTER_QUICK_LINKS,
  FOOTER_WORDMARK,
} from "@/components/landing/landing-content";
import { APPEAR_STAGGER } from "@/lib/appear-motion";

export default function FooterSection() {
  return (
    <footer className="overflow-hidden bg-[#111] pt-20 text-paper min-[810px]:pt-[120px]">
      <div className="section-container">
        <div className="grid gap-[50px] min-[810px]:grid-cols-[1.2fr_1fr_1fr]">
          <SectionReveal>
            <h2 className="text-[48px] font-semibold leading-none tracking-[-0.02em] min-[810px]:text-[68px]">
              {FOOTER_HEADLINE_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </SectionReveal>

          <SectionReveal delay={APPEAR_STAGGER}>
            <p className="mb-5 text-base font-normal text-paper/70">/Quick links</p>
            <ul className="flex flex-row flex-wrap gap-2">
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex h-[35px] items-center rounded-lg bg-paper px-3 text-xs font-normal text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </SectionReveal>

          <SectionReveal delay={APPEAR_STAGGER * 2}>
            <p className="mb-5 text-base font-normal text-paper/70">/Contact</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-lg font-normal leading-[25.2px] text-paper underline-offset-4 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </SectionReveal>
        </div>

        <p
          className="pointer-events-none mt-20 -mb-[100px] select-none text-[417px] font-bold uppercase leading-none tracking-[-0.02em] text-paper/10 min-[810px]:mt-[110px]"
        >
          {FOOTER_WORDMARK}
        </p>
      </div>
    </footer>
  );
}
