import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import { confirmPaidOrder } from "@/lib/billing/confirmOrder";
import { HOUR_MS, ORDER_ID_RE, RETURN_CHECKS_PER_HOUR, confirmResponse } from "@/lib/billing/returnCheckHttp";

export const maxDuration = 30;

/**
 * The return check for a signed-in buyer (2026-11-22): the checkout page asks
 * about its open order when it is looked at again, in case the success
 * callback never ran (UPI on a phone). Only the buyer the order was stamped for
 * may ask; anyone else's order answers 404. lib/billing/confirmOrder.ts.
 */
export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Sign in again." }, { status: 401 });

  const body = (await request.json().catch(() => null)) as { orderId?: unknown } | null;
  const orderId = body?.orderId;
  if (typeof orderId !== "string" || !ORDER_ID_RE.test(orderId)) {
    return NextResponse.json({ error: "Bad order." }, { status: 400 });
  }

  const rl = await checkAndIncrement(createSupabaseAdminClient(), `check-order:user:${user.id}`, {
    limit: RETURN_CHECKS_PER_HOUR,
    windowMs: HOUR_MS,
  });
  if (!rl.ok) return NextResponse.json({ error: "Too many checks. Try again later." }, { status: 429 });

  const state = await confirmPaidOrder(orderId, (order) => order.notes?.userId === user.id);
  return confirmResponse(state);
}
