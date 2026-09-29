import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_RA_MIXTURES_NOTE: SubtopicNote = {
  subtopicName: "Mixtures and Alligation",
  title: "Mixtures and Alligation",
  oneLineDefinition:
    "Add up each component separately when mixtures are combined; use alligation to find the ratio in which two mixtures give a target mixture.",
  whyItMatters:
    "Thirteen PYQs. When the amounts are given, track each component (the copper, the milk) on its own and divide at the end. When a target strength is given, alligation gives the mixing ratio in one line — work with the fraction of ONE component throughout.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsra-combine-mixtures",
      name: "Combining mixtures",
      intuition:
        "Mixing never creates or destroys milk or water. So compute how much of each component every part contributes, add them, and form the new ratio. Adding pure water changes the total but leaves the other component fixed.",
      definition:
        "- From \\(W\\) kg of an alloy in the ratio \\(a : b\\), the first metal is \\(\\dfrac{a}{a + b}W\\).\n" +
        "- Equal quantities: add the fractions directly.\n" +
        "- Adding water (or one pure component) keeps the other component's AMOUNT fixed; set its new fraction and solve for the total.\n" +
        "- A component's share can only move toward the added substance: adding kerosene cannot lower the kerosene share.",
      formula: {
        label: "Component in a mixture",
        latex: "\\text{amount of first} = \\dfrac{a}{a + b}\\times\\text{quantity}",
      },
      authoredExample: {
        prompt: "30 kg of an alloy with copper and tin \\(1 : 2\\) is melted with 40 kg of an alloy with copper and tin \\(3 : 5\\). Find the new ratio.",
        steps: [
          "First: copper \\(10\\), tin \\(20\\). Second: copper \\(15\\), tin \\(25\\).",
          "Total copper \\(25\\), tin \\(45\\).",
        ],
        answer: "\\(5 : 9\\).",
      },
      selfCheckExample: {
        prompt: "60 L of a mixture is \\(30\\%\\) acid. How much water must be added to make it \\(20\\%\\) acid?",
        steps: ["Acid stays \\(18\\) L; \\(20\\%\\) needs a total of \\(90\\) L."],
        answer: "\\(30\\) L.",
      },
      practiceSet: [
        { prompt: "Equal volumes of milk : water \\(1 : 1\\) and \\(3 : 1\\). New ratio?", answer: "\\(5 : 3\\)" },
        { prompt: "\\(40\\) L, milk \\(75\\%\\). Water to add for milk \\(60\\%\\)?", answer: "\\(10\\) L" },
        { prompt: "Can adding pure milk lower the milk fraction?", answer: "No" },
        { prompt: "\\(12\\) kg in the ratio \\(1 : 3\\). Amount of the first?", answer: "\\(3\\) kg" },
      ],
      pyqExampleId: "5954eb63-65fd-4f5b-91b0-058dc700c0af", // 2017 (I) — 25 kg of X with 125 kg of Y
      traps: [
        {
          title: "Do not average the ratios",
          body:
            "Mixing \\(1 : 2\\) with \\(2 : 3\\) does not give \\(3 : 5\\) unless the amounts are chosen specially. Work out the actual quantity of each component first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsra-alligation",
      name: "Alligation",
      intuition:
        "Mixing a weak and a strong solution gives something in between. The closer the target is to one of them, the more of that one you need — the mixing ratio is the two DISTANCES from the target, crossed over.",
      definition:
        "- With strengths \\(c_1 < c < c_2\\) (fractions of one component), the quantities are in the ratio \\(\\text{first} : \\text{second} = (c_2 - c) : (c - c_1)\\).\n" +
        "- Use the fraction of the SAME component everywhere (spirit fraction \\(\\dfrac15\\), not the ratio \\(1 : 4\\)).\n" +
        "- Three components: if one component comes from only one source (tin only in Y), use it to find the mixing ratio first.",
      formula: {
        label: "Alligation",
        latex: "\\dfrac{\\text{first}}{\\text{second}} = \\dfrac{c_2 - c}{c - c_1}",
      },
      authoredExample: {
        prompt: "One solution is \\(20\\%\\) sugar and another \\(50\\%\\). In what ratio should they be mixed to get \\(30\\%\\)?",
        steps: ["Distances: \\(50 - 30 = 20\\) and \\(30 - 20 = 10\\)."],
        answer: "\\(2 : 1\\) (weak : strong).",
      },
      selfCheckExample: {
        prompt: "Milk : water is \\(1 : 1\\) in one can and \\(3 : 1\\) in another. In what ratio should they be mixed to get \\(2 : 1\\)?",
        steps: [
          "Milk fractions: \\(\\dfrac12\\), \\(\\dfrac34\\), target \\(\\dfrac23\\).",
          "\\(\\left(\\dfrac34 - \\dfrac23\\right) : \\left(\\dfrac23 - \\dfrac12\\right) = \\dfrac{1}{12} : \\dfrac16\\).",
        ],
        answer: "\\(1 : 2\\).",
      },
      practiceSet: [
        { prompt: "Strengths \\(10\\%\\) and \\(40\\%\\), target \\(20\\%\\). Ratio?", answer: "\\(2 : 1\\)" },
        { prompt: "Fraction of gold in an alloy with gold : silver \\(2 : 3\\)?", answer: "\\(\\dfrac25\\)" },
        { prompt: "Target equal to one source's strength. Ratio?", answer: "All of that source" },
        { prompt: "Strengths \\(\\dfrac14\\) and \\(\\dfrac34\\), target \\(\\dfrac12\\). Ratio?", answer: "\\(1 : 1\\)" },
      ],
      pyqExampleId: "94700099-e144-4504-b032-d52bafb82e04", // 2026 (II) — gold and silver 1 : 2 and 2 : 3 to make 4 : 7
      traps: [
        {
          title: "Cross the distances",
          body:
            "The WEAK solution's share is the distance from the target to the STRONG one. Putting each distance next to its own solution gives the reciprocal ratio.",
        },
      ],
    },
  ],
};
