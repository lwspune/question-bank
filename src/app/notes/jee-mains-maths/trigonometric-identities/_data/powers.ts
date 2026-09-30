import type { SubtopicNote } from "@/app/notes/_types";

export const POWERS_TI_NOTE: SubtopicNote = {
  subtopicName: "Powers of Sine and Cosine",
  title: "Powers of Sine and Cosine",
  oneLineDefinition:
    "Fourth, sixth and higher powers of sine and cosine, reduced to the single quantity sin²θ cos²θ or pinned down by a given condition.",
  whyItMatters:
    "Ten PYQs, all of them multiple choice, and one from 2026. Six reduce powers of sine and cosine through sin²θ cos²θ, or write tan and cot through one variable; four give a condition that fixes sin²θ or sin θ cos θ first, and then evaluate. Two ideas cover the page.",
  concepts: [
    // C1 — reduce through p = sin²θ cos²θ
    {
      kind: "formula" as const,
      slug: "jti-reduce",
      name: "Reducing through sin²θ cos²θ",
      intuition:
        "Because \\(\\sin^2\\theta+\\cos^2\\theta=1\\), every symmetric power sum of sine and cosine depends on one number, \\(p=\\sin^2\\theta\\cos^2\\theta=\\frac14\\sin^22\\theta\\). An expression that looks like it depends on \\(\\theta\\) often turns out constant, or depends on \\(\\theta\\) only through \\(p\\). With \\(\\tan\\) and \\(\\cot\\), put \\(t=\\tan\\theta\\) instead.",
      definition:
        "- \\(\\sin^4\\theta+\\cos^4\\theta=1-2p\\).\n" +
        "- \\(\\sin^6\\theta+\\cos^6\\theta=1-3p\\).\n" +
        "- \\(\\cos^4\\theta-\\sin^4\\theta=\\cos2\\theta\\); \\(\\cos^8\\theta-\\sin^8\\theta=\\cos2\\theta\\,(1-2p)\\).\n" +
        "- \\(\\tan\\theta+\\cot\\theta=\\frac{1}{\\sin\\theta\\cos\\theta}=2\\csc2\\theta\\).",
      formula: {
        label: "Power sums",
        latex: "\\sin^4\\theta+\\cos^4\\theta=1-2p,\\quad\\sin^6\\theta+\\cos^6\\theta=1-3p,\\quad p=\\sin^2\\theta\\cos^2\\theta",
      },
      authoredExample: {
        prompt: "Show that \\(2(\\sin^6\\theta+\\cos^6\\theta)-3(\\sin^4\\theta+\\cos^4\\theta)\\) does not depend on \\(\\theta\\), and find its value.",
        steps: [
          "With \\(p=\\sin^2\\theta\\cos^2\\theta\\): \\(2(1-3p)-3(1-2p)\\).",
          "The \\(p\\) terms cancel: \\(2-3\\).",
        ],
        answer: "\\(-1\\) for every \\(\\theta\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sin^4\\theta+\\cos^4\\theta\\) at \\(\\theta=\\frac{\\pi}{8}\\).",
        steps: [
          "\\(p=\\frac14\\sin^2\\frac{\\pi}{4}=\\frac14\\cdot\\frac12=\\frac18\\).",
          "\\(1-2p=1-\\frac14\\).",
        ],
        answer: "\\(\\frac34\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sin^6\\theta+\\cos^6\\theta\\) at \\(\\theta=\\frac{\\pi}{4}\\)?", answer: "\\(\\frac14\\)" },
        { prompt: "\\(\\cos^4\\theta-\\sin^4\\theta\\) as one ratio?", answer: "\\(\\cos2\\theta\\)" },
        { prompt: "\\(\\tan\\theta+\\cot\\theta\\) as one ratio?", answer: "\\(2\\csc2\\theta\\)" },
        { prompt: "\\(\\sin^4\\theta+\\cos^4\\theta\\) if \\(\\sin2\\theta=\\frac23\\)?", answer: "\\(\\frac79\\)" },
      ],
      pyqExampleId: "bf200133-8925-4817-ae99-7a062e9d9abd", // 2026 — (cos⁸θ − sin⁸θ) sec 2θ collapses to 1 − 2p
      traps: [
        {
          title: "p runs from 0 to 1/4",
          body: "\\(p=\\sin^2\\theta\\cos^2\\theta=\\frac14\\sin^22\\theta\\), so its largest value is \\(\\frac14\\), not 1. Using the range of \\(\\sin^22\\theta\\) in place of the range of \\(p\\) gives a range four times too wide.",
        },
      ],
    },

    // C2 — a condition fixes sin²θ first
    {
      kind: "formula" as const,
      slug: "jti-given",
      name: "A condition that fixes sin²θ",
      intuition:
        "When the question gives an equation in \\(\\sin\\theta\\) and \\(\\cos\\theta\\), solve it for one simple quantity first: \\(\\sin^2\\theta\\), \\(\\sin\\theta\\cos\\theta\\), or a link such as \\(\\sin\\theta=\\cos^2\\theta\\). Everything asked afterwards is substitution. An equation \\(a\\sin^4\\theta+b\\cos^4\\theta=\\frac{ab}{a+b}\\) is a perfect square in disguise.",
      definition:
        "- \\(a\\sin^4\\theta+b\\cos^4\\theta=\\frac{ab}{a+b}\\): multiply the right side by \\((\\sin^2\\theta+\\cos^2\\theta)^2\\); the difference is \\(\\frac{(a\\sin^2\\theta-b\\cos^2\\theta)^2}{a+b}=0\\).\n" +
        "- So \\(\\sin^2\\theta=\\frac{b}{a+b}\\) and \\(\\cos^2\\theta=\\frac{a}{a+b}\\).\n" +
        "- \\((\\sin\\theta\\pm\\cos\\theta)^2=1\\pm2\\sin\\theta\\cos\\theta\\) links a sum to a product.\n" +
        "- \\(\\sin\\theta+\\sin^2\\theta=1\\) means \\(\\sin\\theta=\\cos^2\\theta\\).",
      formula: {
        label: "The perfect-square condition",
        latex: "a\\sin^4\\theta+b\\cos^4\\theta=\\frac{ab}{a+b}\\ \\Rightarrow\\ \\sin^2\\theta=\\frac{b}{a+b}",
      },
      authoredExample: {
        prompt: "\\(\\sin^4\\theta+3\\cos^4\\theta=\\frac34\\). Find \\(\\tan^2\\theta\\).",
        steps: [
          "Multiply by 4 and write \\(3=3(\\sin^2\\theta+\\cos^2\\theta)^2\\): \\(4\\sin^4\\theta+12\\cos^4\\theta=3\\sin^4\\theta+6\\sin^2\\theta\\cos^2\\theta+3\\cos^4\\theta\\).",
          "So \\(\\sin^4\\theta-6\\sin^2\\theta\\cos^2\\theta+9\\cos^4\\theta=0\\), that is \\((\\sin^2\\theta-3\\cos^2\\theta)^2=0\\).",
          "\\(\\sin^2\\theta=3\\cos^2\\theta\\).",
        ],
        answer: "\\(\\tan^2\\theta=3\\).",
      },
      selfCheckExample: {
        prompt: "\\(\\sin\\theta+\\cos\\theta=\\frac75\\) and \\(0<\\theta<\\frac{\\pi}{4}\\). Find \\(\\sin\\theta\\cos\\theta\\) and \\(\\cos\\theta-\\sin\\theta\\).",
        steps: [
          "Square: \\(1+2\\sin\\theta\\cos\\theta=\\frac{49}{25}\\), so \\(\\sin\\theta\\cos\\theta=\\frac{12}{25}\\).",
          "\\((\\cos\\theta-\\sin\\theta)^2=1-\\frac{24}{25}=\\frac{1}{25}\\).",
          "Below \\(\\frac{\\pi}{4}\\), \\(\\cos\\theta>\\sin\\theta\\), so take the positive root.",
        ],
        answer: "\\(\\frac{12}{25}\\) and \\(\\frac15\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sin\\theta+\\sin^2\\theta=1\\): \\(\\cos^2\\theta+\\cos^4\\theta\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\sin\\theta\\cos\\theta=\\frac18\\): \\((\\sin\\theta+\\cos\\theta)^2\\)?", answer: "\\(\\frac54\\)" },
        { prompt: "\\(\\log_{10}\\sin x+\\log_{10}\\cos x=-1\\): \\(\\sin2x\\)?", answer: "\\(\\frac15\\)" },
        { prompt: "\\(3\\sin^4\\theta+\\cos^4\\theta=\\frac34\\): \\(\\sin^2\\theta\\)?", answer: "\\(\\frac14\\)" },
      ],
      pyqExampleId: "3a0b0058-46f7-4b4d-ac44-f85243fbec39", // 2025 — 10 sin⁴θ + 15 cos⁴θ = 6 is a perfect square
      traps: [
        {
          title: "sin²θ takes the other coefficient",
          body: "In \\(a\\sin^4\\theta+b\\cos^4\\theta=\\frac{ab}{a+b}\\), \\(\\sin^2\\theta=\\frac{b}{a+b}\\), with \\(b\\) from the cosine term. Substitute back once to check before using it.",
        },
      ],
    },
  ],
};
