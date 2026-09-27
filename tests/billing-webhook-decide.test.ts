/**
 * What the Razorpay webhook does with an event, decided from the payload alone.
 *
 * order.paid: the same rule as /api/billing/verify (planForPaidOrder) — paid,
 * the amount and currency our server stamped into the notes, and the buyer
 * they name. The plan is not looked up: the order is the contract.
 *
 * refund.processed: the refund policy says "the pass ends when the refund is
 * made", so a FULL refund revokes the grant for that payment. A partial refund
 * (a goodwill discount, say) leaves the pass alone.
 */
import { describe, it, expect } from "vitest";
import { decideWebhook } from "@/lib/billing/webhook";
import { stampOrderNotes, type Plan } from "@/lib/billing/plans";

const MOCK: Plan = {
  id: "mock-pass-6m", label: "Student Mock Pass", blurb: "", perks: [], urlKey: "mocks",
  amountPaise: 9900, currency: "INR", durationDays: 182, scope: "mocks", active: true, sortOrder: 1,
};

const orderPaid = (order: Record<string, unknown> = {}, paymentId: string | null = "pay_1") => ({
  event: "order.paid",
  payload: {
    order: {
      entity: {
        status: "paid",
        amount_paid: 9900,
        currency: "INR",
        notes: stampOrderNotes(MOCK, "u1"),
        ...order,
      },
    },
    ...(paymentId ? { payment: { entity: { id: paymentId } } } : {}),
  },
});

const refund = (payment: Record<string, unknown> = {}) => ({
  event: "refund.processed",
  payload: {
    refund: { entity: { id: "rfnd_1", payment_id: "pay_1", amount: 9900 } },
    payment: {
      entity: { id: "pay_1", amount: 9900, amount_refunded: 9900, refund_status: "full", ...payment },
    },
  },
});

describe("decideWebhook: order.paid", () => {
  it("grants what the stamped notes say, to the buyer they name", () => {
    const d = decideWebhook(orderPaid());
    expect(d).toEqual({
      action: "grant",
      userId: "u1",
      paymentId: "pay_1",
      grant: { planId: "mock-pass-6m", scope: "mocks", durationDays: 182 },
    });
  });

  it("refuses a paid amount that does not match the stamped price", () => {
    const d = decideWebhook(orderPaid({ notes: { ...stampOrderNotes(MOCK, "u1"), amountPaise: "49900" } }));
    expect(d.action).toBe("skip");
  });

  it("skips a stamp carrying an unsellable scope", () => {
    expect(decideWebhook(orderPaid({ notes: { ...stampOrderNotes(MOCK, "u1"), scope: "all" } })).action).toBe("skip");
  });

  it("skips when the notes name no buyer", () => {
    const { userId: _drop, ...noBuyer } = stampOrderNotes(MOCK, "u1");
    expect(decideWebhook(orderPaid({ notes: noBuyer })).action).toBe("skip");
  });

  it("skips when the payment id is missing", () => {
    expect(decideWebhook(orderPaid({}, null)).action).toBe("skip");
  });
});

describe("decideWebhook: refund.processed", () => {
  it("revokes the grant for a fully refunded payment", () => {
    expect(decideWebhook(refund())).toEqual({ action: "revoke", paymentId: "pay_1" });
  });

  it("treats amount_refunded reaching the amount as full, whatever refund_status says", () => {
    expect(decideWebhook(refund({ refund_status: undefined })).action).toBe("revoke");
  });

  it("leaves the pass alone on a partial refund", () => {
    const d = decideWebhook(refund({ amount_refunded: 5000, refund_status: "partial" }));
    expect(d.action).toBe("skip");
  });

  it("skips when the payment id is missing", () => {
    const body = refund();
    delete (body.payload.payment.entity as Record<string, unknown>).id;
    body.payload.refund.entity.payment_id = "";
    expect(decideWebhook(body).action).toBe("skip");
  });
});

describe("decideWebhook: other events", () => {
  it("ignores anything else", () => {
    expect(decideWebhook({ event: "payment.captured", payload: {} })).toEqual({
      action: "ignore",
      event: "payment.captured",
    });
  });
});
