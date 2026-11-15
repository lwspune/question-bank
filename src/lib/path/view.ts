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
  type PathPaper,
  type PathSubject,
  type Stream,
  NOTHING_DONE,
} from "./model";
import {
  PACE_MAX,
  PACE_MIN,
  behindLine,
  bufferStart,
  dayLabel,
  daysBetween,
  lighterLine,
  paceStatus,
  type PaceStatus,
} from "./pace";
import { isChapterTask, taskDone, type PaperState, type PathTask } from "./today";
import { MINUTES_PER_TOP_SLOT, PATH_SUBJECTS } from "./model";
import { coverList, switchesLeft, type CoverSubject } from "./covered";
import { istDayKey } from "@/lib/email/dueNudge";
import { weekdayLabel } from "./week";

/** Fix work still to come per chapter not done, in the pace (§5: ~6-7 mistakes at 1.5 min). */
export const FIX_ALLOWANCE_PER_CHAPTER = 10;

export const EXAM_LABEL: Record<PathExam, string> = {
  "cbse-12": "CBSE Class 12 boards",
  "mh-hsc-12": "HSC boards",
};

export { dayLabel } from "./pace";

/** Minutes left on a path: each unfinished chapter's work plus its Fix allowance. */
export function pathRemainingMinutes(chapters: readonly PathChapter[], states: ReadonlyMap<string, ChapterState>): number {
  return chapters.reduce((sum, c) => {
    const s = states.get(c.id) ?? NOTHING_DONE;
    return chapterDone(c, s) ? sum : sum + remainingMinutes(c, s) + FIX_ALLOWANCE_PER_CHAPTER;
  }, 0);
}

export type SubjectProgress = { subject: PathSubject; label: string; done: number; of: number };

export function statusLine(
  subjects: readonly SubjectProgress[],
  pace: Pick<PaceStatus, "onTrack" | "behindDays">,
  mode: PathMode = "chapters"
): string {
  const parts = subjects.map((s) => `${s.label} ${s.done} of ${s.of}`).join(" · ");
  const allDone = subjects.every((s) => s.done >= s.of);
  const tail =
    mode === "revision" && allDone
      ? "revision weeks"
      : pace.onTrack
        ? "on track"
        : `behind by ${pace.behindDays} ${pace.behindDays === 1 ? "day" : "days"}`;
  return `${parts}, ${tail}`;
}

/** Chapters, then from three weeks before the board exam, revision (Phase 3). */
export type PathMode = "chapters" | "revision";

export type TaskRow = {
  key: string;
  kind: PathTask["kind"];
  title: string;
  detail: string;
  href: string;
  minutes: number;
  done: boolean;
  /** "4 of 10" on a Top 10 task, "12 of 33 checked" on a paper. */
  progress: string | null;
  chapterId: string | null;
  /** The chapter's name on a chapter task, for "Pick up here". */
  chapter: string | null;
};

/** Today's chapter on the card (§18): its three steps and what already counted. */
export type FocusChapter = {
  chapterId: string;
  name: string;
  subjectLabel: string;
  parts: ChapterLine["parts"];
  /** "You took this chapter's test on Fri 13 Nov, so we've counted it. ..." or null. */
  credit: string | null;
};

/** A chapter "Switch chapter" offers (§18). `taught` is null when the student ticked nothing. */
export type SwitchOption = {
  id: string;
  name: string;
  subjectLabel: string;
  stepsDone: number;
  stepsOf: number;
  taught: boolean | null;
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
  mode: PathMode;
  /** Behind, said honestly with what More would take (D3); null on track. */
  behind: string | null;
  /** What a Lighter tap leads to, said before it is made; null at the lightest. */
  lighter: string | null;
  canLighter: boolean;
  canMore: boolean;
  /** Today's first chapter, in the chapters weeks (§18); null otherwise. */
  focus: FocusChapter | null;
  /** "What has your class covered?" (§18): asked = answered before. Null when not read. */
  cover: { asked: boolean; subjects: CoverSubject[] } | null;
  switchOptions: SwitchOption[];
  switchesLeft: number;
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
  const next = rows.find((r) => !r.done && (r.kind === "sheet" || r.kind === "top" || r.kind === "test") && r.chapter);
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
  const todayPart = todayTasks.filter(isChapterTask).find((t) => t.chapterId === c.id && !partDone(c, s, t.kind));
  return {
    parts,
    done: chapterDone(c, s),
    today: todayPart ? TODAY_WORDS[todayPart.kind] : null,
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
  /** The revision weeks' papers and their progress (Phase 3). */
  papers?: readonly PathPaper[];
  paperStates?: ReadonlyMap<string, PaperState>;
  /** Chapters whose revision sheet was opened today (the revision weeks' re-reads). */
  sheetsToday?: ReadonlySet<string>;
  /** When each chapter's sheet was first read and its test finished (§18's "we've counted it"). */
  partAt?: { sheetAt: ReadonlyMap<string, string>; testAt: ReadonlyMap<string, string> };
  /** Chapters the class has covered (ticked or worked on); null when nothing is ticked. */
  taught?: ReadonlySet<string> | null;
  /** "Switch chapter" taps today. */
  switchesUsed?: number;
  /** The class checklist's inputs; absent when not read. */
  cover?: { asked: boolean; ticked: ReadonlySet<string>; practised: ReadonlySet<string> };
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
  const mode: PathMode = p.today >= buffer ? "revision" : "chapters";
  const paperStates = p.paperStates ?? new Map<string, PaperState>();
  const paperById = new Map((p.papers ?? []).map((x) => [x.id, x]));

  // A Top 10 in two parts on one card (§18) shows its "4 of 10" once, on the first.
  const firstTop = new Set<number>();
  const topSeen = new Set<string>();
  p.tasks.forEach((t, i) => {
    if (t.kind === "top" && !topSeen.has(t.chapterId)) {
      topSeen.add(t.chapterId);
      firstTop.add(i);
    }
  });
  const tasks: TaskRow[] = p.tasks.map((t, i) => {
    const done = taskDone(t, p.chapters, p.states, p.fixAnswered, paperStates, p.sheetsToday);
    if (t.kind === "reread") {
      const c = byId.get(t.chapterId);
      return {
        key: `reread-${t.chapterId}`,
        kind: "reread",
        title: "Read the revision sheet again",
        detail: c ? `${SUBJECT_LABEL[c.subject]} · ${c.name}` : "",
        href: `${c?.boardPath ?? "/board"}#revision`,
        minutes: t.minutes,
        done,
        progress: null,
        chapterId: t.chapterId,
        chapter: c?.name ?? null,
      };
    }
    if (t.kind === "paper") {
      const paper = paperById.get(t.paperId);
      const st = paperStates.get(t.paperId);
      return {
        key: `paper-${t.paperId}`,
        kind: "paper",
        title: "Write a board paper, timed",
        detail: paper ? `${SUBJECT_LABEL[paper.subject]} · ${paper.label}, ${hoursLabel(paper.minutes)}` : "",
        href: paper?.href ?? "/question-papers",
        minutes: t.minutes,
        done,
        progress: st && st.worked > 0 && !done ? `${st.worked} of ${st.of} checked` : null,
        chapterId: null,
        chapter: null,
      };
    }
    if (t.kind === "revise") {
      const c = byId.get(t.chapterId);
      const n = t.questionIds.length;
      return {
        key: `revise-${t.chapterId}`,
        kind: "revise",
        title: "Rework your Review later questions",
        detail: c ? `${SUBJECT_LABEL[c.subject]} · ${c.name} · ${n} ${n === 1 ? "question" : "questions"}` : "",
        href: `${c?.boardPath ?? "/board"}#top`,
        minutes: t.minutes,
        done,
        progress: null,
        chapterId: t.chapterId,
        chapter: c?.name ?? null,
      };
    }
    if (t.kind === "fix") {
      const answered = t.questionIds.filter((id) => p.fixAnswered.has(id)).length;
      return {
        key: `fix-${i}`,
        kind: "fix",
        title: `Fix ${t.questionIds.length} ${t.questionIds.length === 1 ? "mistake" : "mistakes"}`,
        detail: `From chapters in your plan, ${answered} of ${t.questionIds.length} done`,
        href: PATH_FIX_HREF,
        minutes: t.minutes,
        done,
        progress: null,
        chapterId: null,
        chapter: null,
      };
    }
    const c = byId.get(t.chapterId);
    const s = stateOf(t.chapterId);
    const upTo = t.kind === "top" ? t.upTo : undefined;
    const href =
      t.kind === "test" ? (c?.test ? `/mock/${c.test.slug}` : c?.boardPath ?? "/board") : `${c?.boardPath ?? "/board"}#${t.kind === "top" ? "top" : "revision"}`;
    return {
      key: `${t.kind}-${t.chapterId}${upTo ? `-${upTo}` : ""}`,
      kind: t.kind,
      title: t.kind === "top" && upTo && c ? topPartTitle(upTo, t.minutes, c.top.length) : TITLES[t.kind],
      detail: c ? `${SUBJECT_LABEL[c.subject]} · ${c.name}` : "",
      href,
      minutes: t.minutes,
      done,
      progress: t.kind === "top" && c && firstTop.has(i) ? `${Math.min(s.topWorked, c.top.length)} of ${c.top.length}` : null,
      chapterId: t.chapterId,
      chapter: c?.name ?? null,
    };
  });

  // Today's chapter: the first chapter task on the card, in the chapters weeks.
  const first = mode === "chapters" ? p.tasks.find(isChapterTask) : undefined;
  const firstChapter = first ? byId.get(first.chapterId) : undefined;
  const focus: FocusChapter | null = firstChapter
    ? {
        chapterId: firstChapter.id,
        name: firstChapter.name,
        subjectLabel: SUBJECT_LABEL[firstChapter.subject],
        parts: chapterLine(firstChapter, stateOf(firstChapter.id), []).parts,
        credit: creditLine(
          firstChapter,
          stateOf(firstChapter.id),
          { sheetAt: p.partAt?.sheetAt.get(firstChapter.id), testAt: p.partAt?.testAt.get(firstChapter.id) },
          p.today
        ),
      }
    : null;

  const onCard = new Set(p.tasks.filter(isChapterTask).map((t) => t.chapterId));
  const taught = p.taught ?? null;
  const subjectRank = (x: PathChapter) => PATH_SUBJECTS.indexOf(x.subject);
  const switchOptions: SwitchOption[] = p.chapters
    .filter((c) => !onCard.has(c.id) && !chapterDone(c, stateOf(c.id)))
    .map((c) => {
      const line = chapterLine(c, stateOf(c.id), []);
      return {
        chapter: c,
        option: {
          id: c.id,
          name: c.name,
          subjectLabel: SUBJECT_LABEL[c.subject],
          stepsDone: line.parts.filter((x) => x.done).length,
          stepsOf: line.parts.length,
          taught: taught ? taught.has(c.id) : null,
        },
      };
    })
    .sort(
      (a, b) =>
        Number(b.option.taught === true) - Number(a.option.taught === true) ||
        subjectRank(a.chapter) - subjectRank(b.chapter) ||
        a.chapter.queue.localeCompare(b.chapter.queue) ||
        a.chapter.rank - b.chapter.rank
    )
    .map((x) => x.option);

  return {
    exam: p.exam,
    dailyMinutes: p.dailyMinutes,
    subjects,
    pace,
    statusLine: statusLine(subjects, pace, mode),
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
    mode,
    behind: behindLine({ remaining, daily: p.dailyMinutes, today: p.today, buffer }),
    lighter: lighterLine({ remaining, daily: p.dailyMinutes, today: p.today, buffer }),
    canLighter: p.dailyMinutes > PACE_MIN,
    canMore: p.dailyMinutes < PACE_MAX,
    focus,
    cover: p.cover
      ? {
          asked: p.cover.asked,
          subjects: coverList({ chapters: p.chapters, subjects: p.subjects, asked: p.cover.asked, ticked: p.cover.ticked, practised: p.cover.practised }),
        }
      : null,
    switchOptions,
    switchesLeft: switchesLeft(p.switchesUsed ?? 0),
  };
}

/** "Top 10: first 5 questions", "Top 10: 5 more questions", "Top 10: last 3 questions". */
function topPartTitle(upTo: number, minutes: number, total: number): string {
  const n = Math.max(1, Math.round(minutes / MINUTES_PER_TOP_SLOT));
  const q = n === 1 ? "question" : "questions";
  if (upTo >= total) return n === 1 ? "Top 10: last question" : `Top 10: last ${n} ${q}`;
  if (upTo === n) return `Top 10: first ${n} ${q}`;
  return `Top 10: ${n} more ${q}`;
}

const REST_WORDS: Record<ChapterPart, string> = {
  sheet: "read the revision sheet",
  top: "finish the Top 10",
  test: "take the chapter test",
};

/**
 * What work done before today already counts on a chapter (§18), and what is
 * left: "You took this chapter's test on Fri 13 Nov, so we've counted it.
 * Finish the Top 10 and it's done." Null when nothing was done before today.
 */
export function creditLine(
  c: PathChapter,
  s: ChapterState,
  at: { sheetAt?: string; testAt?: string },
  today: string
): string | null {
  const before = (iso: string | undefined) => !!iso && istDayKey(new Date(iso)) < today;
  let first: string | null = null;
  if (s.test && before(at.testAt)) first = `You took this chapter's test on ${weekdayLabel(istDayKey(new Date(at.testAt!)))}, so we've counted it.`;
  else if (s.topWorked > 0 && s.topWorked < c.top.length) first = `You've already worked ${s.topWorked} of its Top 10, so we've counted them.`;
  else if (s.sheet && before(at.sheetAt)) first = "You've already read its revision sheet, so we've counted it.";
  if (!first) return null;
  const rest = (["sheet", "top", "test"] as const).filter((part) => !partDone(c, s, part)).map((part) => REST_WORDS[part]);
  if (rest.length === 0) return first;
  const list = rest.length === 1 ? rest[0] : `${rest.slice(0, -1).join(", ")} and ${rest[rest.length - 1]}`;
  const sentence = rest.length === 1 ? `${list} and it's done.` : `${list}, and it's done.`;
  return `${first} ${sentence.charAt(0).toUpperCase()}${sentence.slice(1)}`;
}

/** "3 hours", "2 hours 30 min". */
function hoursLabel(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  return `${h} ${h === 1 ? "hour" : "hours"}${m ? ` ${m} min` : ""}`;
}
