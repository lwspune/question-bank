"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import KatexRenderer from "@/components/math/KatexRenderer";
import type { WorkedExample } from "@/lib/guide/loadWorkedExamples";

type Props = {
  rank: number;
  example: WorkedExample;
};

const DIFFICULTY_STYLES = {
  EASY: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300",
  MODERATE: "bg-sky-100 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300",
  HARD: "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300",
} as const;

export default function WorkedExampleCard({ rank, example }: Props) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const correct = example.options.find((o) => o.isCorrect);

  return (
    <article className="rounded-lg border bg-card shadow-sm">
      <header className="flex flex-wrap items-center gap-2 border-b px-4 py-2.5 text-xs text-muted-foreground">
        <span className="font-semibold text-foreground tabular-nums">
          Example {rank}
        </span>
        <span aria-hidden>·</span>
        <span>{example.chapter}</span>
        <span
          className={cn(
            "ml-auto inline-flex rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide",
            DIFFICULTY_STYLES[example.difficulty]
          )}
        >
          {example.difficulty}
        </span>
      </header>

      <div className="px-4 py-3 font-serif text-sm leading-relaxed">
        <KatexRenderer text={example.text} />
      </div>

      {/* Options reveal */}
      <div className="border-t px-4 py-3">
        {!showAnswer ? (
          <button
            type="button"
            onClick={() => setShowAnswer(true)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
          >
            <ChevronDown className="h-3.5 w-3.5" aria-hidden />
            Show options and answer
          </button>
        ) : (
          <ol className="space-y-1.5 text-sm">
            {example.options.map((o) => (
              <li
                key={o.label}
                className={cn(
                  "flex gap-2 rounded-md px-2 py-1",
                  o.isCorrect &&
                    "bg-emerald-50 dark:bg-emerald-950/30"
                )}
              >
                <span
                  className={cn(
                    "font-semibold tabular-nums",
                    o.isCorrect
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-muted-foreground"
                  )}
                >
                  {o.label}.
                </span>
                <span className="font-serif">
                  <KatexRenderer text={o.text} />
                </span>
                {o.isCorrect && (
                  <CheckCircle2
                    className="ml-auto h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                    aria-label="Correct answer"
                  />
                )}
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Solution reveal */}
      {showAnswer && example.solution && (
        <div className="border-t bg-muted/30 px-4 py-3">
          {!showSolution ? (
            <button
              type="button"
              onClick={() => setShowSolution(true)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
            >
              <Lightbulb className="h-3.5 w-3.5" aria-hidden />
              Show solution
            </button>
          ) : (
            <div className="font-serif text-sm leading-relaxed text-muted-foreground">
              <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
                <Lightbulb className="h-3.5 w-3.5" aria-hidden /> Solution
              </p>
              <KatexRenderer text={example.solution} />
            </div>
          )}
        </div>
      )}

      {showAnswer && !example.solution && correct && (
        <div className="border-t bg-muted/30 px-4 py-2 text-xs text-muted-foreground italic">
          No worked solution recorded for this question. The correct answer
          is {correct.label}.
        </div>
      )}
    </article>
  );
}
