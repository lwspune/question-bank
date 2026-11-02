import type { SupabaseClient } from "@supabase/supabase-js";
import type { ExamIdMap } from "@/lib/exam/examNav";
import { getNotesExamGroups } from "@/lib/notes/notesNav";
import { suggestTargetExam } from "./suggestExam";

/** The recent answers looked at: enough to see a pattern, cheap to read. */
const RECENT_ANSWERS = 200;
/** `.in()` puts the ids in the URL, which overflows past a few hundred. */
const ID_CHUNK = 150;

/**
 * The exam to suggest to a student with no target exam (suggestExam.ts), read
 * with the student's own client: user_activity and student_profiles are both
 * own-row readable, and PUBLIC questions are readable by anyone. Best effort:
 * any failed read returns null and /me shows its plain "Choose your exam".
 */
export async function loadSuggestedExam(
  db: SupabaseClient,
  userId: string,
  examIds: ExamIdMap
): Promise<string | null> {
  try {
    const [activity, profile] = await Promise.all([
      db
        .from("user_activity")
        .select("ref_id")
        .eq("user_id", userId)
        .eq("ref_kind", "question")
        .in("kind", ["question_practiced", "answer_wrong", "answer_correct"])
        .order("created_at", { ascending: false })
        .limit(RECENT_ANSWERS),
      db.from("student_profiles").select("acq_landing").eq("user_id", userId).maybeSingle(),
    ]);
    if (activity.error) throw activity.error;

    const ids = Array.from(new Set((activity.data ?? []).map((r) => r.ref_id as string).filter(Boolean)));
    const slugById = new Map(
      Object.entries(examIds).flatMap(([slug, id]) => (id ? [[id, slug] as const] : []))
    );
    const practice: Record<string, number> = {};
    for (let i = 0; i < ids.length; i += ID_CHUNK) {
      const { data, error } = await db.from("questions").select("exam_id").in("id", ids.slice(i, i + ID_CHUNK));
      if (error) throw error;
      for (const q of data ?? []) {
        const slug = slugById.get(q.exam_id as string);
        if (slug) practice[slug] = (practice[slug] ?? 0) + 1;
      }
    }

    const examOfRoute = new Map(
      getNotesExamGroups().flatMap((g) => g.subjects.map((s) => [s.subjectRoute, g.slug] as const))
    );
    return suggestTargetExam(
      { practice, landing: (profile.data?.acq_landing as string | null) ?? null },
      (route) => examOfRoute.get(route) ?? null
    );
  } catch (e) {
    console.error("suggested exam read failed", e instanceof Error ? e.message : e);
    return null;
  }
}
