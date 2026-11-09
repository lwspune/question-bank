/**
 * "Ask a parent to pay" (2026-11-09): the three ROUTES and the webhook's part.
 * What is locked:
 *
 * - parent-link: signed in only; a pass sold on www in rupees; not one the
 *   student already holds; returns the short URL and the ready message;
 * - parent-order: no sign-in; a malformed code never reaches the database; a
 *   link that is not payable never reaches Razorpay; the order is stamped for
 *   the STUDENT at today's price, with the link's code;
 * - parent-verify: no sign-in; the grant goes to the order's own student, only
 *   for the link the order names, marked as parent-paid; the student's email
 *   goes out only for a NEW grant (verify and the webhook both grant);
 * - the webhook grants a parent order the same way, with the same mark.
 *
 * Razorpay, the session and the DB are mocked; the decisions are real.
 */
import { vi, describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import type { Plan } from "@/lib/billing/plans";
import type { ParentLink } from "@/lib/billing/parentLink";

vi.mock("@/lib/auth", () => ({ getSessionUser: vi.fn() }));
vi.mock("@/lib/supabase/server", () => ({ createSupabaseServerClient: vi.fn(() => ({})) }));
vi.mock("@/lib/supabase/admin", () => ({ createSupabaseAdminClient: vi.fn(() => ({})) }));
vi.mock("@/lib/activity/service", () => ({ logActivity: vi.fn(async () => undefined), logActivityOnce: vi.fn(async () => undefined) }));
vi.mock("@/lib/rate-limit", () => ({ checkAndIncrement: vi.fn(async () => ({ ok: true })) }));
vi.mock("@/lib/billing/plansQuery", () => ({ listActivePlans: vi.fn() }));
vi.mock("@/lib/entitlements/query", () => ({ loadEntitlements: vi.fn(async () => []) }));
vi.mock("@/lib/billing/parentLinkStore", () => ({ findOrCreateParentLink: vi.fn(), readParentLink: vi.fn() }));
vi.mock("@/lib/billing/parentPayService", () => ({
  studentExamName: vi.fn(async () => "NDA"),
  emailParentPaid: vi.fn(async () => "sent"),
}));
vi.mock("@/lib/billing/razorpay", () => ({
  createOrder: vi.fn(async (input: { amountPaise: number }) => ({ ok: true, orderId: "order_p1", amount: input.amountPaise, currency: "INR" })),
  fetchOrder: vi.fn(),
  verifyPaymentSignature: vi.fn(() => true),
}));
vi.mock("@/lib/billing/grant", () => ({ grantRazorpayEntitlement: vi.fn(async () => ({ kind: "ok" })) }));

import { getSessionUser } from "@/lib/auth";
import { listActivePlans } from "@/lib/billing/plansQuery";
import { loadEntitlements } from "@/lib/entitlements/query";
import { findOrCreateParentLink, readParentLink } from "@/lib/billing/parentLinkStore";
import { emailParentPaid } from "@/lib/billing/parentPayService";
import { createOrder, fetchOrder, verifyPaymentSignature } from "@/lib/billing/razorpay";
import { grantRazorpayEntitlement } from "@/lib/billing/grant";
import { checkAndIncrement } from "@/lib/rate-limit";
import { decideWebhook } from "@/lib/billing/webhook";
import { POST as makeLink } from "@/app/api/billing/parent-link/route";
import { POST as parentOrder } from "@/app/api/billing/parent-order/route";
import { POST as parentVerify } from "@/app/api/billing/parent-verify/route";

const STUDENT = "11111111-1111-4111-8111-111111111111";
const CODE = "AbCdEfGh23";

const practice: Plan = {
  id: "practice-pass-6m", label: "Practice Pass", blurb: "", perks: [], urlKey: "practice",
  amountPaise: 19900, currency: "INR", site: "pyqvault", durationDays: 182, scope: "practice", active: true, sortOrder: 0,
};
const intl: Plan = { ...practice, id: "intl-pass-6m", currency: "USD", site: "intl", amountPaise: 1900, scope: "imat" };

const link: ParentLink = {
  code: CODE, userId: STUDENT, planId: practice.id, studentName: "Riya",
  createdAt: new Date().toISOString(), expiresAt: new Date(Date.now() + 7 * 86_400_000).toISOString(),
};

const post = (url: string, body: unknown) =>
  new NextRequest(`http://localhost${url}`, { method: "POST", body: JSON.stringify(body), headers: { "content-type": "application/json" } });

const activePass = {
  id: "e1", userId: STUDENT, scope: "practice", source: "razorpay" as const, status: "active" as const,
  grantedAt: new Date().toISOString(), expiresAt: new Date(Date.now() + 86_400_000).toISOString(),
  providerRef: "pay_x", note: null, grantedBy: null,
};

beforeEach(() => {
  vi.clearAllMocks();
  process.env.RAZORPAY_KEY_ID = "rzp_test";
  process.env.RAZORPAY_KEY_SECRET = "secret";
  vi.mocked(getSessionUser).mockResolvedValue({ id: STUDENT, email: "riya@example.com", name: "Riya Sharma" });
  vi.mocked(listActivePlans).mockResolvedValue([practice, intl]);
  vi.mocked(loadEntitlements).mockResolvedValue([]);
  vi.mocked(findOrCreateParentLink).mockResolvedValue(link);
  vi.mocked(readParentLink).mockResolvedValue(link);
});

describe("POST /api/billing/parent-link", () => {
  it("needs a signed-in student", async () => {
    vi.mocked(getSessionUser).mockResolvedValueOnce(null);
    expect((await makeLink(post("/api/billing/parent-link", { planId: practice.id }))).status).toBe(401);
  });

  it("refuses a pass not sold on www in rupees", async () => {
    expect((await makeLink(post("/api/billing/parent-link", { planId: "nope" }))).status).toBe(400);
    expect((await makeLink(post("/api/billing/parent-link", { planId: intl.id }))).status).toBe(400);
  });

  it("refuses a pass the student already has", async () => {
    vi.mocked(loadEntitlements).mockResolvedValueOnce([activePass]);
    expect((await makeLink(post("/api/billing/parent-link", { planId: practice.id }))).status).toBe(409);
    expect(findOrCreateParentLink).not.toHaveBeenCalled();
  });

  it("returns the short link and the message, with the first name stored", async () => {
    const res = await makeLink(post("/api/billing/parent-link", { planId: practice.id, gate: "reveals" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.url).toBe(`https://www.pyqvault.com/pay/${CODE}`);
    expect(body.text).toContain("preparing for NDA");
    expect(body.text).toContain("Practice Pass? ₹199 for 6 months");
    expect(vi.mocked(findOrCreateParentLink).mock.calls[0][1]).toMatchObject({ userId: STUDENT, planId: practice.id, studentName: "Riya" });
  });
});

describe("POST /api/billing/parent-order", () => {
  it("refuses a malformed code before any read", async () => {
    const res = await parentOrder(post("/api/billing/parent-order", { code: "../x" }));
    expect(res.status).toBe(400);
    expect(readParentLink).not.toHaveBeenCalled();
  });

  it("answers 404 for an unknown link", async () => {
    vi.mocked(readParentLink).mockResolvedValueOnce(null);
    expect((await parentOrder(post("/api/billing/parent-order", { code: CODE }))).status).toBe(404);
  });

  it("is rate-limited per address", async () => {
    vi.mocked(checkAndIncrement).mockResolvedValueOnce({ ok: false, limit: 30, used: 31, retryAfter: 60, windowStart: "" });
    expect((await parentOrder(post("/api/billing/parent-order", { code: CODE }))).status).toBe(429);
  });

  it("never reaches Razorpay for an expired link or a student who has the pass", async () => {
    vi.mocked(readParentLink).mockResolvedValueOnce({ ...link, expiresAt: new Date(Date.now() - 1000).toISOString() });
    const expired = await parentOrder(post("/api/billing/parent-order", { code: CODE }));
    expect(expired.status).toBe(409);
    expect((await expired.json()).state).toBe("expired");

    vi.mocked(loadEntitlements).mockResolvedValueOnce([activePass]);
    const active = await parentOrder(post("/api/billing/parent-order", { code: CODE }));
    expect((await active.json()).state).toBe("already_active");
    expect(createOrder).not.toHaveBeenCalled();
  });

  it("stamps the order for the student at today's price, with the link's code", async () => {
    vi.mocked(listActivePlans).mockResolvedValueOnce([{ ...practice, amountPaise: 14900 }]);
    const res = await parentOrder(post("/api/billing/parent-order", { code: CODE }));
    expect(res.status).toBe(200);
    const call = vi.mocked(createOrder).mock.calls[0][0];
    expect(call.amountPaise).toBe(14900);
    expect(call.notes).toMatchObject({ userId: STUDENT, planId: practice.id, amountPaise: "14900", parentLink: CODE });
    const body = await res.json();
    expect(body).toMatchObject({ orderId: "order_p1", keyId: "rzp_test", planLabel: "Practice Pass" });
    expect(body.email).toBeUndefined();
  });
});

describe("POST /api/billing/parent-verify", () => {
  const notes = {
    userId: STUDENT, planId: practice.id, amountPaise: "19900", currency: "INR", scope: "practice", durationDays: "182", parentLink: CODE,
  };
  const paid = { status: "paid", amount_paid: 19900, currency: "INR", notes };
  const fields = { code: CODE, razorpay_order_id: "order_p1", razorpay_payment_id: "pay_p1", razorpay_signature: "sig" };

  it("refuses a bad signature", async () => {
    vi.mocked(verifyPaymentSignature).mockReturnValueOnce(false);
    expect((await parentVerify(post("/api/billing/parent-verify", fields))).status).toBe(400);
    expect(grantRazorpayEntitlement).not.toHaveBeenCalled();
  });

  it("grants the order's student, marked as parent-paid, and emails them once", async () => {
    vi.mocked(fetchOrder).mockResolvedValueOnce({ ok: true, order: paid });
    const res = await parentVerify(post("/api/billing/parent-verify", fields));
    expect(res.status).toBe(200);
    expect(vi.mocked(grantRazorpayEntitlement).mock.calls[0][0]).toMatchObject({
      userId: STUDENT, paymentId: "pay_p1", scope: "practice", amountPaise: 19900, note: `parent_link:${CODE}`,
    });
    expect(emailParentPaid).toHaveBeenCalledTimes(1);
  });

  it("sends no email when the webhook already granted it", async () => {
    vi.mocked(fetchOrder).mockResolvedValueOnce({ ok: true, order: paid });
    vi.mocked(grantRazorpayEntitlement).mockResolvedValueOnce({ kind: "already_granted" });
    expect((await parentVerify(post("/api/billing/parent-verify", fields))).status).toBe(200);
    expect(emailParentPaid).not.toHaveBeenCalled();
  });

  it("refuses an order made for another link", async () => {
    vi.mocked(fetchOrder).mockResolvedValueOnce({ ok: true, order: { ...paid, notes: { ...notes, parentLink: "ZZZZZZZZZZ" } } });
    expect((await parentVerify(post("/api/billing/parent-verify", fields))).status).toBe(400);
    expect(grantRazorpayEntitlement).not.toHaveBeenCalled();
  });

  it("answers 202 while the payment is not yet captured", async () => {
    vi.mocked(fetchOrder).mockResolvedValueOnce({ ok: true, order: { ...paid, status: "attempted" } });
    expect((await parentVerify(post("/api/billing/parent-verify", fields))).status).toBe(202);
  });
});

describe("webhook with a parent order", () => {
  it("grants the student and carries the parent mark", () => {
    const d = decideWebhook({
      event: "order.paid",
      payload: {
        order: { entity: { status: "paid", amount_paid: 19900, currency: "INR", notes: {
          userId: STUDENT, planId: practice.id, amountPaise: "19900", currency: "INR", scope: "practice", durationDays: "182", parentLink: CODE,
        } } },
        payment: { entity: { id: "pay_p1" } },
      },
    });
    expect(d).toMatchObject({ action: "grant", userId: STUDENT, note: `parent_link:${CODE}` });
  });

  it("leaves an ordinary order unmarked", () => {
    const d = decideWebhook({
      event: "order.paid",
      payload: {
        order: { entity: { status: "paid", amount_paid: 19900, currency: "INR", notes: {
          userId: STUDENT, planId: practice.id, amountPaise: "19900", currency: "INR", scope: "practice", durationDays: "182",
        } } },
        payment: { entity: { id: "pay_p2" } },
      },
    });
    expect(d).toMatchObject({ action: "grant", note: null });
  });
});
