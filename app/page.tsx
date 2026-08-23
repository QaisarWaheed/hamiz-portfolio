import AboutSection from "@/components/landing/AboutSection";
import ContactSection from "@/components/landing/ContactSection";
import FooterSection from "@/components/landing/FooterSection";
import HeroSection from "@/components/landing/HeroSection";
import NavSection from "@/components/landing/NavSection";
import ProjectsSection from "@/components/landing/ProjectsSection";
import QuoteSection from "@/components/landing/QuoteSection";
import ServicesSection from "@/components/landing/ServicesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-paper text-ink">
      <NavSection />
      <HeroSection />
      <AboutSection />
      <QuoteSection />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
