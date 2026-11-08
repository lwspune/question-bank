/**
 * Per-exam question counts on EXACTLY the basis `/browse?examId=…` defaults to.
 *
 * The `/browse` starting panel advertises a number on each exam pill and then
 * sends the visitor to that exam's filtered view. Those two numbers have to be
 * the same one, and neither existing source gives it:
 *
 *   - `getCachedExamCatalog` counts total PUBLIC (pyq + practice). Right for
 *     the homepage, whose cards link to guides and notes; wrong here, because
 *     a bare `?examId=` view is PYQ-only. It would have advertised NDA at
 *     8,259 against a destination showing 4,860.
 *   - Summing `listChapterLandings` gets the kind right but drops every chapter
 *     under MIN_QUESTIONS_FOR_LANDING (15), which cost NDA 161 questions —
 *     measured, not hypothesised: 4,699 rendered against 4,860 on the page.
 *
 * So this asks the question directly, once per revalidate window, with the same
 * practice-only rule `/browse` itself applies.
 *
 * One grouped read for every exam (public_question_counts, migration 0237,
 * 2026-11-08). It was one head count per exam, 25 at once, which queued
 * behind each other (580 ms mean, 2.9 s worst, against anon's 3 s limit).
 */
import { unstable_cache } from "next/cache";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { EXAM_REGISTRY, isPracticeOnlyExam } from "@/lib/exam/examContext";
import type { KindCounts } from "@/lib/exam/questionCounts";
import { loadPublicQuestionCounts, tallyPublicCounts } from "@/lib/exam/publicCounts";

/** exam slug → questions visible in that exam's default `/browse` view. */
export type DefaultViewCounts = Record<string, number>;

/**
 * Each seeded exam's default-view count: practice for a practice-only exam,
 * else PYQs, the rule browse/page.tsx applies with no `kind` in the URL. A
 * seeded exam with no row is a genuine 0; an exam not yet seeded is left out.
 * Pure. Spec: tests/public-question-counts.test.ts.
 */
export function defaultViewCountsFrom(
  byExamId: ReadonlyMap<string, KindCounts>,
  idByName: ReadonlyMap<string, string>
): DefaultViewCounts {
  const counts: DefaultViewCounts = {};
  for (const exam of EXAM_REGISTRY) {
    const examId = idByName.get(exam.examName);
    if (!examId) continue; // In the registry, not yet seeded.
    const kind = isPracticeOnlyExam(exam.examName) ? "practice" : "pyq";
    counts[exam.slug] = byExamId.get(examId)?.[kind] ?? 0;
  }
  return counts;
}

export const getDefaultViewCountsByExam = unstable_cache(
  async (): Promise<DefaultViewCounts> => {
    const db = createSupabaseAnonClient();
    try {
      const [{ data: examRows }, rows] = await Promise.all([
        db.from("exams").select("id, name"),
        loadPublicQuestionCounts(db),
      ]);
      const idByName = new Map((examRows ?? []).map((e) => [e.name as string, e.id as string]));
      return defaultViewCountsFrom(tallyPublicCounts(rows).byExamId, idByName);
    } catch {
      // A DB blip must not 500 the bank's front door. An empty map drops every
      // pill, and the panel still renders its chapter row and the /questions
      // link — degraded, not broken. Same posture as getExamIdMap().
      return {};
    }
  },
  ["browse-default-view-counts"],
  { revalidate: 3600 }
);
