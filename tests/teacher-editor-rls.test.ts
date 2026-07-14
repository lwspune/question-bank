/**
 * RLS tests for the content-editing lockdown (migration 0056).
 *
 * New role model: adding/editing question CONTENT (questions/options/taxonomy)
 * is SUPERADMIN-ONLY. Org ADMINs and TEACHERs can no longer write content
 * (they keep read + paper building, tested elsewhere).
 *
 * Strategy: service-role seeds an org with an ADMIN + a TEACHER + a question,
 * plus a platform SUPERADMIN (platform_admins row). Then per-user JWT clients
 * prove: teacher blocked, admin blocked, superadmin allowed.
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
const ADMIN_EMAIL = `content-rls-admin-${RUN_ID}@test.local`;
const TEACHER_EMAIL = `content-rls-teacher-${RUN_ID}@test.local`;
const SUPER_EMAIL = `content-rls-super-${RUN_ID}@test.local`;
const ORG_NAME = `Content RLS Org ${RUN_ID}`;
const SUBJECT_NAME = `ContentRLSSubject_${RUN_ID}`;
const CHAPTER_NAME = `ContentRLSChapter_${RUN_ID}`;

describe.skipIf(!HAS_ENV)("RLS — content editing is superadmin-only (migration 0056)", () => {
  let admin: SupabaseClient;
  let adminUserClient: SupabaseClient;
  let teacherClient: SupabaseClient;
  let superClient: SupabaseClient;
  let adminUserId: string;
  let teacherUserId: string;
  let superUserId: string;
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

    const mkUser = async (email: string) => {
      const { data } = await admin.auth.admin.createUser({
        email,
        password: PASSWORD,
        email_confirm: true,
      });
      return data.user!.id;
    };
    adminUserId = await mkUser(ADMIN_EMAIL);
    teacherUserId = await mkUser(TEACHER_EMAIL);
    superUserId = await mkUser(SUPER_EMAIL);

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
    // The superadmin is platform staff (no org membership).
    await admin.from("platform_admins").insert({ user_id: superUserId });

    const { data: exam } = await admin.from("exams").select("id").eq("name", "MHT-CET").single();
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

    const { data: q } = await admin
      .from("questions")
      .insert({
        org_id: orgId,
        exam_id: examId,
        subject_id: subjectId,
        chapter_id: chapterId,
        text: "Original question text",
        difficulty: "EASY",
        visibility: "PUBLIC",
        content_hash: `content-rls-${RUN_ID}`,
        created_by: adminUserId,
      })
      .select("id")
      .single();
    questionId = q!.id;

    const signIn = async (email: string) => {
      const c = createClient(url, anon, { auth: { persistSession: false } });
      await c.auth.signInWithPassword({ email, password: PASSWORD });
      return c;
    };
    adminUserClient = await signIn(ADMIN_EMAIL);
    teacherClient = await signIn(TEACHER_EMAIL);
    superClient = await signIn(SUPER_EMAIL);
  });

  afterAll(async () => {
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    if (subjectId) await admin.from("subjects").delete().eq("id", subjectId);
    for (const id of [adminUserId, teacherUserId, superUserId]) {
      if (id) await admin.auth.admin.deleteUser(id); // cascades platform_admins
    }
  });

  const currentText = async () => {
    const { data } = await admin.from("questions").select("text").eq("id", questionId).maybeSingle();
    return data?.text as string | undefined;
  };

  it("TEACHER cannot UPDATE a question (content is superadmin-only)", async () => {
    const { error, data } = await teacherClient
      .from("questions")
      .update({ text: "Edited by teacher" })
      .eq("id", questionId)
      .select("id");
    expect(error !== null || (data?.length ?? 0) === 0).toBe(true);
    expect(await currentText()).toBe("Original question text");
  });

  it("ADMIN cannot UPDATE, INSERT, or DELETE questions (content is superadmin-only)", async () => {
    const { error: upErr, data: upData } = await adminUserClient
      .from("questions")
      .update({ text: "Edited by admin" })
      .eq("id", questionId)
      .select("id");
    expect(upErr !== null || (upData?.length ?? 0) === 0).toBe(true);
    expect(await currentText()).toBe("Original question text");

    const { error: insErr, data: insData } = await adminUserClient
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
      .select("id");
    expect(insErr !== null || (insData?.length ?? 0) === 0).toBe(true);

    const { error: delErr, data: delData } = await adminUserClient
      .from("questions")
      .delete()
      .eq("id", questionId)
      .select("id");
    expect(delErr !== null || (delData?.length ?? 0) === 0).toBe(true);
    expect(await currentText()).toBe("Original question text");
  });

  it("ADMIN cannot auto-create a chapter (taxonomy is superadmin-only)", async () => {
    const { error, data } = await adminUserClient
      .from("chapters")
      .insert({ subject_id: subjectId, name: `AdminForbidden_${RUN_ID}`, order_index: 98 })
      .select("id");
    expect(error !== null || (data?.length ?? 0) === 0).toBe(true);
  });

  it("SUPERADMIN CAN UPDATE a question's content", async () => {
    const { error, data } = await superClient
      .from("questions")
      .update({ text: "Edited by superadmin" })
      .eq("id", questionId)
      .select("id, text");
    expect(error).toBeNull();
    expect(data?.[0]?.text).toBe("Edited by superadmin");
    // restore for determinism
    await admin.from("questions").update({ text: "Original question text" }).eq("id", questionId);
  });
});
