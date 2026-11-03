"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { LAST_VISIT_KEY, parseLastVisit, type LastVisit } from "@/lib/visits/lastVisit";
import { trackFunnel } from "@/lib/analytics/trackFunnel";

/**
 * "Continue: Logarithmic Differentiation" on the homepage, for a signed-out
 * visitor coming back to the page they last read (RememberVisit wrote it).
 * Read after the first render, so the server HTML stays the same for everyone.
 */
export default function ContinueCard() {
  const [visit, setVisit] = useState<LastVisit | null>(null);
  useEffect(() => {
    try {
      setVisit(parseLastVisit(localStorage.getItem(LAST_VISIT_KEY), Date.now()));
    } catch {
      /* storage unavailable: no card */
    }
  }, []);
  if (!visit) return null;

  return (
    <Link
      href={visit.href}
      onClick={() => trackFunnel("home_continue_click", { kind: visit.kind })}
      className="mb-6 flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-brand-accent/60 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg icon-tile">
        <BookOpen className="h-4 w-4" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-semibold uppercase tracking-wide text-brand-accent">
          Pick up where you left off
        </span>
        <span className="block truncate text-sm font-semibold">{visit.title}</span>
      </span>
      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
    </Link>
  );
}
