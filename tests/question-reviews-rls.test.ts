/**
 * Integration test for question_reviews (migration 0074) + the write service.
 *
 * Load-bearing properties:
 *   1. The table is SERVICE-ROLE ONLY. RLS is on with no policies, so neither
 *      anon nor a signed-in user can read or write it. A review trail that a
 *      student could append to would be worthless as an audit record.
 *   2. Re-running a review pass is IDEMPOTENT. The (question_id, run_label,
 *      reviewed_content_hash) constraint means a script re-run writes 0 rows
 *      rather than duplicating its own history.
 *   3. A genuine re-review still lands — a later pass (different run_label) or
 *      a question that has since changed (different hash) is new information.
 *   4. The CHECK constraints are the DB-level backstop behind the pure
 *      validator, so a caller bypassing sanitizeReviewRecord still cannot write
 *      an unknown verdict or a blank fingerprint.
 *
 * ON DELETE CASCADE is deliberately NOT tested: it is declared in DDL and
 * guaranteed by Postgres, and proving it would need a throwaway question
 * fixture (org + exam + chapter) purely to delete it.
 *
 * Skipped when env is missing (or the bank has no PUBLIC question to point at).
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { recordReviews } from "@/lib/reviews/service";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "reviews-test-1234";
const RUN_ID = randomUUID().slice(0, 8);
const RUN_LABEL = `test:question-reviews:${RUN_ID}`;
const OTHER_RUN_LABEL = `test:question-reviews:${RUN_ID}:second-pass`;
const STUDENT_EMAIL = `qr-student-${RUN_ID}@test.local`;

describe.skipIf(!HAS_ENV)("question_reviews", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  let studentClient: SupabaseClient;
  let studentId: string | null = null;
  let questionId: string | null = null;
  let contentHash: string | null = null;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    admin = createClient(url, serviceRole, { auth: { persistSession: false } });
    anonClient = createClient(url, anon, { auth: { persistSession: false } });

    const { data: q } = await admin
      .from("questions")
      .select("id, content_hash")
      .eq("visibility", "PUBLIC")
      // Oldest row = a stable seed question, never a parallel run's transient
      // fixture (which its afterAll could delete mid-test → FK 23503).
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    questionId = (q?.id as string) ?? null;
    contentHash = (q?.content_hash as string) ?? null;

    const { data: student } = await admin.auth.admin.createUser({
      email: STUDENT_EMAIL,
      password: PASSWORD,
      email_confirm: true,
    });
    studentId = student.user?.id ?? null;

    studentClient = createClient(url, anon, { auth: { persistSession: false } });
    await studentClient.auth.signInWithPassword({ email: STUDENT_EMAIL, password: PASSWORD });
  });

  afterAll(async () => {
    if (admin) {
      await admin.from("question_reviews").delete().eq("run_label", RUN_LABEL);
      await admin.from("question_reviews").delete().eq("run_label", OTHER_RUN_LABEL);
      if (studentId) await admin.auth.admin.deleteUser(studentId);
    }
  });

  it("records a review via the service and is idempotent on re-run", async () => {
    if (!questionId || !contentHash) return;
    const input = {
      questionId,
      reviewedContentHash: contentHash,
      method: "blind_rederivation" as const,
      verdict: "confirmed" as const,
      runLabel: RUN_LABEL,
      derivedModel: "test-model",
      note: "re-derivation agreed with the stored key",
    };

    const first = await recordReviews(admin, [input]);
    expect(first.error).toBeUndefined();
    expect(first.rejected).toEqual([]);
    expect(first.written).toBe(1);

    // A re-run of the same pass over an unchanged question adds nothing.
    const second = await recordReviews(admin, [input]);
    expect(second.error).toBeUndefined();
    expect(second.written).toBe(0);
    expect(second.accepted).toBe(1);

    const { data } = await admin
      .from("question_reviews")
      .select("id")
      .eq("run_label", RUN_LABEL);
    expect(data).toHaveLength(1);
  });

  it("accepts a genuine re-review from a later pass", async () => {
    if (!questionId || !contentHash) return;
    const later = await recordReviews(admin, [
      {
        questionId,
        reviewedContentHash: contentHash,
        method: "source_key_crosscheck",
        verdict: "defect_preserved",
        runLabel: OTHER_RUN_LABEL,
        note: "OVERTURNS the earlier pass: the printed key contradicts its own options",
      },
    ]);
    expect(later.written).toBe(1);

    const { data } = await admin
      .from("question_reviews")
      .select("verdict, run_label")
      .eq("question_id", questionId)
      .in("run_label", [RUN_LABEL, OTHER_RUN_LABEL]);
    expect(data).toHaveLength(2);
  });

  it("blocks anon from reading and writing", async () => {
    if (!questionId || !contentHash) return;
    const { data: read } = await anonClient.from("question_reviews").select("id");
    expect(read ?? []).toHaveLength(0);

    const { error } = await anonClient.from("question_reviews").insert({
      question_id: questionId,
      reviewed_content_hash: contentHash,
      method: "blind_rederivation",
      verdict: "confirmed",
      run_label: `${RUN_LABEL}:anon-forge`,
    });
    expect(error).not.toBeNull();
  });

  it("blocks a signed-in user from reading and writing", async () => {
    if (!questionId || !contentHash) return;
    const { data: read } = await studentClient.from("question_reviews").select("id");
    expect(read ?? []).toHaveLength(0);

    const { error } = await studentClient.from("question_reviews").insert({
      question_id: questionId,
      reviewed_content_hash: contentHash,
      method: "blind_rederivation",
      verdict: "confirmed",
      run_label: `${RUN_LABEL}:student-forge`,
    });
    expect(error).not.toBeNull();
  });

  it("rejects an unknown verdict at the database, not just in the validator", async () => {
    if (!questionId || !contentHash) return;
    const { error } = await admin.from("question_reviews").insert({
      question_id: questionId,
      reviewed_content_hash: contentHash,
      method: "blind_rederivation",
      verdict: "superseded",
      run_label: RUN_LABEL,
    });
    expect(error?.message ?? "").toMatch(/verdict/);
  });

  it("rejects a blank fingerprint at the database", async () => {
    if (!questionId) return;
    const { error } = await admin.from("question_reviews").insert({
      question_id: questionId,
      reviewed_content_hash: "   ",
      method: "blind_rederivation",
      verdict: "confirmed",
      run_label: RUN_LABEL,
    });
    expect(error?.message ?? "").toMatch(/hash/);
  });
});
