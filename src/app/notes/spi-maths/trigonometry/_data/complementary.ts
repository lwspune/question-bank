import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_TG_COMPLEMENTARY_NOTE: SubtopicNote = {
  subtopicName: "Ratios of Complementary Angles",
  title: "Ratios of Complementary Angles",
  oneLineDefinition:
    "Two angles are complementary when they add to 90°, and a ratio of one equals the partner ratio of the other: sin of one is cos of the other.",
  whyItMatters:
    "Six questions in the bank, four EASY and two MODERATE. Five switch a ratio to its partner using 90° minus the angle, and one is a long sum of squares that collapses when the terms are paired from the two ends.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spitgco-rule",
      name: "Switching a ratio with 90° minus the angle",
      intuition:
        "In a right triangle the two acute angles add to \\(90^\\circ\\). The side opposite one of them is adjacent to the other, so sin of one angle is cos of the other. The same swap pairs tan with cot and sec with cosec.",
      definition:
        "- \\(\\sin(90^\\circ - \\theta) = \\cos\\theta\\) and \\(\\cos(90^\\circ - \\theta) = \\sin\\theta\\).\n" +
        "- \\(\\tan(90^\\circ - \\theta) = \\cot\\theta\\) and \\(\\cot(90^\\circ - \\theta) = \\tan\\theta\\).\n" +
        "- \\(\\sec(90^\\circ - \\theta) = \\operatorname{cosec}\\theta\\) and \\(\\operatorname{cosec}(90^\\circ - \\theta) = \\sec\\theta\\).\n" +
        "- So \\(\\tan\\theta \\times \\tan(90^\\circ - \\theta) = \\tan\\theta\\cot\\theta = 1\\).\n" +
        "- **Equations:** if \\(\\sin x = \\cos y\\) with both angles acute, then \\(x + y = 90^\\circ\\).",
      formula: {
        label: "Complementary angle rules",
        latex:
          "\\sin(90^\\circ - \\theta) = \\cos\\theta,\\quad \\tan(90^\\circ - \\theta) = \\cot\\theta,\\quad \\sec(90^\\circ - \\theta) = \\operatorname{cosec}\\theta",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\dfrac{\\sin 25^\\circ}{\\cos 65^\\circ} + \\tan 20^\\circ \\tan 70^\\circ\\).",
        steps: [
          "\\(\\cos 65^\\circ = \\cos(90^\\circ - 25^\\circ) = \\sin 25^\\circ\\), so the first term is 1.",
          "\\(\\tan 70^\\circ = \\cot 20^\\circ\\), so \\(\\tan 20^\\circ \\tan 70^\\circ = \\tan 20^\\circ \\cot 20^\\circ = 1\\).",
          "Total \\(= 1 + 1 = 2\\).",
        ],
        answer: "\\(2\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\sin 3A = \\cos(A - 26^\\circ)\\), where \\(3A\\) is acute, find A.",
        steps: [
          "The two angles must add to \\(90^\\circ\\): \\(3A + A - 26^\\circ = 90^\\circ\\).",
          "\\(4A = 116^\\circ\\), so \\(A = 29^\\circ\\).",
        ],
        answer: "\\(29^\\circ\\)",
      },
      practiceSet: [
        { prompt: "What is \\(\\cos 48^\\circ - \\sin 42^\\circ\\)?", answer: "\\(0\\)" },
        { prompt: "What is \\(\\tan 35^\\circ \\times \\tan 55^\\circ\\)?", answer: "\\(1\\)" },
        { prompt: "Write \\(\\sec 70^\\circ\\) as a ratio of an angle between \\(0^\\circ\\) and \\(45^\\circ\\).", answer: "\\(\\operatorname{cosec} 20^\\circ\\)" },
        { prompt: "If \\(\\tan 2A = \\cot(A + 30^\\circ)\\), where \\(2A\\) is acute, what is A?", answer: "\\(20^\\circ\\) (from \\(3A + 30^\\circ = 90^\\circ\\))" },
      ],
      pyqExampleId: "e6a5e9bf-e441-4237-9ba9-1e53a465ba3a",
      traps: [
        {
          title: "Keeping the same ratio",
          body:
            "\\(\\sin(90^\\circ - A)\\) is \\(\\cos A\\), not \\(\\sin A\\). The ratio always changes to its partner when the angle becomes \\(90^\\circ\\) minus it.",
        },
        {
          title: "Switching when the angles do not add to 90°",
          body:
            "\\(\\sin 40^\\circ\\) equals \\(\\cos 50^\\circ\\), not \\(\\cos 40^\\circ\\). Check that the two angles add to \\(90^\\circ\\) before you swap the ratio.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spitgco-sums",
      name: "Pairing terms of a long sum or product",
      intuition:
        "A long sum like \\(\\sin^2 5^\\circ + \\sin^2 10^\\circ + \\dots\\) looks impossible, but the first and last terms are complementary. Pair them from the outside in: each pair of squares adds to 1, and each pair of tangents multiplies to 1.",
      definition:
        "- \\(\\sin^2\\theta + \\sin^2(90^\\circ - \\theta) = \\sin^2\\theta + \\cos^2\\theta = 1\\). The same holds for \\(\\cos^2\\).\n" +
        "- \\(\\tan\\theta \\times \\tan(90^\\circ - \\theta) = 1\\).\n" +
        "- **Count the terms first:** from \\(a\\) to \\(b\\) in steps of \\(d\\) there are \\(\\frac{b - a}{d} + 1\\) terms.\n" +
        "- Add back any term with no partner: \\(\\sin^2 45^\\circ = \\frac{1}{2}\\), \\(\\sin^2 90^\\circ = 1\\), \\(\\tan 45^\\circ = 1\\).",
      formula: {
        label: "Number of terms in a list of angles",
        latex: "\\text{terms} = \\frac{\\text{last} - \\text{first}}{\\text{step}} + 1",
      },
      authoredExample: {
        prompt: "Find \\(\\cos^2 10^\\circ + \\cos^2 20^\\circ + \\cos^2 30^\\circ + \\dots + \\cos^2 80^\\circ\\).",
        steps: [
          "Terms: \\(\\frac{80 - 10}{10} + 1 = 8\\).",
          "Pairs: \\(10^\\circ\\) with \\(80^\\circ\\), \\(20^\\circ\\) with \\(70^\\circ\\), \\(30^\\circ\\) with \\(60^\\circ\\), \\(40^\\circ\\) with \\(50^\\circ\\). Each pair adds to 1.",
          "Four pairs and no term left over: the sum is 4.",
        ],
        answer: "\\(4\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\tan 1^\\circ \\tan 2^\\circ \\tan 3^\\circ \\cdots \\tan 89^\\circ\\).",
        steps: [
          "Pair \\(1^\\circ\\) with \\(89^\\circ\\), \\(2^\\circ\\) with \\(88^\\circ\\), up to \\(44^\\circ\\) with \\(46^\\circ\\). Each pair multiplies to 1.",
          "Left over: \\(\\tan 45^\\circ = 1\\). The product is 1.",
        ],
        answer: "\\(1\\)",
      },
      practiceSet: [
        { prompt: "What is \\(\\sin^2 20^\\circ + \\sin^2 70^\\circ\\)?", answer: "\\(1\\)" },
        { prompt: "What is \\(\\tan 10^\\circ \\tan 20^\\circ \\tan 70^\\circ \\tan 80^\\circ\\)?", answer: "\\(1\\)" },
        { prompt: "What is \\(\\sin^2 30^\\circ + \\sin^2 60^\\circ + \\sin^2 90^\\circ\\)?", answer: "\\(1 + 1 = 2\\)" },
        { prompt: "How many terms are in \\(\\sin 3^\\circ + \\sin 6^\\circ + \\dots + \\sin 90^\\circ\\)?", answer: "\\(\\frac{90 - 3}{3} + 1 = 30\\)" },
      ],
      pyqExampleId: "1ca29c09-f5fe-4321-8b9c-3ae3cb52cfd4",
      traps: [
        {
          title: "Forgetting the unpaired terms",
          body:
            "In a sum of \\(\\sin^2\\) running up to \\(90^\\circ\\), the \\(45^\\circ\\) term pairs with itself and the \\(90^\\circ\\) term has no partner. Add \\(\\frac{1}{2}\\) and 1 for them after counting the pairs.",
        },
        {
          title: "Miscounting the terms",
          body:
            "From \\(10^\\circ\\) to \\(80^\\circ\\) in steps of \\(10^\\circ\\) there are 8 terms, not 7. Use last minus first, divided by the step, plus 1.",
        },
      ],
    },
  ],
};
