/**
 * Today's tasks on the path (MENTOR_SPEC.md §4).
 *
 * 2 to 4 tasks, about the day's minutes:
 *   - the Fix task first when mistakes from path chapters wait (at most 5,
 *     made on an EARLIER day, so each fix is a spaced retrieval, D9);
 *   - then a chapter worked through its parts in order (the sheet, then its
 *     Top 10 while the summary is fresh, then its test), and when it is done
 *     the next chapter from the queue furthest behind its own pace (share of
 *     its minutes done), so the subjects interleave across days. Switching
 *     subject after every 10-minute sheet gave an HSC student four sheets and
 *     no questions on day one (path:smoke, 2026-11-07).
 *   - A deferred chapter is skipped while its queue has another; with nothing
 *     else left it is served anyway.
 *   - The day stops at 80% of its minutes once it holds two tasks, so it does
 *     not overrun by a whole chapter test.
 *
 * The server stores the day's pick (study_path_days) so the card stays the
 * same all day and the free-limit exemptions are read from it; a replan
 * ("Not taught yet") keeps what was already on the card via `keep`.
 *
 * Pure. Spec: tests/path-core.test.ts.
 */
import {
  QUEUE_ORDER,
  NOTHING_DONE,
  chapterDone,
  nextPart,
  partMinutes,
  remainingMinutes,
  totalMinutes,
  type ChapterPart,
  type ChapterState,
  type PathChapter,
  type PathPaper,
} from "./model";

export const MIN_TASKS = 2;
export const MAX_TASKS = 4;
export const FIX_MAX = 5;
export const FIX_MINUTES_PER_QUESTION = 1.5;
/** A day with two tasks stops once it reaches this share of its minutes. */
export const STOP_SHARE = 0.8;

export type PathTask =
  | { kind: ChapterPart; chapterId: string; minutes: number }
  | { kind: "fix"; questionIds: string[]; minutes: number }
  /** The revision weeks (Phase 3): a whole past board paper, timed. */
  | { kind: "paper"; paperId: string; minutes: number }
  /** The revision weeks: a chapter's Review later questions, worked again. */
  | { kind: "revise"; chapterId: string; questionIds: string[]; minutes: number }
  /** The revision weeks, between papers with nothing to rework: a revision sheet read again. */
  | { kind: "reread"; chapterId: string; minutes: number };

/** A chapter's sheet, Top 10 or test: the three parts of "done". */
export type ChapterTask = Extract<PathTask, { kind: ChapterPart }>;

export function isChapterTask(t: PathTask): t is ChapterTask {
  return t.kind === "sheet" || t.kind === "top" || t.kind === "test";
}

/** A paper's progress, read from its questions' records (revision.ts paperWorked). */
export type PaperState = { served: boolean; worked: number; of: number; done: boolean };

const stateOf = (states: ReadonlyMap<string, ChapterState>, id: string) => states.get(id) ?? NOTHING_DONE;

/** The state after a part is done, for picking the next task. */
export function withPartDone(c: PathChapter, s: ChapterState, part: ChapterPart): ChapterState {
  if (part === "sheet") return { ...s, sheet: true };
  if (part === "top") return { ...s, topWorked: c.top.length };
  return { ...s, test: true };
}

export function pickToday(input: {
  chapters: readonly PathChapter[];
  states: ReadonlyMap<string, ChapterState>;
  /** Chapter ids "Not taught yet" today (deferrals.ts). */
  deferred: ReadonlySet<string>;
  /** The day's minutes. */
  budget: number;
  /** Fix question ids (fixQuestions), [] for none. */
  fix: readonly string[];
  /** Tasks already on today's card, kept first on a replan. */
  keep?: readonly PathTask[];
  /** The revision weeks: the chapter with the least left first, not the queue furthest behind. */
  smallestFirst?: boolean;
  /** Fix questions a day: 5, or 10 in the revision weeks. */
  fixMax?: number;
}): PathTask[] {
  const sim = new Map(input.states);
  const tasks: PathTask[] = [];
  let spent = 0;

  const add = (t: PathTask) => {
    tasks.push(t);
    spent += t.minutes;
    if (isChapterTask(t)) {
      const c = input.chapters.find((x) => x.id === t.chapterId);
      if (c) sim.set(c.id, withPartDone(c, stateOf(sim, c.id), t.kind));
    }
  };

  for (const t of input.keep ?? []) add(t);
  if (!tasks.some((t) => t.kind === "fix") && input.fix.length > 0) {
    const ids = input.fix.slice(0, input.fixMax ?? FIX_MAX);
    // The Fix task goes first even on a replan.
    tasks.unshift({ kind: "fix", questionIds: [...ids], minutes: Math.ceil(ids.length * FIX_MINUTES_PER_QUESTION) });
    spent += tasks[0].minutes;
  }

  const queues = [...new Set(input.chapters.map((c) => c.queue))].sort(
    (a, b) => QUEUE_ORDER.indexOf(a) - QUEUE_ORDER.indexOf(b)
  );
  const totals = new Map(
    queues.map((q) => [q, input.chapters.filter((c) => c.queue === q).reduce((s, c) => s + totalMinutes(c), 0)])
  );

  while (tasks.length < MAX_TASKS && !(tasks.length >= MIN_TASKS && spent >= STOP_SHARE * input.budget)) {
    const next =
      continueChapter(tasks, input.chapters, sim, input.deferred) ??
      (input.smallestFirst
        ? smallestCandidate(input.chapters, sim, input.deferred) ?? smallestCandidate(input.chapters, sim, new Set())
        : nextCandidate(input.chapters, sim, input.deferred, queues, totals) ??
          nextCandidate(input.chapters, sim, new Set(), queues, totals));
    if (!next) break;
    add({ kind: next.part, chapterId: next.chapter.id, minutes: partMinutes(next.chapter, stateOf(sim, next.chapter.id), next.part) });
  }
  return tasks;
}

/** The next part of the chapter the day is already on, if it has one. */
function continueChapter(
  tasks: readonly PathTask[],
  chapters: readonly PathChapter[],
  sim: ReadonlyMap<string, ChapterState>,
  deferred: ReadonlySet<string>
): { chapter: PathChapter; part: ChapterPart } | null {
  const last = [...tasks].reverse().find(isChapterTask);
  if (!last || deferred.has(last.chapterId)) return null;
  const chapter = chapters.find((c) => c.id === last.chapterId);
  if (!chapter) return null;
  const part = nextPart(chapter, stateOf(sim, chapter.id));
  return part ? { chapter, part } : null;
}

function nextCandidate(
  chapters: readonly PathChapter[],
  sim: ReadonlyMap<string, ChapterState>,
  deferred: ReadonlySet<string>,
  queues: readonly string[],
  totals: ReadonlyMap<string, number>
): { chapter: PathChapter; part: ChapterPart } | null {
  let best: { chapter: PathChapter; part: ChapterPart; share: number } | null = null;
  for (const q of queues) {
    const inQueue = chapters.filter((c) => c.queue === q).sort((a, b) => a.rank - b.rank);
    const chapter = inQueue.find((c) => !deferred.has(c.id) && !chapterDone(c, stateOf(sim, c.id)));
    if (!chapter) continue;
    const part = nextPart(chapter, stateOf(sim, chapter.id));
    if (!part) continue;
    const total = totals.get(q) ?? 0;
    const left = inQueue.reduce((s, c) => s + remainingMinutes(c, stateOf(sim, c.id)), 0);
    const share = total > 0 ? (total - left) / total : 1;
    // Strictly lower wins, so ties keep QUEUE_ORDER.
    if (!best || share < best.share) best = { chapter, part, share };
  }
  return best && { chapter: best.chapter, part: best.part };
}

/**
 * The chapter with the least work left (the revision weeks: "chapters left
 * come first, smallest first"), ties by subject then book order.
 */
function smallestCandidate(
  chapters: readonly PathChapter[],
  sim: ReadonlyMap<string, ChapterState>,
  deferred: ReadonlySet<string>
): { chapter: PathChapter; part: ChapterPart } | null {
  let best: { chapter: PathChapter; part: ChapterPart; left: number } | null = null;
  for (const c of chapters) {
    if (deferred.has(c.id)) continue;
    const s = stateOf(sim, c.id);
    const part = nextPart(c, s);
    if (!part) continue;
    const left = remainingMinutes(c, s);
    if (
      !best ||
      left < best.left ||
      (left === best.left &&
        (QUEUE_ORDER.indexOf(c.queue) < QUEUE_ORDER.indexOf(best.chapter.queue) ||
          (c.queue === best.chapter.queue && c.rank < best.chapter.rank)))
    ) {
      best = { chapter: c, part, left };
    }
  }
  return best && { chapter: best.chapter, part: best.part };
}

/**
 * Is a task's work recorded? `fixAnswered`: question ids answered or marked
 * today (the Fix and revise tasks); `paperStates`: the revision weeks' papers.
 */
export function taskDone(
  task: PathTask,
  chapters: readonly PathChapter[],
  states: ReadonlyMap<string, ChapterState>,
  fixAnswered: ReadonlySet<string>,
  paperStates: ReadonlyMap<string, PaperState> = new Map(),
  /** Chapters whose revision sheet was opened today (a re-read). */
  sheetsToday: ReadonlySet<string> = new Set()
): boolean {
  if (task.kind === "fix" || task.kind === "revise") return task.questionIds.every((id) => fixAnswered.has(id));
  if (task.kind === "reread") return sheetsToday.has(task.chapterId);
  if (task.kind === "paper") return paperStates.get(task.paperId)?.done === true;
  const c = chapters.find((x) => x.id === task.chapterId);
  if (!c) return false;
  const s = stateOf(states, c.id);
  if (s.recordedDone) return true;
  if (task.kind === "sheet") return s.sheet;
  if (task.kind === "top") return c.top.length === 0 || s.topWorked >= c.top.length;
  return c.test === null || s.test;
}

/**
 * The Fix task's questions: due mistakes from path chapters, last missed
 * before today began (IST), oldest first, at most 5.
 */
export function fixQuestions(
  due: readonly { questionId: string; chapterId?: string | null; lastWrongAt: string }[],
  pathChapterIds: ReadonlySet<string>,
  dayStartIso: string,
  max: number = FIX_MAX
): string[] {
  return due
    .filter((q) => q.chapterId && pathChapterIds.has(q.chapterId) && q.lastWrongAt < dayStartIso)
    .sort((a, b) => (a.lastWrongAt < b.lastWrongAt ? -1 : a.lastWrongAt > b.lastWrongAt ? 1 : 0))
    .slice(0, max)
    .map((q) => q.questionId);
}

/**
 * What today's tasks lift from the free limits (§6): the Top 10 questions of
 * today's Top 10 tasks (answers), the Fix questions (drill), and the chapter
 * tests (a grant row each). Decided here, on the server's stored pick, never
 * from anything the browser sends.
 */
export function todayExemptions(
  tasks: readonly PathTask[],
  chapters: readonly PathChapter[],
  papers: readonly PathPaper[] = []
): { revealIds: string[]; drillIds: string[]; testMockIds: string[] } {
  const byId = new Map(chapters.map((c) => [c.id, c]));
  const paperById = new Map(papers.map((p) => [p.id, p]));
  const revealIds: string[] = [];
  const drillIds: string[] = [];
  const testMockIds: string[] = [];
  for (const t of tasks) {
    if (t.kind === "fix") drillIds.push(...t.questionIds);
    else if (t.kind === "revise") revealIds.push(...t.questionIds);
    else if (t.kind === "paper") revealIds.push(...(paperById.get(t.paperId)?.slots.flat(2).map((q) => q.id) ?? []));
    else if (t.kind === "top") revealIds.push(...(byId.get(t.chapterId)?.top.flat().map((p) => p.id) ?? []));
    else if (t.kind === "test") {
      const id = byId.get(t.chapterId)?.test?.mockId;
      if (id) testMockIds.push(id);
    }
  }
  return { revealIds: [...new Set(revealIds)], drillIds: [...new Set(drillIds)], testMockIds: [...new Set(testMockIds)] };
}
