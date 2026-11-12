/**
 * "Your checkout didn't complete" (2026-11-12, owner). A student who opened a
 * pass checkout and did not pay sees a bar on the first page they open on a
 * LATER day: on up to 2 such days within 7 days of the checkout, until they
 * pay or tap Not now. 45 days to 11-12: 71 of 110 students who opened checkout
 * never paid, and 43 of those came back on their own (27 the next day).
 *
 * Pure. The server side (lib/pulse/build) decides whether there is a checkout
 * to come back to; the browser decides which page is the first of the day
 * (CheckoutReturnBar), so cached pages stay cached.
 */
import { istDayKey } from "@/lib/email/dueNudge";
import { isEntitlementActive, scopeIncludes, type Entitlement } from "@/lib/entitlements/access";

/** The pay-wall gate the bar records as, and a checkout it starts is tagged with. */
export const LEFT_CHECKOUT_GATE = "return";
export const LEFT_CHECKOUT_WINDOW_DAYS = 7;
/** Days the bar may be shown on, within the window. */
export const LEFT_CHECKOUT_MAX_DAYS = 2;

const DAY_MS = 86_400_000;

/** One paywall_event row: its step, gate and the pass it names. */
export type PaywallRow = { at: Date; step: string; gate: string; planId: string | null };

/**
 * The pass to bring the student back to, or null. Read over the last 7 days:
 * the latest checkout opened names the pass; nothing on the day of that
 * checkout; nothing after a Not now; nothing once the bar has been seen on 2
 * earlier days. A checkout opened from the bar itself does not restart the
 * count, because the days are counted over the window, not since the open.
 */
export function leftCheckoutCandidate(rows: readonly PaywallRow[], now: Date): { planId: string; openedAt: Date } | null {
  const since = now.getTime() - LEFT_CHECKOUT_WINDOW_DAYS * DAY_MS;
  const inWindow = rows.filter((r) => r.at.getTime() >= since && r.at.getTime() <= now.getTime());
  const opens = inWindow
    .filter((r) => r.step === "checkout_opened" && r.planId)
    .sort((a, b) => b.at.getTime() - a.at.getTime());
  const latest = opens[0];
  if (!latest?.planId) return null;
  const today = istDayKey(now);
  if (istDayKey(latest.at) === today) return null;
  const own = inWindow.filter((r) => r.gate === LEFT_CHECKOUT_GATE);
  if (own.some((r) => r.step === "dismissed")) return null;
  const shownDays = new Set(own.filter((r) => r.step === "shown").map((r) => istDayKey(r.at)));
  shownDays.delete(today);
  if (shownDays.size >= LEFT_CHECKOUT_MAX_DAYS) return null;
  return { planId: latest.planId, openedAt: latest.at };
}

/**
 * Still worth the bar: no active pass covers the one they opened (however it
 * came, a comp included), and nothing has been bought since the checkout (a
 * student who opened Premium and then bought Practice has decided). A Practice
 * holder who left a Premium upgrade still sees it.
 */
export function stillUnpaid(
  candidate: { planId: string; openedAt: Date },
  grants: readonly Entitlement[],
  planScope: string,
  now: Date
): boolean {
  // scopeIncludes, as /pricing's "already yours": a Practice grant covers the
  // `mocks` request but does not own the Premium Pass, which adds downloads.
  if (grants.some((g) => isEntitlementActive(g, now.getTime()) && scopeIncludes(g.scope, planScope))) return false;
  return !grants.some((g) => g.source === "razorpay" && Date.parse(g.grantedAt) >= candidate.openedAt.getTime());
}

/**
 * The bar's two lines. The second is the owner's point (practice is what
 * raises the score), said as a general truth, the same line as the answer
 * limit's: never a figure of ours or a promise of marks.
 */
export function leftCheckoutCopy(pass: { label: string; length: string; downloads: boolean }): { title: string; body: string } {
  const forHowLong = pass.length === "lifetime" ? "for life" : `for ${pass.length}`;
  const what = pass.downloads ? "unlimited practice and PDF downloads" : "unlimited practice";
  return {
    title: "Your checkout didn't complete",
    body: `The ${pass.label} gives you ${what} ${forHowLong}, and the more questions you practise, the more marks you get.`,
  };
}

/** Where the bar was first shown today, kept in the browser. */
export type BarRecord = { day: string; path: string };

export const LEFT_CHECKOUT_STORAGE_KEY = "qb:left-checkout:v1";

/** The first page of the day shows the bar, and keeps it on a reload; the next page that day does not. */
export function showLeftCheckoutBar(record: BarRecord | null, today: string, path: string): boolean {
  return !record || record.day !== today || record.path === path;
}

export function parseBarRecord(raw: string | null): BarRecord | null {
  if (raw === null) return null;
  try {
    const v = JSON.parse(raw) as Record<string, unknown>;
    return typeof v?.day === "string" && typeof v.path === "string" ? { day: v.day, path: v.path } : null;
  } catch {
    return null;
  }
}
