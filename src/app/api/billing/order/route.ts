import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createOrder } from "@/lib/billing/razorpay";
import { resolveOrderPlan, stampOrderNotes } from "@/lib/billing/plans";
import { listActivePlans } from "@/lib/billing/plansQuery";
import { logActivity } from "@/lib/activity/service";
import { bookCheckoutEvent, checkoutBox, checkoutGate, paywallEvent } from "@/lib/activity/clientEvents";
import { readCountry, withCountry } from "@/lib/acquisition/country";
import { ebookOrderTerms } from "@/lib/ebooks/checkout";
import { stampEbookOrderNotes } from "@/lib/ebooks/order";
import { planTakesDiscount, stampDiscountNotes } from "@/lib/billing/fixPoints";
import { readFixPoints } from "@/lib/billing/fixPointsService";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { readReferralDiscount } from "@/lib/referrals/service";
import { loadEntitlements } from "@/lib/entitlements/query";
import { stampUpgradeNotes, upgradeFor, type Upgrade } from "@/lib/billing/upgrade";
import { getOwnMobile } from "@/lib/profile/service";
import { razorpayContact } from "@/lib/profile/mobile";

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
  // The saved mobile, read beside the order so it costs no extra wait.
  const contactRead = readContact(db, user.id);

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
    const contact = await contactRead;
    return NextResponse.json({
      orderId: result.orderId,
      amount: result.amount,
      currency: result.currency,
      keyId,
      planLabel: terms.title,
      email: user.email,
      ...(contact ? { contact } : {}),
    });
  }

  // The button names the pass; the buyer's country picks the price (0206): a
  // buyer in India gets the rupee IMAT plan whichever price they tapped, and a
  // rupee plan id sent from elsewhere sells the plan sold everywhere.
  const country = readCountry(request.headers);
  const plans = body?.planId ? await listActivePlans(db) : [];
  const plan = body?.planId ? resolveOrderPlan(plans, body.planId, country) : null;
  if (!plan) {
    return NextResponse.json({ error: "Unknown plan" }, { status: 400 });
  }

  // An upgrade (2026-11-11), Fix Points (0245) and a friend's referral (0249):
  // the server reads all three NOW and the order carries the price they make
  // (and an upgrade's end date), so the payment is held to it. Each failed read
  // counts as none: never a discount nobody earned. The upgrade price first,
  // then the points off it (owner).
  let points = 0;
  let referralPct = 0;
  let upgrade: Upgrade | null = null;
  if (planTakesDiscount(plan)) {
    const admin = createSupabaseAdminClient();
    const [p, r, e] = await Promise.allSettled([
      readFixPoints(admin, user.id, new Date()),
      readReferralDiscount(admin, user.id),
      loadEntitlements(admin, user.id),
    ]);
    if (p.status === "fulfilled") points = p.value.points;
    else console.error("order: fix points read failed", p.reason);
    if (r.status === "fulfilled") referralPct = r.value;
    else console.error("order: referral read failed", r.reason);
    if (e.status === "fulfilled") upgrade = upgradeFor(e.value, plan, plans, Date.now());
    else console.error("order: pass read for upgrade failed", e.reason);
  }
  const notes = stampDiscountNotes(stampUpgradeNotes(stampOrderNotes(plan, user.id), upgrade), plan, { points, referralPct });

  const result = await createOrder({
    amountPaise: Number(notes.amountPaise),
    currency: plan.currency,
    receipt: `qb_${plan.id}_${user.id.slice(0, 8)}`,
    notes,
  });
  if (!result.ok) {
    console.error("razorpay createOrder failed:", result.error);
    return NextResponse.json({ error: "Could not start checkout" }, { status: 502 });
  }
  const contact = await contactRead;
  const opened = paywallEvent("checkout_opened", checkoutGate(body?.gate), plan.id, undefined, checkoutBox(body?.box));
  // Whether Razorpay got a mobile, so checkout-to-paid can be read with and without it.
  opened.metadata = { ...opened.metadata, hasContact: contact !== null };
  await logActivity(db, user.id, withCountry(opened, country));

  return NextResponse.json({
    orderId: result.orderId,
    amount: result.amount,
    currency: result.currency,
    keyId,
    planLabel: plan.label,
    email: user.email,
    ...(contact ? { contact } : {}),
  });
}

/**
 * The student's saved mobile as Razorpay prefills it, or null. Without it
 * Razorpay opens on a mobile-number form before any way to pay (2026-11-12).
 * Never rejects: a failed read only means Razorpay asks, as it did before.
 */
async function readContact(db: ReturnType<typeof createSupabaseServerClient>, userId: string): Promise<string | null> {
  try {
    return razorpayContact((await getOwnMobile(db, userId)).mobile);
  } catch (err) {
    console.error("order: mobile read failed", err);
    return null;
  }
}
