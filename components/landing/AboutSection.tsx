import SectionReveal from "@/components/landing/SectionReveal";
import { getAboutForLanding } from "@/lib/data/about";

export default async function AboutSection() {
  const about = await getAboutForLanding();

  return (
    <section id="bio-section" className="border-b border-line">
      <div className="section-container section-padding">
        <SectionReveal>
          <h2 className="section-heading max-w-2xl text-ink">{about.headline}</h2>
        </SectionReveal>
        <SectionReveal delay={0.1} className="mt-10 max-w-3xl">
          <p className="text-base leading-relaxed text-muted sm:text-lg">{about.bio}</p>
        </SectionReveal>
      </div>
    </section>
  );
}
