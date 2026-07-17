import { describe, it, expect } from "vitest";
import { buildPaperRecords, type PaperQuestion, type PaperCatalog } from "../scripts/mh-ssc-10/lib";

const CAT: PaperCatalog = {
  subjectName: "Algebra",
  chapters: {
    "Quadratic Equations": ["Roots of a Quadratic Equation", "Nature of Roots (Discriminant)"],
    "Arithmetic Progression": ["nth Term of an A.P."],
  },
};

const mcq = (over: Partial<PaperQuestion> = {}): PaperQuestion => ({
  ref: "Q1(A)(i)",
  format: "mcq",
  chapter: "Quadratic Equations",
  subtopic: "Roots of a Quadratic Equation",
  difficulty: "EASY",
  stem: "If 3 is a root of \\(kx^2 - 7x + 12 = 0\\) then \\(k=\\) ____.",
  options: [
    { label: "A", text: "1" },
    { label: "B", text: "-1" },
    { label: "C", text: "3" },
    { label: "D", text: "-3" },
  ],
  answer: "A",
  reviewFlag: true,
  ...over,
});

const subj = (over: Partial<PaperQuestion> = {}): PaperQuestion => ({
  ref: "Q2(B)(i)",
  format: "subjective",
  chapter: "Arithmetic Progression",
  subtopic: "nth Term of an A.P.",
  difficulty: "MODERATE",
  stem: "Find the first term of the sequence \\(t_n = 3n - 2\\).",
  solution: "\\(t_1 = 3(1) - 2 = 1\\).",
  reviewFlag: true,
  ...over,
});

describe("buildPaperRecords", () => {
  it("builds an MCQ row with the derived answer marked correct", () => {
    const { rows, flags } = buildPaperRecords(CAT, [mcq()]);
    expect(rows).toHaveLength(1);
    const r = rows[0];
    expect(r.questionFormat).toBe("mcq");
    expect(r.chapterName).toBe("Quadratic Equations");
    expect(r.subtopicName).toBe("Roots of a Quadratic Equation");
    expect(r.options.find((o) => o.isCorrect)?.label).toBe("A");
    expect(r.sourceRow).toBe(1);
    // reviewFlag surfaces as a flag but is not a DB field.
    expect(flags.some((f) => f.reason.includes("REVIEW"))).toBe(true);
  });

  it("builds a subjective row with no options and the authored solution", () => {
    const { rows } = buildPaperRecords(CAT, [subj({ reviewFlag: false })]);
    expect(rows[0].questionFormat).toBe("subjective");
    expect(rows[0].options).toEqual([]);
    expect(rows[0].solution).toContain("t_1");
  });

  it("assigns global source_row across the whole paper (mixed chapters)", () => {
    const { rows } = buildPaperRecords(CAT, [mcq(), subj(), mcq({ ref: "Q1(A)(ii)" })]);
    expect(rows.map((r) => r.sourceRow)).toEqual([1, 2, 3]);
  });

  it("throws on a chapter outside the subject catalog", () => {
    expect(() => buildPaperRecords(CAT, [mcq({ chapter: "Statistics" })])).toThrow(/not in the Algebra catalog/);
  });

  it("flags (does not throw) an off-catalog subtopic and still commits it", () => {
    const { rows, flags } = buildPaperRecords(CAT, [mcq({ subtopic: "Some New Subtopic" })]);
    expect(rows).toHaveLength(1);
    expect(rows[0].subtopicName).toBe("Some New Subtopic");
    expect(flags.some((f) => f.reason.includes("off-catalog subtopic"))).toBe(true);
  });

  it("throws on a duplicate ref", () => {
    expect(() => buildPaperRecords(CAT, [mcq(), mcq()])).toThrow(/duplicate ref/);
  });

  it("throws when a subjective question carries options", () => {
    expect(() =>
      buildPaperRecords(CAT, [subj({ options: [{ label: "A", text: "x" }] })])
    ).toThrow(/must not carry options/);
  });

  it("flags an MCQ with no derived answer (kept private, no correct option)", () => {
    const { rows, flags } = buildPaperRecords(CAT, [mcq({ answer: undefined })]);
    expect(rows[0].options.some((o) => o.isCorrect)).toBe(false);
    expect(flags.some((f) => f.reason.includes("no derived answer"))).toBe(true);
  });

  it("throws on an invalid answer letter", () => {
    expect(() => buildPaperRecords(CAT, [mcq({ answer: "E" })])).toThrow(/invalid/);
  });

  it("throws on a bad difficulty", () => {
    expect(() => buildPaperRecords(CAT, [mcq({ difficulty: "TRICKY" })])).toThrow(/EASY\|MODERATE\|HARD/);
  });

  it("throws when MCQ options are not exactly A,B,C,D", () => {
    expect(() =>
      buildPaperRecords(CAT, [mcq({ options: [{ label: "A", text: "1" }, { label: "B", text: "2" }] })])
    ).toThrow(/exactly A,B,C,D/);
  });
});
