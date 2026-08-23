"use client";

import {
  CLIENT_NAME,
  CONTACT_EMAIL,
  FOOTER_HEADLINE_LINES,
  FOOTER_QUICK_LINKS,
} from "@/components/landing/landing-content";

export default function FooterSection() {
  return (
    <footer className="overflow-hidden bg-dark pt-[90px] text-paper">
      <div className="section-container">
        <div className="grid gap-[50px] min-[810px]:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <h2
              className="text-[52px] font-semibold leading-[0.95] tracking-[-0.08em] min-[810px]:text-[62px]"
              style={{ letterSpacing: "-0.08em" }}
            >
              {FOOTER_HEADLINE_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>

          <div>
            <p className="mb-5 text-sm font-medium text-paper/70">/Quick links</p>
            <ul className="flex flex-col gap-3">
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex rounded-lg bg-paper px-4 py-[10px] text-sm font-medium text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-sm font-medium text-paper/70">/Contact</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-lg font-medium text-paper underline-offset-4 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <p
          className="pointer-events-none mt-20 select-none font-bold uppercase leading-[0.65] text-[#242424] min-[810px]:mt-[110px] min-[810px]:-mb-[440px]"
          style={{
            fontSize: "27vw",
            letterSpacing: "-0.11em",
          }}
        >
          {CLIENT_NAME}
        </p>
      </div>
    </footer>
  );
}
