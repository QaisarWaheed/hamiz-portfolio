"use client";

import { MARQUEE_IMAGES } from "@/components/landing/landing-v3-assets";
import { useEffect, useRef } from "react";

function triple(items: string[]) {
  return [...items, ...items, ...items];
}

export default function NewMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const row1Source = MARQUEE_IMAGES.slice(0, 11);
  const row2Source = MARQUEE_IMAGES.slice(11, 21);

  useEffect(() => {
    const section = sectionRef.current;
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
    if (!section || !row1 || !row2) return;

    const onScroll = () => {
      const offset = (window.scrollY - section.offsetTop + window.innerHeight) * 0.3;
      row1.style.transform = `translateX(${offset - 200}px)`;
      row2.style.transform = `translateX(${-(offset - 200)}px)`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function renderRow(items: string[], keyPrefix: string) {
    return triple(items).map((src, i) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        key={`${keyPrefix}-${i}`}
        src={src}
        alt=""
        width={420}
        height={270}
        loading="lazy"
        className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover"
      />
    ));
  }

  return (
    <section
      ref={sectionRef}
      className="overflow-x-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40"
    >
      <div className="flex flex-col gap-3">
        <div ref={row1Ref} className="marquee-row">
          {renderRow(row1Source, "r1")}
        </div>
        <div ref={row2Ref} className="marquee-row">
          {renderRow(row2Source, "r2")}
        </div>
      </div>
    </section>
  );
}
