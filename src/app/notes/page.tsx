import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { getNotesExamGroups } from "@/lib/notes/notesNav";

export const revalidate = 3600;

const PAGE_TITLE = "Teaching Notes";
const PAGE_INTRO =
  "Free per-subtopic teaching notes across every exam we cover — built for digital-board " +
  "lectures and student self-study side by side. Pick an exam, then a subject, to open " +
  "concept-by-concept lessons with reference tables, worked examples, featured PYQs, traps, " +
  "and one-click drills.";

export const metadata: Metadata = {
  title: `${PAGE_TITLE} — Notes for the digital board`,
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

      <GuideHero eyebrow="Teaching notes" title={PAGE_TITLE} subtitle={PAGE_INTRO} />

      <div className="mt-2 space-y-8 sm:mt-4">
        {groups.map((g) => (
          <section key={g.slug}>
            <div className="flex items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                <BookOpen className="h-4 w-4 text-primary" aria-hidden />
                {g.displayName}
              </h2>
              <Link
                href={`/notes/${g.slug}`}
                className="text-xs font-medium text-primary opacity-80 hover:opacity-100"
              >
                All {g.displayName} notes →
              </Link>
            </div>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {g.subjects.map((s) => (
                <li key={s.subjectRoute}>
                  <Link
                    href={`/notes/${s.subjectRoute}`}
                    className="group block h-full rounded-lg border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-primary/5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold tracking-tight">{s.subjectDisplay}</h3>
                      <ArrowRight
                        className="h-4 w-4 text-primary opacity-60 transition-opacity group-hover:opacity-100"
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
        ))}
      </div>
    </GuideShell>
  );
}
