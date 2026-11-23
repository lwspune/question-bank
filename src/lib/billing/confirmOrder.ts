/**
 * The return check (2026-11-22): a buyer back on the page after paying asks
 * about their order, and a paid one is granted by the webhook's own rule.
 *
 * WHY: a pass is normally granted by the checkout's success callback in the
 * browser, or by Razorpay's order.paid webhook. With UPI on a phone the
 * callback often never runs (the UPI app takes over and the page never hears
 * back): on 22 Nov a parent paid ₹199, saw no thanks and opened checkout again
 * 7 minutes later, and the 1 Nov and 15 Nov stranded payments were students.
 * The page now remembers its open order (lib/billing/pendingOrder.ts) and,
 * when it is looked at again, asks /api/billing/check-order (a student) or
 * /api/billing/parent-check (a parent), both of which call this.
 *
 * Grants go through decidePaidOrder + applyPaidOrder, the same pair the
 * webhook and the payment check use, so the three paths cannot disagree, and a
 * grant one of them already made answers "already granted" (paid).
 */
import { fetchOrder, fetchOrderPayments } from "./razorpay";
import { decidePaidOrder } from "./reconcile";
import { applyPaidOrder } from "./applyPaidOrder";
import type { PaidOrder } from "./plans";

/**
 * paid: the buyer has what they bought (granted now or earlier).
 * unpaid: nothing captured yet (not paid, or the bank has not settled it).
 * not_found: no such order for this caller (answered alike, so an order id
 *   reveals nothing about anyone else's order).
 * error: Razorpay or the grant failed; the webhook and the payment check remain.
 */
export type ConfirmState = "paid" | "unpaid" | "not_found" | "error";

export async function confirmPaidOrder(orderId: string, owns: (order: PaidOrder) => boolean): Promise<ConfirmState> {
  const fetched = await fetchOrder(orderId);
  if (!fetched.ok) {
    console.error("return check: could not read order", fetched.error);
    return "error";
  }
  if (!owns(fetched.order)) return "not_found";
  if (fetched.order.status !== "paid") return "unpaid";

  const payments = await fetchOrderPayments(orderId);
  if (!payments.ok) {
    console.error("return check: could not read the order's payments", payments.error);
    return "error";
  }
  const captured = payments.payments.find((p) => p.status === "captured");
  if (!captured) return "unpaid";

  const decision = decidePaidOrder(fetched.order, captured.id);
  if (decision.action !== "grant" && decision.action !== "grant_ebook") {
    console.error("return check: order refused", decision.action === "skip" ? decision.reason : decision.action);
    return "error";
  }
  const result = await applyPaidOrder(decision);
  if (result.kind === "error") {
    console.error(`return check: ${result.stage} failed`, result.message);
    // A referral failure comes after the pass was granted: the buyer has it.
    return result.stage === "referral" ? "paid" : "error";
  }
  return "paid";
}
