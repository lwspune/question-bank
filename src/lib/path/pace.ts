/**
 * The path's pace (MENTOR_SPEC.md §5): set from the date, never from an hours
 * question. Days are IST calendar days as YYYY-MM-DD strings.
 *
 * - The revision buffer starts three weeks before the board exam.
 * - A student studies 6 days a week.
 * - The minutes a day are set when the path starts (what is left over the study
 *   days to the buffer), between 30 and 90. A late starter asking more than 90
 *   is not quietly given less to do: the finish date says when they finish at
 *   90 (D3), and Phase 3 adds More.
 * - On track = the finish date at the student's pace is on or before the
 *   buffer; behind by the gap otherwise.
 *
 * Pure. Spec: tests/path-core.test.ts.
 */
export const BUFFER_DAYS = 21;
export const STUDY_DAYS_PER_WEEK = 6;
export const MIN_DAILY_MINUTES = 30;
export const MAX_DAILY_MINUTES = 90;
const STEP = 5;
const DAY_MS = 86_400_000;

const dayIndex = (day: string) => Math.floor(Date.parse(`${day}T00:00:00Z`) / DAY_MS);
const dayOf = (index: number) => new Date(index * DAY_MS).toISOString().slice(0, 10);

export function addDays(day: string, n: number): string {
  return dayOf(dayIndex(day) + n);
}

/** Calendar days from `from` to `to` (negative when `to` is earlier). */
export function daysBetween(from: string, to: string): number {
  return dayIndex(to) - dayIndex(from);
}

export function bufferStart(examDate: string): string {
  return addDays(examDate, -BUFFER_DAYS);
}

/** Study days from `from` (included) to `to` (excluded), 6 a week. */
export function studyDays(from: string, to: string): number {
  return Math.max(0, Math.floor((daysBetween(from, to) * STUDY_DAYS_PER_WEEK) / 7));
}

export function startingDailyMinutes(remaining: number, today: string, buffer: string): number {
  const days = Math.max(1, studyDays(today, buffer));
  const needed = Math.ceil(remaining / days / STEP) * STEP;
  return Math.min(MAX_DAILY_MINUTES, Math.max(MIN_DAILY_MINUTES, needed));
}

/** The day the work left is finished at `daily` minutes, 6 days a week. */
export function finishDate(remaining: number, daily: number, today: string): string {
  if (remaining <= 0) return today;
  const study = Math.ceil(remaining / Math.max(1, daily));
  return addDays(today, Math.ceil((study * 7) / STUDY_DAYS_PER_WEEK));
}

export type PaceStatus = { finish: string; onTrack: boolean; behindDays: number };

export function paceStatus(p: { remaining: number; daily: number; today: string; buffer: string }): PaceStatus {
  // Nothing left is on track, even inside the revision weeks.
  if (p.remaining <= 0) return { finish: p.today, onTrack: true, behindDays: 0 };
  const finish = finishDate(p.remaining, p.daily, p.today);
  const behindDays = Math.max(0, daysBetween(p.buffer, finish));
  return { finish, onTrack: behindDays === 0, behindDays };
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2027-02-02" -> "2 Feb". */
export function dayLabel(day: string): string {
  const [, m, d] = day.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]}`;
}

/**
 * Lighter / More (Phase 3, owner 2026-11-08): steps of 10 minutes between 20
 * and 120 a day. Wider than the 30-90 a path starts at, so a late starter can
 * ask for more and a busy week can go lighter; "done" never shrinks (D3).
 */
export const PACE_MIN = 20;
export const PACE_MAX = 120;
export const PACE_STEP = 10;

export function stepPace(daily: number, direction: "lighter" | "more"): number {
  const next = direction === "more" ? daily + PACE_STEP : daily - PACE_STEP;
  return Math.min(PACE_MAX, Math.max(PACE_MIN, next));
}

/** The minutes a day that finish by `buffer`, in steps of 5; Infinity with no study day left. */
export function minutesToFinishBy(remaining: number, today: string, buffer: string): number {
  const days = studyDays(today, buffer);
  if (days <= 0) return Infinity;
  return Math.ceil(remaining / days / STEP) * STEP;
}

type PaceInput = { remaining: number; daily: number; today: string; buffer: string };

/** What a Lighter tap leads to, said before it is made; null at the lightest pace. */
export function lighterLine(p: PaceInput): string | null {
  const next = stepPace(p.daily, "lighter");
  if (next === p.daily) return null;
  const finish = finishDate(p.remaining, next, p.today);
  return `At ${next} min a day you finish on ${dayLabel(finish)}${finish > p.buffer ? ", after revision starts" : ""}.`;
}

/**
 * Behind, said honestly (D3): the finish date at this pace and what More would
 * take to finish by revision; when even the top pace cannot, that date and
 * what happens then. Never a missed-day count. Null on track.
 */
export function behindLine(p: PaceInput): string | null {
  if (p.remaining <= 0) return null;
  if (p.today >= p.buffer) return "Revision has started: chapters left come first, smallest first.";
  const status = paceStatus(p);
  if (status.onTrack) return null;
  const needed = minutesToFinishBy(p.remaining, p.today, p.buffer);
  if (needed <= PACE_MAX) {
    return `At this pace you finish on ${dayLabel(status.finish)}. Tap More to finish by ${dayLabel(p.buffer)} (about ${needed} min a day).`;
  }
  return `Even at ${PACE_MAX} min a day you finish on ${dayLabel(finishDate(p.remaining, PACE_MAX, p.today))}. Chapters left then come first, smallest first.`;
}
