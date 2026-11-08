/**
 * Read and save a student's exam focus (lib/me/focus.ts, migration 0231).
 *
 * Takes the supabase client as a parameter: the student's own pages pass their
 * JWT client (own-row RLS), the staff view of a student's /me passes the
 * service-role client, so the two resolve the focus the same way.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { ExamIdMap } from "@/lib/exam/examNav";
import { needsRecentRead, resolveFocus, type Focus, type FocusChoice } from "./focus";

/** Recent answers looked at for "the exam they practised most recently". */
const RECENT_ANSWERS = 20;

export async function loadFocus(db: SupabaseClient, userId: string, examIds: ExamIdMap): Promise<Focus> {
  const { data, error } = await db
    .from("student_profiles")
    .select("target_exams, focus_exam")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(`loadFocus: ${error.message}`);
  const targets = ((data?.target_exams as string[] | null) ?? []).slice();
  const saved = (data?.focus_exam as string | null) ?? null;

  // Only a two-exam student with no valid choice needs the recent read; for
  // everyone else this function is the one profile read.
  const recent = needsRecentRead({ targets, saved })
    ? await recentExam(db, userId, examIds).catch((e: unknown) => {
        // Best effort: without it the default is the first exam they chose.
        console.error("focus recent read failed", e instanceof Error ? e.message : e);
        return null;
      })
    : null;
  return resolveFocus({ targets, saved, recent });
}

/** The exam slug of their latest answered question, or null. Exported for
 *  `npm run focus:smoke`. */
export async function recentExam(db: SupabaseClient, userId: string, examIds: ExamIdMap): Promise<string | null> {
  const { data, error } = await db
    .from("user_activity")
    .select("ref_id")
    .eq("user_id", userId)
    .eq("ref_kind", "question")
    .in("kind", ["question_practiced", "answer_wrong", "answer_correct"])
    .order("created_at", { ascending: false })
    .limit(RECENT_ANSWERS);
  if (error) throw error;
  const ids = [...new Set((data ?? []).map((r) => r.ref_id as string).filter(Boolean))];
  if (ids.length === 0) return null;

  const { data: qs, error: qErr } = await db.from("questions").select("id, exam_id").in("id", ids);
  if (qErr) throw qErr;
  const examOf = new Map((qs ?? []).map((q) => [q.id as string, q.exam_id as string]));
  const slugById = new Map(Object.entries(examIds).flatMap(([slug, id]) => (id ? [[id, slug] as const] : [])));
  // Newest first: the first answer whose exam we can name decides.
  for (const id of ids) {
    const slug = slugById.get(examOf.get(id) ?? "");
    if (slug) return slug;
  }
  return null;
}

/** Save the focus on the student's own row. The database refuses an exam
 *  that is not one of theirs (0231), so a stale tab cannot store one. */
export async function saveOwnFocus(db: SupabaseClient, userId: string, choice: FocusChoice): Promise<void> {
  const { data, error } = await db
    .from("student_profiles")
    .update({ focus_exam: choice, updated_at: new Date().toISOString() })
    .eq("user_id", userId)
    .select("user_id");
  if (error) throw new Error(`saveOwnFocus: ${error.message}`);
  // No row is not a save: only a student with exams (so a row) has a switch.
  if (!data || data.length === 0) throw new Error("saveOwnFocus: no profile row");
}
