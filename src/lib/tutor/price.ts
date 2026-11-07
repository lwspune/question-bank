/**
 * The tutoring price test (owner, 2026-11-07; migration 0223). After a Yes on
 * /tutor, a student sees ONE price for a 1-hour 1:1 session and says whether
 * they would book: Yes, only if it cost less (then what they would pay), or
 * No. A teacher says what they would charge. Nothing is sold or booked.
 *
 * One price per student, never a menu: a menu pulls everyone to the cheapest.
 * The price is fixed per account by a hash of its id, so a returning student
 * sees the same one, and the server decides it, never the request body.
 *
 * Read the prices against EACH OTHER: "I would book" runs well ahead of paying,
 * so the drop from one price to the next is the signal, not any one Yes rate.
 *
 * Pure. Spec: tests/tutor-price.test.ts. The rules mirror the table's CHECKs.
 */

import type { TutorRole } from "./interest";

export const TUTOR_PRICES = [499, 749, 999] as const;
export type TutorPrice = (typeof TUTOR_PRICES)[number];

export const PRICE_ANSWERS = ["yes", "cheaper", "no"] as const;
export type PriceAnswer = (typeof PRICE_ANSWERS)[number];

export const TEACHER_RATES = ["under-500", "500-750", "750-1000", "over-1000"] as const;
export type TeacherRate = (typeof TEACHER_RATES)[number];

/** The lower amounts a student can pick after "only if it cost less". */
const LOWER_AMOUNTS = [200, 300, 400, 500, 600, 800] as const;

/** The account's price: FNV-1a over the id, so it is the same on every visit and on server and browser. */
export function priceForUser(userId: string): TutorPrice {
  let h = 0x811c9dc5;
  for (let i = 0; i < userId.length; i++) {
    h ^= userId.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return TUTOR_PRICES[(h >>> 0) % TUTOR_PRICES.length];
}

/** Up to four amounts below the price shown, highest last. */
export function cheaperOptions(price: number): number[] {
  return LOWER_AMOUNTS.filter((a) => a < price).slice(-4);
}

export type StudentPriceAnswer = { answer: PriceAnswer; wouldPay: number | null };

type Validation<T> = { ok: true; value: T } | { ok: false; error: string };

const isAnswer = (v: unknown): v is PriceAnswer => (PRICE_ANSWERS as readonly unknown[]).includes(v);
const isRate = (v: unknown): v is TeacherRate => (TEACHER_RATES as readonly unknown[]).includes(v);

/** A student's answer to the price they were shown. A lower amount only with "cheaper", and only one offered. */
export function validateStudentPrice(raw: unknown, price: number): Validation<StudentPriceAnswer> {
  if (!raw || typeof raw !== "object") return { ok: false, error: "Invalid answer." };
  const { answer, wouldPay } = raw as Record<string, unknown>;
  if (!isAnswer(answer)) return { ok: false, error: "Choose yes, only if it cost less, or no." };
  const amount = wouldPay ?? null;
  if (answer !== "cheaper") {
    if (amount !== null) return { ok: false, error: "A lower amount goes only with 'only if it cost less'." };
    return { ok: true, value: { answer, wouldPay: null } };
  }
  if (amount === null) return { ok: true, value: { answer, wouldPay: null } };
  if (typeof amount !== "number" || !cheaperOptions(price).includes(amount)) {
    return { ok: false, error: "Choose one of the amounts shown." };
  }
  return { ok: true, value: { answer, wouldPay: amount } };
}

/** A teacher's answer: what they would charge for a 1-hour session. */
export function validateTeacherRate(raw: unknown): Validation<TeacherRate> {
  const rate = raw && typeof raw === "object" ? (raw as Record<string, unknown>).rate : undefined;
  return isRate(rate) ? { ok: true, value: rate } : { ok: false, error: "Choose what you would charge." };
}

/** The account's stored answer, as far as the price question needs it. */
export type StoredTutorAnswer = {
  role: TutorRole;
  wants: boolean;
  price_answer: string | null;
  teacher_rate: string | null;
} | null;

/**
 * The price question a returning account still owes (owner, 2026-11-07: the
 * Yes answers from before the test are asked when they come back to /tutor).
 */
export function pendingPriceStep(row: StoredTutorAnswer): "price" | "rate" | null {
  if (!row || !row.wants) return null;
  if (row.role === "student") return row.price_answer === null ? "price" : null;
  return row.teacher_rate === null ? "rate" : null;
}

/** One stored answer, as the readout reads it. */
export type TutorPriceRow = {
  role: TutorRole;
  wants: boolean;
  price_shown: number | null;
  price_answer: string | null;
  price_would_pay: number | null;
  teacher_rate: string | null;
};

export type TutorPriceArm = {
  price: TutorPrice;
  /** Students this price was recorded for: everyone who answered, plus new Yes answers who left at the price. */
  shown: number;
  yes: number;
  cheaper: number;
  no: number;
  /** Shown and never answered. Counted for new Yes answers only: a returning one is recorded when they answer. */
  left: number;
  /** "Only if it cost less", by the amount picked, lowest first. */
  wouldPay: { amount: number; count: number }[];
  /** "Only if it cost less" with no amount ("Not sure"). */
  notSure: number;
};

export type TutorPriceSummary = {
  arms: TutorPriceArm[];
  /** Student Yes answers with no price yet: from before the test, until they come back. */
  studentYesNotAsked: number;
  teacherRates: { rate: TeacherRate; count: number }[];
  teacherYesNotAsked: number;
};

export function summariseTutorPrices(rows: readonly TutorPriceRow[]): TutorPriceSummary {
  const arms = TUTOR_PRICES.map((price) => ({
    price,
    shown: 0,
    yes: 0,
    cheaper: 0,
    no: 0,
    left: 0,
    pay: new Map<number, number>(),
    notSure: 0,
  }));
  const rates = new Map<TeacherRate, number>(TEACHER_RATES.map((r) => [r, 0]));
  let studentYesNotAsked = 0;
  let teacherYesNotAsked = 0;

  for (const r of rows) {
    if (!r.wants) continue;
    if (r.role === "teacher") {
      if (isRate(r.teacher_rate)) rates.set(r.teacher_rate, (rates.get(r.teacher_rate) ?? 0) + 1);
      else teacherYesNotAsked++;
      continue;
    }
    const arm = arms.find((a) => a.price === r.price_shown);
    if (!arm) {
      studentYesNotAsked++;
      continue;
    }
    arm.shown++;
    if (r.price_answer === "yes") arm.yes++;
    else if (r.price_answer === "no") arm.no++;
    else if (r.price_answer === "cheaper") {
      arm.cheaper++;
      if (r.price_would_pay === null) arm.notSure++;
      else arm.pay.set(r.price_would_pay, (arm.pay.get(r.price_would_pay) ?? 0) + 1);
    } else arm.left++;
  }

  return {
    arms: arms.map(({ pay, ...a }) => ({
      ...a,
      wouldPay: Array.from(pay, ([amount, count]) => ({ amount, count })).sort((x, y) => x.amount - y.amount),
    })),
    studentYesNotAsked,
    teacherRates: TEACHER_RATES.map((rate) => ({ rate, count: rates.get(rate) ?? 0 })),
    teacherYesNotAsked,
  };
}
