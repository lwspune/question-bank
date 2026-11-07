/**
 * What today's board-path tasks lift from the free limits (MENTOR_SPEC.md §6),
 * read from the server's own stored pick (study_path_days, migration 0225).
 * Nothing here takes a question id from the browser: the routes ask "is this
 * one of TODAY'S path questions?" of a row only the service role writes.
 *
 * The read takes the client as a parameter (the student's own JWT: the row is
 * own-row readable). A failed read lifts nothing, so the limits apply as they
 * would without a path. Spec: tests/path-parse.test.ts.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { istDayKey } from "@/lib/email/dueNudge";

export type TodayExemptions = { revealIds: string[]; drillIds: string[] };

export const NO_EXEMPTIONS: TodayExemptions = { revealIds: [], drillIds: [] };

export async function readTodayExemptions(db: SupabaseClient, userId: string, now: Date = new Date()): Promise<TodayExemptions> {
  try {
    const { data, error } = await db
      .from("study_path_days")
      .select("exempt_question_ids, fix_question_ids")
      .eq("user_id", userId)
      .eq("day", istDayKey(now))
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) return NO_EXEMPTIONS;
    return {
      revealIds: (data.exempt_question_ids as string[] | null) ?? [],
      drillIds: (data.fix_question_ids as string[] | null) ?? [],
    };
  } catch (e) {
    console.error("path exemptions read failed", e instanceof Error ? e.message : e);
    return NO_EXEMPTIONS;
  }
}

/** The day's counted answers, without today's path questions. */
export function revealCountWithout(todayIds: readonly string[], exempt: readonly string[]): string[] {
  const out = new Set(exempt);
  return todayIds.filter((id) => !out.has(id));
}
