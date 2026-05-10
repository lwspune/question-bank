/**
 * Phase A — upload-time PYQ details.
 * commitStaged stamps pyq_year, pyq_month, pyq_note onto every inserted
 * question when supplied. Omit any subset → corresponding column stays NULL.
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

describe.skipIf(!HAS_ENV)("commitStaged + pyq metadata", () => {
  let admin: SupabaseClient;
  let orgId: string;
  let adminUserId: string;
  let examId: string;

  beforeAll(async () => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    const { data: u } = await admin.auth.admin.createUser({
      email: `commit-pyq-${RUN_ID}@test.local`,
      password: "commit-pyq-pw-1234",
      email_confirm: true,
    });
    adminUserId = u.user!.id;

    const { data: org } = await admin
      .from("organizations")
      .insert({ name: `Commit-PYQ Org ${RUN_ID}` })
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
  });

  afterAll(async () => {
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    if (adminUserId) await admin.auth.admin.deleteUser(adminUserId);
  });

  async function makeJob(): Promise<string> {
    const { data } = await admin
      .from("upload_jobs")
      .insert({
        org_id: orgId,
        filename: `pyq-${RUN_ID}-${Math.random()}.xlsx`,
        status: "PROCESSING",
        created_by: adminUserId,
      })
      .select("id")
      .single();
    return data!.id as string;
  }

  it("stamps pyq_year, pyq_month, pyq_note on every inserted question", async () => {
    const jobId = await makeJob();
    const parsed = parseXlsx(goodXlsxBuffer());
    const valid = parsed.rows
      .map(validateRow)
      .filter((v) => v.errors.length === 0)
      .map((v) => v.parsed!);

    const result = await commitStaged(admin, {
      orgId,
      examId,
      filename: `pyq-${RUN_ID}-a.xlsx`,
      createdBy: adminUserId,
      uploadJobId: jobId,
      rows: valid,
      pyqYear: 2025,
      pyqMonth: "May",
      pyqNote: "Shift I",
    });
    expect(result.inserted).toBe(GOOD_ROWS.length);

    const { data: questions } = await admin
      .from("questions")
      .select("pyq_year, pyq_month, pyq_note")
      .eq("upload_job_id", jobId);

    expect(questions).toHaveLength(GOOD_ROWS.length);
    expect(
      questions!.every(
        (q) =>
          q.pyq_year === 2025 &&
          q.pyq_month === "May" &&
          q.pyq_note === "Shift I"
      )
    ).toBe(true);
  });

  it("leaves pyq_* columns NULL when fields are not supplied", async () => {
    // Need a fresh org so the GOOD_ROWS content_hashes don't dedupe-skip.
    const { data: org2 } = await admin
      .from("organizations")
      .insert({ name: `Commit-PYQ-NULL Org ${RUN_ID}` })
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
      const valid = parsed.rows
        .map(validateRow)
        .filter((v) => v.errors.length === 0)
        .map((v) => v.parsed!);

      await commitStaged(admin, {
        orgId: otherOrgId,
        examId,
        filename: `pyq-${RUN_ID}-null.xlsx`,
        createdBy: adminUserId,
        rows: valid,
      });

      const { data: questions } = await admin
        .from("questions")
        .select("pyq_year, pyq_month, pyq_note")
        .eq("org_id", otherOrgId);

      expect(
        questions!.every(
          (q) =>
            q.pyq_year === null &&
            q.pyq_month === null &&
            q.pyq_note === null
        )
      ).toBe(true);
    } finally {
      await admin.from("organizations").delete().eq("id", otherOrgId);
    }
  });

  it("partial fields supplied → only those columns set, others NULL", async () => {
    const { data: org3 } = await admin
      .from("organizations")
      .insert({ name: `Commit-PYQ-PARTIAL Org ${RUN_ID}` })
      .select("id")
      .single();
    const partialOrgId = org3!.id;
    await admin.from("org_members").insert({
      org_id: partialOrgId,
      user_id: adminUserId,
      role: "ADMIN",
    });

    try {
      const parsed = parseXlsx(goodXlsxBuffer());
      const valid = parsed.rows
        .map(validateRow)
        .filter((v) => v.errors.length === 0)
        .map((v) => v.parsed!);

      await commitStaged(admin, {
        orgId: partialOrgId,
        examId,
        filename: `pyq-${RUN_ID}-partial.xlsx`,
        createdBy: adminUserId,
        rows: valid,
        pyqYear: 2024,
      });

      const { data: questions } = await admin
        .from("questions")
        .select("pyq_year, pyq_month, pyq_note")
        .eq("org_id", partialOrgId);

      expect(
        questions!.every(
          (q) =>
            q.pyq_year === 2024 &&
            q.pyq_month === null &&
            q.pyq_note === null
        )
      ).toBe(true);
    } finally {
      await admin.from("organizations").delete().eq("id", partialOrgId);
    }
  });
});
