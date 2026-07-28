/**
 * Cached taxonomy reads for the /browse filter sidebar.
 *
 * WHY: every /browse hit re-fetched the exam / subject / chapter / subtopic
 * lists from Postgres, for every visitor, forever — even though this data is
 * identical for everyone and only changes when an ingest lands. Those are pure
 * taxonomy tables with NO visibility or org dimension (per the RLS model, anon
 * can read ALL taxonomy), so one cached copy is correct for anon, students and
 * staff alike.
 *
 * WHAT IS DELIBERATELY *NOT* CACHED HERE — and must not be added:
 *   - `get_chapter_facets` / `get_subtopic_facets` / `get_pyq_years`
 *   - the question list itself (`queryQuestions`)
 * All four are `security invoker` (migrations 0019/0020/0037), so their results
 * are RLS-scoped: anon sees PUBLIC counts, an org member additionally sees their
 * own org's PRIVATE rows. Caching them against the anon client would quietly
 * hide staff's private questions from their own filter counts.
 *
 * Reads go through the ANON client on purpose: `unstable_cache` may not touch
 * `cookies()`, and a cookie-bound client would both break that rule and defeat
 * the point of caching.
 */
import { unstable_cache } from "next/cache";
import { createSupabaseAnonClient } from "@/lib/supabase/server";

/**
 * How long a taxonomy list may be stale. Ingests are frequent in this project,
 * so the practical effect is: a brand-new chapter can take up to an hour to
 * appear in the /browse dropdowns. The questions themselves are never cached
 * here, so a new chapter's questions are filterable by URL immediately.
 */
const TAXONOMY_TTL_SECONDS = 3600;

export type ExamOption = { id: string; name: string };
export type SubjectOption = { id: string; name: string };
export type ChapterOption = { id: string; name: string; order_index: number };
export type SubtopicOption = {
  id: string;
  name: string;
  chapter_id: string;
  order_index: number | null;
};

/**
 * Stable cache key for a set of ids: deduped and sorted, so `[b, a]` and
 * `[a, b, a]` hit ONE cache entry instead of three. Pure — see the spec.
 */
export function normalizeIdList(ids: readonly string[]): string[] {
  return Array.from(new Set(ids)).sort();
}

export const listExams = unstable_cache(
  async (): Promise<ExamOption[]> => {
    const { data } = await createSupabaseAnonClient()
      .from("exams")
      .select("id, name")
      .order("name");
    return data ?? [];
  },
  ["browse-taxonomy", "exams"],
  { revalidate: TAXONOMY_TTL_SECONDS }
);

export const listSubjects = unstable_cache(
  async (examId: string): Promise<SubjectOption[]> => {
    const { data } = await createSupabaseAnonClient()
      .from("subjects")
      .select("id, name")
      .eq("exam_id", examId)
      .order("name");
    return data ?? [];
  },
  ["browse-taxonomy", "subjects"],
  { revalidate: TAXONOMY_TTL_SECONDS }
);

export const listChapters = unstable_cache(
  async (subjectId: string): Promise<ChapterOption[]> => {
    const { data } = await createSupabaseAnonClient()
      .from("chapters")
      .select("id, name, order_index")
      .eq("subject_id", subjectId)
      .order("order_index");
    return data ?? [];
  },
  ["browse-taxonomy", "chapters"],
  { revalidate: TAXONOMY_TTL_SECONDS }
);

const listSubtopicsForKey = unstable_cache(
  async (chapterIdKey: string): Promise<SubtopicOption[]> => {
    const { data } = await createSupabaseAnonClient()
      .from("subtopics")
      .select("id, name, chapter_id, order_index")
      .in("chapter_id", chapterIdKey.split(","))
      .order("name");
    return data ?? [];
  },
  ["browse-taxonomy", "subtopics"],
  { revalidate: TAXONOMY_TTL_SECONDS }
);

export async function listSubtopics(
  chapterIds: readonly string[]
): Promise<SubtopicOption[]> {
  const normalized = normalizeIdList(chapterIds);
  if (normalized.length === 0) return [];
  return listSubtopicsForKey(normalized.join(","));
}

/** Exam NAME for an id — used to spot a practice-only exam and default the kind filter. */
export const getExamNameById = unstable_cache(
  async (examId: string): Promise<string | null> => {
    const { data } = await createSupabaseAnonClient()
      .from("exams")
      .select("name")
      .eq("id", examId)
      .maybeSingle();
    return data?.name ?? null;
  },
  ["browse-taxonomy", "exam-name"],
  { revalidate: TAXONOMY_TTL_SECONDS }
);

/** Exam ID for a name — used to scope a bare /browse to the active-exam cookie. */
export const getExamIdByName = unstable_cache(
  async (examName: string): Promise<string | null> => {
    const { data } = await createSupabaseAnonClient()
      .from("exams")
      .select("id")
      .eq("name", examName)
      .maybeSingle();
    return data?.id ?? null;
  },
  ["browse-taxonomy", "exam-id"],
  { revalidate: TAXONOMY_TTL_SECONDS }
);
