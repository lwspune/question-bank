/**
 * Getting a buyer back to what they were doing. A student blocked at a mock's
 * Start button, or a teacher at the Word-download gate, goes to /pricing with a
 * `next` path, and lands back there once the pass is granted. Pure — unit-tested
 * in tests/billing-checkout-return.test.ts.
 */
import { safeNextPath } from "@/lib/auth/redirect";
import { isEntitlementActive, type EntitlementStatus } from "@/lib/entitlements/access";

const NO_PATH = "";

/** `/pricing?plan=<key>`, plus `&next=<path>` when the return path is a safe in-site path. */
export function pricingHref(urlKey: string | null, returnTo?: string): string {
  const params = new URLSearchParams();
  if (urlKey) params.set("plan", urlKey);
  const next = returnTo ? safeNextPath(returnTo, NO_PATH) : NO_PATH;
  if (next) params.set("next", next);
  const qs = params.toString();
  return qs ? `/pricing?${qs}` : "/pricing";
}

/** Where to land after a successful payment: the safe `next`, else /account. Never /pricing. */
export function afterPurchasePath(rawNext: unknown): string {
  const next = safeNextPath(rawNext, "/account");
  return next === "/pricing" || next.startsWith("/pricing?") ? "/account" : next;
}

type PassRow = { scope: string; status: EntitlementStatus; expiresAt: string | null; source: string };

/** One active grant per scope (the longest-lasting), longest-lasting first. */
export function activePassesByScope<T extends PassRow>(rows: readonly T[], nowMs: number): T[] {
  const lastsLonger = (a: T, b: T) => {
    if (a.expiresAt === b.expiresAt) return 0;
    if (a.expiresAt === null) return -1;
    if (b.expiresAt === null) return 1;
    return Date.parse(b.expiresAt) - Date.parse(a.expiresAt);
  };
  const best = new Map<string, T>();
  for (const r of rows) {
    if (!isEntitlementActive(r, nowMs)) continue;
    const held = best.get(r.scope);
    if (!held || lastsLonger(r, held) < 0) best.set(r.scope, r);
  }
  return [...best.values()].sort(lastsLonger);
}
