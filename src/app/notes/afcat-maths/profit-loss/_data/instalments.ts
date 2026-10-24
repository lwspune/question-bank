import type { SubtopicNote } from "@/app/notes/_types";

export const AF_PL_INSTALMENTS_NOTE: SubtopicNote = {
  subtopicName: "Instalments and Special Cases",
  title: "Buying on Instalments, and Two Special Cases",
  oneLineDefinition:
    "An instalment plan costs more than the cash price; with interest, the cash price is what the payments are worth today. Two odd cases close the chapter: drying fruit and a broken stone.",
  whyItMatters:
    "A small page with no AFCAT past-year question, yet five of its thirteen rows are HARD, all of them the cash price behind instalments with compound interest. The extra-paid rows are one addition; the cash-price rows need each payment divided by its own interest factor, and the marks go on dividing them all by the same one.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afpl-instalment-extra",
      name: "Extra paid on an instalment plan",
      intuition:
        "An instalment plan's total is the down payment plus all the instalments. What it costs beyond the cash price is the extra, the price of paying later.",
      definition:
        "- Total paid = down payment + number of instalments \\(\\times\\) each instalment.\n" +
        "- Extra = total paid \\(-\\) cash price; as a percentage, extra \\(\\div\\) cash price \\(\\times 100\\).\n" +
        "- Working back: cash price = total paid \\(-\\) extra.",
      formula: {
        label: "Extra paid on instalments",
        latex: "\\text{extra} = \\text{down payment} + n \\times \\text{instalment} - \\text{cash price}",
      },
      authoredExample: {
        prompt: "A TV costs ₹42,000 cash, or ₹12,000 down and 18 monthly instalments of ₹1,900. Find the extra paid on the instalment plan.",
        steps: ["Total \\(= 12000 + 18 \\times 1900 = 12000 + 34200 = 46200\\).", "Extra \\(= 46200 - 42000 = 4200\\)."],
        answer: "₹4,200.",
      },
      selfCheckExample: {
        prompt: "A phone costs ₹25,000 cash, or ₹5,000 down and 12 instalments of ₹1,875. What percentage extra is paid?",
        steps: ["Total \\(= 5000 + 22500 = 27500\\).", "Extra 2500 on 25000."],
        answer: "\\(10\\%\\).",
      },
      practiceSet: [
        { prompt: "Cash price ₹30,000, or ₹6,000 down and 15 instalments of ₹1,800. Find the extra paid.", answer: "₹3,000" },
        { prompt: "Cash price ₹50,000, or ₹10,000 down and 20 instalments of ₹2,250. What percentage extra is paid?", answer: "\\(10\\%\\)" },
        { prompt: "₹8,000 down and 10 instalments of ₹1,400 come to ₹2,000 more than the cash price. Find the cash price.", answer: "₹20,000" },
      ],
      pyqExampleId: "1824a268-192e-4a22-9b34-218560cda15f",
      traps: [
        {
          title: "Include the down payment",
          body: "The total paid is the down payment plus every instalment. Comparing only the instalments with the cash price makes the plan look cheaper than cash.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpl-instalment-pv",
      name: "Cash price from instalments with interest",
      intuition:
        "A payment due a year from now is worth less today: at \\(r\\%\\) compound interest it is worth the payment divided by \\(1 + \\tfrac{r}{100}\\). The cash price is the sum of what each instalment is worth today.",
      definition:
        "- An instalment \\(x\\) due after \\(k\\) periods is worth \\(\\dfrac{x}{\\left(1 + \\frac{r}{100}\\right)^k}\\) now.\n" +
        "- Cash price = the sum of these, plus any down payment.\n" +
        "- Half-yearly or quarterly instalments use the rate for that period: \\(20\\%\\) a year is \\(10\\%\\) a half-year and \\(5\\%\\) a quarter.\n" +
        "- Two equal annual instalments: \\(\\dfrac{x}{1 + r/100} + \\dfrac{x}{(1 + r/100)^2}\\).",
      formula: {
        label: "Cash price from n instalments",
        latex: "\\text{cash price} = \\sum_{k=1}^{n} \\dfrac{x}{\\left(1 + \\frac{r}{100}\\right)^k}",
      },
      authoredExample: {
        prompt: "A cooler is sold for two equal annual instalments of ₹4,410 each, at \\(5\\%\\) compound interest. Find its cash price.",
        steps: [
          "First instalment today: \\(\\dfrac{4410}{1.05} = 4200\\).",
          "Second: \\(\\dfrac{4410}{1.05^2} = \\dfrac{4410}{1.1025} = 4000\\).",
          "Cash price \\(= 4200 + 4000 = 8200\\).",
        ],
        answer: "₹8,200.",
      },
      selfCheckExample: {
        prompt: "An article is sold for two equal annual instalments of ₹2,880 at \\(20\\%\\) compound interest. Find the cash price.",
        steps: ["\\(\\dfrac{2880}{1.2} = 2400\\) and \\(\\dfrac{2880}{1.44} = 2000\\)."],
        answer: "₹4,400.",
      },
      practiceSet: [
        { prompt: "Two annual instalments of ₹1,210 each at \\(10\\%\\) compound interest. Find the cash price.", answer: "₹2,100" },
        {
          prompt: "₹1,000 down and two annual instalments of ₹3,380 each at \\(30\\%\\) compound interest. Find the cash price.",
          answer: "₹5,600",
          method: "\\(2600 + 2000 + 1000\\).",
        },
        {
          prompt: "Two half-yearly instalments of ₹1,323 each at \\(10\\%\\) a year, compounded half-yearly. Find the cash price.",
          answer: "₹2,460",
          method: "Use \\(5\\%\\) a half-year: \\(1260 + 1200\\).",
        },
      ],
      pyqExampleId: "2d5f4ccd-2b0a-41c7-b6a4-1500e8543c20",
      traps: [
        {
          title: "Each payment has its own factor",
          body: "The second annual instalment is divided by \\(\\left(1 + \\tfrac{r}{100}\\right)^2\\), not by \\(1 + \\tfrac{r}{100}\\) again.",
        },
        {
          title: "Use the rate per period",
          body: "Quarterly instalments at \\(20\\%\\) a year are discounted at \\(5\\%\\) a quarter, over four quarters, not at \\(20\\%\\) once.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "afpl-special-cases",
      name: "Drying fruit and a broken stone",
      intuition:
        "Two kinds of question hide a fixed quantity. Drying removes only water, so the dry part does not change. When a price goes with the square of the weight, breaking an article loses value even though nothing is thrown away.",
      definition:
        "Find what does not change, or what the price depends on, and use it to link before and after. Each row of the table names it.",
      table: {
        columns: ["Situation", "What stays fixed or sets the price", "Worked case"],
        rows: [
          {
            cells: [
              "Fresh fruit is dried",
              "The dry pulp",
              "Fruit with \\(75\\%\\) water has \\(25\\%\\) pulp, so 16 kg holds 4 kg of pulp. Dried to \\(60\\%\\) water, it weighs \\(4 \\div 0.4 = 10\\) kg.",
            ],
            noteAmber: "The water share changes; the pulp does not.",
          },
          {
            cells: [
              "A stone priced by the square of its weight breaks",
              "Price \\(= k \\times \\text{weight}^2\\)",
              "Pieces \\(1 : 3\\) of a stone weighing 4: value \\(4^2 = 16\\) before, \\(1 + 9 = 10\\) after, a loss of \\(\\tfrac{6}{16} = 37.5\\%\\).",
            ],
          },
          {
            cells: [
              "The same stone breaks into equal halves",
              "Price \\(= k \\times \\text{weight}^2\\)",
              "Value \\(2^2 = 4\\) before, \\(1 + 1 = 2\\) after: a \\(50\\%\\) loss.",
            ],
          },
        ],
      },
      selfCheckExample: {
        prompt: "Fresh mushrooms are \\(95\\%\\) water and dried ones \\(60\\%\\) water. How much dried mushroom does 40 kg of fresh give?",
        steps: ["The pulp is \\(5\\%\\) of 40, that is 2 kg.", "Dried, the pulp is \\(40\\%\\) of the weight: \\(2 \\div 0.4 = 5\\)."],
        answer: "5 kg.",
      },
      practiceSet: [
        { prompt: "A diamond priced by the square of its weight breaks into pieces in the ratio \\(1 : 2\\). Find the loss per cent.", answer: "\\(44\\tfrac 49\\%\\)" },
        { prompt: "Fresh coconut is \\(50\\%\\) water and dried coconut \\(10\\%\\) water. How much dried coconut does 18 kg of fresh give?", answer: "10 kg" },
        { prompt: "A stone priced by the square of its weight breaks into three equal pieces. Find the loss per cent.", answer: "\\(66\\tfrac 23\\%\\)" },
      ],
      pyqExampleId: "dc9f7683-278e-469f-b4fe-67e6c245b769",
      traps: [
        {
          title: "Drying does not cut the weight by the water percentage",
          body: "Going from \\(75\\%\\) water to \\(60\\%\\) water does not remove \\(15\\%\\) of the weight: 16 kg becomes 10 kg. Hold the pulp fixed and divide.",
        },
      ],
    },
  ],
};
