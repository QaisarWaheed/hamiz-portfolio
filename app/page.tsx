import "./landing-v3.css";
import NewAbout from "@/components/landing/NewAbout";
import NewContact from "@/components/landing/NewContact";
import NewFooter from "@/components/landing/NewFooter";
import NewHero from "@/components/landing/NewHero";
import NewMarquee from "@/components/landing/NewMarquee";
import NewProjects from "@/components/landing/NewProjects";
import NewServices from "@/components/landing/NewServices";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-paper text-ink">
      <NewHero />
      <NewMarquee />
      <NewAbout />
      <NewServices />
      <NewProjects />
      <NewContact />
      <NewFooter />
    </main>
  );
}
