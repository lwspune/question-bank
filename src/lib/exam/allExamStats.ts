import type { SupabaseClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import {
  EXAM_REGISTRY,
  resolveBankHref,
  type ExamEntry,
} from "./examContext";
import { getNotesExamGroups } from "@/lib/notes/notesNav";
import { createSupabaseAnonClient } from "@/lib/supabase/server";

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
  totalPublicQuestions: number;
  practiceOnly: boolean;
  boardExam: boolean;
  /** Best landing for this exam's card (guide → shipped notes → bank). */
  href: string;
};

export type ExamCatalog = {
  exams: ExamCatalogItem[];
  totalPublicQuestions: number;
};

/**
 * Best landing href for an exam card:
 *   1. its `/guide` subtree, if one has shipped;
 *   2. else its `/notes/<slug>` hub, if that exam has at least one notes chapter
 *      (a bare "coming soon" hub is a dead end, so we skip it);
 *   3. else that exam's question bank (`/browse?examId=…`).
 * Pure — unit-tested.
 */
export function pickExamCardHref(
  exam: ExamEntry,
  examId: string | null,
  hasShippedNotes: boolean
): string {
  if (exam.guidesPath) return exam.guidesPath;
  if (hasShippedNotes && exam.notesPath) return exam.notesPath;
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
  countsByExamName: Map<string, number>,
  idsBySlug: Map<string, string>,
  notesSlugs: Set<string>
): ExamCatalog {
  const exams: ExamCatalogItem[] = EXAM_REGISTRY.map((exam) => {
    const count = countsByExamName.get(exam.examName) ?? 0;
    const examId = idsBySlug.get(exam.slug) ?? null;
    return {
      slug: exam.slug,
      displayName: exam.displayName,
      examName: exam.examName,
      totalPublicQuestions: count,
      practiceOnly: exam.practiceOnly === true,
      boardExam: exam.boardExam === true,
      href: pickExamCardHref(exam, examId, notesSlugs.has(exam.slug)),
    };
  });

  const totalPublicQuestions = exams.reduce(
    (sum, e) => sum + e.totalPublicQuestions,
    0
  );

  return { exams, totalPublicQuestions };
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
  /** exam DB name → PUBLIC question count */
  counts: [string, number][];
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

  // One exact head-count per exam — total PUBLIC (pyq + practice).
  const counts: [string, number][] = await Promise.all(
    EXAM_REGISTRY.map(async (exam): Promise<[string, number]> => {
      const id = idByName.get(exam.examName);
      if (!id) return [exam.examName, 0];
      const { count } = await client
        .from("questions")
        .select("id", { count: "exact", head: true })
        .eq("exam_id", id)
        .eq("visibility", "PUBLIC");
      return [exam.examName, count ?? 0];
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
  ["exam-catalog-payload"],
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
