/**
 * Which pass a paid order buys. The checkout signature proves an order was
 * paid; it says nothing about WHICH plan. Until 2026-09-26 /api/billing/verify
 * took the plan from the request body, so with two prices a buyer could pay
 * for the ₹99 Mock Pass and claim the ₹499 Teacher Pass. The plan, the buyer
 * and the amount now come from the order Razorpay holds.
 */
import { describe, it, expect } from "vitest";
import { planForPaidOrder } from "@/lib/billing/plans";

const order = (over: Record<string, unknown> = {}) => ({
  status: "paid",
  amount_paid: 9900,
  currency: "INR",
  notes: { userId: "u1", planId: "mock-pass-6m" },
  ...over,
});

describe("planForPaidOrder", () => {
  it("returns the plan the order was created for", () => {
    const r = planForPaidOrder(order(), "u1");
    expect(r.ok && r.plan.id).toBe("mock-pass-6m");
  });
  it("ignores any other plan the caller might name — it takes no plan argument", () => {
    expect(planForPaidOrder.length).toBe(2);
  });
  it("refuses an order that belongs to another account", () => {
    expect(planForPaidOrder(order(), "u2").ok).toBe(false);
  });
  it("refuses an order that is not fully paid", () => {
    expect(planForPaidOrder(order({ status: "attempted" }), "u1").ok).toBe(false);
  });
  it("refuses an order whose amount does not match its plan", () => {
    const cheap = order({ amount_paid: 9900, notes: { userId: "u1", planId: "teacher-pass-1y" } });
    expect(planForPaidOrder(cheap, "u1").ok).toBe(false);
  });
  it("refuses an unknown plan or missing notes", () => {
    expect(planForPaidOrder(order({ notes: { userId: "u1", planId: "premium-365" } }), "u1").ok).toBe(false);
    expect(planForPaidOrder(order({ notes: undefined }), "u1").ok).toBe(false);
  });
});
