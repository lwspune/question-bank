/**
 * What the return-check routes answer (2026-11-22): one shape for both, so the
 * two pages read it the same way. lib/billing/confirmOrder.ts decides the state.
 */
import { NextResponse } from "next/server";
import type { ConfirmState } from "./confirmOrder";

/** Razorpay order ids: one rule for the routes and the browser (lib/billing/orderId.ts). */
export { ORDER_ID_RE } from "./orderId";

/** Checks per caller an hour: a page asks once per return, so a few dozen covers any real buyer. */
export const RETURN_CHECKS_PER_HOUR = 60;
export const HOUR_MS = 3_600_000;

export function confirmResponse(state: ConfirmState): NextResponse {
  if (state === "not_found") return NextResponse.json({ error: "No such order." }, { status: 404 });
  if (state === "error") return NextResponse.json({ error: "Could not check the payment just now." }, { status: 502 });
  return NextResponse.json({ state });
}
