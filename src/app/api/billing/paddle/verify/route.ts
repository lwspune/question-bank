import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { decidePaddleTransaction, fetchPaddleTransaction, TRANSACTION_ID_RE } from "@/lib/billing/paddle";
import { applyPaidOrder } from "@/lib/billing/applyPaidOrder";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { logActivity } from "@/lib/activity/service";
import { paywallEvent } from "@/lib/activity/clientEvents";
import { readCountry, withCountry } from "@/lib/acquisition/country";

export const maxDuration = 30;

/**
 * The buyer's browser after a Paddle checkout completes (0271): the
 * instant-access path, Paddle's twin of /api/billing/verify. The body names
 * a transaction id only; the grant is decided from the transaction PADDLE
 * holds (decidePaddleTransaction), for the signed-in buyer. Idempotent with
 * the webhook and the payment check: one row per transaction id.
 *
 * 202 when Paddle has not taken the money yet (the browser asks again, and
 * the webhook grants it anyway); 502 when Paddle cannot be read.
 */
export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Sign in to complete purchase" }, { status: 401 });

  const body = (await request.json().catch(() => null)) as { transactionId?: unknown } | null;
  const id = body?.transactionId;
  if (typeof id !== "string" || !TRANSACTION_ID_RE.test(id)) {
    return NextResponse.json({ error: "Missing payment fields" }, { status: 400 });
  }

  const fetched = await fetchPaddleTransaction(id);
  if (!fetched.ok) {
    console.error("paddle verify: could not read transaction", fetched.error);
    return NextResponse.json({ error: "Payment received. Access will activate shortly." }, { status: 502 });
  }

  const decision = decidePaddleTransaction(fetched.transaction);
  if (decision.action === "skip" && decision.reason === "order not paid") {
    return NextResponse.json({ error: "Payment received. Access will activate shortly." }, { status: 202 });
  }
  if (decision.action !== "grant" || decision.userId !== user.id) {
    const reason = decision.action === "skip" ? decision.reason : decision.action === "grant" ? "another account" : decision.action;
    console.error("paddle verify: transaction refused", reason);
    await logActivity(
      createSupabaseServerClient(),
      user.id,
      withCountry(paywallEvent("verify_failed", "pricing"), readCountry(request.headers))
    );
    return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
  }

  const result = await applyPaidOrder(decision);
  if (result.kind === "error" && result.stage === "grant") {
    console.error("paddle verify: grant failed", result.message);
    return NextResponse.json({ error: "Could not activate access" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
