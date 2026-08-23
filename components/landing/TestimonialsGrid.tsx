"use client";

import SectionReveal from "@/components/landing/SectionReveal";
import type { TestimonialItem } from "@/lib/landing-types";
import { testimonialGridClass } from "@/lib/testimonial-grid";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TestimonialAvatar({ item }: { item: TestimonialItem }) {
  const [broken, setBroken] = useState(false);
  const url = (item.imageUrl ?? "").trim();

  if (url && !broken) {
    return (
      <Image
        src={url}
        alt=""
        width={48}
        height={48}
        className="h-12 w-12 shrink-0 rounded-full border border-line object-cover"
        onError={() => setBroken(true)}
      />
    );
  }

  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-sm font-semibold tracking-wide text-ink"
      aria-hidden
    >
      {initials(item.name)}
    </div>
  );
}

function CompanyLogo({ url }: { url: string }) {
  const [broken, setBroken] = useState(false);
  const src = url.trim();
  if (!src || broken) return null;

  return (
    <Image
      src={src}
      alt=""
      width={160}
      height={160}
      className="h-auto max-h-16 w-auto max-w-[160px] shrink-0 object-contain object-right"
      onError={() => setBroken(true)}
    />
  );
}

const ease = [0.25, 0.1, 0.25, 1] as const;

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

type TestimonialsGridProps = {
  items: TestimonialItem[];
};

export default function TestimonialsGrid({ items }: TestimonialsGridProps) {
  const gridClass = testimonialGridClass(items.length);

  return (
    <section id="testimonials" className="border-b border-line">
      <div className="section-container section-padding-tight-top">
        <SectionReveal>
          <h2 className="section-heading text-ink">Client words</h2>
        </SectionReveal>

        <motion.div
          className={`mt-12 grid gap-6 ${gridClass}`}
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8% 0px", amount: 0.08 }}
        >
          {items.map((item) => (
            <motion.article
              key={item._id}
              variants={cardVariants}
              className="flex h-full flex-col justify-between border border-line bg-paper p-6 sm:p-8"
            >
              <p className="text-base leading-relaxed text-ink">&ldquo;{item.message}&rdquo;</p>
              <div className="mt-8 flex items-end justify-between gap-4">
                <div className="flex min-w-0 items-center gap-4">
                  <TestimonialAvatar item={item} />
                  <div className="min-w-0">
                    <p className="font-medium text-ink">{item.name}</p>
                    {item.role ? <p className="text-sm text-muted">{item.role}</p> : null}
                  </div>
                </div>
                {item.companyLogo ? <CompanyLogo url={item.companyLogo} /> : null}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
