import TestimonialsGrid from "@/components/landing/TestimonialsGrid";
import { getTestimonialsForLanding } from "@/lib/data/testimonials";

export default async function TestimonialsSection() {
  const items = await getTestimonialsForLanding();

  if (items.length === 0) {
    return null;
  }

  return <TestimonialsGrid items={items} />;
}
