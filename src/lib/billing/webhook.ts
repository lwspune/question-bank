/**
 * What the Razorpay webhook does with an event, decided from the payload alone.
 * Pure — the route verifies the signature, then dispatches on this.
 *
 * order.paid runs the same rule as /api/billing/verify (planForPaidOrder): the
 * grant comes from the notes our server stamped on the order, so the two grant
 * paths cannot disagree, and a plan edited after the order was created cannot
 * reject it. refund.processed revokes on a FULL refund only: the refund policy
 * says the pass ends when the refund is made, and a partial refund is a discount.
 */
import { planForPaidOrder, type OrderGrant, type PaidOrder } from "./plans";

export type WebhookDecision =
  | { action: "grant"; userId: string; paymentId: string; grant: OrderGrant }
  | { action: "revoke"; paymentId: string }
  | { action: "skip"; reason: string }
  | { action: "ignore"; event: string | undefined };

type RefundPayment = {
  id?: string;
  amount?: number;
  amount_refunded?: number;
  refund_status?: string | null;
};

export type WebhookBody = {
  event?: string;
  payload?: {
    order?: { entity?: PaidOrder };
    payment?: { entity?: { id?: string } & RefundPayment };
    refund?: { entity?: { payment_id?: string } };
  };
};

export function decideWebhook(body: WebhookBody): WebhookDecision {
  const payload = body.payload ?? {};

  if (body.event === "order.paid") {
    const order = payload.order?.entity ?? {};
    const userId = order.notes?.userId;
    const paymentId = payload.payment?.entity?.id;
    if (!userId) return { action: "skip", reason: "no buyer in order notes" };
    if (!paymentId) return { action: "skip", reason: "no payment id" };
    const decided = planForPaidOrder(order, userId);
    if (!decided.ok) return { action: "skip", reason: decided.reason };
    return { action: "grant", userId, paymentId, grant: decided.grant };
  }

  if (body.event === "refund.processed") {
    const payment = payload.payment?.entity ?? {};
    const paymentId = payment.id || payload.refund?.entity?.payment_id;
    if (!paymentId) return { action: "skip", reason: "no payment id" };
    const full =
      payment.refund_status === "full" ||
      (typeof payment.amount === "number" &&
        typeof payment.amount_refunded === "number" &&
        payment.amount_refunded >= payment.amount);
    if (!full) return { action: "skip", reason: "partial refund" };
    return { action: "revoke", paymentId };
  }

  return { action: "ignore", event: body.event };
}
