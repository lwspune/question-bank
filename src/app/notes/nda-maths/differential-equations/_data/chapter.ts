import type { ChapterNote } from "@/app/notes/_types";

export const DIFFERENTIAL_EQUATIONS_CHAPTER: ChapterNote = {
  chapterName: "Differential Equations",
  title: "Differential Equations — NDA Mathematics",
  intro:
    "Differential Equations is a steady 63-PYQ chapter (2017–2026), ~29% HARD, built on classification plus a fixed toolkit of solving methods. " +
    "The chapter teaches in three movements, ordered so each builds on the last: " +
    "(1) Order, degree, and solutions — how to classify an ODE (order = highest derivative, degree = power of that derivative after clearing radicals) and what a 'solution' means (the number of arbitrary constants equals the order); " +
    "(2) Formation — given a family of curves with arbitrary constants, differentiate to eliminate the constants and recover the ODE; " +
    "(3) Solving and verifying — the methods that actually integrate an ODE: separating variables, reducing by substitution, the integrating factor for linear equations, and the growth/decay and initial-value applications. " +
    "8 concepts, every PYQ tagged. Many questions only ask for order/degree — fast marks — while the HARD ones reward knowing which solving method the equation's shape calls for.",
  subtopicOrder: ["defeq-order-degree", "defeq-formation", "defeq-solving"],
};
