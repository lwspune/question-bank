import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { fetchOrder, verifyPaymentSignature } from "@/lib/billing/razorpay";
import { computeExpiry, planForPaidOrder } from "@/lib/billing/plans";
import { grantRazorpayEntitlement } from "@/lib/billing/grant";

export const maxDuration = 30;

/**
 * Client success-callback verification (instant-access path). Verifies the
 * Razorpay Checkout signature, then grants the entitlement. Idempotent with the
 * webhook (same payment id → unique-index conflict → "already_granted").
 *
 * The grant is read from the ORDER Razorpay holds, not the request body: the
 * signature proves an order was paid, not which plan. With two prices, trusting
 * the body let a ₹99 payment claim the ₹499 pass (fixed 2026-09-26). The notes
 * our server stamped at order time ARE the contract, so the plan is not
 * re-read — a price edited after checkout opened cannot reject the payment.
 */
export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in to complete purchase" }, { status: 401 });
  }
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Payments not configured" }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as {
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
  } | null;
  if (!body?.razorpay_order_id || !body.razorpay_payment_id || !body.razorpay_signature) {
    return NextResponse.json({ error: "Missing payment fields" }, { status: 400 });
  }

  const valid = verifyPaymentSignature(
    body.razorpay_order_id,
    body.razorpay_payment_id,
    body.razorpay_signature,
    secret
  );
  if (!valid) {
    return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
  }

  const fetched = await fetchOrder(body.razorpay_order_id);
  if (!fetched.ok) {
    // The webhook still grants from the order's own notes, so the buyer is not stranded.
    console.error("verify: could not read order", fetched.error);
    return NextResponse.json(
      { error: "Payment received — access will activate shortly." },
      { status: 502 }
    );
  }
  const decided = planForPaidOrder(fetched.order, user.id);
  if (!decided.ok && decided.reason === "order not paid") {
    // Captured a moment later; the order.paid webhook grants it then.
    return NextResponse.json(
      { error: "Payment received — access will activate shortly." },
      { status: 202 }
    );
  }
  if (!decided.ok) {
    console.error("verify: order refused", decided.reason);
    return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
  }
  const result = await grantRazorpayEntitlement({
    userId: user.id,
    paymentId: body.razorpay_payment_id,
    scope: decided.grant.scope,
    expiresAt: computeExpiry(Date.now(), decided.grant.durationDays),
  });
  if (result.kind === "error") {
    console.error("grant after verify failed:", result.message);
    return NextResponse.json({ error: "Could not activate access" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
