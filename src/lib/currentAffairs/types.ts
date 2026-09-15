/**
 * Shapes for the Current-Affairs pool pipeline.
 *
 * A "pool" is the batch of Current-Affairs questions authored ahead of one
 * sitting (e.g. `Current Affairs_Sep26.docx`, 88 rows, ingested 2026-08-21).
 * Papers draw from it via the `sourceFile` pin in `scripts/bank-paper/build.ts`.
 *
 * Nothing here decides WHAT to author — that is `blueprint.ts`, and it derives
 * its answer from the Current-Affairs PYQ history rather than from a hand-typed
 * table, so the target re-derives as the bank grows.
 */

/**
 * Does the question name a point in time, or is it a standing fact?
 *
 * This axis exists because it was the larger of the two misses on the Sep-2026
 * pool. Measured over 191 NDA Current-Affairs PYQs (2017-2026), **40.3% carry
 * no year token at all** — they are named-entity lookups (REJUPAVE, PM MITRA
 * Parks, Seva Bhoj Yojana, UDAN, Square Kilometre Array). The Sep-2026 pool ran
 * 19%. Four of the eleven questions NDA II 2026 actually asked are that shape
 * (Ramanujan Fellowship, International Big Cat Alliance, Neighbourhood First
 * Policy, River Basin Management), and no amount of widening the news window
 * would have produced one.
 */
export type CaGenre = "dated" | "evergreen";

/**
 * A date referenced by a question, at whatever precision the text gives.
 *
 * `month` is NULL when the text says only a year, and that NULL is load-bearing:
 * defaulting it to January (or to June, or to December) turns "somewhere in
 * 2025" into an assertion the source never made, and the window check then
 * reports a confident verdict on invented precision. `windowVerdict` handles the
 * imprecision explicitly instead, by returning "partial".
 */
export interface EventDate {
  year: number;
  /** 1-12, or null when the text gives only a year. */
  month: number | null;
}

/** An inclusive month-precision span. Exam dates are known only to the month. */
export interface MonthSpan {
  /** Months since year 0, i.e. `year * 12 + month`. */
  fromIndex: number;
  toIndex: number;
}

/** How far before the exam an event falls. A span, because a bare year is a span. */
export interface EventLag {
  minMonths: number;
  maxMonths: number;
}

/** Whether an event falls inside the authoring window. */
export type WindowVerdict =
  /** Entirely inside. */
  | "in"
  /** A bare year that straddles a boundary — genuinely undecidable from the text. */
  | "partial"
  /** Entirely outside: too old, or fresher than the paper-setting ceiling. */
  | "out";

/** One Current-Affairs question, as both the blueprint and the audit read it. */
export interface CaRow {
  id: string;
  /** Chapter NAME, not id — the blueprint is reported to humans. */
  chapter: string;
  text: string;
  solution: string | null;
  /** Present on PYQ rows, null on authored pool rows. */
  pyqYear: number | null;
  /** 'Apr' | 'Sep' on NDA. Null on authored pool rows. */
  pyqMonth: string | null;
  sourceFile: string | null;
}

/** Per-chapter weights derived from the PYQ history. */
export interface ChapterWeight {
  chapter: string;
  pyqCount: number;
  /** Fraction of all Current-Affairs PYQs, 0..1. */
  share: number;
  /** Fraction of this chapter's PYQs carrying no year token, 0..1. */
  evergreenRate: number;
}

export interface Blueprint {
  totalPyq: number;
  /** Distinct (year, month) sittings the history spans. */
  sittings: number;
  chapters: ChapterWeight[];
  /** Bank-wide evergreen fraction, 0..1. */
  evergreenRate: number;
}

/** One chapter's slot allocation for a pool of a given size. */
export interface Seat {
  chapter: string;
  total: number;
  evergreen: number;
  dated: number;
}

export interface ChapterScore {
  chapter: string;
  target: number;
  actual: number;
  delta: number;
  targetEvergreen: number;
  actualEvergreen: number;
}

export interface PoolScore {
  poolSize: number;
  chapters: ChapterScore[];
  genre: { targetRate: number; actualRate: number };
  window: {
    in: number;
    partial: number;
    out: number;
    /** Evergreen rows have no date to place, so they are counted, never judged. */
    undated: number;
  };
  /** Human-readable triage lines. Never a pass/fail — see `audit.ts`. */
  findings: string[];
}
