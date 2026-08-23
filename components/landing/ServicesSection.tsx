"use client";

import SectionReveal from "@/components/landing/SectionReveal";
import { SERVICES } from "@/components/landing/landing-content";
import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

export default function ServicesSection() {
  return (
    <section id="services" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.22em] text-muted">Services</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            What I edit
          </h2>
        </SectionReveal>

        <motion.ul
          className="mt-12 border-t border-line"
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8% 0px", amount: 0.1 }}
        >
          {SERVICES.map((service) => (
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
                {service.tags.join(" · ")}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
