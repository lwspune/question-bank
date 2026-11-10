/**
 * Pass upgrade (owner, 2026-11-11): a student holding the Practice Pass buys
 * the Premium Pass for the Premium price less what is left of the Practice
 * Pass. The credit is what they PAID times the share of the pass's days still
 * left (owner: "shrinks with time used"), and Vault Points come off the
 * upgrade price on top (owner: "yes, on top"). The pure rules:
 * lib/billing/upgrade.ts. Owner's worked example: ₹300 upgrade, 12 points,
 * ₹264.
 */
import { describe, it, expect } from "vitest";
import {
  MIN_CHARGE_PAISE,
  upgradeCredit,
  stampUpgradeNotes,
  upgradeGrantNote,
  orderGrantNote,
} from "@/lib/billing/upgrade";
import { stampDiscountNotes, fixPointsView, passOfferNote } from "@/lib/billing/fixPoints";
import { stampOrderNotes, planForPaidOrder, type Plan } from "@/lib/billing/plans";
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

describe("upgradeCredit: what is left of a paid pass the target pass includes", () => {
  it("credits the whole price on the day the Practice Pass was bought", () => {
    expect(upgradeCredit([practiceRow(0)], premium, [premium, practice], NOW)).toEqual({ creditPaise: 19900, fromLabel: "Practice Pass" });
  });

  it("shrinks with the days used, to the nearest whole rupee", () => {
    // 91 of 182 days used: half of ₹199 is ₹99.50, so ₹100.
    expect(upgradeCredit([practiceRow(91)], premium, [premium, practice], NOW).creditPaise).toBe(10000);
    // One day used: ₹199 x 181/182 = ₹197.91, so ₹198.
    expect(upgradeCredit([practiceRow(1)], premium, [premium, practice], NOW).creditPaise).toBe(19800);
    // 150 days used: ₹199 x 32/182 = ₹34.99, so ₹35.
    expect(upgradeCredit([practiceRow(150)], premium, [premium, practice], NOW).creditPaise).toBe(3500);
  });

  it("credits what the student PAID, not the list price (points or a parent may have lowered it)", () => {
    expect(upgradeCredit([practiceRow(0, { amountPaise: 15900 })], premium, [premium, practice], NOW).creditPaise).toBe(15900);
  });

  it("gives nothing for an expired, revoked, free or unpaid pass", () => {
    const none = { creditPaise: 0, fromLabel: null };
    expect(upgradeCredit([practiceRow(200)], premium, [premium, practice], NOW)).toEqual(none);
    expect(upgradeCredit([practiceRow(5, { status: "revoked" })], premium, [premium, practice], NOW)).toEqual(none);
    expect(upgradeCredit([practiceRow(5, { source: "comp" })], premium, [premium, practice], NOW)).toEqual(none);
    expect(upgradeCredit([practiceRow(5, { amountPaise: null })], premium, [premium, practice], NOW)).toEqual(none);
    expect(upgradeCredit([practiceRow(5, { expiresAt: null })], premium, [premium, practice], NOW)).toEqual(none);
  });

  it("gives nothing toward the SAME pass (buying Practice again is not an upgrade)", () => {
    expect(upgradeCredit([practiceRow(5)], practice, [premium, practice], NOW).creditPaise).toBe(0);
  });

  it("gives nothing to a student who already holds the target pass", () => {
    const premiumRow = practiceRow(3, { id: "e2", scope: SCOPE_MOCKS, amountPaise: 49900, providerRef: "pay_2" });
    expect(upgradeCredit([practiceRow(5), premiumRow], premium, [premium, practice], NOW).creditPaise).toBe(0);
  });

  it("gives nothing across currencies", () => {
    expect(upgradeCredit([practiceRow(0, { currency: "USD" })], premium, [premium, practice], NOW).creditPaise).toBe(0);
  });

  it("adds up two paid passes the target includes", () => {
    const second = practiceRow(0, { id: "e3", providerRef: "pay_3" });
    expect(upgradeCredit([practiceRow(0), second], premium, [premium, practice], NOW).creditPaise).toBe(39800);
  });

  it("never brings the price under the minimum charge", () => {
    const big = practiceRow(0, { amountPaise: 60000 });
    expect(upgradeCredit([big], premium, [premium, practice], NOW).creditPaise).toBe(49900 - MIN_CHARGE_PAISE);
  });

  it("names the credited pass from the catalogue, or a plain fallback", () => {
    expect(upgradeCredit([practiceRow(0)], premium, [premium], NOW).fromLabel).toBe("current pass");
  });
});

describe("the upgrade order: credit first, then Vault Points on the upgrade price", () => {
  it("stamps the upgrade price and the credit (owner's example: ₹300, 12 points, ₹264)", () => {
    const notes = stampDiscountNotes(stampUpgradeNotes(stampOrderNotes(premium, "u1"), 19900), premium, { points: 12 });
    expect(notes).toMatchObject({
      amountPaise: "26400",
      listPaise: "49900",
      upgradeCreditPaise: "19900",
      fixPoints: "12",
      discountPct: "12",
      scope: SCOPE_MOCKS,
      durationDays: "182",
    });
  });

  it("charges list less credit with no points", () => {
    const notes = stampDiscountNotes(stampUpgradeNotes(stampOrderNotes(premium, "u1"), 19700), premium, { points: 0 });
    expect(notes).toMatchObject({ amountPaise: "30200", listPaise: "49900", upgradeCreditPaise: "19700" });
    expect(notes).not.toHaveProperty("fixPoints");
  });

  it("leaves an order untouched with no credit", () => {
    const base = stampOrderNotes(premium, "u1");
    expect(stampUpgradeNotes(base, 0)).toEqual(base);
  });

  it("is held to the upgrade price when paid", () => {
    const notes = stampUpgradeNotes(stampOrderNotes(premium, "u1"), 19900);
    const decided = planForPaidOrder({ status: "paid", amount_paid: 30000, currency: "INR", notes }, "u1");
    expect(decided).toMatchObject({ ok: true, grant: { scope: SCOPE_MOCKS, durationDays: 182, amountPaise: 30000 } });
    expect(planForPaidOrder({ status: "paid", amount_paid: 29900, currency: "INR", notes }, "u1").ok).toBe(false);
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
  const view = (points: number, credit = 19900) =>
    fixPointsView({
      points,
      plans: [premium, practice],
      hasPass: true,
      credits: { [premium.id]: credit },
      creditFrom: "Practice Pass",
    });

  it("prices the Premium Pass at the upgrade price even with no points", () => {
    expect(view(0).prices).toEqual({ "mock-pass-6m": "₹300" });
  });

  it("takes points off the upgrade price", () => {
    expect(view(12).prices["mock-pass-6m"]).toBe("₹264");
  });

  it("says where the lower price came from", () => {
    expect(passOfferNote(view(0), premium.id)).toBe("Includes ₹199 off for the days left on your Practice Pass.");
    expect(passOfferNote(view(12), premium.id)).toBe(
      "Includes ₹199 off for the days left on your Practice Pass, and 12% off from your 12 Vault Points."
    );
  });

  it("falls back to the points note where there is no credit", () => {
    const v = fixPointsView({ points: 12, plans: [premium], hasPass: false });
    expect(passOfferNote(v, premium.id)).toBe("Includes 12% off from your 12 Vault Points.");
    expect(passOfferNote(null, premium.id)).toBeNull();
  });

  it("names the price charged for a pass holder with points but no credit (shown = charged)", () => {
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
