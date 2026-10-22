import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_TG_IDENTITIES_NOTE: SubtopicNote = {
  subtopicName: "Trigonometric Identities",
  title: "Trigonometric Identities",
  oneLineDefinition:
    "An identity is an equation that holds for every angle. Three of them, all from Pythagoras, turn long expressions into a single number or a single ratio.",
  whyItMatters:
    "Fourteen questions in the bank, nine EASY and five MODERATE. Four rest on sin²θ + cos²θ = 1, five on its sec and tan or cosec and cot forms, two simplify a square root, and three use an identity as a second equation or to remove the angle. Five of the chapter's nine MODERATE questions are on this page.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spitgid-sincos",
      name: "sin²θ + cos²θ = 1 and its rearrangements",
      intuition:
        "In a right triangle, \\(\\text{opp}^2 + \\text{adj}^2 = \\text{hyp}^2\\). Divide every term by \\(\\text{hyp}^2\\) and you get \\(\\sin^2\\theta + \\cos^2\\theta = 1\\). It is true for every angle, so whenever you see \\(\\sin^2\\) and \\(\\cos^2\\) of the same angle together, look for this.",
      definition:
        "- \\(\\sin^2\\theta + \\cos^2\\theta = 1\\).\n" +
        "- Rearranged: \\(1 - \\sin^2\\theta = \\cos^2\\theta\\) and \\(1 - \\cos^2\\theta = \\sin^2\\theta\\).\n" +
        "- Factor first: \\((1 + \\sin\\theta)(1 - \\sin\\theta) = 1 - \\sin^2\\theta = \\cos^2\\theta\\).\n" +
        "- With unequal coefficients, split off a common part: \\(5\\sin^2\\theta + 2\\cos^2\\theta = 2(\\sin^2\\theta + \\cos^2\\theta) + 3\\sin^2\\theta = 2 + 3\\sin^2\\theta\\).",
      formula: {
        label: "The first identity",
        latex: "\\sin^2\\theta + \\cos^2\\theta = 1, \\qquad 1 - \\sin^2\\theta = \\cos^2\\theta, \\qquad 1 - \\cos^2\\theta = \\sin^2\\theta",
      },
      authoredExample: {
        prompt: "Simplify \\(\\cos^4\\theta - \\sin^4\\theta + \\sin^2\\theta\\).",
        steps: [
          "Factor as a difference of squares: \\(\\cos^4\\theta - \\sin^4\\theta = (\\cos^2\\theta - \\sin^2\\theta)(\\cos^2\\theta + \\sin^2\\theta)\\).",
          "The second bracket is 1, so this is \\(\\cos^2\\theta - \\sin^2\\theta\\).",
          "Add \\(\\sin^2\\theta\\): \\(\\cos^2\\theta - \\sin^2\\theta + \\sin^2\\theta = \\cos^2\\theta\\).",
        ],
        answer: "\\(\\cos^2\\theta\\)",
      },
      selfCheckExample: {
        prompt: "Simplify \\(\\dfrac{(1 + \\cos\\theta)(1 - \\cos\\theta)}{\\sin\\theta}\\).",
        steps: [
          "The top is \\(1 - \\cos^2\\theta = \\sin^2\\theta\\).",
          "\\(\\dfrac{\\sin^2\\theta}{\\sin\\theta} = \\sin\\theta\\).",
        ],
        answer: "\\(\\sin\\theta\\)",
      },
      practiceSet: [
        { prompt: "What is \\(7\\sin^2\\theta + 7\\cos^2\\theta\\)?", answer: "\\(7\\)" },
        { prompt: "Write \\(2\\sin^2\\theta + 5\\cos^2\\theta\\) using \\(\\cos\\theta\\) alone.", answer: "\\(2 + 3\\cos^2\\theta\\)" },
        { prompt: "If \\(\\sin\\theta = 0.6\\) for an acute angle \\(\\theta\\), what is \\(\\cos\\theta\\)?", answer: "\\(\\sqrt{1 - 0.36} = 0.8\\)" },
        { prompt: "Simplify \\((1 - \\sin\\theta)(1 + \\sin\\theta)\\).", answer: "\\(\\cos^2\\theta\\)" },
      ],
      pyqExampleId: "1181a202-beab-4da8-98a1-add5d21a778b",
      traps: [
        {
          title: "The identity needs the same angle",
          body:
            "\\(\\sin^2 30^\\circ + \\cos^2 60^\\circ = \\frac{1}{4} + \\frac{1}{4} = \\frac{1}{2}\\), not 1. The two angles must be equal for the sum to be 1.",
        },
        {
          title: "The leftover goes with the bigger coefficient",
          body:
            "\\(5\\sin^2\\theta + 2\\cos^2\\theta\\) is \\(2 + 3\\sin^2\\theta\\), not \\(2 + 3\\cos^2\\theta\\). Take out the smaller coefficient and the remainder stays on the ratio that had more.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spitgid-sectan",
      name: "1 + tan²θ = sec²θ and 1 + cot²θ = cosec²θ",
      intuition:
        "Divide \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) by \\(\\cos^2\\theta\\) and you get \\(\\tan^2\\theta + 1 = \\sec^2\\theta\\). Divide it by \\(\\sin^2\\theta\\) instead and you get \\(1 + \\cot^2\\theta = \\operatorname{cosec}^2\\theta\\). So sec goes with tan, and cosec goes with cot.",
      definition:
        "- \\(\\sec^2\\theta - \\tan^2\\theta = 1\\), so \\(\\tan^2\\theta - \\sec^2\\theta = -1\\).\n" +
        "- \\(\\operatorname{cosec}^2\\theta - \\cot^2\\theta = 1\\).\n" +
        "- \\(\\frac{1}{\\cos^2\\theta}\\) is \\(\\sec^2\\theta\\) and \\(\\frac{1}{\\sin^2\\theta}\\) is \\(\\operatorname{cosec}^2\\theta\\): rewrite them first.\n" +
        "- From one ratio: if \\(\\cos\\theta\\) is given, \\(\\sec^2\\theta = \\frac{1}{\\cos^2\\theta}\\) and \\(\\tan^2\\theta = \\sec^2\\theta - 1\\).",
      formula: {
        label: "The second and third identities",
        latex: "1 + \\tan^2\\theta = \\sec^2\\theta, \\qquad 1 + \\cot^2\\theta = \\operatorname{cosec}^2\\theta",
      },
      authoredExample: {
        prompt: "If \\(\\tan\\theta = \\frac{1}{2}\\), find \\(\\sec^2\\theta + \\operatorname{cosec}^2\\theta\\).",
        steps: [
          "\\(\\sec^2\\theta = 1 + \\tan^2\\theta = 1 + \\frac{1}{4} = \\frac{5}{4}\\).",
          "\\(\\cot\\theta = 2\\), so \\(\\operatorname{cosec}^2\\theta = 1 + 4 = 5\\).",
          "Sum \\(= \\frac{5}{4} + 5 = \\frac{25}{4}\\).",
        ],
        answer: "\\(\\frac{25}{4}\\)",
      },
      selfCheckExample: {
        prompt: "Simplify \\((1 + \\cot^2\\theta)\\sin^2\\theta\\).",
        steps: [
          "\\(1 + \\cot^2\\theta = \\operatorname{cosec}^2\\theta = \\frac{1}{\\sin^2\\theta}\\).",
          "\\(\\frac{1}{\\sin^2\\theta} \\times \\sin^2\\theta = 1\\).",
        ],
        answer: "\\(1\\)",
      },
      practiceSet: [
        { prompt: "What is \\(4\\operatorname{cosec}^2\\theta - 4\\cot^2\\theta\\)?", answer: "\\(4\\)" },
        { prompt: "What is \\(\\cot^2\\theta - \\operatorname{cosec}^2\\theta\\)?", answer: "\\(-1\\)" },
        { prompt: "Simplify \\((\\sec^2\\theta - 1)\\cos^2\\theta\\).", answer: "\\(\\tan^2\\theta\\cos^2\\theta = \\sin^2\\theta\\)" },
        { prompt: "If \\(\\sec\\theta = \\frac{13}{12}\\), what is \\(\\tan^2\\theta\\)?", answer: "\\(\\frac{169}{144} - 1 = \\frac{25}{144}\\)" },
      ],
      pyqExampleId: "16dd251b-7474-46d1-862d-5ca9ee50bcc8",
      traps: [
        {
          title: "Getting the sign the wrong way round",
          body:
            "\\(\\sec^2\\theta - \\tan^2\\theta = 1\\), so \\(\\tan^2\\theta - \\sec^2\\theta = -1\\). Check which term comes first before you write 1.",
        },
        {
          title: "Pairing sec with cot",
          body:
            "The pairs are sec with tan and cosec with cot. \\(\\sec^2\\theta - \\cot^2\\theta\\) is not 1 for a general angle.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spitgid-roots",
      name: "Simplifying a square root of a ratio",
      intuition:
        "A root like \\(\\sqrt{\\dfrac{1 + \\cos A}{1 - \\cos A}}\\) clears when the bottom becomes a perfect square. Multiply top and bottom inside the root by the top: the bottom turns into \\(1 - \\cos^2 A = \\sin^2 A\\), and the root comes off both.",
      definition:
        "- Multiply inside the root by \\(\\dfrac{1 + \\cos A}{1 + \\cos A}\\) (the top over itself).\n" +
        "- The bottom becomes a squared ratio by the identities: \\(\\sin^2 A\\), \\(\\cos^2 A\\), \\(\\tan^2 A\\).\n" +
        "- For an acute angle every ratio is positive, so \\(\\sqrt{\\sin^2 A} = \\sin A\\).\n" +
        "- **Check by numbers:** put \\(A = 60^\\circ\\) into the question and each option, and keep the one that matches.",
      formula: {
        label: "Roots that clear for an acute angle A",
        latex:
          "\\sqrt{\\dfrac{1 + \\cos A}{1 - \\cos A}} = \\operatorname{cosec} A + \\cot A \\qquad \\sqrt{\\dfrac{1 - \\cos A}{1 + \\cos A}} = \\operatorname{cosec} A - \\cot A \\qquad \\sqrt{1 - \\sin^2 A} = \\cos A \\qquad \\sqrt{\\sec^2 A - 1} = \\tan A",
      },
      authoredExample: {
        prompt: "Simplify \\(\\sqrt{\\dfrac{1 + \\cos A}{1 - \\cos A}}\\) for an acute angle A.",
        steps: [
          "Multiply top and bottom by \\(1 + \\cos A\\): \\(\\sqrt{\\dfrac{(1 + \\cos A)^2}{1 - \\cos^2 A}} = \\sqrt{\\dfrac{(1 + \\cos A)^2}{\\sin^2 A}}\\).",
          "Take the root: \\(\\dfrac{1 + \\cos A}{\\sin A}\\).",
          "Split: \\(\\dfrac{1}{\\sin A} + \\dfrac{\\cos A}{\\sin A} = \\operatorname{cosec} A + \\cot A\\).",
        ],
        answer: "\\(\\operatorname{cosec} A + \\cot A\\)",
      },
      selfCheckExample: {
        prompt: "Simplify \\(\\sqrt{\\dfrac{1 - \\cos A}{1 + \\cos A}}\\) for an acute angle A.",
        steps: [
          "Multiply top and bottom by \\(1 - \\cos A\\): the root becomes \\(\\dfrac{1 - \\cos A}{\\sin A}\\).",
          "Split: \\(\\operatorname{cosec} A - \\cot A\\).",
        ],
        answer: "\\(\\operatorname{cosec} A - \\cot A\\)",
      },
      practiceSet: [
        { prompt: "Simplify \\(\\sqrt{1 - \\sin^2 A}\\) for an acute angle A.", answer: "\\(\\cos A\\)" },
        { prompt: "Simplify \\(\\sqrt{\\sec^2 A - 1}\\) for an acute angle A.", answer: "\\(\\tan A\\)" },
        { prompt: "Simplify \\(\\sqrt{\\operatorname{cosec}^2 A - 1}\\) for an acute angle A.", answer: "\\(\\cot A\\)" },
      ],
      pyqExampleId: "5fd60b98-010a-4c75-9fad-5b48a14cb36c",
      traps: [
        {
          title: "Taking the root of each term separately",
          body:
            "\\(\\sqrt{1 - \\sin^2 A}\\) is \\(\\cos A\\), not \\(1 - \\sin A\\). A root never splits across a plus or minus sign.",
        },
        {
          title: "Plus and minus look alike in the options",
          body:
            "The answer and a wrong option often differ only in one sign, such as \\(\\operatorname{cosec} A + \\cot A\\) and \\(\\operatorname{cosec} A - \\cot A\\). Put in \\(A = 60^\\circ\\) to tell them apart.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spitgid-pairs",
      name: "Using an identity as a second equation",
      intuition:
        "\\(\\sec^2\\theta - \\tan^2\\theta = 1\\) factors as \\((\\sec\\theta + \\tan\\theta)(\\sec\\theta - \\tan\\theta) = 1\\). So if you know one bracket, the other is its reciprocal, and two equations give both ratios. The same identities remove the angle when x and y are given as ratios of it.",
      definition:
        "- \\(\\sec\\theta + \\tan\\theta\\) and \\(\\sec\\theta - \\tan\\theta\\) multiply to 1. So do \\(\\operatorname{cosec}\\theta + \\cot\\theta\\) and \\(\\operatorname{cosec}\\theta - \\cot\\theta\\).\n" +
        "- **Add** the two brackets to get twice sec (or cosec); **subtract** them to get twice tan (or cot).\n" +
        "- **Removing the angle:** if \\(x = a\\sec\\theta\\) and \\(y = a\\tan\\theta\\), square both and subtract: \\(x^2 - y^2 = a^2\\).",
      formula: {
        label: "The factored identities",
        latex: "(\\sec\\theta + \\tan\\theta)(\\sec\\theta - \\tan\\theta) = 1, \\qquad (\\operatorname{cosec}\\theta + \\cot\\theta)(\\operatorname{cosec}\\theta - \\cot\\theta) = 1",
      },
      authoredExample: {
        prompt: "If \\(\\sec\\theta + \\tan\\theta = 3\\), find \\(\\sec\\theta\\) and \\(\\tan\\theta\\).",
        steps: [
          "The other bracket is the reciprocal: \\(\\sec\\theta - \\tan\\theta = \\frac{1}{3}\\).",
          "Add: \\(2\\sec\\theta = 3 + \\frac{1}{3} = \\frac{10}{3}\\), so \\(\\sec\\theta = \\frac{5}{3}\\).",
          "Then \\(\\tan\\theta = 3 - \\frac{5}{3} = \\frac{4}{3}\\). Check: \\(\\frac{25}{9} - \\frac{16}{9} = 1\\).",
        ],
        answer: "\\(\\sec\\theta = \\frac{5}{3}\\), \\(\\tan\\theta = \\frac{4}{3}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(x = 3\\sec\\theta\\) and \\(y = 3\\tan\\theta\\), find \\(x^2 - y^2\\).",
        steps: [
          "\\(x^2 - y^2 = 9\\sec^2\\theta - 9\\tan^2\\theta\\).",
          "\\(= 9(\\sec^2\\theta - \\tan^2\\theta) = 9\\).",
        ],
        answer: "\\(9\\)",
      },
      practiceSet: [
        { prompt: "If \\(\\operatorname{cosec}\\theta + \\cot\\theta = 2\\), what is \\(\\operatorname{cosec}\\theta - \\cot\\theta\\)?", answer: "\\(\\frac{1}{2}\\)" },
        { prompt: "If \\(\\sec\\theta - \\tan\\theta = \\frac{1}{2}\\), what is \\(\\sec\\theta\\)?", answer: "\\(\\frac{5}{4}\\) (the other bracket is 2, so \\(2\\sec\\theta = \\frac{5}{2}\\))" },
        { prompt: "If \\(x = 4\\cos\\theta\\) and \\(y = 4\\sin\\theta\\), what is \\(x^2 + y^2\\)?", answer: "\\(16\\)" },
        { prompt: "If \\(x = 2\\operatorname{cosec}\\theta\\) and \\(y = 2\\cot\\theta\\), what is \\(x^2 - y^2\\)?", answer: "\\(4\\)" },
      ],
      pyqExampleId: "08820e5c-79f9-4f20-8f0e-2e333455b40c",
      traps: [
        {
          title: "Trying to find the angle first",
          body:
            "When \\(\\sec\\theta + \\tan\\theta = 3\\), the angle is not a standard one. Use the reciprocal bracket and add; never hunt for \\(\\theta\\) itself.",
        },
        {
          title: "Adding when you need tan",
          body:
            "Adding the two brackets cancels tan and gives \\(2\\sec\\theta\\). Subtracting cancels sec and gives \\(2\\tan\\theta\\). Choose the one that keeps the ratio you are asked for.",
        },
      ],
    },
  ],
};
