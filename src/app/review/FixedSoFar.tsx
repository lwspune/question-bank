"use client";

import { Check } from "lucide-react";
import { usePulse } from "@/lib/viewer/usePulse";

/**
 * "41 fixed so far" beside Review's count (2026-11-10), so the list reads as
 * one that shrinks. From the pulse Home already reads (the drill ladder's
 * lifetime count, every exam); nothing until it arrives, and nothing at zero.
 * Given a `value` (the homepage's sample) it never fetches.
 */
export default function FixedSoFar({ value }: { value?: number }) {
  const live = usePulse(value === undefined);
  const fixed = value ?? live?.totals?.fixed ?? 0;
  if (fixed <= 0) return null;
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
      <Check className="h-3.5 w-3.5" aria-hidden />
      <span className="tabular-nums">{fixed.toLocaleString("en-IN")}</span> fixed so far
    </span>
  );
}
