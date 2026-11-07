/**
 * V's hourly limit by pass (owner, 2026-11-07): Premium Pass holders (the
 * downloads scope: Premium, the old teacher pass, `all`) may ask V up to
 * premiumLimit messages an hour; everyone else keeps the free limit. At the
 * limit a free student is offered Premium; a Practice holder only gets the
 * wait line (no upgrade price yet, so the card would read as a second charge).
 */
import { describe, it, expect } from "vitest";
import { hourlyLimitLine, hourlyOutcome, parseHourlyLimit, vPassTier } from "@/lib/chat/hourlyLimit";
import type { Entitlement } from "@/lib/entitlements/access";

const NOW = Date.UTC(2026, 10, 7, 12, 0);
function grant(scope: string, over: Partial<Entitlement> = {}): Entitlement {
  return {
    id: `e-${scope}`,
    userId: "u1",
    scope,
    source: "razorpay",
    status: "active",
    grantedAt: "2026-10-01T00:00:00Z",
    expiresAt: "2027-04-01T00:00:00Z",
    providerRef: null,
    note: null,
    grantedBy: null,
    ...over,
  };
}

describe("vPassTier", () => {
  it("counts the Premium Pass, the teacher pass and full access as premium", () => {
    expect(vPassTier([grant("mocks")], NOW)).toBe("premium");
    expect(vPassTier([grant("teacher")], NOW)).toBe("premium");
    expect(vPassTier([grant("all", { source: "comp" })], NOW)).toBe("premium");
  });

  it("counts the Practice Pass as a pass, not premium", () => {
    expect(vPassTier([grant("practice")], NOW)).toBe("pass");
  });

  it("counts no grant, an expired one or a revoked one as none", () => {
    expect(vPassTier([], NOW)).toBe("none");
    expect(vPassTier([grant("mocks", { expiresAt: "2026-11-01T00:00:00Z" })], NOW)).toBe("none");
    expect(vPassTier([grant("mocks", { status: "revoked" as Entitlement["status"] })], NOW)).toBe("none");
  });

  it("is premium when a student holds Practice and Premium", () => {
    expect(vPassTier([grant("practice"), grant("mocks")], NOW)).toBe("premium");
  });
});

describe("hourlyOutcome", () => {
  const limits = { freeLimit: 5, premiumLimit: 50 };

  it("allows anyone within the free limit", () => {
    expect(hourlyOutcome({ ...limits, used: 5, tier: "none", signedIn: true })).toEqual({ allowed: true });
  });

  it("lets a Premium holder past the free limit up to the Premium limit", () => {
    expect(hourlyOutcome({ ...limits, used: 6, tier: "premium", signedIn: true })).toEqual({ allowed: true });
    expect(hourlyOutcome({ ...limits, used: 50, tier: "premium", signedIn: true })).toEqual({ allowed: true });
  });

  it("stops a Premium holder past the Premium limit, with no offer", () => {
    expect(hourlyOutcome({ ...limits, used: 51, tier: "premium", signedIn: true })).toEqual({
      allowed: false,
      limit: 50,
      offerPremium: false,
    });
  });

  it("stops a free student at the free limit and offers Premium", () => {
    expect(hourlyOutcome({ ...limits, used: 6, tier: "none", signedIn: true })).toEqual({
      allowed: false,
      limit: 5,
      offerPremium: true,
    });
  });

  it("stops a Practice holder at the free limit with no offer", () => {
    expect(hourlyOutcome({ ...limits, used: 6, tier: "pass", signedIn: true })).toEqual({
      allowed: false,
      limit: 5,
      offerPremium: false,
    });
  });

  it("offers nothing to a signed-out visitor", () => {
    expect(hourlyOutcome({ ...limits, used: 6, tier: "none", signedIn: false })).toMatchObject({ offerPremium: false });
  });

  it("never lets a Premium limit below the free one shrink a holder's allowance", () => {
    expect(hourlyOutcome({ freeLimit: 10, premiumLimit: 5, used: 8, tier: "premium", signedIn: true })).toEqual({
      allowed: true,
    });
  });
});

describe("hourlyLimitLine", () => {
  it("says how many questions and when to ask again, in whole minutes", () => {
    expect(hourlyLimitLine(5, 23 * 60)).toBe("You've asked 5 questions this hour. You can ask again in 23 minutes.");
    expect(hourlyLimitLine(5, 22 * 60 + 1)).toBe("You've asked 5 questions this hour. You can ask again in 23 minutes.");
  });

  it("says one minute, never zero", () => {
    expect(hourlyLimitLine(50, 1)).toBe("You've asked 50 questions this hour. You can ask again in 1 minute.");
    expect(hourlyLimitLine(50, 0)).toBe("You've asked 50 questions this hour. You can ask again in 1 minute.");
  });
});

describe("parseHourlyLimit (what the chat window reads)", () => {
  const pass = { planId: "mock-pass-6m", label: "Premium Pass", price: "₹499", length: "6 months", urlKey: "mocks", perks: ["PDF downloads"] };

  it("reads the line, the offer and the pass", () => {
    expect(parseHourlyLimit({ line: "You've asked 5 questions this hour.", limit: 5, offer: true, pass, premiumLimit: 50 })).toEqual({
      line: "You've asked 5 questions this hour.",
      pass,
      premiumLimit: 50,
    });
  });

  it("drops the pass when there is no offer, or when it is malformed", () => {
    expect(parseHourlyLimit({ line: "x", limit: 5, offer: false, pass, premiumLimit: 50 })?.pass).toBeNull();
    expect(parseHourlyLimit({ line: "x", limit: 5, offer: true, pass: { label: 1 }, premiumLimit: 50 })?.pass).toBeNull();
  });

  it("is null without a line", () => {
    expect(parseHourlyLimit(undefined)).toBeNull();
    expect(parseHourlyLimit({ limit: 5 })).toBeNull();
    expect(parseHourlyLimit({ line: "", limit: 5 })).toBeNull();
  });
});
