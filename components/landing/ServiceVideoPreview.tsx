import { parseServiceVideo } from "@/lib/service-video";

export default function ServiceVideoPreview({ videoUrl }: { videoUrl: string }) {
  const parsed = parseServiceVideo(videoUrl);
  if (!parsed) return null;

  if (parsed.kind === "iframe") {
    return (
      <div className="service-video-frame">
        <iframe
          src={parsed.src}
          title="Service sample preview"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  return (
    <div className="service-video-frame">
      <video src={parsed.src} muted loop autoPlay playsInline preload="metadata" />
    </div>
  );
}
