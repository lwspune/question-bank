/**
 * RLS + data-layer integration tests for branches (migration 0055).
 * Mirrors batches-rls.test.ts: service-role seeds orgs/users, then per-user JWT
 * clients drive the real src/lib/branches helpers.
 *
 * Coverage:
 *   - an org ADMIN can create/list a branch
 *   - a TEACHER canNOT create/update/delete a branch (admin-only write)
 *   - cross-org READ isolation (org B can't see org A's branch)
 *   - deleting a branch SET NULLs its batches (they become unbranched)
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import {
  createBranch,
  updateBranch,
  deleteBranch,
  listBranches,
} from "@/lib/branches/admin";
import { createBatch, listBatches } from "@/lib/batches/admin";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "branches-rls-test-pw-1234";
const RUN_ID = randomUUID().slice(0, 8);
const ADMIN_A = `branches-rls-adminA-${RUN_ID}@test.local`;
const TEACHER_A = `branches-rls-teacherA-${RUN_ID}@test.local`;
const ADMIN_B = `branches-rls-adminB-${RUN_ID}@test.local`;
const ORG_A = `Branches RLS Org A ${RUN_ID}`;
const ORG_B = `Branches RLS Org B ${RUN_ID}`;

describe.skipIf(!HAS_ENV)("branches RLS + data layer (migration 0055)", () => {
  let admin: SupabaseClient;
  let adminA: SupabaseClient;
  let teacherA: SupabaseClient;
  let adminB: SupabaseClient;
  let orgAId: string;
  let orgBId: string;
  let adminAId: string;
  let teacherAId: string;
  let adminBId: string;

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
    adminBId = await mkUser(ADMIN_B);

    const mkOrg = async (name: string) => {
      const { data } = await admin.from("organizations").insert({ name }).select("id").single();
      return data!.id as string;
    };
    orgAId = await mkOrg(ORG_A);
    orgBId = await mkOrg(ORG_B);

    await admin.from("org_members").insert([
      { user_id: adminAId, org_id: orgAId, role: "ADMIN" },
      { user_id: teacherAId, org_id: orgAId, role: "TEACHER" },
      { user_id: adminBId, org_id: orgBId, role: "ADMIN" },
    ]);

    const signIn = async (email: string) => {
      const c = createClient(url, anon, { auth: { persistSession: false } });
      await c.auth.signInWithPassword({ email, password: PASSWORD });
      return c;
    };
    adminA = await signIn(ADMIN_A);
    teacherA = await signIn(TEACHER_A);
    adminB = await signIn(ADMIN_B);
  });

  afterAll(async () => {
    if (orgAId) await admin.from("organizations").delete().eq("id", orgAId);
    if (orgBId) await admin.from("organizations").delete().eq("id", orgBId);
    for (const id of [adminAId, teacherAId, adminBId]) {
      if (id) await admin.auth.admin.deleteUser(id);
    }
  });

  let branchId: string;

  it("an org ADMIN can create a branch and see it", async () => {
    branchId = await createBranch(adminA, {
      orgId: orgAId,
      createdBy: adminAId,
      fields: { name: `FC Road ${RUN_ID}` },
    });
    const list = await listBranches(adminA);
    expect(list.find((b) => b.id === branchId)?.name).toBe(`FC Road ${RUN_ID}`);
  });

  it("a TEACHER cannot create, update, or delete a branch (admin-only writes)", async () => {
    await expect(
      createBranch(teacherA, { orgId: orgAId, createdBy: teacherAId, fields: { name: `X ${RUN_ID}` } })
    ).rejects.toThrow();

    // update/delete deny silently (0 rows) under RLS — the branch is untouched.
    await updateBranch(teacherA, branchId, { name: "Hacked" });
    await deleteBranch(teacherA, branchId);
    const still = (await listBranches(adminA)).find((b) => b.id === branchId);
    expect(still?.name).toBe(`FC Road ${RUN_ID}`);
  });

  it("org B admin CANNOT see org A's branch (read isolation)", async () => {
    expect((await listBranches(adminB)).find((b) => b.id === branchId)).toBeUndefined();
  });

  it("deleting a branch un-branches its batches (SET NULL)", async () => {
    const batchId = await createBatch(adminA, {
      orgId: orgAId,
      createdBy: adminAId,
      fields: { name: `Morning ${RUN_ID}`, branchId, examId: null },
    });
    expect((await listBatches(adminA)).find((b) => b.id === batchId)?.branchId).toBe(branchId);

    await deleteBranch(adminA, branchId);
    const batch = (await listBatches(adminA)).find((b) => b.id === batchId);
    expect(batch).toBeDefined();
    expect(batch?.branchId).toBeNull(); // survived, just unbranched
  });
});
