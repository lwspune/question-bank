import { describe, it, expect } from "vitest";
import { buildPyqRecords, groupBySitting, type PyqQuestion } from "../scripts/mh-hsc-12-pyq/lib";

const CH = {
  chapterName: "Mathematical Logic",
  subjectName: "Mathematics",
  subtopics: ["Quantifiers, Duality and Negation of Statements", "Truth Tables of Compound Statements"],
};

const mcq = (over: Partial<PyqQuestion> = {}): PyqQuestion => ({
  ref: "logic-12-pyq#1",
  questionNumber: "Q. 1. (A) i.",
  pyqYear: 2016,
  pyqMonth: "March",
  format: "mcq",
  subtopic: CH.subtopics[0],
  difficulty: "EASY",
  stem: "The negation of \\(p \\land (q \\rightarrow r)\\) is __________.",
  options: [
    { label: "A", text: "\\(p\\)" },
    { label: "B", text: "\\(q\\)" },
    { label: "C", text: "\\(r\\)" },
    { label: "D", text: "\\(\\sim p \\vee (q \\land \\sim r)\\)" },
  ],
  answer: "D",
  ...over,
});

const subj = (over: Partial<PyqQuestion> = {}): PyqQuestion => ({
  ref: "logic-12-pyq#19",
  questionNumber: "Q. 3",
  pyqYear: 2024,
  pyqMonth: null,
  format: "subjective",
  subtopic: CH.subtopics[1],
  difficulty: "MODERATE",
  stem: "Construct the truth table for \\([(p \\rightarrow q) \\land q] \\rightarrow p\\).",
  solution: "| \\(p\\) | \\(q\\) |\n|---|---|\n| T | T |",
  ...over,
});

describe("buildPyqRecords", () => {
  it("marks the derived key correct and the other three not", () => {
    const { rows, flags } = buildPyqRecords(CH, [mcq()]);
    expect(flags).toEqual([]);
    expect(rows[0].options.map((o) => o.isCorrect)).toEqual([false, false, false, true]);
    expect(rows[0].questionFormat).toBe("mcq");
    expect(rows[0].questionNumber).toBe("Q. 1. (A) i.");
  });

  // A board paper ships NO key, so an unanswered MCQ is a real state and must not
  // become a silent guess. The row is kept (the question is still real) with no
  // correct option, and stays PRIVATE until someone answers it.
  it("keeps an MCQ with no derived key, flagged and with nothing marked correct", () => {
    const { rows, flags } = buildPyqRecords(CH, [mcq({ answer: undefined })]);
    expect(rows[0].options.every((o) => !o.isCorrect)).toBe(true);
    expect(flags).toHaveLength(1);
    expect(flags[0].reason).toMatch(/no derived key/i);
  });

  it("refuses a key naming an option that does not exist", () => {
    expect(() => buildPyqRecords(CH, [mcq({ answer: "E" })])).toThrow(/answer "E"/);
  });

  it("emits a subjective row with zero options and the answer in solution", () => {
    const { rows } = buildPyqRecords(CH, [subj()]);
    expect(rows[0].questionFormat).toBe("subjective");
    expect(rows[0].options).toEqual([]);
    expect(rows[0].solution).toContain("|---|---|");
  });

  // content_hash is the dedup key and is computed from a DIFFERENT namespaced
  // helper for subjective rows — an MCQ hash on a subjective row could collide.
  it("gives an mcq and a subjective row with the same stem different hashes", () => {
    const a = buildPyqRecords(CH, [mcq()]).rows[0];
    const b = buildPyqRecords(CH, [subj({ ref: "x#2", stem: mcq().stem, solution: "z" })]).rows[0];
    expect(a.contentHash).not.toBe(b.contentHash);
  });

  // Pinning the project's ACTUAL bank-wide rule, which I initially got backwards:
  // the MCQ hash INCLUDES the answer letter (CLAUDE.md: "normalised question text
  // + sorted options + answer"). Consequences both ways, and both are wanted:
  //  - correcting a derived key later ORPHANS the row on re-commit, so a key fix
  //    means deleting the source's rows first, not just re-running commit;
  //  - two boards setting the same question with DIFFERENT keys stay two rows,
  //    so a cross-paper key conflict is visible rather than deduped away.
  it("changes the hash when the derived key changes", () => {
    const d = buildPyqRecords(CH, [mcq({ answer: "D" })]).rows[0].contentHash;
    const a = buildPyqRecords(CH, [mcq({ answer: "A" })]).rows[0].contentHash;
    expect(d).not.toBe(a);
  });

  it("hashes an unanswered MCQ without throwing", () => {
    expect(buildPyqRecords(CH, [mcq({ answer: undefined })]).rows[0].contentHash).toMatch(/^[0-9a-f]{64}$/);
  });

  it("refuses a subtopic outside the chapter's axis", () => {
    expect(() => buildPyqRecords(CH, [mcq({ subtopic: "Invented" })])).toThrow(/not one of/);
  });

  it("refuses a duplicate ref", () => {
    expect(() => buildPyqRecords(CH, [mcq(), mcq()])).toThrow(/duplicate ref/);
  });

  it("refuses a difficulty outside EASY|MODERATE|HARD", () => {
    expect(() => buildPyqRecords(CH, [mcq({ difficulty: "TRIVIAL" })])).toThrow(/EASY/);
  });
});

describe("groupBySitting", () => {
  // pyq_year/pyq_month are set per COMMIT, not per row, but this chapter spans
  // ten sittings — so the commit runs once per sitting. Getting this wrong would
  // stamp every question with one year.
  it("splits rows by year and month", () => {
    const g = groupBySitting([
      mcq({ ref: "a", pyqYear: 2016, pyqMonth: "March" }),
      mcq({ ref: "b", pyqYear: 2016, pyqMonth: "March" }),
      mcq({ ref: "c", pyqYear: 2020, pyqMonth: "February" }),
      mcq({ ref: "d", pyqYear: 2024, pyqMonth: null }),
    ]);
    expect(g.map((x) => [x.year, x.month, x.questions.length])).toEqual([
      [2016, "March", 2],
      [2020, "February", 1],
      [2024, null, 1],
    ]);
  });

  it("keeps a null month distinct from a named one in the same year", () => {
    const g = groupBySitting([
      mcq({ ref: "a", pyqYear: 2024, pyqMonth: null }),
      mcq({ ref: "b", pyqYear: 2024, pyqMonth: "March" }),
    ]);
    expect(g).toHaveLength(2);
  });

  it("loses no question", () => {
    const qs = [mcq({ ref: "a" }), subj({ ref: "b" }), mcq({ ref: "c", pyqYear: 2019 })];
    expect(groupBySitting(qs).reduce((n, g) => n + g.questions.length, 0)).toBe(qs.length);
  });
});
