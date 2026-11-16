import { CLEAR_ACCURACY, levelById, type LevelId } from "./levels";
import type { Problem } from "./generate";

/**
 * One /play round as a pure state machine. The page owns the clock and the
 * keypad; every rule worth testing is here.
 */

export type Mistake = { prompt: string; answer: number; given: number };

export type RunState = {
  level: LevelId;
  correct: number;
  wrong: number;
  /** Right answers in a row, now. */
  streak: number;
  bestStreak: number;
  points: number;
  /** Ms into the round of each right answer: the ghost of a best round. */
  correctTimes: number[];
  mistakes: Mistake[];
};

export type RunResult = {
  level: LevelId;
  correct: number;
  wrong: number;
  /** 0..1; 0 when nothing was answered. */
  accuracy: number;
  points: number;
  bestStreak: number;
  cleared: boolean;
  correctTimes: number[];
};

export const POINTS_PER_RIGHT = 10;
const COMBO_STEP = 5;
const MAX_MULTIPLIER = 4;

export function startRun(level: LevelId): RunState {
  return { level, correct: 0, wrong: 0, streak: 0, bestStreak: 0, points: 0, correctTimes: [], mistakes: [] };
}

/** The combo: the multiplier for the right answer that makes the streak `streak` long. */
export function multiplierFor(streak: number): number {
  return Math.min(MAX_MULTIPLIER, 1 + Math.floor((streak - 1) / COMBO_STEP));
}

/**
 * The answer checks itself once as many digits as the answer has are typed, so
 * there is no Enter key. It tells the student the answer's length, which is
 * what every speed-maths game does: the skill is the sum, not the length.
 */
export function shouldSubmit(typed: string, answer: number): boolean {
  return typed.length > 0 && typed.length >= String(answer).length;
}

export function answer(state: RunState, problem: Problem, given: number, atMs: number): RunState {
  if (given === problem.answer) {
    const streak = state.streak + 1;
    return {
      ...state,
      correct: state.correct + 1,
      streak,
      bestStreak: Math.max(state.bestStreak, streak),
      points: state.points + POINTS_PER_RIGHT * multiplierFor(streak),
      // Whole ms: the browser clock gives fractions, and progress stores counts.
      correctTimes: [...state.correctTimes, Math.round(atMs)],
    };
  }
  return {
    ...state,
    wrong: state.wrong + 1,
    streak: 0,
    mistakes: [...state.mistakes, { prompt: problem.prompt, answer: problem.answer, given }],
  };
}

export function finishRun(state: RunState): RunResult {
  const answered = state.correct + state.wrong;
  const accuracy = answered === 0 ? 0 : state.correct / answered;
  const target = levelById(state.level)?.target ?? Infinity;
  return {
    level: state.level,
    correct: state.correct,
    wrong: state.wrong,
    accuracy,
    points: state.points,
    bestStreak: state.bestStreak,
    cleared: state.correct >= target && accuracy >= CLEAR_ACCURACY,
    correctTimes: state.correctTimes,
  };
}

/** Growth-framed: what went well and what is next, never a bare score. */
export function feedbackLine(r: RunResult): string {
  if (r.correct + r.wrong === 0) return "Type the answer on the keypad. It checks itself, no Enter needed.";
  const pct = Math.round(r.accuracy * 100);
  if (r.cleared) return `Level cleared: ${r.correct} right at ${pct}%.`;
  const target = levelById(r.level)?.target ?? 0;
  const short = Math.max(0, target - r.correct);
  const accurate = r.accuracy >= CLEAR_ACCURACY;
  if (short > 0 && accurate) return `${short} more right ${short === 1 ? "answer" : "answers"} and you clear this level.`;
  if (short === 0) return `Fast! Now aim for 80% right. You were at ${pct}%.`;
  return `${short} more right ${short === 1 ? "answer" : "answers"}, at 80% right or better, clears this level. You were at ${pct}%.`;
}

/** Right answers the best round had given by `atMs`: the ghost runner. */
export function ghostCountAt(times: readonly number[], atMs: number): number {
  let n = 0;
  for (const t of times) if (t <= atMs) n++;
  return n;
}
