/**
 * Remove the "for the (count) items that follow" claim from a verbatim PYQ
 * passage at render time. The export's set banner already names the
 * questions explicitly ("Common context for questions X-Y:"), so leaving
 * the passage's hard-coded count in place would contradict the banner
 * whenever the user exports a subset of the original set.
 *
 * Bank text stays verbatim; only the rendered output is normalised.
 *
 * Handles:
 *   - "for the three (03) items that follow"
 *   - "for the next two (02) items that follow"
 *   - "for the next four items that follow"
 *   - "for the 5 items that follow"
 *   - "for the next 1 item that follows" (singular)
 *
 * Leaves untouched any passage that doesn't carry the pattern (no count
 * word between "the" and "items").
 */

const NUMBER_WORDS = "one|two|three|four|five|six|seven|eight|nine|ten";
const COUNT_PHRASE_RE = new RegExp(
  String.raw`\bfor\s+(?:the\s+next\s+|the\s+)(?:${NUMBER_WORDS}|\d+)\s*(?:\(\d+\)\s*)?(items?\s+that\s+follows?)`,
  "gi"
);

export function stripPassageCountPhrase(passage: string): string {
  return passage.replace(COUNT_PHRASE_RE, "for the $1");
}
