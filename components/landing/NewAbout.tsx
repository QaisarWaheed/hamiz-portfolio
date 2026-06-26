"use client";

import AnimatedText from "@/components/landing/AnimatedText";
import ContactButton from "@/components/landing/ContactButton";
import FadeIn from "@/components/landing/FadeIn";
import { ABOUT_CORNER_IMAGES } from "@/components/landing/landing-v3-assets";

const BIO =
  "I edit video for people who have something real to say and not enough time to say it. I edit documentaries and technical content, most of it for a YouTube channel built around information and tech/science research. That means I don't just trim B-roll and drop in transitions. I track an argument across a 40-minute conversation, decide which 90 seconds of a researcher's tangent actually matters, and pace the cut so people stay through the dense parts instead of clicking off.";

export default function NewAbout() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center px-5 py-20 sm:px-8 md:px-10"
    >
      {Object.entries(ABOUT_CORNER_IMAGES).map(([key, img]) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={key}
          src={img.src}
          alt={img.alt}
          className={`hidden sm:block ${img.className}`}
          loading="lazy"
        />
      ))}

      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn y={40}>
          <h2
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            About me
          </h2>
        </FadeIn>

        <AnimatedText
          text={BIO}
          className="w-full max-w-[560px] px-4 text-center font-medium leading-relaxed text-[#D7E2EA]"
          style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
        />

        <div className="mt-16 flex flex-col items-center gap-16 sm:mt-20 sm:gap-20 md:gap-24">
          <ContactButton />
        </div>
      </div>
    </section>
  );
}
