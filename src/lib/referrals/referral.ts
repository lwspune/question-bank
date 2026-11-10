/**
 * Referrals (owner, 2026-11-09; migration 0249): the pure core.
 *
 * Every student has a link (/r/<code>). A friend who creates a NEW account
 * after opening it gets REFERRAL_FRIEND_PCT off their first pass (on top of
 * any Vault Points, both capped together at COMBINED_DISCOUNT_CAP_PCT in
 * lib/billing/fixPoints). When that friend pays, the inviter gets
 * REFERRAL_REWARD_DAYS of Premium, added after any Premium they already hold,
 * up to REFERRAL_MAX_REWARDS times. The reward is decided in one database
 * function (complete_referral), so the two grant paths cannot pay it twice.
 *
 * WHAT IT ACCEPTS: a student can invite themselves with a second email. That
 * buys only a 25% coupon, and the reward needs a real paid purchase, so it is
 * allowed and measured rather than policed (the readout lists every referred
 * sale). The friend never sees the inviter's name: most students are minors.
 *
 * Pure (randomness aside) and browser-safe. Spec: tests/referrals.test.ts.
 */
import { SITE_URL } from "@/lib/brand";

export const REFERRAL_FRIEND_PCT = 25;
export const REFERRAL_REWARD_DAYS = 30;
export const REFERRAL_MAX_REWARDS = 6;

/** Capitals and digits a student can read aloud: no 0/O, 1/I. 32 symbols. */
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const CODE_LENGTH = 8;
const CODE_RE = new RegExp(`^[${ALPHABET}]{${CODE_LENGTH}}$`);

/** A new code, 40 bits. Not a secret: guessing one buys a coupon anyone can be sent. */
export function makeReferralCode(): string {
  // Web Crypto, not node:crypto: the sign-up page imports this module too.
  // 32 symbols divide 256, so a byte masked to 5 bits picks one evenly.
  const bytes = globalThis.crypto.getRandomValues(new Uint8Array(CODE_LENGTH));
  let code = "";
  for (const b of bytes) code += ALPHABET[b & 31];
  return code;
}

export function isReferralCode(v: unknown): v is string {
  return typeof v === "string" && CODE_RE.test(v);
}

/** A code as typed or linked (any case, stray spaces) in its stored form, or null. */
export function normaliseReferralCode(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const c = v.trim().toUpperCase();
  return isReferralCode(c) ? c : null;
}

export function referralLink(code: string): string {
  return `${SITE_URL}/r/${code}`;
}

export function referralShareText(code: string): string {
  return (
    `I'm practising past-year papers on PYQ Vault. Sign up with my link and you get ${REFERRAL_FRIEND_PCT}% off a pass: ` +
    referralLink(code)
  );
}

/* ---------- the qb_ref cookie: "<CODE>.<epoch seconds the link was opened>" ---------- */

export const REF_COOKIE = "qb_ref";
export const REF_COOKIE_DAYS = 30;

export function refCookieValue(code: string, openedAt: Date): string {
  return `${code}.${Math.floor(openedAt.getTime() / 1000)}`;
}

/** The cookie is UNTRUSTED (anyone can set it): parse strictly, null on anything odd. */
export function readRefCookie(raw: string | null | undefined): { code: string; openedAt: string } | null {
  if (!raw) return null;
  const m = /^([A-Z0-9]{8})\.(\d{9,11})$/.exec(raw);
  if (!m || !isReferralCode(m[1])) return null;
  const at = new Date(Number(m[2]) * 1000);
  if (Number.isNaN(at.getTime())) return null;
  return { code: m[1], openedAt: at.toISOString() };
}

/* ---------- who counts as a friend ---------- */

/** Clock slack between the link open (the server's clock) and the account's creation (Supabase's). */
const OPEN_SLACK_MS = 10 * 60 * 1000;
/** A friend is attached on the sign-in that made the account, or within a day of it (an email confirmed later). */
const NEW_ACCOUNT_MS = 24 * 60 * 60 * 1000;

/**
 * Tie this account to the inviter? Only a NEW account: made after the link
 * was opened, and no more than a day ago. An existing student opening a
 * friend's link gets nothing, since a referral is there to bring new students.
 */
export function shouldAttachReferral(i: {
  friendId: string;
  friendCreatedAt: string | null | undefined;
  referrerId: string;
  openedAt: string;
  now: Date;
}): boolean {
  if (!i.friendId || i.friendId === i.referrerId) return false;
  const created = i.friendCreatedAt ? Date.parse(i.friendCreatedAt) : NaN;
  const opened = Date.parse(i.openedAt);
  if (!Number.isFinite(created) || !Number.isFinite(opened)) return false;
  if (created < opened - OPEN_SLACK_MS) return false;
  return i.now.getTime() - created <= NEW_ACCOUNT_MS;
}

/* ---------- the order ---------- */

/** Did this order sell at the referral price? Read by both grant paths from the order's own notes. */
export function orderCarriesReferral(notes: Record<string, string> | null | undefined): boolean {
  const n = Number(notes?.referralPct);
  return Number.isInteger(n) && n > 0;
}

/* ---------- the inviter's card ---------- */

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export function referralStatusLine(s: { joined: number; bought: number; rewards: number }): string {
  const max = REFERRAL_MAX_REWARDS * REFERRAL_REWARD_DAYS;
  if (s.joined <= 0) {
    return `A friend who signs up with your link gets ${REFERRAL_FRIEND_PCT}% off a pass. When they buy one, you get ${REFERRAL_REWARD_DAYS} days of Premium free, up to ${max} days.`;
  }
  const head = `${plural(s.joined, "friend", "friends")} joined · ${s.bought} bought a pass`;
  if (s.rewards >= REFERRAL_MAX_REWARDS) {
    return `${head} · all ${max} free days earned. Friends still get ${REFERRAL_FRIEND_PCT}% off.`;
  }
  return `${head} · ${s.rewards * REFERRAL_REWARD_DAYS} of ${max} free days earned.`;
}
