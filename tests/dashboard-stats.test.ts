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
