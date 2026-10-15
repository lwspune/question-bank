/**
 * Loads a subject's practice-test pool (./pool.ts) and caches it for a day.
 *
 * V asks for one subject at a time, when the student picks it, so a cold
 * cache costs one subject's read, not an exam's. The read pages past
 * PostgREST's 1000-row cap and selects narrow columns (no question text): the
 * pool only decides WHICH questions, and the runner renders them live.
 *
 * Public data, so the anon client: it sees exactly the PUBLIC rows a test may
 * use. DAILY, like the chapter-test map: a question published today joins the
 * pool tomorrow or at the next deploy. Only ever called by the practice-test
 * routes, never while a page is built, so a cold cache never adds to a
 * build's load.
 */
import { unstable_cache } from "next/cache";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getPracticeExam, getPracticeSubject, type PracticeExam, type PracticeSubject } from "./config";
import { buildPool, type PoolRow, type SubjectPool } from "./pool";
import type { PracticeLevel } from "./pick";

const PAGE = 1000; // PostgREST truncates a select at 1000 rows with no error.

export type ResolvedSubject = { examId: string; subjectId: string; pool: SubjectPool };

type QuestionRow = {
  id: string;
  chapter_id: string;
  question_kind: string;
  question_format: string | null;
  numeric_answer: number | string | null;
  difficulty: PracticeLevel | null;
  set_id: string | null;
  context: string | null;
  pyq_year: number | null;
  subtopic: { name: string } | { name: string }[] | null;
  options: { is_correct: boolean }[] | null;
};

const SELECT =
  "id, chapter_id, question_kind, question_format, numeric_answer, difficulty, set_id, context, pyq_year, " +
  "subtopic:subtopics(name), options(is_correct)";

function flatten(r: QuestionRow): PoolRow {
  const sub = Array.isArray(r.subtopic) ? r.subtopic[0] : r.subtopic;
  const options = r.options ?? [];
  return {
    id: r.id,
    chapterId: r.chapter_id,
    kind: r.question_kind,
    format: r.question_format ?? "mcq",
    hasNumericAnswer: r.numeric_answer !== null,
    difficulty: r.difficulty,
    setId: r.set_id,
    context: r.context,
    pyqYear: r.pyq_year,
    subtopic: sub?.name ?? null,
    optionCount: options.length,
    correctCount: options.filter((o) => o.is_correct).length,
  };
}

/**
 * The uncached read, taking any client, so a smoke script can run this exact
 * code against live data. Null when the exam or subject row is missing.
 */
export async function readSubjectPool(
  db: SupabaseClient,
  exam: PracticeExam,
  subject: PracticeSubject,
  now: Date
): Promise<ResolvedSubject | null> {
  const { data: examRow, error: examErr } = await db.from("exams").select("id").eq("name", exam.examName).maybeSingle();
  if (examErr) throw new Error(`practice pool exam: ${examErr.message}`);
  if (!examRow) return null;
  const { data: subjectRow, error: subjectErr } = await db
    .from("subjects")
    .select("id")
    .eq("exam_id", examRow.id)
    .eq("name", subject.bankSubject)
    .maybeSingle();
  if (subjectErr) throw new Error(`practice pool subject: ${subjectErr.message}`);
  if (!subjectRow) return null;

  const { data: chapters, error: chErr } = await db
    .from("chapters")
    .select("id, name, order_index")
    .eq("subject_id", subjectRow.id);
  if (chErr) throw new Error(`practice pool chapters: ${chErr.message}`);

  const rows: PoolRow[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("questions")
      .select(SELECT)
      .eq("exam_id", examRow.id)
      .eq("subject_id", subjectRow.id)
      .eq("visibility", "PUBLIC")
      .in("question_kind", [...exam.kinds])
      .order("id")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`practice pool questions: ${error.message}`);
    const page = (data ?? []) as unknown as QuestionRow[];
    rows.push(...page.map(flatten));
    if (page.length < PAGE) break;
  }

  const pool = buildPool(
    (chapters ?? []).map((c) => ({ id: c.id as string, name: c.name as string, orderIndex: c.order_index as number })),
    rows,
    exam,
    now.getUTCFullYear()
  );
  return { examId: examRow.id as string, subjectId: subjectRow.id as string, pool };
}

const cachedPool = unstable_cache(
  async (examSlug: string, subjectKey: string): Promise<ResolvedSubject | null> => {
    const exam = getPracticeExam(examSlug);
    const subject = exam ? getPracticeSubject(exam, subjectKey) : null;
    if (!exam || !subject) return null;
    return readSubjectPool(createSupabaseAnonClient(), exam, subject, new Date());
  },
  // The cached value is the BUILT pool, and the cache outlives a deploy, so a
  // change to the pool's rules or shape (./pool.ts) must bump this version or
  // students get yesterday's pool for up to a day.
  ["practice-test-pool", "v2"],
  { revalidate: 86400 }
);

/** One subject's pool, cached for a day. Throws when the read fails. */
export async function getSubjectPool(exam: PracticeExam, subject: PracticeSubject): Promise<ResolvedSubject | null> {
  return cachedPool(exam.slug, subject.key);
}
