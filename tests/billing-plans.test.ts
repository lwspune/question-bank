/**
 * The two paid passes (2026-09-26). Prices and lengths are the owner's call;
 * the SCOPES are the security property: neither pass may carry "all", because
 * "all" satisfies every scope and a ₹99 student pass would then unlock the
 * teacher's Word downloads.
 */
import { describe, it, expect } from "vitest";
import { PLANS, getPlan, formatRupees } from "@/lib/billing/plans";
import { SCOPE_ALL, SCOPE_MOCKS, SCOPE_TEACHER } from "@/lib/entitlements/access";

describe("PLANS", () => {
  it("sells exactly the student mock pass and the teacher pass", () => {
    expect(PLANS.map((p) => p.id)).toEqual(["mock-pass-6m", "teacher-pass-1y"]);
  });

  it("student mock pass: ₹99 for 182 days, scope mocks", () => {
    const p = getPlan("mock-pass-6m")!;
    expect(p.amountPaise).toBe(9900);
    expect(formatRupees(p.amountPaise)).toBe("₹99");
    expect(p.durationDays).toBe(182);
    expect(p.scope).toBe(SCOPE_MOCKS);
  });

  it("teacher pass: ₹499 for 365 days, scope teacher", () => {
    const p = getPlan("teacher-pass-1y")!;
    expect(p.amountPaise).toBe(49900);
    expect(p.durationDays).toBe(365);
    expect(p.scope).toBe(SCOPE_TEACHER);
  });

  it("no plan sells the catch-all scope", () => {
    for (const p of PLANS) expect(p.scope).not.toBe(SCOPE_ALL);
  });

  it("the retired ₹999 plan no longer resolves", () => {
    expect(getPlan("premium-365")).toBeNull();
  });
});
