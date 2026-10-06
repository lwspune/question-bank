import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, BookOpen, Compass, Sparkles } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { hasSubjectGuide } from "@/lib/guide/guideCatalog";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import ExpandableProse from "@/app/guide/_components/ExpandableProse";
import { NotesOnThisPage, NotesReadingProgress } from "./NotesReadingAids";
import { createSupabaseAnonClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { resolvePublicQuizForChapter } from "@/lib/quiz/publicQuiz";
import { singleFlight } from "@/lib/cache/singleFlight";
import { getSessionMember, getSessionUser } from "@/lib/auth";
import { userHasAccess } from "@/lib/entitlements/query";
import { isNotesGated, splitPreview } from "@/lib/notes/access";
import { loadWorkedExamples } from "@/lib/guide/loadWorkedExamples";
import { getNotesTaxonomy } from "@/lib/notes/taxonomyCache";
import { loadResolvedDrills } from "@/lib/notes/loadResolvedDrills";
import { pickInterleavedCheckpoint } from "@/lib/notes/pickInterleavedCheckpoint";
import type { NotesChapterRegistration } from "@/lib/notes/chapters";
import { notesSubtopicTitle } from "@/lib/notes/titles";
import { notesBreadcrumbs } from "@/lib/notes/breadcrumbs";
import { topicNav, mockCta, extraRelated } from "@/lib/notes/keepGoing";
import NotesKeepGoing from "./NotesKeepGoing";
import NotesMockCard from "./NotesMockCard";
import { mockCtaCopy, withChapterTest } from "@/lib/mocks/chapterTests";
import { listChapterTests } from "@/lib/mocks/chapterTestsQuery";
import NotesTestBar from "./NotesTestBar";
import VHello from "@/components/chat/VHello";
import { pickHello } from "@/lib/growth/secondPage";
import { listChapterLandings, landingHref } from "@/lib/questions/landing";
import { findChapterLanding } from "@/lib/questions/findLanding";
import ConceptUnitCard from "./ConceptUnitCard";
import NotesPaywall from "./NotesPaywall";
import PracticeGate from "./PracticeGate";
import NotesProgressControls from "./NotesProgressControls";
import SubtopicMasteryCheckpoint, { CheckpointPreview } from "./SubtopicMasteryCheckpoint";
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
    title: { absolute: notesSubtopicTitle(c, subtopicSlug)! },
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
  const nav = topicNav(chapter, subtopicSlug);
  const paperCta = mockCta(chapter.examName);
  const related = extraRelated(note.related, nav);

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
  // Only a subject with a strategy guide links one (JEE Chemistry has none yet).
  const guideHref = hasSubjectGuide(chapter.subjectRoute) ? `/guide/${chapter.subjectRoute}` : null;
  const metaSuffix = `${chapter.subjectDisplay} ${chapterName} notes`;

  // "Test yourself" CTA — the newest published public quiz for this chapter, if
  // any (null hides the CTA). Read-self-recall funnel into the lead capture.
  // Guarded so a DB/env hiccup never fails the (ISR-prerendered) notes page.
  let publicQuiz = null;
  try {
    // Shared while in progress: a chapter's subtopic pages build at once and
    // all ask for the same quiz (lib/cache/singleFlight).
    publicQuiz = await singleFlight(
      `notes-public-quiz:${chapter.subjectRoute}/${chapter.chapterSlug}`,
      () =>
        resolvePublicQuizForChapter(
          createSupabaseAdminClient(),
          chapter.subjectRoute,
          chapter.chapterSlug
        )
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
  // The chapter's own test when it has one, else the exam's past papers.
  const mock = withChapterTest(
    paperCta,
    chapterTax ? (await listChapterTests()).get(chapterTax.id) : undefined,
    chapterName
  );

  // The chapter's public /questions page, for V's one-time hello (growth
  // registry "second-page"). A failed lookup offers the test instead.
  const questionsLanding = findChapterLanding(
    await listChapterLandings().catch(() => []),
    { examName: chapter.examName, subjectName: chapter.subjectName, chapterName }
  );

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
          .eq("question_kind", "pyq") // drill count is PYQ-only (migration 0036)
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

  const drill = (
    <BrowseLink
      examId={taxonomy.examId}
      subjectId={taxonomy.subjectId}
      subtopicIds={subtopicId ? [subtopicId] : []}
      from={subtopicUrl}
      fromLabel={backLabel}
      variant="outline"
    >
      {drillCount > 0 ? `Drill all ${drillCount} questions` : "Open in the bank"}
    </BrowseLink>
  );

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
      breadcrumbs={notesBreadcrumbs(chapter, note.title)}
      rail={
        <NotesOnThisPage items={note.concepts.map((c) => ({ id: c.slug, label: c.name }))} />
      }
    >
      <NotesReadingProgress />
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
          className="group inline-flex items-center gap-1.5 rounded-full border border-input bg-background px-3 py-1 font-medium text-muted-foreground transition-colors hover:border-brand/40 hover:bg-brand/5 hover:text-brand-accent"
        >
          <BookOpen className="h-3.5 w-3.5" aria-hidden />
          <span>All {chapterName} notes</span>
        </Link>
        {guideHref && (
          <Link
            href={guideHref}
            className="group inline-flex items-center gap-1.5 rounded-full border border-input bg-background px-3 py-1 font-medium text-muted-foreground transition-colors hover:border-brand/40 hover:bg-brand/5 hover:text-brand-accent"
          >
            <Compass className="h-3.5 w-3.5" aria-hidden />
            <span>{chapter.subjectDisplay} strategy</span>
            <ArrowUpRight
              className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
        )}
      </div>

      {/* Track controls — signed-in only (renders null for anon, keeping the
          page's anon HTML unchanged for SEO). */}
      <NotesProgressControls
        subtopicSlug={subtopicSlug}
        chapterSlug={chapter.chapterSlug}
        subjectRoute={chapter.subjectRoute}
      />

      {note.whyItMatters && (
        <section className="mb-10 rounded-lg border-l-4 border-brand bg-brand/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-accent">
            Why this matters
          </p>
          {/* Clamped to 3 lines on a phone (whole from sm up): it ran ~16 phone
              lines before the first concept. Plain-text field, so safe to clamp. */}
          <div className="mt-2">
            <ExpandableProse
              text={note.whyItMatters}
              className="font-serif text-base leading-relaxed text-foreground"
              mobileOnly
            />
          </div>
        </section>
      )}

      {/* Table of concepts — anchor jumps */}
      {note.concepts.length > 0 && (
        <nav
          aria-label="Concepts in this subtopic"
          className="mb-10 rounded-lg border bg-muted/30 p-4 xl:hidden"
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
                  <span className="mr-1.5 inline-block w-5 text-right font-semibold tabular-nums text-brand-accent">
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
          {/* End-of-subtopic recap — auto-derived from concept.formula + concept.traps.
              Stays free (part of the readable teaching content). */}
          <SubtopicSummary note={note} />

          {/* Mastery checkpoint — interleaved questions from the concept-tag pool.
              Gated behind a free sign-in (client-side, so the page stays ISR). */}
          <PracticeGate
            variant="full"
            label="take the mastery checkpoint"
            preview={
              checkpointRows[0] ? (
                <CheckpointPreview question={checkpointRows[0]} total={checkpointRows.length} />
              ) : undefined
            }
          >
            <SubtopicMasteryCheckpoint
              questions={checkpointRows}
              subtopicSlug={subtopicSlug}
              chapterSlug={chapter.chapterSlug}
              subjectRoute={chapter.subjectRoute}
            />
          </PracticeGate>
        </>
      )}

      {/* The way on: next/previous topic, then ONE card to test the topic: a
          real paper first, the topic's past questions beside it. These were
          five boxed calls to action of equal weight in a row. */}
      <NotesKeepGoing next={nav.next} prev={nav.prev} />
      {mock ? (
        <NotesMockCard
          href={mock.href}
          examDisplay={mock.examDisplay}
          copy={mockCtaCopy(mock)}
          page="topic"
          secondary={drill}
        />
      ) : (
        <section className="mt-6 rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold tracking-tight">
            Drill the past-year questions on this topic
          </h2>
          <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">
            {drillCount > 0
              ? `${drillCount} questions from the bank, with cart and Word export.`
              : "Open the bank with this topic pre-filtered."}
          </p>
          <div className="mt-4">{drill}</div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Related notes
          </h2>
          <ul className="space-y-2">
            {related.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="text-sm text-brand-accent hover:underline"
                >
                  {r.label} →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      {mock && (
        <NotesTestBar href={mock.href} examDisplay={mock.examDisplay} line={mockCtaCopy(mock).bar} />
      )}
      <VHello
        surface="notes"
        hello={pickHello({
          surface: "notes",
          chapterName,
          questionCount: questionsLanding?.questionCount ?? 0,
          mock,
          notesHref: null,
          questionsHref: questionsLanding ? landingHref(questionsLanding) : null,
          bankHref: null,
        })}
      />
    </GuideShell>
  );
}
