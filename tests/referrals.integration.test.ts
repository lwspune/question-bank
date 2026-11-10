/**
 * Referrals against the real database (migration 0249): a friend is attached
 * once; the 25% is offered only before their first purchase; the inviter's
 * reward is paid once per payment, stacks after Premium they hold, stops at
 * the cap and frees a slot when a refund revokes it; a student can read
 * neither table.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { testRunId } from "./helpers/runId";
import { mustSignIn } from "./helpers/fixture";
import {
  attachReferral,
  completeReferral,
  getOrCreateReferralCode,
  readReferralDiscount,
  readReferralStats,
  revokeReferralReward,
} from "@/lib/referrals/service";
import { REFERRAL_FRIEND_PCT, refCookieValue } from "@/lib/referrals/referral";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = testRunId();
const PASSWORD = "test-password-12345";
const DAY = 24 * 60 * 60 * 1000;

describe.skipIf(!HAS_ENV)("referrals", () => {
  let admin: SupabaseClient;
  const ids: Record<string, string> = {};
  const users: Record<string, { id: string; created_at: string }> = {};
  let code = "";
  let refCookie = "";

  const make = async (name: string) => {
    const { data, error } = await admin.auth.admin.createUser({
      email: `referral-${name}-${RUN_ID}@test.local`,
      password: PASSWORD,
      email_confirm: true,
    });
    if (error || !data.user) throw new Error(`create ${name}: ${error?.message}`);
    ids[name] = data.user.id;
    users[name] = { id: data.user.id, created_at: data.user.created_at };
  };

  const rewards = async () => {
    const { data, error } = await admin
      .from("entitlements")
      .select("expires_at, status, provider_ref")
      .eq("user_id", ids.referrer)
      .eq("source", "referral")
      .order("expires_at");
    if (error) throw new Error(error.message);
    return data ?? [];
  };

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    // The link is opened BEFORE the friends' accounts exist.
    const opened = new Date(Date.now() - 60_000);
    await make("referrer");
    code = await getOrCreateReferralCode(admin, ids.referrer);
    for (const f of ["f1", "f2", "f3"]) await make(f);
    refCookie = refCookieValue(code, opened);
  });

  afterAll(async () => {
    for (const id of Object.values(ids)) await admin.auth.admin.deleteUser(id); // cascades both tables + entitlements
  });

  const cookie = () => refCookie;

  it("gives a student one code and keeps it", async () => {
    expect(code).toMatch(/^[A-HJ-NP-Z2-9]{8}$/);
    expect(await getOrCreateReferralCode(admin, ids.referrer)).toBe(code);
  });

  it("attaches a new friend once, and never the inviter", async () => {
    const now = new Date();
    expect(await attachReferral(admin, users.f1, cookie(), now)).toBe(true);
    expect(await attachReferral(admin, users.f1, cookie(), now)).toBe(false);
    expect(await attachReferral(admin, users.referrer, cookie(), now)).toBe(false);
    expect(await attachReferral(admin, users.f2, cookie(), now)).toBe(true);
    expect(await attachReferral(admin, users.f3, cookie(), now)).toBe(true);
    expect(await attachReferral(admin, users.f3, "junk", now)).toBe(false);
  });

  it("offers the friend 25% before their first purchase, and nothing to anyone else", async () => {
    expect(await readReferralDiscount(admin, ids.f1)).toBe(REFERRAL_FRIEND_PCT);
    expect(await readReferralDiscount(admin, ids.referrer)).toBe(0);
  });

  it("rewards the inviter once per payment, after the Premium they hold", async () => {
    // The inviter already holds Premium for 10 more days.
    const holds = new Date(Date.now() + 10 * DAY).toISOString();
    const { error } = await admin.from("entitlements").insert({
      user_id: ids.referrer, scope: "mocks", source: "comp", status: "active", expires_at: holds,
    });
    if (error) throw new Error(error.message);

    expect(await completeReferral(admin, ids.f1, `pay_f1_${RUN_ID}`, { days: 30, max: 2 })).toBe("rewarded");
    expect(await completeReferral(admin, ids.f1, `pay_f1_${RUN_ID}`, { days: 30, max: 2 })).toBe("none");
    const [r] = await rewards();
    const days = (Date.parse(r.expires_at as string) - Date.now()) / DAY;
    expect(days).toBeGreaterThan(39.9);
    expect(days).toBeLessThan(40.1);
  });

  it("offers no discount once the friend has bought", async () => {
    await admin.from("entitlements").insert({
      user_id: ids.f1, scope: "mocks", source: "razorpay", status: "active", amount_paise: 37400,
      provider_ref: `pay_f1_${RUN_ID}`, expires_at: new Date(Date.now() + 182 * DAY).toISOString(),
    });
    expect(await readReferralDiscount(admin, ids.f1)).toBe(0);
  });

  it("stacks the next reward and stops at the cap", async () => {
    expect(await completeReferral(admin, ids.f2, `pay_f2_${RUN_ID}`, { days: 30, max: 2 })).toBe("rewarded");
    expect(await completeReferral(admin, ids.f3, `pay_f3_${RUN_ID}`, { days: 30, max: 2 })).toBe("capped");
    const rows = await rewards();
    expect(rows).toHaveLength(2);
    const gap = (Date.parse(rows[1].expires_at as string) - Date.parse(rows[0].expires_at as string)) / DAY;
    expect(gap).toBeGreaterThan(29.9);
    expect(gap).toBeLessThan(30.1);
    expect(await readReferralStats(admin, ids.referrer)).toEqual({ joined: 3, bought: 3, rewards: 2 });
  });

  it("a full refund ends the reward that payment earned", async () => {
    expect(await revokeReferralReward(admin, `pay_f2_${RUN_ID}`)).toBe(1);
    expect(await revokeReferralReward(admin, `pay_f2_${RUN_ID}`)).toBe(0);
    expect(await readReferralStats(admin, ids.referrer)).toEqual({ joined: 3, bought: 3, rewards: 1 });
  });

  it("a student can read neither table", async () => {
    const student = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: false },
    });
    await mustSignIn("referral inviter", student, { email: `referral-referrer-${RUN_ID}@test.local`, password: PASSWORD });
    const codes = await student.from("referral_codes").select("code");
    const refs = await student.from("referrals").select("friend_id");
    expect(codes.data ?? []).toEqual([]);
    expect(refs.data ?? []).toEqual([]);
    const call = await student.rpc("complete_referral", { p_friend: ids.f3, p_payment: "x", p_days: 30, p_max: 6 });
    expect(call.error).not.toBeNull();
  });
});
