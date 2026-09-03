/**
 * Book order for `/board` chapters — the PURE core. Spec: tests/board-chapter-order.test.ts.
 *
 * WHY THIS EXISTS. `chapters.order_index` is written by `src/lib/upload/taxonomy.ts`
 * as `max + 1` when a chapter auto-creates, so it records the order we INGESTED
 * chapters, not the order the book prints them. Measured on the live bank
 * (2026-09-02): MH HSC 12 Maths reads 0..14 as Mathematical Logic, Matrices,
 * Pair of Straight Lines, Differential Equations… — our ingest sequence. Worse,
 * for the exams built by parallel agents it is degenerate: MH SSC 10 Algebra
 * reads 0,1,1,1,1,2 (agents raced the same `max` read) and MH HSC 12 Physics
 * reads 0,1,2,3,5,7,8,9. Where it ties, the caller's tiebreak falls through to
 * alphabetical, so the order is effectively arbitrary.
 *
 * WHY IT IS NOT DERIVED FROM THE QUESTIONS. `section_group` carries the book's
 * own numbering for SOME sources ("8.1 Bernoulli Trial") — but the MH Maths
 * books ship in TWO PARTS that BOTH restart at Ch.1, so "1.1" is Mathematical
 * Logic (Part 1) and Differentiation (Part 2); and every MH SSC 10 / MH SB 9
 * humanities group is the bare string "Exercise", carrying no number at all.
 * The authoritative source is each pipeline's own config, where position is
 * encoded in the source PDF's path.
 */

/** The two fields of a pipeline `Chapter` this derivation reads. */
export type ChapterSource = { pdf: string; pages?: number[] };

/** `Part 01/…`, `Part 2_Chapterwise/…`, `…_Part1_SB.pdf` → 1 | 2. Absent → 1. */
function partOf(path: string): number {
  const m = /Part\s*_?0*(\d)/i.exec(path);
  return m ? Number(m[1]) : 1;
}

/**
 * Position within a part.
 *
 * A per-chapter PDF names its own number — `Ch_04_Pair_of_Straight_Lines.pdf`,
 * `05. Oscillations.pdf`. A whole-book PDF (mh-sb-9, mh-ssc-10-text) does not,
 * so the chapter's first rendered page stands in: page order IS book order.
 *
 * ⚠ The separator after the digits is load-bearing. `9th_Maths_Part1_SB.pdf`
 * and `10th_Sci_Part1_SB.pdf` both OPEN with digits; requiring a `.` or `_`
 * next is what stops every Class-9 chapter collapsing onto position 9.
 */
function positionOf(source: ChapterSource): number | null {
  const base = source.pdf.split(/[\\/]/).pop() ?? "";
  const numbered = /^Ch_?(\d+)[_\s]/i.exec(base) ?? /^(\d{1,2})[.\s_]/.exec(base);
  if (numbered) return Number(numbered[1]);
  const first = source.pages?.[0];
  return typeof first === "number" ? first : null;
}

/**
 * A sortable book position for one config entry, or null when the config gives
 * no signal at all. Null is deliberate: the caller REFUSES rather than guessing,
 * because a guessed position mis-sorts a chapter with nothing to flag it.
 *
 * The 1000 multiplier just keeps the parts apart; only the ordering matters, and
 * no book here has 1000 pages or chapters in one part.
 */
export function bookSortKey(source: ChapterSource): number | null {
  const pos = positionOf(source);
  return pos === null ? null : partOf(source.pdf) * 1000 + pos;
}

export type ChapterToOrder = {
  name: string;
  /** From `bookSortKey`; null when no config names this chapter. */
  sortKey: number | null;
  currentOrderIndex: number | null;
};

export type OrderedChapter = ChapterToOrder & { orderIndex: number };

/**
 * Number one subject's chapters 1..N.
 *
 * Chapters the configs name take the book's order. Chapters they do NOT name go
 * AFTER, keeping their current relative order — these are real chapters (MH SSC
 * 10's old-syllabus `Surds`, `Control and Co-ordination`, `Reflection of Light`,
 * which only the board-PYQ corpus uses) that are not part of the current book,
 * so they cannot claim a book slot; but they must still land somewhere
 * deterministic. Name is the final tiebreak so the result never depends on the
 * order rows came back from the database.
 */
export function assignChapterOrder(chapters: ChapterToOrder[]): OrderedChapter[] {
  const sorted = [...chapters].sort((a, b) => {
    if (a.sortKey !== null && b.sortKey !== null) return a.sortKey - b.sortKey || a.name.localeCompare(b.name);
    if (a.sortKey !== null) return -1;
    if (b.sortKey !== null) return 1;
    return (a.currentOrderIndex ?? 0) - (b.currentOrderIndex ?? 0) || a.name.localeCompare(b.name);
  });
  return sorted.map((c, i) => ({ ...c, orderIndex: i + 1 }));
}
