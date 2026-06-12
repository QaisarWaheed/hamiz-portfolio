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
import { useEffect, useRef, useState } from "react";

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

function LiveProjectButton() {
  return (
    <span className="inline-block rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base">
      Live Project
    </span>
  );
}

type ProjectCardProps = {
  project: ProjectItem;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  onOpen: () => void;
};

function ProjectCard({
  project,
  index,
  total,
  scrollYProgress,
  onOpen,
}: ProjectCardProps) {
  const scale = useTransform(
    scrollYProgress,
    [index / total, 1],
    [1, 1 - (total - 1 - index) * 0.03]
  );
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="relative h-[85vh]">
      <motion.div
        className="project-card sticky top-24 rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:top-32 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
        style={{ scale, top: index * 28 }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <span
            className="hero-heading font-black"
            style={{ fontSize: "clamp(2rem, 8vw, 100px)" }}
          >
            {num}
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-light uppercase opacity-60 text-[#D7E2EA]">
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

        <div className="mt-6 flex gap-4">
          <div className="flex w-[40%] flex-col gap-4">
            <button type="button" onClick={onOpen} className="w-full text-left">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.thumbnail}
                alt=""
                className="w-full rounded-[24px] object-cover sm:rounded-[32px]"
                style={{ height: "clamp(130px, 16vw, 230px)" }}
              />
            </button>
            <div
              className="w-full rounded-[24px] bg-[#161618] sm:rounded-[32px]"
              style={{ height: "clamp(160px, 22vw, 340px)" }}
            />
          </div>
          <button type="button" onClick={onOpen} className="flex-1 text-left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.thumbnail}
              alt=""
              className="h-full w-full rounded-[24px] object-cover sm:rounded-[32px]"
              style={{ minHeight: "clamp(290px, 38vw, 570px)" }}
            />
          </button>
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const total = projects.length;

  return (
    <div ref={containerRef} className="flex flex-col">
      {projects.map((project, index) => (
        <ProjectCard
          key={project._id}
          project={project}
          index={index}
          total={total}
          scrollYProgress={scrollYProgress}
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
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10"
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
