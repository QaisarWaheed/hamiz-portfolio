"use client";

import FadeIn from "@/components/landing/FadeIn";
import { SERVICES } from "@/components/landing/landing-v3-assets";

export default function NewServices() {
  return (
    <section
      id="price"
      className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <h2
        className="mb-16 text-center font-black uppercase text-[#0C0C0C] sm:mb-20 md:mb-28"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Services
      </h2>

      <ul className="mx-auto max-w-5xl">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.num} delay={i * 0.1}>
            <li
              className={`flex items-start gap-6 py-8 sm:py-10 md:py-12 ${
                i < SERVICES.length - 1 ? "border-b border-black/15" : ""
              }`}
            >
              <span
                className="w-24 shrink-0 font-black leading-none text-[#0C0C0C] sm:w-32 md:w-40"
                style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
              >
                {service.num}
              </span>
              <div className="flex flex-col gap-2">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
                >
                  {service.name}
                </h3>
                <p
                  className="max-w-2xl font-light leading-relaxed text-[#0C0C0C] opacity-60"
                  style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
                >
                  {service.description}
                </p>
              </div>
            </li>
          </FadeIn>
        ))}
      </ul>
    </section>
  );
}
