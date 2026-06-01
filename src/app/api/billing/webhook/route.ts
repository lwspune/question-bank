import { NextResponse, type NextRequest } from "next/server";
import { verifyWebhookSignature } from "@/lib/billing/razorpay";
import { computeExpiry, getPlan } from "@/lib/billing/plans";
import { grantRazorpayEntitlement } from "@/lib/billing/grant";

export const maxDuration = 30;

/**
 * Authoritative grant path. Razorpay calls this on `order.paid` (configure that
 * event in the dashboard). We verify the HMAC over the RAW body, then grant the
 * pass to the user named in the order notes. Survives the buyer closing the tab,
 * and is idempotent with the client-verify path.
 *
 * Returns 200 for handled/ignored events so Razorpay doesn't retry; 400 on a
 * bad signature; 500 only on a transient grant failure (so Razorpay retries).
 */
export async function POST(request: NextRequest) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("billing webhook: RAZORPAY_WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  const raw = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";
  if (!verifyWebhookSignature(raw, signature, secret)) {
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  let body: {
    event?: string;
    payload?: {
      order?: { entity?: { notes?: Record<string, string> } };
      payment?: { entity?: { id?: string } };
    };
  };
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  // Only act on a fully-paid order. Other events are acknowledged + ignored.
  if (body.event !== "order.paid") {
    return NextResponse.json({ received: true, ignored: body.event });
  }

  const notes = body.payload?.order?.entity?.notes ?? {};
  const paymentId = body.payload?.payment?.entity?.id;
  const userId = notes.userId;
  const plan = getPlan(notes.planId ?? "");
  if (!userId || !paymentId || !plan) {
    console.error("billing webhook: missing userId/paymentId/plan in order.paid", {
      hasUser: Boolean(userId),
      hasPayment: Boolean(paymentId),
      planId: notes.planId,
    });
    return NextResponse.json({ received: true, skipped: "incomplete notes" });
  }

  const result = await grantRazorpayEntitlement({
    userId,
    paymentId,
    scope: plan.scope,
    expiresAt: computeExpiry(Date.now(), plan.durationDays),
  });
  if (result.kind === "error") {
    console.error("billing webhook: grant failed", result.message);
    return NextResponse.json({ error: "grant failed" }, { status: 500 });
  }
  return NextResponse.json({ received: true, granted: result.kind });
}
