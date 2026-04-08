import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Testimonial from "@/models/Testimonial";
import { requireAdmin } from "@/lib/auth";
import mongoose from "mongoose";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  role: z.string().optional(),
  message: z.string().min(1).optional(),
});

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: Request, ctx: Ctx) {
  try {
    await requireAdmin();
    const { id } = await ctx.params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const json: unknown = await req.json();
    const parsed = updateSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    await connectDB();
    const doc = await Testimonial.findByIdAndUpdate(id, parsed.data, { new: true });
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(doc.toObject());
  } catch (e) {
    if (e instanceof Response) return e;
    console.error(e);
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, ctx: Ctx) {
  try {
    await requireAdmin();
    const { id } = await ctx.params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    await connectDB();
    const res = await Testimonial.findByIdAndDelete(id);
    if (!res) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof Response) return e;
    console.error(e);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
