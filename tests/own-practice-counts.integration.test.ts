/**
 * get_own_practice_counts (migration 0165) against the TEST Supabase project,
 * called as a real signed-in student, so it meets the RLS a browser would.
 *
 * The counting rules are 0132's get_own_answer_totals, split into today (from
 * midnight in India), the last 7 days and all time; mocks are not counted.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { mustSignIn } from "./helpers/fixture";
import { getOwnPracticeCounts } from "@/lib/activity/practiceCounts";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = Date.now();
const EMAIL = `practice_counts_${STAMP}@test.local`;
const OTHER_EMAIL = `practice_counts_other_${STAMP}@test.local`;
const PASSWORD = `Pw-${STAMP}-counts`;
const DAY_MS = 24 * 60 * 60 * 1000;

describe.skipIf(!HAS_ENV)("get_own_practice_counts", () => {
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

    const now = Date.now();
    const at = (msAgo: number) => new Date(now - msAgo).toISOString();
    const row = (user: string, kind: string, metadata: Record<string, unknown>, created_at: string) => ({
      user_id: user,
      kind,
      ref_id: crypto.randomUUID(),
      ref_kind: "question",
      metadata,
      created_at,
    });
    const today = at(0);
    const threeDaysAgo = at(3 * DAY_MS);
    const twentyDaysAgo = at(20 * DAY_MS);
    const { error } = await admin.from("user_activity").insert([
      // Today: 2 bank picks (1 right), 1 written answer read, 1 drill miss, 1 drill recovery.
      row(userId, "question_practiced", { surface: "bank", chose: "B", correct: true }, today),
      row(userId, "question_practiced", { surface: "bank", chose: "A", correct: false }, today),
      row(userId, "question_practiced", { surface: "board" }, today),
      row(userId, "answer_wrong", { surface: "drill", chose: "C" }, today),
      row(userId, "answer_correct", { surface: "drill", chose: "D" }, today),
      // The drill-fuel row written beside a wrong BANK pick: already counted by its reveal row.
      row(userId, "answer_wrong", { surface: "bank", chose: "A" }, today),
      // Three days ago: 1 right bank pick.
      row(userId, "question_practiced", { surface: "bank", chose: "B", correct: true }, threeDaysAgo),
      // Twenty days ago: 1 wrong pick, 1 guide reveal.
      row(userId, "question_practiced", { surface: "bank", chose: "A", correct: false }, twentyDaysAgo),
      row(userId, "question_practiced", { surface: "guide" }, twentyDaysAgo),
      // Not practice.
      row(userId, "mock_submitted", {}, today),
      // Someone else's practice: never counted.
      row(otherId, "question_practiced", { surface: "bank", chose: "B", correct: true }, today),
    ]);
    if (error) throw new Error(error.message);

    student = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    await mustSignIn("practice counts student", student, { email: EMAIL, password: PASSWORD });
  });

  afterAll(async () => {
    if (!admin) return;
    for (const id of [userId, otherId].filter(Boolean)) {
      await admin.from("user_activity").delete().eq("user_id", id);
      await admin.auth.admin.deleteUser(id);
    }
  });

  it("counts the student's own practice today, in the last 7 days and in all", async () => {
    const c = await getOwnPracticeCounts(student);
    expect(c.today).toEqual({ answered: 4, right: 2, revealed: 1 });
    expect(c.week).toEqual({ answered: 5, right: 3, revealed: 1 });
    expect(c.all).toEqual({ answered: 6, right: 3, revealed: 2 });
  });

  it("matches 0132's all-time totals for the same student (mocks aside)", async () => {
    const { data, error } = await student.rpc("get_own_answer_totals");
    if (error) throw new Error(error.message);
    const row = (data as { answered: number | string; right_answers: number | string }[])[0];
    const c = await getOwnPracticeCounts(student);
    expect(c.all.answered).toBe(Number(row.answered));
    expect(c.all.right).toBe(Number(row.right_answers));
  });

  it("is refused to a signed-out caller", async () => {
    const anon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: false },
    });
    await expect(getOwnPracticeCounts(anon)).rejects.toThrow(/permission denied/i);
  });
});
