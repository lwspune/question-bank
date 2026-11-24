/**
 * Razorpay order ids, checked before any call leaves our server, and before
 * the browser keeps one to finish a payment the student came back from.
 *
 * Its own file, with no imports, so browser code can use it without reaching
 * `next/server`: it lived in lib/billing/returnCheckHttp.ts, which imports
 * NextResponse for the routes, and that one import put Next's whole server
 * toolkit on every page (PAGE_WEIGHT_SPEC.md item 3, 2026-11-25).
 */
export const ORDER_ID_RE = /^order_[A-Za-z0-9]{1,40}$/;
