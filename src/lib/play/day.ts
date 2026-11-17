/**
 * India dates for the daily /play games (Daily Word, Word Groups): a new
 * puzzle at midnight India time, whatever the device's clock zone. Pure.
 */

const IST_MS = 330 * 60_000;
const DAY_MS = 86_400_000;

/** Today's date in India as YYYY-MM-DD. */
export function istDay(now: Date): string {
  return new Date(now.getTime() + IST_MS).toISOString().slice(0, 10);
}

export function addDays(day: string, n: number): string {
  return new Date(Date.parse(`${day}T00:00:00Z`) + n * DAY_MS).toISOString().slice(0, 10);
}

/** Whole days from `a` to `b` (negative when b is earlier). */
export function daysBetween(a: string, b: string): number {
  return Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / DAY_MS);
}

/** Milliseconds until the next India midnight: the "next puzzle in" countdown. */
export function msToIstMidnight(now: Date): number {
  const t = now.getTime() + IST_MS;
  return DAY_MS - (t % DAY_MS);
}
