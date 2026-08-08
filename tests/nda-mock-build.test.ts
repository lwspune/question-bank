import { describe, it, expect } from "vitest";
import { buildRecords, type MockQuestion, type Catalog } from "../scripts/nda-mock/lib";

const CATALOG: Catalog = {
  "Quadratic Equations": ["Nature of Roots and Boundary Conditions", "Vieta's Relations and Root-Coefficient Identities"],
  Probability: ["Independent Events", "Probability via Counting"],
};

function q(number: number, over: Partial<MockQuestion> = {}): MockQuestion {
  return {
    number,
    stem: `Question ${number}?`,
    options: [
      { label: "A", text: "1" },
      { label: "B", text: "2" },
      { label: "C", text: "3" },
      { label: "D", text: "4" },
    ],
    answer: "B",
    chapter: "Quadratic Equations",
    subtopic: "Nature of Roots and Boundary Conditions",
    difficulty: "MODERATE",
    solution: "because",
    ...over,
  };
}

describe("buildRecords", () => {
  it("builds one row per question with the per-question chapter", () => {
    const { rows, flags } = buildRecords(
      [q(1), q(2, { chapter: "Probability", subtopic: "Independent Events" })],
      CATALOG
    );
    expect(rows).toHaveLength(2);
    expect(flags).toEqual([]);
    expect(rows[0].chapterName).toBe("Quadratic Equations");
    expect(rows[1].chapterName).toBe("Probability");
    expect(rows[1].subtopicName).toBe("Independent Events");
    expect(rows[0].options.filter((o) => o.isCorrect).map((o) => o.label)).toEqual(["B"]);
  });

  it("validates the subtopic against ITS OWN chapter, not the union", () => {
    // "Independent Events" is a real subtopic, but of Probability — filing it
    // under Quadratic Equations must fail loudly rather than pass silently.
    expect(() => buildRecords([q(1, { subtopic: "Independent Events" })], CATALOG)).toThrow(
      /does not belong to chapter "Quadratic Equations"/
    );
  });

  it("rejects a chapter absent from the live catalog", () => {
    expect(() => buildRecords([q(1, { chapter: "Astrophysics" })], CATALOG)).toThrow(/not in the live/);
  });

  it("skips a question with no settled answer instead of guessing", () => {
    const { rows, flags } = buildRecords([q(1, { answer: null }), q(2)], CATALOG);
    expect(rows.map((r) => r.sourceRow)).toEqual([2]);
    expect(flags).toEqual([{ number: 1, reason: "no settled answer — left out of the commit" }]);
  });

  it("flags a missing solution but still commits the row", () => {
    const { rows, flags } = buildRecords([q(1, { solution: null })], CATALOG);
    expect(rows).toHaveLength(1);
    expect(rows[0].solution).toBeUndefined();
    expect(flags[0].reason).toMatch(/no solution/);
  });

  it("carries shared context and set label through for passage questions", () => {
    const { rows } = buildRecords(
      [q(71, { context: "Three languages are offered.", setLabel: "m1-set-71-75" })],
      CATALOG
    );
    expect(rows[0].context).toBe("Three languages are offered.");
    expect(rows[0].setLabel).toBe("m1-set-71-75");
  });

  it("throws when the answer letter matches no option", () => {
    expect(() => buildRecords([q(1, { answer: "E" })], CATALOG)).toThrow(/invalid/);
  });

  it("throws on a malformed option set", () => {
    expect(() =>
      buildRecords([q(1, { options: [{ label: "A", text: "1" }, { label: "B", text: "2" }] })], CATALOG)
    ).toThrow(/exactly A,B,C,D/);
  });

  it("gives two questions with different stems different content hashes", () => {
    const { rows } = buildRecords([q(1), q(2)], CATALOG);
    expect(rows[0].contentHash).not.toBe(rows[1].contentHash);
  });

  it("normalises a literal backslash-n so stored text is the hash preimage", () => {
    const { rows } = buildRecords([q(1, { stem: "Line one\\nLine two" })], CATALOG);
    expect(rows[0].text).toBe("Line one\nLine two");
  });
});
