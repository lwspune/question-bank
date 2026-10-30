/**
 * The pass offer's wording to a signed-in student without the pass
 * (2026-10-25): the download boxes and the reveal wall. Pure, so it is
 * unit-tested (tests/billing-offer-copy.test.ts). The pass name, price, length
 * and perks come from the plan row (`/dashboard/pricing`), never from here.
 */
import type { DownloadBox } from "@/lib/activity/clientEvents";
import { downloadPerksFirst } from "@/lib/billing/gateCopy";

/** What the student gets, named for the box they opened. */
export function offerTitle(box: DownloadBox, count = 0): string {
  switch (box) {
    case "browse":
      if (count === 1) return "Get this question as a PDF";
      return `Get these ${count.toLocaleString("en-IN")} questions as a PDF`;
    case "mock":
    case "board_paper":
      return "Get this paper as a PDF";
    case "top_pyqs":
      return "Get the Top 10 PYQs as a PDF";
    case "formula":
      return "Get this formula sheet as a PDF";
    case "homework":
      return "Get this homework as a PDF";
  }
}

/** What the PDF is for: the line under the title. */
export function offerLine(box: DownloadBox): string {
  switch (box) {
    case "mock":
    case "board_paper":
      return "Print it, sit it against the clock, then mark yourself with the answer key.";
    case "formula":
      return "Every formula in this chapter on one A4 page, to print and revise from.";
    default:
      return "Print them, sit them against the clock, then mark yourself with the answer key.";
  }
}

/** "Unlimited answers (free: 20 a day)" -> "Unlimited answers": the limit is the free plan's, not the pass's. */
export function stripFreeNote(perk: string): string {
  return perk.replace(/\s*\(free:[^)]*\)\s*$/i, "");
}

/** "Unlimited saved questions" -> "unlimited saved questions", but "PDF ..." keeps its capital. */
function midSentence(s: string): string {
  return /^[A-Z][a-z]/.test(s) ? s[0].toLowerCase() + s.slice(1) : s;
}

/** Downloads first, three shown, the rest on one "Also:" line. */
export function splitOfferPerks(perks: readonly string[], shown = 3): { main: string[]; also: string | null } {
  const all = downloadPerksFirst(perks).map(stripFreeNote);
  const rest = all.slice(shown);
  return {
    main: all.slice(0, shown),
    also: rest.length ? `Also: ${rest.map(midSentence).join(", ")}.` : null,
  };
}

/** For the reveal wall: everything the pass gives besides the answers it is already selling. */
export function otherBenefits(perks: readonly string[]): string[] {
  return downloadPerksFirst(perks)
    .filter((p) => !/\banswers\b/i.test(p))
    .map(stripFreeNote);
}

/** The pass's length in months, or null when a month figure would mislead (a month or less, lifetime). */
function lengthInMonths(length: string): number | null {
  const m = /^(\d+)\s*(month|months|year|years|day|days)$/i.exec(length.trim());
  if (!m) return null;
  const n = Number(m[1]);
  const unit = m[2].toLowerCase();
  const months = unit.startsWith("year") ? n * 12 : unit.startsWith("day") ? n / 30 : n;
  return months > 1 ? months : null;
}

/** "about ₹33 a month" (or "about $3 a month" for the intl pass), or null when it cannot be worked out honestly. */
export function perMonthLine(cta: { price: string; length: string }): string | null {
  const price = /^([₹$])\s?([\d,]+(?:\.\d+)?)$/.exec(cta.price.trim());
  const months = lengthInMonths(cta.length);
  if (!price || !months) return null;
  const amount = Number(price[2].replace(/,/g, ""));
  const locale = price[1] === "$" ? "en-US" : "en-IN";
  return `about ${price[1]}${Math.round(amount / months).toLocaleString(locale)} a month`;
}

/** "₹199 for 6 months". */
export function offerPriceLine(cta: { price: string; length: string }): string {
  return cta.length === "lifetime" ? `${cta.price} for life` : `${cta.price} for ${cta.length}`;
}
