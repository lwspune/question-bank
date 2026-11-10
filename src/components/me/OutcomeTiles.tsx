"use client";

import { usePulse } from "@/lib/viewer/usePulse";
import type { Pulse } from "@/lib/pulse/cache";
import { fixProgress } from "@/lib/me/charts";
import ProgressRing from "./ProgressRing";

/**
 * What got better, at the top of Progress: mistakes fixed and subtopics
 * mastered, each with a ring of how far along (2026-11-10) so the number has
 * something to be measured against: "41 fixed · 23 to go", "12 of 31".
 *
 * Fixed and waiting are both counted across every exam (lib/me/charts
 * fixProgress says why); the subtopics are the map's own totals.
 */
export default function OutcomeTiles({
  mastery,
  pulse: given,
}: {
  /** Mastered subtopics and how many the map holds; null when not computed. */
  mastery: { mastered: number; of: number } | null;
  pulse?: Pulse;
}) {
  const fetched = usePulse(!given);
  const pulse = given ?? fetched;
  const fix = fixProgress(pulse?.totals?.fixed ?? null, pulse?.chapterDue);

  return (
    <section aria-label="What got better" className="grid grid-cols-2 gap-2 sm:gap-3">
      <Tile
        value={fix?.fixed ?? null}
        share={fix?.share ?? null}
        label={fix && fix.waiting > 0 ? `fixed · ${fix.waiting.toLocaleString("en-IN")} to go` : "mistakes fixed"}
      />
      {mastery !== null && (
        <Tile
          value={mastery.mastered}
          of={mastery.of}
          share={mastery.of > 0 ? mastery.mastered / mastery.of : 0}
          label="subtopics mastered"
        />
      )}
    </section>
  );
}

function Tile({
  value,
  of,
  share,
  label,
}: {
  value: number | null;
  of?: number;
  share: number | null;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-card p-3 sm:p-4">
      {share !== null && <ProgressRing share={share} />}
      <div className="min-w-0">
        <span className="block h-8 text-2xl font-bold tabular-nums tracking-tight text-brand-accent">
          {value === null ? "" : value.toLocaleString("en-IN")}
          {value !== null && of !== undefined && of > 0 && (
            <span className="text-sm font-medium text-muted-foreground"> of {of.toLocaleString("en-IN")}</span>
          )}
        </span>
        <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{label}</span>
      </div>
    </div>
  );
}
