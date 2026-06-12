import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getNotesTaxonomy } from "@/lib/notes/taxonomyCache";
import { getNotesChaptersForSubject } from "@/lib/notes/chapters";

/**
 * Subject-level notes index (e.g. /notes/nda-biology) — lists every shipped
 * chapter under one subject as cards with live per-chapter PYQ counts. Fully
 * registry-derived: the per-subject route file is a ~6-line wrapper that just
 * passes its `subjectRoute`; everything (exam/subject names, title, intro,
 * cards) comes from `NOTES_CHAPTERS`. Mirrors the NotesChapterLanding pattern.
 */

function subjectMeta(subjectRoute: string) {
  const chapters = getNotesChaptersForSubject(subjectRoute);
  const first = chapters[0];
  if (!first) return null;
  const title = `${first.subjectDisplay} — Teaching Notes`;
  const intro =
    `Per-subtopic teaching notes for ${first.subjectDisplay} — built for digital-board ` +
    "lectures and student self-study side by side. Each chapter breaks into concept-by-concept " +
    "units with intuition, a reference table or worked example, a featured PYQ, traps, and a " +
    "one-click drill of every past-year question on that subtopic.";
  return { chapters, first, title, intro };
}

/** Metadata helper for the thin per-subject route wrapper. */
export function buildSubjectMetadata(subjectRoute: string): Metadata {
  const meta = subjectMeta(subjectRoute);
  if (!meta) return {};
  return {
    title: `${meta.title} — Notes for the digital board`,
    description: meta.intro,
    alternates: { canonical: `/notes/${subjectRoute}` },
  };
}

export default async function NotesSubjectLanding({
  subjectRoute,
}: {
  subjectRoute: string;
}) {
  const meta = subjectMeta(subjectRoute);
  if (!meta) notFound();
  const { chapters, first, title, intro } = meta;

  const supabase = createSupabaseAnonClient();
  const taxonomy = await getNotesTaxonomy(supabase, first.examName, first.subjectName);

  const cards = chapters.map((c) => ({
    slug: c.chapterSlug,
    chapterName: c.chapter.chapterName,
    title: c.chapter.title,
    intro: c.chapter.intro,
    subtopicCount: Object.keys(c.notes).length,
  }));

  // Live PYQ count per chapter — read from the bank, not curated.
  const chapterIds = cards
    .map((c) => taxonomy.chapters.get(c.chapterName)?.id)
    .filter((id): id is string => Boolean(id));

  const countsByChapter = new Map<string, number>();
  if (chapterIds.length > 0) {
    const { data } = await supabase
      .from("questions")
      .select("chapter_id")
      .in("chapter_id", chapterIds)
      .eq("question_kind", "pyq"); // PYQ-only per-chapter counts (migration 0036)
    for (const row of data ?? []) {
      const id = (row as { chapter_id: string }).chapter_id;
      countsByChapter.set(id, (countsByChapter.get(id) ?? 0) + 1);
    }
  }

  const sideNav = [
    { href: `/notes/${subjectRoute}`, label: "Chapter index" },
    ...cards.map((c) => ({ href: `/notes/${subjectRoute}/${c.slug}`, label: c.chapterName })),
  ];

  return (
    <GuideShell
      guideTitle={`${first.subjectDisplay} Notes`}
      sideNav={sideNav}
      breadcrumbs={[{ href: "/notes", label: "Notes" }, { label: first.subjectDisplay }]}
    >
      <GuideJsonLd
        type="CollectionPage"
        path={`/notes/${subjectRoute}`}
        headline={title}
        description={intro}
      />

      <GuideHero eyebrow={`${first.subjectDisplay} · Teaching notes`} title={title} subtitle={intro} />

      <section className="mt-2 grid gap-4 sm:mt-4">
        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          <BookOpen className="h-4 w-4 text-primary" aria-hidden />
          Chapters
        </p>
        <ul className="space-y-3">
          {cards.map((c) => {
            const chapterId = taxonomy.chapters.get(c.chapterName)?.id;
            const count = chapterId ? countsByChapter.get(chapterId) ?? 0 : 0;
            return (
              <li key={c.slug}>
                <Link
                  href={`/notes/${subjectRoute}/${c.slug}`}
                  className="group block rounded-lg border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-primary/5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold tracking-tight">{c.title}</h3>
                    <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary tabular-nums">
                      {count} PYQs · {c.subtopicCount} subtopics
                    </span>
                  </div>
                  <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
                    {c.intro}
                  </p>
                  <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary opacity-80 group-hover:opacity-100">
                    Open chapter notes
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </GuideShell>
  );
}
