"use client";

import type { LandingServiceDisplay } from "@/lib/landing-fallbacks";
import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

function ServiceTags({ detail }: { detail: string }) {
  const tags = detail
    .split("·")
    .map((tag) => tag.trim())
    .filter(Boolean);

  if (tags.length === 0) return null;

  return (
    <span className="mt-3 flex flex-wrap justify-end gap-x-2 text-[18px] font-normal text-muted max-[809px]:mt-3 min-[810px]:mt-0 min-[810px]:max-w-[45%]">
      {tags.map((tag, index) => (
        <span key={`${tag}-${index}`} className="whitespace-nowrap">
          {index > 0 ? <span className="mr-2 text-muted/70">·</span> : null}
          {tag}
        </span>
      ))}
    </span>
  );
}

type ServicesListProps = {
  services: readonly LandingServiceDisplay[];
};

export default function ServicesList({ services }: ServicesListProps) {
  return (
    <motion.ul
      className="mt-12 border-t border-line"
      variants={listVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-8% 0px", amount: 0.1 }}
    >
      {services.map((service) => (
        <motion.li
          key={service.label}
          variants={rowVariants}
          className="group border-b border-line py-[30px] transition-colors hover:border-ink/30 max-[809px]:block min-[810px]:flex min-[810px]:items-center min-[810px]:justify-between"
        >
          <span className="block text-[28px] font-medium tracking-[-0.05em] text-ink transition-transform duration-300 group-hover:translate-x-1 min-[810px]:text-[32px]">
            {service.label}
          </span>
          <ServiceTags detail={service.detail} />
        </motion.li>
      ))}
    </motion.ul>
  );
}
