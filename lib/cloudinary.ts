import { v2 as cloudinary } from "cloudinary";

export function configureCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary env vars are not fully configured");
  }
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
  return cloudinary;
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
