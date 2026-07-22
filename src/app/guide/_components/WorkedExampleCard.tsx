"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import KatexRenderer from "@/components/math/KatexRenderer";
import BlockText from "@/components/math/BlockText";
import { stripPassageCountPhrase } from "@/lib/export/stripPassageCount";
import type { WorkedExample } from "@/lib/guide/loadWorkedExamples";

type Props = {
  rank: number;
  example: WorkedExample;
  /** Vestigial — scaled fonts for the (removed 2026-06-09) Present mode; no caller passes it now. */
  presentMode?: boolean;
};

const DIFFICULTY_STYLES = {
  EASY: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300",
  MODERATE: "bg-sky-100 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300",
  HARD: "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300",
} as const;

export default function WorkedExampleCard({ rank, example, presentMode }: Props) {
  // Three-stage reveal: options (neutral) → answer (correct highlighted) → solution.
  const [showOptions, setShowOptions] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const correct = example.options.find((o) => o.isCorrect);

  return (
    <article className="rounded-lg border bg-card shadow-sm">
      <header
        className={cn(
          "flex flex-wrap items-center gap-2 border-b text-muted-foreground",
          presentMode ? "px-6 py-3 text-lg" : "px-4 py-2.5 text-xs"
        )}
      >
        <span className="font-semibold text-foreground tabular-nums">
          Example {rank}
        </span>
        <span aria-hidden>·</span>
        <span>{example.chapter}</span>
        <span
          className={cn(
            "ml-auto inline-flex rounded font-medium uppercase tracking-wide",
            presentMode ? "px-2 py-1 text-sm" : "px-1.5 py-0.5 text-[10px]",
            DIFFICULTY_STYLES[example.difficulty]
          )}
        >
          {example.difficulty}
        </span>
      </header>

      {example.context && (
        <div
          className={cn(
            "border-b bg-muted/30 font-serif italic leading-relaxed text-muted-foreground",
            presentMode ? "px-6 py-4 text-xl sm:text-2xl" : "px-4 py-3 text-sm"
          )}
        >
          <BlockText text={stripPassageCountPhrase(example.context)} />
        </div>
      )}

      <div
        className={cn(
          "font-serif leading-relaxed",
          presentMode ? "px-6 py-5 text-2xl sm:text-3xl" : "px-4 py-3 text-sm"
        )}
      >
        <BlockText text={example.text} />
        {example.provenance && (
          <p
            className={cn(
              "mt-2 font-sans tabular-nums text-muted-foreground",
              presentMode ? "text-base" : "text-xs"
            )}
          >
            [{example.provenance}]
          </p>
        )}
      </div>

      {/* Options reveal — stage 1 (neutral) */}
      <div className={cn("border-t", presentMode ? "px-6 py-4" : "px-4 py-3")}>
        {!showOptions ? (
          <button
            type="button"
            onClick={() => setShowOptions(true)}
            className={cn(
              "inline-flex items-center gap-1.5 font-medium text-primary hover:underline",
              presentMode ? "text-xl" : "text-xs"
            )}
          >
            <ChevronDown
              className={presentMode ? "h-5 w-5" : "h-3.5 w-3.5"}
              aria-hidden
            />
            Show options
          </button>
        ) : (
          <>
            <ol
              className={cn(presentMode ? "space-y-3 text-2xl" : "space-y-1.5 text-sm")}
            >
              {example.options.map((o) => {
                const highlight = o.isCorrect && showAnswer;
                return (
                  <li
                    key={o.label}
                    className={cn(
                      "flex gap-2 rounded-md",
                      presentMode ? "px-3 py-2" : "px-2 py-1",
                      highlight && "bg-emerald-50 dark:bg-emerald-950/30"
                    )}
                  >
                    <span
                      className={cn(
                        "font-semibold tabular-nums",
                        highlight
                          ? "text-emerald-700 dark:text-emerald-400"
                          : "text-muted-foreground"
                      )}
                    >
                      {o.label}.
                    </span>
                    <span className="font-serif">
                      <KatexRenderer text={o.text} />
                    </span>
                    {highlight && (
                      <CheckCircle2
                        className={cn(
                          "ml-auto shrink-0 text-emerald-600 dark:text-emerald-400",
                          presentMode ? "h-7 w-7" : "h-4 w-4"
                        )}
                        aria-label="Correct answer"
                      />
                    )}
                  </li>
                );
              })}
            </ol>

            {/* Answer reveal — stage 2 (highlight the correct option) */}
            {!showAnswer && (
              <button
                type="button"
                onClick={() => setShowAnswer(true)}
                className={cn(
                  "mt-3 inline-flex items-center gap-1.5 font-medium text-primary hover:underline",
                  presentMode ? "text-xl" : "text-xs"
                )}
              >
                <ChevronDown
                  className={presentMode ? "h-5 w-5" : "h-3.5 w-3.5"}
                  aria-hidden
                />
                Show answer
              </button>
            )}
          </>
        )}
      </div>

      {/* Solution reveal — stage 3 */}
      {showAnswer && example.solution && (
        <div
          className={cn(
            "border-t bg-muted/30",
            presentMode ? "px-6 py-4" : "px-4 py-3"
          )}
        >
          {!showSolution ? (
            <button
              type="button"
              onClick={() => setShowSolution(true)}
              className={cn(
                "inline-flex items-center gap-1.5 font-medium text-primary hover:underline",
                presentMode ? "text-xl" : "text-xs"
              )}
            >
              <Lightbulb
                className={presentMode ? "h-5 w-5" : "h-3.5 w-3.5"}
                aria-hidden
              />
              Show solution
            </button>
          ) : (
            <div
              className={cn(
                "font-serif leading-relaxed text-muted-foreground",
                presentMode ? "text-xl sm:text-2xl" : "text-sm"
              )}
            >
              <p
                className={cn(
                  "mb-1 flex items-center gap-1.5 font-semibold uppercase tracking-wide text-primary",
                  presentMode ? "text-base" : "text-xs"
                )}
              >
                <Lightbulb
                  className={presentMode ? "h-5 w-5" : "h-3.5 w-3.5"}
                  aria-hidden
                />{" "}
                Solution
              </p>
              <KatexRenderer text={example.solution} />
            </div>
          )}
        </div>
      )}

      {showAnswer && !example.solution && correct && (
        <div
          className={cn(
            "border-t bg-muted/30 italic text-muted-foreground",
            presentMode ? "px-6 py-3 text-lg" : "px-4 py-2 text-xs"
          )}
        >
          No worked solution recorded for this question. The correct answer
          is {correct.label}.
        </div>
      )}
    </article>
  );
}
