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
