"use client";

/**
 * A signed-in student's progress on a homework plan page (2026-11-05): the
 * "Your progress" box with Continue, and a label on each day card. The plan
 * page is cached and shared, so these fill in from /api/homework/progress in
 * the browser; signed out, or before anything is marked, they render nothing
 * and the page is as it was. Rules: lib/homework/progress.
 *
 * No day TOTAL anywhere ("Day 6 of 93"): the owner took day counts off these
 * pages as demotivating (2026-10-10).
 */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Check, Clock } from "lucide-react";
import { useSignedIn } from "@/components/auth/useSignedIn";
import type { DayProgress, PlanProgress } from "@/lib/homework/progress";
import { dayHref } from "@/lib/homework/links";
import { drillHref } from "@/lib/drill/from";

const ProgressContext = createContext<PlanProgress | null>(null);

export function HomeworkProgressProvider({ planSlug, children }: { planSlug: string; children: ReactNode }) {
  const { signedIn } = useSignedIn();
  const [progress, setProgress] = useState<PlanProgress | null>(null);

  useEffect(() => {
    if (!signedIn) return;
    let active = true;
    fetch(`/api/homework/progress?plan=${encodeURIComponent(planSlug)}`, { cache: "no-store" })
      .then((r) => (r.ok ? (r.json() as Promise<{ progress: PlanProgress }>) : null))
      .then((body) => {
        if (active && body?.progress.started) setProgress(body.progress);
      })
      .catch(() => {
        /* progress is extra: the plan page works without it */
      });
    return () => {
      active = false;
    };
  }, [signedIn, planSlug]);

  return <ProgressContext.Provider value={progress}>{children}</ProgressContext.Provider>;
}

const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);

export function HomeworkProgressSummary({ planSlug }: { planSlug: string }) {
  const p = useContext(ProgressContext);
  if (!p) return null;
  const next = p.nextDay === null ? null : p.days.find((d) => d.day === p.nextDay) ?? null;

  return (
    <section
      aria-labelledby="hw-progress"
      className="mt-6 rounded-lg border border-brand-accent bg-card p-4 motion-safe:animate-fade-in-up sm:p-5"
    >
      <h2 id="hw-progress" className="text-xs font-semibold uppercase tracking-wide text-brand-accent">
        Your progress
      </h2>
      <p className="mt-2 text-base font-semibold text-foreground">
        {p.doneDays} {plural(p.doneDays, "day", "days")} done.
        {next ? ` Next up: Day ${next.day}` : " You have finished every day."}
      </p>
      {next && next.done > 0 && (
        <p className="mt-1 text-sm text-muted-foreground">
          You have marked {next.done} of Day {next.day}&apos;s {next.total} questions.
        </p>
      )}
      {next && (
        <Link
          href={dayHref(planSlug, next.day)}
          prefetch={false}
          className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-brand px-4 text-sm font-semibold text-brand-foreground hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
        >
          Continue: Day {next.day}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      )}
      {p.toReview > 0 && (
        <p className="mt-3 text-sm">
          <Link
            href={drillHref("homework")}
            prefetch={false}
            className="font-medium text-amber-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:text-amber-300"
          >
            {p.toReview} {plural(p.toReview, "question", "questions")} from this homework{" "}
            {plural(p.toReview, "is", "are")} waiting in Fix your mistakes
          </Link>
        </p>
      )}
    </section>
  );
}

/** A day card's label: Done (and how many to review), "k of n", or Up next. */
export function HomeworkDayBadge({ day }: { day: number }) {
  const p = useContext(ProgressContext);
  const d: DayProgress | undefined = p?.days.find((x) => x.day === day);
  if (!p || !d) return null;
  if (d.complete) {
    return (
      <>
        <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2 py-0.5 text-xs font-semibold text-brand-accent">
          <Check className="h-3.5 w-3.5" aria-hidden />
          Done
        </span>
        {d.toReview > 0 && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-900 dark:bg-amber-900/40 dark:text-amber-100">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {d.toReview} to review
          </span>
        )}
      </>
    );
  }
  if (d.done > 0) {
    return (
      <span className="rounded-full border px-2 py-0.5 text-xs font-semibold text-foreground">
        {d.done} of {d.total}
      </span>
    );
  }
  if (p.nextDay === day) {
    return <span className="text-xs font-semibold text-brand-accent">Up next</span>;
  }
  return null;
}
