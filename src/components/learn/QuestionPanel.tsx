"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState, useTransition } from "react";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { AnswerResult } from "@/lib/learn/answer";
import { nextItem } from "@/lib/learn/engine/nextItem";
import { displayOrder } from "@/lib/learn/engine/optionOrder";
import { daysUntil } from "@/lib/learn/engine/review";
import { localProgress } from "@/lib/learn/lessonState";
import { lessonHref, MASTERY_NEEDED, REVIEW_NEEDED } from "@/lib/learn/links";
import type { LessonItem } from "@/lib/learn/query";
import { FigureFrame } from "./FigureFrame";
import { FigureView } from "./FigureView";
import { RenderedInlineNodes, RenderedRichText } from "./RenderedRichText";
import { SolutionPanel, SolutionToggle } from "./SolutionReveal";

/**
 * One question at a time until the concept is mastered (Concept Ladder's QuestionPanel,
 * src/app/learn/[chapter]/[concept]/QuestionPanel.tsx at afca8bf). What differs here: the next
 * question is picked in the page from the answers so far (engine/nextItem, the same rule), and an
 * answer goes to /api/learn/answer, which RECORDS a signed-in student's and only CHECKS a guest's.
 * A guest's progress lives in this page; mastering a concept offers to sign up to keep it.
 */

/** Questions answered in a refresher before offering the way back. */
const REFRESHER_QUESTIONS = 2;

export type Attempt = { itemId: string; correct: boolean };
export type StartProgress = { streak: number; toRetry: number; mastered: boolean; reviewDue: boolean; reviewCorrect: number };

const ok = "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40";
const okText = "text-emerald-700 dark:text-emerald-300";
const bad = "border-red-600 bg-red-50 dark:bg-red-950/40";
const badText = "text-red-700 dark:text-red-300";
const warn = "bg-amber-50 dark:bg-amber-950/30";

/** Questions right toward mastery (a retried miss counts once right), and misses still to retry. */
function RightDots({ right, needed, toRetry }: { right: number; needed: number; toRetry: number }) {
  return (
    <p className="flex items-center gap-2 text-sm text-muted-foreground">
      <span className="flex gap-1" aria-hidden="true">
        {Array.from({ length: needed }, (_, i) => (
          <span key={i} className={`h-2.5 w-6 rounded-full transition-colors duration-300 motion-reduce:transition-none ${i < right ? "bg-emerald-600" : "bg-border"}`} />
        ))}
      </span>
      <span>
        {Math.min(right, needed)} of {needed} right
        {toRetry > 0 && <span className="font-medium text-foreground"> · {toRetry} to retry</span>}
      </span>
    </p>
  );
}

/** A burst of dots behind the mastery check; hidden when motion is reduced. */
function Sparks() {
  const dots = [
    [18, 14, "bg-brand"], [28, 30, "bg-emerald-500"], [36, 8, "bg-brand"], [64, 8, "bg-emerald-500"],
    [72, 30, "bg-brand"], [82, 14, "bg-emerald-500"], [44, 26, "bg-emerald-500"], [56, 26, "bg-brand"],
  ] as const;
  return (
    <span className="pointer-events-none absolute inset-0 hidden motion-safe:block" aria-hidden="true">
      {dots.map(([x, y, color], i) => (
        <span key={i} className={`absolute h-2 w-2 rounded-full ${color} animate-learn-spark`} style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 60}ms` }} />
      ))}
    </span>
  );
}

export function QuestionPanel({
  title,
  chapter,
  conceptSlug,
  course,
  mapHref,
  items,
  signedIn,
  userId,
  initialAttempts,
  start,
  next,
  refresher,
  onReread,
}: {
  title: string;
  /** The lesson chapter (pool) this concept is in. */
  chapter: string;
  conceptSlug: string;
  course: string | null;
  /** The course chapter map, when the student came from a course. */
  mapHref: string | null;
  items: LessonItem[];
  signedIn: boolean;
  userId: string | null;
  initialAttempts: Attempt[];
  start: StartProgress;
  next: { slug: string; title: string } | null;
  refresher: { slug: string; title: string } | null;
  onReread: () => void;
}) {
  const [attempts, setAttempts] = useState<Attempt[]>(initialAttempts);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [streak, setStreak] = useState(start.streak);
  const [toRetry, setToRetry] = useState(start.toRetry);
  const [mastered, setMastered] = useState(start.mastered);
  const [celebrate, setCelebrate] = useState(false);
  const [answered, setAnswered] = useState(0);
  const [reviewDue, setReviewDue] = useState(start.reviewDue);
  const [reviewCorrect, setReviewCorrect] = useState(start.reviewCorrect);
  const [reviewOutcome, setReviewOutcome] = useState<{ passed: boolean; inDays: number } | null>(null);
  const [pending, startTransition] = useTransition();
  const [solutionOpen, setSolutionOpen] = useState(false);
  const solutionId = useId();
  const feedbackRef = useRef<HTMLDivElement>(null);

  // The question on screen: picked from the answers before this one (it stays put while its feedback shows).
  const [asked, setAsked] = useState(() => nextItem(items.map((i) => i.id), initialAttempts));
  const question = items.find((i) => i.id === asked.itemId)!;
  const options = useMemo(() => displayOrder(question.options, `${userId ?? "guest"}:${question.id}`), [question, userId]);
  const back = refresher
    ? { href: lessonHref(chapter, refresher.slug, { course }), label: `Back to ${refresher.title}` }
    : mapHref
      ? { href: mapHref, label: "Back to the chapter" }
      : null;

  // On small screens the feedback and Next button can sit below the fold of the slide.
  useEffect(() => {
    if (result) feedbackRef.current?.scrollIntoView({ block: "nearest" });
  }, [result]);

  /** Tapping an option answers it: there is no separate Check step. */
  function answer(key: string) {
    if (pending || result) return;
    setSelected(key);
    setError(null);
    startTransition(async () => {
      let body: { ok: true; data: AnswerResult } | { ok: false; error: string };
      try {
        const res = await fetch("/api/learn/answer", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ itemId: question.id, key }),
        });
        body = await res.json();
      } catch {
        body = { ok: false, error: "Couldn't reach the server. Check your connection and try again." };
      }
      if (!body.ok) {
        setError(body.error);
        setSelected(null);
        toast.error(body.error);
        return;
      }
      const r = body.data;
      const after = [...attempts, { itemId: question.id, correct: r.correct }];
      setAttempts(after);
      setResult(r);
      setAnswered((n) => n + 1);
      if (r.progress) {
        const review = r.progress.review;
        if (review.reviewing) {
          setReviewCorrect(review.correct);
          if (review.done) {
            setReviewDue(false);
            setReviewOutcome({ passed: review.passed, inDays: review.nextReviewAt ? daysUntil(review.nextReviewAt, Date.now()) : 0 });
          }
        }
        setStreak(r.progress.streak);
        setToRetry(r.progress.toRetry);
        if (r.progress.mastered) setMastered(true);
        if (r.progress.masteredNow) setCelebrate(true);
      } else {
        const local = localProgress(after, MASTERY_NEEDED);
        setStreak(local.streak);
        setToRetry(local.toRetry);
        if (local.mastered && !mastered) {
          setMastered(true);
          setCelebrate(true);
        }
      }
    });
  }

  function nextQuestion() {
    if (!result) return;
    setAsked(nextItem(items.map((i) => i.id), attempts));
    setSelected(null);
    setResult(null);
    setSolutionOpen(false);
    setCelebrate(false);
  }

  if (celebrate) {
    const here = lessonHref(chapter, conceptSlug, { course });
    return (
      <div className={`relative overflow-hidden rounded-2xl border p-8 text-center ${ok}`} aria-live="polite">
        <Sparks />
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-600 text-white motion-safe:animate-learn-pop">
          <Check className="h-8 w-8" aria-hidden="true" />
        </span>
        <h3 className={`mt-4 font-sans text-3xl font-semibold ${okText}`}>Mastered</h3>
        <p className="mx-auto mt-2 max-w-md">
          You got {MASTERY_NEEDED} different questions right, with none left to retry. {title} is mastered.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {next && !refresher && (
            <Button asChild variant="brand">
              <Link href={lessonHref(chapter, next.slug, { course })}>Next concept: {next.title}</Link>
            </Button>
          )}
          {back && (
            <Button asChild variant={next && !refresher ? "outline" : "brand"}>
              <Link href={back.href}>{back.label}</Link>
            </Button>
          )}
          <Button type="button" variant="outline" onClick={nextQuestion}>
            Keep practising
          </Button>
        </div>
        {!signedIn && (
          <div className="mx-auto mt-8 max-w-sm border-t pt-6">
            <p className="font-semibold">This progress isn&apos;t saved yet</p>
            <p className="mb-4 mt-1 text-sm text-muted-foreground">
              Sign up free to keep what you master and unlock the next concepts in order on any device.
            </p>
            <Button asChild variant="brand">
              <Link href={`/signup?next=${encodeURIComponent(here)}`}>Sign up to save progress</Link>
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="font-sans">
      <div className="flex flex-wrap items-center justify-end gap-2">
        {reviewDue ? (
          <p className={`rounded-full border px-3 py-1 text-sm font-medium ${warn}`}>
            Review · {reviewCorrect} of {REVIEW_NEEDED}
          </p>
        ) : mastered ? (
          <p className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${ok} ${okText}`}>
            <Check className="h-3.5 w-3.5" aria-hidden="true" /> Mastered
          </p>
        ) : (
          <RightDots right={streak} needed={MASTERY_NEEDED} toRetry={toRetry} />
        )}
      </div>

      <fieldset className="mt-3 rounded-2xl border bg-muted/40 p-5 md:p-6" disabled={pending || result !== null}>
        <legend className="sr-only">Tap an answer</legend>
        {asked.retry && <p className="mb-3 text-sm font-semibold text-brand-accent">Try again: you missed this one earlier.</p>}
        <div className="font-serif">
          <RenderedRichText blocks={question.stem} />
        </div>
        {question.figure && (
          <div className="mt-4">
            <FigureFrame>
              <FigureView figure={question.figure} className="h-auto w-full" />
            </FigureFrame>
          </div>
        )}
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {options.map((o) => {
            const isCorrect = result?.correctKey === o.key;
            const isWrongPick = result && selected === o.key && !result.correct;
            const isChecking = pending && selected === o.key;
            return (
              <button
                type="button"
                key={o.key}
                onClick={() => answer(o.key)}
                aria-busy={isChecking || undefined}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-default motion-reduce:transition-none ${
                  isCorrect ? ok : isWrongPick ? bad : selected === o.key ? "border-brand bg-brand/10" : "border-border bg-card hover:border-foreground/30"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-semibold ${
                    isCorrect ? "bg-emerald-600 text-white" : isWrongPick ? "bg-red-600 text-white" : selected === o.key ? "bg-brand text-brand-foreground" : "border border-foreground/30 text-muted-foreground"
                  }`}
                >
                  {o.label}
                </span>
                <span className="min-w-0 flex-1 font-serif">
                  <span className="sr-only">Option {o.label}: </span>
                  <RenderedInlineNodes nodes={o.text} />
                </span>
                {isCorrect && <span className={`text-sm font-semibold ${okText}`}>Correct answer</span>}
                {isWrongPick && <span className={`text-sm font-semibold ${badText}`}>Your answer</span>}
                {isChecking && <span className="text-sm font-medium text-brand-accent">Checking…</span>}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div aria-live="polite">
        {error && (
          <p className={`mt-4 ${badText}`} role="alert">
            {error}
          </p>
        )}
        {result && (
          <div className={`mt-4 rounded-2xl border p-5 motion-safe:animate-learn-rise ${result.correct ? ok : warn}`}>
            <p className={`flex items-center gap-2 text-lg font-semibold ${result.correct ? okText : ""}`}>
              {result.correct ? <Check className="h-5 w-5" aria-hidden="true" /> : <X className="h-5 w-5" aria-hidden="true" />}
              {result.correct ? "Correct!" : "Not quite."}
            </p>
            {result.remediation && <RenderedRichText blocks={result.remediation} className="mt-2 font-serif" />}
            {reviewOutcome && result.progress?.review.done && (
              <p className="mt-3 border-t pt-3 font-medium">
                {reviewOutcome.passed
                  ? `Review passed. Next review in ${reviewOutcome.inDays} ${reviewOutcome.inDays === 1 ? "day" : "days"}.`
                  : "Review missed. This concept comes back for review tomorrow; a quick reread helps."}
              </p>
            )}
            {result.route && (
              <div className="mt-3 border-t pt-3">
                <p>This mistake has come up twice, which usually means a gap in an earlier idea.</p>
                {result.route.kind === "refresher" ? (
                  <Button asChild variant="brand" className="mt-3">
                    <Link href={lessonHref(result.route.chapter, result.route.concept, { course, from: conceptSlug })}>
                      Quick refresher: {result.route.title}
                    </Link>
                  </Button>
                ) : (
                  <p className="mt-1 font-medium">Worth revising: {result.route.label}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div ref={feedbackRef} className="mt-5 flex flex-wrap gap-3">
        {result && refresher && answered >= REFRESHER_QUESTIONS && back ? (
          <>
            <Button asChild variant="brand">
              <Link href={back.href}>{back.label}</Link>
            </Button>
            <Button type="button" variant="outline" onClick={nextQuestion}>
              One more question
            </Button>
          </>
        ) : result && result.progress?.review.done && !refresher && back ? (
          <>
            <Button asChild variant="brand">
              <Link href={back.href}>{back.label}</Link>
            </Button>
            <Button type="button" variant="outline" onClick={nextQuestion}>
              Keep practising
            </Button>
          </>
        ) : result ? (
          <Button type="button" variant={result.route ? "outline" : "brand"} onClick={nextQuestion}>
            {result.route ? "Keep trying here" : "Next question"}
          </Button>
        ) : null}
        <Button type="button" variant="outline" onClick={onReread}>
          Read the explanation again
        </Button>
        {result && <SolutionToggle open={solutionOpen} panelId={solutionId} onToggle={() => setSolutionOpen((o) => !o)} />}
      </div>
      {/* Below the buttons, so opening it never pushes "Next question" out of reach. */}
      {result && solutionOpen && <SolutionPanel key={question.id} solution={result.solution} panelId={solutionId} />}
    </div>
  );
}
