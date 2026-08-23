import { connectDB } from "@/lib/db";
import { demoTestimonials, useDemoContentFallback } from "@/lib/demo-content";
import type { TestimonialItem } from "@/lib/landing-types";
import Testimonial from "@/models/Testimonial";
import { serializeId } from "./serialize";

function toTestimonialItem(raw: Record<string, unknown>): TestimonialItem {
  const row = serializeId(raw as { _id: string } & Record<string, unknown>);
  return {
    _id: row._id as string,
    name: String(row.name ?? ""),
    role: String(row.role ?? ""),
    message: String(row.message ?? ""),
    imageUrl: row.imageUrl ? String(row.imageUrl) : undefined,
  };
}

export async function listTestimonials(): Promise<TestimonialItem[]> {
  const fallback = useDemoContentFallback();

  try {
    await connectDB();
    const docs = await Testimonial.find().sort({ createdAt: -1 }).lean();
    if (docs.length === 0 && fallback) {
      return demoTestimonials.map((t) => toTestimonialItem(t));
    }
    return docs.map((d) => toTestimonialItem(d as Record<string, unknown>));
  } catch (e) {
    console.error("[data/testimonials] listTestimonials failed:", e);
    if (fallback) {
      return demoTestimonials.map((t) => toTestimonialItem(t));
    }
    return [];
  }
}
