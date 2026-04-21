import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { formatCloudinaryUploadError, uploadThumbnailBuffer, uploadVideoBuffer } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const form = await req.formData();
    const file = form.get("file");
    const kind = form.get("kind");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }
    const buf = Buffer.from(await file.arrayBuffer());
    const scope = form.get("scope");
    const videoFolder =
      scope === "project" ? "hamiz-portfolio/project-videos" : "hamiz-portfolio/service-videos";
    const { secure_url } =
      kind === "video" ? await uploadVideoBuffer(buf, videoFolder) : await uploadThumbnailBuffer(buf);
    return NextResponse.json({ url: secure_url });
  } catch (e) {
    if (e instanceof Response) return e;
    console.error(e);
    const msg = formatCloudinaryUploadError(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
