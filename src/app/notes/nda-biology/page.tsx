import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getNotesTaxonomy } from "@/lib/notes/taxonomyCache";
import { getNotesChaptersForSubject } from "@/lib/notes/chapters";

export const revalidate = 3600;

const PAGE_TITLE = "NDA Biology — Teaching Notes";
const PAGE_INTRO =
  "Per-subtopic teaching notes for NDA Biology — built for digital-board lectures and " +
  "student self-study side-by-side. Each chapter breaks down into concept-by-concept units " +
  "with intuition, a reference table or worked example, a featured PYQ, traps, " +
  "and a one-click drill of every past-year question on that subtopic.";

export const metadata: Metadata = {
  title: `${PAGE_TITLE} — Notes for the digital board`,
  description: PAGE_INTRO,
  alternates: { canonical: "/notes/nda-biology" },
};

type ChapterCard = {
  slug: string;
  chapterName: string;
  title: string;
  intro: string;
  subtopicCount: number;
};

// Auto-derived from the NOTES_CHAPTERS registry. Add a chapter there →
// it shows up here without touching this file.
const CHAPTERS: ChapterCard[] = getNotesChaptersForSubject("nda-biology").map(
  (c) => ({
    slug: c.chapterSlug,
    chapterName: c.chapter.chapterName,
    title: c.chapter.title,
    intro: c.chapter.intro,
    subtopicCount: Object.keys(c.notes).length,
  })
);

const sideNav = [
  { href: "/notes/nda-biology", label: "Chapter index" },
  ...CHAPTERS.map((c) => ({
    href: `/notes/nda-biology/${c.slug}`,
    label: c.chapterName,
  })),
];

export default async function NdaBiologyNotesIndex() {
  const supabase = createSupabaseAnonClient();
  const taxonomy = await getNotesTaxonomy(supabase, "NDA", "Biology");

  // Live PYQ count per chapter — read from the bank, not curated.
  const chapterIds = CHAPTERS
    .map((c) => taxonomy.chapters.get(c.chapterName)?.id)
    .filter((id): id is string => Boolean(id));

  const countsByChapter = new Map<string, number>();
  if (chapterIds.length > 0) {
    const { data } = await supabase
      .from("questions")
      .select("chapter_id")
      .in("chapter_id", chapterIds);
    for (const row of data ?? []) {
      const id = (row as { chapter_id: string }).chapter_id;
      countsByChapter.set(id, (countsByChapter.get(id) ?? 0) + 1);
    }
  }

  return (
    <GuideShell
      guideTitle="NDA Biology Notes"
      sideNav={sideNav}
      breadcrumbs={[{ label: "Notes" }]}
    >
      <GuideJsonLd
        type="CollectionPage"
        path="/notes/nda-biology"
        headline={PAGE_TITLE}
        description={PAGE_INTRO}
      />

      <GuideHero
        eyebrow="NDA Biology · Teaching notes"
        title={PAGE_TITLE}
        subtitle={PAGE_INTRO}
      />

      <section className="mt-2 grid gap-4 sm:mt-4">
        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          <BookOpen className="h-4 w-4 text-primary" aria-hidden />
          Chapters
        </p>
        <ul className="space-y-3">
          {CHAPTERS.map((c) => {
            const chapterId = taxonomy.chapters.get(c.chapterName)?.id;
            const count = chapterId ? countsByChapter.get(chapterId) ?? 0 : 0;
            return (
              <li key={c.slug}>
                <Link
                  href={`/notes/nda-biology/${c.slug}`}
                  className="group block rounded-lg border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-primary/5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {c.title}
                    </h3>
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
