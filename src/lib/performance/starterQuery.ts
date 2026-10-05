/**
 * Reads for the empty /performance page's offer (./starter.ts decides).
 *
 * Shared catalogue data is cached hourly, like the mock catalogue itself: the
 * chapter -> test map (listChapterTests) and the published listing, which
 * supplies each test's exam and the full past papers. The two per-student
 * reads (last practised question, its chapter) are one row each and go
 * through the student's own session, so RLS scopes them.
 *
 * A failed read degrades to "no data", never to a broken page: the starter
 * then falls back to the exam's first test, or the exam picker.
 */
import { unstable_cache } from "next/cache";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getPublishedMocks } from "@/lib/mocks/query";
import { listChapterTests } from "@/lib/mocks/chapterTestsQuery";
import { getExamByName } from "@/lib/exam/examContext";
import type { StarterChapterTest, StarterPaper } from "./starter";

type ListedMock = { slug: string; examSlug: string; title: string; minutes: number; questions: number; full: boolean };

const listMocksForStarter = unstable_cache(
  async (): Promise<ListedMock[]> => {
    const mocks = await getPublishedMocks(createSupabaseAnonClient());
    const out: ListedMock[] = [];
    for (const m of mocks) {
      const examSlug = getExamByName(m.examName)?.slug;
      if (!examSlug) continue;
      out.push({
        slug: m.slug,
        examSlug,
        title: m.title,
        minutes: Math.round(m.durationSecs / 60),
        questions: m.totalQuestions,
        // Past papers only for the second link: an assembled practice paper
        // has no sitting to name.
        full: m.scope === "full" && m.source === "pyq",
      });
    }
    return out;
  },
  ["performance-starter-mocks"],
  { revalidate: 3600 }
);

export async function loadStarterCatalogue(): Promise<{
  chapterTests: StarterChapterTest[];
  fullPapers: StarterPaper[];
}> {
  try {
    const [byChapter, listed] = await Promise.all([listChapterTests(), listMocksForStarter()]);
    const examOf = new Map(listed.map((m) => [m.slug, m.examSlug]));
    const chapterTests: StarterChapterTest[] = [];
    for (const t of byChapter.values()) {
      const examSlug = examOf.get(t.slug);
      if (examSlug) chapterTests.push({ examSlug, chapterId: t.chapterId, slug: t.slug, title: t.title, minutes: t.minutes, questions: t.questions });
    }
    // getPublishedMocks is newest sitting first; keep that order.
    const fullPapers = listed
      .filter((m) => m.full)
      .map(({ slug, examSlug, title, minutes, questions }) => ({ slug, examSlug, title, minutes, questions }));
    return { chapterTests, fullPapers };
  } catch (e) {
    console.error("loadStarterCatalogue", e instanceof Error ? e.message : e);
    return { chapterTests: [], fullPapers: [] };
  }
}

/** Chapter of the student's most recent practised question (bank, board, guide). */
export async function loadLastPractisedChapter(db: SupabaseClient, userId: string): Promise<string | null> {
  const { data: last, error } = await db
    .from("user_activity")
    .select("ref_id")
    .eq("user_id", userId)
    .eq("kind", "question_practiced")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) {
    console.error("loadLastPractisedChapter: user_activity", error.message);
    return null;
  }
  if (!last?.ref_id) return null;
  const { data: q, error: qErr } = await db
    .from("questions")
    .select("chapter_id")
    .eq("id", last.ref_id as string)
    .maybeSingle();
  if (qErr) {
    console.error("loadLastPractisedChapter: questions", qErr.message);
    return null;
  }
  return (q?.chapter_id as string | null) ?? null;
}
