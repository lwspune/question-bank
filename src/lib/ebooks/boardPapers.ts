/**
 * Which stored board papers (migration 0146) a Solved Papers book prints, in
 * print order (2026-10-26). PURE. Spec: tests/ebook-board-papers.test.ts.
 *
 * - "every": Maharashtra prints one paper per sitting, so the book carries all
 *   of them, supplementary sittings included.
 * - "first-set-per-year": CBSE prints about fifteen papers a year (paper codes
 *   x 3 sets); all of them would make a 1,300-3,500 page book, so it carries
 *   one a year (owner, 2026-10-25): the lowest paper code, its lowest set.
 *
 * Newest first: the latest paper is the one a student sits first.
 */
import type { PaperListing } from "@/lib/questionPapers/listing";

export type BookPaperRule = "every" | "first-set-per-year";

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

/** A sitting's month (0-11); a paper with no sitting is the year's main one, in March. */
function monthOf(p: Pick<PaperListing, "sitting">): number {
  const m = MONTHS.indexOf((p.sitting ?? "").trim().toLowerCase());
  return m === -1 ? 2 : m;
}

const byCode = (a: PaperListing, b: PaperListing) =>
  a.groupSlug.localeCompare(b.groupSlug, "en", { numeric: true }) || (a.setNumber ?? 0) - (b.setNumber ?? 0);

export function pickBookPapers(papers: readonly PaperListing[], rule: BookPaperRule): PaperListing[] {
  let chosen: PaperListing[];
  if (rule === "every") {
    chosen = [...papers];
  } else {
    const firstOfYear = new Map<number, PaperListing>();
    for (const p of [...papers].sort(byCode)) if (!firstOfYear.has(p.year)) firstOfYear.set(p.year, p);
    chosen = [...firstOfYear.values()];
  }
  return chosen.sort((a, b) => b.year - a.year || monthOf(b) - monthOf(a));
}
