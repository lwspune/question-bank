/**
 * Verifies the tightened RLS from migration 0004:
 * a TEACHER (non-admin) cannot insert questions, options, or upload_jobs
 * even within their own org. Admins can.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "rls-teacher-test-pw-1234";
const RUN_ID = randomUUID().slice(0, 8);
const TEACHER_EMAIL = `rls-teacher-${RUN_ID}@test.local`;
const ADMIN_EMAIL = `rls-admin-${RUN_ID}@test.local`;
const ORG_NAME = `RLS Teacher Org ${RUN_ID}`;

describe.skipIf(!HAS_ENV)("RLS — only ADMIN can write", () => {
  let admin: SupabaseClient;
  let teacherClient: SupabaseClient;
  let adminClient: SupabaseClient;
  let teacherUserId: string;
  let adminUserId: string;
  let orgId: string;
  let examId: string;
  let subjectId: string;
  let chapterId: string;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    admin = createClient(url, serviceRole, { auth: { persistSession: false } });

    const { data: t } = await admin.auth.admin.createUser({
      email: TEACHER_EMAIL,
      password: PASSWORD,
      email_confirm: true,
    });
    teacherUserId = t.user!.id;

    const { data: a } = await admin.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: PASSWORD,
      email_confirm: true,
    });
    adminUserId = a.user!.id;

    const { data: org } = await admin
      .from("organizations")
      .insert({ name: ORG_NAME })
      .select("id")
      .single();
    orgId = org!.id;

    await admin.from("org_members").insert([
      { org_id: orgId, user_id: teacherUserId, role: "TEACHER" },
      { org_id: orgId, user_id: adminUserId, role: "ADMIN" },
    ]);

    const { data: exam } = await admin
      .from("exams")
      .select("id")
      .limit(1)
      .single();
    examId = exam!.id;
    const { data: subject } = await admin
      .from("subjects")
      .select("id")
      .eq("exam_id", examId)
      .limit(1)
      .single();
    subjectId = subject!.id;
    const { data: chapter } = await admin
      .from("chapters")
      .select("id")
      .eq("subject_id", subjectId)
      .limit(1)
      .single();
    chapterId = chapter!.id;

    teacherClient = createClient(url, anon, { auth: { persistSession: false } });
    adminClient = createClient(url, anon, { auth: { persistSession: false } });
    await teacherClient.auth.signInWithPassword({ email: TEACHER_EMAIL, password: PASSWORD });
    await adminClient.auth.signInWithPassword({ email: ADMIN_EMAIL, password: PASSWORD });
  });

  afterAll(async () => {
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    if (teacherUserId) await admin.auth.admin.deleteUser(teacherUserId);
    if (adminUserId) await admin.auth.admin.deleteUser(adminUserId);
  });

  it("TEACHER cannot insert a question into their own org", async () => {
    const { data, error } = await teacherClient
      .from("questions")
      .insert({
        org_id: orgId,
        exam_id: examId,
        subject_id: subjectId,
        chapter_id: chapterId,
        text: `teacher attempt ${RUN_ID}`,
        difficulty: "EASY",
        content_hash: `teacher-hash-${RUN_ID}`,
        created_by: teacherUserId,
      })
      .select("id");
    expect(data == null || data.length === 0).toBe(true);
    expect(error).not.toBeNull();
  });

  it("TEACHER cannot insert an upload_job", async () => {
    const { data, error } = await teacherClient
      .from("upload_jobs")
      .insert({
        org_id: orgId,
        filename: "evil.xlsx",
        created_by: teacherUserId,
      })
      .select("id");
    expect(data == null || data.length === 0).toBe(true);
    expect(error).not.toBeNull();
  });

  // Content add/edit is superadmin-only (migration 0056): org ADMINs can no
  // longer insert questions or auto-create taxonomy — that moved to the
  // service-role ingestion / superadmin console.
  it("ADMIN cannot insert a question (content is superadmin-only)", async () => {
    const { data, error } = await adminClient
      .from("questions")
      .insert({
        org_id: orgId,
        exam_id: examId,
        subject_id: subjectId,
        chapter_id: chapterId,
        text: `admin attempt ${RUN_ID}`,
        difficulty: "EASY",
        content_hash: `admin-hash-${RUN_ID}`,
        created_by: adminUserId,
      })
      .select("id");
    expect(error !== null || (data?.length ?? 0) === 0).toBe(true);
  });

  it("ADMIN cannot auto-create a chapter (taxonomy is superadmin-only)", async () => {
    const { data, error } = await adminClient
      .from("chapters")
      .insert({
        subject_id: subjectId,
        name: `__RLS_AUTO_CHAPTER_${RUN_ID}__`,
        order_index: 999,
      })
      .select("id");
    expect(error !== null || (data?.length ?? 0) === 0).toBe(true);
  });

  it("TEACHER cannot auto-create a chapter", async () => {
    const { data, error } = await teacherClient
      .from("chapters")
      .insert({
        subject_id: subjectId,
        name: `__RLS_TEACHER_CHAPTER_${RUN_ID}__`,
        order_index: 998,
      })
      .select("id");
    expect(data == null || data.length === 0).toBe(true);
    expect(error).not.toBeNull();
  });
});
