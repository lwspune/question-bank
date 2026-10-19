/**
 * The numbers behind V's exam_strategy tool (lib/chat/examStrategy.ts): for one
 * exam, how many PUBLIC past-year questions each chapter holds, year by year.
 *
 * Counted in Postgres by get_chapter_facets (one call per year, the exam's
 * latest LOOKBACK_YEARS calendar years), never from fetched rows, which
 * PostgREST would cut at 1000. Cached a day per exam: it moves only on an
 * ingest. The anon client, so only PUBLIC questions count.
 */
import { unstable_cache } from "next/cache";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import type { StrategyChapter, StrategyData } from "./examStrategy";

/** Calendar years read back from the latest: wide enough for 5 years of papers on an exam with gaps. */
const LOOKBACK_YEARS = 10;
/** .in() puts ids in the URL: chunked well under its limit. */
const ID_CHUNK = 200;
const TTL_SECONDS = 86400;

export async function readExamStrategyUncached(examSlug: string): Promise<StrategyData | null> {
  const entry = EXAM_REGISTRY.find((e) => e.slug === examSlug);
  if (!entry) return null;
  const db = createSupabaseAnonClient();

  const { data: exam, error: examErr } = await db.from("exams").select("id").eq("name", entry.examName).maybeSingle();
  if (examErr) throw new Error(`exam: ${examErr.message}`);
  if (!exam) return null;
  const base = { examName: entry.displayName, board: entry.boardExam === true };

  const { data: latestRows, error: latestErr } = await db
    .from("questions")
    .select("pyq_year")
    .eq("exam_id", exam.id)
    .eq("question_kind", "pyq")
    .not("pyq_year", "is", null)
    .order("pyq_year", { ascending: false })
    .limit(1);
  if (latestErr) throw new Error(`latest year: ${latestErr.message}`);
  const latest = (latestRows?.[0] as { pyq_year: number } | undefined)?.pyq_year;
  if (!latest) return { ...base, chapters: [] };

  const years = Array.from({ length: LOOKBACK_YEARS }, (_, i) => latest - i);
  const perYear = await Promise.all(
    years.map(async (year) => {
      const { data, error } = await db.rpc("get_chapter_facets", {
        p_exam_id: exam.id,
        p_subject_id: null,
        p_difficulties: null,
        p_pyq_years: [year],
        p_q: null,
        p_kind: "pyq",
      });
      if (error) throw new Error(`facets ${year}: ${error.message}`);
      return { year, rows: (data ?? []) as { chapter_id: string; q_count: number }[] };
    })
  );

  const byChapter = new Map<string, Record<string, number>>();
  for (const { year, rows } of perYear) {
    for (const r of rows) {
      if (!r.q_count) continue;
      const counts = byChapter.get(r.chapter_id) ?? {};
      counts[String(year)] = Number(r.q_count);
      byChapter.set(r.chapter_id, counts);
    }
  }
  const ids = [...byChapter.keys()];
  if (ids.length === 0) return { ...base, chapters: [] };

  const { data: subjects, error: subjErr } = await db.from("subjects").select("id, name").eq("exam_id", exam.id);
  if (subjErr) throw new Error(`subjects: ${subjErr.message}`);
  const subjectName = new Map((subjects ?? []).map((s) => [s.id as string, s.name as string]));

  const chapters: StrategyChapter[] = [];
  for (let i = 0; i < ids.length; i += ID_CHUNK) {
    const { data, error } = await db.from("chapters").select("id, name, subject_id").in("id", ids.slice(i, i + ID_CHUNK));
    if (error) throw new Error(`chapters: ${error.message}`);
    for (const c of data ?? []) {
      const subject = subjectName.get(c.subject_id as string);
      if (!subject) continue;
      chapters.push({ id: c.id as string, name: c.name as string, subject, byYear: byChapter.get(c.id as string) ?? {} });
    }
  }
  return { ...base, chapters };
}

/** Cached a day per exam. */
export function loadExamStrategy(examSlug: string): Promise<StrategyData | null> {
  return unstable_cache(() => readExamStrategyUncached(examSlug), ["chat", "exam-strategy", "v1", examSlug], {
    revalidate: TTL_SECONDS,
  })();
}
