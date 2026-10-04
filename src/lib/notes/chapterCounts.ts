import type { SupabaseClient } from "@supabase/supabase-js";

/** A row as returned by the `get_chapter_facets` RPC. */
export type ChapterFacetRow = { chapter_id: string; q_count: number };

/**
 * Narrow a subject-wide facet result to the chapters the notes registry
 * teaches. A chapter with no row is OMITTED, so callers' `?? 0` applies.
 * Spec: tests/notes-chapter-counts.test.ts.
 */
export function chapterCountsFromFacets(
  rows: ChapterFacetRow[],
  wantedIds: string[]
): Map<string, number> {
  const wanted = new Set(wantedIds);
  const out = new Map<string, number>();
  for (const r of rows) {
    if (wanted.has(r.chapter_id)) out.set(r.chapter_id, r.q_count);
  }
  return out;
}

/**
 * Per-chapter PYQ counts for a /notes subject landing page, counted in
 * Postgres by `get_chapter_facets`. The page used to tally one row per
 * question, which PostgREST cut off at 1000 rows: every chapter past the cut
 * showed "0 PYQs" (18 of 30 on NDA Maths).
 *
 * RLS scopes the result to the caller (anon sees PUBLIC only); the RPC is
 * `security invoker`.
 */
export async function loadChapterPyqCounts(
  client: SupabaseClient,
  args: { examId: string; subjectId: string; chapterIds: string[] }
): Promise<Map<string, number>> {
  if (args.chapterIds.length === 0) return new Map();

  const { data, error } = await client.rpc("get_chapter_facets", {
    p_exam_id: args.examId,
    p_subject_id: args.subjectId,
    p_kind: "pyq", // PYQ-only counts (migration 0036)
  });

  // Never fail an ISR-prerendered notes page on a counts hiccup: the cards
  // fall back to 0, as the old `data ?? []` did.
  if (error || !data) return new Map();

  return chapterCountsFromFacets(data as ChapterFacetRow[], args.chapterIds);
}
