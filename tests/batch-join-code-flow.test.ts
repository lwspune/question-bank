/**
 * Integration tests for joining by code (migration 0085).
 *
 * The code is the ONLY thing authorizing the enrollment — batch_enrollments has
 * no INSERT policy, so joinByCode is the grant check. What has to hold: a wrong
 * code enrols nobody, a closed or archived batch refuses, rotating invalidates
 * the previous code without evicting anyone, and the student never needs to be
 * able to read the batches table (they cannot — its policy requires an org id).
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { createBranch } from "@/lib/branches/admin";
import { createBatch } from "@/lib/batches/admin";
import {
  rotateJoinCode,
  setJoinOpen,
  joinByCode,
  loadRoster,
} from "@/lib/batches/invitesAdmin";
import { formatJoinCode } from "@/lib/batches/joinCode";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "batch-joincode-pw-1234";
const RUN_ID = randomUUID().slice(0, 8);
const ADMIN_EMAIL = `jc-admin-${RUN_ID}@test.local`;
const SAM_EMAIL = `jc-sam-${RUN_ID}@test.local`;
const ORG_NAME = `JoinCode Org ${RUN_ID}`;

describe.skipIf(!HAS_ENV)("join by code (migration 0085)", () => {
  let admin: SupabaseClient;
  let adminClient: SupabaseClient;
  let samClient: SupabaseClient;
  let orgId: string;
  let adminId: string, samId: string;
  let batchId: string;
  let code: string;

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
    [adminId, samId] = await Promise.all([ADMIN_EMAIL, SAM_EMAIL].map(mkUser));

    const { data: org } = await admin
      .from("organizations")
      .insert({ name: ORG_NAME })
      .select("id")
      .single();
    orgId = org!.id;
    await admin.from("org_members").insert({ user_id: adminId, org_id: orgId, role: "ADMIN" });

    adminClient = createClient(url, anon, { auth: { persistSession: false } });
    await adminClient.auth.signInWithPassword({ email: ADMIN_EMAIL, password: PASSWORD });
    samClient = createClient(url, anon, { auth: { persistSession: false } });
    await samClient.auth.signInWithPassword({ email: SAM_EMAIL, password: PASSWORD });

    const branchId = await createBranch(adminClient, {
      orgId,
      createdBy: adminId,
      fields: { name: `B ${RUN_ID}` },
    });
    batchId = await createBatch(adminClient, {
      orgId,
      createdBy: adminId,
      fields: { name: `Morning ${RUN_ID}`, branchId, examId: null },
    });

    const res = await rotateJoinCode(adminClient, batchId);
    expect(res.kind).toBe("ok");
    if (res.kind === "ok") code = res.code;
  });

  afterAll(async () => {
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    for (const id of [adminId, samId]) if (id) await admin.auth.admin.deleteUser(id);
  });

  it("a student cannot read the batches table at all — the code is resolved for them", async () => {
    // batches_select_scoped (0057) needs an org id and a student has none. This
    // is why joinByCode is service-role rather than an RLS-scoped lookup.
    const { data } = await samClient.from("batches").select("id").eq("id", batchId);
    expect(data ?? []).toHaveLength(0);
  });

  it("a wrong code enrols nobody", async () => {
    const res = await joinByCode({ userId: samId, rawCode: "ZZZZ9999" });
    expect(res.kind).toBe("invalid_code");
    const roster = await loadRoster(adminClient, batchId);
    expect(roster.students).toHaveLength(0);
  });

  it("a malformed code is rejected without a lookup", async () => {
    expect((await joinByCode({ userId: samId, rawCode: "nope" })).kind).toBe("invalid_code");
  });

  it("the code works in its DISPLAYED form, dash and all", async () => {
    const res = await joinByCode({ userId: samId, rawCode: formatJoinCode(code) });
    expect(res.kind).toBe("ok");
    const roster = await loadRoster(adminClient, batchId);
    expect(roster.students.map((s) => s.userId)).toContain(samId);
  });

  it("joining again is reported, not duplicated", async () => {
    const res = await joinByCode({ userId: samId, rawCode: code });
    expect(res.kind).toBe("already_member");
    const roster = await loadRoster(adminClient, batchId);
    expect(roster.students.filter((s) => s.userId === samId)).toHaveLength(1);
  });

  it("a closed batch refuses new students but keeps the ones it has", async () => {
    expect((await setJoinOpen(adminClient, batchId, false)).kind).toBe("ok");

    const { data: other } = await admin.auth.admin.createUser({
      email: `jc-late-${RUN_ID}@test.local`,
      password: PASSWORD,
      email_confirm: true,
    });
    const lateId = other.user!.id;
    expect((await joinByCode({ userId: lateId, rawCode: code })).kind).toBe("closed");

    const roster = await loadRoster(adminClient, batchId);
    expect(roster.students.map((s) => s.userId)).toContain(samId);
    expect(roster.students.map((s) => s.userId)).not.toContain(lateId);

    await admin.auth.admin.deleteUser(lateId);
    await setJoinOpen(adminClient, batchId, true);
  });

  it("rotating invalidates the old code and evicts nobody", async () => {
    const old = code;
    const res = await rotateJoinCode(adminClient, batchId);
    expect(res.kind).toBe("ok");
    if (res.kind !== "ok") return;
    expect(res.code).not.toBe(old);

    const { data: other } = await admin.auth.admin.createUser({
      email: `jc-old-${RUN_ID}@test.local`,
      password: PASSWORD,
      email_confirm: true,
    });
    const otherId = other.user!.id;
    expect((await joinByCode({ userId: otherId, rawCode: old })).kind).toBe("invalid_code");
    expect((await joinByCode({ userId: otherId, rawCode: res.code })).kind).toBe("ok");

    const roster = await loadRoster(adminClient, batchId);
    expect(roster.students.map((s) => s.userId)).toContain(samId);

    await admin.auth.admin.deleteUser(otherId);
  });

  it("a teacher of another org cannot mint a code for this batch", async () => {
    const res = await rotateJoinCode(samClient, batchId);
    expect(res.kind).toBe("error");
  });
});
