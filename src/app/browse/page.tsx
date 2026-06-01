import Link from "next/link";
import { Inbox } from "lucide-react";
import type { Metadata } from "next";
import { getSessionMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  parseFilters,
  buildSearchParams,
  type Filters,
} from "@/lib/questions/filters";
import { queryQuestions, DEFAULT_PAGE_SIZE } from "@/lib/questions/query";
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
import { TOP_11 } from "@/app/guide/nda-maths/_data/principles";

export const metadata: Metadata = {
  title: "Browse questions",
  description:
    "Filter past-year questions by exam, chapter, difficulty, and year. Download Question Paper + Answer Key as Word. Free, no sign-up.",
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
  const member = await getSessionMember();

  const filters = parseFilters(paramsFromSearch(searchParams));
  const supabase = createSupabaseServerClient();

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
  };

  const [
    { data: exams },
    { data: subjects },
    { data: chapters },
    { data: subtopics },
    { data: chapterFacets },
    { data: subtopicFacets },
    { data: pyqYears },
    questionsResult,
  ] = await Promise.all([
    supabase.from("exams").select("id, name").order("name"),
    filters.examId
      ? supabase
          .from("subjects")
          .select("id, name")
          .eq("exam_id", filters.examId)
          .order("name")
      : Promise.resolve({ data: [] as { id: string; name: string }[] }),
    filters.subjectId
      ? supabase
          .from("chapters")
          .select("id, name, order_index")
          .eq("subject_id", filters.subjectId)
          .order("order_index")
      : Promise.resolve({
          data: [] as { id: string; name: string; order_index: number }[],
        }),
    filters.chapterIds.length > 0
      ? supabase
          .from("subtopics")
          .select("id, name, chapter_id")
          .in("chapter_id", filters.chapterIds)
          .order("name")
      : Promise.resolve({
          data: [] as { id: string; name: string; chapter_id: string }[],
        }),
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
    queryQuestions(supabase, null, filters, DEFAULT_PAGE_SIZE),
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(questionsResult.totalCount / DEFAULT_PAGE_SIZE)
  );

  // Tier 1.5 — batched per-question tag fetch for QuestionCard backlinks.
  // Two parallel SELECTs against the principle + concept tag tables, one
  // round-trip total. Failures degrade gracefully — backlinks fall back to
  // the chapter-level chips.
  const resourceTags = await getResourceTagsForQuestions(
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
    (subtopics ?? []).map((s) => ({ id: s.id, name: s.name })),
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
          <Hero totalPublicQuestions={questionsResult.totalCount} />
        )}

        <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {filtered ? "Filtered questions" : "All questions"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {questionsResult.totalCount.toLocaleString("en-IN")} question
              {questionsResult.totalCount === 1 ? "" : "s"}
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
                activeCount={activeCount}
              />
            </div>
            <DownloadDialog
              filters={filters}
              totalCount={questionsResult.totalCount}
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
              TOP_11.filter((p) => p.slug).map((p) => [p.slug as string, p.name])
            )}
            className="mb-4"
          />
        )}

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
              />
            </div>
          </aside>

          <div className="min-w-0">
            {questionsResult.rows.length === 0 ? (
              <EmptyState filtered={filtered} />
            ) : (
              <QuestionList
                questions={questionsResult.rows}
                pageOffset={(filters.page - 1) * DEFAULT_PAGE_SIZE}
                canEdit={member?.role === "ADMIN" || member?.role === "TEACHER"}
                isLoggedIn={!!member}
                supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!}
                includeExam={!filters.examId}
                resourceTags={resourceTags}
              />
            )}

            {totalPages > 1 && (
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
      <CartPill filters={filters} />
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

function countActiveFilters(f: Filters): number {
  let n = 0;
  if (f.examId) n++;
  if (f.subjectId) n++;
  if (f.chapterIds.length > 0) n++;
  if (f.subtopicIds.length > 0) n++;
  if (f.difficulties.length > 0) n++;
  if (f.pyqYears.length > 0) n++;
  if (f.principleSlug) n++;
  if (f.q) n++;
  return n;
}
