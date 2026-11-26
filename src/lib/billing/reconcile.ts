/**
 * The payment check (2026-11-15): finds captured Razorpay payments that were
 * never granted and decides each one by the WEBHOOK's own rule.
 *
 * WHY: a pass is granted by one of two calls, the buyer's browser after
 * checkout (/api/billing/verify) or Razorpay's order.paid webhook. On
 * 2026-11-15 neither ran for a ₹197 UPI payment, and on 2026-11-01 neither ran
 * for a ₹499 one (granted by hand three days later). Only something that goes
 * looking finds those, so scripts/billing/reconcile.ts reads Razorpay's
 * payments on a schedule and grants what is missing.
 *
 * Pure; unit-tested in tests/billing-reconcile.test.ts.
 */
import { decideWebhook, type WebhookDecision } from "./webhook";
import { formatPrice, type PaidOrder, type PlanCurrency } from "./plans";
import { SITE_URL } from "@/lib/brand";
import { BRAND, INK, REPLY_TO, escapeHtml, type BuiltEmail } from "@/lib/email/templates";

/** The fields of a Razorpay payment the check reads (`created_at` is in seconds). */
export type RazorpayPayment = {
  id: string;
  status: string;
  order_id?: string | null;
  amount: number;
  currency: string;
  created_at: number;
  method?: string;
  /** A failed payment's reason, its UPI ID and the order's notes (read by ./paymentFailure, 2026-11-26). */
  error_reason?: string | null;
  vpa?: string | null;
  notes?: Record<string, unknown> | unknown[] | null;
};

/**
 * A payment this young is left to the webhook and the buyer's browser, which
 * normally grant within seconds. Without it the check would race them, win
 * now and then, and email the owner about a payment nothing had missed.
 */
export const RECONCILE_GRACE_SECONDS = 15 * 60;

/**
 * Captured payments on one of our orders that no pass or ebook row names.
 * `grantedRefs` holds every payment id in entitlements.provider_ref and
 * ebook_purchases.payment_id. A refunded payment is left alone: the refund
 * ended whatever it bought.
 */
export function strandedPayments(
  payments: readonly RazorpayPayment[],
  grantedRefs: ReadonlySet<string>,
  nowSec: number,
  graceSec: number = RECONCILE_GRACE_SECONDS
): RazorpayPayment[] {
  return payments.filter(
    (p) => p.status === "captured" && !!p.order_id && !grantedRefs.has(p.id) && nowSec - p.created_at >= graceSec
  );
}

/** What the webhook would do had Razorpay delivered order.paid for this order and payment. */
export function decidePaidOrder(order: PaidOrder, paymentId: string): WebhookDecision {
  return decideWebhook({
    event: "order.paid",
    payload: { order: { entity: order }, payment: { entity: { id: paymentId } } },
  });
}

/** One stranded payment and what the check did with it. */
export type StrandedOutcome = {
  paymentId: string;
  orderId: string;
  amount: number;
  currency: string;
  /** Seconds, as Razorpay reports it. */
  createdAt: number;
  result: "granted" | "already_granted" | "skipped" | "error";
  /** What it bought, e.g. "Practice Pass (practice)" or "ebook book-1"; empty when unknown. */
  what: string;
  /** Why it was skipped, or the error. */
  detail: string;
};

function money(o: StrandedOutcome): string {
  return o.currency === "INR" || o.currency === "USD"
    ? formatPrice(o.amount, o.currency as PlanCurrency)
    : `${o.amount / 100} ${o.currency}`;
}

function when(sec: number): string {
  return new Date(sec * 1000).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function line(o: StrandedOutcome): string {
  const what = o.what ? `${o.what}, ` : "";
  const tail = o.detail ? `: ${o.detail}` : "";
  return `${money(o)} ${what}paid ${when(o.createdAt)} IST, ${o.paymentId} (${o.orderId})${tail}`;
}

/**
 * The owner's email, or null when there is nothing to say. Sent when the check
 * granted a payment (the webhook missed it, so its settings need a look) or
 * could not grant one (a buyer is still waiting). Skipped payments are not
 * ours to grant and already-granted ones raced the webhook; neither is news.
 */
export function buildStrandedEmail(outcomes: readonly StrandedOutcome[], runUrl: string): BuiltEmail | null {
  const granted = outcomes.filter((o) => o.result === "granted");
  const failed = outcomes.filter((o) => o.result === "error");
  if (granted.length === 0 && failed.length === 0) return null;

  const plural = (n: number) => `${n} ${n === 1 ? "payment" : "payments"}`;
  const subject =
    failed.length > 0
      ? `${BRAND}: could not grant ${plural(failed.length)} a buyer made`
      : `${BRAND}: granted ${plural(granted.length)} the webhook missed`;

  const sections: { heading: string; items: string[] }[] = [];
  if (failed.length > 0) {
    sections.push({
      heading: "Could NOT grant (the buyer still has nothing; grant by hand or fix and re-run):",
      items: failed.map(line),
    });
  }
  if (granted.length > 0) {
    sections.push({ heading: "Granted now (the buyer had paid but had nothing):", items: granted.map(line) });
  }
  const outro = [
    `Neither the buyer's browser nor Razorpay's webhook granted these. Check the webhook in the Razorpay dashboard (Developers > Webhooks): the URL is ${SITE_URL}/api/billing/webhook, order.paid and refund.processed are ticked, it is active, and its secret matches RAZORPAY_WEBHOOK_SECRET in Vercel.`,
    `The run: ${runUrl}`,
  ];

  const text = [
    ...sections.flatMap((s) => [s.heading, ...s.items.map((i) => `- ${i}`), ""]),
    ...outro,
  ].join("\n");

  const html = `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:620px;margin:0 auto;color:${INK};line-height:1.55">
${sections
  .map(
    (s) => `  <p style="margin:0 0 6px"><strong>${escapeHtml(s.heading)}</strong></p>
  <ul style="margin:0 0 12px;padding-left:20px">
${s.items.map((i) => `    <li style="margin:0 0 6px">${escapeHtml(i)}</li>`).join("\n")}
  </ul>`
  )
  .join("\n")}
  <p style="margin:0 0 12px">${escapeHtml(outro[0])}</p>
  <p style="margin:0 0 12px"><a href="${escapeHtml(runUrl)}">Open the run</a></p>
</div>`;

  return { subject, text, html, replyTo: REPLY_TO, headers: {} };
}
