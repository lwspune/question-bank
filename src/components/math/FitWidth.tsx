"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { fitScale } from "@/lib/math/fitScale";

/**
 * A sideways-scrolling box whose content shrinks to fit when it is only a
 * little too wide (lib/math/fitScale). Built for display formulas on a phone,
 * which were cut off at the box edge (2026-11-10).
 *
 * The scale is set on the inner element straight through the DOM, after the
 * page has rendered, so the server HTML and the first client render match. It
 * is measured again when the box resizes (rotation, a wider window) and once
 * the fonts have loaded, since the maths font changes the width.
 */
export default function FitWidth({ className, children }: { className?: string; children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = outer.current;
    const content = inner.current;
    if (!box || !content) return;
    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        content.style.fontSize = "";
        const scale = fitScale(box.scrollWidth, box.clientWidth);
        content.style.fontSize = scale < 1 ? `${scale}em` : "";
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(box);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={outer} className={className}>
      <div ref={inner}>{children}</div>
    </div>
  );
}
