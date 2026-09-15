import { describe, it, expect } from "vitest";
import {
  optionLetter,
  parseKeyBlock,
  assembleRows,
  keyCoverageWarnings,
  difficultyForLevel,
  type JQ,
  type BuildChapter,
} from "../scripts/jee-practice/lib";

const CH: BuildChapter = {
  chapterName: "Compound Angles",
  subjectName: "Maths",
  subtopics: ["Compound Angle Formulae and Values", "Sum-Product Transformations", "Conditional Identities"],
};

const mcq = (over: Partial<JQ> = {}): JQ => ({
  ref: "Lvl II-CW Q1",
  kind: "mcq",
  level: "II-CW",
  num: 1,
  subtopic: "Compound Angle Formulae and Values",
  stem: "\\(\\sin(A+B)=\\)",
  options: [
    { label: "A", text: "\\(\\sin A\\cos B+\\cos A\\sin B\\)" },
    { label: "B", text: "\\(\\sin A\\cos B-\\cos A\\sin B\\)" },
    { label: "C", text: "\\(\\cos A\\cos B\\)" },
    { label: "D", text: "\\(\\sin A\\sin B\\)" },
  ],
  ...over,
});

const we = (over: Partial<JQ> = {}): JQ => ({
  ref: "W.E-1",
  kind: "we",
  subtopic: "Compound Angle Formulae and Values",
  stem: "\\(\\sin 75^\\circ=\\)",
  solution: "\\(\\sin(45^\\circ+30^\\circ)=\\frac{\\sqrt3+1}{2\\sqrt2}\\)",
  ...over,
});

describe("optionLetter", () => {
  it("maps 1..4 to A..D", () => {
    expect([1, 2, 3, 4].map(optionLetter)).toEqual(["A", "B", "C", "D"]);
  });
  it("throws out of range", () => {
    expect(() => optionLetter(0)).toThrow();
    expect(() => optionLetter(5)).toThrow();
  });
});

describe("difficultyForLevel", () => {
  it("maps roman tier to difficulty, ignoring C.W/H.W", () => {
    expect(difficultyForLevel("I-HW")).toBe("EASY");
    expect(difficultyForLevel("II-CW")).toBe("MODERATE");
    expect(difficultyForLevel("II-HW")).toBe("MODERATE");
    expect(difficultyForLevel("III")).toBe("HARD");
    expect(difficultyForLevel("IV")).toBe("HARD");
  });
});

describe("parseKeyBlock", () => {
  it("parses a spaced KEY block into number→letter", () => {
    const m = parseKeyBlock("01) 1  02) 1  03) 4  04) 2  05) 3");
    expect(m.get(1)).toBe("A");
    expect(m.get(3)).toBe("D");
    expect(m.get(4)).toBe("B");
    expect(m.get(5)).toBe("C");
    expect(m.size).toBe(5);
  });
  it("tolerates newlines, missing spaces, and 1-digit numbers", () => {
    const m = parseKeyBlock("1)4\n2) 1\n06)3\n07) 2");
    expect(m.get(1)).toBe("D");
    expect(m.get(2)).toBe("A");
    expect(m.get(6)).toBe("C");
    expect(m.get(7)).toBe("B");
  });
  it("first occurrence of a number wins", () => {
    expect(parseKeyBlock("05) 1  05) 4").get(5)).toBe("A");
  });
  it("skips option numbers outside 1..4", () => {
    const m = parseKeyBlock("01) 4  02) 9  03) 2");
    expect(m.has(2)).toBe(false);
    expect(m.get(3)).toBe("B");
  });
});

describe("assembleRows", () => {
  it("resolves an MCQ answer from its level KEY block", () => {
    const { rows, flags } = assembleRows(CH, [mcq({ num: 3 })], { "II-CW": "01) 1  02) 2  03) 1" });
    expect(flags).toHaveLength(0);
    expect(rows).toHaveLength(1);
    const r = rows[0];
    expect(r.questionFormat).toBe("mcq");
    expect(r.questionNumber).toBe("Lvl II-CW Q1");
    // Q3 → option 1 → A → is the first option correct?
    expect(r.options.find((o) => o.isCorrect)?.label).toBe("A");
    expect(r.difficulty).toBe(difficultyForLevel("II-CW"));
  });

  it("flags an MCQ whose level KEY lacks its number (kept, no correct option)", () => {
    const { rows, flags } = assembleRows(CH, [mcq({ num: 9 })], { "II-CW": "01) 1" });
    expect(rows).toHaveLength(1);
    expect(rows[0].options.some((o) => o.isCorrect)).toBe(false);
    expect(flags.some((f) => /no entry for Q9/.test(f.reason))).toBe(true);
  });

  it("builds a Worked Example as a subjective row with its solution", () => {
    const { rows } = assembleRows(CH, [we()], {});
    expect(rows).toHaveLength(1);
    expect(rows[0].questionFormat).toBe("subjective");
    expect(rows[0].options).toHaveLength(0);
    expect(rows[0].solution).toContain("2\\sqrt2");
    expect(rows[0].difficulty).toBe("MODERATE");
  });

  it("honours an explicit per-question difficulty over the level default", () => {
    const { rows } = assembleRows(CH, [mcq({ difficulty: "EASY" })], { "II-CW": "01) 1" });
    expect(rows[0].difficulty).toBe("EASY");
  });

  it("throws on an unknown subtopic (transcription mistake)", () => {
    expect(() => assembleRows(CH, [mcq({ subtopic: "Nope" })], { "II-CW": "01) 1" })).toThrow(/subtopic/);
  });

  it("throws on a subjective W.E carrying options", () => {
    expect(() =>
      assembleRows(CH, [we({ options: [{ label: "A", text: "x" }] })], {})
    ).toThrow(/must not carry options/);
  });
});

describe("keyCoverageWarnings", () => {
  it("warns when a level's question count and KEY-entry count differ", () => {
    const qs: JQ[] = [mcq({ num: 1, ref: "Lvl II-CW Q1" }), mcq({ num: 2, ref: "Lvl II-CW Q2" })];
    expect(keyCoverageWarnings(qs, { "II-CW": "01) 1" })).toEqual([expect.stringMatching(/2 questions but KEY has 1/)]);
  });
  it("warns when a level has questions but no KEY block", () => {
    expect(keyCoverageWarnings([mcq()], {})).toEqual([expect.stringMatching(/NO KEY block/)]);
  });
  it("silent when counts match", () => {
    const qs: JQ[] = [mcq({ num: 1, ref: "Lvl II-CW Q1" }), mcq({ num: 2, ref: "Lvl II-CW Q2" })];
    expect(keyCoverageWarnings(qs, { "II-CW": "01) 3  02) 4" })).toEqual([]);
  });
});
