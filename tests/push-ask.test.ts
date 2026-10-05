/**
 * Which one-time ask the mock result page offers (PUSH_SPEC.md §3): the push
 * ask first, the WhatsApp card on a later visit, never both on one screen.
 * The server decides only from the stamps; whether THIS browser can push is
 * known only after mount, so the push card falls back to the WhatsApp card
 * itself — otherwise an iPhone, which can never answer the push ask, would
 * never see the WhatsApp card again.
 */
import { describe, it, expect } from "vitest";
import { homeReminderAsk, needsPushPrompt, resultPageAsk } from "@/lib/profile/push";

describe("needsPushPrompt", () => {
  it("asks until either answer is stamped", () => {
    expect(needsPushPrompt(null)).toBe(true);
    expect(needsPushPrompt({ pushPromptedAt: null })).toBe(true);
    expect(needsPushPrompt({ pushPromptedAt: "2026-10-01T07:00:00Z" })).toBe(false);
  });
});

describe("resultPageAsk", () => {
  const at = "2026-10-01T07:00:00Z";

  it("push first; the WhatsApp card rides along only as its fallback", () => {
    expect(resultPageAsk({ pushPromptedAt: null, whatsappPromptedAt: null })).toEqual({ push: true, whatsapp: true });
  });

  it("the WhatsApp card alone once push has been answered", () => {
    expect(resultPageAsk({ pushPromptedAt: at, whatsappPromptedAt: null })).toEqual({ push: false, whatsapp: true });
  });

  it("push alone once WhatsApp has been answered, and nothing once both have", () => {
    expect(resultPageAsk({ pushPromptedAt: null, whatsappPromptedAt: at })).toEqual({ push: true, whatsapp: false });
    expect(resultPageAsk({ pushPromptedAt: at, whatsappPromptedAt: at })).toEqual({ push: false, whatsapp: false });
  });
});

describe("homeReminderAsk (/me, 2026-10-05)", () => {
  const at = "2026-10-01T07:00:00Z";

  it("asks on /me only while mistakes are waiting and the ask is unanswered", () => {
    expect(homeReminderAsk({ pushPromptedAt: null }, 3)).toBe(true);
  });

  it("stays quiet with nothing due, or while the due count is still loading", () => {
    expect(homeReminderAsk({ pushPromptedAt: null }, 0)).toBe(false);
    expect(homeReminderAsk({ pushPromptedAt: null }, null)).toBe(false);
  });

  it("never asks twice: an answer on any screen silences it here", () => {
    expect(homeReminderAsk({ pushPromptedAt: at }, 12)).toBe(false);
  });
});
