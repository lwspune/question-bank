/**
 * The Ask V event a card sends to V's window, and what the window sends on to
 * /api/chat/typed: a bank question by id, or (2026-10-20) a practice question
 * in the notes by concept and position.
 */
import { describe, it, expect } from "vitest";
import { askVMessage, isAskVDetail, questionForRequest } from "@/lib/chat/askVEvent";

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
});
