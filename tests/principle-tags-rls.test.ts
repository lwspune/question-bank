/**
 * RLS smoke test for question_principle_tags (migration 0023).
 *
 * Verifies:
 *   - anon CAN read tags on PUBLIC questions
 *   - anon CANNOT read tags on PRIVATE questions
 *   - cross-org TEACHER reads PUBLIC tags but NOT another org's PRIVATE tags
 *   - same-org ADMIN reads BOTH PUBLIC + own-org PRIVATE
 *   - same-org TEACHER (non-admin) CANNOT write tags
 *   - cross-org ADMIN CANNOT write tags on another org's question
 *   - same-org ADMIN CAN insert + delete tags on own org's question
 *
 * Mirror of tests/concept-tags-rls.test.ts for the question_principle_tags table.
 * Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "ptags-rls-test-1234";
const RUN_ID = randomUUID().slice(0, 8);
const ADMIN_A_EMAIL = `ptags-admin-a-${RUN_ID}@test.local`;
const TEACHER_A_EMAIL = `ptags-teacher-a-${RUN_ID}@test.local`;
const ADMIN_B_EMAIL = `ptags-admin-b-${RUN_ID}@test.local`;
const ORG_A_NAME = `PTags Org A ${RUN_ID}`;
const ORG_B_NAME = `PTags Org B ${RUN_ID}`;

describe.skipIf(!HAS_ENV)("question_principle_tags RLS", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  let adminAClient: SupabaseClient;
  let teacherAClient: SupabaseClient;
  let adminBClient: SupabaseClient;
  let adminAId: string;
  let teacherAId: string;
  let adminBId: string;
  let orgAId: string;
  let orgBId: string;
  let publicQuestionId: string;
  let privateQuestionId: string;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    admin = createClient(url, serviceRole, { auth: { persistSession: false } });

    const [{ data: adminA }, { data: teacherA }, { data: adminB }] = await Promise.all([
      admin.auth.admin.createUser({ email: ADMIN_A_EMAIL, password: PASSWORD, email_confirm: true }),
      admin.auth.admin.createUser({ email: TEACHER_A_EMAIL, password: PASSWORD, email_confirm: true }),
      admin.auth.admin.createUser({ email: ADMIN_B_EMAIL, password: PASSWORD, email_confirm: true }),
    ]);
    adminAId = adminA.user!.id;
    teacherAId = teacherA.user!.id;
    adminBId = adminB.user!.id;

    const [{ data: orgA }, { data: orgB }] = await Promise.all([
      admin.from("organizations").insert({ name: ORG_A_NAME }).select("id").single(),
      admin.from("organizations").insert({ name: ORG_B_NAME }).select("id").single(),
    ]);
    orgAId = orgA!.id;
    orgBId = orgB!.id;

    await admin.from("org_members").insert([
      { org_id: orgAId, user_id: adminAId, role: "ADMIN" },
      { org_id: orgAId, user_id: teacherAId, role: "TEACHER" },
      { org_id: orgBId, user_id: adminBId, role: "ADMIN" },
    ]);

    // Borrow existing taxonomy
    const { data: ex } = await admin.from("exams").select("id").limit(1).single();
    const { data: sb } = await admin.from("subjects").select("id").eq("exam_id", ex!.id).limit(1).single();
    const { data: ch } = await admin.from("chapters").select("id").eq("subject_id", sb!.id).limit(1).single();

    const { data: pub } = await admin
      .from("questions")
      .insert({
        org_id: orgAId,
        exam_id: ex!.id,
        subject_id: sb!.id,
        chapter_id: ch!.id,
        text: `ptags-rls PUBLIC ${RUN_ID}`,
        difficulty: "EASY",
        content_hash: `ptags-rls-pub-${RUN_ID}`,
        created_by: adminAId,
        visibility: "PUBLIC",
      })
      .select("id")
      .single();
    publicQuestionId = pub!.id;

    const { data: priv } = await admin
      .from("questions")
      .insert({
        org_id: orgAId,
        exam_id: ex!.id,
        subject_id: sb!.id,
        chapter_id: ch!.id,
        text: `ptags-rls PRIVATE ${RUN_ID}`,
        difficulty: "EASY",
        content_hash: `ptags-rls-priv-${RUN_ID}`,
        created_by: adminAId,
        visibility: "PRIVATE",
      })
      .select("id")
      .single();
    privateQuestionId = priv!.id;

    // Seed tags as service-role (bypasses RLS)
    await admin.from("question_principle_tags").insert([
      {
        question_id: publicQuestionId,
        principle_slug: `seed-public-${RUN_ID}`,
        tagged_by: adminAId,
      },
      {
        question_id: privateQuestionId,
        principle_slug: `seed-private-${RUN_ID}`,
        tagged_by: adminAId,
      },
    ]);

    anonClient = createClient(url, anon, { auth: { persistSession: false } });
    adminAClient = createClient(url, anon, { auth: { persistSession: false } });
    teacherAClient = createClient(url, anon, { auth: { persistSession: false } });
    adminBClient = createClient(url, anon, { auth: { persistSession: false } });
    await Promise.all([
      adminAClient.auth.signInWithPassword({ email: ADMIN_A_EMAIL, password: PASSWORD }),
      teacherAClient.auth.signInWithPassword({ email: TEACHER_A_EMAIL, password: PASSWORD }),
      adminBClient.auth.signInWithPassword({ email: ADMIN_B_EMAIL, password: PASSWORD }),
    ]);
  });

  afterAll(async () => {
    if (publicQuestionId) await admin.from("questions").delete().eq("id", publicQuestionId);
    if (privateQuestionId) await admin.from("questions").delete().eq("id", privateQuestionId);
    if (orgAId) await admin.from("organizations").delete().eq("id", orgAId);
    if (orgBId) await admin.from("organizations").delete().eq("id", orgBId);
    if (adminAId) await admin.auth.admin.deleteUser(adminAId);
    if (teacherAId) await admin.auth.admin.deleteUser(teacherAId);
    if (adminBId) await admin.auth.admin.deleteUser(adminBId);
  });

  it("anon CAN read tag on a PUBLIC question", async () => {
    const { data, error } = await anonClient
      .from("question_principle_tags")
      .select("principle_slug")
      .eq("question_id", publicQuestionId);
    expect(error).toBeNull();
    expect(data?.length).toBe(1);
    expect(data?.[0].principle_slug).toBe(`seed-public-${RUN_ID}`);
  });

  it("anon CANNOT read tag on a PRIVATE question", async () => {
    const { data, error } = await anonClient
      .from("question_principle_tags")
      .select("principle_slug")
      .eq("question_id", privateQuestionId);
    expect(error).toBeNull();
    expect(data?.length).toBe(0);
  });

  it("cross-org ADMIN reads PUBLIC tags but NOT another org's PRIVATE", async () => {
    const { data: pub } = await adminBClient
      .from("question_principle_tags")
      .select("principle_slug")
      .eq("question_id", publicQuestionId);
    expect(pub?.length).toBe(1);

    const { data: priv } = await adminBClient
      .from("question_principle_tags")
      .select("principle_slug")
      .eq("question_id", privateQuestionId);
    expect(priv?.length).toBe(0);
  });

  it("same-org ADMIN reads BOTH PUBLIC + own-org PRIVATE", async () => {
    const { data: pub } = await adminAClient
      .from("question_principle_tags")
      .select("principle_slug")
      .eq("question_id", publicQuestionId);
    expect(pub?.length).toBe(1);

    const { data: priv } = await adminAClient
      .from("question_principle_tags")
      .select("principle_slug")
      .eq("question_id", privateQuestionId);
    expect(priv?.length).toBe(1);
  });

  it("same-org TEACHER (non-admin) CANNOT INSERT a tag", async () => {
    const { error } = await teacherAClient.from("question_principle_tags").insert({
      question_id: publicQuestionId,
      principle_slug: `teacher-attempt-${RUN_ID}`,
    });
    const { data: check } = await admin
      .from("question_principle_tags")
      .select("principle_slug")
      .eq("question_id", publicQuestionId)
      .eq("principle_slug", `teacher-attempt-${RUN_ID}`);
    expect(check?.length).toBe(0);
    expect(error !== null || check?.length === 0).toBe(true);
  });

  it("cross-org ADMIN CANNOT INSERT a tag on another org's question", async () => {
    const { error } = await adminBClient.from("question_principle_tags").insert({
      question_id: publicQuestionId, // belongs to orgA
      principle_slug: `cross-org-${RUN_ID}`,
    });
    const { data: check } = await admin
      .from("question_principle_tags")
      .select("principle_slug")
      .eq("question_id", publicQuestionId)
      .eq("principle_slug", `cross-org-${RUN_ID}`);
    expect(check?.length).toBe(0);
    expect(error !== null || check?.length === 0).toBe(true);
  });

  it("same-org ADMIN CAN INSERT then DELETE a tag on own org's question", async () => {
    const insertRes = await adminAClient.from("question_principle_tags").insert({
      question_id: publicQuestionId,
      principle_slug: `admin-write-${RUN_ID}`,
    });
    expect(insertRes.error).toBeNull();

    const { data: afterInsert } = await admin
      .from("question_principle_tags")
      .select("principle_slug")
      .eq("question_id", publicQuestionId)
      .eq("principle_slug", `admin-write-${RUN_ID}`);
    expect(afterInsert?.length).toBe(1);

    const deleteRes = await adminAClient
      .from("question_principle_tags")
      .delete()
      .eq("question_id", publicQuestionId)
      .eq("principle_slug", `admin-write-${RUN_ID}`);
    expect(deleteRes.error).toBeNull();

    const { data: afterDelete } = await admin
      .from("question_principle_tags")
      .select("principle_slug")
      .eq("question_id", publicQuestionId)
      .eq("principle_slug", `admin-write-${RUN_ID}`);
    expect(afterDelete?.length).toBe(0);
  });
});
