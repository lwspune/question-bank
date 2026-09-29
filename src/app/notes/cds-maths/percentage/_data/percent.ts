import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PP_PERCENT_NOTE: SubtopicNote = {
  subtopicName: "Percentage",
  title: "Percentages of a Quantity",
  oneLineDefinition:
    "A percentage is a fraction with denominator 100; every question turns on which quantity is the base, the 100%.",
  whyItMatters:
    "Fourteen PYQs, half of them EASY. Pass marks, populations split by sex and literacy, and 'X is what per cent of Y' are all one move: write each percentage as a fraction of its own base. The 'more than / less than' pair is the one that catches people, because the two use different bases.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdspp-percent-of",
      name: "Percentage of a base",
      intuition:
        "\\(x\\%\\) of something is \\(\\dfrac{x}{100}\\) of it. Name the base first — the whole exam, the males, the sound mangoes — and the rest is one multiplication or division.",
      definition:
        "- \\(x\\%\\) of \\(B\\) \\(= \\dfrac{x}{100}B\\); \\(A\\) as a percentage of \\(B\\) \\(= \\dfrac AB \\times 100\\).\n" +
        "- Pass mark problems: score \\(\\pm\\) the margin \\(=\\) pass mark \\(= p\\%\\) of the maximum.\n" +
        "- Percentages of percentages multiply: \\(30\\%\\) of \\(\\tfrac13\\) of the population.\n" +
        "- A split population: males \\(\\cdot\\, y\\%\\) \\(+\\) females \\(\\cdot\\, z\\%\\) \\(=\\) total \\(\\cdot\\, x\\%\\).\n" +
        "- Convert units before comparing: \\(1\\) quintal \\(= 100\\) kg, \\(1\\) tonne \\(= 1000\\) kg.",
      formula: {
        label: "Percentage",
        latex: "\\dfrac{A}{B} \\times 100",
      },
      authoredExample: {
        prompt: "The pass mark is \\(35\\%\\). A candidate scores \\(62\\) and fails by \\(8\\) marks. Find the maximum marks.",
        steps: ["Pass mark \\(= 70\\).", "\\(70 = 0.35M\\)."],
        answer: "\\(200\\).",
      },
      selfCheckExample: {
        prompt: "\\(10\\%\\) of a crate of oranges is spoiled. \\(60\\%\\) of the rest are sold, leaving \\(72\\). How many were in the crate?",
        steps: ["\\(0.4 \\times 0.9N = 72\\)."],
        answer: "\\(200\\).",
      },
      practiceSet: [
        { prompt: "\\(15\\%\\) of \\(240\\)?", answer: "\\(36\\)" },
        { prompt: "\\(18\\) is what per cent of \\(72\\)?", answer: "\\(25\\%\\)" },
        { prompt: "\\(\\sqrt{36\\%}\\)?", answer: "\\(60\\%\\)" },
        { prompt: "\\(50\\) kg is what per cent of \\(2\\) quintals?", answer: "\\(25\\%\\)" },
      ],
      pyqExampleId: "6cbd69d8-063d-4f85-b0cb-55702cbdd4af", // 2017 (II) — 40% to pass, 45 marks, fails by 5
      traps: [
        {
          title: "The square root of a percentage",
          body:
            "\\(64\\% = 0.64\\), and \\(\\sqrt{0.64} = 0.8 = 80\\%\\). Taking the root of \\(64\\) alone gives \\(8\\%\\), which is wrong by a factor of ten.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdspp-more-less",
      name: "More than and less than",
      intuition:
        "'\\(X\\) is \\(20\\%\\) more than \\(Y\\)' measures from \\(Y\\). 'Then \\(Y\\) is less than \\(X\\) by …' measures from \\(X\\), a bigger base, so the percentage is smaller.",
      definition:
        "- \\(X\\) is \\(r\\%\\) more than \\(Y\\): \\(X = \\left(1 + \\dfrac{r}{100}\\right)Y\\).\n" +
        "- Then \\(Y\\) is less than \\(X\\) by \\(\\dfrac{r}{100 + r} \\times 100\\%\\).\n" +
        "- \\(X\\) is \\(r\\%\\) less than \\(Y\\): \\(Y\\) is more than \\(X\\) by \\(\\dfrac{r}{100 - r} \\times 100\\%\\).\n" +
        "- Chains: write each as a multiple of one quantity, then divide.",
      formula: {
        label: "Reversing a percentage",
        latex: "\\dfrac{r}{100 + r} \\times 100",
      },
      authoredExample: {
        prompt: "\\(A\\)'s salary is \\(25\\%\\) more than \\(B\\)'s. By what per cent is \\(B\\)'s less than \\(A\\)'s?",
        steps: ["\\(\\dfrac{25}{125} \\times 100\\)."],
        answer: "\\(20\\%\\).",
      },
      selfCheckExample: {
        prompt: "\\(P\\) is \\(20\\%\\) of \\(R\\) and \\(Q\\) is \\(50\\%\\) of \\(R\\). \\(P\\) is what per cent of \\(Q\\)?",
        steps: ["\\(\\dfrac{0.2R}{0.5R}\\)."],
        answer: "\\(40\\%\\).",
      },
      practiceSet: [
        { prompt: "\\(X\\) is \\(50\\%\\) more than \\(Y\\). \\(Y\\) is less by?", answer: "\\(33\\tfrac13\\%\\)" },
        { prompt: "\\(X\\) is \\(20\\%\\) less than \\(Y\\). \\(Y\\) is more by?", answer: "\\(25\\%\\)" },
        { prompt: "\\(X\\) is \\(10\\%\\) more than \\(Y\\). \\(Y\\) is less by?", answer: "\\(9\\tfrac1{11}\\%\\)" },
        { prompt: "\\(X = 0.8Y\\) and \\(X = 1.6Z\\). \\(Z\\) as a per cent of \\(Y\\)?", answer: "\\(50\\%\\)" },
      ],
      pyqExampleId: "c045a5aa-d39d-48bf-b8bf-b7f687d0d788", // 2020 (I) — X's income 20% more than Y's
      traps: [
        {
          title: "20% more does not reverse to 20% less",
          body:
            "If \\(X\\) is \\(20\\%\\) more than \\(Y\\), \\(Y\\) is \\(16\\tfrac23\\%\\) less than \\(X\\), not \\(20\\%\\). The base changed from \\(Y\\) to \\(X\\).",
        },
      ],
    },
  ],
};
