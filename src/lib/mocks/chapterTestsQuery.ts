/**
 * The chapter → chapter-test map, read once and cached for the pages that
 * link to it (/questions chapter pages and the notes pages). The rule that
 * decides what counts as a chapter test is pure, in ./chapterTests.ts.
 *
 * Two reads, both with the anon client (the public view is exactly what a
 * visitor can open): published sectional mocks with their question snapshots,
 * then the chapter of each question, in chunks of 200 ids because `.in()`
 * puts the list in the URL.
 *
 * CACHED AS ENTRIES, NOT A MAP: unstable_cache serialises its result, and a
 * Map comes back as `{}` — every lookup would miss with no error.
 *
 * Hourly, matching the mock catalogue (`revalidate = 3600`): a newly
 * published test shows on the catalogue and on its chapter's pages within the
 * same hour. A failed read returns no tests, so the pages fall back to the
 * past-paper link instead of failing to render.
 */
import { unstable_cache } from "next/cache";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import {
  chapterTestsByChapter,
  type ChapterTest,
  type SectionalMock,
} from "./chapterTests";

const ID_CHUNK = 200;

/**
 * The uncached read, taking any client — `scripts/mocks/chapter-tests-smoke.ts`
 * runs this exact code against live data, since unstable_cache needs Next.
 */
export async function readChapterTestEntries(
  db: SupabaseClient
): Promise<[string, ChapterTest][]> {
  const { data: mocks, error } = await db
    .from("mock_tests")
    .select("slug, title, total_questions, duration_secs, questions")
    .eq("status", "published")
    .eq("scope", "sectional");
  if (error) {
    console.error("listChapterTests: mock_tests", error.message);
    return [];
  }

  const sectional: SectionalMock[] = (mocks ?? []).map((m) => ({
    slug: m.slug as string,
    title: m.title as string,
    totalQuestions: m.total_questions as number,
    durationSecs: m.duration_secs as number,
    questionIds: ((m.questions as { questionId: string }[] | null) ?? []).map(
      (q) => q.questionId
    ),
  }));

  const ids = Array.from(new Set(sectional.flatMap((m) => m.questionIds)));
  const chapterOf = new Map<string, string>();
  for (let i = 0; i < ids.length; i += ID_CHUNK) {
    const { data: rows, error: qErr } = await db
      .from("questions")
      .select("id, chapter_id")
      .in("id", ids.slice(i, i + ID_CHUNK));
    if (qErr) {
      console.error("listChapterTests: questions", qErr.message);
      return [];
    }
    for (const r of rows ?? [])
      if (r.chapter_id) chapterOf.set(r.id as string, r.chapter_id as string);
  }

  return Array.from(chapterTestsByChapter(sectional, chapterOf).entries());
}

const listChapterTestEntries = unstable_cache(
  async (): Promise<[string, ChapterTest][]> =>
    readChapterTestEntries(createSupabaseAnonClient()),
  ["mock-chapter-tests"],
  { revalidate: 3600 }
);

/** chapterId → its published chapter test. */
export async function listChapterTests(): Promise<Map<string, ChapterTest>> {
  try {
    return new Map(await listChapterTestEntries());
  } catch (e) {
    console.error("listChapterTests", e instanceof Error ? e.message : e);
    return new Map();
  }
}
