/**
 * Record an "Understood / Review later" tap under a written model answer on
 * /browse, the /questions pages or a board reader (2026-10-28). The rules are
 * the pure selfMark.ts; this reads the two facts they need and writes.
 *
 * Takes the client as a PARAMETER (the lib/drill/query.ts precedent), so the
 * integration test drives it as a real signed-in student. Read and written
 * with the student's own JWT: questions are PUBLIC-readable and user_activity
 * is own-row, so RLS is the authorization. Inside the drill the same tap goes
 * through recordDrillAnswer instead (lib/drill/service).
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { logActivityBatch, logActivityOnce } from "@/lib/activity/service";
import { loadQuestionEvents, loadWrittenAnswer } from "@/lib/drill/query";
import { questionState } from "@/lib/drill/select";
import { selfMarkEvents, type SelfMark, type SelfMarkOutcome, type SelfMarkSurface } from "./selfMark";

/**
 * Null when the question cannot be self-marked (not a PUBLIC written question
 * with a model answer): nothing is written, because the buttons only ever show
 * under a model answer, so this was not a mark a student made.
 */
export async function recordSelfMark(
  db: SupabaseClient,
  userId: string,
  input: { questionId: string; mark: SelfMark; surface: SelfMarkSurface },
  now: Date = new Date()
): Promise<{ outcome: SelfMarkOutcome } | null> {
  // Both reads at once: the server is a round trip from the database.
  const [answer, events] = await Promise.all([
    loadWrittenAnswer(db, input.questionId),
    loadQuestionEvents(db, userId, input.questionId),
  ]);
  if (!answer) return null;

  const { tap, ladder, outcome } = selfMarkEvents({
    ...input,
    stateBefore: questionState(events, now),
    userId,
    now,
  });
  // Best-effort, both: a lost drill row fails safe in each direction that
  // matters (a lost Review later leaves the question out of a drill it was
  // never in; a lost Understood leaves it due, so it comes back).
  await Promise.all([
    logActivityOnce(db, userId, tap, now.getTime()),
    ladder ? logActivityBatch(db, userId, [ladder], now.getTime()) : Promise.resolve(),
  ]);
  return { outcome };
}
