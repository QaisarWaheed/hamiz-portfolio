"use client";

import AdminShell from "@/components/AdminShell";
import type { ProjectItem, ProjectVideoSource } from "@/lib/landing-types";
import { useEffect, useState } from "react";

type ProjectThumbnailSource = "url" | "cloudinary";

const empty = {
  title: "",
  description: "",
  videoSource: "url" as ProjectVideoSource,
  thumbnailSource: "url" as ProjectThumbnailSource,
  videoUrl: "",
  thumbnail: "",
  category: "Commercial",
};

export default function AdminProjectsPage() {
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/projects", { cache: "no-store" });
      const data = (await res.json()) as ProjectItem[];
      setItems(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function uploadThumb(file: File) {
    setUploading(true);
    setMsg(null);
    try {
      const fd = new FormData();
      fd.set("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const j = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) throw new Error(j.error ?? "Upload failed");
      if (j.url) setForm((f) => ({ ...f, thumbnail: j.url! }));
      setMsg("Thumbnail uploaded");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function uploadProjectVideo(file: File) {
    setUploadingVideo(true);
    setMsg(null);
    try {
      const fd = new FormData();
      fd.set("file", file);
      fd.set("kind", "video");
      fd.set("scope", "project");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const j = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) throw new Error(j.error ?? "Upload failed");
      if (j.url) setForm((f) => ({ ...f, videoSource: "cloudinary", videoUrl: j.url! }));
      setMsg("Video uploaded to Cloudinary");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploadingVideo(false);
    }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (form.videoSource === "cloudinary" && !form.videoUrl.trim()) {
      setMsg("Upload a video file before saving.");
      return;
    }
    if (form.thumbnailSource === "cloudinary" && !form.thumbnail.trim()) {
      setMsg("Upload a thumbnail image before saving.");
      return;
    }
    try {
      if (editingId) {
        const res = await fetch(`/api/projects/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Could not update");
      } else {
        const res = await fetch("/api/projects", {
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

  function edit(p: ProjectItem) {
    setEditingId(p._id);
    setForm({
      title: p.title,
      description: p.description ?? "",
      videoSource: p.videoSource === "cloudinary" ? "cloudinary" : "url",
      thumbnailSource: p.thumbnail?.includes("res.cloudinary.com") ? "cloudinary" : "url",
      videoUrl: p.videoUrl,
      thumbnail: p.thumbnail,
      category: p.category ?? "General",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function remove(id: string) {
    if (!confirm("Delete this project?")) return;
    setMsg(null);
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (!res.ok) setMsg("Delete failed");
    await load();
  }

  return (
    <AdminShell>
      <div className="space-y-10">
        <div>
          <h1 className="text-2xl font-semibold text-main">Projects</h1>
          <p className="mt-1 text-sm text-muted">
            CRUD wired to MongoDB. Thumbnails and optional portfolio videos can be uploaded to Cloudinary.
          </p>
        </div>

        <form
          onSubmit={save}
          className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:grid-cols-2"
        >
          <div className="md:col-span-2 flex items-center justify-between gap-4">
            <h2 className="text-lg font-medium text-main">
              {editingId ? "Edit project" : "New project"}
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
            <label className="text-xs text-muted">Title</label>
            <input
              className="mt-1 w-full rounded-xl border border-white/10 bg-canvas px-3 py-2 text-sm"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-xs text-muted">Category</label>
            <input
              className="mt-1 w-full rounded-xl border border-white/10 bg-canvas px-3 py-2 text-sm"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-muted">Video</label>
            <select
              className="mt-1 w-full rounded-xl border border-white/10 bg-canvas px-3 py-2 text-sm"
              value={form.videoSource}
              onChange={(e) => {
                const videoSource = e.target.value as ProjectVideoSource;
                setForm({
                  ...form,
                  videoSource,
                  videoUrl: videoSource === "url" ? form.videoUrl : "",
                });
              }}
            >
              <option value="url">External URL (YouTube, Vimeo, or direct file link)</option>
              <option value="cloudinary">Upload file (Cloudinary)</option>
            </select>
          </div>
          {form.videoSource === "url" ? (
            <div className="md:col-span-2">
              <label className="text-xs text-muted">Video URL</label>
              <input
                className="mt-1 w-full rounded-xl border border-white/10 bg-canvas px-3 py-2 text-sm"
                value={form.videoUrl}
                onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                placeholder="https://…"
                required
              />
            </div>
          ) : (
            <div className="md:col-span-2">
              <label className="text-xs text-muted">Video file</label>
              <div className="mt-1 flex flex-wrap items-center gap-3">
                <label className="text-xs text-accent underline-offset-4 hover:underline">
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(ev) => {
                      const f = ev.target.files?.[0];
                      if (f) void uploadProjectVideo(f);
                      ev.target.value = "";
                    }}
                  />
                  Upload to Cloudinary
                </label>
                {uploadingVideo ? <span className="text-xs text-muted">Uploading…</span> : null}
              </div>
              {form.videoUrl ? (
                <p className="mt-2 break-all text-xs text-muted">Stored: {form.videoUrl}</p>
              ) : (
                <p className="mt-2 text-xs text-muted">Upload a file to set the video URL (required before save).</p>
              )}
            </div>
          )}
          <div className="md:col-span-2">
            <label className="text-xs text-muted">Thumbnail</label>
            <select
              className="mt-1 w-full rounded-xl border border-white/10 bg-canvas px-3 py-2 text-sm"
              value={form.thumbnailSource}
              onChange={(e) => {
                const thumbnailSource = e.target.value as ProjectThumbnailSource;
                setForm({
                  ...form,
                  thumbnailSource,
                  thumbnail: thumbnailSource === "url" ? form.thumbnail : "",
                });
              }}
            >
              <option value="url">External image URL</option>
              <option value="cloudinary">Upload image (Cloudinary)</option>
            </select>

            {form.thumbnailSource === "url" ? (
              <input
                className="mt-2 w-full rounded-xl border border-white/10 bg-canvas px-3 py-2 text-sm"
                value={form.thumbnail}
                onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                placeholder="https://…"
                required
              />
            ) : (
              <div className="mt-2">
                <div className="flex items-center gap-3">
                  <label className="text-xs text-accent underline-offset-4 hover:underline">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(ev) => {
                        const f = ev.target.files?.[0];
                        if (f) void uploadThumb(f);
                        ev.target.value = "";
                      }}
                    />
                    Upload to Cloudinary
                  </label>
                  {uploading ? <span className="text-xs text-muted">Uploading…</span> : null}
                </div>
                {form.thumbnail ? (
                  <p className="mt-2 break-all text-xs text-muted">Stored: {form.thumbnail}</p>
                ) : (
                  <p className="mt-2 text-xs text-muted">Upload an image to set thumbnail URL (required before save).</p>
                )}
              </div>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-muted">Description</label>
            <textarea
              className="mt-1 w-full resize-none rounded-xl border border-white/10 bg-canvas px-3 py-2 text-sm"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="rounded-xl bg-accent px-6 py-2 text-sm font-medium text-white shadow-[var(--shadow-glow)]"
            >
              {editingId ? "Update project" : "Create project"}
            </button>
            {msg ? <p className="mt-3 text-sm text-muted">{msg}</p> : null}
          </div>
        </form>

        <div>
          <h2 className="text-lg font-medium text-main">All projects</h2>
          {loading ? (
            <p className="mt-4 text-sm text-muted">Loading…</p>
          ) : items.length === 0 ? (
            <p className="mt-4 text-sm text-muted">No projects yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {items.map((p) => (
                <li
                  key={p._id}
                  className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-main">{p.title}</p>
                    <p className="text-xs text-muted">{p.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => edit(p)}
                      className="rounded-lg border border-white/10 px-3 py-1 text-xs hover:border-accent/40"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => void remove(p._id)}
                      className="rounded-lg border border-red-400/30 px-3 py-1 text-xs text-red-300 hover:bg-red-500/10"
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
