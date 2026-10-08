import type { SupabaseClient } from "@supabase/supabase-js";
import { freeForPaper } from "./freePaper";

/**
 * The one free paper per account (migration 0131; one PAPER, not one file,
 * since 0139). Once-only is the table's primary key; these two calls are the
 * only way the app touches it. Which requests count as "this paper" is
 * lib/export/freePaper.ts.
 */

/**
 * Whether `paperKey` is free for this account: never used, or used for this
 * same paper. Works with the user's own client (RLS: select own row) or the
 * service role. A failed read counts as "not free", so an outage can never
 * hand out extra free files.
 */
export async function isPaperFree(client: SupabaseClient, userId: string, paperKey: string | null): Promise<boolean> {
  const { data, error } = await client
    .from("free_downloads")
    .select("set_key")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) {
    console.error("free_downloads read failed:", error.message);
    return false;
  }
  return freeForPaper(data ? { setKey: (data.set_key as string | null) ?? null } : null, paperKey);
}

/**
 * Records the free paper; true when this request may be served free: its
 * insert won, or the row already there is for this same paper (the other
 * file, or a re-download). Service role only (no write policy exists). Call
 * it AFTER the file is built and serve the file only on true, so a race yields
 * one paper and a failed build never spends the free download.
 */
export async function claimFreeDownload(
  admin: SupabaseClient,
  userId: string,
  kind: "paper" | "key",
  questionCount: number,
  paperKey: string | null
): Promise<boolean> {
  const { data, error } = await admin
    .from("free_downloads")
    .upsert(
      { user_id: userId, kind, question_count: questionCount, set_key: paperKey },
      { onConflict: "user_id", ignoreDuplicates: true }
    )
    .select("user_id");
  if (error) {
    console.error("free_downloads claim failed:", error.message);
    return false;
  }
  if ((data ?? []).length === 1) return true;
  // Not inserted: a row exists. Serve only if it is for this paper.
  return isPaperFree(admin, userId, paperKey);
}
