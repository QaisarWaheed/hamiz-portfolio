"use client";

import AdminShell from "@/components/AdminShell";
import type { ServiceRow } from "@/components/landing/LandingServices";
import { useCallback, useEffect, useState } from "react";

export default function AdminServicesPage() {
  const [rows, setRows] = useState<ServiceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services", { cache: "no-store" });
      const data = (await res.json()) as ServiceRow[];
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
      const res = await fetch("/api/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          services: rows.map((r, i) => ({
            order: r.order ?? i,
            num: r.num,
            title: r.title,
            description: r.description,
          })),
        }),
      });
      if (!res.ok) throw new Error("Save failed");
      const data = (await res.json()) as ServiceRow[];
      setRows(Array.isArray(data) ? data : []);
      setMsg("Saved");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Save failed");
    }
  }

  function update(i: number, patch: Partial<ServiceRow>) {
    setRows((prev) => prev.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  }

  return (
    <AdminShell>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-main">Services</h1>
          <p className="mt-1 max-w-xl text-sm text-muted">
            These render on the homepage “Services” section (three rows). Save publishes to the
            live site.
          </p>
        </div>

        {loading ? (
          <p className="text-sm text-muted">Loading…</p>
        ) : (
          <div className="space-y-8">
            {rows.map((r, i) => (
              <div
                key={r._id}
                className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:grid-cols-2"
              >
                <div className="space-y-3">
                  <label className="block text-xs text-muted">Number</label>
                  <input
                    value={r.num}
                    onChange={(e) => update(i, { num: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-canvas px-3 py-2 text-sm text-main"
                  />
                  <label className="block text-xs text-muted">Title</label>
                  <input
                    value={r.title}
                    onChange={(e) => update(i, { title: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-canvas px-3 py-2 text-sm text-main"
                  />
                  <label className="block text-xs text-muted">Order</label>
                  <input
                    type="number"
                    value={r.order}
                    onChange={(e) => update(i, { order: Number(e.target.value) || 0 })}
                    className="w-full rounded-lg border border-white/10 bg-canvas px-3 py-2 text-sm text-main"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted">Description</label>
                  <textarea
                    value={r.description}
                    onChange={(e) => update(i, { description: e.target.value })}
                    rows={10}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-canvas px-3 py-2 text-sm text-main"
                  />
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
            Save all services
          </button>
          {msg && <p className="text-sm text-muted">{msg}</p>}
        </div>
      </div>
    </AdminShell>
  );
}
