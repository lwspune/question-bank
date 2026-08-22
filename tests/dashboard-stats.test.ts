/**
 * Integration test for dashboard stats.
 * Uses the live DB and the LWS Pune org seed (150 questions).
 * Skipped if env is not present.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getDashboardStats } from "@/lib/dashboard/stats";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("getDashboardStats (against LWS Pune seed)", () => {
  let client: SupabaseClient;
  let orgId: string;

  beforeAll(async () => {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
    const { data: org } = await client
      .from("organizations")
      .select("id")
      .eq("name", "LWS Pune")
      .single();
    orgId = org!.id;
  });

  it("returns the expected total question count for the seeded org", async () => {
    // >=150 not ==150 because concurrent test runs (sync-mock-flow) may have
    // in-flight rows that haven't been cleaned up yet at the moment this test
    // queries. The seeded floor is what matters; the count function works
    // regardless of how many rows are present.
    const stats = await getDashboardStats(client, orgId);
    expect(stats.totalQuestions).toBeGreaterThanOrEqual(150);
  });

  it("counts the distinct exams that have at least one question", async () => {
    const stats = await getDashboardStats(client, orgId);
    expect(stats.examsCovered).toBeGreaterThan(0);
  });

  it("counts the distinct chapters that have at least one question", async () => {
    const stats = await getDashboardStats(client, orgId);
    expect(stats.chaptersCovered).toBeGreaterThan(0);
  });

  it("returns daysSinceLastUpload as a non-negative integer when uploads exist", async () => {
    const stats = await getDashboardStats(client, orgId);
    expect(stats.daysSinceLastUpload).not.toBeNull();
    expect(stats.daysSinceLastUpload!).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(stats.daysSinceLastUpload!)).toBe(true);
  });

  it("returns byExam sorted descending by count, and counts sum to total", async () => {
    const stats = await getDashboardStats(client, orgId);
    expect(stats.byExam.length).toBeGreaterThan(0);
    for (let i = 1; i < stats.byExam.length; i++) {
      expect(stats.byExam[i - 1].count).toBeGreaterThanOrEqual(
        stats.byExam[i].count
      );
    }
    const sum = stats.byExam.reduce((acc, r) => acc + r.count, 0);
    expect(sum).toBe(stats.totalQuestions);
  });

  it("matches SQL ground-truth even when org has >1000 questions (no row cap)", async () => {
    // Regression for the PostgREST implicit 1000-row cap. The old impl did
    // `.select(...)` then `data.length`, silently truncating at 1000.
    // `count: "exact", head: true` returns the true count via headers,
    // bypassing the cap; we use that as ground truth.
    const { count: truthTotal, error: ce } = await client
      .from("questions")
      .select("id", { count: "exact", head: true })
      .eq("org_id", orgId);
    expect(ce).toBeNull();
    expect(truthTotal).not.toBeNull();

    // Per-exam ground truth: one HEAD count per exam in the org.
    const { data: examRows, error: ee } = await client
      .from("exams")
      .select("id");
    expect(ee).toBeNull();
    const truthByExam: { exam_id: string; count: number }[] = [];
    for (const e of examRows ?? []) {
      const { count } = await client
        .from("questions")
        .select("id", { count: "exact", head: true })
        .eq("org_id", orgId)
        .eq("exam_id", e.id);
      if ((count ?? 0) > 0) {
        truthByExam.push({ exam_id: e.id, count: count ?? 0 });
      }
    }

    const stats = await getDashboardStats(client, orgId);

    // Exact match against SQL, no matter how many rows.
    expect(stats.totalQuestions).toBe(truthTotal);
    // And the byExam slices sum to the same total.
    expect(stats.byExam.reduce((a, r) => a + r.count, 0)).toBe(truthTotal);

    // byExam matches truth per-exam.
    const statsMap = new Map(stats.byExam.map((r) => [r.examId, r.count]));
    const truthMap = new Map(truthByExam.map((r) => [r.exam_id, r.count]));
    expect(statsMap.size).toBe(truthMap.size);
    for (const [examId, count] of truthMap) {
      expect(statsMap.get(examId)).toBe(count);
    }
  });

  it("returns zeroes / empty / null when org has no data", async () => {
    const { data: emptyOrg, error } = await client
      .from("organizations")
      .insert({ name: `__test_empty_org_${Date.now()}` })
      .select("id")
      .single();
    expect(error).toBeNull();
    try {
      const stats = await getDashboardStats(client, emptyOrg!.id);
      expect(stats.totalQuestions).toBe(0);
      expect(stats.examsCovered).toBe(0);
      expect(stats.chaptersCovered).toBe(0);
      expect(stats.daysSinceLastUpload).toBeNull();
      expect(stats.byExam).toEqual([]);
    } finally {
      await client.from("organizations").delete().eq("id", emptyOrg!.id);
    }
  });
});

/**
 * Degradation contract (no DB needed).
 *
 * The five stat tiles are decorative. Before this, `getDashboardStats` threw on
 * any RPC/query error, so a Postgres statement timeout (SQLSTATE 57014) took
 * the WHOLE /dashboard page down with it — Members, Branches, Papers and
 * Reports included. Measured on prod 2026-08-22: 21 successful RPC calls
 * against 21 logged 57014 cancellations over the same window, i.e. roughly half
 * of all dashboard loads 500'd.
 *
 * So a failure must degrade to zeroes + `unavailable: true`, never throw.
 */
type StubResult = { data: unknown; error: { message: string } | null };

function stubClient(rpc: StubResult, job: StubResult): SupabaseClient {
  return {
    rpc: async () => rpc,
    from: () => ({
      select: () => ({
        eq: () => ({
          order: () => ({
            limit: () => ({ maybeSingle: async () => job }),
          }),
        }),
      }),
    }),
  } as unknown as SupabaseClient;
}

const OK_RPC: StubResult = {
  data: {
    total_questions: 12,
    chapters_covered: 3,
    by_exam: [{ exam_id: "e1", exam_name: "NDA", count: 12 }],
  },
  error: null,
};
const OK_JOB: StubResult = { data: null, error: null };
const TIMEOUT: StubResult = {
  data: null,
  error: { message: "canceling statement due to statement timeout" },
};

describe("getDashboardStats degradation", () => {
  it("does not throw when the stats RPC times out", async () => {
    await expect(
      getDashboardStats(stubClient(TIMEOUT, OK_JOB), "org-1")
    ).resolves.toBeDefined();
  });

  it("reports unavailable + zeroes when the stats RPC fails", async () => {
    const stats = await getDashboardStats(stubClient(TIMEOUT, OK_JOB), "org-1");
    expect(stats.unavailable).toBe(true);
    expect(stats.totalQuestions).toBe(0);
    expect(stats.examsCovered).toBe(0);
    expect(stats.chaptersCovered).toBe(0);
    expect(stats.byExam).toEqual([]);
    expect(stats.daysSinceLastUpload).toBeNull();
  });

  it("degrades when only the upload_jobs read fails", async () => {
    const stats = await getDashboardStats(stubClient(OK_RPC, TIMEOUT), "org-1");
    expect(stats.unavailable).toBe(true);
  });

  it("reports unavailable:false and real numbers on the happy path", async () => {
    const stats = await getDashboardStats(stubClient(OK_RPC, OK_JOB), "org-1");
    expect(stats.unavailable).toBe(false);
    expect(stats.totalQuestions).toBe(12);
    expect(stats.chaptersCovered).toBe(3);
    expect(stats.byExam).toEqual([{ examId: "e1", examName: "NDA", count: 12 }]);
  });
});
