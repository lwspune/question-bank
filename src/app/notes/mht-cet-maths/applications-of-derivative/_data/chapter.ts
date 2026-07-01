import type { ChapterNote } from "@/app/notes/_types";

export const APPLICATIONS_OF_DERIVATIVE_CHAPTER: ChapterNote = {
  chapterName: "Applications of Derivative",
  title: "Applications of Derivative — MHT-CET Maths",
  intro:
    "Applications of Derivative is the largest single chapter in MHT-CET Maths — 183 PYQs across 2021–2025 — and it is where " +
    "the derivative stops being an abstract limit and starts doing work: finding slopes, estimating values, tracking rates, and " +
    "locating the best-possible answer. Everything rests on one idea — dy/dx is the slope of the curve at a point — read seven " +
    "ways. The chapter teaches in seven movements, each building on the tools before it: " +
    "(1) Tangents, Normals & the Slope of a Curve — the tangent/normal line equations, parametric slopes, the recurring " +
    "\"normal parallel to a given line\" and \"curve touches an axis\" problems; " +
    "(2) Angle Between Curves & Orthogonality — the tanθ = |(m₁−m₂)/(1+m₁m₂)| formula and the m₁m₂ = −1 right-angle condition; " +
    "(3) Approximations using Differentials — dy = f'(x)dx and f(a+h) ≈ f(a) + h·f'(a) for roots, powers, trig and log values; " +
    "(4) Rate of Change & Related Rates — the chain dQ/dt = (dQ/dx)(dx/dt), the sphere/cone/ladder templates, and rectilinear motion; " +
    "(5) Increasing & Decreasing Functions — the sign of f'(x), the discriminant test for monotone-everywhere, and rational/trig/composite sign analysis; " +
    "(6) Maxima, Minima & Optimisation — the first- and second-derivative tests, the extreme-value-at-a-given-point family, constrained-set extrema, and the classic optimisation word problems (tank, poster, wire-cut, number-splitting, AM-GM); " +
    "(7) Rolle's Theorem & the Mean Value Theorem — the two existence theorems, finding c, and solving for parameters from the hypotheses. " +
    "Every PYQ is tagged — learn the pattern, drill the bank, recover the marks.",
  subtopicOrder: [
    "tangents-normals",
    "angle-between-curves",
    "approximations",
    "rate-of-change",
    "increasing-decreasing",
    "maxima-minima",
    "rolle-mvt",
  ],
};
