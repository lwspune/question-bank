/**
 * The publish guard (migration 0141): a question carrying `publish_blocked`
 * (the reason it may not be published) can never be PUBLIC. The database
 * refuses it, so no edit page, script or later pipeline can publish it by
 * accident. First user: the Cambridge-set IMAT papers 2011-2022, held for
 * internal use only. Clearing the reason is the one deliberate way back.
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
    chapterName: `Publish Block ${RUN_ID}`,
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

describe.skipIf(!HAS_ENV)("publish_blocked guard", () => {
  let admin: SupabaseClient;
  let orgId: string;
  let adminUserId: string;
  let examId: string;
  const REASON = "Test fixture: internal use only";

  beforeAll(async () => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
    const { data: u } = await admin.auth.admin.createUser({
      email: `pub-block-${RUN_ID}@test.local`,
      password: "pub-block-pw-1234",
      email_confirm: true,
    });
    adminUserId = u.user!.id;
    const { data: org } = await admin
      .from("organizations")
      .insert({ name: `Pub-Block Org ${RUN_ID}` })
      .select("id")
      .single();
    orgId = org!.id;
    await admin.from("org_members").insert({ org_id: orgId, user_id: adminUserId, role: "ADMIN" });
    const { data: exam } = await admin.from("exams").select("id").eq("name", "MHT-CET").single();
    examId = exam!.id;
  });

  afterAll(async () => {
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    if (adminUserId) await admin.auth.admin.deleteUser(adminUserId);
  });

  async function idOf(hash: string) {
    const { data } = await admin.from("questions").select("id, visibility, publish_blocked")
      .eq("org_id", orgId).eq("content_hash", hash).single();
    return data!;
  }

  it("commits a blocked row PRIVATE with its reason", async () => {
    const row = mcq(1, `Blocked probe ${RUN_ID}?`, ["one", "two", "three", "four", "five"], "B");
    const result = await commitStaged(admin, {
      orgId, examId, filename: `blocked-${RUN_ID}.json`, createdBy: adminUserId, rows: [row],
      visibility: "PRIVATE", publishBlocked: REASON,
    });
    expect(result.errors).toEqual([]);
    expect(result.inserted).toBe(1);
    const q = await idOf(row.contentHash);
    expect(q.visibility).toBe("PRIVATE");
    expect(q.publish_blocked).toBe(REASON);
  });

  it("refuses to make a blocked row PUBLIC", async () => {
    const row = mcq(2, `Blocked flip probe ${RUN_ID}?`, ["uno", "due", "tre", "quattro", "cinque"], "C");
    await commitStaged(admin, {
      orgId, examId, filename: `blocked-flip-${RUN_ID}.json`, createdBy: adminUserId, rows: [row],
      visibility: "PRIVATE", publishBlocked: REASON,
    });
    const q = await idOf(row.contentHash);
    const { error } = await admin.from("questions").update({ visibility: "PUBLIC" }).eq("id", q.id);
    expect(error?.code).toBe("23514");
    expect((await idOf(row.contentHash)).visibility).toBe("PRIVATE");
  });

  it("refuses a blocked row that would land PUBLIC by default", async () => {
    const row = mcq(3, `Blocked default probe ${RUN_ID}?`, ["a1", "b1", "c1", "d1", "e1"], "A");
    await expect(
      commitStaged(admin, {
        orgId, examId, filename: `blocked-default-${RUN_ID}.json`, createdBy: adminUserId, rows: [row],
        publishBlocked: REASON,
      })
    ).rejects.toThrow(/questions_publish_blocked_private/);
  });

  it("lets a row go PUBLIC once its reason is deliberately cleared", async () => {
    const row = mcq(4, `Unblock probe ${RUN_ID}?`, ["p", "q", "r", "s", "t"], "D");
    await commitStaged(admin, {
      orgId, examId, filename: `unblock-${RUN_ID}.json`, createdBy: adminUserId, rows: [row],
      visibility: "PRIVATE", publishBlocked: REASON,
    });
    const q = await idOf(row.contentHash);
    const { error } = await admin.from("questions")
      .update({ visibility: "PUBLIC", publish_blocked: null }).eq("id", q.id);
    expect(error).toBeNull();
    expect((await idOf(row.contentHash)).visibility).toBe("PUBLIC");
  });

  it("leaves unblocked rows free to change visibility", async () => {
    const row = mcq(5, `Free probe ${RUN_ID}?`, ["f1", "f2", "f3", "f4"], "A");
    await commitStaged(admin, {
      orgId, examId, filename: `free-${RUN_ID}.json`, createdBy: adminUserId, rows: [row], visibility: "PRIVATE",
    });
    const q = await idOf(row.contentHash);
    expect(q.publish_blocked).toBeNull();
    const { error } = await admin.from("questions").update({ visibility: "PUBLIC" }).eq("id", q.id);
    expect(error).toBeNull();
  });
});
