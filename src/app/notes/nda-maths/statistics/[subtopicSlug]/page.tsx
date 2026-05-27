import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, BookOpen, Compass } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { loadWorkedExamples } from "@/lib/guide/loadWorkedExamples";
import { getNotesTaxonomy } from "@/lib/notes/taxonomyCache";
import { splitNoteIntoSlides } from "@/lib/notes/splitNoteIntoSlides";
import { loadResolvedDrills } from "@/lib/notes/loadResolvedDrills";
import { pickInterleavedCheckpoint } from "@/lib/notes/pickInterleavedCheckpoint";
import ConceptUnitCard from "@/app/notes/_components/ConceptUnitCard";
import NotePresenter from "@/app/notes/_components/NotePresenter";
import SubtopicMasteryCheckpoint from "@/app/notes/_components/SubtopicMasteryCheckpoint";
import SubtopicSummary from "@/app/notes/_components/SubtopicSummary";
import {
  STATISTICS_CHAPTER,
  STATISTICS_NOTES,
  STATISTICS_SLUGS,
} from "../_data";

type Params = { subtopicSlug: string };

// Notes are anon-readable static content. ISR with 1-hour revalidate means
// the first request after a cache miss does the DB work; everything within
// the window serves from the cached output (~ms response).
export const revalidate = 3600;

export function generateStaticParams(): Params[] {
  return STATISTICS_SLUGS.map((subtopicSlug) => ({ subtopicSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const note = STATISTICS_NOTES[params.subtopicSlug];
  if (!note) return { title: "Note not found" };
  return {
    title: `${note.title} — NDA Maths Statistics notes`,
    description: note.oneLineDefinition,
    alternates: {
      canonical: `/notes/nda-maths/statistics/${params.subtopicSlug}`,
    },
  };
}

const sideNavBase = [
  { href: "/notes/nda-maths/statistics", label: "Chapter overview" },
];

export default async function SubtopicNotePage({
  params,
}: {
  params: Params;
}) {
  const note = STATISTICS_NOTES[params.subtopicSlug];
  if (!note) notFound();

  const supabase = createSupabaseAnonClient();

  // Gather every PYQ UUID referenced by any concept (deduped, order preserved).
  const editorialPyqIds = Array.from(
    new Set(
      note.concepts
        .map((c) => c.pyqExampleId)
        .filter((id): id is string => Boolean(id))
    )
  );

  // Taxonomy is process-cached after the first hit — second request onward
  // returns instantly without DB round-trips.
  const taxonomy = await getNotesTaxonomy(supabase, "NDA", "Mathematics");
  const chapter = taxonomy.chapters.get(STATISTICS_CHAPTER.chapterName);
  const subtopicId = chapter?.subtopics.get(note.subtopicName) ?? null;

  // Drill tags + total subtopic count fire in parallel — neither depends on the other.
  const conceptsForResolver = note.concepts.map((c) => ({
    slug: c.slug,
    pyqExampleId: c.pyqExampleId,
  }));
  const [drillsByConcept, countRes] = await Promise.all([
    loadResolvedDrills(supabase, params.subtopicSlug, conceptsForResolver),
    subtopicId
      ? supabase
          .from("questions")
          .select("id", { count: "exact", head: true })
          .eq("subtopic_id", subtopicId)
      : Promise.resolve({ count: 0 as number | null }),
  ]);
  const drillCount = countRes.count ?? 0;

  // Mastery checkpoint: 5 ids picked round-robin across concepts. Computed
  // from `drillsByConcept` so we batch the bank-row fetch with the editorial PYQs.
  const checkpointIds = pickInterleavedCheckpoint(
    drillsByConcept,
    note.concepts.map((c) => c.slug),
    5
  );

  // Single bank fetch covers BOTH editorial featured PYQs and checkpoint rows.
  const allBankIds = Array.from(new Set([...editorialPyqIds, ...checkpointIds]));
  const pyqRows = await loadWorkedExamples(supabase, allBankIds);
  const pyqById = new Map(pyqRows.map((r) => [r.id, r]));

  const checkpointRows = checkpointIds
    .map((id) => pyqById.get(id))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const drillHref = subtopicId
    ? `/browse?examId=${taxonomy.examId}&subjectId=${taxonomy.subjectId}&subtopicIds=${subtopicId}`
    : "/browse";

  const slides = splitNoteIntoSlides(note, drillsByConcept);

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
      breadcrumbs={[
        { href: "/notes/nda-maths/statistics", label: "Statistics" },
        { label: note.title },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path={`/notes/nda-maths/statistics/${params.subtopicSlug}`}
        headline={`${note.title} — NDA Maths Statistics notes`}
        description={note.oneLineDefinition}
      />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex-1">
          <GuideHero
            eyebrow="NDA Maths · Statistics"
            title={note.title}
            subtitle={note.oneLineDefinition}
          />
        </div>
        <div className="shrink-0">
          <NotePresenter
            slides={slides}
            pyqExamples={pyqById}
            drillHref={drillHref}
            drillCount={drillCount}
          />
        </div>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-2 text-xs">
        <Link
          href="/notes/nda-maths/statistics"
          className="group inline-flex items-center gap-1.5 rounded-full border border-input bg-background px-3 py-1 font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
        >
          <BookOpen className="h-3.5 w-3.5" aria-hidden />
          <span>All Statistics notes</span>
        </Link>
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
      </div>

      {note.whyItMatters && (
        <section className="mb-10 rounded-lg border-l-4 border-primary bg-primary/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Why this matters
          </p>
          <p className="mt-2 font-serif text-base leading-relaxed text-foreground">
            {note.whyItMatters}
          </p>
        </section>
      )}

      {/* Table of concepts — anchor jumps */}
      {note.concepts.length > 0 && (
        <nav
          aria-label="Concepts in this subtopic"
          className="mb-10 rounded-lg border bg-muted/30 p-4"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {note.concepts.length} concepts in this subtopic
          </p>
          <ol className="grid gap-1.5 sm:grid-cols-2">
            {note.concepts.map((c, i) => (
              <li key={c.slug}>
                <a
                  href={`#${c.slug}`}
                  className="block rounded px-2 py-1 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <span className="mr-1.5 inline-block w-5 text-right font-semibold tabular-nums text-primary">
                    {i + 1}.
                  </span>
                  {c.name}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* The body: concept units in sequence */}
      <div className="space-y-8">
        {note.concepts.map((c, i) => (
          <ConceptUnitCard
            key={c.slug}
            concept={c}
            index={i + 1}
            total={note.concepts.length}
            pyqExample={c.pyqExampleId ? pyqById.get(c.pyqExampleId) ?? null : null}
            drillQuestionIds={drillsByConcept.get(c.slug) ?? []}
          />
        ))}
      </div>

      {/* End-of-subtopic recap — auto-derived from concept.formula + concept.traps.
          Renders nothing when the subtopic has neither. */}
      <SubtopicSummary note={note} />

      {/* Mastery checkpoint — interleaved questions from the concept-tag pool.
          Renders nothing when checkpointRows is empty (subtopic has no drills tagged yet). */}
      <SubtopicMasteryCheckpoint questions={checkpointRows} />

      {/* Final drill CTA */}
      <section className="mt-12 rounded-lg border-2 border-primary/40 bg-primary/5 p-6 text-center">
        <h2 className="text-lg font-semibold tracking-tight">
          Drill every past-year question on this subtopic
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
          {drillCount > 0
            ? `${drillCount} questions from the bank — paginated, with cart and Word-export support.`
            : "Open the bank with this subtopic pre-filtered."}
        </p>
        <div className="mt-4 flex justify-center">
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            subtopicIds={subtopicId ? [subtopicId] : []}
          >
            {drillCount > 0
              ? `Drill the ${drillCount} questions`
              : "Open in Browse"}
          </BrowseLink>
        </div>
      </section>

      {note.related && note.related.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Related notes
          </h2>
          <ul className="space-y-2">
            {note.related.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="text-sm text-primary hover:underline"
                >
                  {r.label} →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </GuideShell>
  );
}
