/**
 * Data layer for the public `/questions/<exam>/<subject>/<chapter>` landing pages.
 *
 * WHY THESE PAGES EXIST — two problems, one fix:
 *   1. COST. `/browse` reads `searchParams`, which in the App Router forces a
 *      fresh server render on every single hit, forever. It is the busiest route
 *      on the site and can never be cached. These pages take their filters from
 *      the PATH instead, so each one is built once and then served from cache.
 *   2. DISCOVERY. Every question in the bank currently sits behind a query string
 *      full of UUIDs, and the sitemap contains exactly one `/browse` URL. Google
 *      has ~one page to rank for a bank of ~24k questions. These give it ~250
 *      real, keyword-bearing pages instead.
 *
 * `/browse` is untouched and remains the interactive tool (all filters, private
 * questions for staff, the download dialog). These are read-only shop windows.
 *
 * VISIBILITY: everything here reads through the ANON client, so only PUBLIC
 * questions are ever counted or shown. That is correct by construction for a
 * public landing page — and it is also what makes the pages cacheable, since a
 * cookie-bound client cannot be used inside `unstable_cache`.
 */
import { unstable_cache } from "next/cache";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { EXAM_REGISTRY, isPracticeOnlyExam } from "@/lib/exam/examContext";
import { slugifyName, dedupeBySlug, findBySlug } from "@/lib/questions/slugs";
import { queryQuestions, type QueryResult } from "@/lib/questions/query";
import { parseFilters } from "@/lib/questions/filters";

/**
 * A chapter needs at least this many PUBLIC questions to earn a landing page.
 * Thin pages dilute a site's standing with search engines, and a 3-question page
 * is a poor landing experience anyway — those chapters stay reachable through
 * /browse and through their subject's landing index.
 */
export const MIN_QUESTIONS_FOR_LANDING = 15;

/** How many questions each landing page renders before pointing at /browse. */
export const LANDING_PAGE_SIZE = 50;

/** Cached for a day — new chapters arrive via ingest, not by the minute. */
const LANDING_TTL_SECONDS = 86400;

export type ChapterLanding = {
  examSlug: string;
  subjectSlug: string;
  chapterSlug: string;
  examName: string;
  subjectName: string;
  chapterName: string;
  examId: string;
  subjectId: string;
  chapterId: string;
  questionCount: number;
  /** Practice-only exams (textbook/worksheet banks) have no PYQ corpus. */
  practiceOnly: boolean;
};

type FacetRow = { chapter_id: string; q_count: number };

/**
 * Build the full routing table: every chapter with enough PUBLIC questions to
 * deserve a page, addressed by slug.
 *
 * Counts come from the existing `get_chapter_facets` aggregate (migration 0020 /
 * 0037) rather than from counting fetched rows — the row-counting version would
 * silently truncate at PostgREST's 1000-row cap, which is the single most-repeated
 * bug in this codebase. One RPC per subject (~31 total), then cached for a day.
 */
export const listChapterLandings = unstable_cache(
  async (): Promise<ChapterLanding[]> => {
    const db = createSupabaseAnonClient();

    const { data: examRows } = await db.from("exams").select("id, name");
    const examsByName = new Map((examRows ?? []).map((e) => [e.name, e.id]));

    const landings: ChapterLanding[] = [];

    for (const exam of EXAM_REGISTRY) {
      const examId = examsByName.get(exam.examName);
      if (!examId) continue; // Registered in code but not yet seeded in the DB.

      const practiceOnly = isPracticeOnlyExam(exam.examName);
      const kind = practiceOnly ? "practice" : "pyq";

      const { data: subjects } = await db
        .from("subjects")
        .select("id, name")
        .eq("exam_id", examId)
        .order("name");

      for (const subject of dedupeBySlug(subjects ?? [])) {
        const [{ data: chapters }, { data: facets }] = await Promise.all([
          db
            .from("chapters")
            .select("id, name")
            .eq("subject_id", subject.id)
            .order("name"),
          db.rpc("get_chapter_facets", {
            p_exam_id: examId,
            p_subject_id: subject.id,
            p_difficulties: null,
            p_pyq_years: null,
            p_q: null,
            p_kind: kind,
          }),
        ]);

        const counts = new Map(
          ((facets ?? []) as FacetRow[]).map((f) => [f.chapter_id, f.q_count])
        );

        for (const chapter of dedupeBySlug(chapters ?? [])) {
          const questionCount = counts.get(chapter.id) ?? 0;
          if (questionCount < MIN_QUESTIONS_FOR_LANDING) continue;
          landings.push({
            examSlug: exam.slug,
            subjectSlug: slugifyName(subject.name),
            chapterSlug: slugifyName(chapter.name),
            examName: exam.examName,
            subjectName: subject.name,
            chapterName: chapter.name,
            examId,
            subjectId: subject.id,
            chapterId: chapter.id,
            questionCount,
            practiceOnly,
          });
        }
      }
    }

    return landings;
  },
  ["questions-landing", "chapter-index"],
  { revalidate: LANDING_TTL_SECONDS }
);

/**
 * Resolve a URL back to its chapter. The routing table above IS the lookup —
 * one cached read resolves all three segments, so a request costs no extra
 * taxonomy queries.
 */
export async function getChapterLanding(
  examSlug: string,
  subjectSlug: string,
  chapterSlug: string
): Promise<ChapterLanding | null> {
  const all = await listChapterLandings();
  return (
    all.find(
      (l) =>
        l.examSlug === examSlug.toLowerCase() &&
        l.subjectSlug === subjectSlug.toLowerCase() &&
        l.chapterSlug === chapterSlug.toLowerCase()
    ) ?? null
  );
}

/** Sibling chapters in the same subject — the crawl path between landing pages. */
export async function getSiblingLandings(
  landing: ChapterLanding
): Promise<ChapterLanding[]> {
  const all = await listChapterLandings();
  return all.filter(
    (l) =>
      l.examSlug === landing.examSlug &&
      l.subjectSlug === landing.subjectSlug &&
      l.chapterSlug !== landing.chapterSlug
  );
}

/**
 * The ONE definition of "which questions is this landing page about".
 *
 * Both the page's own query and its "open in the full tool" link are derived
 * from this, so the two can never disagree — a student who clicks through sees
 * exactly the set they were just looking at, plus the rest.
 */
export function landingFilterParams(landing: ChapterLanding): URLSearchParams {
  return new URLSearchParams({
    examId: landing.examId,
    subjectId: landing.subjectId,
    chapterIds: landing.chapterId,
    kind: landing.practiceOnly ? "practice" : "pyq",
  });
}

/**
 * The chapter's questions. PUBLIC only (anon client) and capped — a landing page
 * is a shop window, not the whole tool; the rest are one click away in /browse.
 * Filters run through the same `parseFilters` the tool uses, so there is no
 * second interpretation of the same URL.
 */
export async function loadLandingQuestions(
  landing: ChapterLanding
): Promise<QueryResult> {
  return queryQuestions(
    createSupabaseAnonClient(),
    null,
    parseFilters(landingFilterParams(landing)),
    LANDING_PAGE_SIZE
  );
}

/** Deep link into the interactive tool with this chapter's filters pre-applied. */
export function browseHrefFor(landing: ChapterLanding): string {
  return `/browse?${landingFilterParams(landing).toString()}`;
}

/** Canonical path for a landing page. One place, so links and sitemap agree. */
export function landingHref(landing: ChapterLanding): string {
  return `/questions/${landing.examSlug}/${landing.subjectSlug}/${landing.chapterSlug}`;
}
