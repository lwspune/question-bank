/**
 * Wording for the download box's offer to a visitor without the pass. Pure, so
 * it is unit-tested; the pass name, price and length come from the plan row
 * (`/dashboard/pricing`), never from here.
 */
export function gateTitle(count: number, passLabel: string): string {
  if (count <= 0) return `Download questions with ${passLabel}`;
  if (count === 1) return `Download this question with ${passLabel}`;
  return `Download these ${count.toLocaleString("en-IN")} questions with ${passLabel}`;
}

export function gatePriceLine(cta: { price: string; length: string }): string {
  return `${cta.price} · ${cta.length}`;
}
