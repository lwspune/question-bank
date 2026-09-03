import { describe, expect, it } from "vitest";
import { parseKeyPairs } from "../scripts/cds-maths/parse-key";

describe("parseKeyPairs", () => {
  // The 2020-I layout: a plain two-column Question/Answer table, right-aligned.
  it("reads the two-column Question/Answer layout", () => {
    const txt = ["  Question Answer", "---------- --------", "         1 A", "", "         2 B", "", "        10 C"].join("\n");
    expect([...parseKeyPairs(txt)]).toEqual([
      [1, "A"],
      [2, "B"],
      [10, "C"],
    ]);
  });

  // The 2020-II layout: 1-50 and 51-100 paired side by side in one wide table.
  it("reads both halves of a side-by-side pipe table", () => {
    const txt = [
      "| Question |   Answer |            | 51        |   B       |",
      "| 1        |   C      |            | 52        |   B       |",
      "| 2        |   B      |            | 53        |   A       |",
    ].join("\n");
    const got = parseKeyPairs(txt);
    expect(got.get(1)).toBe("C");
    expect(got.get(2)).toBe("B");
    expect(got.get(51)).toBe("B");
    expect(got.get(52)).toBe("B");
    expect(got.get(53)).toBe("A");
  });

  it("ignores question numbers outside 1..100", () => {
    expect(parseKeyPairs("101 A\n0 B\n250 C").size).toBe(0);
  });

  // Guard against pairing a number with the first letter of an ordinary word —
  // "2020 Answer key" must not read as Q20 -> A.
  it("does not pair a number with the start of a word", () => {
    expect(parseKeyPairs("Solved Paper 2020 Answer key").size).toBe(0);
    expect(parseKeyPairs("Section 5 Above").size).toBe(0);
  });

  it("keeps the FIRST reading when a number repeats", () => {
    expect(parseKeyPairs("7 A\n7 D").get(7)).toBe("A");
  });

  it("requires the letter to be adjacent, not merely later on the line", () => {
    expect(parseKeyPairs("12 marks were awarded").size).toBe(0);
  });
});
