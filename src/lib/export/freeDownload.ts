import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * The one free Word download per account (migration 0131). Once-only is the
 * table's primary key; these two calls are the only way the app touches it.
 */

/**
 * Whether this account still has its free download. Works with the user's own
 * client (RLS: select own row) or the service role. A failed read counts as
 * "none left", so an outage can never hand out extra free files.
 */
export async function hasFreeDownloadLeft(client: SupabaseClient, userId: string): Promise<boolean> {
  const { count, error } = await client
    .from("free_downloads")
    .select("user_id", { count: "exact", head: true })
    .eq("user_id", userId);
  if (error) {
    console.error("free_downloads read failed:", error.message);
    return false;
  }
  return (count ?? 0) === 0;
}

/**
 * Records the free download; true only for the claim that inserted the row.
 * Service role only (no write policy exists). Call it AFTER the file is built
 * and serve the file only on true, so a race yields one file and a failed
 * build never spends the free download.
 */
export async function claimFreeDownload(
  admin: SupabaseClient,
  userId: string,
  kind: "paper" | "key",
  questionCount: number
): Promise<boolean> {
  const { data, error } = await admin
    .from("free_downloads")
    .upsert(
      { user_id: userId, kind, question_count: questionCount },
      { onConflict: "user_id", ignoreDuplicates: true }
    )
    .select("user_id");
  if (error) {
    console.error("free_downloads claim failed:", error.message);
    return false;
  }
  return (data ?? []).length === 1;
}
