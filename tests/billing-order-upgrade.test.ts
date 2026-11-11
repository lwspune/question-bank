/**
 * The order ROUTES sell the Premium Pass to a Practice Pass holder at the
 * upgrade price (2026-11-11): the server reads the student's passes when the
 * order is made, stamps list less credit (then less any Vault Points) into the
 * Razorpay order, and the grant paths hold the payment to it and mark the pass
 * row. A failed pass read sells at the list price, never a credit nobody
 * earned. The parent's order gets the credit too (no points: a parent's order
 * never took them).
 *
 * Razorpay, the session, the plan read and the database reads are mocked.
 */
import { vi, describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import type { Plan } from "@/lib/billing/plans";
import type { Entitlement } from "@/lib/entitlements/access";
import type { ParentLink } from "@/lib/billing/parentLink";

vi.mock("@/lib/auth", () => ({ getSessionUser: vi.fn(async () => ({ id: "u1", email: "asha@example.com" })) }));
vi.mock("@/lib/supabase/server", () => ({ createSupabaseServerClient: vi.fn(() => ({})) }));
vi.mock("@/lib/supabase/admin", () => ({ createSupabaseAdminClient: vi.fn(() => ({})) }));
vi.mock("@/lib/activity/service", () => ({ logActivity: vi.fn(async () => undefined) }));
vi.mock("@/lib/rate-limit", () => ({ checkAndIncrement: vi.fn(async () => ({ ok: true })) }));
vi.mock("@/lib/billing/razorpay", () => ({
  createOrder: vi.fn(async (input: { amountPaise: number; currency: string }) => ({
    ok: true, orderId: "order_1", amount: input.amountPaise, currency: input.currency,
  })),
}));
vi.mock("@/lib/billing/fixPointsService", () => ({ readFixPoints: vi.fn(async () => ({ points: 0, pct: 0, oldestAt: null })) }));
vi.mock("@/lib/referrals/service", () => ({ readReferralDiscount: vi.fn(async () => 0) }));
vi.mock("@/lib/entitlements/query", () => ({ loadEntitlements: vi.fn(async () => []) }));
vi.mock("@/lib/billing/parentLinkStore", () => ({ readParentLink: vi.fn() }));

const premium: Plan = {
  id: "mock-pass-6m", label: "Premium Pass", blurb: "b", perks: [], urlKey: "mocks", amountPaise: 49900,
  currency: "INR", site: "pyqvault", durationDays: 182, scope: "mocks", active: true, sortOrder: 1, countries: null,
};
const practice: Plan = { ...premium, id: "practice-pass-6m", label: "Practice Pass", urlKey: "practice", amountPaise: 19900, scope: "practice", sortOrder: 0 };
vi.mock("@/lib/billing/plansQuery", () => ({ listActivePlans: vi.fn(async () => [premium, practice]) }));

import { createOrder } from "@/lib/billing/razorpay";
import { readFixPoints } from "@/lib/billing/fixPointsService";
import { loadEntitlements } from "@/lib/entitlements/query";
import { readParentLink } from "@/lib/billing/parentLinkStore";
import { decideWebhook } from "@/lib/billing/webhook";
import { POST as order } from "@/app/api/billing/order/route";
import { POST as parentOrder } from "@/app/api/billing/parent-order/route";

const STUDENT = "11111111-1111-4111-8111-111111111111";

/** A Practice Pass paid for a minute ago: its whole ₹199 counts. */
function practiceRow(userId = "u1"): Entitlement {
  const granted = Date.now() - 60_000;
  return {
    id: "e1", userId, scope: "practice", source: "razorpay", status: "active",
    grantedAt: new Date(granted).toISOString(), expiresAt: new Date(granted + 182 * 86_400_000).toISOString(),
    providerRef: "pay_1", note: null, grantedBy: null, amountPaise: 19900, currency: "INR",
  };
}

const post = (url: string, body: unknown) =>
  new NextRequest(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json", "x-vercel-ip-country": "IN" },
  });

beforeEach(() => {
  vi.clearAllMocks();
  process.env.RAZORPAY_KEY_ID = "rzp_test";
});

describe("/api/billing/order: the upgrade price", () => {
  it("charges the difference for the days left, ending with the Practice Pass", async () => {
    const row = practiceRow();
    vi.mocked(loadEntitlements).mockResolvedValueOnce([row]);
    const res = await order(post("http://localhost/api/billing/order", { planId: "mock-pass-6m" }));
    expect(res.status).toBe(200);
    const call = vi.mocked(createOrder).mock.calls[0][0];
    expect(call.amountPaise).toBe(30000);
    expect(call.notes).toMatchObject({
      amountPaise: "30000", listPaise: "49900", upgradeCreditPaise: "19900", scope: "mocks", upgradeEndsAt: row.expiresAt,
    });
  });

  it("takes Vault Points off the upgrade price", async () => {
    vi.mocked(loadEntitlements).mockResolvedValueOnce([practiceRow()]);
    vi.mocked(readFixPoints).mockResolvedValueOnce({ points: 12, pct: 12, oldestAt: null });
    await order(post("http://localhost/api/billing/order", { planId: "mock-pass-6m" }));
    expect(vi.mocked(createOrder).mock.calls[0][0].notes).toMatchObject({
      amountPaise: "26400", listPaise: "49900", upgradeCreditPaise: "19900", fixPoints: "12",
    });
  });

  it("sells at the list price when the passes cannot be read", async () => {
    vi.mocked(loadEntitlements).mockRejectedValueOnce(new Error("db down"));
    const res = await order(post("http://localhost/api/billing/order", { planId: "mock-pass-6m" }));
    expect(res.status).toBe(200);
    expect(vi.mocked(createOrder).mock.calls[0][0].amountPaise).toBe(49900);
  });

  it("gives no credit toward the Practice Pass itself", async () => {
    vi.mocked(loadEntitlements).mockResolvedValueOnce([practiceRow()]);
    await order(post("http://localhost/api/billing/order", { planId: "practice-pass-6m" }));
    expect(vi.mocked(createOrder).mock.calls[0][0].amountPaise).toBe(19900);
  });

  it("reads the BUYER's passes", async () => {
    await order(post("http://localhost/api/billing/order", { planId: "mock-pass-6m" }));
    expect(vi.mocked(loadEntitlements).mock.calls[0][1]).toBe("u1");
  });
});

describe("/api/billing/parent-order: a parent pays the upgrade price", () => {
  const link: ParentLink = {
    code: "Vx9ZVknnkt", userId: STUDENT, planId: "mock-pass-6m", studentName: "Banti",
    createdAt: new Date(Date.now() - 3_600_000).toISOString(),
    expiresAt: new Date(Date.now() + 6 * 86_400_000).toISOString(),
  };

  it("stamps the student's credit into the parent's order", async () => {
    vi.mocked(readParentLink).mockResolvedValueOnce(link);
    vi.mocked(loadEntitlements).mockResolvedValue([practiceRow(STUDENT)]);
    const res = await parentOrder(post("http://localhost/api/billing/parent-order", { code: link.code }));
    expect(res.status).toBe(200);
    const call = vi.mocked(createOrder).mock.calls[0][0];
    expect(call.amountPaise).toBe(30000);
    expect(call.notes).toMatchObject({ userId: STUDENT, parentLink: link.code, upgradeCreditPaise: "19900", amountPaise: "30000" });
  });
});

describe("the grant marks an upgrade on the pass row", () => {
  it("the webhook's note keeps the points mark first", () => {
    const d = decideWebhook({
      event: "order.paid",
      payload: {
        payment: { entity: { id: "pay_9" } },
        order: {
          entity: {
            status: "paid", amount_paid: 26400, currency: "INR",
            notes: {
              userId: "u1", planId: "mock-pass-6m", amountPaise: "26400", currency: "INR", scope: "mocks",
              durationDays: "182", listPaise: "49900", upgradeCreditPaise: "19900", fixPoints: "12", discountPct: "12",
            },
          },
        },
      },
    });
    expect(d).toMatchObject({ action: "grant", note: "fix_points:12 upgrade_credit:19900" });
  });
});
