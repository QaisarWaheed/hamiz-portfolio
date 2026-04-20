"use client";

import { useEffect, useState } from "react";
import { parseServiceVideo } from "@/lib/service-video";
import type { ProjectItem } from "@/lib/landing-types";

function VideoPeek({ videoUrl }: { videoUrl: string }) {
  const parsed = parseServiceVideo(videoUrl);
  if (!parsed) return null;
  if (parsed.kind === "iframe") {
    return (
      <iframe
        src={parsed.src}
        title="Latest edit preview"
        className="hero-video-peek-media"
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  }
  return (
    <video
      src={parsed.src}
      className="hero-video-peek-media"
      muted
      loop
      autoPlay
      playsInline
      preload="metadata"
    />
  );
}

export default function HeroBottomStats() {
  const [latestVideoUrl, setLatestVideoUrl] = useState<string | null>(null);
  const [over, setOver] = useState(false);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const envFallback = process.env.NEXT_PUBLIC_HERO_PREVIEW_VIDEO_URL?.trim() ?? "";

    (async () => {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        const data = (await res.json()) as ProjectItem[] | { error?: string };
        if (cancelled) return;
        if (!Array.isArray(data) || data.length === 0) {
          if (envFallback) setLatestVideoUrl(envFallback);
          return;
        }
        const url = (data[0].videoUrl ?? "").trim();
        if (url) setLatestVideoUrl(url);
        else if (envFallback) setLatestVideoUrl(envFallback);
      } catch {
        if (!cancelled && envFallback) setLatestVideoUrl(envFallback);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const showPeek = over || pinned;
  const hasVideo = Boolean(latestVideoUrl && parseServiceVideo(latestVideoUrl));

  return (
    <div className="hero-bottom">
      <div className="hero-stat-card">
        <div className="stat-title">60–90 min</div>
        <p className="mono stat-desc">
          Long-form runtime I regularly cut — not clips, not reels.
        </p>
      </div>

      <div
        className={`hero-stat-card${hasVideo ? " hero-stat-card--peek" : ""}${showPeek ? " is-open" : ""}`}
        onMouseEnter={() => hasVideo && setOver(true)}
        onMouseLeave={() => setOver(false)}
        onClick={() => {
          if (!hasVideo) return;
          setPinned((p) => !p);
        }}
        role={hasVideo ? "button" : undefined}
        tabIndex={hasVideo ? 0 : undefined}
        aria-expanded={hasVideo ? showPeek : undefined}
        aria-label={hasVideo ? "Show latest edit preview" : undefined}
        onKeyDown={(e) => {
          if (!hasVideo) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setPinned((p) => !p);
          }
        }}
      >
        {hasVideo && latestVideoUrl && showPeek ? (
          <div className="hero-video-peek">
            <VideoPeek videoUrl={latestVideoUrl} />
          </div>
        ) : null}
        <div className="stat-title">Justin Skycak • [GUEST 2]</div>
        <p className="mono stat-desc">Recent interview guests I&apos;ve cut episodes with.</p>
        {hasVideo ? (
          <span className="hero-peek-hint mono">Hover or click to preview latest cut</span>
        ) : null}
      </div>

      <div className="hero-stat-card">
        <div className="stat-title">100% JSS</div>
        <p className="mono stat-desc">
          Upwork Job Success Score, held across the platform and client relationships with 5 stars.
        </p>
      </div>
    </div>
  );
}
