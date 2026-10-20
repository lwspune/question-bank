/**
 * What an ebook costs a given buyer. Pure.
 *
 * Ebooks are sold apart from the Premium Pass (owner, 2026-10-20): the store is
 * an experiment in whether students pay for a whole book, and folding books
 * into the pass would hide exactly that. A pass holder gets 20% off instead,
 * rounded to whole rupees so the price reads like a price (₹119, not ₹119.20).
 */
export const PASS_HOLDER_DISCOUNT = 0.2;

export function ebookPricePaise(listPaise: number, isPassHolder: boolean): number {
  if (!isPassHolder) return listPaise;
  const rupees = Math.round((listPaise * (1 - PASS_HOLDER_DISCOUNT)) / 100);
  return Math.max(100, rupees * 100);
}
