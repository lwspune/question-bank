/**
 * getUploadDetail — fetch an upload_jobs row plus the questions linked to it
 * via upload_job_id, scoped to the caller's org. Used by /uploads/[id].
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { contentHash } from "@/lib/upload/hash";
import { getUploadDetail } from "@/lib/upload/uploadDetail";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);

describe.skipIf(!HAS_ENV)("getUploadDetail", () => {
  let admin: SupabaseClient;
  let orgId: string;
  let otherOrgId: string;
  let adminUserId: string;
  let examId: string;
  let subjectId: string;
  let chapterId: string;
  let jobId: string;
  let unrelatedJobId: string;

  beforeAll(async () => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    const { data: u } = await admin.auth.admin.createUser({
      email: `upload-detail-${RUN_ID}@test.local`,
      password: "upload-detail-pw-1234",
      email_confirm: true,
    });
    adminUserId = u.user!.id;

    const { data: orgs } = await admin
      .from("organizations")
      .insert([
        { name: `Upload-Detail Org A ${RUN_ID}` },
        { name: `Upload-Detail Org B ${RUN_ID}` },
      ])
      .select("id");
    orgId = orgs![0].id;
    otherOrgId = orgs![1].id;

    await admin.from("org_members").insert({
      org_id: orgId,
      user_id: adminUserId,
      role: "ADMIN",
    });

    const { data: exam } = await admin
      .from("exams")
      .select("id")
      .eq("name", "MHT-CET")
      .single();
    examId = exam!.id;

    const { data: sub } = await admin
      .from("subjects")
      .insert({ exam_id: examId, name: `UD_Subject_${RUN_ID}` })
      .select("id")
      .single();
    subjectId = sub!.id;

    const { data: ch } = await admin
      .from("chapters")
      .insert({
        subject_id: subjectId,
        name: `UD_Chapter_${RUN_ID}`,
        order_index: 0,
      })
      .select("id")
      .single();
    chapterId = ch!.id;

    const { data: job } = await admin
      .from("upload_jobs")
      .insert({
        org_id: orgId,
        filename: `upload-detail-${RUN_ID}.xlsx`,
        status: "COMPLETED",
        inserted: 2,
        skipped: 0,
        created_by: adminUserId,
      })
      .select("id")
      .single();
    jobId = job!.id;

    const { data: other } = await admin
      .from("upload_jobs")
      .insert({
        org_id: orgId,
        filename: `unrelated-${RUN_ID}.xlsx`,
        status: "COMPLETED",
        inserted: 1,
        skipped: 0,
        created_by: adminUserId,
      })
      .select("id")
      .single();
    unrelatedJobId = other!.id;

    await admin.from("questions").insert([
      {
        org_id: orgId,
        exam_id: examId,
        subject_id: subjectId,
        chapter_id: chapterId,
        text: `UD-Q1 ${RUN_ID}?`,
        difficulty: "EASY",
        content_hash: contentHash(`UD-Q1 ${RUN_ID}?`, ["a", "b", "c", "d"], "A"),
        source_row: 2,
        question_number: "Q1",
        upload_job_id: jobId,
        created_by: adminUserId,
      },
      {
        org_id: orgId,
        exam_id: examId,
        subject_id: subjectId,
        chapter_id: chapterId,
        text: `UD-Q2 ${RUN_ID}?`,
        difficulty: "MODERATE",
        content_hash: contentHash(`UD-Q2 ${RUN_ID}?`, ["a", "b", "c", "d"], "B"),
        source_row: 3,
        question_number: null,
        upload_job_id: jobId,
        created_by: adminUserId,
      },
      {
        org_id: orgId,
        exam_id: examId,
        subject_id: subjectId,
        chapter_id: chapterId,
        text: `UD-Other ${RUN_ID}?`,
        difficulty: "HARD",
        content_hash: contentHash(
          `UD-Other ${RUN_ID}?`,
          ["a", "b", "c", "d"],
          "C"
        ),
        source_row: 1,
        upload_job_id: unrelatedJobId,
        created_by: adminUserId,
      },
    ]);
  });

  afterAll(async () => {
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    if (otherOrgId) await admin.from("organizations").delete().eq("id", otherOrgId);
    // Taxonomy isn't org-scoped — must explicitly delete the subject we
    // inserted (cascades chapters + subtopics) or it leaks into the
    // public /browse Subject filter.
    if (subjectId) await admin.from("subjects").delete().eq("id", subjectId);
    if (adminUserId) await admin.auth.admin.deleteUser(adminUserId);
  });

  it("returns the job and only the questions linked to it", async () => {
    const result = await getUploadDetail(admin, jobId, orgId);
    expect(result.kind).toBe("ok");
    if (result.kind !== "ok") return;
    expect(result.job.id).toBe(jobId);
    expect(result.job.filename).toContain("upload-detail-");
    expect(result.job.inserted).toBe(2);
    expect(result.questions).toHaveLength(2);

    const texts = result.questions.map((q) => q.text).sort();
    expect(texts).toEqual([`UD-Q1 ${RUN_ID}?`, `UD-Q2 ${RUN_ID}?`]);
    for (const q of result.questions) {
      expect(q.subjectName).toContain("UD_Subject_");
      expect(q.chapterName).toContain("UD_Chapter_");
    }

    const byText = new Map(result.questions.map((q) => [q.text, q]));
    expect(byText.get(`UD-Q1 ${RUN_ID}?`)?.questionNumber).toBe("Q1");
    expect(byText.get(`UD-Q2 ${RUN_ID}?`)?.questionNumber).toBeNull();
  });

  it("aggregates pyq metadata: null when no question has any value", async () => {
    const result = await getUploadDetail(admin, jobId, orgId);
    expect(result.kind).toBe("ok");
    if (result.kind !== "ok") return;
    expect(result.pyqMetadata).toEqual({
      year: null,
      month: null,
      note: null,
    });
  });

  it('aggregates pyq metadata: returns the shared value or "mixed"', async () => {
    // Set both linked questions to year=2025, month=May. Note: leave Q2's note distinct.
    await admin
      .from("questions")
      .update({ pyq_year: 2025, pyq_month: "May", pyq_note: "Shift I" })
      .eq("upload_job_id", jobId)
      .eq("text", `UD-Q1 ${RUN_ID}?`);
    await admin
      .from("questions")
      .update({ pyq_year: 2025, pyq_month: "May", pyq_note: "Shift II" })
      .eq("upload_job_id", jobId)
      .eq("text", `UD-Q2 ${RUN_ID}?`);

    const result = await getUploadDetail(admin, jobId, orgId);
    expect(result.kind).toBe("ok");
    if (result.kind !== "ok") return;
    expect(result.pyqMetadata.year).toBe(2025);
    expect(result.pyqMetadata.month).toBe("May");
    expect(result.pyqMetadata.note).toBe("mixed");

    // Reset for the rest of the suite
    await admin
      .from("questions")
      .update({ pyq_year: null, pyq_month: null, pyq_note: null })
      .eq("upload_job_id", jobId);
  });

  it("returns not_found for an unknown job id", async () => {
    const result = await getUploadDetail(
      admin,
      "00000000-0000-0000-0000-000000000000",
      orgId
    );
    expect(result.kind).toBe("not_found");
  });

  it("returns forbidden when caller is from a different org", async () => {
    const result = await getUploadDetail(admin, jobId, otherOrgId);
    expect(result.kind).toBe("forbidden");
  });
});
