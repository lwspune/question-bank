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
  const finish = finishDate(p.remaining, p.daily, p.today);
  const behindDays = Math.max(0, daysBetween(p.buffer, finish));
  return { finish, onTrack: behindDays === 0, behindDays };
}
