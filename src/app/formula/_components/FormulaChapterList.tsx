import Link from "next/link";
import type { FormulaIndexGroup } from "@/lib/formula/chapterPages";
import { formulaChapterHref } from "@/lib/formula/chapterPages";

/**
 * One exam's chapter formula pages, by subject: the list on the /formula
 * index and on each /formula/<exam> hub. Plain links, server-rendered, so the
 * whole list is in the HTML a crawler reads.
 */
export default function FormulaChapterList({
  group,
  headingLevel = "h3",
}: {
  group: FormulaIndexGroup;
  /** h3 under the index's per-exam h2; h2 on an exam hub, where the exam is the h1. */
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <div className="space-y-6">
      {group.subjects.map((s) => (
        <section key={s.subjectSlug} aria-labelledby={`fs-${group.examSlug}-${s.subjectSlug}`}>
          <Heading
            id={`fs-${group.examSlug}-${s.subjectSlug}`}
            className="text-base font-semibold tracking-tight"
          >
            {group.examDisplay} {s.subjectName}
          </Heading>
          <ul className="mt-2 flex flex-wrap gap-2">
            {s.pages.map((p) => (
              <li key={p.chapterSlug}>
                <Link
                  href={formulaChapterHref(p)}
                  className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {p.chapterName}
                  <span className="text-xs text-muted-foreground">
                    {p.counts.formulas}
                    <span className="sr-only"> formulas</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
