/**
 * Numbering and the contents table for the printed chapter. Pure — the
 * component supplies the sections and asks for the answers.
 *
 * ONE PASS PRODUCES BOTH the paper's numbers and the key's rows, deliberately.
 * The answer key sits at the end of each chapter and refers to questions by
 * number; numbering them separately is how a book ends up with every question
 * present, every answer present, and each pointing at the other's neighbour —
 * an error nothing downstream can detect, because both halves look complete.
 *
 * The contents table is derived from that SAME pass for the same reason: a
 * hand-written "Synonyms Q.1-150" is a fourth place for the truth to live, and
 * it would rot on the next sync or the next exclusion without anything saying
 * so.
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

/**
 * A run of printed numbers.
 *
 * `count` equals the span for every range this produces today, because
 * numbering walks sections then blocks then sets in print order, so a block's
 * questions are consecutive. It is still counted INDEPENDENTLY rather than
 * derived from `to - from`: if that ever stopped holding, a range would quietly
 * over-state itself, whereas an independent count makes the break visible.
 */
export type ContentsRange = { from: number; to: number; count: number };

export type ContentsColumn = {
  key: string;
  title: string;
  /** Null when the section prints nothing in this chapter. */
  range: ContentsRange | null;
};

export type ContentsRow = {
  name: string;
  /** One entry per column, in column order. Null = that exam does not ask it. */
  cells: (ContentsRange | null)[];
};

export type ChapterContents = {
  columns: ContentsColumn[];
  /** Subtopic rows. EMPTY for a chapter that does not group by subtopic. */
  rows: ContentsRow[];
};

/**
 * The chapter's front-matter contents: each exam's span, and — where the
 * chapter groups by subtopic — each subtopic's span under BOTH exams.
 *
 * Side by side is the whole point. A chapter exists to carry both exams' take
 * on one subtopic, and that comparison is only readable in one table; a blank
 * cell is real information, saying that exam does not ask this subtopic here.
 *
 * Ranges come from `numbering`, never from a second walk of the sections, so
 * the contents, the printed numbers and the key at the back are one
 * computation. A question absent from `numberOf` was curated out, and is absent
 * here too — the table describes what prints, not what the chapter holds.
 *
 * A FLAT chapter yields no rows: its sets span subtopics, so a per-subtopic
 * range would be non-contiguous and therefore false. The section spans still
 * answer the question a flat chapter raises, which is where the other exam
 * begins.
 */
export function chapterContents(
  sections: BookSection[],
  { numberOf }: ChapterNumbering
): ChapterContents {
  const rangeOf = (questionIds: string[]): ContentsRange | null => {
    let from = Infinity;
    let to = -Infinity;
    let count = 0;
    for (const id of questionIds) {
      const n = numberOf.get(id);
      if (n === undefined) continue; // excluded — not in the book, not in the contents
      count += 1;
      if (n < from) from = n;
      if (n > to) to = n;
    }
    return count === 0 ? null : { from, to, count };
  };

  const idsOf = (sets: { questionIds: string[] }[]) =>
    sets.flatMap((s) => s.questionIds);

  const columns: ContentsColumn[] = sections.map((section) => ({
    key: section.key,
    title: section.title,
    // The flat set list, not the blocks: min/max is order-independent, so this
    // is right whether or not the chapter regroups its sets.
    range: rangeOf(idsOf(section.sets)),
  }));

  // Row order is the first section's declared block order, then any subtopic
  // only a later section has, appended. Appending mirrors the grouping rule —
  // a subtopic missing from the registry must never silently vanish, here or
  // in the book itself.
  const names: string[] = [];
  for (const section of sections) {
    for (const block of section.blocks ?? []) {
      if (!names.includes(block.name)) names.push(block.name);
    }
  }

  const rows = names
    .map((name) => ({
      name,
      cells: sections.map((section) => {
        const block = section.blocks?.find((b) => b.name === name);
        return block ? rangeOf(idsOf(block.sets)) : null;
      }),
    }))
    // A subtopic excluded down to nothing prints no block, so it lists nothing.
    .filter((row) => row.cells.some((cell) => cell !== null));

  return { columns, rows };
}
