"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ClipboardCheck, X } from "lucide-react";
import { shouldShowTestBar } from "@/lib/notes/testBar";
import { trackFunnel } from "@/lib/analytics/trackFunnel";

/** When this device last saw the bar (ms). Per-device convenience only. */
const STORAGE_KEY = "qb_notes_test_bar_at";

function readLastShown(): number | null {
  try {
    const v = Number(window.localStorage.getItem(STORAGE_KEY));
    return Number.isFinite(v) && v > 0 ? v : null;
  } catch {
    return null;
  }
}

function writeLastShown(at: number) {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(at));
  } catch {
    // Private mode / blocked storage: the bar may show again, which is harmless.
  }
}

/**
 * The slide-up "test yourself" bar — chosen over a pop-up because a modal over
 * the content on a phone is what Google demotes for search visitors, and these
 * pages are where search and AI traffic land. It never covers the page on
 * arrival: it waits until the reader is 70% down, shows at most once a day per
 * device, and closes with one tap. Rules: shouldShowTestBar.
 */
export default function NotesTestBar({
  href,
  examDisplay,
  line,
}: {
  href: string;
  examDisplay: string;
  /** "Sit a real X paper, timed." or the chapter test's line (mockCtaCopy). */
  line: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let done = false;
    const onScroll = () => {
      if (done) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const scrollFraction = scrollable > 0 ? window.scrollY / scrollable : 1;
      const now = Date.now();
      if (!shouldShowTestBar({ scrollFraction, lastShownAt: readLastShown(), now })) return;
      done = true;
      writeLastShown(now);
      setOpen(true);
      trackFunnel("notes_test_bar_shown", { exam: examDisplay });
      window.removeEventListener("scroll", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [examDisplay]);

  if (!open) return null;
  return (
    <div
      role="region"
      aria-label="Test yourself"
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 p-3 shadow-lg backdrop-blur motion-safe:animate-in motion-safe:slide-in-from-bottom-4"
    >
      <div className="mx-auto flex max-w-3xl items-center gap-3">
        <ClipboardCheck className="h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
        <p className="flex-1 text-sm">
          <span className="font-medium">Ready to test this?</span>{" "}
          <span className="text-muted-foreground">{line}</span>
        </p>
        <Link
          href={href}
          prefetch={false}
          onClick={() => trackFunnel("notes_test_bar_click", { exam: examDisplay })}
          className="shrink-0 rounded-md bg-brand px-3 py-1.5 text-sm font-medium text-brand-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Start
        </Link>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="shrink-0 rounded p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
