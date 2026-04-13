import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import PricingTier from "@/models/PricingTier";

const tierSchema = z.object({
  order: z.number(),
  name: z.string().min(1).max(120),
  who: z.string().max(300),
  priceAmt: z.string().max(80),
  priceUnit: z.string().max(120),
  featured: z.boolean(),
  badge: z.string().max(80),
  features: z.array(z.string().max(500)),
  bookLabel: z.string().max(80),
});

const putSchema = z.object({ tiers: z.array(tierSchema) });

export async function GET() {
  try {
    await connectDB();
    const rows = await PricingTier.find().sort({ order: 1, createdAt: 1 }).lean();
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json({ error: "Could not load pricing" }, { status: 500 });
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
    await PricingTier.deleteMany({});
    if (parsed.data.tiers.length) {
      await PricingTier.insertMany(
        parsed.data.tiers.map((t, i) => ({
          order: t.order ?? i,
          name: t.name,
          who: t.who,
          priceAmt: t.priceAmt,
          priceUnit: t.priceUnit,
          featured: t.featured,
          badge: t.badge,
          features: t.features,
          bookLabel: t.bookLabel,
        }))
      );
    }
    const rows = await PricingTier.find().sort({ order: 1, createdAt: 1 }).lean();
    return NextResponse.json(rows);
  } catch (e) {
    if (e instanceof Response) return e;
    return NextResponse.json({ error: "Could not save pricing" }, { status: 500 });
  }
}
