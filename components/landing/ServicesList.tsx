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
          <span
            className="block text-[28px] font-bold tracking-[-0.05em] text-ink transition-transform duration-300 group-hover:translate-x-1"
            style={{ letterSpacing: "-0.05em" }}
          >
            {service.label}
          </span>
          <span className="mt-3 block text-[18px] text-muted max-[809px]:mt-3 min-[810px]:mt-0 min-[810px]:max-w-[45%] min-[810px]:text-right">
            {service.detail}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
