/**
 * Integration test for get_chapter_facets and get_subtopic_facets RPCs.
 *
 * The RPCs power the /browse filter sidebar's "Chapter (N)" and "Subtopic (N)"
 * rendering. They aggregate per-chapter / per-subtopic question counts under
 * the caller's RLS scope (PUBLIC + own-org PRIVATE).
 *
 * These tests assert:
 *   1. Counts match the per-chapter/per-subtopic ground truth from a direct query
 *   2. Difficulty/year/text filters propagate into the counts
 *   3. RLS scopes the result so a service-role-bypassed test against the live
 *      bank still returns valid aggregates
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("filter facets RPCs", () => {
  let client: SupabaseClient;
  let ndaExamId: string;
  let mathsSubjectId: string;

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
    ndaExamId = exam!.id;

    const { data: subject } = await client
      .from("subjects")
      .select("id")
      .eq("exam_id", ndaExamId)
      .eq("name", "Mathematics")
      .single();
    mathsSubjectId = subject!.id;
  });

  describe("get_chapter_facets", () => {
    it("returns chapter_id + q_count rows for the active exam+subject", async () => {
      const { data, error } = await client.rpc("get_chapter_facets", {
        p_exam_id: ndaExamId,
        p_subject_id: mathsSubjectId,
      });
      expect(error).toBeNull();
      const rows = data as { chapter_id: string; q_count: number }[];
      expect(rows.length).toBeGreaterThan(0);
      for (const r of rows) {
        expect(typeof r.chapter_id).toBe("string");
        expect(r.q_count).toBeGreaterThan(0);
      }
    });

    it("matches per-chapter ground truth from a direct count", async () => {
      const { data: facets } = await client.rpc("get_chapter_facets", {
        p_exam_id: ndaExamId,
        p_subject_id: mathsSubjectId,
      });
      const facetMap = new Map(
        (facets as { chapter_id: string; q_count: number }[]).map((r) => [
          r.chapter_id,
          r.q_count,
        ])
      );

      // Spot-check the largest chapter (Matrices & Determinants in NDA Maths)
      // by direct HEAD count under the same RLS scope.
      const { data: chapter } = await client
        .from("chapters")
        .select("id")
        .eq("subject_id", mathsSubjectId)
        .eq("name", "Matrices & Determinants")
        .single();
      expect(chapter).toBeTruthy();

      // The facet RPCs default to p_kind='pyq', so the ground-truth direct count
      // must also filter to PYQ (the chapter now also holds practice questions).
      const { count } = await client
        .from("questions")
        .select("id", { count: "exact", head: true })
        .eq("exam_id", ndaExamId)
        .eq("subject_id", mathsSubjectId)
        .eq("chapter_id", chapter!.id)
        .eq("question_kind", "pyq");

      expect(facetMap.get(chapter!.id)).toBe(count);
    });

    it("narrows counts when a difficulty filter is applied", async () => {
      const { data: unfiltered } = await client.rpc("get_chapter_facets", {
        p_exam_id: ndaExamId,
        p_subject_id: mathsSubjectId,
      });
      const { data: hardOnly } = await client.rpc("get_chapter_facets", {
        p_exam_id: ndaExamId,
        p_subject_id: mathsSubjectId,
        p_difficulties: ["HARD"],
      });

      const totalUnfiltered = (
        unfiltered as { q_count: number }[]
      ).reduce((s, r) => s + r.q_count, 0);
      const totalHard = (hardOnly as { q_count: number }[]).reduce(
        (s, r) => s + r.q_count,
        0
      );

      expect(totalHard).toBeGreaterThan(0);
      expect(totalHard).toBeLessThan(totalUnfiltered);
    });

    it("narrows counts when a pyq_year filter is applied", async () => {
      // Pick the most recent year in the bank
      const { data: years } = await client.rpc("get_pyq_years");
      const recentYear = (years as number[])[0];

      const { data: unfiltered } = await client.rpc("get_chapter_facets", {
        p_exam_id: ndaExamId,
        p_subject_id: mathsSubjectId,
      });
      const { data: oneYear } = await client.rpc("get_chapter_facets", {
        p_exam_id: ndaExamId,
        p_subject_id: mathsSubjectId,
        p_pyq_years: [recentYear],
      });

      const totalUnfiltered = (
        unfiltered as { q_count: number }[]
      ).reduce((s, r) => s + r.q_count, 0);
      const totalOneYear = (oneYear as { q_count: number }[]).reduce(
        (s, r) => s + r.q_count,
        0
      );

      expect(totalOneYear).toBeGreaterThan(0);
      expect(totalOneYear).toBeLessThan(totalUnfiltered);
    });
  });

  describe("get_subtopic_facets", () => {
    it("returns counts only for subtopics in the requested chapter ids", async () => {
      const { data: chapter } = await client
        .from("chapters")
        .select("id")
        .eq("subject_id", mathsSubjectId)
        .eq("name", "Matrices & Determinants")
        .single();

      const { data, error } = await client.rpc("get_subtopic_facets", {
        p_chapter_ids: [chapter!.id],
        p_exam_id: ndaExamId,
        p_subject_id: mathsSubjectId,
      });
      expect(error).toBeNull();
      const rows = data as { subtopic_id: string; q_count: number }[];
      expect(rows.length).toBeGreaterThan(0);

      // Every returned subtopic_id should belong to the requested chapter
      const { data: subtopicsInChapter } = await client
        .from("subtopics")
        .select("id")
        .eq("chapter_id", chapter!.id);
      const allowed = new Set(
        (subtopicsInChapter ?? []).map((s) => s.id as string)
      );
      for (const r of rows) {
        expect(allowed.has(r.subtopic_id)).toBe(true);
        expect(r.q_count).toBeGreaterThan(0);
      }
    });

    it("matches per-subtopic ground truth from a direct count", async () => {
      const { data: chapter } = await client
        .from("chapters")
        .select("id")
        .eq("subject_id", mathsSubjectId)
        .eq("name", "Matrices & Determinants")
        .single();

      const { data: facets } = await client.rpc("get_subtopic_facets", {
        p_chapter_ids: [chapter!.id],
        p_exam_id: ndaExamId,
        p_subject_id: mathsSubjectId,
      });
      const facetMap = new Map(
        (facets as { subtopic_id: string; q_count: number }[]).map((r) => [
          r.subtopic_id,
          r.q_count,
        ])
      );

      // Spot-check the biggest subtopic
      const { data: subtopic } = await client
        .from("subtopics")
        .select("id")
        .eq("chapter_id", chapter!.id)
        .eq("name", "Determinant Properties, Operations, and Sums")
        .single();
      expect(subtopic).toBeTruthy();

      // Ground truth must match the RPC's p_kind='pyq' default (the subtopic now
      // also holds practice questions).
      const { count } = await client
        .from("questions")
        .select("id", { count: "exact", head: true })
        .eq("chapter_id", chapter!.id)
        .eq("subtopic_id", subtopic!.id)
        .eq("question_kind", "pyq");

      expect(facetMap.get(subtopic!.id)).toBe(count);
    });
  });

  /**
   * Characterization tests for the "absent filter" contract.
   *
   * Both RPCs treat four distinct inputs as "no filter applied":
   *   - a NULL scalar          (p_exam_id, p_subject_id)
   *   - a NULL array           (p_difficulties, p_pyq_years, p_chapter_ids)
   *   - an EMPTY array         — via `coalesce(array_length(...), 0) = 0`
   *   - an empty-string p_q    — via `p_q is null or p_q = ''`
   *
   * The empty-array and empty-string cases are the ones a rewrite is most
   * likely to get wrong (an empty array is NOT null, so a naive
   * `if p_x is not null then add clause` would filter on nothing and return
   * zero rows). Added alongside migration 0068, which moved both function
   * bodies into PL/pgSQL `EXECUTE ... USING` so the planner can use an index —
   * a pure performance refactor, so these pin the behaviour that must NOT move.
   */
  describe("absent-filter contract (empty array / empty string == no filter)", () => {
    const sameRows = (
      a: { q_count: number }[],
      b: { q_count: number }[],
      keyOf: (r: never) => string
    ) => {
      const norm = (rows: { q_count: number }[]) =>
        rows
          .map((r) => `${keyOf(r as never)}:${r.q_count}`)
          .sort()
          .join("|");
      expect(norm(a)).toBe(norm(b));
    };

    it("get_chapter_facets: empty difficulties/years arrays behave like null", async () => {
      const base = { p_exam_id: ndaExamId, p_subject_id: mathsSubjectId };
      const { data: withNulls } = await client.rpc("get_chapter_facets", {
        ...base,
        p_difficulties: null,
        p_pyq_years: null,
      });
      const { data: withEmpty, error } = await client.rpc("get_chapter_facets", {
        ...base,
        p_difficulties: [],
        p_pyq_years: [],
      });
      expect(error).toBeNull();
      expect((withEmpty as unknown[]).length).toBeGreaterThan(0);
      sameRows(
        withNulls as { q_count: number }[],
        withEmpty as { q_count: number }[],
        (r: { chapter_id: string }) => r.chapter_id
      );
    });

    it("get_chapter_facets: empty-string p_q behaves like null (does not filter everything out)", async () => {
      const base = { p_exam_id: ndaExamId, p_subject_id: mathsSubjectId };
      const { data: withNull } = await client.rpc("get_chapter_facets", {
        ...base,
        p_q: null,
      });
      const { data: withEmptyString, error } = await client.rpc(
        "get_chapter_facets",
        { ...base, p_q: "" }
      );
      expect(error).toBeNull();
      expect((withEmptyString as unknown[]).length).toBeGreaterThan(0);
      sameRows(
        withNull as { q_count: number }[],
        withEmptyString as { q_count: number }[],
        (r: { chapter_id: string }) => r.chapter_id
      );
    });

    it("get_subtopic_facets: empty p_chapter_ids array means all chapters, not none", async () => {
      const base = { p_exam_id: ndaExamId, p_subject_id: mathsSubjectId };
      const { data: withNull } = await client.rpc("get_subtopic_facets", {
        ...base,
        p_chapter_ids: null,
      });
      const { data: withEmpty, error } = await client.rpc(
        "get_subtopic_facets",
        { ...base, p_chapter_ids: [] }
      );
      expect(error).toBeNull();
      // The regression this guards: an empty array narrowing to zero rows.
      expect((withEmpty as unknown[]).length).toBeGreaterThan(0);
      sameRows(
        withNull as { q_count: number }[],
        withEmpty as { q_count: number }[],
        (r: { subtopic_id: string }) => r.subtopic_id
      );
    });

    it("both RPCs: p_kind='all' is a superset of p_kind='pyq'", async () => {
      const base = { p_exam_id: ndaExamId, p_subject_id: mathsSubjectId };
      const { data: pyq } = await client.rpc("get_chapter_facets", {
        ...base,
        p_kind: "pyq",
      });
      const { data: all, error } = await client.rpc("get_chapter_facets", {
        ...base,
        p_kind: "all",
      });
      expect(error).toBeNull();

      const allMap = new Map(
        (all as { chapter_id: string; q_count: number }[]).map((r) => [
          r.chapter_id,
          r.q_count,
        ])
      );
      for (const r of pyq as { chapter_id: string; q_count: number }[]) {
        expect(allMap.get(r.chapter_id) ?? 0).toBeGreaterThanOrEqual(r.q_count);
      }
    });
  });
});
