/**
 * The Learn experiment's numbers for /dashboard/growth (migration 0195), counted in SQL so no
 * PostgREST row cap applies. Service role: it reads every student's Learn answers. Null when the
 * read fails, so the growth page still renders.
 */
import type { SupabaseClient } from "@supabase/supabase-js";

export type LearnReadout = {
  students: number;
  answers: number;
  masteredOne: number;
  conceptsMastered: number;
  returnedSecondDay: number;
  /** The steps before an answer (0202): students who opened any Learn page, a lesson, and began one. */
  visited: number;
  openedLesson: number;
  beganLesson: number;
};

export async function loadLearnReadout(admin: SupabaseClient, since: string): Promise<LearnReadout | null> {
  const { data, error } = await admin.rpc("learn_experiment_readout", { p_since: `${since}T00:00:00+05:30` });
  if (error) {
    console.error("learn readout failed", error.message);
    return null;
  }
  const r = data as {
    students: number;
    answers: number;
    mastered_one: number;
    concepts_mastered: number;
    returned_second_day: number;
    visited: number;
    opened_lesson: number;
    began_lesson: number;
  };
  return {
    students: r.students,
    answers: r.answers,
    masteredOne: r.mastered_one,
    conceptsMastered: r.concepts_mastered,
    returnedSecondDay: r.returned_second_day,
    visited: r.visited,
    openedLesson: r.opened_lesson,
    beganLesson: r.began_lesson,
  };
}
