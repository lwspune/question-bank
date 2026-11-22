/**
 * The return check (2026-11-22): when a buyer comes back to the page after
 * paying (a UPI app, a reload) and the checkout's own success callback never
 * ran, the page asks the server about its order, and the server grants a paid
 * order by the webhook's own rule.
 *
 * WHY: on 22 Nov a parent paid ₹199 by UPI on /pay/<code>; the page never
 * heard back, showed no thanks, and the parent opened checkout again 7 minutes
 * later. The 1 Nov and 15 Nov stranded payments were students on /pricing,
 * the same gap. What is locked:
 *
 * - confirmPaidOrder grants ONLY a paid order the caller owns, for its
 *   captured payment, through applyPaidOrder (the webhook's path);
 * - an unpaid order, or one with no captured payment yet, is "unpaid";
 * - /api/billing/check-order needs a signed-in buyer, and refuses another
 *   buyer's order as if it did not exist;
 * - /api/billing/parent-check needs the link's code, and refuses an order made
 *   for any other link.
 */
import { vi, describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/auth", () => ({ getSessionUser: vi.fn() }));
vi.mock("@/lib/supabase/admin", () => ({ createSupabaseAdminClient: vi.fn(() => ({})) }));
vi.mock("@/lib/rate-limit", () => ({ checkAndIncrement: vi.fn(async () => ({ ok: true })) }));
vi.mock("@/lib/billing/razorpay", () => ({ fetchOrder: vi.fn(), fetchOrderPayments: vi.fn() }));
vi.mock("@/lib/billing/applyPaidOrder", () => ({ applyPaidOrder: vi.fn(async () => ({ kind: "ok" })) }));

import { getSessionUser } from "@/lib/auth";
import { checkAndIncrement } from "@/lib/rate-limit";
import { fetchOrder, fetchOrderPayments } from "@/lib/billing/razorpay";
import { applyPaidOrder } from "@/lib/billing/applyPaidOrder";
import { stampOrderNotes, type PaidOrder, type Plan } from "@/lib/billing/plans";
import { confirmPaidOrder } from "@/lib/billing/confirmOrder";
import { POST as checkOrder } from "@/app/api/billing/check-order/route";
import { POST as parentCheck } from "@/app/api/billing/parent-check/route";

const PLAN: Plan = {
  id: "practice-pass-6m", label: "Practice Pass", blurb: "", perks: [], urlKey: "practice",
  amountPaise: 19900, currency: "INR", site: "pyqvault", durationDays: 182, scope: "practice", active: true, sortOrder: 1,
};
const CODE = "SCxMv5pW3j";

const order = (over: Partial<PaidOrder> & { notes?: Record<string, string> } = {}): PaidOrder => ({
  id: "order_A",
  status: "paid",
  amount_paid: 19900,
  currency: "INR",
  notes: stampOrderNotes(PLAN, "user-1"),
  ...over,
});

const applyMock = vi.mocked(applyPaidOrder);

beforeEach(() => {
  vi.mocked(fetchOrder).mockReset().mockResolvedValue({ ok: true, order: order() });
  vi.mocked(fetchOrderPayments).mockReset().mockResolvedValue({ ok: true, payments: [{ id: "pay_A", status: "captured" }] });
  applyMock.mockClear().mockResolvedValue({ kind: "ok" });
  vi.mocked(getSessionUser).mockReset().mockResolvedValue({ id: "user-1", email: "a@example.test" } as never);
  vi.mocked(checkAndIncrement).mockClear().mockResolvedValue({ ok: true } as never);
});

describe("confirmPaidOrder", () => {
  const mine = (o: PaidOrder) => o.notes?.userId === "user-1";

  it("grants a paid order for its captured payment, by the webhook's rule", async () => {
    await expect(confirmPaidOrder("order_A", mine)).resolves.toBe("paid");
    expect(applyMock).toHaveBeenCalledWith(
      expect.objectContaining({ action: "grant", userId: "user-1", paymentId: "pay_A" })
    );
  });

  it("counts an order already granted (by the webhook or verify) as paid", async () => {
    applyMock.mockResolvedValueOnce({ kind: "already_granted" });
    await expect(confirmPaidOrder("order_A", mine)).resolves.toBe("paid");
  });

  it("leaves an unpaid order alone", async () => {
    vi.mocked(fetchOrder).mockResolvedValueOnce({ ok: true, order: order({ status: "attempted" }) });
    await expect(confirmPaidOrder("order_A", mine)).resolves.toBe("unpaid");
    expect(applyMock).not.toHaveBeenCalled();
  });

  it("waits when the order reads paid but no payment is captured yet", async () => {
    vi.mocked(fetchOrderPayments).mockResolvedValueOnce({ ok: true, payments: [{ id: "pay_A", status: "authorized" }] });
    await expect(confirmPaidOrder("order_A", mine)).resolves.toBe("unpaid");
    expect(applyMock).not.toHaveBeenCalled();
  });

  it("refuses an order the caller does not own", async () => {
    await expect(confirmPaidOrder("order_A", () => false)).resolves.toBe("not_found");
    expect(applyMock).not.toHaveBeenCalled();
  });

  it("reports an error when Razorpay cannot be read", async () => {
    vi.mocked(fetchOrder).mockResolvedValueOnce({ ok: false, error: "502" });
    await expect(confirmPaidOrder("order_A", mine)).resolves.toBe("error");
  });

  it("reports an error when the grant fails", async () => {
    applyMock.mockResolvedValueOnce({ kind: "error", stage: "grant", message: "db down" });
    await expect(confirmPaidOrder("order_A", mine)).resolves.toBe("error");
  });
});

const post = (url: string, body: unknown) =>
  new NextRequest(url, { method: "POST", body: JSON.stringify(body), headers: { "content-type": "application/json" } });

describe("/api/billing/check-order (a signed-in buyer's own order)", () => {
  const call = (body: unknown) => checkOrder(post("http://localhost/api/billing/check-order", body));

  it("grants the buyer's own paid order", async () => {
    const res = await call({ orderId: "order_A" });
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ state: "paid" });
  });

  it("needs a signed-in buyer", async () => {
    vi.mocked(getSessionUser).mockResolvedValueOnce(null);
    const res = await call({ orderId: "order_A" });
    expect(res.status).toBe(401);
    expect(applyMock).not.toHaveBeenCalled();
  });

  it("answers another buyer's order as if it did not exist", async () => {
    vi.mocked(getSessionUser).mockResolvedValueOnce({ id: "user-2", email: "b@example.test" } as never);
    const res = await call({ orderId: "order_A" });
    expect(res.status).toBe(404);
    expect(applyMock).not.toHaveBeenCalled();
  });

  it("refuses a malformed order id before asking Razorpay", async () => {
    const res = await call({ orderId: "../../payments" });
    expect(res.status).toBe(400);
    expect(fetchOrder).not.toHaveBeenCalled();
  });

  it("answers 429 past the rate limit", async () => {
    vi.mocked(checkAndIncrement).mockResolvedValueOnce({ ok: false } as never);
    const res = await call({ orderId: "order_A" });
    expect(res.status).toBe(429);
  });
});

describe("/api/billing/parent-check (a parent's order, by the link's code)", () => {
  const parentOrder = (code = CODE) => order({ notes: { ...stampOrderNotes(PLAN, "student-1"), parentLink: code } });
  const call = (body: unknown) => parentCheck(post("http://localhost/api/billing/parent-check", body));

  beforeEach(() => {
    vi.mocked(fetchOrder).mockResolvedValue({ ok: true, order: parentOrder() });
  });

  it("grants the student the link names, with no sign-in", async () => {
    vi.mocked(getSessionUser).mockResolvedValue(null);
    const res = await call({ code: CODE, orderId: "order_A" });
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ state: "paid" });
    expect(applyMock).toHaveBeenCalledWith(expect.objectContaining({ userId: "student-1", paymentId: "pay_A" }));
  });

  it("refuses an order made for another link", async () => {
    vi.mocked(fetchOrder).mockResolvedValueOnce({ ok: true, order: parentOrder("ZZZZZZZZZZ") });
    const res = await call({ code: CODE, orderId: "order_A" });
    expect(res.status).toBe(404);
    expect(applyMock).not.toHaveBeenCalled();
  });

  it("refuses a malformed code", async () => {
    const res = await call({ code: "not-a-code", orderId: "order_A" });
    expect(res.status).toBe(400);
    expect(fetchOrder).not.toHaveBeenCalled();
  });

  it("answers 429 past the rate limit", async () => {
    vi.mocked(checkAndIncrement).mockResolvedValueOnce({ ok: false } as never);
    const res = await call({ code: CODE, orderId: "order_A" });
    expect(res.status).toBe(429);
  });
});
