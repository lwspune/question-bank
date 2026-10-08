/**
 * commitStaged's optional `visibility`.
 *
 * Rows default to PUBLIC (migration 0022), and pipelines that want PRIVATE
 * flipped the rows AFTER the insert, which leaves them public for a moment.
 * IMAT must never be public until its copyright question is answered
 * (NICHE_SITES_SPEC.md D1), so it writes PRIVATE at insert. Omitting the
 * option must keep the old default.
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
    chapterName: `Visibility ${RUN_ID}`,
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

describe.skipIf(!HAS_ENV)("commitStaged + visibility", () => {
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
      email: `commit-vis-${RUN_ID}@test.local`,
      password: "commit-vis-pw-1234",
      email_confirm: true,
    });
    adminUserId = u.user!.id;

    const { data: org } = await admin
      .from("organizations")
      .insert({ name: `Commit-Vis Org ${RUN_ID}` })
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

  async function visibilityOf(hash: string) {
    const { data } = await admin
      .from("questions")
      .select("visibility")
      .eq("org_id", orgId)
      .eq("content_hash", hash)
      .single();
    return data!.visibility as string;
  }

  it("writes PRIVATE at insert when asked", async () => {
    const row = mcq(1, `Private probe ${RUN_ID}?`, ["one", "two", "three", "four", "five"], "C");
    const result = await commitStaged(admin, {
      orgId,
      examId,
      filename: `vis-private-${RUN_ID}.json`,
      createdBy: adminUserId,
      rows: [row],
      visibility: "PRIVATE",
    });
    expect(result.errors).toEqual([]);
    expect(result.inserted).toBe(1);
    expect(await visibilityOf(row.contentHash)).toBe("PRIVATE");
  });

  it("keeps the PUBLIC default when the option is omitted", async () => {
    const row = mcq(2, `Default probe ${RUN_ID}?`, ["uno", "due", "tre", "quattro"], "A");
    const result = await commitStaged(admin, {
      orgId,
      examId,
      filename: `vis-default-${RUN_ID}.json`,
      createdBy: adminUserId,
      rows: [row],
    });
    expect(result.errors).toEqual([]);
    expect(result.inserted).toBe(1);
    expect(await visibilityOf(row.contentHash)).toBe("PUBLIC");
  });
});
