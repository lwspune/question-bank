"use client";

import { useState } from "react";
import { Eye, Lightbulb, PencilLine } from "lucide-react";
import KatexRenderer from "@/components/math/KatexRenderer";
import type { FadedExample } from "@/app/notes/_types";

type Props = {
  example: FadedExample;
};

/**
 * The middle rung of the worked → faded → independent ramp.
 *
 * Same shape as `WorkedExampleAuthored` but the steps listed in
 * `example.hiddenStepIndexes` render as a "Try this step" button until the
 * student clicks — then they reveal in place. Encourages active attempt
 * before passive reading (Sweller / Renkl faded-worked-example effect).
 *
 * Visually distinct accent (indigo) so it doesn't blur into the fully
 * worked example sitting just above it.
 */
export default function FadedExampleCard({ example }: Props) {
  const hidden = new Set(example.hiddenStepIndexes);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const reveal = (i: number) =>
    setRevealed((prev) => {
      const next = new Set(prev);
      next.add(i);
      return next;
    });

  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/40 dark:border-indigo-900/60 dark:bg-indigo-950/20 p-5">
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        <PencilLine className="h-3.5 w-3.5" aria-hidden />
        Try the hidden steps yourself
      </p>

      <div className="mt-3 font-serif text-base leading-relaxed text-foreground">
        <KatexRenderer text={example.prompt} />
      </div>

      <ol className="mt-4 list-decimal space-y-2 pl-6 font-serif text-sm text-muted-foreground">
        {example.steps.map((step, i) => {
          const isHidden = hidden.has(i);
          const isRevealed = revealed.has(i);
          if (!isHidden || isRevealed) {
            return (
              <li key={i} className="leading-relaxed">
                <KatexRenderer text={step} />
              </li>
            );
          }
          return (
            <li key={i} className="leading-relaxed">
              <button
                type="button"
                onClick={() => reveal(i)}
                className="inline-flex items-center gap-1.5 rounded-md border border-indigo-300 dark:border-indigo-800 bg-background px-2.5 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-950/40 transition-colors"
                aria-label={`Reveal step ${i + 1}`}
              >
                <Eye className="h-3 w-3" aria-hidden />
                Reveal step {i + 1}
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1.5 text-sm">
        <Lightbulb
          className="h-4 w-4 text-emerald-700 dark:text-emerald-400"
          aria-hidden
        />
        <span className="font-semibold text-emerald-800 dark:text-emerald-200">
          Answer:
        </span>
        <span className="font-serif text-emerald-900 dark:text-emerald-100">
          <KatexRenderer text={example.answer} />
        </span>
      </div>
    </div>
  );
}
