/**
 * USD passes for intl.pyqvault.com (2026-10-30, migration 0203). A plan belongs
 * to one site: www sells in INR, intl in USD, and the pair is one rule. The
 * price is stored in the currency's smallest unit (paise or cents), so every
 * place that shows or sums it must know which currency it is.
 */
import { describe, it, expect } from "vitest";
import {
  formatPrice,
  passCta,
  passForScope,
  planForPaidOrder,
  siteForCurrency,
  validatePlan,
  type Plan,
  type PlanInput,
} from "@/lib/billing/plans";
import { SCOPE_MOCKS } from "@/lib/entitlements/access";

const plan = (over: Partial<Plan>): Plan => ({
  id: "x",
  label: "Premium Pass",
  blurb: "b",
  perks: [],
  urlKey: "x",
  amountPaise: 49900,
  currency: "INR",
  site: "pyqvault",
  durationDays: 182,
  scope: SCOPE_MOCKS,
  active: true,
  sortOrder: 1,
  ...over,
});

const input = (over: Partial<PlanInput>): PlanInput => {
  const { active: _active, ...rest } = plan(over);
  return rest;
};

describe("formatPrice", () => {
  it("writes rupees the Indian way", () => {
    expect(formatPrice(49900, "INR")).toBe("₹499");
    expect(formatPrice(1234500, "INR")).toBe("₹12,345");
  });

  it("writes dollars, with cents only when there are some", () => {
    expect(formatPrice(1900, "USD")).toBe("$19");
    expect(formatPrice(1999, "USD")).toBe("$19.99");
    expect(formatPrice(150000, "USD")).toBe("$1,500");
  });
});

describe("siteForCurrency", () => {
  it("pairs INR with www and USD with intl", () => {
    expect(siteForCurrency("INR")).toBe("pyqvault");
    expect(siteForCurrency("USD")).toBe("intl");
  });
});

describe("validatePlan: site and currency", () => {
  it("accepts an INR plan on www and a USD plan on intl", () => {
    expect(validatePlan(input({}))).toEqual({ ok: true });
    expect(validatePlan(input({ currency: "USD", site: "intl", amountPaise: 1900 }))).toEqual({ ok: true });
  });

  it("refuses a currency that is not its site's, either way round", () => {
    expect(validatePlan(input({ currency: "USD", site: "pyqvault" }))).toMatchObject({ ok: false, field: "currency" });
    expect(validatePlan(input({ currency: "INR", site: "intl" }))).toMatchObject({ ok: false, field: "currency" });
  });

  it("refuses an unknown currency", () => {
    expect(validatePlan(input({ currency: "EUR" as "USD", site: "intl" }))).toMatchObject({ ok: false, field: "currency" });
  });
});

describe("passForScope by site", () => {
  const www = plan({ id: "www", sortOrder: 2 });
  const intl = plan({ id: "intl", site: "intl", currency: "USD", amountPaise: 1900, sortOrder: 1 });

  it("offers www's pass on www even when the intl one sorts first", () => {
    expect(passForScope([intl, www], SCOPE_MOCKS)?.id).toBe("www");
    expect(passForScope([intl, www], SCOPE_MOCKS, "pyqvault")?.id).toBe("www");
  });

  it("offers the intl pass on intl, and nothing when intl has none", () => {
    expect(passForScope([intl, www], SCOPE_MOCKS, "intl")?.id).toBe("intl");
    expect(passForScope([www], SCOPE_MOCKS, "intl")).toBeNull();
  });
});

describe("passCta prices in the plan's currency", () => {
  it("shows dollars for a USD plan", () => {
    expect(passCta(plan({ site: "intl", currency: "USD", amountPaise: 1900 }))?.price).toBe("$19");
    expect(passCta(plan({}))?.price).toBe("₹499");
  });
});

describe("planForPaidOrder carries the currency to the grant", () => {
  const notes = {
    userId: "u1",
    planId: "intl-pass-6m",
    amountPaise: "1900",
    currency: "USD",
    scope: SCOPE_MOCKS,
    durationDays: "182",
  };

  it("grants a paid USD order with its currency", () => {
    const r = planForPaidOrder({ status: "paid", amount_paid: 1900, currency: "USD", notes }, "u1");
    expect(r).toEqual({
      ok: true,
      grant: { planId: "intl-pass-6m", scope: SCOPE_MOCKS, durationDays: 182, amountPaise: 1900, currency: "USD" },
    });
  });

  it("grants an INR order as INR", () => {
    const r = planForPaidOrder(
      { status: "paid", amount_paid: 49900, currency: "INR", notes: { ...notes, amountPaise: "49900", currency: "INR" } },
      "u1"
    );
    expect(r).toMatchObject({ ok: true, grant: { currency: "INR" } });
  });

  it("refuses a currency the shop does not sell in", () => {
    const r = planForPaidOrder(
      { status: "paid", amount_paid: 1900, currency: "EUR", notes: { ...notes, currency: "EUR" } },
      "u1"
    );
    expect(r).toMatchObject({ ok: false });
  });
});
