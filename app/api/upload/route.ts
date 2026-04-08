import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { uploadThumbnailBuffer } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }
    const buf = Buffer.from(await file.arrayBuffer());
    const { secure_url } = await uploadThumbnailBuffer(buf);
    return NextResponse.json({ url: secure_url });
  } catch (e) {
    if (e instanceof Response) return e;
    console.error(e);
    const msg = e instanceof Error ? e.message : "Upload failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
