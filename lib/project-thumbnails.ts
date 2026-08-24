/** YouTube / thumbnail URL helpers for project cards. */

const YT_ID =
  /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtu\.be\/)([\w-]{11})/;
const YT_IMG_ID = /i\.ytimg\.com\/(?:vi|an_webp)\/([\w-]{11})\//i;

/** YouTube serves this tiny grey JPEG when maxresdefault is missing (often with HTTP 200). */
const MAXRES_PLACEHOLDER_W = 120;
const MAXRES_PLACEHOLDER_H = 90;

export function youtubeIdFromUrl(url: string): string | null {
  const raw = url.trim();
  if (!raw) return null;
  return raw.match(YT_ID)?.[1] ?? null;
}

export function youtubeIdFromThumbnail(url: string): string | null {
  const raw = url.trim();
  if (!raw) return null;
  return raw.match(YT_IMG_ID)?.[1] ?? null;
}

export function youtubeThumbMaxres(id: string): string {
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}

export function youtubeThumbMq(id: string): string {
  return `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;
}

/** Read width/height from a JPEG buffer (SOF0/SOF2). */
export function jpegDimensions(buf: Uint8Array): { width: number; height: number } | null {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let i = 2;
  while (i < buf.length - 8) {
    if (buf[i] !== 0xff) {
      i += 1;
      continue;
    }
    const marker = buf[i + 1];
    if (marker === 0xd9 || marker === 0xda) break;
    const len = (buf[i + 2] << 8) | buf[i + 3];
    if (len < 2) break;
    // SOF0 baseline / SOF2 progressive
    if (marker === 0xc0 || marker === 0xc2) {
      const height = (buf[i + 5] << 8) | buf[i + 6];
      const width = (buf[i + 7] << 8) | buf[i + 8];
      return { width, height };
    }
    i += 2 + len;
  }
  return null;
}

function isMaxresPlaceholder(dims: { width: number; height: number } | null): boolean {
  return (
    !!dims && dims.width === MAXRES_PLACEHOLDER_W && dims.height === MAXRES_PLACEHOLDER_H
  );
}

/**
 * Prefer maxresdefault (true 16:9). Fall back to mqdefault when maxres is missing.
 *
 * Detection: GET maxresdefault.jpg — reject on non-OK HTTP status, or when the body is
 * YouTube's known 120×90 grey placeholder (returned as 200 for some videos).
 */
export async function resolveYoutubeThumbnailUrl(id: string): Promise<{
  url: string;
  tier: "maxresdefault" | "mqdefault";
  reason?: string;
}> {
  const maxres = youtubeThumbMaxres(id);
  const mq = youtubeThumbMq(id);

  try {
    const res = await fetch(maxres, {
      // Cache per video id so landing/work ISR does not re-hit YouTube every request.
      next: { revalidate: 86400, tags: [`yt-thumb-${id}`] },
    });
    if (!res.ok) {
      return { url: mq, tier: "mqdefault", reason: `maxres HTTP ${res.status}` };
    }
    const buf = new Uint8Array(await res.arrayBuffer());
    const dims = jpegDimensions(buf);
    if (isMaxresPlaceholder(dims)) {
      return {
        url: mq,
        tier: "mqdefault",
        reason: `maxres placeholder ${dims?.width}x${dims?.height}`,
      };
    }
    return { url: maxres, tier: "maxresdefault" };
  } catch (e) {
    console.error("[project-thumbnails] maxres fetch failed:", e);
    return { url: mq, tier: "mqdefault", reason: "maxres fetch error" };
  }
}

/**
 * Normalize a project thumbnail for public display.
 * YouTube → maxresdefault with mqdefault fallback. Non-YouTube URLs pass through.
 */
export async function resolveProjectThumbnail(
  thumbnail: string,
  videoUrl: string
): Promise<string> {
  const t = (thumbnail ?? "").trim();
  const id = youtubeIdFromThumbnail(t) ?? youtubeIdFromUrl(videoUrl ?? "");
  if (!id) return t;

  const resolved = await resolveYoutubeThumbnailUrl(id);
  return resolved.url;
}

/**
 * @deprecated Prefer resolveProjectThumbnail in the data layer.
 * Sync helper kept for any leftover call sites — maps to maxres URL without probing.
 */
export function normalizeThumbUrl(thumbnail: string, videoUrl: string): string {
  const t = (thumbnail ?? "").trim();
  const id = youtubeIdFromThumbnail(t) ?? youtubeIdFromUrl(videoUrl ?? "");
  if (id) return youtubeThumbMaxres(id);
  return t;
}
