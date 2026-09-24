/**
 * RLS tests for mock_assignments (migration 0115) — ENGAGEMENT_SPEC.md C1.
 *
 * The properties the design rests on:
 *
 *   1. A student reads the assignments of batches they are ENROLLED in, and
 *      nothing else — an assignment names a cohort.
 *   2. A student cannot write one (no student INSERT path at all).
 *   3. A teacher writes only to batches in their own branch (or that they
 *      created); another branch's teacher is refused by the database, not by
 *      the route. An org admin reaches every batch in the org.
 *
 * Fixture shape follows tests/batch-enrollments-rls.test.ts.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { createBranch } from "@/lib/branches/admin";
import { createBatch } from "@/lib/batches/admin";
import { setMemberBranches } from "@/lib/members/admin";
import { mustSignIn } from "./helpers/fixture";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "mock-assign-rls-pw-1234";
const RUN_ID = randomUUID().slice(0, 8);
const ADMIN_EMAIL = `ma-rls-admin-${RUN_ID}@test.local`;
const TX_EMAIL = `ma-rls-tx-${RUN_ID}@test.local`;
const TY_EMAIL = `ma-rls-ty-${RUN_ID}@test.local`;
const SAM_EMAIL = `ma-rls-sam-${RUN_ID}@test.local`;
const NIA_EMAIL = `ma-rls-nia-${RUN_ID}@test.local`;
const ORG_NAME = `MockAssign RLS Org ${RUN_ID}`;
const DUE = new Date(Date.now() + 3 * 86_400_000).toISOString();

describe.skipIf(!HAS_ENV)("mock_assignments RLS (migration 0115)", () => {
  let admin: SupabaseClient;
  let adminClient: SupabaseClient;
  let teacherX: SupabaseClient;
  let teacherY: SupabaseClient;
  let samClient: SupabaseClient;
  let niaClient: SupabaseClient;
  let orgId: string;
  let adminId: string, txId: string, tyId: string, samId: string, niaId: string;
  let batchX: string;
  let mockId: string;
  let assignmentId: string;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });

    const mkUser = async (email: string) => {
      const { data } = await admin.auth.admin.createUser({ email, password: PASSWORD, email_confirm: true });
      return data.user!.id;
    };
    [adminId, txId, tyId, samId, niaId] = await Promise.all(
      [ADMIN_EMAIL, TX_EMAIL, TY_EMAIL, SAM_EMAIL, NIA_EMAIL].map(mkUser)
    );

    const { data: org } = await admin.from("organizations").insert({ name: ORG_NAME }).select("id").single();
    orgId = org!.id;
    await admin.from("org_members").insert([
      { user_id: adminId, org_id: orgId, role: "ADMIN" },
      { user_id: txId, org_id: orgId, role: "TEACHER" },
      { user_id: tyId, org_id: orgId, role: "TEACHER" },
    ]);

    const signIn = async (email: string) => {
      const c = createClient(url, anon, { auth: { persistSession: false } });
      await mustSignIn(email, c, { email, password: PASSWORD });
      return c;
    };
    [adminClient, teacherX, teacherY, samClient, niaClient] = await Promise.all(
      [ADMIN_EMAIL, TX_EMAIL, TY_EMAIL, SAM_EMAIL, NIA_EMAIL].map(signIn)
    );

    const branchX = await createBranch(adminClient, { orgId, createdBy: adminId, fields: { name: `X ${RUN_ID}` } });
    const branchY = await createBranch(adminClient, { orgId, createdBy: adminId, fields: { name: `Y ${RUN_ID}` } });
    await setMemberBranches(orgId, txId, [branchX]);
    await setMemberBranches(orgId, tyId, [branchY]);

    batchX = await createBatch(adminClient, {
      orgId,
      createdBy: adminId,
      fields: { name: `Morning ${RUN_ID}`, branchId: branchX, examId: null },
    });

    // Sam is enrolled in batch X; Nia is enrolled nowhere.
    await admin.from("batch_enrollments").insert({ batch_id: batchX, user_id: samId });

    const { data: exam } = await admin.from("exams").select("id").order("name").limit(1).single();
    const { data: q } = await admin
      .from("questions")
      .select("id")
      .eq("visibility", "PUBLIC")
      .order("created_at", { ascending: true })
      .limit(1)
      .single();
    const { data: mock } = await admin
      .from("mock_tests")
      .insert({
        id: randomUUID(),
        slug: `mock-assign-rls-${RUN_ID}`,
        exam_id: exam!.id,
        paper_code: "maths",
        pyq_year: 2099,
        title: `MockAssign RLS ${RUN_ID}`,
        duration_secs: 9000,
        marking: { correct: 2.5, wrong: -0.83 },
        sections: [{ key: "mathematics", label: "Mathematics", count: 1 }],
        questions: [{ position: 1, questionId: q!.id, sectionKey: "mathematics", marks: 2.5, negMarks: -0.83 }],
        total_questions: 1,
        total_marks: 300,
        status: "published",
      })
      .select("id")
      .single();
    mockId = mock!.id;
  });

  afterAll(async () => {
    // mock_tests is org-less: delete it explicitly (cascades the assignment).
    if (mockId) await admin.from("mock_tests").delete().eq("id", mockId);
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    for (const id of [adminId, txId, tyId, samId, niaId]) {
      if (id) await admin.auth.admin.deleteUser(id);
    }
  });

  it("a teacher of the batch's branch can assign", async () => {
    const { data, error } = await teacherX
      .from("mock_assignments")
      .insert({ batch_id: batchX, mock_id: mockId, due_at: DUE, assigned_by: txId })
      .select("id")
      .single();
    expect(error).toBeNull();
    assignmentId = data!.id as string;
  });

  it("a teacher of another branch cannot assign to it", async () => {
    // A second mock is needed because (batch, mock) is unique — otherwise the
    // insert dies on the constraint and never reaches RLS.
    const { data: exam } = await admin.from("exams").select("id").order("name").limit(1).single();
    const { data: other } = await admin
      .from("mock_tests")
      .insert({
        id: randomUUID(),
        slug: `mock-assign-rls-y-${RUN_ID}`,
        exam_id: exam!.id,
        paper_code: "maths",
        pyq_year: 2099,
        title: `MockAssign RLS Y ${RUN_ID}`,
        duration_secs: 9000,
        marking: { correct: 2.5, wrong: -0.83 },
        sections: [],
        questions: [],
        total_questions: 0,
        total_marks: 0,
        status: "published",
      })
      .select("id")
      .single();
    try {
      const { error } = await teacherY
        .from("mock_assignments")
        .insert({ batch_id: batchX, mock_id: other!.id, due_at: DUE, assigned_by: tyId });
      expect(error).not.toBeNull();
      const { count } = await admin
        .from("mock_assignments")
        .select("id", { count: "exact", head: true })
        .eq("batch_id", batchX)
        .eq("mock_id", other!.id);
      expect(count).toBe(0);
    } finally {
      await admin.from("mock_tests").delete().eq("id", other!.id);
    }
  });

  it("an enrolled student reads it; an unenrolled student does not", async () => {
    const { data: sam } = await samClient.from("mock_assignments").select("id").eq("batch_id", batchX);
    expect(sam?.map((r) => r.id)).toEqual([assignmentId]);
    const { data: nia } = await niaClient.from("mock_assignments").select("id").eq("batch_id", batchX);
    expect(nia).toEqual([]);
  });

  it("a student cannot write an assignment, even to their own batch", async () => {
    const { error } = await samClient
      .from("mock_assignments")
      .update({ due_at: new Date(Date.now() + 30 * 86_400_000).toISOString() })
      .eq("id", assignmentId)
      .select("id");
    // RLS on UPDATE filters the row out rather than erroring: prove the value
    // did not change.
    void error;
    const { data } = await admin.from("mock_assignments").select("due_at").eq("id", assignmentId).single();
    // Postgres renders the offset as +00:00, JS as Z: compare instants.
    expect(Date.parse(data!.due_at as string)).toBe(Date.parse(DUE));
  });

  it("the other branch's teacher cannot read or delete it; the org admin can", async () => {
    const { data: ty } = await teacherY.from("mock_assignments").select("id").eq("id", assignmentId);
    expect(ty).toEqual([]);
    await teacherY.from("mock_assignments").delete().eq("id", assignmentId);
    const { count: still } = await admin
      .from("mock_assignments")
      .select("id", { count: "exact", head: true })
      .eq("id", assignmentId);
    expect(still).toBe(1);

    const { data: ad } = await adminClient.from("mock_assignments").select("id").eq("id", assignmentId);
    expect(ad?.map((r) => r.id)).toEqual([assignmentId]);
    const { error } = await adminClient.from("mock_assignments").delete().eq("id", assignmentId);
    expect(error).toBeNull();
    const { count: gone } = await admin
      .from("mock_assignments")
      .select("id", { count: "exact", head: true })
      .eq("id", assignmentId);
    expect(gone).toBe(0);
  });
});
