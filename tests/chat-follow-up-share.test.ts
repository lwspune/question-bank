/**
 * V's follow-up share (2026-11-07): of V's AI replies, how many the student
 * followed with another message within 30 minutes. A repeat Ask V tap on the
 * same question is NOT a follow-up: it was 104 of 440 taps, and counted as one
 * it held the share at 48% while real follow-ups fell.
 */
import { describe, it, expect } from "vitest";
import { followUpShare, type FollowUpRow } from "@/lib/chat/followUpShare";

const Q = "11111111-1111-4111-8111-111111111111";
const Q2 = "22222222-2222-4222-8222-222222222222";
const at = (min: number) => new Date(Date.UTC(2026, 10, 2, 6, 0) + min * 60_000).toISOString();

function row(over: Partial<FollowUpRow> & { min: number }): FollowUpRow {
  const { min, ...rest } = over;
  return {
    conversationId: "c1",
    createdAt: at(min),
    ai: true,
    askedQuestionId: null,
    askedNotesItem: null,
    pagePath: "/browse",
    ...rest,
  };
}

const window = { from: at(-60), to: at(24 * 60) };

describe("followUpShare", () => {
  it("counts a typed message within 30 minutes as a follow-up", () => {
    const r = followUpShare([row({ min: 0 }), row({ min: 10 })], window);
    expect(r).toMatchObject({ replies: 2, followedUp: 1, repeatTapsLeftOut: 0 });
  });

  it("does not count a message after 30 minutes, or in another conversation", () => {
    const r = followUpShare([row({ min: 0 }), row({ min: 31 }), row({ min: 5, conversationId: "c2" })], window);
    expect(r.followedUp).toBe(0);
  });

  it("leaves out a repeat tap on the same bank question", () => {
    const r = followUpShare([row({ min: 0, askedQuestionId: Q }), row({ min: 0.5, askedQuestionId: Q })], window);
    expect(r).toMatchObject({ followedUp: 0, repeatTapsLeftOut: 1 });
  });

  it("leaves out a repeat tap on the same notes question on the same page", () => {
    const n = { askedNotesItem: "ohms-law#1", pagePath: "/notes/nda-physics/current/ohms-law" };
    const r = followUpShare([row({ min: 0, ...n }), row({ min: 1, ...n })], window);
    expect(r).toMatchObject({ followedUp: 0, repeatTapsLeftOut: 1 });
    const other = followUpShare([row({ min: 0, ...n }), row({ min: 1, ...n, pagePath: "/notes/nda-physics/current/power" })], window);
    expect(other.followedUp).toBe(1);
  });

  it("counts a typed question or a tap on another question after a tap", () => {
    expect(followUpShare([row({ min: 0, askedQuestionId: Q }), row({ min: 2 })], window).followedUp).toBe(1);
    expect(followUpShare([row({ min: 0, askedQuestionId: Q }), row({ min: 2, askedQuestionId: Q2 })], window).followedUp).toBe(1);
  });

  it("still counts a reply followed by a repeat AND by a real follow-up", () => {
    const r = followUpShare([row({ min: 0, askedQuestionId: Q }), row({ min: 1, askedQuestionId: Q }), row({ min: 3 })], window);
    // Reply 1: a repeat, then a real message at 3 min. Reply 2 (the repeat's): the message at 3 min.
    expect(r).toMatchObject({ replies: 3, followedUp: 2 });
  });

  it("counts only AI replies inside the window, but a follow-up may land after it", () => {
    const r = followUpShare(
      [row({ min: -120 }), row({ min: 0, ai: false }), row({ min: 24 * 60 - 1 }), row({ min: 24 * 60 + 5 })],
      window
    );
    expect(r).toMatchObject({ replies: 1, followedUp: 1 });
  });

  it("reports the share as a whole percent, null with no replies", () => {
    expect(followUpShare([row({ min: 0 }), row({ min: 10 }), row({ min: 20 })], window).pct).toBe(67);
    expect(followUpShare([], window).pct).toBeNull();
  });
});
