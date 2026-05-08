/**
 * Integration test that proves cross-org isolation via Postgres RLS.
 * Requires DATABASE_URL + SUPABASE_SERVICE_ROLE_KEY + NEXT_PUBLIC_SUPABASE_ANON_KEY.
 * Skipped automatically until those are present.
 *
 * Strategy:
 *   1. Service-role client creates two orgs and two real auth.users (alice/bob),
 *      each member of a different org.
 *   2. Service-role client inserts one question into Org A.
 *   3. Alice (signed-in anon-key client) sees the question.
 *   4. Bob (signed-in anon-key client) sees zero questions.
 *   5. Bob cannot insert a question with org_id = Org A.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "rls-test-password-1234";
const RUN_ID = randomUUID().slice(0, 8);
const ALICE_EMAIL = `rls-alice-${RUN_ID}@test.local`;
const BOB_EMAIL = `rls-bob-${RUN_ID}@test.local`;
const ORG_A_NAME = `RLS Org A ${RUN_ID}`;
const ORG_B_NAME = `RLS Org B ${RUN_ID}`;

describe.skipIf(!HAS_ENV)("RLS — cross-org question isolation", () => {
  let admin: SupabaseClient;
  let aliceClient: SupabaseClient;
  let bobClient: SupabaseClient;
  let aliceUserId: string;
  let bobUserId: string;
  let orgAId: string;
  let orgBId: string;
  let examId: string;
  let subjectId: string;
  let chapterId: string;
  let questionAId: string;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    admin = createClient(url, serviceRole, { auth: { persistSession: false } });

    const { data: alice, error: aliceErr } = await admin.auth.admin.createUser({
      email: ALICE_EMAIL,
      password: PASSWORD,
      email_confirm: true,
    });
    if (aliceErr) throw aliceErr;
    aliceUserId = alice.user!.id;

    const { data: bob, error: bobErr } = await admin.auth.admin.createUser({
      email: BOB_EMAIL,
      password: PASSWORD,
      email_confirm: true,
    });
    if (bobErr) throw bobErr;
    bobUserId = bob.user!.id;

    const { data: orgA, error: orgAErr } = await admin
      .from("organizations")
      .insert({ name: ORG_A_NAME })
      .select("id")
      .single();
    if (orgAErr) throw orgAErr;
    orgAId = orgA.id;

    const { data: orgB, error: orgBErr } = await admin
      .from("organizations")
      .insert({ name: ORG_B_NAME })
      .select("id")
      .single();
    if (orgBErr) throw orgBErr;
    orgBId = orgB.id;

    await admin.from("org_members").insert([
      { org_id: orgAId, user_id: aliceUserId, role: "ADMIN" },
      { org_id: orgBId, user_id: bobUserId, role: "ADMIN" },
    ]);

    // Use existing taxonomy if present, else insert a test row.
    const { data: existingExam } = await admin
      .from("exams")
      .select("id")
      .limit(1)
      .maybeSingle();
    if (existingExam) {
      examId = existingExam.id;
      const { data: existingSubject } = await admin
        .from("subjects")
        .select("id")
        .eq("exam_id", examId)
        .limit(1)
        .maybeSingle();
      subjectId = existingSubject!.id;
      const { data: existingChapter } = await admin
        .from("chapters")
        .select("id")
        .eq("subject_id", subjectId)
        .limit(1)
        .maybeSingle();
      chapterId = existingChapter!.id;
    } else {
      const { data: e } = await admin
        .from("exams")
        .insert({ name: `__RLS_EXAM__${RUN_ID}` })
        .select("id")
        .single();
      examId = e!.id;
      const { data: s } = await admin
        .from("subjects")
        .insert({ exam_id: examId, name: "__RLS_SUBJECT__" })
        .select("id")
        .single();
      subjectId = s!.id;
      const { data: c } = await admin
        .from("chapters")
        .insert({ subject_id: subjectId, name: "__RLS_CHAPTER__", order_index: 0 })
        .select("id")
        .single();
      chapterId = c!.id;
    }

    const { data: q, error: qErr } = await admin
      .from("questions")
      .insert({
        org_id: orgAId,
        exam_id: examId,
        subject_id: subjectId,
        chapter_id: chapterId,
        text: `RLS test question ${RUN_ID}`,
        difficulty: "EASY",
        content_hash: `rls-hash-${RUN_ID}`,
        created_by: aliceUserId,
      })
      .select("id")
      .single();
    if (qErr) throw qErr;
    questionAId = q.id;

    aliceClient = createClient(url, anon, { auth: { persistSession: false } });
    bobClient = createClient(url, anon, { auth: { persistSession: false } });
    await aliceClient.auth.signInWithPassword({ email: ALICE_EMAIL, password: PASSWORD });
    await bobClient.auth.signInWithPassword({ email: BOB_EMAIL, password: PASSWORD });
  });

  afterAll(async () => {
    if (questionAId) await admin.from("questions").delete().eq("id", questionAId);
    if (orgAId) await admin.from("organizations").delete().eq("id", orgAId);
    if (orgBId) await admin.from("organizations").delete().eq("id", orgBId);
    if (aliceUserId) await admin.auth.admin.deleteUser(aliceUserId);
    if (bobUserId) await admin.auth.admin.deleteUser(bobUserId);
  });

  it("alice (org A) sees the org A question", async () => {
    const { data, error } = await aliceClient
      .from("questions")
      .select("id")
      .eq("id", questionAId);
    expect(error).toBeNull();
    expect(data?.length).toBe(1);
  });

  it("bob (org B) does NOT see the org A question", async () => {
    const { data, error } = await bobClient
      .from("questions")
      .select("id")
      .eq("id", questionAId);
    expect(error).toBeNull();
    expect(data?.length).toBe(0);
  });

  it("bob cannot insert a question into org A", async () => {
    const { data, error } = await bobClient
      .from("questions")
      .insert({
        org_id: orgAId, // crossing the boundary
        exam_id: examId,
        subject_id: subjectId,
        chapter_id: chapterId,
        text: "evil cross-org insert",
        difficulty: "EASY",
        content_hash: `rls-evil-${RUN_ID}`,
        created_by: bobUserId,
      })
      .select("id");
    expect(data == null || data.length === 0).toBe(true);
    expect(error).not.toBeNull();
  });

  it("anonymous (no JWT) cannot read questions", async () => {
    const anonClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } }
    );
    const { data } = await anonClient.from("questions").select("id").limit(5);
    expect(data?.length ?? 0).toBe(0);
  });
});
