import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_QE_SIGNS_NOTE: SubtopicNote = {
  subtopicName: "Perfect Squares, Signs and Location of Roots",
  title: "Perfect Squares, Signs and Location of Roots",
  oneLineDefinition:
    "A quadratic is a perfect square when its discriminant is zero, keeps one sign when the discriminant is negative, and has a root between two numbers when its values there have opposite signs.",
  whyItMatters:
    "Ten PYQs, the harder half of the discriminant questions. The sum and product give the signs of the roots, the value of the quadratic at a point tells you which side of it the roots lie, and 'integer roots' needs the discriminant to be a perfect square.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsqe-perfect-square",
      name: "Perfect squares and expressions of one sign",
      intuition:
        "A quadratic that never crosses the \\(x\\)-axis has the same sign everywhere; one that just touches it is a perfect square. Both are statements about the discriminant.",
      definition:
        "For \\(ax^2 + bx + c\\):\n" +
        "- it is a perfect square \\(\\iff\\) \\(b^2 - 4ac = 0\\) (with \\(a > 0\\));\n" +
        "- it is positive for every \\(x\\) \\(\\iff\\) \\(a > 0\\) and \\(b^2 - 4ac < 0\\);\n" +
        "- it is negative for every \\(x\\) \\(\\iff\\) \\(a < 0\\) and \\(b^2 - 4ac < 0\\).\n" +
        "Collect the \\(x\\) terms first: \\(mx^2 + mx + 8x + 9\\) has \\(b = m + 8\\).",
      formula: {
        label: "Perfect square",
        latex: "ax^2 + bx + c = a\\left(x + \\tfrac{b}{2a}\\right)^2 \\iff b^2 = 4ac",
      },
      authoredExample: {
        prompt: "For what \\(k\\) is \\(kx^2 + 12x + 4\\) a perfect square?",
        steps: ["\\(144 - 16k = 0\\), so \\(k = 9\\), giving \\((3x + 2)^2\\)."],
        answer: "\\(k = 9\\).",
      },
      selfCheckExample: {
        prompt: "For which \\(k\\) is \\(x^2 + kx + 4 > 0\\) for every real \\(x\\)?",
        steps: ["\\(k^2 - 16 < 0\\)."],
        answer: "\\(-4 < k < 4\\).",
      },
      practiceSet: [
        { prompt: "\\(x^2 - 10x + k\\) is a perfect square. \\(k\\)?", answer: "\\(25\\)" },
        { prompt: "\\(4x^2 + kx + 9\\) is a perfect square. \\(k\\)?", answer: "\\(\\pm 12\\)" },
        { prompt: "Is \\(x^2 + x + 1\\) always positive?", answer: "Yes (\\(D = -3\\))" },
        { prompt: "Is \\(-x^2 + 2x - 3\\) always negative?", answer: "Yes (\\(D = -8\\))" },
      ],
      pyqExampleId: "0c02b51e-4699-49b0-9322-3c57d107af62", // 2023 (I) — mx² + mx + 8x + 9 a perfect square
      traps: [
        {
          title: "A perfect square can be zero somewhere",
          body:
            "\\((x - 2)^2\\) is a perfect square but not positive for EVERY \\(x\\): it is \\(0\\) at \\(x = 2\\). 'Positive for all \\(x\\)' needs \\(D < 0\\), strictly.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsqe-sign-location",
      name: "Signs, integer roots and roots between two numbers",
      intuition:
        "The product of the roots says whether they have the same sign; the sum says which. For location, an upward parabola is negative only between its roots, so its value at a point tells you whether the point lies between them.",
      definition:
        "For real roots of \\(ax^2 + bx + c = 0\\):\n" +
        "- opposite signs \\(\\iff \\dfrac ca < 0\\);\n" +
        "- both positive \\(\\iff \\dfrac ca > 0\\) and \\(-\\dfrac ba > 0\\); both negative \\(\\iff \\dfrac ca > 0\\) and \\(-\\dfrac ba < 0\\).\n" +
        "- For \\(a > 0\\), \\(f(k) < 0\\) means \\(k\\) lies between the roots. One root in \\((p, q)\\) and the other in \\((q, r)\\): \\(f(p) > 0\\), \\(f(q) < 0\\), \\(f(r) > 0\\).\n" +
        "- Integer roots need the discriminant to be a perfect square.",
      formula: {
        label: "A point between the roots",
        latex: "a > 0,\\ f(k) < 0 \\;\\Rightarrow\\; \\alpha < k < \\beta",
      },
      authoredExample: {
        prompt: "For how many integers \\(\\lambda\\) does \\(x^2 - 6x + \\lambda = 0\\) have one root in \\((1, 3)\\) and the other in \\((3, 5)\\)?",
        steps: [
          "\\(f(1) = \\lambda - 5 > 0\\), \\(f(3) = \\lambda - 9 < 0\\), \\(f(5) = \\lambda - 5 > 0\\).",
          "So \\(5 < \\lambda < 9\\): \\(\\lambda = 6, 7, 8\\).",
        ],
        answer: "\\(3\\).",
      },
      selfCheckExample: {
        prompt: "Do the roots of \\(2x^2 - 7x - 4 = 0\\) have the same sign?",
        steps: ["The product is \\(-2 < 0\\)."],
        answer: "No; one is positive and one negative (\\(4\\) and \\(-\\dfrac12\\)).",
      },
      practiceSet: [
        { prompt: "Signs of the roots of \\(x^2 + 5x + 6 = 0\\)?", answer: "Both negative" },
        { prompt: "Signs of the roots of \\(x^2 - 7x + 10 = 0\\)?", answer: "Both positive" },
        { prompt: "\\(x^2 - 4x - 1\\) at \\(x = 0\\) is \\(-1\\). Is \\(0\\) between the roots?", answer: "Yes" },
        { prompt: "Does \\(x^2 + x - 3 = 0\\) have integer roots?", answer: "No (\\(D = 13\\))" },
      ],
      pyqExampleId: "533b81e7-77f8-4dce-87d1-0e086f9895dc", // 2016 (II) — one root in (1, 2), the other in (2, 3)
      traps: [
        {
          title: "Opposite signs does not need D > 0 separately",
          body:
            "If \\(\\dfrac ca < 0\\), then \\(b^2 - 4ac > 0\\) automatically, since \\(-4ac\\) is positive. A statement giving \\(D > 0\\) adds nothing to a product condition.",
        },
      ],
    },
  ],
};
