"use client";

import AdminShell from "@/components/AdminShell";
import { useEffect, useState } from "react";

type About = {
  headline: string;
  bio: string;
  email: string;
  instagram: string;
  youtube: string;
};

const empty: About = { headline: "", bio: "", email: "", instagram: "", youtube: "" };

export default function AdminAboutPage() {
  const [form, setForm] = useState<About>(empty);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/about", { cache: "no-store" });
        const data = (await res.json()) as About;
        if (!cancelled && res.ok) {
          setForm({
            headline: data.headline ?? "",
            bio: data.bio ?? "",
            email: data.email ?? "",
            instagram: data.instagram ?? "",
            youtube: data.youtube ?? "",
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    const res = await fetch("/api/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      setMsg("Could not save");
      return;
    }
    setMsg("Saved");
  }

  return (
    <AdminShell>
      <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-main">About</h1>
          <p className="mt-1 text-sm text-muted">
            Public copy for the about + contact section. Use full URLs for social links.
          </p>
        </div>

        {loading ? (
          <p className="text-sm text-muted">Loading…</p>
        ) : (
          <form
            onSubmit={save}
            className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6"
          >
            <div>
              <label className="text-xs text-muted">Headline</label>
              <input
                className="mt-1 w-full rounded-xl border border-white/10 bg-canvas px-3 py-2 text-sm"
                value={form.headline}
                onChange={(e) => setForm({ ...form, headline: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs text-muted">Bio</label>
              <textarea
                className="mt-1 w-full resize-none rounded-xl border border-white/10 bg-canvas px-3 py-2 text-sm"
                rows={6}
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs text-muted">Public email</label>
              <input
                type="email"
                className="mt-1 w-full rounded-xl border border-white/10 bg-canvas px-3 py-2 text-sm"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs text-muted">Instagram URL</label>
              <input
                className="mt-1 w-full rounded-xl border border-white/10 bg-canvas px-3 py-2 text-sm"
                value={form.instagram}
                onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label className="text-xs text-muted">YouTube URL</label>
              <input
                className="mt-1 w-full rounded-xl border border-white/10 bg-canvas px-3 py-2 text-sm"
                value={form.youtube}
                onChange={(e) => setForm({ ...form, youtube: e.target.value })}
                placeholder="https://youtube.com/..."
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-accent px-6 py-2 text-sm font-medium text-white"
            >
              Save about page
            </button>
            {msg ? <p className="text-sm text-muted">{msg}</p> : null}
          </form>
        )}
      </div>
    </AdminShell>
  );
}
