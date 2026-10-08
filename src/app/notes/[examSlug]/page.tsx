import type { Metadata } from "next";
import { notesExamTitle } from "@/lib/notes/titles";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, NotebookPen } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import {
  getNotesExamGroup,
  getNotesExamGroups,
  notesExamSlugs,
  type NotesExamGroup,
} from "@/lib/notes/notesNav";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getNotesTaxonomy } from "@/lib/notes/taxonomyCache";
import { getNotesChaptersForSubject } from "@/lib/notes/chapters";
import { loadChapterPyqCounts } from "@/lib/notes/chapterCounts";
import { buildHubSubject, chapterKey, type HubSubject } from "@/lib/notes/examHub";
import NotesHubChapters from "@/app/notes/_components/NotesHubChapters";
import ContinueReadingCard from "@/app/notes/_components/ContinueReadingCard";

export const revalidate = 86400;

type Params = { examSlug: string };

export function generateStaticParams(): Params[] {
  return notesExamSlugs().map((examSlug) => ({ examSlug }));
}

/**
 * The intro for one exam hub.
 *
 * Shared by the page and its metadata so the two cannot drift. Short since
 * 2026-10-07: the chapters now sit right below it, so the intro only has to
 * say what is covered. It answers a DIFFERENT question from the two levels
 * around it: /notes says what these notes are, the subject landing says how to
 * use them.
 *
 * Counts are pluralised because some live pages sit at 1, and "1 subjects" on
 * a real page is the most machine-written thing a template can do.
 */
function examIntro(examName: string, subjects: number, chapters: number): string {
  const s = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;
  return (
    `${examName} notes cover ${s(subjects, "subject")} and ${s(chapters, "chapter")}. ` +
    "Every subtopic ends with the past questions on it."
  );
}

function chapterTotal(group: { subjects: { chapterCount: number }[] }): number {
  return group.subjects.reduce((n, s) => n + s.chapterCount, 0);
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const group = getNotesExamGroup(params.examSlug);
  if (!group) return {};
  return {
    title: { absolute: notesExamTitle(group.examName) },
    description: examIntro(group.examName, group.subjects.length, chapterTotal(group)),
    alternates: { canonical: `/notes/${group.slug}` },
  };
}

/**
 * Every chapter of every subject, with its live past-question count. Counted
 * in Postgres per subject (the subject landing's loader); a failed count reads
 * as 0, and a subject whose counts all fail lists its chapters in book order.
 */
async function loadHubSubjects(group: NotesExamGroup): Promise<HubSubject[]> {
  const supabase = createSupabaseAnonClient();
  return Promise.all(
    group.subjects.map(async (s) => {
      const regs = getNotesChaptersForSubject(s.subjectRoute);
      const first = regs[0];
      const taxonomy = await getNotesTaxonomy(supabase, first.examName, first.subjectName);
      const ids = new Map(regs.map((r) => [r.chapterSlug, taxonomy.chapters.get(r.chapter.chapterName)?.id]));
      const counts = await loadChapterPyqCounts(supabase, {
        examId: taxonomy.examId,
        subjectId: taxonomy.subjectId,
        chapterIds: [...ids.values()].filter((id): id is string => Boolean(id)),
      });
      return buildHubSubject(
        s.subjectRoute,
        s.subjectDisplay,
        group.displayName,
        regs.map((r) => {
          const id = ids.get(r.chapterSlug);
          return {
            slug: r.chapterSlug,
            name: r.chapter.chapterName,
            subtopicCount: Object.keys(r.notes).length,
            count: id ? counts.get(id) ?? 0 : 0,
          };
        })
      );
    })
  );
}

export default async function NotesExamHub({ params }: { params: Params }) {
  const group = getNotesExamGroup(params.examSlug);
  if (!group) notFound();

  const sideNav = [
    { href: "/notes", label: "All exams" },
    ...getNotesExamGroups().map((g) => ({
      href: `/notes/${g.slug}`,
      label: g.displayName,
    })),
  ];

  const title = `${group.examName} notes`;
  const intro = examIntro(group.examName, group.subjects.length, chapterTotal(group));
  const subjects = group.subjects.length > 0 ? await loadHubSubjects(group) : [];

  // What the Continue card needs, for THIS exam's chapters only.
  const totals: Record<string, number> = {};
  const subjectLabels: Record<string, string> = {};
  for (const s of subjects) {
    subjectLabels[s.subjectRoute] = s.subjectDisplay;
    for (const c of s.chapters) totals[chapterKey(s.subjectRoute, c.slug)] = c.subtopicCount;
  }

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

      {subjects.length === 0 ? (
        <section className="mt-6 rounded-lg border bg-card p-8 text-center">
          <NotebookPen className="mx-auto h-6 w-6 text-muted-foreground" aria-hidden />
          <p className="mt-3 font-serif text-muted-foreground">
            {group.examName} teaching notes are coming soon. In the meantime, the full{" "}
            {group.examName} question bank is live: browse and build papers now.
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
        <>
          <ContinueReadingCard totals={totals} subjectLabels={subjectLabels} />
          <NotesHubChapters examSlug={group.slug} subjects={subjects} />
        </>
      )}
    </GuideShell>
  );
}
