import AboutContact from "@/components/AboutContact";
import FloatingBrands from "@/components/FloatingBrands";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ClientStats from "@/components/ClientStats";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-canvas text-main">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FloatingBrands />
        <Portfolio />
        <ClientStats />
        <Testimonials />
        <AboutContact />
      </main>
      <Footer />
    </div>
  );
}
