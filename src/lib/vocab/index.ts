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
  /**
   * What the index prints beside the word — "Papers", "Practice", "School".
   *
   * THE CHAPTER IS DELIBERATELY NOT HERE. Chapters are alphabetical bands and
   * the index is alphabetical, so "A-C" beside "absurd" is derivable from the
   * word itself and carries NO information — it just makes the line longer and
   * the reader decode two things. The one fact a reader genuinely lacks is
   * WHICH PART the word is in, because that depends on whether the exams have
   * asked it, which is exactly what they are looking it up to find out.
   *
   * A name, not "Part 2", for the same reason: an ordinal has to be decoded
   * against the contents page before it means anything.
   */
  partTag: string;
  /** Times a real paper has asked it. Printed only when > 1. */
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
 * One printed index line: the word, a leader, the part, and a recurrence mark.
 *
 * A PAGE NUMBER IS DELIBERATELY ABSENT — this book has no stable pagination
 * until the Word export, and a wrong page number is worse than none.
 *
 * `width` aligns the tags into a column so the eye can run down the parts
 * rather than reading each line.
 */
export function formatIndexRow(r: IndexRow, width = 22): string {
  const asked = r.timesAsked > 1 ? ` ${r.timesAsked}x` : "";
  const leader = ".".repeat(Math.max(2, width - r.word.length));
  return `${r.word} ${leader} ${r.partTag}${asked}`;
}
