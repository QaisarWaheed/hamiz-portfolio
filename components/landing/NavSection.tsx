"use client";

import { CLIENT_NAME } from "@/components/landing/landing-content";
import { useState } from "react";

export default function NavSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className="fixed left-1/2 z-10 flex w-[calc(100%-48px)] max-w-[320px] -translate-x-1/2 items-center justify-between rounded-[18px] bg-[#111] px-4 py-3 text-[18px] font-bold text-white max-[809px]:top-[18px] min-[810px]:top-[30px]"
        style={{ width: "min(320px, calc(100% - 48px))" }}
      >
        <span className="truncate">{CLIENT_NAME}</span>
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-[10px] bg-paper px-3 py-[7px] text-lg leading-none text-ink"
        >
          ⋯
        </button>
      </header>

      {open ? (
        <nav
          className="fixed left-1/2 z-20 w-[calc(100%-48px)] max-w-[320px] -translate-x-1/2 rounded-[18px] border border-line bg-paper p-3 shadow-lg max-[809px]:top-[calc(18px+56px)] min-[810px]:top-[calc(30px+56px)]"
          aria-label="Site menu"
        >
          <ul className="flex flex-col gap-1">
            {[
              { href: "#about", label: "About" },
              { href: "#work", label: "Work" },
              { href: "#services", label: "Services" },
              { href: "#testimonials", label: "Testimonials" },
              { href: "#contact", label: "Contact" },
            ].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-[10px] px-3 py-2 text-sm font-medium text-ink hover:bg-line/60"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </>
  );
}
