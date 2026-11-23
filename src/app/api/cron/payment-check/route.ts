import { NextResponse, type NextRequest } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { runPaymentCheck } from "@/lib/billing/paymentCheck";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * The payment check on Vercel's scheduler (2026-11-22; vercel.json `crons`,
 * every 30 minutes). It grants paid orders nothing granted and emails the
 * owner when the webhook goes quiet: lib/billing/paymentCheck.ts.
 *
 * WHY HERE: GitHub's "every 30 minutes" schedule ran it every 6 to 8 hours
 * (19-22 Nov 2026), so a stranded buyer waited most of a day. GitHub keeps a
 * daily backup run (.github/workflows/billing-reconcile.yml); both are safe to
 * overlap, since a grant is one row per payment and the alarm one per day.
 *
 * Vercel sends `Authorization: Bearer <CRON_SECRET>`. Without CRON_SECRET set
 * the route refuses every call rather than run open: it grants passes and
 * sends email.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    console.error("payment check cron: CRON_SECRET not set");
    return NextResponse.json({ ok: false, error: "not configured" }, { status: 503 });
  }
  const given = Buffer.from(request.headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${secret}`);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const result = await runPaymentCheck({
      admin: createSupabaseAdminClient(),
      apply: true,
      days: 3,
      runUrl: "Vercel Cron, /api/cron/payment-check (Vercel > Logs)",
      log: (line) => console.log(line),
    });
    const body = {
      ok: !result.failed,
      outcomes: result.outcomes.map((o) => ({ payment: o.paymentId, result: o.result })),
      silent: { razorpay: result.silent.razorpay.length, paddle: result.silent.paddle.length },
      emails: result.emails,
    };
    if (result.failed) console.error("payment check cron: a grant or an email failed");
    return NextResponse.json(body, { status: result.failed ? 500 : 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("payment check cron: failed", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
