/** Browser-side signed upload to Cloudinary (bypasses Vercel body limits). */

export const CLOUDINARY_FREE_VIDEO_MAX_BYTES = 104_857_600;

export type VideoSignResponse = {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  folder: string;
  resource_type: "video";
  uploadUrl: string;
};

export type VideoUploadProgress = {
  /** 0–100 from real XHR loaded/total bytes */
  percent: number;
  loaded: number;
  total: number;
};

export class VideoUploadAbortedError extends Error {
  constructor() {
    super("Upload cancelled.");
    this.name = "VideoUploadAbortedError";
  }
}

export function validateVideoFile(file: File): string | null {
  if (!file.type.startsWith("video/")) {
    return "Only video files are allowed. Choose an MP4, WebM, MOV, or similar video.";
  }
  if (file.size > CLOUDINARY_FREE_VIDEO_MAX_BYTES) {
    return (
      `This file is ${formatBytes(file.size)}, over the 100 MB Cloudinary Free upload limit ` +
      `(104857600 bytes). For larger videos, switch Video to “External URL” and paste a YouTube, ` +
      `Vimeo, or direct file link instead.`
    );
  }
  return null;
}

export function formatBytes(n: number): string {
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export type DirectVideoUploadHandle = {
  promise: Promise<string>;
  abort: () => void;
};

/**
 * Starts a signed direct-to-Cloudinary video upload.
 * Progress uses XHR `upload.onprogress` (real bytes sent / total).
 * Call `abort()` to cancel mid-flight (aborts the XHR).
 */
export function startVideoUploadDirectToCloudinary(
  file: File,
  scope: "project" | "service",
  onProgress?: (progress: VideoUploadProgress) => void
): DirectVideoUploadHandle {
  let xhr: XMLHttpRequest | null = null;
  let aborted = false;

  const promise = (async () => {
    const validationError = validateVideoFile(file);
    if (validationError) throw new Error(validationError);

    const signRes = await fetch("/api/upload/video-sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scope }),
    });
    if (aborted) throw new VideoUploadAbortedError();
    const signJson = (await signRes.json()) as VideoSignResponse & { error?: string };
    if (!signRes.ok) throw new Error(signJson.error ?? "Could not get upload signature");

    const fd = new FormData();
    fd.set("file", file);
    fd.set("api_key", signJson.apiKey);
    fd.set("timestamp", String(signJson.timestamp));
    fd.set("signature", signJson.signature);
    fd.set("folder", signJson.folder);

    return await new Promise<string>((resolve, reject) => {
      if (aborted) {
        reject(new VideoUploadAbortedError());
        return;
      }
      xhr = new XMLHttpRequest();
      xhr.open("POST", signJson.uploadUrl);
      xhr.upload.onprogress = (ev) => {
        if (!ev.lengthComputable || !onProgress) return;
        const percent = Math.min(99, Math.round((ev.loaded / ev.total) * 100));
        onProgress({ percent, loaded: ev.loaded, total: ev.total });
      };
      xhr.onload = () => {
        try {
          const data = JSON.parse(xhr!.responseText) as {
            secure_url?: string;
            error?: { message?: string };
          };
          if (xhr!.status >= 200 && xhr!.status < 300 && data.secure_url) {
            onProgress?.({ percent: 100, loaded: file.size, total: file.size });
            resolve(data.secure_url);
            return;
          }
          reject(new Error(data.error?.message ?? `Cloudinary upload failed (${xhr!.status})`));
        } catch {
          reject(new Error(`Cloudinary upload failed (${xhr!.status})`));
        }
      };
      xhr.onerror = () => reject(new Error("Network error during Cloudinary upload"));
      xhr.onabort = () => reject(new VideoUploadAbortedError());
      xhr.send(fd);
    });
  })();

  return {
    promise,
    abort: () => {
      aborted = true;
      xhr?.abort();
    },
  };
}
