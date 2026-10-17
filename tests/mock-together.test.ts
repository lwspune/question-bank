/**
 * Practise together on mocks (migration 0166): the pure rules.
 *
 *   - an invite code is 12 hex digits; the link is the paper's own page with
 *     ?with=<code>, tagged so a friend who signs up is attributed
 *   - the message names the paper and its size, never a score
 *   - who counts as a friend on one paper: whoever sent it to you, whoever
 *     you sent it to, and anyone else the same invite reached
 *   - a student starting a paper a friend sent them starts it free
 *   - the friend-finished push names a mock by its title
 */
import { describe, it, expect } from "vitest";
import {
  MOCK_TOGETHER_CAMPAIGN,
  buildMockInviteText,
  buildMockInviteUrl,
  isInviteCode,
  mockFriendIds,
} from "@/lib/practiceTests/mockInvite";
import { mockStartState, type MockQuota } from "@/lib/mocks/quota";
import { friendFinishedPayload, pickFriendFinishedPushes } from "@/lib/practiceTests/together";

describe("isInviteCode", () => {
  it("takes 12 lowercase hex digits and nothing else", () => {
    expect(isInviteCode("0123456789ab")).toBe(true);
    expect(isInviteCode("0123456789AB")).toBe(false);
    expect(isInviteCode("0123456789a")).toBe(false);
    expect(isInviteCode("0123456789abc")).toBe(false);
    expect(isInviteCode("practice-0123456789ab")).toBe(false);
    expect(isInviteCode(undefined)).toBe(false);
    expect(isInviteCode(["0123456789ab"])).toBe(false);
  });
});

describe("buildMockInviteUrl", () => {
  it("is the paper's own page with the code and the campaign", () => {
    const u = new URL(buildMockInviteUrl("nda-2026-sep-maths", "0123456789ab", "whatsapp"));
    expect(u.origin + u.pathname).toBe("https://www.pyqvault.com/mock/nda-2026-sep-maths");
    expect(u.searchParams.get("with")).toBe("0123456789ab");
    expect(u.searchParams.get("utm_source")).toBe("whatsapp");
    expect(u.searchParams.get("utm_medium")).toBe("share");
    expect(u.searchParams.get("utm_campaign")).toBe(MOCK_TOGETHER_CAMPAIGN);
  });
});

describe("buildMockInviteText", () => {
  const text = buildMockInviteText({
    slug: "nda-2026-sep-maths",
    code: "0123456789ab",
    title: "NDA 2026 (Sep) Mathematics",
    questions: 120,
    minutes: 150,
    channel: "whatsapp",
  });

  it("names the paper and its size, with the link last", () => {
    const lines = text.split("\n");
    expect(lines).toContain("NDA 2026 (Sep) Mathematics");
    expect(lines).toContain("120 questions · 150 min · free");
    expect(lines[lines.length - 1]).toContain("/mock/nda-2026-sep-maths?with=0123456789ab");
  });

  it("carries no score and no em dash", () => {
    expect(text).not.toMatch(/score|marks|rank|beat|—/i);
  });
});

describe("mockFriendIds", () => {
  const e = (inviteId: string, inviterId: string, friendId: string) => ({ inviteId, inviterId, friendId });

  it("gives the sender the friends who joined their invite", () => {
    expect(mockFriendIds("sam", [e("i1", "sam", "riya"), e("i1", "sam", "aman")])).toEqual(["riya", "aman"]);
  });

  it("gives a friend the sender and everyone else the same invite reached", () => {
    expect(mockFriendIds("riya", [e("i1", "sam", "riya"), e("i1", "sam", "aman")])).toEqual(["sam", "aman"]);
  });

  it("joins every invite the viewer is in, each person once", () => {
    const edges = [e("i1", "sam", "riya"), e("i2", "riya", "neha"), e("i2", "riya", "sam")];
    expect(mockFriendIds("riya", edges)).toEqual(["sam", "neha"]);
  });

  it("leaves out invites the viewer is not in", () => {
    const edges = [e("i1", "sam", "riya"), e("i9", "stan", "lee")];
    expect(mockFriendIds("sam", edges)).toEqual(["riya"]);
    expect(mockFriendIds("nobody", edges)).toEqual([]);
  });
});

describe("mockStartState with a friend's invite", () => {
  const spent: MockQuota = { limit: 3, used: 3, hasPass: false, chapterLimit: 5, chapterUsed: 5 };

  it("opens a paper a friend sent, past the free limit", () => {
    expect(mockStartState(spent, false, "full")).toEqual({ kind: "locked", limit: 3, unit: "mock" });
    expect(mockStartState(spent, false, "full", true)).toEqual({ kind: "open" });
    expect(mockStartState(spent, false, "sectional", true)).toEqual({ kind: "open" });
  });

  it("does not use up a free test either", () => {
    const some: MockQuota = { ...spent, used: 1 };
    expect(mockStartState(some, false, "full", true)).toEqual({ kind: "open" });
  });
});

describe("the friend-finished push on a mock", () => {
  const now = new Date("2026-10-17T12:00:00Z");
  const hoursAgo = (h: number) => new Date(now.getTime() - h * 3_600_000).toISOString();

  it("carries the paper's title through to the pick", () => {
    const picks = pickFriendFinishedPushes({
      groups: [
        {
          rootId: "invite-1",
          title: "NDA 2026 (Sep) Mathematics",
          finishers: [
            { userId: "sam", attemptId: "a1", submittedAt: hoursAgo(20), name: "Sam" },
            { userId: "riya", attemptId: "a2", submittedAt: hoursAgo(1), name: "Riya" },
          ],
        },
      ],
      priorSends: [],
      now,
    });
    expect(picks).toHaveLength(1);
    expect(picks[0]).toMatchObject({ userId: "sam", title: "NDA 2026 (Sep) Mathematics" });
  });

  it("names the paper instead of 'your practice test'", () => {
    const p = friendFinishedPayload({
      names: ["Riya"],
      recipientAttemptId: "a1",
      clickToken: "t",
      title: "NDA 2026 (Sep) Mathematics",
    });
    expect(p.title).toBe("Riya finished NDA 2026 (Sep) Mathematics");
    expect(p.body).toBe("See what you both missed.");
  });

  it("keeps the practice-test wording when there is no title", () => {
    const p = friendFinishedPayload({ names: ["Riya"], recipientAttemptId: "a1", clickToken: "t", title: null });
    expect(p.title).toBe("Riya finished your practice test");
  });
});
