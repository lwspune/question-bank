import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Presentation } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getNotesTaxonomy } from "@/lib/notes/taxonomyCache";

export const revalidate = 3600;
import {
  STATISTICS_CHAPTER,
  STATISTICS_NOTES,
  STATISTICS_SLUGS,
} from "./_data";

export const metadata: Metadata = {
  title: "NDA Maths Statistics — Notes for the digital board",
  description: STATISTICS_CHAPTER.intro,
  alternates: { canonical: "/notes/nda-maths/statistics" },
};

const sideNavBase = [
  { href: "/notes/nda-maths/statistics", label: "Chapter overview" },
];

export default async function StatisticsChapterPage() {
  const supabase = createSupabaseAnonClient();
  const taxonomy = await getNotesTaxonomy(supabase, "NDA", "Mathematics");
  const chapter = taxonomy.chapters.get(STATISTICS_CHAPTER.chapterName);

  const subtopicIds = STATISTICS_CHAPTER.subtopicOrder
    .map((slug) => STATISTICS_NOTES[slug]?.subtopicName)
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
    ...STATISTICS_CHAPTER.subtopicOrder.map((slug) => {
      const n = STATISTICS_NOTES[slug];
      return {
        href: `/notes/nda-maths/statistics/${slug}`,
        label: n ? n.title : slug,
      };
    }),
  ];

  return (
    <GuideShell
      guideTitle="NDA Statistics Notes"
      sideNav={sideNav}
      breadcrumbs={[{ label: "Statistics" }]}
    >
      <GuideJsonLd
        type="CollectionPage"
        path="/notes/nda-maths/statistics"
        headline={STATISTICS_CHAPTER.title}
        description={STATISTICS_CHAPTER.intro}
      />

      <GuideHero
        eyebrow="NDA Mathematics · Teaching notes"
        title={STATISTICS_CHAPTER.title}
        subtitle={STATISTICS_CHAPTER.intro}
      />

      <section className="mt-2 grid gap-4 sm:mt-4">
        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          <BookOpen className="h-4 w-4 text-primary" aria-hidden />
          Subtopic notes
        </p>
        <ul className="space-y-3">
          {STATISTICS_CHAPTER.subtopicOrder.map((slug) => {
            const note = STATISTICS_NOTES[slug];
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
                  href={`/notes/nda-maths/statistics/${slug}`}
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

      <section className="mt-12 rounded-lg border bg-card p-5">
        <p className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <Presentation className="h-4 w-4 text-primary" aria-hidden />
          Built for the digital board
        </p>
        <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
          Every note has a <span className="font-medium">Present</span> button
          that opens a full-screen slide deck — large fonts, keyboard navigation
          (←/→/Space), fullscreen toggle, and a final &ldquo;drill the bank&rdquo;
          slide that jumps straight to filtered questions for student practice.
        </p>
      </section>
    </GuideShell>
  );
}
