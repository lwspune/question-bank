import type { SupabaseClient } from "@supabase/supabase-js";
import {
  EXAM_REGISTRY,
  resolveBankHref,
  type ExamEntry,
} from "./examContext";
import { getNotesExamGroups } from "@/lib/notes/notesNav";

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
 * Load the homepage exam catalog. One head-count per exam (safe against the
 * PostgREST 1000-row implicit-truncation trap — we never read row payloads).
 * Called under ISR (`revalidate`), so the handful of counts is cheap.
 */
export async function getExamCatalog(
  client: SupabaseClient
): Promise<ExamCatalog> {
  // Resolve every exam's UUID by name in one round-trip.
  const { data: examRows } = await client
    .from("exams")
    .select("id, name");
  const idByName = new Map<string, string>(
    (examRows ?? []).map((r) => [r.name as string, r.id as string])
  );

  const idsBySlug = new Map<string, string>();
  for (const exam of EXAM_REGISTRY) {
    const id = idByName.get(exam.examName);
    if (id) idsBySlug.set(exam.slug, id);
  }

  // One exact head-count per exam — total PUBLIC (pyq + practice).
  const countsByExamName = new Map<string, number>();
  await Promise.all(
    EXAM_REGISTRY.map(async (exam) => {
      const id = idByName.get(exam.examName);
      if (!id) {
        countsByExamName.set(exam.examName, 0);
        return;
      }
      const { count } = await client
        .from("questions")
        .select("id", { count: "exact", head: true })
        .eq("exam_id", id)
        .eq("visibility", "PUBLIC");
      countsByExamName.set(exam.examName, count ?? 0);
    })
  );

  const notesSlugs = new Set<string>(
    getNotesExamGroups().map((g) => g.slug)
  );

  return shapeExamCatalog(countsByExamName, idsBySlug, notesSlugs);
}
