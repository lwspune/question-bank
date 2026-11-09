/**
 * Fix Points against the real database (migration 0245): the award only pays
 * for a miss from before today, once per question; the balance counts the
 * 30-day window and restarts at a purchase; a student can read their own
 * points and cannot write any.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { testRunId } from "./helpers/runId";
import { mustSignIn } from "./helpers/fixture";
import { awardFixPoints, readFixPoints } from "@/lib/billing/fixPointsService";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = testRunId();
const EMAIL = `fix-points-${RUN_ID}@test.local`;
const PASSWORD = "test-password-12345";
const DAY = 24 * 60 * 60 * 1000;

describe.skipIf(!HAS_ENV)("fix points", () => {
  let admin: SupabaseClient;
  let student: SupabaseClient;
  let userId = "";
  // q[0] missed two days ago · q[1] missed today · q[2] never missed · q[3] an old point
  let q: string[] = [];
  const now = new Date();

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const { data: created, error } = await admin.auth.admin.createUser({ email: EMAIL, password: PASSWORD, email_confirm: true });
    if (error || !created.user) throw new Error(`create user: ${error?.message}`);
    userId = created.user.id;

    const { data: qs, error: qErr } = await admin.from("questions").select("id").eq("visibility", "PUBLIC").limit(4);
    if (qErr || !qs || qs.length < 4) throw new Error(`need 4 PUBLIC questions in the test db: ${qErr?.message}`);
    q = qs.map((r) => r.id as string);

    const miss = (questionId: string, at: Date) => ({
      user_id: userId,
      kind: "answer_wrong",
      ref_id: questionId,
      ref_kind: "question",
      created_at: at.toISOString(),
    });
    const { error: aErr } = await admin
      .from("user_activity")
      .insert([miss(q[0], new Date(now.getTime() - 2 * DAY)), miss(q[1], now)]);
    if (aErr) throw new Error(`seed misses: ${aErr.message}`);

    student = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: false },
    });
    await mustSignIn("fix-points student", student, { email: EMAIL, password: PASSWORD });
  });

  afterAll(async () => {
    if (userId) await admin.auth.admin.deleteUser(userId); // cascades fix_points, entitlements, activity
  });

  it("pays only for a question missed before today", async () => {
    const earned = await awardFixPoints(admin, { userId, questionIds: [q[0], q[1], q[2]], source: "drill", now });
    expect(earned).toEqual([q[0]]);
  });

  it("pays once per question", async () => {
    const again = await awardFixPoints(admin, { userId, questionIds: [q[0]], source: "bank", now });
    expect(again).toEqual([]);
    const { count } = await admin.from("fix_points").select("question_id", { count: "exact", head: true }).eq("user_id", userId);
    expect(count).toBe(1);
  });

  it("counts only the last 30 days", async () => {
    const { error } = await admin
      .from("fix_points")
      .insert({ user_id: userId, question_id: q[3], source: "drill", earned_at: new Date(now.getTime() - 40 * DAY).toISOString() });
    if (error) throw new Error(error.message);
    const bal = await readFixPoints(admin, userId, now);
    expect(bal).toMatchObject({ points: 1, pct: 1 });
    // The oldest point IN the window dates the run-out, never the 40-day-old one.
    expect(bal.oldestAt).not.toBeNull();
    expect(new Date(bal.oldestAt!).getTime()).toBeGreaterThan(now.getTime() - 30 * DAY);
  });

  it("lets the student read their own points and write none", async () => {
    const { data, error } = await student.from("fix_points").select("question_id");
    expect(error).toBeNull();
    expect((data ?? []).length).toBe(2);
    const { error: insErr } = await student.from("fix_points").insert({ user_id: userId, question_id: q[2], source: "drill" });
    expect(insErr).not.toBeNull();
    const { count } = await admin.from("fix_points").select("question_id", { count: "exact", head: true }).eq("user_id", userId);
    expect(count).toBe(2);
  });

  it("keeps the cross-student readout to the service role", async () => {
    const args = { p_since: new Date(now.getTime() - 30 * DAY).toISOString(), p_until: now.toISOString() };
    const { error: studentErr } = await student.rpc("fix_points_readout", args);
    expect(studentErr).not.toBeNull();
    const { data, error } = await admin.rpc("fix_points_readout", args);
    expect(error).toBeNull();
    expect((data as unknown[]).length).toBe(1);
  });

  it("starts again at a purchase", async () => {
    const { error } = await admin.from("entitlements").insert({
      user_id: userId,
      scope: "mocks",
      source: "razorpay",
      status: "active",
      expires_at: new Date(now.getTime() + 180 * DAY).toISOString(),
      provider_ref: `pay_fixpoints_${RUN_ID}`,
      amount_paise: 49900,
      currency: "INR",
    });
    if (error) throw new Error(error.message);
    expect(await readFixPoints(admin, userId, new Date(now.getTime() + 1000))).toEqual({ points: 0, pct: 0, oldestAt: null });
  });
});
