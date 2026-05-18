/**
 * Integration test for createReport — the helper invoked by
 * POST /api/questions/[id]/reports.
 *
 * Verifies:
 *   - Happy path: TEACHER files a report on a PUBLIC question → ok
 *   - Cross-org: the report's org_id is the question owner's org (not the
 *     reporter's), so the question's home admins triage it
 *   - One open report per (user, question): repeat insert returns
 *     duplicate_open_report
 *   - After resolving the first report, the user can file a new one
 *   - Unknown / unreadable question → question_not_found
 *   - details longer than the 2000-char cap → invalid_details
 *
 * Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { createReport } from "@/lib/reports/createReport";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "reports-create-pw-1234";
const RUN_ID = randomUUID().slice(0, 8);

describe.skipIf(!HAS_ENV)("createReport", () => {
  let admin: SupabaseClient;
  let teacherClient: SupabaseClient;
  let teacherId: string;
  let orgOwnerId: string;
  let orgReporterId: string;
  let publicQuestionId: string;

  beforeAll(async () => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    // Two orgs: one owns the question, the other has the reporter.
    const [{ data: orgOwner }, { data: orgReporter }] = await Promise.all([
      admin
        .from("organizations")
        .insert({ name: `Reports Owner Org ${RUN_ID}` })
        .select("id")
        .single(),
      admin
        .from("organizations")
        .insert({ name: `Reports Reporter Org ${RUN_ID}` })
        .select("id")
        .single(),
    ]);
    orgOwnerId = orgOwner!.id;
    orgReporterId = orgReporter!.id;

    const { data: t } = await admin.auth.admin.createUser({
      email: `reports-teacher-${RUN_ID}@test.local`,
      password: PASSWORD,
      email_confirm: true,
    });
    teacherId = t.user!.id;
    await admin
      .from("org_members")
      .insert({ org_id: orgReporterId, user_id: teacherId, role: "TEACHER" });

    // Borrow taxonomy from the live bank
    const { data: ex } = await admin.from("exams").select("id").limit(1).single();
    const { data: sb } = await admin
      .from("subjects").select("id").eq("exam_id", ex!.id).limit(1).single();
    const { data: ch } = await admin
      .from("chapters").select("id").eq("subject_id", sb!.id).limit(1).single();

    const { data: pub } = await admin
      .from("questions")
      .insert({
        org_id: orgOwnerId,
        exam_id: ex!.id,
        subject_id: sb!.id,
        chapter_id: ch!.id,
        text: `reports-create test PUBLIC ${RUN_ID}`,
        difficulty: "EASY",
        content_hash: `reports-create-${RUN_ID}`,
        created_by: teacherId,
        visibility: "PUBLIC",
      })
      .select("id")
      .single();
    publicQuestionId = pub!.id;

    teacherClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } }
    );
    await teacherClient.auth.signInWithPassword({
      email: `reports-teacher-${RUN_ID}@test.local`,
      password: PASSWORD,
    });
  });

  afterAll(async () => {
    // Reports cascade with question, but if test ran without creating a question
    // (e.g. taxonomy lookup fail), clean defensively.
    if (publicQuestionId) {
      await admin.from("question_reports").delete().eq("question_id", publicQuestionId);
      await admin.from("questions").delete().eq("id", publicQuestionId);
    }
    if (orgOwnerId) await admin.from("organizations").delete().eq("id", orgOwnerId);
    if (orgReporterId) await admin.from("organizations").delete().eq("id", orgReporterId);
    if (teacherId) await admin.auth.admin.deleteUser(teacherId);
  });

  it("happy path: TEACHER files a report on a PUBLIC question → ok", async () => {
    const result = await createReport(teacherClient, {
      questionId: publicQuestionId,
      reportedBy: teacherId,
      category: "wrong-answer",
      details: "Option B looks wrong to me — should be A.",
    });
    expect(result.kind).toBe("ok");
    if (result.kind === "ok") {
      expect(typeof result.id).toBe("string");
    }

    // Verify the row landed with the question owner's org_id (NOT the reporter's)
    const { data: row } = await admin
      .from("question_reports")
      .select("org_id, category, status, reported_by")
      .eq("id", result.kind === "ok" ? result.id : "")
      .single();
    expect(row!.org_id).toBe(orgOwnerId);
    expect(row!.reported_by).toBe(teacherId);
    expect(row!.category).toBe("wrong-answer");
    expect(row!.status).toBe("open");

    // Clean up so the next test starts fresh
    if (result.kind === "ok") {
      await admin.from("question_reports").delete().eq("id", result.id);
    }
  });

  it("one open report per (user, question): repeat insert returns duplicate_open_report", async () => {
    const first = await createReport(teacherClient, {
      questionId: publicQuestionId,
      reportedBy: teacherId,
      category: "typo-or-formatting",
      details: null,
    });
    expect(first.kind).toBe("ok");

    const second = await createReport(teacherClient, {
      questionId: publicQuestionId,
      reportedBy: teacherId,
      category: "broken-image",
      details: "Try again",
    });
    expect(second.kind).toBe("duplicate_open_report");

    // Clean up
    if (first.kind === "ok") {
      await admin.from("question_reports").delete().eq("id", first.id);
    }
  });

  it("after resolving the first report, user can file a new one", async () => {
    const first = await createReport(teacherClient, {
      questionId: publicQuestionId,
      reportedBy: teacherId,
      category: "other",
      details: "first attempt",
    });
    expect(first.kind).toBe("ok");

    // Admin resolves the first report (service-role flip)
    if (first.kind === "ok") {
      await admin
        .from("question_reports")
        .update({
          status: "resolved",
          resolved_at: new Date().toISOString(),
        })
        .eq("id", first.id);
    }

    const second = await createReport(teacherClient, {
      questionId: publicQuestionId,
      reportedBy: teacherId,
      category: "other",
      details: "second attempt — new issue",
    });
    expect(second.kind).toBe("ok");

    // Clean up both
    await admin
      .from("question_reports")
      .delete()
      .eq("question_id", publicQuestionId)
      .eq("reported_by", teacherId);
  });

  it("returns question_not_found for a non-existent question id", async () => {
    const result = await createReport(teacherClient, {
      questionId: "00000000-0000-0000-0000-000000000000",
      reportedBy: teacherId,
      category: "other",
      details: null,
    });
    expect(result.kind).toBe("question_not_found");
  });

  it("returns invalid_details when details exceeds 2000 chars", async () => {
    const result = await createReport(teacherClient, {
      questionId: publicQuestionId,
      reportedBy: teacherId,
      category: "other",
      details: "x".repeat(2001),
    });
    expect(result.kind).toBe("invalid_details");
  });

  it("accepts null details (the field is optional)", async () => {
    const result = await createReport(teacherClient, {
      questionId: publicQuestionId,
      reportedBy: teacherId,
      category: "duplicate",
      details: null,
    });
    expect(result.kind).toBe("ok");
    // Clean up
    if (result.kind === "ok") {
      await admin.from("question_reports").delete().eq("id", result.id);
    }
  });
});
