import type { ChapterNote } from "@/app/notes/_types";

export const LAWS_OF_MOTION_CHAPTER: ChapterNote = {
  chapterName: "Laws of Motion and Forces",
  title: "Laws of Motion and Forces — NDA Physics",
  intro:
    "Laws of Motion is one of NDA Physics's most reliably-tested chapters — roughly 41 PYQs across 2018–2026, almost entirely EASY and MODERATE (only ~10% HARD). " +
    "The chapter teaches in five progressive movements: " +
    "(1) Types of forces — fundamental vs contact, conservative vs non-conservative, and the equilibrium types; the vocabulary the rest of the chapter assumes; " +
    "(2) Newton's three laws — inertia, F = ma, action-reaction, plus combining forces into a resultant (the chapter's single HARD-heavy idea); " +
    "(3) Impulse and momentum — p = mv, impulse = change in momentum, and the cushioning principle (why a fielder pulls his hands back); " +
    "(4) Conservation of momentum and collisions — recoil, the rate-of-change-of-mass force, and equal-mass elastic collisions; " +
    "(5) Friction — f = μN, the static > kinetic > rolling ordering, and stopping a moving block. " +
    "Most marks come from one-line recall and a single F = ma / p = mv substitution — drill the formula, drill the trap, walk out with the marks.",
  subtopicOrder: [
    "lmf-types-of-forces",
    "lmf-newtons-laws",
    "lmf-momentum-and-impulse",
    "lmf-conservation-and-collisions",
    "lmf-friction",
  ],
};
