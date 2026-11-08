/**
 * What the path's Today card shows (MENTOR_SPEC.md §4): one honest status line
 * ("Physics 4 of 14 · Chemistry 3 of 10 · Maths 5 of 13, on track" or "behind
 * by 3 days", never a streak or a missed-day count) and the day's tasks, each a
 * link straight to the work.
 *
 * Pure. Spec: tests/path-view.test.ts.
 */
import {
  SUBJECT_LABEL,
  chapterDone,
  partDone,
  remainingMinutes,
  type ChapterPart,
  type ChapterState,
  type PathChapter,
  type PathExam,
  type PathSubject,
  type Stream,
  NOTHING_DONE,
} from "./model";
import { bufferStart, daysBetween, paceStatus, type PaceStatus } from "./pace";
import { taskDone, type PathTask } from "./today";

/** Fix work still to come per chapter not done, in the pace (§5: ~6-7 mistakes at 1.5 min). */
export const FIX_ALLOWANCE_PER_CHAPTER = 10;

export const EXAM_LABEL: Record<PathExam, string> = {
  "cbse-12": "CBSE Class 12 boards",
  "mh-hsc-12": "HSC boards",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2027-02-02" -> "2 Feb". */
export function dayLabel(day: string): string {
  const [, m, d] = day.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]}`;
}

/** Minutes left on a path: each unfinished chapter's work plus its Fix allowance. */
export function pathRemainingMinutes(chapters: readonly PathChapter[], states: ReadonlyMap<string, ChapterState>): number {
  return chapters.reduce((sum, c) => {
    const s = states.get(c.id) ?? NOTHING_DONE;
    return chapterDone(c, s) ? sum : sum + remainingMinutes(c, s) + FIX_ALLOWANCE_PER_CHAPTER;
  }, 0);
}

export type SubjectProgress = { subject: PathSubject; label: string; done: number; of: number };

export function statusLine(subjects: readonly SubjectProgress[], pace: Pick<PaceStatus, "onTrack" | "behindDays">): string {
  const parts = subjects.map((s) => `${s.label} ${s.done} of ${s.of}`).join(" · ");
  const tail = pace.onTrack ? "on track" : `behind by ${pace.behindDays} ${pace.behindDays === 1 ? "day" : "days"}`;
  return `${parts}, ${tail}`;
}

export type TaskRow = {
  key: string;
  kind: ChapterPart | "fix";
  title: string;
  detail: string;
  href: string;
  minutes: number;
  done: boolean;
  /** "4 of 10" on a Top 10 task. */
  progress: string | null;
  chapterId: string | null;
  /** The chapter's name on a chapter task, for "Pick up here". */
  chapter: string | null;
  /** "Not taught yet" is offered on a chapter task not yet done. */
  canDefer: boolean;
};

export type PathView = {
  exam: PathExam;
  dailyMinutes: number;
  subjects: SubjectProgress[];
  pace: PaceStatus;
  statusLine: string;
  /** "CBSE Class 12 boards from 15 Feb (expected), revision from 25 Jan". */
  examLine: string;
  tasks: TaskRow[];
  todayMinutes: number;
  allDone: boolean;
  /** A PCB student: Biology is not in the path yet (D1). */
  biologyNote: boolean;
  /** "Current Electricity, Top 10" after a gap of PICK_UP_GAP_DAYS+ days (Phase 2). */
  pickUp: string | null;
  /** The weekly review's lines, the first days of a new path week (review.ts). */
  review: string[] | null;
  /** "Chapter done: ..." for each chapter newly done on this read, said once. */
  celebrate: string[];
};

/** Days with no path work after which the card opens on "Pick up here". */
export const PICK_UP_GAP_DAYS = 3;

const PART_WORD: Record<ChapterPart, string> = { sheet: "revision sheet", top: "Top 10", test: "chapter test" };

/**
 * "Pick up here" after a gap (§4): the next chapter task on today's card,
 * never a list of what was missed. Measured from the last day of work in a
 * path chapter, or from the path's start when there was none.
 */
export function pickUpLine(rows: readonly TaskRow[], lastWorkDay: string | null, startDay: string, today: string): string | null {
  if (daysBetween(lastWorkDay ?? startDay, today) < PICK_UP_GAP_DAYS) return null;
  const next = rows.find((r) => !r.done && r.kind !== "fix" && r.chapter);
  return next ? `${next.chapter}, ${PART_WORD[next.kind as ChapterPart]}` : null;
}

/** What V says where a chapter finishes (§4): a genuine learning achievement. */
export function chapterDoneMessage(name: string, subject: SubjectProgress): string {
  if (subject.done >= subject.of) return `Chapter done: ${name}. That's every ${subject.label} chapter.`;
  return `Chapter done: ${name}. ${subject.label} ${subject.done} of ${subject.of}.`;
}

export type ChapterLine = {
  parts: { part: ChapterPart; label: string; done: boolean; progress: string | null }[];
  done: boolean;
  /** "Today: work the Top 10 PYQs" when today's card holds this chapter. */
  today: string | null;
};

const LINE_LABEL: Record<ChapterPart, string> = { sheet: "Revision sheet", top: "Top 10", test: "Chapter test" };
const TODAY_WORDS: Record<ChapterPart, string> = {
  sheet: "Today: read the revision sheet",
  top: "Today: work the Top 10 PYQs",
  test: "Today: take the chapter test",
};

/** The path's line on a /board chapter page (D8). */
export function chapterLine(c: PathChapter, s: ChapterState, todayTasks: readonly PathTask[]): ChapterLine {
  const has = (part: ChapterPart) => (part === "top" ? c.top.length > 0 : part === "test" ? c.test !== null : true);
  const parts = (["sheet", "top", "test"] as const).filter(has).map((part) => ({
    part,
    label: LINE_LABEL[part],
    done: partDone(c, s, part),
    progress: part === "top" && !partDone(c, s, part) ? `${Math.min(s.topWorked, c.top.length)} of ${c.top.length}` : null,
  }));
  const todayPart = todayTasks.find((t) => t.kind !== "fix" && t.chapterId === c.id && !partDone(c, s, t.kind));
  return {
    parts,
    done: chapterDone(c, s),
    today: todayPart && todayPart.kind !== "fix" ? TODAY_WORDS[todayPart.kind] : null,
  };
}

/** The drill, narrowed to today's Fix questions. */
export const PATH_FIX_HREF = "/drill?from=path&scope=path";

const TITLES: Record<ChapterPart, string> = {
  sheet: "Read the revision sheet",
  top: "Work the Top 10 PYQs",
  test: "Take the chapter test",
};

/** "CBSE Class 12 boards from 15 Feb (expected), revision from 25 Jan". */
export function examLineOf(exam: PathExam, examDate: string, official: boolean): string {
  return `${EXAM_LABEL[exam]} from ${dayLabel(examDate)}${official ? "" : " (expected)"}, revision from ${dayLabel(bufferStart(examDate))}`;
}

export function buildPathView(p: {
  exam: PathExam;
  subjects: readonly PathSubject[];
  stream: Stream | null;
  dailyMinutes: number;
  chapters: readonly PathChapter[];
  states: ReadonlyMap<string, ChapterState>;
  tasks: readonly PathTask[];
  fixAnswered: ReadonlySet<string>;
  today: string;
  examDate: string;
  examOfficial: boolean;
  /** The path's first day and the last day of work in it (Phase 2's "Pick up here"). */
  startDay?: string;
  lastWorkDay?: string | null;
  review?: string[] | null;
  /** Chapter ids newly done on this read. */
  newlyDone?: readonly string[];
}): PathView {
  const stateOf = (id: string) => p.states.get(id) ?? NOTHING_DONE;
  const byId = new Map(p.chapters.map((c) => [c.id, c]));

  const subjects: SubjectProgress[] = p.subjects.map((subject) => {
    const mine = p.chapters.filter((c) => c.subject === subject);
    return { subject, label: SUBJECT_LABEL[subject], done: mine.filter((c) => chapterDone(c, stateOf(c.id))).length, of: mine.length };
  });

  const remaining = pathRemainingMinutes(p.chapters, p.states);
  const buffer = bufferStart(p.examDate);
  const pace = paceStatus({ remaining, daily: p.dailyMinutes, today: p.today, buffer });

  const tasks: TaskRow[] = p.tasks.map((t, i) => {
    const done = taskDone(t, p.chapters, p.states, p.fixAnswered);
    if (t.kind === "fix") {
      const answered = t.questionIds.filter((id) => p.fixAnswered.has(id)).length;
      return {
        key: `fix-${i}`,
        kind: "fix",
        title: `Fix ${t.questionIds.length} ${t.questionIds.length === 1 ? "mistake" : "mistakes"}`,
        detail: `From chapters on your path, ${answered} of ${t.questionIds.length} done`,
        href: PATH_FIX_HREF,
        minutes: t.minutes,
        done,
        progress: null,
        chapterId: null,
        chapter: null,
        canDefer: false,
      };
    }
    const c = byId.get(t.chapterId);
    const s = stateOf(t.chapterId);
    const href =
      t.kind === "test" ? (c?.test ? `/mock/${c.test.slug}` : c?.boardPath ?? "/board") : `${c?.boardPath ?? "/board"}#${t.kind === "top" ? "top" : "revision"}`;
    return {
      key: `${t.kind}-${t.chapterId}`,
      kind: t.kind,
      title: TITLES[t.kind],
      detail: c ? `${SUBJECT_LABEL[c.subject]} · ${c.name}` : "",
      href,
      minutes: t.minutes,
      done,
      progress: t.kind === "top" && c ? `${Math.min(s.topWorked, c.top.length)} of ${c.top.length}` : null,
      chapterId: t.chapterId,
      chapter: c?.name ?? null,
      canDefer: !done,
    };
  });

  return {
    exam: p.exam,
    dailyMinutes: p.dailyMinutes,
    subjects,
    pace,
    statusLine: statusLine(subjects, pace),
    examLine: examLineOf(p.exam, p.examDate, p.examOfficial),
    tasks,
    todayMinutes: p.tasks.reduce((s, t) => s + t.minutes, 0),
    allDone: tasks.length > 0 && tasks.every((t) => t.done),
    biologyNote: p.stream === "pcb",
    pickUp: p.startDay ? pickUpLine(tasks, p.lastWorkDay ?? null, p.startDay, p.today) : null,
    review: p.review && p.review.length > 0 ? p.review : null,
    celebrate: (p.newlyDone ?? []).flatMap((id) => {
      const c = byId.get(id);
      const subject = c && subjects.find((x) => x.subject === c.subject);
      return c && subject ? [chapterDoneMessage(c.name, subject)] : [];
    }),
  };
}
