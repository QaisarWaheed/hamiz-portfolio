import BioSectionContent from "@/components/landing/BioSectionContent";
import { getAboutForLanding } from "@/lib/data/about";
import { splitAboutBio, splitBioBodyParagraphs } from "@/lib/about-layout";

export default async function AboutSection() {
  const about = await getAboutForLanding();
  const { intro, body } = splitAboutBio(about.bio);
  const bodyParagraphs = splitBioBodyParagraphs(body);

  return (
    <section id="bio-section" className="border-b border-line min-[810px]:hidden">
      <BioSectionContent
        headline={about.headline}
        intro={intro}
        bodyParagraphs={bodyParagraphs}
      />
    </section>
  );
}
