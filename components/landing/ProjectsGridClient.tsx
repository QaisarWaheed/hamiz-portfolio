"use client";

import VideoModal from "@/components/VideoModal";
import type { ProjectItem } from "@/lib/landing-types";
import { WORK_INDEX_ENABLED, WORK_INDEX_HREF } from "@/lib/projects-view-all";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease },
  },
};

function ProjectThumbnail({ src, title }: { src: string; title: string }) {
  const [broken, setBroken] = useState(false);
  const thumb = src.trim();

  if (!thumb || broken) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-[20px] bg-line text-sm text-muted">
        No preview
      </div>
    );
  }

  return (
    <Image
      src={thumb}
      alt={title}
      width={1600}
      height={900}
      className="aspect-video w-full rounded-[20px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
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
  const reduceMotion = useReducedMotion();

  const gridClassName = "mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2";

  const cards = projects.map((project) => {
    const thumb = project.thumbnail ?? "";
    const body = (
      <button
        type="button"
        onClick={() => setModal(project)}
        className="group w-full text-left"
      >
        <div className="overflow-hidden rounded-[20px] border border-line bg-line">
          <ProjectThumbnail src={thumb} title={project.title} />
        </div>
        <div className="mt-4 border-b border-line pb-4">
          <h3 className="text-[32px] font-medium leading-tight tracking-[-0.02em] text-ink transition-colors group-hover:underline">
            {project.title}
          </h3>
          <p className="mt-2 truncate text-sm text-muted" title={project.category}>
            {project.category}
          </p>
        </div>
      </button>
    );
    return reduceMotion ? (
      <article key={project._id}>{body}</article>
    ) : (
      <motion.article key={project._id} variants={cardVariants}>
        {body}
      </motion.article>
    );
  });

  return (
    <>
      {/* Projects: fixed 2 columns from sm+ (1 on mobile). Odd counts may leave a half-row — intentional. */}
      {reduceMotion ? (
        <div className={gridClassName}>{cards}</div>
      ) : (
        <motion.div
          className={gridClassName}
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -6% 0px", amount: 0.15 }}
        >
          {cards}
        </motion.div>
      )}

      {showViewAll ? (
        <p className="mt-10 text-center">
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
