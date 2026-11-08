"use client";

import { usePulse } from "@/lib/viewer/usePulse";
import type { Pulse } from "@/lib/pulse/cache";

/**
 * The Progress tab's two tiles (2026-11-08): what got better, not how much was
 * done. They replaced Home's answered · % right · fixed row: "answered" counted
 * effort, and "% right" mixed easy and hard questions, practice and papers and
 * every exam, so it moved with what a student chose to practise.
 *
 * Mistakes fixed comes from the shared pulse, the header badge's own request,
 * so it costs no extra fetch; subtopics mastered is the map's green dots,
 * counted on the server (lib/performance/masteryMap masteredCount).
 */
export default function OutcomeTiles({
  mastered,
  pulse: given,
}: {
  /** Null when the evidence read failed: the tile is left out, never a 0. */
  mastered: number | null;
  /** A test or staff view passes a pulse; the student's page fetches its own. */
  pulse?: Pulse;
}) {
  const fetched = usePulse(!given);
  const pulse = given ?? fetched;
  const fixed = pulse?.totals?.fixed ?? null;

  return (
    <section aria-label="What got better" className="grid grid-cols-2 gap-2 sm:gap-3">
      <Tile value={fixed} label="mistakes fixed" />
      {mastered !== null && <Tile value={mastered} label="subtopics mastered" />}
    </section>
  );
}

function Tile({ value, label }: { value: number | null; label: string }) {
  return (
    <div className="rounded-xl border bg-card p-3 sm:p-4">
      <span className="block h-8 text-2xl font-bold tabular-nums tracking-tight text-brand-accent">
        {value === null ? "" : value.toLocaleString("en-IN")}
      </span>
      <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{label}</span>
    </div>
  );
}
