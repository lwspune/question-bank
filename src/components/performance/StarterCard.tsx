"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Library, Timer } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { trackFunnel } from "@/lib/analytics/trackFunnel";
import type { Starter } from "@/lib/performance/starter";

/**
 * What the empty /performance page offers instead of a blank box (2026-10-06):
 * one short test, picked by lib/performance/starter.ts. Plain links, so a
 * student who ignores it loses nothing. Growth registry: "performance-starter".
 */
export default function StarterCard({
  starter,
  examName,
  boardHref,
}: {
  starter: Starter;
  /** Display name of the exam a "not-yet" card names. */
  examName: string | null;
  /** The board reader for a board exam; null otherwise. */
  boardHref: string | null;
}) {
  const why = starter.kind === "chapter" ? starter.why : "none";
  const tap = (target: string) => () => trackFunnel("performance_starter_click", { target, why });
  const after = "Finish it and this page shows your marks by chapter, what negative marking costs you and what to fix next.";

  if (starter.kind === "chapter" || starter.kind === "paper") {
    const test = starter.kind === "chapter" ? starter.test : starter.paper;
    const isChapter = starter.kind === "chapter";
    return (
      <section aria-labelledby="starter-title" className="rounded-lg border bg-card p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-accent">Start here</p>
        <h2 id="starter-title" className="mt-1 text-lg font-semibold">
          {test.title}
        </h2>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Timer className="h-3.5 w-3.5" aria-hidden />
          {test.questions} questions, {test.minutes} minutes
          {isChapter && starter.why === "last-read" && <span>. From the chapter you practised last.</span>}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">{after}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            prefetch={false}
            href={`/mock/${test.slug}`}
            onClick={tap(isChapter ? "chapter" : "paper")}
            className={cn(buttonVariants({ variant: "brand" }), "gap-1.5")}
          >
            {isChapter ? "Start the test" : "Start the paper"}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          {starter.kind === "chapter" && starter.paper && (
            <Link
              prefetch={false}
              href={`/mock/${starter.paper.slug}`}
              onClick={tap("paper")}
              className="rounded text-sm font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Or sit a full past paper ({starter.paper.minutes} min)
            </Link>
          )}
        </div>
      </section>
    );
  }

  if (starter.kind === "not-yet") {
    return (
      <section aria-labelledby="starter-title" className="rounded-lg border bg-card p-6">
        <h2 id="starter-title" className="text-lg font-semibold">
          Timed tests for {examName ?? "your exam"} are not live yet
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          This page fills in from timed tests. Until yours arrive, practise from the questions themselves.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {boardHref && (
            <Link
              prefetch={false}
              href={boardHref}
              onClick={tap("board")}
              className={cn(buttonVariants({ variant: "outline" }), "gap-1.5")}
            >
              <BookOpen className="h-4 w-4" aria-hidden />
              Textbook solutions
            </Link>
          )}
          <Link
            prefetch={false}
            href="/browse"
            onClick={tap("bank")}
            className={cn(buttonVariants({ variant: "outline" }), "gap-1.5")}
          >
            <Library className="h-4 w-4" aria-hidden />
            Practise questions
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="starter-title" className="rounded-lg border bg-card p-6">
      <h2 id="starter-title" className="text-lg font-semibold">
        Which exam are you preparing for?
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">Pick it and we will suggest a short timed test to start with.</p>
      <Link
        prefetch={false}
        href="/welcome?next=/performance"
        onClick={tap("pick-exam")}
        className={cn(buttonVariants({ variant: "brand" }), "mt-4 gap-1.5")}
      >
        Pick your exam
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </section>
  );
}
