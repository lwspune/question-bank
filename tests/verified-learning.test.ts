/**
 * Verified learning (V_LEARNING_LOOP.md step 1, 2026-11-10): a student shows a
 * learning need (a graded miss, or a V explanation), then gets a DIFFERENT
 * question in the same subtopic right within 7 days. The weekly count behind
 * `npm run v:learning`.
 */
import { describe, it, expect } from "vitest";
import {
  VERIFY_WINDOW_MS,
  answerFromActivity,
  mockAnswer,
  needFromActivity,
  verifiedLearning,
  type LoopAnswer,
  type LoopNeed,
} from "@/lib/chat/verifiedLearning";

const MIN = 60_000;
const DAY = 86_400_000;
// 2026-11-02 06:00 UTC = 11:30 IST, a Monday.
const T0 = Date.UTC(2026, 10, 2, 6, 0);
const at = (min: number) => T0 + min * MIN;

const need = (over: Partial<LoopNeed> = {}): LoopNeed => ({ userId: "u1", questionId: "q1", subtopicId: "s1", at: at(0), ...over });
const answer = (over: Partial<LoopAnswer> = {}): LoopAnswer => ({
  userId: "u1",
  questionId: "q2",
  subtopicId: "s1",
  at: at(10),
  correct: true,
  ...over,
});
const week = { from: T0 - DAY, to: T0 + 6 * DAY, now: T0 + 30 * DAY };

describe("answerFromActivity: which records are graded answers", () => {
  const row = (kind: string, metadata: Record<string, unknown>) => ({ kind, metadata });

  it("reads a tapped answer's verdict from question_practiced (bank, board, V card)", () => {
    expect(answerFromActivity(row("question_practiced", { surface: "bank", chose: "B", correct: false }))).toEqual({ correct: false });
    expect(answerFromActivity(row("question_practiced", { surface: "v", chose: "A", correct: true }))).toEqual({ correct: true });
  });

  it("ignores a plain reveal with no verdict", () => {
    expect(answerFromActivity(row("question_practiced", { surface: "board" }))).toBeNull();
  });

  it("reads the drill's own right and wrong rows when the student picked an option", () => {
    expect(answerFromActivity(row("answer_wrong", { surface: "drill", chose: "C" }))).toEqual({ correct: false });
    expect(answerFromActivity(row("answer_correct", { surface: "drill", chose: "A" }))).toEqual({ correct: true });
  });

  it("leaves out self-marked answers: nobody checked them", () => {
    expect(answerFromActivity(row("answer_correct", { surface: "drill", selfMark: "understood" }))).toBeNull();
    expect(answerFromActivity(row("question_practiced", { surface: "drill", selfMark: "understood", correct: true }))).toBeNull();
  });

  it("does not count a bank or mock miss twice (their answer is read elsewhere)", () => {
    expect(answerFromActivity(row("answer_wrong", { surface: "bank", chose: "B" }))).toBeNull();
    expect(answerFromActivity(row("answer_wrong", {}))).toBeNull();
    expect(answerFromActivity(row("answer_correct", {}))).toBeNull();
  });
});

describe("needFromActivity: which misses are learning needs", () => {
  it("counts a graded miss from any surface, mocks included", () => {
    expect(needFromActivity({ kind: "answer_wrong", metadata: { surface: "bank", chose: "B" } })).toBe(true);
    expect(needFromActivity({ kind: "answer_wrong", metadata: {} })).toBe(true);
    expect(needFromActivity({ kind: "answer_wrong", metadata: { surface: "drill", chose: "C" } })).toBe(true);
  });

  it("does not count Review later, a self-mark, or any other kind", () => {
    expect(needFromActivity({ kind: "answer_wrong", metadata: { surface: "board", selfMark: "review" } })).toBe(false);
    expect(needFromActivity({ kind: "answer_correct", metadata: {} })).toBe(false);
  });
});

describe("mockAnswer: grading a mock pick against the key", () => {
  it("is right when the pick is a correct option, wrong otherwise", () => {
    expect(mockAnswer("B", ["B"])).toBe(true);
    expect(mockAnswer("A", ["B"])).toBe(false);
  });

  it("skips an unanswered question and a question with no option key (numeric)", () => {
    expect(mockAnswer(null, ["B"])).toBeNull();
    expect(mockAnswer("B", [])).toBeNull();
  });
});

describe("verifiedLearning", () => {
  it("verifies a need when a different question in the same subtopic is answered right within 7 days", () => {
    const r = verifiedLearning([need()], [answer()], week);
    expect(r).toMatchObject({ needs: 1, students: 1, verifiedNeeds: 1, verifiedStudents: 1 });
  });

  it("does not verify on the same question, another subtopic, a wrong answer or another student", () => {
    const answers = [
      answer({ questionId: "q1" }),
      answer({ subtopicId: "s2" }),
      answer({ correct: false }),
      answer({ userId: "u2" }),
    ];
    expect(verifiedLearning([need()], answers, week).verifiedNeeds).toBe(0);
  });

  it("needs the right answer AFTER the need and inside the window", () => {
    const answers = [answer({ at: at(-5) }), answer({ at: at(0) }), answer({ at: at(0) + VERIFY_WINDOW_MS + 1 })];
    expect(verifiedLearning([need()], answers, week).verifiedNeeds).toBe(0);
    expect(verifiedLearning([need()], [answer({ at: at(0) + VERIFY_WINDOW_MS })], week).verifiedNeeds).toBe(1);
  });

  it("lets an answer after the week's end verify a need inside it", () => {
    const r = verifiedLearning([need({ at: week.to - MIN })], [answer({ at: week.to + DAY })], week);
    expect(r.verifiedNeeds).toBe(1);
  });

  it("counts only needs inside the week", () => {
    const r = verifiedLearning([need({ at: week.from - MIN }), need({ at: week.to })], [answer({ at: week.to + MIN })], week);
    expect(r.needs).toBe(0);
  });

  it("counts a student once, and a repeat need on the same question and day once", () => {
    const needs = [need(), need({ at: at(30) }), need({ questionId: "q3" })];
    const r = verifiedLearning(needs, [answer({ at: at(60) })], week);
    expect(r).toMatchObject({ needs: 2, students: 1, verifiedNeeds: 2, verifiedStudents: 1 });
  });

  it("keeps the same question on another IST day as a new need", () => {
    const r = verifiedLearning([need(), need({ at: at(0) + DAY })], [], week);
    expect(r.needs).toBe(2);
  });

  it("says when the week's last answers can still arrive", () => {
    expect(verifiedLearning([], [], week).stillOpen).toBe(false);
    expect(verifiedLearning([], [], { ...week, now: week.to + DAY }).stillOpen).toBe(true);
  });

  describe("before and after: the student's own accuracy in the subtopic", () => {
    it("compares the 30 days before the WEEK with the 7 days after the first need", () => {
      const answers = [
        answer({ questionId: "q8", at: week.from - 2 * DAY, correct: false }),
        answer({ questionId: "q9", at: week.from - 60 * MIN, correct: true }),
        answer({ questionId: "q2", at: at(60), correct: true }),
        answer({ questionId: "q3", at: at(120), correct: true }),
        answer({ questionId: "q4", at: at(180), correct: false }),
      ];
      const r = verifiedLearning([need(), need({ questionId: "q5", at: at(100) })], answers, week);
      // One student-subtopic pair, measured from its FIRST need at minute 0.
      expect(r.beforeAfter).toEqual({ pairs: 1, beforeRight: 1, beforeTotal: 2, afterRight: 2, afterTotal: 3 });
    });

    it("does not read the week's own answers before the need as 'before': the first miss of a week follows only right ones", () => {
      const answers = [answer({ questionId: "q9", at: at(-60) }), answer({ at: at(60) })];
      expect(verifiedLearning([need()], answers, week).beforeAfter.pairs).toBe(0);
    });

    it("leaves out a pair with no answer before or none after", () => {
      const r = verifiedLearning([need()], [answer({ at: at(60) })], week);
      expect(r.beforeAfter.pairs).toBe(0);
    });

    it("ignores answers older than 30 days before the week and the need's own question", () => {
      const answers = [
        answer({ questionId: "q8", at: week.from - 31 * DAY }),
        answer({ questionId: "q1", at: week.from - 60 * MIN }),
        answer({ at: at(60) }),
      ];
      expect(verifiedLearning([need()], answers, week).beforeAfter.pairs).toBe(0);
    });
  });
});
