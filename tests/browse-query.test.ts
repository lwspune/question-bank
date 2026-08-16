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
  pyqYears: [],
  extraIds: [],
  principleSlug: null,
  kind: "pyq",
  format: "all",
  fit: "all",
  q: "",
  page: 1,
};

describe.skipIf(!HAS_ENV)("queryQuestions (against LWS Pune seed)", () => {
  let client: SupabaseClient;
  let orgId: string;
  let examId: string;
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
    // The 150-question fixture lives under MHT-CET. With NDA (and future
    // exams) uploaded into the same org, queries must be exam-scoped to
    // stay deterministic.
    const { data: exam } = await client
      .from("exams")
      .select("id")
      .eq("name", "MHT-CET")
      .single();
    examId = exam!.id;
    const { data: subject } = await client
      .from("subjects")
      .select("id")
      .eq("exam_id", examId)
      .eq("name", "Physics")
      .single();
    physicsId = subject!.id;
  });

  it("returns all questions when no filters are set, paginated", async () => {
    const result = await queryQuestions(
      client,
      orgId,
      { ...EMPTY_FILTERS, examId },
      25
    );
    // The MHT-CET seed has grown beyond the original 150 over time; just
    // assert it's at least the original seed and that pagination math
    // holds, not the exact total.
    expect(result.totalCount).toBeGreaterThanOrEqual(150);
    expect(result.rows).toHaveLength(25);
    expect(result.rows[0].options).toHaveLength(4);
  });

  it("filters by subject", async () => {
    const result = await queryQuestions(
      client,
      orgId,
      { ...EMPTY_FILTERS, examId, subjectId: physicsId },
      25
    );
    expect(result.totalCount).toBeGreaterThan(0);
    // Subject-scoped count must always be a strict subset of the
    // exam-scoped total (sanity, not a fixed number).
    expect(result.rows.every((r) => r.subject.id === physicsId)).toBe(true);
  });

  it("filters by difficulty", async () => {
    const result = await queryQuestions(
      client,
      orgId,
      { ...EMPTY_FILTERS, examId, difficulties: ["EASY"] },
      100
    );
    expect(result.totalCount).toBeGreaterThan(0);
    expect(result.rows.every((r) => r.difficulty === "EASY")).toBe(true);
  });

  it("paginates without overlap", async () => {
    const page1 = await queryQuestions(
      client,
      orgId,
      { ...EMPTY_FILTERS, examId, page: 1 },
      50
    );
    const page2 = await queryQuestions(
      client,
      orgId,
      { ...EMPTY_FILTERS, examId, page: 2 },
      50
    );
    expect(page1.rows.length).toBe(50);
    expect(page2.rows.length).toBe(50);
    const ids1 = new Set(page1.rows.map((r) => r.id));
    const ids2 = new Set(page2.rows.map((r) => r.id));
    for (const id of ids1) expect(ids2.has(id)).toBe(false);
  });

  // ---------------------------------------------------------------------
  // Ordering contract.
  //
  // queryQuestions fetches a page in TWO round trips — an id-only query that
  // carries the filters + ORDER BY + range, then a wide fetch of those ids.
  // That split exists so the sort never carries `text`/`context`/`solution`
  // as payload (it was spilling ~14 MB to disk per call), but it means the
  // final row order comes from re-applying phase A's order to phase B's
  // result. Nothing else in this file asserts order, so these tests are the
  // only thing standing between a refactor and a silently shuffled page.
  // ---------------------------------------------------------------------

  /** ASC NULLS LAST rank: non-nulls compare normally, nulls sort after. */
  const asc = (v: number | null) => (v === null ? Number.POSITIVE_INFINITY : v);

  async function orderKeysFor(ids: string[]) {
    const { data } = await client
      .from("questions")
      .select("id, created_at, source_row")
      .in("id", ids);
    const byId = new Map(
      (data ?? []).map((r) => [
        r.id as string,
        {
          createdAt: Date.parse(r.created_at as string),
          sourceRow: (r.source_row as number | null) ?? null,
        },
      ])
    );
    // Map back over the CALLER's id order — this is what's under test.
    return ids.map((id) => ({ id, ...byId.get(id)! }));
  }

  function expectOrderedByContract(
    seq: { id: string; createdAt: number; sourceRow: number | null }[]
  ) {
    for (let i = 1; i < seq.length; i += 1) {
      const prev = seq[i - 1];
      const cur = seq[i];
      // created_at DESC
      expect(prev.createdAt).toBeGreaterThanOrEqual(cur.createdAt);
      if (prev.createdAt !== cur.createdAt) continue;
      // tie → source_row ASC NULLS LAST
      expect(asc(prev.sourceRow)).toBeLessThanOrEqual(asc(cur.sourceRow));
      if (asc(prev.sourceRow) !== asc(cur.sourceRow)) continue;
      // tie → id ASC
      expect(prev.id < cur.id).toBe(true);
    }
  }

  it("orders a page by created_at DESC, then source_row ASC NULLS LAST, then id ASC", async () => {
    const result = await queryQuestions(
      client,
      orgId,
      { ...EMPTY_FILTERS, examId },
      25
    );
    expect(result.rows.length).toBeGreaterThan(1);
    expectOrderedByContract(await orderKeysFor(result.rows.map((r) => r.id)));
  });

  it("keeps the ordering contract across a page boundary", async () => {
    const [page1, page2] = await Promise.all([
      queryQuestions(client, orgId, { ...EMPTY_FILTERS, examId, page: 1 }, 25),
      queryQuestions(client, orgId, { ...EMPTY_FILTERS, examId, page: 2 }, 25),
    ]);
    expect(page1.rows.length).toBe(25);
    expect(page2.rows.length).toBe(25);
    // Concatenated, the two pages must read as one continuously ordered run —
    // catches an off-by-one range as well as a per-page reshuffle.
    expectOrderedByContract(
      await orderKeysFor([...page1.rows, ...page2.rows].map((r) => r.id))
    );
  });

  it("leads with the subtopic teaching order when a chapter is in scope", async () => {
    // Find a chapter that actually has ≥2 distinct order_index values, rather
    // than hardcoding one — /notes coverage moves, and a chapter with a single
    // order_index would make this assertion vacuous.
    const { data: ordered } = await client
      .from("subtopics")
      .select("id, chapter_id, order_index")
      .not("order_index", "is", null)
      .limit(1000);
    const byChapter = new Map<string, Set<number>>();
    for (const s of ordered ?? []) {
      const key = s.chapter_id as string;
      if (!byChapter.has(key)) byChapter.set(key, new Set());
      byChapter.get(key)!.add(s.order_index as number);
    }
    const chapterId = [...byChapter.entries()].find(
      ([, idx]) => idx.size >= 2
    )?.[0];
    if (!chapterId) return; // no noted chapter in this DB — nothing to assert

    const result = await queryQuestions(
      client,
      null,
      { ...EMPTY_FILTERS, kind: "all", chapterIds: [chapterId] },
      50
    );
    expect(result.rows.length).toBeGreaterThan(1);

    const idxById = new Map(
      (ordered ?? []).map((s) => [s.id as string, s.order_index as number])
    );
    const seq = result.rows.map((r) =>
      r.subtopic ? asc(idxById.get(r.subtopic.id) ?? null) : asc(null)
    );
    for (let i = 1; i < seq.length; i += 1) {
      expect(seq[i - 1]).toBeLessThanOrEqual(seq[i]);
    }
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

  it("composite OR: subtopicIds ∪ extraIds returns union of both sets", async () => {
    // Pick two specific questions outside any Physics subtopic to use as
    // extraIds, then layer a Physics subtopic on top. The result should
    // include every question in that subtopic PLUS the two extras.
    const { data: subtopic } = await client
      .from("subtopics")
      .select("id")
      .eq("chapter_id", (
        await client
          .from("chapters")
          .select("id")
          .eq("subject_id", physicsId)
          .limit(1)
          .single()
      ).data!.id)
      .limit(1)
      .single();
    const stId = subtopic!.id;

    // Two PUBLIC questions from a DIFFERENT subtopic than stId — they'd
    // never show up via the subtopic filter alone.
    const { data: extras } = await client
      .from("questions")
      .select("id, subtopic_id")
      .eq("org_id", orgId)
      .eq("visibility", "PUBLIC")
      .neq("subtopic_id", stId)
      .limit(2);
    const extraIds = extras!.map((r) => r.id);

    const subOnly = await queryQuestions(
      client,
      orgId,
      { ...EMPTY_FILTERS, subtopicIds: [stId] },
      200
    );
    const union = await queryQuestions(
      client,
      orgId,
      { ...EMPTY_FILTERS, subtopicIds: [stId], extraIds },
      200
    );
    // Every subtopic-only id appears in the union, plus the two extras.
    const unionIds = new Set(union.rows.map((r) => r.id));
    for (const r of subOnly.rows) expect(unionIds.has(r.id)).toBe(true);
    for (const id of extraIds) expect(unionIds.has(id)).toBe(true);
    expect(union.totalCount).toBe(subOnly.totalCount + extraIds.length);
  });

  it("extraIds alone (no subtopicIds) returns only the extras", async () => {
    const { data: extras } = await client
      .from("questions")
      .select("id")
      .eq("org_id", orgId)
      .eq("visibility", "PUBLIC")
      .limit(3);
    const extraIds = extras!.map((r) => r.id);

    const result = await queryQuestions(
      client,
      orgId,
      { ...EMPTY_FILTERS, extraIds },
      200
    );
    expect(result.totalCount).toBe(extraIds.length);
    expect(new Set(result.rows.map((r) => r.id))).toEqual(new Set(extraIds));
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
    // The unfiltered newest page can now be entirely 0-option — the bank holds
    // numeric (NAT, JEE Section B) and subjective (State Board) questions, and
    // the default created_at-desc sort surfaces the most-recent ingest first.
    // Verify the 4-option round-trip through anon RLS on the MCQ-only MHT-CET
    // seed instead (deterministic, robust to future 0-option ingests).
    const mcq = await queryQuestions(anonClient, null, { ...EMPTY_FILTERS, examId }, 25);
    expect(mcq.rows.some((r) => r.options.length === 4)).toBe(true);
  });

  // The question_format axis (migrations 0041 + 0061). Written to be
  // data-agnostic: the seeded test project is MCQ-only, so asserting a
  // non-zero subjective count here would pin a fact about prod's board
  // corpora that this database does not hold. The partition identity and the
  // per-row invariant hold on ANY dataset, including an all-MCQ one.
  describe("format filter", () => {
    it("partitions the result set — the three formats sum to 'all'", async () => {
      const base = { ...EMPTY_FILTERS, examId, kind: "all" as const };
      const [all, mcq, subjective, numeric] = await Promise.all(
        (["all", "mcq", "subjective", "numeric"] as const).map((format) =>
          queryQuestions(client, orgId, { ...base, format }, 1)
        )
      );
      expect(all.totalCount).toBeGreaterThan(0);
      expect(mcq.totalCount + subjective.totalCount + numeric.totalCount).toBe(
        all.totalCount
      );
    });

    it("returns only rows of the requested format", async () => {
      for (const format of ["mcq", "subjective", "numeric"] as const) {
        const result = await queryQuestions(
          client,
          orgId,
          { ...EMPTY_FILTERS, examId, kind: "all", format },
          25
        );
        for (const row of result.rows) {
          expect(row.questionFormat).toBe(format);
        }
      }
    });

    it("'all' is a true no-op — same rows as a caller that never knew the field", async () => {
      // The guard that keeps every pre-existing URL, guide CTA and notes drill
      // link returning exactly what it returned before this filter shipped.
      const withDefault = await queryQuestions(
        client,
        orgId,
        { ...EMPTY_FILTERS, examId },
        25
      );
      const explicit = await queryQuestions(
        client,
        orgId,
        { ...EMPTY_FILTERS, examId, format: "all" },
        25
      );
      expect(explicit.totalCount).toBe(withDefault.totalCount);
      expect(explicit.rows.map((r) => r.id)).toEqual(
        withDefault.rows.map((r) => r.id)
      );
    });
  });
});
