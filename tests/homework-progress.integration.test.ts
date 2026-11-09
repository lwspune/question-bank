/**
 * A student's homework progress read from the TEST project (2026-11-05): the
 * plan's items with each question's format, and the student's own activity
 * rows, both through the student's JWT, so RLS is what it is in the browser.
 *
 * Day 1 = a written question + an MCQ, day 2 = an MCQ. The test project holds
 * no written questions, so it inserts one copied from a PUBLIC row (the
 * self-mark test's pattern) and deletes it after.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { mustSignIn } from "./helpers/fixture";
import { recordSelfMark } from "@/lib/questions/selfMarkService";
import { logActivityBatch } from "@/lib/activity/service";
import { loadHomeworkDayMarks, loadHomeworkProgress } from "@/lib/homework/progressService";
import { testRunId } from "./helpers/runId";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = testRunId();
const EMAIL = `hw_progress_${STAMP}@test.local`;
const PASSWORD = `Pw-${STAMP}-hw`;

describe.skipIf(!HAS_ENV)("homework progress", () => {
  let admin: SupabaseClient;
  let client: SupabaseClient;
  let userId = "";
  const planId = randomUUID();
  const slug = `hw-progress-test-${planId.slice(0, 8)}`;
  let written = "";
  let mcqA = "";
  let mcqB = "";

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    const created = await admin.auth.admin.createUser({ email: EMAIL, password: PASSWORD, email_confirm: true });
    if (created.error) throw new Error(created.error.message);
    userId = created.data.user!.id;
    client = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    await mustSignIn("homework progress student", client, { email: EMAIL, password: PASSWORD });

    const { data: seed, error } = await admin
      .from("questions")
      .select("*")
      .eq("visibility", "PUBLIC")
      .eq("question_format", "mcq")
      .limit(50);
    if (error) throw new Error(`seed: ${error.message}`);
    const rows = (seed ?? []) as Record<string, unknown>[];
    const first = rows[0];
    const same = rows.filter((r) => r.exam_id === first.exam_id && r.subject_id === first.subject_id);
    if (same.length < 2) throw new Error("need 2 PUBLIC MCQs of one exam and subject in the test project");
    mcqA = same[0].id as string;
    mcqB = same[1].id as string;

    const copy = { ...first };
    for (const k of ["id", "created_at", "updated_at", "search_vector"]) delete copy[k];
    const { data: w, error: wErr } = await admin
      .from("questions")
      .insert({
        ...copy,
        text: `Explain the homework progress test idea. (${STAMP})`,
        question_format: "subjective",
        solution: `Model answer (${STAMP}).`,
        content_hash: `hw-progress-test-${STAMP}`,
      })
      .select("id")
      .single();
    if (wErr) throw new Error(`written fixture: ${wErr.message}`);
    written = w!.id as string;

    const { error: pErr } = await admin.from("homework_plans").insert({
      id: planId,
      slug,
      exam_id: first.exam_id,
      subject_id: first.subject_id,
      title: "Progress fixture",
      per_day: 2,
      published: true,
    });
    if (pErr) throw new Error(`plan: ${pErr.message}`);
    const item = (day: number, position: number, questionId: string) => ({ day, position, questionId, part: 1, note: "Asked 2 times: Mar 2016, Mar 2019" });
    const { error: iErr } = await admin.rpc("homework_replace_items", {
      p_plan_id: planId,
      p_items: [item(1, 1, written), item(1, 2, mcqA), item(2, 1, mcqB)],
    });
    if (iErr) throw new Error(`items: ${iErr.message}`);
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("homework_plans").delete().eq("id", planId);
    if (userId) {
      await admin.from("user_activity").delete().eq("user_id", userId);
      await admin.auth.admin.deleteUser(userId);
    }
    if (written) await admin.from("questions").delete().eq("id", written);
  });

  it("an unknown plan is null", async () => {
    expect(await loadHomeworkProgress(client, userId, `no-such-plan-${STAMP}`)).toBeNull();
  });

  it("nothing marked yet", async () => {
    const out = await loadHomeworkProgress(client, userId, slug);
    expect(out?.progress).toMatchObject({ started: false, doneDays: 0, nextDay: 1, toReview: 0 });
    expect(out?.progress.days.map((d) => d.total)).toEqual([2, 1]);
  });

  it("reads a written self-mark and an MCQ reveal through RLS", async () => {
    await recordSelfMark(client, userId, { questionId: written, mark: "review", surface: "board" });
    await logActivityBatch(client, userId, [
      { kind: "question_practiced", refId: mcqA, refKind: "question", metadata: { surface: "board" } },
    ]);

    const out = await loadHomeworkProgress(client, userId, slug);
    expect(out?.progress).toMatchObject({ started: true, doneDays: 1, nextDay: 2, toReview: 1 });
    expect(out?.progress.days[0]).toMatchObject({ day: 1, done: 2, complete: true, toReview: 1 });
    expect(await loadHomeworkDayMarks(client, userId, slug, 1)).toEqual({
      marks: { [written]: "review", [mcqA]: "answered" },
      due: [written],
    });
    expect(await loadHomeworkDayMarks(client, userId, slug, 2)).toEqual({ marks: { [mcqB]: null }, due: [] });
  });

  it("a day the plan does not have, or an unknown plan, is null", async () => {
    expect(await loadHomeworkDayMarks(client, userId, slug, 9)).toBeNull();
    expect(await loadHomeworkDayMarks(client, userId, `no-such-plan-${STAMP}`, 1)).toBeNull();
  });
});
