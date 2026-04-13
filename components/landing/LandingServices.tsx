"use client";

import { useEffect, useState } from "react";
import { defaultServices } from "@/lib/landing-defaults";

export type ServiceRow = {
  _id: string;
  order: number;
  num: string;
  title: string;
  description: string;
};

export default function LandingServices() {
  const [rows, setRows] = useState<ServiceRow[] | null>(null);

  useEffect(() => {
    let c = false;
    (async () => {
      try {
        const res = await fetch("/api/services", { cache: "no-store" });
        const data = (await res.json()) as ServiceRow[];
        if (!c) setRows(Array.isArray(data) ? data : []);
      } catch {
        if (!c) setRows([]);
      }
    })();
    return () => {
      c = true;
    };
  }, []);

  const list =
    rows && rows.length
      ? [...rows].sort((a, b) => a.order - b.order)
      : (defaultServices as Omit<ServiceRow, "_id">[]).map((s, i) => ({
          ...s,
          _id: `d-${i}`,
        }));

  return (
    <section className="ed-section" id="services">
      <div className="wrap">
        <div className="ed-section-head">
          <h2 className="display">
            Three things I do <em>obsessively</em> well.
          </h2>
          <div className="side">
            Not a generalist. I cut the three formats below every week — which is why the
            turnaround is fast and the quality stays consistent.
          </div>
        </div>

        <div className="ed-services">
          {list.map((s) => (
            <div key={s._id} className="ed-service">
              <div className="num">{s.num}</div>
              <div>
                <h3 className="display">{s.title}</h3>
              </div>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
