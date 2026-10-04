/**
 * Wording for the download box's offer to a visitor without the pass. Pure, so
 * it is unit-tested; the pass name, price and length come from the plan row
 * (`/dashboard/pricing`), never from here.
 */

/** "Download these 48 questions": the selection alone (the first file is free). */
export function selectionTitle(count: number): string {
  if (count <= 0) return "Download questions";
  if (count === 1) return "Download this question";
  return `Download these ${count.toLocaleString("en-IN")} questions`;
}

/** "Download these 48 questions with Premium Pass": once the free file is spent. */
export function gateTitle(count: number, passLabel: string): string {
  return `${selectionTitle(count)} with ${passLabel}`;
}

export function gatePriceLine(cta: { price: string; length: string }): string {
  return `${cta.price} · ${cta.length}`;
}
