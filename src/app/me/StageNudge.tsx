"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

/**
 * "Still in Class 11? Update your stage" — shown 1 April to 30 June, when the
 * school year turns over (EXAM_TIER_SPEC.md §4.2; the server decides WHEN via
 * needsStageNudge). Dismissal is a per-viewer convenience in localStorage keyed
 * by year, never state: a blocked or cleared store just shows it again.
 *
 * Starts hidden and appears after mount, so a dismissed nudge never flashes.
 */
const KEY = "qb_stage_nudge_dismissed";

export default function StageNudge({ stageLabel, year }: { stageLabel: string; year: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(KEY) === String(year);
    } catch {
      /* storage blocked: show the nudge */
    }
    setVisible(!dismissed);
  }, [year]);

  if (!visible) return null;

  function dismiss() {
    try {
      window.localStorage.setItem(KEY, String(year));
    } catch {
      /* storage blocked: hide for this view only */
    }
    setVisible(false);
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border bg-card px-4 py-3 text-sm">
      <p>
        Still in {stageLabel}?{" "}
        <Link
          href="/account"
          prefetch={false}
          className="font-medium text-brand-accent underline underline-offset-2"
        >
          Update your stage
        </Link>
      </p>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss the stage reminder"
        className="rounded-md p-1 text-muted-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <X className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
