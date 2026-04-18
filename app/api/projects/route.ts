import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { requireAdmin } from "@/lib/auth";
import { demoProjects, useDemoContentFallback } from "@/lib/demo-content";
import { z } from "zod";

const createSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  videoUrl: z.string().url(),
  thumbnail: z.string().url(),
  category: z.string().optional(),
});

export async function GET() {
  const fallback = useDemoContentFallback();
  try {
    await connectDB();
    const items = await Project.find().sort({ updatedAt: -1, createdAt: -1 }).lean();
    if (items.length === 0 && fallback) {
      return NextResponse.json(demoProjects);
    }
    return NextResponse.json(items);
  } catch (e) {
    console.error(e);
    if (fallback) {
      console.warn("[api/projects] Using demo projects (database unavailable or misconfigured).");
      return NextResponse.json(demoProjects);
    }
    return NextResponse.json({ error: "Failed to load projects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const json: unknown = await req.json();
    const parsed = createSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload", issues: parsed.error.flatten() }, { status: 400 });
    }
    await connectDB();
    const doc = await Project.create(parsed.data);
    return NextResponse.json(doc.toObject());
  } catch (e) {
    if (e instanceof Response) return e;
    console.error(e);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
