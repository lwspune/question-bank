import type { SupabaseClient } from "@supabase/supabase-js";

export type ExamHomeStats = {
  /** DB UUID of the exam, or null if the exam name isn't seeded. */
  examId: string | null;
  /** Total PUBLIC question count for this exam. Uses head count to avoid the
   *  PostgREST 1000-row implicit truncation on raw .select() results. */
  totalPublicQuestions: number;
};

/**
 * Per-exam stats for the exam-home pages (`/nda`, future `/mht-cet`).
 * Lookup is by canonical exam name (`"NDA"`, `"MHT-CET"`); returns zeroes
 * if the exam isn't seeded.
 */
export async function getExamHomeStats(
  client: SupabaseClient,
  examName: string
): Promise<ExamHomeStats> {
  const { data: exam } = await client
    .from("exams")
    .select("id")
    .eq("name", examName)
    .maybeSingle();

  if (!exam?.id) {
    return { examId: null, totalPublicQuestions: 0 };
  }

  const { count } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", exam.id)
    .eq("visibility", "PUBLIC")
    .eq("question_kind", "pyq"); // PYQ-first stat — exclude practice (migration 0036)

  return {
    examId: exam.id,
    totalPublicQuestions: count ?? 0,
  };
}
