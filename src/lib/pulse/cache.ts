/**
 * The "pulse" — due drill count + this week's sittings — as the header shows it.
 *
 * Pure rules for the client-side cache. The header is on every page and the
 * honest due count costs the drill's whole read (every answer event plus a
 * taxonomy lookup), so the number is fetched once per page load and held in
 * sessionStorage for PULSE_TTL_MS. The two moments it changes — a drill
 * answer, a mock result — invalidate it explicitly (see usePulse.ts).
 *
 * No I/O. Spec: tests/pulse-cache.test.ts.
 */

export type Pulse = {
  /** Drillable questions due right now — the number /drill will serve from. */
  due: number;
  week: { done: number; goal: number | null };
};

export type PulseEntry = Pulse & {
  /** Epoch ms when it was fetched. */
  at: number;
};

export const PULSE_TTL_MS = 10 * 60 * 1000;

export const PULSE_STORAGE_KEY = "qb:pulse:v1";

export function isPulseFresh(entry: PulseEntry, nowMs: number): boolean {
  const age = nowMs - entry.at;
  // A negative age means the clock moved backwards or the entry came from a
  // future-stamped write; either way it is not evidence of freshness.
  return age >= 0 && age < PULSE_TTL_MS;
}

function isCount(v: unknown): v is number {
  return typeof v === "number" && Number.isInteger(v) && v >= 0;
}

/** Parse a stored entry, refusing anything that is not exactly the shape —
 *  a malformed cache must never render a number. */
export function parsePulseEntry(raw: string | null): PulseEntry | null {
  if (raw === null) return null;
  let v: unknown;
  try {
    v = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof v !== "object" || v === null) return null;
  const o = v as Record<string, unknown>;
  if (!isCount(o.at) || !isCount(o.due)) return null;
  const w = o.week;
  if (typeof w !== "object" || w === null) return null;
  const week = w as Record<string, unknown>;
  if (!isCount(week.done)) return null;
  if (week.goal !== null && !isCount(week.goal)) return null;
  return { at: o.at, due: o.due, week: { done: week.done, goal: week.goal as number | null } };
}
