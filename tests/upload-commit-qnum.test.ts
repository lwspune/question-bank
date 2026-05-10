/**
 * commitStaged persists ParsedRowPayload.questionNumber onto
 * questions.question_number. Undefined → NULL.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { goodXlsxBuffer } from "./fixtures/upload";
import { parseXlsx } from "@/lib/upload/parser";
import { validateRow } from "@/lib/upload/validate";
import { commitStaged } from "@/lib/upload/commit";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);

describe.skipIf(!HAS_ENV)("commitStaged + question_number", () => {
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
      email: `commit-qnum-${RUN_ID}@test.local`,
      password: "commit-qnum-pw-1234",
      email_confirm: true,
    });
    adminUserId = u.user!.id;

    const { data: org } = await admin
      .from("organizations")
      .insert({ name: `Commit-QNUM Org ${RUN_ID}` })
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

  it("persists question_number for every row that has one", async () => {
    const parsed = parseXlsx(goodXlsxBuffer());
    const valid = parsed.rows
      .map(validateRow)
      .filter((v) => v.errors.length === 0)
      .map((v) => v.parsed!);

    const result = await commitStaged(admin, {
      orgId,
      examId,
      filename: `qnum-${RUN_ID}.xlsx`,
      createdBy: adminUserId,
      rows: valid,
    });
    expect(result.inserted).toBe(5);

    const { data: questions } = await admin
      .from("questions")
      .select("source_row, question_number")
      .eq("org_id", orgId)
      .order("source_row", { ascending: true });
    expect(questions?.map((q) => q.question_number)).toEqual([
      "1",
      "2",
      "3",
      "4",
      "5",
    ]);
  });

  it("stores NULL when ParsedRowPayload has no questionNumber", async () => {
    const { data: org2 } = await admin
      .from("organizations")
      .insert({ name: `Commit-QNUM-NULL Org ${RUN_ID}` })
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
        .map((v) => ({ ...v.parsed!, questionNumber: undefined }));

      await commitStaged(admin, {
        orgId: otherOrgId,
        examId,
        filename: `qnum-null-${RUN_ID}.xlsx`,
        createdBy: adminUserId,
        rows: valid,
      });

      const { data: questions } = await admin
        .from("questions")
        .select("question_number")
        .eq("org_id", otherOrgId);
      expect(questions!.every((q) => q.question_number === null)).toBe(true);
    } finally {
      await admin.from("organizations").delete().eq("id", otherOrgId);
    }
  });
});
