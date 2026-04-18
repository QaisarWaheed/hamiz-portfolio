/** Build silent looping embed / direct URL for service preview videos. */

export type ParsedServiceVideo =
  | { kind: "iframe"; src: string }
  | { kind: "video"; src: string };

export function parseServiceVideo(url: string): ParsedServiceVideo | null {
  const raw = url.trim();
  if (!raw) return null;

  const yt = raw.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/);
  if (yt) {
    const id = yt[1];
    const src = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&playsinline=1&controls=0&modestbranding=1`;
    return { kind: "iframe", src };
  }

  const vm = raw.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) {
    const id = vm[1];
    const src = `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&background=1`;
    return { kind: "iframe", src };
  }

  if (/^https?:\/\//i.test(raw)) {
    return { kind: "video", src: raw };
  }

  return null;
}
