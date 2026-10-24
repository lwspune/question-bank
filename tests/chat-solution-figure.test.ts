/**
 * The solution's figure under V's explanation (owner, 2026-10-24): when V
 * explained a bank question and that question's solution has a figure, the
 * figure shows under the reply. V's text does not change; the figure is only
 * added by the window. Never on a hint, a limit message or a concept.
 */
import { describe, it, expect } from "vitest";
import { explainedQuestionId, figureSrc } from "@/lib/chat/solutionFigure";
import { historyTurns, type ConversationRow } from "@/lib/chat/conversation";

const QID = "0b6d2511-16dd-402c-adf9-46dbf34782c1";
const QID2 = "1246ef2f-2aae-4a46-aba8-19d97fce9f59";
const explained = (id: string) => ({
  name: "explain_question",
  input: { question_id: id },
  result: `Question ${id} from JEE Mains, Maths, Application of Integrals:\nThe area of the region`,
});

describe("explainedQuestionId", () => {
  it("is the question an explain_question call actually explained", () => {
    expect(explainedQuestionId([explained(QID)])).toBe(QID);
  });

  it("is the last one when a reply explained two", () => {
    expect(explainedQuestionId([explained(QID), explained(QID2)])).toBe(QID2);
  });

  it("is null for a hint, a concept, or no tools", () => {
    expect(explainedQuestionId([{ name: "get_question", input: { question_id: QID }, result: `Question ${QID} from x` }])).toBeNull();
    expect(explainedQuestionId([{ name: "explain_concept", input: { topic: "area" }, result: "Notes" }])).toBeNull();
    expect(explainedQuestionId([])).toBeNull();
    expect(explainedQuestionId(null)).toBeNull();
  });

  it("is null when the explanation was refused: signed out, out of free answers, or not found", () => {
    for (const result of [
      "The student is signed out: tell them to sign in (free) to get explanations, and give no answer.",
      "The student has used today's 30 free answers. Tell them kindly, give no answer or hint.",
      "No question with that id.",
    ]) {
      expect(explainedQuestionId([{ name: "explain_question", input: { question_id: QID }, result }])).toBeNull();
    }
  });

  it("is null when the result names a different question than the input", () => {
    expect(explainedQuestionId([{ name: "explain_question", input: { question_id: QID }, result: `Question ${QID2} from x` }])).toBeNull();
  });
});

describe("figureSrc", () => {
  const SB = "https://abc.supabase.co";

  it("builds our public link from a stored bucket path or a stored full link", () => {
    expect(figureSrc("solutions/hsc12/fig-3.png", SB)).toBe(
      "https://abc.supabase.co/storage/v1/object/public/question-images/solutions/hsc12/fig-3.png"
    );
    expect(figureSrc("https://abc.supabase.co/storage/v1/object/public/question-images/solutions/a.png", SB)).toBe(
      "https://abc.supabase.co/storage/v1/object/public/question-images/solutions/a.png"
    );
  });

  // A turn kept on the device can be edited: only a picture in our bucket, on our host, is ever shown.
  it("refuses anything that is not a picture in our bucket", () => {
    expect(figureSrc("https://evil.example/x.png", SB)).toBeNull();
    expect(figureSrc("../../etc/passwd", SB)).toBeNull();
    expect(figureSrc("", SB)).toBeNull();
    expect(figureSrc(42, SB)).toBeNull();
    expect(figureSrc(undefined, SB)).toBeNull();
    expect(figureSrc("a".repeat(600), SB)).toBeNull();
  });

  it("puts a foreign host's copy of our path back on our host", () => {
    expect(figureSrc("https://evil.example/storage/v1/object/public/question-images/a.png", SB)).toBe(
      "https://abc.supabase.co/storage/v1/object/public/question-images/a.png"
    );
  });
});

describe("historyTurns with solution figures", () => {
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

  it("puts the figure on the reply that explained a question with one, and only there", () => {
    const figures = new Map([[QID, "solutions/lens.png"]]);
    const turns = historyTurns(
      [
        row("2026-10-24T04:34:00Z", { toolCalls: [explained(QID)] }),
        row("2026-10-24T04:35:00Z", { message: "Diagram", toolCalls: null }),
        row("2026-10-24T04:48:00Z", { toolCalls: [explained(QID2)] }),
      ],
      figures
    );
    const replies = turns.filter((t) => t.role === "assistant");
    expect(replies[0]).toMatchObject({ figure: "solutions/lens.png" });
    expect(replies[1]).not.toHaveProperty("figure");
    expect(replies[2]).not.toHaveProperty("figure");
  });

  it("adds nothing without a figure list", () => {
    const turns = historyTurns([row("2026-10-24T04:34:00Z", { toolCalls: [explained(QID)] })]);
    expect(turns[1]).not.toHaveProperty("figure");
  });
});
