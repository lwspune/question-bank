/**
 * The webhook alarm (2026-11-22, migration 0283). Every webhook delivery is
 * recorded in billing_webhook_receipts; the payment check emails the owner
 * when a paid order has no delivery behind it.
 *
 * WHY: Razorpay's webhook sat DISABLED from 30 Oct to 22 Nov 2026 and nothing
 * noticed. Most buyers are granted by their own browser, so sales kept
 * working; only buyers whose UPI app never handed back to the page were
 * stranded. Every paid order should still get an order.paid delivery, so a
 * paid order with none says the webhook is off (or failing) on the first day,
 * whether or not a buyer was stranded.
 *
 * Pure; unit-tested in tests/billing-webhook-alarm.test.ts. The database half
 * is lib/billing/webhookReceipts.ts.
 */
import type { WebhookBody } from "./webhook";
import type { PaddleEvent } from "./paddle";
import { SITE_URL } from "@/lib/brand";
import { BRAND, INK, REPLY_TO, escapeHtml, type BuiltEmail } from "@/lib/email/templates";

export type WebhookProvider = "razorpay" | "paddle";

/** One delivery, as stored. `ref` is the order (Razorpay) or transaction (Paddle) it is about, when it names one. */
export type WebhookReceipt = { provider: WebhookProvider; event: string; ref: string | null };

/** Mirrors the column CHECKs in 0283: a delivery is never refused for an odd size, only cut. */
const MAX_LEN = 64;
const cut = (s: string) => s.slice(0, MAX_LEN);
const str = (v: unknown): string | null => (typeof v === "string" && v.length > 0 ? cut(v) : null);

/** A Razorpay delivery: order.paid is filed under its order, a refund under the refunded payment. */
export function razorpayReceipt(body: WebhookBody): WebhookReceipt | null {
  const event = str(body.event);
  if (!event) return null;
  const p = body.payload ?? {};
  const ref = str(p.order?.entity?.id) ?? str(p.refund?.entity?.payment_id) ?? str(p.payment?.entity?.id);
  return { provider: "razorpay", event, ref };
}

/** A Paddle delivery: filed under the transaction it is about (an adjustment names its transaction). */
export function paddleReceipt(body: PaddleEvent): WebhookReceipt | null {
  const event = str(body.event_type);
  if (!event) return null;
  const data = (body.data ?? {}) as { id?: unknown; transaction_id?: unknown };
  const ref = event.startsWith("adjustment.") ? str(data.transaction_id) : str(data.id);
  return { provider: "paddle", event, ref };
}

/**
 * The events whose arrival proves a paid order was delivered. Razorpay sends
 * order.paid; Paddle sends transaction.paid and then transaction.completed,
 * and either one is proof.
 */
export const PAID_EVENTS: Record<WebhookProvider, readonly string[]> = {
  razorpay: ["order.paid"],
  paddle: ["transaction.paid", "transaction.completed"],
};

/**
 * How old a paid order must be before a missing delivery counts. Razorpay
 * delivers within seconds, but retries a failed delivery for a while; half an
 * hour keeps one slow delivery from waking the owner.
 */
export const WEBHOOK_ALARM_MIN_AGE_SECONDS = 30 * 60;

/**
 * A floor only. Receipts start with the deploy that records them, whenever it
 * is pushed, so the payment check counts from each provider's FIRST recorded
 * delivery (firstReceiptSec) and never from before this date. A payment before
 * recording began has no receipt by construction and is never evidence.
 */
export const WEBHOOK_RECEIPTS_SINCE_SEC = Date.parse("2026-11-23T00:00:00+05:30") / 1000;

/** A paid order (or transaction) the check looked at. `label` is what the email shows: amount and payment id. */
export type SilentItem = { ref: string; createdAtSec: number; label: string };

/** The paid items no delivery names, old enough to count and paid after recording began. */
export function silentRefs(
  items: readonly SilentItem[],
  receivedRefs: ReadonlySet<string>,
  nowSec: number,
  sinceSec: number = WEBHOOK_RECEIPTS_SINCE_SEC,
  minAgeSec: number = WEBHOOK_ALARM_MIN_AGE_SECONDS
): SilentItem[] {
  return items.filter(
    (i) => i.createdAtSec >= sinceSec && nowSec - i.createdAtSec >= minAgeSec && !receivedRefs.has(i.ref)
  );
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

const PROVIDER_NAME: Record<WebhookProvider, string> = { razorpay: "Razorpay", paddle: "Paddle" };

const WHERE: Record<WebhookProvider, string> = {
  razorpay: `In the Razorpay dashboard, open Account & Settings > Webhooks. The webhook for ${SITE_URL}/api/billing/webhook must read Enabled (Razorpay switches it to Disabled by itself after a run of failed deliveries; that is what happened on 30 Oct 2026), with order.paid and refund.processed ticked, and its secret must match RAZORPAY_WEBHOOK_SECRET in Vercel.`,
  paddle: `In Paddle, open Developer tools > Notifications. The destination for https://intl.pyqvault.com/api/billing/paddle/webhook must be Active, with transaction.completed, transaction.paid, adjustment.created and adjustment.updated ticked, and its secret must match PADDLE_WEBHOOK_SECRET in Vercel.`,
};

/**
 * The owner's alarm, or null when every paid order had its delivery. Buyers
 * are still granted (their browser or the payment check does it), so this is
 * not "a buyer is waiting"; it is "the automatic path is off, and refunds no
 * longer take passes away by themselves".
 */
export function buildWebhookSilentEmail(
  missing: Record<WebhookProvider, readonly SilentItem[]>,
  runUrl: string
): BuiltEmail | null {
  const quiet = (Object.keys(missing) as WebhookProvider[]).filter((p) => missing[p].length > 0);
  if (quiet.length === 0) return null;

  const names = quiet.map((p) => PROVIDER_NAME[p]).join(" and ");
  const subject = `${BRAND}: the ${names} webhook has gone quiet`;
  const intro = `These orders were paid, but ${names} never sent us the webhook for them. Buyers still get their pass (their browser or the payment check grants it), but refunds no longer remove passes by themselves, and any buyer whose browser does not come back waits for the next check.`;

  const sections = quiet.map((p) => ({
    heading: `${PROVIDER_NAME[p]}: paid with no webhook`,
    items: missing[p].map((i) => `${i.label}, paid ${when(i.createdAtSec)} IST (${i.ref})`),
    fix: WHERE[p],
  }));
  const outro = [`You get this at most once a day while it lasts.`, `The run: ${runUrl}`];

  const text = [
    intro,
    "",
    ...sections.flatMap((s) => [s.heading, ...s.items.map((i) => `- ${i}`), "", s.fix, ""]),
    ...outro,
  ].join("\n");

  const html = `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:620px;margin:0 auto;color:${INK};line-height:1.55">
  <p style="margin:0 0 12px">${escapeHtml(intro)}</p>
${sections
  .map(
    (s) => `  <p style="margin:0 0 6px"><strong>${escapeHtml(s.heading)}</strong></p>
  <ul style="margin:0 0 12px;padding-left:20px">
${s.items.map((i) => `    <li style="margin:0 0 6px">${escapeHtml(i)}</li>`).join("\n")}
  </ul>
  <p style="margin:0 0 12px">${escapeHtml(s.fix)}</p>`
  )
  .join("\n")}
  <p style="margin:0 0 12px">${escapeHtml(outro[0])}</p>
  <p style="margin:0 0 12px"><a href="${escapeHtml(runUrl)}">Open the run</a></p>
</div>`;

  return { subject, text, html, replyTo: REPLY_TO, headers: {} };
}
