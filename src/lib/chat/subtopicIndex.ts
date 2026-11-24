/**
 * Subtopic names per chapter, for V's find_chapters (2026-10-19). A student
 * asked for "budget and taxation" PYQs in SSC; SSC CGL has 20 questions under
 * Union Budget and Fiscal Policy, but that is a subtopic of "Money, Banking
 * and Public Finance" and the search read chapter names only, so V said there
 * was nothing.
 *
 * Read in pages (PostgREST returns at most 1000 rows a request) and cached a
 * day like the chapter list it is joined to. Taxonomy is public, so the anon
 * client reads it.
 */
import { unstable_cache } from "next/cache";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { listChapterLandings, type ChapterLanding } from "@/lib/questions/landing";
import { listShortChapters } from "@/lib/questions/shortChaptersServer";
import type { ChapterSearchRow } from "./chapterSearch";

const PAGE = 1000;
const TTL_SECONDS = 86400;

/** chapter id -> its subtopic names. A plain object, since the cache stores JSON. */
export type SubtopicIndex = Record<string, string[]>;

export async function readSubtopicIndexUncached(): Promise<SubtopicIndex> {
  const db = createSupabaseAnonClient();
  const out: SubtopicIndex = {};
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("subtopics")
      .select("id, chapter_id, name")
      .order("id")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`subtopic index read failed: ${error.message}`);
    const rows = (data ?? []) as { chapter_id: string; name: string }[];
    for (const r of rows) (out[r.chapter_id] ??= []).push(r.name);
    if (rows.length < PAGE) break;
  }
  return out;
}

const readSubtopicIndex = unstable_cache(readSubtopicIndexUncached, ["chat", "subtopic-index", "v1"], {
  revalidate: TTL_SECONDS,
});

export function withSubtopics(
  landings: readonly (ChapterLanding | ChapterSearchRow)[],
  index: SubtopicIndex
): ChapterSearchRow[] {
  return landings.map((l) => ({ ...l, subtopicNames: (l.chapterId && index[l.chapterId]) || [] }));
}

/**
 * V's search list: the cached chapter list with each chapter's subtopics, plus the chapters too small for
 * a landing page (2026-11-24, lib/questions/shortChapters.ts). Without the subtopics the search still runs
 * on names; without the small chapters it still finds every landing page.
 */
export async function listChapterSearchRows(): Promise<ChapterSearchRow[]> {
  const [landings, short, index] = await Promise.all([
    listChapterLandings(),
    listShortChapters().catch((err) => {
      console.error("V: small chapters unavailable", err);
      return [] as ChapterSearchRow[];
    }),
    readSubtopicIndex().catch((err) => {
      console.error("V: subtopic index unavailable", err);
      return {} as SubtopicIndex;
    }),
  ]);
  return withSubtopics([...landings, ...short], index);
}
