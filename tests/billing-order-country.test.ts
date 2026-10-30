/**
 * The order ROUTE prices a pass for the buyer's country (2026-10-30). The
 * button names the pass; the server picks the plan from Vercel's location
 * header, so a buyer in India pays the rupee IMAT price whichever price they
 * tapped, and a rupee plan id sent from outside India sells the dollar pass.
 *
 * Razorpay, the session and the plan read are mocked; the decision is real.
 */
import { vi, describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import type { Plan } from "@/lib/billing/plans";

vi.mock("@/lib/auth", () => ({ getSessionUser: vi.fn(async () => ({ id: "u1", email: "asha@example.com" })) }));
vi.mock("@/lib/supabase/server", () => ({ createSupabaseServerClient: vi.fn(() => ({})) }));
vi.mock("@/lib/activity/service", () => ({ logActivity: vi.fn(async () => undefined) }));
vi.mock("@/lib/billing/razorpay", () => ({
  createOrder: vi.fn(async (input: { amountPaise: number; currency: string }) => ({
    ok: true, orderId: "order_1", amount: input.amountPaise, currency: input.currency,
  })),
}));

const base: Plan = {
  id: "intl-pass-6m", label: "IMAT Pass", blurb: "b", perks: [], urlKey: "imat", amountPaise: 1900,
  currency: "USD", site: "intl", durationDays: 182, scope: "imat", active: true, sortOrder: 1, countries: null,
};
const india: Plan = { ...base, id: "imat-india-6m", urlKey: "imat-india", amountPaise: 99900, currency: "INR", countries: ["IN"] };

vi.mock("@/lib/billing/plansQuery", () => ({ listActivePlans: vi.fn(async () => [base, india]) }));

import { createOrder } from "@/lib/billing/razorpay";
import { POST as order } from "@/app/api/billing/order/route";

const post = (body: unknown, country?: string) =>
  new NextRequest("http://localhost/api/billing/order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json", ...(country ? { "x-vercel-ip-country": country } : {}) },
  });

beforeEach(() => {
  vi.clearAllMocks();
  process.env.RAZORPAY_KEY_ID = "rzp_test";
});

describe("/api/billing/order prices a pass for the buyer's country", () => {
  it("a buyer in India who tapped the dollar pass is charged in rupees", async () => {
    const res = await order(post({ planId: "intl-pass-6m" }, "IN"));
    expect(res.status).toBe(200);
    const call = vi.mocked(createOrder).mock.calls[0][0];
    expect(call).toMatchObject({ amountPaise: 99900, currency: "INR" });
    expect(call.notes).toMatchObject({ planId: "imat-india-6m", scope: "imat", currency: "INR" });
  });

  it("a buyer outside India who sends the rupee plan id is charged in dollars", async () => {
    await order(post({ planId: "imat-india-6m" }, "US"));
    expect(vi.mocked(createOrder).mock.calls[0][0]).toMatchObject({ amountPaise: 1900, currency: "USD" });
  });

  it("a buyer of unknown country gets the price sold everywhere", async () => {
    await order(post({ planId: "imat-india-6m" }));
    expect(vi.mocked(createOrder).mock.calls[0][0]).toMatchObject({ amountPaise: 1900, currency: "USD" });
  });

  it("an unknown plan never reaches Razorpay", async () => {
    const res = await order(post({ planId: "nope" }, "IN"));
    expect(res.status).toBe(400);
    expect(createOrder).not.toHaveBeenCalled();
  });
});
