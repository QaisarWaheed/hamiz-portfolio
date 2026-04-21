import { v2 as cloudinary } from "cloudinary";

const PLACEHOLDER_CLOUD_NAMES = new Set([
  "",
  "cloudinary",
  "your_cloud_name",
  "your-cloud-name",
  "my_cloud_name",
  "<cloud_name>",
]);

export function configureCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Cloudinary env vars are missing. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env"
    );
  }
  if (PLACEHOLDER_CLOUD_NAMES.has(cloudName.toLowerCase())) {
    throw new Error(
      "CLOUDINARY_CLOUD_NAME is still a placeholder. In the Cloudinary console, copy your real cloud name from the dashboard (it is a short id like “dxxxx” — not the word “cloudinary”)."
    );
  }
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
  return cloudinary;
}

/** Turn Cloudinary SDK / HTTP errors into a safe message for the client. */
export function formatCloudinaryUploadError(err: unknown): string {
  if (err && typeof err === "object" && "message" in err) {
    const msg = String((err as { message: unknown }).message);
    const code =
      "http_code" in err && typeof (err as { http_code: unknown }).http_code === "number"
        ? (err as { http_code: number }).http_code
        : undefined;
    if (code === 401 || /invalid cloud_name|invalid api_key|401/i.test(msg)) {
      return (
        "Cloudinary rejected the credentials. CLOUDINARY_CLOUD_NAME must be the Cloud name from the main dashboard (Product environment credentials), not the Key name label on the API Keys page. " +
        "CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET must be the numeric key and secret from that same environment. Restart the dev server after editing .env."
      );
    }
    if (msg && msg !== "[object Object]") return msg;
  }
  if (err instanceof Error && err.message) return err.message;
  return "Upload failed";
}

export async function uploadThumbnailBuffer(
  buffer: Buffer,
  folder = "hamiz-portfolio/thumbnails"
): Promise<{ secure_url: string }> {
  const c = configureCloudinary();
  return new Promise((resolve, reject) => {
    const stream = c.uploader.upload_stream(
      { folder, resource_type: "image" },
      (err, result) => {
        if (err || !result?.secure_url) reject(err ?? new Error("Upload failed"));
        else resolve({ secure_url: result.secure_url });
      }
    );
    stream.end(buffer);
  });
}

export async function uploadVideoBuffer(
  buffer: Buffer,
  folder = "hamiz-portfolio/service-videos"
): Promise<{ secure_url: string }> {
  const c = configureCloudinary();
  return new Promise((resolve, reject) => {
    const stream = c.uploader.upload_stream(
      { folder, resource_type: "video" },
      (err, result) => {
        if (err || !result?.secure_url) reject(err ?? new Error("Upload failed"));
        else resolve({ secure_url: result.secure_url });
      }
    );
    stream.end(buffer);
  });
}
