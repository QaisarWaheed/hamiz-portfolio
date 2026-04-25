"use client";

import VideoModal from "@/components/VideoModal";
import type { ProjectItem, ProjectsPage } from "@/lib/landing-types";
import { useCallback, useEffect, useState } from "react";

const PAGE_SIZE = 5;

function isProjectsPage(data: unknown): data is ProjectsPage {
  return (
    typeof data === "object" &&
    data !== null &&
    "items" in data &&
    Array.isArray((data as ProjectsPage).items) &&
    typeof (data as ProjectsPage).total === "number" &&
    typeof (data as ProjectsPage).page === "number"
  );
}

function youtubeIdFromUrl(url: string): string | null {
  const raw = url.trim();
  if (!raw) return null;
  const match = raw.match(
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtu\.be\/)([\w-]{11})/
  );
  return match?.[1] ?? null;
}

function normalizeThumbUrl(thumbnail: string, videoUrl: string): string {
  const t = thumbnail.trim();
  const anWebp = t.match(/i\.ytimg\.com\/an_webp\/([\w-]{11})\//i);
  if (anWebp?.[1]) {
    return `https://i.ytimg.com/vi/${anWebp[1]}/hqdefault.jpg`;
  }
  if (t) return t;
  const yt = youtubeIdFromUrl(videoUrl);
  if (yt) return `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`;
  return "";
}

export default function V2Work() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<ProjectsPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [modal, setModal] = useState<{
    title: string;
    videoUrl: string;
    description?: string;
    category?: string;
  } | null>(null);

  const load = useCallback(async (p: number) => {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch(`/api/projects?page=${p}&limit=${PAGE_SIZE}`, { cache: "no-store" });
      const json: unknown = await res.json();
      if (!res.ok) {
        setErr("Could not load portfolio.");
        setData(null);
        return;
      }
      if (!isProjectsPage(json)) {
        setErr("Unexpected response.");
        setData(null);
        return;
      }
      setData(json);
      if (json.page !== p) setPage(json.page);
    } catch {
      setErr("Could not load portfolio.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(page);
  }, [load, page]);

  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.total ?? 0;

  return (
    <section id="work">
      <div className="v2-container">
        <div className="work__head">
          <h2 className="reveal">
            Recent <span className="italic">work.</span>
          </h2>
        </div>

        {loading ? (
          <p className="mono work__status reveal" style={{ fontSize: 12, letterSpacing: "0.08em", color: "var(--text-dim)" }}>
            Loading portfolio…
          </p>
        ) : err ? (
          <p className="mono work__status reveal" style={{ fontSize: 12, letterSpacing: "0.08em", color: "var(--text-dim)" }}>
            {err}
          </p>
        ) : items.length === 0 ? (
          <p className="mono work__status reveal" style={{ fontSize: 12, letterSpacing: "0.08em", color: "var(--text-dim)" }}>
            New pieces coming soon.
          </p>
        ) : (
          <>
            <div className="work__grid">
              {items.map((p: ProjectItem, i: number) => {
                const thumb = normalizeThumbUrl(p.thumbnail ?? "", p.videoUrl ?? "");
                return (
                  <button
                    key={p._id}
                    type="button"
                    className="tile reveal text-left"
                    onClick={() =>
                      setModal({
                        title: p.title,
                        videoUrl: p.videoUrl,
                        description: p.description,
                        category: p.category,
                      })
                    }
                  >
                    <div
                      className="tile__thumb"
                      style={thumb ? { backgroundImage: `url(${thumb})` } : undefined}
                      aria-hidden
                    />
                    <div className="tile__meta">
                      <div className="tile__title">{p.title}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {totalPages > 1 ? (
              <nav className="work__pager reveal" aria-label="Portfolio pages">
                <button
                  type="button"
                  className="work__pager-btn"
                  disabled={data!.page <= 1}
                  onClick={() => setPage((x) => Math.max(1, x - 1))}
                >
                  Prev
                </button>
                <span className="work__pager-meta mono">
                  Page {data!.page} / {totalPages}
                  <span className="work__pager-dot" aria-hidden>
                    ·
                  </span>
                  {total} {total === 1 ? "piece" : "pieces"}
                </span>
                <button
                  type="button"
                  className="work__pager-btn"
                  disabled={data!.page >= totalPages}
                  onClick={() => setPage((x) => x + 1)}
                >
                  Next
                </button>
              </nav>
            ) : null}
          </>
        )}
      </div>

      <VideoModal
        open={modal !== null}
        onClose={() => setModal(null)}
        title={modal?.title ?? ""}
        videoUrl={modal?.videoUrl ?? ""}
        description={modal?.description ?? ""}
        category={modal?.category ?? ""}
      />
    </section>
  );
}
