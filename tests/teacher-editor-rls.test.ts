/**
 * RLS smoke tests for migration 0025 (teacher editor role).
 *
 * Strategy mirrors the existing rls.test.ts:
 *   1. Service-role client creates an org, one ADMIN, one TEACHER, and one
 *      question (owned by the org via the admin).
 *   2. TEACHER (signed-in user-session client) UPDATEs the question's text
 *      → succeeds (new "editor update questions" policy).
 *   3. TEACHER INSERTs a new question → fails (insert still admin-only).
 *   4. TEACHER DELETEs the question → fails (delete still admin-only).
 *   5. TEACHER tries to INSERT a chapter → fails (taxonomy auto-create
 *      stays admin-only, migration 0005).
 *   6. ADMIN can still UPDATE, INSERT, DELETE (regression).
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "teacher-rls-test-pw-1234";
const RUN_ID = randomUUID().slice(0, 8);
const ADMIN_EMAIL = `teacher-rls-admin-${RUN_ID}@test.local`;
const TEACHER_EMAIL = `teacher-rls-teacher-${RUN_ID}@test.local`;
const ORG_NAME = `Teacher RLS Org ${RUN_ID}`;
const SUBJECT_NAME = `TeacherRLSSubject_${RUN_ID}`;
const CHAPTER_NAME = `TeacherRLSChapter_${RUN_ID}`;

describe.skipIf(!HAS_ENV)("RLS — teacher editor role (migration 0025)", () => {
  let admin: SupabaseClient;
  let adminUserClient: SupabaseClient;
  let teacherClient: SupabaseClient;
  let adminUserId: string;
  let teacherUserId: string;
  let orgId: string;
  let examId: string;
  let subjectId: string;
  let chapterId: string;
  let questionId: string;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    admin = createClient(url, serviceRole, { auth: { persistSession: false } });

    const { data: adminUser } = await admin.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: PASSWORD,
      email_confirm: true,
    });
    adminUserId = adminUser.user!.id;

    const { data: teacherUser } = await admin.auth.admin.createUser({
      email: TEACHER_EMAIL,
      password: PASSWORD,
      email_confirm: true,
    });
    teacherUserId = teacherUser.user!.id;

    const { data: org } = await admin
      .from("organizations")
      .insert({ name: ORG_NAME })
      .select("id")
      .single();
    orgId = org!.id;

    await admin.from("org_members").insert([
      { user_id: adminUserId, org_id: orgId, role: "ADMIN" },
      { user_id: teacherUserId, org_id: orgId, role: "TEACHER" },
    ]);

    const { data: exam } = await admin
      .from("exams")
      .select("id")
      .eq("name", "MHT-CET")
      .single();
    examId = exam!.id;

    const { data: subj } = await admin
      .from("subjects")
      .insert({ exam_id: examId, name: SUBJECT_NAME })
      .select("id")
      .single();
    subjectId = subj!.id;

    const { data: ch } = await admin
      .from("chapters")
      .insert({ subject_id: subjectId, name: CHAPTER_NAME, order_index: 0 })
      .select("id")
      .single();
    chapterId = ch!.id;

    const contentHash = `teacher-rls-${RUN_ID}`;
    const { data: q } = await admin
      .from("questions")
      .insert({
        org_id: orgId,
        exam_id: examId,
        subject_id: subjectId,
        chapter_id: chapterId,
        text: "Original question text",
        difficulty: "EASY",
        content_hash: contentHash,
        created_by: adminUserId,
      })
      .select("id")
      .single();
    questionId = q!.id;

    // Sign in both users to get user-session clients.
    adminUserClient = createClient(url, anon, { auth: { persistSession: false } });
    await adminUserClient.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password: PASSWORD,
    });

    teacherClient = createClient(url, anon, { auth: { persistSession: false } });
    await teacherClient.auth.signInWithPassword({
      email: TEACHER_EMAIL,
      password: PASSWORD,
    });
  });

  afterAll(async () => {
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    if (subjectId) await admin.from("subjects").delete().eq("id", subjectId);
    if (adminUserId) await admin.auth.admin.deleteUser(adminUserId);
    if (teacherUserId) await admin.auth.admin.deleteUser(teacherUserId);
  });

  it("TEACHER can UPDATE a question's text in own org (new editor policy)", async () => {
    const { error, data } = await teacherClient
      .from("questions")
      .update({ text: "Edited by teacher" })
      .eq("id", questionId)
      .select("id, text");
    expect(error).toBeNull();
    // Returned row confirms the update went through (RLS allowed it).
    expect(data?.[0]?.text).toBe("Edited by teacher");
  });

  it("TEACHER cannot INSERT a new question (insert remains admin-only)", async () => {
    const { error, data } = await teacherClient
      .from("questions")
      .insert({
        org_id: orgId,
        exam_id: examId,
        subject_id: subjectId,
        chapter_id: chapterId,
        text: "Teacher-inserted question",
        difficulty: "EASY",
        content_hash: `teacher-insert-${RUN_ID}`,
        created_by: teacherUserId,
      })
      .select("id");
    // PostgREST returns either an explicit RLS error OR an empty result
    // when the row doesn't satisfy the policy. Either signals denial.
    expect(error !== null || (data?.length ?? 0) === 0).toBe(true);
  });

  it("TEACHER cannot DELETE a question (delete remains admin-only)", async () => {
    const { error, data } = await teacherClient
      .from("questions")
      .delete()
      .eq("id", questionId)
      .select("id");
    // The question should still exist after the attempted delete.
    const { data: stillThere } = await admin
      .from("questions")
      .select("id")
      .eq("id", questionId)
      .maybeSingle();
    expect(stillThere?.id).toBe(questionId);
    expect(error !== null || (data?.length ?? 0) === 0).toBe(true);
  });

  it("TEACHER cannot INSERT a chapter (taxonomy auto-create stays admin-only)", async () => {
    const { error, data } = await teacherClient
      .from("chapters")
      .insert({
        subject_id: subjectId,
        name: `TeacherForbidden_${RUN_ID}`,
        order_index: 99,
      })
      .select("id");
    expect(error !== null || (data?.length ?? 0) === 0).toBe(true);
  });

  it("ADMIN can still UPDATE, INSERT, and DELETE questions (regression)", async () => {
    // UPDATE
    const { error: upErr } = await adminUserClient
      .from("questions")
      .update({ text: "Edited by admin" })
      .eq("id", questionId);
    expect(upErr).toBeNull();

    // INSERT
    const { data: ins, error: insErr } = await adminUserClient
      .from("questions")
      .insert({
        org_id: orgId,
        exam_id: examId,
        subject_id: subjectId,
        chapter_id: chapterId,
        text: "Admin-inserted question",
        difficulty: "EASY",
        content_hash: `admin-insert-${RUN_ID}`,
        created_by: adminUserId,
      })
      .select("id")
      .single();
    expect(insErr).toBeNull();
    expect(ins?.id).toBeTruthy();

    // DELETE the admin-inserted one (leave the original for cleanup)
    const { error: delErr } = await adminUserClient
      .from("questions")
      .delete()
      .eq("id", ins!.id);
    expect(delErr).toBeNull();
  });
});
