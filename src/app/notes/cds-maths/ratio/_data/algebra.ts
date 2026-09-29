import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_RA_ALGEBRA_NOTE: SubtopicNote = {
  subtopicName: "Equal Ratios and Proportion Algebra",
  title: "Equal Ratios and Proportion Algebra",
  oneLineDefinition:
    "Set every equal ratio to k and substitute; for an equation between two fractions, cross-multiply and factor.",
  whyItMatters:
    "Fourteen PYQs. Putting each ratio equal to k turns an expression in several letters into one in k, which then cancels. The other move — cross-multiplying and factoring — usually ends in an 'either–or' answer.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsra-put-k",
      name: "Put each ratio equal to k",
      intuition:
        "If \\(\\dfrac ab = \\dfrac cd = k\\), then \\(a = kb\\) and \\(c = kd\\). Every letter is now tied to one other, and any expression of the same degree in top and bottom loses \\(k\\).",
      definition:
        "- \\(\\dfrac ab = \\dfrac cd = k\\) gives \\(a = kb\\), \\(c = kd\\).\n" +
        "- \\(2a = 3b = 6c = k\\) gives \\(a = \\dfrac k2\\), \\(b = \\dfrac k3\\), \\(c = \\dfrac k6\\).\n" +
        "- A ratio of homogeneous expressions of the same degree is fixed by the ratios; one that mixes degrees (like \\(\\dfrac{3A^2 + 4B}{3A - 4B^2}\\)) is not.\n" +
        "- \\(\\dfrac pq = \\dfrac qr = \\dfrac rs = k\\) gives \\(\\dfrac ps = k^3\\).",
      formula: {
        label: "Equal ratios",
        latex: "\\dfrac ab = \\dfrac cd = k \\;\\Rightarrow\\; a = kb,\\ c = kd",
      },
      authoredExample: {
        prompt: "If \\(\\dfrac a3 = \\dfrac b4 = \\dfrac c5\\), find \\(\\dfrac{a^2 + b^2}{c^2}\\) and \\(\\dfrac{a + b}{c}\\).",
        steps: [
          "Let \\(a = 3k\\), \\(b = 4k\\), \\(c = 5k\\).",
          "\\(\\dfrac{9 + 16}{25} = 1\\) and \\(\\dfrac{3 + 4}{5} = \\dfrac75\\).",
        ],
        answer: "\\(1\\) and \\(\\dfrac75\\).",
      },
      selfCheckExample: {
        prompt: "If \\(a : b = 2 : 5\\), find \\((3a + b) : (a + 2b)\\).",
        steps: ["\\(a = 2k\\), \\(b = 5k\\): \\((6k + 5k) : (2k + 10k)\\)."],
        answer: "\\(11 : 12\\).",
      },
      practiceSet: [
        { prompt: "\\(a : b = c : d = 1 : 3\\). \\(\\dfrac{a + c}{b + d}\\)?", answer: "\\(\\dfrac13\\)" },
        { prompt: "\\(3x = 4y\\). \\(\\dfrac{x + y}{x - y}\\)?", answer: "\\(7\\)" },
        { prompt: "\\(\\dfrac pq = \\dfrac qr = 2\\). \\(\\dfrac pr\\)?", answer: "\\(4\\)" },
        { prompt: "Is \\(\\dfrac{A^2 + B}{A}\\) fixed by \\(A : B\\)?", answer: "No (mixed degrees)" },
      ],
      pyqExampleId: "7f74bfdc-6026-46be-a2a2-b44f287e6656", // 2023 (II) — 2a/3 = 4b/5 = 3c/4
      traps: [
        {
          title: "Mixed degrees cannot be determined",
          body:
            "An expression like \\(\\dfrac{3A^2 + 4B}{3A - 4B^2}\\) changes with the actual size of \\(A\\) and \\(B\\), not just their ratio. 'Cannot be determined' is then the right option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsra-cross-multiply",
      name: "Cross-multiply and factor",
      intuition:
        "An equation between two fractions becomes a polynomial equation when you cross-multiply. Expand, cancel the common terms, and factor what is left — often into two brackets that give two alternatives.",
      definition:
        "- \\(\\dfrac{p + q}{q + r} = \\dfrac{r + s}{s + p}\\) leads to \\((p - r)(p + q + r + s) = 0\\).\n" +
        "- \\((4a + 7b)(4c - 7d) = (4a - 7b)(4c + 7d)\\) leads to \\(ad = bc\\), i.e. \\(\\dfrac ab = \\dfrac cd\\).\n" +
        "- A quadratic in \\(\\dfrac ab\\) gives two possible ratios; keep both unless one is ruled out.\n" +
        "- A statement like 'each of three expressions equals \\(t\\)' can force \\(t = 0\\) after multiplying and adding.",
      formula: {
        label: "Cross-multiplication",
        latex: "\\dfrac PQ = \\dfrac RS \\iff PS = QR",
      },
      authoredExample: {
        prompt: "If \\(\\dfrac{3a + 2b}{3a - 2b} = \\dfrac{3c + 2d}{3c - 2d}\\), show that \\(a : b = c : d\\).",
        steps: [
          "Cross-multiply: \\((3a + 2b)(3c - 2d) = (3a - 2b)(3c + 2d)\\).",
          "The \\(9ac\\) and \\(-4bd\\) terms cancel, leaving \\(-6ad + 6bc = 6ad - 6bc\\), so \\(ad = bc\\).",
        ],
        answer: "\\(\\dfrac ab = \\dfrac cd\\).",
      },
      selfCheckExample: {
        prompt: "If \\(2a^2 - 5ab + 2b^2 = 0\\), find the possible values of \\(\\dfrac ab\\).",
        steps: ["\\((2a - b)(a - 2b) = 0\\)."],
        answer: "\\(\\dfrac12\\) or \\(2\\).",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac{x + 1}{x - 1} = 3\\). \\(x\\)?", answer: "\\(2\\)" },
        { prompt: "\\(a^2 = 4b^2\\). \\(\\dfrac ab\\)?", answer: "\\(\\pm 2\\)" },
        { prompt: "\\((a + b)(c - d) = (a - b)(c + d)\\) gives?", answer: "\\(ad = bc\\)" },
        { prompt: "\\((p - r)(p + q + r + s) = 0\\), \\(p \\ne r\\). Then?", answer: "\\(p + q + r + s = 0\\)" },
      ],
      pyqExampleId: "2ae7cafe-e658-485d-b084-2cc2df3b4844", // 2019 (II) — (4a + 7b)(4c − 7d) = (4a − 7b)(4c + 7d)
      traps: [
        {
          title: "Keep both signs",
          body:
            "A quadratic in \\(\\dfrac ab\\) gives two ratios, and \\(\\dfrac{a + b}{a - b}\\) then takes two values of opposite sign. An option listing only the positive one is incomplete.",
        },
      ],
    },
  ],
};
