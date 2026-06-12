"use client";

import { useRef, type ReactNode } from "react";

type MagnetWrapperProps = {
  children: ReactNode;
  padding?: number;
  strength?: number;
};

export default function MagnetWrapper({
  children,
  padding = 150,
  strength = 3,
}: MagnetWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const near =
      e.clientX >= rect.left - padding &&
      e.clientX <= rect.right + padding &&
      e.clientY >= rect.top - padding &&
      e.clientY <= rect.bottom + padding;
    if (near) {
      el.style.transition = "transform 0.3s ease-out";
      el.style.transform = `translate3d(${dx / strength}px, ${dy / strength}px, 0)`;
    }
  }

  function onMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.6s ease-in-out";
    el.style.transform = "translate3d(0, 0, 0)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}
