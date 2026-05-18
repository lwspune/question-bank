/**
 * Integration test for the per-exam public stats helper used by /nda
 * (and future /mht-cet) exam home pages. DB-backed — skipped if env is
 * not present.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getExamHomeStats } from "@/lib/exam/examHomeStats";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("getExamHomeStats", () => {
  let client: SupabaseClient;

  beforeAll(() => {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
  });

  it("returns the NDA examId + a PUBLIC q count > 0 for a seeded exam", async () => {
    const stats = await getExamHomeStats(client, "NDA");
    expect(stats.examId).not.toBeNull();
    expect(stats.totalPublicQuestions).toBeGreaterThan(0);
  });

  it("returns an exact count that matches a head-count ground truth (PostgREST 1000-row trap)", async () => {
    const stats = await getExamHomeStats(client, "NDA");
    const { data: exam } = await client
      .from("exams")
      .select("id")
      .eq("name", "NDA")
      .maybeSingle();
    expect(exam?.id).toBeDefined();
    const { count: truth } = await client
      .from("questions")
      .select("id", { count: "exact", head: true })
      .eq("exam_id", exam!.id)
      .eq("visibility", "PUBLIC");
    expect(truth).not.toBeNull();
    expect(stats.totalPublicQuestions).toBe(truth);
  });

  it("returns zero + null examId for an unknown exam name", async () => {
    const stats = await getExamHomeStats(
      client,
      "__nonexistent_exam_for_testing__"
    );
    expect(stats.examId).toBeNull();
    expect(stats.totalPublicQuestions).toBe(0);
  });

  it("does not throw when the exam name contains special characters", async () => {
    // MHT-CET exam name contains a hyphen — should resolve correctly.
    const stats = await getExamHomeStats(client, "MHT-CET");
    expect(stats.examId).not.toBeNull();
    expect(stats.totalPublicQuestions).toBeGreaterThan(0);
  });
});
