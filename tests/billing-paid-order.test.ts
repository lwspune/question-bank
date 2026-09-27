/**
 * Which pass a paid order buys, and for whom.
 *
 * The checkout signature proves an order was paid; it says nothing about which
 * plan. Until 2026-09-26 /api/billing/verify took the plan from the request
 * body, so a buyer could pay ₹99 and claim the ₹499 pass. Then the plan was
 * looked up by id and its CURRENT price compared with the paid amount — which
 * would reject a legitimate checkout if the price changed while it was open.
 *
 * Now the order is a self-contained contract: /api/billing/order stamps the
 * price, scope and duration into the order's notes (our server writes them,
 * Razorpay stores them), and the grant is decided from those notes alone.
 */
import { describe, it, expect } from "vitest";
import { planForPaidOrder, stampOrderNotes, type Plan } from "@/lib/billing/plans";
import { SCOPE_MOCKS, SCOPE_TEACHER } from "@/lib/entitlements/access";

const mockPass: Plan = {
  id: "mock-pass-6m",
  label: "Student Mock Pass",
  blurb: "",
  perks: [],
  urlKey: "mocks",
  amountPaise: 9900,
  currency: "INR",
  durationDays: 182,
  scope: SCOPE_MOCKS,
  active: true,
  sortOrder: 1,
};

const order = (over: Record<string, unknown> = {}) => ({
  status: "paid",
  amount_paid: 9900,
  currency: "INR",
  notes: stampOrderNotes(mockPass, "u1"),
  ...over,
});

describe("stampOrderNotes", () => {
  it("writes strings only (Razorpay notes are string-valued)", () => {
    const notes = stampOrderNotes(mockPass, "u1");
    for (const v of Object.values(notes)) expect(typeof v).toBe("string");
    expect(notes).toMatchObject({ userId: "u1", planId: "mock-pass-6m", amountPaise: "9900", scope: "mocks", durationDays: "182" });
  });
  it("encodes a lifetime plan as an empty duration", () => {
    expect(stampOrderNotes({ ...mockPass, durationDays: null }, "u1").durationDays).toBe("");
  });
});

describe("planForPaidOrder", () => {
  it("grants what the notes say, to the buyer they name", () => {
    const r = planForPaidOrder(order(), "u1");
    expect(r).toEqual({ ok: true, grant: { planId: "mock-pass-6m", scope: SCOPE_MOCKS, durationDays: 182 } });
  });

  it("does not need the plan to still exist or be active — the order is the contract", () => {
    // Nothing but the order is passed in; a plan deactivated mid-checkout still grants.
    expect(planForPaidOrder.length).toBe(2);
  });

  it("a price change after the order was created does not reject it", () => {
    // The order carries 9900; the plan now costs 14900. The buyer paid the price shown at the time.
    expect(planForPaidOrder(order(), "u1").ok).toBe(true);
  });

  it("refuses an order that belongs to another account", () => {
    expect(planForPaidOrder(order(), "u2")).toMatchObject({ ok: false, reason: "order belongs to another account" });
  });

  it("refuses an order that is not fully paid", () => {
    expect(planForPaidOrder(order({ status: "attempted" }), "u1")).toMatchObject({ ok: false, reason: "order not paid" });
  });

  it("refuses when the paid amount or currency differs from the stamped price", () => {
    expect(planForPaidOrder(order({ amount_paid: 5000 }), "u1")).toMatchObject({ ok: false, reason: "amount does not match order" });
    expect(planForPaidOrder(order({ currency: "USD" }), "u1")).toMatchObject({ ok: false, reason: "amount does not match order" });
  });

  it("refuses notes our server did not write in full", () => {
    const notes = stampOrderNotes(mockPass, "u1");
    expect(planForPaidOrder(order({ notes: { userId: "u1", planId: "mock-pass-6m" } }), "u1").ok).toBe(false);
    expect(planForPaidOrder(order({ notes: { ...notes, scope: "all" } }), "u1").ok).toBe(false);
    expect(planForPaidOrder(order({ notes: { ...notes, durationDays: "abc" } }), "u1").ok).toBe(false);
    expect(planForPaidOrder(order({ notes: undefined }), "u1").ok).toBe(false);
  });

  it("a lifetime stamp grants with no expiry", () => {
    const lifetime = { ...mockPass, durationDays: null, scope: SCOPE_TEACHER };
    const r = planForPaidOrder(order({ notes: stampOrderNotes(lifetime, "u1") }), "u1");
    expect(r.ok && r.grant.durationDays).toBeNull();
  });
});
