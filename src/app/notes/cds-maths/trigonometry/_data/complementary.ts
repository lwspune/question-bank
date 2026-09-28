import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TR_COMPLEMENTARY_NOTE: SubtopicNote = {
  subtopicName: "Complementary and Allied Angles",
  title: "Complementary Angles",
  oneLineDefinition:
    "The sine of an angle is the cosine of its complement, and likewise tangent and cotangent, secant and cosecant — so angles that add to 90° cancel, pair off, or collapse to 1.",
  whyItMatters:
    "Twenty-one PYQs, nearly all MODERATE and nearly all one idea: spot the pairs of angles that add to 90° and replace one ratio of each pair by its co-ratio. The long products and sums that look fearsome — tan 1° tan 2° … tan 89° — are the easiest marks on the page once the pairing is seen.",
  concepts: [
    // C1 — the co-function rule
    {
      kind: "formula" as const,
      slug: "cdstr-cofunction",
      name: "The co-function rule: sin(90° − θ) = cos θ",
      intuition:
        "In a right triangle the two acute angles add to \\(90^\\circ\\), and the side opposite one of them is the side adjacent to the other. So the sine of one angle is literally the same fraction as the cosine of the other. The 'co' in cosine means 'of the complement'.",
      definition:
        "For every angle \\(\\theta\\):\n" +
        "- \\(\\sin(90^\\circ - \\theta) = \\cos\\theta\\) and \\(\\cos(90^\\circ - \\theta) = \\sin\\theta\\);\n" +
        "- \\(\\tan(90^\\circ - \\theta) = \\cot\\theta\\) and \\(\\cot(90^\\circ - \\theta) = \\tan\\theta\\);\n" +
        "- \\(\\sec(90^\\circ - \\theta) = \\operatorname{cosec}\\theta\\) and \\(\\operatorname{cosec}(90^\\circ - \\theta) = \\sec\\theta\\).\n" +
        "So a quotient like \\(\\dfrac{\\sin 19^\\circ}{\\cos 71^\\circ}\\) is \\(1\\), and \\(\\sec^2 56^\\circ - \\cot^2 34^\\circ\\) is \\(\\sec^2 56^\\circ - \\tan^2 56^\\circ = 1\\).",
      formula: {
        label: "Co-function rule",
        latex: "\\sin(90^\\circ-\\theta) = \\cos\\theta, \\quad \\tan(90^\\circ-\\theta) = \\cot\\theta, \\quad \\sec(90^\\circ-\\theta) = \\operatorname{cosec}\\theta",
      },
      visualizationSlug: "cds-trig-right-triangle",
      authoredExample: {
        prompt: "Evaluate \\(\\dfrac{\\cos 58^\\circ}{\\sin 32^\\circ} + \\dfrac{\\tan 15^\\circ}{\\cot 75^\\circ} - \\sin^2 40^\\circ - \\sin^2 50^\\circ\\).",
        steps: [
          "\\(\\cos 58^\\circ = \\sin 32^\\circ\\), so the first term is \\(1\\).",
          "\\(\\cot 75^\\circ = \\tan 15^\\circ\\), so the second term is \\(1\\).",
          "\\(\\sin 50^\\circ = \\cos 40^\\circ\\), so \\(\\sin^2 40^\\circ + \\sin^2 50^\\circ = 1\\).",
          "Total: \\(1 + 1 - 1 = 1\\).",
        ],
        answer: "\\(1\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\operatorname{cosec}^2 62^\\circ - \\tan^2 28^\\circ\\).",
        steps: [
          "\\(\\tan 28^\\circ = \\cot 62^\\circ\\), so the expression is \\(\\operatorname{cosec}^2 62^\\circ - \\cot^2 62^\\circ\\).",
          "That is the identity \\(\\operatorname{cosec}^2 - \\cot^2 = 1\\).",
        ],
        answer: "\\(1\\).",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac{\\tan 35^\\circ}{\\cot 55^\\circ}\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\sin^2 10^\\circ + \\sin^2 80^\\circ\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\cos 37^\\circ - \\sin 53^\\circ\\)?", answer: "\\(0\\)" },
        { prompt: "\\(\\sec 70^\\circ \\sin 20^\\circ\\)?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "40ccd832-2e9d-4c2c-9c50-37ff598dc452", // 2019 (I) — sin 19°/cos 71° + cos 73°/sin 17°
      traps: [
        {
          title: "Check the angles really add to 90°",
          body:
            "\\(\\cos 61^\\circ\\) and \\(\\sin 29^\\circ\\) are equal; \\(\\cos 61^\\circ\\) and \\(\\sin 31^\\circ\\) are not. Statement questions plant a pair that misses by two degrees. Add the angles before you cancel.",
        },
      ],
    },

    // C2 — long products and sums
    {
      kind: "formula" as const,
      slug: "cdstr-complement-products-sums",
      name: "Pairing the terms of a long product or sum",
      intuition:
        "A product \\(\\tan 1^\\circ \\tan 2^\\circ \\cdots \\tan 89^\\circ\\) is 89 factors that nobody can evaluate one by one — and does not need to. Pair \\(1^\\circ\\) with \\(89^\\circ\\), \\(2^\\circ\\) with \\(88^\\circ\\): each pair is a tangent times its own cotangent, which is \\(1\\). The same pairing turns a sum of \\(\\sin^2\\) terms into a count of pairs.",
      definition:
        "- **Products:** \\(\\tan\\theta \\cdot \\tan(90^\\circ - \\theta) = \\tan\\theta\\cot\\theta = 1\\), and the same for \\(\\cot\\). The middle term, if any, is \\(\\tan 45^\\circ = 1\\).\n" +
        "- **Sums of squares:** \\(\\sin^2\\theta + \\sin^2(90^\\circ - \\theta) = 1\\), and the same for \\(\\cos^2\\). Count the pairs, then add any unpaired term (\\(\\sin^2 45^\\circ = \\dfrac12\\), \\(\\sin^2 90^\\circ = 1\\), \\(\\sin^2 0^\\circ = 0\\)).\n" +
        "- **Mixed:** \\(\\sin A\\cos(90^\\circ - A) \\ne 1\\) — it is \\(\\sin^2 A\\). Pair a ratio with its **co-ratio** of the complement, not with itself.",
      formula: {
        label: "Pairs that collapse",
        latex: "\\tan\\theta\\,\\tan(90^\\circ-\\theta) = 1, \\qquad \\sin^2\\theta + \\sin^2(90^\\circ-\\theta) = 1",
      },
      authoredExample: {
        prompt: "Find \\(\\sin^2 5^\\circ + \\sin^2 10^\\circ + \\sin^2 15^\\circ + \\cdots + \\sin^2 85^\\circ\\).",
        steps: [
          "The angles run \\(5^\\circ, 10^\\circ, \\ldots, 85^\\circ\\): that is \\(17\\) terms.",
          "Pair \\(5^\\circ\\) with \\(85^\\circ\\), \\(10^\\circ\\) with \\(80^\\circ\\), … , \\(40^\\circ\\) with \\(50^\\circ\\): eight pairs, each \\(1\\).",
          "The unpaired middle term is \\(\\sin^2 45^\\circ = \\dfrac12\\).",
          "Sum: \\(8 + \\dfrac12 = \\dfrac{17}{2}\\).",
        ],
        answer: "\\(\\dfrac{17}{2}\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\cot 10^\\circ \\cot 20^\\circ \\cot 30^\\circ \\cot 40^\\circ \\cot 50^\\circ \\cot 60^\\circ \\cot 70^\\circ \\cot 80^\\circ\\).",
        steps: [
          "Pair \\(10^\\circ\\) with \\(80^\\circ\\), \\(20^\\circ\\) with \\(70^\\circ\\), \\(30^\\circ\\) with \\(60^\\circ\\), \\(40^\\circ\\) with \\(50^\\circ\\).",
          "Each pair is \\(\\cot\\theta\\tan\\theta = 1\\), and there is no middle term.",
        ],
        answer: "\\(1\\).",
      },
      practiceSet: [
        { prompt: "\\(\\tan 10^\\circ \\tan 45^\\circ \\tan 80^\\circ\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\cos^2 1^\\circ + \\cos^2 89^\\circ\\)?", answer: "\\(1\\)" },
        { prompt: "Number of pairs in \\(\\tan 1^\\circ \\cdots \\tan 89^\\circ\\)?", answer: "\\(44\\)", method: "plus the middle \\(\\tan 45^\\circ\\)" },
        { prompt: "\\(\\sin^2 30^\\circ + \\sin^2 60^\\circ + \\sin^2 90^\\circ\\)?", answer: "\\(2\\)" },
      ],
      pyqExampleId: "be59af08-bef1-43e9-ac9d-e64664d1a886", // 2016 (II) — tan 1° tan 2° … tan 89°
      traps: [
        {
          title: "Count the terms before pairing",
          body:
            "With an odd number of terms one is left unpaired, and it is not always \\(45^\\circ\\): in \\(\\sin^2 6^\\circ + \\cdots + \\sin^2 90^\\circ\\) the stray term is \\(\\sin^2 90^\\circ = 1\\). Write the first and last angles and the step, count, then pair.",
        },
      ],
    },

    // C3 — tan A = cot B and triangle angles
    {
      kind: "formula" as const,
      slug: "cdstr-tan-cot-equations",
      name: "tan A = cot B, and angles of a triangle",
      intuition:
        "If the tangent of one acute angle equals the cotangent of another, the two angles are complements. The same happens when a product like \\(\\tan 3x \\tan 6x\\) equals \\(1\\). In a triangle the three angles add to \\(180^\\circ\\), so half of \\(B + C\\) is the complement of half of \\(A\\).",
      definition:
        "- For acute angles, \\(\\tan A = \\cot B\\) (or \\(\\sin A = \\cos B\\)) means \\(A + B = 90^\\circ\\).\n" +
        "- \\(\\tan P \\cdot \\tan Q = 1\\) means \\(\\tan P = \\cot Q\\), so \\(P + Q = 90^\\circ\\) (then check the stated range).\n" +
        "- In a triangle, \\(\\dfrac{B + C}{2} = 90^\\circ - \\dfrac{A}{2}\\), so \\(\\sin\\dfrac{B+C}{2} = \\cos\\dfrac{A}{2}\\) and \\(\\tan\\dfrac{B+C}{2} = \\cot\\dfrac{A}{2}\\).",
      formula: {
        label: "Complementary condition",
        latex: "\\tan A = \\cot B \\;\\Rightarrow\\; A + B = 90^\\circ \\quad (A, B \\text{ acute})",
      },
      authoredExample: {
        prompt: "If \\(\\sin(2A + 10^\\circ) = \\cos(A + 20^\\circ)\\) with both angles acute, find \\(A\\).",
        steps: [
          "Equal sine and cosine of acute angles means the angles are complements.",
          "\\((2A + 10^\\circ) + (A + 20^\\circ) = 90^\\circ\\), so \\(3A = 60^\\circ\\).",
          "\\(A = 20^\\circ\\); check: \\(50^\\circ\\) and \\(40^\\circ\\) are both acute.",
        ],
        answer: "\\(20^\\circ\\).",
      },
      selfCheckExample: {
        prompt: "If \\(\\tan 4x \\tan 5x = 1\\) with \\(0^\\circ < 5x < 90^\\circ\\), find \\(x\\).",
        steps: [
          "\\(\\tan 4x = \\cot 5x\\), so \\(4x + 5x = 90^\\circ\\).",
          "\\(x = 10^\\circ\\); then \\(5x = 50^\\circ\\), inside the range.",
        ],
        answer: "\\(10^\\circ\\).",
      },
      practiceSet: [
        { prompt: "If \\(\\tan 2A = \\cot(A - 18^\\circ)\\), with \\(2A\\) acute, find \\(A\\).", answer: "\\(36^\\circ\\)" },
        { prompt: "In triangle \\(ABC\\), \\(\\cos\\dfrac{B+C}{2}\\) equals?", answer: "\\(\\sin\\dfrac{A}{2}\\)" },
        { prompt: "If \\(\\sec 4A = \\operatorname{cosec}(A - 20^\\circ)\\), \\(4A\\) acute, find \\(A\\).", answer: "\\(22^\\circ\\)" },
        { prompt: "If \\(\\tan\\theta \\tan 2\\theta = 1\\) with \\(2\\theta\\) acute, find \\(\\theta\\).", answer: "\\(30^\\circ\\)" },
      ],
      pyqExampleId: "1bbfd747-639d-4dda-9b34-3eec86e884aa", // 2024 (I) — tan 3A = cot(A − 22°)
      traps: [
        {
          title: "The rule needs acute angles — check the range",
          body:
            "\\(\\tan P \\tan Q = 1\\) in general gives \\(P + Q = 90^\\circ + 180^\\circ k\\). A question with a range like \\(0 \\le x < 30^\\circ\\) is there to make you pick the one value that fits, and to reject the edge value that the range excludes.",
        },
      ],
    },
  ],
};
