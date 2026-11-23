/**
 * V's check-in (owner, 2026-11-21): the first time a student opens V after
 * CHECKIN_AWAY_DAYS or more days without answering anything, V asks "How's
 * your study going?" with three taps, in place of the "Your day" card that
 * day, so V still says one thing a day. Each tap leads to something to do:
 *
 *   - Going well: the "Your day" card, as on any other day.
 *   - Stuck on a chapter: the two chapters with the most mistakes waiting (or
 *     "Another chapter", which lets them type it to V), then that chapter's
 *     notes and its Fix. Not "easy questions": many chapters have few rows
 *     tagged easy, and a button must never open an empty page.
 *   - Short on time: Fix 5 of their own mistakes; with none waiting, the
 *     chapter that carries the most marks; with neither, their progress.
 *
 * It never counts the days away (ENGAGEMENT_SPEC.md: this cohort studies in
 * bursts). Built from numbers, no AI call. Pure. Spec: tests/chat-check-in.test.ts.
 */
import { DRILL_SIZE } from "@/lib/drill/select";
import { drillChapterHref, drillHref } from "@/lib/drill/from";
import { drillTimeLine } from "@/lib/drill/timeLine";

export const CHECKIN_AWAY_DAYS = 4;
export const CHECKIN_STUCK_NAMED = 2;

/** A chapter of the card's exam with mistakes waiting, with its links (built on the server). */
export type CheckInChapter = {
  chapterId: string;
  chapter: string;
  due: number;
  /** The chapter's /notes page, or null when it has none. */
  notesHref: string | null;
  practiceHref: string;
};

export type CheckInAction = { label: string; href: string; kind: "notes" | "fix" | "practice" | "performance" };

export type CheckIn = {
  stuck: CheckInChapter[];
  short: { text: string; action: CheckInAction };
};

export const CHECKIN_QUESTION = "Good to see you. How's your study going?";
export const CHECKIN_CHOICES = [
  { id: "well", label: "Going well" },
  { id: "stuck", label: "Stuck on a chapter" },
  { id: "short", label: "Short on time" },
] as const;
export type CheckInChoice = (typeof CHECKIN_CHOICES)[number]["id"];

export const CHECKIN_WELL_REPLY = "Great. Here's where you left off.";
export const CHECKIN_OTHER_LABEL = "Another chapter";
/** Typed into V's box after "Another chapter", for the student to finish. */
export const CHECKIN_OTHER_DRAFT = "I'm stuck on ";

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

/**
 * The check-in, or null when it should not ask: fewer than CHECKIN_AWAY_DAYS
 * days since their last day with answers, or no earlier day at all.
 */
export function buildCheckIn(i: {
  daysAway: number | null;
  /** Mistakes waiting in Fix, all exams. */
  due: number;
  stuck: readonly CheckInChapter[];
  /** The chapter that carries the most marks, for Short on time with nothing waiting. */
  top: { chapter: string; practiceHref: string } | null;
}): CheckIn | null {
  if (i.daysAway === null || i.daysAway < CHECKIN_AWAY_DAYS) return null;
  const stuck = i.stuck
    .filter((c) => c.due > 0)
    .sort((a, b) => b.due - a.due || a.chapter.localeCompare(b.chapter))
    .slice(0, CHECKIN_STUCK_NAMED);
  const head = "Then 10 minutes is enough today.";
  let short: CheckIn["short"];
  if (i.due > 0) {
    const n = Math.min(i.due, DRILL_SIZE);
    const time = drillTimeLine(n);
    short = {
      text: `${head} ${n === 1 ? "One of your own mistakes" : `${n === 5 ? "Five" : n} of your own mistakes`}: ${time.charAt(0).toLowerCase()}${time.slice(1)}`,
      action: { label: `Fix ${plural(n, "mistake")}`, href: drillHref("v_checkin"), kind: "fix" },
    };
  } else if (i.top) {
    short = {
      text: `${head} Try a few questions from ${i.top.chapter}, the chapter that carries the most marks.`,
      action: { label: `Practise ${i.top.chapter}`, href: i.top.practiceHref, kind: "practice" },
    };
  } else {
    short = {
      text: `${head} Here's where you stand, so you can pick one thing.`,
      action: { label: "My full progress", href: "/performance", kind: "performance" },
    };
  }
  return { stuck, short };
}

export function checkInStuckReply(stuck: readonly CheckInChapter[]): string {
  return stuck.length > 0
    ? "Which one? These are where most of your mistakes are."
    : "Which chapter? Tell me, and what feels hard about it.";
}

export function checkInChapterReply(c: CheckInChapter): { text: string; actions: CheckInAction[] } {
  const fix: CheckInAction = { label: `Fix ${c.chapter}`, href: drillChapterHref("v_checkin", c.chapterId), kind: "fix" };
  if (c.notesHref) {
    return {
      text: `Let's take ${c.chapter} slowly. Read the short notes first, then fix your ${plural(c.due, "mistake")} in it.`,
      actions: [{ label: "Read the notes", href: c.notesHref, kind: "notes" }, fix],
    };
  }
  return {
    text: `Let's take ${c.chapter} slowly. Start with the ${plural(c.due, "mistake")} you made in it.`,
    actions: [fix, { label: `Practise ${c.chapter}`, href: c.practiceHref, kind: "practice" }],
  };
}
