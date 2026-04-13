import LandingAbout from "@/components/landing/LandingAbout";
import LandingContact from "@/components/landing/LandingContact";
import LandingFooter from "@/components/landing/LandingFooter";
import LandingHero from "@/components/landing/LandingHero";
import LandingNav from "@/components/landing/LandingNav";
import LandingPortfolio from "@/components/landing/LandingPortfolio";
import LandingPricing from "@/components/landing/LandingPricing";
import LandingServices from "@/components/landing/LandingServices";
import LandingTestimonials from "@/components/landing/LandingTestimonials";

export default function Home() {
  return (
    <div className="ed-grain min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <LandingNav />
      <main>
        <LandingHero />
        <LandingServices />
        <LandingPortfolio />
        <LandingAbout />
        <LandingTestimonials />
        <LandingPricing />
        <LandingContact />
      </main>
      <LandingFooter />
    </div>
  );
}
