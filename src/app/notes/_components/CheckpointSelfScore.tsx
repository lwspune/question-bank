"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { fetchOwnProgressRow, postProgress } from "./progressClient";

/**
 * Self-report score for the mastery checkpoint. The checkpoint is reveal-based
 * (not auto-graded), so the student self-marks how many they got right — saved
 * to notes_progress (latest attempt). Rendered inside the practice gate, so only
 * signed-in students see it; it loads any previously-saved score on mount.
 */
export default function CheckpointSelfScore({
  total,
  subtopicSlug,
  chapterSlug,
  subjectRoute,
}: {
  total: number;
  subtopicSlug: string;
  chapterSlug: string;
  subjectRoute: string;
}) {
  const [saved, setSaved] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    fetchOwnProgressRow(subtopicSlug).then((row) => {
      if (active && row?.checkpointScore != null && row.checkpointTotal === total) {
        setSaved(row.checkpointScore);
      }
    });
    return () => {
      active = false;
    };
  }, [subtopicSlug, total]);

  async function save(score: number) {
    setBusy(true);
    const prev = saved;
    setSaved(score);
    try {
      await postProgress({ subtopicSlug, chapterSlug, subjectRoute, checkpoint: { score, total } });
      toast.success(`Saved — ${score}/${total}`);
    } catch {
      setSaved(prev);
      toast.error("Couldn't save your score.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-5 rounded-lg border border-emerald-200 dark:border-emerald-900/60 bg-background/60 p-4">
      <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
        How many did you get right?
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {Array.from({ length: total + 1 }, (_, n) => (
          <button
            key={n}
            type="button"
            onClick={() => save(n)}
            disabled={busy}
            aria-pressed={saved === n}
            className={cn(
              "h-8 w-8 rounded-md border text-sm font-medium tabular-nums transition-colors disabled:opacity-60",
              saved === n
                ? "border-emerald-500 bg-emerald-500 text-white"
                : "border-input bg-background text-muted-foreground hover:border-emerald-400 hover:text-emerald-700"
            )}
          >
            {n}
          </button>
        ))}
      </div>
      {saved != null && (
        <p className="mt-2 text-xs text-muted-foreground">
          Saved: {saved}/{total} — updates your progress.
        </p>
      )}
    </div>
  );
}
