/**
 * "Want this as a printed book?": a buyer's free tap (owner, 2026-10-20,
 * Option A: no money taken). Written with the BUYER'S OWN client: the policy
 * on `ebook_print_interest` (migration 0172) admits only someone who owns the
 * ebook, so a non-buyer's write is refused by the database, not by this code.
 */
import type { SupabaseClient } from "@supabase/supabase-js";

const PINCODE_RE = /^[1-9][0-9]{5}$/;

/** A pincode as typed: spaces dropped. Empty means "not given". */
export function normalisePincode(raw: string | null | undefined): string | null {
  const s = (raw ?? "").replace(/\s+/g, "");
  return s === "" ? null : s;
}

export function isValidPincode(pincode: string | null): boolean {
  return pincode === null || PINCODE_RE.test(pincode);
}

export type PrintInterestResult = { ok: true } | { ok: false; reason: "bad_pincode" | "not_bought" | "error" };

export async function recordPrintInterest(
  client: SupabaseClient,
  userId: string,
  ebookSlug: string,
  rawPincode: string | null
): Promise<PrintInterestResult> {
  const pincode = normalisePincode(rawPincode);
  if (!isValidPincode(pincode)) return { ok: false, reason: "bad_pincode" };
  const { error } = await client
    .from("ebook_print_interest")
    .upsert(
      { user_id: userId, ebook_slug: ebookSlug, pincode, updated_at: new Date().toISOString() },
      { onConflict: "user_id,ebook_slug" }
    );
  if (error) {
    // 42501: row-level security refused it, i.e. this account has not bought the book.
    if (error.code === "42501") return { ok: false, reason: "not_bought" };
    console.error("ebook print interest failed:", error.message);
    return { ok: false, reason: "error" };
  }
  return { ok: true };
}
