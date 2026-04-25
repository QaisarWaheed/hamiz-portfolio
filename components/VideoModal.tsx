"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo } from "react";

export type VideoModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  videoUrl: string;
  description?: string;
  category?: string;
};

function youtubeEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") {
      const id = u.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : null;
    }
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}?autoplay=1`;
      const parts = u.pathname.split("/").filter(Boolean);
      if (parts[0] === "embed" && parts[1]) {
        return `https://www.youtube.com/embed/${parts[1]}?autoplay=1`;
      }
    }
  } catch {
    return null;
  }
  return null;
}

export default function VideoModal({
  open,
  onClose,
  title,
  videoUrl,
  description = "",
  category = "",
}: VideoModalProps) {
  const embed = useMemo(() => youtubeEmbed(videoUrl), [videoUrl]);
  const isDirect =
    !embed &&
    (/\.(mp4|webm|ogg|mov)(\?|$)/i.test(videoUrl) ||
      /res\.cloudinary\.com\/.+\/video\/upload\//i.test(videoUrl));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            aria-label="Close video"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="relative z-[1] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-canvas shadow-[var(--shadow-glow)] ring-1 ring-accent/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
              <p className="truncate text-sm font-medium text-main">{title}</p>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-white/10 px-3 py-1 text-xs text-muted transition hover:border-accent/40 hover:text-main"
              >
                Close
              </button>
            </div>
            <div className="relative aspect-video bg-black">
              {embed ? (
                <iframe
                  title={title}
                  src={embed}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : isDirect ? (
                <video
                  className="h-full w-full"
                  src={videoUrl}
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center text-sm text-muted">
                  <p>This URL cannot be played inline. Open it externally:</p>
                  <a
                    href={videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline"
                  >
                    {videoUrl}
                  </a>
                </div>
              )}
            </div>
            {(description.trim() || category.trim()) && (
              <div className="space-y-2 border-t border-white/10 px-4 py-4 sm:px-5">
                {category.trim() ? (
                  <p className="text-xs uppercase tracking-[0.12em] text-muted">{category}</p>
                ) : null}
                {description.trim() ? (
                  <p className="text-sm leading-relaxed text-main/90">{description}</p>
                ) : null}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
