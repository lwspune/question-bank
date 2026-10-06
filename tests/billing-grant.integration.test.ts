/**
 * Integration test for the Razorpay grant → entitlement → access path — the
 * value path that ships untested before live activation. Pure access/expiry
 * logic is covered by entitlements-access.test.ts; this exercises the real DB
 * write, the idempotency index (migration 0027), and the RLS-scoped read.
 *
 *   1. Grant once → row inserted; the user's own client sees active access.
 *   2. Grant the SAME paymentId again → 23505 → {kind:"already_granted"},
 *      still exactly one row (webhook + client-verify can't double-grant).
 *   3. A full refund revokes the grant; replaying the paid event afterwards
 *      does NOT re-activate it (the unique index answers "already_granted").
 *   4. A grant with an expiry in the past → userHasAccess is false.
 *
 * Skips entirely if Supabase env vars aren't loaded. Creates + tears down its
 * own auth users and clearly-prefixed provider_refs.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { grantRazorpayEntitlement, revokeRazorpayEntitlement } from "@/lib/billing/grant";
import { userHasAccess } from "@/lib/entitlements/query";
import { computeExpiry } from "@/lib/billing/plans";
import { SCOPE_ALL, SCOPE_MOCKS } from "@/lib/entitlements/access";
import { mustSignIn } from "./helpers/fixture";

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

  // A first grant must start from nothing. vitest's retry re-runs a failed
  // test, and the failed attempt's grant is still there, so without this the
  // retry answers "already_granted" and can never pass (2026-10-06).
  async function clearGrant(paymentId: string) {
    const { error } = await admin.from("entitlements").delete().eq("provider_ref", paymentId);
    if (error) throw new Error(`clear grant ${paymentId}: ${error.message}`);
  }

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
      mustSignIn("billing paid", paidClient, { email: PAID_EMAIL, password: PASSWORD }),
      mustSignIn("billing expired", expiredClient, { email: EXPIRED_EMAIL, password: PASSWORD }),
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

  it("grants a 6-month Mock Pass and the user's own client sees active access", async () => {
    await clearGrant(PAY_PAID);
    const result = await grantRazorpayEntitlement({
      userId: paidUserId,
      paymentId: PAY_PAID,
      scope: SCOPE_MOCKS,
      expiresAt: computeExpiry(Date.now(), 182),
    });
    expect(result.kind).toBe("ok");

    // RLS-scoped read via the user's own client.
    await expect(userHasAccess(paidClient, paidUserId, SCOPE_MOCKS)).resolves.toBe(true);

    const { count } = await admin
      .from("entitlements")
      .select("id", { count: "exact", head: true })
      .eq("provider_ref", PAY_PAID);
    expect(count).toBe(1);
  });

  it("re-granting the same paymentId is idempotent (no double-grant)", async () => {
    const result = await grantRazorpayEntitlement({
      userId: paidUserId,
      paymentId: PAY_PAID,
      scope: SCOPE_MOCKS,
      expiresAt: computeExpiry(Date.now(), 182),
    });
    expect(result.kind).toBe("already_granted");

    const { count } = await admin
      .from("entitlements")
      .select("id", { count: "exact", head: true })
      .eq("provider_ref", PAY_PAID);
    expect(count).toBe(1);
  });

  it("a full refund revokes the pass, and a replayed payment does not bring it back", async () => {
    await expect(revokeRazorpayEntitlement(PAY_PAID)).resolves.toEqual({ kind: "ok", revoked: 1 });
    await expect(userHasAccess(paidClient, paidUserId, SCOPE_MOCKS)).resolves.toBe(false);

    const replay = await grantRazorpayEntitlement({
      userId: paidUserId,
      paymentId: PAY_PAID,
      scope: SCOPE_MOCKS,
      expiresAt: computeExpiry(Date.now(), 182),
    });
    expect(replay.kind).toBe("already_granted");
    await expect(userHasAccess(paidClient, paidUserId, SCOPE_MOCKS)).resolves.toBe(false);
  });

  it("revoking a payment with no grant touches nothing", async () => {
    await expect(revokeRazorpayEntitlement(`pay_test_${STAMP}_none`)).resolves.toEqual({
      kind: "ok",
      revoked: 0,
    });
  });

  it("a grant whose expiry has passed does not confer access", async () => {
    await clearGrant(PAY_EXPIRED);
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
