/**
 * "Your checkout didn't complete" (2026-11-12, owner): a student who opened a
 * pass checkout and did not pay sees a bar on the first page they open on a
 * LATER day, on up to 2 such days within 7 days of the checkout, until they
 * pay or tap Not now. 45 days to 11-12: 71 of 110 who opened checkout never
 * paid, and 43 of those came back on their own (27 the next day).
 */
import { describe, it, expect } from "vitest";
import {
  LEFT_CHECKOUT_MAX_DAYS,
  leftCheckoutCandidate,
  leftCheckoutCopy,
  parseBarRecord,
  showLeftCheckoutBar,
  stillUnpaid,
  type PaywallRow,
} from "@/lib/billing/leftCheckout";
import type { Entitlement } from "@/lib/entitlements/access";

// 12 Nov 2026, 16:00 IST.
const NOW = new Date("2026-11-12T10:30:00Z");
const daysAgo = (d: number, hours = 0) => new Date(NOW.getTime() - d * 86_400_000 - hours * 3_600_000);
const open = (at: Date, planId = "practice-pass-6m", gate = "reveals"): PaywallRow => ({ at, step: "checkout_opened", gate, planId });
const shown = (at: Date): PaywallRow => ({ at, step: "shown", gate: "return", planId: "practice-pass-6m" });

describe("leftCheckoutCandidate", () => {
  it("names the pass of a checkout opened on an earlier day", () => {
    expect(leftCheckoutCandidate([open(daysAgo(1))], NOW)).toEqual({ planId: "practice-pass-6m", openedAt: daysAgo(1) });
  });

  it("waits for a later day: never on the day of the checkout", () => {
    expect(leftCheckoutCandidate([open(daysAgo(0, 3))], NOW)).toBeNull();
  });

  it("uses the IST day, not the UTC day", () => {
    // 11 Nov 23:30 IST is 11 Nov 18:00 UTC; 12 Nov 00:30 IST is 11 Nov 19:00 UTC.
    const lateEvening = new Date("2026-11-11T18:00:00Z");
    const pastMidnight = new Date("2026-11-11T19:00:00Z");
    expect(leftCheckoutCandidate([open(lateEvening)], pastMidnight)).not.toBeNull();
  });

  it("names the most recent checkout's pass", () => {
    const rows = [open(daysAgo(3), "practice-pass-6m"), open(daysAgo(2), "mock-pass-6m")];
    expect(leftCheckoutCandidate(rows, NOW)?.planId).toBe("mock-pass-6m");
  });

  it("stops 7 days after the checkout", () => {
    expect(leftCheckoutCandidate([open(daysAgo(6))], NOW)).not.toBeNull();
    expect(leftCheckoutCandidate([open(daysAgo(8))], NOW)).toBeNull();
  });

  it("stops for good once the student taps Not now", () => {
    const rows = [open(daysAgo(2)), { at: daysAgo(1), step: "dismissed", gate: "return", planId: null }];
    expect(leftCheckoutCandidate(rows, NOW)).toBeNull();
  });

  it(`shows on at most ${LEFT_CHECKOUT_MAX_DAYS} days: two earlier days shown means no third`, () => {
    expect(leftCheckoutCandidate([open(daysAgo(3)), shown(daysAgo(2))], NOW)).not.toBeNull();
    expect(leftCheckoutCandidate([open(daysAgo(4)), shown(daysAgo(3)), shown(daysAgo(1))], NOW)).toBeNull();
  });

  it("keeps showing through the rest of a day it was already shown on", () => {
    expect(leftCheckoutCandidate([open(daysAgo(3)), shown(daysAgo(2)), shown(daysAgo(0, 1))], NOW)).not.toBeNull();
  });

  it("does not restart the 2 days when the bar's own checkout is opened and left", () => {
    // Shown on two days, the second time the student opened checkout from the bar.
    const rows = [open(daysAgo(4)), shown(daysAgo(3)), shown(daysAgo(2)), open(daysAgo(2), "practice-pass-6m", "return")];
    expect(leftCheckoutCandidate(rows, NOW)).toBeNull();
  });

  it("ignores a shown or Not now from another offer", () => {
    const rows = [open(daysAgo(2)), { at: daysAgo(1), step: "dismissed", gate: "reveals", planId: null }];
    expect(leftCheckoutCandidate(rows, NOW)).not.toBeNull();
  });

  it("is null with no checkout", () => {
    expect(leftCheckoutCandidate([shown(daysAgo(1))], NOW)).toBeNull();
  });
});

const grant = (over: Partial<Entitlement>): Entitlement => ({
  id: "e1",
  userId: "u1",
  scope: "practice",
  source: "razorpay",
  status: "active",
  grantedAt: daysAgo(30).toISOString(),
  expiresAt: new Date(NOW.getTime() + 100 * 86_400_000).toISOString(),
  providerRef: null,
  note: null,
  grantedBy: null,
  ...over,
});

describe("stillUnpaid", () => {
  const candidate = { planId: "practice-pass-6m", openedAt: daysAgo(2) };

  it("is true with no pass", () => {
    expect(stillUnpaid(candidate, [], "practice", NOW)).toBe(true);
  });

  it("is false once a pass covering it is active, however it came", () => {
    expect(stillUnpaid(candidate, [grant({ source: "comp" })], "practice", NOW)).toBe(false);
  });

  it("is false after any payment since the checkout, even for another pass", () => {
    const boughtPremium = grant({ scope: "mocks", grantedAt: daysAgo(1).toISOString(), status: "revoked" });
    expect(stillUnpaid(candidate, [boughtPremium], "practice", NOW)).toBe(false);
  });

  it("stays true for a Practice holder who left a Premium upgrade", () => {
    const practice = grant({ scope: "practice", grantedAt: daysAgo(20).toISOString() });
    expect(stillUnpaid({ planId: "mock-pass-6m", openedAt: daysAgo(2) }, [practice], "mocks", NOW)).toBe(true);
  });
});

describe("leftCheckoutCopy", () => {
  it("says the checkout did not complete and what practice does", () => {
    expect(leftCheckoutCopy({ label: "Practice Pass", length: "6 months", downloads: false })).toEqual({
      title: "Your checkout didn't complete",
      body: "The Practice Pass gives you unlimited practice for 6 months, and the more questions you practise, the more marks you get.",
    });
  });

  it("names PDF downloads for the Premium Pass", () => {
    expect(leftCheckoutCopy({ label: "Premium Pass", length: "6 months", downloads: true }).body).toBe(
      "The Premium Pass gives you unlimited practice and PDF downloads for 6 months, and the more questions you practise, the more marks you get."
    );
  });

  it("says for life for a lifetime pass", () => {
    expect(leftCheckoutCopy({ label: "Practice Pass", length: "lifetime", downloads: false }).body).toContain("for life,");
  });
});

describe("showLeftCheckoutBar (the first page of the day)", () => {
  it("shows on the first page of a day", () => {
    expect(showLeftCheckoutBar(null, "2026-11-12", "/questions/a")).toBe(true);
    expect(showLeftCheckoutBar({ day: "2026-11-11", path: "/me" }, "2026-11-12", "/questions/a")).toBe(true);
  });

  it("stays on that page (a reload) but not on the next page that day", () => {
    expect(showLeftCheckoutBar({ day: "2026-11-12", path: "/questions/a" }, "2026-11-12", "/questions/a")).toBe(true);
    expect(showLeftCheckoutBar({ day: "2026-11-12", path: "/questions/a" }, "2026-11-12", "/browse")).toBe(false);
  });

  it("reads a stored record strictly", () => {
    expect(parseBarRecord(JSON.stringify({ day: "2026-11-12", path: "/me" }))).toEqual({ day: "2026-11-12", path: "/me" });
    expect(parseBarRecord(null)).toBeNull();
    expect(parseBarRecord("not json")).toBeNull();
    expect(parseBarRecord(JSON.stringify({ day: 5, path: "/me" }))).toBeNull();
  });
});
