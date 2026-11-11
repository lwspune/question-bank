/**
 * Pass upgrade (owner, 2026-11-11): a student holding the Practice Pass moves
 * to the Premium Pass for the days their Practice Pass has left, paying the
 * DIFFERENCE for those days, and the Premium Pass ends on the same date
 * (owner: "pay the difference, same end date", chosen over a fresh 6 months
 * so the upgrade never costs more than ₹300 and falls as the pass is used).
 * Vault Points come off the upgrade price on top (owner). Pure rules:
 * lib/billing/upgrade.ts. Owner's examples: day 0 ₹300; day 50 ₹218; ₹300
 * with 12 points ₹264.
 */
import { describe, it, expect } from "vitest";
import {
  MIN_CHARGE_PAISE,
  upgradeFor,
  upgradeCredits,
  stampUpgradeNotes,
  upgradeGrantNote,
  orderGrantNote,
} from "@/lib/billing/upgrade";
import { stampDiscountNotes, fixPointsView, passOfferNote } from "@/lib/billing/fixPoints";
import { grantExpiry, grantLengthLabel, stampOrderNotes, planForPaidOrder, type Plan } from "@/lib/billing/plans";
import { SCOPE_MOCKS, SCOPE_PRACTICE, type Entitlement } from "@/lib/entitlements/access";

const DAY = 86_400_000;
const NOW = Date.parse("2026-11-11T06:00:00.000Z");

const premium: Plan = {
  id: "mock-pass-6m",
  label: "Premium Pass",
  blurb: "",
  perks: [],
  urlKey: "mocks",
  amountPaise: 49900,
  currency: "INR",
  site: "pyqvault",
  durationDays: 182,
  scope: SCOPE_MOCKS,
  active: true,
  sortOrder: 1,
  countries: null,
};
const practice: Plan = { ...premium, id: "practice-pass-6m", label: "Practice Pass", urlKey: "practice", amountPaise: 19900, scope: SCOPE_PRACTICE, sortOrder: 0 };
const PLANS = [premium, practice];

/** A paid Practice Pass bought `daysAgo` days before NOW, 182 days long. */
function practiceRow(daysAgo: number, over: Partial<Entitlement> = {}): Entitlement {
  const granted = NOW - daysAgo * DAY;
  return {
    id: "e1",
    userId: "u1",
    scope: SCOPE_PRACTICE,
    source: "razorpay",
    status: "active",
    grantedAt: new Date(granted).toISOString(),
    expiresAt: new Date(granted + 182 * DAY).toISOString(),
    providerRef: "pay_1",
    note: null,
    grantedBy: null,
    amountPaise: 19900,
    currency: "INR",
    ...over,
  };
}
const endOf = (row: Entitlement) => row.expiresAt as string;

describe("upgradeFor: the difference for the days left, ending with the Practice Pass", () => {
  it("costs ₹300 on the day the Practice Pass was bought, and ends when it ends", () => {
    const row = practiceRow(0);
    expect(upgradeFor([row], premium, PLANS, NOW)).toEqual({
      pricePaise: 30000,
      creditPaise: 19900,
      endsAt: endOf(row),
      fromLabel: "Practice Pass",
    });
  });

  it("falls as the days are used (owner: day 50 is ₹218)", () => {
    // ₹300 x 132/182 = ₹217.58, nearest rupee.
    expect(upgradeFor([practiceRow(50)], premium, PLANS, NOW)?.pricePaise).toBe(21800);
    // Halfway: ₹150.
    expect(upgradeFor([practiceRow(91)], premium, PLANS, NOW)?.pricePaise).toBe(15000);
    // 150 days used: ₹300 x 32/182 = ₹52.75, so ₹53.
    expect(upgradeFor([practiceRow(150)], premium, PLANS, NOW)?.pricePaise).toBe(5300);
  });

  it("never costs more than the list difference and never under ₹1", () => {
    for (const d of [0, 1, 30, 90, 181]) {
      const p = upgradeFor([practiceRow(d)], premium, PLANS, NOW)?.pricePaise ?? 0;
      expect(p).toBeGreaterThanOrEqual(MIN_CHARGE_PAISE);
      expect(p).toBeLessThanOrEqual(30000);
    }
  });

  it("charges more when the student paid less for the Practice Pass (points lowered it)", () => {
    // (₹499 - ₹159) on day 0.
    expect(upgradeFor([practiceRow(0, { amountPaise: 15900 })], premium, PLANS, NOW)?.pricePaise).toBe(34000);
  });

  it("is not offered for an expired, revoked, free or unpaid pass", () => {
    expect(upgradeFor([practiceRow(200)], premium, PLANS, NOW)).toBeNull();
    expect(upgradeFor([practiceRow(5, { status: "revoked" })], premium, PLANS, NOW)).toBeNull();
    expect(upgradeFor([practiceRow(5, { source: "comp" })], premium, PLANS, NOW)).toBeNull();
    expect(upgradeFor([practiceRow(5, { amountPaise: null })], premium, PLANS, NOW)).toBeNull();
    expect(upgradeFor([practiceRow(5, { expiresAt: null })], premium, PLANS, NOW)).toBeNull();
  });

  it("is not offered toward the same pass, or to a student who holds the target", () => {
    expect(upgradeFor([practiceRow(5)], practice, PLANS, NOW)).toBeNull();
    const premiumRow = practiceRow(3, { id: "e2", scope: SCOPE_MOCKS, amountPaise: 49900, providerRef: "pay_2" });
    expect(upgradeFor([practiceRow(5), premiumRow], premium, PLANS, NOW)).toBeNull();
  });

  it("is not offered across currencies, or when the pass outlasts the target's own length", () => {
    expect(upgradeFor([practiceRow(0, { currency: "USD" })], premium, PLANS, NOW)).toBeNull();
    const yearLong = practiceRow(0, { expiresAt: new Date(NOW + 365 * DAY).toISOString() });
    expect(upgradeFor([yearLong], premium, PLANS, NOW)).toBeNull();
  });

  it("follows the pass that ends LAST when there are two", () => {
    const older = practiceRow(100, { id: "e3", providerRef: "pay_3" });
    const newer = practiceRow(10);
    expect(upgradeFor([older, newer], premium, PLANS, NOW)?.endsAt).toBe(endOf(newer));
  });

  it("names the credited pass from the catalogue, or a plain fallback", () => {
    expect(upgradeFor([practiceRow(0)], premium, [premium], NOW)?.fromLabel).toBe("current pass");
  });

  it("lists the upgrades a student has, for the offers", () => {
    const row = practiceRow(50);
    expect(upgradeCredits([row], PLANS, NOW)).toEqual({
      credits: { "mock-pass-6m": 49900 - 21800 },
      creditFrom: "Practice Pass",
      creditEndsAt: endOf(row),
    });
    expect(upgradeCredits([], PLANS, NOW)).toEqual({ credits: {}, creditFrom: null, creditEndsAt: null });
  });
});

describe("the upgrade order: upgrade price first, then Vault Points", () => {
  const row = practiceRow(0);
  const up = upgradeFor([row], premium, PLANS, NOW)!;

  it("stamps the upgrade price, its end date and the credit (owner: ₹300, 12 points, ₹264)", () => {
    const notes = stampDiscountNotes(stampUpgradeNotes(stampOrderNotes(premium, "u1"), up), premium, { points: 12 });
    expect(notes).toMatchObject({
      amountPaise: "26400",
      listPaise: "49900",
      upgradeCreditPaise: "19900",
      upgradeEndsAt: endOf(row),
      fixPoints: "12",
      scope: SCOPE_MOCKS,
    });
  });

  it("leaves an order untouched with no upgrade", () => {
    const base = stampOrderNotes(premium, "u1");
    expect(stampUpgradeNotes(base, null)).toEqual(base);
  });

  it("is held to the upgrade price when paid, and grants until the Practice Pass's end", () => {
    const notes = stampUpgradeNotes(stampOrderNotes(premium, "u1"), up);
    const decided = planForPaidOrder({ status: "paid", amount_paid: 30000, currency: "INR", notes }, "u1");
    expect(decided).toMatchObject({ ok: true, grant: { scope: SCOPE_MOCKS, amountPaise: 30000, endsAt: endOf(row) } });
    expect(planForPaidOrder({ status: "paid", amount_paid: 29900, currency: "INR", notes }, "u1").ok).toBe(false);
    if (decided.ok) {
      expect(grantExpiry(decided.grant, NOW)).toBe(endOf(row));
      expect(grantLengthLabel(decided.grant, NOW)).toBe("6 months");
    }
  });

  it("refuses an order whose end date is not a date", () => {
    const notes = { ...stampUpgradeNotes(stampOrderNotes(premium, "u1"), up), upgradeEndsAt: "soon" };
    expect(planForPaidOrder({ status: "paid", amount_paid: 30000, currency: "INR", notes }, "u1").ok).toBe(false);
  });

  it("never grants a pass that is already over (a checkout left open past the end)", () => {
    const grant = { planId: "p", scope: SCOPE_MOCKS, durationDays: 182, amountPaise: 100, currency: "INR" as const, endsAt: new Date(NOW - DAY).toISOString() };
    expect(Date.parse(grantExpiry(grant, NOW) as string)).toBe(NOW + DAY);
  });

  it("an ordinary order still runs its plan length from now", () => {
    const grant = { planId: "p", scope: SCOPE_MOCKS, durationDays: 182, amountPaise: 49900, currency: "INR" as const };
    expect(grantExpiry(grant, NOW)).toBe(new Date(NOW + 182 * DAY).toISOString());
    expect(grantLengthLabel(grant, NOW)).toBe("6 months");
    expect(grantLengthLabel({ ...grant, endsAt: new Date(NOW + 132 * DAY).toISOString() }, NOW)).toBe("132 days");
  });
});

describe("the pass row's note: an upgrade is marked without hiding points or a parent", () => {
  it("marks the credit", () => {
    expect(upgradeGrantNote({ upgradeCreditPaise: "19900" })).toBe("upgrade_credit:19900");
    expect(upgradeGrantNote({ upgradeCreditPaise: "x" })).toBeNull();
    expect(upgradeGrantNote(null)).toBeNull();
  });

  it("keeps the existing prefixes first, so the readouts' LIKE 'fix_points:%' and 'parent_link:%' still match", () => {
    expect(orderGrantNote({ fixPoints: "12", upgradeCreditPaise: "19900" })).toBe("fix_points:12 upgrade_credit:19900");
    expect(orderGrantNote({ parentLink: "Vx9ZVknnkt", upgradeCreditPaise: "19900" })).toBe("parent_link:Vx9ZVknnkt upgrade_credit:19900");
    expect(orderGrantNote({ upgradeCreditPaise: "19900" })).toBe("upgrade_credit:19900");
    expect(orderGrantNote({ fixPoints: "3" })).toBe("fix_points:3");
    expect(orderGrantNote({})).toBeNull();
  });
});

describe("what the offer shows a Practice Pass holder", () => {
  const ends = "2027-05-11T15:33:01.794Z";
  const view = (points: number, credit = 19900) =>
    fixPointsView({
      points,
      plans: PLANS,
      hasPass: true,
      credits: { [premium.id]: credit },
      creditFrom: "Practice Pass",
      creditEndsAt: ends,
    });

  it("prices the Premium Pass at the upgrade price even with no points", () => {
    expect(view(0).prices).toEqual({ "mock-pass-6m": "₹300" });
    expect(view(0, 49900 - 21800).prices).toEqual({ "mock-pass-6m": "₹218" });
  });

  it("takes points off the upgrade price", () => {
    expect(view(12).prices["mock-pass-6m"]).toBe("₹264");
  });

  it("says what the upgrade covers and when it ends", () => {
    expect(passOfferNote(view(0), premium.id)).toBe(
      "Upgrade price for the days left on your Practice Pass. Premium ends with it, on 11 May 2027."
    );
    expect(passOfferNote(view(12), premium.id)).toBe(
      "Upgrade price for the days left on your Practice Pass, with 12% off from your 12 Vault Points. Premium ends with it, on 11 May 2027."
    );
  });

  it("falls back to the points note where there is no upgrade", () => {
    const v = fixPointsView({ points: 12, plans: [premium], hasPass: false });
    expect(passOfferNote(v, premium.id)).toBe("Includes 12% off from your 12 Vault Points.");
    expect(passOfferNote(null, premium.id)).toBeNull();
  });

  it("names the price charged for a pass holder with points but no upgrade (shown = charged)", () => {
    const v = fixPointsView({ points: 12, plans: [premium], hasPass: true });
    expect(v.prices["mock-pass-6m"]).toBe("₹439");
    expect(passOfferNote(v, premium.id)).toBe("Includes 12% off from your 12 Vault Points.");
  });

  it("never uses a dash", () => {
    for (const s of [passOfferNote(view(0), premium.id), passOfferNote(view(12), premium.id)]) {
      expect(s).not.toMatch(/[—–]| - | -- /);
    }
  });
});
