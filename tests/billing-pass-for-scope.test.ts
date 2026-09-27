/**
 * passForScope: which pass a CTA offers. The mock start page wants the pass
 * that sells `mocks`, the download dialog the one that sells `teacher`. Exact
 * scope, not "covers" — the teacher pass covers mocks, but a student blocked
 * at the free-mock limit should be offered the ₹99 pass, not the ₹499 one.
 */
import { describe, it, expect } from "vitest";
import { passForScope, type Plan } from "@/lib/billing/plans";
import { SCOPE_MOCKS, SCOPE_TEACHER } from "@/lib/entitlements/access";

const plan = (over: Partial<Plan>): Plan => ({
  id: "x",
  label: "X",
  blurb: "",
  perks: [],
  urlKey: "x",
  amountPaise: 100,
  currency: "INR",
  durationDays: 30,
  scope: SCOPE_MOCKS,
  active: true,
  sortOrder: 0,
  ...over,
});

describe("passForScope", () => {
  const mocks = plan({ id: "m", scope: SCOPE_MOCKS, amountPaise: 9900, sortOrder: 1 });
  const teacher = plan({ id: "t", scope: SCOPE_TEACHER, amountPaise: 49900, sortOrder: 2 });

  it("returns the pass that sells exactly that scope", () => {
    expect(passForScope([mocks, teacher], SCOPE_MOCKS)?.id).toBe("m");
    expect(passForScope([mocks, teacher], SCOPE_TEACHER)?.id).toBe("t");
  });

  it("never offers the covering pass in place of the exact one", () => {
    expect(passForScope([teacher], SCOPE_MOCKS)).toBeNull();
  });

  it("skips inactive passes", () => {
    expect(passForScope([{ ...mocks, active: false }], SCOPE_MOCKS)).toBeNull();
  });

  it("with two passes on one scope, offers the lower sort order", () => {
    const promo = plan({ id: "promo", scope: SCOPE_MOCKS, amountPaise: 4900, sortOrder: 0 });
    expect(passForScope([mocks, promo], SCOPE_MOCKS)?.id).toBe("promo");
  });
});
