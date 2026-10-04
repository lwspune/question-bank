/**
 * Question of the day — the server read (2026-10-04). Pure pick rule:
 * lib/daily/questionOfDay.ts.
 *
 * WHICH QUESTIONS. PUBLIC past-year MCQs of the exam, not cancelled, with
 * exactly one keyed option. The last condition cannot be a PostgREST filter, so
 * the hashed index is checked and, if it lands on an unkeyed row, the next few
 * rows are tried in turn.
 *
 * CACHED PER EXAM PER DAY. The pick is the same for every student of an exam,
 * so it is resolved once a day per exam through `unstable_cache` with the
 * service-role client: it reads only PUBLIC rows, returns only an id, and runs
 * no per-user query. The student's own client then loads the row itself, so
 * what reaches the page went through their RLS like any bank card.
 */
import "server-only";
import { unstable_cache } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { dailyIndex, dailySeed } from "./questionOfDay";

/** Rows to try after an unkeyed landing before giving up for the day. */
const TRIES = 5;

async function resolveDailyQuestionId(examSlug: string, examId: string, istDay: string): Promise<string | null> {
  const db = createSupabaseAdminClient();
  const scoped = () =>
    db
      .from("questions")
      .select("id, options(is_correct)")
      .eq("exam_id", examId)
      .eq("visibility", "PUBLIC")
      .eq("question_kind", "pyq")
      .eq("question_format", "mcq")
      .is("cancelled_note", null);

  const { count, error } = await db
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", examId)
    .eq("visibility", "PUBLIC")
    .eq("question_kind", "pyq")
    .eq("question_format", "mcq")
    .is("cancelled_note", null);
  if (error) throw new Error(`question of the day count: ${error.message}`);
  const start = dailyIndex(dailySeed(examSlug, istDay), count ?? 0);
  if (start === null) return null;

  for (let t = 0; t < TRIES; t++) {
    const i = (start + t) % (count as number);
    const { data, error: rowError } = await scoped().order("id").range(i, i);
    if (rowError) throw new Error(`question of the day row: ${rowError.message}`);
    const row = (data ?? [])[0] as { id: string; options: { is_correct: boolean }[] } | undefined;
    if (row && row.options.filter((o) => o.is_correct).length === 1) return row.id;
  }
  return null;
}

/** The question-of-the-day id for one exam on one IST day, or null when the
 *  exam has no past-year MCQs. Never throws: no card is the failure mode. */
export async function getQuestionOfDayId(examSlug: string, examId: string, istDay: string): Promise<string | null> {
  try {
    return await unstable_cache(
      () => resolveDailyQuestionId(examSlug, examId, istDay),
      ["question-of-day", examSlug, istDay],
      { revalidate: 86_400 }
    )();
  } catch (e) {
    console.error("question of the day failed", e);
    return null;
  }
}
