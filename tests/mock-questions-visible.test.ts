/**
 * PROD-CONTRACT: every question a PUBLISHED mock points at must exist and be PUBLIC.
 *
 * A mock stores ordered question REFS, not content, and the runner reads each
 * question with the student's own JWT. So a question hidden (or deleted) AFTER its
 * mock was built renders as a BLANK item inside a live paper — no error anywhere,
 * and every other gate stays green. On 2026-09-26 four published MHT-CET mocks
 * carried five such items, each hidden by an earlier source pass that never looked
 * at the mocks. They were found only by hand.
 *
 * Bulk visibility flips come from ingestion scripts as often as from pushes, which
 * is why this lives in the daily prod-contract run rather than the push gate.
 * The fix for a failure is NOT to un-hide the row blindly: read it against its
 * paper, then either repair it or hold (unpublish) the mock — see MOCKS.md.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("published mocks reference only live PUBLIC questions", () => {
  let client: SupabaseClient;
  /** question id -> the mock slugs that reference it */
  const refs = new Map<string, string[]>();
  let mockCount = 0;

  beforeAll(async () => {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
    // Page the mocks: ~270 today, but a page cap is cheaper than a silent truncation later.
    for (let from = 0; ; from += 500) {
      const { data, error } = await client
        .from("mock_tests")
        .select("slug, questions")
        .eq("status", "published")
        .order("slug")
        .range(from, from + 499);
      if (error) throw new Error(`mock_tests: ${error.message}`);
      for (const m of data ?? []) {
        mockCount++;
        for (const q of m.questions as { questionId: string }[]) {
          const list = refs.get(q.questionId) ?? [];
          list.push(m.slug as string);
          refs.set(q.questionId, list);
        }
      }
      if ((data ?? []).length < 500) break;
    }
  }, 120_000);

  it("finds published mocks to check", () => {
    expect(mockCount).toBeGreaterThan(0);
    expect(refs.size).toBeGreaterThan(0);
  });

  it("every referenced question exists and is PUBLIC", async () => {
    const ids = [...refs.keys()];
    const found = new Map<string, string>();
    // .in() puts the ids in the URL, so chunk the FILTER (~200), independent of the result cap.
    for (let i = 0; i < ids.length; i += 200) {
      const chunk = ids.slice(i, i + 200);
      const { data, error } = await client.from("questions").select("id, visibility").in("id", chunk);
      if (error) throw new Error(`questions: ${error.message}`);
      for (const q of data ?? []) found.set(q.id as string, q.visibility as string);
    }
    const bad = ids
      .filter((id) => found.get(id) !== "PUBLIC")
      .map((id) => `${id} (${found.get(id) ?? "DELETED"}) in ${refs.get(id)!.join(", ")}`);
    expect(bad).toEqual([]);
  }, 300_000);
});
