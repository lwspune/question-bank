/**
 * The order contract for an ebook. Pure.
 *
 * Same rule as the pass (lib/billing/plans.ts): /api/billing/order stamps what
 * is being bought and the price charged into the Razorpay order notes, and
 * verify + the webhook grant from those notes, never from the request or the
 * catalogue. So a price edited while a checkout is open cannot reject it, and
 * a client cannot pick its own price.
 *
 * `kind: "ebook"` is the switch. A pass order has no `kind`; planForPaidOrder
 * refuses an ebook order because its notes carry no sellable scope, and
 * ebookForPaidOrder refuses a pass order because it carries no `kind`. So
 * neither grant path can hand out the other's product.
 */
import type { PaidOrder } from "@/lib/billing/plans";

export const EBOOK_ORDER_KIND = "ebook";

export function stampEbookOrderNotes(
  book: { slug: string; listPaise: number; amountPaise: number },
  userId: string
): Record<string, string> {
  return {
    kind: EBOOK_ORDER_KIND,
    userId,
    ebookSlug: book.slug,
    amountPaise: String(book.amountPaise),
    listPaise: String(book.listPaise),
    currency: "INR",
  };
}

export function isEbookOrder(notes: Record<string, string> | null | undefined): boolean {
  return notes?.kind === EBOOK_ORDER_KIND;
}

export type EbookGrant = { ebookSlug: string; amountPaise: number };

export function ebookForPaidOrder(
  order: PaidOrder,
  sessionUserId: string
): { ok: true; grant: EbookGrant } | { ok: false; reason: string } {
  if (order.status !== "paid") return { ok: false, reason: "order not paid" };
  const notes = order.notes ?? {};
  if (!isEbookOrder(notes)) return { ok: false, reason: "not an ebook order" };
  if (!notes.userId || notes.userId !== sessionUserId) {
    return { ok: false, reason: "order belongs to another account" };
  }
  const amount = Number(notes.amountPaise);
  if (!notes.ebookSlug || !Number.isInteger(amount) || amount <= 0 || !notes.currency) {
    return { ok: false, reason: "order notes incomplete" };
  }
  if (order.amount_paid !== amount || order.currency !== notes.currency) {
    return { ok: false, reason: "amount does not match order" };
  }
  return { ok: true, grant: { ebookSlug: notes.ebookSlug, amountPaise: amount } };
}
