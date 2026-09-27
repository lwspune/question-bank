/**
 * validatePlan: the rule a plan row must pass before the admin page writes it.
 * The database CHECKs mirror the security half (price > 0, scope never "all");
 * this runs first so the admin sees a field-level message, not a 23514.
 */
import { describe, it, expect } from "vitest";
import { validatePlan, SELLABLE_SCOPES, type PlanInput } from "@/lib/billing/plans";
import { SCOPE_ALL, SCOPE_MOCKS, SCOPE_TEACHER } from "@/lib/entitlements/access";

const good = (over: Partial<PlanInput> = {}): PlanInput => ({
  id: "mock-pass-6m",
  label: "Student Mock Pass",
  blurb: "Unlimited timed mock tests for 6 months.",
  perks: ["Unlimited mocks", "Instant scores"],
  urlKey: "mocks",
  amountPaise: 9900,
  currency: "INR",
  durationDays: 182,
  scope: SCOPE_MOCKS,
  sortOrder: 1,
  ...over,
});

describe("validatePlan", () => {
  it("accepts the two shipped passes", () => {
    expect(validatePlan(good())).toEqual({ ok: true });
    expect(
      validatePlan(good({ id: "teacher-pass-1y", urlKey: "teacher", amountPaise: 49900, durationDays: 365, scope: SCOPE_TEACHER }))
    ).toEqual({ ok: true });
  });

  it("sells only the scopes something in code enforces", () => {
    expect(SELLABLE_SCOPES).toEqual([SCOPE_MOCKS, SCOPE_TEACHER]);
    expect(validatePlan(good({ scope: SCOPE_ALL }))).toMatchObject({ ok: false, field: "scope" });
    expect(validatePlan(good({ scope: "notes" }))).toMatchObject({ ok: false, field: "scope" });
  });

  it("price is a positive whole number of paise", () => {
    expect(validatePlan(good({ amountPaise: 0 }))).toMatchObject({ ok: false, field: "amountPaise" });
    expect(validatePlan(good({ amountPaise: -100 }))).toMatchObject({ ok: false, field: "amountPaise" });
    expect(validatePlan(good({ amountPaise: 99.5 }))).toMatchObject({ ok: false, field: "amountPaise" });
    expect(validatePlan(good({ amountPaise: NaN }))).toMatchObject({ ok: false, field: "amountPaise" });
  });

  it("duration is null (lifetime) or a positive whole number of days", () => {
    expect(validatePlan(good({ durationDays: null }))).toEqual({ ok: true });
    expect(validatePlan(good({ durationDays: 0 }))).toMatchObject({ ok: false, field: "durationDays" });
    expect(validatePlan(good({ durationDays: 1.5 }))).toMatchObject({ ok: false, field: "durationDays" });
  });

  it("id and urlKey are slugs; label and blurb are required", () => {
    expect(validatePlan(good({ id: "Mock Pass" }))).toMatchObject({ ok: false, field: "id" });
    expect(validatePlan(good({ id: "" }))).toMatchObject({ ok: false, field: "id" });
    expect(validatePlan(good({ urlKey: "teacher pass" }))).toMatchObject({ ok: false, field: "urlKey" });
    expect(validatePlan(good({ label: "  " }))).toMatchObject({ ok: false, field: "label" });
    expect(validatePlan(good({ blurb: "" }))).toMatchObject({ ok: false, field: "blurb" });
  });

  it("perks are short non-empty lines, at most six", () => {
    expect(validatePlan(good({ perks: [] }))).toEqual({ ok: true });
    expect(validatePlan(good({ perks: ["", "x"] }))).toMatchObject({ ok: false, field: "perks" });
    expect(validatePlan(good({ perks: Array(7).fill("p") }))).toMatchObject({ ok: false, field: "perks" });
  });

  it("currency is INR only (Razorpay account is INR)", () => {
    expect(validatePlan(good({ currency: "USD" as "INR" }))).toMatchObject({ ok: false, field: "currency" });
  });
});
