import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { fetchOrder, verifyPaymentSignature } from "@/lib/billing/razorpay";
import { grantExpiry, grantLengthLabel } from "@/lib/billing/plans";
import { grantRazorpayEntitlement } from "@/lib/billing/grant";
import { isParentCode, parentGrantFromOrder } from "@/lib/billing/parentLink";
import { orderGrantNote } from "@/lib/billing/upgrade";
import { emailParentPaid } from "@/lib/billing/parentPayService";
import { listActivePlans } from "@/lib/billing/plansQuery";

export const maxDuration = 30;

/**
 * A parent's payment, confirmed (2026-11-09, migration 0244). No sign-in: the
 * signature proves the order was paid, and the grant goes to the student the
 * order was stamped for, only for the link it names. Idempotent with the
 * webhook (same payment id); only the grant that is NEW emails the student.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return NextResponse.json({ error: "Payments not configured" }, { status: 503 });

  const body = (await request.json().catch(() => null)) as {
    code?: unknown;
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
  } | null;
  const code = body?.code;
  if (!isParentCode(code) || !body?.razorpay_order_id || !body.razorpay_payment_id || !body.razorpay_signature) {
    return NextResponse.json({ error: "Missing payment fields" }, { status: 400 });
  }
  if (!verifyPaymentSignature(body.razorpay_order_id, body.razorpay_payment_id, body.razorpay_signature, secret)) {
    return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
  }

  const pending = NextResponse.json({ error: "Payment received. The pass will activate shortly." }, { status: 202 });
  const fetched = await fetchOrder(body.razorpay_order_id);
  if (!fetched.ok) {
    // The webhook still grants from the order's own notes.
    console.error("parent verify: could not read order", fetched.error);
    return pending;
  }
  const decided = parentGrantFromOrder(fetched.order, code);
  if (!decided.ok && decided.reason === "order not paid") return pending;
  if (!decided.ok) {
    console.error("parent verify: order refused", decided.reason);
    return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
  }

  const result = await grantRazorpayEntitlement({
    userId: decided.userId,
    paymentId: body.razorpay_payment_id,
    scope: decided.grant.scope,
    expiresAt: grantExpiry(decided.grant, Date.now()),
    amountPaise: decided.grant.amountPaise,
    currency: decided.grant.currency,
    // The parent mark first; an upgrade's credit after it (2026-11-11).
    note: orderGrantNote({ ...(fetched.order.notes ?? {}), parentLink: code }),
  });
  if (result.kind === "error") {
    console.error("parent grant after verify failed:", result.message);
    return pending;
  }
  if (result.kind === "ok") {
    const admin = createSupabaseAdminClient();
    const plan = (await listActivePlans(admin).catch(() => [])).find((p) => p.id === decided.grant.planId);
    await emailParentPaid(admin, {
      userId: decided.userId,
      paymentId: body.razorpay_payment_id,
      planLabel: plan?.label ?? "PYQ Vault pass",
      length: grantLengthLabel(decided.grant, Date.now()),
    });
  }
  return NextResponse.json({ ok: true });
}
