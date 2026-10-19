/**
 * V's week plans in the test database (migration 0169, lib/chat/weekPlanServer.ts):
 *  - a student saves and reads ONLY their own plan, and cannot write one for
 *    someone else; anon reads nothing;
 *  - planning again the same day replaces the plan;
 *  - the database refuses an empty plan or more than 7 tasks;
 *  - ticks are counted from the student's own activity inside the plan's week:
 *    drills, mocks and questions ANSWERED in a planned chapter.
 *
 * Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { mustSignIn } from "./helpers/fixture";
import { loadCurrentPlan, loadPlanActivity, planWindow, saveStudyPlan } from "@/lib/chat/weekPlanServer";
import type { SavedPlan } from "@/lib/chat/weekPlan";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "week-plan-test-1234";
const RUN_ID = randomUUID().slice(0, 8);
const ALICE_EMAIL = `plan-alice-${RUN_ID}@test.local`;
const BOB_EMAIL = `plan-bob-${RUN_ID}@test.local`;

const NOW = new Date("2026-10-20T06:00:00Z");

describe.skipIf(!HAS_ENV)("study plans (0169)", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  let alice: SupabaseClient;
  let bob: SupabaseClient;
  let aliceId: string;
  let bobId: string;
  let questions: { id: string; chapter_id: string }[] = [];

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    const [{ data: a }, { data: b }] = await Promise.all([
      admin.auth.admin.createUser({ email: ALICE_EMAIL, password: PASSWORD, email_confirm: true }),
      admin.auth.admin.createUser({ email: BOB_EMAIL, password: PASSWORD, email_confirm: true }),
    ]);
    aliceId = a.user!.id;
    bobId = b.user!.id;
    anonClient = createClient(url, anon, { auth: { persistSession: false } });
    alice = createClient(url, anon, { auth: { persistSession: false } });
    bob = createClient(url, anon, { auth: { persistSession: false } });
    await mustSignIn(ALICE_EMAIL, alice, { email: ALICE_EMAIL, password: PASSWORD });
    await mustSignIn(BOB_EMAIL, bob, { email: BOB_EMAIL, password: PASSWORD });

    // Six PUBLIC questions of one chapter, for the practice count.
    const { data: one } = await admin.from("questions").select("chapter_id").eq("visibility", "PUBLIC").not("chapter_id", "is", null).limit(1);
    const chapterId = (one?.[0] as { chapter_id: string }).chapter_id;
    const { data: qs } = await admin.from("questions").select("id, chapter_id").eq("visibility", "PUBLIC").eq("chapter_id", chapterId).limit(6);
    questions = (qs ?? []) as { id: string; chapter_id: string }[];
  });

  afterAll(async () => {
    // Deleting the users cascades their plans and activity.
    if (aliceId) await admin.auth.admin.deleteUser(aliceId);
    if (bobId) await admin.auth.admin.deleteUser(bobId);
  });

  const plan = (over: Partial<SavedPlan> = {}): SavedPlan => ({
    startsOn: "2026-10-20",
    examSlug: "nda",
    subject: null,
    items: [
      { day: 0, kind: "chapter", chapterId: questions[0]?.chapter_id ?? "c", chapter: "Some Chapter", path: "/questions/nda/x/y", why: "weak" },
      { day: 2, kind: "drill", path: "/drill", due: 4 },
      { day: 5, kind: "mock", path: "/mock" },
    ],
    ...over,
  });

  it("saves the student's plan and reads it back on any day of its week", async () => {
    await saveStudyPlan(alice, aliceId, plan());
    expect(await loadCurrentPlan(alice, aliceId, NOW)).toMatchObject({ startsOn: "2026-10-20", examSlug: "nda" });
    expect(await loadCurrentPlan(alice, aliceId, new Date("2026-10-26T12:00:00Z"))).not.toBeNull();
    expect(await loadCurrentPlan(alice, aliceId, new Date("2026-10-27T12:00:00Z"))).toBeNull();
  });

  it("replaces the plan when the student plans again the same day", async () => {
    await saveStudyPlan(alice, aliceId, plan({ examSlug: "cds" }));
    const { count } = await admin.from("study_plans").select("id", { count: "exact", head: true }).eq("user_id", aliceId);
    expect(count).toBe(1);
    expect((await loadCurrentPlan(alice, aliceId, NOW))?.examSlug).toBe("cds");
  });

  it("keeps a plan private to its student", async () => {
    expect(await loadCurrentPlan(bob, aliceId, NOW)).toBeNull();
    const { data } = await anonClient.from("study_plans").select("id");
    expect(data ?? []).toHaveLength(0);
    await expect(saveStudyPlan(bob, aliceId, plan({ startsOn: "2026-10-21" }))).rejects.toThrow();
  });

  it("refuses an empty plan or one with more than 7 tasks", async () => {
    await expect(saveStudyPlan(bob, bobId, plan({ items: [] }))).rejects.toThrow();
    const eight = Array.from({ length: 8 }, () => ({ day: 0, kind: "mock" as const, path: "/mock" as const }));
    await expect(saveStudyPlan(bob, bobId, plan({ items: eight }))).rejects.toThrow();
  });

  it("counts drills, mocks and questions answered in a planned chapter inside the week only", async () => {
    expect(questions.length).toBeGreaterThanOrEqual(5);
    const inWeek = new Date(new Date(planWindow(plan()).from).getTime() + 3_600_000).toISOString();
    const before = new Date(new Date(planWindow(plan()).from).getTime() - 3_600_000).toISOString();
    const rows = [
      { user_id: bobId, kind: "drill_completed", metadata: {}, created_at: inWeek },
      { user_id: bobId, kind: "drill_completed", metadata: {}, created_at: before },
      { user_id: bobId, kind: "mock_submitted", metadata: {}, created_at: inWeek },
      // Five answered in the chapter (one twice), one only revealed: 5 distinct answered.
      ...questions.slice(0, 5).map((q) => ({ user_id: bobId, kind: "question_practiced", ref_id: q.id, ref_kind: "question", metadata: { correct: true }, created_at: inWeek })),
      { user_id: bobId, kind: "question_practiced", ref_id: questions[0].id, ref_kind: "question", metadata: { correct: false }, created_at: inWeek },
      ...(questions[5] ? [{ user_id: bobId, kind: "question_practiced", ref_id: questions[5].id, ref_kind: "question", metadata: {}, created_at: inWeek }] : []),
    ];
    const { error } = await admin.from("user_activity").insert(rows);
    expect(error).toBeNull();

    const p = plan({ items: [{ day: 0, kind: "chapter", chapterId: questions[0].chapter_id, chapter: "X", path: "/questions/a/b/c", why: "weak" }] });
    const activity = await loadPlanActivity(bob, bobId, p);
    expect(activity.drills).toBe(1);
    expect(activity.mocks).toBe(1);
    expect(activity.chapterQuestions[questions[0].chapter_id]).toBe(5);
  });
});
