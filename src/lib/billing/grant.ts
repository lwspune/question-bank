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
