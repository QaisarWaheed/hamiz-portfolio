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
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.22em] text-muted">Services</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            What I edit
          </h2>
        </SectionReveal>
        <ServicesList services={services} />
      </div>
    </section>
  );
}
