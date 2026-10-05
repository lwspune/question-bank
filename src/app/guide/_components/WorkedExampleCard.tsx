"use client";

import { useMemo, useState } from "react";
import { Check, ChevronDown, Eye, Lightbulb, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSignedIn } from "@/components/auth/useSignedIn";
import { recordPractice } from "@/components/reveal/practiceBeacon";
import { useDailyRevealGate } from "@/components/reveal/useRevealMeter";
import { RevealDailyPrompt } from "@/components/reveal/RevealDailyLimit";
import KatexRenderer from "@/components/math/KatexRenderer";
import BlockText from "@/components/math/BlockText";
import { stripPassageCountPhrase } from "@/lib/export/stripPassageCount";
import PresentButton from "@/components/present/PresentButton";
import { fromWorkedExample } from "@/lib/present/viewModel";
import { optionMark } from "@/lib/questions/optionMark";
import { DIFFICULTY_LABEL, DIFFICULTY_PILL } from "@/lib/questions/difficultyPill";
import type { WorkedExample } from "@/lib/guide/loadWorkedExamples";

type Props = {
  rank: number;
  example: WorkedExample;
};

/**
 * A real past-year question on a /notes or /guide page, in the bank card's
 * style (2026-10-04 redesign): the source tag and difficulty up top, options
 * shown and tappable, the solution in the blue panel.
 *
 * A tap on an option reveals the answer and marks the pick (optionMark, the
 * rule /browse and /board use). "Show answer" does the same without a pick.
 * Either way ONE practice event is recorded, with no verdict: notes and guide
 * pages record that an answer was seen, never right or wrong, as before.
 *
 * useSignedIn, NOT useRevealMeter. That hook records AND gates: it spends an
 * anon viewer's free-reveal budget, and a reveal wall on the public guide and
 * notes pages would be a product change nobody asked for. The one gate here is
 * the signed-in DAILY limit (migration 0134, owner 2026-10-05: guides count
 * toward the 50 free answers a day), via useDailyRevealGate.
 */
export default function WorkedExampleCard({ rank, example }: Props) {
  const [picked, setPicked] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [blockedTaps, setBlockedTaps] = useState(0);
  const { signedIn, loading } = useSignedIn();
  const dailyGate = useDailyRevealGate(signedIn, loading, "guide");

  const reveal = (label: string | null) => {
    if (!revealed) {
      if (!dailyGate(example.id)) {
        setBlockedTaps((n) => n + 1);
        return;
      }
      setRevealed(true);
      recordPractice(example.id, signedIn, "guide");
    }
    if (label) setPicked(label);
  };

  const correct = example.options.find((o) => o.isCorrect);
  const presentable = useMemo(() => fromWorkedExample(example), [example]);
  const path = [example.chapter, example.subtopic].filter(Boolean).join(" · ");

  return (
    <article className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="space-y-3 p-4 sm:p-5">
        <div className="flex items-start gap-2">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
            <span
              className={cn(
                "inline-flex max-w-full items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                example.source.kind === "pyq"
                  ? "bg-brand-accent/10 text-brand-accent"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <span className="truncate">{example.source.label}</span>
            </span>
            <span
              className={cn(
                "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                DIFFICULTY_PILL[example.difficulty]
              )}
            >
              {DIFFICULTY_LABEL[example.difficulty]}
            </span>
          </div>
          <PresentButton question={presentable} order={rank} />
        </div>

        <p className="text-xs text-muted-foreground">
          <span className="font-semibold tabular-nums text-foreground">Example {rank}</span>
          {path && <span> · {path}</span>}
        </p>

        {example.context && (
          <div className="rounded-xl bg-muted/40 px-4 py-3 font-serif text-sm italic leading-relaxed text-muted-foreground">
            <BlockText text={stripPassageCountPhrase(example.context)} />
          </div>
        )}

        <div className="font-serif text-[15px] leading-relaxed">
          <BlockText text={example.text} />
        </div>

        {example.options.length > 0 && (
          <ol className="space-y-2">
            {example.options.map((o) => {
              const isPicked = picked === o.label;
              const mark = optionMark({ revealed, picked: isPicked, isCorrect: o.isCorrect });
              const showCorrect = mark === "correct";
              const showWrong = mark === "wrong";
              const dimmed = revealed && mark === "none";
              return (
                <li
                  key={o.label}
                  className={cn(
                    "overflow-hidden rounded-xl border-[1.5px] bg-card transition-colors",
                    showCorrect && "border-emerald-400 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-500/10",
                    showWrong && "border-red-400 bg-red-50 dark:border-red-500 dark:bg-red-500/10",
                    dimmed && "opacity-60"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => reveal(o.label)}
                    aria-pressed={isPicked}
                    className="flex w-full items-center gap-3 px-3 py-2.5 text-left font-serif text-[15px] transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                  >
                    <span
                      className={cn(
                        "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-sans text-xs font-bold",
                        showCorrect
                          ? "bg-emerald-600 text-white"
                          : showWrong
                            ? "bg-red-600 text-white"
                            : "bg-brand-accent/10 text-brand-accent"
                      )}
                    >
                      {showCorrect ? <Check className="h-4 w-4" aria-hidden /> : o.label}
                      {showCorrect && <span className="sr-only">{o.label}</span>}
                    </span>
                    <span className="min-w-0 flex-1 overflow-x-auto [&_.katex]:max-w-full">
                      <KatexRenderer text={o.text} />
                    </span>
                    {showCorrect && (
                      <span className="inline-flex shrink-0 items-center gap-1 font-sans text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                        <Check className="h-3.5 w-3.5" aria-hidden />
                        Correct
                      </span>
                    )}
                    {showWrong && (
                      <span className="inline-flex shrink-0 items-center gap-1 font-sans text-xs font-semibold text-red-700 dark:text-red-300">
                        <X className="h-3.5 w-3.5" aria-hidden />
                        Your pick
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        )}

        {/* Today's free answers are used (signed in, migration 0134). */}
        {blockedTaps > 0 && !revealed && <RevealDailyPrompt key={blockedTaps} surface="guide" />}

        {showSolution && example.solution && (
          <div className="rounded-xl border border-brand-accent/20 bg-brand-accent/5 p-3 text-sm motion-safe:animate-fade-in-up sm:p-4">
            <p className="flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-wide text-brand-accent">
              <Lightbulb className="h-3.5 w-3.5" aria-hidden />
              Solution
            </p>
            <div className="mt-1.5 font-serif leading-relaxed">
              <BlockText text={example.solution} solution />
            </div>
          </div>
        )}

        {revealed && !example.solution && correct && (
          <p className="text-xs italic text-muted-foreground">
            No worked solution recorded for this question. The correct answer is {correct.label}.
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2">
          {!revealed ? (
            <button
              type="button"
              onClick={() => reveal(null)}
              className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Eye className="h-4 w-4" aria-hidden />
              Show answer
            </button>
          ) : (
            example.solution && (
              <button
                type="button"
                onClick={() => setShowSolution((v) => !v)}
                aria-expanded={showSolution}
                className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform", showSolution && "rotate-180")}
                  aria-hidden
                />
                {showSolution ? "Hide solution" : "Show solution"}
              </button>
            )
          )}
        </div>
      </div>
    </article>
  );
}
