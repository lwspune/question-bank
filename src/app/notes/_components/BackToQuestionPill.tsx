"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";
import { backHref, pillShowsOn, type BackTrip } from "@/lib/browse/backToQuestion";
import { clearBackTrip, markBackViaPill, readBackTrip } from "@/components/reveal/backToQuestionStore";
import { trackFunnel } from "@/lib/analytics/trackFunnel";

/**
 * Floating "← Back to your question" pill on a notes page, bottom-LEFT (V sits
 * bottom-right), when the student came here from a bank card's notes link
 * (lib/browse/backToQuestion). It shows on every notes page of that chapter,
 * so reading on to the next subtopic keeps the way back. It moves up while the
 * "test yourself" bar is open (NotesTestBar marks <html data-bottom-bar>).
 *
 * Client-only: it reads sessionStorage after mount, so the cached notes page
 * stays the same for everyone.
 */
export default function BackToQuestionPill() {
  const pathname = usePathname();
  const [trip, setTrip] = useState<BackTrip | null>(null);

  useEffect(() => {
    const t = readBackTrip();
    const show = t && pillShowsOn(t, pathname) ? t : null;
    setTrip(show);
    if (show) trackFunnel("back_to_question_shown", { from: show.source });
  }, [pathname]);

  if (!trip) return null;

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-40 flex animate-pill-in items-center rounded-full border border-primary/20 bg-card p-1 shadow-lg transition-[bottom] sm:left-6 [html[data-bottom-bar=open]_&]:bottom-24">
      <Link
        href={backHref(trip)}
        prefetch={false}
        onClick={() => {
          markBackViaPill(trip);
          trackFunnel("back_to_question_click", { from: trip.source });
        }}
        className="flex min-h-9 items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        <span>Back to your question</span>
      </Link>
      <button
        type="button"
        onClick={() => {
          clearBackTrip();
          setTrip(null);
        }}
        aria-label="Hide the way back to your question"
        className="ml-0.5 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <X className="h-3.5 w-3.5" aria-hidden />
      </button>
    </div>
  );
}
