import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, NotebookPen } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import {
  getNotesExamGroup,
  getNotesExamGroups,
  notesExamSlugs,
} from "@/lib/notes/notesNav";

export const revalidate = 86400;

type Params = { examSlug: string };

export function generateStaticParams(): Params[] {
  return notesExamSlugs().map((examSlug) => ({ examSlug }));
}

/**
 * The intro for one exam hub.
 *
 * Shared by the page and its metadata so the two cannot drift, and written to
 * answer a DIFFERENT question from the two levels around it: /notes says what
 * these notes are, this says what is covered for this exam, and the subject
 * landing says how to use them. Until 2026-09-16 all three rendered the same
 * sentence with a name swapped, which a reader meets twice in two clicks.
 *
 * Counts are pluralised because four live pages sit at 1 (JEE Mains and CDS
 * have one subject and one chapter each), and "1 subjects" on a real page is
 * the most machine-written thing a template can do.
 */
function examIntro(examName: string, subjects: number, chapters: number): string {
  const s = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;
  return (
    `${examName} notes cover ${s(subjects, "subject")} and ${s(chapters, "chapter")} ` +
    "so far. Each chapter breaks into subtopics, and every subtopic ends with a drill " +
    "of the past-year questions on it, so you can check you have actually learnt it " +
    "rather than just read it."
  );
}

function chapterTotal(group: { subjects: { chapterCount: number }[] }): number {
  return group.subjects.reduce((n, s) => n + s.chapterCount, 0);
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const group = getNotesExamGroup(params.examSlug);
  if (!group) return {};
  const title = `${group.examName} — Teaching Notes`;
  return {
    title: `${title} — Notes for the digital board`,
    description: examIntro(group.examName, group.subjects.length, chapterTotal(group)),
    alternates: { canonical: `/notes/${group.slug}` },
  };
}

export default function NotesExamHub({ params }: { params: Params }) {
  const group = getNotesExamGroup(params.examSlug);
  if (!group) notFound();

  const sideNav = [
    { href: "/notes", label: "All exams" },
    ...getNotesExamGroups().map((g) => ({
      href: `/notes/${g.slug}`,
      label: g.displayName,
    })),
  ];

  const title = `${group.examName} — Teaching Notes`;
  const intro = examIntro(group.examName, group.subjects.length, chapterTotal(group));

  return (
    <GuideShell
      guideTitle={`${group.displayName} Notes`}
      sideNav={sideNav}
      breadcrumbs={[{ href: "/notes", label: "Notes" }, { label: group.displayName }]}
    >
      <GuideJsonLd
        type="CollectionPage"
        path={`/notes/${group.slug}`}
        headline={title}
        description={intro}
      />

      <GuideHero eyebrow={`${group.displayName} · Teaching notes`} title={title} subtitle={intro} />

      {group.subjects.length === 0 ? (
        <section className="mt-6 rounded-lg border bg-card p-8 text-center">
          <NotebookPen className="mx-auto h-6 w-6 text-muted-foreground" aria-hidden />
          <p className="mt-3 font-serif text-muted-foreground">
            {group.examName} teaching notes are coming soon. In the meantime, the full{" "}
            {group.examName} question bank is live — browse and build papers now.
          </p>
          <Link
            href="/browse"
            className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Browse {group.examName} questions
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </section>
      ) : (
        <section className="mt-2 grid gap-4 sm:mt-4">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            <BookOpen className="h-4 w-4 text-primary" aria-hidden />
            Subjects
          </p>
          <ul className="space-y-3">
            {group.subjects.map((s) => (
              <li key={s.subjectRoute}>
                <Link
                  href={`/notes/${s.subjectRoute}`}
                  className="group block rounded-lg border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-primary/5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold tracking-tight">{s.subjectDisplay}</h3>
                    <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary tabular-nums">
                      {s.chapterCount} {s.chapterCount === 1 ? "chapter" : "chapters"} ·{" "}
                      {s.subtopicCount} subtopics
                    </span>
                  </div>
                  <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary opacity-80 group-hover:opacity-100">
                    Open {s.subjectDisplay} notes
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </GuideShell>
  );
}
