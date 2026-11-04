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

  it("commits a NAT keyed as a range with both ends (migration 0214)", () => {
    const plan = planPaper(paper(q({ n: 14, type: "NAT", options: [] })), key({ n: 14, type: "NAT", range: [470, 480] }));
    expect(plan.issues).toEqual([]);
    expect(plan.held).toEqual([]);
    expect(plan.rows[0]).toMatchObject({ n: 14, format: "numeric", numericAnswer: 470, numericAnswerMax: 480 });
    expect(numericPayload(plan.rows[0], null)).toMatchObject({ numericAnswer: 470, numericAnswerMax: 480 });
  });

  it("commits an MSQ with its whole correct set (migration 0214)", () => {
    const plan = planPaper(paper(q({ n: 15, type: "MSQ" })), key({ n: 15, type: "MSQ", sets: [["B", "A"]] }));
    expect(plan.issues).toEqual([]);
    expect(plan.held).toEqual([]);
    expect(plan.rows[0]).toMatchObject({ n: 15, format: "msq", answers: ["A", "B"] });
    expect(toCommitRow(plan.rows[0], null)).toMatchObject({ questionFormat: "msq", answer: "A, B", flawed: false });
  });

  it("refuses an MSQ with no solution: it ships now, so it must be settled", () => {
    const plan = planPaper(paper(q({ n: 22, type: "MSQ", solution: null })), key({ n: 22, type: "MSQ", sets: [["A", "B", "D"]] }));
    expect(plan.issues).toEqual(["Q22: no solution"]);
  });

  it("refuses an MSQ whose options are malformed", () => {
    const plan = planPaper(paper(q({ n: 22, type: "MSQ", options: [] })), key({ n: 22, type: "MSQ", sets: [["A"]] }));
    expect(plan.issues).toEqual(["Q22: options must be A, B, C, D"]);
  });

  it("keeps the first of two accepted MSQ sets, with a note and grace (owner, 2026-11-04)", () => {
    const [row] = planPaper(paper(q({ n: 18, type: "MSQ" })), key({ n: 18, type: "MSQ", sets: [["B", "C"], ["B", "C", "D"]] })).rows;
    expect(row).toMatchObject({ format: "msq", answers: ["B", "C"] });
    expect(row.notice).toBe("IIT Bombay's final key accepts both B, C and B, C, D, so either earns full marks. The answer marked here is B, C.");
    expect(toCommitRow(row, null).flawed).toBe(true);
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

describe("keys IIT Bombay marks as defective (owner policy, 2026-10-29)", () => {
  it("keeps the first of two accepted MCQ answers, with a note above the solution and the row flawed", () => {
    const [row] = planPaper(paper(q({ n: 79 })), key({ n: 79, type: "MCQ", value: "A", also: ["B"] })).rows;
    expect(row).toMatchObject({ format: "mcq", answer: "A" });
    expect(row.notice).toBe("IIT Bombay's final key accepts both A and B, so either earns full marks. The answer marked here is A.");
    expect(row.solution).toBe(`**Note:** ${row.notice}\n\n${editorial.solution}`);
    expect(toCommitRow(row, null)).toMatchObject({ answer: "A", flawed: true });
  });

  it("keeps the first of two accepted NAT values the same way", () => {
    const [row] = planPaper(
      paper(q({ n: 19, type: "NAT", options: [] })),
      key({ n: 19, type: "NAT", value: 2, also: [4] }),
    ).rows;
    expect(row).toMatchObject({ format: "numeric", numericAnswer: 2 });
    expect(row.notice).toBe("IIT Bombay's final key accepts both 2 and 4, so either earns full marks. The answer marked here is 2.");
    expect(numericPayload(row, null).solution).toBe(`**Note:** ${row.notice}\n\n${editorial.solution}`);
  });

  it("lists three or more accepted answers in one sentence", () => {
    const [row] = planPaper(paper(q({ n: 45 })), key({ n: 45, type: "MCQ", value: "B", also: ["C", "D"] })).rows;
    expect(row.notice).toBe("IIT Bombay's final key accepts any of B, C and D, so each earns full marks. The answer marked here is B.");
  });

  it("commits a question IIT Bombay cancelled with no key and its notice (migration 0119)", () => {
    const note = "IIT Bombay dropped this question in its final key and gave every candidate full marks.";
    const [row] = planPaper(paper(q({ n: 67 })), key({ n: 67, type: "MCQ", cancelled: note })).rows;
    expect(row).toMatchObject({ format: "mcq", answer: "CANCELLED", cancelledNote: note });
    expect(row.notice).toBeUndefined();
    expect(row.solution).toBe(editorial.solution);
    expect(toCommitRow(row, null)).toMatchObject({ answer: "CANCELLED", cancelledNote: note, flawed: false });
  });

  it("commits a cancelled MSQ with no key, and a range that also accepts a single value with a note", () => {
    const plan = planPaper(
      paper(q({ n: 36, type: "MSQ" }), q({ n: 12, type: "NAT", options: [] })),
      key({ n: 36, type: "MSQ", cancelled: "Full marks to all." }, { n: 12, type: "NAT", range: [1.12, 1.14], also: [65] }),
    );
    expect(plan.issues).toEqual([]);
    expect(plan.held).toEqual([]);
    expect(plan.rows[0]).toMatchObject({ n: 36, format: "msq", answers: [], cancelledNote: "Full marks to all." });
    expect(toCommitRow(plan.rows[0], null)).toMatchObject({ questionFormat: "msq", answer: "CANCELLED" });
    expect(plan.rows[1]).toMatchObject({ n: 12, format: "numeric", numericAnswer: 1.12, numericAnswerMax: 1.14 });
    expect(plan.rows[1].notice).toBe("IIT Bombay's final key accepts both 1.12 to 1.14 and 65, so either earns full marks. The answer marked here is 1.12 to 1.14.");
  });

  it("refuses an accepted alternative that is not A-D, or repeats the key", () => {
    const plan = planPaper(
      paper(q({ n: 30 }), q({ n: 31 })),
      key({ n: 30, type: "MCQ", value: "A", also: ["E"] }, { n: 31, type: "MCQ", value: "A", also: ["A"] }),
    );
    expect(plan.issues).toEqual(['Q30: also-accepted "E" is not A-D', 'Q31: also-accepted "A" repeats the key']);
  });
});

describe("a question defective as printed (owner policy, 2026-10-29)", () => {
  it("keeps IIT Bombay's key, opens the solution with the defect, and is grace in mocks", () => {
    const defect = "The printed figure shows one still frame of an animation the online test played, so the answer cannot be worked out from print.";
    const [row] = planPaper(paper(q({ n: 31, defect })), key({ n: 31, type: "MCQ", value: "D" })).rows;
    expect(row).toMatchObject({ format: "mcq", answer: "D", notice: defect });
    expect(row.solution).toBe(`**Note:** ${defect}\n\n${editorial.solution}`);
    expect(toCommitRow(row, null).flawed).toBe(true);
  });

  it("puts a defect and a two-answer key in one note", () => {
    const [row] = planPaper(paper(q({ n: 31, defect: "The figure is faint." })), key({ n: 31, type: "MCQ", value: "A", also: ["B"] })).rows;
    expect(row.notice).toBe("The figure is faint. IIT Bombay's final key accepts both A and B, so either earns full marks. The answer marked here is A.");
  });

  it("refuses a defect note with a dash", () => {
    const plan = planPaper(paper(q({ n: 31, defect: "Faint — sorry." })), key({ n: 31, type: "MCQ", value: "A" }));
    expect(plan.issues).toEqual(["Q31: defect note has a dash, write a full stop or comma"]);
  });
});
