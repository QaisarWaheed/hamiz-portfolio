import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getOrCreateAbout } from "@/models/About";
import { z } from "zod";

const updateSchema = z.object({
  headline: z.string().optional(),
  bio: z.string().optional(),
  email: z.union([z.string().email(), z.literal("")]).optional(),
  instagram: z.string().optional(),
  youtube: z.string().optional(),
});

export async function GET() {
  try {
    const doc = await getOrCreateAbout();
    return NextResponse.json(doc.toObject());
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to load about" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await requireAdmin();
    const json: unknown = await req.json();
    const parsed = updateSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    const doc = await getOrCreateAbout();
    Object.assign(doc, parsed.data);
    await doc.save();
    return NextResponse.json(doc.toObject());
  } catch (e) {
    if (e instanceof Response) return e;
    console.error(e);
    return NextResponse.json({ error: "Failed to update about" }, { status: 500 });
  }
}
