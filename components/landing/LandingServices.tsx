"use client";

import { useEffect, useState } from "react";
import ServiceVideoPreview from "@/components/landing/ServiceVideoPreview";
import { defaultServices } from "@/lib/landing-defaults";
import type { ServiceRow } from "@/lib/landing-types";

function normalize(s: ServiceRow): ServiceRow {
  const src = s.videoSource === "link" || s.videoSource === "upload" ? s.videoSource : "none";
  return {
    ...s,
    videoSource: src,
    videoUrl: (s.videoUrl ?? "").trim(),
  };
}

export default function LandingServices() {
  const [rows, setRows] = useState<ServiceRow[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/services", { cache: "no-store" });
        const data = (await res.json()) as ServiceRow[];
        if (!cancelled) setRows(Array.isArray(data) ? data.map(normalize) : null);
      } catch {
        if (!cancelled) setRows(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const list: ServiceRow[] =
    rows && rows.length
      ? [...rows].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map(normalize)
      : defaultServices.map(
          (s, i): ServiceRow =>
            normalize({
              _id: `d-${i}`,
              order: s.order,
              num: s.num,
              title: s.title,
              description: s.description,
              videoSource: s.videoSource,
              videoUrl: s.videoUrl ?? "",
            })
        );

  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="section-head">
          <h2 className="display">
            Three things I do <em>obsessively</em> well.
          </h2>
          <div className="side">
            Not a generalist. I cut the three formats below every week — which is why the turnaround
            is fast and the quality stays consistent.
          </div>
        </div>

        <div className="services">
          {list.map((s) => {
            const showVideo =
              s.videoSource !== "none" && (s.videoUrl ?? "").trim().length > 0;
            return (
              <div
                key={s._id}
                className={`service${showVideo ? "" : " service--no-video"}`}
              >
                <div className="num">{s.num}</div>
                <div className="service-body">
                  <h3 className="display">{s.title}</h3>
                  <p>{s.description}</p>
                </div>
                {showVideo ? (
                  <div className="service-video">
                    <ServiceVideoPreview videoUrl={s.videoUrl ?? ""} />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
