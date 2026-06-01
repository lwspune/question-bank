"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import {
  RETURN_TO_KEY,
  parseReturnTarget,
  type ReturnTarget,
} from "@/lib/browse/returnTo";

/**
 * Floating "← Back to {notes}" pill, bottom-LEFT (opposite the bottom-right
 * CartPill). When the user lands on /browse from a /notes or /guide "Drill"
 * link, the `?from=` param is captured into sessionStorage so the pill
 * survives pagination + further filtering within the session (those
 * navigations drop the param from the URL). Dismissable.
 *
 * Never server-rendered — it reads window.location + sessionStorage, so it
 * mounts client-side only (same hydration-safety pattern as CartPill).
 */
export default function BackToNotes() {
  const [target, setTarget] = useState<ReturnTarget | null>(null);

  useEffect(() => {
    // 1. Fresh arrival with ?from=: capture it, then strip the param from the
    //    URL so back/forward + shared links don't re-trigger or leak it.
    const fresh = parseReturnTarget(window.location.search);
    if (fresh) {
      try {
        sessionStorage.setItem(RETURN_TO_KEY, JSON.stringify(fresh));
      } catch {
        /* private mode / quota — keep it in component state only */
      }
      setTarget(fresh);
      const url = new URL(window.location.href);
      url.searchParams.delete("from");
      url.searchParams.delete("fromLabel");
      window.history.replaceState(
        null,
        "",
        url.pathname + url.search + url.hash
      );
      return;
    }

    // 2. No fresh param (e.g. after paginating): restore the session target.
    try {
      const raw = sessionStorage.getItem(RETURN_TO_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ReturnTarget;
        if (parsed?.href) setTarget(parsed);
      }
    } catch {
      /* ignore malformed / unavailable storage */
    }
  }, []);

  if (!target) return null;

  const dismiss = () => {
    try {
      sessionStorage.removeItem(RETURN_TO_KEY);
    } catch {
      /* ignore */
    }
    setTarget(null);
  };

  return (
    <div
      // Mirror the CartPill's iOS-safe-area pinning so the two floating pills
      // sit on the same baseline (this one left, cart right).
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
      className="fixed left-4 z-40 flex animate-pill-in items-center rounded-full border border-primary/20 bg-card p-1 shadow-lg sm:left-6"
    >
      <Link
        href={target.href}
        className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        <span>Back to {target.label}</span>
      </Link>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss back-to-notes link"
        className="ml-0.5 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <X className="h-3.5 w-3.5" aria-hidden />
      </button>
    </div>
  );
}
