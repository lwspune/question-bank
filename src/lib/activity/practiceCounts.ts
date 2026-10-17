/**
 * A student's own practice outside mocks, today / last 7 days / all time
 * (get_own_practice_counts, migration 0165), for V's my_progress tool.
 *
 * The client passed in must be the student's own session: the function takes
 * no argument and counts auth.uid()'s rows, and a signed-out caller is refused.
 * What counts as answered and right is 0132's "N answered" milestone rule; the
 * migration header has the detail.
 */
import type { SupabaseClient } from "@supabase/supabase-js";

export type PracticeSpan = {
  /** Answers with a right/wrong verdict: an option picked, or a drill answer. */
  answered: number;
  right: number;
  /** Answers read without picking an option (written answers, guide examples). */
  revealed: number;
};

export type PracticeCounts = { today: PracticeSpan; week: PracticeSpan; all: PracticeSpan };

type Row = { span: string; answered: number | string; right_answers: number | string; revealed: number | string };

const ZERO: PracticeSpan = { answered: 0, right: 0, revealed: 0 };

export function parsePracticeCounts(rows: readonly Row[] | null | undefined): PracticeCounts {
  const of = (span: keyof PracticeCounts): PracticeSpan => {
    const r = (rows ?? []).find((x) => x.span === span);
    return r ? { answered: Number(r.answered), right: Number(r.right_answers), revealed: Number(r.revealed) } : { ...ZERO };
  };
  return { today: of("today"), week: of("week"), all: of("all") };
}

export async function getOwnPracticeCounts(db: SupabaseClient): Promise<PracticeCounts> {
  const { data, error } = await db.rpc("get_own_practice_counts");
  if (error) throw new Error(`get_own_practice_counts: ${error.message}`);
  return parsePracticeCounts(data as Row[] | null);
}
