/**
 * Converting a bank question count into the marks it is worth in ONE paper.
 *
 * The guide's chapter table sizes chapters by their share of a multi-paper
 * bank, which is honest but abstract — a student thinks in marks, not in
 * percent. `marksPerPaper` restates the same number in the exam's own
 * currency: how many of the paper's marks that chapter typically carries.
 *
 * It is deliberately DERIVED at render rather than stored alongside qCount,
 * so the marks column can never drift away from the question count it comes
 * from. Note it is arithmetically equivalent to (share of bank x paper
 * marks) — it adds framing, not new measurement.
 */

export type Marking = {
  /** How many complete papers the bank spans. */
  papers: number;
  /** Marks awarded per correct answer. */
  marksPerQuestion: number;
  /** Total marks available in one paper. */
  paperMarks: number;
};

/**
 * Marks a chapter (or subtopic) is typically worth in a single paper.
 *
 * Rounded to one decimal so small chapters stay visible — a 5-question
 * chapter reads as 0.7 marks rather than collapsing to 0.
 */
export function marksPerPaper(
  qCount: number,
  marking: Pick<Marking, "papers" | "marksPerQuestion">
): number {
  if (marking.papers <= 0 || qCount <= 0) return 0;
  const marks = (qCount / marking.papers) * marking.marksPerQuestion;
  return Math.round(marks * 10) / 10;
}

/**
 * A slice's share of the whole bank, as a percentage to one decimal.
 *
 * Used for both chapter and subtopic rows so the Share column means exactly
 * one thing everywhere it appears — a subtopic's shares therefore add up to
 * its chapter's, and a reader never has to ask "share of what?".
 */
export function shareOfBank(qCount: number, totalQ: number): number {
  if (totalQ <= 0 || qCount <= 0) return 0;
  return Math.round((qCount / totalQ) * 1000) / 10;
}
