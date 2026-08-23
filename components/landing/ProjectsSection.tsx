"use client";

import VideoModal from "@/components/VideoModal";
import SectionReveal from "@/components/landing/SectionReveal";
import type { ProjectItem } from "@/lib/landing-types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const DEMO: ProjectItem[] = [
  {
    _id: "demo-1",
    title: "Nocturne — Fashion Film",
    category: "Fashion",
    videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
    thumbnail:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80&auto=format&fit=crop",
  },
  {
    _id: "demo-2",
    title: "Pulse — Artist Documentary",
    category: "Documentary",
    videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
    thumbnail:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80&auto=format&fit=crop",
  },
  {
    _id: "demo-3",
    title: "Velocity — Automotive Spot",
    category: "Commercial",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-highway-at-night-from-a-moving-car-1630-large.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80&auto=format&fit=crop",
  },
];

function youtubeIdFromUrl(url: string): string | null {
  const raw = url.trim();
  if (!raw) return null;
  const match = raw.match(
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtu\.be\/)([\w-]{11})/
  );
  return match?.[1] ?? null;
}

function normalizeThumbUrl(thumbnail: string, videoUrl: string): string {
  const t = (thumbnail ?? "").trim();
  const anWebp = t.match(/i\.ytimg\.com\/an_webp\/([\w-]{11})\//i);
  if (anWebp?.[1]) {
    return `https://i.ytimg.com/vi/${anWebp[1]}/hqdefault.jpg`;
  }
  if (t) return t;
  const yt = youtubeIdFromUrl(videoUrl ?? "");
  if (yt) return `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`;
  return "";
}

function ProjectThumbnail({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  const [broken, setBroken] = useState(false);
  const thumb = src.trim();

  if (!thumb || broken) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center bg-line text-sm text-muted">
        No preview
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={thumb}
      alt={title}
      className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      onError={() => setBroken(true)}
    />
  );
}

const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const ease = [0.25, 0.1, 0.25, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<ProjectItem | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        const data: unknown = await res.json();
        if (cancelled) return;
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data as ProjectItem[]);
        } else {
          setProjects(DEMO);
        }
      } catch {
        if (!cancelled) setProjects(DEMO);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="work" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.22em] text-muted">Selected work</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Projects
          </h2>
        </SectionReveal>

        {loading ? (
          <div className="mt-16 flex justify-center py-16">
            <div
              className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-ink"
              aria-label="Loading projects"
            />
          </div>
        ) : (
          <motion.div
            className="mt-12 grid gap-8 sm:grid-cols-2"
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-8% 0px", amount: 0.08 }}
          >
            {projects.map((project) => {
              const thumb = normalizeThumbUrl(
                project.thumbnail ?? "",
                project.videoUrl ?? ""
              );
              return (
                <motion.article key={project._id} variants={cardVariants}>
                  <button
                    type="button"
                    onClick={() => setModal(project)}
                    className="group w-full text-left"
                  >
                    <div className="overflow-hidden border border-line bg-line">
                      <ProjectThumbnail src={thumb} title={project.title} />
                    </div>
                    <div className="mt-4 flex items-start justify-between gap-4 border-b border-line pb-4">
                      <h3 className="text-lg font-medium text-ink transition-colors group-hover:underline">
                        {project.title}
                      </h3>
                      <span className="shrink-0 text-sm text-muted">{project.category}</span>
                    </div>
                  </button>
                </motion.article>
              );
            })}
          </motion.div>
        )}
      </div>

      <VideoModal
        open={modal !== null}
        onClose={() => setModal(null)}
        title={modal?.title ?? ""}
        videoUrl={modal?.videoUrl ?? ""}
        description={modal?.description ?? ""}
        category={modal?.category ?? ""}
      />
    </section>
  );
}
