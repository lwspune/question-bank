/**
 * V is told the student's own pass (2026-11-27). A student who had bought the
 * Practice Pass three hours earlier asked V about the ₹300 /pricing asked them
 * for the Premium Pass (their upgrade price). V knew only the list prices, said
 * "PYQ Vault has no ₹300 pass" and warned them not to pay anyone.
 */
import { describe, it, expect } from "vitest";
import { ownPassLine } from "@/lib/chat/ownPass";
import type { Plan } from "@/lib/billing/plans";
import type { Entitlement } from "@/lib/entitlements/access";

const DAY = 86_400_000;
const NOW = Date.parse("2026-11-27T09:16:00Z");

function plan(p: Partial<Plan> & Pick<Plan, "id" | "label" | "scope" | "amountPaise">): Plan {
  return {
    blurb: "",
    perks: [],
    urlKey: p.id,
    currency: "INR",
    site: "pyqvault",
    durationDays: 182,
    active: true,
    sortOrder: 0,
    ...p,
  };
}

const PRACTICE = plan({ id: "practice-6m", label: "Practice Pass", scope: "practice", amountPaise: 19900 });
const PREMIUM = plan({ id: "premium-6m", label: "Premium Pass", scope: "mocks", amountPaise: 49900 });
const PLANS = [PRACTICE, PREMIUM];

function pass(p: Partial<Entitlement>): Entitlement {
  return {
    id: "e1",
    userId: "u1",
    scope: "practice",
    source: "razorpay",
    status: "active",
    grantedAt: new Date(NOW - 5 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(NOW - 5 * 60 * 60 * 1000 + 182 * DAY).toISOString(),
    providerRef: null,
    note: null,
    grantedBy: null,
    amountPaise: 19900,
    currency: "INR",
    ...p,
  };
}

describe("ownPassLine", () => {
  it("names the pass the student holds and when it ends", () => {
    const line = ownPassLine([pass({})], PLANS, PLANS, NOW)!;
    expect(line).toMatch(/Practice Pass/);
    expect(line).toMatch(/May 2027/);
  });

  it("gives the upgrade price checkout would charge, beside the list price", () => {
    const line = ownPassLine([pass({})], PLANS, PLANS, NOW)!;
    expect(line).toMatch(/Premium Pass/);
    expect(line).toContain("₹300");
    expect(line).toContain("₹499");
    expect(line).toMatch(/\/pricing/);
  });

  it("says the upgrade ends on the same day as the pass they hold", () => {
    const line = ownPassLine([pass({})], PLANS, PLANS, NOW)!;
    expect(line).toMatch(/same day/i);
  });

  it("tells V a Premium holder already has everything in the Practice Pass", () => {
    const line = ownPassLine([pass({ scope: "mocks", amountPaise: 49900 })], PLANS, PLANS, NOW)!;
    expect(line).toMatch(/Premium Pass/);
    expect(line).toMatch(/already/i);
    expect(line).not.toMatch(/₹300/);
  });

  it("offers no upgrade price on a free grant (a trial or the team's gift)", () => {
    const line = ownPassLine([pass({ source: "trial", amountPaise: null })], PLANS, PLANS, NOW)!;
    expect(line).toMatch(/trial/i);
    expect(line).not.toMatch(/₹300/);
  });

  it("says a free account holds no pass, so V never guesses", () => {
    expect(ownPassLine([], PLANS, PLANS, NOW)).toMatch(/no pass/i);
  });

  it("names a pass that has ended, so 'my pass is gone' gets a true answer", () => {
    const ended = pass({
      grantedAt: new Date(NOW - 200 * DAY).toISOString(),
      expiresAt: new Date(NOW - 18 * DAY).toISOString(),
    });
    const line = ownPassLine([ended], PLANS, PLANS, NOW)!;
    expect(line).toMatch(/ended/i);
    expect(line).toMatch(/Practice Pass/);
  });

  it("quotes only passes on sale to this buyer", () => {
    const line = ownPassLine([pass({})], PLANS, [PRACTICE], NOW)!;
    expect(line).not.toMatch(/₹300/);
  });

  it("uses no em dashes, since V copies the style it is shown", () => {
    const line = ownPassLine([pass({})], PLANS, PLANS, NOW)!;
    expect(line).not.toContain(String.fromCharCode(0x2014));
  });
});
