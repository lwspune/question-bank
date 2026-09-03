import { describe, it, expect } from "vitest";
import { bookSortKey, assignChapterOrder } from "../scripts/board/order";

/**
 * The derivation that turns a pipeline config entry into its position in the
 * printed book. Every case below is a REAL path from one of the five board
 * configs — this is the spec for `bookSortKey`, and the cases that matter are
 * the ones where a naive read gets it wrong (two-part books, and the `9th_`
 * filename prefix that looks like a chapter number).
 */
describe("bookSortKey", () => {
  it("reads Ch_NN out of a per-chapter filename", () => {
    expect(bookSortKey({ pdf: "C:\\x\\Part 01\\Ch_04_Pair_of_Straight_Lines.pdf" })).toBe(1004);
    expect(bookSortKey({ pdf: "C:\\x\\Part 02\\Ch_08_Binomial_Distributions.pdf" })).toBe(2008);
  });

  it("reads a leading `NN.` out of a per-chapter filename", () => {
    expect(bookSortKey({ pdf: "C:\\x\\12th_Topics\\05. Oscillations.pdf" })).toBe(1005);
    expect(bookSortKey({ pdf: "C:\\x\\11th\\Maths\\14. Probability.pdf" })).toBe(1014);
  });

  it("keeps the two parts of a two-part book apart", () => {
    // The whole reason a part is in the key: BOTH volumes restart at Ch.1, so
    // the chapter number alone puts Differentiation on top of Mathematical Logic.
    const logic = bookSortKey({ pdf: "C:\\x\\Part 01\\Ch_01_Mathematical_Logic.pdf" });
    const differentiation = bookSortKey({ pdf: "C:\\x\\Part 02\\Ch_01_DIFFERENTIATION.pdf" });
    expect(logic).toBeLessThan(differentiation as number);

    // mh-sb-11 spells the same thing differently.
    const p1 = bookSortKey({ pdf: "C:\\x\\Part 1\\Part 1_Chapterwise\\Ch_09_Diffrentiation.pdf" });
    const p2 = bookSortKey({ pdf: "C:\\x\\Part 2\\Part 2_Chapterwise\\Ch_01_Complex_Numbers.pdf" });
    expect(p1).toBeLessThan(p2 as number);
  });

  it("falls back to the first rendered page for a whole-book PDF", () => {
    // mh-sb-9 / mh-ssc-10-text point every chapter at one book, so the only
    // signal of position is where the chapter starts.
    expect(bookSortKey({ pdf: "C:\\x\\9th_Hist_SB.pdf", pages: [24, 25, 26] })).toBe(1024);
    expect(bookSortKey({ pdf: "C:\\x\\10th_Maths_Part2_SB.pdf", pages: [56] })).toBe(2056);
  });

  it("does NOT read the class out of a `9th_`/`10th_` filename", () => {
    // The trap: `9th_Maths_Part1_SB.pdf` starts with a digit. Requiring a `.`
    // or `_` separator after the number is what stops every Class-9 chapter
    // collapsing onto position 9.
    expect(bookSortKey({ pdf: "C:\\x\\9th_Maths_Part1_SB.pdf", pages: [45] })).toBe(1045);
    expect(bookSortKey({ pdf: "C:\\x\\10th_Sci_Part1_SB.pdf", pages: [39] })).toBe(1039);
  });

  it("refuses a config entry it cannot place", () => {
    // No chapter number in the name and no pages → we do not know where this
    // chapter sits, and guessing would mis-sort it silently.
    expect(bookSortKey({ pdf: "C:\\x\\Some_Book.pdf" })).toBeNull();
    expect(bookSortKey({ pdf: "C:\\x\\Some_Book.pdf", pages: [] })).toBeNull();
  });
});

describe("assignChapterOrder", () => {
  const ch = (name: string, key: number | null, order: number | null = null) => ({
    name,
    sortKey: key,
    currentOrderIndex: order,
  });

  it("numbers config-named chapters 1..N in book order", () => {
    const out = assignChapterOrder([
      ch("Binomial Distribution", 2008),
      ch("Mathematical Logic", 1001),
      ch("Differentiation", 2001),
      ch("Matrices", 1002),
    ]);
    expect(out.map((c) => [c.name, c.orderIndex])).toEqual([
      ["Mathematical Logic", 1],
      ["Matrices", 2],
      ["Differentiation", 3],
      ["Binomial Distribution", 4],
    ]);
  });

  it("sorts chapters no config names AFTER, keeping their relative order", () => {
    // MH SSC 10 carries old-syllabus chapters that only the PYQ corpus uses.
    // They are not part of the current book, so they cannot claim a book slot —
    // but they must stay deterministic rather than land wherever.
    const out = assignChapterOrder([
      ch("Surds", null, 7),
      ch("Quadratic Equations", 1039),
      ch("Control and Co-ordination", null, 3),
      ch("Linear Equations in Two Variables", 1010),
    ]);
    expect(out.map((c) => [c.name, c.orderIndex])).toEqual([
      ["Linear Equations in Two Variables", 1],
      ["Quadratic Equations", 2],
      ["Control and Co-ordination", 3],
      ["Surds", 4],
    ]);
  });

  it("breaks a tie among unplaced chapters by name, not by input order", () => {
    const out = assignChapterOrder([ch("Zebra", null, null), ch("Alpha", null, null)]);
    expect(out.map((c) => c.name)).toEqual(["Alpha", "Zebra"]);
  });

  it("is idempotent — re-running on its own output keeps the same order", () => {
    // The script is meant to be re-run after every ingest, so a second pass over
    // a subject nothing has changed must be a no-op. (Only the ORDER is the
    // invariant: `currentOrderIndex` is by definition what the last run wrote.)
    const first = assignChapterOrder([ch("B", 1002), ch("A", 1001), ch("Old", null, 9)]);
    const second = assignChapterOrder(first.map((c) => ch(c.name, c.sortKey, c.orderIndex)));
    expect(second.map((c) => [c.name, c.orderIndex])).toEqual(first.map((c) => [c.name, c.orderIndex]));
  });
});
