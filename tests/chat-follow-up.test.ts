/**
 * V sees the follow-up answer (V_LEARNING_LOOP.md step 2, 2026-11-10): the
 * try card after "One more like this" is linked to the explanation it
 * followed, the first one per explanation per day is free, and its result
 * line says what the student showed.
 */
import { describe, it, expect } from "vitest";
import {
  explainedIn,
  followUpCardCopy,
  followUpEligible,
  followUpTailLine,
  parseFollowsUp,
} from "@/lib/chat/followUp";

const A = "11111111-1111-4111-8111-111111111111";
const B = "22222222-2222-4222-8222-222222222222";

describe("parseFollowsUp", () => {
  it("reads the explained question's id", () => {
    expect(parseFollowsUp(A)).toBe(A);
  });

  it("drops anything that is not a question id", () => {
    expect(parseFollowsUp(undefined)).toBeNull();
    expect(parseFollowsUp("abc")).toBeNull();
    expect(parseFollowsUp(42)).toBeNull();
  });
});

describe("followUpEligible: a different question in the same subtopic", () => {
  it("is eligible for another question of the explained question's subtopic", () => {
    expect(followUpEligible({ id: A, subtopicId: "s1" }, { id: B, subtopicId: "s1" })).toBe(true);
  });

  it("is not for the same question, another subtopic, or a missing subtopic", () => {
    expect(followUpEligible({ id: A, subtopicId: "s1" }, { id: A, subtopicId: "s1" })).toBe(false);
    expect(followUpEligible({ id: A, subtopicId: "s1" }, { id: B, subtopicId: "s2" })).toBe(false);
    expect(followUpEligible({ id: A, subtopicId: null }, { id: B, subtopicId: null })).toBe(false);
  });
});

describe("explainedIn: did V explain this question in these replies?", () => {
  it("counts an Ask V tap on the question", () => {
    expect(explainedIn([{ askedQuestionId: A, toolCalls: null }], A)).toBe(true);
  });

  it("counts an explain_question call on it (a typed or pasted question)", () => {
    const toolCalls = [{ name: "find_question", input: { text: "..." } }, { name: "explain_question", input: { question_id: A } }];
    expect(explainedIn([{ askedQuestionId: null, toolCalls }], A)).toBe(true);
  });

  it("does not count another question, a hint, or a reply with no calls", () => {
    expect(explainedIn([{ askedQuestionId: B, toolCalls: null }], A)).toBe(false);
    expect(explainedIn([{ askedQuestionId: null, toolCalls: [{ name: "get_question", input: { question_id: A } }] }], A)).toBe(false);
    expect(explainedIn([{ askedQuestionId: null, toolCalls: "not a list" }], A)).toBe(false);
  });
});

describe("followUpCardCopy: what the card says after the pick", () => {
  it("on a follow-up, names what a right answer shows and offers another", () => {
    expect(followUpCardCopy({ correct: true, answer: "C" }, true)).toEqual({
      line: "Right: you used the same idea on a new question.",
      askLabel: "Ask V why",
      offerMore: true,
    });
  });

  it("on a wrong follow-up, offers to find where it went wrong", () => {
    expect(followUpCardCopy({ correct: false, answer: "C" }, true)).toEqual({
      line: "Not quite: the answer is (C).",
      askLabel: "Show me where I went wrong",
      offerMore: false,
    });
  });

  it("leaves a card that follows no explanation as it was", () => {
    expect(followUpCardCopy({ correct: true, answer: "C" }, false)).toEqual({ line: "Right, well done.", askLabel: "Ask V why", offerMore: false });
    expect(followUpCardCopy({ correct: false, answer: "A" }, false)).toEqual({
      line: "Not quite: the answer is (A).",
      askLabel: "Ask V why",
      offerMore: false,
    });
  });
});

describe("followUpTailLine: what V is told on 'Show me where I went wrong'", () => {
  it("quotes the start of the question V explained before, and asks for the step where this one differs", () => {
    const line = followUpTailLine({ stem: "A ball is thrown up at 20 m/s. Find the maximum height." });
    expect(line).toMatch(/A ball is thrown up at 20 m\/s/);
    expect(line).toMatch(/where this one differs/i);
  });

  it("cuts a long stem, and still works with no stem", () => {
    const long = followUpTailLine({ stem: "x".repeat(1000) });
    expect(long.length).toBeLessThan(600);
    expect(followUpTailLine({ stem: null })).toMatch(/where this one differs/i);
  });
});
