/**
 * Numbering for the printed chapter. Pure — the component supplies the
 * sections and asks for the answers.
 *
 * ONE PASS PRODUCES BOTH the paper's numbers and the key's rows, deliberately.
 * The answer key sits at the end of each chapter and refers to questions by
 * number; numbering them separately is how a book ends up with every question
 * present, every answer present, and each pointing at the other's neighbour —
 * an error nothing downstream can detect, because both halves look complete.
 */
import type { BookSection } from "./order";

export type KeyRow = {
  questionId: string;
  /** The number printed beside the question in the paper. */
  n: number;
  /** Lower-case option label, or null when the question has no marked answer. */
  letter: string | null;
};

export type ChapterNumbering = {
  /** question id -> printed number. Insertion order IS print order. */
  numberOf: Map<string, number>;
  keyRows: KeyRow[];
  /** Questions actually printed (excludes curated-out rows). */
  total: number;
};

/**
 * Number a chapter's questions in print order.
 *
 * Excluded questions are absent AND unnumbered: a curated-out question is not
 * in the book, and leaving a gap in the sequence would read as a typesetting
 * fault rather than a decision.
 *
 * `correctLabelOf` is injected so this stays free of the question row shape and
 * testable without fixtures; it returns the correct option's label, or null
 * when the question has no marked answer.
 */
export function numberChapter(
  sections: BookSection[],
  excludedIds: string[],
  correctLabelOf: (questionId: string) => string | null = () => null
): ChapterNumbering {
  const excluded = new Set(excludedIds);
  const numberOf = new Map<string, number>();
  const keyRows: KeyRow[] = [];

  let n = 0;
  for (const section of sections) {
    // Follow the RENDERED order. Where a chapter groups by subtopic the blocks
    // reorder its sets, so numbering off the flat `sets` list would print 1, 2,
    // 3 down the page in some other sequence — and the key would then point at
    // the wrong questions.
    const runs = section.blocks
      ? section.blocks.map((b) => b.sets)
      : [section.sets];
    for (const set of runs.flat()) {
      for (const id of set.questionIds) {
        if (excluded.has(id)) continue;
        n += 1;
        numberOf.set(id, n);
        const label = correctLabelOf(id);
        keyRows.push({ questionId: id, n, letter: label ? label.toLowerCase() : null });
      }
    }
  }

  return { numberOf, keyRows, total: n };
}
