/**
 * deleteUploadJob — admin removes a whole upload: every question linked to it
 * via upload_job_id is deleted (options cascade), then the upload_jobs row goes.
 * Questions with upload_job_id = null (synced/legacy) and questions linked to
 * other jobs must remain untouched.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { contentHash } from "@/lib/upload/hash";
import { deleteUploadJob } from "@/lib/upload/deleteUploadJob";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);

describe.skipIf(!HAS_ENV)("deleteUploadJob", () => {
  let admin: SupabaseClient;
  let orgId: string;
  let otherOrgId: string;
  let adminUserId: string;
  let examId: string;
  let subjectId: string;
  let chapterId: string;

  beforeAll(async () => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    const { data: u } = await admin.auth.admin.createUser({
      email: `up-delete-${RUN_ID}@test.local`,
      password: "up-delete-pw-1234",
      email_confirm: true,
    });
    adminUserId = u.user!.id;

    const { data: orgs } = await admin
      .from("organizations")
      .insert([
        { name: `UpDelete Org A ${RUN_ID}` },
        { name: `UpDelete Org B ${RUN_ID}` },
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
      .insert({ exam_id: examId, name: `UD_DelSubject_${RUN_ID}` })
      .select("id")
      .single();
    subjectId = sub!.id;

    const { data: ch } = await admin
      .from("chapters")
      .insert({
        subject_id: subjectId,
        name: `UD_DelChapter_${RUN_ID}`,
        order_index: 0,
      })
      .select("id")
      .single();
    chapterId = ch!.id;
  });

  afterAll(async () => {
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    if (otherOrgId) await admin.from("organizations").delete().eq("id", otherOrgId);
    // Taxonomy isn't org-scoped — explicitly delete the test subject
    // (cascades chapters/subtopics) or it leaks into /browse filters.
    if (subjectId) await admin.from("subjects").delete().eq("id", subjectId);
    if (adminUserId) await admin.auth.admin.deleteUser(adminUserId);
  });

  async function makeJob(filename: string): Promise<string> {
    const { data } = await admin
      .from("upload_jobs")
      .insert({
        org_id: orgId,
        filename,
        status: "COMPLETED",
        inserted: 0,
        skipped: 0,
        created_by: adminUserId,
      })
      .select("id")
      .single();
    return data!.id as string;
  }

  async function makeQuestion(
    jobId: string | null,
    slug: string
  ): Promise<string> {
    const text = `${slug}?`;
    const hash = contentHash(text, ["a", "b", "c", "d"], "A");
    const { data: q } = await admin
      .from("questions")
      .insert({
        org_id: orgId,
        exam_id: examId,
        subject_id: subjectId,
        chapter_id: chapterId,
        text,
        difficulty: "EASY",
        content_hash: hash,
        upload_job_id: jobId,
        created_by: adminUserId,
      })
      .select("id")
      .single();
    await admin.from("options").insert([
      { question_id: q!.id, label: "A", text: "a", is_correct: true },
      { question_id: q!.id, label: "B", text: "b", is_correct: false },
      { question_id: q!.id, label: "C", text: "c", is_correct: false },
      { question_id: q!.id, label: "D", text: "d", is_correct: false },
    ]);
    return q!.id as string;
  }

  it("returns not_found for an unknown job id", async () => {
    const result = await deleteUploadJob(
      admin,
      "00000000-0000-0000-0000-000000000000",
      orgId
    );
    expect(result.kind).toBe("not_found");
  });

  it("returns forbidden when caller is from a different org", async () => {
    const jobId = await makeJob(`forbid-${RUN_ID}.xlsx`);
    const result = await deleteUploadJob(admin, jobId, otherOrgId);
    expect(result.kind).toBe("forbidden");
    const { data } = await admin
      .from("upload_jobs")
      .select("id")
      .eq("id", jobId)
      .maybeSingle();
    expect(data?.id).toBe(jobId);
  });

  it("deletes only its own questions; orphans + other jobs are untouched", async () => {
    const jobId = await makeJob(`del-${RUN_ID}.xlsx`);
    const otherJobId = await makeJob(`del-other-${RUN_ID}.xlsx`);
    const linked1 = await makeQuestion(jobId, `del-linked-1-${RUN_ID}`);
    const linked2 = await makeQuestion(jobId, `del-linked-2-${RUN_ID}`);
    const orphan = await makeQuestion(null, `del-orphan-${RUN_ID}`);
    const other = await makeQuestion(otherJobId, `del-otherq-${RUN_ID}`);

    const result = await deleteUploadJob(admin, jobId, orgId);
    expect(result.kind).toBe("ok");
    if (result.kind !== "ok") return;
    expect(result.deletedQuestionCount).toBe(2);

    const { data: linkedNow } = await admin
      .from("questions")
      .select("id")
      .in("id", [linked1, linked2]);
    expect(linkedNow).toEqual([]);

    const { data: orphanStill } = await admin
      .from("questions")
      .select("id")
      .eq("id", orphan)
      .maybeSingle();
    expect(orphanStill?.id).toBe(orphan);

    const { data: otherStill } = await admin
      .from("questions")
      .select("id")
      .eq("id", other)
      .maybeSingle();
    expect(otherStill?.id).toBe(other);

    const { data: jobNow } = await admin
      .from("upload_jobs")
      .select("id")
      .eq("id", jobId)
      .maybeSingle();
    expect(jobNow).toBeNull();
  });

  it("returns ok with deletedQuestionCount=0 for a no-op upload (all rows were dedup-skipped)", async () => {
    const jobId = await makeJob(`del-noop-${RUN_ID}.xlsx`);
    const result = await deleteUploadJob(admin, jobId, orgId);
    expect(result.kind).toBe("ok");
    if (result.kind !== "ok") return;
    expect(result.deletedQuestionCount).toBe(0);
    const { data: jobNow } = await admin
      .from("upload_jobs")
      .select("id")
      .eq("id", jobId)
      .maybeSingle();
    expect(jobNow).toBeNull();
  });
});
