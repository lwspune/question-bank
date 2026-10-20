/**
 * Count one download of a purchased ebook. The cap itself is a trigger on
 * `ebook_downloads` (migration 0172), so this only reports what the database
 * decided: the sixth insert for a purchase is refused there, whoever calls.
 */
import type { SupabaseClient } from "@supabase/supabase-js";

/** Mirrors the trigger in migration 0172. */
export const MAX_EBOOK_DOWNLOADS = 5;

export type DownloadRecord = { ok: true; left: number } | { ok: false; reason: "limit" | "error"; message?: string };

/** Service-role client: `ebook_downloads` has no policies. */
export async function recordEbookDownload(admin: SupabaseClient, purchaseId: string): Promise<DownloadRecord> {
  const { error } = await admin.from("ebook_downloads").insert({ purchase_id: purchaseId });
  if (error) {
    if (error.hint === "ebook_download_limit" || /download limit/.test(error.message)) return { ok: false, reason: "limit" };
    return { ok: false, reason: "error", message: error.message };
  }
  const { count } = await admin
    .from("ebook_downloads")
    .select("id", { count: "exact", head: true })
    .eq("purchase_id", purchaseId);
  return { ok: true, left: Math.max(0, MAX_EBOOK_DOWNLOADS - (count ?? MAX_EBOOK_DOWNLOADS)) };
}

/** Downloads a purchase has left, for the buy box. */
export async function ebookDownloadsLeft(admin: SupabaseClient, purchaseId: string): Promise<number> {
  const { count } = await admin
    .from("ebook_downloads")
    .select("id", { count: "exact", head: true })
    .eq("purchase_id", purchaseId);
  return Math.max(0, MAX_EBOOK_DOWNLOADS - (count ?? 0));
}
