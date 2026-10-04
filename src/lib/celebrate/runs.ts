/**
 * "Right in a row" on the bank and the board reader — the pure core
 * (2026-10-04, the user's motivation-layer brief).
 *
 * WHAT COUNTS. Only a student's FIRST act on a question, and only when that act
 * was picking an option that can be graded. A pick after "Show answer", a
 * re-pick after seeing the key, or a second visit to the same card is not an
 * attempt, so it neither adds to a run nor breaks one. Without this a run could
 * be built by revealing first and tapping the key second — praise for reading.
 *
 * WHY A WRONG ANSWER IS SILENT. A run ends without a word. The engagement gate
 * forbids streak mechanics because a broken-looking count shown on every visit
 * demotivates; a run that only ever SPEAKS on success, and lives only for the
 * page session, cannot show one.
 *
 * Levels: 3, 5, 10, then every 10 (the user's call, 2026-10-04). Measured on the
 * first two days of bank verdicts: 8 of 16 answering students reached 3, two
 * reached 5, one reached 10 — so 3 is common and the rest still mean something.
 *
 * Pure: the client store that calls this lives in components/celebrate.
 * Spec: tests/celebrate-runs.test.ts.
 */

export type RunState = {
  /** Right answers in a row, first acts only. */
  length: number;
  /** The one topic every answer in the run shares, or null once they differ. */
  topic: string | null;
};

export const EMPTY_RUN: RunState = { length: 0, topic: null };

export type RunInput = {
  /** True only for the student's first act on this question this session. */
  firstAct: boolean;
  /** The verdict, or null when the act carried none (a reveal, an ungradable row). */
  correct: boolean | null;
  /** Chapter (or subtopic) name, for the message. */
  topic: string | null;
};

export function isRunLevel(n: number): boolean {
  return n === 3 || n === 5 || (n >= 10 && n % 10 === 0);
}

export function stepRun(
  state: RunState,
  input: RunInput
): { state: RunState; level: number | null; topic: string | null } {
  if (!input.firstAct || input.correct === null) return { state, level: null, topic: state.topic };
  if (!input.correct) return { state: EMPTY_RUN, level: null, topic: null };

  const length = state.length + 1;
  const topic = state.length === 0 ? input.topic : state.topic === input.topic ? state.topic : null;
  const next: RunState = { length, topic };
  return { state: next, level: isRunLevel(length) ? length : null, topic };
}

/** The message, in plain words: what they did, on what. No streak, no points. */
export function runMessage(level: number, topic: string | null): string {
  return topic ? `${level} right in a row on ${topic}.` : `${level} right in a row.`;
}
