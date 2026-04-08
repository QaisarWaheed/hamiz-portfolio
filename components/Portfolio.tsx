"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import VideoModal from "./VideoModal";

export type ProjectItem = {
  _id: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnail: string;
  category: string;
};

function isDirectVideo(url: string) {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url);
}

function ProjectCard({
  item,
  onOpen,
}: {
  item: ProjectItem;
  onOpen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canPreview = isDirectVideo(item.videoUrl);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition-shadow hover:border-accent/35 hover:shadow-[var(--shadow-glow)]"
      onMouseEnter={() => {
        if (canPreview) void videoRef.current?.play().catch(() => {});
      }}
      onMouseLeave={() => {
        if (canPreview && videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        {canPreview && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            src={item.videoUrl}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>
      <div className="space-y-1 p-4">
        <p className="text-xs uppercase tracking-wider text-accent">{item.category}</p>
        <h3 className="text-lg font-medium text-main">{item.title}</h3>
        {item.description ? (
          <p className="line-clamp-2 text-sm text-muted">{item.description}</p>
        ) : null}
      </div>
    </motion.article>
  );
}

export default function Portfolio() {
  const [items, setItems] = useState<ProjectItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const [modal, setModal] = useState<ProjectItem | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        if (!res.ok) throw new Error("Could not load portfolio");
        const data = (await res.json()) as ProjectItem[];
        if (!cancelled) setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    if (!items?.length) return ["All"];
    const set = new Set(items.map((i) => i.category || "General"));
    return ["All", ...Array.from(set).sort()];
  }, [items]);

  const filtered = useMemo(() => {
    if (!items) return [];
    if (filter === "All") return items;
    return items.filter((i) => (i.category || "General") === filter);
  }, [items, filter]);

  return (
    <section id="work" className="scroll-mt-24 bg-canvas py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Portfolio</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-main md:text-4xl">
              Selected edits
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Hover for a silent preview on direct video files. Click to watch in full.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                  filter === c
                    ? "bg-accent text-white shadow-[var(--shadow-glow)]"
                    : "border border-white/10 bg-white/5 text-muted hover:border-accent/30 hover:text-main"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </motion.div>

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        )}
        {items === null && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-64 animate-pulse rounded-2xl bg-white/5"
              />
            ))}
          </div>
        )}
        {items && filtered.length === 0 && (
          <p className="text-sm text-muted">
            No projects yet. Add some from the admin panel.
          </p>
        )}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <ProjectCard key={item._id} item={item} onOpen={() => setModal(item)} />
          ))}
        </div>
      </div>

      <VideoModal
        open={modal !== null}
        onClose={() => setModal(null)}
        title={modal?.title ?? ""}
        videoUrl={modal?.videoUrl ?? ""}
      />
    </section>
  );
}
