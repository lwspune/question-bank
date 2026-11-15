/**
 * Razorpay server helpers — order creation (Orders API via fetch, no SDK) and
 * the two HMAC signature checks. The verify functions are pure + timing-safe;
 * createOrder hits the network.
 *
 * Keys come from env: RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET (server only) and
 * RAZORPAY_WEBHOOK_SECRET (for the webhook). Never expose the secret client-side
 * — only NEXT_PUBLIC_RAZORPAY_KEY_ID is publishable.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import type { PaidOrder } from "./plans";
import type { RazorpayPayment } from "./reconcile";

/** True when the server has the keys to take a payment (checkout won't 503).
 *  Drives the public-quiz results screen's premium-CTA gate — the CTA appears
 *  automatically once these env vars are set, no code change. */
export function isBillingConfigured(): boolean {
  return !!process.env.RAZORPAY_KEY_ID && !!process.env.RAZORPAY_KEY_SECRET;
}

function safeEqualHex(a: string, b: string): boolean {
  // timingSafeEqual throws on length mismatch — guard first (a length diff is
  // already a definitive "not equal", so returning false leaks nothing useful).
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
  } catch {
    return false;
  }
}

/** Verifies a Razorpay Checkout success signature: HMAC(order_id|payment_id). */
export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): boolean {
  if (!signature) return false;
  const expected = createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  return safeEqualHex(expected, signature);
}

/** Verifies a Razorpay webhook signature: HMAC over the RAW request body. */
export function verifyWebhookSignature(
  rawBody: string,
  signature: string,
  secret: string
): boolean {
  if (!signature) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  return safeEqualHex(expected, signature);
}

export type CreateOrderResult =
  | { ok: true; orderId: string; amount: number; currency: string }
  | { ok: false; error: string };

/**
 * Creates a Razorpay order via the Orders API. `notes` carries our userId +
 * planId so the webhook can grant the right entitlement to the right user.
 */
export async function createOrder(input: {
  amountPaise: number;
  currency: string;
  receipt: string;
  notes: Record<string, string>;
}): Promise<CreateOrderResult> {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    return { ok: false, error: "Razorpay keys not configured" };
  }
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  try {
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: input.amountPaise,
        currency: input.currency,
        receipt: input.receipt,
        notes: input.notes,
      }),
    });
    const data = (await res.json().catch(() => null)) as
      | { id?: string; amount?: number; currency?: string; error?: { description?: string } }
      | null;
    if (!res.ok || !data?.id) {
      return { ok: false, error: data?.error?.description ?? `Razorpay error ${res.status}` };
    }
    return {
      ok: true,
      orderId: data.id,
      amount: data.amount ?? input.amountPaise,
      currency: data.currency ?? input.currency,
    };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Every payment Razorpay holds created at or after `fromSec` (seconds), newest
 * first, 100 a page. Read by the payment check (scripts/billing/reconcile.ts).
 */
export async function listPayments(
  fromSec: number
): Promise<{ ok: true; payments: RazorpayPayment[] } | { ok: false; error: string }> {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return { ok: false, error: "Razorpay keys not configured" };
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const payments: RazorpayPayment[] = [];
  try {
    // A safety stop at 50 pages (5,000 payments), far above a 3-day window.
    for (let skip = 0; skip < 5000; skip += 100) {
      const res = await fetch(
        `https://api.razorpay.com/v1/payments?from=${Math.floor(fromSec)}&count=100&skip=${skip}`,
        { headers: { Authorization: `Basic ${auth}` }, cache: "no-store" }
      );
      const data = (await res.json().catch(() => null)) as
        | { items?: RazorpayPayment[]; error?: { description?: string } }
        | null;
      if (!res.ok || !data?.items) {
        return { ok: false, error: data?.error?.description ?? `Razorpay error ${res.status}` };
      }
      payments.push(...data.items);
      if (data.items.length < 100) return { ok: true, payments };
    }
    return { ok: false, error: "more than 5,000 payments in the window" };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Reads an order back from Razorpay: what it cost, whether it is paid, and the
 * notes we stamped on it (userId + planId). The verify route decides the plan
 * from this, never from the request body.
 */
export async function fetchOrder(
  orderId: string
): Promise<{ ok: true; order: PaidOrder } | { ok: false; error: string }> {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return { ok: false, error: "Razorpay keys not configured" };
  if (!/^order_[A-Za-z0-9]+$/.test(orderId)) return { ok: false, error: "bad order id" };
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  try {
    const res = await fetch(`https://api.razorpay.com/v1/orders/${orderId}`, {
      headers: { Authorization: `Basic ${auth}` },
      cache: "no-store",
    });
    const data = (await res.json().catch(() => null)) as
      | (PaidOrder & { error?: { description?: string } })
      | null;
    if (!res.ok || !data) {
      return { ok: false, error: data?.error?.description ?? `Razorpay error ${res.status}` };
    }
    return { ok: true, order: data };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
