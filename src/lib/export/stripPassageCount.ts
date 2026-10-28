/**
 * Remove the "for the (count) items that follow" claim from a verbatim PYQ
 * passage at render time. The export's set banner already names the
 * questions explicitly ("Common context for questions X-Y:"), so leaving
 * the passage's hard-coded count in place would contradict the banner
 * whenever the user exports a subset of the original set.
 *
 * Bank text stays verbatim; only the rendered output is normalised.
 *
 * Handles, with the count as a word or a numeral and an optional bracketed
 * copy before or after "items":
 *   - "for the three (03) items that follow"
 *   - "for the next two (02) items that follow" / "for the next 02 (two) items:"
 *   - "For the following two (02) items:"     (keeps "following")
 *   - "answer the two items (02) that follow"
 *   - "for the next 1 item that follows"      (singular)
 *
 * A count needs "next" or "following" before it, or "that follow" after the
 * items, before it is stripped: "sold the two items at a profit" is content.
 */

const NUMBER_WORDS = "one|two|three|four|five|six|seven|eight|nine|ten";
const COUNT = String.raw`(?:${NUMBER_WORDS}|\d+)`;
const BRACKET = String.raw`\(\s*${COUNT}\s*\)`;

/** "the next two (02) items" / "the following 02 (two) items" */
const LEAD_IN_RE = new RegExp(
  String.raw`\b(the\s+)(?:next\s+|(following\s+))${COUNT}\s*(?:${BRACKET}\s*)?(items?)\b(?:\s*${BRACKET})?`,
  "gi"
);

/** "the three (03) items that follow" / "the two items (02) that follow" */
const THAT_FOLLOW_RE = new RegExp(
  String.raw`\b(the\s+)${COUNT}\s*(?:${BRACKET}\s*)?(items?)(?:\s*${BRACKET})?(\s+that\s+follows?)`,
  "gi"
);

export function stripPassageCountPhrase(passage: string): string {
  return passage
    .replace(LEAD_IN_RE, (_m, the: string, following: string | undefined, items: string) =>
      `${the}${following ?? ""}${items}`
    )
    .replace(THAT_FOLLOW_RE, "$1$2$3");
}
