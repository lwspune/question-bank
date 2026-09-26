import { NextResponse, type NextRequest } from "next/server";
import { verifyWebhookSignature } from "@/lib/billing/razorpay";
import { computeExpiry } from "@/lib/billing/plans";
import { grantRazorpayEntitlement, revokeRazorpayEntitlement } from "@/lib/billing/grant";
import { decideWebhook, type WebhookBody } from "@/lib/billing/webhook";

export const maxDuration = 30;

/**
 * Authoritative grant path, and the refund path. Configure BOTH events in the
 * Razorpay dashboard: `order.paid` grants the pass to the buyer named in the
 * order notes (survives the buyer closing the tab; idempotent with the
 * client-verify path), `refund.processed` revokes it on a full refund.
 * What each event means is decided in lib/billing/webhook.ts.
 *
 * Returns 200 for handled/ignored events so Razorpay doesn't retry; 400 on a
 * bad signature; 500 only on a transient DB failure (so Razorpay retries).
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

  let body: WebhookBody;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  const decision = decideWebhook(body);

  if (decision.action === "ignore") {
    return NextResponse.json({ received: true, ignored: decision.event });
  }
  if (decision.action === "skip") {
    console.error(`billing webhook: ${body.event} skipped`, decision.reason);
    return NextResponse.json({ received: true, skipped: decision.reason });
  }

  if (decision.action === "revoke") {
    const result = await revokeRazorpayEntitlement(decision.paymentId);
    if (result.kind === "error") {
      console.error("billing webhook: revoke failed", result.message);
      return NextResponse.json({ error: "revoke failed" }, { status: 500 });
    }
    return NextResponse.json({ received: true, revoked: result.revoked });
  }

  const result = await grantRazorpayEntitlement({
    userId: decision.userId,
    paymentId: decision.paymentId,
    scope: decision.plan.scope,
    expiresAt: computeExpiry(Date.now(), decision.plan.durationDays),
  });
  if (result.kind === "error") {
    console.error("billing webhook: grant failed", result.message);
    return NextResponse.json({ error: "grant failed" }, { status: 500 });
  }
  return NextResponse.json({ received: true, granted: result.kind });
}
