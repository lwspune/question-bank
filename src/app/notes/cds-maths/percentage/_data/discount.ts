import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PP_DISCOUNT_NOTE: SubtopicNote = {
  subtopicName: "Successive Discount and Marked Price",
  title: "Discounts and Marked Price",
  oneLineDefinition:
    "A discount is a percentage of the marked price; successive discounts multiply, and profit is still measured on the cost.",
  whyItMatters:
    "Seven PYQs, one of them HARD. Four chain three successive discounts, which multiply exactly like successive changes; the other three link marked price, discount and profit, where the marked price and the cost price are two different bases.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdspp-discount",
      name: "Marked price, discount and profit",
      intuition:
        "The shop marks a price, takes a discount off the MARKED price, and the customer pays what is left. Whether that makes a profit is judged against the COST, a different number.",
      definition:
        "- \\(\\text{SP} = \\text{MP}\\left(1 - \\dfrac{d}{100}\\right)\\).\n" +
        "- Successive discounts \\(d_1, d_2, d_3\\): the customer pays \\(\\left(1 - \\tfrac{d_1}{100}\\right)\\left(1 - \\tfrac{d_2}{100}\\right)\\left(1 - \\tfrac{d_3}{100}\\right)\\) of MP; the single equivalent discount is \\(1\\) minus that.\n" +
        "- Mark up \\(m\\%\\) over cost, then discount \\(d\\%\\): SP \\(= \\text{CP}\\left(1 + \\tfrac{m}{100}\\right)\\left(1 - \\tfrac{d}{100}\\right)\\).\n" +
        "- Bought at a discount: the price paid is \\((100 - d)\\%\\) of the listed price.",
      formula: {
        label: "Successive discounts",
        latex: "1 - \\left(1 - \\tfrac{d_1}{100}\\right)\\left(1 - \\tfrac{d_2}{100}\\right)",
      },
      authoredExample: {
        prompt: "Find the single discount equal to successive discounts of \\(25\\%\\) and \\(20\\%\\).",
        steps: ["The customer pays \\(0.75 \\times 0.8 = 0.6\\) of the marked price."],
        answer: "\\(40\\%\\).",
      },
      selfCheckExample: {
        prompt: "An article is marked \\(50\\%\\) above cost and sold at a \\(20\\%\\) discount. Find the profit percentage.",
        steps: ["\\(1.5 \\times 0.8 = 1.2\\)."],
        answer: "\\(20\\%\\).",
      },
      practiceSet: [
        { prompt: "Discounts \\(10\\%\\) and \\(10\\%\\). Single equivalent?", answer: "\\(19\\%\\)" },
        { prompt: "MP \\(500\\), discount \\(12\\%\\). SP?", answer: "\\(440\\)" },
        { prompt: "Paid \\(1800\\) after a \\(10\\%\\) discount. MP?", answer: "\\(2000\\)" },
        { prompt: "MP \\(300\\), \\(20\\%\\) off, still \\(20\\%\\) profit. CP?", answer: "\\(200\\)" },
      ],
      pyqExampleId: "41132c04-ae84-4035-8246-791918b401c5", // 2021 (I) — successive discounts of 20%, 10% and 5%
      traps: [
        {
          title: "Discounts do not add",
          body:
            "Discounts of \\(20\\%\\), \\(10\\%\\) and \\(5\\%\\) come to \\(31.6\\%\\), not \\(35\\%\\). Each is taken off the price left by the one before.",
        },
        {
          title: "Two bases in one question",
          body:
            "The discount is a percentage of the MARKED price; the profit is a percentage of the COST. Keep them apart: CP \\(100\\), MP \\(120\\), \\(10\\%\\) off gives SP \\(108\\), an \\(8\\%\\) profit.",
        },
      ],
    },
  ],
};
