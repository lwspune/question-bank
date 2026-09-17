import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Which of these questions are `practice` rather than `pyq`.
 *
 * Loaded separately rather than by widening `QuestionRow`: that view-model is
 * shared by `/browse`, `/questions`, `/saved` and the Word export, and the
 * formula pages are the only surface that needs the kind. One narrow column
 * read is cheaper than a type change rippling through four surfaces.
 *
 * Returns the PRACTICE ids specifically, because "not practice" is the safe
 * default — a row that fails to resolve is shown under PYQ, which is the
 * product's primary corpus, rather than being hidden from both filters.
 *
 * Chunked at 200: `.in()` puts the list in the URL, and a few hundred uuids
 * overflow the request line and earn a bare `Bad Request` from PostgREST. That
 * limit is separate from the 1000-row result cap and is the smaller of the two.
 */
export async function loadPracticeIds(
  client: SupabaseClient,
  ids: string[]
): Promise<Set<string>> {
  const out = new Set<string>();
  for (let i = 0; i < ids.length; i += 200) {
    const chunk = ids.slice(i, i + 200);
    if (chunk.length === 0) continue;
    const { data, error } = await client
      .from("questions")
      .select("id, question_kind")
      .in("id", chunk)
      .eq("question_kind", "practice");
    if (error) throw new Error(`loadPracticeIds: ${error.message}`);
    for (const r of (data ?? []) as { id: string }[]) out.add(r.id);
  }
  return out;
}
