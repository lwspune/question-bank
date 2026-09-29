import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TG_SINE_COSINE_NOTE: SubtopicNote = {
  subtopicName: "Sine and Cosine Rules",
  title: "Sine and Cosine Rules",
  oneLineDefinition:
    "The sides of a triangle are in the ratio of the sines of the opposite angles, and the cosine rule gives a side from the other two and the angle between them.",
  whyItMatters:
    "Six PYQs, three of them HARD. The sine rule turns an angle ratio into a side ratio, the cosine rule handles a 60° or 120° angle, and splitting the area with ½ab sin C finds a line drawn from a vertex. These are the only places where CDS Triangles leans on trigonometry.",
  concepts: [
    // C1 — the sine rule
    {
      kind: "formula" as const,
      slug: "cdstg-sine-rule",
      name: "The sine rule",
      intuition:
        "Draw the circumcircle. Every side is a chord, and a chord facing an angle \\(A\\) at the circle has length \\(2R\\sin A\\). So each side is \\(2R\\) times the sine of the angle opposite it.",
      definition:
        "- \\(\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C} = 2R\\), where \\(R\\) is the circumradius.\n" +
        "- So \\(a : b : c = \\sin A : \\sin B : \\sin C\\).\n" +
        "- Angles \\(30^\\circ, 30^\\circ, 120^\\circ\\) give sides \\(1 : 1 : \\sqrt3\\); angles \\(30^\\circ, 60^\\circ, 90^\\circ\\) give \\(1 : \\sqrt3 : 2\\); angles \\(36^\\circ, 72^\\circ, 72^\\circ\\) give base : leg \\(= \\dfrac{\\sqrt5 - 1}{2}\\).",
      formula: {
        label: "Sine rule",
        latex: "\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C} = 2R",
      },
      visualizationSlug: "pt-triangle-labeled",
      authoredExample: {
        prompt: "In triangle \\(ABC\\), \\(A = 45^\\circ\\), \\(B = 60^\\circ\\) and \\(a = 2\\sqrt2\\). Find \\(b\\).",
        steps: [
          "\\(b = \\dfrac{a\\sin B}{\\sin A} = \\dfrac{2\\sqrt2\\cdot\\frac{\\sqrt3}{2}}{\\frac{1}{\\sqrt2}}\\).",
          "\\(= 2\\sqrt2\\cdot\\dfrac{\\sqrt3}{2}\\cdot\\sqrt2 = 2\\sqrt3\\).",
        ],
        answer: "\\(b = 2\\sqrt3\\).",
      },
      selfCheckExample: {
        prompt: "A triangle has circumradius \\(6\\) and \\(\\angle A = 30^\\circ\\). Find \\(BC\\).",
        steps: ["\\(BC = 2R\\sin A = 12\\times\\dfrac12\\)."],
        answer: "\\(6\\).",
      },
      practiceSet: [
        { prompt: "Angles \\(45^\\circ, 45^\\circ, 90^\\circ\\). Ratio of the sides?", answer: "\\(1 : 1 : \\sqrt2\\)" },
        { prompt: "\\(B = 90^\\circ\\), \\(R = 5\\). Find \\(b\\).", answer: "\\(10\\)" },
        { prompt: "\\(A = 30^\\circ\\), \\(B = 90^\\circ\\). \\(a : b\\)?", answer: "\\(1 : 2\\)" },
        { prompt: "Angles \\(30^\\circ, 60^\\circ, 90^\\circ\\). Ratio of the sides?", answer: "\\(1 : \\sqrt3 : 2\\)" },
      ],
      pyqExampleId: "355f7dbf-8e56-455d-9afb-8a922fff0a47", // 2019 (II) — angles 1 : 1 : 4, perimeter k times largest side
      traps: [
        {
          title: "Sines, not angles",
          body:
            "Angles in the ratio \\(1 : 2 : 3\\) give sides \\(\\sin 30^\\circ : \\sin 60^\\circ : \\sin 90^\\circ = 1 : \\sqrt3 : 2\\), not \\(1 : 2 : 3\\).",
        },
      ],
    },

    // C2 — the cosine rule and the sine area formula
    {
      kind: "formula" as const,
      slug: "cdstg-cosine-rule",
      name: "The cosine rule and ½ab sin C",
      intuition:
        "The cosine rule is Pythagoras with a correction for an angle that is not \\(90^\\circ\\): subtract when the angle is acute, add when it is obtuse. The area formula \\(\\dfrac12 ab\\sin C\\) lets a triangle be cut along a line from a vertex into two pieces whose areas add up.",
      definition:
        "- \\(a^2 = b^2 + c^2 - 2bc\\cos A\\).\n" +
        "- \\(A = 60^\\circ\\): \\(a^2 = b^2 + c^2 - bc\\). \\(A = 120^\\circ\\): \\(a^2 = b^2 + c^2 + bc\\). \\(A = 90^\\circ\\): Pythagoras.\n" +
        "- **Area:** \\(\\Delta = \\dfrac12 bc\\sin A\\). If a line \\(CD\\) from \\(C\\) splits \\(\\angle C\\) into two parts, the areas of the two pieces add to the whole, which gives an equation for \\(CD\\).",
      formula: {
        label: "Cosine rule and area",
        latex: "a^2 = b^2 + c^2 - 2bc\\cos A, \\qquad \\Delta = \\tfrac12 bc\\sin A",
      },
      authoredExample: {
        prompt: "In triangle \\(ABC\\), \\(b = 5\\), \\(c = 8\\) and \\(A = 60^\\circ\\). Find \\(a\\).",
        steps: [
          "\\(a^2 = 25 + 64 - 2\\cdot 5\\cdot 8\\cdot\\dfrac12 = 89 - 40 = 49\\).",
        ],
        answer: "\\(a = 7\\).",
      },
      selfCheckExample: {
        prompt: "In triangle \\(ABC\\), \\(b = 3\\), \\(c = 5\\) and \\(A = 120^\\circ\\). Find \\(a\\).",
        steps: ["\\(\\cos 120^\\circ = -\\dfrac12\\), so \\(a^2 = 9 + 25 + 15 = 49\\)."],
        answer: "\\(a = 7\\).",
      },
      practiceSet: [
        { prompt: "Equilateral triangle of side \\(4\\); \\(D\\) on \\(BC\\) with \\(BD = 1\\). \\(AD^2\\)?", answer: "\\(13\\)" },
        { prompt: "\\(b = 4\\), \\(c = 6\\), \\(A = 30^\\circ\\). Area?", answer: "\\(6\\)" },
        { prompt: "\\(A = 60^\\circ\\). \\(AB^2 + AC^2 - BC^2\\) equals?", answer: "\\(AB\\cdot AC\\)" },
        { prompt: "\\(A = 90^\\circ\\). The cosine rule becomes?", answer: "\\(a^2 = b^2 + c^2\\)" },
      ],
      pyqExampleId: "e5c21bb0-d1f1-4002-942d-a36373ef1dce", // 2020 (II) — equilateral, BC trisected: AD² : AB²
      traps: [
        {
          title: "cos 120° is negative",
          body:
            "At \\(120^\\circ\\) the term \\(-2bc\\cos A\\) becomes \\(+bc\\), so the opposite side is longer than Pythagoras would give. Dropping the sign gives the \\(60^\\circ\\) answer, which is always an option.",
        },
      ],
    },
  ],
};
