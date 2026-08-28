/**
 * Integration tests for the invite → accept flow (migration 0084).
 *
 * The one that matters most is the EMAIL MATCH. Invite ids are uuids but are
 * not secrets — they travel in links and page payloads — so the only thing
 * standing between "I hold an invite id" and "I am enrolled" is the check that
 * the invite names the caller's own verified email. If that regresses, anyone
 * holding an id can enrol themselves, or enrol into a batch never offered them.
 *
 * Email sending is not stubbed: with no RESEND_API_KEY in the test env,
 * sendEmail returns { ok: false } and the invite is still written — which is
 * the best-effort behaviour these tests also pin.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { createBranch } from "@/lib/branches/admin";
import { createBatch } from "@/lib/batches/admin";
import {
  inviteToBatch,
  listPendingInvitesForEmail,
  respondToInvite,
  loadRoster,
  revokeInvite,
} from "@/lib/batches/invitesAdmin";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "batch-invite-flow-pw-1234";
const RUN_ID = randomUUID().slice(0, 8);
const ADMIN_EMAIL = `bi-admin-${RUN_ID}@test.local`;
const SAM_EMAIL = `bi-sam-${RUN_ID}@test.local`;
const MAL_EMAIL = `bi-mal-${RUN_ID}@test.local`;
const STRANGER = `bi-nobody-${RUN_ID}@test.local`;
const ORG_NAME = `BatchInvite Org ${RUN_ID}`;

describe.skipIf(!HAS_ENV)("batch invite flow (migration 0084)", () => {
  let admin: SupabaseClient;
  let adminClient: SupabaseClient;
  let orgId: string;
  let adminId: string, samId: string, malId: string;
  let batchId: string;

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
    [adminId, samId, malId] = await Promise.all(
      [ADMIN_EMAIL, SAM_EMAIL, MAL_EMAIL].map(mkUser)
    );

    const { data: org } = await admin
      .from("organizations")
      .insert({ name: ORG_NAME })
      .select("id")
      .single();
    orgId = org!.id;
    await admin.from("org_members").insert({ user_id: adminId, org_id: orgId, role: "ADMIN" });

    adminClient = createClient(url, anon, { auth: { persistSession: false } });
    await adminClient.auth.signInWithPassword({ email: ADMIN_EMAIL, password: PASSWORD });

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
  });

  afterAll(async () => {
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    for (const id of [adminId, samId, malId]) if (id) await admin.auth.admin.deleteUser(id);
  });

  it("invites a mixed paste: valid addresses stored, typos returned as typed", async () => {
    const res = await inviteToBatch({
      client: adminClient,
      batchId,
      invitedBy: adminId,
      raw: `${SAM_EMAIL.toUpperCase()}\nnot-an-email\n${STRANGER}`,
    });
    expect(res.kind).toBe("ok");
    if (res.kind !== "ok") return;
    expect(res.invited).toBe(2);
    expect(res.invalid).toEqual(["not-an-email"]);
  });

  it("stores the address LOWERCASED, or accept could never match it", async () => {
    const { data } = await admin
      .from("batch_invites")
      .select("email")
      .eq("batch_id", batchId);
    const emails = (data ?? []).map((r) => r.email as string);
    expect(emails).toContain(SAM_EMAIL.toLowerCase());
    expect(emails.every((e) => e === e.toLowerCase())).toBe(true);
  });

  it("invites an address with NO account, and says nothing about that", async () => {
    // The stranger has no auth user. The invite exists all the same, and the
    // caller cannot tell the two cases apart — which is what stops a teacher
    // probing who is registered.
    const { data } = await admin
      .from("batch_invites")
      .select("email")
      .eq("batch_id", batchId)
      .eq("email", STRANGER.toLowerCase())
      .maybeSingle();
    expect(data).not.toBeNull();
  });

  it("the invited student sees their pending invite with the inviting org named", async () => {
    const invites = await listPendingInvitesForEmail(SAM_EMAIL);
    expect(invites).toHaveLength(1);
    expect(invites[0].orgName).toBe(ORG_NAME);
    expect(invites[0].batchName).toContain("Morning");
  });

  // ── the security check ─────────────────────────────────────────────────────

  it("SOMEONE ELSE holding the invite id CANNOT accept it", async () => {
    const [invite] = await listPendingInvitesForEmail(SAM_EMAIL);
    const res = await respondToInvite({
      userId: malId,
      userEmail: MAL_EMAIL,
      inviteId: invite.id,
      action: "accept",
    });
    expect(res.kind).toBe("not_found");

    const { data } = await admin
      .from("batch_enrollments")
      .select("user_id")
      .eq("batch_id", batchId);
    expect((data ?? []).map((r) => r.user_id)).not.toContain(malId);
  });

  it("the addressed student CAN accept, and lands on the roster", async () => {
    const [invite] = await listPendingInvitesForEmail(SAM_EMAIL);
    const res = await respondToInvite({
      userId: samId,
      userEmail: SAM_EMAIL,
      inviteId: invite.id,
      action: "accept",
    });
    expect(res.kind).toBe("ok");

    const roster = await loadRoster(adminClient, batchId);
    expect(roster.students.map((s) => s.userId)).toContain(samId);
  });

  it("accepting twice is idempotent, not a duplicate-key crash", async () => {
    const { data: invite } = await admin
      .from("batch_invites")
      .select("id")
      .eq("batch_id", batchId)
      .eq("email", SAM_EMAIL.toLowerCase())
      .single();
    // Already accepted, so the guard should report not_pending rather than
    // attempting a second enrollment.
    const res = await respondToInvite({
      userId: samId,
      userEmail: SAM_EMAIL,
      inviteId: invite!.id as string,
      action: "accept",
    });
    expect(res.kind).toBe("not_pending");
  });

  it("re-inviting an already-enrolled student writes no new invite", async () => {
    const res = await inviteToBatch({
      client: adminClient,
      batchId,
      invitedBy: adminId,
      raw: SAM_EMAIL,
    });
    expect(res.kind).toBe("ok");
    if (res.kind !== "ok") return;
    expect(res.alreadyEnrolled).toBe(1);
    expect(res.invited).toBe(0);
  });

  it("a revoked invite disappears from the student's pending list", async () => {
    const before = await listPendingInvitesForEmail(STRANGER);
    expect(before).toHaveLength(1);

    const res = await revokeInvite(adminClient, batchId, before[0].id);
    expect(res.kind).toBe("ok");

    expect(await listPendingInvitesForEmail(STRANGER)).toHaveLength(0);
  });

  it("an EXPIRED invite is neither listed nor acceptable", async () => {
    const email = `bi-exp-${RUN_ID}@test.local`;
    const { data: row } = await admin
      .from("batch_invites")
      .insert({
        batch_id: batchId,
        email,
        invited_by: adminId,
        status: "pending",
        expires_at: new Date(Date.now() - 86_400_000).toISOString(),
      })
      .select("id")
      .single();

    expect(await listPendingInvitesForEmail(email)).toHaveLength(0);

    const { data: u } = await admin.auth.admin.createUser({
      email,
      password: PASSWORD,
      email_confirm: true,
    });
    const res = await respondToInvite({
      userId: u.user!.id,
      userEmail: email,
      inviteId: row!.id as string,
      action: "accept",
    });
    expect(res.kind).toBe("not_pending");
    await admin.auth.admin.deleteUser(u.user!.id);
  });

  it("a batch the caller cannot see cannot be invited to", async () => {
    const outsider = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } }
    );
    await outsider.auth.signInWithPassword({ email: SAM_EMAIL, password: PASSWORD });
    const res = await inviteToBatch({
      client: outsider,
      batchId,
      invitedBy: samId,
      raw: "someone@example.com",
    });
    expect(res.kind).toBe("batch_not_found");
  });
});
