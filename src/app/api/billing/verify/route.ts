import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { verifyPaymentSignature } from "@/lib/billing/razorpay";
import { computeExpiry, getPlan } from "@/lib/billing/plans";
import { grantRazorpayEntitlement } from "@/lib/billing/grant";

export const maxDuration = 30;

/**
 * Client success-callback verification (instant-access path). Verifies the
 * Razorpay Checkout signature, then grants the entitlement. Idempotent with the
 * webhook (same payment id → unique-index conflict → "already_granted").
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
    planId?: string;
  } | null;
  if (
    !body?.razorpay_order_id ||
    !body.razorpay_payment_id ||
    !body.razorpay_signature ||
    !body.planId
  ) {
    return NextResponse.json({ error: "Missing payment fields" }, { status: 400 });
  }

  const plan = getPlan(body.planId);
  if (!plan) return NextResponse.json({ error: "Unknown plan" }, { status: 400 });

  const valid = verifyPaymentSignature(
    body.razorpay_order_id,
    body.razorpay_payment_id,
    body.razorpay_signature,
    secret
  );
  if (!valid) {
    return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
  }

  const result = await grantRazorpayEntitlement({
    userId: user.id,
    paymentId: body.razorpay_payment_id,
    scope: plan.scope,
    expiresAt: computeExpiry(Date.now(), plan.durationDays),
  });
  if (result.kind === "error") {
    console.error("grant after verify failed:", result.message);
    return NextResponse.json({ error: "Could not activate access" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
