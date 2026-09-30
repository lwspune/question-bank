/**
 * Signed email links (2026-09-30). The due nudge's link landed on
 * /drill → /login for every phone whose in-app browser held no session, so
 * 0 of 260 nudges produced a drill and nothing said whether the CHANNEL or
 * the WALL was the cause. The click redirect now signs the student in when
 * the link is fresh. This is the decision, kept pure so the window and the
 * fail-safe cases are pinned without a database.
 */
import { describe, it, expect } from "vitest";
import { decideSignIn, SIGNED_LINK_DAYS } from "@/lib/email/signedLink";

const NOW = new Date("2026-09-30T07:00:00Z");
const DAY = 86_400_000;
const sentAgo = (days: number) => new Date(NOW.getTime() - days * DAY).toISOString();

describe("decideSignIn", () => {
  it("signs in on a fresh link when the browser holds no session", () => {
    expect(decideSignIn({ sentAt: sentAgo(1), sessionUserId: null, now: NOW })).toBe("sign-in");
  });

  it("signs in right up to the window's edge, and not past it", () => {
    expect(decideSignIn({ sentAt: sentAgo(SIGNED_LINK_DAYS), sessionUserId: null, now: NOW })).toBe("sign-in");
    expect(decideSignIn({ sentAt: sentAgo(SIGNED_LINK_DAYS + 0.01), sessionUserId: null, now: NOW })).toBe("expired");
  });

  it("never replaces a live session — not even another account's, on a shared phone", () => {
    expect(decideSignIn({ sentAt: sentAgo(1), sessionUserId: "someone", now: NOW })).toBe("session-present");
  });

  it("fails safe on a missing or unreadable send time", () => {
    expect(decideSignIn({ sentAt: null, sessionUserId: null, now: NOW })).toBe("expired");
    expect(decideSignIn({ sentAt: "not a date", sessionUserId: null, now: NOW })).toBe("expired");
  });

  it("the window is a week: long enough for an inbox read, short enough that a forwarded mail goes stale", () => {
    expect(SIGNED_LINK_DAYS).toBe(7);
  });
});
