/** Shared video URL parsing for service previews and project VideoModal. */

export type ParsedVideoRef =
  | { provider: "youtube"; id: string }
  | { provider: "vimeo"; id: string }
  | { provider: "file"; src: string };

export type ParsedServiceVideo =
  | { kind: "iframe"; src: string }
  | { kind: "video"; src: string };

export function parseVideoRef(url: string): ParsedVideoRef | null {
  const raw = url.trim();
  if (!raw) return null;

  const yt = raw.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/
  );
  if (yt) return { provider: "youtube", id: yt[1] };

  const vm = raw.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return { provider: "vimeo", id: vm[1] };

  if (/^https?:\/\//i.test(raw)) return { provider: "file", src: raw };

  return null;
}

/** Silent looping embed / direct URL for service preview videos. */
export function parseServiceVideo(url: string): ParsedServiceVideo | null {
  const ref = parseVideoRef(url);
  if (!ref) return null;

  if (ref.provider === "youtube") {
    const id = ref.id;
    return {
      kind: "iframe",
      src: `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&playsinline=1&controls=0&modestbranding=1`,
    };
  }

  if (ref.provider === "vimeo") {
    return {
      kind: "iframe",
      src: `https://player.vimeo.com/video/${ref.id}?autoplay=1&muted=1&loop=1&background=1`,
    };
  }

  return { kind: "video", src: ref.src };
}

/** Project / portfolio modal: autoplay with controls (YouTube, Vimeo, or file). */
export function parseModalVideo(url: string): ParsedServiceVideo | null {
  const ref = parseVideoRef(url);
  if (!ref) return null;

  if (ref.provider === "youtube") {
    return {
      kind: "iframe",
      src: `https://www.youtube.com/embed/${ref.id}?autoplay=1`,
    };
  }

  if (ref.provider === "vimeo") {
    return {
      kind: "iframe",
      src: `https://player.vimeo.com/video/${ref.id}?autoplay=1`,
    };
  }

  // Cloudinary video delivery URLs often omit a file extension
  const isPlayableFile =
    /\.(mp4|webm|ogg|mov)(\?|$)/i.test(ref.src) ||
    /res\.cloudinary\.com\/.+\/video\/upload\//i.test(ref.src);

  if (isPlayableFile) return { kind: "video", src: ref.src };

  return null;
}
