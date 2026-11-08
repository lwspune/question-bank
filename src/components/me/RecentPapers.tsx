import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AttemptsList from "@/app/mock/_components/AttemptsList";
import type { UserAttempt } from "@/lib/mocks/query";
import type { summarizeUserMocks } from "@/lib/mocks/perf";

/**
 * "Papers you sat" on the Progress tab's Papers view (2026-11-08): the last
 * three papers with their scores, the count and best score, and every paper
 * one tap away. It was /me's Recent mocks card until Home kept only things
 * to do; Last paper, which left the summary band, is its first row.
 */
export default function RecentPapers({
  mocks,
  attempts,
  browseHref,
}: {
  mocks: ReturnType<typeof summarizeUserMocks>;
  attempts: UserAttempt[];
  /** The first target exam's catalogue, else /mock. */
  browseHref: string;
}) {
  if (attempts.length === 0) return null;
  const recent = attempts.slice(0, 3);
  const meta =
    mocks.completed > 0 ? `${mocks.completed} sat${mocks.bestPct == null ? "" : ` · best ${mocks.bestPct}%`}` : null;
  const more = attempts.length > recent.length;
  return (
    <section aria-labelledby="papers-heading" className="min-w-0 rounded-2xl border bg-card p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 id="papers-heading" className="min-w-0 truncate text-sm font-semibold tracking-tight">
          Papers you sat
          {meta && <span className="ml-2 font-normal tabular-nums text-muted-foreground">{meta}</span>}
        </h2>
        <Link
          href={more ? "/mock/attempts" : browseHref}
          prefetch={false}
          className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {more ? `All ${attempts.length}` : "Browse mocks"}
          <ArrowRight className="h-3 w-3" aria-hidden />
        </Link>
      </div>
      <AttemptsList attempts={recent} flush />
    </section>
  );
}
