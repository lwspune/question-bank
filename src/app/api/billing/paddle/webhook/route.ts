import { NextResponse, type NextRequest } from "next/server";
import { decidePaddleEvent, verifyPaddleSignature, type PaddleEvent } from "@/lib/billing/paddle";
import { applyPaidOrder } from "@/lib/billing/applyPaidOrder";
import { revokeRazorpayEntitlement } from "@/lib/billing/grant";
import { paddleReceipt } from "@/lib/billing/webhookAlarm";
import { recordWebhookReceipt } from "@/lib/billing/webhookReceipts";

export const maxDuration = 30;

/**
 * Paddle's notifications (0271), the authoritative grant path for a Paddle
 * pass: it survives the buyer closing the tab. Subscribe the destination in
 * Paddle to transaction.completed, transaction.paid, adjustment.created and
 * adjustment.updated (OPERATIONS.md "Paddle"). What each event means is
 * decided in lib/billing/paddle.ts.
 *
 * 200 for handled and ignored events so Paddle does not retry; 400 on a bad
 * signature; 500 on a failed write, so Paddle retries and the retry lands on
 * "already granted".
 */
export async function POST(request: NextRequest) {
  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("paddle webhook: PADDLE_WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  const raw = await request.text();
  const signature = request.headers.get("paddle-signature") ?? "";
  if (!verifyPaddleSignature(raw, signature, secret, Date.now() / 1000)) {
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  let body: PaddleEvent;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  // Every signed delivery is recorded first (0283), so the payment check can notice the webhook going quiet.
  const receipt = paddleReceipt(body);
  if (receipt) await recordWebhookReceipt(receipt);

  const decision = decidePaddleEvent(body);
  if (decision.action === "ignore") return NextResponse.json({ received: true, ignored: decision.event });
  if (decision.action === "skip") {
    console.error(`paddle webhook: ${body.event_type} skipped`, decision.reason);
    return NextResponse.json({ received: true, skipped: decision.reason });
  }
  if (decision.action === "revoke") {
    const revoked = await revokeRazorpayEntitlement(decision.paymentId);
    if (revoked.kind === "error") {
      console.error("paddle webhook: revoke failed", revoked.message);
      return NextResponse.json({ error: "revoke failed" }, { status: 500 });
    }
    return NextResponse.json({ received: true, revoked: revoked.revoked });
  }

  const result = await applyPaidOrder(decision);
  if (result.kind === "error") {
    console.error(`paddle webhook: ${result.stage} failed`, result.message);
    return NextResponse.json({ error: "grant failed" }, { status: 500 });
  }
  return NextResponse.json({ received: true, granted: result.kind });
}
