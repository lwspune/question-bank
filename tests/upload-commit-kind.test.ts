/**
 * commitStaged's optional `questionKind`.
 *
 * Rows default to question_kind 'pyq' (migration 0036). The NDA practice
 * pipeline flips its rows to 'practice' AFTER the insert, so for a moment they
 * count as past questions. The IMAT twins (our own practice questions) write
 * 'practice' at insert instead. Omitting the option must keep the old default.
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

function mcq(sourceRow: number, text: string, optionTexts: string[], answer: StoredOptionLabel): ParsedRowPayload {
  const labels = (["A", "B", "C", "D", "E"] as const).slice(0, optionTexts.length);
  return {
    sourceRow,
    subjectName: "Physics",
    chapterName: `Kind ${RUN_ID}`,
    subtopicName: "Probe",
    text,
    difficulty: "MODERATE",
    solution: "Worked solution.",
    options: labels.map((label, i) => ({ label, text: optionTexts[i], isCorrect: label === answer })),
    contentHash: contentHash(text, optionTexts, answer),
  };
}

describe.skipIf(!HAS_ENV)("commitStaged + questionKind", () => {
  let admin: SupabaseClient;
  let orgId: string;
  let adminUserId: string;
  let examId: string;

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const { data: u } = await admin.auth.admin.createUser({
      email: `commit-kind-${RUN_ID}@test.local`,
      password: "commit-kind-pw-1234",
      email_confirm: true,
    });
    adminUserId = u.user!.id;
    const { data: org } = await admin.from("organizations").insert({ name: `Commit-Kind Org ${RUN_ID}` }).select("id").single();
    orgId = org!.id;
    await admin.from("org_members").insert({ org_id: orgId, user_id: adminUserId, role: "ADMIN" });
    const { data: exam } = await admin.from("exams").select("id").eq("name", "MHT-CET").single();
    examId = exam!.id;
  });

  afterAll(async () => {
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    if (adminUserId) await admin.auth.admin.deleteUser(adminUserId);
  });

  async function rowOf(hash: string) {
    const { data } = await admin
      .from("questions")
      .select("question_kind, visibility, solution")
      .eq("org_id", orgId)
      .eq("content_hash", hash)
      .single();
    return data!;
  }

  it("writes question_kind 'practice' at insert when asked, with the solution", async () => {
    const row = mcq(1, `Practice probe ${RUN_ID}?`, ["one", "two", "three", "four", "five"], "D");
    const result = await commitStaged(admin, {
      orgId,
      examId,
      filename: `kind-practice-${RUN_ID}.json`,
      createdBy: adminUserId,
      rows: [row],
      visibility: "PRIVATE",
      questionKind: "practice",
    });
    expect(result.errors).toEqual([]);
    expect(result.inserted).toBe(1);
    expect(await rowOf(row.contentHash)).toEqual({ question_kind: "practice", visibility: "PRIVATE", solution: "Worked solution." });
  });

  it("keeps the 'pyq' default when the option is omitted", async () => {
    const row = mcq(2, `Default kind probe ${RUN_ID}?`, ["uno", "due", "tre", "quattro"], "B");
    const result = await commitStaged(admin, {
      orgId,
      examId,
      filename: `kind-default-${RUN_ID}.json`,
      createdBy: adminUserId,
      rows: [row],
      visibility: "PRIVATE",
    });
    expect(result.errors).toEqual([]);
    expect((await rowOf(row.contentHash)).question_kind).toBe("pyq");
  });
});
