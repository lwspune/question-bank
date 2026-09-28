import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TR_IDENTITIES_NOTE: SubtopicNote = {
  subtopicName: "Simplifying and Proving Identities",
  title: "Simplifying & Proving Identities",
  oneLineDefinition:
    "Three Pythagorean identities, and the habit of rewriting everything in sine and cosine, reduce every 'what is this equal to?' expression to a number or a single ratio.",
  whyItMatters:
    "Twenty-four PYQs, almost all MODERATE: an expression to simplify, or three statements with 'which are identities?'. None needs a trick the three identities do not supply — what costs marks is algebra done in the wrong order, and a statement that holds at 45° but nowhere else.",
  concepts: [
    // C1 — the three Pythagorean identities
    {
      kind: "formula" as const,
      slug: "cdstr-pythagorean-identities",
      name: "The three Pythagorean identities",
      intuition:
        "Everything starts from \\(\\sin^2\\theta + \\cos^2\\theta = 1\\), which is Pythagoras on a triangle with hypotenuse \\(1\\). Divide it by \\(\\cos^2\\theta\\) and you get the secant–tangent identity; divide by \\(\\sin^2\\theta\\) and you get the cosecant–cotangent one. Three identities, one fact.",
      definition:
        "- \\(\\sin^2\\theta + \\cos^2\\theta = 1\\)\n" +
        "- \\(\\sec^2\\theta - \\tan^2\\theta = 1\\), i.e. \\(1 + \\tan^2\\theta = \\sec^2\\theta\\)\n" +
        "- \\(\\operatorname{cosec}^2\\theta - \\cot^2\\theta = 1\\), i.e. \\(1 + \\cot^2\\theta = \\operatorname{cosec}^2\\theta\\)\n" +
        "Use them in **every** rearranged form: \\(1 - \\sin^2\\theta = \\cos^2\\theta\\), \\(\\sec^2\\theta - 1 = \\tan^2\\theta\\), and so on. Products like \\((1 + \\cos\\theta)(1 - \\cos\\theta)\\) are \\(\\sin^2\\theta\\) in disguise.",
      formula: {
        label: "Pythagorean identities",
        latex: "\\sin^2\\theta + \\cos^2\\theta = 1, \\quad 1 + \\tan^2\\theta = \\sec^2\\theta, \\quad 1 + \\cot^2\\theta = \\operatorname{cosec}^2\\theta",
      },
      authoredExample: {
        prompt: "Simplify \\((1 + \\tan^2\\theta)(1 - \\sin\\theta)(1 + \\sin\\theta)\\).",
        steps: [
          "\\(1 + \\tan^2\\theta = \\sec^2\\theta\\).",
          "\\((1 - \\sin\\theta)(1 + \\sin\\theta) = 1 - \\sin^2\\theta = \\cos^2\\theta\\).",
          "Product: \\(\\sec^2\\theta\\cos^2\\theta = 1\\).",
        ],
        answer: "\\(1\\).",
      },
      selfCheckExample: {
        prompt: "Simplify \\((\\sec^2\\theta - 1)\\cot^2\\theta\\).",
        steps: [
          "\\(\\sec^2\\theta - 1 = \\tan^2\\theta\\).",
          "\\(\\tan^2\\theta\\cot^2\\theta = 1\\).",
        ],
        answer: "\\(1\\).",
      },
      practiceSet: [
        { prompt: "\\(\\operatorname{cosec}^2\\theta - 1\\)?", answer: "\\(\\cot^2\\theta\\)" },
        { prompt: "\\(\\sin^2\\theta\\sec^2\\theta\\) in one ratio?", answer: "\\(\\tan^2\\theta\\)" },
        { prompt: "\\((1 - \\cos^2\\theta)\\operatorname{cosec}^2\\theta\\)?", answer: "\\(1\\)" },
        { prompt: "\\((\\sec^2\\theta - 1)(1 - \\operatorname{cosec}^2\\theta)\\)?", answer: "\\(-1\\)", method: "\\(\\tan^2\\theta \\cdot (-\\cot^2\\theta)\\)" },
      ],
      pyqExampleId: "09b5374b-bd07-4408-aa97-e780d8cbb4a9", // 2023 (I) — (1+cot²)(1+cos)(1−cos) − (1+tan²)(1+sin)(1−sin)
      traps: [
        {
          title: "Watch the sign in the rearranged form",
          body:
            "\\(1 - \\operatorname{cosec}^2\\theta\\) is \\(-\\cot^2\\theta\\), not \\(\\cot^2\\theta\\). A statement like \\((\\sec^2\\theta - 1)(1 - \\operatorname{cosec}^2\\theta) = 1\\) is false only because of that sign — which is exactly why it is on the paper.",
        },
      ],
    },

    // C2 — convert to sin and cos, then factor
    {
      kind: "formula" as const,
      slug: "cdstr-simplify-to-sin-cos",
      name: "Rewrite in sine and cosine, then factor",
      intuition:
        "When an expression mixes six different ratios, turn every one into sine and cosine. The expression becomes ordinary algebra in two letters, and the familiar factorisations — difference of squares, sum and difference of cubes — do the rest. The answer choices are usually \\(0\\), \\(1\\), \\(2\\) or a single ratio.",
      definition:
        "- Replace \\(\\tan\\), \\(\\cot\\), \\(\\sec\\), \\(\\operatorname{cosec}\\) by quotients of \\(\\sin\\) and \\(\\cos\\); put fractions over one denominator.\n" +
        "- **Difference of squares:** \\(\\cos^4 A - \\sin^4 A = (\\cos^2 A - \\sin^2 A)(\\cos^2 A + \\sin^2 A) = \\cos^2 A - \\sin^2 A\\).\n" +
        "- **Cubes:** \\(\\sin^3\\theta \\pm \\cos^3\\theta = (\\sin\\theta \\pm \\cos\\theta)(1 \\mp \\sin\\theta\\cos\\theta)\\).\n" +
        "- A common factor like \\(2\\sin^2\\theta - 1\\) often cancels between top and bottom — look for it before expanding.",
      formula: {
        label: "The factorisations that recur",
        latex: "\\sin^3\\theta \\pm \\cos^3\\theta = (\\sin\\theta \\pm \\cos\\theta)(1 \\mp \\sin\\theta\\cos\\theta)",
      },
      authoredExample: {
        prompt: "Simplify \\(\\dfrac{\\sin^3\\theta - \\cos^3\\theta}{\\sin\\theta - \\cos\\theta} - \\sin\\theta\\cos\\theta\\).",
        steps: [
          "Factor the cube: \\(\\sin^3\\theta - \\cos^3\\theta = (\\sin\\theta - \\cos\\theta)(1 + \\sin\\theta\\cos\\theta)\\).",
          "Cancel \\(\\sin\\theta - \\cos\\theta\\) to get \\(1 + \\sin\\theta\\cos\\theta\\).",
          "Subtract \\(\\sin\\theta\\cos\\theta\\): the result is \\(1\\).",
        ],
        answer: "\\(1\\).",
      },
      selfCheckExample: {
        prompt: "Simplify \\(\\dfrac{\\sin\\theta}{1 + \\cos\\theta} + \\dfrac{1 + \\cos\\theta}{\\sin\\theta}\\).",
        steps: [
          "Common denominator \\(\\sin\\theta(1 + \\cos\\theta)\\).",
          "Numerator: \\(\\sin^2\\theta + 1 + 2\\cos\\theta + \\cos^2\\theta = 2 + 2\\cos\\theta\\).",
          "So the sum is \\(\\dfrac{2(1 + \\cos\\theta)}{\\sin\\theta(1 + \\cos\\theta)} = \\dfrac{2}{\\sin\\theta} = 2\\operatorname{cosec}\\theta\\).",
        ],
        answer: "\\(2\\operatorname{cosec}\\theta\\).",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac{\\cos^4 A - \\sin^4 A}{\\cos^2 A - \\sin^2 A}\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\sin^2\\theta\\cos^2\\theta(\\sec^2\\theta + \\operatorname{cosec}^2\\theta)\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\dfrac{\\cos\\theta}{1 + \\sin\\theta} + \\tan\\theta\\)?", answer: "\\(\\sec\\theta\\)" },
        { prompt: "\\(\\sin^4\\theta - \\cos^4\\theta\\) in terms of \\(\\cos\\theta\\)?", answer: "\\(1 - 2\\cos^2\\theta\\)" },
      ],
      pyqExampleId: "436e7bd4-7503-435a-92fc-4d44d9c8fe53", // 2021 (II) — sum of the two cube quotients
      traps: [
        {
          title: "Which function you eliminate decides the sign",
          body:
            "\\(\\sin^4\\theta - \\cos^4\\theta = \\sin^2\\theta - \\cos^2\\theta\\), which is \\(1 - 2\\cos^2\\theta\\) or \\(2\\sin^2\\theta - 1\\). The option \\(1 - 2\\sin^2\\theta\\) is the negative of the right answer, and it is always offered.",
        },
      ],
    },

    // C3 — is it an identity?
    {
      kind: "formula" as const,
      slug: "cdstr-is-it-an-identity",
      name: "Deciding whether a statement is an identity",
      intuition:
        "An identity holds for every allowed angle; an equation holds for some. The fastest test is to try one angle where both sides are easy — not \\(45^\\circ\\), where sine and cosine are equal and many false statements happen to hold. If the two sides differ at one angle, the statement is not an identity; if they agree, simplify to be sure.",
      definition:
        "To judge a statement '\\(L = R\\)':\n" +
        "- **Disprove** with one angle: try \\(30^\\circ\\) or \\(60^\\circ\\) (not \\(45^\\circ\\)). Different values mean it is not an identity.\n" +
        "- **Prove** by simplifying one side into the other, or both into a common form.\n" +
        "- A statement that reduces to something like \\(\\cos 2\\theta = \\sin 2\\theta\\) holds at one angle only, so it is an **equation**, not an identity.\n" +
        "Useful forms: \\(\\sin^4\\theta + \\cos^4\\theta = 1 - 2\\sin^2\\theta\\cos^2\\theta\\) (a minus sign), and \\(\\dfrac{1 - \\tan^2\\theta}{1 + \\tan^2\\theta} = \\cos^2\\theta - \\sin^2\\theta\\).",
      formula: {
        label: "The test",
        latex: "L(\\theta_0) \\ne R(\\theta_0) \\text{ for one } \\theta_0 \\;\\Rightarrow\\; \\text{not an identity}",
      },
      authoredExample: {
        prompt: "Is \\(\\dfrac{1 - \\tan^2\\theta}{1 + \\tan^2\\theta} = \\sin^2\\theta - \\cos^2\\theta\\) an identity?",
        steps: [
          "Try \\(\\theta = 0^\\circ\\): the left side is \\(\\dfrac{1 - 0}{1 + 0} = 1\\).",
          "The right side is \\(0 - 1 = -1\\).",
          "They differ, so it is not an identity (the correct identity has \\(\\cos^2\\theta - \\sin^2\\theta\\) on the right).",
        ],
        answer: "No.",
      },
      selfCheckExample: {
        prompt: "Is \\(\\cot^2\\theta - \\cos^2\\theta = \\cot^2\\theta\\cos^2\\theta\\) an identity?",
        steps: [
          "Left: \\(\\dfrac{\\cos^2\\theta}{\\sin^2\\theta} - \\cos^2\\theta = \\dfrac{\\cos^2\\theta(1 - \\sin^2\\theta)}{\\sin^2\\theta}\\).",
          "Since \\(1 - \\sin^2\\theta = \\cos^2\\theta\\), that is \\(\\dfrac{\\cos^2\\theta}{\\sin^2\\theta}\\cdot\\cos^2\\theta = \\cot^2\\theta\\cos^2\\theta\\).",
          "Equal to the right side for every allowed \\(\\theta\\).",
        ],
        answer: "Yes.",
      },
      practiceSet: [
        { prompt: "Is \\(\\sin^4\\theta + \\cos^4\\theta = 1 + 2\\sin^2\\theta\\cos^2\\theta\\) an identity?", answer: "No", method: "the sign is minus" },
        { prompt: "Is \\(\\operatorname{cosec}\\theta + \\cot\\theta = \\dfrac{1}{\\operatorname{cosec}\\theta - \\cot\\theta}\\) an identity?", answer: "Yes" },
        { prompt: "Why avoid \\(45^\\circ\\) when testing?", answer: "Sine equals cosine there, so swapped expressions agree" },
        { prompt: "Is \\(\\cos^4\\theta - \\sin^4\\theta = \\tan 2\\theta\\) an identity?", answer: "No", method: "the left side is \\(\\cos 2\\theta\\)" },
      ],
      pyqExampleId: "c26258e4-d5e5-4258-b672-d893503db7ff", // 2021 (II) — which of three statements are identities
      traps: [
        {
          title: "Testing at 45° proves nothing",
          body:
            "At \\(45^\\circ\\), \\(\\sin\\theta = \\cos\\theta\\) and \\(\\tan\\theta = \\cot\\theta\\), so any statement with the two swapped passes. Test at \\(30^\\circ\\) or \\(60^\\circ\\) instead.",
        },
      ],
    },
  ],
};
