/**
 * The animated solution under V's explanation (2026-10-25), the same way the
 * still figure already rides there: when V explained a bank question that has
 * a checked visual, the window plays it under the reply. V's text does not
 * change and V is never told. Read at load, never stored on the chat row.
 */
import { describe, it, expect } from "vitest";
import { historyTurns, type ConversationRow } from "@/lib/chat/conversation";
import { ARC_VISUAL } from "./fixtures/visuals";

const QID = "0b6d2511-16dd-402c-adf9-46dbf34782c1";
const QID2 = "1246ef2f-2aae-4a46-aba8-19d97fce9f59";
const explained = (id: string) => ({
  name: "explain_question",
  input: { question_id: id },
  result: `Question ${id} from CDS, Mathematics, Trigonometry:\nThe length of an arc`,
});

const row = (at: string, extra: Partial<ConversationRow> = {}): ConversationRow => ({
  id: `id-${at}`,
  eventType: "typed_question",
  questionId: null,
  createdAt: at,
  message: "Explain this question.",
  reply: "reply",
  replySource: "ai",
  replyLinks: null,
  feedback: null,
  conversationId: "6f1c2a52-8a3e-4c5b-9d7e-1f2a3b4c5d6e",
  pagePath: "/browse",
  signedIn: true,
  ...extra,
});

describe("historyTurns with animated solutions", () => {
  it("puts the visual on the reply that explained a question with one, and only there", () => {
    const visuals = new Map<string, unknown>([[QID, ARC_VISUAL]]);
    const turns = historyTurns(
      [
        row("2026-10-25T04:34:00Z", { toolCalls: [explained(QID)] }),
        row("2026-10-25T04:35:00Z", { message: "Thanks", toolCalls: null }),
        row("2026-10-25T04:48:00Z", { toolCalls: [explained(QID2)] }),
      ],
      undefined,
      visuals,
    );
    const replies = turns.filter((t) => t.role === "assistant");
    // The question id rides with it, so the window can record use of the visual (lib/visuals/usage).
    expect(replies[0]).toMatchObject({ visual: ARC_VISUAL, visualQuestionId: QID });
    expect(replies[1]).not.toHaveProperty("visual");
    expect(replies[2]).not.toHaveProperty("visual");
    expect(replies[2]).not.toHaveProperty("visualQuestionId");
  });

  it("carries a figure and a visual side by side when the question has both", () => {
    const turns = historyTurns([row("2026-10-25T04:34:00Z", { toolCalls: [explained(QID)] })], new Map([[QID, "solutions/arc.png"]]), new Map([[QID, ARC_VISUAL]]));
    expect(turns[1]).toMatchObject({ figure: "solutions/arc.png", visual: ARC_VISUAL });
  });

  it("adds nothing without a visual list", () => {
    const turns = historyTurns([row("2026-10-25T04:34:00Z", { toolCalls: [explained(QID)] })]);
    expect(turns[1]).not.toHaveProperty("visual");
  });
});
