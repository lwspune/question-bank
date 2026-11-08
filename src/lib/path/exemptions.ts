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

/** Today's stored pick, or null when there is none yet. Throws on a failed read. */
export async function readTodayRow(db: SupabaseClient, userId: string, now: Date = new Date()): Promise<TodayExemptions | null> {
  const { data, error } = await db
    .from("study_path_days")
    .select("exempt_question_ids, fix_question_ids")
    .eq("user_id", userId)
    .eq("day", istDayKey(now))
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return null;
  return {
    revealIds: (data.exempt_question_ids as string[] | null) ?? [],
    drillIds: (data.fix_question_ids as string[] | null) ?? [],
  };
}

/**
 * Today's exemptions, picking today first when a path student has no pick yet
 * (Phase 2): a /board page or the drill opened before /me on a new day would
 * otherwise find no row and count today's path questions against the limits.
 * Only a student with an active path pays for the pick, once a day. A failed
 * read lifts nothing, so the limits apply as they would without a path.
 */
export async function ensureExemptions(deps: {
  read: () => Promise<TodayExemptions | null>;
  hasPath: () => Promise<boolean>;
  pick: () => Promise<void>;
}): Promise<TodayExemptions> {
  try {
    const row = await deps.read();
    if (row) return row;
    if (!(await deps.hasPath())) return NO_EXEMPTIONS;
    await deps.pick();
    return (await deps.read()) ?? NO_EXEMPTIONS;
  } catch (e) {
    console.error("path exemptions read failed", e instanceof Error ? e.message : e);
    return NO_EXEMPTIONS;
  }
}

/** Today's stored pick only (no pick made). */
export async function readTodayExemptions(db: SupabaseClient, userId: string, now: Date = new Date()): Promise<TodayExemptions> {
  return ensureExemptions({ read: () => readTodayRow(db, userId, now), hasPath: async () => false, pick: async () => {} });
}

/** The day's counted answers, without today's path questions. */
export function revealCountWithout(todayIds: readonly string[], exempt: readonly string[]): string[] {
  const out = new Set(exempt);
  return todayIds.filter((id) => !out.has(id));
}
