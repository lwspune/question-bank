"use client";

import Link from "next/link";
import { Target } from "lucide-react";
import { usePulse } from "@/lib/viewer/usePulse";
import { drillChapterHref } from "@/lib/drill/from";
import type { Pulse } from "@/lib/pulse/cache";

/**
 * /me "Weak spots" (2026-11-06): the chapters where most of the student's
 * waiting mistakes sit, each with a Fix button that drills that chapter alone
 * (deliberate practice: the specific thing they missed). From the shared pulse,
 * the same read as the Today card, grouped from the due pool the drill serves,
 * so a row's count is what its button will serve from.
 *
 * Renders nothing until the pulse arrives or when nothing is due: the Today
 * card already says so, and an empty section is noise.
 */
export default function WeakSpots({
  pulse: given,
  initialPulse,
}: {
  pulse?: Pulse;
  /** The student's own Home: the pulse /me built on the server, shown from
   *  the first render and kept live (2026-11-08). */
  initialPulse?: Pulse | null;
} = {}) {
  // The staff view of a student's /me passes the STUDENT's pulse.
  const fetched = usePulse(!given, initialPulse);
  const pulse = given ?? fetched;
  const weak = pulse?.weak ?? [];
  if (weak.length === 0) return null;

  return (
    <section aria-labelledby="weak-heading" className="rounded-2xl border bg-card p-4 sm:p-5">
      <h2 id="weak-heading" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
        <Target className="h-4 w-4 text-brand-accent" aria-hidden />
        Your weak spots
      </h2>
      <ul className="mt-2 divide-y">
        {weak.map((w) => (
          <li key={w.chapterId} className="flex items-center gap-3 py-2.5">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{w.name}</p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                <span className="font-medium tabular-nums text-foreground">{w.due.toLocaleString("en-IN")} to fix</span>
                {w.place && <> {" · "} {w.place}</>}
              </p>
            </div>
            <Link
              href={drillChapterHref("me_weak", w.chapterId)}
              prefetch={false}
              aria-label={`Fix ${w.due} ${w.due === 1 ? "mistake" : "mistakes"} in ${w.name}`}
              className="inline-flex h-9 shrink-0 items-center justify-center rounded-md border px-4 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Fix
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
