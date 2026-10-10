import type { SupabaseClient } from "@supabase/supabase-js";
import { freeForPaper } from "./freePaper";

/**
 * The one free formula sheet per account (migration 0150), apart from the
 * one free paper (free_downloads). Once-only is the table's primary key; these
 * two calls are the only way the app touches it. The same chapter again is a
 * re-download and stays free; a different chapter meets the pass offer.
 *
 * Shape and rules mirror lib/export/freeDownload.ts so the two free files
 * behave the same way; the "same sheet" test is `freeForPaper`, shared.
 */

/**
 * Whether the sheet named by `sheetKey` is free for this account: never used,
 * or used for this same chapter. Works with the user's own client (RLS: select
 * own row) or the service role. A failed read counts as "not free", so an
 * outage can never hand out extra free files.
 */
export async function isFormulaSheetFree(client: SupabaseClient, userId: string, sheetKey: string): Promise<boolean> {
  const { data, error } = await client.from("free_formula_sheets").select("sheet").eq("user_id", userId).maybeSingle();
  if (error) {
    console.error("free_formula_sheets read failed:", error.message);
    return false;
  }
  return freeForPaper(data ? { setKey: (data.sheet as string | null) ?? null } : null, sheetKey);
}

/**
 * Records the free sheet; true when this request may be served free: its
 * insert won, or the row already there is for this same chapter. Service role
 * only (no write policy exists). Call it AFTER the file is built and serve the
 * file only on true, so a race yields one sheet and a failed build never
 * spends the free download.
 */
export async function claimFreeFormulaSheet(admin: SupabaseClient, userId: string, sheetKey: string): Promise<boolean> {
  const { data, error } = await admin
    .from("free_formula_sheets")
    .upsert({ user_id: userId, sheet: sheetKey }, { onConflict: "user_id", ignoreDuplicates: true })
    .select("user_id");
  if (error) {
    console.error("free_formula_sheets claim failed:", error.message);
    return false;
  }
  if ((data ?? []).length === 1) return true;
  return isFormulaSheetFree(admin, userId, sheetKey);
}
