import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PP_PROFIT_NOTE: SubtopicNote = {
  subtopicName: "Profit and Loss",
  title: "Profit and Loss",
  oneLineDefinition:
    "Profit and loss are percentages of the cost price: SP = CP × (1 + p/100) for a profit of p%.",
  whyItMatters:
    "Seventeen PYQs, one of them HARD. Twelve are the cost-price equation in some form — two scenarios, two articles, a changed cost. The other five hide the profit in a QUANTITY: a false weight, goods lost in transit, the cost of 100 equal to the price of 80.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdspp-profit",
      name: "Cost price, selling price and the two-scenario trick",
      intuition:
        "Everything is measured against the cost price. Set CP \\(= 100\\) (or \\(C\\)) and each sentence becomes a multiple of it; two scenarios then differ by a known percentage of the same CP.",
      definition:
        "- Profit \\(p\\%\\): \\(\\text{SP} = \\text{CP}\\left(1 + \\dfrac{p}{100}\\right)\\). Loss \\(\\ell\\%\\): \\(\\text{SP} = \\text{CP}\\left(1 - \\dfrac{\\ell}{100}\\right)\\).\n" +
        "- Gain \\(g\\%\\) instead of loss \\(\\ell\\%\\) earns \\((g + \\ell)\\%\\) of CP more.\n" +
        "- Two articles: total profit \\(=\\) sum of the separate profits, measured on the TOTAL cost.\n" +
        "- Two items sold at the SAME price, one at \\(r\\%\\) profit and one at \\(r\\%\\) loss: always a net loss of \\(\\dfrac{r^2}{100}\\%\\).\n" +
        "- A changed cost with the same SP: recompute profit on the NEW cost.",
      formula: {
        label: "Selling price",
        latex: "\\text{SP} = \\text{CP}\\left(1 + \\dfrac{p}{100}\\right)",
      },
      authoredExample: {
        prompt: "Selling at a \\(10\\%\\) gain instead of a \\(5\\%\\) loss earns Rs. \\(45\\) more. Find the cost price.",
        steps: ["The difference is \\(15\\%\\) of CP.", "\\(0.15\\,\\text{CP} = 45\\)."],
        answer: "Rs. \\(300\\).",
      },
      selfCheckExample: {
        prompt: "Two phones are sold for Rs. \\(4800\\) each, one at \\(20\\%\\) profit and one at \\(20\\%\\) loss. Find the overall result.",
        steps: ["Costs \\(4000\\) and \\(6000\\): total \\(10{,}000\\) against \\(9600\\)."],
        answer: "A \\(4\\%\\) loss.",
      },
      practiceSet: [
        { prompt: "CP \\(400\\), profit \\(15\\%\\). SP?", answer: "\\(460\\)" },
        { prompt: "SP \\(540\\) at a \\(10\\%\\) loss. CP?", answer: "\\(600\\)" },
        { prompt: "Same SP, \\(25\\%\\) profit and \\(25\\%\\) loss. Net?", answer: "\\(6.25\\%\\) loss" },
        { prompt: "Profit \\(25\\%\\); CP up \\(25\\%\\), SP same. New profit?", answer: "None" },
      ],
      pyqExampleId: "54afd267-f8e7-4a1b-9bcf-e8c33d8a82f7", // 2019 (II) — 6% gain instead of 6% loss earns Rs. 6 more
      traps: [
        {
          title: "Profit is a percentage of COST",
          body:
            "A profit of Rs. \\(25\\) on a selling price of Rs. \\(125\\) is \\(25\\%\\), not \\(20\\%\\). Dividing by the selling price is the most common slip.",
        },
        {
          title: "The new cost is the new base",
          body:
            "When the cost rises and the selling price stays, the new profit percentage is measured on the NEW cost: from \\(132\\) on \\(120\\), it is \\(10\\%\\), not \\(12\\%\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdspp-quantity",
      name: "Profit hidden in quantities",
      intuition:
        "When a trader sells at cost but gives short weight, or when some goods are lost, the money per unit is unchanged but the number of units changes. Compare what is paid for with what is handed over.",
      definition:
        "- CP of \\(a\\) items \\(=\\) SP of \\(b\\) items: profit \\(= \\dfrac{a - b}{b} \\times 100\\%\\).\n" +
        "- A false weight of \\(w\\) g passed as \\(1000\\) g, sold at cost: profit \\(= \\dfrac{1000 - w}{w} \\times 100\\%\\).\n" +
        "- Some goods lost: the whole cost is spread over the goods that remain.\n" +
        "- The profit is on what the trader actually GAVE, so \\(w\\) is the denominator.",
      formula: {
        label: "False weight",
        latex: "\\dfrac{1000 - w}{w} \\times 100",
      },
      authoredExample: {
        prompt: "A grocer sells at cost price but uses a \\(960\\) g weight for \\(1\\) kg. Find the profit percentage.",
        steps: ["\\(\\dfrac{40}{960} \\times 100\\)."],
        answer: "\\(4\\tfrac16\\%\\).",
      },
      selfCheckExample: {
        prompt: "The cost price of \\(30\\) pens equals the selling price of \\(24\\). Find the profit percentage.",
        steps: ["\\(\\dfrac{30 - 24}{24} \\times 100\\)."],
        answer: "\\(25\\%\\).",
      },
      practiceSet: [
        { prompt: "\\(900\\) g for \\(1\\) kg at cost. Profit?", answer: "\\(11\\tfrac19\\%\\)" },
        { prompt: "CP of \\(12\\) \\(=\\) SP of \\(10\\). Profit?", answer: "\\(20\\%\\)" },
        { prompt: "CP of \\(10\\) \\(=\\) SP of \\(12\\). Result?", answer: "\\(16\\tfrac23\\%\\) loss" },
        { prompt: "Profit \\(25\\%\\) by false weight at cost. Weight used for \\(1\\) kg?", answer: "\\(800\\) g" },
      ],
      pyqExampleId: "afaffaad-1839-4e30-943e-ccec39f4a848", // 2021 (I) — cost of 100 mangoes = selling price of 80
      traps: [
        {
          title: "Divide by the smaller count",
          body:
            "With CP of \\(100\\) equal to SP of \\(80\\), the profit is \\(\\dfrac{20}{80} = 25\\%\\), not \\(\\dfrac{20}{100} = 20\\%\\). The base is what the trader actually gave.",
        },
      ],
    },
  ],
};
