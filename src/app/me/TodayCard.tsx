"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays } from "lucide-react";
import { usePulse } from "@/lib/viewer/usePulse";
import type { Pulse } from "@/lib/pulse/cache";
import { examCountdownSentence } from "@/lib/exam/calendar";
import { pickTodayAction } from "@/lib/me/today";

/**
 * The one brand card on /me (2026-10-05). It replaced three cards that each
 * carried a full-width blue button (continue, the week strip's "Fix N", and
 * the welcome card): ONE lead action (lib/me/today.ts pickTodayAction), then
 * the week on quiet lines, the goal behind a "change" link.
 *
 * The due count arrives from the shared pulse (the header badge's read), so
 * the lead can move from "Continue" to "Fix N mistakes" once it lands; the
 * button keeps its place, only its words change.
 *
 * The study-days ring and its goal picker were removed 2026-11-08 (owner): the
 * ring sat at 0 for about 6 in 10 visitors and 13 students ever chose a goal,
 * and students here study in bursts, so a weekly count read as "you did
 * nothing". The exam countdown stays: a deadline is the pace that matters.
 */
export default function TodayCard({
  resume,
  cont,
  mockHref,
  pulse: given,
  initialPulse,
  readOnly = false,
}: {
  resume?: { title: string; href: string };
  cont?: { title: string; chapter: string; href: string };
  mockHref: string;
  /** The staff view of a student's /me passes the STUDENT's pulse, built on
   *  the server; left to fetch, this card would show the viewer's own. */
  pulse?: Pulse;
  /** The student's own Home: the pulse /me built on the server, shown from
   *  the first render and kept live (2026-11-08). */
  initialPulse?: Pulse | null;
  /** Staff view: nothing on the card may save as the student. */
  readOnly?: boolean;
}) {
  const live = usePulse(!given, initialPulse);
  const pulse = given ?? live;
  const action = pickTodayAction({ resume, due: pulse?.due ?? null, cont, mockHref });

  return (
    <section aria-labelledby="today-heading" className="hero-soft rounded-2xl p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">{action.eyebrow}</p>
          <h2 id="today-heading" className="mt-1 truncate text-xl font-semibold tracking-tight sm:text-2xl">
            {action.title}
          </h2>
          {action.subtitle && <p className="mt-0.5 truncate text-sm text-muted-foreground">{action.subtitle}</p>}
        </div>
        <Link
          href={action.href}
          prefetch={false}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {action.cta}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      {/* A separate, plainly clickable link: grey text right under the button
          read as part of it, so "Start" seemed to start the reading. */}
      {action.secondary && (
        <p className="mt-3 flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground">
          <BookOpen className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="shrink-0">Or continue:</span>
          <Link
            href={action.secondary.href}
            className="inline-flex min-w-0 items-center gap-1 font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="truncate">{action.secondary.label}</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
          </Link>
        </p>
      )}

      {/* The exam countdown, on a quiet line under a rule. */}
      {pulse?.exam && (
        <p className="mt-4 flex items-center gap-2 border-t border-brand/15 pt-4 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
          <span>
            {examCountdownSentence({ ...pulse.exam, source: "calendar", exam: null, date: "" })}
            {!pulse.exam.official && !readOnly && (
              <>
                {" · "}
                <Link href="/account" className="text-brand-accent underline-offset-4 hover:underline">
                  set your date
                </Link>
              </>
            )}
          </span>
        </p>
      )}
    </section>
  );
}
