import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Compass,
  Presentation,
} from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getNotesTaxonomy } from "@/lib/notes/taxonomyCache";
import { deriveSummary } from "@/lib/notes/deriveSummary";
import { buildConceptWeightTable } from "@/lib/notes/conceptWeight";
import type { NotesChapterRegistration } from "@/lib/notes/chapters";
import ChapterRevisionSheet from "./ChapterRevisionSheet";
import ConceptWeightTable from "./ConceptWeightTable";

/**
 * Chapter-agnostic renderer for a /notes chapter landing page. Each chapter's
 * `page.tsx` is a thin wrapper that delegates here with its registration.
 */

const routeBase = (c: NotesChapterRegistration) =>
  `/notes/${c.subjectRoute}/${c.chapterSlug}`;

/** Metadata for a chapter landing — call from the wrapper's metadata export. */
export function buildChapterMetadata(c: NotesChapterRegistration): Metadata {
  return {
    title: `${c.subjectDisplay} ${c.chapter.chapterName} — Notes for the digital board`,
    description: c.chapter.intro,
    alternates: { canonical: routeBase(c) },
  };
}

type Props = { chapter: NotesChapterRegistration };

export default async function NotesChapterLanding({ chapter }: Props) {
  const base = routeBase(chapter);
  const guideHref = `/guide/${chapter.subjectRoute}`;
  const examHomeHref = `/${chapter.examName.toLowerCase()}`;
  const meta = chapter.chapter;

  const supabase = createSupabaseAnonClient();
  const taxonomy = await getNotesTaxonomy(
    supabase,
    chapter.examName,
    chapter.subjectName
  );
  const chapterTax = taxonomy.chapters.get(meta.chapterName);

  const subtopicIds = meta.subtopicOrder
    .map((slug) => chapter.notes[slug]?.subtopicName)
    .map((name) => (name && chapterTax ? chapterTax.subtopics.get(name) : null))
    .filter((id): id is string => Boolean(id));

  const countsBySubtopic = new Map<string, number>();
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

  // Per-concept PYQ counts for the weightage table. Tags are keyed by
  // subtopic_slug (globally unique) — RLS scopes anon to tags on PUBLIC
  // questions only, matching the questions-table counts above.
  const countsByConcept = new Map<string, number>();
  if (meta.subtopicOrder.length > 0) {
    const { data } = await supabase
      .from("question_concept_tags")
      .select("subtopic_slug, concept_slug")
      .in("subtopic_slug", meta.subtopicOrder as string[]);
    for (const row of data ?? []) {
      const r = row as { subtopic_slug: string; concept_slug: string };
      const k = `${r.subtopic_slug}::${r.concept_slug}`;
      countsByConcept.set(k, (countsByConcept.get(k) ?? 0) + 1);
    }
  }
  const chapterTotalPyqs = Array.from(countsBySubtopic.values()).reduce(
    (a, n) => a + n,
    0
  );
  const conceptWeightGroups = buildConceptWeightTable(
    meta.subtopicOrder
      .map((slug) => {
        const n = chapter.notes[slug];
        if (!n) return null;
        return {
          subtopicTitle: n.title,
          subtopicHref: `${base}/${slug}`,
          concepts: n.concepts.map((c) => ({
            slug: c.slug,
            name: c.name,
            count: countsByConcept.get(`${slug}::${c.slug}`) ?? 0,
          })),
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null),
    chapterTotalPyqs
  );

  const sideNav = [
    { href: base, label: "Chapter overview" },
    ...meta.subtopicOrder.map((slug) => {
      const n = chapter.notes[slug];
      return { href: `${base}/${slug}`, label: n ? n.title : slug };
    }),
  ];

  // Chapter-wide revision sheet, auto-derived from the same data the
  // per-subtopic summaries use.
  const revisionGroups = meta.subtopicOrder
    .map((slug) => {
      const n = chapter.notes[slug];
      if (!n) return null;
      return {
        subtopicTitle: n.title,
        subtopicHref: `${base}/${slug}`,
        summary: deriveSummary(n),
      };
    })
    .filter((g): g is NonNullable<typeof g> => g !== null);

  return (
    <GuideShell
      guideTitle={`${chapter.examName} ${meta.chapterName} Notes`}
      sideNav={sideNav}
      breadcrumbs={[{ label: meta.chapterName }]}
    >
      <GuideJsonLd
        type="CollectionPage"
        path={base}
        headline={meta.title}
        description={meta.intro}
      />

      <GuideHero
        eyebrow={`${chapter.subjectDisplay} · Teaching notes`}
        title={meta.title}
        subtitle={meta.intro}
      />

      <div className="mb-8 flex flex-wrap items-center gap-2 text-xs">
        <Link
          href={guideHref}
          className="group inline-flex items-center gap-1.5 rounded-full border border-input bg-background px-3 py-1 font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
        >
          <Compass className="h-3.5 w-3.5" aria-hidden />
          <span>{chapter.subjectDisplay} strategy</span>
          <ArrowUpRight
            className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </Link>
        <Link
          href={examHomeHref}
          className="group inline-flex items-center gap-1.5 rounded-full border border-input bg-background px-3 py-1 font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
        >
          <BookOpen className="h-3.5 w-3.5" aria-hidden />
          <span>{chapter.examName} home</span>
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
          {meta.subtopicOrder.map((slug) => {
            const note = chapter.notes[slug];
            if (!note) {
              return (
                <li
                  key={slug}
                  className="rounded-lg border-2 border-dashed bg-muted/30 p-5 text-muted-foreground"
                >
                  <p className="text-sm font-medium text-foreground">{slug}</p>
                  <p className="mt-1 text-xs">Coming soon.</p>
                </li>
              );
            }
            const subtopicId = chapterTax?.subtopics.get(note.subtopicName);
            const count = subtopicId
              ? countsBySubtopic.get(subtopicId) ?? 0
              : 0;
            return (
              <li key={slug}>
                <Link
                  href={`${base}/${slug}`}
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

      <ConceptWeightTable
        groups={conceptWeightGroups}
        chapterTotalPyqs={chapterTotalPyqs}
      />

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
