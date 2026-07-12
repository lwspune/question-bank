/**
 * Server-only reads/writes for saved questions (migration 0047). Own-row via the
 * RLS-bound client (the user's JWT); toggle = insert-or-delete the (user,
 * question) row.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function setBookmark(
  db: SupabaseClient,
  userId: string,
  questionId: string,
  bookmarked: boolean
): Promise<void> {
  if (bookmarked) {
    const { error } = await db
      .from("question_bookmarks")
      .upsert(
        { user_id: userId, question_id: questionId },
        { onConflict: "user_id,question_id", ignoreDuplicates: true }
      );
    if (error) throw new Error(`setBookmark: ${error.message}`);
  } else {
    const { error } = await db
      .from("question_bookmarks")
      .delete()
      .eq("user_id", userId)
      .eq("question_id", questionId);
    if (error) throw new Error(`setBookmark: ${error.message}`);
  }
}

/** The user's saved question ids, newest-first. */
export async function listBookmarkIds(
  db: SupabaseClient,
  userId: string
): Promise<string[]> {
  const { data, error } = await db
    .from("question_bookmarks")
    .select("question_id")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(`listBookmarkIds: ${error.message}`);
  return (data ?? []).map((r) => r.question_id as string);
}
