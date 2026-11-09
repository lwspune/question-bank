"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { goPracticeHref } from "@/lib/performance/links";
import { marksLine, questionsLine, type ChapterWeight, type StartNextFrom } from "@/lib/me/startNext";
import { sendActivity, sendActivityOnce } from "@/lib/activity/clientBeacon";

/**
 * "Start next" on Home (2026-11-09): the highest-value chapters of the
 * student's exam they have not answered a single question in, each with what
 * it is worth in a real paper, measured from the published past papers
 * (lib/me/startNext, migration 0242). Start opens the chapter's practice.
 *
 * With `from`, the card records itself seen once a day and each Start tapped
 * (2026-11-09): the tap leaves for /browse, which records no source. The
 * staff view passes none, so a teacher reading a student's Home records nothing.
 */
export default function StartNext({
  chapters,
  title = "Start next",
  note = "Chapters you haven't started that are worth the most.",
  from,
}: {
  chapters: ChapterWeight[];
  /** The Chapters view names it "Not started yet" (2026-11-09). */
  title?: string;
  note?: string;
  /** The page, for the seen and tapped records; omitted in the staff view. */
  from?: StartNextFrom;
}) {
  const shown = chapters.length > 0;
  useEffect(() => {
    if (from && shown) sendActivityOnce(`start_next:${from}`, { kind: "surface_viewed", surface: "start_next", from });
  }, [from, shown]);

  if (!shown) return null;
  return (
    <section aria-labelledby="start-next-heading" className="rounded-2xl border bg-card p-4 sm:p-5">
      <h2 id="start-next-heading" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
        <Sparkles className="h-4 w-4 text-brand-accent" aria-hidden />
        {title}
      </h2>
      <p className="mt-0.5 text-xs text-muted-foreground">{note}</p>
      <ul className="mt-2 divide-y">
        {chapters.map((c) => (
          <li key={c.chapterId} className="flex items-center gap-3 py-2.5">
            {/* Wraps, never truncates: on a phone the chapter's name is the point of the line. */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{c.chapter}</p>
              <p className="mt-0.5 text-sm font-semibold tabular-nums text-brand-accent">{marksLine(c)}</p>
              <p className="text-xs tabular-nums text-muted-foreground">
                {questionsLine(c)} · {c.subject}
              </p>
            </div>
            <Link
              href={goPracticeHref(c.exam, c.subject, c.chapter)}
              prefetch={false}
              onClick={
                from
                  ? () => sendActivity({ kind: "surface_viewed", surface: "start_next_tap", chapterId: c.chapterId, from })
                  : undefined
              }
              aria-label={`Start ${c.chapter}`}
              className="inline-flex h-9 shrink-0 items-center justify-center rounded-md border px-4 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Start
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
