import { listTestimonials } from "@/lib/data/testimonials";
import { revalidateHomepage } from "@/lib/revalidate-home";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Testimonial from "@/models/Testimonial";
import { z } from "zod";

const createSchema = z.object({
  name: z.string().min(1),
  role: z.string().optional(),
  message: z.string().min(1),
  imageUrl: z.string().max(2000).optional().default(""),
  companyLogo: z.string().max(2000).optional().default(""),
});

export async function GET() {
  const items = await listTestimonials();
  return NextResponse.json(items);
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
    revalidateHomepage();
    return NextResponse.json(doc.toObject());
  } catch (e) {
    if (e instanceof Response) return e;
    console.error(e);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
