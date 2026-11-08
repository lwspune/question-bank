/**
 * The weekly review (MENTOR_SPEC.md §4 "V's part", Phase 2): once a week, on
 * /me and in V's path card, what went well, what is next, and the new finish
 * date if it moved. Growth framed: chapters and parts done and mistakes fixed
 * come first, a line with nothing in it is left out rather than shown as 0,
 * and a quiet week opens on the new week, never on what was missed.
 *
 * WEEKS are the path's own: 7 days from the day it started, so every student
 * gets a whole first week before a review. The review of the week just ended
 * shows the first REVIEW_SHOW_DAYS days of the next (owner, 2026-11-08).
 *
 * The week's work is the chapters' state at its end minus at its start
 * (fold.ts, as of each day's 00:00 in India); the finish date is the pace's
 * at each end, at the same minutes a day.
 *
 * Pure. Spec: tests/path-phase2.test.ts.
 */
import { chapterDone, partDone, type ChapterPart, type PathChapter } from "./model";
import { foldStates, type ChapterFacts } from "./fold";
import { addDays, daysBetween, finishDate } from "./pace";
import { dayLabel, pathRemainingMinutes } from "./view";

export const REVIEW_SHOW_DAYS = 2;
const WEEK = 7;

/** 00:00 in India on `day`, as an instant. */
export function istMidnight(day: string): string {
  return new Date(`${day}T00:00:00+05:30`).toISOString();
}

export function pathWeek(startDay: string, today: string): { index: number; dayInWeek: number; weekStart: string } {
  const since = Math.max(0, daysBetween(startDay, today));
  const index = Math.floor(since / WEEK);
  return { index, dayInWeek: since % WEEK, weekStart: addDays(startDay, index * WEEK) };
}

/** The week to review today (days, `to` excluded), or null when no review shows. */
export function reviewWindow(startDay: string, today: string): { from: string; to: string } | null {
  const w = pathWeek(startDay, today);
  if (w.index < 1 || w.dayInWeek >= REVIEW_SHOW_DAYS) return null;
  return { from: addDays(w.weekStart, -WEEK), to: w.weekStart };
}

export type WeekReview = {
  /** Names, in book order. */
  chaptersDone: string[];
  /** Parts done in chapters NOT finished in the week. */
  sheets: number;
  tops: number;
  tests: number;
  fixed: number;
  next: string | null;
  /** Only when the finish date moved. */
  finish: { was: string; now: string } | null;
};

export function buildWeekReview(p: {
  chapters: readonly PathChapter[];
  facts: ChapterFacts;
  from: string;
  to: string;
  daily: number;
  /** Fix questions answered in the week (the service counts them). */
  fixed: number;
  next: string | null;
}): WeekReview {
  const before = foldStates(p.chapters, p.facts, istMidnight(p.from));
  const after = foldStates(p.chapters, p.facts, istMidnight(p.to));
  const chaptersDone: string[] = [];
  const parts: Record<ChapterPart, number> = { sheet: 0, top: 0, test: 0 };
  for (const c of [...p.chapters].sort((a, b) => a.rank - b.rank)) {
    const s0 = before.get(c.id)!;
    const s1 = after.get(c.id)!;
    if (chapterDone(c, s0)) continue;
    if (chapterDone(c, s1)) {
      chaptersDone.push(c.name);
      continue;
    }
    for (const part of ["sheet", "top", "test"] as const) {
      if (!partDone(c, s0, part) && partDone(c, s1, part)) parts[part] += 1;
    }
  }
  const was = finishDate(pathRemainingMinutes(p.chapters, before), p.daily, p.from);
  const now = finishDate(pathRemainingMinutes(p.chapters, after), p.daily, p.to);
  return {
    chaptersDone,
    sheets: parts.sheet,
    tops: parts.top,
    tests: parts.test,
    fixed: p.fixed,
    next: p.next,
    finish: was === now ? null : { was, now },
  };
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

/** "a, b and c". */
function joinAnd(items: readonly string[]): string {
  return items.length <= 1 ? (items[0] ?? "") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export function reviewLines(r: WeekReview): string[] {
  const fixed = r.fixed > 0 ? plural(r.fixed, "mistake fixed", "mistakes fixed") : null;
  let went: string | null = null;
  if (r.chaptersDone.length > 0) {
    const done = `${plural(r.chaptersDone.length, "chapter", "chapters")} done (${r.chaptersDone.join(", ")})`;
    went = `Last week: ${done}${fixed ? `, ${fixed}` : ""}.`;
  } else {
    const parts = [
      r.sheets > 0 ? plural(r.sheets, "revision sheet", "revision sheets") : null,
      r.tops > 0 ? plural(r.tops, "Top 10", "Top 10s") : null,
      r.tests > 0 ? plural(r.tests, "chapter test", "chapter tests") : null,
    ].filter((x): x is string => x !== null);
    if (parts.length > 0) went = `Last week: ${joinAnd(parts)} done${fixed ? `, ${fixed}` : ""}.`;
    else if (fixed) went = `Last week: ${fixed}.`;
  }
  const lines = [went ?? "A new week of your plan."];
  if (r.next) lines.push(`Next: ${r.next}.`);
  if (r.finish) lines.push(`Finish date now ${dayLabel(r.finish.now)} (was ${dayLabel(r.finish.was)}).`);
  return lines;
}
