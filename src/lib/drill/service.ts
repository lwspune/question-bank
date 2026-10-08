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
import { fixedCount, questionState, scopeToAttempt, selectDrill, DRILL_SIZE, type DueQuestion } from "./select";
import { answerProgress, type AnswerProgress } from "./progress";
import { awardAnsweredMilestone } from "@/lib/celebrate/service";
import { crowdTiers } from "@/lib/celebrate/crowdService";
import type { CrowdTier } from "@/lib/celebrate/crowd";
import { getPremiumLimits } from "@/lib/billing/premiumLimits";
import { istDayStartIso } from "@/lib/email/dueNudge";
import { canAnswerDrillQuestion, drillAllowance, servedCount, type DrillAllowance, type DrillAllowanceInput } from "./allowance";
import {
  gradeDrillAnswer,
  hasPriorWrong,
  loadDrillAnsweredToday,
  loadDrillEvents,
  loadDrillQuestions,
  loadQuestionEvents,
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
  /** Today's free allowance (2026-10-05): "open" with a pass or the limit off. */
  allowance: DrillAllowance;
};

/** The inputs to the free daily allowance. A failed read is "no limit": a
 *  student is never walled by our own error. */
async function readDrillAllowanceInput(
  db: ReturnType<typeof createSupabaseServerClient>,
  userId: string,
  now: Date
): Promise<DrillAllowanceInput> {
  // Both reads at once: the server is a long way from the database, so a read
  // that waits for another costs a full round trip. Today's answers are read
  // even when no limit applies; a small own-row read is cheaper than the wait.
  const [limits, today] = await Promise.all([
    getPremiumLimits(db),
    loadDrillAnsweredToday(db, userId, istDayStartIso(now)).then(
      (rows) => ({ ok: true as const, rows }),
      (e: unknown) => ({ ok: false as const, e })
    ),
  ]);
  if (!limits || limits.hasPass || limits.drillPerDay === null) {
    return { limit: null, hasPass: limits?.hasPass ?? false, answeredToday: [] };
  }
  if (!today.ok) {
    console.error("drill allowance read failed", today.e);
    return { limit: null, hasPass: false, answeredToday: [] };
  }
  return { limit: limits.drillPerDay, hasPass: false, answeredToday: today.rows };
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

  const [pool, allowanceInput] = await Promise.all([
    loadOwnPool(db, user.id, now),
    readDrillAllowanceInput(db, user.id, now),
  ]);
  const allowance = drillAllowance(allowanceInput);
  // Today's free questions decide the set size: five, or what is left.
  const size = servedCount(allowance, DRILL_SIZE);
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

  if (size === 0) return { questions: [], fresh: 0, dueTotal: drillable.length, scope, allowance };

  const picked = selectDrill(drillable, size);

  // THE FILL (B2). An unscoped drill short of five is topped up with unseen
  // PYQs: from the subtopics this student has got wrong most often, then from
  // their target exam. A scoped drill ("fix these from this paper") is not
  // filled — it promised that paper's mistakes and nothing else.
  let fresh: string[] = [];
  if (!scope && picked.length < size) {
    const { targetExams } = await getOnboardingState(db, user.id);
    const slug = primaryExam(sanitizeTargetExams(targetExams));
    const examId = slug ? ((await getExamIdMap())[slug] ?? null) : null;
    fresh = await fillUnseen(db, user.id, pool.events, size - picked.length, examId);
  }

  const set = composeDailySet(picked, fresh, size);
  if (set.length === 0) return { questions: [], fresh: 0, dueTotal: drillable.length, scope, allowance };

  const loaded = await loadDrillQuestions(db, set.map((s) => s.questionId));
  const origin = new Map(set.map((s) => [s.questionId, s.origin]));
  const questions: ServedQuestion[] = loaded.map((q) => ({ ...q, isNew: origin.get(q.id) === "new" }));

  return {
    questions,
    fresh: questions.filter((q) => q.isNew).length,
    dueTotal: drillable.length,
    scope,
    allowance,
  };
}

/** The free daily allowance is used up; the route answers 402. */
export type DrillLimitReached = { limitReached: true; limit: number };

/** The rate limit refused the answer; the route answers 429. Nothing was written. */
export type DrillRateLimited = { rateLimited: true };

export type AnswerOutcome = DrillVerdict & {
  recorded: boolean;
  /** What this answer did to the question (lib/drill/progress). */
  progress: AnswerProgress;
  /** Questions fixed in all, set only when THIS answer fixed one. */
  fixedTotal: number | null;
  /** An "N answered" milestone this answer newly reached, else null. */
  milestone: number | null;
  /** "Beat the crowd" tier for a right answer on a checked question, else null. */
  crowd: CrowdTier | null;
};

/** The ladder total, alongside the due pool, for the pulse (2026-10-04). Same
 *  read, same fold, so "Fixed" and the due count cannot disagree. */
export async function getOwnLadder(
  db: ReturnType<typeof createSupabaseServerClient>,
  userId: string,
  now: Date = new Date()
): Promise<{ due: DueQuestion[]; fixed: number }> {
  const pool = await loadOwnPool(db, userId, now);
  return { due: pool.drillable, fixed: fixedCount(pool.events, now) };
}

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
  userId: string,
  questionId: string,
  chosenLabel: string,
  opts: { allowed?: Promise<boolean> } = {}
): Promise<AnswerOutcome | DrillLimitReached | DrillRateLimited | null> {
  const db = createSupabaseServerClient();
  const now = new Date();

  // ROUND 1, every read that needs no other read, at once (2026-10-07). The
  // server runs in Washington and the database in Mumbai, so each read that
  // waits for another costs a full round trip: measured that night at ~650 ms,
  // with eight of them in a row, so a tap took ~5 s to show its verdict.
  // `allowed` is the route's rate-limit check, started before this was called:
  // it is awaited here, with the reads, and nothing is written until it says yes.
  // "Missed before?" matters only for a right answer, but a wrong one waiting
  // for it would cost a round, so it is asked every time. Its failure is held
  // until it is needed, so it can never break a wrong answer.
  const [allowed, allowanceInput, verdict, priorWrong] = await Promise.all([
    opts.allowed ?? Promise.resolve(true),
    // Today's free allowance, checked BEFORE the verdict leaves the server:
    // the key first reaches the browser in this answer's reply, so refusing
    // here is a real limit.
    readDrillAllowanceInput(db, userId, now),
    gradeDrillAnswer(db, questionId, chosenLabel),
    hasPriorWrong(db, userId, questionId).then(
      (yes) => ({ ok: true as const, yes }),
      (e: unknown) => ({ ok: false as const, e })
    ),
  ]);
  if (!allowed) return { rateLimited: true };
  if (!canAnswerDrillQuestion(allowanceInput, questionId)) {
    return { limitReached: true, limit: allowanceInput.limit ?? 0 };
  }
  if (!verdict) return null;

  // A correct answer is a RECOVERY only if they had got it wrong before — that
  // is what `answer_correct` means (lib/mocks/correctEvents.ts), and one of
  // them fixes the question. A NEW question (the B2 fill) answered
  // right is plain practice: recorded as `question_practiced` so it joins the
  // seen set and never returns as new, without pretending to be a recovery.
  // A wrong answer enters the ladder either way.
  let kind: "answer_wrong" | "answer_correct" | "question_practiced" = "answer_wrong";
  if (verdict.correct) {
    if (!priorWrong.ok) throw priorWrong.e;
    kind = priorWrong.yes ? "answer_correct" : "question_practiced";
  }

  // ROUND 2, the write.
  await logActivity(db, userId, {
    kind,
    refId: questionId,
    refKind: "question",
    metadata: { surface: DRILL_SURFACE, chose: chosenLabel.toUpperCase(), ...(kind === "question_practiced" ? { correct: true } : {}) },
  });

  // ROUND 3, everything that reads the log after the write, at once. The
  // milestone counts THIS answer, so it cannot move before the write.
  const [readBack, milestone, tiers] = await Promise.all([
    readProgress(db, userId, questionId, kind, verdict.correct, now),
    awardAnsweredMilestone(db, userId),
    verdict.correct ? crowdTiers([questionId]) : Promise.resolve(new Map<string, CrowdTier>()),
  ]);

  return { ...verdict, recorded: true, ...readBack, milestone, crowd: tiers.get(questionId) ?? null };
}

/**
 * What the answer did, read back from the log the write just joined. If that
 * write was lost the read still sees the miss, so the student is told "right"
 * rather than "fixed" — the same safe direction as the rule.
 */
async function readProgress(
  db: ReturnType<typeof createSupabaseServerClient>,
  userId: string,
  questionId: string,
  kind: "answer_wrong" | "answer_correct" | "question_practiced",
  correct: boolean,
  now: Date
): Promise<{ progress: AnswerProgress; fixedTotal: number | null }> {
  let progress: AnswerProgress = correct ? "right" : "wrong";
  let fixedTotal: number | null = null;
  if (kind !== "answer_correct") return { progress, fixedTotal };
  try {
    const events = await loadQuestionEvents(db, userId, questionId);
    progress = answerProgress({ correct: true, stateAfter: questionState(events, now) });
    if (progress === "fixed") fixedTotal = fixedCount(await loadDrillEvents(db, userId), now);
  } catch (e) {
    console.error("drill progress read failed", e);
  }
  return { progress, fixedTotal };
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
