/**
 * A question's label as a printed paper shows it (2026-10-09): its own number
 * ("18 (b)"), its marks, and whether an "OR" line comes before it. Given to
 * both paper builders (docxBuilder, pdf/paperHtml) by a board past paper
 * download; without it they number questions 1, 2, 3 as always.
 * Contract: tests/board-paper-printed-labels.test.ts.
 */
export type PrintedLabel = {
  number: string;
  /** Null on a part of a question (0147): the question prints its marks once. */
  marks: number | null;
  orBefore: boolean;
};

/** "[2]": how both builders print a question's marks. */
export function marksTag(marks: number): string {
  return `[${marks}]`;
}
