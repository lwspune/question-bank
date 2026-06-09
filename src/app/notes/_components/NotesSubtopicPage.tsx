import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, BookOpen, Compass, Sparkles } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import { createSupabaseAnonClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { resolvePublicQuizForChapter } from "@/lib/quiz/publicQuiz";
import { getSessionMember, getSessionUser } from "@/lib/auth";
import { userHasAccess } from "@/lib/entitlements/query";
import { isNotesGated, splitPreview } from "@/lib/notes/access";
import { loadWorkedExamples } from "@/lib/guide/loadWorkedExamples";
import { getNotesTaxonomy } from "@/lib/notes/taxonomyCache";
import { loadResolvedDrills } from "@/lib/notes/loadResolvedDrills";
import { pickInterleavedCheckpoint } from "@/lib/notes/pickInterleavedCheckpoint";
import type { NotesChapterRegistration } from "@/lib/notes/chapters";
import ConceptUnitCard from "./ConceptUnitCard";
import NotesPaywall from "./NotesPaywall";
import SubtopicMasteryCheckpoint from "./SubtopicMasteryCheckpoint";
import SubtopicSummary from "./SubtopicSummary";

/**
 * Chapter-agnostic renderer for a single /notes subtopic page. Every chapter's
 * `[subtopicSlug]/page.tsx` is a thin wrapper that resolves its
 * NotesChapterRegistration from the registry and delegates here, so the full
 * data-loading + layout lives in one place. Per-chapter strings (route base,
 * display names, guide link) are derived from the registration.
 */

const routeBase = (c: NotesChapterRegistration) =>
  `/notes/${c.subjectRoute}/${c.chapterSlug}`;

/** Metadata for a subtopic route — call from the wrapper's generateMetadata. */
export function buildSubtopicMetadata(
  c: NotesChapterRegistration,
  subtopicSlug: string
): Metadata {
  const note = c.notes[subtopicSlug];
  if (!note) return { title: "Note not found" };
  return {
    title: `${note.title} — ${c.subjectDisplay} ${c.chapter.chapterName} notes`,
    description: note.oneLineDefinition,
    alternates: { canonical: `${routeBase(c)}/${subtopicSlug}` },
  };
}

type Props = {
  chapter: NotesChapterRegistration;
  subtopicSlug: string;
};

export default async function NotesSubtopicPage({
  chapter,
  subtopicSlug,
}: Props) {
  const note = chapter.notes[subtopicSlug];
  if (!note) notFound();

  // Preview-gate (paid chapters only). Reading session cookies makes a paid
  // chapter dynamic — its [subtopicSlug] wrapper must export force-dynamic
  // (notes-lint enforces). Free chapters skip this and stay ISR-cached.
  let gated = false;
  let isSignedIn = false;
  if (chapter.tier === "paid") {
    const [member, user] = await Promise.all([
      getSessionMember(),
      getSessionUser(),
    ]);
    isSignedIn = Boolean(member || user);
    let hasAccess = false;
    if (!member && user) {
      hasAccess = await userHasAccess(
        createSupabaseServerClient(),
        user.id,
        chapter.paidScope ?? "all"
      );
    }
    gated = isNotesGated({
      tier: chapter.tier,
      isMember: Boolean(member),
      hasAccess,
    });
  }

  const { preview: visibleConcepts, locked: lockedConcepts } = gated
    ? splitPreview(note.concepts, chapter.previewConceptCount ?? 2)
    : { preview: note.concepts, locked: [] as typeof note.concepts };

  const base = routeBase(chapter);
  const chapterName = chapter.chapter.chapterName;
  const guideHref = `/guide/${chapter.subjectRoute}`;
  const metaSuffix = `${chapter.subjectDisplay} ${chapterName} notes`;

  // "Test yourself" CTA — the newest published public quiz for this chapter, if
  // any (null hides the CTA). Read-self-recall funnel into the lead capture.
  // Guarded so a DB/env hiccup never fails the (ISR-prerendered) notes page.
  let publicQuiz = null;
  try {
    publicQuiz = await resolvePublicQuizForChapter(
      createSupabaseAdminClient(),
      chapter.subjectRoute,
      chapter.chapterSlug
    );
  } catch {
    publicQuiz = null;
  }

  const supabase = createSupabaseAnonClient();

  // Gather every PYQ UUID referenced by any concept (deduped, order preserved).
  const editorialPyqIds = Array.from(
    new Set(
      note.concepts
        .map((c) => c.pyqExampleId)
        .filter((id): id is string => Boolean(id))
    )
  );

  // Taxonomy is process-cached after the first hit.
  const taxonomy = await getNotesTaxonomy(
    supabase,
    chapter.examName,
    chapter.subjectName
  );
  const chapterTax = taxonomy.chapters.get(chapterName);
  const subtopicId = chapterTax?.subtopics.get(note.subtopicName) ?? null;

  // Drill tags + total subtopic count fire in parallel.
  const conceptsForResolver = note.concepts.map((c) => ({
    slug: c.slug,
    pyqExampleId: c.pyqExampleId,
  }));
  const [drillsByConcept, countRes] = await Promise.all([
    loadResolvedDrills(supabase, subtopicSlug, conceptsForResolver),
    subtopicId
      ? supabase
          .from("questions")
          .select("id", { count: "exact", head: true })
          .eq("subtopic_id", subtopicId)
      : Promise.resolve({ count: 0 as number | null }),
  ]);
  const drillCount = countRes.count ?? 0;

  // Mastery checkpoint: 5 ids picked round-robin across concepts, batched into
  // the bank fetch alongside the editorial featured PYQs.
  const checkpointIds = pickInterleavedCheckpoint(
    drillsByConcept,
    note.concepts.map((c) => c.slug),
    5
  );
  const allBankIds = Array.from(new Set([...editorialPyqIds, ...checkpointIds]));
  const pyqRows = await loadWorkedExamples(supabase, allBankIds);
  const pyqById = new Map(pyqRows.map((r) => [r.id, r]));

  const checkpointRows = checkpointIds
    .map((id) => pyqById.get(id))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const drillHref = subtopicId
    ? `/browse?examId=${taxonomy.examId}&subjectId=${taxonomy.subjectId}&subtopicIds=${subtopicId}`
    : "/browse";


  // Return target for the /browse "← Back to notes" pill: this subtopic's URL
  // (per-concept drills append the concept anchor) + a human label.
  const subtopicUrl = `${base}/${subtopicSlug}`;
  const backLabel = `${chapterName} notes`;

  const sideNav = [
    { href: base, label: "Chapter overview" },
    ...chapter.chapter.subtopicOrder.map((slug) => {
      const n = chapter.notes[slug];
      return { href: `${base}/${slug}`, label: n ? n.title : slug };
    }),
  ];

  return (
    <GuideShell
      guideTitle={`${chapter.examName} ${chapterName} Notes`}
      sideNav={sideNav}
      breadcrumbs={[
        { href: base, label: chapterName },
        { label: note.title },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path={`${base}/${subtopicSlug}`}
        headline={`${note.title} — ${metaSuffix}`}
        description={note.oneLineDefinition}
      />

      <GuideHero
        eyebrow={`${chapter.subjectDisplay} · ${chapterName}`}
        title={note.title}
        subtitle={note.oneLineDefinition}
      />

      <div className="mb-8 flex flex-wrap items-center gap-2 text-xs">
        <Link
          href={base}
          className="group inline-flex items-center gap-1.5 rounded-full border border-input bg-background px-3 py-1 font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
        >
          <BookOpen className="h-3.5 w-3.5" aria-hidden />
          <span>All {chapterName} notes</span>
        </Link>
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

      {publicQuiz && !gated && (
        <Link
          href={`/quiz/${publicQuiz.publicSlug}`}
          className="mb-10 flex items-center gap-3 rounded-lg border border-brand/30 bg-brand/5 p-4 transition-colors hover:bg-brand/10"
        >
          <Sparkles className="h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
          <span className="flex-1 text-sm">
            <span className="font-medium">Test yourself</span> — a quick{" "}
            {publicQuiz.questionCount}-question {chapterName} recall quiz, instant score.
          </span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
        </Link>
      )}

      {/* The body: concept units in sequence (sliced to the free preview when
          this is a gated paid chapter). The full concept table-of-contents
          above stays public, so the page still indexes every concept name. */}
      <div className="space-y-8">
        {visibleConcepts.map((c, i) => (
          <ConceptUnitCard
            key={c.slug}
            concept={c}
            subtopicSlug={subtopicSlug}
            index={i + 1}
            total={note.concepts.length}
            pyqExample={c.pyqExampleId ? pyqById.get(c.pyqExampleId) ?? null : null}
            drillQuestionIds={drillsByConcept.get(c.slug) ?? []}
            backHref={`${subtopicUrl}#${c.slug}`}
            backLabel={backLabel}
          />
        ))}
      </div>

      {gated ? (
        <NotesPaywall
          lockedCount={lockedConcepts.length}
          isSignedIn={isSignedIn}
          subjectDisplay={chapter.subjectDisplay}
        />
      ) : (
        <>
          {/* End-of-subtopic recap — auto-derived from concept.formula + concept.traps. */}
          <SubtopicSummary note={note} />

          {/* Mastery checkpoint — interleaved questions from the concept-tag pool. */}
          <SubtopicMasteryCheckpoint questions={checkpointRows} />
        </>
      )}

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
            from={subtopicUrl}
            fromLabel={backLabel}
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
