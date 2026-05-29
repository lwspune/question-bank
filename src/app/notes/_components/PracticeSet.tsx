"use client";

import { useState } from "react";
import { Dumbbell, Eye } from "lucide-react";
import KatexRenderer from "@/components/math/KatexRenderer";
import type { PracticeProblem } from "@/app/notes/_types";

type Props = {
  problems: PracticeProblem[];
};

/**
 * Level 1 mastery reps — a compact set of short practice problems for
 * drilling the concept to fluency. Each rep shows only its prompt until
 * the student clicks "answer", then reveals the answer + an optional
 * one-line method. Per-rep reveal (not reveal-all) so each is a genuine
 * attempt-then-check.
 *
 * Violet accent keeps it distinct from the worked (neutral) and
 * self-check (sky) cards above it.
 */
export default function PracticeSet({ problems }: Props) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const reveal = (i: number) =>
    setRevealed((prev) => {
      const next = new Set(prev);
      next.add(i);
      return next;
    });

  return (
    <div className="rounded-lg border border-violet-200 bg-violet-50/40 dark:border-violet-900/60 dark:bg-violet-950/20 p-5">
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">
        <Dumbbell className="h-3.5 w-3.5" aria-hidden />
        Practice — Level 1 ({problems.length} reps)
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Quick reps to lock in the method. Try each, then check.
      </p>

      <ol className="mt-3 space-y-2">
        {problems.map((p, i) => {
          const isRevealed = revealed.has(i);
          return (
            <li
              key={i}
              className="rounded-md border border-violet-200/70 dark:border-violet-900/50 bg-background px-3 py-2"
            >
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-xs font-semibold tabular-nums text-violet-700 dark:text-violet-300">
                  {i + 1}.
                </span>
                <div className="flex-1 font-serif text-sm text-foreground">
                  <KatexRenderer text={p.prompt} />
                </div>
                {!isRevealed && (
                  <button
                    type="button"
                    onClick={() => reveal(i)}
                    className="inline-flex items-center gap-1 rounded border border-violet-300 dark:border-violet-800 px-2 py-0.5 text-xs font-medium text-violet-700 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-950/40 transition-colors"
                    aria-label={`Reveal answer to practice rep ${i + 1}`}
                  >
                    <Eye className="h-3 w-3" aria-hidden />
                    answer
                  </button>
                )}
              </div>
              {isRevealed && (
                <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 text-sm">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                    =
                  </span>
                  <span className="font-serif text-emerald-800 dark:text-emerald-200">
                    <KatexRenderer text={p.answer} />
                  </span>
                  {p.method && (
                    <span className="font-serif text-xs text-muted-foreground">
                      (<KatexRenderer text={p.method} />)
                    </span>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
