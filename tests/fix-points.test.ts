/**
 * Fix Points (2026-11-09): one point per mistake a student fixes, 1% off the
 * pass per point, capped; points from the last 30 days only, reset by a
 * purchase. The pure rules: lib/billing/fixPoints.ts.
 */
import { describe, it, expect } from "vitest";
import {
  FIX_POINTS_MAX_PCT,
  FIX_POINTS_WINDOW_DAYS,
  COMBINED_DISCOUNT_CAP_PCT,
  fixPointsPct,
  discountPct,
  discountedPaise,
  fixPointsWindowStart,
  planTakesDiscount,
  stampDiscountNotes,
  fixPointsGrantNote,
  fixPointsView,
  vaultPointsOfferNote,
  vaultPointsLine,
  vaultPointsShort,
  vaultPointsLapseLine,
  pickBackfillFixes,
} from "@/lib/billing/fixPoints";
import { stampOrderNotes, planForPaidOrder, type Plan } from "@/lib/billing/plans";
import { SCOPE_MOCKS, SCOPE_PRACTICE } from "@/lib/entitlements/access";

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
};
const practice: Plan = { ...premium, id: "practice-pass-6m", scope: SCOPE_PRACTICE, amountPaise: 19900 };

describe("the owner's numbers (2026-11-09)", () => {
  it("1% per point up to 40%, a 30-day window, 50% combined", () => {
    expect(FIX_POINTS_MAX_PCT).toBe(40);
    expect(FIX_POINTS_WINDOW_DAYS).toBe(30);
    expect(COMBINED_DISCOUNT_CAP_PCT).toBe(50);
  });
});

describe("fixPointsPct", () => {
  it("is one percent per point", () => {
    expect(fixPointsPct(0)).toBe(0);
    expect(fixPointsPct(1)).toBe(1);
    expect(fixPointsPct(12)).toBe(12);
  });
  it("stops at the cap", () => {
    expect(fixPointsPct(40)).toBe(40);
    expect(fixPointsPct(219)).toBe(40);
  });
  it("treats junk as zero, never as a discount", () => {
    expect(fixPointsPct(-3)).toBe(0);
    expect(fixPointsPct(Number.NaN)).toBe(0);
    expect(fixPointsPct(2.7)).toBe(2);
  });
});

describe("discountPct", () => {
  it("adds a referral to the points", () => {
    expect(discountPct({ points: 10, referralPct: 25 })).toBe(35);
  });
  it("never goes past the combined cap", () => {
    expect(discountPct({ points: 40, referralPct: 25 })).toBe(50);
  });
  it("is the points alone when there is no referral", () => {
    expect(discountPct({ points: 7 })).toBe(7);
  });
});

describe("discountedPaise", () => {
  it("rounds to whole rupees", () => {
    expect(discountedPaise(49900, 10)).toBe(44900); // 449.10 -> 449
    expect(discountedPaise(19900, 10)).toBe(17900); // 179.10 -> 179
    expect(discountedPaise(49900, 40)).toBe(29900); // 299.40 -> 299
  });
  it("leaves the price alone at 0%", () => {
    expect(discountedPaise(49900, 0)).toBe(49900);
  });
});

describe("fixPointsWindowStart", () => {
  const now = new Date("2026-11-09T12:00:00Z");
  it("is 30 days back with no purchase", () => {
    expect(fixPointsWindowStart(now, null).toISOString()).toBe("2026-10-10T12:00:00.000Z");
  });
  it("is the last purchase when that is more recent (buying resets points)", () => {
    const bought = new Date("2026-11-01T08:00:00Z");
    expect(fixPointsWindowStart(now, bought).toISOString()).toBe(bought.toISOString());
  });
  it("ignores a purchase older than the window", () => {
    expect(fixPointsWindowStart(now, new Date("2026-06-01T00:00:00Z")).toISOString()).toBe("2026-10-10T12:00:00.000Z");
  });
});

describe("planTakesDiscount", () => {
  it("covers both rupee passes on www", () => {
    expect(planTakesDiscount(premium)).toBe(true);
    expect(planTakesDiscount(practice)).toBe(true);
  });
  it("does not cover the intl / IMAT passes", () => {
    expect(planTakesDiscount({ ...premium, site: "intl", currency: "USD", scope: "imat" })).toBe(false);
    expect(planTakesDiscount({ ...premium, site: "intl", scope: "imat" })).toBe(false);
  });
});

describe("stampDiscountNotes", () => {
  it("sells at the discounted price and keeps what was given up", () => {
    const notes = stampDiscountNotes(stampOrderNotes(premium, "u1"), premium, { points: 12 });
    expect(notes).toMatchObject({ amountPaise: "43900", listPaise: "49900", fixPoints: "12", discountPct: "12" });
    for (const v of Object.values(notes)) expect(typeof v).toBe("string");
  });
  it("adds nothing when there is no discount, so an undiscounted order is byte-identical", () => {
    const plain = stampOrderNotes(premium, "u1");
    expect(stampDiscountNotes(plain, premium, { points: 0 })).toEqual(plain);
  });
  it("adds nothing to a plan that takes no discount", () => {
    const intl: Plan = { ...premium, site: "intl", currency: "USD", scope: "imat", amountPaise: 1900 };
    const plain = stampOrderNotes(intl, "u1");
    expect(stampDiscountNotes(plain, intl, { points: 30 })).toEqual(plain);
  });
  it("is granted by the unchanged paid-order check at the price paid", () => {
    const notes = stampDiscountNotes(stampOrderNotes(premium, "u1"), premium, { points: 12 });
    const r = planForPaidOrder({ status: "paid", amount_paid: 43900, currency: "INR", notes }, "u1");
    expect(r).toMatchObject({ ok: true, grant: { amountPaise: 43900, scope: SCOPE_MOCKS } });
    // And paying the list price against a discounted order is still a mismatch.
    expect(planForPaidOrder({ status: "paid", amount_paid: 49900, currency: "INR", notes }, "u1")).toMatchObject({ ok: false });
  });
});

describe("fixPointsGrantNote", () => {
  it("marks a pass bought with points, for the readout", () => {
    const notes = stampDiscountNotes(stampOrderNotes(premium, "u1"), premium, { points: 12 });
    expect(fixPointsGrantNote(notes)).toBe("fix_points:12");
  });
  it("is null for an order with no points", () => {
    expect(fixPointsGrantNote(stampOrderNotes(premium, "u1"))).toBeNull();
    expect(fixPointsGrantNote(null)).toBeNull();
    expect(fixPointsGrantNote({ fixPoints: "abc" })).toBeNull();
  });
});

describe("fixPointsView (what /api/me/fix-points answers)", () => {
  const intl: Plan = { ...premium, id: "intl-pass-6m", site: "intl", currency: "USD", scope: "imat", amountPaise: 1900 };
  it("prices every discountable pass at the student's points", () => {
    const v = fixPointsView({ points: 12, plans: [premium, practice, intl], hasPass: false });
    expect(v).toEqual({
      points: 12,
      pct: 12,
      maxPct: 40,
      hasPass: false,
      lapsesOn: null,
      prices: { "mock-pass-6m": "₹439", "practice-pass-6m": "₹175" },
    });
  });
  it("lists no prices with no points (the cards keep their own)", () => {
    expect(fixPointsView({ points: 0, plans: [premium], hasPass: false }).prices).toEqual({});
  });
  it("skips an inactive plan", () => {
    expect(fixPointsView({ points: 5, plans: [{ ...premium, active: false }], hasPass: false }).prices).toEqual({});
  });
});

describe("Vault Points copy (renamed from fix points, owner 2026-11-09)", () => {
  const view = (points: number, hasPass = false, oldestAt: string | null = null) =>
    fixPointsView({ points, plans: [premium], hasPass, oldestAt });

  it("tells an offer card where the lower price came from", () => {
    expect(vaultPointsOfferNote(view(12))).toBe("Includes 12% off from your 12 Vault Points.");
    expect(vaultPointsOfferNote(view(1))).toBe("Includes 1% off from your 1 Vault Point.");
  });
  it("says nothing on an offer card with no points, or to a pass holder", () => {
    expect(vaultPointsOfferNote(view(0))).toBeNull();
    expect(vaultPointsOfferNote(view(12, true))).toBeNull();
    expect(vaultPointsOfferNote(null)).toBeNull();
  });

  it("explains how to earn, before the first point", () => {
    expect(vaultPointsLine(view(0))).toBe(
      "Get a question right that you missed on an earlier day to earn a Vault Point: 1% off the pass, up to 40%."
    );
  });
  it("states the points and their worth", () => {
    expect(vaultPointsLine(view(12))).toBe(
      "12 Vault Points: 12% off the pass. Each mistake you fix adds 1%, up to 40%. Points last 30 days."
    );
    expect(vaultPointsLine(view(1))).toMatch(/^1 Vault Point: 1% off/);
  });
  it("says when the cap is reached", () => {
    expect(vaultPointsLine(view(55))).toBe("55 Vault Points: the full 40% off the pass. Points last 30 days.");
  });
  it("tells a pass holder the points lower their NEXT pass", () => {
    expect(vaultPointsLine(view(12, true))).toBe(
      "12 Vault Points: 12% off your next pass. Each mistake you fix adds 1%, up to 40%. Points last 30 days."
    );
    expect(vaultPointsLine(view(0, true))).toMatch(/1% off your next pass, up to 40%\.$/);
    expect(vaultPointsLine(view(40, true))).toBe("40 Vault Points: the full 40% off your next pass. Points last 30 days.");
  });
  it("is null before the read lands", () => {
    expect(vaultPointsLine(null)).toBeNull();
  });

  it("has a short form for the avatar menu", () => {
    expect(vaultPointsShort(view(12))).toBe("12 Vault Points · 12% off the pass");
    expect(vaultPointsShort(view(1, true))).toBe("1 Vault Point · 1% off your next pass");
    expect(vaultPointsShort(view(50))).toBe("50 Vault Points · the full 40% off");
    expect(vaultPointsShort(view(0))).toBe("0 Vault Points · fix a mistake to earn 1% off");
    expect(vaultPointsShort(null)).toBeNull();
  });

  it("dates when the oldest points run out: 30 days after they were earned, in IST", () => {
    // Earned 2026-11-01 20:00 UTC = 2 Nov 01:30 IST, so it runs out on 2 Dec IST.
    const v = view(3, false, "2026-11-01T20:00:00.000Z");
    expect(v.lapsesOn).toBe("2026-12-01T20:00:00.000Z");
    expect(vaultPointsLapseLine(v)).toBe("Your oldest points run out on 2 Dec.");
    expect(vaultPointsLapseLine(view(1, false, "2026-11-01T20:00:00.000Z"))).toBe("This point runs out on 2 Dec.");
  });
  it("has no run-out date without points", () => {
    expect(view(0, false, "2026-11-01T20:00:00.000Z").lapsesOn).toBeNull();
    expect(vaultPointsLapseLine(view(0))).toBeNull();
    expect(vaultPointsLapseLine(view(5))).toBeNull();
  });

  it("never uses a dash", () => {
    for (const s of [
      vaultPointsOfferNote(view(3)),
      vaultPointsLine(view(0)),
      vaultPointsLine(view(9)),
      vaultPointsLine(view(40, true)),
      vaultPointsShort(view(9)),
      vaultPointsLapseLine(view(2, false, "2026-11-01T20:00:00.000Z")),
    ]) {
      expect(s).not.toMatch(/[—–]| -- | - /);
    }
  });
});

describe("pickBackfillFixes (the launch grant)", () => {
  // 2026-11-01T20:00Z is 2 Nov 01:30 IST; 2026-11-01T10:00Z is 1 Nov 15:30 IST.
  const miss = (userId: string, questionId: string, at: string) => ({ userId, questionId, at });
  const right = (userId: string, questionId: string, at: string) => ({ userId, questionId, at });

  it("pays a fix whose miss was on an earlier IST day", () => {
    expect(
      pickBackfillFixes([right("u", "q", "2026-11-03T10:00:00Z")], [miss("u", "q", "2026-11-01T10:00:00Z")])
    ).toEqual([{ userId: "u", questionId: "q", earnedAt: "2026-11-03T10:00:00Z" }]);
  });
  it("does not pay a same-day echo, judged in IST not UTC", () => {
    // Both on 2 Nov IST, though the miss is 1 Nov in UTC.
    expect(pickBackfillFixes([right("u", "q", "2026-11-02T05:00:00Z")], [miss("u", "q", "2026-11-01T20:00:00Z")])).toEqual([]);
  });
  it("keeps the earliest paying fix, once per student and question", () => {
    expect(
      pickBackfillFixes(
        [right("u", "q", "2026-11-05T10:00:00Z"), right("u", "q", "2026-11-03T10:00:00Z")],
        [miss("u", "q", "2026-11-01T10:00:00Z")]
      )
    ).toEqual([{ userId: "u", questionId: "q", earnedAt: "2026-11-03T10:00:00Z" }]);
  });
  it("does not pay another student's miss", () => {
    expect(pickBackfillFixes([right("u", "q", "2026-11-03T10:00:00Z")], [miss("v", "q", "2026-11-01T10:00:00Z")])).toEqual([]);
  });
});
