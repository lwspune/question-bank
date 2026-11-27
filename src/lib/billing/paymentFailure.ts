/**
 * A failed Razorpay payment in plain words (2026-11-26, owner). Pure.
 *
 * WHY: since go-live 6 of 13 FamPay (`@fam`) payments failed with Razorpay's
 * "bank_account_invalid" ("Payment is not allowed for this account type"),
 * and the one student who hit it five times paid on the very next try each
 * time. Before this, a failure inside Razorpay's checkout left nothing behind:
 * closing it was recorded as a plain "dismissed", and a student who closed it
 * after a FamPay decline never heard that a second try usually works.
 *
 * Two readers: the checkout (useCheckout, ParentPayButton), which shows the
 * student a hint with a Try again button, and the owner's 6 pm follow-up
 * (./checkoutFollowup), which names what happened beside each student.
 * The browser only ever learns Razorpay's reason, never the UPI ID; the app
 * name is read server-side from Razorpay's own payment record.
 */

import { deviceLabel } from "./checkoutDevice";

export const FAILURE_KINDS = ["declined", "timed_out", "no_balance", "other"] as const;
export type FailureKind = (typeof FAILURE_KINDS)[number];

const KIND_SET: ReadonlySet<string> = new Set(FAILURE_KINDS);

export function isFailureKind(v: unknown): v is FailureKind {
  return typeof v === "string" && KIND_SET.has(v);
}

/** Razorpay's `error_reason` as one of four things a student can act on. */
export function failureKind(reason: string | null | undefined): FailureKind {
  switch (reason) {
    case "bank_account_invalid":
      return "declined";
    case "payment_timed_out":
      return "timed_out";
    case "insufficient_funds":
      return "no_balance";
    default:
      return "other";
  }
}

/** The UPI handles seen on our payments (26 Nov 2026), by app. */
const UPI_APPS: Record<string, string> = {
  fam: "FamPay",
  ybl: "PhonePe",
  ibl: "PhonePe",
  axl: "PhonePe",
  okaxis: "Google Pay",
  okhdfcbank: "Google Pay",
  oksbi: "Google Pay",
  okicici: "Google Pay",
  paytm: "Paytm",
  ptsbi: "Paytm",
  ptaxis: "Paytm",
  ptyes: "Paytm",
  pthdfc: "Paytm",
  yescred: "CRED",
  naviaxis: "Navi",
  superyes: "super.money",
};

/** The app behind a UPI ID, from its handle, or null when unknown. */
export function upiAppName(vpa: string | null | undefined): string | null {
  if (typeof vpa !== "string") return null;
  const at = vpa.lastIndexOf("@");
  if (at < 0) return null;
  return UPI_APPS[vpa.slice(at + 1).toLowerCase()] ?? null;
}

/** What the payer reads after closing a failed checkout. */
export function studentFailureHint(kind: FailureKind): string {
  switch (kind) {
    case "declined":
      return "Your UPI app declined the payment. This often works on a second try, especially on FamPay. Or pay with another UPI app.";
    case "timed_out":
      return "The payment wasn't approved in time. Tap Try again and approve it in your UPI app.";
    case "no_balance":
      return "The account didn't have enough balance. Try another account or UPI app.";
    default:
      return "The payment didn't go through. Try again, or pay with another UPI app.";
  }
}

function whatFailed(f: { kind: FailureKind; app: string | null }): string {
  switch (f.kind) {
    case "declined":
      return `payment failed: ${f.app ?? "their UPI app"} declined it`;
    case "timed_out":
      return "payment failed: not approved in time";
    case "no_balance":
      return "payment failed: not enough balance";
    default:
      return "payment failed";
  }
}

/** What the owner reads beside a student on the 6 pm list, with the phone and browser when the order recorded them. */
export function ownerFailureLabel(f: { kind: FailureKind; app: string | null; device?: string | null }): string {
  const device = deviceLabel(f.device);
  return device ? `${whatFailed(f)} (${device})` : whatFailed(f);
}

/** The fields of a Razorpay payment this reads (`created_at` in seconds). */
export type FailedPayment = {
  id: string;
  status: string;
  created_at: number;
  error_reason?: string | null;
  vpa?: string | null;
  notes?: Record<string, unknown> | unknown[] | null;
};

export type PaymentFailure = {
  kind: FailureKind;
  app: string | null;
  at: Date;
  /** What the order was for, from the notes the order route stamped. */
  planId: string | null;
  ebookSlug: string | null;
  /** The phone and browser the order was opened on (./checkoutDevice), null before 2026-11-27. */
  device: string | null;
};

function noteString(notes: FailedPayment["notes"], key: string): string | null {
  if (!notes || Array.isArray(notes)) return null;
  const v = (notes as Record<string, unknown>)[key];
  return typeof v === "string" && v ? v : null;
}

/** Each student's latest failed payment inside the window, by the userId the order notes carry. */
export function latestFailureByUser(
  payments: readonly FailedPayment[],
  window: { from: Date; to: Date }
): Map<string, PaymentFailure> {
  const from = window.from.getTime();
  const to = window.to.getTime();
  const out = new Map<string, PaymentFailure>();
  for (const p of payments) {
    if (p.status !== "failed") continue;
    const atMs = p.created_at * 1000;
    if (atMs < from || atMs > to) continue;
    const userId = noteString(p.notes, "userId");
    if (!userId) continue;
    const seen = out.get(userId);
    if (seen && seen.at.getTime() >= atMs) continue;
    out.set(userId, {
      kind: failureKind(p.error_reason),
      app: upiAppName(p.vpa),
      at: new Date(atMs),
      planId: noteString(p.notes, "planId"),
      ebookSlug: noteString(p.notes, "ebookSlug"),
      device: noteString(p.notes, "device"),
    });
  }
  return out;
}
