/**
 * Integration test for updateReport — admin status transitions.
 *
 * Verifies:
 *   - Same-org ADMIN can mark a report 'in-review' / 'resolved' / 'wont-fix'
 *   - Resolving sets resolved_at + resolved_by; reverting clears them
 *   - Cross-org ADMIN cannot update (RLS returns no rows → not_found)
 *   - TEACHER cannot update (RLS denies)
 *   - Invalid status string short-circuits before DB
 *   - Too-long resolution note returns invalid_resolution_note
 *
 * Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { updateReport } from "@/lib/reports/updateReport";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "reports-update-pw-1234";
const RUN_ID = randomUUID().slice(0, 8);

describe.skipIf(!HAS_ENV)("updateReport", () => {
  let admin: SupabaseClient;
  let adminAClient: SupabaseClient;
  let adminBClient: SupabaseClient;
  let teacherAClient: SupabaseClient;
  let adminAId: string;
  let adminBId: string;
  let teacherAId: string;
  let orgAId: string;
  let orgBId: string;
  let publicQuestionId: string;
  let reportId: string;

  beforeAll(async () => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    const [{ data: adminA }, { data: adminB }, { data: teacherA }] = await Promise.all([
      admin.auth.admin.createUser({
        email: `rupd-admin-a-${RUN_ID}@test.local`,
        password: PASSWORD,
        email_confirm: true,
      }),
      admin.auth.admin.createUser({
        email: `rupd-admin-b-${RUN_ID}@test.local`,
        password: PASSWORD,
        email_confirm: true,
      }),
      admin.auth.admin.createUser({
        email: `rupd-teacher-a-${RUN_ID}@test.local`,
        password: PASSWORD,
        email_confirm: true,
      }),
    ]);
    adminAId = adminA.user!.id;
    adminBId = adminB.user!.id;
    teacherAId = teacherA.user!.id;

    const [{ data: orgA }, { data: orgB }] = await Promise.all([
      admin.from("organizations").insert({ name: `RUpd Org A ${RUN_ID}` }).select("id").single(),
      admin.from("organizations").insert({ name: `RUpd Org B ${RUN_ID}` }).select("id").single(),
    ]);
    orgAId = orgA!.id;
    orgBId = orgB!.id;

    await admin.from("org_members").insert([
      { org_id: orgAId, user_id: adminAId, role: "ADMIN" },
      { org_id: orgAId, user_id: teacherAId, role: "TEACHER" },
      { org_id: orgBId, user_id: adminBId, role: "ADMIN" },
    ]);

    // Borrow taxonomy
    const { data: ex } = await admin.from("exams").select("id").limit(1).single();
    const { data: sb } = await admin
      .from("subjects").select("id").eq("exam_id", ex!.id).limit(1).single();
    const { data: ch } = await admin
      .from("chapters").select("id").eq("subject_id", sb!.id).limit(1).single();

    const { data: pub } = await admin
      .from("questions")
      .insert({
        org_id: orgAId,
        exam_id: ex!.id,
        subject_id: sb!.id,
        chapter_id: ch!.id,
        text: `reports-update test PUBLIC ${RUN_ID}`,
        difficulty: "EASY",
        content_hash: `reports-update-${RUN_ID}`,
        created_by: adminAId,
        visibility: "PUBLIC",
      })
      .select("id")
      .single();
    publicQuestionId = pub!.id;

    // Seed a report owned by org A via service role
    const { data: rep } = await admin
      .from("question_reports")
      .insert({
        question_id: publicQuestionId,
        reported_by: teacherAId,
        org_id: orgAId,
        category: "wrong-answer",
        details: "seed",
      })
      .select("id")
      .single();
    reportId = rep!.id;

    adminAClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } }
    );
    adminBClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } }
    );
    teacherAClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } }
    );
    await Promise.all([
      adminAClient.auth.signInWithPassword({
        email: `rupd-admin-a-${RUN_ID}@test.local`,
        password: PASSWORD,
      }),
      adminBClient.auth.signInWithPassword({
        email: `rupd-admin-b-${RUN_ID}@test.local`,
        password: PASSWORD,
      }),
      teacherAClient.auth.signInWithPassword({
        email: `rupd-teacher-a-${RUN_ID}@test.local`,
        password: PASSWORD,
      }),
    ]);
  });

  afterAll(async () => {
    if (publicQuestionId) {
      await admin.from("question_reports").delete().eq("question_id", publicQuestionId);
      await admin.from("questions").delete().eq("id", publicQuestionId);
    }
    if (orgAId) await admin.from("organizations").delete().eq("id", orgAId);
    if (orgBId) await admin.from("organizations").delete().eq("id", orgBId);
    if (adminAId) await admin.auth.admin.deleteUser(adminAId);
    if (adminBId) await admin.auth.admin.deleteUser(adminBId);
    if (teacherAId) await admin.auth.admin.deleteUser(teacherAId);
  });

  it("same-org ADMIN can transition open → in-review", async () => {
    const result = await updateReport(adminAClient, {
      reportId,
      actorUserId: adminAId,
      status: "in-review",
    });
    expect(result.kind).toBe("ok");
    const { data: row } = await admin
      .from("question_reports").select("status, resolved_at, resolved_by")
      .eq("id", reportId).single();
    expect(row!.status).toBe("in-review");
    expect(row!.resolved_at).toBeNull();
    expect(row!.resolved_by).toBeNull();
  });

  it("same-org ADMIN can resolve and stamps resolved_at + resolved_by", async () => {
    const result = await updateReport(adminAClient, {
      reportId,
      actorUserId: adminAId,
      status: "resolved",
      resolutionNote: "fixed in commit X",
    });
    expect(result.kind).toBe("ok");
    const { data: row } = await admin
      .from("question_reports").select("status, resolved_at, resolved_by, resolution_note")
      .eq("id", reportId).single();
    expect(row!.status).toBe("resolved");
    expect(row!.resolved_at).not.toBeNull();
    expect(row!.resolved_by).toBe(adminAId);
    expect(row!.resolution_note).toBe("fixed in commit X");
  });

  it("reverting resolved → open clears resolved_at + resolved_by", async () => {
    const result = await updateReport(adminAClient, {
      reportId,
      actorUserId: adminAId,
      status: "open",
    });
    expect(result.kind).toBe("ok");
    const { data: row } = await admin
      .from("question_reports").select("status, resolved_at, resolved_by")
      .eq("id", reportId).single();
    expect(row!.status).toBe("open");
    expect(row!.resolved_at).toBeNull();
    expect(row!.resolved_by).toBeNull();
  });

  it("cross-org ADMIN cannot update — returns not_found (RLS blocks)", async () => {
    const result = await updateReport(adminBClient, {
      reportId,
      actorUserId: adminBId,
      status: "resolved",
    });
    expect(result.kind).toBe("not_found");
  });

  it("TEACHER cannot update — returns not_found", async () => {
    const result = await updateReport(teacherAClient, {
      reportId,
      actorUserId: teacherAId,
      status: "resolved",
    });
    expect(result.kind).toBe("not_found");
  });

  it("returns invalid_status for bad status string", async () => {
    const result = await updateReport(adminAClient, {
      reportId,
      actorUserId: adminAId,
      // @ts-expect-error — testing runtime validation against bad input
      status: "bogus-status",
    });
    expect(result.kind).toBe("invalid_status");
  });

  it("returns invalid_resolution_note when note exceeds 2000 chars", async () => {
    const result = await updateReport(adminAClient, {
      reportId,
      actorUserId: adminAId,
      status: "resolved",
      resolutionNote: "x".repeat(2001),
    });
    expect(result.kind).toBe("invalid_resolution_note");
  });
});
