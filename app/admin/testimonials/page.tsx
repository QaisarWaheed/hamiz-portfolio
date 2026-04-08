"use client";

import AdminShell from "@/components/AdminShell";
import type { TestimonialItem } from "@/components/Testimonials";
import { useEffect, useState } from "react";

const empty = { name: "", role: "", message: "" };

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials", { cache: "no-store" });
      const data = (await res.json()) as TestimonialItem[];
      setItems(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    try {
      if (editingId) {
        const res = await fetch(`/api/testimonials/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Could not update");
      } else {
        const res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Could not create");
      }
      setForm(empty);
      setEditingId(null);
      await load();
      setMsg("Saved");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Save failed");
    }
  }

  function edit(t: TestimonialItem) {
    setEditingId(t._id);
    setForm({ name: t.name, role: t.role, message: t.message });
  }

  async function remove(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <AdminShell>
      <div className="space-y-10">
        <div>
          <h1 className="text-2xl font-semibold text-main">Testimonials</h1>
          <p className="mt-1 text-sm text-muted">These power the homepage slider.</p>
        </div>

        <form
          onSubmit={save}
          className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:grid-cols-2"
        >
          <div className="md:col-span-2 flex items-center justify-between">
            <h2 className="text-lg font-medium text-main">
              {editingId ? "Edit testimonial" : "New testimonial"}
            </h2>
            {editingId ? (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm(empty);
                }}
                className="text-xs text-muted hover:text-main"
              >
                Cancel edit
              </button>
            ) : null}
          </div>
          <div>
            <label className="text-xs text-muted">Name</label>
            <input
              className="mt-1 w-full rounded-xl border border-white/10 bg-canvas px-3 py-2 text-sm"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-xs text-muted">Role</label>
            <input
              className="mt-1 w-full rounded-xl border border-white/10 bg-canvas px-3 py-2 text-sm"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-muted">Message</label>
            <textarea
              className="mt-1 w-full resize-none rounded-xl border border-white/10 bg-canvas px-3 py-2 text-sm"
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="rounded-xl bg-accent px-6 py-2 text-sm font-medium text-white"
            >
              {editingId ? "Update" : "Create"}
            </button>
            {msg ? <p className="mt-3 text-sm text-muted">{msg}</p> : null}
          </div>
        </form>

        <div>
          <h2 className="text-lg font-medium text-main">All testimonials</h2>
          {loading ? (
            <p className="mt-4 text-sm text-muted">Loading…</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {items.map((t) => (
                <li
                  key={t._id}
                  className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-main">{t.name}</p>
                    <p className="text-xs text-muted">{t.role}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">{t.message}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => edit(t)}
                      className="rounded-lg border border-white/10 px-3 py-1 text-xs hover:border-accent/40"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => void remove(t._id)}
                      className="rounded-lg border border-red-400/30 px-3 py-1 text-xs text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
