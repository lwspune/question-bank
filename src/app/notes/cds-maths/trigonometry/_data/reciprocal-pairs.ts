import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TR_RECIPROCAL_PAIRS_NOTE: SubtopicNote = {
  subtopicName: "Reciprocal Pairs — sec ± tan and cosec ± cot",
  title: "Reciprocal Pairs: sec ± tan, cosec ± cot",
  oneLineDefinition:
    "Because sec²θ − tan²θ = 1, the numbers sec θ + tan θ and sec θ − tan θ are reciprocals of each other — and the same holds for cosec θ ± cot θ. One fact, and a whole family of questions collapses.",
  whyItMatters:
    "Eighteen PYQs, all but one MODERATE, and CDS sets this family every year. They look like long fractions with ones scattered through them; each is solved in two lines by the reciprocal pair. It is the highest-return single identity in the chapter.",
  concepts: [
    // C1 — the reciprocal pair
    {
      kind: "formula" as const,
      slug: "cdstr-reciprocal-pair",
      name: "sec θ + tan θ and sec θ − tan θ are reciprocals",
      intuition:
        "\\(\\sec^2\\theta - \\tan^2\\theta = 1\\) is a difference of squares, so it factors: \\((\\sec\\theta - \\tan\\theta)(\\sec\\theta + \\tan\\theta) = 1\\). Knowing one of the pair gives the other for free — and adding or subtracting the two recovers \\(\\sec\\theta\\) and \\(\\tan\\theta\\) separately.",
      definition:
        "- \\((\\sec\\theta + \\tan\\theta)(\\sec\\theta - \\tan\\theta) = 1\\)\n" +
        "- \\((\\operatorname{cosec}\\theta + \\cot\\theta)(\\operatorname{cosec}\\theta - \\cot\\theta) = 1\\)\n" +
        "If \\(\\sec\\theta + \\tan\\theta = k\\), then \\(\\sec\\theta - \\tan\\theta = \\dfrac1k\\), so\n" +
        "- \\(\\sec\\theta = \\dfrac12\\left(k + \\dfrac1k\\right)\\) and \\(\\tan\\theta = \\dfrac12\\left(k - \\dfrac1k\\right)\\).\n" +
        "The cosecant pair works identically: \\(\\operatorname{cosec}\\theta\\) is half the sum, \\(\\cot\\theta\\) half the difference.",
      formula: {
        label: "The reciprocal pair",
        latex: "\\sec\\theta + \\tan\\theta = k \\;\\Rightarrow\\; \\sec\\theta - \\tan\\theta = \\frac1k, \\quad \\sec\\theta = \\frac12\\left(k + \\frac1k\\right)",
      },
      authoredExample: {
        prompt: "If \\(\\sec\\theta + \\tan\\theta = 2\\), find \\(\\sin\\theta\\).",
        steps: [
          "The pair gives \\(\\sec\\theta - \\tan\\theta = \\dfrac12\\).",
          "Adding: \\(2\\sec\\theta = \\dfrac52\\), so \\(\\sec\\theta = \\dfrac54\\). Subtracting: \\(2\\tan\\theta = \\dfrac32\\), so \\(\\tan\\theta = \\dfrac34\\).",
          "\\(\\sin\\theta = \\dfrac{\\tan\\theta}{\\sec\\theta} = \\dfrac34 \\cdot \\dfrac45 = \\dfrac35\\).",
        ],
        answer: "\\(\\dfrac35\\).",
      },
      selfCheckExample: {
        prompt: "If \\(\\operatorname{cosec}\\theta + \\cot\\theta = 5\\), find \\(\\cos\\theta\\).",
        steps: [
          "The pair gives \\(\\operatorname{cosec}\\theta - \\cot\\theta = \\dfrac15\\).",
          "Adding: \\(\\operatorname{cosec}\\theta = \\dfrac12\\left(5 + \\dfrac15\\right) = \\dfrac{13}{5}\\). Subtracting: \\(\\cot\\theta = \\dfrac12\\left(5 - \\dfrac15\\right) = \\dfrac{12}{5}\\).",
          "\\(\\cos\\theta = \\dfrac{\\cot\\theta}{\\operatorname{cosec}\\theta} = \\dfrac{12}{13}\\).",
        ],
        answer: "\\(\\dfrac{12}{13}\\).",
      },
      practiceSet: [
        { prompt: "If \\(\\sec\\theta - \\tan\\theta = \\dfrac13\\), then \\(\\sec\\theta + \\tan\\theta\\)?", answer: "\\(3\\)" },
        { prompt: "If \\(\\operatorname{cosec}\\theta - \\cot\\theta = m\\), then \\(\\operatorname{cosec}\\theta\\)?", answer: "\\(\\dfrac12\\left(m + \\dfrac1m\\right)\\)" },
        { prompt: "\\(\\dfrac{1}{\\sec\\theta - \\tan\\theta} - \\tan\\theta\\)?", answer: "\\(\\sec\\theta\\)" },
        { prompt: "If \\(\\sec\\theta + \\tan\\theta = 4\\), then \\(\\tan\\theta\\)?", answer: "\\(\\dfrac{15}{8}\\)" },
      ],
      pyqExampleId: "5f816a0a-b50e-4baf-929a-089f185186e7", // 2022 (I) — tan θ + sec θ = 3, find 3 tan θ + 9 sec θ
      traps: [
        {
          title: "Half the sum gives sec, half the difference gives tan — not the other way",
          body:
            "\\(\\sec\\theta = \\dfrac12\\left(k + \\dfrac1k\\right)\\) is at least \\(1\\), as a secant must be. If your 'secant' comes out below \\(1\\), you have swapped the sum and the difference.",
        },
      ],
    },

    // C2 — (1 + sin θ)/cos θ and its relatives
    {
      kind: "formula" as const,
      slug: "cdstr-one-plus-sin-over-cos",
      name: "(1 + sin θ)/cos θ is sec θ + tan θ",
      intuition:
        "Split the fraction: \\(\\dfrac{1 + \\sin\\theta}{\\cos\\theta} = \\dfrac{1}{\\cos\\theta} + \\dfrac{\\sin\\theta}{\\cos\\theta} = \\sec\\theta + \\tan\\theta\\). Recognising that disguise is half the family, because the paper writes the reciprocal pair in sine-and-cosine form so you do not see it.",
      definition:
        "- \\(\\dfrac{1 + \\sin\\theta}{\\cos\\theta} = \\sec\\theta + \\tan\\theta\\) and \\(\\dfrac{1 - \\sin\\theta}{\\cos\\theta} = \\sec\\theta - \\tan\\theta\\).\n" +
        "- \\(\\dfrac{1 + \\cos\\theta}{\\sin\\theta} = \\operatorname{cosec}\\theta + \\cot\\theta\\) and \\(\\dfrac{1 - \\cos\\theta}{\\sin\\theta} = \\operatorname{cosec}\\theta - \\cot\\theta\\).\n" +
        "- Under a root: \\(\\sqrt{\\dfrac{1 - \\sin\\theta}{1 + \\sin\\theta}} = \\dfrac{1 - \\sin\\theta}{|\\cos\\theta|}\\), which is \\(\\sec\\theta - \\tan\\theta\\) when \\(\\cos\\theta > 0\\). Multiply inside by \\(1 - \\sin\\theta\\) top and bottom to see it.",
      formula: {
        label: "The disguised pair",
        latex: "\\frac{1 \\pm \\sin\\theta}{\\cos\\theta} = \\sec\\theta \\pm \\tan\\theta, \\qquad \\frac{1 \\pm \\cos\\theta}{\\sin\\theta} = \\operatorname{cosec}\\theta \\pm \\cot\\theta",
      },
      authoredExample: {
        prompt: "Simplify \\(\\sqrt{\\dfrac{1 + \\cos\\theta}{1 - \\cos\\theta}}\\) for \\(0 < \\theta < 90^\\circ\\).",
        steps: [
          "Multiply top and bottom inside the root by \\(1 + \\cos\\theta\\): \\(\\sqrt{\\dfrac{(1 + \\cos\\theta)^2}{1 - \\cos^2\\theta}} = \\sqrt{\\dfrac{(1 + \\cos\\theta)^2}{\\sin^2\\theta}}\\).",
          "For \\(0 < \\theta < 90^\\circ\\), \\(\\sin\\theta > 0\\), so the root is \\(\\dfrac{1 + \\cos\\theta}{\\sin\\theta}\\).",
          "That is \\(\\operatorname{cosec}\\theta + \\cot\\theta\\).",
        ],
        answer: "\\(\\operatorname{cosec}\\theta + \\cot\\theta\\).",
      },
      selfCheckExample: {
        prompt: "If \\(\\dfrac{1 + \\sin\\theta}{\\cos\\theta} = 3\\), find \\(\\dfrac{1 - \\sin\\theta}{\\cos\\theta}\\).",
        steps: [
          "The first is \\(\\sec\\theta + \\tan\\theta\\) and the second \\(\\sec\\theta - \\tan\\theta\\).",
          "They are reciprocals, so the second is \\(\\dfrac13\\).",
        ],
        answer: "\\(\\dfrac13\\).",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac{1 - \\cos\\theta}{\\sin\\theta}\\) as a pair?", answer: "\\(\\operatorname{cosec}\\theta - \\cot\\theta\\)" },
        { prompt: "\\(\\dfrac{\\cos\\theta}{1 + \\sin\\theta}\\) as a pair?", answer: "\\(\\sec\\theta - \\tan\\theta\\)" },
        { prompt: "\\(\\sqrt{\\dfrac{1 - \\sin\\theta}{1 + \\sin\\theta}} - (\\sec\\theta - \\tan\\theta)\\), acute \\(\\theta\\)?", answer: "\\(0\\)" },
        { prompt: "\\(\\left(\\dfrac{1 + \\sin\\theta}{\\cos\\theta}\\right)\\left(\\dfrac{1 - \\sin\\theta}{\\cos\\theta}\\right)\\)?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "ccf4c00d-fdd1-4660-89cf-779651764a49", // 2020 (I) — √[(sec − tan)/(sec + tan)]
      traps: [
        {
          title: "A square root returns a modulus",
          body:
            "\\(\\sqrt{\\cos^2\\theta} = |\\cos\\theta|\\). The simplification to \\(\\sec\\theta - \\tan\\theta\\) is right only where \\(\\cos\\theta > 0\\). When the stem gives a range, check it; when it does not, the intended range is the first quadrant.",
        },
      ],
    },

    // C3 — replacing the 1
    {
      kind: "formula" as const,
      slug: "cdstr-replace-the-one",
      name: "Replacing the 1 in (tan θ + sec θ − 1)/(tan θ − sec θ + 1)",
      intuition:
        "The standing CDS question is a fraction like \\(\\dfrac{\\tan\\theta + \\sec\\theta - 1}{\\tan\\theta - \\sec\\theta + 1}\\). The trick: the lonely \\(1\\) in the numerator is \\(\\sec^2\\theta - \\tan^2\\theta\\). Write it that way, factor, and the denominator appears as a factor of the numerator and cancels.",
      definition:
        "- In the numerator replace \\(-1\\) by \\(\\tan^2\\theta - \\sec^2\\theta = (\\tan\\theta - \\sec\\theta)(\\tan\\theta + \\sec\\theta)\\).\n" +
        "- Then the numerator is \\((\\tan\\theta + \\sec\\theta)\\big[1 + \\tan\\theta - \\sec\\theta\\big]\\), whose bracket is the denominator.\n" +
        "- So \\(\\dfrac{\\tan\\theta + \\sec\\theta - 1}{\\tan\\theta - \\sec\\theta + 1} = \\tan\\theta + \\sec\\theta = \\dfrac{1 + \\sin\\theta}{\\cos\\theta}\\).\n" +
        "The same move works with \\(\\cot\\theta\\) and \\(\\operatorname{cosec}\\theta\\), and on the sine–cosine form \\(\\dfrac{\\sin\\theta - \\cos\\theta + 1}{\\sin\\theta + \\cos\\theta - 1}\\), which equals \\(\\sec\\theta + \\tan\\theta\\) too.",
      formula: {
        label: "The standing result",
        latex: "\\frac{\\tan\\theta + \\sec\\theta - 1}{\\tan\\theta - \\sec\\theta + 1} = \\sec\\theta + \\tan\\theta = \\frac{1 + \\sin\\theta}{\\cos\\theta}",
      },
      authoredExample: {
        prompt: "Simplify \\(\\dfrac{\\cot\\theta + \\operatorname{cosec}\\theta - 1}{\\cot\\theta - \\operatorname{cosec}\\theta + 1}\\).",
        steps: [
          "Replace \\(-1\\) by \\(\\cot^2\\theta - \\operatorname{cosec}^2\\theta = (\\cot\\theta - \\operatorname{cosec}\\theta)(\\cot\\theta + \\operatorname{cosec}\\theta)\\).",
          "The numerator becomes \\((\\cot\\theta + \\operatorname{cosec}\\theta)(1 + \\cot\\theta - \\operatorname{cosec}\\theta)\\).",
          "The bracket is the denominator; cancelling leaves \\(\\cot\\theta + \\operatorname{cosec}\\theta = \\dfrac{1 + \\cos\\theta}{\\sin\\theta}\\).",
        ],
        answer: "\\(\\dfrac{1 + \\cos\\theta}{\\sin\\theta}\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\left(\\dfrac{\\tan\\theta + \\sec\\theta - 1}{\\tan\\theta - \\sec\\theta + 1}\\right)(\\sec\\theta - \\tan\\theta)\\).",
        steps: [
          "The fraction is \\(\\sec\\theta + \\tan\\theta\\) by the standing result.",
          "Times its reciprocal partner: \\((\\sec\\theta + \\tan\\theta)(\\sec\\theta - \\tan\\theta) = 1\\).",
        ],
        answer: "\\(1\\).",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac{\\sin\\theta - \\cos\\theta + 1}{\\sin\\theta + \\cos\\theta - 1}\\)?", answer: "\\(\\sec\\theta + \\tan\\theta\\)" },
        { prompt: "What replaces the \\(1\\) in the cot–cosec version?", answer: "\\(\\operatorname{cosec}^2\\theta - \\cot^2\\theta\\)" },
        { prompt: "\\(\\dfrac{\\tan\\theta + \\sec\\theta - 1}{\\tan\\theta - \\sec\\theta + 1} - \\dfrac{1 + \\sin\\theta}{\\cos\\theta}\\)?", answer: "\\(0\\)" },
        { prompt: "If it equals \\(p\\sec\\theta + q\\tan\\theta\\), then \\(p + q\\)?", answer: "\\(2\\)" },
      ],
      pyqExampleId: "89a1d160-a35d-45c0-88ee-fec52f1d63c3", // 2022 (II) — x = (1 + sin)/cos, the tan/sec fraction equals x
      traps: [
        {
          title: "Cross-multiplying works, but costs three minutes",
          body:
            "Every member of this family can be proved by clearing denominators and expanding, and every one of them then takes a page. Replacing the \\(1\\) takes two lines. If a fraction has a bare \\(\\pm 1\\) beside \\(\\tan\\) and \\(\\sec\\) (or \\(\\cot\\) and \\(\\operatorname{cosec}\\)), reach for the replacement first.",
        },
      ],
    },
  ],
};
