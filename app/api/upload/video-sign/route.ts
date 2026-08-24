import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import {
  PROJECT_VIDEO_FOLDER,
  SERVICE_VIDEO_FOLDER,
  createVideoUploadSignature,
} from "@/lib/cloudinary";

/**
 * Returns a Cloudinary upload signature for VIDEO only.
 * The browser POSTs the file directly to Cloudinary — this route never receives the file.
 */
export async function POST(req: Request) {
  try {
    await requireAdmin();
    let scope = "service";
    try {
      const body = (await req.json()) as { scope?: string };
      if (body.scope === "project" || body.scope === "service") scope = body.scope;
    } catch {
      // empty body → service folder (legacy callers)
    }
    const folder = scope === "project" ? PROJECT_VIDEO_FOLDER : SERVICE_VIDEO_FOLDER;
    return NextResponse.json(createVideoUploadSignature(folder));
  } catch (e) {
    if (e instanceof Response) return e;
    console.error("video-sign failed", e);
    const message = e instanceof Error ? e.message : "Could not create upload signature";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
