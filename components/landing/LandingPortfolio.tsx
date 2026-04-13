"use client";

import { useEffect, useState } from "react";
import VideoModal from "@/components/VideoModal";

export type ProjectItem = {
  _id: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnail: string;
  category: string;
};

export default function LandingPortfolio() {
  const [items, setItems] = useState<ProjectItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<ProjectItem | null>(null);

  useEffect(() => {
    let c = false;
    (async () => {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        if (!res.ok) throw new Error("Could not load portfolio");
        const data = (await res.json()) as ProjectItem[];
        if (!c) setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!c) setError(e instanceof Error ? e.message : "Error");
      }
    })();
    return () => {
      c = true;
    };
  }, []);

  const placeholders: ProjectItem[] = [
    {
      _id: "p1",
      title: "[SAMPLE] The Strait of Hormuz",
      category: "Geopolitical Doc · 18min",
      videoUrl: "#",
      thumbnail: "",
    },
    {
      _id: "p2",
      title: "[SAMPLE] Charles Sobhraj",
      category: "True-Crime Doc · 24min",
      videoUrl: "#",
      thumbnail: "",
    },
    {
      _id: "p3",
      title: "[SAMPLE] Math Academy — Interview",
      category: "Long-form Interview · 52min",
      videoUrl: "#",
      thumbnail: "",
    },
    {
      _id: "p4",
      title: "[SAMPLE] NFL Fanbases Explained",
      category: "Video Essay · 16min",
      videoUrl: "#",
      thumbnail: "",
    },
  ];

  const grid = items && items.length ? items.slice(0, 4) : placeholders;
  const grad = ["ed-ph-w1", "ed-ph-w2", "ed-ph-w3", "ed-ph-w4"] as const;

  return (
    <section className="ed-section" id="work">
      <div className="wrap">
        <div className="ed-section-head">
          <h2 className="display">
            Selected <em>work.</em>
          </h2>
          <div className="side">
            A small sample. Full portfolio and private links available on request.
          </div>
        </div>

        {error && (
          <p className="mb-6 text-sm text-red-300/90" role="alert">
            {error}
          </p>
        )}

        <div className="ed-portfolio-grid">
          {grid.map((item, i) => (
            <div
              key={item._id}
              className="ed-work"
              role="button"
              tabIndex={0}
              onClick={() => {
                if (item.videoUrl && item.videoUrl !== "#") setModal(item);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (item.videoUrl && item.videoUrl !== "#") setModal(item);
                }
              }}
            >
              <div
                className={`ed-work-thumb ${!item.thumbnail ? grad[i % 4] : ""}`}
                style={
                  item.thumbnail
                    ? { backgroundImage: `url(${item.thumbnail})` }
                    : undefined
                }
              />
              <div className="ed-work-info">
                <div className="title">{item.title}</div>
                <div className="cat">{item.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <VideoModal
        open={modal !== null}
        onClose={() => setModal(null)}
        title={modal?.title ?? ""}
        videoUrl={modal?.videoUrl ?? ""}
      />
    </section>
  );
}
