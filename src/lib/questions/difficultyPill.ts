import type { Difficulty } from "./filters";

/**
 * The difficulty pill on a question card. One definition for the bank card
 * and the notes/guide past-question card (2026-10-04 redesign), so the two
 * cannot drift apart.
 */
export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  EASY: "Easy",
  MODERATE: "Moderate",
  HARD: "Hard",
};

export const DIFFICULTY_PILL: Record<Difficulty, string> = {
  EASY: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  MODERATE: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  HARD: "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
};
