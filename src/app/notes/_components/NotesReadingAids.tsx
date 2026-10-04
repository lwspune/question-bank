"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { activeSectionId, readingProgress } from "@/lib/notes/readingProgress";

/**
 * Reading aids for a long notes topic page (13,569 px on desktop, ~20 phone
 * screens): a thin progress bar along the top, and an "On this page" rail on
 * wide screens that highlights the concept being read. Both are client
 * islands that render the same markup for every visitor, so the page stays
 * prerendered. Pure logic: lib/notes/readingProgress.ts.
 */

/** How far below the viewport top a concept counts as "being read" (px). */
const READ_LINE = 140;

function useScrollFrame(onFrame: () => void) {
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      onFrame();
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [onFrame]);
}

export function NotesReadingProgress() {
  const [progress, setProgress] = useState(0);
  useScrollFrame(
    // Stable: only reads the DOM and sets state.
    useStableCallback(() => {
      const doc = document.documentElement;
      setProgress(
        readingProgress({
          scrollY: window.scrollY,
          scrollHeight: doc.scrollHeight,
          viewportHeight: window.innerHeight,
        })
      );
    })
  );
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]">
      <div
        className="h-full origin-left bg-brand"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

export function NotesOnThisPage({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);
  useScrollFrame(
    useStableCallback(() => {
      const sections = items
        .map((it) => {
          const el = document.getElementById(it.id);
          return el ? { id: it.id, top: el.getBoundingClientRect().top } : null;
        })
        .filter((s): s is { id: string; top: number } => s !== null);
      setActive(activeSectionId(sections, READ_LINE));
    })
  );

  if (items.length === 0) return null;
  return (
    <nav aria-label="On this page" className="sticky top-24">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </p>
      <ol className="space-y-1 border-l">
        {items.map((it, i) => {
          const isActive = it.id === active;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "-ml-px flex gap-2 border-l-2 py-1 pl-3 text-[13px] leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "border-brand font-medium text-brand-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="tabular-nums">{i + 1}.</span>
                <span>{it.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** A callback whose identity never changes but always runs the latest body. */
function useStableCallback(fn: () => void): () => void {
  const ref = useRef(fn);
  useEffect(() => {
    ref.current = fn;
  });
  return useCallback(() => ref.current(), []);
}
