/**
 * One visit to a Learn lesson (2026-11-25): how far through the slides the student got, which
 * slide they left from and how long they sat on it, and how long the lesson was on screen.
 * Stored as one user_activity `learn_visit` row (migration 0288), sent when the lesson is hidden
 * or closed. It answers "opened a lesson and answered nothing: did the slides lose them, or did
 * they reach the questions and stop?" (experiment v-learn-first), which learn_start (the first
 * move) and learn_attempts (answers) cannot.
 *
 * Pure: the caller passes the clock. Slide numbers in a report are 1-based, as a student counts.
 */

/** Shorter visits are a tap through, not a visit: no row. */
export const MIN_VISIT_SECONDS = 5;
/** A lesson left open for hours is not reading it; the server refuses more. */
export const MAX_VISIT_SECONDS = 3 * 60 * 60;
/** Rows one visit may write at most (one per furthest slide and slide left from). */
export const MAX_SENDS_PER_VISIT = 8;
/** No lesson comes near this; the server refuses more. */
export const MAX_SLIDES = 100;

export type Visit = {
  slides: number;
  /** The questions slide's index, -1 when the lesson has none. */
  questionsIndex: number;
  start: number;
  current: number;
  furthest: number;
  /** Time on screen, settled up to `since` while visible. */
  visibleMs: number;
  slideMs: number;
  since: number | null;
  sent: Set<string>;
};

export type VisitReport = {
  slides: number;
  start: number;
  furthest: number;
  left: number;
  leftSeconds: number;
  seconds: number;
  questions: boolean;
};

export function startVisit(o: { slides: number; questionsIndex: number; now: number; visible: boolean }): Visit {
  return {
    slides: o.slides,
    questionsIndex: o.questionsIndex,
    start: 0,
    current: 0,
    furthest: 0,
    visibleMs: 0,
    slideMs: 0,
    since: o.visible ? o.now : null,
    sent: new Set(),
  };
}

/** Add the time on screen since the last settle. */
function settle(v: Visit, now: number) {
  if (v.since === null) return;
  const ms = Math.max(0, now - v.since);
  v.visibleMs += ms;
  v.slideMs += ms;
  v.since = now;
}

/**
 * The stage is on slide `index`. Before the student's first move (`begun` false) the stage may
 * still jump on its own (a student who has answered before opens at the questions): that is where
 * the visit STARTS, not progress.
 */
export function moveTo(v: Visit, index: number, now: number, begun: boolean) {
  settle(v, now);
  if (index !== v.current) v.slideMs = 0;
  v.current = index;
  if (!begun) {
    v.start = index;
    v.furthest = index;
  } else if (index > v.furthest) v.furthest = index;
}

export function hide(v: Visit, now: number) {
  settle(v, now);
  v.since = null;
}

export function show(v: Visit, now: number) {
  if (v.since === null) v.since = now;
}

export function report(v: Visit, now: number): VisitReport {
  settle(v, now);
  return {
    slides: v.slides,
    start: v.start + 1,
    furthest: v.furthest + 1,
    left: v.current + 1,
    leftSeconds: Math.floor(v.slideMs / 1000),
    seconds: Math.floor(v.visibleMs / 1000),
    questions: v.questionsIndex >= 0 && v.furthest >= v.questionsIndex,
  };
}

/**
 * The report to send now, or null: too short, already sent for this furthest slide and slide
 * left from (a second hide in the same place writes nothing), or the visit's rows used up.
 */
export function takeSend(v: Visit, now: number): VisitReport | null {
  const r = report(v, now);
  if (r.seconds < MIN_VISIT_SECONDS) return null;
  const key = `${r.furthest}:${r.left}`;
  if (v.sent.has(key) || v.sent.size >= MAX_SENDS_PER_VISIT) return null;
  v.sent.add(key);
  return { ...r, seconds: Math.min(r.seconds, MAX_VISIT_SECONDS), leftSeconds: Math.min(r.leftSeconds, MAX_VISIT_SECONDS) };
}

/** A random id for one visit, so its rows can be read together. */
export function newVisitId(): string {
  const c = globalThis.crypto;
  if (c && typeof c.randomUUID === "function") return c.randomUUID().replace(/-/g, "");
  return Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
}
