/**
 * `npm run referrals:readout`: the referrals experiment's numbers (growth
 * registry id "referrals", migration 0249), since launch.
 *
 * The funnel, step by step, so a miss says WHERE it failed: links made
 * (referral_codes: made on a tap, not on view), share taps (share_events kind
 * 'referral': intent to share, not delivery), friends who signed up through a
 * link (referrals), friends who bought (referrals.paid_at) and inviters
 * rewarded. Then every referred sale, inviter beside friend, so a student
 * inviting their own second account can be spotted by eye: allowed by design,
 * but it should not be what keeps the experiment.
 *
 * Staff are left out of every count. Read-only, service role.
 */
import { join } from "node:path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { EXPERIMENTS, REFERRALS_SALES_KEEP, checkOn } from "@/lib/growth/registry";

type Referral = {
  friend_id: string;
  referrer_id: string;
  created_at: string;
  paid_at: string | null;
  reward_entitlement_id: string | null;
};

async function main() {
  const exp = EXPERIMENTS.find((e) => e.id === "referrals");
  if (!exp) throw new Error("experiment referrals missing from the registry");
  const since = new Date(`${exp.liveSince}T00:00:00+05:30`).toISOString();
  const db = createSupabaseAdminClient();

  const [members, admins] = await Promise.all([
    db.from("org_members").select("user_id"),
    db.from("platform_admins").select("user_id"),
  ]);
  if (members.error || admins.error) throw new Error(`staff read: ${members.error?.message ?? admins.error?.message}`);
  const staff = new Set([...(members.data ?? []), ...(admins.data ?? [])].map((r) => r.user_id as string));

  const [codes, shares, refs] = await Promise.all([
    db.from("referral_codes").select("user_id").gte("created_at", since),
    db.from("share_events").select("user_id, channel").eq("subject_kind", "referral").gte("created_at", since),
    db
      .from("referrals")
      .select("friend_id, referrer_id, created_at, paid_at, reward_entitlement_id")
      .gte("created_at", since)
      .order("created_at"),
  ]);
  for (const r of [codes, shares, refs]) if (r.error) throw new Error(r.error.message);
  // Each table stays small for the life of the experiment (hundreds of rows at
  // most); a count past 1,000 would mean the 1,000-row cap is truncating it.
  for (const [name, r] of [["codes", codes], ["shares", shares], ["referrals", refs]] as const) {
    if ((r.data ?? []).length >= 1000) throw new Error(`${name}: 1,000 rows read, page this script before trusting it`);
  }

  const notStaff = <T extends { user_id?: string | null }>(rows: T[]) => rows.filter((r) => !r.user_id || !staff.has(r.user_id));
  const linkMakers = notStaff(codes.data ?? []).length;
  const shareRows = notStaff((shares.data ?? []) as { user_id: string | null; channel: string }[]);
  const sharers = new Set(shareRows.map((r) => r.user_id)).size;
  const byChannel = shareRows.reduce<Record<string, number>>((m, r) => ({ ...m, [r.channel]: (m[r.channel] ?? 0) + 1 }), {});
  const referrals = ((refs.data ?? []) as Referral[]).filter((r) => !staff.has(r.referrer_id));
  const sales = referrals.filter((r) => r.paid_at);
  const rewarded = sales.filter((r) => r.reward_entitlement_id).length;

  const check = checkOn(exp.liveSince, exp.windowDays);
  console.log(`Referrals readout since ${exp.liveSince} (check ${check})`);
  console.log(`links made          ${linkMakers}`);
  console.log(`share taps          ${shareRows.length} by ${sharers} students (${Object.entries(byChannel).map(([c, n]) => `${c} ${n}`).join(", ") || "none"})`);
  console.log(`friends signed up   ${referrals.length} (from ${new Set(referrals.map((r) => r.referrer_id)).size} inviters)`);
  console.log(`friends who bought  ${sales.length} (keep needs ${REFERRALS_SALES_KEEP}) · inviters rewarded ${rewarded}`);

  if (sales.length > 0) {
    console.log("\nreferred sales (inviter -> friend; signed up -> paid):");
    for (const s of sales) {
      console.log(`  ${s.referrer_id.slice(0, 8)} -> ${s.friend_id.slice(0, 8)}  ${s.created_at.slice(0, 16)} -> ${s.paid_at!.slice(0, 16)}`);
    }
  }
  const done = Date.now() >= new Date(`${check}T00:00:00+05:30`).getTime();
  console.log(done ? (sales.length >= REFERRALS_SALES_KEEP ? "\nVERDICT: keep" : "\nVERDICT: switch off") : "\n(window not complete)");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
