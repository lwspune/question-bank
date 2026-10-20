/**
 * Ebook purchases (2026-10-20): price, the order contract and the webhook.
 *
 * An ebook is bought once and kept, so it is NOT a pass: no scope, no expiry,
 * and it must never reach the pass grant. The order notes carry
 * `kind: "ebook"`, and that is the switch every grant path reads. The price a
 * pass holder pays is 20% off the list price, rounded to whole rupees, and it
 * is decided on the server when the order is made, like every other price.
 */
import { describe, it, expect } from "vitest";
import { ebookPricePaise, PASS_HOLDER_DISCOUNT } from "@/lib/ebooks/pricing";
import { ebookForPaidOrder, isEbookOrder, stampEbookOrderNotes } from "@/lib/ebooks/order";
import { decideWebhook } from "@/lib/billing/webhook";
import { planForPaidOrder } from "@/lib/billing/plans";

describe("ebookPricePaise", () => {
  it("charges the list price to someone without a pass", () => {
    expect(ebookPricePaise(14900, false)).toBe(14900);
  });

  it("takes 20% off for a pass holder, rounded to whole rupees", () => {
    expect(PASS_HOLDER_DISCOUNT).toBe(0.2);
    // 149 x 0.8 = 119.20 -> 119
    expect(ebookPricePaise(14900, true)).toBe(11900);
    // 199 x 0.8 = 159.20 -> 159; 99 x 0.8 = 79.20 -> 79
    expect(ebookPricePaise(19900, true)).toBe(15900);
    expect(ebookPricePaise(9900, true)).toBe(7900);
  });

  it("never prices below one rupee", () => {
    expect(ebookPricePaise(100, true)).toBe(100);
  });
});

const notes = (over: Record<string, string> = {}) => ({
  ...stampEbookOrderNotes({ slug: "mht-cet-maths", listPaise: 14900, amountPaise: 11900 }, "u1"),
  ...over,
});
const paid = (over: Record<string, unknown> = {}) => ({
  status: "paid",
  amount_paid: 11900,
  currency: "INR",
  notes: notes(),
  ...over,
});

describe("stampEbookOrderNotes", () => {
  it("records the buyer, the book and the price actually charged", () => {
    expect(notes()).toEqual({
      kind: "ebook",
      userId: "u1",
      ebookSlug: "mht-cet-maths",
      amountPaise: "11900",
      listPaise: "14900",
      currency: "INR",
    });
  });

  it("is told apart from a pass order", () => {
    expect(isEbookOrder(notes())).toBe(true);
    expect(isEbookOrder({ planId: "mock-pass-6m", scope: "mocks" })).toBe(false);
    expect(isEbookOrder(null)).toBe(false);
  });
});

describe("ebookForPaidOrder", () => {
  it("grants the book named in the notes to the buyer they name", () => {
    expect(ebookForPaidOrder(paid(), "u1")).toEqual({
      ok: true,
      grant: { ebookSlug: "mht-cet-maths", amountPaise: 11900 },
    });
  });

  it("refuses an unpaid order", () => {
    expect(ebookForPaidOrder(paid({ status: "attempted" }), "u1")).toEqual({ ok: false, reason: "order not paid" });
  });

  it("refuses another account's order", () => {
    expect(ebookForPaidOrder(paid(), "u2").ok).toBe(false);
  });

  it("refuses a paid amount that differs from the stamped price", () => {
    expect(ebookForPaidOrder(paid({ amount_paid: 100 }), "u1")).toEqual({
      ok: false,
      reason: "amount does not match order",
    });
  });

  it("refuses notes without a book slug or a price", () => {
    expect(ebookForPaidOrder(paid({ notes: notes({ ebookSlug: "" }) }), "u1").ok).toBe(false);
    expect(ebookForPaidOrder(paid({ notes: notes({ amountPaise: "abc" }) }), "u1").ok).toBe(false);
  });

  it("refuses a pass order", () => {
    const pass = paid({ notes: { userId: "u1", planId: "mock-pass-6m", amountPaise: "11900", currency: "INR" } });
    expect(ebookForPaidOrder(pass, "u1").ok).toBe(false);
  });
});

describe("an ebook order never grants a pass", () => {
  it("planForPaidOrder refuses it", () => {
    expect(planForPaidOrder(paid(), "u1").ok).toBe(false);
  });
});

describe("decideWebhook: ebook orders", () => {
  const event = (order: Record<string, unknown>, paymentId: string | null = "pay_1") => ({
    event: "order.paid",
    payload: {
      order: { entity: order },
      ...(paymentId ? { payment: { entity: { id: paymentId } } } : {}),
    },
  });

  it("grants the ebook, not a pass", () => {
    expect(decideWebhook(event(paid()))).toEqual({
      action: "grant_ebook",
      userId: "u1",
      paymentId: "pay_1",
      grant: { ebookSlug: "mht-cet-maths", amountPaise: 11900 },
    });
  });

  it("skips an ebook order whose amount does not match", () => {
    expect(decideWebhook(event(paid({ amount_paid: 1 }))).action).toBe("skip");
  });

  it("skips an ebook order without a payment id", () => {
    expect(decideWebhook(event(paid(), null)).action).toBe("skip");
  });
});
