import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TG_EQUATIONS_NOTE: SubtopicNote = {
  subtopicName: "Trigonometric Equations and Maximum Values",
  title: "Trigonometric Equations and Maximum Values",
  oneLineDefinition:
    "Solve for θ by turning the equation into a single ratio and reading the table, and find how large or small an expression in sin θ and cos θ can be.",
  whyItMatters:
    "15 questions in the bank, 12 of them from 2024. The equations almost always land on 30°, 45° or 60°, so with angle options the quickest check is to put each option in. The greatest-value questions rest on one fact: a sin θ + b cos θ never passes √(a² + b²).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctgeq-oneratio",
      name: "Reduce to one ratio, then read the angle",
      intuition:
        "An equation with two ratios in it cannot be read off the table. Use an identity to leave just one ratio, solve for it like ordinary algebra, and the table gives the angle.",
      definition:
        "- Mixed squares: in \\(a\\sin^2\\theta + b\\cos^2\\theta = c\\), replace \\(\\cos^2\\theta\\) by \\(1 - \\sin^2\\theta\\). This gives \\((a - b)\\sin^2\\theta = c - b\\).\n" +
        "- cosec with cot, or sec with tan: replace \\(\\text{cosec}^2\\theta\\) by \\(1 + \\cot^2\\theta\\) (or \\(\\sec^2\\theta\\) by \\(1 + \\tan^2\\theta\\)).\n" +
        "- A quadratic in one ratio: factor it, then **reject** any root with \\(\\sin\\theta\\) or \\(\\cos\\theta\\) outside −1 to 1.\n" +
        "- A ratio plus its reciprocal equal to 2, such as \\(\\tan\\theta + \\cot\\theta = 2\\), forces the ratio to be 1.\n" +
        "- Cancel a factor such as \\(\\cos\\theta\\) only after checking it is not 0 in the given range; otherwise you may lose a solution.\n" +
        "- **Fast route:** when the options are angles, put each one into the equation with the table values and keep the one that fits. Check the range given: 90° may be excluded.",
      formula: {
        label: "Mixed squares of sin and cos",
        latex: "a\\sin^2\\theta + b\\cos^2\\theta = c \\Rightarrow \\sin^2\\theta = \\frac{c - b}{a - b}",
      },
      authoredExample: {
        prompt: "If \\(7\\sin^2\\theta + 3\\cos^2\\theta = 6\\) and θ is acute, find θ and \\(\\tan\\theta\\).",
        steps: [
          "\\(7\\sin^2\\theta + 3(1 - \\sin^2\\theta) = 6\\), so \\(4\\sin^2\\theta = 3\\).",
          "\\(\\sin\\theta = \\frac{\\sqrt{3}}{2}\\), so \\(\\theta = 60^\\circ\\) and \\(\\tan\\theta = \\sqrt{3}\\).",
          "Check: \\(7 \\times \\frac{3}{4} + 3 \\times \\frac{1}{4} = \\frac{24}{4} = 6\\).",
        ],
        answer: "\\(\\theta = 60^\\circ\\), \\(\\tan\\theta = \\sqrt{3}\\)",
      },
      selfCheckExample: {
        prompt: "Solve \\(2\\sin^2\\theta - 3\\sin\\theta + 1 = 0\\) for \\(0^\\circ < \\theta < 90^\\circ\\).",
        steps: [
          "Factor: \\((2\\sin\\theta - 1)(\\sin\\theta - 1) = 0\\).",
          "\\(\\sin\\theta = 1\\) gives 90°, outside the range. \\(\\sin\\theta = \\frac{1}{2}\\) gives 30°.",
        ],
        answer: "\\(30^\\circ\\)",
      },
      practiceSet: [
        { prompt: "Solve \\(2\\cos^2\\theta = 1\\) for an acute θ.", answer: "\\(45^\\circ\\)" },
        { prompt: "Solve \\(3\\tan^2\\theta = 1\\) for an acute θ.", answer: "\\(30^\\circ\\)" },
        { prompt: "Solve \\(4\\sin^2\\theta = 3\\) for an acute θ.", answer: "\\(60^\\circ\\)" },
        {
          prompt: "Solve \\(\\text{cosec}^2\\theta + \\cot^2\\theta = 3\\) for an acute θ.",
          answer: "\\(1 + 2\\cot^2\\theta = 3\\), so \\(\\cot\\theta = 1\\) and \\(\\theta = 45^\\circ\\)",
        },
      ],
      pyqExampleId: "e4155ddb-c58a-484f-a7a7-dd8a7fb8053e",
      traps: [
        {
          title: "Keeping an impossible root",
          body:
            "A quadratic in \\(\\sin\\theta\\) often gives a root such as \\(\\sin\\theta = -2\\) or \\(\\frac{3}{2}\\). No angle has a sine outside −1 to 1, so that root is thrown away, not reported.",
        },
        {
          title: "Cancelling a factor that can be zero",
          body:
            "From \\(\\cot^2\\theta = 2\\cos^2\\theta\\), cancelling \\(\\cos^2\\theta\\) loses θ = 90°, where both sides are 0. Cancel only when the range rules that value out, and say so.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctgeq-bounds",
      name: "Greatest and least values of a sin θ + b cos θ and of powers",
      intuition:
        "sin θ and cos θ cannot both be large at once, so \\(a\\sin\\theta + b\\cos\\theta\\) tops out below a + b, at \\(\\sqrt{a^2 + b^2}\\). It reaches that top when sin θ and cos θ are in the same ratio as a and b.",
      definition:
        "- \\(-\\sqrt{a^2 + b^2} \\le a\\sin\\theta + b\\cos\\theta \\le \\sqrt{a^2 + b^2}\\).\n" +
        "- The top is reached when \\(\\sin\\theta = \\frac{a}{\\sqrt{a^2 + b^2}}\\) and \\(\\cos\\theta = \\frac{b}{\\sqrt{a^2 + b^2}}\\). So if \\(a\\sin\\theta + b\\cos\\theta\\) equals its greatest value, \\(\\tan\\theta = \\frac{a}{b}\\).\n" +
        "- An equation \\(a\\sin\\theta + b\\cos\\theta = c\\) with \\(|c| > \\sqrt{a^2 + b^2}\\) has no solution. With a smaller c, divide by \\(\\sqrt{a^2 + b^2}\\) and use a compound angle: \\(\\sqrt{3}\\cos\\theta + \\sin\\theta = 2\\cos(\\theta - 30^\\circ)\\).\n" +
        "- Powers shrink: for \\(0 \\le x \\le 1\\), \\(x^n \\le x\\). So any higher even powers satisfy \\(\\sin^{2m}\\theta + \\cos^{2n}\\theta \\le \\sin^2\\theta + \\cos^2\\theta = 1\\), with 1 reached at θ = 0°.\n" +
        "- \\(\\sin^4\\theta + \\cos^4\\theta = 1 - 2\\sin^2\\theta\\cos^2\\theta\\) lies from \\(\\frac{1}{2}\\) (at 45°) to 1 (at 0°).",
      formula: {
        label: "Range of a sin θ + b cos θ",
        latex: "-\\sqrt{a^2 + b^2} \\le a\\sin\\theta + b\\cos\\theta \\le \\sqrt{a^2 + b^2}",
      },
      authoredExample: {
        prompt: "Find the greatest value of \\(5\\sin\\theta + 12\\cos\\theta\\), and \\(\\tan\\theta\\) where it is reached.",
        steps: [
          "Greatest value \\(= \\sqrt{25 + 144} = 13\\).",
          "It is reached at \\(\\sin\\theta = \\frac{5}{13}\\), \\(\\cos\\theta = \\frac{12}{13}\\), so \\(\\tan\\theta = \\frac{5}{12}\\).",
          "Check: \\(5 \\times \\frac{5}{13} + 12 \\times \\frac{12}{13} = \\frac{169}{13} = 13\\).",
        ],
        answer: "13, at \\(\\tan\\theta = \\frac{5}{12}\\)",
      },
      selfCheckExample: {
        prompt: "Find the least value of \\(8\\cos\\theta - 15\\sin\\theta\\).",
        steps: ["\\(\\sqrt{64 + 225} = \\sqrt{289} = 17\\), so the least value is \\(-17\\)."],
        answer: "\\(-17\\)",
      },
      practiceSet: [
        { prompt: "What is the greatest value of \\(\\sin\\theta + \\cos\\theta\\)?", answer: "\\(\\sqrt{2}\\)" },
        { prompt: "What is the greatest value of \\(7\\sin\\theta - 24\\cos\\theta\\)?", answer: "\\(\\sqrt{49 + 576} = 25\\)" },
        { prompt: "Can \\(3\\sin\\theta + 4\\cos\\theta\\) equal 6 for some θ?", answer: "No: its greatest value is 5" },
        { prompt: "What is the least value of \\(\\sin^4\\theta + \\cos^4\\theta\\)?", answer: "\\(\\frac{1}{2}\\), at θ = 45°" },
      ],
      pyqExampleId: "1fccc8a3-209d-4c07-b324-a06b48f56b76",
      traps: [
        {
          title: "Adding the coefficients",
          body:
            "The greatest value of \\(6\\sin\\theta + 8\\cos\\theta\\) is not 14, because sin θ and cos θ are never both 1. It is \\(\\sqrt{36 + 64} = 10\\).",
        },
        {
          title: "Forgetting the least value is negative",
          body:
            "The range of \\(a\\sin\\theta + b\\cos\\theta\\) is symmetric: if the greatest value is 13, the least is −13, not 0.",
        },
      ],
    },
  ],
};
