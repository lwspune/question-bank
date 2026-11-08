import Link from "next/link";
import { Sparkles } from "lucide-react";
import { goPracticeHref } from "@/lib/performance/links";
import { weightLine, type ChapterWeight } from "@/lib/me/startNext";

/**
 * "Start next" on Home (2026-11-09): the highest-value chapters of the
 * student's exam they have not answered a single question in, each with what
 * it is worth in a real paper, measured from the published past papers
 * (lib/me/startNext, migration 0242). Start opens the chapter's practice.
 */
export default function StartNext({
  chapters,
  title = "Start next",
  note = "Chapters you haven't started that are worth the most.",
}: {
  chapters: ChapterWeight[];
  /** The Chapters view names it "Not started yet" (2026-11-09). */
  title?: string;
  note?: string;
}) {
  if (chapters.length === 0) return null;
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
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {c.chapter}
                <span className="font-normal text-muted-foreground"> · {c.subject}</span>
              </p>
              <p className="mt-0.5 text-xs font-medium tabular-nums text-foreground">{weightLine(c)}</p>
            </div>
            <Link
              href={goPracticeHref(c.exam, c.subject, c.chapter)}
              prefetch={false}
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
