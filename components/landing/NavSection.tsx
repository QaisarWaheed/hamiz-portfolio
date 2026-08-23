"use client";

import { CLIENT_NAME } from "@/components/landing/landing-content";
import { useEffect, useId, useRef, useState } from "react";

export default function NavSection() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function closeMenu() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <>
      <header
        className="fixed left-1/2 z-10 flex w-[calc(100%-48px)] max-w-[320px] -translate-x-1/2 items-center justify-between rounded-[18px] bg-[#111] px-4 py-3 text-[18px] font-bold text-white max-[809px]:top-[18px] min-[810px]:top-[30px]"
        style={{ width: "min(320px, calc(100% - 48px))" }}
      >
        <span className="truncate">{CLIENT_NAME}</span>
        <button
          ref={triggerRef}
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
          className="rounded-[10px] bg-paper px-3 py-[7px] text-lg leading-none text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]"
        >
          ⋯
        </button>
      </header>

      {open ? (
        <nav
          id={menuId}
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
                  className="block rounded-[10px] px-3 py-2 text-sm font-medium text-ink hover:bg-line/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                  onClick={closeMenu}
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
