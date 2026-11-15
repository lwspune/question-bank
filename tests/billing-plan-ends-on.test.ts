/**
 * A pass that ends on a fixed date (migration 0256, IMAT: "until IMAT 2027").
 *
 * The order stays the contract: /api/billing/order stamps the end into the
 * order's notes and the grant is decided from those notes alone, so changing
 * the date on /dashboard/pricing never moves a checkout already open. Once the
 * date has passed (or is under a day away) a sale falls back to the plan's
 * length in days, so the site never sells a pass that is already over.
 */
import { describe, it, expect } from "vitest";
import {
  grantExpiry,
  planEndsAt,
  planForPaidOrder,
  planLengthLabel,
  stampOrderNotes,
  validatePlan,
  type Plan,
} from "@/lib/billing/plans";
import { rowToPlan, type PlanRow } from "@/lib/billing/plansQuery";

const NOW = Date.parse("2026-11-15T06:00:00Z");
// 31 Oct 2027, the last second of the day in India.
const END = "2027-10-31T18:29:59.000Z";

const imatPass: Plan = {
  id: "intl-pass-6m",
  label: "Premium Pass",
  blurb: "",
  perks: [],
  urlKey: "intl",
  amountPaise: 1900,
  currency: "USD",
  site: "intl",
  durationDays: 182,
  scope: "imat",
  active: true,
  sortOrder: 1,
  endsOn: "2027-10-31",
};

describe("planEndsAt", () => {
  it("ends at the last second of the date in India", () => {
    expect(planEndsAt(imatPass, NOW)).toBe(END);
  });
  it("is null for a plan without a date", () => {
    expect(planEndsAt({ endsOn: null }, NOW)).toBeNull();
    expect(planEndsAt({}, NOW)).toBeNull();
  });
  it("is null once the date has passed or is under a day away", () => {
    expect(planEndsAt(imatPass, Date.parse("2027-11-01T00:00:00Z"))).toBeNull();
    expect(planEndsAt(imatPass, Date.parse("2027-10-31T06:00:00Z"))).toBeNull();
  });
});

describe("stampOrderNotes with a fixed end", () => {
  it("stamps the end beside the length", () => {
    const notes = stampOrderNotes(imatPass, "u1", NOW);
    expect(notes).toMatchObject({ endsAt: END, durationDays: "182" });
  });
  it("stamps no end when the plan has none, or its date has passed", () => {
    expect("endsAt" in stampOrderNotes({ ...imatPass, endsOn: null }, "u1", NOW)).toBe(false);
    expect("endsAt" in stampOrderNotes(imatPass, "u1", Date.parse("2027-11-02T00:00:00Z"))).toBe(false);
  });
});

describe("planForPaidOrder with a fixed end", () => {
  const order = (notes: Record<string, string>) => ({ status: "paid", amount_paid: 1900, currency: "USD", notes });
  it("grants until the stamped end", () => {
    const r = planForPaidOrder(order(stampOrderNotes(imatPass, "u1", NOW)), "u1");
    expect(r).toMatchObject({ ok: true, grant: { endsAt: END, durationDays: 182 } });
    if (r.ok) expect(grantExpiry(r.grant, NOW)).toBe(END);
  });
  it("lets an upgrade's end win over the plan's", () => {
    const notes = { ...stampOrderNotes(imatPass, "u1", NOW), upgradeEndsAt: "2027-03-01T00:00:00.000Z" };
    expect(planForPaidOrder(order(notes), "u1")).toMatchObject({
      ok: true,
      grant: { endsAt: "2027-03-01T00:00:00.000Z" },
    });
  });
  it("refuses an end that is not a date", () => {
    const notes = { ...stampOrderNotes(imatPass, "u1", NOW), endsAt: "soon" };
    expect(planForPaidOrder(order(notes), "u1")).toEqual({ ok: false, reason: "order notes incomplete" });
  });
});

describe("planLengthLabel with a fixed end", () => {
  it("names the months left and the date", () => {
    expect(planLengthLabel(imatPass, NOW)).toBe("11 months, until 31 Oct 2027");
  });
  it("counts days when under two months are left", () => {
    expect(planLengthLabel(imatPass, Date.parse("2027-09-20T06:00:00Z"))).toBe("42 days, until 31 Oct 2027");
  });
  it("falls back to the length once the date has passed", () => {
    expect(planLengthLabel(imatPass, Date.parse("2027-11-02T00:00:00Z"))).toBe("6 months");
  });
});

describe("validatePlan: the end date", () => {
  const input = { ...imatPass, blurb: "Practise without daily limits." } as Omit<Plan, "active">;
  it("accepts a real date or none", () => {
    expect(validatePlan(input)).toEqual({ ok: true });
    expect(validatePlan({ ...input, endsOn: null })).toEqual({ ok: true });
  });
  it("refuses anything else", () => {
    for (const bad of ["31/10/2027", "2027-02-30", "2027-10-31T00:00"]) {
      expect(validatePlan({ ...input, endsOn: bad })).toMatchObject({ ok: false, field: "endsOn" });
    }
  });
});

describe("rowToPlan", () => {
  it("reads ends_on, null when absent", () => {
    const row: PlanRow = {
      id: "intl-pass-6m",
      label: "Premium Pass",
      blurb: "",
      perks: [],
      url_key: "intl",
      amount_paise: 1900,
      currency: "USD",
      site: "intl",
      duration_days: 182,
      scope: "imat",
      active: true,
      sort_order: 1,
    };
    expect(rowToPlan({ ...row, ends_on: "2027-10-31" }).endsOn).toBe("2027-10-31");
    expect(rowToPlan(row).endsOn).toBeNull();
  });
});
