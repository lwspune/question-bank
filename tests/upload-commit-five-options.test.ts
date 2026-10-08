/**
 * Five-option MCQs (A-E) through the commit path.
 *
 * IMAT papers print five options per question; the bank allowed four
 * (`option_label` enum, migration 0001). commitStaged must store all five,
 * with E as a legal correct answer, and a four-option question must commit
 * exactly as before. See NICHE_SITES_SPEC.md, step C2.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { commitStaged } from "@/lib/upload/commit";
import { contentHash } from "@/lib/upload/hash";
import type { ParsedRowPayload, StoredOptionLabel } from "@/lib/upload/validate";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);

function mcq(
  sourceRow: number,
  text: string,
  optionTexts: string[],
  answer: StoredOptionLabel
): ParsedRowPayload {
  const labels = (["A", "B", "C", "D", "E"] as const).slice(0, optionTexts.length);
  return {
    sourceRow,
    subjectName: "Physics",
    chapterName: `Five Options ${RUN_ID}`,
    subtopicName: "Probe",
    text,
    difficulty: "MODERATE",
    options: labels.map((label, i) => ({
      label,
      text: optionTexts[i],
      isCorrect: label === answer,
    })),
    contentHash: contentHash(text, optionTexts, answer),
  };
}

describe.skipIf(!HAS_ENV)("commitStaged + five options", () => {
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
      email: `commit-five-${RUN_ID}@test.local`,
      password: "commit-five-pw-1234",
      email_confirm: true,
    });
    adminUserId = u.user!.id;

    const { data: org } = await admin
      .from("organizations")
      .insert({ name: `Commit-Five Org ${RUN_ID}` })
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

  async function optionsOf(hash: string) {
    const { data: q } = await admin
      .from("questions")
      .select("id")
      .eq("org_id", orgId)
      .eq("content_hash", hash)
      .single();
    const { data: opts } = await admin
      .from("options")
      .select("label, text, is_correct")
      .eq("question_id", q!.id)
      .order("label");
    return opts!;
  }

  it("stores all five options when E is the correct one", async () => {
    const row = mcq(
      1,
      `Five-option probe ${RUN_ID}: which is the fifth letter?`,
      ["A one", "B two", "C three", "D four", "E five"],
      "E"
    );

    const result = await commitStaged(admin, {
      orgId,
      examId,
      filename: `five-${RUN_ID}.json`,
      createdBy: adminUserId,
      rows: [row],
    });

    expect(result.errors).toEqual([]);
    expect(result.inserted).toBe(1);
    const opts = await optionsOf(row.contentHash);
    expect(opts.map((o) => o.label)).toEqual(["A", "B", "C", "D", "E"]);
    expect(opts.filter((o) => o.is_correct).map((o) => o.label)).toEqual(["E"]);
  });

  it("still commits a four-option question unchanged", async () => {
    const row = mcq(
      2,
      `Four-option probe ${RUN_ID}: which is the second letter?`,
      ["first", "second", "third", "fourth"],
      "B"
    );

    const result = await commitStaged(admin, {
      orgId,
      examId,
      filename: `four-${RUN_ID}.json`,
      createdBy: adminUserId,
      rows: [row],
    });

    expect(result.errors).toEqual([]);
    expect(result.inserted).toBe(1);
    const opts = await optionsOf(row.contentHash);
    expect(opts.map((o) => o.label)).toEqual(["A", "B", "C", "D"]);
    expect(opts.filter((o) => o.is_correct).map((o) => o.label)).toEqual(["B"]);
  });
});
