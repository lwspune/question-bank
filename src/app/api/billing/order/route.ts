import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createOrder } from "@/lib/billing/razorpay";
import { getPlan } from "@/lib/billing/plans";

export const maxDuration = 30;

/**
 * Creates a Razorpay order for the signed-in user. The order's `notes` carry
 * userId + planId so the webhook can grant the right pass to the right account.
 */
export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in to purchase" }, { status: 401 });
  }
  const keyId = process.env.RAZORPAY_KEY_ID;
  if (!keyId) {
    return NextResponse.json({ error: "Payments are not configured yet" }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as { planId?: string } | null;
  const plan = getPlan(body?.planId ?? "");
  if (!plan) {
    return NextResponse.json({ error: "Unknown plan" }, { status: 400 });
  }

  const result = await createOrder({
    amountPaise: plan.amountPaise,
    currency: plan.currency,
    receipt: `qb_${plan.id}_${user.id.slice(0, 8)}`,
    notes: { userId: user.id, planId: plan.id },
  });
  if (!result.ok) {
    console.error("razorpay createOrder failed:", result.error);
    return NextResponse.json({ error: "Could not start checkout" }, { status: 502 });
  }

  return NextResponse.json({
    orderId: result.orderId,
    amount: result.amount,
    currency: result.currency,
    keyId,
    planLabel: plan.label,
    email: user.email,
  });
}
