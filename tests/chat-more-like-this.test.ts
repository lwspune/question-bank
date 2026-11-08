/**
 * "One more like this" under an Ask V explanation (2026-11-08, owner).
 *
 * A student asked V to "make one more question like question 4", V asked
 * which one, they answered "17", and V was lost: it cannot see the page's
 * numbering, and it promised to MAKE a question it cannot write. The button
 * knows the question that was just explained, so it needs no AI call: it
 * picks another question from the same subtopic (similar_question's own
 * source) and the chat shows it as a "try" card.
 */
import { describe, it, expect } from "vitest";
import { moreLikeThis } from "@/lib/chat/moreLikeThis";
import { historyTurns, type ConversationRow } from "@/lib/chat/conversation";
import type { VQuestion } from "@/lib/chat/questionTools";

const ID = "11111111-1111-4111-8111-111111111111";
const OTHER = "22222222-2222-4222-8222-222222222222";
const Q = { id: ID, subtopicId: "s1" } as VQuestion;

const deps = (over: Partial<Parameters<typeof moreLikeThis>[1]> = {}) => ({
  loadQuestion: async (id: string) => (id === ID ? Q : null),
  loadSimilar: async () => OTHER,
  ...over,
});

describe("moreLikeThis", () => {
  it("gives another question from the explained question's subtopic", async () => {
    expect(await moreLikeThis({ questionId: ID }, deps())).toEqual({ status: 200, questionId: OTHER });
  });

  it("says there is none when the subtopic has no other question", async () => {
    expect(await moreLikeThis({ questionId: ID }, deps({ loadSimilar: async () => null }))).toEqual({ status: 200, questionId: null });
  });

  it("refuses a malformed id and an unknown question", async () => {
    expect((await moreLikeThis({ questionId: "drop table" }, deps())).status).toBe(400);
    expect((await moreLikeThis(null, deps())).status).toBe(400);
    expect((await moreLikeThis({ questionId: OTHER }, deps())).status).toBe(404);
  });
});

describe("a reloaded chat keeps the button", () => {
  it("an explanation in the history carries the question it explained", () => {
    const row: ConversationRow = {
      id: "r1",
      eventType: "typed_question",
      questionId: null,
      createdAt: "2026-11-08T07:47:00Z",
      message: "Explain this question.",
      reply: "The answer is (C) 4%.",
      replySource: "ai",
      replyLinks: [],
      feedback: null,
      conversationId: "c1",
      pagePath: null,
      signedIn: true,
      toolCalls: [{ name: "explain_question", input: { question_id: ID }, result: `Question ${ID} from MHT-CET, Physics` }],
      askedQuestionId: ID,
    };
    expect(historyTurns([row])[1]).toMatchObject({ role: "assistant", explained: true, explainedQuestionId: ID });
  });
});
