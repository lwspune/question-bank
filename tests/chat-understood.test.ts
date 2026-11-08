/**
 * "Did you understand?" under V's explanations (owner, 2026-10-23): which
 * replies get it, and how the chat history and the dashboard carry the answer.
 * Pure core src/lib/chat/understood.ts and lib/chat/conversation.ts.
 */
import { describe, it, expect } from "vitest";
import { isExplanation, notUnderstoodQuestionId, NOT_UNDERSTOOD } from "@/lib/chat/understood";
import { groupConversations, historyTurns, type ConversationRow } from "@/lib/chat/conversation";

const CID = "6f1c2a52-8a3e-4c5b-9d7e-1f2a3b4c5d6e";

function ai(at: string, message: string, extra: Partial<ConversationRow> = {}): ConversationRow {
  return {
    id: `id-${at}`,
    eventType: "typed_question",
    questionId: null,
    createdAt: at,
    message,
    reply: "Step 1 ...",
    replySource: "ai",
    replyLinks: null,
    feedback: null,
    conversationId: CID,
    pagePath: "/browse",
    signedIn: true,
    ...extra,
  };
}

describe("isExplanation: the replies that ask 'Did you understand?'", () => {
  it("is an explanation when V explained a question or a concept", () => {
    expect(isExplanation([{ name: "explain_question", input: {} }])).toBe(true);
    expect(isExplanation([{ name: "find_chapters", input: {} }, { name: "explain_concept", input: {} }])).toBe(true);
  });

  it("is not when V only found pages, planned or used no tool: the question would be noise there", () => {
    expect(isExplanation([{ name: "find_chapters", input: {} }])).toBe(false);
    expect(isExplanation([{ name: "plan_week", input: {} }])).toBe(false);
    expect(isExplanation([])).toBe(false);
    expect(isExplanation(null)).toBe(false);
  });

  it("is not when explain_question was refused: no answer was given, so there is nothing to understand (2026-10-28)", () => {
    const id = "11111111-1111-4111-8111-111111111111";
    const call = (result: string) => [{ name: "explain_question", input: { question_id: id }, result }];
    expect(isExplanation(call("The student has used today's 20 free answers. ..."))).toBe(false);
    expect(isExplanation(call("The student is signed out: tell them to sign in ..."))).toBe(false);
    expect(isExplanation(call("Question not found. Ask the student to tap Ask V on the question again."))).toBe(false);
    expect(isExplanation(call(`Question ${id} from NDA, Mathematics ...`))).toBe(true);
  });

  it("counts the reply to a No as an explanation, though V re-explains from memory with no tool", () => {
    // Case 76a45899, 2026-10-23: both runs re-explained without calling a tool; the question must come back.
    expect(isExplanation([], NOT_UNDERSTOOD)).toBe(true);
    expect(isExplanation([], "thanks")).toBe(false);
  });

  it("asks for a simpler explanation in plain words", () => {
    expect(NOT_UNDERSTOOD).toBe("I didn't understand. Please explain it more simply.");
  });
});

describe("the answer kept with the reply", () => {
  const rows = [
    ai("2026-10-23T15:00:00Z", "Explain this question.", { toolCalls: [{ name: "explain_question", input: { question_id: "q" } }], understood: false }),
    ai("2026-10-23T15:01:00Z", NOT_UNDERSTOOD, { toolCalls: null, understood: true }),
    ai("2026-10-23T15:02:00Z", "atoms chapter", { toolCalls: [{ name: "find_chapters", input: {} }] }),
  ];

  it("rebuilds the window's history with which replies were explanations and the student's answer", () => {
    const replies = historyTurns(rows).filter((t) => t.role === "assistant");
    expect(replies.map((t) => ("explained" in t ? t.explained : undefined))).toEqual([true, true, false]);
    expect(replies.map((t) => ("understood" in t ? t.understood : undefined))).toEqual([false, true, null]);
  });

  it("shows the answer on the dashboard", () => {
    expect(groupConversations(rows)[0].turns.map((t) => t.understood)).toEqual([false, true, null]);
  });
});

/**
 * A No to "Did you understand?" sends that question to Fix your mistakes
 * (owner, 2026-11-08). Which question: the one V's explanation explained, and
 * for V's re-explanation (often from memory, no tool) the one the student
 * tapped Ask V on. Every No in the 30 days to 2026-11-08 had one or the other.
 */
describe("notUnderstoodQuestionId: the question a No belongs to", () => {
  const Q = "1f478ef1-4dcb-4cb2-a6d5-8b2a6e7b986b";
  const ASKED = "467e7a5f-1370-4ee4-bdf1-a7e11a58df06";
  const explained = (id: string) => ({ name: "explain_question", input: { question_id: id }, result: `Question ${id} from NDA ...` });

  it("takes the question V explained", () => {
    expect(notUnderstoodQuestionId({ toolCalls: [explained(Q)], message: "Explain this question.", askedQuestionId: ASKED })).toBe(Q);
  });

  it("takes the asked question on V's re-explanation, which often calls no tool", () => {
    expect(notUnderstoodQuestionId({ toolCalls: null, message: NOT_UNDERSTOOD, askedQuestionId: ASKED })).toBe(ASKED);
  });

  it("names no question when V refused (out of free answers), since nothing was explained", () => {
    const refused = { name: "explain_question", input: { question_id: Q }, result: "The student has used today's 20 free answers." };
    expect(notUnderstoodQuestionId({ toolCalls: [refused], message: "Explain this question.", askedQuestionId: Q })).toBeNull();
  });

  it("names no question for a concept explanation: there is no question to bring back", () => {
    const concept = { name: "explain_concept", input: { concept: "x" }, result: "..." };
    expect(notUnderstoodQuestionId({ toolCalls: [concept], message: "what is a parabola", askedQuestionId: null })).toBeNull();
  });

  it("refuses an id that is not a uuid (the asked id comes from the browser)", () => {
    expect(notUnderstoodQuestionId({ toolCalls: null, message: NOT_UNDERSTOOD, askedQuestionId: "not-a-uuid" })).toBeNull();
    expect(notUnderstoodQuestionId({ toolCalls: [explained("abc")], message: "Explain this question.", askedQuestionId: null })).toBeNull();
  });

  it("lowercases the id, the way the activity log stores question ids", () => {
    expect(notUnderstoodQuestionId({ toolCalls: [explained(Q.toUpperCase())], message: "Explain", askedQuestionId: null })).toBe(Q);
  });
});
