import { describe, it, expect } from "vitest";
import { summarizeChatInteractions, type ChatInteractionRow } from "@/lib/chat/interactions";

const row = (
  eventType: ChatInteractionRow["eventType"],
  questionId: string | null,
  createdAt = "2026-09-29T00:00:00Z"
): ChatInteractionRow => ({ eventType, questionId, createdAt });

describe("summarizeChatInteractions", () => {
  it("returns zeroes for an empty input", () => {
    const s = summarizeChatInteractions([]);
    expect(s.totalOpens).toBe(0);
    expect(s.totalClicks).toBe(0);
    expect(s.byQuestion).toEqual([]);
  });

  it("counts opens and clicks separately", () => {
    const s = summarizeChatInteractions([
      row("launcher_open", null),
      row("launcher_open", null),
      row("faq_click", "exams"),
    ]);
    expect(s.totalOpens).toBe(2);
    expect(s.totalClicks).toBe(1);
  });

  it("groups clicks by question with a resolved label, sorted by count descending", () => {
    const s = summarizeChatInteractions([
      row("faq_click", "exams"),
      row("faq_click", "exams"),
      row("faq_click", "bank-size"),
    ]);
    expect(s.byQuestion[0]).toMatchObject({ id: "exams", count: 2 });
    expect(s.byQuestion[0].label).toMatch(/exams/i);
    expect(s.byQuestion[1]).toMatchObject({ id: "bank-size", count: 1 });
  });

  it("falls back to the raw id as the label for a retired/unknown question id", () => {
    const s = summarizeChatInteractions([row("faq_click", "some-retired-id")]);
    expect(s.byQuestion[0]).toMatchObject({ id: "some-retired-id", count: 1, label: "some-retired-id" });
  });

  it("ignores a null questionId on a faq_click row rather than throwing", () => {
    const s = summarizeChatInteractions([row("faq_click", null)]);
    expect(s.totalClicks).toBe(1);
    expect(s.byQuestion).toEqual([]);
  });
});

describe("summarizeChatInteractions: typed questions (migration 0145)", () => {
  const typed = (message: string, createdAt: string, signedIn: boolean, userId: string | null = null): ChatInteractionRow => ({
    eventType: "typed_question",
    questionId: null,
    createdAt,
    message,
    signedIn,
    userId,
  });

  it("lists typed questions apart from button taps, in the order given (newest first)", () => {
    const s = summarizeChatInteractions([
      typed("when is the result", "2026-10-09T10:00:00Z", true, "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee"),
      row("faq_click", "exams"),
      typed("is neet 2027 syllabus same", "2026-10-08T10:00:00Z", false),
    ]);
    expect(s.totalClicks).toBe(1);
    expect(s.totalTyped).toBe(2);
    expect(s.typed).toEqual([
      { text: "when is the result", createdAt: "2026-10-09T10:00:00Z", signedIn: true, userId: "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee", reply: null, replySource: null },
      { text: "is neet 2027 syllabus same", createdAt: "2026-10-08T10:00:00Z", signedIn: false, userId: null, reply: null, replySource: null },
    ]);
  });
});

describe("summarizeChatInteractions: V's replies (migration 0158)", () => {
  const answered = (
    source: "ai" | "fallback",
    tokensIn: number | null,
    tokensOut: number | null
  ): ChatInteractionRow => ({
    eventType: "typed_question",
    questionId: null,
    createdAt: "2026-10-15T10:00:00Z",
    message: "atoms cbse",
    signedIn: false,
    reply: source === "ai" ? "Atoms: /questions/cbse-12/physics/atoms" : "Thanks",
    replySource: source,
    tokensIn,
    tokensOut,
  });

  it("shows what V replied and where the reply came from", () => {
    const s = summarizeChatInteractions([answered("ai", 1000, 50)]);
    expect(s.typed[0]).toMatchObject({ reply: "Atoms: /questions/cbse-12/physics/atoms", replySource: "ai" });
  });

  it("counts AI answers and prices their tokens at Haiku 5.5 rates", () => {
    const s = summarizeChatInteractions([
      answered("ai", 1_000_000, 0),
      answered("ai", 0, 1_000_000),
      answered("fallback", null, null),
    ]);
    expect(s.aiAnswers).toBe(2);
    // $0.10 per million in + $0.50 per million out.
    expect(s.aiCostUsd).toBeCloseTo(0.6, 6);
  });

  it("prices cached input: a read at a tenth, a write at a quarter extra (migration 0161)", () => {
    const s = summarizeChatInteractions([
      { ...answered("ai", 0, 0), cacheReadTokens: 1_000_000, cacheWriteTokens: 0 },
      { ...answered("ai", 0, 0), cacheReadTokens: 0, cacheWriteTokens: 1_000_000 },
    ]);
    // $0.01 per million read + $0.125 per million written.
    expect(s.aiCostUsd).toBeCloseTo(0.135, 6);
  });
});

describe("summarizeChatInteractions: the practice-test builder (migration 0157)", () => {
  it("counts each builder step apart from FAQ taps, in funnel order", () => {
    const s = summarizeChatInteractions([
      row("builder_step", "open"),
      row("builder_step", "open"),
      row("builder_step", "built"),
      row("builder_step", "start"),
      row("faq_click", "exams"),
      row("builder_step", "download"),
    ]);
    expect(s.totalClicks).toBe(1);
    expect(s.builder).toEqual([
      { step: "open", label: "Opened the builder", count: 2 },
      { step: "sign_in", label: "Asked to sign in", count: 0 },
      { step: "built", label: "Built a test", count: 1 },
      { step: "start", label: "Started it online", count: 1 },
      { step: "download", label: "Opened the download", count: 1 },
    ]);
  });
});
