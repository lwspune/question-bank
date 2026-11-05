/**
 * The questions a student has already answered in any test, for "skip
 * questions I've already answered". Read through the student's own client:
 * attempt_answers is visible only through the student's own attempts (RLS,
 * migration 0044), so this can never read another student's answers.
 *
 * Read through the student's own attempt ids (lib/mocks/ownAnswers.ts), so the
 * database finds their rows by key instead of scanning every student's answers
 * (TECH_DEBT_SPEC.md 3.2). Capped at MAX_ROWS: a student past that many answers
 * gets the newest attempts' slice, and a question beyond it can at worst
 * repeat, which the student sees counted in "new to you".
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { readOwnAnswerRows } from "@/lib/mocks/ownAnswers";

const MAX_ROWS = 20_000;

export async function readAnsweredQuestionIds(db: SupabaseClient, userId: string): Promise<Set<string>> {
  const rows = await readOwnAnswerRows<{ question_id: string }>(db, userId, "question_id", { answeredOnly: true });
  return new Set(rows.slice(0, MAX_ROWS).map((r) => r.question_id));
}
