/**
 * Integration tests for "Create student logins" on a batch roster.
 *
 * The properties that matter:
 *  - a new email gets a working login and lands ON the roster straight away;
 *  - an email that ALREADY has a login is never touched (its password still
 *    works, nothing else does) and gets an ordinary batch invite instead;
 *  - staff who cannot see the batch create nothing at all.
 *
 * A NEW login is proven by signing in with it: that is the feature. An
 * EXISTING account left alone is proven by reading it (accountUpdatedAt): its
 * `updated_at` must not move, which no sign-in can show and no rate limit can
 * break (2026-10-08; see tests/test-sign-in-timeouts.test.ts).
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { createBranch } from "@/lib/branches/admin";
import { createBatch } from "@/lib/batches/admin";
import { createStudentLogins } from "@/lib/batches/studentLoginsAdmin";
import { SIGN_IN_TEST_TIMEOUT_MS, accountUpdatedAt, mustSignIn, signInWorks } from "./helpers/fixture";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "student-logins-pw-1234";
const RUN_ID = randomUUID().slice(0, 8);
const ADMIN_EMAIL = `sl-admin-${RUN_ID}@test.local`;
const OUTSIDER_EMAIL = `sl-outsider-${RUN_ID}@test.local`;
const EXISTING_EMAIL = `sl-existing-${RUN_ID}@test.local`;
const NEW_A = `sl-new-a-${RUN_ID}@test.local`;
const NEW_B = `sl-new-b-${RUN_ID}@test.local`;
const NEVER = `sl-never-${RUN_ID}@test.local`;

describe.skipIf(!HAS_ENV)("createStudentLogins", () => {
  let admin: SupabaseClient;
  let adminClient: SupabaseClient;
  let outsiderClient: SupabaseClient;
  let adminId: string;
  let outsiderId: string;
  let existingId: string;
  let orgId: string;
  let otherOrgId: string;
  let batchId: string;
  const created: string[] = [];

  function anon(): SupabaseClient {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } }
    );
  }
  async function canSignIn(email: string, password: string) {
    return signInWorks(email, anon(), { email, password });
  }
  async function userIdOf(email: string): Promise<string | null> {
    const { data } = await admin.auth.admin.listUsers({ perPage: 1000 });
    return (data?.users ?? []).find((u) => u.email === email)?.id ?? null;
  }
  async function enrolled(userId: string): Promise<boolean> {
    const { data } = await admin
      .from("batch_enrollments")
      .select("user_id")
      .eq("batch_id", batchId)
      .eq("user_id", userId)
      .maybeSingle();
    return !!data;
  }

  beforeAll(async () => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
    const mkUser = async (email: string) => {
      const { data, error } = await admin.auth.admin.createUser({
        email,
        password: PASSWORD,
        email_confirm: true,
      });
      if (error || !data.user) throw new Error(`fixture ${email}: ${error?.message}`);
      return data.user.id;
    };
    [adminId, outsiderId, existingId] = await Promise.all(
      [ADMIN_EMAIL, OUTSIDER_EMAIL, EXISTING_EMAIL].map(mkUser)
    );

    const { data: org } = await admin
      .from("organizations")
      .insert({ name: `StudentLogins Org ${RUN_ID}` })
      .select("id")
      .single();
    orgId = org!.id;
    const { data: other } = await admin
      .from("organizations")
      .insert({ name: `StudentLogins Other ${RUN_ID}` })
      .select("id")
      .single();
    otherOrgId = other!.id;
    await admin.from("org_members").insert([
      { user_id: adminId, org_id: orgId, role: "ADMIN" },
      { user_id: outsiderId, org_id: otherOrgId, role: "ADMIN" },
    ]);

    adminClient = anon();
    await mustSignIn(ADMIN_EMAIL, adminClient, { email: ADMIN_EMAIL, password: PASSWORD });
    outsiderClient = anon();
    await mustSignIn(OUTSIDER_EMAIL, outsiderClient, { email: OUTSIDER_EMAIL, password: PASSWORD });

    const branchId = await createBranch(adminClient, {
      orgId,
      createdBy: adminId,
      fields: { name: `B ${RUN_ID}` },
    });
    batchId = await createBatch(adminClient, {
      orgId,
      createdBy: adminId,
      fields: { name: `Class ${RUN_ID}`, branchId, examId: null },
    });
  });

  afterAll(async () => {
    for (const id of [orgId, otherOrgId]) {
      if (id) await admin.from("organizations").delete().eq("id", id);
    }
    for (const email of [NEW_A, NEW_B, NEVER]) {
      const id = await userIdOf(email);
      if (id) created.push(id);
    }
    for (const id of [adminId, outsiderId, existingId, ...created]) {
      if (id) await admin.auth.admin.deleteUser(id);
    }
  });

  it("staff who cannot see the batch create NOTHING", async () => {
    const res = await createStudentLogins({
      client: outsiderClient,
      batchId,
      createdBy: outsiderId,
      students: [{ name: "Never", email: NEVER, password: null }],
    });
    expect(res.kind).toBe("batch_not_found");
    expect(await userIdOf(NEVER)).toBeNull();
  });

  it("creates working logins, puts them on the roster, invites the existing one", async () => {
    const existingBefore = await accountUpdatedAt(admin, existingId);
    const res = await createStudentLogins({
      client: adminClient,
      batchId,
      createdBy: adminId,
      students: [
        { name: "Anita", email: NEW_A, password: "anita-chosen-pw" },
        { name: "Bala", email: NEW_B, password: null },
        { name: "Hijack", email: EXISTING_EMAIL, password: "attacker-pw-999" },
      ],
    });
    expect(res.kind).toBe("ok");
    if (res.kind !== "ok") return;

    expect(res.created.map((c) => c.email).sort()).toEqual([NEW_A, NEW_B].sort());
    const bala = res.created.find((c) => c.email === NEW_B)!;
    expect(bala.password.length).toBeGreaterThanOrEqual(10);
    expect(res.created.find((c) => c.email === NEW_A)!.password).toBe("anita-chosen-pw");
    expect(res.existing).toEqual([EXISTING_EMAIL]);
    expect(res.failed).toEqual([]);

    expect(await canSignIn(NEW_A, "anita-chosen-pw")).toBe(true);
    expect(await canSignIn(NEW_B, bala.password)).toBe(true);

    const aId = (await userIdOf(NEW_A))!;
    expect(await enrolled(aId)).toBe(true);
    expect(await enrolled((await userIdOf(NEW_B))!)).toBe(true);

    // Name and who created it are on the account.
    const { data: aUser } = await admin.auth.admin.getUserById(aId);
    expect(aUser.user?.user_metadata?.name).toBe("Anita");
    expect(aUser.user?.user_metadata?.created_by_staff).toBe(adminId);
    expect(aUser.user?.email_confirmed_at).toBeTruthy();

    // The existing account: untouched, not enrolled, holds a pending invite.
    expect(await accountUpdatedAt(admin, existingId)).toBe(existingBefore);
    expect(await enrolled(existingId)).toBe(false);
    const { data: invite } = await admin
      .from("batch_invites")
      .select("status")
      .eq("batch_id", batchId)
      .eq("email", EXISTING_EMAIL)
      .maybeSingle<{ status: string }>();
    expect(invite?.status).toBe("pending");
  }, SIGN_IN_TEST_TIMEOUT_MS);

  it("a repeat run creates nothing new: those students are already in the batch", async () => {
    const aId = (await userIdOf(NEW_A))!;
    const aBefore = await accountUpdatedAt(admin, aId);
    const res = await createStudentLogins({
      client: adminClient,
      batchId,
      createdBy: adminId,
      students: [{ name: "Anita", email: NEW_A, password: null }],
    });
    expect(res.kind).toBe("ok");
    if (res.kind !== "ok") return;
    expect(res.created).toEqual([]);
    expect(res.alreadyInBatch).toEqual([NEW_A]);
    // Anita's account, password included, is left exactly as it was.
    expect(await accountUpdatedAt(admin, aId)).toBe(aBefore);
  });
});
