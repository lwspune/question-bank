/**
 * A pass per exam family, priced per country (2026-10-30, owner). Before this
 * every pass carried scope `mocks`, so the Rs 499 www pass unlocked IMAT on
 * intl.pyqvault.com too, and any dearer international price was undercut on
 * day one. Now each exam names the pass that covers it, and a plan may be
 * limited to buyers in certain countries (IMAT in rupees for India).
 */
import { describe, it, expect } from "vitest";
import {
  passForBuyer,
  resolveOrderPlan,
  SELLABLE_SCOPES,
  validatePlan,
  type Plan,
  type PlanInput,
} from "@/lib/billing/plans";
import { coversAny, passScopeForExam, sitePassScopes } from "@/lib/billing/passScope";
import { SCOPE_ALL, SCOPE_IMAT, SCOPE_MCAT, SCOPE_MOCKS, SCOPE_TEACHER, scopeCovers } from "@/lib/entitlements/access";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";

const plan = (over: Partial<Plan>): Plan => ({
  id: "x",
  label: "Premium Pass",
  blurb: "b",
  perks: [],
  urlKey: "x",
  amountPaise: 1900,
  currency: "USD",
  site: "intl",
  durationDays: 182,
  scope: SCOPE_IMAT,
  active: true,
  sortOrder: 1,
  countries: null,
  ...over,
});

const input = (over: Partial<PlanInput>): PlanInput => {
  const { active: _active, ...rest } = plan(over);
  return rest;
};

describe("which pass covers an exam", () => {
  it("IMAT asks for the IMAT pass; Indian exams for the mocks pass", () => {
    expect(passScopeForExam("imat")).toBe(SCOPE_IMAT);
    expect(passScopeForExam("nda")).toBe(SCOPE_MOCKS);
    expect(passScopeForExam("mht-cet")).toBe(SCOPE_MOCKS);
  });

  it("an unknown or missing exam falls back to the mocks pass", () => {
    expect(passScopeForExam(null)).toBe(SCOPE_MOCKS);
    expect(passScopeForExam("no-such-exam")).toBe(SCOPE_MOCKS);
  });

  it("every intl exam names its own pass, and no www exam does", () => {
    for (const e of EXAM_REGISTRY) {
      if (e.site === "intl") expect(passScopeForExam(e.slug), e.slug).not.toBe(SCOPE_MOCKS);
      else expect(passScopeForExam(e.slug), e.slug).toBe(SCOPE_MOCKS);
    }
  });

  it("a site's passes: www sells mocks, intl its exams' passes", () => {
    expect(sitePassScopes("pyqvault")).toEqual([SCOPE_MOCKS]);
    expect(sitePassScopes("intl")).toContain(SCOPE_IMAT);
    expect(sitePassScopes("intl")).not.toContain(SCOPE_MOCKS);
  });
});

describe("what a held pass covers", () => {
  it("the mocks and teacher passes do not cover IMAT or MCAT", () => {
    for (const held of [SCOPE_MOCKS, SCOPE_TEACHER]) {
      expect(scopeCovers(held, SCOPE_IMAT)).toBe(false);
      expect(scopeCovers(held, SCOPE_MCAT)).toBe(false);
    }
  });

  it("an IMAT pass covers IMAT only", () => {
    expect(scopeCovers(SCOPE_IMAT, SCOPE_IMAT)).toBe(true);
    expect(scopeCovers(SCOPE_IMAT, SCOPE_MCAT)).toBe(false);
    expect(scopeCovers(SCOPE_IMAT, SCOPE_MOCKS)).toBe(false);
  });

  it("all still covers everything; teacher still covers mocks", () => {
    expect(scopeCovers(SCOPE_ALL, SCOPE_IMAT)).toBe(true);
    expect(scopeCovers(SCOPE_TEACHER, SCOPE_MOCKS)).toBe(true);
  });

  it("coversAny: any held pass covering any wanted scope", () => {
    expect(coversAny([SCOPE_IMAT], [SCOPE_IMAT, SCOPE_MCAT])).toBe(true);
    expect(coversAny([SCOPE_MOCKS], [SCOPE_IMAT])).toBe(false);
    expect(coversAny([], [SCOPE_MOCKS])).toBe(false);
    expect(coversAny([SCOPE_ALL], [SCOPE_MCAT])).toBe(true);
  });

  it("the IMAT and MCAT passes can be sold; all never can", () => {
    expect(SELLABLE_SCOPES).toEqual(expect.arrayContaining([SCOPE_MOCKS, SCOPE_TEACHER, SCOPE_IMAT, SCOPE_MCAT]));
    expect(SELLABLE_SCOPES).not.toContain(SCOPE_ALL);
  });
});

describe("passForBuyer: the price for the buyer's country", () => {
  const world = plan({ id: "imat-6m", amountPaise: 1900, currency: "USD" });
  const india = plan({ id: "imat-india-6m", amountPaise: 99900, currency: "INR", countries: ["IN"] });

  it("a buyer in India gets the India plan", () => {
    expect(passForBuyer([world, india], SCOPE_IMAT, "intl", "IN")?.id).toBe("imat-india-6m");
  });

  it("a buyer anywhere else, or of unknown country, gets the general plan", () => {
    expect(passForBuyer([world, india], SCOPE_IMAT, "intl", "US")?.id).toBe("imat-6m");
    expect(passForBuyer([world, india], SCOPE_IMAT, "intl", null)?.id).toBe("imat-6m");
  });

  it("a country plan is never offered outside its countries", () => {
    expect(passForBuyer([india], SCOPE_IMAT, "intl", "US")).toBeNull();
    expect(passForBuyer([india], SCOPE_IMAT, "intl", null)).toBeNull();
  });

  it("an inactive country plan falls back to the general plan", () => {
    expect(passForBuyer([world, { ...india, active: false }], SCOPE_IMAT, "intl", "IN")?.id).toBe("imat-6m");
  });

  it("other scopes and sites are not mixed in", () => {
    const mcat = plan({ id: "mcat-3m", scope: SCOPE_MCAT });
    expect(passForBuyer([world, india, mcat], SCOPE_MCAT, "intl", "IN")?.id).toBe("mcat-3m");
    expect(passForBuyer([world, india], SCOPE_IMAT, "pyqvault", "IN")).toBeNull();
  });
});

describe("resolveOrderPlan: the server, not the button, picks the price", () => {
  const world = plan({ id: "imat-6m" });
  const india = plan({ id: "imat-india-6m", amountPaise: 99900, currency: "INR", countries: ["IN"] });
  const plans = [world, india];

  it("a buyer in India who tapped the dollar pass is sold the rupee pass", () => {
    expect(resolveOrderPlan(plans, "imat-6m", "IN")?.id).toBe("imat-india-6m");
  });

  it("a buyer outside India who sends the rupee plan id is sold the dollar pass", () => {
    expect(resolveOrderPlan(plans, "imat-india-6m", "US")?.id).toBe("imat-6m");
    expect(resolveOrderPlan(plans, "imat-india-6m", null)?.id).toBe("imat-6m");
  });

  it("an unknown or inactive plan id sells nothing", () => {
    expect(resolveOrderPlan(plans, "nope", "IN")).toBeNull();
    expect(resolveOrderPlan([{ ...world, active: false }, india], "imat-6m", "US")).toBeNull();
  });

  it("a plan with no country rule and no country sibling is sold as asked", () => {
    const mocks = plan({ id: "mock-pass-6m", scope: SCOPE_MOCKS, site: "pyqvault", currency: "INR", amountPaise: 49900 });
    expect(resolveOrderPlan([mocks], "mock-pass-6m", "US")?.id).toBe("mock-pass-6m");
  });
});

describe("validatePlan: countries and currency", () => {
  it("an intl plan in rupees is allowed only when limited to India", () => {
    expect(validatePlan(input({ currency: "INR", countries: ["IN"] }))).toEqual({ ok: true });
    expect(validatePlan(input({ currency: "INR", countries: null }))).toMatchObject({ ok: false, field: "currency" });
    expect(validatePlan(input({ currency: "INR", countries: ["IN", "PK"] }))).toMatchObject({ ok: false, field: "currency" });
  });

  it("www stays rupees only", () => {
    expect(validatePlan(input({ site: "pyqvault", currency: "USD", scope: SCOPE_MOCKS }))).toMatchObject({ ok: false, field: "currency" });
  });

  it("countries are two-letter codes, at least one when set", () => {
    expect(validatePlan(input({ countries: ["in"] }))).toMatchObject({ ok: false, field: "countries" });
    expect(validatePlan(input({ countries: [] }))).toMatchObject({ ok: false, field: "countries" });
    expect(validatePlan(input({ countries: ["US", "CA"] }))).toEqual({ ok: true });
  });

  it("the new scopes validate", () => {
    expect(validatePlan(input({ scope: SCOPE_MCAT, durationDays: 90 }))).toEqual({ ok: true });
  });
});
