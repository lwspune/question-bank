/**
 * `server-only` wrapper for the weak-area drill: session, client, and the order
 * the pieces run in. The rules live in the pure select.ts, the rows in query.ts.
 *
 * READS AND WRITES AS THE STUDENT. Every query here goes through the
 * RLS-bound client, so `user_activity`'s own-row policy is the authorization
 * and there is no service-role call for a route to mis-gate.
 */
import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { logActivity } from "@/lib/activity/service";
import {
  attachRefs,
  dueQuestions,
  selectDrill,
  DRILL_SIZE,
  type DueQuestion,
} from "./select";
import {
  gradeDrillAnswer,
  loadDrillEvents,
  loadDrillQuestions,
  loadQuestionRefs,
  type DrillQuestion,
  type DrillVerdict,
} from "./query";

/** The surface tag on every activity row the drill writes.
 *
 *  Absent means the mock grader, which is where `answer_wrong` has come from
 *  since migration 0052 — the same "absent is the original surface" convention
 *  0107 set for `question_practiced`. Without it, a miss recorded in a drill
 *  would be indistinguishable in /dashboard/pmf from a miss in a real timed
 *  paper, and those two facts do not mean the same thing. */
export const DRILL_SURFACE = "drill";

export type OwnDrill = {
  questions: DrillQuestion[];
  /** Everything currently due, not just the five served — what the entry
   *  screen counts so the student can see the pool shrink. */
  dueTotal: number;
};

/**
 * Build this student's next drill, or an empty one when nothing is due.
 *
 * The two-phase shape is deliberate and mirrors `queryQuestions`: resolve the
 * ORDER over a narrow payload first (ids + taxonomy for the whole due pool),
 * then fetch the wide rows for the five that survive. The pool runs to several
 * hundred questions for an active student and only five are ever rendered.
 */
export async function getOwnDrill(now: Date = new Date()): Promise<OwnDrill | null> {
  const db = createSupabaseServerClient();
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) return null;

  const events = await loadDrillEvents(db, user.id);
  const due = dueQuestions(events, now);
  if (due.length === 0) return { questions: [], dueTotal: 0 };

  // Taxonomy for the whole pool: it is what the interleaver groups on, AND the
  // eligibility filter (a question that no longer resolves is dropped).
  const refs = await loadQuestionRefs(db, due.map((d) => d.questionId));
  const drillable: DueQuestion[] = attachRefs(due, refs);

  const picked = selectDrill(drillable, DRILL_SIZE);
  const questions = await loadDrillQuestions(db, picked.map((p) => p.questionId));

  return { questions, dueTotal: drillable.length };
}

export type AnswerOutcome = DrillVerdict & { recorded: boolean };

/**
 * Grade one answer and record it.
 *
 * THE RECORD IS THE POINT, and its failure mode is deliberately conservative.
 * `logActivity` is best-effort and swallows its error, which would normally be
 * a poor fit for a write that decides whether a question is ever served again —
 * except that the direction it fails in is the safe one. A lost `answer_correct`
 * leaves the question DUE, so the student sees it again; there is no way for a
 * dropped write to retire a question the student has not actually fixed. Extra
 * practice is the failure, and that is not a failure worth blocking an answer
 * for.
 */
export async function recordDrillAnswer(
  questionId: string,
  chosenLabel: string
): Promise<AnswerOutcome | null> {
  const db = createSupabaseServerClient();
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) return null;

  const verdict = await gradeDrillAnswer(db, questionId, chosenLabel);
  if (!verdict) return null;

  await logActivity(db, user.id, {
    kind: verdict.correct ? "answer_correct" : "answer_wrong",
    refId: questionId,
    refKind: "question",
    metadata: { surface: DRILL_SURFACE, chose: chosenLabel.toUpperCase() },
  });

  return { ...verdict, recorded: true };
}

/**
 * Record a finished drill.
 *
 * SEPARATE from the per-answer rows because it answers a different question:
 * those are telemetry about questions, this is the FEATURE event
 * /dashboard/pmf counts adoption and retention lift on (`drill_completed` has
 * carried the label "Weak-area drills" since 0103 with nothing ever emitting
 * it).
 *
 * IT DELIBERATELY CARRIES NO SCORE. The obvious metadata — answered, correct —
 * could only come from the client's own tally, and the browser has no authority
 * over what it got right; a number that is merely asserted has no business in
 * an append-only record next to numbers that were graded. Every verdict is
 * already an `answer_correct` / `answer_wrong` row written by the server at the
 * moment it graded, so a drill's score is DERIVABLE from the log rather than
 * restated in it — the same rule question_item_stats follows about never
 * storing a pooled number it can compute at read time.
 */
export async function recordDrillCompleted(questionIds: readonly string[]): Promise<void> {
  const db = createSupabaseServerClient();
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) return;

  await logActivity(db, user.id, {
    kind: "drill_completed",
    refKind: "drill",
    // `size` is a shape, not a claim about performance: it says how long the
    // rep was, which is the one thing the answer rows cannot say on their own
    // if the student abandoned it half way.
    metadata: { surface: DRILL_SURFACE, size: questionIds.length },
  });
}
