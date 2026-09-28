import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TR_GIVEN_SUMS_NOTE: SubtopicNote = {
  subtopicName: "Power Identities and Given Sums",
  title: "Power Identities & Given Sums",
  oneLineDefinition:
    "When a question gives sin θ + cos θ, or a sin θ + b cos θ, square it: the square hands you sin θ cos θ, and sin θ cos θ is what every higher power and every partner expression is built from.",
  whyItMatters:
    "Seventeen PYQs, every one MODERATE — the most uniform page in the chapter. Nothing here needs the angle itself; the whole page runs on one product, sin θ cos θ, and two power identities. Learn those, and these are fast, reliable marks.",
  concepts: [
    // C1 — squaring a given sum
    {
      kind: "formula" as const,
      slug: "cdstr-square-the-sum",
      name: "Square the given sum to get sin θ cos θ",
      intuition:
        "\\((\\sin\\theta + \\cos\\theta)^2 = 1 + 2\\sin\\theta\\cos\\theta\\), because the squares add to \\(1\\). So a given value of the sum is really a given value of the product — and \\(\\sin\\theta - \\cos\\theta\\), \\(\\tan\\theta + \\cot\\theta\\) and \\(\\sec\\theta + \\operatorname{cosec}\\theta\\) are all simple functions of that product.",
      definition:
        "Write \\(p = \\sin\\theta\\cos\\theta\\). If \\(\\sin\\theta + \\cos\\theta = k\\), then \\(p = \\dfrac{k^2 - 1}{2}\\), and:\n" +
        "- \\((\\sin\\theta - \\cos\\theta)^2 = 1 - 2p = 2 - k^2\\);\n" +
        "- \\(\\tan\\theta + \\cot\\theta = \\dfrac{1}{p}\\);\n" +
        "- \\(\\sec\\theta + \\operatorname{cosec}\\theta = \\dfrac{\\sin\\theta + \\cos\\theta}{p} = \\dfrac{k}{p}\\);\n" +
        "- \\(\\cos^2\\theta - \\sin^2\\theta = (\\cos\\theta + \\sin\\theta)(\\cos\\theta - \\sin\\theta)\\).\n" +
        "The **sign** of \\(\\sin\\theta - \\cos\\theta\\) depends on whether \\(\\theta\\) is above or below \\(45^\\circ\\).",
      formula: {
        label: "The product from the sum",
        latex: "\\sin\\theta + \\cos\\theta = k \\;\\Rightarrow\\; \\sin\\theta\\cos\\theta = \\frac{k^2 - 1}{2}, \\quad \\tan\\theta + \\cot\\theta = \\frac{1}{\\sin\\theta\\cos\\theta}",
      },
      authoredExample: {
        prompt: "If \\(\\sin\\theta + \\cos\\theta = \\dfrac{7}{5}\\), find \\(\\tan\\theta + \\cot\\theta\\).",
        steps: [
          "Square: \\(1 + 2\\sin\\theta\\cos\\theta = \\dfrac{49}{25}\\), so \\(\\sin\\theta\\cos\\theta = \\dfrac{12}{25}\\).",
          "\\(\\tan\\theta + \\cot\\theta = \\dfrac{1}{\\sin\\theta\\cos\\theta} = \\dfrac{25}{12}\\).",
          "Check: \\(\\sin\\theta = \\dfrac35\\), \\(\\cos\\theta = \\dfrac45\\) fit, and \\(\\dfrac34 + \\dfrac43 = \\dfrac{25}{12}\\).",
        ],
        answer: "\\(\\dfrac{25}{12}\\).",
      },
      selfCheckExample: {
        prompt: "If \\(\\sin\\theta + \\cos\\theta = \\dfrac{\\sqrt5}{2}\\) and \\(\\theta < 45^\\circ\\), find \\(\\cos\\theta - \\sin\\theta\\).",
        steps: [
          "Square: \\(1 + 2\\sin\\theta\\cos\\theta = \\dfrac54\\), so \\(2\\sin\\theta\\cos\\theta = \\dfrac14\\).",
          "\\((\\cos\\theta - \\sin\\theta)^2 = 1 - \\dfrac14 = \\dfrac34\\).",
          "Below \\(45^\\circ\\) the cosine is larger, so \\(\\cos\\theta - \\sin\\theta = \\dfrac{\\sqrt3}{2}\\).",
        ],
        answer: "\\(\\dfrac{\\sqrt3}{2}\\).",
      },
      practiceSet: [
        { prompt: "If \\(\\sin\\theta + \\cos\\theta = \\sqrt2\\), then \\(\\sin\\theta\\cos\\theta\\)?", answer: "\\(\\dfrac12\\)" },
        { prompt: "If \\(\\sin\\theta\\cos\\theta = \\dfrac14\\), then \\(\\tan\\theta + \\cot\\theta\\)?", answer: "\\(4\\)" },
        { prompt: "If \\(\\sin A + \\cos A = p\\), then \\(\\sin^3 A + \\cos^3 A\\)?", answer: "\\(\\dfrac{3p - p^3}{2}\\)" },
        { prompt: "\\(\\sec\\theta + \\operatorname{cosec}\\theta\\) in terms of \\(p = \\sin\\theta + \\cos\\theta\\)?", answer: "\\(\\dfrac{2p}{p^2 - 1}\\)" },
      ],
      pyqExampleId: "83deb1d6-34b2-42ba-998a-704e9e240653", // 2016 (II) — sin + cos = √7/2, find sin − cos
      traps: [
        {
          title: "Squaring loses the sign",
          body:
            "From \\((\\sin\\theta - \\cos\\theta)^2\\) you get \\(\\pm\\). Above \\(45^\\circ\\) the sine is larger and the difference is positive; below, it is negative. When the stem gives no range, both signs occur, and the paper will print only one of them.",
        },
      ],
    },

    // C2 — power identities
    {
      kind: "formula" as const,
      slug: "cdstr-power-identities",
      name: "sin⁴ + cos⁴ and sin⁶ + cos⁶ in terms of sin θ cos θ",
      intuition:
        "Cube or square \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) and collect terms. What falls out is that every symmetric power sum is \\(1\\) minus a multiple of \\(\\sin^2\\theta\\cos^2\\theta\\). Two of these are worth memorising outright.",
      definition:
        "With \\(p = \\sin\\theta\\cos\\theta\\):\n" +
        "- \\(\\sin^4\\theta + \\cos^4\\theta = 1 - 2p^2\\)\n" +
        "- \\(\\sin^6\\theta + \\cos^6\\theta = 1 - 3p^2\\)\n" +
        "- \\(\\sin^3\\theta + \\cos^3\\theta = (\\sin\\theta + \\cos\\theta)(1 - p)\\)\n" +
        "A long expression in these powers often reduces to a constant: the \\(p^2\\) terms cancel, and the answer does not depend on \\(\\theta\\) at all.",
      formula: {
        label: "Power identities",
        latex: "\\sin^4\\theta + \\cos^4\\theta = 1 - 2\\sin^2\\theta\\cos^2\\theta, \\qquad \\sin^6\\theta + \\cos^6\\theta = 1 - 3\\sin^2\\theta\\cos^2\\theta",
      },
      authoredExample: {
        prompt: "Find \\(3(\\sin^4\\theta + \\cos^4\\theta) - 2(\\sin^6\\theta + \\cos^6\\theta)\\).",
        steps: [
          "With \\(p = \\sin\\theta\\cos\\theta\\): \\(3(1 - 2p^2) - 2(1 - 3p^2)\\).",
          "\\(= 3 - 6p^2 - 2 + 6p^2\\).",
          "The \\(p^2\\) terms cancel, leaving \\(1\\) for every \\(\\theta\\).",
        ],
        answer: "\\(1\\).",
      },
      selfCheckExample: {
        prompt: "If \\(\\sin^4 x + \\cos^4 x = \\dfrac78\\), find \\(\\sin 2x\\) for acute \\(x\\).",
        steps: [
          "\\(1 - 2\\sin^2 x\\cos^2 x = \\dfrac78\\), so \\(\\sin^2 x\\cos^2 x = \\dfrac{1}{16}\\).",
          "\\(\\sin x\\cos x = \\dfrac14\\) (positive for acute \\(x\\)).",
          "\\(\\sin 2x = 2\\sin x\\cos x = \\dfrac12\\).",
        ],
        answer: "\\(\\dfrac12\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sin^6\\theta + \\cos^6\\theta + 3\\sin^2\\theta\\cos^2\\theta\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\sin^4\\theta + \\cos^4\\theta\\) at \\(45^\\circ\\)?", answer: "\\(\\dfrac12\\)" },
        { prompt: "\\(\\dfrac{1 - 2\\sin^2\\theta\\cos^2\\theta}{\\sin^4\\theta + \\cos^4\\theta}\\)?", answer: "\\(1\\)" },
        { prompt: "If \\(\\sin^4 x + \\cos^4 x = 1\\), then \\(\\sin x\\cos x\\)?", answer: "\\(0\\)" },
      ],
      pyqExampleId: "dfda8b75-cb7d-4eea-90fe-26f0289410d8", // 2022 (II) — 2(sin⁶+cos⁶) − 3(sin⁴+cos⁴)
      traps: [
        {
          title: "It is minus, not plus",
          body:
            "\\(\\sin^4\\theta + \\cos^4\\theta = 1 - 2\\sin^2\\theta\\cos^2\\theta\\). A statement with \\(+2\\) is planted in identity questions and looks right at a glance. Check it at \\(45^\\circ\\): the true value is \\(\\dfrac12\\), and the plus version gives \\(\\dfrac32\\).",
        },
      ],
    },

    // C3 — pairing a sin + b cos with its partner
    {
      kind: "formula" as const,
      slug: "cdstr-pair-a-sin-b-cos",
      name: "a sin θ + b cos θ and its partner a cos θ − b sin θ",
      intuition:
        "Square \\(a\\sin\\theta + b\\cos\\theta\\) and \\(a\\cos\\theta - b\\sin\\theta\\) and add: the cross terms \\(\\pm 2ab\\sin\\theta\\cos\\theta\\) cancel, and what is left is \\(a^2 + b^2\\). So knowing one of the pair fixes the square of the other — no need to find \\(\\theta\\).",
      definition:
        "- \\((a\\sin\\theta + b\\cos\\theta)^2 + (a\\cos\\theta - b\\sin\\theta)^2 = a^2 + b^2\\).\n" +
        "- So if \\(a\\sin\\theta + b\\cos\\theta = c\\), then \\((a\\cos\\theta - b\\sin\\theta)^2 = a^2 + b^2 - c^2\\).\n" +
        "- The partner is found up to sign; both signs usually occur for different angles. When the sum reaches its maximum \\(\\sqrt{a^2 + b^2}\\), the partner is \\(0\\) — see the maximum page.",
      formula: {
        label: "Partner identity",
        latex: "(a\\sin\\theta + b\\cos\\theta)^2 + (a\\cos\\theta - b\\sin\\theta)^2 = a^2 + b^2",
      },
      authoredExample: {
        prompt: "If \\(4\\sin\\theta + 3\\cos\\theta = 2\\), find \\((4\\cos\\theta - 3\\sin\\theta)^2\\).",
        steps: [
          "The two squares add to \\(4^2 + 3^2 = 25\\).",
          "The first square is \\(2^2 = 4\\).",
          "So the second is \\(25 - 4 = 21\\).",
        ],
        answer: "\\(21\\).",
      },
      selfCheckExample: {
        prompt: "If \\(5\\sin\\theta + 12\\cos\\theta = 7\\), what values can \\(5\\cos\\theta - 12\\sin\\theta\\) take?",
        steps: [
          "The squares add to \\(25 + 144 = 169\\).",
          "So \\((5\\cos\\theta - 12\\sin\\theta)^2 = 169 - 49 = 120\\).",
          "The partner is \\(\\pm\\sqrt{120} = \\pm 2\\sqrt{30}\\).",
        ],
        answer: "\\(\\pm 2\\sqrt{30}\\).",
      },
      practiceSet: [
        { prompt: "If \\(\\sin\\theta + \\cos\\theta = 1\\), then \\((\\cos\\theta - \\sin\\theta)^2\\)?", answer: "\\(1\\)" },
        { prompt: "Sum of the two squares for \\(a = 6\\), \\(b = 8\\)?", answer: "\\(100\\)" },
        { prompt: "If \\(3\\sin\\theta + 4\\cos\\theta = 5\\), then \\(3\\cos\\theta - 4\\sin\\theta\\)?", answer: "\\(0\\)" },
        { prompt: "\\(x = a\\cos\\theta + b\\sin\\theta\\), \\(y = a\\sin\\theta - b\\cos\\theta\\): \\(x^2 + y^2\\)?", answer: "\\(a^2 + b^2\\)" },
      ],
      pyqExampleId: "2e22e667-adcd-4b1b-a0ff-3d6606d466b5", // 2018 (II) — 3 sin θ + 5 cos θ = 4, find (3 cos θ − 5 sin θ)²
      traps: [
        {
          title: "When only one sign is printed, it is not the only answer",
          body:
            "\\(3\\sin\\theta + 5\\cos\\theta = 5\\) gives \\(5\\sin\\theta - 3\\cos\\theta = \\pm 3\\), and both signs genuinely happen (\\(\\theta = 0^\\circ\\) gives \\(-3\\)). The paper printed only \\(-3\\). Choose the value offered; do not conclude your \\(+3\\) was wrong.",
        },
      ],
    },
  ],
};
