/**
 * The download box's offer to a visitor without the pass (2026-10-04). The
 * wording names THEIR selection and the pass, then the price, because the old
 * copy led with what was free and buried the price mid-sentence — and all 52
 * signed-out visitors who tapped through it in a week left on /pricing.
 */
import { describe, it, expect } from "vitest";
import { gateTitle, gatePriceLine } from "@/lib/billing/gateCopy";
import { passCta, type Plan } from "@/lib/billing/plans";
import { SCOPE_MOCKS } from "@/lib/entitlements/access";

describe("gateTitle", () => {
  it("names the count and the pass", () => {
    expect(gateTitle(48, "Premium Pass")).toBe("Download these 48 questions with Premium Pass");
  });

  it("is singular for one question", () => {
    expect(gateTitle(1, "Premium Pass")).toBe("Download this question with Premium Pass");
  });

  it("groups thousands the Indian way", () => {
    expect(gateTitle(12345, "Premium Pass")).toBe("Download these 12,345 questions with Premium Pass");
  });

  it("drops the count when there is nothing selected yet", () => {
    expect(gateTitle(0, "Premium Pass")).toBe("Download questions with Premium Pass");
  });
});

describe("gatePriceLine", () => {
  it("joins price and length", () => {
    expect(gatePriceLine({ price: "₹99", length: "6 months" })).toBe("₹99 · 6 months");
  });
});

describe("passCta", () => {
  const plan: Plan = {
    id: "pyq-vault-pass",
    label: "Premium Pass",
    blurb: "b",
    perks: ["Unlimited downloads", "Full mock tests"],
    urlKey: "premium",
    amountPaise: 9900,
    currency: "INR",
    durationDays: 182,
    scope: SCOPE_MOCKS,
    active: true,
    sortOrder: 0,
  };

  it("carries the plan id and perks the download box needs to sell in place", () => {
    const cta = passCta(plan);
    expect(cta?.planId).toBe("pyq-vault-pass");
    expect(cta?.perks).toEqual(["Unlimited downloads", "Full mock tests"]);
    expect(cta?.price).toBe("₹99");
  });

  it("is null when nothing is on sale", () => {
    expect(passCta(null)).toBeNull();
  });
});
