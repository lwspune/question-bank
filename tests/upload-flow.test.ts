/**
 * End-to-end test of the upload pipeline:
 * - parse fixture .xlsx
 * - validate rows
 * - resolve+auto-create taxonomy under a known exam+subject
 * - bulk-insert questions+options
 * - re-run commit and confirm idempotency
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
const ORG_NAME = `Upload Flow Org ${RUN_ID}`;
const ADMIN_EMAIL = `upload-admin-${RUN_ID}@test.local`;

describe.skipIf(!HAS_ENV)("upload flow — parse, validate, commit, idempotent", () => {
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
      email: ADMIN_EMAIL,
      password: "upload-flow-test-pw-1234",
      email_confirm: true,
    });
    adminUserId = u.user!.id;

    const { data: org } = await admin
      .from("organizations")
      .insert({ name: ORG_NAME })
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

  it("parses + validates fixture, commits all rows, then re-commits 0", async () => {
    const parsed = parseXlsx(goodXlsxBuffer());
    const validated = parsed.rows.map(validateRow);
    const valid = validated.filter((v) => v.errors.length === 0);
    expect(valid).toHaveLength(GOOD_ROWS.length);

    const first = await commitStaged(admin, {
      orgId,
      examId,
      filename: "good.xlsx",
      createdBy: adminUserId,
      rows: valid.map((v) => v.parsed!),
    });
    expect(first.inserted).toBe(GOOD_ROWS.length);
    expect(first.skipped).toBe(0);

    const { count: qCount } = await admin
      .from("questions")
      .select("*", { count: "exact", head: true })
      .eq("org_id", orgId);
    expect(qCount).toBe(GOOD_ROWS.length);

    const { count: oCount } = await admin
      .from("options")
      .select("*", { count: "exact", head: true })
      .in(
        "question_id",
        (
          await admin.from("questions").select("id").eq("org_id", orgId)
        ).data!.map((q) => q.id)
      );
    expect(oCount).toBe(GOOD_ROWS.length * 4);

    const second = await commitStaged(admin, {
      orgId,
      examId,
      filename: "good.xlsx",
      createdBy: adminUserId,
      rows: valid.map((v) => v.parsed!),
    });
    expect(second.inserted).toBe(0);
    expect(second.skipped).toBe(GOOD_ROWS.length);
  });
});
