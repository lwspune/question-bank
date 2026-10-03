"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { shouldStartNavProgress } from "@/lib/navigation/navProgress";

/**
 * A thin bar along the top of the screen from the moment an internal link is
 * tapped until the next page arrives, and the tapped link stops taking taps
 * meanwhile. Rules for which taps count live in lib/navigation/navProgress.ts.
 *
 * WHY: on a phone a link takes a second or two and nothing moved in that time,
 * so students tapped again ("Sign in to start" 8 times, "Open chapter notes" 6,
 * Clarity 2026-10-02). It cannot help a tap that lands before the page's
 * JavaScript has loaded; a link then navigates natively, with the browser's
 * own indicator.
 *
 * Mounted once in the root layout. `useSearchParams` sits behind the Suspense
 * boundary below, so it cannot bail any page out of static rendering.
 */
const PENDING = "data-nav-pending";
/** The bar gives up if no page change is reported (offline, a link a page
 *  handles itself). Long enough for a slow phone, short enough not to linger. */
const SAFETY_MS = 10_000;
/** How long the bar creeps toward 85% while waiting. */
const CREEP_MS = 8_000;

type BarState = { visible: boolean; scale: number; ms: number };
const IDLE: BarState = { visible: false, scale: 0, ms: 0 };

export default function NavigationProgress() {
  return (
    <Suspense fallback={null}>
      <Bar />
    </Suspense>
  );
}

function Bar() {
  const pathname = usePathname();
  const search = useSearchParams()?.toString() ?? "";
  const [bar, setBar] = useState<BarState>(IDLE);
  const loading = useRef(false);
  const anchor = useRef<HTMLAnchorElement | null>(null);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  const releaseAnchor = () => {
    anchor.current?.removeAttribute(PENDING);
    anchor.current?.removeAttribute("aria-disabled");
    anchor.current = null;
  };

  const finish = useCallback(() => {
    if (!loading.current) return;
    loading.current = false;
    clearTimers();
    releaseAnchor();
    setBar({ visible: true, scale: 1, ms: 200 });
    timers.current.push(window.setTimeout(() => setBar(IDLE), 350));
  }, []);

  const start = useCallback(
    (a: HTMLAnchorElement) => {
      clearTimers();
      releaseAnchor();
      loading.current = true;
      anchor.current = a;
      a.setAttribute(PENDING, "");
      a.setAttribute("aria-disabled", "true");
      // Jump to a visible sliver at once, then creep toward 85% on the next frame.
      setBar({ visible: true, scale: 0.12, ms: 0 });
      timers.current.push(window.setTimeout(() => setBar({ visible: true, scale: 0.85, ms: CREEP_MS }), 30));
      timers.current.push(window.setTimeout(finish, SAFETY_MS));
    },
    [finish]
  );

  // The page changed: the router has rendered the destination.
  useEffect(() => {
    finish();
  }, [pathname, search, finish]);

  useEffect(() => {
    // Capture phase, so the tap is seen before next/link's own handler runs.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.hasAttribute(PENDING)) return;
      const ok = shouldStartNavProgress({
        href: a.href,
        current: window.location.href,
        target: a.getAttribute("target"),
        download: a.hasAttribute("download"),
        button: e.button,
        modifier: e.metaKey || e.ctrlKey || e.shiftKey || e.altKey,
      });
      if (ok) start(a);
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearTimers();
    };
  }, [start]);

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 z-[100] h-[3px]"
        style={{ top: "env(safe-area-inset-top, 0px)", opacity: bar.visible ? 1 : 0, transition: "opacity 150ms" }}
      >
        <div
          className="h-full origin-left bg-brand motion-reduce:transition-none"
          style={{
            transform: `scaleX(${bar.scale})`,
            transition: bar.ms ? `transform ${bar.ms}ms cubic-bezier(0.1, 0.7, 0.3, 1)` : "none",
          }}
        />
      </div>
      <span role="status" aria-live="polite" className="sr-only">
        {bar.visible && bar.scale < 1 ? "Loading page" : ""}
      </span>
    </>
  );
}
