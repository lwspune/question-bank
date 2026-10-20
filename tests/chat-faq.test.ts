import { describe, it, expect } from "vitest";
import { PREDEFINED_QUESTIONS } from "@/lib/chat/faq";
import { historyTurns, type ConversationRow } from "@/lib/chat/conversation";

/**
 * The six default questions were retired on 2026-10-20 (owner): V's AI answers
 * them, and the "Which exams?" button said "28 exams" while the AI said
 * otherwise. Their labels stay, because stored chats still hold the taps.
 */
describe("PREDEFINED_QUESTIONS (retired, labels only)", () => {
  it("keeps a label for every id ever stored", () => {
    const ids = PREDEFINED_QUESTIONS.map((q) => q.id);
    expect(ids).toEqual(["exams", "signup", "notes", "mocks", "mock-pass", "bank-size"]);
    for (const q of PREDEFINED_QUESTIONS) expect(q.label.trim().length).toBeGreaterThan(0);
  });

  it("shows an old tap in a stored chat by its label", () => {
    const row: ConversationRow = {
      id: "r1",
      eventType: "faq_click",
      questionId: "exams",
      createdAt: "2026-10-19T06:44:00Z",
      message: null,
      reply: "We cover 28 exams.",
      replySource: "template",
      replyLinks: null,
      feedback: null,
      conversationId: "c",
      pagePath: null,
      signedIn: false,
    };
    expect(historyTurns([row])[0]).toEqual({ role: "user", text: "Which exams do you cover?" });
  });
});
