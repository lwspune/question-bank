import { NextResponse, type NextRequest } from "next/server";
import { verifyWebhookSignature } from "@/lib/billing/razorpay";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { revokeRazorpayEntitlement } from "@/lib/billing/grant";
import { decideWebhook, type WebhookBody } from "@/lib/billing/webhook";
import { applyPaidOrder } from "@/lib/billing/applyPaidOrder";
import { revokeEbookPurchase } from "@/lib/ebooks/grant";
import { revokeReferralReward } from "@/lib/referrals/service";

export const maxDuration = 30;

/**
 * Authoritative grant path, and the refund path. Configure BOTH events in the
 * Razorpay dashboard: `order.paid` grants the pass to the buyer named in the
 * order notes (survives the buyer closing the tab; idempotent with the
 * client-verify path), `refund.processed` revokes it on a full refund.
 * What each event means is decided in lib/billing/webhook.ts.
 *
 * Returns 200 for handled/ignored events so Razorpay doesn't retry; 400 on a
 * bad signature; 500 only on a transient DB failure (so Razorpay retries).
 */
export async function POST(request: NextRequest) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("billing webhook: RAZORPAY_WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  const raw = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";
  if (!verifyWebhookSignature(raw, signature, secret)) {
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  let body: WebhookBody;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  const decision = decideWebhook(body);

  if (decision.action === "ignore") {
    return NextResponse.json({ received: true, ignored: decision.event });
  }
  if (decision.action === "skip") {
    console.error(`billing webhook: ${body.event} skipped`, decision.reason);
    return NextResponse.json({ received: true, skipped: decision.reason });
  }

  if (decision.action === "revoke") {
    // A payment buys either a pass or an ebook; revoking both by payment id
    // ends whichever it was, and the other finds nothing. A friend's refunded
    // pass also ends the inviter's free days it earned (0249).
    const [pass, book, reward] = await Promise.all([
      revokeRazorpayEntitlement(decision.paymentId),
      revokeEbookPurchase(decision.paymentId),
      revokeReferralReward(createSupabaseAdminClient(), decision.paymentId).then(
        (n) => ({ kind: "ok" as const, revoked: n }),
        (e: unknown) => ({ kind: "error" as const, message: e instanceof Error ? e.message : String(e) })
      ),
    ]);
    if (pass.kind === "error" || book.kind === "error" || reward.kind === "error") {
      console.error(
        "billing webhook: revoke failed",
        pass.kind === "error" ? pass.message : "",
        book.kind === "error" ? book.message : "",
        reward.kind === "error" ? reward.message : ""
      );
      return NextResponse.json({ error: "revoke failed" }, { status: 500 });
    }
    return NextResponse.json({ received: true, revoked: pass.revoked + book.revoked });
  }

  // The pass or ebook, the referral reward and the parent email, shared with
  // the payment check (scripts/billing/reconcile.ts). A failure answers 500 so
  // Razorpay retries; the retry lands on "already granted" for the row.
  const result = await applyPaidOrder(decision);
  if (result.kind === "error") {
    if (result.stage === "referral") {
      console.error("billing webhook: referral reward failed", result.message);
      return NextResponse.json({ error: "referral reward failed" }, { status: 500 });
    }
    const what = decision.action === "grant_ebook" ? "ebook grant" : "grant";
    console.error(`billing webhook: ${what} failed`, result.message);
    return NextResponse.json({ error: "grant failed" }, { status: 500 });
  }
  return NextResponse.json({ received: true, granted: result.kind });
}
