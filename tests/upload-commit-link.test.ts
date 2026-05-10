/**
 * Phase: dashboard recent-uploads → upload-detail.
 * commitStaged must persist the supplied upload_job_id on every inserted question
 * so the upload-detail page can list "questions added by this upload".
 * Synced rows + legacy rows leave it null.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { goodXlsxBuffer, GOOD_ROWS } from "./fixtures/upload";
import { parseXlsx } from "@/lib/upload/parser";
import { validateRow } from "@/lib/upload/validate";
import { commitStaged } from "@/lib/upload/commit";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);

describe.skipIf(!HAS_ENV)("commitStaged links inserted questions to upload_job_id", () => {
  let admin: SupabaseClient;
  let orgId: string;
  let adminUserId: string;
  let examId: string;
  let jobId: string;

  beforeAll(async () => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    const { data: u } = await admin.auth.admin.createUser({
      email: `commit-link-${RUN_ID}@test.local`,
      password: "commit-link-pw-1234",
      email_confirm: true,
    });
    adminUserId = u.user!.id;

    const { data: org } = await admin
      .from("organizations")
      .insert({ name: `Commit-Link Org ${RUN_ID}` })
      .select("id")
      .single();
    orgId = org!.id;

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

    const { data: job } = await admin
      .from("upload_jobs")
      .insert({
        org_id: orgId,
        filename: `commit-link-${RUN_ID}.xlsx`,
        status: "PROCESSING",
        created_by: adminUserId,
      })
      .select("id")
      .single();
    jobId = job!.id;
  });

  afterAll(async () => {
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    if (adminUserId) await admin.auth.admin.deleteUser(adminUserId);
  });

  it("populates upload_job_id on every inserted question when supplied", async () => {
    const parsed = parseXlsx(goodXlsxBuffer());
    const validated = parsed.rows.map(validateRow);
    const valid = validated.filter((v) => v.errors.length === 0);

    const result = await commitStaged(admin, {
      orgId,
      examId,
      filename: `commit-link-${RUN_ID}.xlsx`,
      createdBy: adminUserId,
      uploadJobId: jobId,
      rows: valid.map((v) => v.parsed!),
    });
    expect(result.inserted).toBe(GOOD_ROWS.length);

    const { data: questions } = await admin
      .from("questions")
      .select("id, upload_job_id")
      .eq("org_id", orgId);

    expect(questions).toHaveLength(GOOD_ROWS.length);
    expect(questions!.every((q) => q.upload_job_id === jobId)).toBe(true);
  });

  it("leaves upload_job_id null when not supplied (sync/legacy paths)", async () => {
    const { data: org2 } = await admin
      .from("organizations")
      .insert({ name: `Commit-Nolink Org ${RUN_ID}` })
      .select("id")
      .single();
    const otherOrgId = org2!.id;
    await admin.from("org_members").insert({
      org_id: otherOrgId,
      user_id: adminUserId,
      role: "ADMIN",
    });

    try {
      const parsed = parseXlsx(goodXlsxBuffer());
      const validated = parsed.rows.map(validateRow);
      const valid = validated.filter((v) => v.errors.length === 0);

      await commitStaged(admin, {
        orgId: otherOrgId,
        examId,
        filename: `nolink-${RUN_ID}.xlsx`,
        createdBy: adminUserId,
        rows: valid.map((v) => v.parsed!),
      });

      const { data: questions } = await admin
        .from("questions")
        .select("upload_job_id")
        .eq("org_id", otherOrgId);
      expect(questions!.every((q) => q.upload_job_id === null)).toBe(true);
    } finally {
      await admin.from("organizations").delete().eq("id", otherOrgId);
    }
  });
});
