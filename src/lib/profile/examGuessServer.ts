/**
 * Reads and writes of the stored exam guess (migration 0254). Pure rules in
 * ./examGuess. No "server-only": the daily job imports this too.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { StoredGuessRow } from "./examGuess";
import type { InferredExam } from "./suggestExam";

/** The student's stored guess: their own client (own-row read) or the service role. */
export async function loadStoredGuess(db: SupabaseClient, userId: string): Promise<StoredGuessRow | null> {
  const { data, error } = await db
    .from("student_exam_guesses")
    .select("exam, source, card_answer")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data as StoredGuessRow | null) ?? null;
}

/**
 * Record a tap or a sighting of the Home card, with the SERVICE-ROLE client.
 * A sighting is stamped once. The first answer wins. Without a stored guess
 * (a card showing the live guess), the live guess is stored with the action,
 * so what the student saw is what the readout compares. Returns false when
 * there is no guess to record against.
 */
export async function recordGuessCardAction(
  admin: SupabaseClient,
  userId: string,
  action: "seen" | "correct" | "change",
  now: Date,
  liveGuess: () => Promise<InferredExam | null>
): Promise<boolean> {
  const at = now.toISOString();
  const { data, error } = await admin
    .from("student_exam_guesses")
    .select("card_seen_at, card_answer")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  const answer = action === "seen" ? {} : { card_answer: action, card_answered_at: at };

  if (!data) {
    const g = await liveGuess();
    if (!g) return false;
    // ignoreDuplicates: a job run that stored a guess a moment ago wins.
    const ins = await admin
      .from("student_exam_guesses")
      .upsert(
        { user_id: userId, exam: g.slug, source: g.source, guessed_at: at, card_seen_at: at, ...answer },
        { onConflict: "user_id", ignoreDuplicates: true }
      );
    if (ins.error) throw new Error(ins.error.message);
    return true;
  }

  const row = data as { card_seen_at: string | null; card_answer: string | null };
  if (action === "seen") {
    if (row.card_seen_at) return true;
    const up = await admin
      .from("student_exam_guesses")
      .update({ card_seen_at: at })
      .eq("user_id", userId)
      .is("card_seen_at", null);
    if (up.error) throw new Error(up.error.message);
    return true;
  }
  if (row.card_answer) return true;
  const up = await admin
    .from("student_exam_guesses")
    .update({ ...answer, ...(row.card_seen_at ? {} : { card_seen_at: at }) })
    .eq("user_id", userId)
    .is("card_answer", null);
  if (up.error) throw new Error(up.error.message);
  return true;
}
