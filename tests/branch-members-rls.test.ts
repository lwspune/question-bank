/**
 * RLS tests for teacher <-> branch scoping (migration 0057).
 *
 * Proves the core of the branch model: a TEACHER assigned to branch X sees +
 * edits only that branch's batches/papers (plus anything they created); a
 * teacher with NO assignment sees none of the org's branched content; an ADMIN
 * sees everything in the org. Assignment goes through the real setMemberBranches
 * service-role path.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { createBranch } from "@/lib/branches/admin";
import { createBatch, updateBatch, listBatches } from "@/lib/batches/admin";
import { createPaper, getPaperDetail } from "@/lib/papers/admin";
import { setMemberBranches } from "@/lib/members/admin";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "branch-members-rls-pw-1234";
const RUN_ID = randomUUID().slice(0, 8);
const ADMIN_EMAIL = `bm-rls-admin-${RUN_ID}@test.local`;
const TX_EMAIL = `bm-rls-tx-${RUN_ID}@test.local`;
const TY_EMAIL = `bm-rls-ty-${RUN_ID}@test.local`;
const ORG_NAME = `BranchMembers RLS Org ${RUN_ID}`;

describe.skipIf(!HAS_ENV)("branch-scoped teacher access (migration 0057)", () => {
  let admin: SupabaseClient;
  let adminClient: SupabaseClient;
  let teacherX: SupabaseClient;
  let teacherY: SupabaseClient;
  let orgId: string;
  let adminId: string;
  let txId: string;
  let tyId: string;
  let branchX: string;
  let branchY: string;
  let batchX: string;
  let batchY: string;
  let paperX: string;
  let paperY: string;
  let qId: string;

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
    adminId = await mkUser(ADMIN_EMAIL);
    txId = await mkUser(TX_EMAIL);
    tyId = await mkUser(TY_EMAIL);

    const { data: org } = await admin
      .from("organizations")
      .insert({ name: ORG_NAME })
      .select("id")
      .single();
    orgId = org!.id;
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
    adminClient = await signIn(ADMIN_EMAIL);
    teacherX = await signIn(TX_EMAIL);
    teacherY = await signIn(TY_EMAIL);

    branchX = await createBranch(adminClient, { orgId, createdBy: adminId, fields: { name: `X ${RUN_ID}` } });
    branchY = await createBranch(adminClient, { orgId, createdBy: adminId, fields: { name: `Y ${RUN_ID}` } });

    // Assign teacherX to branch X only (teacherY gets nothing).
    const assign = await setMemberBranches(orgId, txId, [branchX]);
    expect(assign.kind).toBe("ok");

    batchX = await createBatch(adminClient, {
      orgId, createdBy: adminId, fields: { name: `Morning ${RUN_ID}`, branchId: branchX, examId: null },
    });
    batchY = await createBatch(adminClient, {
      orgId, createdBy: adminId, fields: { name: `Evening ${RUN_ID}`, branchId: branchY, examId: null },
    });
    paperX = await createPaper(adminClient, { orgId, createdBy: adminId, title: `PX ${RUN_ID}`, batchId: batchX });
    paperY = await createPaper(adminClient, { orgId, createdBy: adminId, title: `PY ${RUN_ID}`, batchId: batchY });

    // Any real PUBLIC question id satisfies the paper_questions FK.
    const { data: q } = await admin
      .from("questions")
      .select("id")
      .eq("visibility", "PUBLIC")
      // Oldest row = a stable seed question, never a parallel run's transient
      // fixture (which its afterAll could delete mid-test → FK 23503).
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    qId = q!.id as string;
  });

  afterAll(async () => {
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    for (const id of [adminId, txId, tyId]) if (id) await admin.auth.admin.deleteUser(id);
  });

  it("ADMIN sees all org batches", async () => {
    const ids = (await listBatches(adminClient)).map((b) => b.id).sort();
    expect(ids).toEqual([batchX, batchY].sort());
  });

  it("TEACHER assigned to branch X sees only branch X's batch", async () => {
    const ids = (await listBatches(teacherX)).map((b) => b.id);
    expect(ids).toContain(batchX);
    expect(ids).not.toContain(batchY);
  });

  it("TEACHER with no assignment sees no branched batches", async () => {
    const ids = (await listBatches(teacherY)).map((b) => b.id);
    expect(ids).not.toContain(batchX);
    expect(ids).not.toContain(batchY);
  });

  it("TEACHER X sees paper X but not paper Y", async () => {
    expect(await getPaperDetail(teacherX, paperX)).not.toBeNull();
    expect(await getPaperDetail(teacherX, paperY)).toBeNull();
  });

  it("TEACHER X cannot UPDATE a batch outside their branch (branch Y)", async () => {
    await updateBatch(teacherX, batchY, { name: "Hacked", branchId: branchY, examId: null }); // RLS: 0 rows
    const still = (await listBatches(adminClient)).find((b) => b.id === batchY);
    expect(still?.name).toBe(`Evening ${RUN_ID}`);
  });

  it("a TEACHER cannot write branch_members directly (admin-only)", async () => {
    const { error } = await teacherX.from("branch_members").insert({ user_id: tyId, branch_id: branchX });
    expect(error).not.toBeNull();
  });

  // 0058: the paper_questions write policy is branch-scoped too (blind-write guard).
  it("TEACHER X cannot add a question to an out-of-branch paper (paper_questions)", async () => {
    const { error } = await teacherX
      .from("paper_questions")
      .insert({ paper_id: paperY, question_id: qId });
    expect(error).not.toBeNull();
    const { count } = await admin
      .from("paper_questions")
      .select("*", { count: "exact", head: true })
      .eq("paper_id", paperY);
    expect(count ?? 0).toBe(0);
  });

  it("TEACHER X CAN add a question to their own branch's paper", async () => {
    const { error } = await teacherX
      .from("paper_questions")
      .insert({ paper_id: paperX, question_id: qId });
    expect(error).toBeNull();
  });
});
