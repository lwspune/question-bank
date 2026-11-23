/**
 * The question card inside V (2026-10-19, study-partner Phase 1): "Try a
 * similar one" and "Is this your question?" show a bank question in the chat
 * window. What the browser gets carries no answer; the answer is checked on
 * the server, which is also where it counts as one of the day's free answers.
 */
import { describe, it, expect } from "vitest";
import { canTryOnCard, cardView, gradeCard, vCardAnswerKind } from "@/lib/chat/questionCard";
import type { VQuestion } from "@/lib/chat/questionTools";

const Q: VQuestion = {
  id: "q1",
  text: "What is \\(2+2\\)?",
  context: null,
  hasFigure: false,
  solution: "Add them: 4.",
  format: "mcq",
  numericAnswer: null,
  options: [
    { label: "A", text: "3", isCorrect: false },
    { label: "B", text: "4", isCorrect: true },
  ],
  exam: "NDA",
  subject: "Mathematics",
  chapter: "Arithmetic",
  subtopic: "Addition",
  subtopicId: "s1",
  origin: null,
};

describe("cardView", () => {
  it("carries the question and its options, and never which one is right", () => {
    const v = cardView(Q, null);
    expect(v).toEqual({
      id: "q1",
      text: "What is \\(2+2\\)?",
      context: null,
      imageUrl: null,
      where: "NDA · Arithmetic",
      options: [
        { label: "A", text: "3" },
        { label: "B", text: "4" },
      ],
    });
    expect(JSON.stringify(v)).not.toMatch(/isCorrect|true/);
  });
});

describe("gradeCard", () => {
  it("says whether the pick is right and names the key", () => {
    expect(gradeCard(Q, "A")).toEqual({ correct: false, answer: "B" });
    expect(gradeCard(Q, "b")).toEqual({ correct: true, answer: "B" });
  });

  it("refuses a pick that is not one of the options", () => {
    expect(gradeCard(Q, "D")).toBeNull();
    expect(gradeCard(Q, "")).toBeNull();
  });

  it("refuses to grade a question with no marked answer", () => {
    expect(gradeCard({ ...Q, options: Q.options.map((o) => ({ ...o, isCorrect: false })) }, "A")).toBeNull();
  });
});

// 2026-11-23 (owner): a lesson's "Your turn" is the student's own mistake, so it must be one the card can grade.
describe("canTryOnCard", () => {
  it("a multiple-choice question with a marked answer, figure or not (the card shows the figure)", () => {
    expect(canTryOnCard(Q)).toBe(true);
    expect(canTryOnCard({ ...Q, hasFigure: true })).toBe(true);
  });

  it("not a written, numeric or multi-answer question, one with no marked answer, or none at all", () => {
    expect(canTryOnCard({ ...Q, format: "subjective" })).toBe(false);
    expect(canTryOnCard({ ...Q, format: "numeric" })).toBe(false);
    expect(canTryOnCard({ ...Q, format: "msq" })).toBe(false);
    expect(canTryOnCard({ ...Q, options: Q.options.map((o) => ({ ...o, isCorrect: false })) })).toBe(false);
    expect(canTryOnCard(null)).toBe(false);
  });
});

// 2026-11-23: a right answer in V wrote only question_practiced, which the Fix list ignores, so a mistake
// answered right again in V stayed waiting. Same rule as the drill (lib/drill/service recordDrillAnswer).
describe("vCardAnswerKind", () => {
  it("wrong is a miss; right after a miss is a recovery; right first time is practice", () => {
    expect(vCardAnswerKind(false, true)).toBe("answer_wrong");
    expect(vCardAnswerKind(false, false)).toBe("answer_wrong");
    expect(vCardAnswerKind(true, true)).toBe("answer_correct");
    expect(vCardAnswerKind(true, false)).toBeNull();
  });
});
