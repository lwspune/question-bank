import type { ChapterNote } from "@/app/notes/_types";

export const DEFINITE_INTEGRATION_CHAPTER: ChapterNote = {
  chapterName: "Definite Integration",
  title: "Definite Integration — NDA Mathematics",
  intro:
    "Definite Integration is a high-yield, rising chapter in NDA Maths — 66 PYQs across 2017–2026, ~20% HARD, " +
    "and built on a small set of powerful tricks rather than brute-force antidifferentiation. The chapter teaches in five movements: " +
    "(1) Fundamental theorem, periodic integrals, and Leibniz rule — what a definite integral IS and the shortcuts for derivatives, periods, and variable limits; " +
    "(2) Properties — symmetry, King's property, and odd/even — the heart of the chapter and its HARD pocket, where the 'add the integral to its own reflection' move evaluates integrals you could never antidifferentiate; " +
    "(3) Integration of absolute value, piecewise, and greatest-integer functions — split at the break-points and integrate each piece; " +
    "(4) Area under curves — the geometric reading of the integral; " +
    "(5) Definite integrals in function conditions — recovering unknown coefficients from integral equations. " +
    "11 concepts, every PYQ tagged. This chapter assumes you can already find antiderivatives — for substitution, by-parts, and partial fractions, see the Indefinite Integration notes; here the focus is the definite-integral-specific machinery.",
  subtopicOrder: [
    "defint-ftc",
    "defint-properties",
    "defint-piecewise",
    "defint-area",
    "defint-function-conditions",
  ],
};
