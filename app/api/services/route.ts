import { listServices, replaceAllServices } from "@/lib/data/services";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";

const serviceSchema = z.object({
  _id: z.string().optional(),
  order: z.number(),
  num: z.string().min(1).max(20),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(8000),
  videoSource: z
    .string()
    .optional()
    .transform((s) => (s === "link" || s === "upload" ? s : "none")),
  videoUrl: z.string().max(2000).optional().transform((s) => s ?? ""),
});

const putSchema = z.object({ services: z.array(serviceSchema) });

export async function GET() {
  try {
    const rows = await listServices();
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
    const rows = await replaceAllServices(parsed.data.services);
    return NextResponse.json(rows);
  } catch (e) {
    if (e instanceof Response) return e;
    return NextResponse.json({ error: "Could not save services" }, { status: 500 });
  }
}
