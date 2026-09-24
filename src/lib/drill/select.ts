/**
 * The weak-area drill's pure core — which of a student's own past mistakes are
 * due for another look, and which five they get.
 *
 * WHY THIS EXISTS AT ALL. `user_activity` has held `answer_wrong` since
 * migration 0052 and had accumulated 10,401 rows over 132 students — an average
 * of 79 recorded mistakes each — with no student-facing reader anywhere. The
 * spine was built so a mechanic could be added without re-deriving behaviour
 * from scattered tables; this is the first one to take it up.
 *
 * NO NEW TABLE, AND THAT IS THE DESIGN RATHER THAN A SHORTCUT. Everything below
 * is a fold over the append-only log: a question's whole history is its ordered
 * wrong/correct events, so "what is still broken" is derived, never stored. A
 * `drill_state` column would be a second copy of that answer, free to disagree
 * with the events that produced it — and the events are the record.
 *
 * Pure: no DB, no clock of its own (`now` is injected), no React.
 * Spec: tests/drill-select.test.ts.
 */

/**
 * How many correct answers retire a question, and how long the first one buys.
 *
 * The user's call, and the reasoning is the guessing floor: a four-option MCQ
 * answered right once, a day after getting it wrong, is weak evidence of
 * durable recall — one in four students who have learned nothing would manage
 * it. So the first correct answer puts the question to SLEEP rather than fixing
 * it, and the second, on the far side of a gap, retires it. That gap is the
 * spaced-repetition principle the engagement gate names; without it the drill
 * would be re-testing this morning's answers.
 */
export const CORRECTS_TO_RETIRE = 2;
export const COOL_DOWN_DAYS = 10;

/**
 * Five, not ten or twenty. The audience is mobile-first and studies in gaps
 * between classes; the median student has 41 questions banked, so a short rep
 * they finish beats a long one they abandon.
 */
export const DRILL_SIZE = 5;

const DAY_MS = 86_400_000;

/** Chapter and subtopic joined as a PAIR — a subtopic name is unique only
 *  within its chapter, the same reason performance/links.ts keys this way. */
const groupKey = (chapter: string, subtopic: string) => `${chapter}||${subtopic}`;

/** One recorded answer to one question. Order does not matter — the fold sorts. */
export type DrillEvent = {
  questionId: string;
  /** True for `answer_correct`, false for `answer_wrong`. */
  correct: boolean;
  /** ISO timestamp (the activity row's created_at). */
  at: string;
};

export type QuestionState =
  /** Missed, and not yet answered right since — or awake again after cooling. */
  | "due"
  /** Answered right once; resting until the cooling period is up. */
  | "cooling"
  /** Answered right CORRECTS_TO_RETIRE times in a row since the last miss. */
  | "retired"
  /** Never missed, so it never entered the pool. */
  | "never-missed";

/** A due question with the taxonomy the interleaver needs. */
export type DueQuestion = {
  questionId: string;
  chapter: string;
  subtopic: string;
  /** When they last got it wrong — the ranking key, oldest first. */
  lastWrongAt: string;
};

function chronological(events: readonly DrillEvent[]): DrillEvent[] {
  // Copied before sorting: the caller's array is not ours to reorder, and a
  // fold that depends on how its input happened to arrive breaks the first time
  // a query is paginated.
  return [...events].sort((a, b) => (a.at < b.at ? -1 : a.at > b.at ? 1 : 0));
}

type Fold = { streak: number; lastWrongAt: string | null; lastCorrectAt: string | null };

function fold(events: readonly DrillEvent[]): Fold {
  let streak = 0;
  let lastWrongAt: string | null = null;
  let lastCorrectAt: string | null = null;
  for (const e of chronological(events)) {
    if (e.correct) {
      streak += 1;
      lastCorrectAt = e.at;
    } else {
      // A miss resets the ladder to the bottom, including from `retired`: they
      // have just shown they do not have it, so one correct answer afterwards
      // must not restore the status two correct answers earned.
      streak = 0;
      lastWrongAt = e.at;
    }
  }
  return { streak, lastWrongAt, lastCorrectAt };
}

/** Where one question stands, given everything recorded about it. */
export function questionState(events: readonly DrillEvent[], now: Date): QuestionState {
  const { streak, lastWrongAt, lastCorrectAt } = fold(events);
  // The pool is defined by a MISS, not by presence in the log.
  if (lastWrongAt === null) return "never-missed";
  if (streak >= CORRECTS_TO_RETIRE) return "retired";
  if (streak === 0) return "due";
  const wakesAt = new Date(lastCorrectAt!).getTime() + COOL_DOWN_DAYS * DAY_MS;
  return now.getTime() >= wakesAt ? "due" : "cooling";
}

/** Taxonomy for a question, supplied by the read layer. `subtopicId` feeds
 *  the daily-set fill (fill.ts); optional so the pure spec fixtures stay small. */
export type QuestionRef = { chapter: string; subtopic: string; subtopicId?: string | null };

/**
 * Every question currently due, oldest miss first.
 *
 * `refs` is optional so the state machine can be exercised without taxonomy; a
 * question with no ref falls back to empty strings, which the interleaver then
 * treats as one group rather than silently merging unrelated topics.
 */
export function dueQuestions(
  events: readonly DrillEvent[],
  now: Date,
  refs: ReadonlyMap<string, QuestionRef> = new Map()
): DueQuestion[] {
  const byQuestion = new Map<string, DrillEvent[]>();
  for (const e of events) {
    const list = byQuestion.get(e.questionId);
    if (list) list.push(e);
    else byQuestion.set(e.questionId, [e]);
  }

  const out: DueQuestion[] = [];
  for (const [questionId, list] of byQuestion) {
    if (questionState(list, now) !== "due") continue;
    const ref = refs.get(questionId);
    out.push({
      questionId,
      chapter: ref?.chapter ?? "",
      subtopic: ref?.subtopic ?? "",
      lastWrongAt: fold(list).lastWrongAt!,
    });
  }
  return out.sort(byAgeThenId);
}

function byAgeThenId(a: DueQuestion, b: DueQuestion): number {
  if (a.lastWrongAt !== b.lastWrongAt) return a.lastWrongAt < b.lastWrongAt ? -1 : 1;
  return a.questionId < b.questionId ? -1 : a.questionId > b.questionId ? 1 : 0;
}

/**
 * Take one item from each group in turn, until every group is exhausted.
 *
 * The whole interleaver, used at BOTH levels — chapters, and the subtopics
 * inside a chapter. Groups are consumed in the order given, so the caller's
 * sort is what expresses priority and this stays a shape with no policy in it.
 */
function roundRobin<T>(groups: readonly (readonly T[])[]): T[] {
  const out: T[] = [];
  for (let round = 0; ; round++) {
    let took = false;
    for (const g of groups) {
      const item = g[round];
      if (item === undefined) continue;
      out.push(item);
      took = true;
    }
    if (!took) return out;
  }
}

/** Biggest group first — the deliberate-practice bias, because the group
 *  holding most of a student's mistakes is the one costing them most. Ties
 *  break on the name so the same pool always yields the same drill. */
function byWeightThenName<T>(
  a: { items: readonly T[]; name: string },
  b: { items: readonly T[]; name: string }
): number {
  return b.items.length - a.items.length || (a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
}

/**
 * Pick one drill from the due pool, INTERLEAVED — across chapters first, and
 * across subtopics within a chapter's turn.
 *
 * WHY TWO LEVELS, when one looked right. Grouping on the (chapter, subtopic)
 * PAIR is how the rest of this repo keys a subtopic, since a subtopic name is
 * unique only within its chapter — but as the single rotation axis it lets one
 * chapter with several weak subtopics win the rotation over and over. Found on
 * live data (`drill:smoke`, 2026-09-18): a student drew three of five from
 * Grammar. Five distinct subtopics, and unmistakably blocked practice.
 *
 * So the outer rotation is the CHAPTER and the inner one is the subtopic. A
 * chapter that comes round twice contributes two DIFFERENT subtopics, and
 * within a subtopic the oldest miss goes first. Interleaved practice beats
 * blocked for transfer (Roediger / Bjork) — the same reason the /notes mastery
 * checkpoint interleaves across concepts rather than grouping by them.
 *
 * Spread is a preference, never a refusal: a student whose whole due pool sits
 * in one chapter still gets a full drill from it.
 */
export function selectDrill(pool: readonly DueQuestion[], size = DRILL_SIZE): DueQuestion[] {
  if (pool.length === 0) return [];

  const bySubtopic = new Map<string, DueQuestion[]>();
  for (const q of pool) {
    const key = groupKey(q.chapter, q.subtopic);
    const list = bySubtopic.get(key);
    if (list) list.push(q);
    else bySubtopic.set(key, [q]);
  }

  const byChapter = new Map<string, { items: DueQuestion[]; name: string }[]>();
  for (const questions of bySubtopic.values()) {
    const { chapter, subtopic } = questions[0];
    const block = { items: [...questions].sort(byAgeThenId), name: subtopic };
    const list = byChapter.get(chapter);
    if (list) list.push(block);
    else byChapter.set(chapter, [block]);
  }

  const chapterQueues = [...byChapter.entries()]
    .map(([chapter, blocks]) => ({
      name: chapter,
      items: roundRobin([...blocks].sort(byWeightThenName).map((b) => b.items)),
    }))
    .sort(byWeightThenName);

  return roundRobin(chapterQueues.map((c) => c.items)).slice(0, size);
}

/**
 * Join the due pool to the taxonomy the read layer could resolve, DROPPING
 * anything it could not.
 *
 * Absence is the eligibility gate, and it has to be, because `user_activity` is
 * append-only: a question the student missed in July stays in the log forever
 * even after it is flipped PRIVATE, deleted, or rewritten as subjective. The
 * loader returns only rows that are still PUBLIC MCQs, so a question missing
 * from `refs` is precisely one the drill could not grade — serving it would
 * mean showing a question whose verdict has nowhere to come from.
 */
export function attachRefs(
  due: readonly DueQuestion[],
  refs: ReadonlyMap<string, QuestionRef>
): DueQuestion[] {
  const out: DueQuestion[] = [];
  for (const q of due) {
    const ref = refs.get(q.questionId);
    if (!ref) continue;
    out.push({ ...q, chapter: ref.chapter, subtopic: ref.subtopic });
  }
  return out;
}

/**
 * Narrow the due pool to the questions the student got wrong in ONE attempt —
 * the "Fix these mistakes" button on a mock result page.
 *
 * NARROWS, NEVER WIDENS. The result page knows which questions were wrong in
 * this sitting, but whether one is still worth serving is the ladder's call:
 * a question fixed since (cooling or retired) stays out even though the
 * attempt lists it. So this is an intersection with the due pool, in the
 * pool's own order, and nothing outside the pool can enter through it.
 */
export function scopeToAttempt(
  due: readonly DueQuestion[],
  wrongInAttempt: ReadonlySet<string>
): DueQuestion[] {
  return due.filter((q) => wrongInAttempt.has(q.questionId));
}
