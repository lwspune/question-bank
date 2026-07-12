/**
 * Mock-feedback reads/writes (server-only). RLS on mock_feedback (0050) enforces
 * ownership — the student writes their OWN row and only on their OWN attempt; the
 * explicit user_id is belt-and-suspenders. Pure validation lives in feedback.ts.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Rating } from "@/lib/mocks/feedback";

/** The student's feedback for one attempt, or null if none yet — the result page
 *  uses this to render the widget vs a "thanks" state. */
export async function getMockFeedback(
  db: SupabaseClient,
  attemptId: string
): Promise<{ rating: Rating; comment: string | null } | null> {
  const { data } = await db
    .from("mock_feedback")
    .select("rating, comment")
    .eq("attempt_id", attemptId)
    .maybeSingle();
  if (!data) return null;
  return {
    rating: data.rating as Rating,
    comment: (data.comment as string | undefined) ?? null,
  };
}

/** Upsert the student's feedback for an attempt (one row per attempt; a re-tap
 *  corrects it). `rating`/`comment` must already be validated. */
export async function saveMockFeedback(
  db: SupabaseClient,
  userId: string,
  attemptId: string,
  input: { rating: Rating; comment: string | null }
): Promise<void> {
  const { error } = await db.from("mock_feedback").upsert(
    {
      attempt_id: attemptId,
      user_id: userId,
      rating: input.rating,
      comment: input.comment,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "attempt_id" }
  );
  if (error) throw new Error(error.message);
}
