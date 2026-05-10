/**
 * Phase C — bulk-set on /uploads/[id].
 * setUploadPyqMetadata updates pyq_year/month/note across every question
 * linked to a job, scoped to the caller's org. Partial fields are honoured;
 * an explicit null clears the value.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { contentHash } from "@/lib/upload/hash";
import { setUploadPyqMetadata } from "@/lib/upload/setUploadPyqMetadata";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);

describe.skipIf(!HAS_ENV)("setUploadPyqMetadata", () => {
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
      email: `pyq-bulk-${RUN_ID}@test.local`,
      password: "pyq-bulk-pw-1234",
      email_confirm: true,
    });
    adminUserId = u.user!.id;

    const { data: orgs } = await admin
      .from("organizations")
      .insert([
        { name: `PYQ-Bulk Org A ${RUN_ID}` },
        { name: `PYQ-Bulk Org B ${RUN_ID}` },
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
      .insert({ exam_id: examId, name: `PYQB_Subject_${RUN_ID}` })
      .select("id")
      .single();
    subjectId = sub!.id;

    const { data: ch } = await admin
      .from("chapters")
      .insert({
        subject_id: subjectId,
        name: `PYQB_Chapter_${RUN_ID}`,
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
    slug: string,
    initial?: { year?: number; month?: string; note?: string }
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
        pyq_year: initial?.year ?? null,
        pyq_month: initial?.month ?? null,
        pyq_note: initial?.note ?? null,
        created_by: adminUserId,
      })
      .select("id")
      .single();
    return q!.id as string;
  }

  it("returns not_found for an unknown job id", async () => {
    const result = await setUploadPyqMetadata(
      admin,
      "00000000-0000-0000-0000-000000000000",
      orgId,
      { pyqYear: 2025 }
    );
    expect(result.kind).toBe("not_found");
  });

  it("returns forbidden when caller is from a different org", async () => {
    const jobId = await makeJob(`pyq-forbid-${RUN_ID}.xlsx`);
    const result = await setUploadPyqMetadata(admin, jobId, otherOrgId, {
      pyqYear: 2025,
    });
    expect(result.kind).toBe("forbidden");
  });

  it("sets all three fields across only the target job's questions", async () => {
    const jobA = await makeJob(`pyq-A-${RUN_ID}.xlsx`);
    const jobB = await makeJob(`pyq-B-${RUN_ID}.xlsx`);
    const a1 = await makeQuestion(jobA, `pyq-a1-${RUN_ID}`);
    const a2 = await makeQuestion(jobA, `pyq-a2-${RUN_ID}`);
    const b1 = await makeQuestion(jobB, `pyq-b1-${RUN_ID}`);

    const result = await setUploadPyqMetadata(admin, jobA, orgId, {
      pyqYear: 2025,
      pyqMonth: "May",
      pyqNote: "Shift I",
    });
    expect(result.kind).toBe("ok");
    if (result.kind !== "ok") return;
    expect(result.updated).toBe(2);

    const { data: aRows } = await admin
      .from("questions")
      .select("pyq_year, pyq_month, pyq_note")
      .in("id", [a1, a2]);
    expect(
      aRows!.every(
        (q) =>
          q.pyq_year === 2025 &&
          q.pyq_month === "May" &&
          q.pyq_note === "Shift I"
      )
    ).toBe(true);

    const { data: bRow } = await admin
      .from("questions")
      .select("pyq_year, pyq_month, pyq_note")
      .eq("id", b1)
      .single();
    expect(bRow!.pyq_year).toBeNull();
    expect(bRow!.pyq_month).toBeNull();
    expect(bRow!.pyq_note).toBeNull();
  });

  it("partial update touches only the supplied fields", async () => {
    const jobId = await makeJob(`pyq-partial-${RUN_ID}.xlsx`);
    const qid = await makeQuestion(jobId, `pyq-partial-${RUN_ID}`, {
      year: 2024,
      month: "April",
      note: "Shift II",
    });

    const result = await setUploadPyqMetadata(admin, jobId, orgId, {
      pyqMonth: "May",
    });
    expect(result.kind).toBe("ok");

    const { data: q } = await admin
      .from("questions")
      .select("pyq_year, pyq_month, pyq_note")
      .eq("id", qid)
      .single();
    expect(q!.pyq_year).toBe(2024);
    expect(q!.pyq_month).toBe("May");
    expect(q!.pyq_note).toBe("Shift II");
  });

  it("explicit null clears the field", async () => {
    const jobId = await makeJob(`pyq-clear-${RUN_ID}.xlsx`);
    const qid = await makeQuestion(jobId, `pyq-clear-${RUN_ID}`, {
      year: 2024,
      month: "April",
      note: "Shift II",
    });

    const result = await setUploadPyqMetadata(admin, jobId, orgId, {
      pyqYear: null,
      pyqNote: null,
    });
    expect(result.kind).toBe("ok");

    const { data: q } = await admin
      .from("questions")
      .select("pyq_year, pyq_month, pyq_note")
      .eq("id", qid)
      .single();
    expect(q!.pyq_year).toBeNull();
    expect(q!.pyq_month).toBe("April");
    expect(q!.pyq_note).toBeNull();
  });

  it("returns ok with updated=0 for a job with no linked questions", async () => {
    const jobId = await makeJob(`pyq-empty-${RUN_ID}.xlsx`);
    const result = await setUploadPyqMetadata(admin, jobId, orgId, {
      pyqYear: 2025,
    });
    expect(result.kind).toBe("ok");
    if (result.kind !== "ok") return;
    expect(result.updated).toBe(0);
  });

  it("no fields supplied → ok with updated=0 (no-op)", async () => {
    const jobId = await makeJob(`pyq-noop-${RUN_ID}.xlsx`);
    await makeQuestion(jobId, `pyq-noop-${RUN_ID}`);
    const result = await setUploadPyqMetadata(admin, jobId, orgId, {});
    expect(result.kind).toBe("ok");
    if (result.kind !== "ok") return;
    expect(result.updated).toBe(0);
  });
});
