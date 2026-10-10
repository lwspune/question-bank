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

/** The one line about the pass a SIGNED-OUT visitor sees in a download box
 *  (2026-10-10). Clarity: of the signed-out visitors who opened the box, none
 *  tapped sign-in, and the box led with the ₹99 pass and six selling points
 *  while the free paper sat in small print at the bottom. Now the free paper
 *  leads and the pass is this sentence. */
export function freeFirstPassLine(cta: { label: string; price: string; length: string }): string {
  return `After your free paper, more papers come with ${cta.label} (${cta.price} for ${cta.length}).`;
}

/** The pass's perks with the download one first, for the download boxes, where
 *  downloading is what the student came for (2026-10-07). The rest keep the
 *  order set at /dashboard/pricing. Spec: tests/free-paper.test.ts. */
export function downloadPerksFirst(perks: readonly string[]): string[] {
  const isDownload = (p: string) => /download/i.test(p);
  return [...perks.filter(isDownload), ...perks.filter((p) => !isDownload(p))];
}
