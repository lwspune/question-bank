/**
 * Marking-scheme copy for the mock instructions + runner screens.
 *
 * WHY THIS IS A MODULE AND NOT INLINE JSX: the instructions page hard-coded a
 * marking scheme that happened to be true for the only three exams it had ever
 * served (NDA, NEET, CDS — all with a penalty). MHT-CET is the first exam in the
 * bank with NO negative marking, and the old copy rendered, for it:
 *
 *     "0 marks for every wrong answer (negative marking)."
 *     "0 marks for un-attempted questions - skip if unsure."
 *
 * The first asserts a rule the exam does not have. The second is STRICTLY
 * HARMFUL: with no penalty a guess is never worse than a blank, so "skip if
 * unsure" costs marks. It would also have contradicted our own MHT-CET guide,
 * which sets targetAttempts to the full paper for exactly this reason — on the
 * page a student reads immediately before starting.
 *
 * A default that is defensible for the cases its author had silently becomes a
 * false assertion for the first case they did not. Pure, so the zero-penalty
 * branch is provable without rendering the page.
 */

export type Marking = { correct: number; wrong: number };

export type MarkingCopy = {
  /** False when the exam deducts nothing for a wrong answer. */
  hasPenalty: boolean;
  /** Signed, display-rounded marks for a correct answer, e.g. "+2.5". */
  correctValue: string;
  /** Marks for a wrong answer: "-0.83", or a bare "0" when there is no penalty. */
  wrongValue: string;
  /** Trailing clause for the wrong-answer line. */
  wrongNote: string;
  /** What to do when unsure — the half that used to be actively wrong. */
  unattemptedAdvice: string;
};

/**
 * Round to 2dp for display and drop trailing zeros, so an integer scheme reads
 * "+2" rather than "+2.00" and CDS's -0.2778 reads "-0.28".
 */
function fmt(v: number, signed: boolean): string {
  const rounded = Math.round(v * 100) / 100;
  const body = String(rounded);
  return signed && rounded > 0 ? `+${body}` : body;
}

export function markingCopy(marking: Marking): MarkingCopy {
  const hasPenalty = marking.wrong !== 0;
  return {
    hasPenalty,
    correctValue: fmt(marking.correct, true),
    // A zero penalty prints as a bare "0" — "+0" or "-0" both read as a scheme.
    wrongValue: hasPenalty ? fmt(marking.wrong, false) : "0",
    wrongNote: hasPenalty
      ? "marks for every wrong answer (negative marking)."
      : "marks for a wrong answer — this exam has no negative marking.",
    unattemptedAdvice: hasPenalty
      ? "marks for un-attempted questions — skip if unsure."
      : "marks for un-attempted questions — a blank scores the same as a wrong answer, so never leave one.",
  };
}
