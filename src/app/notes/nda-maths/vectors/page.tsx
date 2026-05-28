import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Compass, Presentation } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getNotesTaxonomy } from "@/lib/notes/taxonomyCache";
import { deriveSummary } from "@/lib/notes/deriveSummary";
import ChapterRevisionSheet from "@/app/notes/_components/ChapterRevisionSheet";

export const revalidate = 3600;
import {
  VECTORS_CHAPTER,
  VECTORS_NOTES,
  VECTORS_SLUGS,
} from "./_data";

export const metadata: Metadata = {
  title: "NDA Maths Vectors — Notes for the digital board",
  description: VECTORS_CHAPTER.intro,
  alternates: { canonical: "/notes/nda-maths/vectors" },
};

const sideNavBase = [
  { href: "/notes/nda-maths/vectors", label: "Chapter overview" },
];

export default async function VectorsChapterPage() {
  const supabase = createSupabaseAnonClient();
  const taxonomy = await getNotesTaxonomy(supabase, "NDA", "Mathematics");
  const chapter = taxonomy.chapters.get(VECTORS_CHAPTER.chapterName);

  const subtopicIds = VECTORS_CHAPTER.subtopicOrder
    .map((slug) => VECTORS_NOTES[slug]?.subtopicName)
    .map((name) => (name && chapter ? chapter.subtopics.get(name) : null))
    .filter((id): id is string => Boolean(id));

  let countsBySubtopic = new Map<string, number>();
  if (subtopicIds.length > 0) {
    const { data } = await supabase
      .from("questions")
      .select("subtopic_id")
      .in("subtopic_id", subtopicIds);
    for (const row of data ?? []) {
      const id = (row as { subtopic_id: string }).subtopic_id;
      countsBySubtopic.set(id, (countsBySubtopic.get(id) ?? 0) + 1);
    }
  }

  const sideNav = [
    ...sideNavBase,
    ...VECTORS_CHAPTER.subtopicOrder.map((slug) => {
      const n = VECTORS_NOTES[slug];
      return {
        href: `/notes/nda-maths/vectors/${slug}`,
        label: n ? n.title : slug,
      };
    }),
  ];

  // Chapter-wide revision sheet: every formula + trap across all subtopics,
  // grouped, auto-derived from the same data the per-subtopic summaries use.
  const revisionGroups = VECTORS_CHAPTER.subtopicOrder
    .map((slug) => {
      const n = VECTORS_NOTES[slug];
      if (!n) return null;
      return {
        subtopicTitle: n.title,
        subtopicHref: `/notes/nda-maths/vectors/${slug}`,
        summary: deriveSummary(n),
      };
    })
    .filter((g): g is NonNullable<typeof g> => g !== null);

  return (
    <GuideShell
      guideTitle="NDA Vectors Notes"
      sideNav={sideNav}
      breadcrumbs={[{ label: "Vectors" }]}
    >
      <GuideJsonLd
        type="CollectionPage"
        path="/notes/nda-maths/vectors"
        headline={VECTORS_CHAPTER.title}
        description={VECTORS_CHAPTER.intro}
      />

      <GuideHero
        eyebrow="NDA Mathematics · Teaching notes"
        title={VECTORS_CHAPTER.title}
        subtitle={VECTORS_CHAPTER.intro}
      />

      <div className="mb-8 flex flex-wrap items-center gap-2 text-xs">
        <Link
          href="/guide/nda-maths"
          className="group inline-flex items-center gap-1.5 rounded-full border border-input bg-background px-3 py-1 font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
        >
          <Compass className="h-3.5 w-3.5" aria-hidden />
          <span>NDA Maths strategy</span>
          <ArrowUpRight
            className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </Link>
        <Link
          href="/nda"
          className="group inline-flex items-center gap-1.5 rounded-full border border-input bg-background px-3 py-1 font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
        >
          <BookOpen className="h-3.5 w-3.5" aria-hidden />
          <span>NDA home</span>
          <ArrowUpRight
            className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </Link>
      </div>

      <section className="mt-2 grid gap-4 sm:mt-4">
        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          <BookOpen className="h-4 w-4 text-primary" aria-hidden />
          Subtopic notes
        </p>
        <ul className="space-y-3">
          {VECTORS_CHAPTER.subtopicOrder.map((slug) => {
            const note = VECTORS_NOTES[slug];
            if (!note) {
              return (
                <li
                  key={slug}
                  className="rounded-lg border-2 border-dashed bg-muted/30 p-5 text-muted-foreground"
                >
                  <p className="text-sm font-medium text-foreground">
                    {slug}
                  </p>
                  <p className="mt-1 text-xs">Coming soon.</p>
                </li>
              );
            }
            const subtopicId = chapter?.subtopics.get(note.subtopicName);
            const count = subtopicId
              ? countsBySubtopic.get(subtopicId) ?? 0
              : 0;
            return (
              <li key={slug}>
                <Link
                  href={`/notes/nda-maths/vectors/${slug}`}
                  className="group block rounded-lg border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-primary/5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {note.title}
                    </h3>
                    <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary tabular-nums">
                      {count} PYQs
                    </span>
                  </div>
                  <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
                    {note.oneLineDefinition}
                  </p>
                  <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary opacity-80 group-hover:opacity-100">
                    Open note
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <ChapterRevisionSheet groups={revisionGroups} />

      <section className="mt-12 rounded-lg border-2 border-primary/30 bg-primary/5 p-5">
        <p className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <Presentation className="h-4 w-4 text-primary" aria-hidden />
          Built for the digital board
        </p>
        <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
          Every subtopic note has a{" "}
          <span className="font-semibold text-primary">Present mode</span> button
          (top-right) that opens a full-screen slide deck designed for classroom
          projection — large fonts, concept-by-concept pacing, and a final
          &ldquo;drill the bank&rdquo; slide that jumps straight to filtered
          questions for student practice.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="font-medium uppercase tracking-wide">Keyboard:</span>
          <span className="inline-flex items-center gap-1">
            <kbd className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded border bg-card px-1 font-mono text-[10px] font-semibold">←</kbd>
            <kbd className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded border bg-card px-1 font-mono text-[10px] font-semibold">→</kbd>
            <span>navigate</span>
          </span>
          <span className="opacity-60">·</span>
          <span className="inline-flex items-center gap-1">
            <kbd className="inline-flex h-5 items-center justify-center rounded border bg-card px-1.5 font-mono text-[10px] font-semibold">Space</kbd>
            <span>next slide</span>
          </span>
          <span className="opacity-60">·</span>
          <span className="inline-flex items-center gap-1">
            <kbd className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded border bg-card px-1 font-mono text-[10px] font-semibold">F</kbd>
            <span>fullscreen</span>
          </span>
          <span className="opacity-60">·</span>
          <span className="inline-flex items-center gap-1">
            <kbd className="inline-flex h-5 items-center justify-center rounded border bg-card px-1.5 font-mono text-[10px] font-semibold">Esc</kbd>
            <span>exit</span>
          </span>
        </div>
      </section>
    </GuideShell>
  );
}
