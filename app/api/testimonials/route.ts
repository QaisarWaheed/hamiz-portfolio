import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Testimonial from "@/models/Testimonial";
import { requireAdmin } from "@/lib/auth";
import { demoTestimonials, useDemoContentFallback } from "@/lib/demo-content";
import { z } from "zod";

const createSchema = z.object({
  name: z.string().min(1),
  role: z.string().optional(),
  message: z.string().min(1),
  imageUrl: z.string().max(2000).optional().default(""),
});

export async function GET() {
  const fallback = useDemoContentFallback();
  try {
    await connectDB();
    const items = await Testimonial.find().sort({ createdAt: -1 }).lean();
    if (items.length === 0 && fallback) {
      return NextResponse.json(demoTestimonials);
    }
    return NextResponse.json(items);
  } catch (e) {
    console.error(e);
    if (fallback) {
      console.warn("[api/testimonials] Using demo testimonials (database unavailable or misconfigured).");
      return NextResponse.json(demoTestimonials);
    }
    return NextResponse.json({ error: "Failed to load testimonials" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const json: unknown = await req.json();
    const parsed = createSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    await connectDB();
    const doc = await Testimonial.create(parsed.data);
    return NextResponse.json(doc.toObject());
  } catch (e) {
    if (e instanceof Response) return e;
    console.error(e);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
