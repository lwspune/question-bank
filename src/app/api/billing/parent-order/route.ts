import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createOrder } from "@/lib/billing/razorpay";
import { listActivePlans } from "@/lib/billing/plansQuery";
import { ownsPlan } from "@/lib/billing/plans";
import { loadEntitlements } from "@/lib/entitlements/query";
import { isParentCode, parentLinkState, parentOrderNotes } from "@/lib/billing/parentLink";
import { readParentLink } from "@/lib/billing/parentLinkStore";
import { stampUpgradeNotes, upgradeFor } from "@/lib/billing/upgrade";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/http";
import { logActivity } from "@/lib/activity/service";
import { paywallEvent } from "@/lib/activity/clientEvents";

export const maxDuration = 30;

const HOUR_MS = 3_600_000;
/** Orders per address an hour. A parent retrying a failed UPI needs a few; 30 stops a script. */
const ORDERS_PER_HOUR = 30;

/**
 * A parent's checkout (2026-11-09, migration 0244). No sign-in: the link names
 * the student, and the order is stamped for THAT student at today's price (the
 * ORDER is the contract), with the link's code, so verify and the webhook grant
 * the student whoever paid. A link that is not payable never reaches Razorpay.
 */
export async function POST(request: NextRequest) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  if (!keyId) return NextResponse.json({ error: "Payments are not configured yet" }, { status: 503 });

  const body = (await request.json().catch(() => null)) as { code?: unknown } | null;
  const code = body?.code;
  if (!isParentCode(code)) return NextResponse.json({ error: "This link is not valid." }, { status: 400 });

  const admin = createSupabaseAdminClient();
  const rl = await checkAndIncrement(admin, `parent-order:ip:${getClientIp(request)}`, {
    limit: ORDERS_PER_HOUR,
    windowMs: HOUR_MS,
  });
  if (!rl.ok) return NextResponse.json({ error: "Too many tries. Wait a while and try again." }, { status: 429 });

  const link = await readParentLink(admin, code);
  if (!link) return NextResponse.json({ error: "This link is not valid." }, { status: 404 });

  const now = Date.now();
  const plans = await listActivePlans(admin);
  const plan = plans.find((p) => p.id === link.planId) ?? null;
  const rows = plan ? await loadEntitlements(admin, link.userId) : [];
  const studentHasPass = plan ? ownsPlan(rows, plan, now) : false;
  const state = parentLinkState({ link, plan, nowMs: now, studentHasPass });
  if (state !== "payable" || !plan) {
    return NextResponse.json({ error: "This link can't be paid.", state }, { status: 409 });
  }

  // A Practice Pass holder's link to the Premium Pass is paid at the upgrade
  // price and ends with the Practice Pass (2026-11-11), as the student's own checkout.
  const notes = stampUpgradeNotes(parentOrderNotes(plan, link), upgradeFor(rows, plan, plans, now));
  const result = await createOrder({
    amountPaise: Number(notes.amountPaise),
    currency: plan.currency,
    receipt: `qb_parent_${link.code}`,
    notes,
  });
  if (!result.ok) {
    console.error("razorpay createOrder (parent) failed:", result.error);
    return NextResponse.json({ error: "Could not start checkout" }, { status: 502 });
  }
  await logActivity(admin, link.userId, paywallEvent("parent_checkout_opened", "parent", plan.id));

  return NextResponse.json({
    orderId: result.orderId,
    amount: result.amount,
    currency: result.currency,
    keyId,
    planLabel: plan.label,
  });
}
