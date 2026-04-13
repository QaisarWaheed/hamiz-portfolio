"use client";

import { useEffect, useRef, type MutableRefObject } from "react";

export type PointerNorm = { nx: number; ny: number };

function distToSegment(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len2 = dx * dx + dy * dy;
  if (len2 < 1e-6) return Math.hypot(px - x1, py - y1);
  let t = ((px - x1) * dx + (py - y1) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  const qx = x1 + t * dx;
  const qy = y1 + t * dy;
  return Math.hypot(px - qx, py - qy);
}

export default function InteractiveWebBackground({
  pointerRef,
}: {
  pointerRef: MutableRefObject<PointerNorm>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ro = new ResizeObserver(() => {
      const r = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      sizeRef.current = { w: r.width, h: r.height, dpr };
      canvas.width = Math.floor(r.width * dpr);
      canvas.height = Math.floor(r.height * dpr);
      canvas.style.width = `${r.width}px`;
      canvas.style.height = `${r.height}px`;
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const spokes = 14;
    const ringCount = 5;
    const baseAlpha = 0.055;
    const glowRadius = 140;
    const glowStrength = 0.22;

    let raf = 0;
    const frame = () => {
      const { w: cssW, h: cssH, dpr } = sizeRef.current;
      if (cssW < 2 || cssH < 2) {
        raf = requestAnimationFrame(frame);
        return;
      }

      const w = cssW * dpr;
      const h = cssH * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);

      const cx = cssW * 0.5;
      const cy = cssH * 0.36;
      const base = Math.min(cssW, cssH) * 0.48;
      const radii = [0.12, 0.24, 0.38, 0.52, 0.68].map((t) => base * t);

      const pts: { x: number; y: number }[][] = [];
      for (let r = 0; r < ringCount; r++) {
        const ring: { x: number; y: number }[] = [];
        const rad = radii[r];
        for (let i = 0; i < spokes; i++) {
          const a = (i / spokes) * Math.PI * 2 - Math.PI / 2;
          ring.push({ x: cx + Math.cos(a) * rad, y: cy + Math.sin(a) * rad });
        }
        pts.push(ring);
      }

      const { nx, ny } = pointerRef.current;
      const mx = nx * cssW;
      const my = ny * cssH;

      const drawSeg = (x1: number, y1: number, x2: number, y2: number) => {
        const d = distToSegment(mx, my, x1, y1, x2, y2);
        const glow = Math.max(0, 1 - d / glowRadius);
        const a = baseAlpha + glow * glowStrength;
        ctx.strokeStyle = `rgba(147, 197, 253, ${a * 0.85})`;
        ctx.lineWidth = 0.75 + glow * 1.1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        if (glow > 0.08) {
          ctx.strokeStyle = `rgba(96, 165, 250, ${glow * 0.12})`;
          ctx.lineWidth = 2 + glow * 4;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      };

      // Radial strands (center is implicit hub at first ring inner point — use smallest ring)
      for (let i = 0; i < spokes; i++) {
        for (let r = 0; r < ringCount - 1; r++) {
          drawSeg(pts[r][i].x, pts[r][i].y, pts[r + 1][i].x, pts[r + 1][i].y);
        }
      }

      // Connect along each ring
      for (let r = 0; r < ringCount; r++) {
        for (let i = 0; i < spokes; i++) {
          const j = (i + 1) % spokes;
          drawSeg(pts[r][i].x, pts[r][i].y, pts[r][j].x, pts[r][j].y);
        }
      }

      // Cross-web diagonals (every other spoke, skip innermost for clarity)
      for (let r = 1; r < ringCount; r++) {
        for (let i = 0; i < spokes; i += 2) {
          const j = (i + 3) % spokes;
          drawSeg(pts[r][i].x, pts[r][i].y, pts[r][j].x, pts[r][j].y);
        }
      }

      // Hub to first ring (spider body)
      for (let i = 0; i < spokes; i += 2) {
        drawSeg(cx, cy, pts[0][i].x, pts[0][i].y);
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [pointerRef]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-[2]"
      aria-hidden
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
