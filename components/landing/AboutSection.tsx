import SectionReveal from "@/components/landing/SectionReveal";
import { getAboutForLanding } from "@/lib/data/about";
import { splitAboutBio } from "@/lib/about-layout";

export default async function AboutSection() {
  const about = await getAboutForLanding();
  const { intro, body } = splitAboutBio(about.bio);

  return (
    <section id="bio-section" className="border-b border-line">
      <div className="section-container section-padding">
        <div className="min-[810px]:grid min-[810px]:grid-cols-[370px_minmax(0,1fr)] min-[810px]:gap-x-[450px]">
          <SectionReveal>
            <h2 className="section-heading max-w-[370px] text-ink">{about.headline}</h2>
            {intro ? (
              <p className="mt-8 max-w-[370px] text-[22px] font-semibold leading-[1.4] tracking-[-0.04em] text-ink">
                {intro}
              </p>
            ) : null}
          </SectionReveal>
          {body ? (
            <SectionReveal delay={0.1} className="mt-10 min-[810px]:mt-[calc(76px+2rem)]">
              <p className="text-[18px] font-normal leading-[1.55] tracking-[-0.04em] text-muted">
                {body}
              </p>
            </SectionReveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
