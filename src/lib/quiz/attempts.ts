/**
 * Server-only read of a student's own quiz history, for /quiz/attempts.
 *
 * Reads `user_activity` through the RLS-BOUND client: the 0052
 * `user_activity_select_own` policy (user_id = auth.uid()) is the security
 * boundary, and it is the reason this page needed no new table, no new policy
 * and no migration. The explicit .eq("user_id") is for the index
 * (user_id, kind, created_at DESC), not for access control.
 *
 * NO PER-QUESTION REVIEW, deliberately. The submitted answers are not stored
 * anywhere for a signed-in taker — `quiz_leads.answers` exists only on the anon
 * path — and putting them into an analytics log's schemaless metadata is the
 * wrong shape (mocks have `mock_attempts` for exactly this). A history list of
 * scores is what the recorded data can honestly support; answer review would be
 * a `quiz_attempts` table and its own decision.
 *
 * No `import "server-only"`, matching mocks/query.ts and students/rosterQuery.ts:
 * the client is INJECTED (no key is baked into the module), and the smoke script
 * that proves this loader against live data has to be able to import it.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { parseQuizAttempt, type QuizActivityRow, type QuizAttemptView } from "./activity";

/**
 * Hard cap on rows read back. A `.limit(N)` HIDES rows past N — this project has
 * been bitten five times by exactly that — so the caller is told whether the cap
 * was reached instead of being handed a silently-truncated list, and no count is
 * ever derived from `rows.length`.
 */
export const MAX_QUIZ_ATTEMPTS = 200;

export type QuizAttemptsPage = {
  attempts: QuizAttemptView[];
  /** True when the cap was hit, so the page can say the list is not the whole history. */
  truncated: boolean;
};

export async function getUserQuizAttempts(
  db: SupabaseClient,
  userId: string
): Promise<QuizAttemptsPage> {
  const { data, error } = await db
    .from("user_activity")
    .select("ref_id, metadata, created_at")
    .eq("user_id", userId)
    .eq("kind", "quiz_taken")
    .order("created_at", { ascending: false })
    .limit(MAX_QUIZ_ATTEMPTS);

  if (error) throw new Error(`getUserQuizAttempts: ${error.message}`);

  const rows = (data ?? []) as QuizActivityRow[];
  return {
    attempts: rows.map(parseQuizAttempt),
    truncated: rows.length === MAX_QUIZ_ATTEMPTS,
  };
}
