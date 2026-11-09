/**
 * The staff view of a student's /me (migration 0222): the two counts /me reads
 * as "me" (study days this week, Answered / Right), read FOR a named student.
 *
 * The property that matters is AGREEMENT: a superadmin looking at a student
 * must see the numbers that student sees on their own /me, so each staff count
 * is checked against the student's own call on the same rows. The second
 * property is the gate: anyone who is not a superadmin is refused, never
 * handed an empty student.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { mustSignIn } from "./helpers/fixture";
import { countWeekStudyDays, countStudentWeekStudyDays } from "@/lib/goals/service";
import { getOwnAnswerTotals, getStudentAnswerTotals } from "@/lib/celebrate/service";
import { weekStartIst } from "@/lib/goals/weekly";
import { testRunId } from "./helpers/runId";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = testRunId();
const STUDENT_EMAIL = `staff_counts_student_${STAMP}@test.local`;
const SUPER_EMAIL = `staff_counts_super_${STAMP}@test.local`;
const OTHER_EMAIL = `staff_counts_other_${STAMP}@test.local`;
const PASSWORD = `Pw-${STAMP}-staff`;
const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

/** A fixed Wednesday 15:00 IST, so the week has Mon, Tue and Wed in it. */
const NOW = new Date("2026-11-04T09:30:00.000Z");

describe.skipIf(!HAS_ENV)("staff counts for one student (migration 0222)", () => {
  let admin: SupabaseClient;
  let student: SupabaseClient;
  let superadmin: SupabaseClient;
  let other: SupabaseClient;
  let studentId = "";
  let superId = "";
  let otherId = "";

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    const make = async (email: string) => {
      const r = await admin.auth.admin.createUser({ email, password: PASSWORD, email_confirm: true });
      if (r.error) throw new Error(r.error.message);
      return r.data.user!.id;
    };
    studentId = await make(STUDENT_EMAIL);
    superId = await make(SUPER_EMAIL);
    otherId = await make(OTHER_EMAIL);
    const pa = await admin.from("platform_admins").insert({ user_id: superId });
    if (pa.error) throw new Error(pa.error.message);

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
    const picks = (user: string, n: number, at: string) =>
      Array.from({ length: n }, (_, i) =>
        row(user, "question_practiced", { surface: "bank", chose: "A", correct: i % 2 === 0 }, at)
      );

    const { error } = await admin.from("user_activity").insert([
      // Monday: 10 picks -> a study day. Wednesday: a finished mock -> a study day.
      ...picks(studentId, 10, noon(0)),
      row(studentId, "mock_submitted", {}, noon(2)),
      // Two drill answers, one right.
      row(studentId, "answer_wrong", { surface: "drill", chose: "B" }, noon(1)),
      row(studentId, "answer_correct", { surface: "drill", chose: "C" }, noon(1)),
      // The superadmin's own rows must never leak into the student's numbers.
      ...picks(superId, 25, noon(1)),
    ]);
    if (error) throw new Error(error.message);

    const signIn = async (label: string, email: string) => {
      const c = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
      await mustSignIn(label, c, { email, password: PASSWORD });
      return c;
    };
    student = await signIn("staff counts student", STUDENT_EMAIL);
    superadmin = await signIn("staff counts superadmin", SUPER_EMAIL);
    other = await signIn("staff counts other student", OTHER_EMAIL);
  });

  afterAll(async () => {
    if (!admin) return;
    if (superId) await admin.from("platform_admins").delete().eq("user_id", superId);
    for (const id of [studentId, superId, otherId].filter(Boolean)) {
      await admin.from("user_activity").delete().eq("user_id", id);
      await admin.auth.admin.deleteUser(id);
    }
  });

  it("study days: the superadmin sees what the student sees on their own /me", async () => {
    const own = await countWeekStudyDays(student, NOW);
    expect(own).toBe(2);
    expect(await countStudentWeekStudyDays(superadmin, studentId, NOW)).toBe(own);
  });

  it("answered / right: the superadmin sees what the student sees", async () => {
    const own = await getOwnAnswerTotals(student);
    expect(own).toEqual({ answered: 12, right: 6 });
    expect(await getStudentAnswerTotals(superadmin, studentId)).toEqual(own);
  });

  it("refuses a student reading another student, rather than returning zeros", async () => {
    await expect(countStudentWeekStudyDays(other, studentId, NOW)).rejects.toThrow();
    const { error } = await other.rpc("get_student_answer_totals_for_staff", { p_user_id: studentId });
    expect(error?.code).toBe("42501");
  });

  it("refuses an anonymous caller", async () => {
    const anon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: false },
    });
    const { error } = await anon.rpc("get_student_answer_totals_for_staff", { p_user_id: studentId });
    expect(error).not.toBeNull();
  });
});
