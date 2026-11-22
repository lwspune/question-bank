import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/http";
import { isParentCode } from "@/lib/billing/parentLink";
import { confirmPaidOrder } from "@/lib/billing/confirmOrder";
import { HOUR_MS, ORDER_ID_RE, RETURN_CHECKS_PER_HOUR, confirmResponse } from "@/lib/billing/returnCheckHttp";

export const maxDuration = 30;

/**
 * The return check on a parent's payment page, /pay/<code> (2026-11-22). No
 * sign-in, as on the rest of that page: the order must have been made for THIS
 * link (its notes carry the code), and the pass goes to the student the order
 * names. On 22 Nov a parent paid by UPI, the page never heard back, and they
 * opened checkout again 7 minutes later. lib/billing/confirmOrder.ts.
 */
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { code?: unknown; orderId?: unknown } | null;
  const code = body?.code;
  const orderId = body?.orderId;
  if (!isParentCode(code) || typeof orderId !== "string" || !ORDER_ID_RE.test(orderId)) {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  const rl = await checkAndIncrement(createSupabaseAdminClient(), `parent-check:ip:${getClientIp(request)}`, {
    limit: RETURN_CHECKS_PER_HOUR,
    windowMs: HOUR_MS,
  });
  if (!rl.ok) return NextResponse.json({ error: "Too many checks. Try again later." }, { status: 429 });

  const state = await confirmPaidOrder(orderId, (order) => order.notes?.parentLink === code);
  return confirmResponse(state);
}
