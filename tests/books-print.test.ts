/**
 * Chapter numbering for the printed book.
 *
 * The answer key sits at the END of each chapter and refers to questions BY
 * NUMBER, so the paper and the key must be numbered from one source. If they
 * ever disagree the book is quietly wrong in the worst way: every question
 * still present, every answer still present, and each pointing at the other's
 * neighbour. Nothing downstream could detect it.
 *
 * Two rules carry that:
 *   - numbering runs CONTINUOUSLY across the whole chapter, both halves, so a
 *     number identifies exactly one question;
 *   - an EXCLUDED question is absent AND unnumbered, so the printed sequence
 *     has no holes for a reader to mistake for a typesetting fault.
 */
import { describe, it, expect } from "vitest";
import { chapterContents, numberChapter } from "../src/lib/books/print";
import type { BookSection, BookSet } from "../src/lib/books/order";

function section(key: "nda" | "cds", sets: string[][]): BookSection {
  return {
    key,
    exam: key === "nda" ? "NDA" : "CDS",
    title: key === "nda" ? "NDA PYQ" : "CDS PYQ",
    sets: sets.map((questionIds, i) => ({
      setId: `S${i}`,
      key: `${key}-${i}`,
      questionIds,
      year: 2020,
      sitting: 1,
      label: "L",
    })),
    blocks: null,
    questionCount: sets.flat().length,
  };
}

const SECTIONS = [
  section("nda", [["a", "b"], ["c"]]),
  section("cds", [["d", "e"]]),
];

describe("numberChapter", () => {
  it("numbers continuously across BOTH halves, never restarting", () => {
    const { numberOf } = numberChapter(SECTIONS, []);
    expect([...numberOf.entries()]).toEqual([
      ["a", 1],
      ["b", 2],
      ["c", 3],
      ["d", 4],
      ["e", 5],
    ]);
  });

  it("skips excluded questions and leaves NO hole in the sequence", () => {
    const { numberOf } = numberChapter(SECTIONS, ["b", "d"]);
    expect([...numberOf.entries()]).toEqual([
      ["a", 1],
      ["c", 2],
      ["e", 3],
    ]);
  });

  it("gives the key exactly the paper's numbers, in order", () => {
    const answers = new Map([
      ["a", "A"],
      ["b", "C"],
      ["c", "D"],
      ["d", "B"],
      ["e", "A"],
    ]);
    const { numberOf, keyRows } = numberChapter(SECTIONS, ["b"], (id) => answers.get(id) ?? null);
    expect(keyRows.map((r) => r.n)).toEqual([1, 2, 3, 4]);
    // Every key row points at the number the paper printed for that question.
    for (const row of keyRows) {
      expect(row.n).toBe(numberOf.get(row.questionId));
    }
    expect(keyRows.map((r) => r.letter)).toEqual(["a", "d", "b", "a"]);
  });

  it("reports a missing key as null rather than guessing a letter", () => {
    const { keyRows } = numberChapter(SECTIONS, [], (id) => (id === "c" ? null : "A"));
    expect(keyRows.find((r) => r.questionId === "c")!.letter).toBeNull();
  });

  it("counts only what is printed", () => {
    expect(numberChapter(SECTIONS, []).total).toBe(5);
    expect(numberChapter(SECTIONS, ["a", "e"]).total).toBe(3);
  });

  it("returns nothing to print when every question is excluded", () => {
    const { numberOf, keyRows, total } = numberChapter(SECTIONS, ["a", "b", "c", "d", "e"]);
    expect(numberOf.size).toBe(0);
    expect(keyRows).toEqual([]);
    expect(total).toBe(0);
  });
});

/**
 * Layout A reorders a section's sets into subtopic blocks, so the printed
 * sequence is the BLOCK order, not the flat set order. Numbering must follow
 * what is on the page — otherwise the key at the back points at the wrong
 * questions, and every question and every answer still looks present.
 */
describe("numberChapter with subtopic blocks", () => {
  const withBlocks: BookSection[] = [
    {
      key: "nda",
      exam: "NDA",
      title: "NDA PYQ",
      // Flat order is c, a, b — block order is a, b, c.
      sets: [
        { setId: "S2", key: "k2", questionIds: ["c"], year: 2020, sitting: 1, label: "L" },
        { setId: "S0", key: "k0", questionIds: ["a"], year: 2020, sitting: 1, label: "L" },
        { setId: "S1", key: "k1", questionIds: ["b"], year: 2020, sitting: 1, label: "L" },
      ],
      blocks: [
        {
          name: "Synonyms",
          sets: [
            { setId: "S0", key: "k0", questionIds: ["a"], year: 2020, sitting: 1, label: "L" },
            { setId: "S1", key: "k1", questionIds: ["b"], year: 2020, sitting: 1, label: "L" },
          ],
          questionCount: 2,
        },
        {
          name: "Antonyms",
          sets: [
            { setId: "S2", key: "k2", questionIds: ["c"], year: 2020, sitting: 1, label: "L" },
          ],
          questionCount: 1,
        },
      ],
      questionCount: 3,
    },
  ];

  it("numbers in BLOCK order, not flat set order", () => {
    const { numberOf } = numberChapter(withBlocks, []);
    expect([...numberOf.entries()]).toEqual([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]);
  });

  it("keeps the key aligned with the printed numbers", () => {
    const { numberOf, keyRows } = numberChapter(withBlocks, [], () => "B");
    for (const row of keyRows) {
      expect(row.n).toBe(numberOf.get(row.questionId));
    }
    expect(keyRows.map((r) => r.questionId)).toEqual(["a", "b", "c"]);
  });
});

/**
 * The chapter's contents table.
 *
 * A printed chapter cannot otherwise answer two questions a reader actually
 * has: where a subtopic starts, and whether the OTHER exam asks it at all.
 * The second is the point of this book — a chapter carries both exams' take on
 * one subtopic — and it is only answerable by putting the two side by side.
 *
 * Everything here is derived from the SAME numbering pass that numbers the
 * paper and the key, so the three cannot drift. A hand-written "Q.1-150" would
 * rot on the next sync or the next exclusion, silently.
 */
function grouped(key: "nda" | "cds", spec: [string, string[][]][]): BookSection {
  let i = 0;
  const mkSet = (questionIds: string[]): BookSet => ({
    setId: `S-${key}-${i}`,
    key: `${key}-${i++}`,
    questionIds,
    year: 2020,
    sitting: 1,
    label: "L",
  });
  const blocks = spec.map(([name, sets]) => {
    const built = sets.map(mkSet);
    return {
      name,
      sets: built,
      questionCount: built.reduce((n, s) => n + s.questionIds.length, 0),
    };
  });
  return {
    key,
    exam: key === "nda" ? "NDA" : "CDS",
    title: key === "nda" ? "NDA PYQ" : "CDS PYQ",
    sets: blocks.flatMap((b) => b.sets),
    blocks,
    questionCount: blocks.reduce((n, b) => n + b.questionCount, 0),
  };
}

// NDA: Synonyms a,b,c · Antonyms d · Idioms e     -> Q.1-5
// CDS: Synonyms f      · Antonyms g,h             -> Q.6-8
// CDS has no Idioms, which is the informative blank.
const GROUPED: BookSection[] = [
  grouped("nda", [
    ["Synonyms", [["a", "b"], ["c"]]],
    ["Antonyms", [["d"]]],
    ["Idioms and Phrases", [["e"]]],
  ]),
  grouped("cds", [
    ["Synonyms", [["f"]]],
    ["Antonyms", [["g", "h"]]],
  ]),
];

const contentsOf = (sections: BookSection[], excluded: string[] = []) =>
  chapterContents(sections, numberChapter(sections, excluded));

describe("chapterContents", () => {
  it("puts the two exams' ranges for one subtopic side by side", () => {
    const { columns, rows } = contentsOf(GROUPED);
    expect(columns.map((c) => c.title)).toEqual(["NDA PYQ", "CDS PYQ"]);
    expect(rows.map((r) => r.name)).toEqual(["Synonyms", "Antonyms", "Idioms and Phrases"]);
    expect(rows[0].cells).toEqual([
      { from: 1, to: 3, count: 3 },
      { from: 6, to: 6, count: 1 },
    ]);
    expect(rows[1].cells).toEqual([
      { from: 4, to: 4, count: 1 },
      { from: 7, to: 8, count: 2 },
    ]);
  });

  it("leaves a blank cell where an exam does not ask the subtopic at all", () => {
    // Not a gap in the data — a fact about the exam, and one of the two things
    // this table exists to show.
    const { rows } = contentsOf(GROUPED);
    expect(rows[2].cells).toEqual([{ from: 5, to: 5, count: 1 }, null]);
  });

  it("gives each section its own range, so 'where does CDS start' is answered", () => {
    const { columns } = contentsOf(GROUPED);
    expect(columns[0].range).toEqual({ from: 1, to: 5, count: 5 });
    expect(columns[1].range).toEqual({ from: 6, to: 8, count: 3 });
  });

  it("shrinks a range when a question is excluded, never leaving a hole", () => {
    // Excluding "b" renumbers everything after it, and the contents must move
    // with the paper rather than keep quoting the pre-exclusion numbers.
    const { columns, rows } = contentsOf(GROUPED, ["b"]);
    expect(rows[0].cells[0]).toEqual({ from: 1, to: 2, count: 2 });
    expect(rows[1].cells[0]).toEqual({ from: 3, to: 3, count: 1 });
    expect(columns[1].range).toEqual({ from: 5, to: 7, count: 3 });
  });

  it("drops a subtopic whose questions are ALL excluded, matching what prints", () => {
    const { rows } = contentsOf(GROUPED, ["e"]);
    expect(rows.map((r) => r.name)).toEqual(["Synonyms", "Antonyms"]);
  });

  it("keeps the column but empties its range when a section prints nothing", () => {
    // The section still renders its "no questions in this chapter" line, so
    // dropping the column would misreport the book as single-exam.
    const { columns, rows } = contentsOf(GROUPED, ["f", "g", "h"]);
    expect(columns.map((c) => c.title)).toEqual(["NDA PYQ", "CDS PYQ"]);
    expect(columns[1].range).toBeNull();
    expect(rows[0].cells[1]).toBeNull();
  });

  it("appends a subtopic only the second exam has, rather than dropping it", () => {
    const sections = [
      grouped("nda", [["Synonyms", [["a"]]]]),
      grouped("cds", [["Synonyms", [["b"]]], ["Cloze", [["c"]]]]),
    ];
    const { rows } = contentsOf(sections);
    expect(rows.map((r) => r.name)).toEqual(["Synonyms", "Cloze"]);
    expect(rows[1].cells).toEqual([null, { from: 3, to: 3, count: 1 }]);
  });

  it("yields no subtopic rows for a flat chapter, but still gives section ranges", () => {
    // Where sets span subtopics a per-subtopic range would be non-contiguous
    // and therefore false, so the table drops to the two section ranges — which
    // is still the answer to the question a flat chapter raises.
    const { columns, rows } = contentsOf(SECTIONS);
    expect(rows).toEqual([]);
    expect(columns[0].range).toEqual({ from: 1, to: 3, count: 3 });
    expect(columns[1].range).toEqual({ from: 4, to: 5, count: 2 });
  });

  it("has nothing to show when every question is excluded", () => {
    const { columns, rows } = contentsOf(GROUPED, ["a", "b", "c", "d", "e", "f", "g", "h"]);
    expect(rows).toEqual([]);
    expect(columns.every((c) => c.range === null)).toBe(true);
  });

  /**
   * THE LOAD-BEARING PAIR. Both hold only because numbering walks sections,
   * then blocks, then sets in the order they print — so a block's questions are
   * consecutive. If that ever stopped being true the table would SHOW it (a
   * count would stop matching its span) rather than quietly mis-state a range.
   */
  it("covers every printed question exactly once, with no gap or overlap", () => {
    const numbering = numberChapter(GROUPED, ["c"]);
    const { columns } = chapterContents(GROUPED, numbering);
    const covered = columns
      .flatMap((c) => (c.range ? rangeNumbers(c.range) : []))
      .sort((a, b) => a - b);
    expect(covered).toEqual([...Array(numbering.total)].map((_, i) => i + 1));
  });

  it("keeps every count equal to its span, so a range and a count cannot disagree", () => {
    const { columns, rows } = contentsOf(GROUPED, ["b", "g"]);
    const cells = [...columns.map((c) => c.range), ...rows.flatMap((r) => r.cells)];
    for (const cell of cells) {
      if (!cell) continue;
      expect(cell.to - cell.from + 1).toBe(cell.count);
    }
  });
});

function rangeNumbers({ from, to }: { from: number; to: number }): number[] {
  return [...Array(to - from + 1)].map((_, i) => from + i);
}
