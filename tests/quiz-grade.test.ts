import { describe, it, expect } from "vitest";
import { gradeQuiz, DEFAULT_MARKING, type GradedQuestion } from "@/lib/quiz/grade";

// Ported from nda-tracker's gradeQuizAttempt (src/lib/quiz.js) so the public
// funnel grades IDENTICALLY to how the student app would. Pure — no I/O.
const KEY: GradedQuestion[] = [
  { q: 1, answer: "A" },
  { q: 2, answer: "B" },
  { q: 3, answer: "C" },
  { q: 4, answer: "D" },
];

describe("gradeQuiz", () => {
  it("scores an all-correct attempt", () => {
    const r = gradeQuiz(KEY, { "1": "A", "2": "B", "3": "C", "4": "D" });
    expect(r).toMatchObject({ correct: 4, incorrect: 0, notAttempted: 0, score: 4 });
    expect(r.responses).toEqual({ "1": 1, "2": 1, "3": 1, "4": 1 });
  });

  it("scores an all-wrong attempt under default marking (wrong = 0)", () => {
    const r = gradeQuiz(KEY, { "1": "B", "2": "C", "3": "D", "4": "A" });
    expect(r).toMatchObject({ correct: 0, incorrect: 4, notAttempted: 0, score: 0 });
    expect(r.responses).toEqual({ "1": -1, "2": -1, "3": -1, "4": -1 });
  });

  it("counts blanks/missing as notAttempted with a 0 response", () => {
    const r = gradeQuiz(KEY, { "1": "A", "3": "" });
    expect(r).toMatchObject({ correct: 1, incorrect: 0, notAttempted: 3 });
    expect(r.responses).toEqual({ "1": 1, "2": 0, "3": 0, "4": 0 });
  });

  it("mixes correct / incorrect / not-attempted", () => {
    const r = gradeQuiz(KEY, { "1": "A", "2": "A", "4": "D" });
    expect(r).toMatchObject({ correct: 2, incorrect: 1, notAttempted: 1, score: 2 });
    expect(r.responses).toEqual({ "1": 1, "2": -1, "3": 0, "4": 1 });
  });

  it("applies custom negative marking", () => {
    const r = gradeQuiz(KEY, { "1": "A", "2": "A", "3": "C", "4": "" }, { correct: 4, wrong: -1 });
    // 2 correct (×4 = 8), 1 wrong (×-1 = -1), 1 blank → 7
    expect(r).toMatchObject({ correct: 2, incorrect: 1, notAttempted: 1, score: 7 });
  });

  it("is case-insensitive on chosen letters and the key", () => {
    const r = gradeQuiz([{ q: 1, answer: "a" }], { "1": "A" });
    expect(r).toMatchObject({ correct: 1, score: 1 });
  });

  it("returns zeros for an empty quiz", () => {
    const r = gradeQuiz([], {});
    expect(r).toEqual({ correct: 0, incorrect: 0, notAttempted: 0, score: 0, responses: {} });
  });

  it("defaults marking to DEFAULT_MARKING when omitted", () => {
    expect(DEFAULT_MARKING).toEqual({ correct: 1, wrong: 0 });
    const r = gradeQuiz(KEY, { "1": "A" });
    expect(r.score).toBe(1);
  });

  it("ignores answers for question numbers not in the key", () => {
    const r = gradeQuiz([{ q: 1, answer: "A" }], { "1": "A", "9": "B" });
    expect(r).toMatchObject({ correct: 1, incorrect: 0, notAttempted: 0 });
    expect(r.responses).toEqual({ "1": 1 });
  });
});
