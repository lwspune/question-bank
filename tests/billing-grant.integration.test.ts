/**
 * Integration test for the Razorpay grant → entitlement → access path — the
 * value path that ships untested before live activation. Pure access/expiry
 * logic is covered by entitlements-access.test.ts; this exercises the real DB
 * write, the idempotency index (migration 0027), and the RLS-scoped read.
 *
 *   1. Grant once → row inserted; the user's own client sees active access.
 *   2. Grant the SAME paymentId again → 23505 → {kind:"already_granted"},
 *      still exactly one row (webhook + client-verify can't double-grant).
 *   3. A grant with an expiry in the past → userHasAccess is false.
 *
 * Skips entirely if Supabase env vars aren't loaded. Creates + tears down its
 * own auth users and clearly-prefixed provider_refs.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { grantRazorpayEntitlement } from "@/lib/billing/grant";
import { userHasAccess } from "@/lib/entitlements/query";
import { computeExpiry, getPlan } from "@/lib/billing/plans";
import { SCOPE_ALL } from "@/lib/entitlements/access";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = Date.now();
const PASSWORD = "test-password-12345";
const PAID_EMAIL = `billing_paid_${STAMP}@test.invalid`;
const EXPIRED_EMAIL = `billing_expired_${STAMP}@test.invalid`;
const PAY_PAID = `pay_test_${STAMP}_paid`;
const PAY_EXPIRED = `pay_test_${STAMP}_expired`;

describe.skipIf(!HAS_ENV)("Razorpay grant → entitlement → access", () => {
  let admin: SupabaseClient;
  let paidClient: SupabaseClient;
  let expiredClient: SupabaseClient;
  let paidUserId = "";
  let expiredUserId = "";

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    admin = createClient(url, serviceRole, { auth: { persistSession: false } });

    const [paid, expired] = await Promise.all([
      admin.auth.admin.createUser({
        email: PAID_EMAIL,
        password: PASSWORD,
        email_confirm: true,
      }),
      admin.auth.admin.createUser({
        email: EXPIRED_EMAIL,
        password: PASSWORD,
        email_confirm: true,
      }),
    ]);
    paidUserId = paid.data.user!.id;
    expiredUserId = expired.data.user!.id;

    paidClient = createClient(url, anon, { auth: { persistSession: false } });
    expiredClient = createClient(url, anon, { auth: { persistSession: false } });
    await Promise.all([
      paidClient.auth.signInWithPassword({ email: PAID_EMAIL, password: PASSWORD }),
      expiredClient.auth.signInWithPassword({
        email: EXPIRED_EMAIL,
        password: PASSWORD,
      }),
    ]);
  });

  afterAll(async () => {
    if (!admin) return;
    // Entitlements are deleted with the users (FK), but be explicit in case the
    // FK isn't ON DELETE CASCADE.
    await admin
      .from("entitlements")
      .delete()
      .in("provider_ref", [PAY_PAID, PAY_EXPIRED]);
    if (paidUserId) await admin.auth.admin.deleteUser(paidUserId);
    if (expiredUserId) await admin.auth.admin.deleteUser(expiredUserId);
  });

  it("grants a 365-day pass and the user's own client sees active access", async () => {
    const plan = getPlan("premium-365")!;
    const result = await grantRazorpayEntitlement({
      userId: paidUserId,
      paymentId: PAY_PAID,
      scope: plan.scope,
      expiresAt: computeExpiry(Date.now(), plan.durationDays),
    });
    expect(result.kind).toBe("ok");

    // RLS-scoped read via the user's own client.
    await expect(userHasAccess(paidClient, paidUserId, SCOPE_ALL)).resolves.toBe(
      true
    );

    const { count } = await admin
      .from("entitlements")
      .select("id", { count: "exact", head: true })
      .eq("provider_ref", PAY_PAID);
    expect(count).toBe(1);
  });

  it("re-granting the same paymentId is idempotent (no double-grant)", async () => {
    const plan = getPlan("premium-365")!;
    const result = await grantRazorpayEntitlement({
      userId: paidUserId,
      paymentId: PAY_PAID,
      scope: plan.scope,
      expiresAt: computeExpiry(Date.now(), plan.durationDays),
    });
    expect(result.kind).toBe("already_granted");

    const { count } = await admin
      .from("entitlements")
      .select("id", { count: "exact", head: true })
      .eq("provider_ref", PAY_PAID);
    expect(count).toBe(1);
  });

  it("a grant whose expiry has passed does not confer access", async () => {
    const result = await grantRazorpayEntitlement({
      userId: expiredUserId,
      paymentId: PAY_EXPIRED,
      scope: SCOPE_ALL,
      expiresAt: new Date(Date.now() - 86_400_000).toISOString(), // yesterday
    });
    expect(result.kind).toBe("ok");

    await expect(
      userHasAccess(expiredClient, expiredUserId, SCOPE_ALL)
    ).resolves.toBe(false);
  });
});
