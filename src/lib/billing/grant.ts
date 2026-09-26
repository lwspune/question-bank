/**
 * Idempotent entitlement grant for a paid Razorpay order. Service-role
 * (entitlements have no write RLS). Idempotency is enforced by the DB: a unique
 * index on (provider_ref) WHERE source='razorpay' (migration 0027), so the
 * webhook and the client-verify path racing on the same payment can't
 * double-grant.
 */
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type GrantRazorpayInput = {
  userId: string;
  paymentId: string;
  scope: string;
  expiresAt: string | null;
};

export type GrantRazorpayResult =
  | { kind: "ok" }
  | { kind: "already_granted" }
  | { kind: "error"; message: string };

export async function grantRazorpayEntitlement(
  input: GrantRazorpayInput
): Promise<GrantRazorpayResult> {
  try {
    const admin = createSupabaseAdminClient();
    const { error } = await admin.from("entitlements").insert({
      user_id: input.userId,
      scope: input.scope,
      source: "razorpay",
      status: "active",
      expires_at: input.expiresAt,
      provider_ref: input.paymentId,
    });
    if (error) {
      // 23505 = unique violation on provider_ref → already granted. Idempotent.
      if (error.code === "23505") return { kind: "already_granted" };
      return { kind: "error", message: error.message };
    }
    return { kind: "ok" };
  } catch (err) {
    return { kind: "error", message: err instanceof Error ? err.message : String(err) };
  }
}

export type RevokeRazorpayResult =
  | { kind: "ok"; revoked: number }
  | { kind: "error"; message: string };

/**
 * Ends the pass bought with `paymentId` (a full refund). The row is kept with
 * status 'revoked', not deleted: provider_ref stays taken, so a replayed
 * order.paid or a late client verify answers "already_granted" instead of
 * granting the refunded pass again. Idempotent — a second call revokes 0.
 */
export async function revokeRazorpayEntitlement(
  paymentId: string
): Promise<RevokeRazorpayResult> {
  try {
    const admin = createSupabaseAdminClient();
    const { data, error } = await admin
      .from("entitlements")
      .update({ status: "revoked" })
      .eq("source", "razorpay")
      .eq("provider_ref", paymentId)
      .eq("status", "active")
      .select("id");
    if (error) return { kind: "error", message: error.message };
    return { kind: "ok", revoked: data?.length ?? 0 };
  } catch (err) {
    return { kind: "error", message: err instanceof Error ? err.message : String(err) };
  }
}
