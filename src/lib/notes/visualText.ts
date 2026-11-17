/**
 * What a notes visualization SAYS, read from its rendered markup, and the
 * rules an IMAT figure's words must keep. Shared by the gate
 * (tests/imat-notes-visuals.test.ts) and the drafting check
 * (scripts/imat/check-visuals.ts), so the two can never disagree.
 *
 * Why these rules: the IMAT notes are read on intl.pyqvault.com by students
 * sitting an Italian exam. A figure borrowed from another exam's notes must not
 * name that exam ("the NDA tests"), point at a question bank IMAT students do
 * not have, or price things in rupees. Owner rule 2026-10-05: no em dashes in
 * visible text, and a spaced en dash or double hyphen counts the same.
 */

/** The text a reader sees: tags dropped, entities decoded, spaces collapsed. */
export function visibleText(markup: string): string {
  return markup
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;|&apos;|&rsquo;/g, "'")
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCodePoint(Number(n)))
    .replace(/\s+/g, " ")
    .trim();
}

const OTHER_EXAM = /\b(NDA|JEE|MHT-CET|CET|CBSE|NCERT|AFCAT|CDS|SSC|NEET|UPSC|MPSC)\b/;
const BANK = /\bthe bank\b/i;
const RUPEE = /₹|\bRs\.?\s?\d/;
const DASH = /—| – | -- /;

export type VisualCheckOptions = {
  /** Fail on em dashes (true for figures written for IMAT; borrowed ones keep theirs). */
  noDashes?: boolean;
};

/** Problems with a figure's visible words, empty when it is fine for IMAT. */
export function visualTextProblems(markup: string, opts: VisualCheckOptions = {}): string[] {
  const problems: string[] = [];
  if (!markup.includes("<svg")) problems.push("draws no <svg>");
  const text = visibleText(markup);
  const exam = text.match(OTHER_EXAM);
  if (exam) problems.push(`names another exam: "${exam[0]}"`);
  if (BANK.test(text)) problems.push('mentions "the bank"');
  if (RUPEE.test(text)) problems.push("prices in rupees");
  if (opts.noDashes && DASH.test(text)) problems.push("has an em dash (or a spaced en dash / double hyphen)");
  return problems;
}
