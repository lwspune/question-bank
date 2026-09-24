"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowRight, Check, Loader2, RotateCcw, X } from "lucide-react";
import BlockText from "@/components/math/BlockText";
import { publicImageUrl } from "@/lib/storage/imageUrl";
import { cn } from "@/lib/utils";
import type { DrillVerdict } from "@/lib/drill/query";
import type { ServedQuestion } from "@/lib/drill/service";
import { invalidatePulse } from "@/lib/viewer/usePulse";

export type DrillScope = { attemptId: string; mockTitle: string; mockSlug: string } | null;

/**
 * The drill runner — ONE QUESTION PER SCREEN, built for a phone first.
 *
 * The audience reads this in a gap between classes, so the shape follows the
 * quiz taker's rather than the bank's: no list to scroll, one decision on
 * screen, options as full-width targets, and the only forward control pinned to
 * the bottom of the viewport where a thumb already is. Widths open up at `sm:`;
 * nothing is hidden on a small screen, it is just laid out for one.
 *
 * FEEDBACK IS IMMEDIATE AND PER QUESTION, which is the whole reason this is not
 * a five-question form with a submit button. The student finds out now, reads
 * the solution now, and carries the correction into the next question instead
 * of into a summary screen. Each answer is graded by the server (the payload
 * here carries no key), so the verdict they see is the verdict recorded.
 *
 * An answer cannot be changed once committed. That is not strictness for its
 * own sake: the point of the drill is retrieval, and a question you can re-pick
 * after seeing the answer measures nothing.
 */
export default function DrillRunner({
  questions,
  dueTotal,
  fresh = 0,
  supabaseUrl,
  scope = null,
}: {
  questions: ServedQuestion[];
  dueTotal: number;
  /** How many of the served questions are NEW (the B2 fill), not due. */
  fresh?: number;
  supabaseUrl: string;
  /** Set when this drill is one attempt's mistakes ("Fix these" from a result
   *  page). Changes only the end screen's next step and the pool label. */
  scope?: DrillScope;
}) {
  const [index, setIndex] = useState(0);
  const [verdicts, setVerdicts] = useState<Record<string, DrillVerdict & { chose: string }>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const question = questions[index];
  const answered = question ? verdicts[question.id] : undefined;
  const isLast = index === questions.length - 1;
  const correctCount = Object.values(verdicts).filter((v) => v.correct).length;

  async function choose(label: string) {
    if (!question || answered || busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/drill/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: question.id, label }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        toast.error(body.error ?? "Couldn't check that answer.");
        return;
      }
      const verdict = (await res.json()) as DrillVerdict;
      setVerdicts((prev) => ({ ...prev, [question.id]: { ...verdict, chose: label } }));
      // The header badge counts this pool; a recorded answer is one of the two
      // moments it changes, so refresh it now rather than at the next page.
      invalidatePulse();
    } catch {
      toast.error("Couldn't reach the server. Check your connection.");
    } finally {
      setBusy(false);
    }
  }

  async function next() {
    if (!isLast) {
      setIndex((i) => i + 1);
      return;
    }
    setDone(true);
    // Best-effort: the per-answer rows are already recorded and carry the
    // learning. Losing this one costs a feature-adoption count, not progress.
    try {
      await fetch("/api/drill/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionIds: questions.map((q) => q.id) }),
      });
    } catch {
      /* ignore */
    }
  }

  if (done) {
    return (
      <Summary
        total={questions.length}
        correct={correctCount}
        remaining={Math.max(0, dueTotal - correctCount)}
        scope={scope}
      />
    );
  }

  if (!question) return null;

  return (
    <div className="pb-24">
      {/* Progress — a count and a bar, not a question palette. Five questions
          do not need navigation, and a palette would invite skipping ahead. */}
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium tabular-nums">
          {index + 1} <span className="text-muted-foreground">of {questions.length}</span>
        </span>
        <span className="text-xs text-muted-foreground">
          {dueTotal > 0 ? `${dueTotal} to fix ${scope ? "from this paper" : "in all"}` : ""}
          {dueTotal > 0 && fresh > 0 ? " \u00b7 " : ""}
          {fresh > 0 ? `${fresh} new` : ""}
        </span>
      </div>
      <div
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={index + 1}
        aria-valuemin={1}
        aria-valuemax={questions.length}
        aria-label="Drill progress"
      >
        <div
          className="h-full rounded-full bg-brand transition-all duration-300"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>

      <article className="mt-5 rounded-2xl border bg-card p-4 sm:p-6">
        <p className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-brand-accent">
          <span>{[question.chapter, question.subtopic].filter(Boolean).join(" · ")}</span>
          {question.isNew && (
            <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-brand-accent">
              New
            </span>
          )}
        </p>

        {question.context && (
          <div className="mt-3 border-l-2 border-muted pl-3 font-serif text-sm italic text-muted-foreground">
            <BlockText text={question.context} />
          </div>
        )}

        <div className="mt-3 font-serif text-[15px] leading-relaxed [&_.katex]:max-w-full">
          <BlockText text={question.text} />
        </div>

        {question.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={publicImageUrl(supabaseUrl, question.imageUrl)}
            alt="Question diagram"
            className="mt-3 max-h-60 w-auto rounded border"
          />
        )}

        <ul className="mt-4 space-y-2">
          {question.options.map((opt) => {
            const isChosen = answered?.chose === opt.label;
            const isKey = answered?.correctLabel === opt.label;
            return (
              <li key={opt.label}>
                <button
                  type="button"
                  onClick={() => choose(opt.label)}
                  disabled={!!answered || busy}
                  aria-pressed={isChosen}
                  className={cn(
                    // min-h-[3.25rem] keeps every option a comfortable tap
                    // target on a phone even when its text is one character.
                    "flex min-h-[3.25rem] w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    !answered && "hover:bg-accent/50 active:bg-accent",
                    // After the commit: the key is always green, and a wrong
                    // pick is red. Both are marked with an ICON as well as a
                    // colour — colour alone is not an accessible signal.
                    isKey && "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
                    answered && isChosen && !answered.correct && "border-red-500 bg-red-50 dark:bg-red-950/30",
                    answered && !isChosen && !isKey && "opacity-60"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs font-bold",
                      isKey && "border-emerald-500 text-emerald-700 dark:text-emerald-400",
                      answered && isChosen && !answered.correct && "border-red-500 text-red-600"
                    )}
                  >
                    {opt.label}
                  </span>
                  <span className="min-w-0 flex-1 font-serif text-[15px] leading-relaxed [&_.katex]:max-w-full">
                    <BlockText text={opt.text} />
                    {opt.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={publicImageUrl(supabaseUrl, opt.imageUrl)}
                        alt=""
                        className="mt-2 max-h-32 w-auto rounded border"
                      />
                    )}
                  </span>
                  {answered && isKey && (
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-label="Correct answer" />
                  )}
                  {answered && isChosen && !answered.correct && (
                    <X className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-label="Your answer" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* aria-live so the verdict is announced, not just painted. */}
        <div aria-live="polite">
          {answered && (
            <div className="mt-4">
              <p
                className={cn(
                  "text-sm font-semibold",
                  answered.correct ? "text-emerald-700 dark:text-emerald-400" : "text-red-600"
                )}
              >
                {answered.correct ? "Right — that one's on its way out." : "Not this time."}
              </p>
              {answered.solution && (
                <div className="mt-2 rounded-xl border bg-muted/40 p-3 font-serif text-sm leading-relaxed [&_.katex]:max-w-full">
                  <BlockText text={answered.solution} />
                </div>
              )}
              {answered.solutionImageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={publicImageUrl(supabaseUrl, answered.solutionImageUrl)}
                  alt="Solution diagram"
                  className="mt-2 max-h-60 w-auto rounded border"
                />
              )}
            </div>
          )}
        </div>
      </article>

      {/* The one forward control, pinned where a thumb rests. It appears only
          once an answer is committed, so there is nothing to skip past. */}
      {answered && (
        <div className="fixed inset-x-0 bottom-0 border-t bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="mx-auto flex max-w-2xl justify-end">
            <button
              type="button"
              onClick={next}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 text-base font-medium text-brand-foreground transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
            >
              {isLast ? "Finish" : "Next question"}
              <ArrowRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      )}

      {busy && (
        <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Checking…
        </p>
      )}
    </div>
  );
}

/**
 * The end screen. GROWTH-FRAMED, per the engagement gate: it names what moved
 * and what is next, never a bare score, and it never says "0/5" as a verdict on
 * the student. A question they got wrong here is a question they will see
 * again, which is the mechanic working rather than a failure.
 */
function Summary({
  total,
  correct,
  remaining,
  scope,
}: {
  total: number;
  correct: number;
  remaining: number;
  scope: DrillScope;
}) {
  // A scoped drill keeps offering this paper's mistakes while any remain, then
  // hands over to the general pool, which may hold more from other papers.
  const anotherHref = scope && remaining > 0 ? `/drill?attempt=${scope.attemptId}` : "/drill";
  const anotherLabel =
    scope && remaining > 0
      ? "Another five from this paper"
      : scope
        ? "Fix mistakes from other papers"
        : "Another five";
  return (
    <div className="rounded-2xl border bg-card p-6 text-center">
      <p className="text-sm text-muted-foreground">Drill complete</p>
      <p className="mt-2 text-3xl font-bold tabular-nums">
        {correct} <span className="text-xl font-normal text-muted-foreground">of {total}</span>
      </p>
      <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
        {correct === total
          ? "Every one. Those questions go quiet for a while — you'll see them once more later to be sure it stuck."
          : correct === 0
            ? "None this time, and that is exactly what a drill is for — you have the solutions now, and these come back round."
            : `The ${correct} you fixed go quiet for a while. The other ${total - correct} come back round.`}
      </p>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        {(remaining > 0 || scope) && (
          <Link
            href={anotherHref}
            prefetch={false}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-base font-medium text-brand-foreground transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <RotateCcw className="h-5 w-5" aria-hidden />
            {anotherLabel}
          </Link>
        )}
        <Link
          href="/me/map"
          prefetch={false}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border px-6 text-base font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          See your map
        </Link>
      </div>

      {remaining > 0 && (
        <p className="mt-4 text-xs text-muted-foreground">
          {remaining} still to fix{scope ? " from this paper" : ""}
        </p>
      )}
    </div>
  );
}
