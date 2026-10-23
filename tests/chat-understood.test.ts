/**
 * "Did you understand?" under V's explanations (owner, 2026-10-23): which
 * replies get it, and how the chat history and the dashboard carry the answer.
 * Pure core src/lib/chat/understood.ts and lib/chat/conversation.ts.
 */
import { describe, it, expect } from "vitest";
import { isExplanation, NOT_UNDERSTOOD } from "@/lib/chat/understood";
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
