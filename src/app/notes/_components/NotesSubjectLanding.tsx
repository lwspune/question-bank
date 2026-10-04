import type { Metadata } from "next";
import { notesSubjectTitle } from "@/lib/notes/titles";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getNotesTaxonomy } from "@/lib/notes/taxonomyCache";
import { getNotesChaptersForSubject } from "@/lib/notes/chapters";
import { chapterCardBlurb } from "@/lib/notes/cardBlurb";
import { loadChapterPyqCounts } from "@/lib/notes/chapterCounts";

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
  // Says how to USE these notes. The /notes hub says what they are and the exam
  // hub says what is covered, so all three levels answer different questions —
  // before 2026-09-16 they rendered one sentence with the name swapped.
  //
  // Phrased "written to be…" and "No chapter assumes…" rather than "Each chapter
  // is…" because four subjects have exactly ONE chapter, where "each" reads
  // wrong. Pluralised for the same reason.
  const n = chapters.length;
  const intro =
    `${n} chapter${n === 1 ? "" : "s"} of ${first.subjectDisplay}, written to be taught ` +
    "from directly or read alone. No chapter assumes you have read the others, so start " +
    "wherever you are weakest. The question counts below are live, straight from the bank.";
  return { chapters, first, title, intro };
}

/** Metadata helper for the thin per-subject route wrapper. */
export function buildSubjectMetadata(subjectRoute: string): Metadata {
  const meta = subjectMeta(subjectRoute);
  if (!meta) return {};
  return {
    title: { absolute: notesSubjectTitle(meta.first.subjectDisplay) },
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
    // The short blurb, NOT the full intro: 30 cards x ~171 words rendered
    // ~5,100 words of prose on /notes/nda-maths alone, and 18 of 84 intros say
    // "below" — true in the chapter hero, false here, where what sits below is
    // the next chapter's card.
    blurb: chapterCardBlurb(c.chapter),
    subtopicCount: Object.keys(c.notes).length,
  }));

  // Live PYQ count per chapter — read from the bank, not curated. Counted in
  // Postgres: a row tally here hit the 1000-row cap and showed "0 PYQs" on
  // most cards of every big subject.
  const chapterIds = cards
    .map((c) => taxonomy.chapters.get(c.chapterName)?.id)
    .filter((id): id is string => Boolean(id));

  const countsByChapter = await loadChapterPyqCounts(supabase, {
    examId: taxonomy.examId,
    subjectId: taxonomy.subjectId,
    chapterIds,
  });

  const maxCount = Math.max(0, ...countsByChapter.values());

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
          <BookOpen className="h-4 w-4 text-brand-accent" aria-hidden />
          Chapters
        </p>
        {/* Two columns from sm up, the chapter name alone (every title repeated
            "— NDA Mathematics" 30 times), no "Open chapter notes" line (the card
            is the link), and a bar for the chapter's weight in the bank,
            scaled to the subject's heaviest chapter. */}
        <ul className="grid gap-3 sm:grid-cols-2">
          {cards.map((c) => {
            const chapterId = taxonomy.chapters.get(c.chapterName)?.id;
            const count = chapterId ? countsByChapter.get(chapterId) ?? 0 : 0;
            const pct = maxCount > 0 ? Math.round((count / maxCount) * 100) : 0;
            return (
              <li key={c.slug}>
                <Link
                  href={`/notes/${subjectRoute}/${c.slug}`}
                  className="group flex h-full flex-col rounded-xl border bg-card p-5 transition-colors hover:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="flex items-start gap-3">
                    <h3 className="flex-1 text-base font-semibold tracking-tight sm:text-lg">{c.chapterName}</h3>
                    <ArrowRight
                      className="mt-1 h-4 w-4 shrink-0 text-brand-accent transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </div>
                  <p className="mt-1.5 line-clamp-2 flex-1 font-serif text-sm leading-relaxed text-muted-foreground">
                    {c.blurb}
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-xs">
                    <span className="tabular-nums">
                      <span className="font-semibold text-foreground">{count}</span>{" "}
                      <span className="text-muted-foreground">PYQs · {c.subtopicCount} subtopics</span>
                    </span>
                    <span aria-hidden className="h-1.5 max-w-32 flex-1 overflow-hidden rounded-full bg-muted">
                      <span className="block h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </GuideShell>
  );
}
