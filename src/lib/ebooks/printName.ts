/**
 * The buyer chooses the name printed on their copy's cover (2026-10-28).
 *
 * Ownership is read with the BUYER'S client, as the download reads it: the
 * purchase row is visible only to its owner (RLS), so the database's answer
 * refuses a non-buyer. The write is the service role's, as every write to
 * ebook_purchases is (migration 0172). The name rules are lib/ebooks/coverName,
 * mirrored by the CHECK in migration 0201. The stamped copy is not touched
 * here: the next download sees the name differs and stamps a fresh one.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { validatePrintName } from "./coverName";

export type PrintNameResult = { ok: true; name: string } | { ok: false; status: 400 | 403 | 500; error: string };

export async function setEbookPrintName(
  db: SupabaseClient,
  admin: SupabaseClient,
  userId: string,
  slug: string,
  raw: string
): Promise<PrintNameResult> {
  const check = validatePrintName(raw);
  if (!check.ok) return { ok: false, status: 400, error: check.error };
  const { data: purchase } = await db
    .from("ebook_purchases")
    .select("id")
    .eq("user_id", userId)
    .eq("ebook_slug", slug)
    .eq("status", "active")
    .maybeSingle();
  if (!purchase) return { ok: false, status: 403, error: "You have not bought this book." };
  const { error } = await admin.from("ebook_purchases").update({ print_name: check.name }).eq("id", purchase.id);
  if (error) {
    console.error("ebook print name update failed:", error.message);
    return { ok: false, status: 500, error: "Could not save the name. Try again in a minute." };
  }
  return { ok: true, name: check.name };
}
