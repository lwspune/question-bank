/**
 * V files a slip it spotted in our solution as a question report (migration
 * 0183, 2026-10-23): one open V report per question, with no user named, in
 * the question's org so it lands in that org's triage at /dashboard/reports.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { fileVSolutionReport } from "@/lib/reports/fileVReport";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);

describe.skipIf(!HAS_ENV)("fileVSolutionReport", () => {
  let admin: SupabaseClient;
  let orgId: string;
  let questionId: string;
  let userId: string;

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const { data: org } = await admin.from("organizations").insert({ name: `VRep Org ${RUN_ID}` }).select("id").single();
    orgId = org!.id;
    // A question needs its author; V's report names nobody.
    const { data: u } = await admin.auth.admin.createUser({ email: `vrep-${RUN_ID}@test.local`, password: `vrep-${RUN_ID}-pw`, email_confirm: true });
    userId = u.user!.id;
    const { data: ex } = await admin.from("exams").select("id").limit(1).single();
    const { data: sb } = await admin.from("subjects").select("id").eq("exam_id", ex!.id).limit(1).single();
    const { data: ch } = await admin.from("chapters").select("id").eq("subject_id", sb!.id).limit(1).single();
    const { data: q } = await admin
      .from("questions")
      .insert({
        org_id: orgId,
        exam_id: ex!.id,
        subject_id: sb!.id,
        chapter_id: ch!.id,
        text: `v-report test ${RUN_ID}`,
        difficulty: "EASY",
        content_hash: `v-report-${RUN_ID}`,
        created_by: userId,
        visibility: "PUBLIC",
      })
      .select("id")
      .single();
    questionId = q!.id;
  });

  afterAll(async () => {
    if (questionId) {
      await admin.from("question_reports").delete().eq("question_id", questionId);
      await admin.from("questions").delete().eq("id", questionId);
    }
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    if (userId) await admin.auth.admin.deleteUser(userId);
  });

  it("files one report per question while it is open, naming no user, in the question's org", async () => {
    expect(await fileVSolutionReport(admin, questionId, "The list has -1 twice; the second should be 1.")).toBe("filed");
    expect(await fileVSolutionReport(admin, questionId, "Same slip, asked again.")).toBe("already");
    const { data } = await admin
      .from("question_reports")
      .select("reported_by, org_id, category, details, filed_by_v, status")
      .eq("question_id", questionId);
    expect(data).toEqual([
      {
        reported_by: null,
        org_id: orgId,
        category: "incorrect-solution",
        details: "V, while explaining: The list has -1 twice; the second should be 1.",
        filed_by_v: true,
        status: "open",
      },
    ]);
  });

  it("files again once the team has closed the earlier one", async () => {
    await admin.from("question_reports").update({ status: "resolved", resolved_at: new Date().toISOString() }).eq("question_id", questionId);
    expect(await fileVSolutionReport(admin, questionId, "Another slip in step 3.")).toBe("filed");
  });

  it("says failed, never throws, for a question that does not exist", async () => {
    expect(await fileVSolutionReport(admin, randomUUID(), "x")).toBe("failed");
  });
});
