/**
 * Pure core for the unfiltered-`/browse` starting panel.
 *
 * WHY THIS EXISTS — measured over 24h of production traffic: 48% of `/browse`
 * renders carry no filters at all (683 of 1,415), and that shape is the one
 * that runs the unfiltered id-query. That query walks every PUBLIC row
 * (`question_kind` resolves as a Filter, not an Index Cond, so the index gives
 * it no selectivity), takes ~2.1s, and produces 352 of the 358 statement
 * timeouts this database serves per day. `/browse` is also the single largest
 * consumer of Vercel Active CPU at ~41%.
 *
 * The bare page therefore skips the question query and renders exam
 * start-pills built from the already-cached exam catalog. Deep filtering —
 * what `/browse` is actually for — is 11% of traffic and is untouched.
 *
 * DELIBERATELY NOT a directory page. `/` already renders exam cards with
 * counts and `/questions` is already the exam → subject → chapter crawl hub;
 * a third copy would leave no page owning the job. These pills APPLY A FILTER
 * in place (`/browse?examId=…`) rather than navigating away, which is the one
 * thing neither of those pages does.
 */
import { EMPTY_FILTERS, type Filters } from "./filters";
import { resolveBankHref } from "@/lib/exam/examContext";
import type { ExamIdMap } from "@/lib/exam/examNav";
import type { ExamCatalog } from "@/lib/exam/allExamStats";
import type { ChapterLanding } from "./landing";

export type ExamStarter = {
  slug: string;
  displayName: string;
  questionCount: number;
  /** `/browse?examId=<uuid>` — stays in the tool, unlike the homepage cards. */
  href: string;
};

export type StarterChapter = {
  chapterId: string;
  chapterName: string;
  examName: string;
  subjectName: string;
  questionCount: number;
  /** A fully-formed filter, not a link to the chapter's landing page. */
  href: string;
};

/**
 * True only when the question query would be genuinely unnarrowed.
 *
 * Compares the WHOLE filter set against EMPTY_FILTERS rather than counting
 * "active" filters. The page's own `countActiveFilters` is not usable here: it
 * ignores `extraIds` and `fit`, both of which narrow the result set, so a
 * `?fit=answerable` URL would count as zero active filters. Showing a
 * whole-bank panel to someone who asked for a subset is the failure this
 * guards against, so an unrecognised non-default value fails toward the live
 * list — never toward the panel.
 */
export function isBareBrowse(filters: Filters): boolean {
  if (filters.page !== 1) return false;
  for (const key of Object.keys(EMPTY_FILTERS) as (keyof Filters)[]) {
    if (key === "page") continue;
    const want = EMPTY_FILTERS[key];
    const got = filters[key];
    if (Array.isArray(want)) {
      if (!Array.isArray(got)) return false;
      if (got.length !== want.length) return false;
      if (got.some((v, i) => v !== (want as unknown[])[i])) return false;
      continue;
    }
    if (got !== want) return false;
  }
  return true;
}

/**
 * Org members keep the live list. Their reads are RLS-scoped and include their
 * own org's PRIVATE rows, so a panel built from the PUBLIC-only cached catalog
 * would under-report the bank to the only people able to notice. Anonymous
 * visitors and self-serve students see identical PUBLIC data by construction,
 * which is what makes the cached panel safe for them.
 */
export function shouldShowBrowseLanding({
  filters,
  isStaff,
}: {
  filters: Filters;
  isStaff: boolean;
}): boolean {
  return !isStaff && isBareBrowse(filters);
}

/**
 * Shape the cached catalog into filter-applying pills, in registry order.
 *
 * THE COUNT IS NOT THE CATALOG'S. `ExamCatalogItem.totalPublicQuestions` is
 * total PUBLIC (pyq + practice) — right for the homepage, whose cards link to
 * guides and notes. These pills link to `/browse?examId=…`, which defaults to
 * PYQ only, so the catalog figure would advertise NDA at 8,259 and land the
 * visitor on 4,860. `countsBySlug` (from `getDefaultViewCountsByExam`) carries
 * the number the destination will actually show.
 *
 * Summing `listChapterLandings` was tried for this and is NOT equivalent: it
 * drops every chapter under MIN_QUESTIONS_FOR_LANDING, which rendered NDA at
 * 4,699 against a destination of 4,860.
 *
 * Three exclusions, all because the pill would be a dead end: no questions in
 * the default view, no entry in the counts at all, or an unresolved UUID
 * (`resolveBankHref(null)` would link back to this very page).
 */
export function buildExamStarters(
  catalog: ExamCatalog,
  examIds: ExamIdMap,
  countsBySlug: Record<string, number>
): ExamStarter[] {
  const starters: ExamStarter[] = [];
  for (const exam of catalog.exams) {
    const questionCount = countsBySlug[exam.slug] ?? 0;
    if (questionCount <= 0) continue;
    const examId = examIds[exam.slug];
    if (!examId) continue;
    starters.push({
      slug: exam.slug,
      displayName: exam.displayName,
      questionCount,
      href: resolveBankHref(examId),
    });
  }
  return starters;
}

/**
 * The densest chapters, as ready-made filters — the second row of the panel.
 *
 * Reads the ALREADY-CACHED landing list, so it costs no extra round trip. The
 * per-exam cap is the point: a straight top-N by question count would be an
 * all-NDA-Maths list, since chapter size varies far more between exams than
 * within one.
 *
 * Ties break on chapter name, not insertion order, so the panel renders the
 * same list on every build. A starting panel that reshuffles for no visible
 * reason is worse than one that is slightly stale.
 */
export function pickStarterChapters(
  landings: ChapterLanding[],
  { perExam, total }: { perExam: number; total: number }
): StarterChapter[] {
  const ranked = landings
    .filter((l) => l.questionCount > 0)
    .sort(
      (a, b) =>
        b.questionCount - a.questionCount ||
        a.chapterName.localeCompare(b.chapterName)
    );

  const takenPerExam = new Map<string, number>();
  const picked: StarterChapter[] = [];
  for (const l of ranked) {
    if (picked.length >= total) break;
    const taken = takenPerExam.get(l.examSlug) ?? 0;
    if (taken >= perExam) continue;
    takenPerExam.set(l.examSlug, taken + 1);
    picked.push({
      chapterId: l.chapterId,
      chapterName: l.chapterName,
      examName: l.examName,
      subjectName: l.subjectName,
      questionCount: l.questionCount,
      href: chapterFilterHref(l),
    });
  }
  return picked;
}

/**
 * `examId` and `subjectId` ride along with the chapter deliberately: the
 * FilterBar's chapter list is populated from the selected subject, so a
 * chapter-only URL would land the visitor on a filtered result set whose
 * sidebar cannot show them what is selected.
 */
function chapterFilterHref(l: ChapterLanding): string {
  const sp = new URLSearchParams();
  sp.set("examId", l.examId);
  sp.set("subjectId", l.subjectId);
  sp.set("chapterIds", l.chapterId);
  return `/browse?${sp.toString()}`;
}
