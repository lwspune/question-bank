/**
 * Record (and on a full refund, revoke) an ebook purchase. Service-role:
 * `ebook_purchases` has no write RLS. Idempotent the same way the pass grant
 * is: `payment_id` is unique (migration 0172), so the webhook and the
 * client-verify path racing on one payment cannot record it twice.
 */
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type GrantEbookInput = {
  userId: string;
  paymentId: string;
  ebookSlug: string;
  amountPaise: number;
};

export type GrantEbookResult =
  | { kind: "ok" }
  | { kind: "already_granted" }
  | { kind: "error"; message: string };

export async function grantEbookPurchase(input: GrantEbookInput): Promise<GrantEbookResult> {
  try {
    const admin = createSupabaseAdminClient();
    const { error } = await admin.from("ebook_purchases").insert({
      user_id: input.userId,
      ebook_slug: input.ebookSlug,
      amount_paise: input.amountPaise,
      payment_id: input.paymentId,
      status: "active",
    });
    if (error) {
      // 23505: this payment is already recorded, or the buyer already owns the
      // book (a second payment for one book). Either way they have it.
      if (error.code === "23505") return { kind: "already_granted" };
      return { kind: "error", message: error.message };
    }
    return { kind: "ok" };
  } catch (err) {
    return { kind: "error", message: err instanceof Error ? err.message : String(err) };
  }
}

export type RevokeEbookResult = { kind: "ok"; revoked: number } | { kind: "error"; message: string };

/**
 * Ends the purchase made with `paymentId`. The row stays, marked revoked, so
 * a replayed order.paid answers "already_granted" instead of giving the
 * refunded book back. Idempotent.
 */
export async function revokeEbookPurchase(paymentId: string): Promise<RevokeEbookResult> {
  try {
    const admin = createSupabaseAdminClient();
    const { data, error } = await admin
      .from("ebook_purchases")
      .update({ status: "revoked" })
      .eq("payment_id", paymentId)
      .eq("status", "active")
      .select("id");
    if (error) return { kind: "error", message: error.message };
    return { kind: "ok", revoked: data?.length ?? 0 };
  } catch (err) {
    return { kind: "error", message: err instanceof Error ? err.message : String(err) };
  }
}
