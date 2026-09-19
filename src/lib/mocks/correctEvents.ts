/**
 * Which CORRECT mock answers are worth recording as `answer_correct`.
 *
 * WHY THIS IS TARGETED RATHER THAN SYMMETRIC. `answer_wrong` fires for every
 * missed question in a graded mock; the obvious mirror would fire for every
 * correct one. Measured on live data before building it, that mirror costs
 * **20,250 rows** (more than doubling `user_activity`) to change the drill pool
 * by **484 questions — 4.7% of the 10,395 ever missed**. The reason the ratio is
 * so poor is that students rarely meet the same question twice: a correct answer
 * to a question never missed cannot remove anything from a pool it was never in.
 *
 * So the rule is: record a correct answer only where the student had ALREADY
 * missed that question. ~700 rows for the same 484-question outcome. What it
 * buys is that a student stops being drilled on something they have since
 * demonstrably fixed — the `questionState` ladder in lib/drill/select.ts can
 * finally be climbed by exam performance and not only inside /drill.
 *
 * THE COST, STATED PLAINLY: `answer_correct` is now CONDITIONAL. A count of it
 * is not "questions answered correctly" and must never be read as one — it is
 * "questions recovered after being missed". lib/pmf/snapshot.ts says so too.
 *
 * Pure: no DB, no clock. Spec: tests/mock-correct-events.test.ts.
 */

/** The fields of a graded question this decision actually depends on. */
export type CorrectEventQuestion = {
  questionId: string;
  sectionKey: string;
  /** A question the paper forgives. See the guard below — this matters. */
  grace?: boolean;
};

export type CorrectEvent = { questionId: string; sectionKey: string };

/**
 * The `answer_correct` events a graded attempt should emit.
 *
 * `verdicts` is `gradeMock`'s own output, read rather than re-derived: deriving
 * right-vs-wrong a second time is how the wrong-answer emitter once became
 * blind to numeric (JEE Section-B) responses.
 */
export function selectAnswerCorrectEvents(
  questions: readonly CorrectEventQuestion[],
  verdicts: Readonly<Record<string, 1 | -1 | 0 | undefined>>,
  previouslyMissed: ReadonlySet<string>
): CorrectEvent[] {
  const out: CorrectEvent[] = [];
  const seen = new Set<string>();

  for (const q of questions) {
    // GRACE IS SCORED AS CORRECT AND MUST NOT BE RECORDED. `verdictFor` returns
    // 1 for a grace question regardless of what the student did — including
    // nothing at all — because the paper itself was defective. Treating that as
    // retrieval practice would climb the drill ladder on an answer that was
    // never given, and two of them would retire the question outright. The
    // wrong-answer emitter skips grace for the mirror-image reason.
    if (q.grace) continue;
    if (verdicts[q.questionId] !== 1) continue;
    // The targeting rule itself.
    if (!previouslyMissed.has(q.questionId)) continue;
    if (seen.has(q.questionId)) continue;
    seen.add(q.questionId);
    out.push({ questionId: q.questionId, sectionKey: q.sectionKey });
  }

  return out;
}

/**
 * The idempotency key for one recorded recovery.
 *
 * Keyed on the ATTEMPT as well as the question because two sittings of the same
 * paper are two separate pieces of evidence, and it is precisely the second one
 * that retires a question. Collapsing them would silently cap every question at
 * one recovery and it could never leave the pool.
 *
 * Both the live emitter and the backfill use this. The existing backfill script
 * keys its rows this way and upserts ON CONFLICT (dedupe_key) DO NOTHING, while
 * live events have historically inserted with a NULL key — so keying only the
 * backfill would double-write for anything graded between the deploy and the
 * backfill run.
 */
export function answerCorrectDedupeKey(attemptId: string, questionId: string): string {
  return `answer_correct:${attemptId}:${questionId}`;
}
