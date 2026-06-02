/**
 * Integration test for updateConceptReport — the helper invoked by
 * PATCH /api/notes/reports/[id].
 *
 * Verifies:
 *   - Same-org ADMIN can transition open → in-review (no terminal stamps)
 *   - Same-org ADMIN can resolve → stamps resolved_at + resolved_by
 *   - Reverting resolved → open clears the stamps
 *   - Cross-org ADMIN cannot update (RLS → not_found)
 *   - TEACHER cannot update (RLS → not_found)
 *   - Invalid status / over-long resolution note rejected pre-DB
 *
 * Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { updateConceptReport } from "@/lib/notes-reports/updateConceptReport";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "notes-reports-update-pw-1234";
const RUN_ID = randomUUID().slice(0, 8);

async function signIn(email: string): Promise<SupabaseClient> {
  const c = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
  await c.auth.signInWithPassword({ email, password: PASSWORD });
  return c;
}

describe.skipIf(!HAS_ENV)("updateConceptReport", () => {
  let admin: SupabaseClient;
  let adminAClient: SupabaseClient;
  let adminBClient: SupabaseClient;
  let teacherClient: SupabaseClient;

  let orgAId: string;
  let orgBId: string;
  let adminAId: string;
  let adminBId: string;
  let teacherId: string;
  let reportId: string;

  beforeAll(async () => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    const [{ data: orgA }, { data: orgB }] = await Promise.all([
      admin
        .from("organizations")
        .insert({ name: `Concept Update Org A ${RUN_ID}` })
        .select("id")
        .single(),
      admin
        .from("organizations")
        .insert({ name: `Concept Update Org B ${RUN_ID}` })
        .select("id")
        .single(),
    ]);
    orgAId = orgA!.id;
    orgBId = orgB!.id;

    const [{ data: aUser }, { data: bUser }, { data: tUser }] = await Promise.all([
      admin.auth.admin.createUser({
        email: `concept-admin-a-${RUN_ID}@test.local`,
        password: PASSWORD,
        email_confirm: true,
      }),
      admin.auth.admin.createUser({
        email: `concept-admin-b-${RUN_ID}@test.local`,
        password: PASSWORD,
        email_confirm: true,
      }),
      admin.auth.admin.createUser({
        email: `concept-teacher-a-${RUN_ID}@test.local`,
        password: PASSWORD,
        email_confirm: true,
      }),
    ]);
    adminAId = aUser.user!.id;
    adminBId = bUser.user!.id;
    teacherId = tUser.user!.id;

    await admin.from("org_members").insert([
      { org_id: orgAId, user_id: adminAId, role: "ADMIN" },
      { org_id: orgBId, user_id: adminBId, role: "ADMIN" },
      { org_id: orgAId, user_id: teacherId, role: "TEACHER" },
    ]);

    // Seed a report owned by org A.
    const { data: rep } = await admin
      .from("concept_reports")
      .insert({
        subtopic_slug: `update-test-sub-${RUN_ID}`,
        concept_slug: `update-test-concept-${RUN_ID}`,
        exam_name: "NDA",
        subject_name: "Mathematics",
        chapter_name: "Statistics",
        subtopic_name: "Update Test Subtopic",
        concept_name: "Update Test Concept",
        subject_route: "nda-maths",
        chapter_slug: "statistics",
        reported_by: teacherId,
        org_id: orgAId,
        category: "incorrect-content",
        details: "seeded for update test",
        status: "open",
      })
      .select("id")
      .single();
    reportId = rep!.id;

    [adminAClient, adminBClient, teacherClient] = await Promise.all([
      signIn(`concept-admin-a-${RUN_ID}@test.local`),
      signIn(`concept-admin-b-${RUN_ID}@test.local`),
      signIn(`concept-teacher-a-${RUN_ID}@test.local`),
    ]);
  });

  afterAll(async () => {
    if (reportId) await admin.from("concept_reports").delete().eq("id", reportId);
    await admin.from("concept_reports").delete().eq("org_id", orgAId);
    if (adminAId) await admin.auth.admin.deleteUser(adminAId);
    if (adminBId) await admin.auth.admin.deleteUser(adminBId);
    if (teacherId) await admin.auth.admin.deleteUser(teacherId);
    if (orgAId) await admin.from("organizations").delete().eq("id", orgAId);
    if (orgBId) await admin.from("organizations").delete().eq("id", orgBId);
  });

  it("same-org ADMIN can move open → in-review without terminal stamps", async () => {
    const res = await updateConceptReport(adminAClient, {
      reportId,
      actorUserId: adminAId,
      status: "in-review",
    });
    expect(res.kind).toBe("ok");

    const { data: row } = await admin
      .from("concept_reports")
      .select("status, resolved_at, resolved_by")
      .eq("id", reportId)
      .single();
    expect(row!.status).toBe("in-review");
    expect(row!.resolved_at).toBeNull();
    expect(row!.resolved_by).toBeNull();
  });

  it("same-org ADMIN can resolve → stamps resolved_at + resolved_by", async () => {
    const res = await updateConceptReport(adminAClient, {
      reportId,
      actorUserId: adminAId,
      status: "resolved",
      resolutionNote: "Fixed the definition in the next deploy.",
    });
    expect(res.kind).toBe("ok");

    const { data: row } = await admin
      .from("concept_reports")
      .select("status, resolved_at, resolved_by, resolution_note")
      .eq("id", reportId)
      .single();
    expect(row!.status).toBe("resolved");
    expect(row!.resolved_at).not.toBeNull();
    expect(row!.resolved_by).toBe(adminAId);
    expect(row!.resolution_note).toBe("Fixed the definition in the next deploy.");
  });

  it("reverting resolved → open clears the terminal stamps", async () => {
    const res = await updateConceptReport(adminAClient, {
      reportId,
      actorUserId: adminAId,
      status: "open",
    });
    expect(res.kind).toBe("ok");

    const { data: row } = await admin
      .from("concept_reports")
      .select("status, resolved_at, resolved_by")
      .eq("id", reportId)
      .single();
    expect(row!.status).toBe("open");
    expect(row!.resolved_at).toBeNull();
    expect(row!.resolved_by).toBeNull();
  });

  it("cross-org ADMIN cannot update (RLS → not_found)", async () => {
    const res = await updateConceptReport(adminBClient, {
      reportId,
      actorUserId: adminBId,
      status: "wont-fix",
    });
    expect(res.kind).toBe("not_found");
  });

  it("TEACHER cannot update (RLS → not_found)", async () => {
    const res = await updateConceptReport(teacherClient, {
      reportId,
      actorUserId: teacherId,
      status: "resolved",
    });
    expect(res.kind).toBe("not_found");
  });

  it("rejects an invalid status before touching the DB", async () => {
    const res = await updateConceptReport(adminAClient, {
      reportId,
      actorUserId: adminAId,
      // @ts-expect-error — deliberately invalid
      status: "banana",
    });
    expect(res.kind).toBe("invalid_status");
  });

  it("rejects an over-long resolution note", async () => {
    const res = await updateConceptReport(adminAClient, {
      reportId,
      actorUserId: adminAId,
      status: "resolved",
      resolutionNote: "x".repeat(2001),
    });
    expect(res.kind).toBe("invalid_resolution_note");
  });
});
