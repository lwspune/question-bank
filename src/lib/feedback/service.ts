/**
 * Voice-of-user feedback reads/writes (server-only). RLS on user_feedback (0051)
 * enforces own-row; the explicit user_id is belt-and-suspenders. Pure validation
 * + the NPS gate live in nps.ts.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

/** The most recent NPS timestamp for a user (for the cooldown), or null. */
export async function getLastNpsAt(db: SupabaseClient, userId: string): Promise<string | null> {
  const { data } = await db
    .from("user_feedback")
    .select("created_at")
    .eq("user_id", userId)
    .eq("kind", "nps")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return (data?.created_at as string | undefined) ?? null;
}

/** Append a feedback row (NPS or feature request) as the acting user. */
export async function saveUserFeedback(
  db: SupabaseClient,
  userId: string,
  input: { kind: "nps" | "feature"; score: number | null; message: string | null }
): Promise<void> {
  const { error } = await db.from("user_feedback").insert({
    user_id: userId,
    kind: input.kind,
    score: input.score,
    message: input.message,
  });
  if (error) throw new Error(error.message);
}
