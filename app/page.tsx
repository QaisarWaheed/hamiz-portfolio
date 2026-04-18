import "./landing-v2.css";
import SiteV2Shell from "@/components/landing/SiteV2Shell";
import V2Contact from "@/components/landing/V2Contact";
import V2Footer from "@/components/landing/V2Footer";
import V2Hero from "@/components/landing/V2Hero";
import V2Nav from "@/components/landing/V2Nav";
import V2Proof from "@/components/landing/V2Proof";
import V2ServicesAccordion from "@/components/landing/V2ServicesAccordion";
import V2Work from "@/components/landing/V2Work";

export default function Home() {
  return (
    <SiteV2Shell>
      <V2Nav />
      <main>
        <V2Hero />
        <V2Work />
        <V2ServicesAccordion />
        <V2Proof />
        <V2Contact />
      </main>
      <V2Footer />
    </SiteV2Shell>
  );
}
