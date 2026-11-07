/**
 * The mentor path's model (MENTOR_SPEC.md §2-§5): which subjects a student
 * studies, the queues their chapters stand in (book order; HSC Maths as two
 * books, D2), a chapter's three parts in order and what each costs in minutes.
 *
 * Nothing here is stored. What a student did lives in `user_activity` and
 * `mock_attempts`; the read service folds it into a `ChapterState` per chapter
 * and everything below works on that. Pure: no DB, no clock.
 * Spec: tests/path-core.test.ts.
 */
import type { TopSlot } from "./done";

export const PATH_EXAMS = ["cbse-12", "mh-hsc-12"] as const;
export type PathExam = (typeof PATH_EXAMS)[number];

export const PATH_SUBJECTS = ["physics", "chemistry", "mathematics"] as const;
export type PathSubject = (typeof PATH_SUBJECTS)[number];

/** The DB subject name of each path subject. */
export const SUBJECT_NAME: Record<PathSubject, string> = {
  physics: "Physics",
  chemistry: "Chemistry",
  mathematics: "Mathematics",
};

/** What the student reads in the status line. */
export const SUBJECT_LABEL: Record<PathSubject, string> = {
  physics: "Physics",
  chemistry: "Chemistry",
  mathematics: "Maths",
};

export const STREAMS = ["pcm", "pcb", "pcmb"] as const;
export type Stream = (typeof STREAMS)[number];

export function isPathExam(v: unknown): v is PathExam {
  return typeof v === "string" && (PATH_EXAMS as readonly string[]).includes(v);
}

/** PCM and PCMB study all three; PCB studies Physics and Chemistry (D1). */
export function subjectsForStream(stream: Stream): PathSubject[] {
  return stream === "pcb" ? ["physics", "chemistry"] : ["physics", "chemistry", "mathematics"];
}

/** HSC Maths Part 1 is the book's chapters 1-7, Part 2 chapters 8-15. */
const HSC_MATHS_PART_1_LAST = 7;

/** The queue a chapter stands in; `rank` is its 1-based place in its book. */
export function queueOf(exam: PathExam, subject: PathSubject, rank: number): string {
  if (exam === "mh-hsc-12" && subject === "mathematics") {
    return rank <= HSC_MATHS_PART_1_LAST ? "mathematics-1" : "mathematics-2";
  }
  return subject;
}

/** Ties between queues equally far behind go in this order. */
export const QUEUE_ORDER: readonly string[] = ["physics", "chemistry", "mathematics", "mathematics-1", "mathematics-2"];

export type PathChapter = {
  id: string;
  name: string;
  subject: PathSubject;
  queue: string;
  /** 1-based place in its book. */
  rank: number;
  /** The /board chapter URL: the Revision and Top 10 tabs live there. */
  boardPath: string;
  /** The chapter's Top 10 PYQs, slot by slot (a case study's parts together). */
  top: TopSlot[];
  test: { mockId: string; slug: string; minutes: number } | null;
};

export type ChapterState = {
  sheet: boolean;
  /** Top 10 slots worked, by the homework rule (done.ts topWorked). */
  topWorked: number;
  /** A chapter test finished with answers in it. */
  test: boolean;
  /** A `path_chapter_done` event exists: done stays done if the Top 10 is rebuilt. */
  recordedDone: boolean;
};

export const NOTHING_DONE: ChapterState = { sheet: false, topWorked: 0, test: false, recordedDone: false };

export type ChapterPart = "sheet" | "top" | "test";
const PART_ORDER: readonly ChapterPart[] = ["sheet", "top", "test"];

/** Estimates (§5), to be measured in Phase 1. */
export const SHEET_MINUTES = 10;
export const MINUTES_PER_TOP_SLOT = 3;

function hasPart(c: PathChapter, part: ChapterPart): boolean {
  if (part === "top") return c.top.length > 0;
  if (part === "test") return c.test !== null;
  return true;
}

export function partDone(c: PathChapter, s: ChapterState, part: ChapterPart): boolean {
  if (s.recordedDone || !hasPart(c, part)) return true;
  if (part === "sheet") return s.sheet;
  if (part === "top") return s.topWorked >= c.top.length;
  return s.test;
}

export function chapterDone(c: PathChapter, s: ChapterState): boolean {
  return PART_ORDER.every((p) => partDone(c, s, p));
}

/** The first part not yet done, in order; null once the chapter is done. */
export function nextPart(c: PathChapter, s: ChapterState): ChapterPart | null {
  return PART_ORDER.find((p) => !partDone(c, s, p)) ?? null;
}

/** What is LEFT of a part, in minutes. */
export function partMinutes(c: PathChapter, s: ChapterState, part: ChapterPart): number {
  if (part === "sheet") return SHEET_MINUTES;
  if (part === "top") return MINUTES_PER_TOP_SLOT * Math.max(0, c.top.length - s.topWorked);
  return c.test?.minutes ?? 0;
}

export function totalMinutes(c: PathChapter): number {
  return PART_ORDER.reduce((sum, p) => sum + (hasPart(c, p) ? partMinutes(c, NOTHING_DONE, p) : 0), 0);
}

export function remainingMinutes(c: PathChapter, s: ChapterState): number {
  return PART_ORDER.reduce((sum, p) => sum + (partDone(c, s, p) ? 0 : partMinutes(c, s, p)), 0);
}
