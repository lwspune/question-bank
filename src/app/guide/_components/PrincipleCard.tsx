import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import BrowseLink from "./BrowseLink";

type Props = {
  rank?: number;
  name: string;
  qCount: number;
  pctHard?: number;
  summary: string;
  chapters?: string[];
  /** If set, principle has a detail page at /guide/nda-maths/principles/{slug}
   *  AND is backed by DB tags — the drill CTA uses `?principle=<slug>` and
   *  resolves to the live tagged set. */
  slug?: string;
  /** Static drill filter for long-tail (no-slug) principles. Mutually
   *  exclusive with `slug`. */
  drill?: {
    examId: string;
    subjectId: string;
    chapterIds: string[];
    subtopicIds: string[];
  };
};

/**
 * Card for the Principles page. Two flavours:
 *   - slug present (TOP_PRINCIPLES): "Read deep dive →" link to the per-principle
 *     detail page, plus a secondary BrowseLink using `?principle=<slug>`
 *     (live tagged set).
 *   - no slug (long-tail): single "Drill →" BrowseLink using the static
 *     `drill` subtopic filter.
 */
export default function PrincipleCard({
  rank,
  name,
  qCount,
  pctHard,
  summary,
  chapters,
  slug,
  drill,
}: Props) {
  return (
    <article className="rounded-lg border bg-card p-4 shadow-sm">
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            {rank != null && (
              <span className="text-xs font-medium uppercase tracking-wide tabular-nums text-muted-foreground">
                #{rank}
              </span>
            )}
            <h3 className="text-sm font-semibold tracking-tight sm:text-base">
              {name}
            </h3>
          </div>
          <p className="mt-1 text-xs tabular-nums text-muted-foreground">
            {qCount} questions
            {pctHard != null && <> · {pctHard}% hard</>}
            {chapters && chapters.length > 0 && (
              <>
                {" · "}
                <span title={chapters.join(", ")}>
                  {chapters.length} chapter{chapters.length === 1 ? "" : "s"}
                </span>
              </>
            )}
          </p>
        </div>
      </header>

      <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
        {summary}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {slug && (
          <Link
            href={`/guide/nda-maths/principles/${slug}`}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            <BookOpen className="h-3 w-3" aria-hidden />
            <span>Read deep dive</span>
            <ArrowRight className="h-3 w-3" aria-hidden />
          </Link>
        )}
        {slug ? (
          <BrowseLink
            principleSlug={slug}
            variant="outline"
            className="px-3 py-1.5 text-xs"
          >
            Drill the {qCount}
          </BrowseLink>
        ) : drill ? (
          <BrowseLink
            examId={drill.examId}
            subjectId={drill.subjectId}
            chapterIds={drill.chapterIds}
            subtopicIds={drill.subtopicIds}
            variant="primary"
            className="px-3 py-1.5 text-xs"
          >
            Drill the {qCount}
          </BrowseLink>
        ) : null}
      </div>
    </article>
  );
}
