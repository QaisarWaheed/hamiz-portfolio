"use client";

import ContactButton from "@/components/landing/ContactButton";
import FadeIn from "@/components/landing/FadeIn";
import MagnetWrapper from "@/components/landing/MagnetWrapper";
import NewNav from "@/components/landing/NewNav";
import { PORTRAIT_URL } from "@/components/landing/landing-v3-assets";

export default function NewHero() {
  return (
    <section className="relative flex h-screen flex-col overflow-x-hidden bg-[#0C0C0C]">
      <FadeIn delay={0} y={-20}>
        <NewNav />
      </FadeIn>

      <FadeIn
        delay={0.6}
        y={30}
        className="absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]"
      >
        <MagnetWrapper>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PORTRAIT_URL}
            alt="Hamiz Khan"
            className="h-auto w-full object-contain"
            draggable={false}
          />
        </MagnetWrapper>
      </FadeIn>

      <FadeIn delay={0.15} y={40} className="relative z-20 mt-6 w-full text-center sm:mt-4 md:-mt-5">
        <h1 className="hero-heading w-full whitespace-nowrap text-[14vw] font-black uppercase leading-none tracking-tight sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
          Hi, i&apos;m Hamiz
        </h1>
      </FadeIn>

      <div className="relative z-20 mt-auto flex items-end justify-between px-6 pb-7 sm:px-10 sm:pb-8 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
          >
            a video editor driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
