/**
 * Pure rules for auditing a /notes chapter `intro` (and the subtopic prose
 * around it). Shared by the prod-contract gate (tests/notes-intro-counts
 * .test.ts) and the triage probe (scripts/notes-intro-audit.ts) so the two
 * cannot answer the same question differently.
 *
 * Spec: tests/notes-intro-audit.test.ts.
 */

/**
 * "165 past-year questions", "40 PYQs", and the HYPHENATED attributive form
 * "a steady 63-PYQ chapter", which a whitespace-only separator misses — that
 * gap was real: Differential Equations sat at a stale 63 through a whole
 * backfill pass because of it.
 *
 * TWO DIGITS MINIMUM, deliberately. "roughly one to two questions on every
 * shift" has no digits at all, and a single digit in this prose is almost
 * always a count of TECHNIQUES ("4 recognitions cover them"), not of bank
 * rows. Requiring two digits costs a real claim only for chapters under ten
 * questions, which are too thin to have notes at all.
 */
const COUNT_CLAIM = /(\d{2,4})[\s-]+(?:past-year[\s-]+)?(?:PYQs?|questions)/gi;

/** Every bank-size claim stated in `text`, in the order they appear. */
export function extractCountClaims(text: string): number[] {
  return [...text.matchAll(COUNT_CLAIM)].map((m) => Number(m[1]));
}

/**
 * The counts a chapter's prose may legitimately state: its own total, any one
 * subtopic's count, or the sum of TWO subtopics.
 *
 * The pair sum is not a loophole — it is how these intros actually talk.
 * Mathematical Logic says "drill Negation and Finding Truth Values first — 30
 * questions" (14 + 16), and Indefinite Integration refers to "the chapter's 47
 * trig integrals" (12 + 35). Without it, a backfill would "correct" a right
 * number into a wrong one. A subtopic is never paired with itself.
 */
export function allowedCounts(
  chapterTotal: number,
  subtopicCounts: readonly number[]
): Set<number> {
  const allowed = new Set<number>([chapterTotal, ...subtopicCounts]);
  for (let i = 0; i < subtopicCounts.length; i++) {
    for (let j = i + 1; j < subtopicCounts.length; j++) {
      allowed.add(subtopicCounts[i] + subtopicCounts[j]);
    }
  }
  return allowed;
}

/**
 * How many items a `(1) … (2) … (3) …` prose list enumerates — the shape a
 * chapter intro takes when it lists its own subtopics.
 *
 * The run must START at (1) and ascend by one. That is what rules out the two
 * false positives in this corpus: "the linear-argument (1/a) rule" is not a
 * marker at all (no closing paren after the digits), and a back-reference like
 * "see (2) above" does not open a list.
 *
 * Why this is worth measuring: whatever the intro enumerates, the chapter
 * landing already renders directly beneath it as one card per subtopic, with a
 * one-line definition and a LIVE count. The prose copy is the same information
 * twice and is the copy that goes stale.
 */
export function enumeratedItems(text: string): number {
  const markers = [...text.matchAll(/\((\d+)\)/g)].map((m) => Number(m[1]));
  let n = 0;
  for (const marker of markers) {
    if (marker !== n + 1) break;
    n++;
  }
  return n;
}

/**
 * Words in the longest sentence of `text`.
 *
 * Splits at `.`/`!`/`?` FOLLOWED BY WHITESPACE, the same naive-but-safe rule
 * `firstSentence` uses in cardBlurb.ts — a decimal ("2.5 metres") is safe
 * because no space follows its point.
 *
 * A long sentence is the readable symptom of the enumeration: the six-movement
 * list reaches 156 words in one sentence, rendered as a single unbroken <p>.
 */
export function longestSentenceWords(text: string): number {
  return text
    .split(/[.!?](?=\s)/)
    .map((s) => s.trim())
    .filter(Boolean)
    .reduce((max, s) => Math.max(max, s.split(/\s+/).length), 0);
}

/**
 * Numbers in a chapter's prose that are NOT bank counts, as
 * `<subjectRoute>/<chapterSlug>` → the exempt values.
 *
 * Declared rather than absorbed into a looser regex, so each one stays a human
 * decision visible in review — and declared HERE rather than in the gate, so
 * the gate and `npm run notes:intro` cannot disagree about what counts as a
 * claim. They did briefly: the probe reported a finding the gate exempted.
 */
export const NON_BANK_NUMBERS: Record<string, readonly number[]> = {
  // "100 questions in 120 minutes at plus one and minus one-third" — the shape
  // of the CDS paper, not a claim about our bank.
  "cds-maths/number-system": [100],
};

/** True when `n` is a declared non-bank number for that chapter route. */
export function isExemptCount(route: string, n: number): boolean {
  return (NON_BANK_NUMBERS[route] ?? []).includes(n);
}
