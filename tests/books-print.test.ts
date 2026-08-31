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
import { numberChapter } from "../src/lib/books/print";
import type { BookSection } from "../src/lib/books/order";

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
