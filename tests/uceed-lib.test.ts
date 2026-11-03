import { describe, expect, it } from "vitest";
import { numericContentHash } from "../src/lib/upload/hash";
import { figureAwareHash } from "../scripts/ssc-cgl/figures";
import {
  numericPayload,
  planPaper,
  toCommitRow,
  type UceedKey,
  type UceedPaper,
  type UceedQuestion,
} from "../scripts/uceed/lib";

const editorial = {
  subject: "Observation and Design Sensitivity",
  chapter: "Counting in Compositions",
  subtopic: "Counting shapes",
  difficulty: "Moderate",
  solution: "Count the crosses row by row: 7 in each of the two rows, so 14.",
};

const q = (over: Partial<UceedQuestion>): UceedQuestion => ({
  n: 1,
  type: "MCQ",
  text: "Which one?",
  options: ["A", "B", "C", "D"].map((label) => ({ label, text: `opt ${label}` })),
  figure: false,
  ...editorial,
  ...over,
});

const paper = (...questions: UceedQuestion[]): UceedPaper => ({ year: 2026, questions });
const key = (...answers: UceedKey["answers"]): UceedKey => ({ year: 2026, answers });

describe("planPaper", () => {
  it("commits a keyed MCQ with its letter", () => {
    const plan = planPaper(paper(q({ n: 30 })), key({ n: 30, type: "MCQ", value: "C" }));
    expect(plan.issues).toEqual([]);
    expect(plan.rows).toHaveLength(1);
    expect(plan.rows[0]).toMatchObject({ n: 30, format: "mcq", answer: "C" });
  });

  it("commits an exact NAT with its number", () => {
    const plan = planPaper(paper(q({ n: 12, type: "NAT", options: [] })), key({ n: 12, type: "NAT", value: 16.8 }));
    expect(plan.issues).toEqual([]);
    expect(plan.rows[0]).toMatchObject({ n: 12, format: "numeric", numericAnswer: 16.8 });
  });

  it("holds a NAT keyed as a range: the bank stores one exact value", () => {
    const plan = planPaper(paper(q({ n: 14, type: "NAT", options: [] })), key({ n: 14, type: "NAT", range: [470, 480] }));
    expect(plan.rows).toEqual([]);
    expect(plan.held).toEqual([{ n: 14, reason: "range" }]);
    expect(plan.issues).toEqual([]);
  });

  it("holds every MSQ: the bank has no multiple-select format", () => {
    const plan = planPaper(paper(q({ n: 15, type: "MSQ" })), key({ n: 15, type: "MSQ", sets: [["A", "B"]] }));
    expect(plan.rows).toEqual([]);
    expect(plan.held).toEqual([{ n: 15, reason: "msq" }]);
  });

  it("refuses a picture-option question that has no figure to show the options", () => {
    const pic = q({ n: 33, options: ["A", "B", "C", "D"].map((label) => ({ label, text: "[figure]" })) });
    const plan = planPaper(paper(pic), key({ n: 33, type: "MCQ", value: "B" }));
    expect(plan.issues).toEqual(["Q33: options are in the figure but the question has no figure"]);
  });

  it("refuses a question the key does not answer, and a key entry for no question", () => {
    const plan = planPaper(paper(q({ n: 30 })), key({ n: 31, type: "MCQ", value: "A" }));
    expect(plan.issues).toEqual(["Q30: not in the key", "Q31: in the key but not transcribed"]);
  });

  it("refuses a key whose type disagrees with the paper's section", () => {
    const plan = planPaper(paper(q({ n: 30 })), key({ n: 30, type: "NAT", value: 3 }));
    expect(plan.issues).toEqual(["Q30: paper says MCQ, key says NAT"]);
  });

  it("refuses a question missing its classification, difficulty or solution", () => {
    const plan = planPaper(paper(q({ n: 30, chapter: null, solution: "  " })), key({ n: 30, type: "MCQ", value: "A" }));
    expect(plan.issues).toEqual(["Q30: no chapter", "Q30: no solution"]);
  });

  it("refuses an em dash or spaced dash in a solution (owner rule, 2026-10-05)", () => {
    const plan = planPaper(
      paper(q({ n: 30, solution: "Light filters colour — so B." }), q({ n: 31, solution: "So B -- not C." })),
      key({ n: 30, type: "MCQ", value: "A" }, { n: 31, type: "MCQ", value: "B" }),
    );
    expect(plan.issues).toEqual(["Q30: solution has a dash, write a full stop or comma", "Q31: solution has a dash, write a full stop or comma"]);
  });

  it("refuses an MCQ that does not print exactly A-D", () => {
    const plan = planPaper(paper(q({ n: 30, options: [{ label: "A", text: "x" }] })), key({ n: 30, type: "MCQ", value: "A" }));
    expect(plan.issues).toEqual(["Q30: options must be A, B, C, D"]);
  });
});

describe("toCommitRow", () => {
  it("maps an MCQ to the shared row shape, picture options as [figure]", () => {
    const pic = q({ n: 33, figure: true, options: ["A", "B", "C", "D"].map((label) => ({ label, text: "[figure]" })) });
    const [row] = planPaper(paper(pic), key({ n: 33, type: "MCQ", value: "B" })).rows;
    const c = toCommitRow(row, "C:/figs/Q33.png");
    expect(c).toMatchObject({
      sourceRow: 33,
      questionNumber: "33",
      subject: editorial.subject,
      chapter: editorial.chapter,
      subtopic: editorial.subtopic,
      question: "Which one?",
      optionA: "[figure]",
      optionD: "[figure]",
      answer: "B",
      difficulty: "Moderate",
      flawed: false,
      figures: { stem: "C:/figs/Q33.png", options: null },
    });
  });
});

describe("numericPayload", () => {
  const [row] = planPaper(
    paper(q({ n: 1, type: "NAT", options: [], text: "How many?" })),
    key({ n: 1, type: "NAT", value: 14 }),
  ).rows;

  it("hashes like any NAT when there is no figure", () => {
    const p = numericPayload(row, null);
    expect(p).toMatchObject({ questionFormat: "numeric", numericAnswer: 14, options: [], difficulty: "MODERATE", questionNumber: "1" });
    expect(p.contentHash).toBe(numericContentHash("How many?", null));
  });

  it("folds the figure into the hash, so two 'How many?' questions with different pictures stay apart", () => {
    const a = numericPayload(row, Buffer.from("picture one"));
    const b = numericPayload(row, Buffer.from("picture two"));
    expect(a.contentHash).toBe(figureAwareHash(numericContentHash("How many?", null), [Buffer.from("picture one")]));
    expect(a.contentHash).not.toBe(b.contentHash);
  });
});
