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

/*
 * ONE correct answer after the last miss fixes a question (the user's call,
 * 2026-10-05). Until then the ladder took two, ten days apart, on the guessing
 * floor of a four-option MCQ; the user traded that evidence for a list students
 * can actually clear, because a queue that only grows demotivates. Same-day
 * counts too, decided knowingly: on 2026-10-05, 113 of 521 first right answers
 * came within an hour of the miss. A later miss, anywhere, puts it straight back.
 */

/**
 * Five, not ten or twenty. The audience is mobile-first and studies in gaps
 * between classes; the median student has 41 questions banked, so a short rep
 * they finish beats a long one they abandon.
 */
export const DRILL_SIZE = 5;

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
  /** Missed, and not answered right since. */
  | "due"
  /** Answered right since the last miss: shown to students as "fixed". */
  | "retired"
  /** Never missed, so it never entered the pool. */
  | "never-missed";

/** A due question with the taxonomy the interleaver needs. */
export type DueQuestion = {
  questionId: string;
  chapter: string;
  /** The chapter's id, for a link to it (/me Weak spots). Optional so the
   *  pure spec fixtures and older callers stay small. */
  chapterId?: string | null;
  /** "Mathematics · NDA": the subject and exam a chapter name alone does not
   *  say ("Probability" is in NDA and in MHT-CET). */
  place?: string;
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

type Fold = { rightSinceMiss: boolean; lastWrongAt: string | null };

function fold(events: readonly DrillEvent[]): Fold {
  let rightSinceMiss = false;
  let lastWrongAt: string | null = null;
  for (const e of chronological(events)) {
    if (e.correct) {
      rightSinceMiss = true;
    } else {
      // A miss undoes a fix: they have just shown they do not have it.
      rightSinceMiss = false;
      lastWrongAt = e.at;
    }
  }
  return { rightSinceMiss, lastWrongAt };
}

/**
 * Where one question stands, given everything recorded about it. `now` is
 * unused since the ten-day rest went (2026-10-05) and kept so every caller
 * still states the moment it asks about.
 */
export function questionState(events: readonly DrillEvent[], _now: Date): QuestionState {
  const { rightSinceMiss, lastWrongAt } = fold(events);
  // The pool is defined by a MISS, not by presence in the log.
  if (lastWrongAt === null) return "never-missed";
  return rightSinceMiss ? "retired" : "due";
}

/**
 * How many questions are FIXED: answered right since their last miss
 * (`retired`). The number the pulse shows as "Fixed". Same fold as the due
 * pool, so the two cannot disagree about a question.
 */
export function fixedCount(events: readonly DrillEvent[], now: Date): number {
  const byQuestion = new Map<string, DrillEvent[]>();
  for (const e of events) {
    const list = byQuestion.get(e.questionId);
    if (list) list.push(e);
    else byQuestion.set(e.questionId, [e]);
  }
  let n = 0;
  for (const list of byQuestion.values()) if (questionState(list, now) === "retired") n += 1;
  return n;
}

/** Taxonomy for a question, supplied by the read layer. `subtopicId` feeds
 *  the daily-set fill (fill.ts); optional so the pure spec fixtures stay small. */
export type QuestionRef = {
  chapter: string;
  subtopic: string;
  subtopicId?: string | null;
  chapterId?: string | null;
  place?: string;
  /** The question's exam by name, which decides the site it is drilled on
   *  (lib/sites/siteScope, 2026-11-06). */
  exam?: string;
};

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
    out.push({ ...q, chapter: ref.chapter, chapterId: ref.chapterId ?? null, place: ref.place ?? "", subtopic: ref.subtopic });
  }
  return out;
}

/**
 * Narrow the due pool to the questions the student got wrong in ONE attempt —
 * the "Fix these mistakes" button on a mock result page.
 *
 * NARROWS, NEVER WIDENS. The result page knows which questions were wrong in
 * this sitting, but whether one is still worth serving is the ladder's call:
 * a question fixed since (retired) stays out even though the
 * attempt lists it. So this is an intersection with the due pool, in the
 * pool's own order, and nothing outside the pool can enter through it.
 */
export function scopeToAttempt(
  due: readonly DueQuestion[],
  wrongInAttempt: ReadonlySet<string>
): DueQuestion[] {
  return due.filter((q) => wrongInAttempt.has(q.questionId));
}

/**
 * Narrow the due pool to one chapter: the Fix button beside a chapter in /me's
 * Weak spots (2026-11-06). The same intersection as scopeToAttempt, in the
 * pool's own order.
 */
export function scopeToChapter(due: readonly DueQuestion[], chapterId: string): DueQuestion[] {
  return due.filter((q) => q.chapterId === chapterId);
}

/** One row of /me's Weak spots. */
export type WeakChapter = { chapterId: string; name: string; place: string; due: number };

export const WEAK_CHAPTERS = 3;

/**
 * The chapters where most of the due pool sits, most mistakes first, a tie to
 * the most recent miss. Keyed by chapter ID, never name, so NDA's and
 * MHT-CET's "Probability" stay two rows. A question with no chapter id is left
 * out: there is nothing to link it to. Spec: tests/drill-weak-chapters.test.ts.
 */
export function weakChapters(due: readonly DueQuestion[], limit = WEAK_CHAPTERS): WeakChapter[] {
  const groups = new Map<string, WeakChapter & { last: string }>();
  for (const q of due) {
    if (!q.chapterId) continue;
    const g = groups.get(q.chapterId);
    if (g) {
      g.due += 1;
      if (q.lastWrongAt > g.last) g.last = q.lastWrongAt;
    } else {
      groups.set(q.chapterId, { chapterId: q.chapterId, name: q.chapter, place: q.place ?? "", due: 1, last: q.lastWrongAt });
    }
  }
  return [...groups.values()]
    .sort((a, b) => b.due - a.due || (a.last < b.last ? 1 : a.last > b.last ? -1 : 0))
    .slice(0, limit)
    .map(({ chapterId, name, place, due }) => ({ chapterId, name, place, due }));
}
