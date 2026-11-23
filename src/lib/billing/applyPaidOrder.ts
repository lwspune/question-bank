/**
 * Grants what a paid order bought, from a decision decideWebhook made: the
 * pass or ebook row, the inviter's referral reward, and the "your parent
 * paid" email. Shared by the order.paid webhook and the payment check
 * (scripts/billing/reconcile.ts, 2026-11-15), so the two cannot grant
 * differently. Idempotent: the database refuses a second row for the same
 * payment ("already_granted"), and a second referral completion is a no-op.
 */
import { grantExpiry, grantLengthLabel } from "./plans";
import { listActivePlans } from "./plansQuery";
import { emailParentPaid } from "./parentPayService";
import { grantRazorpayEntitlement } from "./grant";
import type { WebhookDecision } from "./webhook";
import { grantEbookPurchase } from "@/lib/ebooks/grant";
import { completeReferral } from "@/lib/referrals/service";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type GrantDecision = Extract<WebhookDecision, { action: "grant" | "grant_ebook" }>;

export type ApplyPaidOrderResult =
  | { kind: "ok" | "already_granted" }
  /** `stage`: which step failed. A referral failure comes AFTER the pass was granted. */
  | { kind: "error"; stage: "grant" | "referral"; message: string };

export async function applyPaidOrder(decision: GrantDecision): Promise<ApplyPaidOrderResult> {
  if (decision.action === "grant_ebook") {
    const result = await grantEbookPurchase({
      userId: decision.userId,
      paymentId: decision.paymentId,
      ebookSlug: decision.grant.ebookSlug,
      amountPaise: decision.grant.amountPaise,
    });
    return result.kind === "error" ? { kind: "error", stage: "grant", message: result.message } : result;
  }

  const result = await grantRazorpayEntitlement({
    userId: decision.userId,
    paymentId: decision.paymentId,
    scope: decision.grant.scope,
    expiresAt: grantExpiry(decision.grant, Date.now()),
    amountPaise: decision.grant.amountPaise,
    currency: decision.grant.currency,
    note: decision.note,
    ...(decision.provider ? { provider: decision.provider } : {}),
  });
  if (result.kind === "error") return { kind: "error", stage: "grant", message: result.message };

  // A friend's referral price (0249): reward the inviter. Run on "already
  // granted" too, since verify may have granted and failed this step; the
  // database makes a second completion a no-op.
  if (decision.referral) {
    try {
      await completeReferral(createSupabaseAdminClient(), decision.userId, decision.paymentId);
    } catch (e) {
      return { kind: "error", stage: "referral", message: e instanceof Error ? e.message : String(e) };
    }
  }
  // A parent paid (2026-11-09): tell the student, from whichever grant is new.
  if (result.kind === "ok" && decision.note) {
    const admin = createSupabaseAdminClient();
    const plan = (await listActivePlans(admin).catch(() => [])).find((p) => p.id === decision.grant.planId);
    await emailParentPaid(admin, {
      userId: decision.userId,
      paymentId: decision.paymentId,
      planLabel: plan?.label ?? "PYQ Vault pass",
      length: grantLengthLabel(decision.grant, Date.now()),
    });
  }
  return result;
}
