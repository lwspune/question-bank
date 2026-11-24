/**
 * The tapped-question note (2026-11-24). Twice on 22-23 Nov a student tapped
 * Ask V on a question and V replied "I can't see which question is on your
 * screen": the tap was named only in the system tail, and late in a
 * conversation full of earlier "Explain this question." turns V lost it. The
 * note now goes straight after the student's message (lib/chat/anthropic.ts).
 */
import { describe, it, expect } from "vitest";
import { tapTurnNote } from "@/lib/chat/facts";

const ID = "6c22e01e-1c4a-4a57-93da-2741c559c91d";

describe("tapTurnNote", () => {
  it("names the tapped question on the Ask V message", () => {
    const note = tapTurnNote({ questionId: ID, message: "Explain this question.", followsUp: false });
    expect(note).toContain(ID);
    expect(note).toContain("explain_question");
  });

  it("covers the picked and skipped forms of the Ask V message", () => {
    expect(tapTurnNote({ questionId: ID, message: "I picked (B). Explain this question.", followsUp: false })).not.toBeNull();
    expect(tapTurnNote({ questionId: ID, message: "I skipped this one. Explain this question.", followsUp: false })).not.toBeNull();
  });

  it("adds nothing to a typed follow-up about the same question", () => {
    expect(tapTurnNote({ questionId: ID, message: "Dont bring e", followsUp: false })).toBeNull();
  });

  it("adds nothing without a tapped question", () => {
    expect(tapTurnNote({ questionId: null, message: "Explain this question.", followsUp: false })).toBeNull();
  });

  it("adds nothing on a follow-up card, which builds on the earlier explanation", () => {
    expect(tapTurnNote({ questionId: ID, message: "Explain this question.", followsUp: true })).toBeNull();
  });
});
