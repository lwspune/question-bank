/**
 * The answer to a question as every display prints it: the card, the Word and PDF answer keys,
 * the ebook, the classroom projector. One function so they cannot drift (migration 0214 brought
 * two new shapes): a multiple-select key is EVERY correct letter ("A, C"), and a numeric answer
 * keyed as a range prints as "132.8 to 133.1". Null when there is no key to print; never a guess.
 * Spec: tests/format-key.test.ts.
 */

export type KeySource = {
  questionFormat?: "mcq" | "subjective" | "numeric" | "msq" | null;
  options: readonly { label: string; isCorrect: boolean }[];
  numericAnswer?: number | null;
  numericAnswerMax?: number | null;
};

/** "plain": B / A, C. "paper": (b) / (a), (c), the printed papers' lowercase labels. */
export function formatKey(q: KeySource, opts: { style?: "plain" | "paper" } = {}): string | null {
  if (q.questionFormat === "subjective") return null;
  if (q.questionFormat === "numeric") return formatNumericKey(q.numericAnswer ?? null, q.numericAnswerMax ?? null);
  const labels = q.options.filter((o) => o.isCorrect).map((o) => o.label).sort();
  if (labels.length === 0) return null;
  // An MCQ prints its one letter even if bad data marked two; only an MSQ lists a set.
  const shown = q.questionFormat === "msq" ? labels : labels.slice(0, 1);
  return opts.style === "paper" ? shown.map((l) => `(${l.toLowerCase()})`).join(", ") : shown.join(", ");
}

/** An exact numeric answer, or "min to max" when keyed as a range. */
export function formatNumericKey(value: number | null, max: number | null): string | null {
  if (value === null) return null;
  return max !== null && max !== value ? `${value} to ${max}` : String(value);
}
