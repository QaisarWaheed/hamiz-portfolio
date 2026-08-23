export function youtubeIdFromUrl(url: string): string | null {
  const raw = url.trim();
  if (!raw) return null;
  const match = raw.match(
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtu\.be\/)([\w-]{11})/
  );
  return match?.[1] ?? null;
}

export function normalizeThumbUrl(thumbnail: string, videoUrl: string): string {
  const t = (thumbnail ?? "").trim();
  const anWebp = t.match(/i\.ytimg\.com\/an_webp\/([\w-]{11})\//i);
  if (anWebp?.[1]) {
    return `https://i.ytimg.com/vi/${anWebp[1]}/hqdefault.jpg`;
  }
  if (t) return t;
  const yt = youtubeIdFromUrl(videoUrl ?? "");
  if (yt) return `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`;
  return "";
}
