/**
 * The back-of-book index.
 *
 * THIS IS WHAT MAKES THE TWO-PART SPLIT USABLE. A word sits in Part 1 or Part 2
 * depending on whether the exams have ever asked it — which is exactly the fact
 * a reader looking the word up does not know yet. Without an index the split
 * would force them to guess which half to open.
 *
 * It is also why the book can stay alphabetical INSIDE each part rather than
 * being ordered by yield or difficulty: the index answers "where is it", so the
 * page order is free to answer "what should I learn".
 */
export type IndexRow = {
  word: string;
  /** The chapter a reader should turn to. */
  chapterLabel: string;
  chapterSlug: string;
  part: "exam" | "school";
  /** Times the exams have asked it; 0 for a school word. */
  timesAsked: number;
};

export type IndexGroup = { letter: string; rows: IndexRow[] };

/**
 * Group into A-Z sections. A letter with no words is OMITTED rather than shown
 * empty — an index is scanned, and a run of empty headings is noise.
 */
export function buildIndex(rows: IndexRow[]): IndexGroup[] {
  const by = new Map<string, IndexRow[]>();
  for (const r of rows) {
    const l = (r.word[0] ?? "?").toUpperCase();
    (by.get(l) ?? by.set(l, []).get(l)!).push(r);
  }
  return [...by.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([letter, rs]) => ({
      letter,
      rows: rs.sort((a, b) => a.word.localeCompare(b.word)),
    }));
}

/**
 * How a row is printed. The part is shown as a short tag rather than a page
 * number because this book has no stable pagination until it is exported to
 * Word — and a wrong page number is worse than none.
 */
export function formatIndexRow(r: IndexRow): string {
  const tag = r.part === "exam" ? `Part 2 · ${r.chapterLabel}` : `Part 1 · ${r.chapterLabel}`;
  const asked = r.timesAsked > 1 ? `  (asked ${r.timesAsked}x)` : "";
  return `${r.word}  ${tag}${asked}`;
}
