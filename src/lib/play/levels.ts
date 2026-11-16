/**
 * /play, the calculation game (2026-11-16): its levels. Basic whole-number
 * calculation, easiest first, because that is where the owner sees students
 * slip in class. Each level is a 60-second round; a level is CLEARED by a round
 * with `target`+ right answers at 80%+ right, which opens the next one
 * (mastery before progression, ENGAGEMENT_SPEC's gate).
 *
 * The targets are a first guess. Tune them from play_round rows (migration
 * 0267) once real rounds come in: a level almost nobody clears, or one nearly
 * everybody clears on the first try, has the wrong number.
 */

export const ROUND_MS = 60_000;
export const CLEAR_ACCURACY = 0.8;

export type LevelId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type Level = {
  id: LevelId;
  name: string;
  /** One line on the level card: what the sums look like. */
  blurb: string;
  /** Right answers in one round that clear the level (at 80%+ right). */
  target: number;
};

export const LEVELS: readonly Level[] = [
  { id: 1, name: "Add and subtract", blurb: "Numbers up to 20, like 14 + 7", target: 20 },
  { id: 2, name: "Tables to 10", blurb: "Like 7 × 8", target: 20 },
  { id: 3, name: "Divide", blurb: "Tables to 10 backwards, like 56 ÷ 7", target: 18 },
  { id: 4, name: "Two-digit add and subtract", blurb: "Like 47 + 38 and 91 − 56", target: 14 },
  { id: 5, name: "Tables to 20", blurb: "Like 17 × 6", target: 14 },
  { id: 6, name: "Bigger times and divide", blurb: "Like 48 × 7 and 432 ÷ 8", target: 10 },
  { id: 7, name: "Order of operations", blurb: "Like 6 + 4 × 7 and (8 + 5) × 3", target: 10 },
  { id: 8, name: "Two-digit times two-digit", blurb: "Like 34 × 17", target: 6 },
];

export function levelById(id: unknown): Level | undefined {
  return typeof id === "number" && Number.isInteger(id) ? LEVELS.find((l) => l.id === id) : undefined;
}
