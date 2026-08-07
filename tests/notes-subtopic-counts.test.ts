/**
 * /notes chapter-landing per-subtopic PYQ counts.
 *
 * The landing page used to fetch ONE ROW PER QUESTION in the chapter
 * (`.select("subtopic_id").in("subtopic_id", ids)`) and tally them in JS —
 * 9,858 bytes / 170 rows for NDA Maths "Matrices & Determinants", to render
 * about five integers. It also inherited the PostgREST 1000-row cap: once a
 * chapter crossed 1000 PYQs the counts would silently UNDER-report with no
 * error (largest today is 346, so ~2.9x headroom).
 *
 * Replaced by the existing `get_subtopic_facets` RPC, which aggregates in
 * Postgres. These tests pin the two things that must not move:
 *   1. the counts themselves (integration: RPC path == old direct-query path)
 *   2. the filtering contract — the chapter total sums ONLY notes-registered
 *      subtopics, so a chapter-scoped RPC result must be narrowed back down.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  subtopicCountsFromFacets,
  loadSubtopicPyqCounts,
} from "@/lib/notes/subtopicCounts";

describe("subtopicCountsFromFacets (pure)", () => {
  it("keeps only the requested subtopics", () => {
    const rows = [
      { subtopic_id: "a", q_count: 10 },
      { subtopic_id: "b", q_count: 5 },
      { subtopic_id: "c", q_count: 99 },
    ];
    const out = subtopicCountsFromFacets(rows, ["a", "b"]);
    expect(out.get("a")).toBe(10);
    expect(out.get("b")).toBe(5);
    // 'c' is in the chapter but NOT notes-registered — including it would
    // inflate the chapter total that the page renders.
    expect(out.has("c")).toBe(false);
    expect(out.size).toBe(2);
  });

  it("omits requested subtopics the RPC returned no row for (zero questions)", () => {
    const out = subtopicCountsFromFacets([{ subtopic_id: "a", q_count: 3 }], [
      "a",
      "b",
    ]);
    // Matches the old behaviour: a subtopic with no PYQs never appeared in the
    // tally map either, so callers' `?? 0` fallbacks still hold.
    expect(out.has("b")).toBe(false);
    expect(out.size).toBe(1);
  });

  it("returns an empty map for empty inputs", () => {
    expect(subtopicCountsFromFacets([], ["a"]).size).toBe(0);
    expect(subtopicCountsFromFacets([{ subtopic_id: "a", q_count: 1 }], []).size).toBe(0);
  });

  it("does not coerce a real zero count away", () => {
    const out = subtopicCountsFromFacets([{ subtopic_id: "a", q_count: 0 }], ["a"]);
    expect(out.get("a")).toBe(0);
  });
});

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("loadSubtopicPyqCounts (integration)", () => {
  let client: SupabaseClient;
  let examId: string;
  let subjectId: string;
  let chapterId: string;
  let subtopicIds: string[];

  beforeAll(async () => {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    const { data: exam } = await client
      .from("exams")
      .select("id")
      .eq("name", "NDA")
      .single();
    examId = exam!.id;

    const { data: subject } = await client
      .from("subjects")
      .select("id")
      .eq("exam_id", examId)
      .eq("name", "Mathematics")
      .single();
    subjectId = subject!.id;

    const { data: chapter } = await client
      .from("chapters")
      .select("id")
      .eq("subject_id", subjectId)
      .eq("name", "Matrices & Determinants")
      .single();
    chapterId = chapter!.id;

    const { data: subs } = await client
      .from("subtopics")
      .select("id")
      .eq("chapter_id", chapterId);
    subtopicIds = (subs ?? []).map((s) => s.id as string);
    expect(subtopicIds.length).toBeGreaterThan(0);
  });

  it("matches the old fetch-every-row-and-tally-in-JS result exactly", async () => {
    // Ground truth = the EXACT query the landing page used to run.
    const { data: rows } = await client
      .from("questions")
      .select("subtopic_id")
      .in("subtopic_id", subtopicIds)
      .eq("question_kind", "pyq");
    const oldWay = new Map<string, number>();
    for (const r of rows ?? []) {
      const id = (r as { subtopic_id: string }).subtopic_id;
      oldWay.set(id, (oldWay.get(id) ?? 0) + 1);
    }

    const newWay = await loadSubtopicPyqCounts(client, {
      chapterId,
      examId,
      subjectId,
      subtopicIds,
    });

    expect([...newWay.keys()].sort()).toEqual([...oldWay.keys()].sort());
    for (const [id, n] of oldWay) expect(newWay.get(id)).toBe(n);
    // Guard the aggregate the page actually renders.
    const sum = (m: Map<string, number>) =>
      [...m.values()].reduce((a, n) => a + n, 0);
    expect(sum(newWay)).toBe(sum(oldWay));
    expect(sum(newWay)).toBeGreaterThan(0);
  });

  it("never returns a subtopic outside the requested set", async () => {
    const subset = subtopicIds.slice(0, 1);
    const counts = await loadSubtopicPyqCounts(client, {
      chapterId,
      examId,
      subjectId,
      subtopicIds: subset,
    });
    for (const id of counts.keys()) expect(subset).toContain(id);
  });

  it("short-circuits to an empty map with no subtopics (no DB round-trip)", async () => {
    const counts = await loadSubtopicPyqCounts(client, {
      chapterId,
      examId,
      subjectId,
      subtopicIds: [],
    });
    expect(counts.size).toBe(0);
  });
});
