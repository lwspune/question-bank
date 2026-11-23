/**
 * npm run billing:reconcile: the payment check, by hand. It grants captured
 * Razorpay payments and paid Paddle transactions that nothing granted, and
 * emails the owner when a paid order had no webhook delivery (0283).
 *
 *   npm run billing:reconcile                 # DRY RUN: list what it would grant and email, write nothing
 *   npm run billing:reconcile -- --days=30    # look further back (default 3 days)
 *   npm run billing:reconcile -- --apply      # grant and email
 *
 * Runs every 30 minutes on Vercel (/api/cron/payment-check, vercel.json) and
 * once a day on GitHub as a backup (.github/workflows/billing-reconcile.yml).
 * The work is lib/billing/paymentCheck.ts, shared with that route.
 */
import { config } from "dotenv";
config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import { runPaymentCheck } from "../../src/lib/billing/paymentCheck";

function arg(name: string): string | undefined {
  const p = `--${name}=`;
  return process.argv.find((a) => a.startsWith(p))?.slice(p.length);
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
  const result = await runPaymentCheck({ admin, apply, days, runUrl, log: (l) => console.log(l) });
  if (result.failed) process.exit(1);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
