import type { SupabaseClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import {
  EXAM_REGISTRY,
  resolveBankHref,
  type ExamEntry,
} from "./examContext";
import { getNotesExamGroups } from "@/lib/notes/notesNav";
import { examHomeHref } from "./examHome";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import type { KindCounts } from "./questionCounts";

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
  /** Best landing for this exam's card (guide → shipped notes → exam home → bank). */
  href: string;
  /** DB UUID, or null when the exam is registered in code but not seeded. */
  examId: string | null;
};

export type ExamCatalog = {
  exams: ExamCatalogItem[];
  totalPublicQuestions: number;
  /** The grand total by kind (the homepage headline names both). */
  totals: KindCounts;
};

/**
 * Best landing href for an exam card:
 *   1. its `/guide` subtree, if one has shipped;
 *   2. else its `/notes/<slug>` hub, if that exam has at least one notes chapter
 *      (a bare "coming soon" hub is a dead end, so we skip it);
 *   3. else its exam home (`/exams/<slug>`), which lists every chapter page;
 *   4. else, for an exam with no public content (its exam home 404s), the
 *      question bank (`/browse?examId=…`).
 * Step 3 replaced the bank on 2026-10-01: robots.ts disallows `/browse?*`, so
 * for Google a card pointing there led nowhere.
 * Pure — unit-tested.
 */
export function pickExamCardHref(
  exam: ExamEntry,
  examId: string | null,
  hasShippedNotes: boolean
): string {
  if (exam.guidesPath) return exam.guidesPath;
  if (hasShippedNotes && exam.notesPath) return exam.notesPath;
  if (!exam.noPublicContent) return examHomeHref(exam.slug);
  return resolveBankHref(examId);
}

/**
 * Shape the registry + looked-up counts/ids into the catalog view-model.
 * Pure (no DB) so the ordering, fallbacks, and totals are unit-testable.
 *
 * @param countsByExamName  exam DB name → PUBLIC question count
 * @param idsBySlug         exam slug → DB UUID (for the bank-href fallback)
 * @param notesSlugs        exam slugs that have at least one shipped notes chapter
 */
export function shapeExamCatalog(
  countsByExamName: Map<string, KindCounts>,
  idsBySlug: Map<string, string>,
  notesSlugs: Set<string>
): ExamCatalog {
  const exams: ExamCatalogItem[] = EXAM_REGISTRY.map((exam) => {
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
      href: pickExamCardHref(exam, examId, notesSlugs.has(exam.slug)),
      examId,
    };
  });

  const totals: KindCounts = {
    pyq: exams.reduce((sum, e) => sum + e.counts.pyq, 0),
    practice: exams.reduce((sum, e) => sum + e.counts.practice, 0),
  };

  return { exams, totalPublicQuestions: totals.pyq + totals.practice, totals };
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
};

/**
 * Load the DB half of the homepage catalog: one head-count per exam (safe
 * against the PostgREST 1000-row implicit-truncation trap — we never read row
 * payloads), plus the slug→UUID map for the bank-href fallback.
 *
 * Client-injectable so it can be driven against a test project.
 */
export async function loadExamCatalogPayload(
  client: SupabaseClient
): Promise<ExamCatalogCachePayload> {
  // Resolve every exam's UUID by name in one round-trip.
  const { data: examRows } = await client
    .from("exams")
    .select("id, name");
  const idByName = new Map<string, string>(
    (examRows ?? []).map((r) => [r.name as string, r.id as string])
  );

  const ids: [string, string][] = [];
  for (const exam of EXAM_REGISTRY) {
    const id = idByName.get(exam.examName);
    if (id) ids.push([exam.slug, id]);
  }

  // Two exact head-counts per exam, one per kind, so every surface can say
  // which it shows (UX_REVIEW_TRIAGE.md A1). Head counts: no row payload.
  const headCount = async (examId: string, kind: "pyq" | "practice") => {
    const { count } = await client
      .from("questions")
      .select("id", { count: "exact", head: true })
      .eq("exam_id", examId)
      .eq("visibility", "PUBLIC")
      .eq("question_kind", kind);
    return count ?? 0;
  };
  const counts: [string, KindCounts][] = await Promise.all(
    EXAM_REGISTRY.map(async (exam): Promise<[string, KindCounts]> => {
      const id = idByName.get(exam.examName);
      if (!id) return [exam.examName, { pyq: 0, practice: 0 }];
      const [pyq, practice] = await Promise.all([headCount(id, "pyq"), headCount(id, "practice")]);
      return [exam.examName, { pyq, practice }];
    })
  );

  return { counts, ids };
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
const loadCachedExamCatalogPayload = unstable_cache(
  async (): Promise<ExamCatalogCachePayload> =>
    loadExamCatalogPayload(createSupabaseAnonClient()),
  // v2 (2026-10-02): counts became {pyq, practice}. A new key, because an entry
  // cached in the old number shape would deserialize as a number here.
  ["exam-catalog-payload-v2"],
  { revalidate: 86400 }
);

/**
 * The homepage exam catalog.
 *
 * Only the DB half is cached. The registry order, the flags, the card hrefs and
 * the notes lookup are all recomputed per call from build-time constants — so
 * adding an exam or shipping a notes chapter shows up on the next deploy rather
 * than waiting out a 24-hour cache entry.
 */
export async function getCachedExamCatalog(): Promise<ExamCatalog> {
  const { counts, ids } = await loadCachedExamCatalogPayload();
  return shapeExamCatalog(
    new Map(counts),
    new Map(ids),
    new Set(getNotesExamGroups().map((g) => g.slug))
  );
}
