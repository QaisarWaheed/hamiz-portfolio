import SectionReveal from "@/components/landing/SectionReveal";
import { getAboutForLanding } from "@/lib/data/about";

export default async function AboutSection() {
  const about = await getAboutForLanding();

  return (
    <section id="bio-section" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.22em] text-muted">About</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            {about.headline}
          </h2>
        </SectionReveal>
        <SectionReveal delay={0.1} className="mt-10 max-w-3xl">
          <p className="text-base leading-relaxed text-muted sm:text-lg">{about.bio}</p>
        </SectionReveal>
      </div>
    </section>
  );
}
