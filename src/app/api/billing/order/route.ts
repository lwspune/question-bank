import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createOrder } from "@/lib/billing/razorpay";
import { stampOrderNotes } from "@/lib/billing/plans";
import { getActivePlan } from "@/lib/billing/plansQuery";
import { logActivity } from "@/lib/activity/service";
import { checkoutGate, paywallEvent } from "@/lib/activity/clientEvents";

export const maxDuration = 30;

/**
 * Creates a Razorpay order for the signed-in user. The order's `notes` carry
 * the buyer, the plan id, and the price/scope/duration as sold — the ORDER is
 * the contract. verify and the webhook grant from these notes and never
 * re-read the plan, so a later price edit cannot reject this checkout.
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

  const body = (await request.json().catch(() => null)) as { planId?: string; gate?: unknown } | null;
  const db = createSupabaseServerClient();
  const plan = body?.planId ? await getActivePlan(db, body.planId) : null;
  if (!plan) {
    return NextResponse.json({ error: "Unknown plan" }, { status: 400 });
  }

  const result = await createOrder({
    amountPaise: plan.amountPaise,
    currency: plan.currency,
    receipt: `qb_${plan.id}_${user.id.slice(0, 8)}`,
    notes: stampOrderNotes(plan, user.id),
  });
  if (!result.ok) {
    console.error("razorpay createOrder failed:", result.error);
    return NextResponse.json({ error: "Could not start checkout" }, { status: 502 });
  }
  await logActivity(db, user.id, paywallEvent("checkout_opened", checkoutGate(body?.gate), plan.id));

  return NextResponse.json({
    orderId: result.orderId,
    amount: result.amount,
    currency: result.currency,
    keyId,
    planLabel: plan.label,
    email: user.email,
  });
}
