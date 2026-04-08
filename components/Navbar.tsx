"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const links = [
  { href: "#work", label: "Work" },
  { href: "#testimonials", label: "Stories" },
  { href: "#about", label: "About" },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-canvas/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.2em] text-main"
        >
          Hamiz Khan
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-xs font-medium text-accent shadow-[var(--shadow-glow)] transition hover:bg-accent/20"
          >
            Let&apos;s talk
          </a>
          <Link
            href="/admin/login"
            className="text-xs text-muted underline-offset-4 hover:text-main hover:underline"
          >
            Admin
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
