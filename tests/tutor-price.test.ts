import { describe, it, expect } from "vitest";
import { randomUUID } from "node:crypto";
import {
  TUTOR_PRICES,
  priceForUser,
  cheaperOptions,
  validateStudentPrice,
  validateTeacherRate,
  pendingPriceStep,
  priceAskDue,
  normaliseAnsweredFrom,
  PRICE_SNOOZE_DAYS,
  summariseTutorPrices,
  type TutorPriceRow,
} from "@/lib/tutor/price";

/**
 * The tutoring price test (owner, 2026-11-07; migration 0223). Each student who
 * wants tutoring sees ONE price for a 1-hour session, ₹499, ₹749 or ₹999, fixed
 * per account, and says whether they would book. Teachers say what they would
 * charge. Nothing is sold.
 */

describe("priceForUser", () => {
  it("always gives one of the three prices, and the same one for the same account", () => {
    for (let i = 0; i < 50; i++) {
      const id = randomUUID();
      const p = priceForUser(id);
      expect(TUTOR_PRICES).toContain(p);
      expect(priceForUser(id)).toBe(p);
    }
  });

  it("splits accounts roughly evenly across the three prices", () => {
    const counts = new Map<number, number>();
    for (let i = 0; i < 3000; i++) {
      const p = priceForUser(randomUUID());
      counts.set(p, (counts.get(p) ?? 0) + 1);
    }
    for (const p of TUTOR_PRICES) {
      expect(counts.get(p)).toBeGreaterThan(850);
      expect(counts.get(p)).toBeLessThan(1150);
    }
  });
});

describe("cheaperOptions", () => {
  it("offers up to four amounts, all below the price shown", () => {
    expect(cheaperOptions(499)).toEqual([200, 300, 400]);
    expect(cheaperOptions(749)).toEqual([300, 400, 500, 600]);
    expect(cheaperOptions(999)).toEqual([400, 500, 600, 800]);
  });
});

describe("validateStudentPrice", () => {
  it("accepts a plain yes or no, with no lower amount", () => {
    expect(validateStudentPrice({ answer: "yes" }, 749)).toEqual({ ok: true, value: { answer: "yes", wouldPay: null } });
    expect(validateStudentPrice({ answer: "no", wouldPay: null }, 749)).toEqual({
      ok: true,
      value: { answer: "no", wouldPay: null },
    });
  });

  it("accepts 'only if cheaper' with an offered amount, or with none (not sure)", () => {
    expect(validateStudentPrice({ answer: "cheaper", wouldPay: 500 }, 749)).toEqual({
      ok: true,
      value: { answer: "cheaper", wouldPay: 500 },
    });
    expect(validateStudentPrice({ answer: "cheaper", wouldPay: null }, 749)).toEqual({
      ok: true,
      value: { answer: "cheaper", wouldPay: null },
    });
  });

  it("refuses an amount that was not offered for that price", () => {
    expect(validateStudentPrice({ answer: "cheaper", wouldPay: 800 }, 749).ok).toBe(false);
    expect(validateStudentPrice({ answer: "cheaper", wouldPay: 450 }, 749).ok).toBe(false);
    expect(validateStudentPrice({ answer: "cheaper", wouldPay: "500" }, 749).ok).toBe(false);
  });

  it("refuses a lower amount on a yes or a no, and an unknown answer", () => {
    expect(validateStudentPrice({ answer: "yes", wouldPay: 300 }, 749).ok).toBe(false);
    expect(validateStudentPrice({ answer: "maybe" }, 749).ok).toBe(false);
    expect(validateStudentPrice(null, 749).ok).toBe(false);
  });
});

describe("validateTeacherRate", () => {
  it("accepts one of the four bands and nothing else", () => {
    expect(validateTeacherRate({ rate: "500-750" })).toEqual({ ok: true, value: "500-750" });
    expect(validateTeacherRate({ rate: "under-500" })).toEqual({ ok: true, value: "under-500" });
    expect(validateTeacherRate({ rate: "1000" }).ok).toBe(false);
    expect(validateTeacherRate({}).ok).toBe(false);
  });
});

describe("pendingPriceStep", () => {
  const row = (r: Partial<Parameters<typeof pendingPriceStep>[0] & object>) => ({
    role: "student" as const,
    wants: true,
    price_answer: null,
    teacher_rate: null,
    ...r,
  });

  it("asks a student who said Yes but has not seen a price", () => {
    expect(pendingPriceStep(row({}))).toBe("price");
  });

  it("asks a teacher who said Yes for their rate", () => {
    expect(pendingPriceStep(row({ role: "teacher" }))).toBe("rate");
  });

  it("asks nothing once answered, after a No, or with no answer at all", () => {
    expect(pendingPriceStep(row({ price_answer: "yes" }))).toBeNull();
    expect(pendingPriceStep(row({ role: "teacher", teacher_rate: "over-1000" }))).toBeNull();
    expect(pendingPriceStep(row({ wants: false }))).toBeNull();
    expect(pendingPriceStep(null)).toBeNull();
  });
});

describe("summariseTutorPrices", () => {
  const r = (x: Partial<TutorPriceRow>): TutorPriceRow => ({
    role: "student",
    wants: true,
    price_shown: null,
    price_answer: null,
    price_would_pay: null,
    teacher_rate: null,
    price_answered_from: null,
    ...x,
  });

  it("counts each price's answers, including those who saw it and left", () => {
    const s = summariseTutorPrices([
      r({ price_shown: 499, price_answer: "yes" }),
      r({ price_shown: 499, price_answer: "yes" }),
      r({ price_shown: 499, price_answer: "no" }),
      r({ price_shown: 749, price_answer: "cheaper", price_would_pay: 500 }),
      r({ price_shown: 749, price_answer: "cheaper", price_would_pay: null }),
      r({ price_shown: 999 }),
      r({}), // a Yes from before the test: no price yet
      r({ wants: false }),
    ]);
    expect(s.arms).toEqual([
      { price: 499, shown: 3, yes: 2, cheaper: 0, no: 1, left: 0, wouldPay: [], notSure: 0 },
      { price: 749, shown: 2, yes: 0, cheaper: 2, no: 0, left: 0, wouldPay: [{ amount: 500, count: 1 }], notSure: 1 },
      { price: 999, shown: 1, yes: 0, cheaper: 0, no: 0, left: 1, wouldPay: [], notSure: 0 },
    ]);
    expect(s.studentYesNotAsked).toBe(1);
  });

  it("counts where the price answers were given: /tutor or the /me card", () => {
    const s = summariseTutorPrices([
      r({ price_shown: 499, price_answer: "yes", price_answered_from: "me" }),
      r({ price_shown: 749, price_answer: "no", price_answered_from: "tutor" }),
      r({ price_shown: 999, price_answer: "yes", price_answered_from: "me" }),
      r({ price_shown: 999 }), // left at the price: answered nowhere
    ]);
    expect(s.answeredFrom).toEqual({ tutor: 1, me: 2 });
  });

  it("tallies teacher rates in band order, every band shown", () => {
    const s = summariseTutorPrices([
      r({ role: "teacher", teacher_rate: "750-1000" }),
      r({ role: "teacher", teacher_rate: "under-500" }),
      r({ role: "teacher", teacher_rate: "750-1000" }),
      r({ role: "teacher" }),
    ]);
    expect(s.teacherRates).toEqual([
      { rate: "under-500", count: 1 },
      { rate: "500-750", count: 0 },
      { rate: "750-1000", count: 2 },
      { rate: "over-1000", count: 0 },
    ]);
    expect(s.teacherYesNotAsked).toBe(1);
  });
});

/**
 * The /me card (2026-11-07): it asks a student who said Yes and owes a price
 * answer, unless they tapped "Not now" in the last week.
 */
describe("priceAskDue", () => {
  const now = new Date("2026-11-07T10:00:00Z");
  const row = (r: Partial<NonNullable<Parameters<typeof priceAskDue>[0]>>) => ({
    role: "student" as const,
    wants: true,
    price_answer: null,
    price_snoozed_until: null,
    ...r,
  });

  it("asks a student Yes with no price answer", () => {
    expect(priceAskDue(row({}), now)).toBe(true);
  });

  it("waits while a Not now is in force, and asks again once it runs out", () => {
    expect(priceAskDue(row({ price_snoozed_until: "2026-11-10T00:00:00Z" }), now)).toBe(false);
    expect(priceAskDue(row({ price_snoozed_until: "2026-11-07T09:59:59Z" }), now)).toBe(true);
  });

  it("never asks a teacher, a No, an answered row, or nobody", () => {
    expect(priceAskDue(row({ role: "teacher" }), now)).toBe(false);
    expect(priceAskDue(row({ wants: false }), now)).toBe(false);
    expect(priceAskDue(row({ price_answer: "no" }), now)).toBe(false);
    expect(priceAskDue(null, now)).toBe(false);
  });

  it("snoozes for a week", () => {
    expect(PRICE_SNOOZE_DAYS).toBe(7);
  });
});

describe("normaliseAnsweredFrom", () => {
  it("is 'me' only when the /me card says so, else /tutor", () => {
    expect(normaliseAnsweredFrom("me")).toBe("me");
    expect(normaliseAnsweredFrom("tutor")).toBe("tutor");
    expect(normaliseAnsweredFrom(undefined)).toBe("tutor");
    expect(normaliseAnsweredFrom("<x>")).toBe("tutor");
  });
});
