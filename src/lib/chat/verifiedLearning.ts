/**
 * Verified learning, a week at a time (V_LEARNING_LOOP.md step 1, 2026-11-10).
 *
 * A NEED is a moment a student showed they had something to learn: a graded
 * miss, or an Ask V explanation of a question. It is VERIFIED when the same
 * student gets a DIFFERENT question in the same subtopic right within 7 days.
 * A different question, because getting the same one right a minute later
 * mostly shows they remember its answer.
 *
 * A verified need does not prove the explanation taught it: the student may
 * have known that question already. So the report also sets each student's
 * accuracy in the subtopic in the 30 days before the WEEK beside their accuracy
 * in the 7 days after their first need of the week.
 *
 * Which records are graded answers (answerFromActivity) is decided here, once,
 * because the events overlap: a bank miss writes both a question_practiced
 * verdict and an answer_wrong ladder row, and a mock miss writes an answer_wrong
 * row while the answer itself lives in attempt_answers.
 *
 * Pure. Spec: tests/verified-learning.test.ts. CLI: scripts/chat/verified-learning.ts.
 */

const DAY_MS = 86_400_000;
/** How long after a need a right answer still verifies it. */
export const VERIFY_WINDOW_MS = 7 * DAY_MS;
/** How far back the before-accuracy looks. */
export const BEFORE_WINDOW_MS = 30 * DAY_MS;
/** India is UTC+5:30 with no daylight saving. */
const IST_OFFSET_MS = 330 * 60_000;

export type LoopNeed = { userId: string; questionId: string; subtopicId: string; at: number };
export type LoopAnswer = LoopNeed & { correct: boolean };

type ActivityRow = { kind: string; metadata: Record<string, unknown> | null };

const isSelfMark = (m: Record<string, unknown>) => "selfMark" in m;

/**
 * The graded answer a user_activity row records, or null when it records none
 * (or one read from another row).
 * - question_practiced with a verdict: bank, board, guide, daily, V's try card,
 *   and a drill question answered right for the first time.
 * - answer_wrong / answer_correct from the drill with a pick: the drill writes
 *   these INSTEAD of a verdict row.
 * Self-marked answers are left out: nobody checked them. Bank and mock ladder
 * rows are left out: their answer is the verdict row or attempt_answers.
 */
export function answerFromActivity(row: ActivityRow): { correct: boolean } | null {
  const m = row.metadata ?? {};
  if (isSelfMark(m)) return null;
  if (row.kind === "question_practiced") return typeof m.correct === "boolean" ? { correct: m.correct } : null;
  if ((row.kind === "answer_wrong" || row.kind === "answer_correct") && m.surface === "drill" && typeof m.chose === "string") {
    return { correct: row.kind === "answer_correct" };
  }
  return null;
}

/** A graded miss from any surface (mocks write no surface). Review later is a self-mark, not a miss. */
export function needFromActivity(row: ActivityRow): boolean {
  return row.kind === "answer_wrong" && !isSelfMark(row.metadata ?? {});
}

/** A mock pick graded against the question's correct labels; null when there is nothing to grade. */
export function mockAnswer(chose: string | null, correctLabels: readonly string[]): boolean | null {
  if (!chose || correctLabels.length === 0) return null;
  return correctLabels.includes(chose);
}

const istDay = (at: number) => Math.floor((at + IST_OFFSET_MS) / DAY_MS);

/** One need per student, question and India day: a repeat tap or a re-miss that day is the same need. */
function dedupeNeeds(needs: readonly LoopNeed[]): LoopNeed[] {
  const first = new Map<string, LoopNeed>();
  for (const n of needs) {
    const key = `${n.userId}|${n.questionId}|${istDay(n.at)}`;
    const seen = first.get(key);
    if (!seen || n.at < seen.at) first.set(key, n);
  }
  return [...first.values()];
}

export type BeforeAfter = { pairs: number; beforeRight: number; beforeTotal: number; afterRight: number; afterTotal: number };

export type VerifiedLearningWeek = {
  needs: number;
  students: number;
  verifiedNeeds: number;
  verifiedStudents: number;
  /** Right answers can still arrive for this week's last needs. */
  stillOpen: boolean;
  beforeAfter: BeforeAfter;
};

/** The week [from, to): needs inside it, answers from any time that can verify them. */
export function verifiedLearning(
  allNeeds: readonly LoopNeed[],
  answers: readonly LoopAnswer[],
  window: { from: number; to: number; now: number }
): VerifiedLearningWeek {
  const needs = dedupeNeeds(allNeeds.filter((n) => n.at >= window.from && n.at < window.to));

  const byPair = new Map<string, LoopAnswer[]>();
  for (const a of answers) {
    const key = `${a.userId}|${a.subtopicId}`;
    const list = byPair.get(key);
    if (list) list.push(a);
    else byPair.set(key, [a]);
  }

  const students = new Set<string>();
  const verifiedStudents = new Set<string>();
  let verifiedNeeds = 0;
  const firstNeed = new Map<string, LoopNeed>();
  for (const n of needs) {
    students.add(n.userId);
    const pair = `${n.userId}|${n.subtopicId}`;
    const list = byPair.get(pair) ?? [];
    if (list.some((a) => a.correct && a.questionId !== n.questionId && a.at > n.at && a.at <= n.at + VERIFY_WINDOW_MS)) {
      verifiedNeeds += 1;
      verifiedStudents.add(n.userId);
    }
    const seen = firstNeed.get(pair);
    if (!seen || n.at < seen.at) firstNeed.set(pair, n);
  }

  const beforeAfter: BeforeAfter = { pairs: 0, beforeRight: 0, beforeTotal: 0, afterRight: 0, afterTotal: 0 };
  for (const [pair, n] of firstNeed) {
    const others = (byPair.get(pair) ?? []).filter((a) => a.questionId !== n.questionId);
    // Before the WEEK, not before the need: the first miss of a week comes after
    // that week's right answers only (an earlier wrong one would be the first
    // need), so counting them read 91% "before" against 68% after on real data.
    const before = others.filter((a) => a.at < window.from && a.at >= window.from - BEFORE_WINDOW_MS);
    const after = others.filter((a) => a.at > n.at && a.at <= n.at + VERIFY_WINDOW_MS);
    if (before.length === 0 || after.length === 0) continue;
    beforeAfter.pairs += 1;
    beforeAfter.beforeTotal += before.length;
    beforeAfter.beforeRight += before.filter((a) => a.correct).length;
    beforeAfter.afterTotal += after.length;
    beforeAfter.afterRight += after.filter((a) => a.correct).length;
  }

  return {
    needs: needs.length,
    students: students.size,
    verifiedNeeds,
    verifiedStudents: verifiedStudents.size,
    stillOpen: window.to + VERIFY_WINDOW_MS > window.now,
    beforeAfter,
  };
}

/** A try card linked to the explanation it followed (v_followups, migration 0250). */
export type FollowUpLink = { userId: string; followUpId: string; free: boolean; at: number };

export type FollowUpWeek = { followUps: number; free: number; answeredRight: number; students: number };

/** The answer is written in the same request as its link, so it lands just after it (a minute's slack). */
const LINK_SLACK_MS = 60_000;

/**
 * The week's follow-ups (V_LEARNING_LOOP.md step 2): how many explanations led
 * to an answered follow-up, how many were free, and how many were right. A
 * right follow-up is a verified need by construction: a different question in
 * the same subtopic, after the explanation.
 */
export function followUpWeek(
  links: readonly FollowUpLink[],
  answers: readonly LoopAnswer[],
  window: { from: number; to: number }
): FollowUpWeek {
  const inWeek = links.filter((l) => l.at >= window.from && l.at < window.to);
  const right = inWeek.filter((l) =>
    answers.some((a) => a.correct && a.userId === l.userId && a.questionId === l.followUpId && a.at >= l.at - LINK_SLACK_MS && a.at <= l.at + DAY_MS)
  );
  return {
    followUps: inWeek.length,
    free: inWeek.filter((l) => l.free).length,
    answeredRight: right.length,
    students: new Set(inWeek.map((l) => l.userId)).size,
  };
}
