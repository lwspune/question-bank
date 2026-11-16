/**
 * npm run billing:reconcile: grant captured Razorpay payments that nothing granted.
 *
 *   npm run billing:reconcile                 # DRY RUN: list what it would grant, write nothing
 *   npm run billing:reconcile -- --days=30    # look further back (default 3 days)
 *   npm run billing:reconcile -- --apply      # grant, then email the owner (lives in billing-reconcile.yml)
 *
 * WHY (2026-11-15): a pass is granted by the buyer's browser after checkout
 * or by Razorpay's order.paid webhook. For a ₹197 UPI payment that day
 * neither ran, and a ₹499 one on 2026-11-01 waited three days for a hand
 * grant. This reads Razorpay's payments, finds captured ones on our orders
 * that no pass or ebook row names, and grants each by the webhook's own rule
 * (decideWebhook + applyPaidOrder). A payment under 15 minutes old is left to
 * the webhook. Safe to repeat: the database refuses a second row per payment.
 *
 * The owner is emailed only when it granted something (the webhook missed it)
 * or could not (a buyer still waits). Exit 1 when a grant failed.
 * Pure core: src/lib/billing/reconcile.ts.
 */
import { config } from "dotenv";
config({ path: ".env.local" });
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { fetchOrder, listPayments } from "../../src/lib/billing/razorpay";
import {
  buildStrandedEmail,
  decidePaidOrder,
  strandedPayments,
  type StrandedOutcome,
} from "../../src/lib/billing/reconcile";
import { applyPaidOrder } from "../../src/lib/billing/applyPaidOrder";
import { readGraderEmails } from "../../src/lib/answerSheets/grader";
import { sendEmail } from "../../src/lib/email/resend";

/** `.in()` puts the ids in the URL; past ~200 the request line overflows (CLAUDE.md pitfalls). */
const IN_CHUNK = 200;

function arg(name: string): string | undefined {
  const p = `--${name}=`;
  return process.argv.find((a) => a.startsWith(p))?.slice(p.length);
}

/** Every payment id among `ids` that a pass or an ebook row already carries. */
async function readGrantedRefs(admin: SupabaseClient, ids: string[]): Promise<Set<string>> {
  const granted = new Set<string>();
  for (let i = 0; i < ids.length; i += IN_CHUNK) {
    const chunk = ids.slice(i, i + IN_CHUNK);
    const [passes, books] = await Promise.all([
      admin.from("entitlements").select("provider_ref").in("provider_ref", chunk),
      admin.from("ebook_purchases").select("payment_id").in("payment_id", chunk),
    ]);
    if (passes.error) throw new Error(`entitlements read failed: ${passes.error.message}`);
    if (books.error) throw new Error(`ebook_purchases read failed: ${books.error.message}`);
    for (const r of passes.data ?? []) if (r.provider_ref) granted.add(r.provider_ref);
    for (const r of books.data ?? []) if (r.payment_id) granted.add(r.payment_id);
  }
  return granted;
}

async function main() {
  const apply = process.argv.includes("--apply");
  const days = Number(arg("days") ?? 3);
  if (!Number.isFinite(days) || days <= 0) throw new Error("--days must be a positive number");
  const env = process.env;
  const runUrl =
    arg("run-url") ??
    (env.GITHUB_SERVER_URL && env.GITHUB_REPOSITORY && env.GITHUB_RUN_ID
      ? `${env.GITHUB_SERVER_URL}/${env.GITHUB_REPOSITORY}/actions/runs/${env.GITHUB_RUN_ID}`
      : "(run by hand)");
  const admin = createClient(env.NEXT_PUBLIC_SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const nowSec = Date.now() / 1000;
  const listed = await listPayments(nowSec - days * 86400);
  if (!listed.ok) throw new Error(`Razorpay payments read failed: ${listed.error}`);
  const onOrders = listed.payments.filter((p) => p.status === "captured" && p.order_id);
  const granted = await readGrantedRefs(admin, onOrders.map((p) => p.id));
  const stranded = strandedPayments(listed.payments, granted, nowSec);
  console.log(
    `Last ${days} day(s): ${listed.payments.length} payments, ${onOrders.length} captured on an order, ` +
      `${stranded.length} with no grant.`
  );

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
      const reason = decision.action === "skip" ? decision.reason : decision.action;
      outcomes.push({ ...base, result: "skipped", detail: reason });
      continue;
    }
    const what =
      decision.action === "grant"
        ? `${decision.grant.planId} (${decision.grant.scope})`
        : `ebook ${decision.grant.ebookSlug}`;
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

  for (const o of outcomes) {
    console.log(`  ${o.result.padEnd(15)} ${o.paymentId} ${o.orderId} ${o.amount} ${o.currency} ${o.what} ${o.detail}`);
  }

  const email = buildStrandedEmail(outcomes, runUrl);
  if (!email) {
    console.log("Nothing to grant. No email.");
    return;
  }
  const to = await readGraderEmails(admin);
  console.log(`\nTo: ${to.join(", ") || "(no platform admin email)"}\nSubject: ${email.subject}\n\n${email.text}`);
  if (!apply) {
    console.log("\nDry run: nothing granted, no email sent. Add -- --apply to grant.");
    return;
  }
  let sendFailed = 0;
  for (const address of to) {
    const r = await sendEmail({ to: address, ...email });
    if (!r.ok) {
      sendFailed++;
      console.error(`Send to ${address} failed: ${r.error}`);
    }
  }
  const grantFailed = outcomes.some((o) => o.result === "error");
  if (grantFailed || sendFailed > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
