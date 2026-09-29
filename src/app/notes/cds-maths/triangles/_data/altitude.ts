import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TG_ALTITUDE_NOTE: SubtopicNote = {
  subtopicName: "The Altitude to the Hypotenuse",
  title: "The Altitude to the Hypotenuse",
  oneLineDefinition:
    "The perpendicular from the right angle to the hypotenuse is the product of the legs divided by the hypotenuse, and it is the geometric mean of the two pieces it cuts the hypotenuse into.",
  whyItMatters:
    "Twenty-seven PYQs, more than any other page in the chapter, and not one of them is HARD. Two results do all the work: p = ab ÷ c (twice the area, computed two ways) and p² = mn (three similar triangles). Learn which piece of the hypotenuse belongs to which leg and this page is free marks.",
  concepts: [
    // C1 — the length of the altitude
    {
      kind: "formula" as const,
      slug: "cdstg-altitude-length",
      name: "The altitude is leg × leg ÷ hypotenuse",
      intuition:
        "Twice the area of a right triangle is leg times leg. It is also the hypotenuse times the altitude drawn to it. Set the two equal and the altitude drops out.",
      definition:
        "In a right triangle with legs \\(a, b\\) and hypotenuse \\(c\\), the altitude \\(p\\) to the hypotenuse satisfies:\n" +
        "- \\(pc = ab\\), so \\(p = \\dfrac{ab}{c}\\);\n" +
        "- squaring and using \\(c^2 = a^2 + b^2\\): \\(\\dfrac{1}{p^2} = \\dfrac{1}{a^2} + \\dfrac{1}{b^2}\\).\n" +
        "First find which vertex has the right angle; the side opposite it is the hypotenuse.",
      formula: {
        label: "Altitude to the hypotenuse",
        latex: "p = \\dfrac{ab}{c}, \\qquad \\dfrac{1}{p^2} = \\dfrac{1}{a^2} + \\dfrac{1}{b^2}",
      },
      visualizationSlug: "cds-altitude-hypotenuse",
      authoredExample: {
        prompt: "A right triangle has legs \\(9\\) cm and \\(12\\) cm. Find the altitude to its hypotenuse.",
        steps: [
          "The hypotenuse is \\(\\sqrt{81 + 144} = 15\\) cm.",
          "\\(p = \\dfrac{9\\times 12}{15} = \\dfrac{108}{15}\\).",
        ],
        answer: "\\(7.2\\) cm.",
      },
      selfCheckExample: {
        prompt: "Find the altitude to the hypotenuse of a right triangle with legs \\(5\\) and \\(12\\).",
        steps: ["The hypotenuse is \\(13\\), so \\(p = \\dfrac{5\\times 12}{13}\\)."],
        answer: "\\(\\dfrac{60}{13}\\).",
      },
      practiceSet: [
        { prompt: "Legs \\(12\\) and \\(16\\). Altitude to the hypotenuse?", answer: "\\(9.6\\)" },
        { prompt: "Legs \\(15\\) and \\(20\\). Altitude to the hypotenuse?", answer: "\\(12\\)" },
        { prompt: "Legs \\(1\\) and \\(\\sqrt3\\). Altitude to the hypotenuse?", answer: "\\(\\dfrac{\\sqrt3}{2}\\)" },
        { prompt: "Legs \\(3\\) and \\(4\\). Use \\(\\dfrac1{p^2} = \\dfrac1{a^2} + \\dfrac1{b^2}\\) to find \\(p\\).", answer: "\\(\\dfrac{12}{5}\\)" },
      ],
      pyqExampleId: "2b64b02d-8425-4926-bee1-1ab5565bd594", // 2021 (I) — BC 6, CA 8, find p
      traps: [
        {
          title: "Find the right angle first",
          body:
            "'Right-angled at \\(B\\)' makes \\(AC\\) the hypotenuse. If the question gives \\(BC = 10\\) and \\(AC = 12\\) with the right angle at \\(B\\), the missing leg is \\(\\sqrt{144 - 100}\\), not \\(\\sqrt{144 + 100}\\).",
        },
      ],
    },

    // C2 — the geometric-mean relations
    {
      kind: "formula" as const,
      slug: "cdstg-geometric-mean",
      name: "The three similar triangles",
      intuition:
        "The altitude from the right angle cuts the triangle into two smaller right triangles, and all three are similar: each has a right angle, and each shares one acute angle with the big one. Matching sides across the three gives three short formulas.",
      definition:
        "Let \\(ABC\\) be right-angled at \\(A\\), with the altitude \\(AD\\) cutting the hypotenuse into \\(BD = m\\) and \\(DC = n\\):\n" +
        "- \\(AD^2 = BD\\cdot DC\\), i.e. \\(p^2 = mn\\);\n" +
        "- \\(AB^2 = BD\\cdot BC\\) and \\(AC^2 = DC\\cdot BC\\) — each leg with the piece next to it and the whole hypotenuse;\n" +
        "- so \\(BD : DC = AB^2 : AC^2\\), and triangles \\(ABD\\) and \\(ADC\\), which share the height \\(AD\\), have areas in that ratio too.",
      formula: {
        label: "Geometric-mean relations",
        latex: "p^2 = mn, \\qquad AB^2 = m(m + n), \\qquad AC^2 = n(m + n)",
      },
      visualizationSlug: "cds-altitude-hypotenuse",
      authoredExample: {
        prompt: "The altitude from the right angle \\(A\\) cuts the hypotenuse into \\(BD = 4\\) and \\(DC = 9\\). Find \\(AD\\), \\(AB\\) and \\(AC\\).",
        steps: [
          "\\(AD^2 = 4\\times 9 = 36\\), so \\(AD = 6\\).",
          "\\(BC = 13\\): \\(AB^2 = 4\\times 13 = 52\\) and \\(AC^2 = 9\\times 13 = 117\\).",
          "Check: \\(52 + 117 = 169 = 13^2\\).",
        ],
        answer: "\\(AD = 6\\), \\(AB = 2\\sqrt{13}\\), \\(AC = 3\\sqrt{13}\\).",
      },
      selfCheckExample: {
        prompt: "In a right triangle the altitude to the hypotenuse cuts it so that \\(BD = 3.6\\), and \\(BC = 10\\). Find \\(AB\\) and \\(AC\\).",
        steps: [
          "\\(AB^2 = 3.6\\times 10 = 36\\), so \\(AB = 6\\).",
          "\\(AC^2 = 6.4\\times 10 = 64\\), so \\(AC = 8\\).",
        ],
        answer: "\\(AB = 6\\), \\(AC = 8\\).",
      },
      practiceSet: [
        { prompt: "Pieces \\(9\\) and \\(16\\). Altitude?", answer: "\\(12\\)" },
        { prompt: "Pieces \\(2\\) and \\(8\\). Altitude?", answer: "\\(4\\)" },
        { prompt: "Altitude \\(6\\), one piece \\(4\\). The other piece?", answer: "\\(9\\)" },
        { prompt: "\\(AB : AC = 3 : 4\\). Ratio of areas \\(ABD : ADC\\)?", answer: "\\(9 : 16\\)" },
      ],
      pyqExampleId: "ff1aa446-11a1-4332-9c03-77952819a8ad", // 2021 (I) — BD 8, DC 12.5, find AD
      traps: [
        {
          title: "A leg uses its own piece and the WHOLE hypotenuse",
          body:
            "\\(AB^2 = BD\\cdot BC\\), where \\(BD\\) is the piece touching \\(B\\) and \\(BC\\) is the whole hypotenuse. Using \\(BD\\cdot DC\\) gives the altitude, not the leg, and using \\(DC\\) pairs the leg with the wrong piece.",
        },
      ],
    },

    // C3 — altitudes of any triangle
    {
      kind: "formula" as const,
      slug: "cdstg-altitude-any-triangle",
      name: "Altitudes of any triangle",
      intuition:
        "Every side times its own altitude gives the same number, twice the area. So a long side has a short altitude and the other way round: the sides are in the inverse ratio of the altitudes.",
      definition:
        "- \\(h_a = \\dfrac{2\\Delta}{a}\\), and likewise for \\(b\\) and \\(c\\).\n" +
        "- \\(a : b : c = \\dfrac{1}{h_a} : \\dfrac{1}{h_b} : \\dfrac{1}{h_c}\\).\n" +
        "- The smallest altitude stands on the longest side.\n" +
        "- A right triangle inscribed in a circle of radius \\(R\\) has hypotenuse \\(2R\\), so its area is \\(\\dfrac12\\times 2R\\times p\\).",
      formula: {
        label: "Altitude from the area",
        latex: "h_a = \\dfrac{2\\Delta}{a}, \\qquad a : b : c = \\dfrac{1}{h_a} : \\dfrac{1}{h_b} : \\dfrac{1}{h_c}",
      },
      authoredExample: {
        prompt: "The altitudes of a triangle are in the ratio \\(2 : 3 : 4\\). Find the ratio of the sides they stand on.",
        steps: [
          "The sides are in the ratio \\(\\dfrac12 : \\dfrac13 : \\dfrac14\\).",
          "Multiply by \\(12\\): \\(6 : 4 : 3\\).",
        ],
        answer: "\\(6 : 4 : 3\\).",
      },
      selfCheckExample: {
        prompt: "A triangle has sides \\(13\\), \\(14\\), \\(15\\) and area \\(84\\). Find the altitude on the side \\(14\\).",
        steps: ["\\(h = \\dfrac{2\\times 84}{14}\\)."],
        answer: "\\(12\\).",
      },
      practiceSet: [
        { prompt: "Area \\(30\\), side \\(12\\). Altitude on that side?", answer: "\\(5\\)" },
        { prompt: "Altitudes \\(1 : 2 : 3\\). Ratio of the sides?", answer: "\\(6 : 3 : 2\\)" },
        { prompt: "The longest altitude stands on?", answer: "the shortest side" },
        { prompt: "Right triangle in a circle of radius \\(5\\), altitude to the hypotenuse \\(4\\). Area?", answer: "\\(20\\)" },
      ],
      pyqExampleId: "a92d3fa7-63f0-44a8-8f36-fc6dece18cd5", // 2025 (I) — altitudes 3 : 5 : 6
      traps: [
        {
          title: "Inverse, not direct",
          body:
            "Altitudes \\(4 : 5 : 6\\) give sides \\(\\dfrac14 : \\dfrac15 : \\dfrac16 = 15 : 12 : 10\\), not \\(4 : 5 : 6\\). Then reorder to match the sides the question names.",
        },
      ],
    },
  ],
};
