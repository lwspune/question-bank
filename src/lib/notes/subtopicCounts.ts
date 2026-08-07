import type { SupabaseClient } from "@supabase/supabase-js";

/** A row as returned by the `get_subtopic_facets` RPC. */
export type SubtopicFacetRow = { subtopic_id: string; q_count: number };

/**
 * Narrow a chapter-wide facet result down to the notes-registered subtopics.
 *
 * `get_subtopic_facets` is CHAPTER-scoped, so it returns every subtopic in the
 * chapter — including ones the notes registry doesn't teach. The landing page
 * sums this map into the chapter's total PYQ count, so handing it the full
 * chapter would silently INFLATE a number the page renders. Filtering here
 * preserves the original `.in("subtopic_id", subtopicIds)` contract exactly.
 *
 * A requested subtopic with zero questions is OMITTED rather than set to 0 —
 * the previous tally behaved the same way (it only ever counted rows it saw),
 * so callers' `?? 0` fallbacks are unaffected.
 */
export function subtopicCountsFromFacets(
  rows: SubtopicFacetRow[],
  wantedIds: string[]
): Map<string, number> {
  const wanted = new Set(wantedIds);
  const out = new Map<string, number>();
  for (const r of rows) {
    if (wanted.has(r.subtopic_id)) out.set(r.subtopic_id, r.q_count);
  }
  return out;
}

/**
 * Per-subtopic PYQ counts for a /notes chapter landing page.
 *
 * Aggregates in Postgres via `get_subtopic_facets` instead of the previous
 * fetch-one-row-per-question-and-tally-in-JS, which moved ~9.9 KB (170 rows)
 * to render five integers and would have started silently under-reporting once
 * a chapter crossed PostgREST's 1000-row response cap.
 *
 * RLS scopes the result to the caller (anon → PUBLIC only), exactly as the
 * direct query did — the RPC is `security invoker`.
 */
export async function loadSubtopicPyqCounts(
  client: SupabaseClient,
  args: {
    chapterId: string;
    examId: string;
    subjectId: string;
    subtopicIds: string[];
  }
): Promise<Map<string, number>> {
  if (args.subtopicIds.length === 0) return new Map();

  const { data, error } = await client.rpc("get_subtopic_facets", {
    p_chapter_ids: [args.chapterId],
    p_exam_id: args.examId,
    p_subject_id: args.subjectId,
    p_kind: "pyq", // PYQ-only weightage counts (migration 0036)
  });

  // Never fail an ISR-prerendered notes page on a counts hiccup — the page
  // degrades to "no weightage numbers", which is what the old `data ?? []`
  // did when the query errored.
  if (error || !data) return new Map();

  return subtopicCountsFromFacets(
    data as SubtopicFacetRow[],
    args.subtopicIds
  );
}
