/**
 * The browser's note of an open checkout (2026-11-22): which order it opened,
 * and when. A page that comes back after a UPI app (or a reload) reads it and
 * asks the server whether that order was paid (lib/billing/confirmOrder.ts).
 *
 * localStorage, not sessionStorage: a phone that drops the tab while the UPI
 * app is open may bring the page back in a fresh tab. Every access is guarded,
 * because storage can be blocked (private mode, cleared site data), and then
 * the page simply does not check; the webhook and the payment check remain.
 */
import { ORDER_ID_RE } from "./returnCheckHttp";

/** A UPI payment that has not landed in half an hour is not coming back to this page. */
export const PENDING_ORDER_MAX_AGE_MS = 30 * 60 * 1000;

/** The student's checkout. */
export const STUDENT_PENDING_KEY = "qb_pending_order";
/** A parent's page, per link. */
export const parentPendingKey = (code: string) => `qb_pending_parent_order:${code}`;

export function rememberPendingOrder(storage: Storage | null, key: string, orderId: string, nowMs: number): void {
  try {
    storage?.setItem(key, JSON.stringify({ orderId, at: nowMs }));
  } catch {
    // Storage blocked: no return check on this device.
  }
}

export function readPendingOrder(storage: Storage | null, key: string, nowMs: number): string | null {
  try {
    const raw = storage?.getItem(key);
    if (!raw) return null;
    const v = JSON.parse(raw) as { orderId?: unknown; at?: unknown };
    if (typeof v.orderId !== "string" || !ORDER_ID_RE.test(v.orderId) || typeof v.at !== "number") return null;
    return nowMs - v.at <= PENDING_ORDER_MAX_AGE_MS ? v.orderId : null;
  } catch {
    return null;
  }
}

export function forgetPendingOrder(storage: Storage | null, key: string): void {
  try {
    storage?.removeItem(key);
  } catch {
    // Storage blocked: nothing was kept.
  }
}

/** The page's storage, or null where there is none (server render) or it is blocked. */
export function browserStorage(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}
