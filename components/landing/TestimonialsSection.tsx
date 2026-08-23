import TestimonialsGrid from "@/components/landing/TestimonialsGrid";
import { listTestimonials } from "@/lib/data/testimonials";

export default async function TestimonialsSection() {
  const items = await listTestimonials();

  if (items.length === 0) {
    return null;
  }

  return <TestimonialsGrid items={items} />;
}
