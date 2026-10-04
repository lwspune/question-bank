/**
 * Pass catalogue: the pure half. Plans live in `public.plans` (migration 0121)
 * and are edited at /dashboard/pricing; this module holds the type, the
 * validation the admin write runs, expiry math, and the order contract.
 *
 * WHAT STAYS IN CODE: the scopes. A scope is only worth selling if something
 * in code enforces it (the export route checks `teacher`, the mock trigger
 * checks `mocks`), so SELLABLE_SCOPES is a fixed list and the DB CHECK mirrors
 * it. Neither may include "all" — it satisfies every scope, so a ₹99 student
 * pass carrying it would unlock the teacher's Word downloads.
 *
 * THE ORDER IS THE CONTRACT: /api/billing/order stamps price, scope and
 * duration into the Razorpay order notes; verify and the webhook grant from
 * those notes and never re-read the plan. So a price edit, or deactivating a
 * plan, cannot reject a checkout that was open at the time.
 */
import { SCOPE_ALL, SCOPE_MOCKS, SCOPE_TEACHER } from "@/lib/entitlements/access";

export const SELLABLE_SCOPES: readonly string[] = [SCOPE_MOCKS, SCOPE_TEACHER];

export type Plan = {
  /** Stable slug, stamped into Razorpay order notes. Never reused. */
  id: string;
  /** Shown on /pricing and in the Terms. */
  label: string;
  /** One-line value prop for the pricing card. */
  blurb: string;
  /** Bullet points on the pricing card. */
  perks: string[];
  /** The `/pricing?plan=<urlKey>` value CTAs link by. Fixed at creation. */
  urlKey: string;
  /** Amount in paise (₹999 = 99900). Razorpay works in the smallest unit. */
  amountPaise: number;
  currency: "INR";
  /** Access length in days from purchase; null = lifetime. */
  durationDays: number | null;
  /** Entitlement scope granted (one of SELLABLE_SCOPES). */
  scope: string;
  /** Inactive plans are not shown or sold; kept because orders reference the id. */
  active: boolean;
  sortOrder: number;
};

export type PlanInput = Omit<Plan, "active">;

export type PlanValidation =
  | { ok: true }
  | { ok: false; field: keyof PlanInput; message: string };

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const MAX_PERKS = 6;

/** Field-level validation for an admin write, in form order. */
export function validatePlan(input: PlanInput): PlanValidation {
  if (!SLUG_RE.test(input.id)) {
    return { ok: false, field: "id", message: "Id must be a slug, e.g. mock-pass-6m." };
  }
  if (!input.label.trim()) return { ok: false, field: "label", message: "Label is required." };
  if (!input.blurb.trim()) return { ok: false, field: "blurb", message: "Blurb is required." };
  if (input.perks.length > MAX_PERKS || input.perks.some((p) => !p.trim())) {
    return { ok: false, field: "perks", message: `Up to ${MAX_PERKS} perks, none blank.` };
  }
  if (!SLUG_RE.test(input.urlKey)) {
    return { ok: false, field: "urlKey", message: "URL key must be a slug, e.g. teacher." };
  }
  if (!Number.isInteger(input.amountPaise) || input.amountPaise <= 0) {
    return { ok: false, field: "amountPaise", message: "Price must be a positive whole number of paise." };
  }
  if (input.currency !== "INR") return { ok: false, field: "currency", message: "Only INR is supported." };
  if (input.durationDays !== null && (!Number.isInteger(input.durationDays) || input.durationDays <= 0)) {
    return { ok: false, field: "durationDays", message: "Duration is blank (lifetime) or a positive number of days." };
  }
  if (input.scope === SCOPE_ALL || !SELLABLE_SCOPES.includes(input.scope)) {
    return { ok: false, field: "scope", message: `Scope must be one of: ${SELLABLE_SCOPES.join(", ")}.` };
  }
  if (!Number.isInteger(input.sortOrder)) {
    return { ok: false, field: "sortOrder", message: "Sort order must be a whole number." };
  }
  return { ok: true };
}

/** ISO expiry `durationDays` from `nowMs`; null for a lifetime plan. */
export function computeExpiry(nowMs: number, durationDays: number | null): string | null {
  if (durationDays === null) return null;
  return new Date(nowMs + durationDays * 86_400_000).toISOString();
}

/** Display helper: how long a plan lasts, e.g. "6 months", "1 year". */
export function planLengthLabel(plan: Pick<Plan, "durationDays">): string {
  if (plan.durationDays === null) return "lifetime";
  if (plan.durationDays === 365) return "1 year";
  if (plan.durationDays === 182) return "6 months";
  return `${plan.durationDays} days`;
}

/** Display helper: paise → "₹999". */
export function formatRupees(amountPaise: number): string {
  return `₹${(amountPaise / 100).toLocaleString("en-IN")}`;
}

/**
 * The pass a CTA offers for `scope`: active, EXACT scope (the teacher pass
 * covers mocks, but a student at the free-mock limit is offered the mock
 * pass), lowest sort order first. Null when nothing sells that scope.
 */
export function passForScope(plans: readonly Plan[], scope: string): Plan | null {
  const matches = plans
    .filter((p) => p.active && p.scope === scope)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.amountPaise - b.amountPaise);
  return matches[0] ?? null;
}

// ────────────────────────────────────────────────────────────────────
// The order contract
// ────────────────────────────────────────────────────────────────────

/** Razorpay notes are string-valued. Written by /api/billing/order only. */
export function stampOrderNotes(plan: Plan, userId: string): Record<string, string> {
  return {
    userId,
    planId: plan.id,
    amountPaise: String(plan.amountPaise),
    currency: plan.currency,
    scope: plan.scope,
    durationDays: plan.durationDays === null ? "" : String(plan.durationDays),
  };
}

/** The fields of a Razorpay order that decide what it bought. */
export type PaidOrder = {
  status?: string;
  amount_paid?: number;
  currency?: string;
  notes?: Record<string, string> | null;
};

export type OrderGrant = { planId: string; scope: string; durationDays: number | null };

/**
 * What a paid order grants, for the account claiming it — decided from the
 * order Razorpay holds, never from the caller. The plan itself is not
 * consulted: the notes ARE the price and terms the buyer accepted.
 */
export function planForPaidOrder(
  order: PaidOrder,
  sessionUserId: string
): { ok: true; grant: OrderGrant } | { ok: false; reason: string } {
  if (order.status !== "paid") return { ok: false, reason: "order not paid" };
  const notes = order.notes ?? {};
  if (!notes.userId || notes.userId !== sessionUserId) {
    return { ok: false, reason: "order belongs to another account" };
  }
  const amount = Number(notes.amountPaise);
  if (!notes.planId || !Number.isInteger(amount) || amount <= 0 || !notes.currency) {
    return { ok: false, reason: "order notes incomplete" };
  }
  if (!notes.scope || notes.scope === SCOPE_ALL || !SELLABLE_SCOPES.includes(notes.scope)) {
    return { ok: false, reason: "order notes carry an unsellable scope" };
  }
  if (!("durationDays" in notes)) return { ok: false, reason: "order notes incomplete" };
  let durationDays: number | null = null;
  if (notes.durationDays !== "") {
    const d = Number(notes.durationDays);
    if (!Number.isInteger(d) || d <= 0) return { ok: false, reason: "order notes incomplete" };
    durationDays = d;
  }
  if (order.amount_paid !== amount || order.currency !== notes.currency) {
    return { ok: false, reason: "amount does not match order" };
  }
  return { ok: true, grant: { planId: notes.planId, scope: notes.scope, durationDays } };
}

/**
 * What a client component needs to offer a pass: serialisable, no scope or
 * amounts. Built on the server from passForScope; null when nothing sells
 * that scope, and the CTA then falls back to plain /pricing. `planId` and
 * `perks` let the download box sell in place (2026-10-04); the order route
 * re-reads the plan by id, so a client cannot choose its own price.
 */
export type PassCta = {
  planId: string;
  label: string;
  price: string;
  length: string;
  urlKey: string;
  perks: string[];
};

export function passCta(plan: Plan | null): PassCta | null {
  if (!plan) return null;
  return {
    planId: plan.id,
    label: plan.label,
    price: formatRupees(plan.amountPaise),
    length: planLengthLabel(plan),
    urlKey: plan.urlKey,
    perks: [...plan.perks],
  };
}
