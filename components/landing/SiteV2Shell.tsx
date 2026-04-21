"use client";

import { useEffect, useRef } from "react";

export default function SiteV2Shell({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    const observePending = () => {
      root.querySelectorAll(".reveal:not(.is-in)").forEach((el) => io.observe(el));
    };

    observePending();
    const mo = new MutationObserver(() => observePending());
    mo.observe(root, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="hk-site">
      {children}
    </div>
  );
}
