/**
 * Contract lock for `commitStaged` within-batch dedup.
 *
 * Pairs with tests/upload-flow.test.ts (cross-batch re-upload dedup).
 * Together they pin the dedup contract regardless of mechanism:
 * - same content_hash twice inside one upload → 1 inserted, 1 skipped
 * - same upload run a second time → 0 inserted, N skipped
 *
 * The implementation moved from an in-memory Set (which silently
 * truncated at PostgREST's 1000-row cap once an org crossed that size)
 * to a DB-side `.upsert(..., { onConflict, ignoreDuplicates: true })`.
 * That cap-class regression is hard to reproduce cheaply in a unit
 * test — locking the contract here means a future re-implementation
 * has to keep both cases green.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { commitStaged } from "@/lib/upload/commit";
import type { ParsedRowPayload } from "@/lib/upload/validate";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);
const ORG_NAME = `Commit Dedup Org ${RUN_ID}`;
const ADMIN_EMAIL = `commit-dedup-${RUN_ID}@test.local`;

function makeRow(sourceRow: number, hash: string): ParsedRowPayload {
  return {
    sourceRow,
    questionNumber: String(sourceRow),
    subjectName: "Physics",
    chapterName: `Dedup Chapter ${RUN_ID}`,
    subtopicName: `Dedup Subtopic ${RUN_ID}`,
    text: "A convex lens of focal length 1/3 m forms a real image. Find the object distance.",
    options: [
      { label: "A", text: "0.5 m", isCorrect: true },
      { label: "B", text: "0.166 m", isCorrect: false },
      { label: "C", text: "0.33 m", isCorrect: false },
      { label: "D", text: "1 m", isCorrect: false },
    ],
    difficulty: "MODERATE",
    solution: "Apply 1/v - 1/u = 1/f",
    contentHash: hash,
  };
}

describe.skipIf(!HAS_ENV)("commitStaged — within-batch dedup", () => {
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
      password: "commit-dedup-test-pw-1234",
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
    // Auto-created chapter + subtopic survive org-delete since taxonomy
    // isn't FK-cascaded from organizations. Sweep them so they don't pile
    // up across test runs (the global teardown also catches stragglers).
    await admin
      .from("subtopics")
      .delete()
      .eq("name", `Dedup Subtopic ${RUN_ID}`);
    await admin
      .from("chapters")
      .delete()
      .eq("name", `Dedup Chapter ${RUN_ID}`);
  });

  it("inserts 1 and skips 1 when two staged rows share a content_hash", async () => {
    const sharedHash = `dedup-hash-${RUN_ID}-shared`;
    const rows = [makeRow(2, sharedHash), makeRow(3, sharedHash)];

    const result = await commitStaged(admin, {
      orgId,
      examId,
      filename: "dedup.xlsx",
      createdBy: adminUserId,
      rows,
    });

    expect(result.inserted).toBe(1);
    expect(result.skipped).toBe(1);
    expect(result.failed).toBe(0);

    const { count } = await admin
      .from("questions")
      .select("id", { count: "exact", head: true })
      .eq("org_id", orgId)
      .eq("content_hash", sharedHash);
    expect(count).toBe(1);
  });
});
