import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { formatCloudinaryUploadError, uploadThumbnailBuffer } from "@/lib/cloudinary";

/** Image / thumbnail upload only. Videos use signed direct upload via /api/upload/video-sign. */
export async function POST(req: Request) {
  try {
    await requireAdmin();
    const form = await req.formData();
    const file = form.get("file");
    const kind = form.get("kind");
    if (kind === "video") {
      return NextResponse.json(
        {
          error:
            "Video uploads must go direct to Cloudinary. Request a signature from /api/upload/video-sign first.",
        },
        { status: 400 }
      );
    }
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }
    const buf = Buffer.from(await file.arrayBuffer());
    const { secure_url } = await uploadThumbnailBuffer(buf);
    return NextResponse.json({ url: secure_url });
  } catch (e) {
    if (e instanceof Response) return e;
    console.error(e);
    const msg = formatCloudinaryUploadError(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
