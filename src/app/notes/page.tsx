import type { Metadata } from "next";
import { NOTES_INDEX_TITLE } from "@/lib/notes/titles";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { getNotesExamGroups } from "@/lib/notes/notesNav";
import YourNotesStrip from "./_components/YourNotesStrip";
import ExamFeedList from "@/components/exam/ExamFeedList";
import ExamGapNotice from "@/components/exam/ExamGapNotice";

export const revalidate = 86400;

const PAGE_TITLE = "Teaching Notes";
const PAGE_INTRO =
  "Notes written one subtopic at a time, for teaching off a board and for studying alone. " +
  "Each page explains the idea, gives you the formula, works through a real past-year " +
  "question, and names the mistakes that keep costing marks. Pick an exam to start.";

// On-page line, kept short (2026-10-04: walls of intro text were half of why
// the site felt unfinished). PAGE_INTRO stays the meta/JSON-LD description.
const PAGE_LEDE =
  "One subtopic at a time: the idea, the formula, a real past-year question and the mistakes that cost marks.";

export const metadata: Metadata = {
  title: { absolute: NOTES_INDEX_TITLE },
  description: PAGE_INTRO,
  alternates: { canonical: "/notes" },
};

export default function NotesIndex() {
  const groups = getNotesExamGroups();

  const sideNav = [
    { href: "/notes", label: "All exams" },
    ...groups.map((g) => ({ href: `/notes/${g.slug}`, label: g.displayName })),
  ];

  return (
    <GuideShell guideTitle="Teaching Notes" sideNav={sideNav} breadcrumbs={[{ label: "Notes" }]}>
      <GuideJsonLd
        type="CollectionPage"
        path="/notes"
        headline={PAGE_TITLE}
        description={PAGE_INTRO}
      />

      <GuideHero eyebrow="Teaching notes" title={PAGE_TITLE} subtitle={PAGE_LEDE} />

      {/* Signed-in only (client island) — keeps this index page ISR-static. */}
      <YourNotesStrip />

      <ExamGapNotice what="notes" covered={groups.map((g) => g.slug)} />

      <ExamFeedList
        as="div"
        className="mt-2 space-y-8 sm:mt-4"
        items={groups.map((g) => ({
          key: g.slug,
          slugs: [g.slug],
          node: (
            <section>
              <div className="flex items-center justify-between gap-2">
                <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  <BookOpen className="h-4 w-4 text-brand-accent" aria-hidden />
                  {g.displayName}
                </h2>
                <Link
                  href={`/notes/${g.slug}`}
                  className="text-xs font-medium text-brand-accent opacity-80 hover:opacity-100"
                >
                  All {g.displayName} notes →
                </Link>
              </div>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {g.subjects.map((s) => (
                  <li key={s.subjectRoute}>
                    <Link
                      href={`/notes/${s.subjectRoute}`}
                      className="group block h-full rounded-lg border bg-card p-4 transition-colors hover:border-brand/40 hover:bg-brand/5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold tracking-tight">{s.subjectDisplay}</h3>
                        <ArrowRight
                          className="h-4 w-4 text-brand-accent opacity-60 transition-opacity group-hover:opacity-100"
                          aria-hidden
                        />
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground tabular-nums">
                        {s.chapterCount} {s.chapterCount === 1 ? "chapter" : "chapters"} ·{" "}
                        {s.subtopicCount} subtopics
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ),
        }))}
      />
    </GuideShell>
  );
}
