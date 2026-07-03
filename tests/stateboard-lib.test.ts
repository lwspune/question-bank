import { describe, it, expect } from "vitest";
import { buildRecords, latexImbalances, type SBQuestion, type BuildChapter } from "../scripts/stateboard/lib";

const CH: BuildChapter = {
  chapterName: "Mathematical Logic",
  subjectName: "Mathematics",
  subtopics: [
    "Statements and Logical Connectives",
    "Truth Tables of Compound Statements",
    "Converse, Inverse and Contrapositive",
  ],
};

const mcq = (over: Partial<SBQuestion> = {}): SBQuestion => ({
  ref: "Misc I (i)",
  bucket: "exercise-mcq",
  format: "mcq",
  subtopic: "Statements and Logical Connectives",
  difficulty: "EASY",
  stem: "The negation of \\(p \\wedge q\\) is ____.",
  options: [
    { label: "A", text: "\\(\\sim p \\vee \\sim q\\)" },
    { label: "B", text: "\\(\\sim p \\wedge \\sim q\\)" },
    { label: "C", text: "\\(p \\vee q\\)" },
    { label: "D", text: "\\(p \\wedge q\\)" },
  ],
  answer: "A",
  ...over,
});

const subj = (over: Partial<SBQuestion> = {}): SBQuestion => ({
  ref: "Solved Ex.1",
  bucket: "solved",
  format: "subjective",
  subtopic: "Truth Tables of Compound Statements",
  difficulty: "MODERATE",
  stem: "Construct the truth table for \\(p \\to q\\).",
  solution: "| p | q | p→q |\n|---|---|---|\n| T | T | T |",
  ...over,
});

describe("buildRecords — MCQ", () => {
  it("emits an mcq row with the derived answer as the single correct option", () => {
    const { rows, flags } = buildRecords(CH, [mcq()]);
    expect(flags).toHaveLength(0);
    expect(rows).toHaveLength(1);
    const r = rows[0];
    expect(r.questionFormat).toBe("mcq");
    expect(r.options).toHaveLength(4);
    expect(r.options.filter((o) => o.isCorrect).map((o) => o.label)).toEqual(["A"]);
    expect(r.contentHash).toMatch(/^[0-9a-f]{64}$/);
    expect(r.questionNumber).toBe("Misc I (i)");
  });

  it("flags an MCQ with no derived answer and sets no correct option", () => {
    const { rows, flags } = buildRecords(CH, [mcq({ answer: undefined })]);
    expect(rows[0].options.some((o) => o.isCorrect)).toBe(false);
    expect(flags[0].reason).toMatch(/no derived answer/);
  });

  it("throws when MCQ options are not exactly A,B,C,D", () => {
    expect(() => buildRecords(CH, [mcq({ options: [{ label: "A", text: "x" }] })])).toThrow(/exactly A,B,C,D/);
  });

  it("throws on an invalid answer letter", () => {
    expect(() => buildRecords(CH, [mcq({ answer: "E" })])).toThrow(/invalid/);
  });
});

describe("buildRecords — subjective", () => {
  it("emits a subjective row with empty options and a subjective content hash", () => {
    const { rows, flags } = buildRecords(CH, [subj()]);
    expect(flags).toHaveLength(0);
    expect(rows[0].questionFormat).toBe("subjective");
    expect(rows[0].options).toEqual([]);
    expect(rows[0].solution).toContain("| p | q |");
  });

  it("flags a solved example that is missing its solution", () => {
    const { flags } = buildRecords(CH, [subj({ solution: undefined })]);
    expect(flags[0].reason).toMatch(/no solution/);
  });

  it("does not flag an exercise-subjective question with no solution (answer pending)", () => {
    const { flags } = buildRecords(CH, [
      subj({ ref: "Ex 1.4 Q.1", bucket: "exercise-subjective", solution: undefined }),
    ]);
    expect(flags).toHaveLength(0);
  });

  it("throws when a subjective question carries options", () => {
    expect(() =>
      buildRecords(CH, [subj({ options: [{ label: "A", text: "x" }] })])
    ).toThrow(/must not carry options/);
  });

  it("gives mcq and subjective the same stem DIFFERENT hashes (namespaced)", () => {
    const stem = "Which of the following is true?";
    const [m] = buildRecords(CH, [mcq({ stem })]).rows;
    const [s] = buildRecords(CH, [subj({ stem, solution: "yes" })]).rows;
    expect(m.contentHash).not.toBe(s.contentHash);
  });
});

describe("buildRecords — set grouping + validation", () => {
  it("carries context + setLabel through for set-based sub-items", () => {
    const { rows } = buildRecords(CH, [
      subj({ ref: "Ex 1.1 Q.1 (i)", bucket: "exercise-subjective", solution: undefined, context: "State which are statements.", setLabel: "ex1.1-q1", stem: "5 + 4 = 13." }),
      subj({ ref: "Ex 1.1 Q.1 (ii)", bucket: "exercise-subjective", solution: undefined, context: "State which are statements.", setLabel: "ex1.1-q1", stem: "Close the door." }),
    ]);
    expect(rows[0].context).toBe("State which are statements.");
    expect(rows[0].setLabel).toBe("ex1.1-q1");
    // Same context, different stem → distinct hashes (siblings don't collide).
    expect(rows[0].contentHash).not.toBe(rows[1].contentHash);
  });

  it("throws on an unknown subtopic", () => {
    expect(() => buildRecords(CH, [mcq({ subtopic: "Nonexistent" })])).toThrow(/not one of/);
  });

  it("throws on an invalid difficulty", () => {
    expect(() => buildRecords(CH, [mcq({ difficulty: "TRIVIAL" })])).toThrow(/EASY\|MODERATE\|HARD/);
  });

  it("throws on a duplicate ref", () => {
    expect(() => buildRecords(CH, [mcq(), mcq()])).toThrow(/duplicate ref/);
  });
});

describe("latexImbalances", () => {
  it("returns [] for balanced rows", () => {
    const { rows } = buildRecords(CH, [mcq(), subj()]);
    expect(latexImbalances(rows)).toEqual([]);
  });

  it("flags an unbalanced delimiter in a stem", () => {
    const { rows } = buildRecords(CH, [mcq({ stem: "Bad \\(p \\wedge q" })]);
    const bad = latexImbalances(rows);
    expect(bad).toHaveLength(1);
    expect(bad[0]).toMatch(/stem/);
  });
});
