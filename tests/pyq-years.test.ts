/**
 * Integration test for the get_pyq_years RPC.
 * Regression test for the PostgREST 1000-row cap — the old client-side
 * `.select("pyq_year").not(...).order(...)` was truncating at row 1000,
 * dropping older years (e.g. 2023) when the bank had more than 1000
 * year-tagged questions.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("get_pyq_years RPC", () => {
  let client: SupabaseClient;
  let truthYears: number[];

  beforeAll(async () => {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    // Ground truth: every distinct non-null pyq_year currently in the DB.
    // PostgREST caps a single response at 1000 rows regardless of .range(), so a
    // one-shot fetch would itself be truncated (and miss the oldest years once
    // the bank exceeds 1000 year-tagged rows — exactly the bug the RPC fixes).
    // Page through in 1000-row windows (the documented cap remedy) to see EVERY
    // year. Production goes through the RPC; this is test-only ground truth.
    const seen = new Set<number>();
    for (let from = 0; ; from += 1000) {
      const { data, error } = await client
        .from("questions")
        .select("pyq_year")
        .not("pyq_year", "is", null)
        .order("id", { ascending: true })
        .range(from, from + 999);
      expect(error).toBeNull();
      const rows = data ?? [];
      for (const r of rows) seen.add(r.pyq_year as number);
      if (rows.length < 1000) break;
    }
    truthYears = Array.from(seen).sort((a, b) => b - a);
  });

  it("returns every distinct non-null pyq_year in the DB", async () => {
    const { data, error } = await client.rpc("get_pyq_years");
    expect(error).toBeNull();
    expect(Array.isArray(data)).toBe(true);
    const years = data as number[];
    expect(years).toEqual(truthYears);
  });

  it("sorts years descending (most recent first)", async () => {
    const { data, error } = await client.rpc("get_pyq_years");
    expect(error).toBeNull();
    const years = data as number[];
    for (let i = 1; i < years.length; i++) {
      expect(years[i - 1]).toBeGreaterThan(years[i]);
    }
  });

  it("matches SQL ground-truth even when bank has >1000 year-tagged questions (no row cap)", async () => {
    // The whole point of moving to an RPC: even when there are more than
    // 1000 questions with pyq_year set, every distinct year shows up.
    const { count, error: ce } = await client
      .from("questions")
      .select("id", { count: "exact", head: true })
      .not("pyq_year", "is", null);
    expect(ce).toBeNull();
    // Only meaningful as a "row cap exists" regression when count > 1000;
    // skip the strict version when the bank is smaller.
    if ((count ?? 0) <= 1000) return;

    const { data } = await client.rpc("get_pyq_years");
    const years = data as number[];

    // Years are unique (no dup-counting bug).
    expect(new Set(years).size).toBe(years.length);
    // The set of years matches truth (no truncation regardless of how many rows exist).
    expect(new Set(years)).toEqual(new Set(truthYears));
  });
});
