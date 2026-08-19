import Link from "next/link";
import { cookies } from "next/headers";
import { Inbox } from "lucide-react";
import type { Metadata } from "next";
import { getPageIdentity } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  listExams,
  listSubjects,
  listChapters,
  listSubtopics,
  getExamNameById,
  getExamIdByName,
} from "@/lib/questions/taxonomy";
import {
  isPracticeOnlyExam,
  getExamBySlug,
  isExamSlug,
} from "@/lib/exam/examContext";
import { shouldScopeToPracticeOnlyCookieExam } from "@/lib/questions/browseDefaults";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  parseFilters,
  buildSearchParams,
  type Filters,
} from "@/lib/questions/filters";
import { queryQuestions, DEFAULT_PAGE_SIZE } from "@/lib/questions/query";
import {
  shouldShowBrowseLanding,
  buildExamStarters,
  pickStarterChapters,
} from "@/lib/questions/browseLanding";
import { getDefaultViewCountsByExam } from "@/lib/questions/defaultViewCounts";
import {
  mixedFormatExamIds,
  shouldShowFormatFilter,
} from "@/lib/questions/formatMix";
import { getCachedExamCatalog } from "@/lib/exam/allExamStats";
import { getExamIdMap } from "@/lib/exam/examIdMap";
import { listChapterLandings } from "@/lib/questions/landing";
import BrowseLanding from "./BrowseLanding";
import { mergeAndSortFacets, type FacetedOption } from "@/lib/questions/facets";
import { getResourceTagsForQuestions } from "@/lib/links/getResourceTagsForQuestions";
import FilterBar from "./FilterBar";
import MobileFilters from "./MobileFilters";
import QuestionList from "./QuestionList";
import Pagination from "./Pagination";
import DownloadDialog from "./DownloadDialog";
import CartPill from "./CartPill";
import BackToNotes from "./BackToNotes";
import Hero from "./Hero";
import ActiveFilterChips from "./ActiveFilterChips";
import FitCoverageNote from "./FitCoverageNote";
import { fitCoverage } from "@/lib/relevance/fit";
import { TOP_PRINCIPLES } from "@/app/guide/nda-maths/_data/principles";

export const metadata: Metadata = {
  title: "Browse questions",
  description:
    "Filter past-year questions by exam, chapter, difficulty, and year, and preview them free. Teachers can download the Question Paper + Answer Key as Word files.",
  alternates: { canonical: "/browse" },
};

type PageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

function paramsFromSearch(
  searchParams: Record<string, string | string[] | undefined>
): URLSearchParams {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(searchParams)) {
    if (v == null) continue;
    sp.set(k, Array.isArray(v) ? v[0] : v);
  }
  return sp;
}

export default async function BrowsePage({ searchParams }: PageProps) {
  // Public page: anon users are welcome. RLS scopes the question list.
  // isStaff (org member) unlocks the tagged sheet + "Add to paper"; any signed-in
  // account unlocks the paper/key downloads. Only resolve the user when not staff
  // (a member already implies a signed-in user).
  // ONE identity resolution (was three sequential ones — member + user +
  // superadmin, each with its own client and its own auth.getUser()). Anon
  // requests, which are the bulk of this route's traffic, short-circuit on a
  // cookie check and never touch Supabase auth at all.
  // canEditContent is superadmin-only (migration 0056) — the per-question
  // "Edit" affordance shows only for the platform admin.
  const { isStaff, isSignedIn, canEditContent } = await getPageIdentity();

  const rawParams = paramsFromSearch(searchParams);
  let filters = parseFilters(rawParams);
  const supabase = createSupabaseServerClient();

  // Practice-only exams (e.g. Foundation Course — no PYQ corpus) default the
  // kind filter to "practice" so the default view isn't an empty PYQ list.
  // Only when the user hasn't explicitly chosen a kind in the URL.
  if (filters.examId && !rawParams.has("kind")) {
    const examName = await getExamNameById(filters.examId);
    if (isPracticeOnlyExam(examName ?? undefined)) {
      filters = { ...filters, kind: "practice" };
    }
  }

  // Entry-path gap: a typed/bookmarked bare `/browse` (no examId) carries no
  // exam, so the practice-only default above can't fire even when the user's
  // active-exam cookie is a practice-only exam. Consult the cookie and, ONLY for
  // a practice-only exam, scope to it + default to Practice — mirroring what the
  // header "Bank" tab does. A PYQ-first cookie leaves bare /browse untouched.
  else if (!filters.examId && !rawParams.has("kind")) {
    const raw = cookies().get("qb_exam")?.value;
    const entry = isExamSlug(raw) ? getExamBySlug(raw) : null;
    if (
      shouldScopeToPracticeOnlyCookieExam({
        urlHasExamId: false,
        urlHasKind: false,
        cookieExamIsPracticeOnly: entry?.practiceOnly === true,
      }) &&
      entry
    ) {
      const examId = await getExamIdByName(entry.examName);
      if (examId) filters = { ...filters, examId, kind: "practice" };
    }
  }

  // Facet RPC args — context-aware: chapter facets reflect all OTHER active
  // filters (so the chapter list shrinks as the user narrows difficulty/year),
  // and subtopic facets additionally respect the chapter selection.
  const facetArgs = {
    p_exam_id: filters.examId,
    p_subject_id: filters.subjectId,
    p_difficulties:
      filters.difficulties.length > 0 ? filters.difficulties : null,
    p_pyq_years: filters.pyqYears.length > 0 ? filters.pyqYears : null,
    p_q: filters.q || null,
    p_kind: filters.kind,
    // Without this the sidebar keeps printing the unfiltered total while the
    // list shows the filtered subset — ~13-25x out on the board exams. See
    // migration 0078.
    p_format: filters.format,
  };

  // The bare page (no filters, anonymous viewer) skips the question query
  // entirely and renders a cached starting panel instead. MEASURED: 48% of
  // /browse renders carry no filters, and that shape runs the ~2.1s unfiltered
  // id-query that produces 98% of this database's statement timeouts. Org
  // members keep the live list — their reads include own-org PRIVATE rows that
  // the PUBLIC-only cached catalog cannot see. See lib/questions/browseLanding.
  const showLanding = shouldShowBrowseLanding({ filters, isStaff });

  // Taxonomy (exams/subjects/chapters/subtopics) is cached — it's identical for
  // every visitor and only moves on an ingest. The facet RPCs and the question
  // query below are NOT cached: they're `security invoker`, so their results are
  // RLS-scoped per viewer. See src/lib/questions/taxonomy.ts.
  const [
    exams,
    subjects,
    chapters,
    subtopics,
    { data: chapterFacets },
    { data: subtopicFacets },
    { data: pyqYears },
    questionsResult,
    landing,
    examIdsBySlug,
  ] = await Promise.all([
    listExams(),
    filters.examId ? listSubjects(filters.examId) : Promise.resolve([]),
    filters.subjectId ? listChapters(filters.subjectId) : Promise.resolve([]),
    listSubtopics(filters.chapterIds),
    filters.subjectId
      ? supabase.rpc("get_chapter_facets", facetArgs)
      : Promise.resolve({
          data: [] as { chapter_id: string; q_count: number }[],
        }),
    filters.chapterIds.length > 0
      ? supabase.rpc("get_subtopic_facets", {
          p_chapter_ids: filters.chapterIds,
          ...facetArgs,
        })
      : Promise.resolve({
          data: [] as { subtopic_id: string; q_count: number }[],
        }),
    supabase.rpc("get_pyq_years"),
    showLanding
      ? Promise.resolve({ totalCount: 0, rows: [] })
      : queryQuestions(supabase, null, filters, DEFAULT_PAGE_SIZE),
    showLanding ? loadLandingPanel() : Promise.resolve(null),
    // slug → uuid, cached hourly and already paid for by the header. Needed
    // because /browse filters by examId while the registry is keyed by slug.
    getExamIdMap(),
  ]);

  // Hidden on the five exams that are 100% MCQ, where it could only be a no-op.
  // Sourced from EXAM_REGISTRY.mixedFormats, NOT a live count — the live count
  // is a 49k-row seq scan that exceeds the anon statement_timeout. See
  // lib/questions/formatMix.ts, and tests/format-mix-registry for the probe
  // that keeps the flag honest.
  const showFormat = shouldShowFormatFilter({
    mixedExamIds: mixedFormatExamIds(examIdsBySlug),
    examId: filters.examId,
    activeFormat: filters.format,
  });

  // On the landing branch the hero + header count come from the cached catalog
  // rather than the question query's `count: "exact"` — the SAME source the
  // homepage uses, so the two pages can no longer print different totals.
  const totalCount = landing?.totalPublicQuestions ?? questionsResult.totalCount;

  const totalPages = Math.max(1, Math.ceil(totalCount / DEFAULT_PAGE_SIZE));

  // Tier 1.5 — batched per-question tag fetch for QuestionCard backlinks.
  // Two parallel SELECTs against the principle + concept tag tables, one
  // round-trip total. Failures degrade gracefully — backlinks fall back to
  // the chapter-level chips. Skipped outright on the landing branch: there are
  // no rows to tag, and `.in("id", [])` is a PostgREST 400.
  const resourceTags = landing
    ? new Map()
    : await getResourceTagsForQuestions(
        supabase,
        questionsResult.rows.map((r) => r.id)
      ).catch(() => new Map());

  const examOpts = (exams ?? []).map((e) => ({ id: e.id, name: e.name }));
  const subjectOpts = (subjects ?? []).map((s) => ({ id: s.id, name: s.name }));

  // Merge facet counts onto chapter and subtopic options. Both are sorted by
  // count desc and zero-count entries are hidden (per design — keeps the list
  // strategic, no "(0)" rows).
  const chapterFacetRows = (chapterFacets ?? []) as {
    chapter_id: string;
    q_count: number;
  }[];
  const subtopicFacetRows = (subtopicFacets ?? []) as {
    subtopic_id: string;
    q_count: number;
  }[];
  const chapterOpts: FacetedOption[] = mergeAndSortFacets(
    (chapters ?? []).map((c) => ({ id: c.id, name: c.name })),
    chapterFacetRows.map((f) => ({ id: f.chapter_id, count: f.q_count }))
  );
  const subtopicOpts: FacetedOption[] = mergeAndSortFacets(
    (subtopics ?? []).map((s) => ({
      id: s.id,
      name: s.name,
      orderIndex: s.order_index,
    })),
    subtopicFacetRows.map((f) => ({
      id: f.subtopic_id,
      count: f.q_count,
    }))
  );
  const pyqYearOpts = (pyqYears ?? []) as number[];

  const activeCount = countActiveFilters(filters);
  const filtered = activeCount > 0;

  // Recipe chips on the empty state are exam-scoped via the cookie-backed
  // active exam (independent of URL filters). Skipped entirely when any
  // filter is active.

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 pb-28 pt-8 sm:px-6 sm:pb-32">
        {!filtered && (
          <Hero totalPublicQuestions={totalCount} />
        )}

        <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {filtered ? "Filtered questions" : "All questions"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {totalCount.toLocaleString("en-IN")} question
              {totalCount === 1 ? "" : "s"}
              {filtered ? " match" : " available"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="lg:hidden">
              <MobileFilters
                filters={filters}
                exams={examOpts}
                subjects={subjectOpts}
                chapters={chapterOpts}
                subtopics={subtopicOpts}
                pyqYears={pyqYearOpts}
                showFormat={showFormat}
                activeCount={activeCount}
              />
            </div>
            <DownloadDialog
              filters={filters}
              totalCount={totalCount}
              isSignedIn={isSignedIn}
              isStaff={isStaff}
            />
          </div>
        </header>

        {filtered && (
          <ActiveFilterChips
            filters={filters}
            exams={examOpts}
            subjects={subjectOpts}
            chapters={chapterOpts}
            subtopics={subtopicOpts}
            principleNames={Object.fromEntries(
              TOP_PRINCIPLES.filter((p) => p.slug).map((p) => [p.slug as string, p.name])
            )}
            className="mb-4"
          />
        )}

        <FitCoverageNote
          coverage={fitCoverage(filters.fit, filters.chapterIds)}
          chapterName={(id) =>
            chapterOpts.find((c) => c.id === id)?.name ?? "this chapter"
          }
        />

        <div className="lg:grid lg:grid-cols-[18rem_1fr] lg:gap-8">
          <aside className="hidden lg:block">
            <div className="sticky top-20">
              <FilterBar
                filters={filters}
                exams={examOpts}
                subjects={subjectOpts}
                chapters={chapterOpts}
                subtopics={subtopicOpts}
                pyqYears={pyqYearOpts}
                showFormat={showFormat}
              />
            </div>
          </aside>

          <div className="min-w-0">
            {landing ? (
              <BrowseLanding
                exams={landing.exams}
                chapters={landing.chapters}
                chapterDirectoryCount={landing.chapterDirectoryCount}
              />
            ) : questionsResult.rows.length === 0 ? (
              <EmptyState filtered={filtered} />
            ) : (
              <QuestionList
                questions={questionsResult.rows}
                pageOffset={(filters.page - 1) * DEFAULT_PAGE_SIZE}
                canEdit={canEditContent}
                // Pre-existing semantics: this prop was `!!member` (org staff),
                // not "any signed-in account". Kept as-is — isStaff is the exact
                // same boolean, only sourced from the single identity call now.
                isLoggedIn={isStaff}
                supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!}
                includeExam={!filters.examId}
                resourceTags={resourceTags}
              />
            )}

            {!landing && totalPages > 1 && (
              <Pagination
                currentPage={filters.page}
                totalPages={totalPages}
                buildHref={(p) =>
                  `/browse?${buildSearchParams({ ...filters, page: p }).toString()}`
                }
              />
            )}
          </div>
        </div>
      </main>
      <BackToNotes />
      <CartPill
        filters={filters}
        isOrgMember={isStaff}
        isSignedIn={isSignedIn}
      />
      <Footer />
    </>
  );
}

function EmptyState({ filtered }: { filtered: boolean }) {
  return (
    <div className="rounded-xl border bg-card p-10 text-center shadow-sm sm:p-14">
      <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Inbox className="h-6 w-6" aria-hidden />
      </div>
      <h2 className="mt-5 text-base font-semibold sm:text-lg">
        {filtered ? "No questions match" : "No questions yet"}
      </h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
        {filtered
          ? "Try clearing chapters, widening difficulty, or removing the search term."
          : "Once an admin uploads an Excel file, questions will appear here."}
      </p>
      {filtered && (
        <Button asChild className="mt-5">
          <Link href="/browse">Clear filters</Link>
        </Button>
      )}
    </div>
  );
}

/**
 * Data for the bare-page starting panel. Three reads, ALL already cached and
 * all already paid for by other surfaces — `getCachedExamCatalog` by the
 * homepage, `getExamIdMap` by the header, `listChapterLandings` by /questions,
 * the 317 chapter landing pages and the sitemap (so the build leaves it warm).
 * No question query, and no cache this page is the sole owner of.
 */
async function loadLandingPanel() {
  const [catalog, examIds, landings, defaultViewCounts] = await Promise.all([
    getCachedExamCatalog(),
    getExamIdMap(),
    listChapterLandings(),
    getDefaultViewCountsByExam(),
  ]);
  return {
    // The hero's headline number stays the whole-bank total, on the same basis
    // the homepage prints — the two pages must not disagree about bank size.
    // The PILL counts are deliberately a different, narrower basis: each is
    // what its own destination will show. See buildExamStarters.
    totalPublicQuestions: catalog.totalPublicQuestions,
    exams: buildExamStarters(catalog, examIds, defaultViewCounts),
    chapters: pickStarterChapters(landings, { perExam: 2, total: 8 }),
    chapterDirectoryCount: landings.length,
  };
}

function countActiveFilters(f: Filters): number {
  let n = 0;
  if (f.examId) n++;
  if (f.subjectId) n++;
  if (f.chapterIds.length > 0) n++;
  if (f.subtopicIds.length > 0) n++;
  if (f.difficulties.length > 0) n++;
  if (f.pyqYears.length > 0) n++;
  if (f.principleSlug) n++;
  if (f.kind !== "pyq") n++;
  if (f.format !== "all") n++;
  if (f.q) n++;
  return n;
}
