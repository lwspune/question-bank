/**
 * The Ask V event a card sends to V's window, and what the window sends on to
 * /api/chat/typed: a bank question by id, or (2026-10-20) a practice question
 * in the notes by concept and position.
 */
import { describe, it, expect } from "vitest";
import { answerIn, askedFromReview, askVMessage, chosenIn, isAskVDetail, isAskVMessage, questionForRequest } from "@/lib/chat/askVEvent";

const ID = "11111111-1111-4111-8111-111111111111";

describe("isAskVDetail", () => {
  it("takes a bank question or a notes item", () => {
    expect(isAskVDetail({ questionId: ID, chose: "B" })).toBe(true);
    expect(isAskVDetail({ notes: { concept: "benzylic", item: "practice", index: 1 }, chose: null })).toBe(true);
  });

  it("refuses anything else", () => {
    expect(isAskVDetail(null)).toBe(false);
    expect(isAskVDetail({ chose: "B" })).toBe(false);
    expect(isAskVDetail({ notes: "x", chose: null })).toBe(false);
  });
});

describe("questionForRequest", () => {
  it("sends a bank question as its id and pick", () => {
    expect(questionForRequest({ questionId: ID, chose: "B" })).toEqual({ id: ID, chose: "B" });
  });

  it("sends a numeric answer and a skip, when the card knows them", () => {
    expect(questionForRequest({ questionId: ID, chose: null, entered: 12 })).toEqual({ id: ID, chose: null, entered: 12 });
    expect(questionForRequest({ questionId: ID, chose: null, skipped: true })).toEqual({ id: ID, chose: null, skipped: true });
  });

  it("sends a notes item as itself, with no id", () => {
    const notes = { concept: "benzylic", item: "practice" as const, index: 1 };
    expect(questionForRequest({ notes, chose: null })).toEqual({ notes });
  });
});

describe("the Ask V tap's message", () => {
  it("says which option they picked, if any", () => {
    expect(askVMessage(null)).toBe("Explain this question.");
    expect(askVMessage("B")).toBe("I picked (B). Explain this question.");
  });

  // 2026-10-24: a student on a mock result had skipped the question, and V asked which option they picked.
  it("says what they entered, or that they skipped it", () => {
    expect(askVMessage(null, { entered: 12.5 })).toBe("I entered 12.5. Explain this question.");
    expect(askVMessage(null, { entered: 0 })).toBe("I entered 0. Explain this question.");
    expect(askVMessage(null, { entered: -3 })).toBe("I entered -3. Explain this question.");
    expect(askVMessage(null, { skipped: true })).toBe("I skipped this one. Explain this question.");
    expect(askVMessage("C", { skipped: true })).toBe("I picked (C). Explain this question.");
  });

  it("is recognised as an Ask V message in every form, and the pick is read back", () => {
    for (const m of [askVMessage(null), askVMessage("B"), askVMessage(null, { entered: 12.5 }), askVMessage(null, { entered: -3 }), askVMessage(null, { skipped: true })]) {
      expect(isAskVMessage(m)).toBe(true);
    }
    expect(chosenIn(askVMessage("B"))).toBe("B");
    expect(chosenIn(askVMessage(null, { entered: 4 }))).toBeNull();
    expect(chosenIn(askVMessage(null, { skipped: true }))).toBeNull();
    expect(isAskVMessage("I skipped school. Explain this question.")).toBe(false);
  });

  // The V test harness rebuilds the tap from the stored message, so what the message says must read back.
  it("reads back a number entered and a skip", () => {
    expect(answerIn(askVMessage(null, { entered: -2.5 }))).toEqual({ entered: -2.5, skipped: false });
    expect(answerIn(askVMessage(null, { entered: 0 }))).toEqual({ entered: 0, skipped: false });
    expect(answerIn(askVMessage(null, { skipped: true }))).toEqual({ entered: null, skipped: true });
    expect(answerIn(askVMessage("B"))).toEqual({ entered: null, skipped: false });
    expect(answerIn("I entered 5 marks. Explain this question.")).toEqual({ entered: null, skipped: false });
  });
});

describe("askedFromReview", () => {
  it("passes an MCQ pick, or a skip when there is none", () => {
    expect(askedFromReview({ format: "mcq", selectedLabel: "B", numericResponse: null })).toEqual({ chose: "B", entered: null, skipped: false });
    expect(askedFromReview({ format: "mcq", selectedLabel: null, numericResponse: null })).toEqual({ chose: null, entered: null, skipped: true });
  });

  it("passes a numeric answer, 0 included, or a skip when nothing was entered", () => {
    expect(askedFromReview({ format: "numeric", selectedLabel: null, numericResponse: 0 })).toEqual({ chose: null, entered: 0, skipped: false });
    expect(askedFromReview({ format: "numeric", selectedLabel: null, numericResponse: 7.5 })).toEqual({ chose: null, entered: 7.5, skipped: false });
    expect(askedFromReview({ format: "numeric", selectedLabel: null, numericResponse: null })).toEqual({ chose: null, entered: null, skipped: true });
  });
});
