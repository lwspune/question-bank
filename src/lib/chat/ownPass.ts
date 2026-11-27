/**
 * The student's own pass, told to V each message (2026-11-27). A student who
 * had bought the Practice Pass three hours earlier asked V about the ₹300
 * /pricing showed them for the Premium Pass: their upgrade price. V knew only
 * the list prices, said "PYQ Vault has no ₹300 pass" and warned them not to
 * pay anyone. The upgrade price here is checkout's own (`upgradeFor`), so V
 * quotes what the student will be charged before Vault Points.
 *
 * Pure. Goes in the per-message tail (buildSystemTail), never the cached
 * instructions: it differs per student.
 */
import { formatPrice, type Plan } from "@/lib/billing/plans";
import { upgradeFor } from "@/lib/billing/upgrade";
import { isEntitlementActive, scopeIncludes, type Entitlement } from "@/lib/entitlements/access";

const SCOPE_NAMES: Readonly<Record<string, string>> = {
  all: "full access",
  teacher: "teacher access",
};

function istDay(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });
}

/** The pass a row is, as /pricing names it: the plan that sells its scope, else a plain name. */
function passName(row: Entitlement, plans: readonly Plan[]): string {
  const sold = plans.find((p) => p.scope === row.scope && (!row.currency || p.currency === row.currency));
  return sold?.label ?? SCOPE_NAMES[row.scope] ?? `the ${row.scope} pass`;
}

function heldLine(row: Entitlement, plans: readonly Plan[]): string {
  const name = passName(row, plans);
  const until = row.expiresAt ? ` until ${istDay(row.expiresAt)}` : "";
  if (row.source === "trial") return `They are on a free trial of the ${name}${until}.`;
  if (row.source === "razorpay") return `They hold the ${name}${until}, which they paid for.`;
  return `They hold the ${name}${until}, given free (by the team, a referral or a reward).`;
}

/**
 * One line for V, or a "no pass" line for a free account. `plans` is every
 * plan (to name a held pass and price an upgrade); `onSale` is what this buyer
 * is offered, the only passes V may quote.
 */
export function ownPassLine(rows: readonly Entitlement[], plans: readonly Plan[], onSale: readonly Plan[], nowMs: number): string {
  const active = rows.filter((r) => isEntitlementActive(r, nowMs));
  if (active.length === 0) {
    const ended = rows
      .filter((r) => r.status !== "revoked" && r.expiresAt && Date.parse(r.expiresAt) <= nowMs)
      .sort((a, b) => Date.parse(b.expiresAt!) - Date.parse(a.expiresAt!))[0];
    if (ended) {
      return `THEIR PASS: They hold no pass now. Their ${passName(ended, plans)} ended on ${istDay(ended.expiresAt!)}; a new one is bought on /pricing.`;
    }
    return "THEIR PASS: They hold no pass (a free account).";
  }

  const parts = active.map((r) => heldLine(r, plans));
  for (const p of onSale) {
    if (active.some((r) => scopeIncludes(r.scope, p.scope))) {
      parts.push(`They already have everything in the ${p.label}, so they do not need to buy it.`);
      continue;
    }
    const u = upgradeFor(active, p, plans, nowMs);
    if (u) {
      parts.push(
        `Upgrading to the ${p.label} costs them ${formatPrice(u.pricePaise, p.currency)} now, not ${formatPrice(p.amountPaise, p.currency)}: the days left on their ${u.fromLabel} come off, and the ${p.label} ends on the same day as it (${istDay(u.endsAt)}). This is the price /pricing shows them; Vault Points can take more off at checkout.`
      );
    }
  }
  return `THEIR PASS: ${parts.join(" ")}`;
}
