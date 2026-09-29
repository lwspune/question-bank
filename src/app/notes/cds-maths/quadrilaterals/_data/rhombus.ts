import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_QU_RHOMBUS_NOTE: SubtopicNote = {
  subtopicName: "Rhombus and Kite",
  title: "Rhombus and Kite",
  oneLineDefinition:
    "A rhombus's diagonals bisect each other at right angles; a kite's diagonals are also perpendicular, so both have area half the product of the diagonals.",
  whyItMatters:
    "Eight PYQs, none HARD. Every one uses the right triangle made by half of each diagonal and a side: side² = (d₁/2)² + (d₂/2)², so d₁² + d₂² = 4 × side². Three are data-sufficiency items, and in two of them the question's own data decide the answer before either statement is read.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsqu-rhombus",
      name: "Diagonals, side and area",
      intuition:
        "The two diagonals cross at right angles and halve each other, splitting the rhombus into four congruent right triangles. Each has the half-diagonals as legs and a side as hypotenuse.",
      definition:
        "- Rhombus: diagonals are perpendicular bisectors of each other. \\(s^2 = \\left(\\dfrac{d_1}{2}\\right)^2 + \\left(\\dfrac{d_2}{2}\\right)^2\\), so \\(d_1^2 + d_2^2 = 4s^2\\).\n" +
        "- Area \\(= \\dfrac12 d_1 d_2\\) (also \\(s^2\\sin\\theta\\)).\n" +
        "- A diagonal equal to the side: the rhombus is two equilateral triangles, with diagonals \\(s\\) and \\(s\\sqrt3\\).\n" +
        "- Kite (\\(AB = BC\\), \\(CD = DA\\)): the diagonals are perpendicular, so area \\(= \\dfrac12 d_1 d_2\\) too.",
      formula: {
        label: "Rhombus",
        latex: "d_1^2 + d_2^2 = 4s^2, \\qquad S = \\tfrac12 d_1 d_2",
      },
      authoredExample: {
        prompt: "A rhombus has area \\(120\\) cm\\(^2\\) and one diagonal \\(10\\) cm. Find its perimeter.",
        steps: ["\\(\\dfrac12 \\times 10 \\times d_2 = 120\\), so \\(d_2 = 24\\).", "Side \\(= \\sqrt{5^2 + 12^2} = 13\\)."],
        answer: "\\(52\\) cm.",
      },
      selfCheckExample: {
        prompt: "A kite has diagonals \\(9\\) cm and \\(14\\) cm. Find its area.",
        steps: ["The diagonals are perpendicular."],
        answer: "\\(63\\) cm\\(^2\\).",
      },
      practiceSet: [
        { prompt: "Diagonals \\(16\\) and \\(30\\). Side?", answer: "\\(17\\)" },
        { prompt: "Side \\(5\\). \\(d_1^2 + d_2^2\\)?", answer: "\\(100\\)" },
        { prompt: "Diagonals in ratio \\(3 : 4\\), sum \\(14\\). Area?", answer: "\\(24\\)" },
        { prompt: "One diagonal equals the side \\(s\\). The other?", answer: "\\(s\\sqrt3\\)" },
      ],
      pyqExampleId: "790d3e39-91e5-4bd5-8ae6-a3e454ab8dba", // 2022 (II) — area 96 cm², one diagonal 12 cm, perimeter
      traps: [
        {
          title: "Half-diagonals are the legs",
          body:
            "The right triangle uses HALF of each diagonal. Diagonals of \\(10\\) and \\(24\\) give a side of \\(13\\), not \\(26\\).",
        },
        {
          title: "The side alone can be enough",
          body:
            "Given the side, \\(d_1^2 + d_2^2 = 4s^2\\) is fixed for EVERY rhombus. In data-sufficiency items that means no statement is needed.",
        },
      ],
    },
  ],
};
