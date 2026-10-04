"use client";

import { useEffect } from "react";
import { trackFunnelOnce } from "@/lib/analytics/trackFunnel";
import { classifyTap, slowTapProps, SLOW_TAP_MS, type TapTarget } from "@/lib/analytics/slowTap";

/** Event Timing entry, with the field older TypeScript DOM libs lack. */
type EventEntry = PerformanceEntry & {
  processingStart: number;
  processingEnd: number;
  interactionId?: number;
  target?: Node | null;
};

/** What a tap landed on, read from its nearest button or link. */
function describe(target: Node | null | undefined): TapTarget {
  const el = target instanceof Element ? target : null;
  const hit = el?.closest("button, a, summary, [role='button']") ?? el;
  return {
    text: (hit?.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 80),
    ariaLabel: hit?.getAttribute("aria-label") ?? null,
    inHeader: !!el?.closest("header"),
    isOption: !!hit?.matches?.("li > button[aria-pressed]"),
  };
}

/**
 * Reports taps that take over 200 ms to paint, as one `slow_tap` funnel event
 * per page per kind of element (DEAD_TAPS.md). Mounted once in the root layout.
 * Reads no cookies or search params, so it costs no page its caching. Does
 * nothing where the browser lacks Event Timing (Safari).
 */
export default function SlowTapReporter() {
  useEffect(() => {
    if (
      typeof PerformanceObserver === "undefined" ||
      !PerformanceObserver.supportedEntryTypes?.includes("event")
    ) {
      return;
    }
    // One report per interaction: a tap yields pointerdown, pointerup and click
    // entries that share an interactionId.
    const reported = new Set<number>();
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as EventEntry[]) {
        const id = entry.interactionId ?? 0;
        if (!id || reported.has(id) || entry.duration < SLOW_TAP_MS) continue;
        const kind = classifyTap(describe(entry.target));
        const props = slowTapProps(kind, entry);
        if (!props) continue;
        reported.add(id);
        trackFunnelOnce("slow_tap", `${window.location.pathname}:${kind}`, props);
      }
    });
    try {
      observer.observe({ type: "event", durationThreshold: 104, buffered: true } as PerformanceObserverInit);
    } catch {
      return;
    }
    return () => observer.disconnect();
  }, []);

  return null;
}
