/**
 * The questions a student has already answered in any test, for "skip
 * questions I've already answered". Read through the student's own client:
 * attempt_answers is visible only through the student's own attempts (RLS,
 * migration 0044), so this can never read another student's answers.
 *
 * Paged past PostgREST's 1000-row cap and capped at MAX_ROWS: a student past
 * that many answers gets the newest-first slice, and a question beyond it can
 * at worst repeat, which the student sees counted in "new to you".
 */
import type { SupabaseClient } from "@supabase/supabase-js";

const PAGE = 1000;
const MAX_ROWS = 20_000;

export async function readAnsweredQuestionIds(db: SupabaseClient): Promise<Set<string>> {
  const out = new Set<string>();
  for (let from = 0; from < MAX_ROWS; from += PAGE) {
    const { data, error } = await db
      .from("attempt_answers")
      .select("question_id")
      .or("selected_label.not.is.null,numeric_response.not.is.null")
      .order("updated_at", { ascending: false })
      .order("question_id")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`readAnsweredQuestionIds: ${error.message}`);
    for (const r of data ?? []) out.add(r.question_id as string);
    if ((data ?? []).length < PAGE) break;
  }
  return out;
}
