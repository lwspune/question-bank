/**
 * get_growth_snapshot (migration 0129) against the TEST project.
 *
 * The load-bearing assertion is the ARM PARITY: the SQL splits students into
 * practice-first and control with its own formula, and the welcome screen
 * splits them with onboardingArm() in TypeScript. If the two ever disagreed,
 * every onboarding readout would compare the wrong students and nothing would
 * look wrong. So the expected counts below are computed by the TS function on
 * the very ids the database assigned.
 *
 * Isolation: fixtures use a made-up exam slug and campaign, passed as the
 * RPC's parameters, so other rows in the test project cannot leak in.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { onboardingArm, type OnboardingArm } from "@/lib/education/howItWorks";
import { NORTH_STAR_KINDS } from "@/lib/growth/registry";
import type { GrowthSnapshotRaw } from "@/lib/growth/query";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);
const EXAM = `growthtest-${RUN_ID}`;
const CAMPAIGN = `growthtest-${RUN_ID}`;
const PASSWORD = `growth-snapshot-${RUN_ID}`;
const DAY = 86_400_000;

/** 12:00 IST (06:30 UTC) `daysAgo` days back — far from any IST midnight. */
function istNoon(daysAgo: number): Date {
  const d = new Date(Date.now() - daysAgo * DAY);
  d.setUTCHours(6, 30, 0, 0);
  return d;
}

type Role = "returner" | "mocker" | "viewer" | "fresh" | "staff";
type Fixture = { id: string; role: Role; arm: OnboardingArm };

describe.skipIf(!HAS_ENV)("get_growth_snapshot (migration 0129)", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  let orgId = "";
  const fixtures: Fixture[] = [];
  const since = new Date(Date.now() - 30 * DAY).toISOString();
  const shareSince = new Date(Date.now() - 3600_000).toISOString();

  const params = {
    p_weeks: 6,
    p_kinds: [...NORTH_STAR_KINDS],
    p_onboarding_since: since,
    p_mock_exams: [EXAM],
    p_share_since: shareSince,
    p_share_campaign: CAMPAIGN,
  };
  const snapshot = async () => {
    const { data, error } = await admin.rpc("get_growth_snapshot", params);
    expect(error).toBeNull();
    return data as GrowthSnapshotRaw;
  };

  async function makeUser(role: Role, n: number): Promise<Fixture> {
    const email = `growth-${role}-${n}-${RUN_ID}@test.local`;
    const { data, error } = await admin.auth.admin.createUser({ email, password: PASSWORD, email_confirm: true });
    expect(error).toBeNull();
    const f = { id: data.user!.id, role, arm: onboardingArm(data.user!.id) };
    fixtures.push(f);
    return f;
  }

  async function activity(userId: string, kind: string, at: Date, tag: string) {
    const { error } = await admin.from("user_activity").insert({
      user_id: userId,
      kind,
      created_at: at.toISOString(),
      dedupe_key: `growthtest:${RUN_ID}:${tag}`,
    });
    expect(error).toBeNull();
  }

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    anonClient = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });

    // Make returners until BOTH arms hold at least one, so parity is tested
    // in both directions (ids are random; this ends within a few tries).
    let n = 0;
    while (
      n < 24 &&
      !(fixtures.some((f) => f.arm === "practice-first") && fixtures.some((f) => f.arm === "mock-first"))
    ) {
      await makeUser("returner", n++);
    }
    await makeUser("mocker", 0);
    await makeUser("viewer", 0);
    await makeUser("fresh", 0);
    await makeUser("staff", 0);

    const onboarded = istNoon(10);
    for (const f of fixtures) {
      const { error } = await admin.from("student_profiles").upsert(
        {
          user_id: f.id,
          target_exams: [EXAM],
          onboarded_at: (f.role === "fresh" ? istNoon(1) : onboarded).toISOString(),
          acq_campaign: CAMPAIGN,
        },
        { onConflict: "user_id" }
      );
      expect(error).toBeNull();
    }

    const at = (base: Date, days: number, minutes = 0) => new Date(base.getTime() + days * DAY + minutes * 60_000);
    for (const f of fixtures) {
      if (f.role === "returner" || f.role === "staff") {
        // Practised on the day they onboarded and again two days later.
        await activity(f.id, "question_practiced", at(onboarded, 0, 1), `${f.id}:d0`);
        await activity(f.id, "question_practiced", at(onboarded, 2), `${f.id}:d2`);
      }
      if (f.role === "mocker") {
        // Opened a mock on day 0 and never came back.
        await activity(f.id, "mock_started", at(onboarded, 0, 1), `${f.id}:d0`);
      }
      if (f.role === "viewer") {
        // Only a page view two days later: a visit, not study.
        await activity(f.id, "surface_viewed", at(onboarded, 2), `${f.id}:view`);
      }
    }

    const { data: org } = await admin.from("organizations").insert({ name: `__growth_${RUN_ID}` }).select("id").single();
    orgId = org!.id;
    const staff = fixtures.find((f) => f.role === "staff")!;
    const { error: sErr } = await admin.from("org_members").insert({ user_id: staff.id, org_id: orgId, role: "TEACHER" });
    expect(sErr).toBeNull();
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("user_activity").delete().like("dedupe_key", `growthtest:${RUN_ID}:%`);
    if (orgId) {
      await admin.from("org_members").delete().eq("org_id", orgId);
      await admin.from("organizations").delete().eq("id", orgId);
    }
    for (const f of fixtures) await admin.auth.admin.deleteUser(f.id);
  });

  it("splits students into the same halves as onboardingArm(), staff excluded", async () => {
    const s = await snapshot();
    const students = fixtures.filter((f) => f.role !== "staff");
    for (const arm of ["practice-first", "mock-first"] as const) {
      const mine = students.filter((f) => f.arm === arm);
      const matured = mine.filter((f) => f.role !== "fresh");
      const returners = mine.filter((f) => f.role === "returner");
      const row = s.arms.find((a) => a.arm === arm) ?? {
        onboarded: 0, matured: 0, returned7: 0, twoPlus: 0, firstPractice: 0, firstMock: 0,
      };
      expect(row).toMatchObject({
        onboarded: mine.length,
        matured: matured.length,
        returned7: returners.length,
        twoPlus: returners.length,
        firstPractice: returners.length,
        firstMock: mine.filter((f) => f.role === "mocker").length,
      });
    }
  });

  it("counts chapter-share signups by campaign, staff excluded", async () => {
    const s = await snapshot();
    const students = fixtures.filter((f) => f.role !== "staff");
    expect(s.chapterShare.signups).toBe(students.length);
    // Returners and the mocker did a learning act; the viewer and the fresh student did not.
    expect(s.chapterShare.signalled).toBe(students.filter((f) => f.role === "returner" || f.role === "mocker").length);
  });

  it("returns one row per week and per day in the windows asked for", async () => {
    const s = await snapshot();
    expect(s.weeks).toHaveLength(params.p_weeks);
    expect(s.signupWeeks).toHaveLength(params.p_weeks);
    expect(s.emailDays).toHaveLength(14);
    for (const w of s.weeks) expect(new Date(`${w.weekStart}T00:00:00Z`).getUTCDay()).toBe(1); // Monday
  });

  it("cannot be called by anon", async () => {
    const { error } = await anonClient.rpc("get_growth_snapshot", params);
    expect(error).not.toBeNull();
  });
});
