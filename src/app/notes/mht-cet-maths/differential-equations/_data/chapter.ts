import type { ChapterNote } from "@/app/notes/_types";

export const DIFFERENTIAL_EQUATIONS_CHAPTER: ChapterNote = {
  chapterName: "Differential Equations",
  title: "Differential Equations — MHT-CET Maths",
  intro:
    "Differential Equations is one of the largest chapters in MHT-CET Maths — 144 PYQs across 2021–2025 — and it is almost " +
    "pure method: recognise the type of first-order equation in front of you, then apply the matching recipe. The whole chapter " +
    "turns on that recognition step. It teaches in six movements, each building on the last: " +
    "(1) Order, Degree, Formation & Verification — read a DE's structure (order = highest derivative, degree = its power after " +
    "clearing radicals), form the DE of a curve family by eliminating its arbitrary constants (n constants ⇒ order n), and verify a given solution; " +
    "(2) Variable-Separable Equations — the workhorse: get all the y's on one side, all the x's on the other, and integrate; " +
    "(3) Homogeneous & Reducible Equations — the y = vx substitution for same-degree equations, plus the v = x + y / v = y/x substitutions that reduce a disguised equation to separable; " +
    "(4) Linear Equations (Integrating Factor) — the standard form dy/dx + P(x)y = Q(x), the integrating factor IF = e^∫P dx, the reciprocal 'linear in x' form, Bernoulli's substitution, and exact grouping; " +
    "(5) Growth, Decay & Continuous Models — dP/dt = kP for population/bacteria/radioactive-decay/continuous-compounding, plus the special-rate models; " +
    "(6) Newton's Law of Cooling — the dθ/dt = −k(θ − θₛ) model and its two-stage problems. " +
    "Every PYQ is tagged — learn the pattern, drill the bank, recover the marks.",
  subtopicOrder: [
    "order-degree-formation",
    "variable-separable",
    "homogeneous-reducible",
    "linear-integrating-factor",
    "growth-decay-models",
    "newtons-law-cooling",
  ],
};
