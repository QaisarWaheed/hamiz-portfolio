"use client";

import { useEffect, useState } from "react";
import { defaultPricingTiers } from "@/lib/landing-defaults";

export type PricingRow = {
  _id: string;
  order: number;
  name: string;
  who: string;
  priceAmt: string;
  priceUnit: string;
  featured: boolean;
  badge: string;
  features: string[];
  bookLabel: string;
};

export default function LandingPricing() {
  const [rows, setRows] = useState<PricingRow[] | null>(null);

  useEffect(() => {
    let c = false;
    (async () => {
      try {
        const res = await fetch("/api/pricing", { cache: "no-store" });
        const data = (await res.json()) as PricingRow[];
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
      : (defaultPricingTiers as Omit<PricingRow, "_id">[]).map((t, i) => ({
          ...t,
          _id: `d-${i}`,
        }));

  return (
    <section className="ed-section" id="pricing">
      <div className="wrap">
        <div className="ed-section-head">
          <h2 className="display">
            Simple <em>pricing.</em> No proposal PDFs.
          </h2>
          <div className="side">
            Per-project rates for one-off edits. Retainers available for recurring channels —
            message me for a custom quote.
          </div>
        </div>

        <div className="ed-pricing">
          {list.map((tier) => (
            <div
              key={tier._id}
              className={`ed-tier${tier.featured ? " featured" : ""}`}
            >
              {tier.featured && tier.badge ? <div className="badge">{tier.badge}</div> : null}
              <div className="name">{tier.name}</div>
              <div className="who">{tier.who}</div>
              <div className="price">
                <span className="amt">{tier.priceAmt}</span>
                <span className="unit">{tier.priceUnit}</span>
              </div>
              <ul>
                {tier.features.map((li, i) => (
                  <li key={i}>{li}</li>
                ))}
              </ul>
              <a href="#contact" className="book">
                {tier.bookLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
