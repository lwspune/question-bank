import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";
import type { FixList, FixChapter } from "@/lib/review/fixList";
import { drillChapterHref, drillHref } from "@/lib/drill/from";
import { cn } from "@/lib/utils";

/**
 * The To fix list: the total with one Fix button, then every chapter, most to
 * fix first, each with why its questions are here and its own Fix.
 *
 * A board-plan student's Fix leads to the plan's Fix task first (the same
 * `scope=path` the plan card links), because those are today's.
 */
export default function FixOverview({
  list,
  focusExam,
  savedCount,
  subjects = [],
  subject = null,
  allCount,
}: {
  list: FixList;
  /** The header's exam focus: the list shows that exam's questions only. */
  focusExam: string | null;
  savedCount: number;
  /** Subject chips (2026-11-09): every subject waiting, with its count. */
  subjects?: { subject: string; count: number }[];
  /** The chosen chip; null = All. */
  subject?: string | null;
  /** Everything waiting, all subjects: the All chip's count. */
  allCount?: number;
}) {
  const chips =
    subjects.length > 1 ? <SubjectChips subjects={subjects} subject={subject} allCount={allCount ?? list.total} /> : null;
  if (list.total === 0) {
    return (
      <div className="space-y-6">
        {chips}
        <Empty savedCount={savedCount} />
      </div>
    );
  }

  // One subject chosen: the drill narrows to a chapter, not a subject, so the
  // lead button starts with that subject's biggest chapter.
  const first = subject ? list.chapters[0] : null;
  const planFirst = !first && list.inPlan > 0;
  const fixHref = first
    ? drillChapterHref("review_tab", first.chapterId)
    : planFirst
      ? "/drill?from=review_tab&scope=path"
      : drillHref("review_tab");
  const fixLabel = first ? `Start with ${first.name}` : planFirst ? `Fix today's ${list.inPlan} first` : "Start fixing";

  return (
    <div className="space-y-6">
      {chips}
      <section aria-labelledby="fix-heading" className="hero-soft flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="min-w-0">
          <h2 id="fix-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            {list.total.toLocaleString("en-IN")} {list.total === 1 ? "question" : "questions"} to fix
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {planFirst ? (
              <>
                <CalendarCheck className="mr-1 inline h-3.5 w-3.5 align-[-2px] text-emerald-600 dark:text-emerald-400" aria-hidden />
                <span className="font-medium text-foreground">
                  {list.inPlan} {list.inPlan === 1 ? "is" : "are"} in today&apos;s plan.
                </span>{" "}
              </>
            ) : null}
            Get one right and it leaves the list.
            {focusExam && <> Showing {focusExam} only.</>}
          </p>
        </div>
        <Link
          href={fixHref}
          prefetch={false}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {fixLabel}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </section>

      <section aria-labelledby="chapters-heading" className="rounded-2xl border bg-card p-4 sm:p-5">
        <h2 id="chapters-heading" className="text-sm font-semibold tracking-tight">
          By chapter
        </h2>
        <ul className="mt-2 divide-y">
          {list.chapters.map((c) => (
            <ChapterRow key={c.chapterId} chapter={c} />
          ))}
        </ul>
      </section>
    </div>
  );
}

function ChapterRow({ chapter: c }: { chapter: FixChapter }) {
  return (
    <li className="flex items-center gap-3 py-3">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{c.name}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          <span className="font-medium tabular-nums text-foreground">{c.count.toLocaleString("en-IN")} to fix</span>
          {c.place && <> · {c.place}</>}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">{breakdown(c)}</p>
        <Link
          href={`/review?chapter=${c.chapterId}`}
          prefetch={false}
          className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          See the questions
          <ArrowRight className="h-3 w-3" aria-hidden />
        </Link>
      </div>
      <Link
        href={drillChapterHref("review_tab", c.chapterId)}
        prefetch={false}
        aria-label={`Fix ${c.count} ${c.count === 1 ? "question" : "questions"} in ${c.name}`}
        className="inline-flex h-9 shrink-0 items-center justify-center rounded-md border px-4 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Fix
      </Link>
    </li>
  );
}

/** "4 wrong · 1 Review later · 1 V didn't help · 2 in today's plan". */
export function breakdown(c: Pick<FixChapter, "wrong" | "reviewLater" | "vUnclear" | "inPlan">): string {
  const parts: string[] = [];
  if (c.wrong) parts.push(`${c.wrong} wrong`);
  if (c.reviewLater) parts.push(`${c.reviewLater} Review later`);
  if (c.vUnclear) parts.push(`${c.vUnclear} not clear after V`);
  if (c.inPlan) parts.push(`${c.inPlan} in today's plan`);
  return parts.join(" · ");
}

/** All · Mathematics 23 · Physics 9: links (each list is its own server render), never prefetched. */
function SubjectChips({
  subjects,
  subject,
  allCount,
}: {
  subjects: { subject: string; count: number }[];
  subject: string | null;
  allCount: number;
}) {
  const chip = (label: string, count: number, href: string, active: boolean) => (
    <Link
      key={href}
      href={href}
      prefetch={false}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        active ? "border-brand-accent bg-brand/10 text-brand-accent" : "bg-card hover:bg-accent"
      )}
    >
      {label}
      <span className="tabular-nums opacity-80">{count.toLocaleString("en-IN")}</span>
    </Link>
  );
  return (
    <nav aria-label="Subject" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden">
      {chip("All", allCount, "/review", subject === null)}
      {subjects.map((s) => chip(s.subject, s.count, `/review?subject=${encodeURIComponent(s.subject)}`, subject === s.subject))}
    </nav>
  );
}

function Empty({ savedCount }: { savedCount: number }) {
  return (
    <section className="rounded-2xl border border-dashed p-8 text-center">
      <h2 className="font-semibold">Nothing to fix</h2>
      <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
        A question you get wrong, mark Review later, or tell V you didn&apos;t understand waits here until you get it right.
      </p>
      {savedCount > 0 && (
        <Link
          href="/review?list=saved"
          prefetch={false}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          See your {savedCount} saved
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      )}
    </section>
  );
}
