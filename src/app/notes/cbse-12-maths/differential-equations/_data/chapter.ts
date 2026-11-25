import type { ChapterNote } from "@/app/notes/_types";

export const CB_MA_DE_CHAPTER: ChapterNote = {
  chapterName: "Differential Equations",
  title: "Differential Equations: CBSE Class 12 Mathematics",
  intro:
    "Differential Equations has 268 questions in this bank: every example and exercise of the NCERT chapter, and CBSE's board papers from 2022 to 2026. " +
    "One hundred and forty-one of them come from board papers, and sixty-one of those are one-mark MCQs, mostly on order and degree and on the integrating factor. " +
    "The written questions ask you to solve an equation by one of the three methods, separating the variables, putting y = vx in a homogeneous equation, or the integrating factor for a linear equation, often with a condition that gives a particular solution. Case studies have used growing bacteria, a cooling processor, an evaporating camphor tablet and, in 2023, a homogeneous equation." +
    "Marks go to the steps: the separated form, the substitution with dy/dx = v + x dv/dx, the standard form and its integrating factor, one constant of integration, and the final answer in x and y. " +
    "Forming a differential equation from a family of curves is no longer in the NCERT chapter. " +
    "In an assertion-reason item, code (D) in Mathematics means the Assertion is false and the Reason is true.",
  cardBlurb:
    "Order and degree, verifying a solution, general and particular solutions, and the three methods: separating the variables, homogeneous equations with y = vx, and linear equations with the integrating factor.",
  subtopicOrder: [
    "cbm-de-order",
    "cbm-de-solutions",
    "cbm-de-separable",
    "cbm-de-homogeneous",
    "cbm-de-linear",
  ],
};
