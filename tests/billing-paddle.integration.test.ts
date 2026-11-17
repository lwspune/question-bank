/**
 * Migration 0271 against the real database (the dedicated test project).
 *
 *  - A pass paid through Paddle is still a PAID pass (source 'razorpay': every
 *    sales, growth and points report reads paid passes by that value), and
 *    the new payment_provider column says which gateway took the money.
 *  - The same one-row-per-payment rule (0027) holds for a Paddle transaction
 *    id, so the webhook, the browser and the payment check cannot double-grant.
 *  - A plan sold through Paddle must name its Paddle product.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { grantRazorpayEntitlement, revokeRazorpayEntitlement } from "@/lib/billing/grant";
import { computeExpiry } from "@/lib/billing/plans";
import { testRunId } from "./helpers/runId";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = testRunId();
const EMAIL = `paddle_buyer_${STAMP}@test.invalid`;
const TXN = `txn_test_${STAMP}`;
const PLAN_ID = `test-paddle-${STAMP}`;

describe.skipIf(!HAS_ENV)("Paddle payments (migration 0271)", () => {
  let admin: SupabaseClient;
  let userId = "";

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const created = await admin.auth.admin.createUser({ email: EMAIL, password: "test-password-12345", email_confirm: true });
    userId = created.data.user!.id;
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("entitlements").delete().eq("provider_ref", TXN);
    await admin.from("plans").delete().eq("id", PLAN_ID);
    if (userId) await admin.auth.admin.deleteUser(userId);
  });

  const grant = () =>
    grantRazorpayEntitlement({
      userId,
      paymentId: TXN,
      scope: "imat",
      expiresAt: computeExpiry(Date.now(), 182),
      amountPaise: 1900,
      currency: "USD",
      provider: "paddle",
    });

  it("a Paddle grant is a paid pass marked with its gateway", async () => {
    await expect(grant()).resolves.toEqual({ kind: "ok" });
    const { data, error } = await admin
      .from("entitlements")
      .select("source, payment_provider, amount_paise, currency, status")
      .eq("provider_ref", TXN)
      .single();
    expect(error).toBeNull();
    expect(data).toEqual({ source: "razorpay", payment_provider: "paddle", amount_paise: 1900, currency: "USD", status: "active" });
  });

  it("the same transaction cannot be granted twice", async () => {
    await expect(grant()).resolves.toEqual({ kind: "already_granted" });
  });

  it("a full refund revokes it by transaction id", async () => {
    await expect(revokeRazorpayEntitlement(TXN)).resolves.toEqual({ kind: "ok", revoked: 1 });
  });

  it("an existing Razorpay-era row reads as Razorpay", async () => {
    const { data } = await admin.from("entitlements").select("payment_provider").neq("provider_ref", TXN).limit(1);
    for (const r of data ?? []) expect(r.payment_provider).toBe("razorpay");
  });

  it("only a paid pass can name a gateway other than Razorpay", async () => {
    const comp = await admin
      .from("entitlements")
      .insert({ user_id: userId, scope: "imat", source: "comp", status: "active", payment_provider: "paddle" });
    expect(comp.error?.code).toBe("23514");
  });

  it("a plan sold through Paddle must name its Paddle product", async () => {
    const base = { id: PLAN_ID, label: "x", url_key: PLAN_ID, amount_paise: 1900, scope: "imat", currency: "USD", site: "intl", active: false };
    const bare = await admin.from("plans").insert({ ...base, payment_provider: "paddle" });
    expect(bare.error?.code).toBe("23514");
    const named = await admin.from("plans").insert({ ...base, payment_provider: "paddle", paddle_product_id: "pro_test" });
    expect(named.error).toBeNull();
    const unknown = await admin.from("plans").update({ payment_provider: "stripe" }).eq("id", PLAN_ID);
    expect(unknown.error?.code).toBe("23514");
  });
});
