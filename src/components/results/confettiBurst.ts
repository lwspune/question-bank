"use client";

import { makeConfettiPieces } from "@/lib/results/confetti";

/** The logo's blues plus three warm accents, readable on light and dark pages. */
const COLORS = ["#1D4ED8", "#7AB0FF", "#F59E0B", "#10B981", "#EC4899"] as const;
const PIECES = 90;
const DURATION_MS = 1600;
const GRAVITY = 0.35;

/**
 * One burst from (x, y) in viewport pixels, on a canvas laid over the page that
 * ignores the pointer and is removed when the burst ends. The caller skips it
 * under reduced motion.
 */
export function burstConfetti(x: number, y: number): void {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100vw",
    height: "100vh",
    pointerEvents: "none",
    zIndex: "100",
  });
  document.body.appendChild(canvas);
  ctx.scale(dpr, dpr);

  const pieces = makeConfettiPieces(PIECES, { x, y }, COLORS);
  const start = performance.now();

  const frame = (now: number) => {
    const t = now - start;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.globalAlpha = Math.max(0, 1 - t / DURATION_MS);
    for (const p of pieces) {
      p.vy += GRAVITY;
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.spin;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    }
    if (t < DURATION_MS) requestAnimationFrame(frame);
    else canvas.remove();
  };
  requestAnimationFrame(frame);
}
