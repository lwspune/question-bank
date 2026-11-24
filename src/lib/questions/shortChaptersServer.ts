/**
 * The chapters under the landing threshold, read and cached a day
 * (lib/questions/shortChapters.ts says why). Read only by V's chapter search
 * and the /go/chapter redirect, never by a page build: the landing list, its
 * cache and the sitemap are untouched.
 *
 * The same per-subject counts the landing list reads (get_chapter_facets,
 * never counted rows: PostgREST caps a read at 1000), but only chapters and
 * counts, two requests a subject. A few exams at a time, so a cold fill does
 * not queue ~500 requests at once; after that the cache serves the old list
 * while a new one is read.
 */
import { unstable_cache } from "next/cache";
import { singleFlight } from "@/lib/cache/singleFlight";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { EXAM_REGISTRY, isPracticeOnlyExam, type ExamEntry } from "@/lib/exam/examContext";
import { dedupeBySlug } from "@/lib/questions/slugs";
import { shortChapterRows, type ShortChapterRow } from "@/lib/questions/shortChapters";

const TTL_SECONDS = 86400;
const EXAMS_AT_ONCE = 4;

type FacetRow = { chapter_id: string; q_count: number };

async function readExam(
  db: ReturnType<typeof createSupabaseAnonClient>,
  exam: ExamEntry,
  examId: string
): Promise<ShortChapterRow[]> {
  const practiceOnly = isPracticeOnlyExam(exam.examName);
  const { data: subjects, error } = await db.from("subjects").select("id, name").eq("exam_id", examId).order("name");
  if (error) throw new Error(`short chapters: subjects of ${exam.examName}: ${error.message}`);
  const out: ShortChapterRow[] = [];
  for (const subject of dedupeBySlug((subjects ?? []) as { id: string; name: string }[])) {
    const [chapters, facets] = await Promise.all([
      db.from("chapters").select("id, name").eq("subject_id", subject.id).order("name"),
      db.rpc("get_chapter_facets", {
        p_exam_id: examId,
        p_subject_id: subject.id,
        p_difficulties: null,
        p_pyq_years: null,
        p_q: null,
        p_kind: practiceOnly ? "practice" : "pyq",
      }),
    ]);
    if (chapters.error) throw new Error(`short chapters: chapters of ${subject.name}: ${chapters.error.message}`);
    if (facets.error) throw new Error(`short chapters: counts of ${subject.name}: ${facets.error.message}`);
    out.push(
      ...shortChapterRows({
        exam: { slug: exam.slug, examName: exam.examName, examId, practiceOnly },
        subject,
        chapters: (chapters.data ?? []) as { id: string; name: string }[],
        counts: new Map(((facets.data ?? []) as FacetRow[]).map((f) => [f.chapter_id, Number(f.q_count)])),
      })
    );
  }
  return out;
}

/** Every exam's chapters with 1 to 14 questions, uncached: for scripts outside Next. */
export async function readShortChaptersUncached(): Promise<ShortChapterRow[]> {
  const db = createSupabaseAnonClient();
  const { data: examRows, error } = await db.from("exams").select("id, name");
  if (error) throw new Error(`short chapters: exams: ${error.message}`);
  const idByName = new Map(((examRows ?? []) as { id: string; name: string }[]).map((e) => [e.name, e.id]));
  // Registered in code but not yet in the database: skipped, as the landing list does.
  const exams = EXAM_REGISTRY.filter((e) => e.slug && idByName.has(e.examName));
  const out: ShortChapterRow[] = [];
  for (let i = 0; i < exams.length; i += EXAMS_AT_ONCE) {
    const batch = await Promise.all(exams.slice(i, i + EXAMS_AT_ONCE).map((e) => readExam(db, e, idByName.get(e.examName)!)));
    out.push(...batch.flat());
  }
  return out;
}

const loadShortChapters = unstable_cache(readShortChaptersUncached, ["questions", "short-chapters", "v1"], {
  revalidate: TTL_SECONDS,
});

export function listShortChapters(): Promise<ShortChapterRow[]> {
  return singleFlight("short-chapters", loadShortChapters);
}
