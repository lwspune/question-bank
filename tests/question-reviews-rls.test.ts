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
import {
  recordErrataReviews,
  recordMcqVerifyReviews,
  recordTriageReview,
} from "@/lib/reviews/emit";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "reviews-test-1234";
const RUN_ID = randomUUID().slice(0, 8);
const RUN_LABEL = `test:question-reviews:${RUN_ID}`;
const OTHER_RUN_LABEL = `test:question-reviews:${RUN_ID}:second-pass`;
const STUDENT_EMAIL = `qr-student-${RUN_ID}@test.local`;
/** Artifact id for the emitter tests; its run labels are swept in afterAll. */
const EMIT_ARTIFACT = `emit-${RUN_ID}`;

describe.skipIf(!HAS_ENV)("question_reviews", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  let studentClient: SupabaseClient;
  let studentId: string | null = null;
  let questionId: string | null = null;
  let contentHash: string | null = null;
  let reportFixtureId: string | null = null;

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
      await admin.from("question_reviews").delete().like("run_label", `test-pipeline:${EMIT_ARTIFACT}:%`);
      if (reportFixtureId) {
        await admin.from("question_reviews").delete().eq("run_label", `report-triage:${reportFixtureId}`);
        await admin.from("question_reports").delete().eq("id", reportFixtureId);
      }
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

  it("records only the AGREEING rows from an mcq-verify pass", async () => {
    if (!questionId) return;
    const result = await recordMcqVerifyReviews(admin, {
      pipeline: "test-pipeline",
      artifactId: EMIT_ARTIFACT,
      rows: [
        { id: questionId, ref: "Q1", derived_answer: "B", matches_current: true },
        // A MISMATCH is a flag awaiting adjudication, never a verdict — the
        // script it comes from explicitly never auto-re-keys.
        { id: questionId, ref: "Q2", derived_answer: "C", matches_current: false },
        { id: questionId, ref: "Q3", derived_answer: null },
      ],
    });
    expect(result.error).toBeUndefined();
    expect(result.written).toBe(1);

    const { data } = await admin
      .from("question_reviews")
      .select("verdict, method, note")
      .eq("run_label", `test-pipeline:${EMIT_ARTIFACT}:blind-mcq-verify`);
    expect(data).toHaveLength(1);
    expect(data![0]).toMatchObject({ verdict: "confirmed", method: "blind_rederivation" });
    expect(data![0].note).toContain("Q1");
  });

  it("records an errata bracket as a preserved source defect", async () => {
    if (!questionId || !contentHash) return;
    const result = await recordErrataReviews(admin, {
      pipeline: "test-pipeline",
      artifactId: EMIT_ARTIFACT,
      items: [
        {
          questionId,
          ref: "Ex 1 Q1",
          bracket: "[Textbook answer-key error: the printed key contradicts its own options]",
          contentHash,
        },
      ],
    });
    expect(result.written).toBe(1);

    const { data } = await admin
      .from("question_reviews")
      .select("verdict, method")
      .eq("run_label", `test-pipeline:${EMIT_ARTIFACT}:answer-key-crosscheck`);
    expect(data).toHaveLength(1);
    // A bracket never means WE were wrong — our content stands, the source is
    // defective. So it must never land in a corrective verdict.
    expect(data![0]).toMatchObject({ verdict: "defect_preserved", method: "textbook_answer_key" });
  });

  it("records a triage verdict from the report's STORED category", async () => {
    // The glue shared by PATCH /api/reports/[id] and reviews:resolve — fetch the
    // report, derive the verdict from its true category, stamp the question's
    // hash. Tested here because most reports are resolved from the CLI, so a
    // web-only proof would miss the common path.
    if (!questionId) return;
    const { data: q } = await admin
      .from("questions")
      .select("org_id")
      .eq("id", questionId)
      .maybeSingle();
    const { data: report } = await admin
      .from("question_reports")
      .insert({
        question_id: questionId,
        org_id: q!.org_id,
        reported_by: studentId,
        category: "wrong-answer",
        details: "triage-emit fixture",
        status: "open",
      })
      .select("id")
      .single();
    reportFixtureId = report!.id as string;

    // wont-fix on an answer complaint is unambiguous: the claim was rejected, so
    // the stored answer stands. Derived WITHOUT a proposed verdict.
    const rejected = await recordTriageReview(admin, {
      reportId: reportFixtureId,
      status: "wont-fix",
    });
    expect(rejected.verdict).toBe("confirmed");
    expect(rejected.written).toBe(1);

    const { data: rows } = await admin
      .from("question_reviews")
      .select("verdict, method")
      .eq("run_label", `report-triage:${reportFixtureId}`);
    expect(rows).toHaveLength(1);
    expect(rows![0]).toMatchObject({ verdict: "confirmed", method: "report_triage" });
  });

  it("records nothing when a resolved report carries no verdict", async () => {
    if (!reportFixtureId) return;
    const result = await recordTriageReview(admin, {
      reportId: reportFixtureId,
      status: "resolved",
    });
    // Ambiguous by nature — key flipped? stem repaired? Nothing is guessed.
    expect(result.verdict).toBeNull();
    expect(result.written).toBe(0);
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
