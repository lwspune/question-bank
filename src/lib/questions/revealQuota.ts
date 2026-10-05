/**
 * Today's answer reveals for the signed-in daily limit (migration 0134). Reads
 * `question_practiced` rows, which the reveal beacon writes once per reveal
 * (practiceBeacon → /api/activity/practice), since midnight IST.
 *
 * Counted surfaces: the bank, the board reader and guide/notes worked examples
 * (owner, 2026-10-05). NOT the drill or the question of the day: those are
 * their own features. A row with no surface predates 0107 and is the bank.
 * A free day is capped near the limit, far under the 1000-row page.
 */
import type { SupabaseClient } from "@supabase/supabase-js";

export const DAILY_REVEAL_SURFACES = ["bank", "board", "guide"] as const;

export async function loadRevealedToday(
  db: SupabaseClient,
  userId: string,
  sinceIso: string
): Promise<string[]> {
  const { data, error } = await db
    .from("user_activity")
    .select("ref_id")
    .eq("user_id", userId)
    .eq("kind", "question_practiced")
    .gte("created_at", sinceIso)
    .not("ref_id", "is", null)
    .or(`metadata->>surface.is.null,metadata->>surface.in.(${DAILY_REVEAL_SURFACES.join(",")})`)
    .limit(1000);
  if (error) throw new Error(`loadRevealedToday: ${error.message}`);
  return [...new Set(((data ?? []) as { ref_id: string }[]).map((r) => r.ref_id))];
}
