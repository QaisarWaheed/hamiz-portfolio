import BioSectionContent from "@/components/landing/BioSectionContent";
import ContactSection from "@/components/landing/ContactSection";
import FooterSection from "@/components/landing/FooterSection";
import HeroSection from "@/components/landing/HeroSection";
import NavSection from "@/components/landing/NavSection";
import ProjectsSection from "@/components/landing/ProjectsSection";
import QuoteSection from "@/components/landing/QuoteSection";
import ServicesSection from "@/components/landing/ServicesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import { getAboutForLanding } from "@/lib/data/about";
import { splitAboutBio, splitBioBodyParagraphs } from "@/lib/about-layout";

export const revalidate = 300;

export default async function HomePage() {
  const about = await getAboutForLanding();
  const { intro, body } = splitAboutBio(about.bio);
  const bodyParagraphs = splitBioBodyParagraphs(body);

  return (
    <main className="min-h-screen overflow-x-clip bg-paper text-ink">
      <NavSection />
      <HeroSection
        bioPanel={
          <BioSectionContent
            headline={about.headline}
            intro={intro}
            bodyParagraphs={bodyParagraphs}
          />
        }
      />
      <QuoteSection />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
