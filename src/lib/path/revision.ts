/**
 * The last three weeks before the board exam (MENTOR_SPEC.md §4, Phase 3;
 * owner's picks 2026-11-08). From the revision buffer's first day the card
 * switches from chapters to revision:
 *
 *   1. chapters not done yet come first, smallest first (D3: "done" is never
 *      shrunk to fit the time, so what is left is finished first);
 *   2. then a WHOLE past board paper, timed, EVERY day (owner, 2026-11-08;
 *      it was alternate days until the owner saw the in-between days): the
 *      real exam's practice, the day overrunning the usual minutes. A paper
 *      started and not finished comes before a new one; subjects in turn,
 *      newest year first. After it, the one chapter most marked "Review
 *      later", worked again;
 *   3. once the papers run out (HSC has 18 for PCM), the chapters most marked
 *      Review later, worked again; with none left, the revision sheets read
 *      longest ago, read again, so no day is empty;
 *   4. the Fix task as a main daily item, up to REVISION_FIX_MAX mistakes.
 *
 * A paper is DONE when every printed question on it was answered or marked on
 * its page (the Top 10 rule, lib/homework/progress markOf): an OR choice by
 * either half, a case study by all its parts. Opening the page is not doing it.
 *
 * Pure. Spec: tests/path-phase3.test.ts.
 */
import { markOf, type ProgressEvent } from "@/lib/homework/progress";
import type { ChapterFacts } from "./fold";
import { chapterDone, NOTHING_DONE, PATH_SUBJECTS, SHEET_MINUTES, type ChapterState, type PathChapter, type PathPaper } from "./model";
import { bufferStart } from "./pace";
import { FIX_MINUTES_PER_QUESTION, MAX_TASKS, MIN_TASKS, STOP_SHARE, pickToday, type PaperState, type PathTask } from "./today";

export type { PaperState } from "./today";

export const REVISION_FIX_MAX = 10;
/** A revise task reworks at most this many questions of one chapter. */
export const REVISE_MAX_QUESTIONS = 10;
export const MINUTES_PER_REVISE_QUESTION = 3;

export function isRevision(today: string, examDate: string): boolean {
  return today >= bufferStart(examDate);
}

/** How much of a paper is worked, by the Top 10 rule. */
export function paperWorked(paper: PathPaper, events: readonly ProgressEvent[]): { worked: number; of: number; done: boolean } {
  const byQuestion = new Map<string, ProgressEvent[]>();
  for (const e of events) {
    const list = byQuestion.get(e.questionId) ?? [];
    list.push(e);
    byQuestion.set(e.questionId, list);
  }
  const workedQ = (q: { id: string; format: Parameters<typeof markOf>[0] }) => markOf(q.format, byQuestion.get(q.id) ?? []) !== null;
  const worked = paper.slots.filter((options) => options.some((parts) => parts.length > 0 && parts.every(workedQ))).length;
  return { worked, of: paper.slots.length, done: paper.slots.length > 0 && worked === paper.slots.length };
}

/** Per chapter, the Top 10 questions whose last record is a "Review later" mark. */
export function reviewPending(chapters: readonly PathChapter[], facts: ChapterFacts): Map<string, string[]> {
  const out = new Map<string, string[]>();
  for (const c of chapters) {
    const last = new Map<string, ProgressEvent>();
    for (const e of facts.marks.get(c.id) ?? []) {
      const prev = last.get(e.questionId);
      if (!prev || Date.parse(e.at) >= Date.parse(prev.at)) last.set(e.questionId, e);
    }
    const ids = c.top
      .flat()
      .map((q) => q.id)
      .filter((id) => {
        const e = last.get(id);
        return e?.kind === "self_mark" && e.mark === "review";
      });
    if (ids.length > 0) out.set(c.id, ids);
  }
  return out;
}

const SUBJECT_ORDER: readonly string[] = PATH_SUBJECTS;

/** The next paper: one started and not finished, else a new one from the subject with fewest served, newest first. */
function nextPaper(papers: readonly PathPaper[], paperStates: ReadonlyMap<string, PaperState>): PathPaper | null {
  const started = papers.find((p) => paperStates.get(p.id)?.served && !paperStates.get(p.id)?.done);
  if (started) return started;
  const fresh = papers.filter((p) => !paperStates.get(p.id)?.served);
  if (fresh.length === 0) return null;
  const servedCount = (subject: string) => papers.filter((p) => p.subject === subject && paperStates.get(p.id)?.served).length;
  return [...fresh].sort(
    (a, b) =>
      servedCount(a.subject) - servedCount(b.subject) ||
      SUBJECT_ORDER.indexOf(a.subject) - SUBJECT_ORDER.indexOf(b.subject) ||
      b.year - a.year
  )[0];
}

export function pickRevisionDay(input: {
  chapters: readonly PathChapter[];
  states: ReadonlyMap<string, ChapterState>;
  deferred: ReadonlySet<string>;
  budget: number;
  fix: readonly string[];
  papers: readonly PathPaper[];
  paperStates: ReadonlyMap<string, PaperState>;
  /** reviewPending's map. */
  reviews: ReadonlyMap<string, readonly string[]>;
  today: string;
  /** The revision buffer's first day. */
  buffer: string;
  /** Tasks already on today's card, kept first on a replan (Lighter / More, "Not taught yet"). */
  keep?: readonly PathTask[];
  /** Each chapter's latest revision-sheet view, for the re-reads. */
  sheetSeenAt?: ReadonlyMap<string, string>;
}): PathTask[] {
  const stateOf = (id: string) => input.states.get(id) ?? NOTHING_DONE;
  // 1. Chapters not done come first, smallest first.
  if (input.chapters.some((c) => !chapterDone(c, stateOf(c.id)))) {
    return pickToday({
      chapters: input.chapters,
      states: input.states,
      deferred: input.deferred,
      budget: input.budget,
      fix: input.fix,
      smallestFirst: true,
      fixMax: REVISION_FIX_MAX,
      keep: input.keep,
    });
  }

  const tasks: PathTask[] = [...(input.keep ?? [])];
  const fix = input.fix.slice(0, REVISION_FIX_MAX);
  if (fix.length > 0 && !tasks.some((t) => t.kind === "fix")) {
    tasks.unshift({ kind: "fix", questionIds: [...fix], minutes: Math.ceil(fix.length * FIX_MINUTES_PER_QUESTION) });
  }
  // A day holds one paper at most.
  if (tasks.some((t) => t.kind === "paper")) return tasks;

  const kept = new Set(tasks.flatMap((t) => (t.kind === "revise" ? [t.chapterId] : [])));
  const byCount = [...input.reviews.entries()]
    .filter(([id, ids]) => ids.length > 0 && !kept.has(id))
    .sort((a, b) => b[1].length - a[1].length || rankOf(input.chapters, a[0]) - rankOf(input.chapters, b[0]));
  const reviseTask = ([chapterId, ids]: readonly [string, readonly string[]]): PathTask => {
    const questionIds = ids.slice(0, REVISE_MAX_QUESTIONS);
    return { kind: "revise", chapterId, questionIds: [...questionIds], minutes: questionIds.length * MINUTES_PER_REVISE_QUESTION };
  };

  // 2. A whole paper every day, then the chapter most marked Review later.
  const paper = nextPaper(input.papers, input.paperStates);
  if (paper) {
    tasks.push({ kind: "paper", paperId: paper.id, minutes: paper.minutes });
    if (byCount.length > 0 && kept.size === 0) tasks.push(reviseTask(byCount[0]));
    return tasks;
  }

  // 3. The papers have run out: the chapters most marked Review later.
  let spent = tasks.reduce((s, t) => s + t.minutes, 0);
  let revised = kept.size;
  for (const entry of byCount) {
    if (tasks.length >= MAX_TASKS || (tasks.length >= MIN_TASKS && spent >= STOP_SHARE * input.budget)) break;
    const task = reviseTask(entry);
    tasks.push(task);
    spent += task.minutes;
    revised += 1;
  }
  // Nothing marked Review later: the sheets read longest ago, read again.
  if (revised === 0) {
    const seen = input.sheetSeenAt ?? new Map<string, string>();
    const keptReads = new Set(tasks.flatMap((t) => (t.kind === "reread" ? [t.chapterId] : [])));
    const order = [...input.chapters]
      .filter((c) => !keptReads.has(c.id))
      .sort((a, b) => {
        const ta = seen.has(a.id) ? Date.parse(seen.get(a.id)!) : 0;
        const tb = seen.has(b.id) ? Date.parse(seen.get(b.id)!) : 0;
        // Ties (never re-read yet) mix subjects: each book's first chapter, then each book's second.
        return ta - tb || a.rank - b.rank || SUBJECT_ORDER.indexOf(a.subject) - SUBJECT_ORDER.indexOf(b.subject);
      });
    for (const c of order) {
      if (tasks.length >= MAX_TASKS || (tasks.length >= MIN_TASKS && spent >= STOP_SHARE * input.budget)) break;
      tasks.push({ kind: "reread", chapterId: c.id, minutes: SHEET_MINUTES });
      spent += SHEET_MINUTES;
    }
  }
  return tasks;
}

function rankOf(chapters: readonly PathChapter[], id: string): number {
  const c = chapters.find((x) => x.id === id);
  return c ? SUBJECT_ORDER.indexOf(c.subject) * 1000 + c.rank : Number.MAX_SAFE_INTEGER;
}
