import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TG_PAIRS_NOTE: SubtopicNote = {
  subtopicName: "Reciprocal Pairs and Given Sums",
  title: "Reciprocal Pairs and Given Sums",
  oneLineDefinition:
    "Given one combination such as sec θ + tan θ or sin θ + cos θ, an identity hands you its partner, and the partner gives every other value asked for.",
  whyItMatters:
    "45 questions in the bank, 17 of them MODERATE. Eighteen turn on the sec θ ± tan θ or cosec θ ± cot θ pair, which appears in every year of the bank; most of the rest give a sum and want a square or a higher power. All of them reward one recognition, and none needs the angle itself.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctgps-pair",
      name: "sec θ + tan θ and sec θ − tan θ multiply to 1",
      intuition:
        "\\(\\sec^2\\theta - \\tan^2\\theta = 1\\) is a difference of two squares, so it factors as \\((\\sec\\theta + \\tan\\theta)(\\sec\\theta - \\tan\\theta) = 1\\). Know one bracket and the other is its reciprocal. cosec and cot behave the same way.",
      definition:
        "- If \\(\\sec\\theta + \\tan\\theta = p\\), then \\(\\sec\\theta - \\tan\\theta = \\frac{1}{p}\\).\n" +
        "- Add the two: \\(\\sec\\theta = \\frac{1}{2}\\left(p + \\frac{1}{p}\\right)\\). Subtract: \\(\\tan\\theta = \\frac{1}{2}\\left(p - \\frac{1}{p}\\right)\\). Divide: \\(\\sin\\theta = \\frac{p^2 - 1}{p^2 + 1}\\).\n" +
        "- If \\(\\text{cosec}\\,\\theta + \\cot\\theta = m\\), then \\(\\text{cosec}\\,\\theta - \\cot\\theta = \\frac{1}{m}\\) and \\(\\cos\\theta = \\frac{m^2 - 1}{m^2 + 1}\\).\n" +
        "- The same pair hides in other forms: \\(\\frac{1 + \\sin\\theta}{\\cos\\theta} = \\sec\\theta + \\tan\\theta\\), \\(\\sqrt{\\frac{1 + \\sin\\theta}{1 - \\sin\\theta}} = \\sec\\theta + \\tan\\theta\\), \\(\\sqrt{\\frac{1 + \\cos\\theta}{1 - \\cos\\theta}} = \\text{cosec}\\,\\theta + \\cot\\theta\\), and \\(\\frac{\\sin\\theta}{1 + \\cos\\theta} = \\text{cosec}\\,\\theta - \\cot\\theta\\).\n" +
        "- **Fast route:** \\(p^2 + 1\\), \\(p^2 - 1\\) and \\(2p\\) are the sides of a right triangle. For \\(p = 5\\) that is 26, 24, 10, which is the 5, 12, 13 triangle, so \\(\\sec\\theta = \\frac{13}{5}\\) and \\(\\tan\\theta = \\frac{12}{5}\\) at sight.\n" +
        "- **Limit:** the square-root forms assume the denominator ratio is positive (\\(\\cos\\theta > 0\\) for the sec pair), which holds for every acute angle.",
      formula: {
        label: "The reciprocal pairs",
        latex:
          "(\\sec\\theta + \\tan\\theta)(\\sec\\theta - \\tan\\theta) = 1 \\qquad (\\text{cosec}\\,\\theta + \\cot\\theta)(\\text{cosec}\\,\\theta - \\cot\\theta) = 1 \\qquad \\sec\\theta + \\tan\\theta = p \\Rightarrow \\sin\\theta = \\frac{p^2 - 1}{p^2 + 1} \\qquad \\sqrt{\\frac{1 + \\sin\\theta}{1 - \\sin\\theta}} = \\sec\\theta + \\tan\\theta",
      },
      authoredExample: {
        prompt: "If \\(\\sec\\theta + \\tan\\theta = 7\\), find \\(\\sec\\theta\\), \\(\\tan\\theta\\) and \\(\\cos\\theta\\).",
        steps: [
          "The partner is \\(\\sec\\theta - \\tan\\theta = \\frac{1}{7}\\).",
          "Add: \\(2\\sec\\theta = 7 + \\frac{1}{7} = \\frac{50}{7}\\), so \\(\\sec\\theta = \\frac{25}{7}\\) and \\(\\cos\\theta = \\frac{7}{25}\\).",
          "Subtract: \\(2\\tan\\theta = 7 - \\frac{1}{7} = \\frac{48}{7}\\), so \\(\\tan\\theta = \\frac{24}{7}\\).",
          "Check: \\(\\frac{625}{49} - \\frac{576}{49} = 1\\).",
        ],
        answer: "\\(\\sec\\theta = \\frac{25}{7}\\), \\(\\tan\\theta = \\frac{24}{7}\\), \\(\\cos\\theta = \\frac{7}{25}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\text{cosec}\\,\\theta - \\cot\\theta = \\frac{1}{4}\\), find \\(\\cos\\theta\\).",
        steps: [
          "The partner is \\(\\text{cosec}\\,\\theta + \\cot\\theta = 4\\).",
          "\\(\\text{cosec}\\,\\theta = \\frac{1}{2}\\left(4 + \\frac{1}{4}\\right) = \\frac{17}{8}\\) and \\(\\cot\\theta = \\frac{1}{2}\\left(4 - \\frac{1}{4}\\right) = \\frac{15}{8}\\).",
          "\\(\\cos\\theta = \\frac{\\cot\\theta}{\\text{cosec}\\,\\theta} = \\frac{15}{17}\\).",
        ],
        answer: "\\(\\frac{15}{17}\\)",
      },
      practiceSet: [
        { prompt: "If \\(\\sec\\theta - \\tan\\theta = \\frac{1}{2}\\), what is \\(\\sec\\theta + \\tan\\theta\\)?", answer: "2" },
        { prompt: "If \\(\\text{cosec}\\,\\theta + \\cot\\theta = 3\\), what is \\(\\text{cosec}\\,\\theta - \\cot\\theta\\)?", answer: "\\(\\frac{1}{3}\\)" },
        {
          prompt: "If \\(\\sec\\theta + \\tan\\theta = 2\\), find \\(\\sin\\theta\\).",
          answer: "\\(\\frac{4 - 1}{4 + 1} = \\frac{3}{5}\\)",
        },
        { prompt: "Write \\(\\frac{1 - \\sin\\theta}{\\cos\\theta}\\) in terms of sec θ and tan θ.", answer: "\\(\\sec\\theta - \\tan\\theta\\)" },
      ],
      pyqExampleId: "da331167-e35d-48ff-a41e-aec5c325a39d",
      traps: [
        {
          title: "Taking the partner as p − 1 or −p",
          body:
            "If \\(\\sec\\theta + \\tan\\theta = p\\), then \\(\\sec\\theta - \\tan\\theta\\) is \\(\\frac{1}{p}\\), because the two multiply to 1. It is not \\(p - 1\\), \\(-p\\) or \\(p^2 - 1\\).",
        },
        {
          title: "Swapping the sum and the difference",
          body:
            "Adding the pair gives \\(2\\sec\\theta\\); subtracting gives \\(2\\tan\\theta\\). Halving \\(p + \\frac{1}{p}\\) and calling it tan is the most common slip, and the result is always a printed option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctgps-square",
      name: "Squaring a given sum",
      intuition:
        "\\((\\sin\\theta + \\cos\\theta)^2 = 1 + 2\\sin\\theta\\cos\\theta\\), so a given sum hands you the product \\(\\sin\\theta\\cos\\theta\\), and that product unlocks the difference, the squares and tan θ + cot θ.",
      definition:
        "- \\((\\sin\\theta \\pm \\cos\\theta)^2 = 1 \\pm 2\\sin\\theta\\cos\\theta\\), and the two squares add to 2: \\((\\sin\\theta + \\cos\\theta)^2 + (\\sin\\theta - \\cos\\theta)^2 = 2\\).\n" +
        "- \\(\\tan\\theta + \\cot\\theta = \\frac{1}{\\sin\\theta\\cos\\theta}\\).\n" +
        "- A number plus its reciprocal: if \\(x + \\frac{1}{x} = k\\), then \\(x^2 + \\frac{1}{x^2} = k^2 - 2\\). Use it for \\(\\cos\\theta + \\sec\\theta\\) and \\(\\tan\\theta + \\cot\\theta\\).\n" +
        "- For a positive x, \\(x + \\frac{1}{x} = 2\\) only when \\(x = 1\\). So \\(\\tan\\theta + \\cot\\theta = 2\\) means θ = 45°, and \\(\\sin\\theta + \\text{cosec}\\,\\theta = 2\\) means \\(\\sin\\theta = 1\\).\n" +
        "- **Fast route:** when the given value is the extreme one (\\(\\sin\\theta + \\cos\\theta = \\sqrt{2}\\), \\(\\tan\\theta + \\cot\\theta = 2\\)), the angle is 45°. Put it in and read the answer.\n" +
        "- **Limit:** \\(\\sin\\theta + \\cos\\theta\\) can never exceed \\(\\sqrt{2} \\approx 1.414\\), and for a positive x, \\(x + \\frac{1}{x}\\) is never below 2. A given value beyond these has no angle.",
      formula: {
        label: "Squared sums",
        latex:
          "(\\sin\\theta \\pm \\cos\\theta)^2 = 1 \\pm 2\\sin\\theta\\cos\\theta \\qquad (\\sin\\theta + \\cos\\theta)^2 + (\\sin\\theta - \\cos\\theta)^2 = 2 \\qquad x + \\frac{1}{x} = k \\Rightarrow x^2 + \\frac{1}{x^2} = k^2 - 2 \\qquad \\tan\\theta + \\cot\\theta = \\frac{1}{\\sin\\theta\\cos\\theta}",
      },
      authoredExample: {
        prompt: "If \\(\\sin\\theta - \\cos\\theta = \\frac{1}{3}\\) and θ is acute, find \\(\\sin\\theta\\cos\\theta\\) and \\(\\sin\\theta + \\cos\\theta\\).",
        steps: [
          "Square: \\(1 - 2\\sin\\theta\\cos\\theta = \\frac{1}{9}\\), so \\(\\sin\\theta\\cos\\theta = \\frac{4}{9}\\).",
          "\\((\\sin\\theta + \\cos\\theta)^2 = 1 + \\frac{8}{9} = \\frac{17}{9}\\), and the sum is positive for an acute angle.",
          "\\(\\sin\\theta + \\cos\\theta = \\frac{\\sqrt{17}}{3}\\). Check: \\(\\frac{17}{9} + \\frac{1}{9} = 2\\).",
        ],
        answer: "\\(\\frac{4}{9}\\) and \\(\\frac{\\sqrt{17}}{3}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\tan\\theta + \\cot\\theta = 3\\), find \\(\\tan^2\\theta + \\cot^2\\theta\\) and \\(\\sin\\theta\\cos\\theta\\).",
        steps: [
          "\\(\\tan\\theta \\cot\\theta = 1\\), so \\(\\tan^2\\theta + \\cot^2\\theta = 9 - 2 = 7\\).",
          "\\(\\frac{1}{\\sin\\theta\\cos\\theta} = 3\\), so \\(\\sin\\theta\\cos\\theta = \\frac{1}{3}\\).",
        ],
        answer: "7 and \\(\\frac{1}{3}\\)",
      },
      practiceSet: [
        {
          prompt: "If \\(\\cos\\theta + \\sec\\theta = \\frac{5}{2}\\), find \\(\\cos^2\\theta + \\sec^2\\theta\\).",
          answer: "\\(\\frac{25}{4} - 2 = \\frac{17}{4}\\)",
        },
        { prompt: "If \\(\\sin\\theta + \\cos\\theta = 1.2\\), find \\(\\sin\\theta\\cos\\theta\\).", answer: "\\(\\frac{1.44 - 1}{2} = 0.22\\)" },
        { prompt: "If \\(\\tan\\theta + \\cot\\theta = 2\\) and θ is acute, what is θ?", answer: "\\(45^\\circ\\)" },
        {
          prompt: "If \\(\\sin\\theta\\cos\\theta = \\frac{3}{8}\\), find \\((\\sin\\theta + \\cos\\theta)^2\\).",
          answer: "\\(1 + \\frac{3}{4} = \\frac{7}{4}\\)",
        },
      ],
      pyqExampleId: "9a3a0650-990d-4696-9223-5bf688da8176",
      traps: [
        {
          title: "Forgetting the 2 in the cross term",
          body:
            "\\((\\sin\\theta + \\cos\\theta)^2 = 1 + 2\\sin\\theta\\cos\\theta\\), not \\(1 + \\sin\\theta\\cos\\theta\\). Dropping the 2 doubles the product you find, and the doubled value is usually printed.",
        },
        {
          title: "Answering a given that cannot happen",
          body:
            "\\(\\sin\\theta + \\cos\\theta = \\sqrt{3}\\) would need \\(\\sin\\theta\\cos\\theta = 1\\), but \\(\\sin\\theta\\cos\\theta\\) is never more than \\(\\frac{1}{2}\\). Any sum above \\(\\sqrt{2}\\) describes no real angle.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctgps-powers",
      name: "sin⁴θ + cos⁴θ and sin⁶θ + cos⁶θ",
      intuition:
        "Treat \\(\\sin^2\\theta\\) and \\(\\cos^2\\theta\\) as two numbers that add to 1. The fourth and sixth powers then come from ordinary algebra on a sum of 1, and each answer depends only on the product \\(\\sin^2\\theta\\cos^2\\theta\\).",
      definition:
        "Write \\(p = \\sin^2\\theta\\cos^2\\theta\\).\n" +
        "- \\(\\sin^4\\theta + \\cos^4\\theta = (\\sin^2\\theta + \\cos^2\\theta)^2 - 2p = 1 - 2p\\).\n" +
        "- \\(\\sin^6\\theta + \\cos^6\\theta = (\\sin^2\\theta + \\cos^2\\theta)^3 - 3p(\\sin^2\\theta + \\cos^2\\theta) = 1 - 3p\\).\n" +
        "- \\(\\sin^4\\theta - \\cos^4\\theta = (\\sin^2\\theta - \\cos^2\\theta)(\\sin^2\\theta + \\cos^2\\theta) = \\sin^2\\theta - \\cos^2\\theta\\).\n" +
        "- p lies from 0 to \\(\\frac{1}{4}\\), so \\(\\sin^4\\theta + \\cos^4\\theta\\) lies from \\(\\frac{1}{2}\\) to 1.\n" +
        "- **Fast route:** if the options are plain numbers, the expression is the same at every angle. Put θ = 0° (sin 0, cos 1) and read the answer.\n" +
        "- **Limit:** this works only when the answer is a constant. If the options contain θ, use the algebra or test two angles.",
      formula: {
        label: "Higher powers of sin and cos",
        latex:
          "\\sin^4\\theta + \\cos^4\\theta = 1 - 2\\sin^2\\theta\\cos^2\\theta \\qquad \\sin^6\\theta + \\cos^6\\theta = 1 - 3\\sin^2\\theta\\cos^2\\theta \\qquad \\sin^4\\theta - \\cos^4\\theta = \\sin^2\\theta - \\cos^2\\theta",
      },
      authoredExample: {
        prompt: "If \\(\\sin\\theta\\cos\\theta = \\frac{1}{3}\\), find \\(\\sin^6\\theta + \\cos^6\\theta\\).",
        steps: [
          "\\(p = \\sin^2\\theta\\cos^2\\theta = \\frac{1}{9}\\).",
          "\\(\\sin^6\\theta + \\cos^6\\theta = 1 - 3 \\times \\frac{1}{9} = \\frac{2}{3}\\).",
        ],
        answer: "\\(\\frac{2}{3}\\)",
      },
      selfCheckExample: {
        prompt: "Find the value of \\(2(\\sin^6\\theta + \\cos^6\\theta) - 3(\\sin^4\\theta + \\cos^4\\theta)\\).",
        steps: [
          "\\(2(1 - 3p) - 3(1 - 2p) = 2 - 6p - 3 + 6p = -1\\).",
          "Check at θ = 0°: \\(2(0 + 1) - 3(0 + 1) = -1\\).",
        ],
        answer: "\\(-1\\)",
      },
      practiceSet: [
        {
          prompt: "If \\(\\sin^2\\theta\\cos^2\\theta = \\frac{1}{8}\\), find \\(\\sin^4\\theta + \\cos^4\\theta\\).",
          answer: "\\(1 - \\frac{2}{8} = \\frac{3}{4}\\)",
        },
        { prompt: "Write \\(\\sin^4\\theta - \\cos^4\\theta\\) in terms of sin θ only.", answer: "\\(2\\sin^2\\theta - 1\\)" },
        { prompt: "What is \\(\\sin^6\\theta + \\cos^6\\theta\\) at θ = 45°?", answer: "\\(1 - \\frac{3}{4} = \\frac{1}{4}\\)" },
        {
          prompt: "If \\(\\sin\\theta + \\cos\\theta = \\sqrt{\\frac{3}{2}}\\), find \\(\\sin^4\\theta + \\cos^4\\theta\\).",
          answer: "\\(\\sin\\theta\\cos\\theta = \\frac{1}{4}\\), so \\(1 - \\frac{2}{16} = \\frac{7}{8}\\)",
        },
      ],
      pyqExampleId: "9c24e42e-dec4-4d5c-bb79-e2350ab68af2",
      traps: [
        {
          title: "Writing sin⁴θ + cos⁴θ = 1",
          body:
            "Only the squares add to 1. The fourth powers add to \\(1 - 2\\sin^2\\theta\\cos^2\\theta\\), which is \\(\\frac{1}{2}\\) at 45° and 1 only where sin or cos is 0.",
        },
        {
          title: "Using θ = 0° when the options contain θ",
          body:
            "Putting in one angle finds a constant answer. When the options are expressions in θ, one angle can make two of them equal, so test a second angle before choosing.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctgps-chain",
      name: "Substitution chains such as cos θ + cos²θ = 1",
      intuition:
        "The condition \\(\\cos\\theta + \\cos^2\\theta = 1\\) says \\(\\cos\\theta = 1 - \\cos^2\\theta = \\sin^2\\theta\\). From then on every \\(\\cos\\theta\\) can be swapped for \\(\\sin^2\\theta\\), and back, until the asked expression turns into the given one.",
      definition:
        "- \\(\\cos\\theta + \\cos^2\\theta = 1\\) gives \\(\\cos\\theta = \\sin^2\\theta\\), so \\(\\cos^2\\theta = \\sin^4\\theta\\).\n" +
        "- \\(\\sin\\theta + \\sin^2\\theta = 1\\) gives \\(\\sin\\theta = \\cos^2\\theta\\), so \\(\\sin^2\\theta = \\cos^4\\theta\\).\n" +
        "- \\(\\tan^4\\theta + \\tan^2\\theta = 1\\) gives \\(\\tan^2\\theta\\sec^2\\theta = 1\\), that is \\(\\sin^2\\theta = \\cos^4\\theta\\): the same chain in disguise.\n" +
        "- Method: rewrite the condition as one swap, apply the swap to the asked expression, and look for the given expression to appear again.\n" +
        "- The angle here is not a table angle (cos θ is about 0.618), so do not hunt for it. The swap is the whole method.",
      formula: {
        label: "The two chains",
        latex:
          "\\cos\\theta + \\cos^2\\theta = 1 \\Rightarrow \\cos\\theta = \\sin^2\\theta \\qquad \\sin\\theta + \\sin^2\\theta = 1 \\Rightarrow \\sin\\theta = \\cos^2\\theta",
      },
      authoredExample: {
        prompt: "If \\(\\sin\\theta + \\sin^2\\theta = 1\\), find \\(\\cos^4\\theta + \\sin\\theta\\).",
        steps: [
          "The condition gives \\(\\sin\\theta = 1 - \\sin^2\\theta = \\cos^2\\theta\\).",
          "Square it: \\(\\cos^4\\theta = \\sin^2\\theta\\).",
          "So \\(\\cos^4\\theta + \\sin\\theta = \\sin^2\\theta + \\sin\\theta = 1\\).",
        ],
        answer: "1",
      },
      selfCheckExample: {
        prompt: "If \\(1 - \\sin\\theta = \\sin^2\\theta\\), find \\(\\cos^6\\theta + \\cos^4\\theta\\).",
        steps: [
          "The condition is \\(\\sin\\theta + \\sin^2\\theta = 1\\), so \\(\\cos^2\\theta = \\sin\\theta\\).",
          "\\(\\cos^6\\theta + \\cos^4\\theta = \\sin^3\\theta + \\sin^2\\theta = \\sin\\theta(\\sin^2\\theta + \\sin\\theta) = \\sin\\theta\\).",
        ],
        answer: "\\(\\sin\\theta\\)",
      },
      practiceSet: [
        { prompt: "If \\(\\cos\\theta + \\cos^2\\theta = 1\\), write \\(\\sin^2\\theta\\) in terms of cos θ.", answer: "\\(\\cos\\theta\\)" },
        { prompt: "If \\(\\sin\\theta + \\sin^2\\theta = 1\\), what is \\(\\cos^2\\theta\\)?", answer: "\\(\\sin\\theta\\)" },
        { prompt: "If \\(\\cos\\theta = \\sin^2\\theta\\), find \\(\\cos\\theta + \\cos^2\\theta\\).", answer: "\\(\\sin^2\\theta + \\cos^2\\theta = 1\\)" },
        {
          prompt: "If \\(\\tan^2\\theta + \\tan^4\\theta = 1\\), what is \\(\\cos^4\\theta\\) in terms of sin θ?",
          answer: "\\(\\sin^2\\theta\\)",
        },
      ],
      pyqExampleId: "3bccbd54-d3b4-4ffc-9109-6e3d9476e9a1",
      traps: [
        {
          title: "Hunting for the angle",
          body:
            "\\(\\cos\\theta + \\cos^2\\theta = 1\\) has no table angle: cos θ works out to \\(\\frac{\\sqrt{5} - 1}{2}\\). Trying 30°, 45° and 60° wastes the 36 seconds. Make the swap \\(\\cos\\theta = \\sin^2\\theta\\) instead.",
        },
      ],
    },
  ],
};
