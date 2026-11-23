/**
 * The 3 questions each gallery visual offers to practise (2026-11-23): its
 * concept's own tagged questions (question_concept_tags, the notes drill's
 * source), lowest ids first like the notes, without the notes' featured one.
 *
 * Read when the cached subject page is built, with the anon client, so only
 * PUBLIC questions' tags are seen. One paged read for the whole subject:
 * concept slugs repeat across topics, so a row counts only when BOTH its topic
 * and its concept belong to one of the subject's visuals.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { readInChunks } from "@/lib/supabase/readInChunks";
import { practiceIds, type GalleryVisual } from "./gallery";

/** Practice ids per visual, keyed "subtopicSlug/conceptSlug". */
export async function loadPracticeByConcept(
  client: SupabaseClient,
  visuals: readonly GalleryVisual[]
): Promise<Record<string, string[]>> {
  const want = new Set(visuals.map((v) => `${v.subtopicSlug}/${v.conceptSlug}`));
  const subtopics = [...new Set(visuals.map((v) => v.subtopicSlug))];
  const concepts = [...new Set(visuals.map((v) => v.conceptSlug))];
  const tagged = new Map<string, string[]>();

  const rows = await readInChunks<{ question_id: string; subtopic_slug: string; concept_slug: string }>(subtopics, (chunk, from, to) =>
    client
      .from("question_concept_tags")
      .select("question_id, subtopic_slug, concept_slug")
      .in("subtopic_slug", chunk)
      .in("concept_slug", concepts)
      .order("question_id")
      .order("subtopic_slug")
      .order("concept_slug")
      .range(from, to)
  );
  for (const r of rows) {
    const key = `${r.subtopic_slug}/${r.concept_slug}`;
    if (!want.has(key)) continue;
    const list = tagged.get(key) ?? [];
    list.push(r.question_id);
    tagged.set(key, list);
  }

  const out: Record<string, string[]> = {};
  for (const v of visuals) {
    const key = `${v.subtopicSlug}/${v.conceptSlug}`;
    const ids = [...new Set(tagged.get(key) ?? [])].sort();
    out[key] = practiceIds(ids, v.pyqExampleId);
  }
  return out;
}
