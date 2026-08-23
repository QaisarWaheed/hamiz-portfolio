"use client";

import VideoModal from "@/components/VideoModal";
import SectionReveal from "@/components/landing/SectionReveal";
import { normalizeThumbUrl } from "@/lib/project-thumbnails";
import type { ProjectItem } from "@/lib/landing-types";
import { WORK_INDEX_ENABLED, WORK_INDEX_HREF } from "@/lib/projects-view-all";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const ease = [0.25, 0.1, 0.25, 1] as const;

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

function ProjectThumbnail({ src, title }: { src: string; title: string }) {
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
    <Image
      src={thumb}
      alt={title}
      width={1600}
      height={1000}
      className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      onError={() => setBroken(true)}
      sizes="(min-width: 640px) 50vw, 100vw"
    />
  );
}

type ProjectsGridClientProps = {
  projects: ProjectItem[];
  total: number;
  displayLimit: number;
};

export default function ProjectsGridClient({
  projects,
  total,
  displayLimit,
}: ProjectsGridClientProps) {
  const [modal, setModal] = useState<ProjectItem | null>(null);
  const showViewAll = WORK_INDEX_ENABLED && total > displayLimit;

  return (
    <>
      {/* Projects: fixed 2 columns from sm+ (1 on mobile). Odd counts may leave a half-row — intentional. */}
      <motion.div
        className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2"
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8% 0px", amount: 0.08 }}
      >
        {projects.map((project) => {
          const thumb = normalizeThumbUrl(project.thumbnail ?? "", project.videoUrl ?? "");
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

      {showViewAll ? (
        <p className="mt-10 text-center">
          {/* TODO: point at /work when that route exists */}
          <a
            href={WORK_INDEX_HREF}
            className="text-sm font-medium uppercase tracking-[0.16em] text-muted underline-offset-4 hover:text-ink hover:underline"
          >
            View all work
          </a>
        </p>
      ) : null}

      <VideoModal
        open={modal !== null}
        onClose={() => setModal(null)}
        title={modal?.title ?? ""}
        videoUrl={modal?.videoUrl ?? ""}
        description={modal?.description ?? ""}
        category={modal?.category ?? ""}
      />
    </>
  );
}
