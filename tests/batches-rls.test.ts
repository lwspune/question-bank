/**
 * RLS + data-layer integration tests for cohort batches (migration 0054).
 * Mirrors papers-rls.test.ts: service-role seeds orgs/users/questions, then
 * per-user JWT clients drive the real src/lib/batches + src/lib/papers helpers.
 *
 * Coverage (the security- + behavior-critical paths):
 *   - an org editor can create a batch; it lists in own org
 *   - cross-org READ isolation (org B can't see org A's batch)
 *   - cross-org WRITE isolation (org B can't update org A's batch)
 *   - setPaperBatch rejects linking to another org's batch
 *   - THE FEATURE: getQuestionUsage(..., batchId) is per-batch — a question used
 *     in batch X's paper shows for X, NOT for Y; org-wide (no batchId) sees both
 *   - delete is creator-or-admin only; deleting a batch SET NULLs its papers
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import {
  createBatch,
  updateBatch,
  deleteBatch,
  listBatches,
  setPaperBatch,
} from "@/lib/batches/admin";
import { createPaper, addQuestion, getPaperDetail } from "@/lib/papers/admin";
import { getQuestionUsage } from "@/lib/papers/usage";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "batches-rls-test-pw-1234";
const RUN_ID = randomUUID().slice(0, 8);
const ADMIN_A = `batches-rls-adminA-${RUN_ID}@test.local`;
const TEACHER_A = `batches-rls-teacherA-${RUN_ID}@test.local`;
const TEACHER_A2 = `batches-rls-teacherA2-${RUN_ID}@test.local`;
const TEACHER_B = `batches-rls-teacherB-${RUN_ID}@test.local`;
const ORG_A = `Batches RLS Org A ${RUN_ID}`;
const ORG_B = `Batches RLS Org B ${RUN_ID}`;
const SUBJECT_NAME = `BatchesRLSPhysics_${RUN_ID}`;
const CHAPTER_NAME = `BatchesRLSChapter_${RUN_ID}`;

const FIELDS = (name: string, branch: string | null = null) => ({ name, branch, examId: null });

describe.skipIf(!HAS_ENV)("batches RLS + per-batch usage (migration 0054)", () => {
  let admin: SupabaseClient;
  let adminA: SupabaseClient;
  let teacherA: SupabaseClient;
  let teacherA2: SupabaseClient;
  let teacherB: SupabaseClient;
  let orgAId: string;
  let orgBId: string;
  let adminAId: string;
  let teacherAId: string;
  let teacherA2Id: string;
  let teacherBId: string;
  let q1: string;

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
    adminAId = await mkUser(ADMIN_A);
    teacherAId = await mkUser(TEACHER_A);
    teacherA2Id = await mkUser(TEACHER_A2);
    teacherBId = await mkUser(TEACHER_B);

    const mkOrg = async (name: string) => {
      const { data } = await admin.from("organizations").insert({ name }).select("id").single();
      return data!.id as string;
    };
    orgAId = await mkOrg(ORG_A);
    orgBId = await mkOrg(ORG_B);

    await admin.from("org_members").insert([
      { user_id: adminAId, org_id: orgAId, role: "ADMIN" },
      { user_id: teacherAId, org_id: orgAId, role: "TEACHER" },
      { user_id: teacherA2Id, org_id: orgAId, role: "TEACHER" },
      { user_id: teacherBId, org_id: orgBId, role: "TEACHER" },
    ]);

    const { data: exam } = await admin.from("exams").select("id").eq("name", "MHT-CET").single();
    const examId = exam!.id;
    const { data: subj } = await admin
      .from("subjects")
      .insert({ exam_id: examId, name: SUBJECT_NAME })
      .select("id")
      .single();
    const { data: ch } = await admin
      .from("chapters")
      .insert({ subject_id: subj!.id, name: CHAPTER_NAME, order_index: 0 })
      .select("id")
      .single();
    const { data: qrow } = await admin
      .from("questions")
      .insert({
        org_id: orgAId,
        exam_id: examId,
        subject_id: subj!.id,
        chapter_id: ch!.id,
        text: `Batches RLS question ${RUN_ID}`,
        difficulty: "EASY",
        visibility: "PUBLIC",
        content_hash: `batches-rls-${RUN_ID}-1`,
        created_by: adminAId,
      })
      .select("id")
      .single();
    q1 = qrow!.id as string;

    const signIn = async (email: string) => {
      const c = createClient(url, anon, { auth: { persistSession: false } });
      await c.auth.signInWithPassword({ email, password: PASSWORD });
      return c;
    };
    adminA = await signIn(ADMIN_A);
    teacherA = await signIn(TEACHER_A);
    teacherA2 = await signIn(TEACHER_A2);
    teacherB = await signIn(TEACHER_B);
  });

  afterAll(async () => {
    // Deleting the orgs cascades batches + papers -> paper_questions.
    if (orgAId) await admin.from("organizations").delete().eq("id", orgAId);
    if (orgBId) await admin.from("organizations").delete().eq("id", orgBId);
    await admin.from("subjects").delete().eq("name", SUBJECT_NAME);
    for (const id of [adminAId, teacherAId, teacherA2Id, teacherBId]) {
      if (id) await admin.auth.admin.deleteUser(id);
    }
  });

  let batchX: string;
  let batchY: string;

  it("an org TEACHER can create a batch and see it in own org", async () => {
    batchX = await createBatch(teacherA, {
      orgId: orgAId,
      createdBy: teacherAId,
      fields: FIELDS("Morning", "FC Road"),
    });
    batchY = await createBatch(teacherA, {
      orgId: orgAId,
      createdBy: teacherAId,
      fields: FIELDS("Evening", "FC Road"),
    });
    const list = await listBatches(teacherA);
    expect(list.map((b) => b.id).sort()).toEqual([batchX, batchY].sort());
    expect(list.find((b) => b.id === batchX)?.branch).toBe("FC Road");
  });

  it("org B teacher CANNOT see org A's batches (read isolation)", async () => {
    const list = await listBatches(teacherB);
    expect(list.find((b) => b.id === batchX)).toBeUndefined();
  });

  it("org B teacher CANNOT update org A's batch (write isolation)", async () => {
    await updateBatch(teacherB, batchX, FIELDS("Hacked", "X")); // RLS: 0 rows
    const mine = (await listBatches(teacherA)).find((b) => b.id === batchX);
    expect(mine?.name).toBe("Morning"); // unchanged
  });

  it("setPaperBatch rejects linking a paper to another org's batch", async () => {
    const paperB = await createPaper(teacherB, {
      orgId: orgBId,
      createdBy: teacherBId,
      title: `B paper ${RUN_ID}`,
    });
    await expect(setPaperBatch(teacherB, paperB, batchX)).rejects.toThrow(/not found/i);
  });

  it("getQuestionUsage is PER-BATCH: q used in X shows for X, not Y; org-wide sees both", async () => {
    // Same question q1 lands in a paper for batch X and a paper for batch Y.
    const paperX = await createPaper(teacherA, {
      orgId: orgAId,
      createdBy: teacherAId,
      title: `X paper ${RUN_ID}`,
      batchId: batchX,
    });
    const paperY = await createPaper(teacherA, {
      orgId: orgAId,
      createdBy: teacherAId,
      title: `Y paper ${RUN_ID}`,
      batchId: batchY,
    });
    await addQuestion(teacherA, paperX, q1, { addedBy: teacherAId });
    await addQuestion(teacherA, paperY, q1, { addedBy: teacherAId });

    // Scoped to batch X → only the X paper counts (the per-batch repeat warning).
    const forX = await getQuestionUsage(teacherA, [q1], undefined, batchX);
    expect(forX.get(q1)?.map((r) => r.paperId)).toEqual([paperX]);

    // Scoped to batch Y → only the Y paper. Proves cross-batch reuse is allowed.
    const forY = await getQuestionUsage(teacherA, [q1], undefined, batchY);
    expect(forY.get(q1)?.map((r) => r.paperId)).toEqual([paperY]);

    // Org-wide (no batchId) → both papers.
    const orgWide = await getQuestionUsage(teacherA, [q1]);
    expect(orgWide.get(q1)?.map((r) => r.paperId).sort()).toEqual([paperX, paperY].sort());
  });

  it("delete is creator-or-admin only; deleting a batch un-batches its papers", async () => {
    const paper = await createPaper(teacherA, {
      orgId: orgAId,
      createdBy: teacherAId,
      title: `Del paper ${RUN_ID}`,
      batchId: batchY,
    });
    // A non-creator teacher can't delete teacherA's batch (RLS denies silently).
    await deleteBatch(teacherA2, batchY);
    expect((await listBatches(teacherA)).find((b) => b.id === batchY)).toBeDefined();

    // An admin can — and the linked paper survives with batch_id nulled (SET NULL).
    await deleteBatch(adminA, batchY);
    expect((await listBatches(teacherA)).find((b) => b.id === batchY)).toBeUndefined();
    const detail = await getPaperDetail(teacherA, paper);
    expect(detail?.batchId).toBeNull();
  });
});
