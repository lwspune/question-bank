import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createOrder } from "@/lib/billing/razorpay";
import { stampOrderNotes } from "@/lib/billing/plans";
import { getActivePlan } from "@/lib/billing/plansQuery";
import { logActivity } from "@/lib/activity/service";
import { bookCheckoutEvent, checkoutBox, checkoutGate, paywallEvent } from "@/lib/activity/clientEvents";
import { readCountry, withCountry } from "@/lib/acquisition/country";
import { ebookOrderTerms } from "@/lib/ebooks/checkout";
import { stampEbookOrderNotes } from "@/lib/ebooks/order";

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

  const body = (await request.json().catch(() => null)) as {
    planId?: string;
    ebookSlug?: string;
    gate?: unknown;
    box?: unknown;
  } | null;
  const db = createSupabaseServerClient();

  // An ebook (2026-10-20): the price is this buyer's, decided here.
  if (typeof body?.ebookSlug === "string" && body.ebookSlug) {
    const terms = await ebookOrderTerms(db, user.id, body.ebookSlug);
    if (!terms.ok) return NextResponse.json({ error: terms.error }, { status: terms.status });
    const result = await createOrder({
      amountPaise: terms.amountPaise,
      currency: "INR",
      receipt: `qb_ebook_${user.id.slice(0, 8)}`,
      notes: stampEbookOrderNotes({ slug: terms.slug, listPaise: terms.listPaise, amountPaise: terms.amountPaise }, user.id),
    });
    if (!result.ok) {
      console.error("razorpay createOrder (ebook) failed:", result.error);
      return NextResponse.json({ error: "Could not start checkout" }, { status: 502 });
    }
    await logActivity(db, user.id, withCountry(bookCheckoutEvent(terms.slug), readCountry(request.headers)));
    return NextResponse.json({
      orderId: result.orderId,
      amount: result.amount,
      currency: result.currency,
      keyId,
      planLabel: terms.title,
      email: user.email,
    });
  }

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
  await logActivity(
    db,
    user.id,
    withCountry(
      paywallEvent("checkout_opened", checkoutGate(body?.gate), plan.id, undefined, checkoutBox(body?.box)),
      readCountry(request.headers)
    )
  );

  return NextResponse.json({
    orderId: result.orderId,
    amount: result.amount,
    currency: result.currency,
    keyId,
    planLabel: plan.label,
    email: user.email,
  });
}
