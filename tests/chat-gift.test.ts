/**
 * V's gift (owner, 2026-11-21): V tells a student about something they have
 * already EARNED, as a gift in its chat. Nothing new is given: the 7-day pass
 * is the answer-limit trial (0273), the discount is their Vault Points (0245).
 * These are the rules for which gift is waiting, when it shows, and the copy.
 */
import { describe, it, expect } from "vitest";
import {
  earnedGift,
  giftKey,
  giftReason,
  parseGift,
  pointsMilestone,
  GIFT_TEASER,
  type VGift,
} from "@/lib/chat/gift";
import {
  giftDue,
  markGiftOpened,
  markGiftShown,
  parseGiftMarks,
  GIFT_AGAIN_DAYS,
  GIFT_WAIT_DAYS,
} from "@/lib/chat/giftSeen";
import { vLauncherBadge, vLauncherLabel } from "@/lib/chat/launcher";

const DAY = 24 * 60 * 60 * 1000;
const T0 = Date.parse("2026-11-21T06:00:00Z");
const TRIAL: VGift = { kind: "trial" };
const P20: VGift = { kind: "points", milestone: 20 };

describe("pointsMilestone", () => {
  it("is the highest of 10, 20, 30 and 40 reached", () => {
    expect(pointsMilestone(0)).toBeNull();
    expect(pointsMilestone(9)).toBeNull();
    expect(pointsMilestone(10)).toBe(10);
    expect(pointsMilestone(19)).toBe(10);
    expect(pointsMilestone(23)).toBe(20);
    expect(pointsMilestone(40)).toBe(40);
    expect(pointsMilestone(75)).toBe(40);
  });

  it("treats junk as no points", () => {
    expect(pointsMilestone(Number.NaN)).toBeNull();
    expect(pointsMilestone(-12)).toBeNull();
  });
});

describe("earnedGift", () => {
  const base = { hasPass: false, everHadPass: false, trialOfferToday: false, points: 0 };

  it("is nothing for a student who has earned nothing", () => {
    expect(earnedGift(base)).toBeNull();
    expect(earnedGift({ ...base, points: 9 })).toBeNull();
  });

  it("is the 7-day pass on a day the answer limit offered it", () => {
    expect(earnedGift({ ...base, trialOfferToday: true })).toEqual(TRIAL);
  });

  it("puts the 7-day pass before the points", () => {
    expect(earnedGift({ ...base, trialOfferToday: true, points: 25 })).toEqual(TRIAL);
  });

  it("never offers the 7-day pass to someone who has had any pass", () => {
    expect(earnedGift({ ...base, trialOfferToday: true, everHadPass: true })).toBeNull();
    expect(earnedGift({ ...base, trialOfferToday: true, everHadPass: true, points: 12 })).toEqual({
      kind: "points",
      milestone: 10,
    });
  });

  it("is the points milestone reached", () => {
    expect(earnedGift({ ...base, points: 23 })).toEqual(P20);
  });

  it("is nothing while a pass is active", () => {
    expect(earnedGift({ ...base, hasPass: true, everHadPass: true, points: 40 })).toBeNull();
    expect(earnedGift({ ...base, hasPass: true, trialOfferToday: true })).toBeNull();
  });
});

describe("giftKey and parseGift", () => {
  it("names each gift", () => {
    expect(giftKey(TRIAL)).toBe("trial");
    expect(giftKey(P20)).toBe("points:20");
  });

  it("parses what the pulse carries and refuses anything else", () => {
    expect(parseGift({ kind: "trial" })).toEqual(TRIAL);
    expect(parseGift({ kind: "points", milestone: 30 })).toEqual({ kind: "points", milestone: 30 });
    for (const bad of [null, "trial", { kind: "points" }, { kind: "points", milestone: 25 }, { kind: "cash" }]) {
      expect(parseGift(bad), JSON.stringify(bad)).toBeNull();
    }
  });
});

describe("copy", () => {
  it("keeps the surprise until the box is opened", () => {
    expect(GIFT_TEASER).toBe("I have a gift for you.");
    expect(GIFT_TEASER).not.toMatch(/pass|%|point/i);
  });

  it("says what earned it, in plain words", () => {
    expect(giftReason(TRIAL)).toBe("You keep using all your free answers. That is real practice.");
    expect(giftReason(P20)).toBe("You have fixed 20 of your old mistakes.");
  });

  it("has no em dashes", () => {
    for (const s of [GIFT_TEASER, giftReason(TRIAL), giftReason(P20)]) expect(s).not.toMatch(/—|–| -- /);
  });
});

describe("giftDue", () => {
  it("is due when earned and never shown", () => {
    expect(giftDue(TRIAL, {}, T0)).toBe(true);
    expect(giftDue(P20, {}, T0)).toBe(true);
  });

  it("is never due with nothing earned, or when storage could not be read", () => {
    expect(giftDue(null, {}, T0)).toBe(false);
    expect(giftDue(P20, undefined, T0)).toBe(false);
  });

  it("waits unopened for 3 days from when V first showed it, then goes", () => {
    const shown = markGiftShown({}, P20, T0);
    expect(giftDue(P20, shown, T0 + GIFT_WAIT_DAYS * DAY - 1)).toBe(true);
    expect(giftDue(P20, shown, T0 + GIFT_WAIT_DAYS * DAY)).toBe(false);
  });

  it("is gone once opened", () => {
    const opened = markGiftOpened(markGiftShown({}, P20, T0), P20, T0 + 1000);
    expect(giftDue(P20, opened, T0 + 2000)).toBe(false);
    expect(giftDue(P20, opened, T0 + 10 * DAY)).toBe(false);
  });

  it("comes back when the same points milestone is earned again after the points ran out (30 days)", () => {
    const opened = markGiftOpened({}, P20, T0);
    expect(giftDue(P20, opened, T0 + GIFT_AGAIN_DAYS * DAY - 1)).toBe(false);
    expect(giftDue(P20, opened, T0 + GIFT_AGAIN_DAYS * DAY)).toBe(true);
    // Shown again then: a fresh 3-day wait, the old opening forgotten.
    const again = markGiftShown(opened, P20, T0 + GIFT_AGAIN_DAYS * DAY);
    expect(giftDue(P20, again, T0 + (GIFT_AGAIN_DAYS + 1) * DAY)).toBe(true);
  });

  it("never brings the 7-day pass back once opened: there is one per account", () => {
    const opened = markGiftOpened({}, TRIAL, T0);
    expect(giftDue(TRIAL, opened, T0 + 400 * DAY)).toBe(false);
  });

  it("treats each points milestone as its own gift", () => {
    const opened = markGiftOpened({}, { kind: "points", milestone: 10 }, T0);
    expect(giftDue(P20, opened, T0 + DAY)).toBe(true);
  });
});

describe("markGiftShown", () => {
  it("keeps the first showing, so reopening V does not restart the 3 days", () => {
    const first = markGiftShown({}, P20, T0);
    const second = markGiftShown(first, P20, T0 + DAY);
    expect(second).toEqual(first);
  });
});

describe("parseGiftMarks", () => {
  it("reads what was stored", () => {
    const marks = markGiftOpened(markGiftShown({}, TRIAL, T0), TRIAL, T0 + 5);
    expect(parseGiftMarks(JSON.stringify(marks))).toEqual(marks);
  });

  it("is empty for nothing stored or junk, so a bad copy never hides a gift for good", () => {
    expect(parseGiftMarks(null)).toEqual({});
    expect(parseGiftMarks("not json")).toEqual({});
    expect(parseGiftMarks(JSON.stringify([1, 2]))).toEqual({});
    expect(parseGiftMarks(JSON.stringify({ trial: { shownAt: "x" }, "points:20": { openedAt: 5 } }))).toEqual({
      "points:20": { openedAt: 5 },
    });
  });
});

describe("vLauncherBadge", () => {
  const closed = { open: false, unread: 0, dayDue: false, giftDue: false };

  it("shows nothing with nothing waiting, or while V is open", () => {
    expect(vLauncherBadge(closed)).toBeNull();
    expect(vLauncherBadge({ ...closed, open: true, giftDue: true, unread: 2 })).toBeNull();
  });

  it("counts a waiting day card and a waiting gift together", () => {
    expect(vLauncherBadge({ ...closed, dayDue: true })).toEqual({ tone: "new", count: 1 });
    expect(vLauncherBadge({ ...closed, giftDue: true })).toEqual({ tone: "new", count: 1 });
    expect(vLauncherBadge({ ...closed, dayDue: true, giftDue: true })).toEqual({ tone: "new", count: 2 });
  });

  it("shows unread replies first, as before", () => {
    expect(vLauncherBadge({ ...closed, unread: 3, giftDue: true })).toEqual({ tone: "reply", count: 3 });
  });
});

describe("vLauncherLabel", () => {
  const closed = { open: false, unread: 0, dayDue: false, giftDue: false };

  it("says what is waiting, for a screen reader", () => {
    expect(vLauncherLabel(closed)).toBe("Chat with V");
    expect(vLauncherLabel({ ...closed, open: true })).toBe("Close chat with V");
    expect(vLauncherLabel({ ...closed, unread: 1 })).toBe("Chat with V, 1 new reply");
    expect(vLauncherLabel({ ...closed, unread: 2 })).toBe("Chat with V, 2 new replies");
    expect(vLauncherLabel({ ...closed, dayDue: true })).toBe("Chat with V, your day is ready");
    expect(vLauncherLabel({ ...closed, giftDue: true })).toBe("Chat with V, V has a gift for you");
    expect(vLauncherLabel({ ...closed, giftDue: true, dayDue: true })).toBe("Chat with V, V has a gift for you");
  });
});
