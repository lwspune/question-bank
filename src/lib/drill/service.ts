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
import { regradeAttempt, MockError } from "@/lib/mocks/service";
import { getOnboardingState } from "@/lib/profile/service";
import { primaryExam, sanitizeTargetExams } from "@/lib/profile/onboarding";
import { getExamIdMap } from "@/lib/exam/examIdMap";
import { composeDailySet, fillUnseen, loadOwnPool } from "./compose";
import { scopeToAttempt, selectDrill, DRILL_SIZE, type DueQuestion } from "./select";
import {
  gradeDrillAnswer,
  hasPriorWrong,
  loadDrillQuestions,
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

/** A served question, flagged when it is NEW to this student (the daily-set
 *  fill, ENGAGEMENT_SPEC.md B2) rather than one they got wrong before. */
export type ServedQuestion = DrillQuestion & { isNew: boolean };

export type OwnDrill = {
  questions: ServedQuestion[];
  /** How many of the served questions are new, not due. */
  fresh: number;
  /** Everything currently due, not just the five served — what the entry
   *  screen counts so the student can see the pool shrink. */
  dueTotal: number;
  /** Set when the drill was scoped to one attempt ("Fix these mistakes" from a
   *  result page): the paper's name for the header, and its due count. */
  scope: { attemptId: string; mockTitle: string; mockSlug: string } | null;
};

/** The drillable pool alone — what `/api/me/pulse` counts. See compose.ts. */
export async function getOwnDuePool(
  db: ReturnType<typeof createSupabaseServerClient>,
  userId: string,
  now: Date = new Date()
): Promise<DueQuestion[]> {
  return (await loadOwnPool(db, userId, now)).drillable;
}

export async function getOwnDrill(
  opts: { attemptId?: string | null; now?: Date } = {}
): Promise<OwnDrill | null> {
  const now = opts.now ?? new Date();
  const db = createSupabaseServerClient();
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) return null;

  const pool = await loadOwnPool(db, user.id, now);
  let drillable = pool.drillable;
  let scope: OwnDrill["scope"] = null;

  // "Fix these mistakes" from a result page: NARROW the pool to that attempt's
  // wrong answers. Narrow only — a question fixed since stays out (see
  // scopeToAttempt). An attempt that is not this student's, or does not exist,
  // degrades to the general drill rather than 404ing a page whose only job is
  // to serve practice.
  if (opts.attemptId) {
    try {
      const graded = await regradeAttempt(db, user.id, opts.attemptId);
      const wrong = new Set(
        Object.entries(graded.verdicts)
          .filter(([, v]) => v === -1)
          .map(([id]) => id)
      );
      drillable = scopeToAttempt(drillable, wrong);
      scope = { attemptId: opts.attemptId, mockTitle: graded.mock.title, mockSlug: graded.mock.slug };
    } catch (e) {
      if (!(e instanceof MockError)) throw e;
    }
  }

  const picked = selectDrill(drillable, DRILL_SIZE);

  // THE FILL (B2). An unscoped drill short of five is topped up with unseen
  // PYQs: from the subtopics this student has got wrong most often, then from
  // their target exam. A scoped drill ("fix these from this paper") is not
  // filled — it promised that paper's mistakes and nothing else.
  let fresh: string[] = [];
  if (!scope && picked.length < DRILL_SIZE) {
    const { targetExams } = await getOnboardingState(db, user.id);
    const slug = primaryExam(sanitizeTargetExams(targetExams));
    const examId = slug ? ((await getExamIdMap())[slug] ?? null) : null;
    fresh = await fillUnseen(db, user.id, pool.events, DRILL_SIZE - picked.length, examId);
  }

  const set = composeDailySet(picked, fresh, DRILL_SIZE);
  if (set.length === 0) return { questions: [], fresh: 0, dueTotal: drillable.length, scope };

  const loaded = await loadDrillQuestions(db, set.map((s) => s.questionId));
  const origin = new Map(set.map((s) => [s.questionId, s.origin]));
  const questions: ServedQuestion[] = loaded.map((q) => ({ ...q, isNew: origin.get(q.id) === "new" }));

  return { questions, fresh: questions.filter((q) => q.isNew).length, dueTotal: drillable.length, scope };
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

  // A correct answer is a RECOVERY only if they had got it wrong before — that
  // is what `answer_correct` means (lib/mocks/correctEvents.ts), and the
  // ladder retires on two of them. A NEW question (the B2 fill) answered
  // right is plain practice: recorded as `question_practiced` so it joins the
  // seen set and never returns as new, without pretending to be a recovery.
  // A wrong answer enters the ladder either way.
  const kind = !verdict.correct
    ? "answer_wrong"
    : (await hasPriorWrong(db, user.id, questionId))
      ? "answer_correct"
      : "question_practiced";
  await logActivity(db, user.id, {
    kind,
    refId: questionId,
    refKind: "question",
    metadata: { surface: DRILL_SURFACE, chose: chosenLabel.toUpperCase(), ...(kind === "question_practiced" ? { correct: true } : {}) },
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
