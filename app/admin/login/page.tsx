"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        setError(j.error ?? "Login failed");
        return;
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-[var(--shadow-glow)]"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Admin</p>
        <h1 className="mt-2 text-2xl font-semibold text-main">Sign in</h1>
        <p className="mt-2 text-sm text-muted">JWT session is stored in an httpOnly cookie.</p>
        <form className="mt-8 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="mb-1 block text-xs text-muted" htmlFor="admin-email">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-canvas px-4 py-3 text-sm outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/25"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted" htmlFor="admin-password">
              Password
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-canvas py-3 pl-4 pr-[5.25rem] text-sm outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/25"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted transition hover:bg-white/5 hover:text-main"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-accent py-3 text-sm font-medium text-white shadow-[var(--shadow-glow)] disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Continue"}
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-muted">
          <Link href="/" className="text-accent hover:underline">
            ← Back to site
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
