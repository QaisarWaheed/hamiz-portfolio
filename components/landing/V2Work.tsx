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

export default function V2Work() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<ProjectsPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [modal, setModal] = useState<{ title: string; videoUrl: string } | null>(null);

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
                const n = (data!.page - 1) * PAGE_SIZE + i + 1;
                const indexLabel = `[${String(n).padStart(2, "0")}]`;
                const caption = [p.category, p.description?.trim()].filter(Boolean).join(" · ") || p.category;
                return (
                  <button
                    key={p._id}
                    type="button"
                    className="tile reveal text-left"
                    onClick={() => setModal({ title: p.title, videoUrl: p.videoUrl })}
                  >
                    <div
                      className="tile__thumb"
                      style={{ backgroundImage: `url(${p.thumbnail})` }}
                      aria-hidden
                    />
                    <div className="tile__index">{indexLabel}</div>
                    <div className="tile__meta">
                      <div className="tile__title">{p.title}</div>
                      <div className="tile__caption">{caption}</div>
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
      />
    </section>
  );
}
