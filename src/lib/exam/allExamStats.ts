import type { SupabaseClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import {
  EXAM_REGISTRY,
  PYQVAULT_EXAMS,
  resolveBankHref,
  type ExamEntry,
} from "./examContext";
import { examHomeHref } from "./examHome";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import type { KindCounts } from "./questionCounts";
import { loadPublicQuestionCounts, tallyPublicCounts } from "./publicCounts";

/**
 * Catalog stats for the site homepage (`/`) — one row per exam in the
 * registry, in registry order, with a live PUBLIC question count and the
 * best landing href for that exam's card.
 *
 * Counts are TOTAL PUBLIC (pyq + practice), unlike `getExamHomeStats` which is
 * PYQ-only: practice-only exams (Foundation, State Board) have ~0 pyq rows, so
 * a pyq-only count would print "0 questions" on their card. Total PUBLIC gives
 * an honest number for every exam.
 */

export type ExamCatalogItem = {
  slug: string;
  displayName: string;
  examName: string;
  /** Every PUBLIC question, both kinds. Fine for an overall total; a per-exam
   *  figure on a page must come from `counts` and say its kind (A1). */
  totalPublicQuestions: number;
  /** PUBLIC questions by kind — what lib/exam/questionCounts.ts labels. */
  counts: KindCounts;
  practiceOnly: boolean;
  boardExam: boolean;
  /** Where this exam's card goes: its exam home, or the bank when it has none. */
  href: string;
  /** DB UUID, or null when the exam is registered in code but not seeded. */
  examId: string | null;
};

export type ExamCatalog = {
  exams: ExamCatalogItem[];
  totalPublicQuestions: number;
  /** The grand total by kind (the homepage headline names both). */
  totals: KindCounts;
  /** Every PUBLIC question in the bank, any exam, listed here or not (V's bank
   *  figure). `totalPublicQuestions` counts only the listed exams. */
  allPublicQuestions: number;
};

/**
 * Where an exam's homepage card and chip go: its exam home (`/nda`,
 * `/exams/<slug>`), which links on to the exam's guide, notes, mocks and
 * homework. For an exam with no public content (its exam home 404s), the
 * question bank (`/browse?examId=…`).
 *
 * Until 2026-11-07 a card went to the exam's guide, else its notes hub, else
 * its exam home, so neighbouring cards opened different kinds of page (SSC CGL
 * Tier I a guide, Tier II a hub). The site-coherence review sent them all to
 * the one page every exam has.
 * Pure — unit-tested.
 */
export function pickExamCardHref(exam: ExamEntry, examId: string | null): string {
  if (!exam.noPublicContent) return examHomeHref(exam.slug);
  return resolveBankHref(examId);
}

/**
 * Shape the registry + looked-up counts/ids into the catalog view-model.
 * Pure (no DB) so the ordering, fallbacks, and totals are unit-testable.
 *
 * @param countsByExamName  exam DB name → PUBLIC question count
 * @param idsBySlug         exam slug → DB UUID (for the bank-href fallback)
 */
export function shapeExamCatalog(
  countsByExamName: Map<string, KindCounts>,
  idsBySlug: Map<string, string>,
  // www's exams by default: the homepage, /about, llms.txt and V list these.
  // /exams/[examSlug] passes the full registry so an intl exam finds itself.
  registry: readonly ExamEntry[] = PYQVAULT_EXAMS,
  /** The whole bank's PUBLIC total; defaults to the listed exams' total. */
  allPublicTotal?: number
): ExamCatalog {
  const exams: ExamCatalogItem[] = registry.map((exam) => {
    const counts = countsByExamName.get(exam.examName) ?? { pyq: 0, practice: 0 };
    const examId = idsBySlug.get(exam.slug) ?? null;
    return {
      slug: exam.slug,
      displayName: exam.displayName,
      examName: exam.examName,
      totalPublicQuestions: counts.pyq + counts.practice,
      counts,
      practiceOnly: exam.practiceOnly === true,
      boardExam: exam.boardExam === true,
      href: pickExamCardHref(exam, examId),
      examId,
    };
  });

  const totals: KindCounts = {
    pyq: exams.reduce((sum, e) => sum + e.counts.pyq, 0),
    practice: exams.reduce((sum, e) => sum + e.counts.practice, 0),
  };

  const listed = totals.pyq + totals.practice;
  return { exams, totalPublicQuestions: listed, totals, allPublicQuestions: allPublicTotal ?? listed };
}

/**
 * The DB half of the catalog, in a shape `unstable_cache` can store.
 *
 * ENTRY ARRAYS, NOT MAPS — deliberately, and the tests pin it. `unstable_cache`
 * SERIALISES whatever its callback returns, and a Map serialises to `{}`. Cache
 * a Map here and every count silently reads 0: the homepage prints "0 questions"
 * on every card, with no error in any log. Rebuild the Maps on the way out.
 */
export type ExamCatalogCachePayload = {
  /** exam DB name → PUBLIC question counts by kind */
  counts: [string, KindCounts][];
  /** exam slug → DB UUID */
  ids: [string, string][];
  /** Every PUBLIC question, any exam (ExamCatalog.allPublicQuestions). */
  allPublicTotal: number;
};

/**
 * Load the DB half of the homepage catalog: every exam's PUBLIC counts from
 * one grouped read (public_question_counts, migration 0237; it was two head
 * counts per exam, 50 at once), plus the slug→UUID map for the bank-href
 * fallback.
 *
 * Client-injectable so it can be driven against a test project.
 *
 * THROWS on any failed read, never returns a 0 for it. `unstable_cache` keeps
 * whatever this returns for a day but never keeps a throw, so a failure must
 * throw to be retried. On 2026-10-08 one failed load, read as `count ?? 0`,
 * put "0 past-year questions" and "Coming soon" on every homepage card and
 * "0 public questions" on /browse until the entry expired.
 */
export async function loadExamCatalogPayload(
  client: SupabaseClient
): Promise<ExamCatalogCachePayload> {
  // Resolve every exam's UUID by name in one round-trip.
  const { data: examRows, error: examsError } = await client
    .from("exams")
    .select("id, name");
  // Anon can always read the exam list, so an empty one is a failure too.
  if (examsError || !examRows || examRows.length === 0) {
    throw new Error(
      `exam catalog: exams read failed (${examsError?.message ?? "no rows"})`
    );
  }
  const idByName = new Map<string, string>(
    examRows.map((r) => [r.name as string, r.id as string])
  );

  const ids: [string, string][] = [];
  for (const exam of EXAM_REGISTRY) {
    const id = idByName.get(exam.examName);
    if (id) ids.push([exam.slug, id]);
  }

  // Both kinds per exam, so every surface can say which it shows
  // (UX_REVIEW_TRIAGE.md A1). Throws on a failed or empty read.
  const { byExamId, total } = tallyPublicCounts(await loadPublicQuestionCounts(client));
  const counts: [string, KindCounts][] = EXAM_REGISTRY.map((exam) => {
    const id = idByName.get(exam.examName);
    // No row: the exam has no PUBLIC question of that kind, a genuine 0.
    return [exam.examName, (id && byExamId.get(id)) || { pyq: 0, practice: 0 }];
  });

  return { counts, ids, allPublicTotal: total };
}

/**
 * Cached DB half, shared by every visitor.
 *
 * WHY THIS EXISTS. The homepage declares `revalidate = 86400`, but it reads
 * cookies (to redirect signed-in staff to /dashboard) BEFORE fetching, which
 * opts the route out of static rendering — so that directive has never taken
 * effect and these 12 head-counts ran on EVERY anonymous request. Measured
 * 2026-08-13: 3,921 calls at 585 ms mean = ~38 minutes of database time in
 * four days, for numbers that only change when we ingest. Caching here fixes
 * the cost whether or not the route ever becomes static again.
 *
 * Cache-legal because it uses the ANON client: RLS returns PUBLIC rows only and
 * the payload is aggregate counts + exam UUIDs — no per-user data — so one copy
 * really can be served to everyone. Same property `getExamIdMap` relies on.
 */
const loadCachedExamCatalogPayload = () =>
  unstable_cache(
    async (): Promise<ExamCatalogCachePayload> =>
      loadExamCatalogPayload(createSupabaseAnonClient()),
    examCatalogCacheKey(new Date()),
    { revalidate: 86400 }
  )();

/**
 * The catalog's cache key: a shape version plus the UTC day.
 *
 * The version moves when the payload's SHAPE changes:
 * v2 (2026-10-02): counts became {pyq, practice}; an entry cached in the old
 * number shape would deserialize as a number here.
 * v3 (2026-10-09): dropped the all-zero entry cached on 2026-10-08, before
 * loadExamCatalogPayload learned to throw on a failed read.
 * v4 (2026-10-21): SPI went live; an older entry carried no SPI count.
 * v6 (2026-11-08): the payload gained allPublicTotal (V's bank figure).
 *
 * The DAY is there because `revalidate` alone did not keep the copy fresh: on
 * 2026-11-02 the homepage was still serving one that predated ISC and ICSE
 * going live on 10-30 (CISCE "Coming soon", ~1,550 questions short), and the
 * loader itself ran clean in under 2 s, so the refresh was simply not
 * happening. Yesterday's key cannot be read today, so no copy outlives its day,
 * and a newly live exam needs no hand-bumped version. Cost: one fresh load
 * (two head counts per exam, ~1 s) on the first request of each day.
 *
 * Pure. Spec: tests/exam-catalog-cache-key.test.ts.
 */
export function examCatalogCacheKey(now: Date): string[] {
  return ["exam-catalog-payload-v6", now.toISOString().slice(0, 10)];
}

/**
 * The homepage exam catalog.
 *
 * Only the DB half is cached. The registry order, the flags and the card hrefs
 * are all recomputed per call from build-time constants, so adding an exam
 * shows up on the next deploy rather than waiting out a 24-hour cache entry.
 */
export async function getCachedExamCatalog(
  registry: readonly ExamEntry[] = PYQVAULT_EXAMS
): Promise<ExamCatalog> {
  const { counts, ids, allPublicTotal } = await loadCachedExamCatalogPayload();
  return shapeExamCatalog(new Map(counts), new Map(ids), registry, allPublicTotal);
}

/**
 * The catalog for a page rendered on every request (the homepage, the bare
 * /browse), which has no older copy to fall back on. A failed load returns the
 * registry with NO counts and `countsKnown: false`, so the page can leave the
 * numbers out. Printing 0 would tell a visitor the bank is empty.
 *
 * Cached pages (/about, /exams/*, /llms.txt) call getCachedExamCatalog and let
 * the throw through: a failed refresh then keeps the last good copy, and a
 * failed build stops a deploy rather than shipping zeros.
 */
export async function getExamCatalogForRender(): Promise<{
  catalog: ExamCatalog;
  countsKnown: boolean;
}> {
  try {
    return { catalog: await getCachedExamCatalog(), countsKnown: true };
  } catch (err) {
    console.error("[exam catalog] load failed; rendering without counts", err);
    return {
      catalog: shapeExamCatalog(
        new Map(),
        new Map()
      ),
      countsKnown: false,
    };
  }
}
