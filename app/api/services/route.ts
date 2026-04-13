import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import Service from "@/models/Service";

const serviceSchema = z.object({
  _id: z.string().optional(),
  order: z.number(),
  num: z.string().min(1).max(20),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(8000),
});

const putSchema = z.object({ services: z.array(serviceSchema) });

export async function GET() {
  try {
    await connectDB();
    const rows = await Service.find().sort({ order: 1, createdAt: 1 }).lean();
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json({ error: "Could not load services" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await requireAdmin();
    const json: unknown = await req.json();
    const parsed = putSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    await connectDB();
    await Service.deleteMany({});
    if (parsed.data.services.length) {
      await Service.insertMany(
        parsed.data.services.map((s, i) => ({
          order: s.order ?? i,
          num: s.num,
          title: s.title,
          description: s.description,
        }))
      );
    }
    const rows = await Service.find().sort({ order: 1, createdAt: 1 }).lean();
    return NextResponse.json(rows);
  } catch (e) {
    if (e instanceof Response) return e;
    return NextResponse.json({ error: "Could not save services" }, { status: 500 });
  }
}
