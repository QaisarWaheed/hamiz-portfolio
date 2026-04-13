"use client";

import AdminShell from "@/components/AdminShell";
import type { PricingRow } from "@/components/landing/LandingPricing";
import { useCallback, useEffect, useState } from "react";

export default function AdminPricingPage() {
  const [rows, setRows] = useState<PricingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/pricing", { cache: "no-store" });
      const data = (await res.json()) as PricingRow[];
      setRows(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function save() {
    setMsg(null);
    try {
      const res = await fetch("/api/pricing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tiers: rows.map((t, i) => ({
            order: t.order ?? i,
            name: t.name,
            who: t.who,
            priceAmt: t.priceAmt,
            priceUnit: t.priceUnit,
            featured: t.featured,
            badge: t.badge,
            features: t.features,
            bookLabel: t.bookLabel,
          })),
        }),
      });
      if (!res.ok) throw new Error("Save failed");
      const data = (await res.json()) as PricingRow[];
      setRows(Array.isArray(data) ? data : []);
      setMsg("Saved");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Save failed");
    }
  }

  function update(i: number, patch: Partial<PricingRow>) {
    setRows((prev) => prev.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  }

  function updateFeature(i: number, line: number, value: string) {
    setRows((prev) =>
      prev.map((r, j) => {
        if (j !== i) return r;
        const next = [...r.features];
        next[line] = value;
        return { ...r, features: next };
      })
    );
  }

  function addFeature(i: number) {
    setRows((prev) =>
      prev.map((r, j) => (j === i ? { ...r, features: [...r.features, "New item"] } : r))
    );
  }

  function removeFeature(i: number, line: number) {
    setRows((prev) =>
      prev.map((r, j) =>
        j === i ? { ...r, features: r.features.filter((_, k) => k !== line) } : r
      )
    );
  }

  return (
    <AdminShell>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-main">Pricing</h1>
          <p className="mt-1 max-w-xl text-sm text-muted">
            Three tiers on the homepage. Toggle “Featured” for the highlighted column; badge shows
            when set (e.g. Most Hired).
          </p>
        </div>

        {loading ? (
          <p className="text-sm text-muted">Loading…</p>
        ) : (
          <div className="space-y-10">
            {rows.map((t, i) => (
              <div
                key={t._id}
                className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-xs text-muted">Name</label>
                    <input
                      value={t.name}
                      onChange={(e) => update(i, { name: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-white/10 bg-canvas px-3 py-2 text-sm text-main"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted">Subtitle (who)</label>
                    <input
                      value={t.who}
                      onChange={(e) => update(i, { who: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-white/10 bg-canvas px-3 py-2 text-sm text-main"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted">Price amount (e.g. [SAMPLE])</label>
                    <input
                      value={t.priceAmt}
                      onChange={(e) => update(i, { priceAmt: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-white/10 bg-canvas px-3 py-2 text-sm text-main"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted">Price unit line</label>
                    <input
                      value={t.priceUnit}
                      onChange={(e) => update(i, { priceUnit: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-white/10 bg-canvas px-3 py-2 text-sm text-main"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted">Book button label</label>
                    <input
                      value={t.bookLabel}
                      onChange={(e) => update(i, { bookLabel: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-white/10 bg-canvas px-3 py-2 text-sm text-main"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted">Order</label>
                    <input
                      type="number"
                      value={t.order}
                      onChange={(e) => update(i, { order: Number(e.target.value) || 0 })}
                      className="mt-1 w-full rounded-lg border border-white/10 bg-canvas px-3 py-2 text-sm text-main"
                    />
                  </div>
                  <div className="flex items-center gap-2 md:col-span-2">
                    <input
                      id={`f-${i}`}
                      type="checkbox"
                      checked={t.featured}
                      onChange={(e) => update(i, { featured: e.target.checked })}
                    />
                    <label htmlFor={`f-${i}`} className="text-sm text-main">
                      Featured tier
                    </label>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs text-muted">Badge (optional, e.g. Most Hired)</label>
                    <input
                      value={t.badge}
                      onChange={(e) => update(i, { badge: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-white/10 bg-canvas px-3 py-2 text-sm text-main"
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-muted">Features (one per row)</span>
                    <button
                      type="button"
                      onClick={() => addFeature(i)}
                      className="text-xs text-accent hover:underline"
                    >
                      + Add line
                    </button>
                  </div>
                  <div className="space-y-2">
                    {t.features.map((line, li) => (
                      <div key={li} className="flex gap-2">
                        <input
                          value={line}
                          onChange={(e) => updateFeature(i, li, e.target.value)}
                          className="min-w-0 flex-1 rounded-lg border border-white/10 bg-canvas px-3 py-2 text-sm text-main"
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(i, li)}
                          className="shrink-0 rounded-lg border border-white/10 px-2 py-1 text-xs text-muted hover:border-red-400/40"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => void save()}
            className="rounded-xl bg-accent px-6 py-2 text-sm font-medium text-white hover:brightness-110"
          >
            Save all pricing
          </button>
          {msg && <p className="text-sm text-muted">{msg}</p>}
        </div>
      </div>
    </AdminShell>
  );
}
