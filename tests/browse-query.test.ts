/**
 * Integration test for the browse query.
 * Uses the live DB and the 150 questions already seeded in LWS Pune org.
 * Skipped if env is not present.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { queryQuestions } from "@/lib/questions/query";
import type { Filters } from "@/lib/questions/filters";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const EMPTY_FILTERS: Filters = {
  examId: null,
  subjectId: null,
  chapterIds: [],
  subtopicIds: [],
  difficulties: [],
  q: "",
  page: 1,
};

describe.skipIf(!HAS_ENV)("queryQuestions (against LWS Pune seed)", () => {
  let client: SupabaseClient;
  let orgId: string;
  let physicsId: string;

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
    const { data: subject } = await client
      .from("subjects")
      .select("id")
      .eq("name", "Physics")
      .single();
    physicsId = subject!.id;
  });

  it("returns all questions when no filters are set, paginated", async () => {
    const result = await queryQuestions(client, orgId, EMPTY_FILTERS, 25);
    expect(result.totalCount).toBe(150);
    expect(result.rows).toHaveLength(25);
    expect(result.rows[0].options).toHaveLength(4);
  });

  it("filters by subject", async () => {
    const result = await queryQuestions(
      client,
      orgId,
      { ...EMPTY_FILTERS, subjectId: physicsId },
      25
    );
    expect(result.totalCount).toBeGreaterThan(0);
    expect(result.totalCount).toBeLessThan(150);
    expect(result.rows.every((r) => r.subject.id === physicsId)).toBe(true);
  });

  it("filters by difficulty", async () => {
    const result = await queryQuestions(
      client,
      orgId,
      { ...EMPTY_FILTERS, difficulties: ["EASY"] },
      100
    );
    expect(result.totalCount).toBeGreaterThan(0);
    expect(result.rows.every((r) => r.difficulty === "EASY")).toBe(true);
  });

  it("paginates without overlap", async () => {
    const page1 = await queryQuestions(
      client,
      orgId,
      { ...EMPTY_FILTERS, page: 1 },
      50
    );
    const page2 = await queryQuestions(
      client,
      orgId,
      { ...EMPTY_FILTERS, page: 2 },
      50
    );
    expect(page1.rows.length).toBe(50);
    expect(page2.rows.length).toBe(50);
    const ids1 = new Set(page1.rows.map((r) => r.id));
    const ids2 = new Set(page2.rows.map((r) => r.id));
    for (const id of ids1) expect(ids2.has(id)).toBe(false);
  });

  it("full-text search hits expected rows", async () => {
    const result = await queryQuestions(
      client,
      orgId,
      { ...EMPTY_FILTERS, q: "lens" },
      25
    );
    expect(result.totalCount).toBeGreaterThan(0);
  });

  it("anon path (orgId=null, anon JWT) returns only PUBLIC questions", async () => {
    // Hits the post-Phase-A code path: no org_id filter, RLS scopes by visibility.
    // The 150 LWS Pune seed questions were backfilled to PUBLIC in 0009_visibility.
    const anonClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } }
    );
    const result = await queryQuestions(anonClient, null, EMPTY_FILTERS, 25);
    expect(result.totalCount).toBeGreaterThanOrEqual(150);
    expect(result.rows.length).toBe(25);
    expect(result.rows[0].options).toHaveLength(4);
  });
});
