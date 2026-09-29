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
