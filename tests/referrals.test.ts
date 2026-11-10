/**
 * Referrals (owner, 2026-11-09; migration 0249): the pure rules. A student's
 * link gives a NEW friend 25% off their first pass; when that friend pays, the
 * inviter gets 30 days of Premium, up to 6 times. Spec for
 * src/lib/referrals/referral.ts and the referral half of lib/billing/fixPoints.
 */
import { describe, it, expect } from "vitest";
import {
  REFERRAL_FRIEND_PCT,
  REFERRAL_MAX_REWARDS,
  REFERRAL_REWARD_DAYS,
  isReferralCode,
  makeReferralCode,
  normaliseReferralCode,
  readRefCookie,
  refCookieValue,
  referralLink,
  referralShareText,
  referralStatusLine,
  shouldAttachReferral,
  orderCarriesReferral,
} from "@/lib/referrals/referral";
import { discountPct, fixPointsView, stampDiscountNotes, vaultPointsOfferNote } from "@/lib/billing/fixPoints";
import type { Plan } from "@/lib/billing/plans";

const HOUR = 60 * 60 * 1000;

describe("referral codes", () => {
  it("makes 8-character codes a student can read aloud", () => {
    for (let i = 0; i < 50; i++) {
      const c = makeReferralCode();
      expect(c).toMatch(/^[A-HJ-NP-Z2-9]{8}$/);
      expect(isReferralCode(c)).toBe(true);
    }
  });

  it("accepts a code typed in lower case, and nothing else", () => {
    expect(normaliseReferralCode("k7qm2xpa")).toBe("K7QM2XPA");
    expect(normaliseReferralCode(" K7QM2XPA ")).toBe("K7QM2XPA");
    expect(normaliseReferralCode("K7QM2XP")).toBeNull();
    expect(normaliseReferralCode("K7QM2XP0")).toBeNull(); // 0 is not in the alphabet
    expect(normaliseReferralCode("K7QM2XPA'--")).toBeNull();
    expect(normaliseReferralCode(42)).toBeNull();
  });

  it("links to /r/<code> on www", () => {
    expect(referralLink("K7QM2XPA")).toBe("https://www.pyqvault.com/r/K7QM2XPA");
  });

  it("the share message carries the link and the friend's discount", () => {
    const text = referralShareText("K7QM2XPA");
    expect(text).toContain("https://www.pyqvault.com/r/K7QM2XPA");
    expect(text).toContain(`${REFERRAL_FRIEND_PCT}%`);
  });
});

describe("the qb_ref cookie", () => {
  it("round-trips the code and when the link was opened", () => {
    const at = new Date("2026-11-10T05:00:00Z");
    expect(readRefCookie(refCookieValue("K7QM2XPA", at))).toEqual({ code: "K7QM2XPA", openedAt: at.toISOString() });
  });

  it("refuses anything that is not one (the cookie is untrusted)", () => {
    expect(readRefCookie(undefined)).toBeNull();
    expect(readRefCookie("")).toBeNull();
    expect(readRefCookie("K7QM2XPA")).toBeNull();
    expect(readRefCookie("K7QM2XPA.notanumber")).toBeNull();
    expect(readRefCookie("bad!.1762750800")).toBeNull();
  });
});

describe("who counts as a friend", () => {
  const now = new Date("2026-11-10T10:00:00Z");
  const opened = new Date(now.getTime() - 2 * HOUR).toISOString();
  const base = { friendId: "f", referrerId: "r", openedAt: opened, now };

  it("an account made after the link was opened, within a day", () => {
    expect(shouldAttachReferral({ ...base, friendCreatedAt: new Date(now.getTime() - HOUR).toISOString() })).toBe(true);
  });

  it("not the inviter themselves", () => {
    expect(
      shouldAttachReferral({ ...base, friendId: "r", friendCreatedAt: new Date(now.getTime() - HOUR).toISOString() })
    ).toBe(false);
  });

  it("not an account that existed before the link was opened", () => {
    expect(shouldAttachReferral({ ...base, friendCreatedAt: new Date(now.getTime() - 3 * HOUR).toISOString() })).toBe(
      false
    );
  });

  it("not an account older than a day (an old student signing back in)", () => {
    expect(
      shouldAttachReferral({
        ...base,
        openedAt: new Date(now.getTime() - 40 * HOUR).toISOString(),
        friendCreatedAt: new Date(now.getTime() - 30 * HOUR).toISOString(),
      })
    ).toBe(false);
  });

  it("not on a missing or junk date", () => {
    expect(shouldAttachReferral({ ...base, friendCreatedAt: null })).toBe(false);
    expect(shouldAttachReferral({ ...base, friendCreatedAt: "yesterday" })).toBe(false);
  });
});

describe("the discount on the friend's order", () => {
  const premium: Plan = {
    id: "mock-pass-6m", label: "Premium Pass", blurb: "b", perks: [], urlKey: "mocks", amountPaise: 49900,
    currency: "INR", site: "pyqvault", durationDays: 182, scope: "mocks", active: true, sortOrder: 1, countries: null,
  };

  it("adds 25% to the points, the two together capped at 50%", () => {
    expect(discountPct({ points: 0, referralPct: REFERRAL_FRIEND_PCT })).toBe(25);
    expect(discountPct({ points: 12, referralPct: REFERRAL_FRIEND_PCT })).toBe(37);
    expect(discountPct({ points: 40, referralPct: REFERRAL_FRIEND_PCT })).toBe(50);
  });

  it("stamps the referral into the order, so both grant paths can see it", () => {
    const notes = stampDiscountNotes({ amountPaise: "49900" }, premium, { points: 0, referralPct: 25 });
    expect(notes).toMatchObject({ amountPaise: "37400", listPaise: "49900", discountPct: "25", referralPct: "25" });
    expect(notes).not.toHaveProperty("fixPoints", "1");
    expect(orderCarriesReferral(notes)).toBe(true);
  });

  it("an order with points alone carries no referral", () => {
    const notes = stampDiscountNotes({ amountPaise: "49900" }, premium, { points: 5 });
    expect(notes).not.toHaveProperty("referralPct");
    expect(orderCarriesReferral(notes)).toBe(false);
    expect(orderCarriesReferral(null)).toBe(false);
    expect(orderCarriesReferral({ referralPct: "0" })).toBe(false);
  });

  it("the offer prices and note include the invite", () => {
    const only = fixPointsView({ points: 0, plans: [premium], hasPass: false, referralPct: 25 });
    expect(only.prices["mock-pass-6m"]).toBe("₹374");
    expect(vaultPointsOfferNote(only)).toBe("Includes 25% off from your friend's invite.");

    const both = fixPointsView({ points: 12, plans: [premium], hasPass: false, referralPct: 25 });
    expect(both.prices["mock-pass-6m"]).toBe("₹314");
    expect(vaultPointsOfferNote(both)).toBe("Includes 37% off: 25% from your friend's invite and 12% from your 12 Vault Points.");

    const capped = fixPointsView({ points: 40, plans: [premium], hasPass: false, referralPct: 25 });
    expect(vaultPointsOfferNote(capped)).toBe("Includes 50% off, the most there is: your friend's invite and your 40 Vault Points.");
  });

  it("points alone read as before", () => {
    const v = fixPointsView({ points: 12, plans: [premium], hasPass: false });
    expect(vaultPointsOfferNote(v)).toBe("Includes 12% off from your 12 Vault Points.");
  });
});

describe("the inviter's card", () => {
  it("says what a friend gets and what the inviter gets, before anyone joins", () => {
    const line = referralStatusLine({ joined: 0, bought: 0, rewards: 0 });
    expect(line).toContain(`${REFERRAL_FRIEND_PCT}% off`);
    expect(line).toContain(`${REFERRAL_REWARD_DAYS} days`);
  });

  it("counts friends and days earned", () => {
    expect(referralStatusLine({ joined: 3, bought: 1, rewards: 1 })).toBe(
      "3 friends joined · 1 bought a pass · 30 of 180 free days earned."
    );
  });

  it("says when the free days are all used", () => {
    expect(referralStatusLine({ joined: 9, bought: REFERRAL_MAX_REWARDS, rewards: REFERRAL_MAX_REWARDS })).toBe(
      "9 friends joined · 6 bought a pass · all 180 free days earned. Friends still get 25% off."
    );
  });
});
