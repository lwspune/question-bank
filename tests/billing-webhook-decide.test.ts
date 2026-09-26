/**
 * What the Razorpay webhook does with an event, decided from the payload alone.
 *
 * order.paid: the same rule as /api/billing/verify (planForPaidOrder) — paid,
 * the amount and currency of a known plan, and a buyer named in the notes our
 * server stamped. Until 2026-09-27 the webhook trusted notes.planId without the
 * amount check, so the two grant paths applied different rules.
 *
 * refund.processed: the refund policy says "the pass ends when the refund is
 * made", so a FULL refund revokes the grant for that payment. A partial refund
 * (a goodwill discount, say) leaves the pass alone.
 */
import { describe, it, expect } from "vitest";
import { decideWebhook } from "@/lib/billing/webhook";

const orderPaid = (order: Record<string, unknown> = {}, paymentId: string | null = "pay_1") => ({
  event: "order.paid",
  payload: {
    order: {
      entity: {
        status: "paid",
        amount_paid: 9900,
        currency: "INR",
        notes: { userId: "u1", planId: "mock-pass-6m" },
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
  it("grants the plan the order was created for, to the buyer in its notes", () => {
    const d = decideWebhook(orderPaid());
    expect(d).toMatchObject({ action: "grant", userId: "u1", paymentId: "pay_1" });
    expect(d.action === "grant" && d.plan.id).toBe("mock-pass-6m");
  });

  it("refuses a paid amount that does not match the plan in the notes", () => {
    const d = decideWebhook(
      orderPaid({ notes: { userId: "u1", planId: "teacher-pass-1y" } })
    );
    expect(d.action).toBe("skip");
  });

  it("skips an unknown or retired plan", () => {
    expect(decideWebhook(orderPaid({ notes: { userId: "u1", planId: "premium-365" } })).action).toBe(
      "skip"
    );
  });

  it("skips when the notes name no buyer", () => {
    expect(decideWebhook(orderPaid({ notes: { planId: "mock-pass-6m" } })).action).toBe("skip");
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
