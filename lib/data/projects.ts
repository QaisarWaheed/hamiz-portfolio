import { connectDB } from "@/lib/db";
import { demoProjects, useDemoContentFallback } from "@/lib/demo-content";
import type { ProjectItem, ProjectsPage } from "@/lib/landing-types";
import { PROJECTS_DISPLAY_LIMIT } from "@/lib/projects-display";
import Project from "@/models/Project";
import { serializeId } from "./serialize";

// TODO: add manual `order` field (like Service) so the client can pin homepage project sequence.
const SORT = { createdAt: -1 as const };

export { PROJECTS_DISPLAY_LIMIT };

function toProjectItem(raw: Record<string, unknown>): ProjectItem {
  const row = serializeId(raw as { _id: string } & Record<string, unknown>);
  return {
    _id: row._id as string,
    title: String(row.title ?? ""),
    description: row.description ? String(row.description) : undefined,
    videoSource: row.videoSource as ProjectItem["videoSource"],
    videoUrl: String(row.videoUrl ?? ""),
    thumbnail: String(row.thumbnail ?? ""),
    category: String(row.category ?? "General"),
  };
}

function paginatedDemo(page: number, pageSize: number): ProjectsPage {
  const total = demoProjects.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const items = demoProjects.slice(start, start + pageSize).map((p) => toProjectItem(p));
  return { items, total, page: safePage, pageSize, totalPages };
}

export async function listProjects(options?: {
  page?: number;
  pageSize?: number;
  limit?: number;
}): Promise<ProjectItem[] | ProjectsPage> {
  const fallback = useDemoContentFallback();
  const page = options?.page;
  const pageSize = options?.pageSize ?? 5;
  const limit = options?.limit;
  const wantsPage = page !== undefined;

  try {
    await connectDB();
    const total = await Project.countDocuments();

    if (total === 0 && fallback) {
      if (wantsPage) return paginatedDemo(page, pageSize);
      if (limit !== undefined) {
        return demoProjects.slice(0, limit).map((p) => toProjectItem(p));
      }
      return demoProjects.map((p) => toProjectItem(p));
    }

    if (wantsPage) {
      const totalPages = Math.max(1, Math.ceil(total / pageSize));
      const safePage = Math.min(Math.max(1, page), totalPages);
      const skip = (safePage - 1) * pageSize;
      const docs = await Project.find().sort(SORT).skip(skip).limit(pageSize).lean();
      return {
        items: docs.map((d) => toProjectItem(d as Record<string, unknown>)),
        total,
        page: safePage,
        pageSize,
        totalPages,
      };
    }

    const query = Project.find().sort(SORT);
    if (limit !== undefined) query.limit(limit);
    const docs = await query.lean();
    return docs.map((d) => toProjectItem(d as Record<string, unknown>));
  } catch (e) {
    console.error("[data/projects] listProjects failed:", e);
    if (fallback) {
      if (wantsPage) return paginatedDemo(page!, pageSize);
      const all = demoProjects.map((p) => toProjectItem(p));
      return limit !== undefined ? all.slice(0, limit) : all;
    }
    if (wantsPage) {
      return { items: [], total: 0, page: 1, pageSize, totalPages: 1 };
    }
    return [];
  }
}

export async function getProjectsForLanding(): Promise<{
  items: ProjectItem[];
  total: number;
}> {
  try {
    await connectDB();
    const total = await Project.countDocuments();
    if (total === 0) {
      return { items: [], total: 0 };
    }
    const docs = await Project.find().sort(SORT).limit(PROJECTS_DISPLAY_LIMIT).lean();
    return {
      items: docs.map((d) => toProjectItem(d as Record<string, unknown>)),
      total,
    };
  } catch (e) {
    console.error("[data/projects] getProjectsForLanding failed:", e);
    return { items: [], total: 0 };
  }
}

export async function countProjects(): Promise<number> {
  try {
    await connectDB();
    return Project.countDocuments();
  } catch (e) {
    console.error("[data/projects] countProjects failed:", e);
    return 0;
  }
}
