"use client";

import VideoModal from "@/components/VideoModal";
import FadeIn from "@/components/landing/FadeIn";
import type { ProjectItem } from "@/lib/landing-types";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";

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

function LiveProjectButton() {
  return (
    <span className="inline-block rounded-full border-2 border-[#D7E2EA] px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-sm md:text-base">
      Live Project
    </span>
  );
}

function ThumbnailImage({
  src,
  onOpen,
  className,
  style,
}: {
  src: string;
  onOpen: () => void;
  className?: string;
  style?: CSSProperties;
}) {
  const [broken, setBroken] = useState(false);
  const thumb = src.trim();

  if (!thumb || broken) {
    return (
      <button type="button" onClick={onOpen} className="block w-full text-left">
        <div
          className={`w-full rounded-[24px] bg-[#1a1a1a] sm:rounded-[32px] ${className ?? ""}`}
          style={style}
        />
      </button>
    );
  }

  return (
    <button type="button" onClick={onOpen} className="block w-full text-left">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumb}
        alt=""
        className={`w-full rounded-[24px] object-cover sm:rounded-[32px] ${className ?? ""}`}
        style={style}
        onError={() => setBroken(true)}
      />
    </button>
  );
}

type ProjectCardProps = {
  project: ProjectItem;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  stackEnabled: boolean;
  onOpen: () => void;
};

function ProjectCard({
  project,
  index,
  total,
  scrollYProgress,
  stackEnabled,
  onOpen,
}: ProjectCardProps) {
  const scale = useTransform(
    scrollYProgress,
    [index / total, 1],
    [1, 1 - (total - 1 - index) * 0.03]
  );
  const num = String(index + 1).padStart(2, "0");
  const thumb = normalizeThumbUrl(project.thumbnail ?? "", project.videoUrl ?? "");

  return (
    <div className="relative sm:h-[85vh]">
      <motion.div
        className="project-card relative rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:sticky sm:top-24 sm:rounded-[50px] sm:p-6 md:top-32 md:rounded-[60px] md:p-8"
        style={{
          scale: stackEnabled ? scale : 1,
          top: stackEnabled ? index * 28 : undefined,
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <span
            className="hero-heading font-black"
            style={{ fontSize: "clamp(2rem, 8vw, 100px)" }}
          >
            {num}
          </span>
          <div className="flex min-w-0 flex-col">
            <span className="text-sm font-light uppercase text-[#D7E2EA] opacity-60">
              {project.category}
            </span>
            <h3
              className="font-black uppercase text-[#D7E2EA]"
              style={{ fontSize: "clamp(1.2rem, 3vw, 2.5rem)" }}
            >
              {project.title}
            </h3>
          </div>
          <a href={project.videoUrl} target="_blank" rel="noopener noreferrer">
            <LiveProjectButton />
          </a>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <div className="flex w-full flex-row gap-2 sm:w-[40%] sm:flex-col sm:gap-4">
            <ThumbnailImage
              src={thumb}
              onOpen={onOpen}
              style={{ height: "clamp(130px, 16vw, 230px)" }}
            />
            <div
              className="flex w-full items-center justify-center rounded-[24px] bg-[#111111] sm:rounded-[32px]"
              style={{ height: "clamp(160px, 22vw, 340px)" }}
            >
              <span
                className="hero-heading px-4 text-center font-black uppercase"
                style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
              >
                {project.category || "Video"}
              </span>
            </div>
          </div>
          <div className="w-full sm:flex-1">
            <ThumbnailImage
              src={thumb}
              onOpen={onOpen}
              className="h-full"
              style={{
                minHeight: "clamp(200px, 50vw, 570px)",
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function CardStack({
  projects,
  onOpen,
}: {
  projects: ProjectItem[];
  onOpen: (p: ProjectItem) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stackEnabled, setStackEnabled] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const total = projects.length;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setStackEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-8 sm:gap-0">
      {projects.map((project, index) => (
        <ProjectCard
          key={project._id}
          project={project}
          index={index}
          total={total}
          scrollYProgress={scrollYProgress}
          stackEnabled={stackEnabled}
          onOpen={() => onOpen(project)}
        />
      ))}
    </div>
  );
}

export default function NewProjects() {
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
          setProjects(data.slice(0, 3) as ProjectItem[]);
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
    <section
      id="projects"
      className="relative z-10 -mt-10 overflow-x-hidden rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10"
    >
      <FadeIn>
        <h2
          className="hero-heading mb-16 text-center font-black uppercase sm:mb-20"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Projects
        </h2>
      </FadeIn>

      {loading ? (
        <div className="flex justify-center py-24">
          <div
            className="h-10 w-10 animate-spin rounded-full border-2 border-[#D7E2EA]/20 border-t-[#D7E2EA]"
            aria-label="Loading projects"
          />
        </div>
      ) : (
        <CardStack projects={projects} onOpen={setModal} />
      )}

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
