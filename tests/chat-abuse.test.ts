/**
 * Abusive messages to V (owner, 2026-10-20): one calm line, then silence.
 * Before, V answered "GAND MAARA" with "Koi baat nahi! Batao kis exam..."
 * and kept the conversation going.
 */
import { describe, it, expect } from "vitest";
import { ABUSE_REPLY, abuseReply, isAbusive } from "@/lib/chat/abuse";
import { modelHistory, type ConversationRow } from "@/lib/chat/conversation";

describe("isAbusive", () => {
  it.each([
    "GAND MAARA",
    "fuck off",
    "tu chutiya hai",
    "madarchod",
    "fuuuuck you",
    "bhosdike",
    "भोसडीके",
    "तू चूतिया है",
    "zhavadya",
  ])("catches %s", (text) => {
    expect(isAbusive(text)).toBe(true);
  });

  it.each([
    "Mahatma Gandhi ki biography",
    "Gandhiji and the salt march",
    "the thyroid gland secretes",
    "Scunthorpe is a town",
    "class 12 maths matrices",
    "assassination of the archduke",
    "मला मराठीत हवे",
    "sex ratio in the census",
    "Give me a hint",
  ])("lets %s through", (text) => {
    expect(isAbusive(text)).toBe(false);
  });
});

describe("abuseReply", () => {
  it("gives the calm line the first time and nothing after it", () => {
    expect(abuseReply([])).toBe(ABUSE_REPLY);
    expect(abuseReply(["Here is the chapter."])).toBe(ABUSE_REPLY);
    expect(abuseReply(["Here is the chapter.", ABUSE_REPLY])).toBeNull();
  });

  it("is polite and has no em dash", () => {
    expect(ABUSE_REPLY).not.toMatch(/—/);
    expect(ABUSE_REPLY.length).toBeLessThan(140);
  });
});

describe("V's memory leaves the abuse out", () => {
  const row = (n: number, message: string, reply: string | null): ConversationRow => ({
    id: `r${n}`,
    eventType: "typed_question",
    questionId: null,
    createdAt: `2026-10-20T09:0${n}:00Z`,
    message,
    reply,
    replySource: reply ? "ai" : null,
    replyLinks: null,
    feedback: null,
    conversationId: "c",
    pagePath: null,
    signedIn: true,
  });

  it("drops the abusive message and V's calm line", () => {
    const turns = modelHistory([
      row(1, "matrices for mht cet", "Here is the chapter."),
      row(2, "GAND MAARA", ABUSE_REPLY),
      row(3, "again", null),
    ]);
    expect(turns.map((t) => t.content)).toEqual(["matrices for mht cet", "Here is the chapter."]);
  });
});
