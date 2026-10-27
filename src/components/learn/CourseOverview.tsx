"use client";

import Link from "next/link";
import { ArrowRight, CalendarClock, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { daysUntilIst, examCountdownSentence, type SittingEntry } from "@/lib/exam/calendar";
import { courseSummary, type Outline } from "@/lib/learn/lessonState";
import { chapterHref, lessonHref } from "@/lib/learn/links";
import { MistakesCard } from "./MistakesCard";
import { ProgressRing } from "./ProgressRing";
import { useLearnProgress } from "./useLearnProgress";

/**
 * A course page's body. The page is cached for everyone; a signed-in student's progress fills in
 * after it loads. A guest sees the same layout with nothing mastered and the first concept as
 * Up next, plus a line on what signing up keeps.
 */
export function CourseOverview({ outline, name, sitting }: { outline: Outline; name: string; sitting: SittingEntry | null }) {
  const progress = useLearnProgress(Object.keys(outline.pools));
  const student = progress.kind === "student";
  const summary = courseSummary(outline, student ? progress.learner : new Map(), student, Date.now());
  const next = summary.upNext;
  // Worked out here, not on the server: the page is cached for a day.
  const daysLeft = sitting ? daysUntilIst(sitting.date, new Date()) : Number.NaN;
  const countdown =
    sitting && daysLeft >= 0
      ? examCountdownSentence({ source: "calendar", exam: sitting.exam, label: sitting.label, date: sitting.date, official: sitting.official, daysLeft })
      : null;
  const action = !next ? null : next.due ? "Review" : next.state === "learning" ? "Continue" : "Start";

  return (
    <>
      <section className="hero-soft rounded-2xl p-5 sm:p-7">
        <div className="flex items-center gap-5">
          <ProgressRing value={summary.mastered} max={summary.total} size={84} stroke={8} label={`${summary.mastered} of ${summary.total} concepts mastered`}>
            <span className="text-base">{summary.total === 0 ? 0 : Math.round((100 * summary.mastered) / summary.total)}%</span>
          </ProgressRing>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">Learn · Class {outline.standard}</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {student
                ? `${summary.mastered} of ${summary.total} concepts mastered across ${summary.chapters.length} chapters`
                : `${summary.total} concepts across ${summary.chapters.length} chapters, one at a time`}
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {countdown && (
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-foreground">
              <CalendarClock className="h-3.5 w-3.5 text-brand-accent" aria-hidden="true" />
              {countdown}
            </span>
          )}
          {student && summary.due > 0 && (
            <Link
              href="/learn/review"
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 font-medium text-amber-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-100"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              {summary.due} {summary.due === 1 ? "review" : "reviews"} due
            </Link>
          )}
        </div>
      </section>

      {next && (
        <section aria-label="Up next" className="mt-5 rounded-2xl border-2 border-brand bg-card p-5 sm:flex sm:items-center sm:gap-5">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
              {next.due ? "Due for review" : next.state === "learning" ? "Continue where you left off" : student ? "Up next" : "Start here"}
            </p>
            <p className="mt-1 text-lg font-semibold text-foreground">{next.title}</p>
            <p className="text-sm text-muted-foreground">{next.chapterTitle}</p>
          </div>
          <Button asChild variant="brand" className="mt-4 w-full sm:mt-0 sm:w-auto">
            <Link href={lessonHref(next.chapter, next.slug, { course: outline.slug })}>
              {action}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </section>
      )}
      {student && <MistakesCard course={outline.slug} />}
      {!student && progress.kind !== "loading" && (
        <p className="mt-3 text-sm text-muted-foreground">
          <Link href={`/signup?next=${encodeURIComponent(`/learn/${outline.slug}`)}`} className="font-medium text-brand-accent underline underline-offset-2">
            Sign up free
          </Link>{" "}
          to save what you master, get reviews when they are due, and unlock each concept in order.
        </p>
      )}

      <h2 className="section-title mt-8 text-lg font-semibold text-foreground">Chapters</h2>
      <ol className="mt-3 grid gap-3 sm:grid-cols-2">
        {summary.chapters.map((ch, i) => {
          const complete = ch.total > 0 && ch.mastered === ch.total;
          return (
            <li key={ch.slug}>
              <Link
                href={chapterHref(outline.slug, ch.slug)}
                className="group flex h-full items-center gap-4 rounded-2xl border bg-card p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ProgressRing value={ch.mastered} max={ch.total} size={44} stroke={4} label={`${ch.mastered} of ${ch.total} mastered`}>
                  {complete ? <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" /> : <span className="text-muted-foreground">{i + 1}</span>}
                </ProgressRing>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-foreground">{ch.title}</span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">
                    {student ? `${ch.mastered} of ${ch.total} mastered` : `${ch.total} ${ch.total === 1 ? "concept" : "concepts"}`}
                    {student && ch.learning > 0 && <span className="text-brand-accent"> · {ch.learning} in progress</span>}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ol>
    </>
  );
}
