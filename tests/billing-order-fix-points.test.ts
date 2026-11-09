/**
 * The order ROUTE sells a rupee pass at the buyer's Fix Points price (0245):
 * the server reads the points at order time and stamps the discounted price
 * into the order, which the paid-order check then holds the payment to. A
 * failed points read sells at the list price (the safe direction for money).
 *
 * Razorpay, the session, the plan read and the points read are mocked.
 */
import { vi, describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import type { Plan } from "@/lib/billing/plans";

vi.mock("@/lib/auth", () => ({ getSessionUser: vi.fn(async () => ({ id: "u1", email: "asha@example.com" })) }));
vi.mock("@/lib/supabase/server", () => ({ createSupabaseServerClient: vi.fn(() => ({})) }));
vi.mock("@/lib/supabase/admin", () => ({ createSupabaseAdminClient: vi.fn(() => ({})) }));
vi.mock("@/lib/activity/service", () => ({ logActivity: vi.fn(async () => undefined) }));
vi.mock("@/lib/billing/razorpay", () => ({
  createOrder: vi.fn(async (input: { amountPaise: number; currency: string }) => ({
    ok: true, orderId: "order_1", amount: input.amountPaise, currency: input.currency,
  })),
}));
vi.mock("@/lib/billing/fixPointsService", () => ({ readFixPoints: vi.fn() }));

const premium: Plan = {
  id: "mock-pass-6m", label: "Premium Pass", blurb: "b", perks: [], urlKey: "mocks", amountPaise: 49900,
  currency: "INR", site: "pyqvault", durationDays: 182, scope: "mocks", active: true, sortOrder: 1, countries: null,
};
const intl: Plan = {
  ...premium, id: "intl-pass-6m", urlKey: "imat", amountPaise: 1900, currency: "USD", site: "intl", scope: "imat",
};

vi.mock("@/lib/billing/plansQuery", () => ({ listActivePlans: vi.fn(async () => [premium, intl]) }));

import { createOrder } from "@/lib/billing/razorpay";
import { readFixPoints } from "@/lib/billing/fixPointsService";
import { POST as order } from "@/app/api/billing/order/route";

const post = (body: unknown, country = "IN") =>
  new NextRequest("http://localhost/api/billing/order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json", "x-vercel-ip-country": country },
  });

beforeEach(() => {
  vi.clearAllMocks();
  process.env.RAZORPAY_KEY_ID = "rzp_test";
});

describe("/api/billing/order and Fix Points", () => {
  it("charges the discounted price and records the points used", async () => {
    vi.mocked(readFixPoints).mockResolvedValue({ points: 12, pct: 12, oldestAt: null });
    const res = await order(post({ planId: "mock-pass-6m" }));
    expect(res.status).toBe(200);
    const call = vi.mocked(createOrder).mock.calls[0][0];
    expect(call.amountPaise).toBe(43900);
    expect(call.notes).toMatchObject({ amountPaise: "43900", listPaise: "49900", fixPoints: "12", discountPct: "12" });
    expect(await res.json()).toMatchObject({ amount: 43900 });
  });

  it("charges the list price with no points", async () => {
    vi.mocked(readFixPoints).mockResolvedValue({ points: 0, pct: 0, oldestAt: null });
    await order(post({ planId: "mock-pass-6m" }));
    const call = vi.mocked(createOrder).mock.calls[0][0];
    expect(call.amountPaise).toBe(49900);
    expect(call.notes).not.toHaveProperty("fixPoints");
  });

  it("sells at the list price when the points cannot be read", async () => {
    vi.mocked(readFixPoints).mockRejectedValue(new Error("db down"));
    const res = await order(post({ planId: "mock-pass-6m" }));
    expect(res.status).toBe(200);
    expect(vi.mocked(createOrder).mock.calls[0][0].amountPaise).toBe(49900);
  });

  it("does not read points for a pass that takes no discount", async () => {
    await order(post({ planId: "intl-pass-6m" }, "US"));
    expect(readFixPoints).not.toHaveBeenCalled();
    expect(vi.mocked(createOrder).mock.calls[0][0].amountPaise).toBe(1900);
  });
});
