import type { ChapterNote } from "@/app/notes/_types";

export const LIMITS_CONTINUITY_CHAPTER: ChapterNote = {
  chapterName: "Limits & Continuity",
  title: "Limits & Continuity — NDA Mathematics",
  intro:
    "Limits & Continuity is around 81 past-year NDA questions and the gateway to all of calculus — " +
    "every derivative and integral is a limit underneath. The chapter rewards a small, reliable toolkit: " +
    "evaluate a 0/0 limit by factoring, rationalising, or a standard form; handle one-sided limits and " +
    "the greatest-integer / modulus functions where the two sides disagree; and test continuity by " +
    "checking left limit = right limit = the function's value. Work the three notes in order — first the " +
    "evaluation techniques, then one-sided and special-function limits, then continuity and its link to " +
    "differentiability. The traps are predictable: a hidden one-sided mismatch, a greatest-integer jump, " +
    "or assuming an oscillating function like sin(1/x) has a limit.",
  subtopicOrder: [
    "lim-evaluation",
    "lim-one-sided-special",
    "lim-continuity",
  ],
};
