import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_SI_RATIONALISATION_NOTE: SubtopicNote = {
  subtopicName: "Surds and Rationalisation",
  title: "Rationalising and Conjugate Pairs",
  oneLineDefinition:
    "Multiplying by the conjugate removes a surd from a denominator; a surd and its conjugate have a rational sum and product, and a chain of rationalised terms telescopes.",
  whyItMatters:
    "Eleven PYQs. Most give x and y as conjugate fractions and ask for x² + y², x³ − y³ or similar — find x + y and xy first, then use an identity. The telescoping sums (1/(√n + √(n + 1)) added many times) appear almost every other year.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdssi-rationalise",
      name: "Conjugate pairs x and y",
      intuition:
        "\\(\\dfrac{\\sqrt a + \\sqrt b}{\\sqrt a - \\sqrt b}\\) and its upside-down twin are reciprocals, so their product is \\(1\\). Rationalise one to get a clean form, and the sum is rational too. Every symmetric expression then follows.",
      definition:
        "- Rationalise: \\(\\dfrac{1}{\\sqrt a - \\sqrt b} = \\dfrac{\\sqrt a + \\sqrt b}{a - b}\\).\n" +
        "- If \\(x = \\dfrac{\\sqrt a + \\sqrt b}{\\sqrt a - \\sqrt b}\\) and \\(y = \\dfrac1x\\): \\(xy = 1\\) and \\(x + y = \\dfrac{2(a + b)}{a - b}\\).\n" +
        "- Then \\(x^2 + y^2 = (x + y)^2 - 2\\), \\(x - y = \\pm\\sqrt{(x + y)^2 - 4}\\), \\(x^3 - y^3 = (x - y)\\left((x + y)^2 - 1\\right)\\).",
      formula: {
        label: "Rationalising",
        latex: "\\dfrac{\\sqrt a + \\sqrt b}{\\sqrt a - \\sqrt b} = \\dfrac{(\\sqrt a + \\sqrt b)^2}{a - b}",
      },
      authoredExample: {
        prompt: "If \\(x = \\dfrac{\\sqrt3 + \\sqrt2}{\\sqrt3 - \\sqrt2}\\) and \\(y = \\dfrac{\\sqrt3 - \\sqrt2}{\\sqrt3 + \\sqrt2}\\), find \\(x^2 + y^2\\).",
        steps: [
          "\\(x = (\\sqrt3 + \\sqrt2)^2 = 5 + 2\\sqrt6\\) and \\(y = 5 - 2\\sqrt6\\).",
          "\\(x + y = 10\\), \\(xy = 1\\), so \\(x^2 + y^2 = 100 - 2\\).",
        ],
        answer: "\\(98\\).",
      },
      selfCheckExample: {
        prompt: "Simplify \\(\\dfrac{\\sqrt7 + \\sqrt5}{\\sqrt7 - \\sqrt5} + \\dfrac{\\sqrt7 - \\sqrt5}{\\sqrt7 + \\sqrt5}\\).",
        steps: ["Over the common denominator \\(7 - 5 = 2\\): \\(\\dfrac{(12 + 2\\sqrt{35}) + (12 - 2\\sqrt{35})}{2}\\)."],
        answer: "\\(12\\).",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac{1}{\\sqrt3 - \\sqrt2}\\)?", answer: "\\(\\sqrt3 + \\sqrt2\\)" },
        { prompt: "\\(\\dfrac{\\sqrt2 + 1}{\\sqrt2 - 1}\\)?", answer: "\\(3 + 2\\sqrt2\\)" },
        { prompt: "\\(x + y = 6\\), \\(xy = 1\\). \\(x^2 + y^2\\)?", answer: "\\(34\\)" },
        { prompt: "\\(x + y = 4\\), \\(xy = 1\\). \\(x^2 - xy + y^2\\)?", answer: "\\(13\\)" },
      ],
      pyqExampleId: "b6b88f5c-4bd1-4035-9fd5-441c71783c77", // 2018 (I) — (√5 − √3)/(√5 + √3) − (√5 + √3)/(√5 − √3)
      traps: [
        {
          title: "Sign of a difference",
          body:
            "\\(\\dfrac{\\sqrt a - \\sqrt b}{\\sqrt a + \\sqrt b}\\) is the smaller of the two twins, so 'small minus large' is negative. An option with the right size but the wrong sign is always printed.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdssi-telescoping",
      name: "Telescoping sums",
      intuition:
        "Rationalising \\(\\dfrac{1}{\\sqrt n + \\sqrt{n + 1}}\\) gives \\(\\sqrt{n + 1} - \\sqrt n\\). Add many such terms and each root cancels with the next, leaving only the last minus the first.",
      definition:
        "- \\(\\dfrac{1}{\\sqrt n + \\sqrt{n + 1}} = \\sqrt{n + 1} - \\sqrt n\\).\n" +
        "- So \\(\\displaystyle\\sum_{n = p}^{q} \\dfrac{1}{\\sqrt n + \\sqrt{n + 1}} = \\sqrt{q + 1} - \\sqrt p\\).\n" +
        "- \\(\\dfrac{1}{(n + 1)\\sqrt n + n\\sqrt{n + 1}} = \\dfrac{1}{\\sqrt n} - \\dfrac{1}{\\sqrt{n + 1}}\\), which telescopes the same way.",
      formula: {
        label: "Telescoping term",
        latex: "\\dfrac{1}{\\sqrt n + \\sqrt{n + 1}} = \\sqrt{n + 1} - \\sqrt n",
      },
      authoredExample: {
        prompt: "Find \\(\\dfrac{1}{\\sqrt{4} + \\sqrt{5}} + \\dfrac{1}{\\sqrt5 + \\sqrt6} + \\cdots + \\dfrac{1}{\\sqrt{35} + \\sqrt{36}}\\).",
        steps: ["The sum telescopes to \\(\\sqrt{36} - \\sqrt{4}\\)."],
        answer: "\\(4\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\dfrac{1}{1 + \\sqrt2} + \\dfrac{1}{\\sqrt2 + \\sqrt3} + \\cdots + \\dfrac{1}{\\sqrt{48} + \\sqrt{49}}\\).",
        steps: ["\\(\\sqrt{49} - \\sqrt{1}\\)."],
        answer: "\\(6\\).",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac{1}{\\sqrt8 + \\sqrt9}\\)?", answer: "\\(3 - 2\\sqrt2\\)" },
        { prompt: "\\(\\displaystyle\\sum_{n=1}^{15}\\dfrac{1}{\\sqrt n + \\sqrt{n + 1}}\\)?", answer: "\\(3\\)" },
        { prompt: "\\(\\displaystyle\\sum_{n=9}^{24}\\dfrac{1}{\\sqrt n + \\sqrt{n + 1}}\\)?", answer: "\\(2\\)" },
        { prompt: "\\(\\dfrac{1}{2\\sqrt1 + 1\\sqrt2}\\) as a difference?", answer: "\\(1 - \\dfrac{1}{\\sqrt2}\\)" },
      ],
      pyqExampleId: "281fedae-ff27-4426-8d49-5084d3ceee0a", // 2020 (II) — sum up to 1/(√99 + √100)
      traps: [
        {
          title: "Find the first and last terms exactly",
          body:
            "A sum ending at \\(\\dfrac{1}{\\sqrt{195} + \\sqrt{196}}\\) leaves \\(\\sqrt{196}\\), not \\(\\sqrt{195}\\). Write the first and last terms out before cancelling.",
        },
      ],
    },
  ],
};
