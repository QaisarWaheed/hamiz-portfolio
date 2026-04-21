import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { requireAdmin } from "@/lib/auth";
import { demoProjects, useDemoContentFallback } from "@/lib/demo-content";
import { z } from "zod";

const createSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  videoSource: z.enum(["url", "cloudinary"]).optional().default("url"),
  videoUrl: z.string().url(),
  thumbnail: z.string().url(),
  category: z.string().optional(),
});

const PAGE_SIZE_DEFAULT = 5;
const PAGE_SIZE_MAX = 50;

function paginatedDemo(page: number, pageSize: number) {
  const total = demoProjects.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const items = demoProjects.slice(start, start + pageSize);
  return { items, total, page: safePage, pageSize, totalPages };
}

export async function GET(req: Request) {
  const fallback = useDemoContentFallback();
  const { searchParams } = new URL(req.url);
  const pageRaw = searchParams.get("page");
  const limitRaw = searchParams.get("limit") ?? searchParams.get("pageSize");
  const wantsPage = pageRaw !== null && pageRaw !== "";

  let page = 1;
  let pageSize = PAGE_SIZE_DEFAULT;
  if (wantsPage) {
    page = Math.max(1, parseInt(pageRaw ?? "1", 10) || 1);
    pageSize = Math.min(PAGE_SIZE_MAX, Math.max(1, parseInt(limitRaw ?? String(PAGE_SIZE_DEFAULT), 10) || PAGE_SIZE_DEFAULT));
  }

  try {
    await connectDB();
    const sort = { updatedAt: -1 as const, createdAt: -1 as const };

    if (wantsPage) {
      const total = await Project.countDocuments();
      if (total === 0 && fallback) {
        return NextResponse.json(paginatedDemo(page, pageSize));
      }
      const totalPages = Math.max(1, Math.ceil(total / pageSize));
      const safePage = Math.min(Math.max(1, page), totalPages);
      const skip = (safePage - 1) * pageSize;
      const pageItems = await Project.find().sort(sort).skip(skip).limit(pageSize).lean();
      return NextResponse.json({
        items: pageItems,
        total,
        page: safePage,
        pageSize,
        totalPages,
      });
    }

    const items = await Project.find().sort(sort).lean();
    if (items.length === 0 && fallback) {
      return NextResponse.json(demoProjects);
    }
    return NextResponse.json(items);
  } catch (e) {
    console.error(e);
    if (fallback) {
      console.warn("[api/projects] Using demo projects (database unavailable or misconfigured).");
      if (wantsPage) {
        return NextResponse.json(paginatedDemo(page, pageSize));
      }
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
