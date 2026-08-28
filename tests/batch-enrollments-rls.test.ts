/**
 * RLS tests for the batch roster (migration 0083).
 *
 * Proves the two properties the whole design rests on:
 *
 *   1. batch_enrollments has NO INSERT POLICY. Joining is authorized by an
 *      invite or a join code — something only the server can verify — so a
 *      student must NOT be able to enroll themselves into a batch id they
 *      happen to hold. If these tests ever go green because someone added a
 *      convenience INSERT policy, the code/invite check became bypassable.
 *
 *   2. The additive mock_attempts policy grants a teacher exactly their OWN
 *      enrolled students and nobody else — not an unenrolled student, and not
 *      another branch's student — and narrows nothing for the student.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { createBranch } from "@/lib/branches/admin";
import { createBatch } from "@/lib/batches/admin";
import { setMemberBranches } from "@/lib/members/admin";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "batch-enroll-rls-pw-1234";
const RUN_ID = randomUUID().slice(0, 8);
const ADMIN_EMAIL = `be-rls-admin-${RUN_ID}@test.local`;
const TX_EMAIL = `be-rls-tx-${RUN_ID}@test.local`;
const TY_EMAIL = `be-rls-ty-${RUN_ID}@test.local`;
const SAM_EMAIL = `be-rls-sam-${RUN_ID}@test.local`;
const NIA_EMAIL = `be-rls-nia-${RUN_ID}@test.local`;
const ORG_NAME = `BatchEnroll RLS Org ${RUN_ID}`;
const FUTURE = new Date(Date.now() + 3_600_000).toISOString();

describe.skipIf(!HAS_ENV)("batch roster RLS (migration 0083)", () => {
  let admin: SupabaseClient;
  let adminClient: SupabaseClient;
  let teacherX: SupabaseClient;
  let teacherY: SupabaseClient;
  let samClient: SupabaseClient;
  let orgId: string;
  let adminId: string, txId: string, tyId: string, samId: string, niaId: string;
  let batchX: string;
  let batchZ: string;
  let mockId: string;
  let samAttemptId: string, niaAttemptId: string;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });

    const mkUser = async (email: string) => {
      const { data } = await admin.auth.admin.createUser({
        email,
        password: PASSWORD,
        email_confirm: true,
      });
      return data.user!.id;
    };
    [adminId, txId, tyId, samId, niaId] = await Promise.all(
      [ADMIN_EMAIL, TX_EMAIL, TY_EMAIL, SAM_EMAIL, NIA_EMAIL].map(mkUser)
    );

    const { data: org } = await admin
      .from("organizations")
      .insert({ name: ORG_NAME })
      .select("id")
      .single();
    orgId = org!.id;
    // Sam + Nia get NO org_members row — they are students by construction.
    await admin.from("org_members").insert([
      { user_id: adminId, org_id: orgId, role: "ADMIN" },
      { user_id: txId, org_id: orgId, role: "TEACHER" },
      { user_id: tyId, org_id: orgId, role: "TEACHER" },
    ]);

    const signIn = async (email: string) => {
      const c = createClient(url, anon, { auth: { persistSession: false } });
      await c.auth.signInWithPassword({ email, password: PASSWORD });
      return c;
    };
    [adminClient, teacherX, teacherY, samClient] = await Promise.all(
      [ADMIN_EMAIL, TX_EMAIL, TY_EMAIL, SAM_EMAIL].map(signIn)
    );

    const branchX = await createBranch(adminClient, {
      orgId,
      createdBy: adminId,
      fields: { name: `X ${RUN_ID}` },
    });
    const branchY = await createBranch(adminClient, {
      orgId,
      createdBy: adminId,
      fields: { name: `Y ${RUN_ID}` },
    });
    await setMemberBranches(orgId, txId, [branchX]);
    await setMemberBranches(orgId, tyId, [branchY]);

    batchX = await createBatch(adminClient, {
      orgId,
      createdBy: adminId,
      fields: { name: `Morning ${RUN_ID}`, branchId: branchX, examId: null },
    });

    // batchZ exists so the "cannot self-enroll" tests can target a batch with
    // NO existing row — otherwise they die on the PK and never reach RLS.
    batchZ = await createBatch(adminClient, {
      orgId,
      createdBy: adminId,
      fields: { name: `Empty ${RUN_ID}`, branchId: branchX, examId: null },
    });

    // Sam is enrolled in batch X; Nia is enrolled nowhere. Service-role write —
    // which is the only way in, and the first two tests are what prove that.
    await admin.from("batch_enrollments").insert({ batch_id: batchX, user_id: samId });

    // A mock + one attempt each, so a teacher has something to try to read.
    const { data: exam } = await admin
      .from("exams")
      .select("id")
      .order("name")
      .limit(1)
      .single();
    const { data: q } = await admin
      .from("questions")
      .select("id")
      .eq("visibility", "PUBLIC")
      // Oldest row = a stable seed question, never a parallel run's transient
      // fixture (which its afterAll could delete mid-test).
      .order("created_at", { ascending: true })
      .limit(1)
      .single();
    const { data: mock } = await admin
      .from("mock_tests")
      .insert({
        id: randomUUID(),
        slug: `batch-enroll-rls-${RUN_ID}`,
        exam_id: exam!.id,
        paper_code: "maths",
        pyq_year: 2099,
        title: `BatchEnroll RLS ${RUN_ID}`,
        duration_secs: 9000,
        marking: { correct: 2.5, wrong: -0.83 },
        sections: [{ key: "mathematics", label: "Mathematics", count: 1 }],
        questions: [
          {
            position: 1,
            questionId: q!.id,
            sectionKey: "mathematics",
            marks: 2.5,
            negMarks: -0.83,
          },
        ],
        total_questions: 1,
        total_marks: 300,
        status: "published",
      })
      .select("id")
      .single();
    mockId = mock!.id;

    const mkAttempt = async (userId: string) => {
      const { data } = await admin
        .from("mock_attempts")
        .insert({ mock_id: mockId, user_id: userId, expires_at: FUTURE })
        .select("id")
        .single();
      return data!.id as string;
    };
    samAttemptId = await mkAttempt(samId);
    niaAttemptId = await mkAttempt(niaId);
  });

  afterAll(async () => {
    // mock_tests is an ORG-LESS platform table — the org cascade cannot reach
    // it, which is exactly how the 2026-08-06 fixtures leaked into the live
    // bank. Deleting the mock cascades its attempts.
    if (mockId) await admin.from("mock_tests").delete().eq("id", mockId);
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    for (const id of [adminId, txId, tyId, samId, niaId]) {
      if (id) await admin.auth.admin.deleteUser(id);
    }
  });

  // ── 1. the locked table ────────────────────────────────────────────────────
  //
  // These two MUST target batchZ, which nobody is enrolled in. Aimed at batchX
  // they pass for the wrong reason — Sam is already enrolled there, so the
  // insert dies on the PRIMARY KEY and the assertion never reaches RLS. That
  // false green was demonstrated: with a deliberate `user_id = auth.uid()`
  // INSERT policy added to the test database, the batchX version still passed.
  //
  // Asserting the ROW DOES NOT EXIST afterwards (not merely that an error came
  // back) is what makes these bypass-proof: any constraint can produce an
  // error, but only a working policy keeps the table empty.

  it("a student CANNOT enroll themselves (no INSERT policy = the grant check is unbypassable)", async () => {
    const { error } = await samClient
      .from("batch_enrollments")
      .insert({ batch_id: batchZ, user_id: samId });
    expect(error).not.toBeNull();

    const { data } = await admin
      .from("batch_enrollments")
      .select("user_id")
      .eq("batch_id", batchZ);
    expect(data ?? []).toHaveLength(0);
  });

  it("a teacher CANNOT enroll a student directly either — writes are service-role only", async () => {
    const { error } = await teacherX
      .from("batch_enrollments")
      .insert({ batch_id: batchZ, user_id: niaId });
    expect(error).not.toBeNull();

    const { data } = await admin
      .from("batch_enrollments")
      .select("user_id")
      .eq("batch_id", batchZ);
    expect(data ?? []).toHaveLength(0);
  });

  // ── 2. roster visibility ───────────────────────────────────────────────────

  it("the student sees their own enrollment", async () => {
    const { data } = await samClient.from("batch_enrollments").select("batch_id");
    expect(data?.map((r) => r.batch_id)).toContain(batchX);
  });

  it("the teacher of that branch sees the roster", async () => {
    const { data } = await teacherX
      .from("batch_enrollments")
      .select("user_id")
      .eq("batch_id", batchX);
    expect(data?.map((r) => r.user_id)).toContain(samId);
  });

  it("a teacher of ANOTHER branch sees no roster row", async () => {
    const { data } = await teacherY
      .from("batch_enrollments")
      .select("user_id")
      .eq("batch_id", batchX);
    expect(data ?? []).toHaveLength(0);
  });

  // ── 3. the mock_attempts grant ─────────────────────────────────────────────

  it("the teacher of the branch CAN read an enrolled student's attempt", async () => {
    const { data } = await teacherX.from("mock_attempts").select("id").eq("id", samAttemptId);
    expect(data?.map((r) => r.id)).toContain(samAttemptId);
  });

  it("that teacher CANNOT read an UNENROLLED student's attempt", async () => {
    const { data } = await teacherX.from("mock_attempts").select("id").eq("id", niaAttemptId);
    expect(data ?? []).toHaveLength(0);
  });

  it("a teacher of another branch CANNOT read the enrolled student's attempt", async () => {
    const { data } = await teacherY.from("mock_attempts").select("id").eq("id", samAttemptId);
    expect(data ?? []).toHaveLength(0);
  });

  it("the student still reads their own attempt (the additive policy narrows nothing)", async () => {
    const { data } = await samClient.from("mock_attempts").select("id").eq("id", samAttemptId);
    expect(data?.map((r) => r.id)).toContain(samAttemptId);
  });

  // ── 4. leaving ─────────────────────────────────────────────────────────────

  it("the student can LEAVE, and that revokes the teacher's read of their attempt", async () => {
    const { error } = await samClient
      .from("batch_enrollments")
      .delete()
      .eq("batch_id", batchX)
      .eq("user_id", samId);
    expect(error).toBeNull();

    const { data: gone } = await teacherX
      .from("mock_attempts")
      .select("id")
      .eq("id", samAttemptId);
    expect(gone ?? []).toHaveLength(0);

    // Restore, so this file stays order-independent.
    await admin.from("batch_enrollments").insert({ batch_id: batchX, user_id: samId });
  });
});
