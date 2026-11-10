/**
 * Referrals (migration 0249): reads and writes. Service-role only, since both
 * tables have no student grant; callers pass the admin client, so a test can
 * drive the real database. Rules and numbers: ./referral.ts.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  REFERRAL_FRIEND_PCT,
  REFERRAL_MAX_REWARDS,
  REFERRAL_REWARD_DAYS,
  makeReferralCode,
  readRefCookie,
  shouldAttachReferral,
} from "./referral";

/** The student's code, made on first ask. A clash with another student's code just draws again. */
export async function getOrCreateReferralCode(admin: SupabaseClient, userId: string): Promise<string> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const { data: had, error: readErr } = await admin
      .from("referral_codes")
      .select("code")
      .eq("user_id", userId)
      .maybeSingle();
    if (readErr) throw new Error(`referral code read: ${readErr.message}`);
    if (had) return (had as { code: string }).code;

    const { error } = await admin.from("referral_codes").insert({ user_id: userId, code: makeReferralCode() });
    // 23505: this student's row appeared meanwhile (re-read it) or the code was taken (draw again).
    if (error && error.code !== "23505") throw new Error(`referral code insert: ${error.message}`);
  }
  throw new Error("referral code: no free code after 5 tries");
}

export async function referrerForCode(admin: SupabaseClient, code: string): Promise<string | null> {
  const { data, error } = await admin.from("referral_codes").select("user_id").eq("code", code).maybeSingle();
  if (error) throw new Error(`referral code lookup: ${error.message}`);
  return data ? (data as { user_id: string }).user_id : null;
}

/**
 * Tie a just-made account to the inviter whose link it came through (the
 * qb_ref cookie). True only when a new row was written. Throws on a database
 * error; the sign-in paths catch and log it, since a referral is never worth
 * a failed sign-in.
 */
export async function attachReferral(
  admin: SupabaseClient,
  user: { id: string; created_at?: string | null },
  rawCookie: string | null | undefined,
  now: Date
): Promise<boolean> {
  const ref = readRefCookie(rawCookie);
  if (!ref) return false;
  const referrerId = await referrerForCode(admin, ref.code);
  if (!referrerId) return false;
  if (
    !shouldAttachReferral({ friendId: user.id, friendCreatedAt: user.created_at, referrerId, openedAt: ref.openedAt, now })
  ) {
    return false;
  }
  const { data, error } = await admin
    .from("referrals")
    .upsert({ friend_id: user.id, referrer_id: referrerId }, { onConflict: "friend_id", ignoreDuplicates: true })
    .select("friend_id");
  if (error) throw new Error(`referral attach: ${error.message}`);
  return (data ?? []).length > 0;
}

/**
 * The friend's referral discount now: REFERRAL_FRIEND_PCT while they have a
 * referral not yet used and have never bought a pass, else 0. THROWS on a
 * failed read; the order route then sells at the list price.
 */
export async function readReferralDiscount(admin: SupabaseClient, userId: string): Promise<number> {
  const [ref, bought] = await Promise.all([
    admin.from("referrals").select("friend_id").eq("friend_id", userId).is("paid_payment_id", null).maybeSingle(),
    admin
      .from("entitlements")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("source", "razorpay"),
  ]);
  if (ref.error) throw new Error(`referral read: ${ref.error.message}`);
  if (bought.error) throw new Error(`referral purchase read: ${bought.error.message}`);
  return ref.data && (bought.count ?? 0) === 0 ? REFERRAL_FRIEND_PCT : 0;
}

export type ReferralOutcome = "rewarded" | "capped" | "none";

/**
 * After the friend's pass is granted from an order that carried the referral:
 * mark the referral paid and reward the inviter, in one database transaction
 * (complete_referral). Idempotent: the second grant path gets "none".
 * `limits` is for tests; production uses the constants.
 */
export async function completeReferral(
  admin: SupabaseClient,
  friendId: string,
  paymentId: string,
  limits: { days: number; max: number } = { days: REFERRAL_REWARD_DAYS, max: REFERRAL_MAX_REWARDS }
): Promise<ReferralOutcome> {
  const { data, error } = await admin.rpc("complete_referral", {
    p_friend: friendId,
    p_payment: paymentId,
    p_days: limits.days,
    p_max: limits.max,
  });
  if (error) throw new Error(`complete_referral: ${error.message}`);
  return data as ReferralOutcome;
}

/** A full refund of the friend's pass ends the days it earned. Returns rows revoked (0 on a repeat). */
export async function revokeReferralReward(admin: SupabaseClient, paymentId: string): Promise<number> {
  const { data, error } = await admin
    .from("entitlements")
    .update({ status: "revoked" })
    .eq("source", "referral")
    .eq("provider_ref", `referral:${paymentId}`)
    .eq("status", "active")
    .select("id");
  if (error) throw new Error(`referral revoke: ${error.message}`);
  return (data ?? []).length;
}

export type ReferralStats = { joined: number; bought: number; rewards: number };

/** The inviter's card: friends who joined, friends who bought, rewards not refunded. */
export async function readReferralStats(admin: SupabaseClient, userId: string): Promise<ReferralStats> {
  const [joined, bought, rewards] = await Promise.all([
    admin.from("referrals").select("friend_id", { count: "exact", head: true }).eq("referrer_id", userId),
    admin
      .from("referrals")
      .select("friend_id", { count: "exact", head: true })
      .eq("referrer_id", userId)
      .not("paid_payment_id", "is", null),
    admin
      .from("entitlements")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("source", "referral")
      .neq("status", "revoked"),
  ]);
  for (const r of [joined, bought, rewards]) if (r.error) throw new Error(`referral stats: ${r.error.message}`);
  return { joined: joined.count ?? 0, bought: bought.count ?? 0, rewards: rewards.count ?? 0 };
}

/**
 * attachReferral for the sign-in paths (the OAuth callback, the in-page
 * Google sign-in, onboarding): its own admin client, and never throws, since
 * a referral is never worth a failed sign-in. Logged at the boundary.
 */
export async function attachReferralAtSignIn(
  user: { id: string; created_at?: string | null } | null | undefined,
  rawCookie: string | null | undefined
): Promise<void> {
  if (!user || !rawCookie) return;
  try {
    await attachReferral(createSupabaseAdminClient(), user, rawCookie, new Date());
  } catch (e) {
    console.error("referral attach at sign-in", e instanceof Error ? e.message : e);
  }
}

/** The student's code, or null before they first ask for a link. */
export async function readReferralCode(admin: SupabaseClient, userId: string): Promise<string | null> {
  const { data, error } = await admin.from("referral_codes").select("code").eq("user_id", userId).maybeSingle();
  if (error) throw new Error(`referral code read: ${error.message}`);
  return data ? (data as { code: string }).code : null;
}
