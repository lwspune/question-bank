/**
 * get_own_week_study_days (migration 0219) against the TEST Supabase project,
 * called as a real signed-in student, so it meets the RLS a browser would.
 *
 * A study day (2026-11-06) is an IST day since the week's start with a finished
 * sitting (a mock, a drill, a notes checkpoint, a quiz) or at least ten
 * answers: a bank or /board pick with a verdict, or a drill answer. A revealed
 * answer with no pick never counts, the original "never a reveal" rule.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { mustSignIn } from "./helpers/fixture";
import { countWeekStudyDays } from "@/lib/goals/service";
import { weekStartIst } from "@/lib/goals/weekly";
import { testRunId } from "./helpers/runId";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = testRunId();
const EMAIL = `study_days_${STAMP}@test.local`;
const OTHER_EMAIL = `study_days_other_${STAMP}@test.local`;
const PASSWORD = `Pw-${STAMP}-days`;
const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

/** A fixed Wednesday 15:00 IST, so the week has Mon, Tue and Wed in it. */
const NOW = new Date("2026-11-04T09:30:00.000Z");

describe.skipIf(!HAS_ENV)("get_own_week_study_days", () => {
  let admin: SupabaseClient;
  let student: SupabaseClient;
  let userId = "";
  let otherId = "";

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    const a = await admin.auth.admin.createUser({ email: EMAIL, password: PASSWORD, email_confirm: true });
    if (a.error) throw new Error(a.error.message);
    userId = a.data.user!.id;
    const b = await admin.auth.admin.createUser({ email: OTHER_EMAIL, password: PASSWORD, email_confirm: true });
    if (b.error) throw new Error(b.error.message);
    otherId = b.data.user!.id;

    // Noon IST on Monday, Tuesday, Wednesday of NOW's week, and the Sunday before.
    const monday = weekStartIst(NOW).getTime();
    const noon = (dayOffset: number) => new Date(monday + dayOffset * DAY_MS + 12 * HOUR_MS).toISOString();
    const row = (user: string, kind: string, metadata: Record<string, unknown>, created_at: string) => ({
      user_id: user,
      kind,
      ref_id: crypto.randomUUID(),
      ref_kind: "question",
      metadata,
      created_at,
    });
    const picks = (user: string, n: number, at: string, surface = "bank") =>
      Array.from({ length: n }, (_, i) => row(user, "question_practiced", { surface, chose: "A", correct: i % 2 === 0 }, at));

    const { error } = await admin.from("user_activity").insert([
      // Monday: 10 picks, 6 on the bank and 4 in the drill -> a study day.
      ...picks(userId, 6, noon(0)),
      ...Array.from({ length: 4 }, () => row(userId, "answer_wrong", { surface: "drill", chose: "B" }, noon(0))),
      // Tuesday: 9 picks and 20 bare reveals -> not a study day.
      ...picks(userId, 9, noon(1)),
      ...Array.from({ length: 20 }, () => row(userId, "question_practiced", { surface: "board" }, noon(1))),
      // Wednesday: one finished mock and nothing else -> a study day.
      row(userId, "mock_submitted", {}, noon(2)),
      // The Sunday before the week: 30 picks -> outside the week.
      ...picks(userId, 30, noon(-1)),
      // Someone else's 25 picks on Tuesday -> never counted.
      ...picks(otherId, 25, noon(1)),
    ]);
    if (error) throw new Error(error.message);

    student = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    await mustSignIn("study days student", student, { email: EMAIL, password: PASSWORD });
  });

  afterAll(async () => {
    if (!admin) return;
    for (const id of [userId, otherId].filter(Boolean)) {
      await admin.from("user_activity").delete().eq("user_id", id);
      await admin.auth.admin.deleteUser(id);
    }
  });

  it("counts Monday (10 answers) and Wednesday (a mock), not Tuesday (9 answers + reveals) or last Sunday", async () => {
    expect(await countWeekStudyDays(student, NOW)).toBe(2);
  });

  it("gives an anonymous caller nothing", async () => {
    const anon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: false },
    });
    const { error } = await anon.rpc("get_own_week_study_days", {
      p_since: weekStartIst(NOW).toISOString(),
      p_sitting_kinds: ["mock_submitted"],
      p_min_answers: 10,
    });
    expect(error).not.toBeNull();
  });
});
