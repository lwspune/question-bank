import type { PassCta } from "@/lib/billing/plans";

/**
 * The sentence on the "free tests used up" card. On a whole past paper it also
 * names the paper's PDF download (2026-10-07): a student flicking through
 * papers wanted the paper itself. Everywhere else it is the sentence it was.
 */
export function lockedPassLine({
  pass,
  plural,
  isPastPaper,
}: {
  pass: Pick<PassCta, "label" | "length" | "price"> | null;
  plural: string;
  isPastPaper: boolean;
}): string {
  if (!pass) {
    return isPastPaper
      ? `A pass unlocks unlimited ${plural} and past-paper downloads. `
      : `A pass unlocks unlimited ${plural}. `;
  }
  return isPastPaper
    ? `Get the ${pass.label} for unlimited ${plural} and every past paper as a PDF with its answer key, for ${pass.length}, for ${pass.price}. `
    : `Get the ${pass.label} for unlimited ${plural} for ${pass.length}, for ${pass.price}. `;
}
