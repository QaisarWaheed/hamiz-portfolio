"use client";

import AdminShell from "@/components/AdminShell";
import type { ServiceRow } from "@/lib/landing-types";
import { useCallback, useEffect, useState } from "react";

function normalizeRow(r: ServiceRow): ServiceRow {
  const src = r.videoSource === "link" || r.videoSource === "upload" ? r.videoSource : "none";
  return {
    ...r,
    videoSource: src,
    videoUrl: r.videoUrl ?? "",
  };
}

export default function AdminServicesPage() {
  const [rows, setRows] = useState<ServiceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);
  const [uploadIdx, setUploadIdx] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services", { cache: "no-store" });
      const data = (await res.json()) as ServiceRow[];
      setRows(Array.isArray(data) ? data.map(normalizeRow) : []);
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
            videoSource: r.videoSource ?? "none",
            videoUrl:
              r.videoSource === "none" ? "" : (r.videoUrl ?? "").trim(),
          })),
        }),
      });
      if (!res.ok) throw new Error("Save failed");
      const data = (await res.json()) as ServiceRow[];
      setRows(Array.isArray(data) ? data.map(normalizeRow) : []);
      setMsg("Saved");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Save failed");
    }
  }

  function update(i: number, patch: Partial<ServiceRow>) {
    setRows((prev) => prev.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  }

  async function onVideoFile(i: number, file: File | null) {
    if (!file) return;
    setUploadIdx(i);
    setMsg(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("kind", "video");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const err = (await res.json()) as { error?: string };
        throw new Error(err.error ?? "Upload failed");
      }
      const { url } = (await res.json()) as { url: string };
      update(i, { videoSource: "upload", videoUrl: url });
      setMsg("Video uploaded — click Save all services to publish.");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploadIdx(null);
    }
  }

  return (
    <AdminShell>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-main">Services</h1>
          <p className="mt-1 max-w-xl text-sm text-muted">
            Homepage services: text plus an optional silent looping preview (YouTube, Vimeo, direct
            MP4, or upload to Cloudinary).
          </p>
        </div>

        {loading ? (
          <p className="text-sm text-muted">Loading…</p>
        ) : (
          <div className="space-y-8">
            {rows.map((r, i) => (
              <div
                key={r._id}
                className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 lg:grid-cols-2"
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
                  <label className="block text-xs text-muted">Preview video</label>
                  <select
                    value={r.videoSource ?? "none"}
                    onChange={(e) => {
                      const v = e.target.value as ServiceRow["videoSource"];
                      update(i, {
                        videoSource: v,
                        videoUrl: v === "none" ? "" : r.videoUrl,
                      });
                    }}
                    className="w-full rounded-lg border border-white/10 bg-canvas px-3 py-2 text-sm text-main"
                  >
                    <option value="none">No video</option>
                    <option value="link">Link (YouTube, Vimeo, or MP4 URL)</option>
                    <option value="upload">Upload file (Cloudinary)</option>
                  </select>
                  {r.videoSource === "link" ? (
                    <>
                      <label className="block text-xs text-muted">Video URL</label>
                      <input
                        value={r.videoUrl ?? ""}
                        onChange={(e) => update(i, { videoUrl: e.target.value })}
                        placeholder="https://…"
                        className="w-full rounded-lg border border-white/10 bg-canvas px-3 py-2 text-sm text-main"
                      />
                    </>
                  ) : null}
                  {r.videoSource === "upload" ? (
                    <>
                      <label className="block text-xs text-muted">Upload .mp4 / .webm / .mov</label>
                      <input
                        type="file"
                        accept="video/*"
                        disabled={uploadIdx === i}
                        onChange={(e) => {
                          const f = e.target.files?.[0] ?? null;
                          void onVideoFile(i, f);
                          e.target.value = "";
                        }}
                        className="w-full text-sm text-main file:mr-3 file:rounded-lg file:border-0 file:bg-accent file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white"
                      />
                      {r.videoUrl ? (
                        <p className="break-all text-xs text-muted">Stored: {r.videoUrl}</p>
                      ) : null}
                    </>
                  ) : null}
                </div>
                <div>
                  <label className="block text-xs text-muted">Description</label>
                  <textarea
                    value={r.description}
                    onChange={(e) => update(i, { description: e.target.value })}
                    rows={12}
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
