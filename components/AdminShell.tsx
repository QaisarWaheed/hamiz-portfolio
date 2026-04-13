"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const nav = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/pricing", label: "Pricing" },
  { href: "/admin/about", label: "About" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-canvas text-main">
      <div className="border-b border-white/10 bg-canvas/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/admin/dashboard" className="text-sm font-semibold tracking-wide">
            Hamiz — CMS
          </Link>
          <nav className="flex flex-wrap gap-2">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                  pathname === n.href
                    ? "bg-accent/20 text-accent"
                    : "text-muted hover:bg-white/5 hover:text-main"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-xs text-muted underline-offset-4 hover:text-main hover:underline"
            >
              View site
            </Link>
            <button
              type="button"
              onClick={() => void logout()}
              className="rounded-lg border border-white/10 px-3 py-2 text-xs text-muted hover:border-red-400/40 hover:text-red-300"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">{children}</div>
    </div>
  );
}
