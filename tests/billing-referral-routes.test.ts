/**
 * Referrals through the billing ROUTES (migration 0249). What is locked:
 *
 * - order: a referred friend's first pass is sold 25% off (on top of points,
 *   capped together), stamped into the order; a failed referral read sells at
 *   the list price; a pass that takes no discount never reads it;
 * - verify + webhook: after the pass is granted from an order carrying the
 *   referral, the inviter's reward is completed (idempotent in the database);
 *   an order without it never touches referrals;
 * - webhook: a failed reward answers 500 so Razorpay retries; a full refund
 *   also ends the reward that payment earned.
 *
 * Razorpay, the session and the database are mocked; the decisions are real.
 */
import { vi, describe, it, expect, beforeEach } from "vitest";
import { createHmac } from "node:crypto";
import { NextRequest } from "next/server";
import type { Plan } from "@/lib/billing/plans";

vi.mock("@/lib/auth", () => ({ getSessionUser: vi.fn(async () => ({ id: "u1", email: "asha@example.com" })) }));
vi.mock("@/lib/supabase/server", () => ({ createSupabaseServerClient: vi.fn(() => ({})) }));
vi.mock("@/lib/supabase/admin", () => ({ createSupabaseAdminClient: vi.fn(() => ({})) }));
vi.mock("@/lib/activity/service", () => ({ logActivity: vi.fn(async () => undefined) }));
vi.mock("@/lib/billing/razorpay", async (orig) => ({
  ...(await orig<typeof import("@/lib/billing/razorpay")>()),
  createOrder: vi.fn(async (input: { amountPaise: number; currency: string }) => ({
    ok: true, orderId: "order_1", amount: input.amountPaise, currency: input.currency,
  })),
  fetchOrder: vi.fn(),
  verifyPaymentSignature: vi.fn(() => true),
}));
vi.mock("@/lib/billing/fixPointsService", () => ({ readFixPoints: vi.fn(async () => ({ points: 0, pct: 0, oldestAt: null })) }));
vi.mock("@/lib/billing/grant", () => ({
  grantRazorpayEntitlement: vi.fn(async () => ({ kind: "ok" })),
  revokeRazorpayEntitlement: vi.fn(async () => ({ kind: "ok", revoked: 1 })),
}));
vi.mock("@/lib/ebooks/grant", () => ({
  grantEbookPurchase: vi.fn(async () => ({ kind: "ok" })),
  revokeEbookPurchase: vi.fn(async () => ({ kind: "ok", revoked: 0 })),
}));
vi.mock("@/lib/referrals/service", () => ({
  readReferralDiscount: vi.fn(async () => 0),
  completeReferral: vi.fn(async () => "rewarded"),
  revokeReferralReward: vi.fn(async () => 1),
}));

const premium: Plan = {
  id: "mock-pass-6m", label: "Premium Pass", blurb: "b", perks: [], urlKey: "mocks", amountPaise: 49900,
  currency: "INR", site: "pyqvault", durationDays: 182, scope: "mocks", active: true, sortOrder: 1, countries: null,
};
const intl: Plan = { ...premium, id: "intl-pass-6m", urlKey: "imat", amountPaise: 1900, currency: "USD", site: "intl", scope: "imat" };
vi.mock("@/lib/billing/plansQuery", () => ({ listActivePlans: vi.fn(async () => [premium, intl]) }));

import { createOrder, fetchOrder } from "@/lib/billing/razorpay";
import { readFixPoints } from "@/lib/billing/fixPointsService";
import { completeReferral, readReferralDiscount, revokeReferralReward } from "@/lib/referrals/service";
import { stampOrderNotes } from "@/lib/billing/plans";
import { stampDiscountNotes } from "@/lib/billing/fixPoints";
import { POST as order } from "@/app/api/billing/order/route";
import { POST as verify } from "@/app/api/billing/verify/route";
import { POST as webhook } from "@/app/api/billing/webhook/route";

const post = (url: string, body: unknown, country = "IN") =>
  new NextRequest(`http://localhost${url}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json", "x-vercel-ip-country": country },
  });

const SECRET = "whsec";
const signed = (bodyObj: unknown) => {
  const raw = JSON.stringify(bodyObj);
  return new NextRequest("http://localhost/api/billing/webhook", {
    method: "POST",
    body: raw,
    headers: { "x-razorpay-signature": createHmac("sha256", SECRET).update(raw).digest("hex"), "content-type": "application/json" },
  });
};

const referredNotes = () => stampDiscountNotes(stampOrderNotes(premium, "u1"), premium, { points: 0, referralPct: 25 });
const paid = (notes: Record<string, string>) => ({
  status: "paid", amount_paid: Number(notes.amountPaise), currency: "INR", notes,
});

beforeEach(() => {
  vi.clearAllMocks();
  process.env.RAZORPAY_KEY_ID = "rzp_test";
  process.env.RAZORPAY_KEY_SECRET = "secret";
  process.env.RAZORPAY_WEBHOOK_SECRET = SECRET;
});

describe("/api/billing/order and referrals", () => {
  it("sells a referred friend's first pass 25% off and stamps it", async () => {
    vi.mocked(readReferralDiscount).mockResolvedValueOnce(25);
    const res = await order(post("/api/billing/order", { planId: "mock-pass-6m" }));
    expect(res.status).toBe(200);
    const call = vi.mocked(createOrder).mock.calls[0][0];
    expect(call.amountPaise).toBe(37400);
    expect(call.notes).toMatchObject({ referralPct: "25", discountPct: "25", listPaise: "49900" });
  });

  it("adds the points on top, capped at 50% together", async () => {
    vi.mocked(readReferralDiscount).mockResolvedValueOnce(25);
    vi.mocked(readFixPoints).mockResolvedValueOnce({ points: 40, pct: 40, oldestAt: null });
    await order(post("/api/billing/order", { planId: "mock-pass-6m" }));
    expect(vi.mocked(createOrder).mock.calls[0][0].amountPaise).toBe(24900);
  });

  it("sells at the list price when the referral cannot be read", async () => {
    vi.mocked(readReferralDiscount).mockRejectedValueOnce(new Error("db down"));
    const res = await order(post("/api/billing/order", { planId: "mock-pass-6m" }));
    expect(res.status).toBe(200);
    expect(vi.mocked(createOrder).mock.calls[0][0].amountPaise).toBe(49900);
  });

  it("never reads it for a pass that takes no discount", async () => {
    await order(post("/api/billing/order", { planId: "intl-pass-6m" }, "US"));
    expect(readReferralDiscount).not.toHaveBeenCalled();
  });
});

describe("/api/billing/verify and referrals", () => {
  const fields = { razorpay_order_id: "order_1", razorpay_payment_id: "pay_1", razorpay_signature: "sig" };

  it("rewards the inviter after granting a referred order", async () => {
    vi.mocked(fetchOrder).mockResolvedValueOnce({ ok: true, order: paid(referredNotes()) });
    const res = await verify(post("/api/billing/verify", fields));
    expect(res.status).toBe(200);
    expect(completeReferral).toHaveBeenCalledWith(expect.anything(), "u1", "pay_1");
  });

  it("still answers ok when the reward fails (the webhook completes it)", async () => {
    vi.mocked(fetchOrder).mockResolvedValueOnce({ ok: true, order: paid(referredNotes()) });
    vi.mocked(completeReferral).mockRejectedValueOnce(new Error("db down"));
    const res = await verify(post("/api/billing/verify", fields));
    expect(res.status).toBe(200);
  });

  it("leaves referrals alone for an order without one", async () => {
    vi.mocked(fetchOrder).mockResolvedValueOnce({ ok: true, order: paid(stampOrderNotes(premium, "u1")) });
    await verify(post("/api/billing/verify", fields));
    expect(completeReferral).not.toHaveBeenCalled();
  });
});

describe("/api/billing/webhook and referrals", () => {
  const event = (notes: Record<string, string>) => ({
    event: "order.paid",
    payload: { order: { entity: paid(notes) }, payment: { entity: { id: "pay_9" } } },
  });

  it("rewards the inviter after granting a referred order", async () => {
    const res = await webhook(signed(event(referredNotes())));
    expect(res.status).toBe(200);
    expect(completeReferral).toHaveBeenCalledWith(expect.anything(), "u1", "pay_9");
  });

  it("answers 500 when the reward fails, so Razorpay retries", async () => {
    vi.mocked(completeReferral).mockRejectedValueOnce(new Error("db down"));
    const res = await webhook(signed(event(referredNotes())));
    expect(res.status).toBe(500);
  });

  it("leaves referrals alone for an order without one", async () => {
    await webhook(signed(event(stampOrderNotes(premium, "u1"))));
    expect(completeReferral).not.toHaveBeenCalled();
  });

  it("a full refund also ends the reward that payment earned", async () => {
    const res = await webhook(
      signed({
        event: "refund.processed",
        payload: { payment: { entity: { id: "pay_9", amount: 37400, amount_refunded: 37400 } } },
      })
    );
    expect(res.status).toBe(200);
    expect(revokeReferralReward).toHaveBeenCalledWith(expect.anything(), "pay_9");
  });
});
