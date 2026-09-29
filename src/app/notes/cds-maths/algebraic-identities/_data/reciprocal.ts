import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_AI_RECIPROCAL_NOTE: SubtopicNote = {
  subtopicName: "Reciprocal Sums x ± 1/x",
  title: "Reciprocal Sums x ± 1/x",
  oneLineDefinition:
    "Once x + 1/x or x − 1/x is known, every higher power sum like x² + 1/x², x³ + 1/x³ or x⁴ − 1/x⁴ follows by squaring or cubing.",
  whyItMatters:
    "Eleven PYQs, almost every paper has one. The work is a short ladder — square to go up two powers, cube to go up three, take a square root to come down — and the only real danger is the sign of x − 1/x.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsai-reciprocal-squares",
      name: "Squaring up and down the ladder",
      intuition:
        "Squaring \\(x + \\dfrac1x\\) gives \\(x^2 + \\dfrac{1}{x^2}\\) plus \\(2\\), because the cross term \\(x\\cdot\\dfrac1x\\) is \\(1\\). So each squaring moves two powers up, and a square root moves back down.",
      definition:
        "- \\(\\left(x + \\dfrac1x\\right)^2 = x^2 + \\dfrac{1}{x^2} + 2\\) and \\(\\left(x - \\dfrac1x\\right)^2 = x^2 + \\dfrac{1}{x^2} - 2\\).\n" +
        "- So \\(\\left(x + \\dfrac1x\\right)^2 - \\left(x - \\dfrac1x\\right)^2 = 4\\).\n" +
        "- \\(x^2 - \\dfrac{1}{x^2} = \\left(x - \\dfrac1x\\right)\\left(x + \\dfrac1x\\right)\\) and \\(x^4 + \\dfrac{1}{x^4} = \\left(x^2 + \\dfrac{1}{x^2}\\right)^2 - 2\\).\n" +
        "- An expression like \\(\\dfrac{x}{x^2 + kx + 1}\\): divide top and bottom by \\(x\\) to get \\(\\dfrac{1}{x + \\frac1x + k}\\).\n" +
        "- \\(\\sqrt{\\dfrac xy} - \\sqrt{\\dfrac yx}\\) is \\(r - \\dfrac1r\\) with \\(r = \\sqrt{\\dfrac xy}\\).",
      formula: {
        label: "Squaring a reciprocal sum",
        latex: "\\left(x \\pm \\tfrac1x\\right)^2 = x^2 + \\tfrac{1}{x^2} \\pm 2",
      },
      authoredExample: {
        prompt: "If \\(x + \\dfrac1x = 3\\), find \\(x^2 + \\dfrac{1}{x^2}\\), \\(x^4 + \\dfrac{1}{x^4}\\) and \\(x - \\dfrac1x\\).",
        steps: [
          "\\(x^2 + \\dfrac{1}{x^2} = 9 - 2 = 7\\).",
          "\\(x^4 + \\dfrac{1}{x^4} = 49 - 2 = 47\\).",
          "\\(\\left(x - \\dfrac1x\\right)^2 = 7 - 2 = 5\\), so \\(x - \\dfrac1x = \\pm\\sqrt5\\).",
        ],
        answer: "\\(7\\), \\(47\\) and \\(\\pm\\sqrt5\\).",
      },
      selfCheckExample: {
        prompt: "If \\(x > 0\\) and \\(x^4 + \\dfrac{1}{x^4} = 119\\), find \\(x + \\dfrac1x\\).",
        steps: [
          "\\(\\left(x^2 + \\dfrac{1}{x^2}\\right)^2 = 121\\), so \\(x^2 + \\dfrac{1}{x^2} = 11\\) (it cannot be negative).",
          "\\(\\left(x + \\dfrac1x\\right)^2 = 13\\), and \\(x > 0\\) makes the sum positive.",
        ],
        answer: "\\(\\sqrt{13}\\).",
      },
      practiceSet: [
        { prompt: "\\(x - \\dfrac1x = 3\\). Find \\(x^2 + \\dfrac{1}{x^2}\\).", answer: "\\(11\\)" },
        { prompt: "\\(x + \\dfrac1x = 4\\). Find \\(x^2 + \\dfrac{1}{x^2}\\).", answer: "\\(14\\)" },
        { prompt: "\\(x + \\dfrac1x = 4\\). Find \\(\\dfrac{2x}{x^2 + 1}\\).", answer: "\\(\\dfrac12\\)" },
        { prompt: "\\(x^2 + \\dfrac{1}{x^2} = 18\\). Find \\(x - \\dfrac1x\\).", answer: "\\(\\pm 4\\)" },
      ],
      pyqExampleId: "08344ebf-8ca5-4a48-ae98-45cb80a51af7", // 2025 (II) — x − 1/x given, x > 0
      traps: [
        {
          title: "x − 1/x has two signs",
          body:
            "Coming down from \\(x^2 + \\dfrac{1}{x^2}\\), \\(x - \\dfrac1x\\) is \\(\\pm\\) a square root, and \\(x > 0\\) does not decide the sign (\\(x = 2\\) and \\(x = \\dfrac12\\) both have \\(x > 0\\)). If the options list only one sign, that is the intended value; if both appear, look for a condition like \\(x > 1\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsai-reciprocal-cubes",
      name: "Cubes and higher powers",
      intuition:
        "Cubing \\(x + \\dfrac1x\\) gives \\(x^3 + \\dfrac{1}{x^3}\\) plus three copies of \\(x + \\dfrac1x\\) itself. Subtract them and the cube is known.",
      definition:
        "With \\(u = x + \\dfrac1x\\) and \\(v = x - \\dfrac1x\\):\n" +
        "- \\(x^3 + \\dfrac{1}{x^3} = u^3 - 3u\\)\n" +
        "- \\(x^3 - \\dfrac{1}{x^3} = v^3 + 3v\\)\n" +
        "- \\(x^6 + \\dfrac{1}{x^6} = w^3 - 3w\\) with \\(w = x^2 + \\dfrac{1}{x^2}\\), so \\(x^6 + \\dfrac{1}{x^6} = w(w^2 - 3)\\).\n" +
        "- \\(\\dfrac{a^6 - 1}{a^3}\\) is just \\(a^3 - \\dfrac{1}{a^3}\\), and \\(\\dfrac{a^2 - 1}{a}\\) is \\(a - \\dfrac1a\\).",
      formula: {
        label: "Cubes of a reciprocal sum",
        latex: "x^3 + \\tfrac{1}{x^3} = u^3 - 3u, \\qquad x^3 - \\tfrac{1}{x^3} = v^3 + 3v",
      },
      authoredExample: {
        prompt: "If \\(x + \\dfrac1x = 3\\), find \\(x^3 + \\dfrac{1}{x^3}\\).",
        steps: ["\\(u^3 - 3u = 27 - 9\\)."],
        answer: "\\(18\\).",
      },
      selfCheckExample: {
        prompt: "If \\(x - \\dfrac1x = 2\\), find \\(x^3 - \\dfrac{1}{x^3}\\).",
        steps: ["\\(v^3 + 3v = 8 + 6\\)."],
        answer: "\\(14\\).",
      },
      practiceSet: [
        { prompt: "\\(x + \\dfrac1x = 2\\). Find \\(x^3 + \\dfrac{1}{x^3}\\).", answer: "\\(2\\)" },
        { prompt: "\\(x + \\dfrac1x = 4\\). Find \\(x^3 + \\dfrac{1}{x^3}\\).", answer: "\\(52\\)" },
        { prompt: "\\(\\dfrac{a^2 + 1}{a} = 3\\). Find \\(a^3 + \\dfrac{1}{a^3}\\).", answer: "\\(18\\)" },
        { prompt: "\\(x^2 + \\dfrac{1}{x^2} = 3\\). Find \\(x^6 + \\dfrac{1}{x^6}\\).", answer: "\\(18\\)" },
      ],
      pyqExampleId: "e5727106-0f34-4345-92c3-5bf5c1ac9ee7", // 2018 (I) — (a² − 1)/a given
      traps: [
        {
          title: "Plus 3v for the difference, minus 3u for the sum",
          body:
            "\\(\\left(x - \\dfrac1x\\right)^3 = x^3 - \\dfrac{1}{x^3} - 3\\left(x - \\dfrac1x\\right)\\), so the difference of cubes ADDS \\(3v\\). Using \\(-3v\\) by analogy with the sum gives a value that is usually one of the options.",
        },
      ],
    },
  ],
};
