/**
 * The payment check (2026-11-15, moved here from scripts/billing/reconcile.ts
 * on 2026-11-22 so Vercel's scheduler can run it). Two jobs:
 *
 * 1. GRANT what nothing granted: captured Razorpay payments and paid Paddle
 *    transactions that no pass or ebook row names, each decided by the
 *    WEBHOOK's own rule (decidePaidOrder / decidePaddleTransaction +
 *    applyPaidOrder), so the check cannot grant differently from the webhook.
 * 2. NOTICE a quiet webhook (0283): a paid order with no recorded delivery
 *    means the webhook is off or failing, stranded buyer or not. Razorpay's
 *    sat disabled from 30 Oct to 22 Nov 2026 with nothing on our side noticing.
 *
 * Callers: /api/cron/payment-check (Vercel Cron, every 30 minutes) and
 * `npm run billing:reconcile` (by hand, and GitHub's daily backup run).
 * Pure parts: lib/billing/reconcile.ts and lib/billing/webhookAlarm.ts.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { fetchOrder, listPayments } from "./razorpay";
import { buildStrandedEmail, decidePaidOrder, strandedPayments, type StrandedOutcome } from "./reconcile";
import { applyPaidOrder } from "./applyPaidOrder";
import {
  decidePaddleTransaction,
  isPaddleConfigured,
  listPaidPaddleTransactions,
  strandedPaddleTransactions,
  type PaddleTransaction,
} from "./paddle";
import {
  PAID_EVENTS,
  WEBHOOK_RECEIPTS_SINCE_SEC,
  buildWebhookSilentEmail,
  silentRefs,
  type SilentItem,
  type WebhookProvider,
} from "./webhookAlarm";
import { claimDailyAlarm, firstReceiptSec, readReceivedRefs, releaseDailyAlarm, trimReceipts } from "./webhookReceipts";
import { formatPrice, type PlanCurrency } from "./plans";
import { readGraderEmails } from "@/lib/answerSheets/grader";
import { sendEmail } from "@/lib/email/resend";
import { istDate } from "@/lib/sales/summary";
import type { BuiltEmail } from "@/lib/email/templates";
import { readInChunks } from "@/lib/supabase/readInChunks";

export type PaymentCheckOptions = {
  admin: SupabaseClient;
  /** false = dry run: decide and report, grant and email nothing. */
  apply: boolean;
  /** How far back to look. */
  days: number;
  /** Where the run can be seen, for the emails. */
  runUrl: string;
  nowMs?: number;
  log?: (line: string) => void;
};

export type PaymentCheckResult = {
  outcomes: StrandedOutcome[];
  silent: { razorpay: SilentItem[]; paddle: SilentItem[] };
  /** Subjects of the emails sent (or, in a dry run, that would be). */
  emails: string[];
  /** A grant or an email failed: the caller exits 1 / answers 500. */
  failed: boolean;
};

/** Every payment id among `ids` that a pass or an ebook row already carries. */
async function readGrantedRefs(admin: SupabaseClient, ids: string[]): Promise<Set<string>> {
  const [passes, books] = await Promise.all([
    readInChunks<{ provider_ref: string | null }>(ids, (part, from, to) =>
      admin.from("entitlements").select("provider_ref").in("provider_ref", part).order("id").range(from, to)
    ),
    readInChunks<{ payment_id: string | null }>(ids, (part, from, to) =>
      admin.from("ebook_purchases").select("payment_id").in("payment_id", part).order("id").range(from, to)
    ),
  ]);
  const granted = new Set<string>();
  for (const r of passes) if (r.provider_ref) granted.add(r.provider_ref);
  for (const r of books) if (r.payment_id) granted.add(r.payment_id);
  return granted;
}

function money(amount: number, currency: string): string {
  return currency === "INR" || currency === "USD" ? formatPrice(amount, currency as PlanCurrency) : `${amount / 100} ${currency}`;
}

const paddleAmount = (t: PaddleTransaction) => Number(t.items?.[0]?.price?.unit_price?.amount ?? 0);
const paddleSec = (t: PaddleTransaction) => Math.floor(Date.parse(t.created_at) / 1000);

export async function runPaymentCheck(opts: PaymentCheckOptions): Promise<PaymentCheckResult> {
  const { admin, apply, days, runUrl } = opts;
  const log = opts.log ?? (() => undefined);
  const nowMs = opts.nowMs ?? Date.now();
  const nowSec = nowMs / 1000;

  // ── Razorpay: grant what nothing granted ──
  const listed = await listPayments(nowSec - days * 86400);
  if (!listed.ok) throw new Error(`Razorpay payments read failed: ${listed.error}`);
  const onOrders = listed.payments.filter((p) => p.status === "captured" && p.order_id);
  const granted = await readGrantedRefs(admin, onOrders.map((p) => p.id));
  const stranded = strandedPayments(listed.payments, granted, nowSec);
  log(`Last ${days} day(s): ${listed.payments.length} payments, ${onOrders.length} captured on an order, ${stranded.length} with no grant.`);

  const outcomes: StrandedOutcome[] = [];
  for (const p of stranded) {
    const base = {
      paymentId: p.id,
      orderId: p.order_id ?? "",
      amount: p.amount,
      currency: p.currency,
      createdAt: p.created_at,
      what: "",
      detail: "",
    };
    const fetched = await fetchOrder(p.order_id ?? "");
    if (!fetched.ok) {
      outcomes.push({ ...base, result: "error", detail: `could not read the order: ${fetched.error}` });
      continue;
    }
    const decision = decidePaidOrder(fetched.order, p.id);
    if (decision.action !== "grant" && decision.action !== "grant_ebook") {
      outcomes.push({ ...base, result: "skipped", detail: decision.action === "skip" ? decision.reason : decision.action });
      continue;
    }
    const what =
      decision.action === "grant" ? `${decision.grant.planId} (${decision.grant.scope})` : `ebook ${decision.grant.ebookSlug}`;
    if (!apply) {
      outcomes.push({ ...base, what, result: "granted", detail: "dry run: would grant" });
      continue;
    }
    const result = await applyPaidOrder(decision);
    outcomes.push(
      result.kind === "error"
        ? { ...base, what, result: "error", detail: `${result.stage} failed: ${result.message}` }
        : { ...base, what, result: result.kind === "ok" ? "granted" : "already_granted" }
    );
  }

  // ── Paddle: the same, when a plan sells through it ──
  const paddle = await paddleHalf(admin, nowSec, days, apply, log);
  outcomes.push(...paddle.outcomes);

  for (const o of outcomes) {
    log(`  ${o.result.padEnd(15)} ${o.paymentId} ${o.orderId} ${o.amount} ${o.currency} ${o.what} ${o.detail}`);
  }

  // ── A quiet webhook (0283) ──
  const razorpayItems: SilentItem[] = onOrders.map((p) => ({
    ref: p.order_id as string,
    createdAtSec: p.created_at,
    label: `${money(p.amount, p.currency)}, ${p.id}`,
  }));
  const paddleItems: SilentItem[] = paddle.transactions.map((t) => ({
    ref: t.id,
    createdAtSec: paddleSec(t),
    label: money(paddleAmount(t), t.currency_code),
  }));
  // Count only orders paid after the provider's first recorded delivery:
  // recording began with the deploy that added it, so anything earlier has no
  // receipt by construction. Before any delivery is recorded, stay quiet.
  const silentFor = async (provider: WebhookProvider, items: SilentItem[]): Promise<SilentItem[]> => {
    const first = await firstReceiptSec(admin, provider);
    if (first === null) {
      if (items.length > 0) log(`${provider}: no webhook delivery recorded yet; the alarm starts with the first one.`);
      return [];
    }
    const received = await readReceivedRefs(admin, provider, items.map((i) => i.ref), PAID_EVENTS[provider]);
    return silentRefs(items, received, nowSec, Math.max(WEBHOOK_RECEIPTS_SINCE_SEC, first));
  };
  const silent = {
    razorpay: await silentFor("razorpay", razorpayItems),
    paddle: await silentFor("paddle", paddleItems),
  };
  log(`Webhook deliveries: ${silent.razorpay.length} Razorpay and ${silent.paddle.length} Paddle paid order(s) with none.`);

  // ── Emails ──
  const emails: string[] = [];
  let failed = outcomes.some((o) => o.result === "error");
  const to = await readGraderEmails(admin);

  const sendAll = async (email: BuiltEmail): Promise<boolean> => {
    emails.push(email.subject);
    log(`\nTo: ${to.join(", ") || "(no platform admin email)"}\nSubject: ${email.subject}\n\n${email.text}`);
    if (!apply) return true;
    let sent = 0;
    for (const address of to) {
      const r = await sendEmail({ to: address, ...email });
      if (r.ok) sent++;
      else log(`Send to ${address} failed: ${r.error}`);
    }
    return to.length > 0 && sent === to.length;
  };

  const strandedEmail = buildStrandedEmail(outcomes, runUrl);
  if (strandedEmail && !(await sendAll(strandedEmail))) failed = true;

  const silentEmail = buildWebhookSilentEmail(silent, runUrl);
  if (silentEmail) {
    const day = istDate(new Date(nowMs));
    if (!apply) {
      await sendAll(silentEmail);
    } else if (await claimDailyAlarm(admin, "webhook_silent", day)) {
      // Not sent to anyone: hand the day back so the next run tries again.
      if (!(await sendAll(silentEmail))) {
        failed = true;
        await releaseDailyAlarm(admin, "webhook_silent", day);
      }
    } else {
      log("Webhook alarm already sent today.");
    }
  }

  if (apply) await trimReceipts(admin, nowMs);
  if (!apply) log("\nDry run: nothing granted, no email sent.");
  return { outcomes, silent, emails, failed };
}

/**
 * Paddle's half (0271). Skipped while no plan sells through Paddle; once one
 * does, missing keys fail the run, because a check that silently does nothing
 * is the problem this job fixes.
 */
async function paddleHalf(
  admin: SupabaseClient,
  nowSec: number,
  days: number,
  apply: boolean,
  log: (line: string) => void
): Promise<{ outcomes: StrandedOutcome[]; transactions: PaddleTransaction[] }> {
  const { count, error } = await admin.from("plans").select("id", { count: "exact", head: true }).eq("payment_provider", "paddle");
  if (error) throw new Error(`plans read failed: ${error.message}`);
  if (!isPaddleConfigured()) {
    if ((count ?? 0) > 0) throw new Error("A plan sells through Paddle but PADDLE_API_KEY / NEXT_PUBLIC_PADDLE_CLIENT_TOKEN are not set");
    log("Paddle: no plan sells through it and no keys set; skipped.");
    return { outcomes: [], transactions: [] };
  }
  const listed = await listPaidPaddleTransactions(new Date((nowSec - days * 86400) * 1000).toISOString());
  if (!listed.ok) throw new Error(`Paddle transactions read failed: ${listed.error}`);
  const granted = await readGrantedRefs(admin, listed.transactions.map((t) => t.id));
  const stranded = strandedPaddleTransactions(listed.transactions, granted, nowSec);
  log(`Paddle, last ${days} day(s): ${listed.transactions.length} paid transactions, ${stranded.length} with no grant.`);

  const outcomes: StrandedOutcome[] = [];
  for (const t of stranded) {
    const base = {
      paymentId: t.id,
      orderId: "Paddle",
      amount: paddleAmount(t),
      currency: t.currency_code,
      createdAt: paddleSec(t),
      what: "",
      detail: "",
    };
    const decision = decidePaddleTransaction(t);
    if (decision.action !== "grant") {
      outcomes.push({ ...base, result: "skipped", detail: decision.action === "skip" ? decision.reason : decision.action });
      continue;
    }
    const what = `${decision.grant.planId} (${decision.grant.scope})`;
    if (!apply) {
      outcomes.push({ ...base, what, result: "granted", detail: "dry run: would grant" });
      continue;
    }
    const result = await applyPaidOrder(decision);
    outcomes.push(
      result.kind === "error"
        ? { ...base, what, result: "error", detail: `${result.stage} failed: ${result.message}` }
        : { ...base, what, result: result.kind === "ok" ? "granted" : "already_granted" }
    );
  }
  return { outcomes, transactions: listed.transactions };
}
