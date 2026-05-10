"use client";

import { useEffect, useState } from "react";

export function easeOutCubic(t: number): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  const u = 1 - t;
  return 1 - u * u * u;
}

export function interpolateCount(
  from: number,
  to: number,
  elapsed: number,
  duration: number
): number {
  if (duration <= 0 || elapsed >= duration) return Math.round(to);
  if (elapsed <= 0) return Math.round(from);
  if (from === to) return Math.round(to);
  const progress = easeOutCubic(elapsed / duration);
  return Math.round(from + (to - from) * progress);
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function useCountUp(target: number, durationMs = 700): number {
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (typeof window === "undefined") {
      setValue(target);
      return;
    }
    const reducedMotion = window.matchMedia?.(REDUCED_MOTION_QUERY).matches;
    if (reducedMotion || durationMs <= 0) {
      setValue(target);
      return;
    }

    const start = performance.now();
    const from = 0;
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      setValue(interpolateCount(from, target, elapsed, durationMs));
      if (elapsed < durationMs) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return value;
}
