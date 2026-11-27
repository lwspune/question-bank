/**
 * npm run billing:devices: Razorpay payments per phone and browser (2026-11-27).
 * Read-only.
 *
 *   npm run billing:devices                  # since 2026-11-27, when orders began naming the device
 *   npm run billing:devices -- --days=14     # the last 14 days
 *
 * WHY: since go-live 38 of 52 failed payments timed out with no UPI ID, and
 * four students kept trying (3 to 8 times) without UPI working. Razorpay keeps
 * no device, so the order route stamps one (src/lib/billing/checkoutDevice.ts).
 * Read this after 2-3 weeks: a device whose timeouts outrun its paid payments
 * (an app's own browser, an iPhone) is where checkout needs a different way to pay.
 */
import { config } from "dotenv";
config({ path: ".env.local" });
import { listPayments } from "../../src/lib/billing/razorpay";
import { deviceLabel, paymentsByDevice } from "../../src/lib/billing/checkoutDevice";

/** The first order that carried a device. */
const SINCE = Date.parse("2026-11-27T00:00:00+05:30");

function flag(name: string): string | null {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : null;
}

async function main() {
  const days = Number(flag("days"));
  const fromMs = Number.isFinite(days) && days > 0 ? Date.now() - days * 86_400_000 : SINCE;
  const res = await listPayments(fromMs / 1000);
  if (!res.ok) throw new Error(`Razorpay payments not read: ${res.error}`);
  const rows = paymentsByDevice(res.payments);
  console.log(`Razorpay payments since ${new Date(fromMs).toISOString().slice(0, 10)}: ${res.payments.length}\n`);
  console.log(["device".padEnd(34), "tries", " paid", "timed out", "other failed"].join("  "));
  for (const r of rows) {
    const name = `${r.device}${deviceLabel(r.device) ? ` (${deviceLabel(r.device)})` : ""}`;
    console.log([name.padEnd(34), String(r.payments).padStart(5), String(r.paid).padStart(5), String(r.timedOut).padStart(9), String(r.otherFailed).padStart(12)].join("  "));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
