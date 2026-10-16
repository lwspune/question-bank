import { describe, it, expect } from "vitest";
import {
  aiAnswerCostUsd,
  summarizeAiUsage,
  summarizeChatInteractions,
  type AiUsageDay,
  type ChatInteractionRow,
} from "@/lib/chat/interactions";

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

});

describe("aiAnswerCostUsd", () => {
  it("prices tokens at Haiku 5.5 rates", () => {
    // $0.10 per million in + $0.50 per million out.
    expect(aiAnswerCostUsd({ tokensIn: 1_000_000, tokensOut: 1_000_000 })).toBeCloseTo(0.6, 6);
  });

  it("prices cached input: a read at a tenth, a write at a quarter extra (migration 0161)", () => {
    // $0.01 per million read + $0.125 per million written.
    expect(aiAnswerCostUsd({ cacheReadTokens: 1_000_000, cacheWriteTokens: 1_000_000 })).toBeCloseTo(0.135, 6);
  });
});

describe("summarizeAiUsage: V's AI use per day (migration 0162)", () => {
  const day = (d: string, over: Partial<AiUsageDay> = {}): AiUsageDay => ({
    day: d,
    answers: 0,
    failed: 0,
    tokensIn: 0,
    tokensOut: 0,
    cacheReadTokens: 0,
    cacheWriteTokens: 0,
    ...over,
  });

  it("totals every day ever, failed part-way answers included in the cost", () => {
    const s = summarizeAiUsage(
      [
        day("2026-09-01", { answers: 2, tokensIn: 1_000_000 }),
        day("2026-10-16", { answers: 1, failed: 1, tokensOut: 1_000_000 }),
      ],
      new Date("2026-10-16T12:00:00Z")
    );
    expect(s.total).toMatchObject({ answers: 3, failed: 1 });
    expect(s.total.costUsd).toBeCloseTo(0.6, 6);
  });

  it("lists the last 30 India-time days, newest first, each with its own cost", () => {
    const s = summarizeAiUsage(
      [day("2026-09-16", { answers: 1 }), day("2026-09-17", { answers: 1 }), day("2026-10-16", { answers: 4, tokensIn: 1_000_000 })],
      new Date("2026-10-16T12:00:00Z")
    );
    expect(s.days.map((d) => d.day)).toEqual(["2026-10-16", "2026-09-17"]);
    expect(s.days[0].costUsd).toBeCloseTo(0.1, 6);
  });

  it("shows how much of the input came from the cache, or nothing when there was no input", () => {
    const s = summarizeAiUsage(
      [
        day("2026-10-15", { answers: 1, tokensIn: 100, cacheWriteTokens: 300, cacheReadTokens: 600 }),
        day("2026-10-16", { answers: 1, tokensOut: 5 }),
      ],
      new Date("2026-10-16T12:00:00Z")
    );
    expect(s.days.find((d) => d.day === "2026-10-15")!.cachedShare).toBeCloseTo(0.6, 6);
    expect(s.days.find((d) => d.day === "2026-10-16")!.cachedShare).toBeNull();
  });

  it("is empty and zero with no AI use yet", () => {
    expect(summarizeAiUsage([], new Date())).toEqual({
      total: { answers: 0, failed: 0, costUsd: 0 },
      days: [],
    });
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
