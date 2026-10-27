/**
 * Fill in `entitlements.amount_paise` (migration 0196) for paid passes sold
 * before the grant code recorded it, from what Razorpay says each payment
 * charged. Run once, after 0196 is applied and before 0197 makes the amount
 * required for a paid grant.
 *
 * Razorpay is the record of what was charged, so its amount is written, never
 * a price worked out from the date. The date's price (Rs 99 before 07:30 IST on
 * 2026-10-23, Rs 199 after) is printed beside it only as a cross-check: a
 * mismatch is reported, not overridden. A payment Razorpay cannot return, or one
 * not in rupees, is skipped and listed, and the row stays empty.
 *
 * IDEMPOTENT: touches only paid grants whose amount is still empty.
 *
 *   npx tsx scripts/billing/backfill-pass-amounts.ts           # dry run
 *   npx tsx scripts/billing/backfill-pass-amounts.ts --apply
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const PRICE_CHANGE = Date.parse("2026-10-23T02:00:00Z"); // 07:30 IST

type Payment = { amount?: number; currency?: string; status?: string; amount_refunded?: number; error?: { description?: string } };

async function fetchPayment(paymentId: string): Promise<{ ok: true; payment: Payment } | { ok: false; error: string }> {
  const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString("base64");
  const res = await fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`, {
    headers: { Authorization: `Basic ${auth}` },
  });
  const data = (await res.json().catch(() => null)) as Payment | null;
  if (!res.ok || !data) return { ok: false, error: data?.error?.description ?? `Razorpay error ${res.status}` };
  return { ok: true, payment: data };
}

async function main() {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) throw new Error("Razorpay keys missing from .env.local");
  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  // A few dozen rows at most; well under PostgREST's 1,000-row page.
  const { data: rows, error } = await admin
    .from("entitlements")
    .select("id, provider_ref, granted_at, status")
    .eq("source", "razorpay")
    .is("amount_paise", null)
    .order("granted_at");
  if (error) throw new Error(`read entitlements: ${error.message}`);
  console.log(`${rows.length} paid passes without an amount${APPLY ? "" : " (dry run)"}\n`);

  let written = 0;
  let mismatched = 0;
  const skipped: string[] = [];
  for (const row of rows) {
    const ref = row.provider_ref as string;
    const at = new Date(row.granted_at as string);
    const byDate = at.getTime() < PRICE_CHANGE ? 9900 : 19900;
    const fetched = await fetchPayment(ref);
    if (!fetched.ok || typeof fetched.payment.amount !== "number" || fetched.payment.currency !== "INR") {
      skipped.push(`${ref}: ${fetched.ok ? `amount ${fetched.payment.amount} ${fetched.payment.currency}` : fetched.error}`);
      continue;
    }
    const { amount, status, amount_refunded } = fetched.payment;
    const flag = amount === byDate ? "" : "  << differs from the date's price";
    if (flag) mismatched++;
    const refundNote = amount_refunded ? `  (Razorpay: ${amount_refunded / 100} refunded, ours ${row.status})` : "";
    console.log(`${at.toISOString().slice(0, 16)}Z  ${ref.slice(0, 8)}…  Rs ${amount / 100}  ${status}${flag}${refundNote}`);

    if (APPLY) {
      const { error: writeError } = await admin
        .from("entitlements")
        .update({ amount_paise: amount })
        .eq("id", row.id)
        .is("amount_paise", null);
      if (writeError) throw new Error(`write ${ref}: ${writeError.message}`);
      written++;
    }
  }

  console.log(`\n${APPLY ? `written: ${written}` : "dry run, nothing written"} · differs from the date's price: ${mismatched}`);
  if (skipped.length) console.log(`skipped (left empty):\n  ${skipped.join("\n  ")}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
