import SectionReveal from "@/components/landing/SectionReveal";
import ServicesList from "@/components/landing/ServicesList";
import { getServicesForLanding } from "@/lib/data/services";

export default async function ServicesSection() {
  const services = await getServicesForLanding();

  if (services.length === 0) {
    return null;
  }

  return (
    <section id="services" className="border-b border-line">
      <div className="section-container section-padding-after-quote">
        <SectionReveal>
          <h2 className="section-heading text-ink">What I edit</h2>
        </SectionReveal>
        <ServicesList services={services} />
      </div>
    </section>
  );
}
