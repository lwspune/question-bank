/**
 * Resolve ONE lane's (exam, subject) taxonomy to the ids `/browse` filters on,
 * so the projected-score card can link a chapter or subtopic to the bank.
 *
 * WHY A SEPARATE READ AND NOT ANOTHER COLUMN ON THE RPC. `get_student_performance`
 * returns taxonomy as NAMES — `dims.subjects/chapters/subtopics` are string
 * arrays the facts index into — and that is the right shape for it: the payload
 * is already 1,270 kB, of which `facts` is 1,074 kB, and a uuid per dim entry
 * would grow it to serve a link. This read is ~30-120 rows for one subject
 * (the largest in the bank is MHT-CET Chemistry at 121 subtopics) and is
 * independent of how much the student has sat.
 *
 * Client INJECTED, like query.ts, so a smoke script can drive it outside Next.
 *
 * NAMES ARE THE JOIN KEY, and that is a real coupling: a chapter renamed since
 * the attempt was sat resolves to nothing, and `topicHref` degrades to a
 * chapter link or to no link at all. That is the intended failure — the same
 * rule the `/guide` and `/notes` cross-links follow, where a silently-wrong
 * link is worse than an absent one.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { taxonomyKey, EMPTY_TAXONOMY_LINKS, type TaxonomyLinks } from "./links";

type SubjectRow = { id: string; exam_id: string };
type ChapterRow = { id: string; name: string };
type SubtopicRow = { id: string; name: string; chapter_id: string };

/** PostgREST truncates a row payload at 1000 with no error, so every read that
 *  wants ALL rows pages explicitly. Inert at today's sizes; that is the point. */
const PAGE = 1000;

async function readAll<T>(
  run: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: { message: string } | null }>,
  label: string
): Promise<T[]> {
  const out: T[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await run(from, from + PAGE - 1);
    if (error) throw new Error(`${label}: ${error.message}`);
    const rows = data ?? [];
    out.push(...rows);
    if (rows.length < PAGE) return out;
  }
}

/**
 * @returns ids for every chapter and subtopic of that subject. An exam or
 *   subject that does not resolve yields the EMPTY map rather than throwing:
 *   the page must still render its numbers when only the links are unavailable.
 */
export async function fetchTaxonomyLinks(
  db: SupabaseClient,
  examName: string,
  subjectName: string
): Promise<TaxonomyLinks> {
  const { data: subject, error: subjectError } = await db
    .from("subjects")
    .select("id, exam_id, exams!inner(name)")
    .eq("name", subjectName)
    .eq("exams.name", examName)
    .maybeSingle<SubjectRow>();

  if (subjectError) throw new Error(`fetchTaxonomyLinks: ${subjectError.message}`);
  if (!subject) return EMPTY_TAXONOMY_LINKS;

  const chapterRows = await readAll<ChapterRow>(
    (from, to) => db.from("chapters").select("id, name").eq("subject_id", subject.id).range(from, to),
    "fetchTaxonomyLinks/chapters"
  );
  if (chapterRows.length === 0) {
    return { examId: subject.exam_id, subjectId: subject.id, chapters: {}, subtopics: {} };
  }

  const chapterIds = chapterRows.map((c) => c.id);
  const nameOfChapter = new Map(chapterRows.map((c) => [c.id, c.name]));

  // `.in()` puts its list in the URL, which is a DIFFERENT limit from the
  // 1000-row result cap above — chunked at 200 regardless of how the result
  // pages. The largest subject here has 31 chapters; the chunking is the guard.
  const subtopicRows: SubtopicRow[] = [];
  for (let i = 0; i < chapterIds.length; i += 200) {
    const slice = chapterIds.slice(i, i + 200);
    subtopicRows.push(
      ...(await readAll<SubtopicRow>(
        (from, to) =>
          db.from("subtopics").select("id, name, chapter_id").in("chapter_id", slice).range(from, to),
        "fetchTaxonomyLinks/subtopics"
      ))
    );
  }

  const chapters: Record<string, string> = {};
  for (const c of chapterRows) chapters[c.name] = c.id;

  const subtopics: Record<string, string> = {};
  for (const s of subtopicRows) {
    const chapter = nameOfChapter.get(s.chapter_id);
    if (chapter) subtopics[taxonomyKey(chapter, s.name)] = s.id;
  }

  return { examId: subject.exam_id, subjectId: subject.id, chapters, subtopics };
}
