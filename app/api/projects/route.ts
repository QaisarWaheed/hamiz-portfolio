import { listProjects } from "@/lib/data/projects";
import { revalidateHomepage } from "@/lib/revalidate-home";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pageRaw = searchParams.get("page");
  const limitRaw = searchParams.get("limit") ?? searchParams.get("pageSize");
  const wantsPage = pageRaw !== null && pageRaw !== "";

  let page = 1;
  let pageSize = PAGE_SIZE_DEFAULT;
  if (wantsPage) {
    page = Math.max(1, parseInt(pageRaw ?? "1", 10) || 1);
    pageSize = Math.min(
      PAGE_SIZE_MAX,
      Math.max(1, parseInt(limitRaw ?? String(PAGE_SIZE_DEFAULT), 10) || PAGE_SIZE_DEFAULT)
    );
  }

  const limit = !wantsPage && limitRaw ? parseInt(limitRaw, 10) || undefined : undefined;
  const result = await listProjects(wantsPage ? { page, pageSize } : limit ? { limit } : {});

  return NextResponse.json(result);
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
    revalidateHomepage();
    return NextResponse.json(doc.toObject());
  } catch (e) {
    if (e instanceof Response) return e;
    console.error(e);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
